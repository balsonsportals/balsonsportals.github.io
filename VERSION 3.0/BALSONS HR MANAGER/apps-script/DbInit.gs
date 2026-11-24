/**
 * BALSONS HR & PAYROLL MANAGER
 * Database Initializer — Provisions all 22 Relational Sheets (Table 5 Specification)
 * Wage Classification:
 * - DAILY_PAY: Daily wage basis, Present days only, Exempt from PF and ESIC (0 deductions).
 * - MONTHLY: Monthly gross basis, Payable days (P+WO+PL), Mandatory PF (12%) & ESIC (0.75%), PT.
 */

function initHrDatabase(targetSpreadsheetId) {
  var ssId = targetSpreadsheetId || PropertiesService.getScriptProperties().getProperty('HR_SPREADSHEET_ID') || '1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw';
  if (!ssId) {
    throw new Error('Target Spreadsheet ID not provided. Set HR_SPREADSHEET_ID in Script Properties.');
  }

  var ss = SpreadsheetApp.openById(ssId);
  if (!ss) throw new Error('Spreadsheet unreachable for ID: ' + ssId);

  var SCHEMAS = [
    ['SYSTEM_CONFIG', ['ConfigKey', 'ConfigValue', 'Description', 'EffectiveDate', 'UpdatedBy']],
    ['USER_ACCESS', ['UserID', 'Username', 'FullName', 'Role', 'PasswordHash', 'Salt', 'IsActive', 'AssignedProjects']],
    ['EMPLOYEE_MASTER', ['EmpID', 'FullName', 'FatherName', 'DOB', 'Gender', 'BloodGroup', 'Mobile', 'EmergencyContact', 'PermanentAddress', 'SiteCampAddress', 'Department', 'Designation', 'Trade', 'WageType', 'DailyRateOrCTC', 'JoiningDate', 'PF_Applicable', 'ESIC_Applicable', 'PAN_No', 'Aadhaar_No', 'PoliceVerification_Ref', 'MedicalFitness_Ref', 'BankAccNo', 'BankIFSC', 'PhotoUrl', 'Status']],
    ['EMPLOYEE_DOCUMENTS', ['DocID', 'EmpID', 'DocType', 'DocRefNo', 'IssueDate', 'ExpiryDate', 'VerificationStatus', 'DriveUrl']],
    ['DEPARTMENT_MASTER', ['DeptID', 'DeptName', 'CostCentre', 'HOD', 'Status']],
    ['PROJECT_MASTER', ['ProjectCode', 'ProjectName', 'Client', 'Location', 'ProjectManager', 'StartDate', 'Status']],
    ['EMPLOYEE_ALLOCATION', ['AllocID', 'EmpID', 'ProjectCode', 'AreaBay', 'EffectiveFrom', 'EffectiveTo', 'Status']],
    ['ATTENDANCE_DAILY', ['DailyID', 'Date', 'EmpID', 'ProjectCode', 'StatusCode', 'OT_Hours', 'Shift', 'SupervisorID']],
    ['ATTENDANCE_SUMMARY', ['SummaryID', 'PayPeriod', 'EmpID', 'WageType', 'PresentDays', 'WeeklyOff', 'PaidLeave', 'PayableDays', 'OT_Hours', 'Status']],
    ['LEAVE_MASTER', ['LeaveCode', 'LeaveName', 'AnnualEntitlement', 'CarryForwardLimit', 'Status']],
    ['LEAVE_TRANSACTIONS', ['LeaveTransID', 'EmpID', 'LeaveCode', 'FromDate', 'ToDate', 'DaysCount', 'ApprovalStatus', 'ApprovedBy']],
    ['SALARY_STRUCTURE', ['SalaryID', 'EmpID', 'WageType', 'EffectiveFrom', 'DailyRate', 'BasicPay', 'HRA', 'SiteAllowance', 'SpecialAllowance', 'Status']],
    ['ADVANCE_MASTER', ['AdvanceID', 'EmpID', 'IssueDate', 'TotalAmount', 'MonthlyRecovery', 'TotalRecovered', 'Balance', 'ApprovedBy', 'Status']],
    ['ADVANCE_RECOVERY', ['RecoveryID', 'AdvanceID', 'PayPeriod', 'DeductedAmount', 'RemainingBalance', 'PayrollRunID']],
    ['PAYROLL_INPUT', ['InputID', 'PayPeriod', 'EmpID', 'WageType', 'PayableDays', 'OT_Hours', 'SpecialIncentive', 'AdhocDeduction', 'VerifiedBy']],
    ['PAYROLL_REGISTER', ['PayrollID', 'PayPeriod', 'EmpID', 'WageType', 'PresentDays', 'PayableDays', 'BaseEarnings', 'Allowances', 'OT_Pay', 'GrossEarnings', 'AdvanceDeduction', 'PF_Deduction', 'ESIC_Deduction', 'PT_Deduction', 'NetPayable', 'Status']],
    ['SALARY_SLIP_LOG', ['SlipLogID', 'PayrollID', 'EmpID', 'WageType', 'PayPeriod', 'GeneratedTimestamp', 'Version', 'DriveFileUrl']],
    ['HR_DOCUMENTS_LOG', ['LogID', 'DocType', 'EmpID', 'TemplateID', 'IssuedDate', 'ApprovedBy', 'DriveRef']],
    ['EXIT_SETTLEMENT', ['ExitID', 'EmpID', 'LastWorkingDate', 'ClearanceStatus', 'Gratuity', 'LeaveEncashment', 'AdvanceRecovery', 'FinalNetSettlement', 'ApprovedBy']],
    ['APPROVAL_LOG', ['ApprovalID', 'Module', 'EntityRef', 'SubmittedBy', 'Action', 'ApproverRole', 'ApproverName', 'Timestamp', 'Comments']],
    ['AUDIT_LOG', ['AuditID', 'Timestamp', 'Actor', 'Role', 'Action', 'EntityRef', 'Outcome', 'Details']],
    ['BACKUP_LOG', ['BackupID', 'Timestamp', 'BackupType', 'TargetDriveId', 'Status', 'VerifiedBy']],
    ['EMPLOYEE_REGISTRATIONS', ['RegID', 'SubmissionDate', 'FullName', 'FatherName', 'MotherName', 'DOB', 'Gender', 'BloodGroup', 'MaritalStatus', 'Nationality', 'Mobile', 'AltMobile', 'Email', 'IdentificationMark', 'PermanentAddress', 'PermVillageCity', 'PermTaluka', 'PermDistrict', 'PermState', 'PermPIN', 'CurrentAddress', 'CurrVillageCity', 'CurrTaluka', 'CurrDistrict', 'CurrState', 'CurrPIN', 'SpouseName', 'ChildrenCount', 'EmergencyContactName', 'EmergencyRel', 'EmergencyPhone', 'EmergencyAltPhone', 'EmergencyAddress', 'AadhaarNo', 'PANNo', 'VoterID', 'DrivingLicence', 'PassportNo', 'BankName', 'AccHolderName', 'AccNo', 'IFSC', 'Branch', 'NomineeName', 'NomineeRel', 'NomineeDOB', 'NomineeMobile', 'NomineeAddress', 'DeclarationAccepted', 'DocsUploadedCount', 'Status', 'ProcessedEmpID', 'ReviewerNotes', 'ReviewedBy', 'ReviewDate']]
  ];

  Logger.log('Provisioning ' + SCHEMAS.length + ' Relational Sheets in ' + ss.getName());

  SCHEMAS.forEach(function(item) {
    var name = item[0];
    var headers = item[1];
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#102D35')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  });

  return 'Database Initialization Succeeded: 22 Relational Sheets Provisioned in ' + ss.getName();
}
