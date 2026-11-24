/**
 * BALSONS OPERATIONS MANAGER - MASTER DATABASE INITIALIZER & SCHEMA PROVISIONER
 * File: DbInit.gs (also aliased as db.gs)
 * Dedicated Project Spreadsheet: 1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E
 * Script ID: 1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny
 * Architecture Standard: BALSONS-SAM-2026 / BEDS V1.0 (Baseline V7.2)
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 * Brand Mandate: "Difficult We Do Easily, Impossible Takes Little Time...!"
 */

var OPS_DEFAULT_SS_ID = '1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E';

/**
 * Main Database Initialization Function
 * Can be run directly from Google Apps Script Editor or triggered via WebApp API
 */
function initOperationsDatabase(targetSpreadsheetId) {
  var ssId = targetSpreadsheetId || PropertiesService.getScriptProperties().getProperty('OPS_SPREADSHEET_ID') || OPS_DEFAULT_SS_ID;
  if (!ssId) {
    throw new Error('Target Spreadsheet ID not provided. Set OPS_SPREADSHEET_ID in Script Properties or pass as parameter.');
  }

  var ss = SpreadsheetApp.openById(ssId);
  if (!ss) throw new Error('Spreadsheet unreachable for ID: ' + ssId);

  Logger.log('================================================================');
  Logger.log('BALSONS OPERATIONS DATABASE INITIALIZATION STARTED');
  Logger.log('Target Spreadsheet: ' + ss.getName() + ' (' + ssId + ')');
  Logger.log('================================================================');

  // 1. DEFINE RELATIONAL SCHEMA TABLE DEFINITIONS
  var SCHEMAS = [
    {
      name: 'SYSTEM_CONFIG',
      headers: ['ConfigKey', 'ConfigValue', 'Category', 'Description', 'EffectiveDate', 'UpdatedBy']
    },
    {
      name: 'WORK_PACKAGES',
      headers: [
        'PACKAGE_ID', 'TITLE', 'WORKSPACE_ID', 'WORKSTREAM_ID', 'ASSET_ID', 
        'SCOPE_REF', 'SCOPE_CLAUSE', 'STATUS', 'PLANNED_START', 'PLANNED_FINISH', 
        'ACTUAL_START', 'ACTUAL_FINISH', 'SUPERVISOR', 'CREW_SIZE', 'PROGRESS_BASIS', 
        'PROGRESS_PCT', 'CRANE_REQ', 'FORM11_TACKLE_REF', 'SAFETY_PTW_REF', 
        'READINESS_DRAWINGS', 'READINESS_FOUNDATION', 'READINESS_PATH', 'READINESS_TOOLS', 'READINESS_PTW', 
        'HOLD_CATEGORY', 'HOLD_REASON', 'HOLD_OWNER', 'EVIDENCE_URL', 'UPDATED_AT', 'CREATED_AT'
      ]
    },
    {
      name: 'ASSET_REGISTER',
      headers: [
        'ASSET_ID', 'ASSET_NAME', 'WORKSPACE_ID', 'WORKSTREAM_ID', 'OEM_MAKER', 
        'MODEL_SPEC', 'GROSS_WEIGHT_MT', 'FOOTPRINT_DIMENSIONS', 'FOUNDATION_STATUS', 
        'CRANE_CONFIG', 'CURRENT_STAGE', 'COMPLETION_PCT', 'REMARKS'
      ]
    },
    {
      name: 'SOW_RECONCILIATION_REGISTER',
      headers: [
        'ITEM_NO', 'EQUIPMENT_DESCRIPTION', 'SOW_QTY', 'RFQ_STATION_REF', 
        'INDICATIVE_WEIGHT_MT', 'WORKSPACE_ID', 'WORKSTREAM_ID', 'DISCREPANCY_CATEGORY', 
        'VARIANCE_REASON', 'COMMERCIAL_IMPACT', 'RESOLUTION_STATUS', 'LAST_REVIEWED'
      ]
    },
    {
      name: 'SHIFT_LOGBOOK',
      headers: [
        'LOG_ID', 'DATE', 'SHIFT_CODE', 'WORKSPACE_ID', 'WORKSTREAM_ID', 'ASSET_ID', 
        'LEAD_SUPERVISOR', 'CREW_STRENGTH', 'CRANE_DEPLOYED', 'FORM11_TACKLES_USED', 
        'SAFETY_PTW_NO', 'MILESTONES_ACHIEVED', 'SOW_PROGRESS_TODAY_PCT', 
        'CONSTRAINTS_DELAYS', 'SAFETY_INCIDENTS', 'NEXT_SHIFT_HANDOVER', 'SUPERVISOR_SIGN', 'CREATED_AT'
      ]
    },
    {
      name: 'MANPOWER_ROSTER',
      headers: [
        'BADGE_NO', 'FULL_NAME', 'TRADE_DISCIPLINE', 'DESIGNATION', 'PRIMARY_WORKSPACE', 
        'MEDICAL_FITNESS_EXPIRY', 'TPI_RIGGING_CERT_NO', 'TPI_VALIDITY', 'FORM11_QUALIFIED', 
        'SAFETY_INDUCTION_DATE', 'CURRENT_ALLOCATION', 'DEPLOYMENT_STATE', 'PHONE_CONTACT', 'STATUS'
      ]
    },
    {
      name: 'EQUIPMENT_CRANE_LOG',
      headers: [
        'EQUIPMENT_ID', 'EQUIPMENT_NAME', 'CAPACITY_SWL', 'MAKE_MODEL', 'CURRENT_LOCATION', 
        'FORM11_CERT_NO', 'TPI_CERT_EXPIRY', 'OPERATOR_NAME', 'OPERATOR_LICENSE', 
        'ASSIGNED_WORK_PACKAGE', 'MOBILIZATION_DATE', 'STATUS'
      ]
    },
    {
      name: 'HOLDS_AND_DISCREPANCIES',
      headers: [
        'HOLD_ID', 'DATE_RAISED', 'WORKSPACE_ID', 'WORKSTREAM_ID', 'ASSET_ID', 
        'HOLD_CATEGORY', 'DESCRIPTION', 'ROOT_CAUSE', 'RESPONSIBLE_PARTY', 
        'SOW_CLAUSE_IMPACT', 'TARGET_RESOLUTION_DATE', 'RESOLUTION_ACTION', 'STATUS', 'RESOLVED_DATE'
      ]
    },
    {
      name: 'AUDIT_LOG',
      headers: ['AUDIT_ID', 'TIMESTAMP', 'ACTOR', 'ROLE', 'ACTION', 'ENTITY_REF', 'POLICY_SECTION', 'DETAILS']
    }
  ];

  // 2. PROVISION SHEETS WITH BEDS V1.0 STYLING
  var provisionedSheets = [];
  SCHEMAS.forEach(function(schema) {
    var name = schema.name;
    var headers = schema.headers;
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }

    // Set Header Values
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Apply BEDS V1.0 Master Header Style (Dark Slate Teal #102A35, White Bold Text)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#102A35')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setFontFamily('Arial')
      .setFontSize(10)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');

    sheet.setRowHeight(1, 32);
    sheet.setFrozenRows(1);

    provisionedSheets.push(name);
    Logger.log('Provisioned Sheet: ' + name + ' (' + headers.length + ' columns)');
  });

  // Remove default "Sheet1" if present and other sheets exist
  try {
    var defaultSheet = ss.getSheetByName('Sheet1');
    if (defaultSheet && ss.getSheets().length > 1) {
      ss.deleteSheet(defaultSheet);
    }
  } catch (e) {
    Logger.log('Note: Default Sheet1 could not be deleted: ' + e);
  }

  // 3. SEED BASELINE MASTER DATA
  Logger.log('Seeding Master Operational Data...');
  seedSystemConfig(ss);
  seedWorkPackages(ss);
  seedAssetRegister(ss);
  seedSowReconciliation(ss);
  seedShiftLogbook(ss);
  seedManpowerRoster(ss);
  seedEquipmentCranes(ss);
  seedHoldsAndDiscrepancies(ss);
  seedAuditLog(ss);

  Logger.log('================================================================');
  Logger.log('BALSONS OPERATIONS DATABASE INITIALIZATION COMPLETED SUCCESSFUL');
  Logger.log('================================================================');

  return {
    success: true,
    message: 'BALSONS Operations Database Initialized Successfully in ' + ss.getName(),
    spreadsheetId: ssId,
    provisionedSheets: provisionedSheets,
    timestamp: new Date().toISOString()
  };
}

/**
 * Convenient alias function to match user requests
 */
function runDbInit() {
  return initOperationsDatabase();
}

/**
 * 1. Seed System Configuration
 */
function seedSystemConfig(ss) {
  var sheet = ss.getSheetByName('SYSTEM_CONFIG');
  if (sheet.getLastRow() > 1) return; // Prevent duplicate seeding

  var configs = [
    ['PROJECT_NAME', 'Jupiter Tatravagonka Railwheel Factory (JTRWF)', 'PROJECT', 'Anchor Manufacturing Site', '2026-11-01', 'SUPER_ADMIN'],
    ['PROJECT_ID', 'PRJ-JTRWF-SCHULER', 'PROJECT', 'Master Project Unique Code', '2026-11-01', 'SUPER_ADMIN'],
    ['CLIENT_NAME', 'Jupiter Tatravagonka Railwheel Factory', 'CLIENT', 'Client / Owner Organization', '2026-11-01', 'SUPER_ADMIN'],
    ['CONTRACTOR', 'BALSONS Heavy Lift & Shift', 'ORGANIZATION', 'Lead Erection & Rigging Contractor', '2026-11-01', 'SUPER_ADMIN'],
    ['PORTAL_BASELINE', 'BAL-OPS-E2E-007 V7.2', 'GOVERNANCE', 'Consolidated Master Technical Baseline', '2026-11-21', 'SUPER_ADMIN'],
    ['BASELINE_MAN_DAYS_TOTAL', '1792', 'OPERATIONS', 'Total Combined Man-Days Baseline (717 Axle + 1075 Wheel)', '2026-11-01', 'SUPER_ADMIN'],
    ['CRANE_PRIMARY_MAIN', 'Demag CC2500 250T Crawler Crane', 'EQUIPMENT', 'Primary Heavy Tandem Rigging Crane', '2026-11-01', 'SUPER_ADMIN'],
    ['CRANE_SECONDARY_TAIL', 'Sany SCC1500 150T Crawler Crane', 'EQUIPMENT', 'Tail Control & Dual Lift Crane', '2026-11-01', 'SUPER_ADMIN'],
    ['TOTAL_SOW_UNITS', '31', 'RECONCILIATION', 'Total Units in Client Approved Statement of Work', '2026-11-21', 'SUPER_ADMIN'],
    ['TOTAL_INDICATIVE_WEIGHT_MT', '1927.314', 'RECONCILIATION', 'Gross Indicative Weight in Metric Tons', '2026-11-21', 'SUPER_ADMIN']
  ];

  sheet.getRange(2, 1, configs.length, configs[0].length).setValues(configs);
}

/**
 * 2. Seed Work Packages (12 Core Verified Packages across All Workspaces)
 */
function seedWorkPackages(ss) {
  var sheet = ss.getSheetByName('WORK_PACKAGES');
  if (sheet.getLastRow() > 1) return;

  var pkgs = [
    // LINE-AXLE
    [
      'WP-AXLE-PRS-001', 'Schuler Axle Press Crown Tandem Rigging & Rough Levelling', 'LINE-AXLE', 'AXLE-PRESS-CELL', 'AST-AXLE-SCH-01',
      'SOW-MECH-05.1', 'Unloading, shifting to foundation, placement on columns, rough levelling', 'In progress',
      '2026-11-15', '2026-11-25', '2026-11-16', '', 'Dilip Rout', 8, 'Milestone 4 of 6 (Crown Placed on Uprights)', 75,
      'Tandem Lift: Demag 250T (Main) + Sany 150T (Tail)', 'TKL-F11-2026-089 (Valid)', 'PTW-AXLE-049 (Active)',
      'YES', 'YES', 'YES', 'YES', 'YES',
      'NONE', '', '', 'https://drive.google.com/open?id=ops-ev-001', '2026-11-21T10:00:00Z', '2026-11-15T08:00:00Z'
    ],
    [
      'WP-AXLE-HYD-002', 'Hydraulic Puller & Bed Anchor Tie-Rod Pre-Tensioning', 'LINE-AXLE', 'AXLE-HYDRAULICS', 'AST-AXLE-PULL-01',
      'SOW-MECH-05.4', 'Internal shifting near foundation, mechanical mounting, torque tensioning', 'Mobilized',
      '2026-11-18', '2026-11-28', '2026-11-19', '', 'Dilip Rout', 6, 'Hydraulic skid positioned at Bay 2 pit', 35,
      'Farana 20T + 100T Hydraulic Jacking Station', 'TKL-F11-2026-092 (Valid)', 'PTW-AXLE-052 (Active)',
      'YES', 'YES', 'YES', 'YES', 'YES',
      'NONE', '', '', 'https://drive.google.com/open?id=ops-ev-002', '2026-11-21T11:00:00Z', '2026-11-18T08:00:00Z'
    ],
    [
      'WP-AXLE-TRL-003', 'Multi-Axle Modular Hydraulic Trailer Offloading & Entry', 'LINE-AXLE', 'AXLE-TRANSPORT', 'AST-AXLE-SCH-02',
      'SOW-LOG-01.2', 'Site gate reception, road survey clearance, internal transit to press pit', 'Scope verified',
      '2026-11-22', '2026-11-26', '', '', 'Dilip Rout', 5, 'Civil road compaction cleared; awaiting plant road permit', 15,
      'Multi-Axle Hydraulic Modular Trailer 8-Axle', 'TKL-F11-2026-074 (Valid)', 'PTW-AXLE-055 (Pending)',
      'YES', 'YES', 'YES', 'YES', 'NO',
      'PLANT_ROAD_PERMIT', 'Plant internal road transport permit awaiting client signoff', 'JTRWF Logistics', '', '2026-11-21T09:00:00Z', '2026-11-20T08:00:00Z'
    ],
    // LINE-WHEEL
    [
      'WP-WHEEL-FRM-001', 'Schuler Wheel Press Monobloc Bed Rigging & Pit Setting', 'LINE-WHEEL', 'WHEEL-PRESS-CELL', 'AST-WHEEL-SCH-01',
      'SOW-MECH-06.1', 'Foundation pit preparation check, baseplate anchoring, tandem lower', 'In progress',
      '2026-11-10', '2026-11-26', '2026-11-11', '', 'Dilip Rout', 10, 'Baseplate anchored; main lower scheduled', 60,
      'Demag CC2500 250T + Tail Sany 150T', 'TKL-F11-2026-065 (Valid)', 'PTW-WHEEL-031 (Active)',
      'YES', 'YES', 'YES', 'YES', 'YES',
      'NONE', '', '', 'https://drive.google.com/open?id=ops-ev-003', '2026-11-21T12:00:00Z', '2026-11-10T08:00:00Z'
    ],
    [
      'WP-WHEEL-FRN-002', 'Rotary Hearth Furnace Casing Segments Heavy Assembly', 'LINE-WHEEL', 'WHEEL-FURNACE', 'AST-WHEEL-FRN-01',
      'SOW-MECH-06.3', 'Shell segments placement, weld alignment, refractory support staging', 'Planned',
      '2026-11-24', '2026-12-05', '', '', 'Dilip Rout', 8, 'Rigging plan approved; awaiting civil grouting cure', 10,
      'Demag 250T Main Boom 42m', 'TKL-F11-2026-098 (Valid)', 'PTW-WHEEL-038 (Draft)',
      'YES', 'NO', 'YES', 'YES', 'NO',
      'CIVIL_GROUT_CURE', 'Civil foundation pedestal 7-day cube strength testing pending', 'JTRWF Civil', '', '2026-11-21T08:30:00Z', '2026-11-19T08:00:00Z'
    ],
    [
      'WP-WHEEL-MAN-003', 'Billet High-Speed Loading Manipulator Alignment', 'LINE-WHEEL', 'WHEEL-MANIPULATOR', 'AST-WHEEL-MAN-01',
      'SOW-MECH-06.5', 'Rail track foundation grouting, manipulator carriage mounting', 'Ready for planning',
      '2026-11-27', '2026-12-08', '', '', 'Dilip Rout', 5, 'Track rail alignment survey in progress', 5,
      'Hydra 20T Pick & Carry', 'TKL-F11-2026-104 (Valid)', 'PTW-WHEEL-041 (Pending)',
      'YES', 'YES', 'YES', 'YES', 'NO',
      'NONE', '', '', '', '2026-11-21T08:00:00Z', '2026-11-20T08:00:00Z'
    ],
    // AREA-MACHINE-SHOP-AXLE (7 Workstreams)
    [
      'WP-MS-FFG-001', 'VDF Boehringer / FFG Lathe Cells OP20.1 & OP20.2 Bed Anchor Rigging', 'AREA-MACHINE-SHOP-AXLE', 'MS-FFG', 'AST-MS-FFG-01',
      'SOW-MACH-07.1', 'Bay transfer, bedplate levelling, anti-vibration mount installation', 'In progress',
      '2026-11-14', '2026-11-24', '2026-11-15', '', 'Sarat Mishra', 6, 'OP20.1 levelled to 0.04mm/m; OP20.2 on rollers', 70,
      'Overhead Bay Crane 30T + Air Skates 40T', 'TKL-F11-2026-081 (Valid)', 'PTW-MS-018 (Active)',
      'YES', 'YES', 'YES', 'YES', 'YES',
      'NONE', '', '', 'https://drive.google.com/open?id=ops-ev-004', '2026-11-21T10:30:00Z', '2026-11-14T08:00:00Z'
    ],
    [
      'WP-MS-MAG-002', 'Automated Non-Destructive Testing UT/MPI Stations Erection', 'AREA-MACHINE-SHOP-AXLE', 'MS-MAG', 'AST-MS-MAG-01',
      'SOW-MACH-07.4', 'Ultrasonic OP40 & MPI OP80 structural enclosure and probe carriage mounting', 'Mobilized',
      '2026-11-19', '2026-11-29', '2026-11-20', '', 'Sarat Mishra', 4, 'Support framing anchored; probe gantry positioned', 40,
      'Overhead Bay Crane 15T', 'TKL-F11-2026-085 (Valid)', 'PTW-MS-021 (Active)',
      'YES', 'YES', 'YES', 'YES', 'YES',
      'NONE', '', '', 'https://drive.google.com/open?id=ops-ev-005', '2026-11-21T11:15:00Z', '2026-11-19T08:00:00Z'
    ],
    [
      'WP-MS-GER-003', 'GER CPT-3000 CNC Grinder Bed Rigging (Serials 25/2050 & 25/2051)', 'AREA-MACHINE-SHOP-AXLE', 'MS-GER', 'AST-MS-GER-01',
      'SOW-MACH-07.2', 'Heavy base placement, precision optical alignment, hydraulic tank positioning', 'In progress',
      '2026-11-12', '2026-11-23', '2026-11-13', '', 'Sarat Mishra', 6, 'SN 25/2050 on bed anchors; SN 25/2051 rough aligned', 80,
      'Overhead Crane 30T + Hydra 20T auxiliary', 'TKL-F11-2026-077 (Valid)', 'PTW-MS-015 (Active)',
      'YES', 'YES', 'YES', 'YES', 'YES',
      'NONE', '', '', 'https://drive.google.com/open?id=ops-ev-006', '2026-11-21T11:45:00Z', '2026-11-12T08:00:00Z'
    ],
    [
      'WP-MS-GANTRY-004', 'PARI Automated Overhead Gantry Heads GH01 to GH05 Runway Erection', 'AREA-MACHINE-SHOP-AXLE', 'MS-PARI-GANTRY', 'AST-MS-GANTRY-01',
      'SOW-MACH-07.3', 'Col-rail runway beam torqueing, 5 trolley heads hoist placement, busbar install', 'In progress',
      '2026-11-08', '2026-11-25', '2026-11-09', '', 'Sarat Mishra', 8, 'GH01-GH03 hung and aligned; GH04-GH05 rigged on ground', 65,
      'Tandem Manlift + 20T Mobile Gantry Crane', 'TKL-F11-2026-061 (Valid)', 'PTW-MS-011 (Active)',
      'YES', 'YES', 'YES', 'YES', 'YES',
      'NONE', '', '', 'https://drive.google.com/open?id=ops-ev-007', '2026-11-21T09:30:00Z', '2026-11-08T08:00:00Z'
    ],
    [
      'WP-MS-AUTO-005', 'Automated Transfer Shuttles OP05, OP75 (SPC) & OP105 (NOK) Rigging', 'AREA-MACHINE-SHOP-AXLE', 'MS-AUTO-TRANSFER', 'AST-MS-AUTO-01',
      'SOW-MACH-07.5', 'Floor track embedded channel anchoring, shuttle car placement, sensor rail check', 'Planned',
      '2026-11-23', '2026-12-02', '', '', 'Sarat Mishra', 4, 'Floor trench survey approved; shuttle parts staged', 20,
      'Forklift 5T + Heavy Roller Skates 15T', 'TKL-F11-2026-095 (Valid)', 'PTW-MS-024 (Draft)',
      'YES', 'YES', 'YES', 'YES', 'NO',
      'NONE', '', '', '', '2026-11-21T08:15:00Z', '2026-11-19T08:00:00Z'
    ],
    [
      'WP-MS-AUX-006', 'Central Coolant Filtration, Mist Collection & High-Pressure Piping Skid', 'AREA-MACHINE-SHOP-AXLE', 'MS-AUX', 'AST-MS-AUX-01',
      'SOW-MACH-07.6', 'Trench header pipe routing, tank skid placement, pump manifold alignment', 'Mobilized',
      '2026-11-17', '2026-11-27', '2026-11-18', '', 'Sarat Mishra', 5, 'Skid anchored; return headers welded 50%', 45,
      'Farana 20T + Rigging Lever Hoists 5T', 'TKL-F11-2026-088 (Valid)', 'PTW-MS-019 (Active)',
      'YES', 'YES', 'YES', 'YES', 'YES',
      'NONE', '', '', 'https://drive.google.com/open?id=ops-ev-008', '2026-11-21T10:15:00Z', '2026-11-17T08:00:00Z'
    ]
  ];

  sheet.getRange(2, 1, pkgs.length, pkgs[0].length).setValues(pkgs);
}

/**
 * 3. Seed Asset Register (18 Verified Assets)
 */
function seedAssetRegister(ss) {
  var sheet = ss.getSheetByName('ASSET_REGISTER');
  if (sheet.getLastRow() > 1) return;

  var assets = [
    ['AST-AXLE-SCH-01', 'Schuler Axle Forging Press Crown & Uprights', 'LINE-AXLE', 'AXLE-PRESS-CELL', 'Schuler Group (Germany)', 'Heavy Forging 4500T', 420.5, '12.5m x 8.2m x 9.8m', 'READY_POURED', 'Tandem 250T + 150T', 'CROWN_PLACED', 75, 'Critical path anchor asset'],
    ['AST-AXLE-SCH-02', 'Schuler Axle Press Base Bed & Anvil', 'LINE-AXLE', 'AXLE-PRESS-CELL', 'Schuler Group (Germany)', 'Base Frame 380T', 380.0, '11.0m x 7.5m x 4.2m', 'GROUTED', 'Tandem 250T + 150T', 'ANCHORED', 90, 'Bed bolts pre-tensioned to 85%'],
    ['AST-AXLE-PULL-01', 'Axle Press High-Pressure Hydraulic Puller Skid', 'LINE-AXLE', 'AXLE-HYDRAULICS', 'Rexroth / Schuler', '400 Bar Hydraulic Powerpack', 45.0, '6.0m x 3.5m x 2.8m', 'READY_PAD', 'Farana 20T', 'POSITIONED', 35, 'Auxiliary hydraulic station'],
    ['AST-WHEEL-SCH-01', 'Schuler Wheel Forging Press Main Monobloc Frame', 'LINE-WHEEL', 'WHEEL-PRESS-CELL', 'Schuler Group (Germany)', 'Monobloc 8000T Frame', 650.0, '14.0m x 9.0m x 11.5m', 'INSPECTION_CLEARED', 'Tandem 250T + 150T', 'PIT_LOWERING', 60, 'Heaviest single module in plant'],
    ['AST-WHEEL-SCH-02', 'Schuler Wheel Press Hydraulic Cylinder Head', 'LINE-WHEEL', 'WHEEL-PRESS-CELL', 'Schuler Group (Germany)', 'Main Cylinder 180T', 180.0, '7.5m x 5.0m x 4.0m', 'STAGED_YARD', 'Demag 250T Main', 'STAGED', 20, 'Awaiting frame final levelling'],
    ['AST-WHEEL-FRN-01', 'Rotary Hearth Billet Heating Furnace Shell', 'LINE-WHEEL', 'WHEEL-FURNACE', 'Andritz / SMS Group', 'Rotary Hearth D=18m', 280.0, 'Dia 18m Circular', 'GROUTING_CURE', 'Demag 250T Main', 'STAGED_SEGMENTS', 10, 'Awaiting 7-day cure report'],
    ['AST-WHEEL-MAN-01', 'High-Speed Billet Charging & Discharging Manipulator', 'LINE-WHEEL', 'WHEEL-MANIPULATOR', 'Dango & Dienenthal', 'Heavy Track Manipulator 15T', 35.0, '8.0m x 4.0m x 3.2m', 'TRACK_POURED', 'Hydra 20T', 'TRACK_ALIGNMENT', 5, 'Rail tolerance 1.0mm'],
    ['AST-MS-FFG-01', 'FFG Boehringer Axle Rough Turning Lathe OP20.1', 'AREA-MACHINE-SHOP-AXLE', 'MS-FFG', 'FFG Werke / VDF', 'Boehringer VDF 450T CNC', 28.5, '7.2m x 3.2m x 2.6m', 'ANCHORED', 'Overhead Bay 30T', 'ROUGH_LEVELLING', 70, 'Bed levelled to 0.04mm/m'],
    ['AST-MS-FFG-02', 'FFG Boehringer Axle Rough Turning Lathe OP20.2', 'AREA-MACHINE-SHOP-AXLE', 'MS-FFG', 'FFG Werke / VDF', 'Boehringer VDF 450T CNC', 28.5, '7.2m x 3.2m x 2.6m', 'READY_PAD', 'Overhead Bay 30T', 'SKATED_TO_PAD', 65, 'On transport skates'],
    ['AST-MS-FFG-05', 'FFG Boehringer Axle Finish Turning Lathe OP30.1', 'AREA-MACHINE-SHOP-AXLE', 'MS-FFG', 'FFG Werke / VDF', 'Boehringer VDF 450T CNC', 28.5, '7.2m x 3.2m x 2.6m', 'READY_PAD', 'Overhead Bay 30T', 'STAGED', 30, 'Cell 2 position'],
    ['AST-MS-MAG-01', 'Automated Ultrasonic Testing (UT) Station OP40.1', 'AREA-MACHINE-SHOP-AXLE', 'MS-MAG', 'Karl Deutsch / MAG', 'Automated Multichannel UT', 12.0, '5.5m x 3.0m x 2.4m', 'ANCHORED', 'Overhead Bay 15T', 'FRAMING_SET', 40, 'NDT immersion tank staged'],
    ['AST-MS-MAG-03', 'Magnetic Particle Inspection (MPI) Station OP80.1', 'AREA-MACHINE-SHOP-AXLE', 'MS-MAG', 'Tiede / MAG', 'Continuous AC/DC Bench', 9.5, '6.0m x 2.8m x 2.2m', 'READY_PAD', 'Overhead Bay 15T', 'STAGED', 25, 'Dark booth staging'],
    ['AST-MS-GER-01', 'GER CPT-3000 CNC Precision Axle Grinder SN 25/2050', 'AREA-MACHINE-SHOP-AXLE', 'MS-GER', 'GER Machine Tools (Spain)', 'CPT-3000 Universal CNC', 32.0, '8.5m x 3.8m x 2.8m', 'ANCHORED', 'Overhead Bay 30T', 'PRECISION_ALIGN', 80, 'Wheelhead mounted'],
    ['AST-MS-GER-02', 'GER CPT-3000 CNC Precision Axle Grinder SN 25/2051', 'AREA-MACHINE-SHOP-AXLE', 'MS-GER', 'GER Machine Tools (Spain)', 'CPT-3000 Universal CNC', 32.0, '8.5m x 3.8m x 2.8m', 'ANCHORED', 'Overhead Bay 30T', 'ROUGH_LEVELLING', 75, 'Tailstock mounted'],
    ['AST-MS-GANTRY-01', 'PARI Automated Overhead Gantry Head GH01 & Runway', 'AREA-MACHINE-SHOP-AXLE', 'MS-PARI-GANTRY', 'PARI Robotics / Linamar', 'Dual-Gripper Gantry 3.5T', 18.0, 'Span 12m x Length 48m', 'BEAMS_TORQUED', 'Manlift + 20T Gantry', 'HOIST_HUNG', 65, 'One of 5 physical gantries'],
    ['AST-MS-AUTO-01', 'Automated Input Transfer Shuttle Car OP05', 'AREA-MACHINE-SHOP-AXLE', 'MS-AUTO-TRANSFER', 'PARI / Handling Tech', 'Motorized Shuttle 10T', 6.5, '4.2m x 2.2m x 1.4m', 'TRACK_EMBEDDED', 'Forklift 5T', 'STAGED', 20, 'Floor channel completed'],
    ['AST-MS-AUTO-02', 'SPC Inspection Shuttle Car OP75 & NOK Shuttle OP105', 'AREA-MACHINE-SHOP-AXLE', 'MS-AUTO-TRANSFER', 'PARI / Handling Tech', 'Reject/Sample Shuttle 5T', 5.0, '3.8m x 2.0m x 1.2m', 'TRACK_EMBEDDED', 'Forklift 5T', 'STAGED', 15, 'SPC discharge line'],
    ['AST-MS-AUX-01', 'Central Coolant Chiller & Mist Extraction Skid', 'AREA-MACHINE-SHOP-AXLE', 'MS-AUX', 'Knoll / Donaldson', 'Central 12,000L Chiller', 22.0, '9.0m x 4.0m x 3.5m', 'READY_PAD', 'Farana 20T', 'PIPE_ROUTING', 45, 'Piping headers ongoing']
  ];

  sheet.getRange(2, 1, assets.length, assets[0].length).setValues(assets);
}

/**
 * 4. Seed SOW Reconciliation Register (Key Reconciliation Baseline)
 */
function seedSowReconciliation(ss) {
  var sheet = ss.getSheetByName('SOW_RECONCILIATION_REGISTER');
  if (sheet.getLastRow() > 1) return;

  var reconciliations = [
    [1, 'Schuler Axle Forging Press Cell Complete', 1, 'STN-AXLE-PRS-01', 845.5, 'LINE-AXLE', 'AXLE-PRESS-CELL', 'MATCHED', 'Scope and RFQ match 100%', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [2, 'Axle Hydraulic Tie-Rod Pre-Tensioning System', 1, 'STN-AXLE-HYD-01', 45.0, 'LINE-AXLE', 'AXLE-HYDRAULICS', 'MATCHED', 'Tensioning skid included in mechanical SOW', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [3, 'Schuler Wheel Forging Press Monobloc & Cylinders', 1, 'STN-WHEEL-PRS-01', 830.0, 'LINE-WHEEL', 'WHEEL-PRESS-CELL', 'MATCHED', 'Heaviest module scope confirmed', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [4, 'Rotary Hearth Furnace Casing Segments Assembly', 1, 'STN-WHEEL-FRN-01', 280.0, 'LINE-WHEEL', 'WHEEL-FURNACE', 'WEIGHT_VARIATION', 'Client drawing revision added 18 MT stiffeners', 'CLAIM_SUBMITTED', 'PENDING_APPROVAL', '2026-11-21'],
    [5, 'Wheel High-Speed Manipulator & Rails', 1, 'STN-WHEEL-MAN-01', 35.0, 'LINE-WHEEL', 'WHEEL-MANIPULATOR', 'MATCHED', 'Rail installation verified within BALSONS scope', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [6, 'VDF Boehringer OP20 Rough Turning Lathes (4 units)', 4, 'STN-MS-FFG-OP20', 114.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-FFG', 'MATCHED', '4 identical machines OP20.1 to OP20.4', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [7, 'VDF Boehringer OP30 Finish Turning Lathes (4 units)', 4, 'STN-MS-FFG-OP30', 114.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-FFG', 'MATCHED', '4 identical machines OP30.1 to OP30.4', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [8, 'GER CPT-3000 CNC Precision Grinder SN 25/2050', 1, 'STN-MS-GER-01', 32.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-GER', 'MATCHED', 'Machine tagged and serial number verified', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [9, 'GER CPT-3000 CNC Precision Grinder SN 25/2051', 1, 'STN-MS-GER-02', 32.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-GER', 'MATCHED', 'Machine tagged and serial number verified', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [10, 'PARI Automated Overhead Gantry Heads (GH01-GH05)', 5, 'STN-MS-GANTRY-ALL', 90.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-PARI-GANTRY', 'RFQ_DISCREPANCY', 'RFQ listed 1 line; Field verification proves exactly 5 physical gantry heads', 'CLAIM_SUBMITTED', 'RECONCILED', '2026-11-21'],
    [11, 'UT Testing Station OP40 (2 units)', 2, 'STN-MS-MAG-OP40', 24.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-MAG', 'MATCHED', '2 ultrasonic inspection stations', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [12, 'MPI Testing Station OP80 (2 units)', 2, 'STN-MS-MAG-OP80', 19.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-MAG', 'MATCHED', '2 magnetic particle benches', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [13, 'Transfer Shuttles OP05, OP75 (SPC), OP105 (NOK)', 3, 'STN-MS-AUTO-SHT', 16.5, 'AREA-MACHINE-SHOP-AXLE', 'MS-AUTO-TRANSFER', 'MATCHED', '3 automated transfer cars', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [14, 'Central Coolant Chiller & Mist Collection Skids', 2, 'STN-MS-AUX-SKID', 44.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-AUX', 'MATCHED', 'Auxiliary utility systems', 'APPROVED', 'RESOLVED', '2026-11-21'],
    [15, 'Unallocated OEM Staging Components', 4, 'STN-MS-OEM-PEND', 22.0, 'AREA-MACHINE-SHOP-AXLE', 'MS-OEM-PENDING', 'OEM_ATTRIBUTION', 'Pending vendor bill of lading matching', 'NEUTRAL', 'IN_REVIEW', '2026-11-21']
  ];

  sheet.getRange(2, 1, reconciliations.length, reconciliations[0].length).setValues(reconciliations);
}

/**
 * 5. Seed Shift Logbook (6 Realistic Shift Log Handovers)
 */
function seedShiftLogbook(ss) {
  var sheet = ss.getSheetByName('SHIFT_LOGBOOK');
  if (sheet.getLastRow() > 1) return;

  var logs = [
    [
      'LOG-20261121-S1-AXLE', '2026-11-21', 'Shift A (Morning)', 'LINE-AXLE', 'AXLE-PRESS-CELL', 'AST-AXLE-SCH-01',
      'Dilip Rout', 8, 'Demag 250T + Sany 150T', 'TKL-F11-2026-089 (Slings 50T x 4)', 'PTW-AXLE-049',
      'Completed crown lift off trailer; hoisted 4.5m; rough aligned with upright pin guide', 15,
      'Wind gust reached 22 km/h at 11:30 AM; paused lift 25 minutes per crane safety limit', 'NONE',
      'Handed over to Shift B for anchor bolt insertion and dial gauge placement', 'Dilip Rout', '2026-11-21T14:15:00Z'
    ],
    [
      'LOG-20261121-S1-WHEEL', '2026-11-21', 'Shift A (Morning)', 'LINE-WHEEL', 'WHEEL-PRESS-CELL', 'AST-WHEEL-SCH-01',
      'Dilip Rout', 10, 'Demag 250T Crawler', 'TKL-F11-2026-065 (Grommet Slings 100T)', 'PTW-WHEEL-031',
      'Positioned wheel bedplate on hydraulic jacks; verified pit center coordinates with surveyor', 10,
      'Minor water seepage in pit corner 3; sump pump ran 45 minutes to clear before work', 'NONE',
      'Shift B to proceed with precision shimming under baseplate pads', 'Dilip Rout', '2026-11-21T14:20:00Z'
    ],
    [
      'LOG-20261121-S1-MACH', '2026-11-21', 'Shift A (Morning)', 'AREA-MACHINE-SHOP-AXLE', 'MS-FFG', 'AST-MS-FFG-01',
      'Sarat Mishra', 6, 'Bay Crane 30T', 'TKL-F11-2026-081 (Wire Rope 25T)', 'PTW-MS-018',
      'OP20.1 lathe bed levelled to 0.04mm/m using master spirit level; base nuts torqued to 350 Nm', 20,
      'None; electrical trunking above machine is clear', 'NONE',
      'Handover to Shift B to start hydraulic connection and tailstock rough positioning', 'Sarat Mishra', '2026-11-21T14:30:00Z'
    ],
    [
      'LOG-20261120-S2-AXLE', '2026-11-20', 'Shift B (Evening)', 'LINE-AXLE', 'AXLE-PRESS-CELL', 'AST-AXLE-SCH-01',
      'Dilip Rout', 7, 'Demag 250T + Sany 150T', 'TKL-F11-2026-089', 'PTW-AXLE-049',
      'Tandem crane rigging rigged and tested with 50T test weight; rigging certified by TPI', 10,
      'Night illumination floodlight mast generator refueled', 'NONE',
      'Ready for morning lift', 'Dilip Rout', '2026-11-20T22:00:00Z'
    ],
    [
      'LOG-20261120-S2-MACH', '2026-11-20', 'Shift B (Evening)', 'AREA-MACHINE-SHOP-AXLE', 'MS-GER', 'AST-MS-GER-01',
      'Sarat Mishra', 5, 'Bay Crane 30T', 'TKL-F11-2026-077', 'PTW-MS-015',
      'GER Grinder SN 25/2050 bed set onto anti-vibration damping pads; rough cross-level completed', 15,
      'GER OEM technician arrived on site; verified foundation flatness certificate', 'NONE',
      'Proceed with precision spirit level alignment next shift', 'Sarat Mishra', '2026-11-20T22:15:00Z'
    ],
    [
      'LOG-20261120-S1-GANTRY', '2026-11-20', 'Shift A (Morning)', 'AREA-MACHINE-SHOP-AXLE', 'MS-PARI-GANTRY', 'AST-MS-GANTRY-01',
      'Sarat Mishra', 8, 'Manlift 16m + Gantry Crane 20T', 'TKL-F11-2026-061', 'PTW-MS-011',
      'GH01 and GH02 hoist trolleys hoisted and locked to runway rails; busbar power collectors aligned', 25,
      'High work safety harness 100% tie-off enforced; safety officer inspected lanyards', 'NONE',
      'GH03 staging in progress on ground', 'Sarat Mishra', '2026-11-20T14:30:00Z'
    ]
  ];

  sheet.getRange(2, 1, logs.length, logs[0].length).setValues(logs);
}

/**
 * 6. Seed Manpower Roster (16 Operations Personnel across 8 Lifecycle States)
 */
function seedManpowerRoster(ss) {
  var sheet = ss.getSheetByName('MANPOWER_ROSTER');
  if (sheet.getLastRow() > 1) return;

  var roster = [
    ['BAL-OPS-001', 'Dilip Rout', 'Erection & Rigging', 'Operations Manager / Supervisor', 'ALL', '2027-04-15', 'TPI-RIG-2026-012', '2027-02-28', 'YES', '2026-10-01', 'LINE-AXLE / LINE-WHEEL', 'ACTIVE_DEPLOYED', '+91 94370 11001', 'ACTIVE'],
    ['BAL-OPS-002', 'Sarat Mishra', 'Machine Installation', 'Area Manager / Supervisor', 'AREA-MACHINE-SHOP-AXLE', '2027-05-20', 'TPI-RIG-2026-018', '2027-03-15', 'YES', '2026-10-01', 'Machine Shop Bay', 'ACTIVE_DEPLOYED', '+91 94370 11002', 'ACTIVE'],
    ['BAL-OPS-003', 'Manoj Das', 'Rigging & Heavy Lift', 'Lead Heavy Rigger', 'LINE-AXLE', '2027-03-10', 'TPI-RIG-2026-045', '2027-01-30', 'YES', '2026-10-05', 'Schuler Axle Tandem', 'ACTIVE_DEPLOYED', '+91 94370 11003', 'ACTIVE'],
    ['BAL-OPS-004', 'Ramesh Kumar', 'Rigging & Heavy Lift', 'Senior Certified Rigger', 'LINE-AXLE', '2027-02-18', 'TPI-RIG-2026-048', '2027-01-30', 'YES', '2026-10-05', 'Schuler Axle Tandem', 'ACTIVE_DEPLOYED', '+91 94370 11004', 'ACTIVE'],
    ['BAL-OPS-005', 'Bikash Mohapatra', 'Safety & Rigging', 'Site Safety Steward', 'ALL', '2027-06-12', 'TPI-HSE-2026-004', '2027-05-30', 'YES', '2026-10-02', 'PTW Audit & Oversight', 'ACTIVE_DEPLOYED', '+91 94370 11005', 'ACTIVE'],
    ['BAL-OPS-006', 'Pradeep Nayak', 'Mechanical Fitting', 'Millwright Fitter Foreman', 'LINE-WHEEL', '2027-04-05', 'TPI-FIT-2026-022', '2027-02-28', 'YES', '2026-10-08', 'Wheel Monobloc Lower', 'ACTIVE_DEPLOYED', '+91 94370 11006', 'ACTIVE'],
    ['BAL-OPS-007', 'Kailash Sahoo', 'Mechanical Fitting', 'Precision Millwright Fitter', 'LINE-WHEEL', '2027-03-22', 'TPI-FIT-2026-029', '2027-02-28', 'YES', '2026-10-08', 'Wheel Monobloc Lower', 'ACTIVE_DEPLOYED', '+91 94370 11007', 'ACTIVE'],
    ['BAL-OPS-008', 'Subhashree Jena', 'Hydraulics & Piping', 'Hydraulic Technician', 'LINE-AXLE', '2027-05-15', 'TPI-HYD-2026-009', '2027-04-30', 'YES', '2026-10-12', 'Axle Puller Powerpack', 'ACTIVE_DEPLOYED', '+91 94370 11008', 'ACTIVE'],
    ['BAL-OPS-009', 'Tapan Barik', 'Crane Operations', 'Demag 250T Master Operator', 'LINE-AXLE', '2027-01-30', 'TPI-CRN-2026-001', '2026-12-31', 'YES', '2026-10-03', 'Demag CC2500 Main Lift', 'ACTIVE_DEPLOYED', '+91 94370 11009', 'ACTIVE'],
    ['BAL-OPS-010', 'Ganesh Pradhan', 'Crane Operations', 'Sany 150T Master Operator', 'LINE-AXLE', '2027-02-15', 'TPI-CRN-2026-007', '2027-01-31', 'YES', '2026-10-03', 'Sany SCC1500 Tail Lift', 'ACTIVE_DEPLOYED', '+91 94370 11010', 'ACTIVE'],
    ['BAL-OPS-011', 'Rabindra Sethi', 'Precision Alignment', 'Laser Optical Alignment Tech', 'AREA-MACHINE-SHOP-AXLE', '2027-04-18', 'TPI-ALI-2026-003', '2027-03-31', 'YES', '2026-10-15', 'GER Grinder Optical', 'ACTIVE_DEPLOYED', '+91 94370 11011', 'ACTIVE'],
    ['BAL-OPS-012', 'Debendra Behera', 'Overhead Rigging', 'Gantry Rigging Specialist', 'AREA-MACHINE-SHOP-AXLE', '2027-03-28', 'TPI-RIG-2026-055', '2027-02-28', 'YES', '2026-10-18', 'PARI Gantry Hoists', 'ACTIVE_DEPLOYED', '+91 94370 11012', 'ACTIVE'],
    ['BAL-OPS-013', 'Ashok Samal', 'Rigging & Heavy Lift', 'Rigger Grade 1', 'LINE-WHEEL', '2027-05-02', 'TPI-RIG-2026-061', '2027-04-30', 'YES', '2026-10-20', 'Furnace Staging', 'ALLOCATED', '+91 94370 11013', 'ACTIVE'],
    ['BAL-OPS-014', 'Niranjan Jena', 'Rigging & Heavy Lift', 'Rigger Grade 2', 'LINE-AXLE', '2027-04-11', 'TPI-RIG-2026-068', '2027-03-31', 'YES', '2026-10-22', 'Axle Skid Yard', 'STANDBY_HOLD', '+91 94370 11014', 'ACTIVE'],
    ['BAL-OPS-015', 'Bijay Patra', 'Electrical & Controls', 'Industrial Electrician', 'AREA-MACHINE-SHOP-AXLE', '2027-06-01', 'TPI-ELE-2026-011', '2027-05-31', 'YES', '2026-11-01', 'Awaiting Busbar Clearance', 'FIT_CLEARED', '+91 94370 11015', 'ACTIVE'],
    ['BAL-OPS-016', 'Sanjay Swain', 'Rigging Trainee', 'Apprentice Rigger', 'ALL', '2027-07-15', 'PENDING', '2026-12-15', 'NO', '2026-11-15', 'Tool Crib Training', 'INDUCTED', '+91 94370 11016', 'ACTIVE']
  ];

  sheet.getRange(2, 1, roster.length, roster[0].length).setValues(roster);
}

/**
 * 7. Seed Equipment & Crane Master
 */
function seedEquipmentCranes(ss) {
  var sheet = ss.getSheetByName('EQUIPMENT_CRANE_LOG');
  if (sheet.getLastRow() > 1) return;

  var equipment = [
    ['EQ-CRN-250T', 'Demag CC2500 Heavy Crawler Crane', '250 Metric Tons', 'Terex Demag CC2500', 'Axle Press Bay 1 North', 'F11-CRN-2026-001', '2027-03-15', 'Tapan Barik', 'DL-OD-CRN-99812', 'WP-AXLE-PRS-001', '2026-11-05', 'ACTIVE_DEPLOYED'],
    ['EQ-CRN-150T', 'Sany SCC1500 Hydraulic Crawler Crane', '150 Metric Tons', 'Sany SCC1500-C', 'Axle Press Bay 1 South', 'F11-CRN-2026-002', '2027-04-10', 'Ganesh Pradhan', 'DL-OD-CRN-99845', 'WP-AXLE-PRS-001', '2026-11-06', 'ACTIVE_DEPLOYED'],
    ['EQ-HYD-020T', 'Farana 20T Pick & Carry Mobile Crane', '20 Metric Tons', 'Escorts TRX 2040', 'Central Internal Yard', 'F11-CRN-2026-015', '2027-02-28', 'Balaram Rout', 'DL-OD-CRN-88123', 'WP-AXLE-HYD-002', '2026-10-15', 'ACTIVE_DEPLOYED'],
    ['EQ-SKD-100T', 'Enerpac Synchronous Jacking Skid 4-Point', '400 Metric Tons (4x100T)', 'Enerpac EVO-W-4', 'Axle Machine Bay Pit', 'F11-HYJ-2026-088', '2027-05-15', 'Subhashree Jena', 'CERT-HYD-2026-01', 'WP-AXLE-PRS-001', '2026-11-12', 'ACTIVE_DEPLOYED'],
    ['EQ-LAS-TRK1', 'Faro Vantage Precision Laser Tracker', 'Optical Micron Accuracy', 'Faro Vantage S6', 'Machine Shop Lab / Bay', 'CAL-OPT-2026-092', '2027-08-30', 'Rabindra Sethi', 'FARO-CERT-881', 'WP-MS-GER-003', '2026-11-01', 'ACTIVE_DEPLOYED'],
    ['EQ-GN2-020T', 'Auxiliary Overhead Bay Gantry Crane 20T', '20 Metric Tons', 'Mukand Heavy Overhead', 'Machine Shop Bay Overhead', 'F11-EOT-2026-044', '2027-06-30', 'Plant Operator (JTRWF)', 'EOT-OD-7762', 'WP-MS-GANTRY-004', '2026-10-01', 'ACTIVE_DEPLOYED']
  ];

  sheet.getRange(2, 1, equipment.length, equipment[0].length).setValues(equipment);
}

/**
 * 8. Seed Holds & Discrepancies Register
 */
function seedHoldsAndDiscrepancies(ss) {
  var sheet = ss.getSheetByName('HOLDS_AND_DISCREPANCIES');
  if (sheet.getLastRow() > 1) return;

  var holds = [
    [
      'HLD-AXLE-FND-001', '2026-11-17', 'LINE-AXLE', 'AXLE-PRESS-CELL', 'AST-AXLE-SCH-01',
      'CIVIL_TOLERANCE', 'Pocket hole depth on bolt axis C3 is 45mm shallower than Schuler Foundation Drawing Rev C',
      'Civil casting variation during second pour', 'JTRWF Civil / Tata Projects', 'SOW-MECH-05.1 Clause 3',
      '2026-11-23', 'Core drilling of 45mm requested; core rig mobilized on site', 'ACTIVE', ''
    ],
    [
      'HLD-WHEEL-FND-002', '2026-11-19', 'LINE-WHEEL', 'WHEEL-FURNACE', 'AST-WHEEL-FRN-01',
      'CIVIL_CURE', 'Pedestal concrete 7-day cube compressive strength report pending from testing laboratory',
      'Mandatory NABL lab test turnaround period', 'JTRWF Quality Lab', 'SOW-MECH-06.3 Clause 2',
      '2026-11-24', 'Expedite lab test report; preliminary Schmidt hammer rebound indicates >35 MPa', 'ACTIVE', ''
    ],
    [
      'HLD-AXLE-TRL-003', '2026-11-20', 'LINE-AXLE', 'AXLE-TRANSPORT', 'AST-AXLE-SCH-02',
      'PLANT_LOGISTICS', 'Plant internal main transit road permit pending clearance due to pipe rack overhead work',
      'Overhead piping contractor scaffold blocking 6.5m clear corridor', 'JTRWF Site Logistics', 'SOW-LOG-01.2 Clause 1',
      '2026-11-22', 'Corridor clearance meeting conducted; temporary scaffold modification scheduled 6:00 AM', 'ACTIVE', ''
    ],
    [
      'HLD-MS-OEM-004', '2026-11-15', 'AREA-MACHINE-SHOP-AXLE', 'MS-OEM-PENDING', 'AST-MS-AUX-01',
      'OEM_DOCUMENTATION', '4 crates marked FFG auxiliary coolant return lacking OEM packing slip and terminal diagrams',
      'Consignment split at Chennai port transit', 'FFG India Logistics', 'SOW-MACH-07.6 Clause 4',
      '2026-11-21', 'Packing list received via email from FFG Germany; unboxing in presence of client', 'RESOLVED', '2026-11-21'
    ]
  ];

  sheet.getRange(2, 1, holds.length, holds[0].length).setValues(holds);
}

/**
 * 9. Seed Super Admin Audit Log
 */
function seedAuditLog(ss) {
  var sheet = ss.getSheetByName('AUDIT_LOG');
  if (sheet.getLastRow() > 1) return;

  var logs = [
    [
      'AUD-OPS-INIT-001', new Date().toISOString(), 'SYSTEM', 'SUPER_ADMIN', 
      'INITIALIZE_OPERATIONS_DATABASE', '1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E', 
      'Policy Section 1 - Single Super Administrator Governance', 
      'BALSONS Operations Database Initialized with 9 Relational Sheets and Baseline Seed Data.'
    ]
  ];

  sheet.getRange(2, 1, logs.length, logs[0].length).setValues(logs);
}
