/**
 * BALSONS SAFETY PORTAL - MASTER API CONTROLLER
 * Google Apps Script Web App Gateway
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

var SAFETY_CONFIG = {
  PROJECT_ID: 'PRJ-JTRWF-SCHULER',
  PORTAL_NAME: 'BALSONS Safety Manager & Work Authorisation Portal',
  VERSION: '1.0.0-sam2026',
  ENV: 'production',
  DEFAULT_SPREADSHEET_ID: '1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0',

  getSpreadsheetId: function() {
    return PropertiesService.getScriptProperties().getProperty('SAFETY_SPREADSHEET_ID') || this.DEFAULT_SPREADSHEET_ID;
  }
};

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'health';
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    status: 200,
    system: SAFETY_CONFIG.PORTAL_NAME,
    version: SAFETY_CONFIG.VERSION,
    action: action,
    project: SAFETY_CONFIG.PROJECT_ID,
    serverTimestamp: new Date().toISOString(),
    statusMessage: 'BALSONS Safety Manager & Work Authorisation Gateway Operational'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var startTime = new Date().getTime();
  var request = {};

  try {
    if (e && e.postData && e.postData.contents) {
      request = JSON.parse(e.postData.contents);
    }
  } catch (parseErr) {
    return createJsonResponse({
      success: false,
      status: 400,
      error: { code: 'INVALID_JSON_BODY', message: parseErr.message }
    });
  }

  var action = request.action || 'system.ping';
  var payload = request.payload || {};
  var actor = request.actor || null;
  var responseData = {};

  try {
    switch (action) {
      case 'system.ping':
        responseData = {
          message: 'BALSONS Safety Gateway Active',
          version: SAFETY_CONFIG.VERSION,
          environment: SAFETY_CONFIG.ENV
        };
        break;

      case 'db.init':
        return createJsonResponse({
          success: false,
          status: 403,
          requestId: requestId,
          action: action,
          error: { code: 'ROUTE_DISABLED', message: 'Database initialization via public web API is disabled for security. Execute manually from Apps Script IDE.' }
        });

      case 'auth.login':
        responseData = AuthService.login(payload.username, payload.password);
        break;

      case 'dashboard.stats':
        responseData = SafetyService.getDashboardStats();
        break;

      // PTW LifeCycle
      case 'ptw.list':
        responseData = { permits: PtwService.getPermits(payload.filter || 'ALL') };
        break;

      case 'ptw.create':
        var createdPtw = PtwService.createPermit(payload, actor);
        responseData = { permit: createdPtw, message: 'Permit submitted for verification.' };
        break;

      case 'ptw.verify':
        responseData = PtwService.verifyPermit(payload.permitId, payload.verificationData || {}, actor);
        break;

      case 'ptw.approve':
        responseData = PtwService.approvePermit(payload.permitId, payload.approvalData || {}, actor);
        break;

      case 'ptw.reject':
        responseData = PtwService.rejectPermit(payload.permitId, payload.rejectionData || {}, actor);
        break;

      case 'ptw.close':
        responseData = PtwService.closePermit(payload.permitId, payload.closureData || {}, actor);
        break;

      // TBT
      case 'tbt.list':
        responseData = { tbts: SafetyService.getTbts() };
        break;

      case 'tbt.create':
        var createdTbt = SafetyService.createTbt(payload, actor);
        responseData = { tbt: createdTbt, message: 'Toolbox Talk successfully recorded.' };
        break;

      // Inspections
      case 'inspection.list':
        responseData = { inspections: SafetyService.getInspections() };
        break;

      case 'inspection.create':
        var createdInsp = SafetyService.createInspection(payload, actor);
        responseData = { inspection: createdInsp, message: 'Inspection successfully logged.' };
        break;

      // Heavy Lifting Safety
      case 'lifting.list':
        responseData = { liftingPlans: SafetyService.getLiftingPlans() };
        break;

      case 'lifting.create':
        var createdLift = SafetyService.createLiftingPlan(payload, actor);
        responseData = { liftingPlan: createdLift, message: 'Lifting plan verified and registered.' };
        break;

      // Hazards & Incidents
      case 'hazard.list':
        responseData = { hazards: SafetyService.getHazards() };
        break;

      case 'hazard.create':
        var createdHaz = SafetyService.createHazard(payload, actor);
        responseData = { hazard: createdHaz, message: 'Hazard successfully recorded.' };
        break;

      case 'incident.list':
        responseData = { incidents: SafetyService.getIncidents() };
        break;

      case 'incident.create':
        var createdInc = SafetyService.createIncident(payload, actor);
        responseData = { incident: createdInc, message: 'Incident report filed and logged.' };
        break;

      // CAPA
      case 'capa.list':
        responseData = { capas: SafetyService.getCapas() };
        break;

      case 'capa.update':
        responseData = SafetyService.updateCapa(payload.capaId, payload, actor);
        break;

      // Reports
      case 'reports.generateDSR':
        responseData = { dsr: SafetyService.generateDSR(payload.date) };
        break;

      case 'audit.list':
        responseData = { auditLogs: AuditService.getAuditLogs(payload.limit || 50) };
        break;

      // ─── GOOGLE DRIVE MASTER STORAGE (SAM-2026 TIER 4) ────────────────
      case 'drive.get_map':
        responseData = {
          rootFolderId: BALSONS_DRIVE_CONFIG.ROOT_FOLDER_ID,
          portalCode: '05_SAFETY_AND_RISK_MANAGER',
          folders: BALSONS_DRIVE_CONFIG.STRUCTURE['05_SAFETY_AND_RISK_MANAGER'] || {}
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
          '05_SAFETY_AND_RISK_MANAGER',
          payload.categoryCode || '01_PERMIT_TO_WORK_PTW',
          payload.subCategory || 'HOT_WORK_PERMITS',
          blob,
          payload.fileName
        );
        break;

      default:
        return createJsonResponse({
          success: false,
          status: 404,
          error: { code: 'UNKNOWN_ACTION', message: 'Action not supported: ' + action }
        });
    }

    var processingTime = new Date().getTime() - startTime;
    return createJsonResponse({
      success: true,
      status: 200,
      data: responseData,
      meta: {
        action: action,
        processingTimeMs: processingTime,
        timestamp: new Date().toISOString()
      }
    });

  } catch (serviceErr) {
    Logger.log('Service Error: ' + serviceErr.stack);
    return createJsonResponse({
      success: false,
      status: 500,
      error: {
        code: 'EXECUTION_ERROR',
        message: serviceErr.message || 'Internal Server Error'
      }
    });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
