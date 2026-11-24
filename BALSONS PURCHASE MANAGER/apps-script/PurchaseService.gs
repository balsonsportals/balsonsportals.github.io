/**
 * BALSONS PURCHASE MANAGER - CLASP CLOUD API GATEWAY & SYNCHRONIZATION ENGINE
 * File: PurchaseService.gs
 * Dedicated Google Spreadsheet: 1ANnu4X2dR0EITq5RvkyfMv1Xfz30Ba26IKjc40uyj_c
 * Dedicated Apps Script Script ID: 1BPmt-vDa-pBy07quE1wq7FY6kq8VnQJPUNIx1GrlSBD5UO9v3FflrZZN
 * Governing Policy: BAL-PROC-E2E-006 (V6.0 Procurement Baseline)
 * Enterprise Standard: SAM-2026 / BEDS V1.0 / JTRWF Khordha
 */

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'GET_ALL_DATA';
  var targetSsId = (e && e.parameter && e.parameter.ssId) ? e.parameter.ssId : null;

  try {
    if (action === 'INIT_DATABASE') {
      var initResult = initPurchaseDatabase(targetSsId);
      return jsonResponse({ success: true, message: 'Database initialized successfully', details: initResult });
    }

    if (action === 'PING') {
      return jsonResponse({
        success: true,
        service: 'BALSONS_PURCHASE_SERVICE',
        version: '6.0',
        spreadsheetId: getSpreadsheetId(targetSsId),
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'GET_ALL_DATA') {
      var allData = fetchAllPurchaseData(targetSsId);
      return jsonResponse({ success: true, data: allData });
    }

    if (action === 'GET_PRS') {
      var prData = fetchSheetRowsAsObjects('PR_HEADER', targetSsId);
      var lineData = fetchSheetRowsAsObjects('PR_LINES', targetSsId);
      return jsonResponse({ success: true, prHeaders: prData, prLines: lineData });
    }

    if (action === 'GET_POS') {
      var poData = fetchSheetRowsAsObjects('PO_HEADER', targetSsId);
      var poLines = fetchSheetRowsAsObjects('PO_LINES', targetSsId);
      return jsonResponse({ success: true, poHeaders: poData, poLines: poLines });
    }

    if (action === 'GET_SUPPLIERS') {
      var suppliers = fetchSheetRowsAsObjects('SUPPLIER_DIRECTORY', targetSsId);
      return jsonResponse({ success: true, suppliers: suppliers });
    }

    return jsonResponse({ success: false, error: 'Unknown GET action: ' + action });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString(), stack: err.stack });
  }
}

function doPost(e) {
  try {
    var rawPost = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var payload = JSON.parse(rawPost);
    var action = payload.action;
    var targetSsId = payload.ssId || null;

    if (!action) {
      return jsonResponse({ success: false, error: 'Missing action in POST body' });
    }

    if (action === 'SAVE_PR') {
      return handleSavePR(payload.data, payload.actor, targetSsId);
    }

    if (action === 'APPROVE_PR') {
      return handleApprovePR(payload.prId, payload.actor, targetSsId);
    }

    if (action === 'SAVE_RFQ') {
      return handleSaveRFQ(payload.data, payload.actor, targetSsId);
    }

    if (action === 'SAVE_QUOTE') {
      return handleSaveQuote(payload.data, payload.actor, targetSsId);
    }

    if (action === 'GENERATE_CS') {
      return handleGenerateCS(payload.data, payload.actor, targetSsId);
    }

    if (action === 'APPROVE_CS_AWARD') {
      return handleApproveCSAward(payload.csId, payload.awardData, payload.actor, targetSsId);
    }

    if (action === 'GENERATE_PO') {
      return handleGeneratePO(payload.data, payload.actor, targetSsId);
    }

    if (action === 'LOG_DELIVERY_ASN') {
      return handleLogASN(payload.data, payload.actor, targetSsId);
    }

    if (action === 'SYNC_BATCH') {
      return handleSyncBatch(payload.mutations, payload.actor, targetSsId);
    }

    // ─── GOOGLE DRIVE MASTER STORAGE (SAM-2026 TIER 4) ────────────────
    if (action === 'drive.get_map') {
      return jsonResponse({
        success: true,
        rootFolderId: BALSONS_DRIVE_CONFIG.ROOT_FOLDER_ID,
        portalCode: '04_PURCHASE_AND_COMMERCIAL_MANAGER',
        folders: BALSONS_DRIVE_CONFIG.STRUCTURE['04_PURCHASE_AND_COMMERCIAL_MANAGER'] || {}
      });
    }

    if (action === 'drive.upload_document') {
      if (!payload.fileBase64 || !payload.fileName) {
        return jsonResponse({ success: false, error: 'Mandatory: fileBase64 and fileName required for Drive storage.' });
      }
      var blob = Utilities.newBlob(
        Utilities.base64Decode(payload.fileBase64),
        payload.mimeType || 'text/html',
        payload.fileName
      );
      var res = savePortalDocument(
        '04_PURCHASE_AND_COMMERCIAL_MANAGER',
        payload.categoryCode || '04_PURCHASE_ORDERS_PO',
        payload.subCategory || 'FORMAL_SIGNED_POS',
        blob,
        payload.fileName
      );
      return jsonResponse(res);
    }

    return jsonResponse({ success: false, error: 'Unknown POST action: ' + action });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString(), stack: err.stack });
  }
}

// -----------------------------------------------------------------------------
// DATA FETCHERS & HELPERS
// -----------------------------------------------------------------------------

function getSpreadsheetId(paramSsId) {
  return paramSsId || PropertiesService.getScriptProperties().getProperty('PURCHASE_SPREADSHEET_ID') || PURCHASE_DEFAULT_SS_ID;
}

function fetchAllPurchaseData(paramSsId) {
  return {
    config: fetchSheetRowsAsObjects('SYSTEM_CONFIG', paramSsId),
    prHeaders: fetchSheetRowsAsObjects('PR_HEADER', paramSsId),
    prLines: fetchSheetRowsAsObjects('PR_LINES', paramSsId),
    rfqHeaders: fetchSheetRowsAsObjects('RFQ_HEADER', paramSsId),
    rfqLines: fetchSheetRowsAsObjects('RFQ_LINES', paramSsId),
    quotes: fetchSheetRowsAsObjects('QUOTE_HEADER', paramSsId),
    quoteLines: fetchSheetRowsAsObjects('QUOTE_LINES', paramSsId),
    csList: fetchSheetRowsAsObjects('COMPARATIVE_STATEMENT', paramSsId),
    poHeaders: fetchSheetRowsAsObjects('PO_HEADER', paramSsId),
    poLines: fetchSheetRowsAsObjects('PO_LINES', paramSsId),
    asnList: fetchSheetRowsAsObjects('DELIVERY_TRACKING_ASN', paramSsId),
    suppliers: fetchSheetRowsAsObjects('SUPPLIER_DIRECTORY', paramSsId),
    syncTimestamp: new Date().toISOString()
  };
}

function fetchSheetRowsAsObjects(sheetName, paramSsId) {
  var ssId = getSpreadsheetId(paramSsId);
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var headers = data[0];
  var rows = [];

  for (var r = 1; r < data.length; r++) {
    var rowObj = {};
    for (var c = 0; c < headers.length; c++) {
      var val = data[r][c];
      if (val instanceof Date) {
        val = val.toISOString();
      }
      rowObj[headers[c]] = val;
    }
    rows.push(rowObj);
  }

  return rows;
}

// -----------------------------------------------------------------------------
// POST HANDLERS
// -----------------------------------------------------------------------------

function handleSavePR(prData, actor, targetSsId) {
  var ssId = getSpreadsheetId(targetSsId);
  var ss = SpreadsheetApp.openById(ssId);
  var headerSheet = ss.getSheetByName('PR_HEADER');
  var linesSheet = ss.getSheetByName('PR_LINES');

  if (!headerSheet || !linesSheet) {
    return jsonResponse({ success: false, error: 'PR sheets missing. Run database initialization first.' });
  }

  var now = new Date().toISOString();
  var prId = prData.prId || ('PR-2026-' + padNumber(headerSheet.getLastRow(), 3));
  var prDisplay = 'BAL/JTRWF/PR/2026/' + padNumber(headerSheet.getLastRow(), 3);

  // Append PR Header
  var headerRow = [
    prId,
    prDisplay,
    now,
    actor ? actor.username : 'buyer',
    actor ? actor.name : 'Procurement Buyer',
    prData.department || 'Heavy Erection',
    prData.projectId || 'JTRWF-KHORDHA',
    prData.costCenter || 'CC-SITE-GEN',
    prData.priority || 'NORMAL',
    prData.needByDate || '',
    prData.deliveryLocation || 'Central Site Store',
    prData.businessPurpose || '',
    prData.justification || '',
    prData.attachmentUrls || '',
    'SUBMITTED',
    '',
    '',
    parseFloat(prData.estimatedTotal || 0),
    0,
    'STAGE_02_PR_VALIDATION',
    now,
    now
  ];
  headerSheet.appendRow(headerRow);

  // Append PR Lines
  if (Array.isArray(prData.lines)) {
    prData.lines.forEach(function(line, idx) {
      var lineId = prId + '-' + padNumber(idx + 1, 2);
      var lineRow = [
        lineId,
        prId,
        line.itemCode || 'ITEM-GEN',
        line.itemDescription || '',
        line.category || 'CONSUMABLES',
        line.technicalSpec || '',
        'REV-0',
        line.makePreference || '',
        line.drawingNo || '',
        parseFloat(line.requestedQty || 1),
        parseFloat(line.requestedQty || 1),
        0.000,
        0.000,
        0.000,
        parseFloat(line.requestedQty || 1),
        line.uom || 'NOS',
        line.needByDate || prData.needByDate || '',
        prData.deliveryLocation || 'Central Site Store',
        line.inspectionCriteria || 'Standard Visual',
        line.form11Required === true,
        line.preferredVendor || '',
        'PENDING_APPROVAL',
        line.remarks || '',
        now
      ];
      linesSheet.appendRow(lineRow);
    });
  }

  logAuditTrail(ss, actor, 'PR_CREATED', 'PR_HEADER', prId, 'Created new PR ' + prDisplay);

  return jsonResponse({
    success: true,
    prId: prId,
    prDisplayNo: prDisplay,
    timestamp: now
  });
}

function handleApprovePR(prId, actor, targetSsId) {
  var ssId = getSpreadsheetId(targetSsId);
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName('PR_HEADER');
  if (!sheet) return jsonResponse({ success: false, error: 'PR_HEADER sheet not found' });

  var data = sheet.getDataRange().getValues();
  var found = false;
  var now = new Date().toISOString();

  for (var r = 1; r < data.length; r++) {
    if (data[r][0] === prId) {
      sheet.getRange(r + 1, 15).setValue('HOD_APPROVED'); // APPROVAL_STATUS
      sheet.getRange(r + 1, 16).setValue(actor ? actor.username : 'hod'); // HOD_APPROVER
      sheet.getRange(r + 1, 17).setValue(now); // HOD_APPROVED_AT
      sheet.getRange(r + 1, 20).setValue('STAGE_04_SOURCING_STRATEGY'); // CURRENT_LIFECYCLE_STAGE
      sheet.getRange(r + 1, 21).setValue(now); // UPDATED_AT
      found = true;
      break;
    }
  }

  if (found) {
    logAuditTrail(ss, actor, 'PR_APPROVED', 'PR_HEADER', prId, 'HOD Approved PR ' + prId);
    return jsonResponse({ success: true, message: 'PR ' + prId + ' approved successfully' });
  }

  return jsonResponse({ success: false, error: 'PR ID ' + prId + ' not found' });
}

function handleGeneratePO(poData, actor, targetSsId) {
  var ssId = getSpreadsheetId(targetSsId);
  var ss = SpreadsheetApp.openById(ssId);
  var poHeaderSheet = ss.getSheetByName('PO_HEADER');
  var poLinesSheet = ss.getSheetByName('PO_LINES');

  if (!poHeaderSheet || !poLinesSheet) {
    return jsonResponse({ success: false, error: 'PO sheets missing' });
  }

  var now = new Date().toISOString();
  var poId = poData.poId || ('PO-2026-' + padNumber(poHeaderSheet.getLastRow(), 3));
  var poDisplay = 'BAL/JTRWF/PO/2026/' + padNumber(poHeaderSheet.getLastRow(), 3);

  var headerRow = [
    poId,
    poDisplay,
    0, // PO_REVISION
    poData.prId || '',
    poData.rfqId || '',
    poData.csId || '',
    poData.supplierId || '',
    poData.supplierName || '',
    poData.gstin || '',
    'BALSONS Heavy Lift & Shift, JTRWF Plant, Khordha, Odisha - 752054',
    'Central Rigging Store, JTRWF Plant, Khordha',
    now,
    poData.deliveryDate || '',
    poData.paymentTerms || '30 Days Net from Store GRN',
    poData.freightTerms || 'DAP Site Store Khordha',
    poData.warrantyTerms || '12 Months OEM Warranty',
    poData.specialConditions || 'Must be accompanied by Form 11 TPI load certificate',
    parseFloat(poData.totalTaxable || 0),
    parseFloat(poData.totalGst || 0),
    parseFloat(poData.grandTotal || 0),
    0.00,
    poData.doaTier || 'DOA_TIER_1',
    actor ? actor.username : 'admin.purchase',
    '',
    '',
    poData.pdfUrl || '',
    'DISPATCHED',
    false,
    '',
    now,
    now
  ];
  poHeaderSheet.appendRow(headerRow);

  if (Array.isArray(poData.lines)) {
    poData.lines.forEach(function(line, idx) {
      var lineId = poId + '-' + padNumber(idx + 1, 2);
      var lineRow = [
        lineId,
        poId,
        line.prLineId || '',
        poData.prId || '',
        line.itemCode || '',
        line.itemDescription || '',
        line.technicalSpec || '',
        parseFloat(line.orderedQty || 1),
        line.uom || 'NOS',
        parseFloat(line.unitRate || 0),
        parseFloat(line.discount || 0),
        parseFloat(line.taxableAmount || 0),
        parseFloat(line.gstRate || 18.0),
        parseFloat(line.gstAmount || 0),
        parseFloat(line.totalLanded || 0),
        line.deliveryDate || poData.deliveryDate || '',
        0.000,
        0.000,
        0.000,
        parseFloat(line.orderedQty || 1),
        'DISPATCHED_IN_TRANSIT'
      ];
      poLinesSheet.appendRow(lineRow);
    });
  }

  logAuditTrail(ss, actor, 'PO_ISSUED', 'PO_HEADER', poId, 'Generated and dispatched official PO ' + poDisplay);

  return jsonResponse({
    success: true,
    poId: poId,
    poDisplayNo: poDisplay,
    grandTotal: poData.grandTotal,
    timestamp: now
  });
}

function handleLogASN(asnData, actor, targetSsId) {
  var ssId = getSpreadsheetId(targetSsId);
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName('DELIVERY_TRACKING_ASN');
  if (!sheet) return jsonResponse({ success: false, error: 'DELIVERY_TRACKING_ASN sheet not found' });

  var now = new Date().toISOString();
  var asnId = 'ASN-2026-' + padNumber(sheet.getLastRow(), 3);

  var row = [
    asnId,
    asnData.poId || '',
    asnData.supplierId || '',
    asnData.dispatchDate || now,
    asnData.transporterName || 'Direct Courier',
    asnData.lrDocketNo || '',
    asnData.vehicleRegNo || '',
    asnData.expectedArrivalDate || '',
    'GATE-ASN-' + padNumber(sheet.getLastRow(), 3),
    'PENDING_ARRIVAL',
    'IN_TRANSIT',
    true
  ];
  sheet.appendRow(row);

  logAuditTrail(ss, actor, 'ASN_LOGGED', 'DELIVERY_TRACKING_ASN', asnId, 'Advance Shipping Notice registered for PO ' + asnData.poId);

  return jsonResponse({ success: true, asnId: asnId, timestamp: now });
}

function handleSyncBatch(mutations, actor, targetSsId) {
  if (!Array.isArray(mutations)) {
    return jsonResponse({ success: false, error: 'mutations must be an array' });
  }

  var results = [];
  mutations.forEach(function(mut) {
    if (mut.action === 'SAVE_PR') {
      results.push(handleSavePR(mut.data, actor, targetSsId));
    } else if (mut.action === 'APPROVE_PR') {
      results.push(handleApprovePR(mut.prId, actor, targetSsId));
    } else if (mut.action === 'GENERATE_PO') {
      results.push(handleGeneratePO(mut.data, actor, targetSsId));
    } else if (mut.action === 'LOG_DELIVERY_ASN') {
      results.push(handleLogASN(mut.data, actor, targetSsId));
    }
  });

  return jsonResponse({ success: true, processedCount: results.length, results: results });
}

function logAuditTrail(ss, actor, actionType, targetEntity, entityId, notes) {
  try {
    var sheet = ss.getSheetByName('AUDIT_LOG_TRAIL');
    if (!sheet) return;

    var auditId = 'AUD-2026-' + padNumber(sheet.getLastRow(), 4);
    var row = [
      auditId,
      new Date().toISOString(),
      actor ? actor.username : 'SYSTEM',
      actor ? actor.role : 'System Automated',
      actionType,
      targetEntity,
      entityId,
      '',
      notes || '',
      '127.0.0.1',
      'HASH-' + Math.floor(Math.random() * 89999 + 10000)
    ];
    sheet.appendRow(row);
  } catch (e) {
    Logger.log('Audit log failure: ' + e);
  }
}

function padNumber(num, size) {
  var s = String(num);
  while (s.length < (size || 2)) { s = '0' + s; }
  return s;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
