/**
 * ============================================================================
 * BALSONS ENTERPRISE ECOSYSTEM - DATABASE INITIALIZER & SEED DATA ENGINE
 * Company: BALSONS Heavy Lift & Shift | Project: JTRWF Khordha, Odisha
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * ============================================================================
 * 
 * INSTRUCTIONS FOR USER:
 * 1. Open Google Apps Script Editor:
 *    https://script.google.com/d/1_I-scIjBfFbJufFCppzT-fCp-cBC-5BKvk4RwS6UTVwno1KFu5MTxKs_/edit
 * 2. Select function 'seedBothDatabases' (or 'seedHrDatabase') from top dropdown.
 * 3. Click '▷ Run'.
 * 
 * This will physically provision all sheets and populate 5 representative
 * employees into your Google Sheet (1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw)
 * and Gate Entry records into (1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o).
 */

const SEED_CONFIG = {
  HR_SPREADSHEET_ID: '1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw',
  GATE_SPREADSHEET_ID: '1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o'
};

/**
 * MASTER RUNNER: Seeds both HR and Gate Entry Google Sheets in one click
 */
function seedBothDatabases() {
  Logger.log('🚀 Starting BALSONS Ecosystem Unified Database Seeding...');
  var hrResult = seedHrDatabase();
  var gateResult = seedGateDatabase();
  Logger.log('================================================================');
  Logger.log('✔ UNIFIED SEEDING COMPLETE!');
  Logger.log('HR Result: ' + JSON.stringify(hrResult));
  Logger.log('Gate Result: ' + JSON.stringify(gateResult));
  Logger.log('================================================================');
  return {
    success: true,
    hr: hrResult,
    gate: gateResult,
    timestamp: new Date().toISOString()
  };
}

/**
 * SEED HR & PAYROLL DATABASE (1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw)
 * Provisions 22 Relational Sheets and Seeds 5 Dual-Classification Employees
 */
function seedHrDatabase(targetId) {
  var ssId = targetId || SEED_CONFIG.HR_SPREADSHEET_ID;
  var ss = SpreadsheetApp.openById(ssId);
  if (!ss) throw new Error('Cannot open HR Spreadsheet ID: ' + ssId);

  Logger.log('📂 Initializing HR Sheets in: ' + ss.getName());

  // 1. Provision all 22 Schemas
  var HR_SCHEMAS = [
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

  HR_SCHEMAS.forEach(function(schema) {
    var sheetName = schema[0];
    var headers = schema[1];
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#102D35')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  });

  // 2. Clear old data rows in EMPLOYEE_MASTER (keep header)
  var empSheet = ss.getSheetByName('EMPLOYEE_MASTER');
  if (empSheet.getLastRow() > 1) {
    empSheet.getRange(2, 1, empSheet.getLastRow() - 1, empSheet.getLastColumn()).clearContent();
  }

  // 3. Define the 5 Sample Employees (Dual Workforce Classification)
  var sampleEmployees = [
    // 1. Ramesh Kumar (Monthly Salaried - PF & ESIC Covered)
    [
      'EMP-2026-0001',
      'Ramesh Kumar',
      'Dileshwar Kumar',
      '1989-08-14',
      'Male',
      'B+',
      "'9861088721",
      'Anita Kumar (Wife) - 9861099881',
      'At/Po: Haldiapada, Khordha Tahasil, District Khordha, Odisha - 752056',
      'JTRWF Site Colony, Quarter B-14, Khordha',
      'Heavy Lift & Rigging Operations',
      'Rigger Lead',
      'Rigger Lead',
      'MONTHLY',
      55000,
      '2025-04-10',
      true,
      true,
      'ABCDE1234F',
      '4928 1192 8840',
      'POL-KHD-2026-9912',
      'FIT - Heavy Rigging & Height (Form 31)',
      '392810484092',
      'SBIN0001234',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'ACTIVE'
    ],
    // 2. Sunil Swain (Monthly Salaried - PF & ESIC Covered)
    [
      'EMP-2026-0002',
      'Sunil Swain',
      'Balaram Swain',
      '1992-05-22',
      'Male',
      'O+',
      "'9437012345",
      'Geeta Swain (Mother) - 9437099882',
      'At/Po: Nirakarpur, Tangi Block, District Khordha, Odisha - 752019',
      'JTRWF Site Colony, Quarter B-16, Khordha',
      'Heavy Lift & Rigging Operations',
      'Hydraulic Specialist',
      'Hydraulic Specialist',
      'MONTHLY',
      48000,
      '2025-06-15',
      true,
      true,
      'BKPSM5541L',
      '7821 4451 9102',
      'POL-KHD-2026-9915',
      'FIT - Hydraulic Systems & Plant Operations',
      '204911823341',
      'SBIN0001234',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      'ACTIVE'
    ],
    // 3. Ajay Verma (Daily Pay - Statutory Exempt from PF & ESIC)
    [
      'EMP-2026-0003',
      'Ajay Verma',
      'Kailash Verma',
      '1995-11-03',
      'Male',
      'A+',
      "'9811122334",
      'Sunita Verma (Wife) - 9811199001',
      'Plot 45, Sector 9, Rourkela, Sundargarh, Odisha - 769009',
      'JTRWF Subcontractor Camp Block C-02',
      'Site Mechanical Operations',
      'Mechanical Assembly Fitter',
      'Mechanical Assembly Fitter',
      'DAILY_PAY',
      1400,
      '2025-08-01',
      false,
      false,
      'CZMPV8812K',
      '6120 9948 1120',
      'POL-KHD-2026-9918',
      'FIT - Mechanical Assembly & Torquing',
      '501004877219',
      'HDFC0001245',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      'ACTIVE'
    ],
    // 4. Dharmendra Pradhan (Monthly Salaried - PF & ESIC Covered)
    [
      'EMP-2026-0004',
      'Dharmendra Pradhan',
      'Bichitra Pradhan',
      '1986-03-19',
      'Male',
      'AB+',
      "'9937088214",
      'Pravati Pradhan (Wife) - 9937099112',
      'At/Po: Jankia, Khordha, Odisha - 752020',
      'JTRWF Site Colony, Quarter A-05',
      'Heavy Lift & Rigging Operations',
      'Crawler Crane Operator (150T)',
      'Crawler Crane Operator (150T)',
      'MONTHLY',
      65000,
      '2024-11-20',
      true,
      true,
      'DPMPR3349N',
      '9182 3341 8821',
      'POL-KHD-2026-9922',
      'FIT - Heavy Equipment Operator & Eye Vision Class 1',
      '319200489840',
      'SBIN0001234',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      'ACTIVE'
    ],
    // 5. Bikash Jena (Daily Pay - Statutory Exempt from PF & ESIC)
    [
      'EMP-2026-0005',
      'Bikash Jena',
      'Bansidhar Jena',
      '1998-07-28',
      'Male',
      'B+',
      "'9861234567",
      'Bansidhar Jena (Father) - 9861299881',
      'At/Po: Haldiapada, Near JTRWF Works, Khordha - 752056',
      'Local Resident - Daily Commute',
      'Heavy Lift & Rigging Operations',
      'Rigging Helper',
      'Rigging Helper',
      'DAILY_PAY',
      950,
      '2026-01-10',
      false,
      false,
      'ABCDE9948F',
      '5849 1120 9948',
      'POL-KHD-2026-9925',
      'FIT - General Rigging Ground Support',
      '30988471239',
      'SBIN0001234',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'ACTIVE'
    ]
  ];

  sampleEmployees.forEach(function(row) {
    empSheet.appendRow(row);
  });

  // 4. Seed Verified Documents in EMPLOYEE_DOCUMENTS
  var docSheet = ss.getSheetByName('EMPLOYEE_DOCUMENTS');
  if (docSheet.getLastRow() > 1) {
    docSheet.getRange(2, 1, docSheet.getLastRow() - 1, docSheet.getLastColumn()).clearContent();
  }

  sampleEmployees.forEach(function(emp) {
    var id = emp[0];
    var now = '2026-11-20';
    docSheet.appendRow(['DOC-' + id + '-PAN', id, 'PAN_CARD', emp[18], now, '2035-12-31', 'VERIFIED', 'drive/kyc/' + id + '_pan.pdf']);
    docSheet.appendRow(['DOC-' + id + '-AADHAAR', id, 'AADHAAR_CARD', emp[19], now, '2035-12-31', 'VERIFIED', 'drive/kyc/' + id + '_aadhaar.pdf']);
    docSheet.appendRow(['DOC-' + id + '-POLICE', id, 'POLICE_VERIFICATION', emp[20], now, '2027-11-15', 'VERIFIED', 'drive/police/' + id + '_pvc.pdf']);
    docSheet.appendRow(['DOC-' + id + '-MED', id, 'MEDICAL_FITNESS_FORM31', emp[21], now, '2027-05-15', 'VERIFIED', 'drive/medical/' + id + '_fit.pdf']);
    docSheet.appendRow(['DOC-' + id + '-PHOTO', id, 'PASSPORT_PHOTO', 'PHOTO-' + id, now, '2035-12-31', 'VERIFIED', emp[24]]);
  });

  // 5. Seed Attendance Summary for Current Payroll Period (NOV 2026)
  var attSheet = ss.getSheetByName('ATTENDANCE_SUMMARY');
  if (attSheet.getLastRow() > 1) {
    attSheet.getRange(2, 1, attSheet.getLastRow() - 1, attSheet.getLastColumn()).clearContent();
  }

  sampleEmployees.forEach(function(emp, idx) {
    var id = emp[0];
    var isMonthly = (emp[13] === 'MONTHLY');
    // Monthly: Present=22, WO=4, PL=0 -> Payable=26; Daily: Present=24, WO=0, PL=0 -> Payable=24
    var pDays = isMonthly ? 22 : 24;
    var wo = isMonthly ? 4 : 0;
    var pl = 0;
    var payable = isMonthly ? 26 : 24;
    var otHours = isMonthly ? 0 : 16;
    attSheet.appendRow([
      'SUM-NOV26-' + ('00' + (idx + 1)).slice(-2),
      'NOV 2026',
      id,
      emp[13],
      pDays,
      wo,
      pl,
      payable,
      otHours,
      'VERIFIED'
    ]);
  });

  // Remove default 'Sheet1' if empty and other sheets exist
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    try { ss.deleteSheet(defaultSheet); } catch(e) {}
  }

  Logger.log('✔ HR Database successfully initialized and seeded with 5 active employees!');
  return {
    success: true,
    portal: 'BALSONS HR & Payroll Manager',
    spreadsheetName: ss.getName(),
    spreadsheetId: ssId,
    employeesSeeded: sampleEmployees.length,
    sheetsProvisioned: HR_SCHEMAS.length
  };
}

/**
 * SEED GATE ENTRY DATABASE (1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o)
 * Provisions 22 Relational Sheets and Seeds Matching Contractors, Personnel, Equipment, Vehicles & Logs
 */
function seedGateDatabase(targetId) {
  var ssId = targetId || SEED_CONFIG.GATE_SPREADSHEET_ID;
  var ss = SpreadsheetApp.openById(ssId);
  if (!ss) throw new Error('Cannot open Gate Entry Spreadsheet ID: ' + ssId);

  Logger.log('📂 Initializing Gate Entry Sheets in: ' + ss.getName());

  var GATE_SCHEMAS = [
    ['APP_CONFIG', ['ConfigKey', 'ConfigValue', 'Description', 'LastUpdated', 'UpdatedBy']],
    ['USER_MASTER', ['UserID', 'Username', 'FullName', 'Role', 'PasswordHash', 'Salt', 'IsActive', 'LastLogin', 'CreatedAt']],
    ['CONTRACTOR_MASTER', ['ContractorID', 'CompanyName', 'ContactPerson', 'Mobile', 'Email', 'Scope', 'Status', 'CreatedAt']],
    ['PERSONNEL_MASTER', ['PersonnelID', 'FullName', 'Category', 'ContractorID', 'Trade', 'GovtIDType', 'MaskedGovtID', 'Mobile', 'Status']],
    ['IDENTITY_VERIFICATION', ['VerifID', 'PersonnelID', 'IDType', 'MaskedRef', 'IssuingAuth', 'VerifiedBy', 'VerifDate', 'Status']],
    ['POLICE_VERIFICATION', ['PV_ID', 'PersonnelID', 'PoliceStation', 'CertificateRef', 'IssueDate', 'ExpiryDate', 'Status', 'VerifiedBy']],
    ['MEDICAL_FITNESS', ['MedID', 'PersonnelID', 'ClinicName', 'ExamDate', 'ExpiryDate', 'GeneralFitness', 'VertigoClearance', 'Status']],
    ['INSURANCE_REGISTER', ['InsID', 'ContractorID', 'PolicyType', 'PolicyNo', 'Insurer', 'ValidFrom', 'ValidTo', 'Status']],
    ['TRAINING_COMPETENCY', ['CompID', 'PersonnelID', 'CertificationType', 'CertNo', 'IssuedBy', 'IssueDate', 'ExpiryDate', 'Status']],
    ['PPE_REGISTER', ['PPE_ID', 'PersonnelID', 'Helmet', 'SafetyShoes', 'HiVisVest', 'Gloves', 'EyeProtection', 'VerifiedDate', 'Status']],
    ['WORK_DOCUMENT_REGISTER', ['DocID', 'DocType', 'DocRefNo', 'Revision', 'Workfront', 'ApprovedBy', 'ApprovalDate', 'Status']],
    ['EQUIPMENT_MASTER', ['EquipmentID', 'Description', 'MakeModel', 'SerialNo', 'Owner', 'SWL_Capacity', 'TagNo', 'Status']],
    ['EQUIPMENT_INSPECTION', ['InspID', 'EquipmentID', 'InspectionType', 'CertRef', 'Agency', 'InspectionDate', 'DueDate', 'Status']],
    ['TOOLS_TACKLES_REGISTER', ['TackleID', 'Description', 'SerialNo', 'SWL', 'TPI_Ref', 'Condition', 'TagColor', 'Status']],
    ['CHEMICAL_SDS_REGISTER', ['ChemID', 'MaterialName', 'Manufacturer', 'Quantity', 'HazardClass', 'SDS_Available', 'StorageArea', 'Status']],
    ['VEHICLE_MASTER', ['VehicleID', 'RegistrationNo', 'VehicleType', 'Owner', 'PUC_Expiry', 'FitnessExpiry', 'InsuranceExpiry', 'Status']],
    ['DRIVER_MASTER', ['DriverID', 'DriverName', 'LicenceNo', 'LicenceClass', 'LicenceExpiry', 'Inducted', 'Status']],
    ['GATE_REQUEST_REGISTER', ['RequestID', 'SubjectType', 'SubjectID', 'DeclaredActivity', 'TargetArea', 'RequestDate', 'Status']],
    ['GATE_CLEARANCE_REGISTER', ['ClearanceID', 'RequestID', 'Decision', 'ReasonCodes', 'EvaluatedBy', 'EvaluatedAt', 'ValidityHours']],
    ['GATE_ENTRY_EXIT_LOG', ['LogID', 'ClearanceID', 'SubjectID', 'Direction', 'GateNo', 'Timestamp', 'SecurityGuardID', 'AllocatedBay']],
    ['EXCEPTION_LOG', ['ExceptionID', 'RequestID', 'OverriddenRules', 'Justification', 'ApprovedBy', 'ExpiryTimestamp', 'Status']],
    ['AUDIT_LOG', ['AuditID', 'Timestamp', 'ActorID', 'ActorRole', 'Action', 'EntityID', 'Outcome', 'Details']],
    ['MATERIAL_INWARD_REGISTER', ['InwardID', 'PONumber', 'DC_InvoiceNo', 'VendorName', 'Transporter', 'VehicleNo', 'ItemSummary', 'Qty', 'AllocatedBay', 'StoreNotificationStatus', 'GateInTimestamp', 'ReceivedBy', 'Status']],
    ['GATE_PASS_REGISTER', ['PassID', 'PassType', 'ItemDescription', 'Qty', 'Consignee', 'VehicleNo', 'DispatchDate', 'ExpectedReturnDate', 'ActualReturnDate', 'ApprovalStatus', 'ApprovedBy', 'GateStatus', 'IsOverdue', 'Remarks']]
  ];

  GATE_SCHEMAS.forEach(function(schema) {
    var sheetName = schema[0];
    var headers = schema[1];
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#1a237e')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  });

  // 1. Seed Contractors (Text mobile numbers with apostrophe to avoid #ERROR!)
  var conSheet = ss.getSheetByName('CONTRACTOR_MASTER');
  if (conSheet.getLastRow() > 1) {
    conSheet.getRange(2, 1, conSheet.getLastRow() - 1, conSheet.getLastColumn()).clearContent();
  }
  var nowIso = new Date().toISOString();
  conSheet.appendRow(['CON-2026-0001', 'BALSONS Heavy Lift & Shift', 'Rajeev Balson', "'9820011223", 'ops@balsons.com', 'Turnkey E&C / Heavy Rigging', 'ACTIVE', nowIso]);
  conSheet.appendRow(['CON-2026-0002', 'Schuler India Pvt Ltd', 'M. Schroeder', "'9811122334", 'jtrwf@schulergroup.com', 'Wheel & Axle Equipment OEM', 'ACTIVE', nowIso]);
  conSheet.appendRow(['CON-2026-0003', 'Ferroterro Rigging Kolkata', 'S. Banerjee', "'9830044556", 'lifting@ferroterro.com', 'Tackles & Hoist Supplier', 'ACTIVE', nowIso]);

  // 2. Seed Matching 5 Personnel (Matching HR Employees for Dual Portal Sync)
  var perSheet = ss.getSheetByName('PERSONNEL_MASTER');
  if (perSheet.getLastRow() > 1) {
    perSheet.getRange(2, 1, perSheet.getLastRow() - 1, perSheet.getLastColumn()).clearContent();
  }
  perSheet.appendRow(['PER-2026-0001', 'Ramesh Kumar', 'Direct Staff', 'CON-2026-0001', 'Rigger Lead', 'Aadhaar', 'XXXX-XXXX-9102', "'9861088721", 'ACTIVE']);
  perSheet.appendRow(['PER-2026-0002', 'Sunil Swain', 'Direct Staff', 'CON-2026-0001', 'Hydraulic Specialist', 'Aadhaar', 'XXXX-XXXX-5541', "'9437012345", 'ACTIVE']);
  perSheet.appendRow(['PER-2026-0003', 'Ajay Verma', 'Subcontractor', 'CON-2026-0002', 'Mechanical Assembly Fitter', 'Voter ID', 'OR/12/XXX/112', "'9811122334", 'ACTIVE']);
  perSheet.appendRow(['PER-2026-0004', 'Dharmendra Pradhan', 'Direct Staff', 'CON-2026-0001', 'Crawler Crane Operator (150T)', 'Aadhaar', 'XXXX-XXXX-8821', "'9937088214", 'ACTIVE']);
  perSheet.appendRow(['PER-2026-0005', 'Bikash Jena', 'Direct Staff', 'CON-2026-0001', 'Rigging Helper', 'Aadhaar', 'XXXX-XXXX-9948', "'9861234567", 'ACTIVE']);

  // 3. Seed Equipment
  var eqSheet = ss.getSheetByName('EQUIPMENT_MASTER');
  if (eqSheet.getLastRow() > 1) {
    eqSheet.getRange(2, 1, eqSheet.getLastRow() - 1, eqSheet.getLastColumn()).clearContent();
  }
  eqSheet.appendRow(['EQ-2026-0001', '100T Hydraulic Climbing Jack', 'Enerpac CLRG-1006', 'SN-ENR-9921', 'BALSONS', '100 Ton', 'TAG-EQ-001', 'ACTIVE']);
  eqSheet.appendRow(['EQ-2026-0002', 'Demag AC-350 All-Terrain Crane', 'Terex Demag AC-350', 'SN-DMG-4042', 'BALSONS', '350 Ton', 'TAG-EQ-002', 'ACTIVE']);
  eqSheet.appendRow(['EQ-2026-0003', 'Hydra Mobile Crane 25T', 'ACE FX-250', 'SN-ACE-1102', 'BALSONS', '25 Ton', 'TAG-EQ-003', 'ACTIVE']);

  // 4. Seed Vehicles
  var vehSheet = ss.getSheetByName('VEHICLE_MASTER');
  if (vehSheet.getLastRow() > 1) {
    vehSheet.getRange(2, 1, vehSheet.getLastRow() - 1, vehSheet.getLastColumn()).clearContent();
  }
  vehSheet.appendRow(['VEH-2026-0001', 'OD-02-AK-9811', 'Multi-Axle Hydraulic Trailer', 'Balsons Logistics', '2027-12-31', '2027-12-31', '2027-12-31', 'ACTIVE']);
  vehSheet.appendRow(['VEH-2026-0002', 'MH-12-PQ-4521', 'Boom Truck Crane Mounted', 'Transcon Pune', '2027-12-31', '2027-12-31', '2027-12-31', 'ACTIVE']);
  vehSheet.appendRow(['VEH-2026-0003', 'OD-05-BX-3344', 'Heavy Material Flatbed', 'Kalinga Carriers', '2027-12-31', '2027-12-31', '2027-12-31', 'ACTIVE']);

  // 5. Seed Material Inward Register
  var inSheet = ss.getSheetByName('MATERIAL_INWARD_REGISTER');
  if (inSheet.getLastRow() > 1) {
    inSheet.getRange(2, 1, inSheet.getLastRow() - 1, inSheet.getLastColumn()).clearContent();
  }
  inSheet.appendRow(['IGE-2026-0001', 'PO-BAL-2026-0881', 'DC-SCH-9021', 'Schuler India Pvt Ltd', 'VRL Logistics Heavy Division', 'OD-02-AK-9811', 'Hydraulic Ram Cylinders (2 Sets) & Press Tie-Rods', '2 Sets', 'Main Press Pit (Bay-3)', 'NOTIFIED_STORE_LEAD', nowIso, 'Security Guard Gate 1', 'IN_UNLOADING_BAY']);
  inSheet.appendRow(['IGE-2026-0002', 'PO-BAL-2026-0889', 'DC-FER-4412', 'Ferroterro Rigging Kolkata', 'Balsons Logistics Fleet', 'MH-14-BT-4019', '600T Grommet Slings & Shackles Batch 4', '14 Nos', 'Bay 2 (Staging Yard)', 'NOTIFIED_STORE_LEAD', nowIso, 'Security Guard Gate 1', 'IN_UNLOADING_BAY']);

  // 6. Seed Gate Pass Register (RGP)
  var gpSheet = ss.getSheetByName('GATE_PASS_REGISTER');
  if (gpSheet.getLastRow() > 1) {
    gpSheet.getRange(2, 1, gpSheet.getLastRow() - 1, gpSheet.getLastColumn()).clearContent();
  }
  gpSheet.appendRow(['RGP-2026-0001', 'RGP', 'Enerpac CLRG-1006 Jack Pressure Gauge Unit for Calibration', '1 No', 'National Calibration Centre, Bhubaneswar', 'OD-02-AX-8910', '2026-11-23', '2026-11-28', '', 'APPROVED', 'BALSONS Project Owner', 'DISPATCHED_EXITED', false, 'Mandatory Quarterly NABL Calibration']);

  // 7. Seed Gate Entry Movements
  var movSheet = ss.getSheetByName('GATE_ENTRY_EXIT_LOG');
  if (movSheet.getLastRow() > 1) {
    movSheet.getRange(2, 1, movSheet.getLastRow() - 1, movSheet.getLastColumn()).clearContent();
  }
  movSheet.appendRow(['LOG-2026-0001', 'CLR-2026-0001', 'PER-2026-0001', 'ENTRY', 'Gate 1 (Main Heavy Bay)', nowIso, 'Security Officer', 'Bay 3 (Press Pit Area)']);
  movSheet.appendRow(['LOG-2026-0002', 'CLR-2026-0002', 'PER-2026-0002', 'ENTRY', 'Gate 2 (Personnel Turnstile)', nowIso, 'Security Officer', 'Bay 3 (Press Pit Area)']);
  movSheet.appendRow(['LOG-2026-0003', 'CLR-2026-0003', 'PER-2026-0003', 'ENTRY', 'Gate 2 (Personnel Turnstile)', nowIso, 'Security Officer', 'Bay 2 (Staging Yard)']);
  movSheet.appendRow(['LOG-2026-0004', 'CLR-2026-0004', 'PER-2026-0004', 'ENTRY', 'Gate 1 (Main Heavy Bay)', nowIso, 'Security Officer', 'Bay 1 (Crane Staging)']);
  movSheet.appendRow(['LOG-2026-0005', 'CLR-2026-0005', 'PER-2026-0005', 'ENTRY', 'Gate 2 (Personnel Turnstile)', nowIso, 'Security Officer', 'Bay 3 (Press Pit Area)']);

  // Remove default 'Sheet1' if present
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    try { ss.deleteSheet(defaultSheet); } catch(e) {}
  }

  Logger.log('✔ Gate Entry Database successfully initialized and seeded with matching master records!');
  return {
    success: true,
    portal: 'BALSONS Gate Entry & Site Access Portal',
    spreadsheetName: ss.getName(),
    spreadsheetId: ssId,
    contractorsSeeded: 3,
    personnelSeeded: 5,
    equipmentSeeded: 3,
    vehiclesSeeded: 3,
    movementsSeeded: 5,
    sheetsProvisioned: GATE_SCHEMAS.length
  };
}
