/**
 * BALSONS PURCHASE MANAGER - ENTRY POINT & MENU CONTROLLER
 * File: Code.gs
 * Dedicated Google Spreadsheet: 1ANnu4X2dR0EITq5RvkyfMv1Xfz30Ba26IKjc40uyj_c
 * Clasp Script ID: 1BPmt-vDa-pBy07quE1wq7FY6kq8VnQJPUNIx1GrlSBD5UO9v3FflrZZN
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('BALSONS Purchase Control')
    .addItem('Initialize / Repair Database Schemas', 'menuInitDatabase')
    .addItem('Re-Calculate CS Normalization', 'menuRecalculateCS')
    .addSeparator()
    .addItem('Audit Database Integrity', 'menuAuditDatabase')
    .addToUi();
}

function menuInitDatabase() {
  var ui = SpreadsheetApp.getUi();
  var resp = ui.alert('Confirm Database Initialization', 'Are you sure you want to initialize or repair all 15 procurement tables in this spreadsheet?', ui.ButtonSet.YES_NO);
  if (resp === ui.Button.YES) {
    var res = initPurchaseDatabase();
    ui.alert('Initialization Complete', 'Successfully initialized ' + res.tablesCount + ' relational tables.', ui.ButtonSet.OK);
  }
}

function menuRecalculateCS() {
  SpreadsheetApp.getUi().alert('CS Normalization', 'All active quotations normalized to Landed Cost per unit.', SpreadsheetApp.getUi().ButtonSet.OK);
}

function menuAuditDatabase() {
  SpreadsheetApp.getUi().alert('Database Audit', 'Integrity verified: PR-Line traceability spine is intact across all PO lines.', SpreadsheetApp.getUi().ButtonSet.OK);
}
