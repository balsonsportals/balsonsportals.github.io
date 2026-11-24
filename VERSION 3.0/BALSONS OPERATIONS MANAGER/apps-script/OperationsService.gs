/**
 * BALSONS OPERATIONS MANAGER - OPERATIONS SERVICE ENGINE
 * Architecture: BALSONS-SAM-2026 / BEDS V1.0 (Baseline V7.2)
 * Connects exclusively to dedicated Operations Sheet: 1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E
 * Governs: Work Packages, 8-State Lifecycles, Shift Logs, Manpower, Audit Ledger
 */

var OperationsService = {

  SHEET_NAMES: {
    WORK_PACKAGES: 'WORK_PACKAGES',
    SHIFT_LOGS: 'SHIFT_LOGS',
    MANPOWER_ROSTER: 'MANPOWER_ROSTER',
    AUDIT_LOG: 'AUDIT_LOG'
  },

  getSpreadsheet: function() {
    var id = OPS_CONFIG.getSpreadsheetId();
    if (!id) throw new Error('Operations Dedicated Spreadsheet ID is missing.');
    return SpreadsheetApp.openById(id);
  },

  getSheetSafe: function(sheetName) {
    var ss = this.getSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      this.initHeaders(sheet, sheetName);
    }
    return sheet;
  },

  initHeaders: function(sheet, sheetName) {
    var headers = [];
    if (sheetName === this.SHEET_NAMES.WORK_PACKAGES) {
      headers = [
        'PACKAGE_ID', 'TITLE', 'WORKSPACE', 'WORKSTREAM', 'ASSET_ID', 
        'STATUS', 'TARGET_DATE', 'CREW_SIZE', 'LEAD_SUPERVISOR', 
        'PROGRESS_PCT', 'CONSTRAINTS', 'EVIDENCE_URL', 'UPDATED_AT', 'CREATED_AT'
      ];
    } else if (sheetName === this.SHEET_NAMES.SHIFT_LOGS) {
      headers = [
        'LOG_ID', 'SHIFT', 'DATE', 'WORKSTREAM', 'LEAD_SUPERVISOR', 
        'CREW_PRESENT', 'ASSET_ID', 'SOW_PROGRESS_PCT', 'DAILY_MILESTONES', 
        'CONSTRAINTS', 'SAFETY_CLEARANCE', 'HANDOVER_NOTES', 'CREATED_AT'
      ];
    } else if (sheetName === this.SHEET_NAMES.MANPOWER_ROSTER) {
      headers = [
        'BADGE_NO', 'FULL_NAME', 'DESIGNATION', 'TRADE', 'MEDICAL_FITNESS', 
        'TPI_RIGGING_CERT', 'FORM11_QUALIFIED', 'INDUCTION_STATUS', 'CURRENT_DEPLOYMENT', 'STATE'
      ];
    } else if (sheetName === this.SHEET_NAMES.AUDIT_LOG) {
      headers = [
        'LOG_ID', 'TIMESTAMP', 'ACTOR', 'ROLE', 'ACTION', 'DETAILS', 'POLICY_SECTION'
      ];
    }

    if (headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#102a35')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
  },

  initDatabase: function() {
    var ss = this.getSpreadsheet();
    var names = [
      this.SHEET_NAMES.WORK_PACKAGES,
      this.SHEET_NAMES.SHIFT_LOGS,
      this.SHEET_NAMES.MANPOWER_ROSTER,
      this.SHEET_NAMES.AUDIT_LOG
    ];
    var initialized = [];

    for (var i = 0; i < names.length; i++) {
      var s = ss.getSheetByName(names[i]);
      if (!s) {
        s = ss.insertSheet(names[i]);
        this.initHeaders(s, names[i]);
        initialized.push(names[i]);
      }
    }

    return {
      success: true,
      message: 'Operations Database Initialized',
      spreadsheetId: ss.getId(),
      sheetsReady: names,
      newlyCreated: initialized
    };
  },

  getWorkPackages: function(workspaceFilter) {
    var sheet = this.getSheetSafe(this.SHEET_NAMES.WORK_PACKAGES);
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];

    var headers = data[0];
    var result = [];

    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[0]) continue;

      var pkg = {
        id: row[0],
        title: row[1] || '',
        workspace: row[2] || 'LINE-AXLE',
        workstream: row[3] || 'WS-UNLOAD',
        assetId: row[4] || '',
        status: row[5] || 'PLANNED',
        targetDate: row[6] ? String(row[6]) : '',
        crewSize: Number(row[7]) || 4,
        leadSupervisor: row[8] || '',
        progressPct: Number(row[9]) || 0,
        constraints: row[10] || '',
        evidenceUrl: row[11] || '',
        updatedAt: row[12] ? String(row[12]) : '',
        createdAt: row[13] ? String(row[13]) : ''
      };

      if (!workspaceFilter || workspaceFilter === 'ALL' || pkg.workspace === workspaceFilter) {
        result.push(pkg);
      }
    }

    return result;
  },

  saveWorkPackage: function(pkg) {
    if (!pkg || !pkg.id) throw new Error('Work Package must include a unique ID');

    var sheet = this.getSheetSafe(this.SHEET_NAMES.WORK_PACKAGES);
    var data = sheet.getDataRange().getValues();
    var rowIndex = -1;

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(pkg.id)) {
        rowIndex = i + 1;
        break;
      }
    }

    var now = new Date().toISOString();
    var rowData = [
      pkg.id,
      pkg.title || 'Untitled Work Package',
      pkg.workspace || 'LINE-AXLE',
      pkg.workstream || 'WS-UNLOAD',
      pkg.assetId || '',
      pkg.status || 'PLANNED',
      pkg.targetDate || '',
      Number(pkg.crewSize) || 4,
      pkg.leadSupervisor || '',
      Number(pkg.progressPct) || 0,
      pkg.constraints || '',
      pkg.evidenceUrl || '',
      now,
      pkg.createdAt || now
    ];

    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }

    this.recordAudit({
      actor: pkg.actor || 'SUPER_ADMIN',
      role: pkg.role || 'SUPER_ADMIN',
      action: rowIndex > 0 ? 'UPDATE_WORK_PACKAGE' : 'CREATE_WORK_PACKAGE',
      details: 'Work Package ' + pkg.id + ' saved in workspace ' + pkg.workspace,
      policySection: 'Section 4 - Operational Execution Control'
    });

    return {
      success: true,
      message: 'Work Package saved successfully',
      id: pkg.id,
      action: rowIndex > 0 ? 'UPDATED' : 'INSERTED'
    };
  },

  updateWorkPackageStatus: function(packageId, newStatus, actor) {
    if (!packageId || !newStatus) throw new Error('Package ID and Status are required');

    var sheet = this.getSheetSafe(this.SHEET_NAMES.WORK_PACKAGES);
    var data = sheet.getDataRange().getValues();
    var rowIndex = -1;
    var currentPkg = null;

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(packageId)) {
        rowIndex = i + 1;
        currentPkg = data[i];
        break;
      }
    }

    if (rowIndex === -1) {
      throw new Error('Work Package with ID ' + packageId + ' not found');
    }

    var now = new Date().toISOString();
    sheet.getRange(rowIndex, 6).setValue(newStatus); // Column F: STATUS
    sheet.getRange(rowIndex, 13).setValue(now);       // Column M: UPDATED_AT

    this.recordAudit({
      actor: actor || 'SUPER_ADMIN',
      role: 'SUPER_ADMIN',
      action: 'TRANSITION_WORK_PACKAGE_STATE',
      details: 'Work Package ' + packageId + ' transitioned to ' + newStatus,
      policySection: 'Section 4 - Work Package Lifecycle'
    });

    return {
      success: true,
      message: 'Work Package ' + packageId + ' updated to ' + newStatus,
      status: newStatus,
      updatedAt: now
    };
  },

  getShiftLogs: function() {
    var sheet = this.getSheetSafe(this.SHEET_NAMES.SHIFT_LOGS);
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];

    var result = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[0]) continue;
      result.push({
        id: row[0],
        shift: row[1],
        date: row[2] ? String(row[2]) : '',
        workstream: row[3],
        leadSupervisor: row[4],
        crewPresent: Number(row[5]) || 0,
        assetId: row[6],
        sowProgressPct: Number(row[7]) || 0,
        dailyMilestones: row[8],
        constraints: row[9],
        safetyClearance: row[10],
        handoverNotes: row[11],
        createdAt: row[12] ? String(row[12]) : ''
      });
    }
    return result;
  },

  saveShiftLog: function(log) {
    if (!log || !log.id) throw new Error('Shift Log must contain a unique log ID');

    var sheet = this.getSheetSafe(this.SHEET_NAMES.SHIFT_LOGS);
    var now = new Date().toISOString();
    var rowData = [
      log.id,
      log.shift || 'Shift A (Morning)',
      log.date || now.split('T')[0],
      log.workstream || 'WS-UNLOAD',
      log.leadSupervisor || '',
      Number(log.crewPresent) || 0,
      log.assetId || '',
      Number(log.sowProgressPct) || 0,
      log.dailyMilestones || '',
      log.constraints || '',
      log.safetyClearance || 'VALID_PTW_ACTIVE',
      log.handoverNotes || '',
      now
    ];

    sheet.appendRow(rowData);

    this.recordAudit({
      actor: log.leadSupervisor || 'SUPERVISOR',
      role: 'SUPERVISOR',
      action: 'RECORD_SHIFT_HANDOVER',
      details: 'Shift Log ' + log.id + ' recorded for ' + log.workstream,
      policySection: 'Section 4 - Operational Handover'
    });

    return {
      success: true,
      message: 'Shift Log recorded successfully',
      id: log.id
    };
  },

  getManpowerRoster: function() {
    var sheet = this.getSheetSafe(this.SHEET_NAMES.MANPOWER_ROSTER);
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];

    var result = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[0]) continue;
      result.push({
        badgeNo: row[0],
        name: row[1],
        designation: row[2],
        trade: row[3],
        medicalFitness: row[4],
        tpiRiggingCert: row[5],
        form11Qualified: row[6],
        inductionStatus: row[7],
        currentDeployment: row[8],
        state: row[9] || 'ACTIVE_DEPLOYED'
      });
    }
    return result;
  },

  syncBatch: function(records) {
    var syncedCount = 0;
    if (Array.isArray(records)) {
      for (var i = 0; i < records.length; i++) {
        var rec = records[i];
        if (rec.type === 'WORK_PACKAGE') {
          this.saveWorkPackage(rec.data);
          syncedCount++;
        } else if (rec.type === 'SHIFT_LOG') {
          this.saveShiftLog(rec.data);
          syncedCount++;
        }
      }
    }

    return {
      success: true,
      syncedCount: syncedCount,
      timestamp: new Date().toISOString()
    };
  },

  recordAudit: function(entry) {
    try {
      var sheet = this.getSheetSafe(this.SHEET_NAMES.AUDIT_LOG);
      var logId = 'AUD-OPS-' + Utilities.getUuid().substring(0, 8).toUpperCase();
      var now = new Date().toISOString();
      sheet.appendRow([
        logId,
        now,
        entry.actor || 'SYSTEM',
        entry.role || 'SUPER_ADMIN',
        entry.action || 'GENERIC_OP',
        entry.details || '',
        entry.policySection || 'Section 1 - Single Super Administrator Policy'
      ]);
    } catch (e) {
      console.warn('Audit record warning:', e);
    }
  }
};
