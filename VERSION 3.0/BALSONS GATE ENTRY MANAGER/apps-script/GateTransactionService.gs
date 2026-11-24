/**
 * BALSONS JTRWF GATE ENTRY & SITE ACCESS PORTAL
 * GateTransactionService.gs — Physical Gate Transactions, Material Inward (PO/DC), & Gate Pass Center (RGP / NRGP)
 * Phase 5 Implementation
 */

var GateTransactionService = (function() {

  function getDb() {
    var ssId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || '1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o';
    var ss = SpreadsheetApp.openById(ssId);
    if (!ss) throw new Error('Database Spreadsheet unreachable.');
    return ss;
  }

  function ensureSheet(ss, sheetName, headers) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#102D35')
        .setFontColor('#ffffff')
        .setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    return sheet;
  }

  function generateAtomicId(prefix, sheetName) {
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = getDb();
      var sheet = ss.getSheetByName(sheetName);
      var nextNum = 1;
      if (sheet && sheet.getLastRow() > 1) {
        var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
        values.forEach(function(r) {
          var idStr = String(r[0]);
          var match = idStr.match(/-(\d+)$/);
          if (match) {
            var n = parseInt(match[1], 10);
            if (n >= nextNum) nextNum = n + 1;
          }
        });
      }
      var numPadded = ('0000' + nextNum).slice(-4);
      return prefix + '-2026-' + numPadded;
    } finally {
      lock.releaseLock();
    }
  }

  // ─── MATERIAL INWARD (PO / DC / IGE) ──────────────────────────────────
  function createInward(payload, session) {
    if (!payload.poNumber && !payload.dcNumber) {
      throw new Error('Mandatory: Either PO Number or Delivery Challan No must be provided.');
    }
    if (!payload.vendorName) {
      throw new Error('Mandatory: Vendor / Supplier Name is required.');
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = getDb();
      var headers = [
        'InwardID', 'PONumber', 'DC_InvoiceNo', 'VendorName', 'Transporter', 
        'VehicleNo', 'ItemSummary', 'Qty', 'AllocatedBay', 'StoreNotificationStatus', 
        'GateInTimestamp', 'ReceivedBy', 'Status'
      ];
      var sheet = ensureSheet(ss, 'MATERIAL_INWARD_REGISTER', headers);

      var inwardId = generateAtomicId('IGE', 'MATERIAL_INWARD_REGISTER');
      var nowIso = new Date().toISOString();
      var user = session ? (session.fullName || session.username) : 'Security Guard Gate 1';

      var rowData = [
        inwardId,
        payload.poNumber || 'N/A',
        payload.dcNumber || 'N/A',
        payload.vendorName,
        payload.transporter || 'Direct Dispatch',
        payload.vehicleNo || 'OD-02-AK-9811',
        payload.itemSummary || 'Machinery Assembly Parts',
        payload.qty || '1 Lot',
        payload.allocatedBay || 'Main Press Pit (Bay-3)',
        'NOTIFIED_STORE_LEAD',
        nowIso,
        user,
        'IN_UNLOADING_BAY'
      ];

      sheet.appendRow(rowData);

      // Also log physical entry into GATE_ENTRY_EXIT_LOG
      recordMovementInternal(ss, {
        clearanceId: inwardId,
        subjectId: payload.vehicleNo || inwardId,
        direction: 'IN',
        gateNo: payload.gateNo || 'Gate-1 (Heavy Haul)',
        allocatedBay: payload.allocatedBay || 'Main Press Pit (Bay-3)'
      }, session);

      // Audit Log
      AuditService.logAction(session, 'CREATE_INWARD_DELIVERY', inwardId, 'SUCCESS',
        'Material Inward logged against PO: ' + (payload.poNumber || payload.dcNumber) + ' for Vendor: ' + payload.vendorName);

      return {
        inwardId: inwardId,
        poNumber: payload.poNumber,
        dcNumber: payload.dcNumber,
        vendorName: payload.vendorName,
        vehicleNo: payload.vehicleNo,
        allocatedBay: payload.allocatedBay,
        status: 'IN_UNLOADING_BAY',
        gateInTimestamp: nowIso
      };
    } finally {
      lock.releaseLock();
    }
  }

  function listInwards() {
    var ss = getDb();
    var sheet = ss.getSheetByName('MATERIAL_INWARD_REGISTER');
    if (!sheet || sheet.getLastRow() < 2) return [];

    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 13).getValues();
    return data.map(function(r) {
      return {
        inwardId: r[0],
        poNumber: r[1],
        dcNumber: r[2],
        vendorName: r[3],
        transporter: r[4],
        vehicleNo: r[5],
        itemSummary: r[6],
        qty: r[7],
        allocatedBay: r[8],
        storeStatus: r[9],
        gateInTimestamp: r[10],
        receivedBy: r[11],
        status: r[12]
      };
    });
  }

  function updateInwardStatus(payload, session) {
    if (!payload.inwardId || !payload.status) {
      throw new Error('Mandatory: InwardID and Status required.');
    }
    var ss = getDb();
    var sheet = ss.getSheetByName('MATERIAL_INWARD_REGISTER');
    if (!sheet) throw new Error('MATERIAL_INWARD_REGISTER sheet not found.');

    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 13).getValues();
    for (var i = 0; i < data.length; i++) {
      if (data[i][0] === payload.inwardId) {
        var rowIdx = i + 2;
        sheet.getRange(rowIdx, 13).setValue(payload.status);
        if (payload.status === 'STORE_ACCEPTED') {
          sheet.getRange(rowIdx, 10).setValue('STORE_ACCEPTED_GRN_PENDING');
        }
        AuditService.logAction(session, 'UPDATE_INWARD_STATUS', payload.inwardId, 'SUCCESS',
          'Status changed to: ' + payload.status);
        return { inwardId: payload.inwardId, status: payload.status };
      }
    }
    throw new Error('Inward record not found: ' + payload.inwardId);
  }

  // ─── GATE PASS CENTER (RGP / NRGP) ────────────────────────────────────
  function createGatePass(payload, session) {
    var passType = (payload.passType || 'RGP').toUpperCase();
    if (passType !== 'RGP' && passType !== 'NRGP') {
      throw new Error('Invalid pass type: Must be RGP or NRGP.');
    }
    if (!payload.itemDescription || !payload.consignee) {
      throw new Error('Mandatory: Item Description and Consignee required.');
    }
    if (passType === 'RGP' && !payload.expectedReturnDate) {
      throw new Error('Mandatory: Expected Return Date is required for Returnable Gate Pass (RGP).');
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = getDb();
      var headers = [
        'PassID', 'PassType', 'ItemDescription', 'Qty', 'Consignee', 
        'VehicleNo', 'DispatchDate', 'ExpectedReturnDate', 'ActualReturnDate', 
        'ApprovalStatus', 'ApprovedBy', 'GateStatus', 'Remarks'
      ];
      var sheet = ensureSheet(ss, 'GATE_PASS_REGISTER', headers);

      var passId = generateAtomicId(passType, 'GATE_PASS_REGISTER');
      var nowIso = new Date().toISOString();
      var approver = session ? (session.fullName || session.username) : 'BALSONS Project Owner';

      var rowData = [
        passId,
        passType,
        payload.itemDescription,
        payload.qty || '1 No',
        payload.consignee,
        payload.vehicleNo || 'OD-02-AX-8910',
        payload.dispatchDate || nowIso.slice(0, 10),
        passType === 'RGP' ? payload.expectedReturnDate : 'N/A',
        '', // ActualReturnDate
        'APPROVED',
        approver,
        'DISPATCHED_EXITED',
        payload.remarks || ''
      ];

      sheet.appendRow(rowData);

      // Log exit in GATE_ENTRY_EXIT_LOG
      recordMovementInternal(ss, {
        clearanceId: passId,
        subjectId: payload.vehicleNo || passId,
        direction: 'OUT',
        gateNo: payload.gateNo || 'Gate-1 (Heavy Haul)',
        allocatedBay: 'Outbound Roadway'
      }, session);

      // Audit Log
      AuditService.logAction(session, 'ISSUE_GATE_PASS_' + passType, passId, 'SUCCESS',
        passType + ' issued for: ' + payload.itemDescription + ' to ' + payload.consignee);

      return {
        passId: passId,
        passType: passType,
        itemDescription: payload.itemDescription,
        qty: payload.qty,
        consignee: payload.consignee,
        expectedReturnDate: payload.expectedReturnDate,
        approvalStatus: 'APPROVED',
        gateStatus: 'DISPATCHED_EXITED'
      };
    } finally {
      lock.releaseLock();
    }
  }

  function closeRgpReturn(payload, session) {
    if (!payload.passId) {
      throw new Error('Mandatory: passId required to acknowledge return.');
    }

    var ss = getDb();
    var sheet = ss.getSheetByName('GATE_PASS_REGISTER');
    if (!sheet) throw new Error('GATE_PASS_REGISTER sheet not found.');

    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 13).getValues();
    var nowIso = new Date().toISOString();

    for (var i = 0; i < data.length; i++) {
      if (data[i][0] === payload.passId) {
        var rowIdx = i + 2;
        sheet.getRange(rowIdx, 9).setValue(nowIso.slice(0, 10)); // ActualReturnDate
        sheet.getRange(rowIdx, 12).setValue('RETURNED_CLOSED');  // GateStatus
        sheet.getRange(rowIdx, 13).setValue((data[i][12] ? data[i][12] + ' | ' : '') + 'Returned verified: ' + (payload.conditionNotes || 'Condition OK'));

        // Log Inward return in GATE_ENTRY_EXIT_LOG
        recordMovementInternal(ss, {
          clearanceId: payload.passId,
          subjectId: data[i][5] || payload.passId,
          direction: 'IN',
          gateNo: payload.gateNo || 'Gate-1 (Heavy Haul)',
          allocatedBay: 'Store Return Receiving'
        }, session);

        AuditService.logAction(session, 'RECONCILE_RGP_RETURN', payload.passId, 'SUCCESS',
          'Return acknowledged and closed. Condition: ' + (payload.conditionNotes || 'Condition OK'));

        return {
          passId: payload.passId,
          actualReturnDate: nowIso.slice(0, 10),
          gateStatus: 'RETURNED_CLOSED'
        };
      }
    }
    throw new Error('Gate Pass not found: ' + payload.passId);
  }

  function listGatePasses() {
    var ss = getDb();
    var sheet = ss.getSheetByName('GATE_PASS_REGISTER');
    if (!sheet || sheet.getLastRow() < 2) return [];

    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 13).getValues();
    var todayStr = new Date().toISOString().slice(0, 10);

    return data.map(function(r) {
      var passType = r[1];
      var expDate = r[7];
      var gateStatus = r[11];
      var isOverdue = false;

      if (passType === 'RGP' && gateStatus !== 'RETURNED_CLOSED' && expDate && expDate < todayStr) {
        isOverdue = true;
      }

      return {
        passId: r[0],
        passType: passType,
        itemDescription: r[2],
        qty: r[3],
        consignee: r[4],
        vehicleNo: r[5],
        dispatchDate: r[6],
        expectedReturnDate: expDate,
        actualReturnDate: r[8],
        approvalStatus: r[9],
        approvedBy: r[10],
        gateStatus: gateStatus,
        isOverdue: isOverdue,
        remarks: r[12]
      };
    });
  }

  // ─── GATE ENTRY / EXIT MOVEMENTS ──────────────────────────────────────
  function recordMovementInternal(ss, movePayload, session) {
    var headers = ['LogID', 'ClearanceID', 'SubjectID', 'Direction', 'GateNo', 'Timestamp', 'SecurityGuardID', 'AllocatedBay'];
    var sheet = ensureSheet(ss, 'GATE_ENTRY_EXIT_LOG', headers);

    var logId = generateAtomicId('LOG', 'GATE_ENTRY_EXIT_LOG');
    var guard = session ? (session.fullName || session.username) : 'Gate-1 Sentry';

    sheet.appendRow([
      logId,
      movePayload.clearanceId || 'N/A',
      movePayload.subjectId || 'N/A',
      movePayload.direction || 'IN',
      movePayload.gateNo || 'Gate-1 (Heavy Haul)',
      new Date().toISOString(),
      guard,
      movePayload.allocatedBay || 'Main Press Pit (Bay-3)'
    ]);
    return logId;
  }

  function recordGateMovement(payload, session) {
    var ss = getDb();
    var logId = recordMovementInternal(ss, payload, session);
    AuditService.logAction(session, 'RECORD_GATE_MOVEMENT', logId, 'SUCCESS',
      'Movement ' + payload.direction + ' recorded at ' + payload.gateNo + ' for Subject: ' + payload.subjectId);
    return { logId: logId, status: 'RECORDED' };
  }

  function listGateMovements(limit) {
    var ss = getDb();
    var sheet = ss.getSheetByName('GATE_ENTRY_EXIT_LOG');
    if (!sheet || sheet.getLastRow() < 2) return [];

    limit = limit || 50;
    var totalRows = sheet.getLastRow() - 1;
    var startRow = Math.max(2, sheet.getLastRow() - limit + 1);
    var count = sheet.getLastRow() - startRow + 1;

    var data = sheet.getRange(startRow, 1, count, 8).getValues();
    var list = data.map(function(r) {
      return {
        logId: r[0],
        clearanceId: r[1],
        subjectId: r[2],
        direction: r[3],
        gateNo: r[4],
        timestamp: r[5],
        securityGuardId: r[6],
        allocatedBay: r[7]
      };
    });
    return list.reverse();
  }

  return {
    createInward: createInward,
    listInwards: listInwards,
    updateInwardStatus: updateInwardStatus,
    createGatePass: createGatePass,
    closeRgpReturn: closeRgpReturn,
    listGatePasses: listGatePasses,
    recordGateMovement: recordGateMovement,
    listGateMovements: listGateMovements
  };

})();
