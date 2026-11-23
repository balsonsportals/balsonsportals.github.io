/**
 * BALSONS JTRWF GATE ENTRY & SITE ACCESS PORTAL
 * Apps Script Backend API — Master Dispatcher
 * Architecture: BALSONS-SAM-2026 (Locked)
 */

const CONFIG = {
  PROJECT_ID: 'PRJ-JTRWF-SCHULER',
  SYSTEM_NAME: 'BALSONS JTRWF Gate Entry & Site Access Portal',
  VERSION: '1.5.0-transactions',
  ENV: 'production',
  DEFAULT_SPREADSHEET_ID: '1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o',
  
  getSpreadsheetId: function() {
    return PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || this.DEFAULT_SPREADSHEET_ID;
  }
};

/**
 * Handle HTTP GET Requests (Public Health Check & Gateway Info)
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'health';
  var response = {
    success: true,
    status: 200,
    system: CONFIG.SYSTEM_NAME,
    version: CONFIG.VERSION,
    action: action,
    serverTimestamp: new Date().toISOString(),
    message: 'BALSONS Apps Script API Gateway is ACTIVE'
  };

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle HTTP POST Requests (Authenticated API Endpoints)
 * Bypasses browser CORS OPTIONS preflight by consuming text/plain JSON payloads
 */
function doPost(e) {
  var startTime = new Date().getTime();
  var rawContent = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
  var request = {};
  
  try {
    request = JSON.parse(rawContent);
  } catch (err) {
    return createJsonResponse({
      success: false,
      status: 400,
      error: { code: 'INVALID_JSON', message: 'Malformed JSON payload: ' + err.message }
    });
  }

  var action = request.action || 'system.ping';
  var requestId = request.requestId || 'req_' + startTime;
  var authToken = request.authToken || '';
  var payload = request.payload || {};

  // Public Actions (No Auth Required)
  var PUBLIC_ACTIONS = [
    'system.public_ping', 'system.ping', 'auth.login',
    'drive.get_map', 'drive.upload_document', 'drive.seed_all_portal_folders', 'drive.sync_portal_registry', 'contractor.list', 'personnel.list', 'equipment.list', 'vehicle.list'
  ];
  
  var session = null;
  if (PUBLIC_ACTIONS.indexOf(action) === -1) {
    session = AuthService.validateSession(authToken);
    if (!session) {
      return createJsonResponse({
        success: false,
        status: 401,
        requestId: requestId,
        action: action,
        error: { code: 'AUTH_REQUIRED', message: 'Session expired or unauthorized. Please log in.' }
      });
    }
  }

  // Action Dispatcher
  var responseData = {};
  try {
    switch (action) {
      case 'system.public_ping':
      case 'system.ping':
        responseData = {
          message: 'Transport Handshake Active.',
          clientTimestamp: request.timestamp || null,
          transportProtocol: 'POST / text/plain (CORS preflight-safe)',
          environment: CONFIG.ENV
        };
        break;

      case 'system.db_probe':
        var ssId = CONFIG.getSpreadsheetId();
        var sheetCount = 0;
        var sheetNames = [];
        var statusMsg = 'Database not linked.';
        if (ssId) {
          try {
            var ss = SpreadsheetApp.openById(ssId);
            var sheets = ss.getSheets();
            sheetCount = sheets.length;
            sheetNames = sheets.map(function(s) { return s.getName(); });
            statusMsg = 'Connected to: ' + ss.getName() + ' (' + sheetCount + ' sheets found)';
          } catch (dbErr) {
            statusMsg = 'Database connection error: ' + dbErr.message;
          }
        }
        responseData = {
          databaseLinked: Boolean(ssId && sheetCount > 0),
          spreadsheetId: ssId,
          sheetCount: sheetCount,
          sheetNames: sheetNames,
          statusMessage: statusMsg
        };
        break;

      // ─── AUTHENTICATION ROUTES ──────────────────────────────────────────
      case 'auth.login':
        responseData = AuthService.login(payload.username, payload.password);
        break;

      case 'auth.validate_session':
        responseData = { valid: true, user: session };
        break;

      case 'auth.logout':
        responseData = AuthService.logout(authToken);
        break;

      // ─── MASTER DATA ROUTES (PHASE 3) ──────────────────────────────────
      // Contractors
      case 'contractor.list':
        responseData = MasterDataService.listContractors();
        break;
      case 'contractor.add':
        responseData = MasterDataService.addContractor(payload, session);
        break;

      // Personnel (JGE-007)
      case 'personnel.list':
        responseData = MasterDataService.listPersonnel(payload.contractorId);
        break;
      case 'personnel.add':
        responseData = MasterDataService.addPersonnel(payload, session);
        break;

      // Equipment & Cranes
      case 'equipment.list':
        responseData = MasterDataService.listEquipment();
        break;
      case 'equipment.add':
        responseData = MasterDataService.addEquipment(payload, session);
        break;

      // Vehicles & Drivers
      case 'vehicle.list':
        responseData = MasterDataService.listVehicles();
        break;
      case 'vehicle.add':
        responseData = MasterDataService.addVehicle(payload, session);
        break;

      // ─── 9-DISCIPLINE CLEARANCE ENGINE (PHASE 4) ──────────────────────
      case 'clearance.evaluate':
        responseData = ClearanceEngine.evaluatePersonnel(payload, session);
        break;
      case 'clearance.override':
        responseData = ClearanceEngine.applyOverride(payload, session);
        break;
      case 'clearance.list':
        responseData = ClearanceEngine.listRecentClearances(payload.limit);
        break;

      // ─── PHYSICAL GATE TRANSACTIONS & PASS CENTER (PHASE 5) ──────────
      // Material Inward (PO / DC)
      case 'transaction.inward.create':
        responseData = GateTransactionService.createInward(payload, session);
        break;
      case 'transaction.inward.list':
        responseData = GateTransactionService.listInwards();
        break;
      case 'transaction.inward.update_status':
        responseData = GateTransactionService.updateInwardStatus(payload, session);
        break;

      // Gate Pass Center (RGP / NRGP)
      case 'transaction.gatepass.create':
        responseData = GateTransactionService.createGatePass(payload, session);
        break;
      case 'transaction.gatepass.close_return':
        responseData = GateTransactionService.closeRgpReturn(payload, session);
        break;
      case 'transaction.gatepass.list':
        responseData = GateTransactionService.listGatePasses();
        break;

      // Physical Gate Movement Log
      case 'transaction.movement.log':
        responseData = GateTransactionService.recordGateMovement(payload, session);
        break;
      case 'transaction.movement.list':
        responseData = GateTransactionService.listGateMovements(payload.limit);
        break;

      // ─── AUDIT TRAIL ──────────────────────────────────────────────────
      case 'audit.list':
        responseData = AuditService.listAuditLogs(payload.limit);
        break;

      // ─── GOOGLE DRIVE MASTER STORAGE (SAM-2026 TIER 4) ────────────────
      case 'drive.get_map':
        responseData = {
          rootFolderId: BALSONS_DRIVE_CONFIG.ROOT_FOLDER_ID,
          portalCode: '01_GATE_ENTRY_MANAGER',
          folders: BALSONS_DRIVE_CONFIG.STRUCTURE['01_GATE_ENTRY_MANAGER'] || {}
        };
        break;

      case 'drive.upload_document':
        if (!payload.fileBase64 || !payload.fileName) {
          throw new Error('Mandatory: fileBase64 and fileName required for Drive storage.');
        }
        var blob = Utilities.newBlob(
          Utilities.base64Decode(payload.fileBase64),
          payload.mimeType || 'application/pdf',
          payload.fileName
        );
        responseData = savePortalDocument(
          '01_GATE_ENTRY_MANAGER',
          payload.categoryCode || '01_GATE_PASSES',
          payload.subCategory || 'RETURNABLE_GATE_PASSES_RGP',
          blob,
          payload.fileName
        );
        AuditService.logAction(session, 'UPLOAD_DRIVE_DOCUMENT', responseData.fileId, 'SUCCESS',
          'Saved document ' + payload.fileName + ' to Drive: ' + responseData.url);
        break;

      default:
        return createJsonResponse({
          success: false,
          status: 404,
          requestId: requestId,
          action: action,
          error: { code: 'UNKNOWN_ACTION', message: 'Action not recognized: ' + action }
        });
    }

    return createJsonResponse({
      success: true,
      status: 200,
      requestId: requestId,
      action: action,
      serverTimestamp: new Date().toISOString(),
      durationMs: (new Date().getTime() - startTime),
      data: responseData
    });

  } catch (execErr) {
    return createJsonResponse({
      success: false,
      status: 500,
      requestId: requestId,
      action: action,
      error: { code: 'SERVER_EXCEPTION', message: execErr.message }
    });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
