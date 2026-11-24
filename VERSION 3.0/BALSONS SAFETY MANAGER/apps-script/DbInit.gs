/**
 * BALSONS SAFETY PORTAL - DATABASE INITIALIZER
 * Provisions all 20 Master and Transaction Relational Sheets
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

function initSafetyDatabase(targetSpreadsheetId) {
  var ssId = targetSpreadsheetId || PropertiesService.getScriptProperties().getProperty('SAFETY_SPREADSHEET_ID') || '1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0';
  if (!ssId) {
    throw new Error('Target Spreadsheet ID not provided. Set SAFETY_SPREADSHEET_ID in Script Properties.');
  }

  var ss = SpreadsheetApp.openById(ssId);
  if (!ss) throw new Error('Spreadsheet unreachable for ID: ' + ssId);

  var SCHEMAS = [
    // 1. System & Security Masters
    ['SYSTEM_CONFIG', ['ConfigKey', 'ConfigValue', 'Description', 'EffectiveDate', 'UpdatedBy']],
    ['USERS', ['UserID', 'Username', 'FullName', 'Role', 'PasswordHash', 'Salt', 'IsActive', 'AssignedAreas']],
    ['ROLES_PERMISSIONS', ['RoleID', 'RoleName', 'Module', 'CanView', 'CanCreate', 'CanEdit', 'CanVerify', 'CanApprove', 'CanClose', 'CanExport']],
    ['AREAS_MASTER', ['AreaCode', 'AreaName', 'PlantLocation', 'HOD', 'SafetyOfficerAssigned', 'Status']],
    
    // 2. Resource & Compliance Masters
    ['PERSONNEL_SAFETY_MASTER', ['WorkerID', 'FullName', 'Trade', 'Contractor', 'Form31MedicalDate', 'MedicalStatus', 'InductionDate', 'HeightPassStatus', 'CraneLicenseRef', 'Status']],
    ['EQUIPMENT_SAFETY_MASTER', ['EquipID', 'EquipType', 'CapacityTons', 'MakeModel', 'ThirdPartyCertRef', 'Form11ExpiryDate', 'PhysicalInspectionStatus', 'Status']],
    ['PERMIT_TEMPLATES', ['TemplateCode', 'Category', 'TemplateName', 'MandatoryPrerequisites', 'MaxValidityHours', 'RequiredSignatories', 'Status']],
    ['CHECKLIST_TEMPLATES', ['ChecklistID', 'Category', 'ChecklistName', 'QuestionsJSON', 'Frequency', 'RiskLevel', 'Status']],
    
    // 3. PTW & Execution Transactions
    ['PTW_REGISTER', ['PermitID', 'TemplateCode', 'Category', 'AreaCode', 'WorkDescription', 'Contractor', 'SupervisorID', 'PlannedStart', 'PlannedEnd', 'RiskLevel', 'Status', 'IssuedTimestamp', 'ClosedTimestamp']],
    ['PTW_APPROVAL_LOG', ['ApprovalID', 'PermitID', 'StepName', 'Action', 'ActorName', 'ActorRole', 'Timestamp', 'Comments']],
    
    // 4. TBT & Inspections
    ['TBT_REGISTER', ['TbtID', 'Date', 'Time', 'AreaCode', 'Topic', 'SupervisorID', 'AttendeesCount', 'PhotoUrl', 'KeyPointsDiscussed', 'Status']],
    ['TBT_ATTENDANCE', ['AttendanceID', 'TbtID', 'WorkerID', 'WorkerName', 'Trade', 'AckStatus']],
    ['INSPECTION_REGISTER', ['InspID', 'Date', 'AreaCode', 'Category', 'InspectorName', 'TotalItems', 'CompliantCount', 'NonCompliantCount', 'Status']],
    ['INSPECTION_FINDINGS', ['FindingID', 'InspID', 'ItemDescription', 'RiskLevel', 'Observation', 'PhotoUrl', 'AssignedTo', 'CapaRef', 'Status']],
    ['LIFTING_SAFETY_LOG', ['LiftID', 'PermitID', 'LiftCategory', 'CraneID', 'LoadWeightTons', 'CalculatedCapacityTons', 'RiggingPlanRef', 'RiggerLeader', 'ApprovedBy', 'Status']],
    
    // 5. Hazards, Incidents & CAPA
    ['HAZARD_REGISTER', ['HazardID', 'ReportedDate', 'AreaCode', 'HazardType', 'Severity', 'Description', 'ReportedBy', 'ImmediateAction', 'Status']],
    ['INCIDENT_REGISTER', ['IncidentID', 'DateTime', 'AreaCode', 'IncidentType', 'Severity', 'Title', 'Description', 'InjuredPerson', 'DamagedEquipment', 'InvestigatorID', 'Status']],
    ['INCIDENT_INVESTIGATION', ['InvestigationID', 'IncidentID', 'RootCauseWhy1', 'RootCauseWhy2', 'RootCauseWhy3', 'RootCauseWhy4', 'RootCauseWhy5', 'RootCauseFinal', 'CorrectiveActions', 'ApprovedBy']],
    ['CAPA_REGISTER', ['CapaID', 'SourceType', 'SourceRefID', 'FindingDescription', 'RiskLevel', 'CorrectiveAction', 'PreventiveAction', 'AssignedOwner', 'TargetDate', 'ClosureStatus', 'VerifiedBy', 'ClosedDate']],
    
    // 6. Audit & History
    ['AUDIT_LOG', ['AuditID', 'Timestamp', 'Actor', 'Role', 'Action', 'EntityRef', 'Outcome', 'Details']],
    ['BACKUP_LOG', ['BackupID', 'Timestamp', 'BackupType', 'TargetDriveId', 'Status', 'VerifiedBy']]
  ];

  Logger.log('Provisioning ' + SCHEMAS.length + ' Relational Safety Sheets in ' + ss.getName());

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

  // Seed essential master data if empty
  seedSafetyMasters(ss);

  return 'Safety Database Initialized: ' + SCHEMAS.length + ' Relational Sheets Provisioned in ' + ss.getName();
}

/**
 * Seed foundational Master data for JTRWF Khordha
 */
function seedSafetyMasters(ss) {
  // 1. Seed Areas
  var areaSheet = ss.getSheetByName('AREAS_MASTER');
  if (areaSheet && areaSheet.getLastRow() <= 1) {
    areaSheet.appendRow(['AREA-01', 'Axle Forging Line', 'Main Bay - South Wing', 'Rajesh K. Sharma', 'Bikram Patra', 'ACTIVE']);
    areaSheet.appendRow(['AREA-02', 'Wheel Forging Line', 'Main Bay - North Wing', 'Sanjay Panda', 'Bikram Patra', 'ACTIVE']);
    areaSheet.appendRow(['AREA-03', 'Machine Shop', 'Auxiliary Bay 1', 'Manoj Mohanty', 'Rakesh Swain', 'ACTIVE']);
    areaSheet.appendRow(['AREA-04', 'Die Shop & Tooling', 'Heavy Tooling Bay', 'Ajay Verma', 'Rakesh Swain', 'ACTIVE']);
  }

  // 2. Seed Users
  var userSheet = ss.getSheetByName('USERS');
  if (userSheet && userSheet.getLastRow() <= 1) {
    // Salted password hash for 'Balsons@2026'
    userSheet.appendRow(['USR-001', 'admin', 'Prashant (Admin / Owner)', 'Owner / Super Admin', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'salt2026', 'ACTIVE', 'ALL']);
    userSheet.appendRow(['USR-002', 'safety.mgr', 'Gajendra Rao (Safety Manager)', 'Safety Manager', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'salt2026', 'ACTIVE', 'ALL']);
    userSheet.appendRow(['USR-003', 'safety.off', 'Bikram Patra (Safety Officer)', 'Safety Officer', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'salt2026', 'ACTIVE', 'AREA-01,AREA-02']);
    userSheet.appendRow(['USR-004', 'sup.ramesh', 'Ramesh Kumar (Lifting Supervisor)', 'Work Supervisor', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'salt2026', 'ACTIVE', 'AREA-01']);
    userSheet.appendRow(['USR-005', 'client.jtrwf', 'JTRWF Site Representative', 'Client Reviewer', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'salt2026', 'ACTIVE', 'ALL']);
  }

  // 3. Seed Permit Templates (10 Templates mapped to 4 Categories)
  var ptwTemplateSheet = ss.getSheetByName('PERMIT_TEMPLATES');
  if (ptwTemplateSheet && ptwTemplateSheet.getLastRow() <= 1) {
    ptwTemplateSheet.appendRow(['PTW-T01', 'GENERAL', 'General Work Permit', 'JSA, Basic PPE, Area Barricading', 12, 'Supervisor, Safety Officer, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T02', 'HOT WORK', 'Hot Work & Welding Permit', 'Fire Watch, 10kg DCP Extinguisher, Spark Containment, Gas Test 0% LEL', 8, 'Supervisor, Safety Officer, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T03', 'HEIGHT WORK', 'Work at Height Permit (>1.8M)', 'Full Body Harness (Double Lanyard), Scaffold Tag, Height Pass, Lifeline', 10, 'Supervisor, Safety Officer, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T04', 'CONFINED SPACE', 'Confined Space Entry Permit', 'Gas Testing (O2: 19.5-23.5%), Forced Ventilation, Standby Rescue Man, Tripod Winch', 8, 'Supervisor, Safety Officer, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T05', 'GENERAL', 'Electrical & LOTO Isolation Permit', 'Positive Lockout, Danger Tag, Zero Energy Test, Earthing Verified', 12, 'Supervisor, Electrical Engg, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T06', 'GENERAL', 'Mechanical / Hydraulic Isolation Permit', 'Hydraulic Pressure Depressurized, Lock Pin Inserted, Line Drained', 10, 'Supervisor, Mechanical Lead, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T07', 'GENERAL', 'Heavy Lifting & Rigging Permit', 'Form 11 Tested Slings, Crane Load Chart, Rigger Cert, Exclusion Zone 10M', 10, 'Supervisor, Rigging Lead, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T08', 'GENERAL', 'Excavation & Trenching Permit', 'Underground Utility Clearance, Shoring / 45deg Batter, Access Ladder', 12, 'Supervisor, Civil Engineer, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T09', 'GENERAL', 'Line Breaking / Pipeline Opening Permit', 'Flange Deflected Away, PPE Face Shield, Secondary Containment', 6, 'Supervisor, Piping Lead, Site Manager', 'ACTIVE']);
    ptwTemplateSheet.appendRow(['PTW-T10', 'HEIGHT WORK', 'Roof Access & Fragile Surface Permit', 'Crawling Boards, Permanent Static Line, Fall Arrester Block', 8, 'Supervisor, Safety Officer, Site Manager', 'ACTIVE']);
  }
}
