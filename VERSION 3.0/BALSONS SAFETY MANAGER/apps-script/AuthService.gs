/**
 * BALSONS SAFETY PORTAL - AUTH & AUDIT SERVICE
 * Handles Authentication, Session Management, RBAC & Audit Trails
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

var AuthService = {
  
  /**
   * System Users Master Seed
   */
  USERS: [
    { username: 'admin', fullName: 'Prashant (Admin / Owner)', role: 'Owner / Super Admin', assignedAreas: 'ALL' },
    { username: 'safety.mgr', fullName: 'Gajendra Rao (Safety Manager)', role: 'Safety Manager', assignedAreas: 'ALL' },
    { username: 'safety.off', fullName: 'Bikram Patra (Safety Officer)', role: 'Safety Officer', assignedAreas: 'AREA-01,AREA-02' },
    { username: 'sup.ramesh', fullName: 'Ramesh Kumar (Lifting Supervisor)', role: 'Work Supervisor', assignedAreas: 'AREA-01' },
    { username: 'client.jtrwf', fullName: 'JTRWF Site Representative', role: 'Client Reviewer', assignedAreas: 'ALL' }
  ],

  /**
   * Authenticate User
   */
  login: function(username, password) {
    if (!username || !password) {
      throw new Error('Username and Password are required.');
    }

    var cleanUser = username.trim().toLowerCase();
    var matchedUser = null;

    // 1. Try finding in USERS sheet
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var userSheet = ss.getSheetByName('USERS');
      if (userSheet && userSheet.getLastRow() > 1) {
        var data = userSheet.getDataRange().getValues();
        for (var i = 1; i < data.length; i++) {
          if (String(data[i][1]).toLowerCase() === cleanUser && data[i][6] === 'ACTIVE') {
            matchedUser = {
              userId: data[i][0],
              username: data[i][1],
              fullName: data[i][2],
              role: data[i][3],
              assignedAreas: data[i][7]
            };
            break;
          }
        }
      }
    } catch (e) {
      Logger.log('Sheet user lookup fallback: ' + e.message);
    }

    // 2. Fallback to predefined seed users
    if (!matchedUser) {
      for (var u = 0; u < this.USERS.length; u++) {
        if (this.USERS[u].username === cleanUser) {
          matchedUser = this.USERS[u];
          break;
        }
      }
    }

    if (!matchedUser) {
      throw new Error('Invalid credentials or user account inactive.');
    }

    // Check standard password
    if (password !== 'Balsons@2026' && password !== 'admin123') {
      throw new Error('Incorrect password.');
    }

    var token = 'BALSONS-SAF-' + Utilities.getUuid();
    var session = {
      token: token,
      username: matchedUser.username,
      fullName: matchedUser.fullName,
      role: matchedUser.role,
      assignedAreas: matchedUser.assignedAreas,
      permissions: this.getPermissionsForRole(matchedUser.role),
      issuedAt: new Date().toISOString()
    };

    AuditService.log(matchedUser.fullName, matchedUser.role, 'LOGIN', matchedUser.username, 'SUCCESS', 'Authenticated into BALSONS Safety Manager');

    return session;
  },

  /**
   * Role-Based Access Control (RBAC) Matrix
   */
  getPermissionsForRole: function(role) {
    var matrix = {
      'Owner / Super Admin': { canView: true, canCreate: true, canEdit: true, canVerify: true, canApprove: true, canClose: true, canExport: true, canAdmin: true },
      'Safety Manager': { canView: true, canCreate: true, canEdit: true, canVerify: true, canApprove: true, canClose: true, canExport: true, canAdmin: false },
      'Safety Officer': { canView: true, canCreate: true, canEdit: true, canVerify: true, canApprove: false, canClose: true, canExport: true, canAdmin: false },
      'Work Supervisor': { canView: true, canCreate: true, canEdit: false, canVerify: false, canApprove: false, canClose: false, canExport: false, canAdmin: false },
      'Client Reviewer': { canView: true, canCreate: false, canEdit: false, canVerify: false, canApprove: false, canClose: false, canExport: true, canAdmin: false }
    };

    return matrix[role] || { canView: true, canCreate: false, canEdit: false, canVerify: false, canApprove: false, canClose: false, canExport: false, canAdmin: false };
  }
};

var AuditService = {
  log: function(actor, role, action, entityRef, outcome, details) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('AUDIT_LOG');
      if (sheet) {
        var auditId = 'AUD-' + new Date().getTime();
        sheet.appendRow([
          auditId,
          new Date().toISOString(),
          actor || 'SYSTEM',
          role || 'AUTOMATION',
          action || 'INFO',
          entityRef || 'N/A',
          outcome || 'SUCCESS',
          details || ''
        ]);
      }
    } catch (e) {
      Logger.log('Audit log skipped: ' + e.message);
    }
  },

  getAuditLogs: function(limit) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('AUDIT_LOG');
      if (!sheet || sheet.getLastRow() <= 1) return [];

      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var list = [];
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) item[headers[h]] = row[h];
        list.push(item);
      }
      return list.reverse().slice(0, limit || 50);
    } catch (e) {
      return [];
    }
  }
};
