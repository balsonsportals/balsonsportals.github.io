/**
 * BALSONS OPERATIONS MANAGER - MASTER API CONTROLLER
 * Google Apps Script Web App Gateway
 * Architecture: BALSONS-SAM-2026 (Locked Baseline V7.2)
 * Dedicated Project Spreadsheet: 1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E
 * Script ID: 1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 * Brand: "Difficult We Do Easily, Impossible Takes Little Time...!"
 */

var OPS_CONFIG = {
  PROJECT_ID: 'PRJ-JTRWF-SCHULER',
  PORTAL_NAME: 'BALSONS Operations & Heavy Rigging Manager',
  VERSION: '7.2.0-ops-sam2026',
  ENV: 'production',
  DEFAULT_SPREADSHEET_ID: '1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E',
  SCRIPT_ID: '1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny',

  getSpreadsheetId: function() {
    return PropertiesService.getScriptProperties().getProperty('OPS_SPREADSHEET_ID') || this.DEFAULT_SPREADSHEET_ID;
  }
};

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'health';
  var workspace = (e && e.parameter && e.parameter.workspace) ? e.parameter.workspace : 'ALL';

  var responseData = {};

  try {
    switch (action) {
      case 'health':
        responseData = {
          success: true,
          status: 200,
          system: OPS_CONFIG.PORTAL_NAME,
          version: OPS_CONFIG.VERSION,
          project: OPS_CONFIG.PROJECT_ID,
          spreadsheetId: OPS_CONFIG.getSpreadsheetId(),
          scriptId: OPS_CONFIG.SCRIPT_ID,
          timestamp: new Date().toISOString(),
          statusMessage: 'BALSONS Operations Dedicated API Gateway Operational'
        };
        break;

      case 'workPackages':
      case 'getWorkPackages':
        responseData = { 
          success: true, 
          workspace: workspace, 
          packages: OperationsService.getWorkPackages(workspace) 
        };
        responseData.count = responseData.packages.length;
        break;

      case 'shiftLogs':
      case 'getShiftLogs':
        responseData = { 
          success: true, 
          logs: OperationsService.getShiftLogs() 
        };
        responseData.count = responseData.logs.length;
        break;

      case 'manpower':
      case 'getManpower':
        responseData = { 
          success: true, 
          manpower: OperationsService.getManpowerRoster() 
        };
        responseData.count = responseData.manpower.length;
        break;

      case 'initDb':
        responseData = initOperationsDatabase(OPS_CONFIG.getSpreadsheetId());
        break;

      // ─── GOOGLE DRIVE MASTER STORAGE (SAM-2026 TIER 4) ────────────────
      case 'drive.get_map':
        responseData = {
          success: true,
          rootFolderId: BALSONS_DRIVE_CONFIG.ROOT_FOLDER_ID,
          portalCode: '03_OPERATIONS_AND_RIGGING_MANAGER',
          folders: BALSONS_DRIVE_CONFIG.STRUCTURE['03_OPERATIONS_AND_RIGGING_MANAGER'] || {}
        };
        break;

      case 'drive.upload_document':
        if (!payload.fileBase64 || !payload.fileName) {
          throw new Error('Mandatory: fileBase64 and fileName required for Drive storage.');
        }
        var blob = Utilities.newBlob(
          Utilities.base64Decode(payload.fileBase64),
          payload.mimeType || 'text/html',
          payload.fileName
        );
        responseData = savePortalDocument(
          '03_OPERATIONS_AND_RIGGING_MANAGER',
          payload.categoryCode || '01_WORK_PACKAGE_DOSSIERS',
          payload.subCategory || '360_COMPLETION_DOSSIERS',
          blob,
          payload.fileName
        );
        break;

      default:
        responseData = { 
          success: false, 
          error: 'UNKNOWN_ACTION', 
          message: 'Action ' + action + ' is not recognized by Operations Gateway.' 
        };
    }
  } catch (err) {
    responseData = {
      success: false,
      error: 'EXECUTION_EXCEPTION',
      message: err.toString(),
      stack: err.stack || ''
    };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var responseData = {};

  try {
    var rawData = e.postData ? e.postData.contents : null;
    var payload = rawData ? JSON.parse(rawData) : {};
    var action = payload.action || (e && e.parameter && e.parameter.action) || 'saveWorkPackage';

    switch (action) {
      case 'saveWorkPackage':
        responseData = OperationsService.saveWorkPackage(payload.data || payload);
        break;

      case 'saveShiftLog':
        responseData = OperationsService.saveShiftLog(payload.data || payload);
        break;

      case 'updateStatus':
        responseData = OperationsService.updateWorkPackageStatus(
          payload.id || payload.packageId, 
          payload.status, 
          payload.actor || 'SUPER_ADMIN'
        );
        break;

      case 'syncAll':
        responseData = OperationsService.syncBatch(payload.records || []);
        break;

      case 'logAudit':
        responseData = OperationsService.recordAudit(payload.entry || payload);
        break;

      default:
        responseData = { 
          success: false, 
          error: 'UNKNOWN_POST_ACTION', 
          message: 'Post action ' + action + ' is not recognized.' 
        };
    }
  } catch (err) {
    responseData = {
      success: false,
      error: 'POST_PROCESSING_ERROR',
      message: err.toString(),
      stack: err.stack || ''
    };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}
