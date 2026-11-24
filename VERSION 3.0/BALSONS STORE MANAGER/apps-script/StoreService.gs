/**
 * BALSONS STORE MANAGER - STORE SERVICE & BUSINESS LOGIC
 * Architecture: BALSONS-SAM-2026
 * Dedicated Project Spreadsheet: 1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ
 */

var StoreService = {
  getSpreadsheet: function() {
    var ssId = PropertiesService.getScriptProperties().getProperty('STORE_SPREADSHEET_ID') || STORE_DEFAULT_SS_ID;
    return SpreadsheetApp.openById(ssId);
  },

  getInventory: function(section) {
    var ss = this.getSpreadsheet();
    var sheet = ss.getSheetByName('INVENTORY_MASTER');
    if (!sheet) return [];
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];
    var headers = data[0];
    var items = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var item = {
        id: row[0],
        section: row[1],
        sectionName: row[2],
        type: row[3],
        desc: row[4],
        spec: row[5],
        capacity: row[6],
        make: row[7],
        model: row[8],
        isLifting: (row[9] === 'YES' || row[9] === true),
        form11Cert: row[10],
        lastInspection: row[11],
        nextInspection: row[12],
        status: row[13],
        binLocation: row[14],
        issuedTo: row[15],
        issuedDate: row[16],
        condition: row[17]
      };
      if (!section || section === 'ALL' || item.section === section) {
        items.push(item);
      }
    }
    return items;
  },

  getForm11Register: function() {
    var ss = this.getSpreadsheet();
    var sheet = ss.getSheetByName('FORM11_LIFTING_REGISTER');
    if (!sheet) return [];
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];
    var list = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      list.push({
        itemNo: row[0],
        toolId: row[1],
        desc: row[2],
        angle: row[3],
        proofLoad: row[4],
        lastInspection: row[5],
        nextInspection: row[6],
        certNumber: row[7],
        competentPerson: row[8],
        complianceStatus: row[9],
        remarks: row[10]
      });
    }
    return list;
  },

  getLoans: function() {
    var ss = this.getSpreadsheet();
    var sheet = ss.getSheetByName('TOOL_LOANS_REGISTER');
    if (!sheet) return [];
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];
    var list = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      list.push({
        txId: row[0],
        toolId: row[1],
        toolDesc: row[2],
        empId: row[3],
        empName: row[4],
        empTrade: row[5],
        dept: row[6],
        area: row[7],
        issueDate: row[8],
        expectedReturn: row[9],
        actualReturn: row[10],
        status: row[11],
        purpose: row[12],
        conditionIssued: row[13],
        conditionReturned: row[14],
        issuedBy: row[15]
      });
    }
    return list;
  },

  getQuarantine: function() {
    var ss = this.getSpreadsheet();
    var sheet = ss.getSheetByName('QUARANTINE_RED_TAG_LOG');
    if (!sheet) return [];
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];
    var list = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      list.push({
        redTagId: row[0],
        toolId: row[1],
        toolDesc: row[2],
        quarantinedDate: row[3],
        quarantinedBy: row[4],
        defectCategory: row[5],
        defectDetail: row[6],
        actionTaken: row[7],
        resolution: row[8],
        status: row[9]
      });
    }
    return list;
  },

  getReceipts: function() {
    var ss = this.getSpreadsheet();
    var sheet = ss.getSheetByName('MRN_GRN_INWARD_REGISTER');
    if (!sheet) return [];
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];
    var list = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      list.push({
        grnNo: row[0],
        receiptDate: row[1],
        poNo: row[2],
        vendorName: row[3],
        challanNo: row[4],
        itemDesc: row[5],
        orderedQty: row[6],
        receivedQty: row[7],
        acceptedQty: row[8],
        rejectedQty: row[9],
        unit: row[10],
        inspectionStatus: row[11],
        inspectedBy: row[12],
        remarks: row[13]
      });
    }
    return list;
  },

  issueToolLoan: function(loan) {
    var ss = this.getSpreadsheet();
    var txSheet = ss.getSheetByName('TOOL_LOANS_REGISTER');
    var invSheet = ss.getSheetByName('INVENTORY_MASTER');

    // 1. Append Loan
    var newRow = [
      loan.txId || ('TX-JTRWF-2026-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'MMdd-HHmm')),
      loan.toolId,
      loan.toolDesc,
      loan.empId,
      loan.empName,
      loan.empTrade || 'Staff',
      loan.dept || 'Operations',
      loan.area || 'JTRWF Site',
      loan.issueDate || Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm'),
      loan.expectedReturn,
      '',
      'ACTIVE_LOAN',
      loan.purpose || 'Site Rigging Work',
      loan.conditionIssued || 'GOOD',
      '',
      loan.issuedBy || 'Store In-Charge'
    ];
    txSheet.appendRow(newRow);

    // 2. Update Tool Status in INVENTORY_MASTER
    var invData = invSheet.getDataRange().getValues();
    for (var i = 1; i < invData.length; i++) {
      if (invData[i][0] === loan.toolId) {
        invSheet.getRange(i + 1, 14).setValue('ISSUED'); // Status column
        invSheet.getRange(i + 1, 16).setValue(loan.empId + ' (' + loan.empName + ')'); // IssuedTo
        invSheet.getRange(i + 1, 17).setValue(loan.issueDate || Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd'));
        break;
      }
    }

    this.logAudit('LOAN_ISSUE', loan.toolId, 'SUCCESS', 'Tool issued to ' + loan.empName + ' (' + loan.empId + ')');
    return { success: true, txId: newRow[0], message: 'Tool issued successfully' };
  },

  returnToolLoan: function(txId, returnCondition, notes) {
    var ss = this.getSpreadsheet();
    var txSheet = ss.getSheetByName('TOOL_LOANS_REGISTER');
    var invSheet = ss.getSheetByName('INVENTORY_MASTER');
    var txData = txSheet.getDataRange().getValues();

    var toolId = '';
    var returnDate = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm');

    for (var i = 1; i < txData.length; i++) {
      if (txData[i][0] === txId) {
        toolId = txData[i][1];
        txSheet.getRange(i + 1, 11).setValue(returnDate); // ActualReturn
        txSheet.getRange(i + 1, 12).setValue('RETURNED'); // LoanStatus
        txSheet.getRange(i + 1, 15).setValue(returnCondition || 'GOOD'); // ConditionReturned
        break;
      }
    }

    if (toolId) {
      var invData = invSheet.getDataRange().getValues();
      for (var j = 1; j < invData.length; j++) {
        if (invData[j][0] === toolId) {
          var targetStatus = (returnCondition === 'DAMAGED') ? 'QUARANTINED' : 'AVAILABLE';
          invSheet.getRange(j + 1, 14).setValue(targetStatus);
          invSheet.getRange(j + 1, 16).setValue('');
          invSheet.getRange(j + 1, 17).setValue('');
          invSheet.getRange(j + 1, 18).setValue(returnCondition || 'GOOD');
          break;
        }
      }
    }

    this.logAudit('LOAN_RETURN', txId, 'SUCCESS', 'Tool returned in ' + returnCondition + ' condition');
    return { success: true, toolId: toolId, message: 'Tool returned successfully' };
  },

  tagRedQuarantine: function(tag) {
    var ss = this.getSpreadsheet();
    var qrSheet = ss.getSheetByName('QUARANTINE_RED_TAG_LOG');
    var invSheet = ss.getSheetByName('INVENTORY_MASTER');

    var newRow = [
      tag.redTagId || ('RED-TAG-2026-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'MMdd-HHmm')),
      tag.toolId,
      tag.toolDesc,
      tag.quarantinedDate || Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd'),
      tag.quarantinedBy || 'Safety Officer',
      tag.defectCategory || 'DEFECTIVE_COMPONENT',
      tag.defectDetail || '',
      tag.actionTaken || 'PHYSICAL RED TAG APPLIED',
      tag.resolution || 'Under Inspection',
      'HOLD_DEFECTIVE'
    ];
    qrSheet.appendRow(newRow);

    // Set Tool to QUARANTINED in INVENTORY_MASTER
    var invData = invSheet.getDataRange().getValues();
    for (var i = 1; i < invData.length; i++) {
      if (invData[i][0] === tag.toolId) {
        invSheet.getRange(i + 1, 14).setValue('QUARANTINED');
        break;
      }
    }

    this.logAudit('QUARANTINE_TAG', tag.toolId, 'WARNING', 'Tool tagged Red: ' + tag.defectCategory);
    return { success: true, redTagId: newRow[0] };
  },

  logAudit: function(action, entityRef, outcome, details) {
    try {
      var ss = this.getSpreadsheet();
      var auditSheet = ss.getSheetByName('AUDIT_LOG');
      if (!auditSheet) return;
      var timestamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
      auditSheet.appendRow([
        'AUD-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd-HHmmssSSS'),
        timestamp,
        'SYSTEM_API',
        'StoreGateway',
        action,
        entityRef,
        outcome,
        details
      ]);
    } catch (e) {
      Logger.log('Audit log err: ' + e.message);
    }
  }
};
