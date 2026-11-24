/**
 * BALSONS JTRWF GATE ENTRY & SITE ACCESS PORTAL
 * Audit Service — Immutable System Ledger
 * Architecture: BALSONS-SAM-2026 (Locked)
 */

const AuditService = {
  /**
   * Log an event into the AUDIT_LOG sheet
   */
  log: function(actorId, actorRole, action, entityId, outcome, details) {
    try {
      var ssId = CONFIG.getSpreadsheetId();
      if (!ssId) return;

      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('AUDIT_LOG');
      if (!sheet) return;

      var auditId = 'AUD-' + new Date().getFullYear() + '-' + Utilities.getUuid().substring(0, 8).toUpperCase();
      var timestamp = new Date().toISOString();
      var detailsStr = (typeof details === 'object') ? JSON.stringify(details) : (details || '');

      sheet.appendRow([
        auditId,
        timestamp,
        actorId || 'SYSTEM',
        actorRole || 'SYSTEM',
        action || 'UNKNOWN',
        entityId || '-',
        outcome || 'INFO',
        detailsStr
      ]);
      return auditId;
    } catch (err) {
      Logger.log('AuditService Error: ' + err.message);
      return null;
    }
  },

  logAudit: function(session, action, entityId, outcome, details) {
    var actor = session ? (session.username || session.fullName || 'SYSTEM') : 'SYSTEM';
    var role = session ? (session.role || 'SYSTEM') : 'SYSTEM';
    return this.log(actor, role, action, entityId, outcome, details);
  },

  logAction: function(session, action, entityId, outcome, details) {
    var actor = session ? (session.username || session.fullName || 'SYSTEM') : 'SYSTEM';
    var role = session ? (session.role || 'SYSTEM') : 'SYSTEM';
    return this.log(actor, role, action, entityId, outcome, details);
  },

  listAuditLogs: function(limit) {
    try {
      var ssId = CONFIG.getSpreadsheetId();
      if (!ssId) return [];
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('AUDIT_LOG');
      if (!sheet || sheet.getLastRow() < 2) return [];

      limit = limit || 50;
      var startRow = Math.max(2, sheet.getLastRow() - limit + 1);
      var count = sheet.getLastRow() - startRow + 1;
      var data = sheet.getRange(startRow, 1, count, 8).getValues();

      var logs = data.map(function(r) {
        return {
          auditId: r[0],
          timestamp: r[1],
          actor: r[2],
          role: r[3],
          action: r[4],
          entityId: r[5],
          outcome: r[6],
          details: r[7]
        };
      });
      return logs.reverse();
    } catch (err) {
      Logger.log('Error listing audit logs: ' + err.message);
      return [];
    }
  }
};
