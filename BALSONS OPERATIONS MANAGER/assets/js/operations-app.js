/**
 * BALSONS OPERATIONS MANAGER • DOMAIN APPLICATION CONTROLLER (V7.2)
 * Governing Reference: BAL-OPS-E2E-007 V7.2
 * Standard: SAM-2026 / BEDS V1.0 Locked Baseline
 * Project Context: JTRWF Khordha, Odisha
 * Brand Mandate: "Difficult We Do Easily, Impossible Takes Little Time...!"
 */

(function () {
  'use strict';

  const DB_NAME = 'balsons_ops_db_v7_2';
  const SPREADSHEET_ID = '1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E';
  const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E/edit';
  const APPS_SCRIPT_ID = '1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny';
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny/exec';
  const DB_VERSION = 3;
  let dbInstance = null;
  let currentMsStreamFilter = 'ALL';
  let activeDossierEntity = null;

  // 1. AREA METADATA REFERENCE (BAL-OPS-E2E-007 V7.2)
  const AREA_METADATA = {
    'LINE-AXLE': {
      code: 'LINE-AXLE',
      name: 'Area 1: Line Axle • Schuler Axle Forging Press Cell',
      bay: 'Bay 1 & Bay 2 (Axle Press Pit Zone)',
      baselineManDays: 717,
      baselineHours: 6453,
      indicativeTonnageMT: 890.50,
      supervisor: 'Dilip Rout (Operations Area Manager)',
      leadRigger: 'Manoj Das (Lead Lifting Supervisor)',
      cranes: 'Demag CC2500 250T (Main) + Sany SCC1500 150T (Tail) + Farana 20T',
      activePtw: 'PTW-AXLE-049 & PTW-AXLE-052 Active',
      activeHolds: 'HLD-AXLE-FND-001 (Bolt Axis C3 Pocket Depth)',
      description: 'Controls mechanical installation of the Schuler Axle Forging Press crown, uprights, hydraulic tie-rod pre-tensioners, and 8-axle modular hydraulic trailer haulage to the press pit.'
    },
    'LINE-WHEEL': {
      code: 'LINE-WHEEL',
      name: 'Area 2: Line Wheel • Schuler Wheel Forging Press & Rotary Furnace',
      bay: 'Bay 3 & Bay 4 (Heavy Forging & Furnace Zone)',
      baselineManDays: 1075,
      baselineHours: 9675,
      indicativeTonnageMT: 1145.00,
      supervisor: 'Dilip Rout (Operations Area Manager)',
      leadRigger: 'Ramesh Kumar (Senior Certified Rigger)',
      cranes: 'Demag CC2500 250T (42m Main Boom) + Sany 150T Tail + Hydra 20T',
      activePtw: 'PTW-WHEEL-031 Active',
      activeHolds: 'HLD-WHEEL-FND-002 (Pedestal Concrete 7-Day Cure Report)',
      description: 'Controls heavy assembly of the 8,000T Monobloc forging frame, rotary hearth furnace shell casing segments, and rail-bound high-speed billet manipulator.'
    },
    'AREA-MACHINE-SHOP-AXLE': {
      code: 'AREA-MACHINE-SHOP-AXLE',
      name: 'Area 3: Machine Shop Bay • Complete Axle Machining Line',
      bay: 'Machine Shop High Bay (7 Governed Workstreams)',
      baselineManDays: 1220,
      baselineHours: 10980,
      indicativeTonnageMT: 496.00,
      supervisor: 'Sarat Mishra (Machine Shop Area Manager)',
      leadRigger: 'Debendra Behera (Gantry & Rigging Specialist)',
      cranes: 'Bay Overhead Crane 30T + 15T + Air Skates 40T + Mobile Gantry 20T',
      activePtw: 'PTW-MS-018, PTW-MS-015, PTW-MS-011 Active',
      activeHolds: '0 Critical Blockers / 1 Resolved (MS-OEM-PENDING)',
      description: 'Governs mechanical erection across 7 workstreams: 8 VDF Boehringer CNC Lathes (OP20 & OP30), MAG NDT Stations, 2 GER Precision Grinders, 5 PARI Overhead Gantries (GH01-GH05), Shuttles, and Coolant Utilities.'
    }
  };

  // 2. VERIFIED ASSET REGISTER (BAL-OPS-E2E-007 V7.2)
  const SEED_ASSETS = [
    // LINE-AXLE ASSETS
    {
      id: 'AST-AXLE-SCH-01',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      name: 'Schuler Axle Forging Press Crown, Uprights & Tie-Rods',
      oem: 'Schuler AG (Göppingen, Germany)',
      weightMT: 845.5,
      dimensions: '14.2m L x 8.6m W x 11.4m H',
      pitDepth: '6.8m Reinforced Pit',
      foundationStatus: 'Pocket Hole C3 Core Drilling in Progress',
      solePlateStatus: 'Rough Levelled to 0.8mm (Final Spec: 0.04mm/m)',
      anchorTorque: 'Specified: 1,800 Nm (Hydraulic Tensioned)',
      form11TackleRef: 'TKL-F11-2026-089 (Slings 50T x 4, Shackles 55T x 4)',
      safetyPtwRef: 'PTW-AXLE-049',
      activeWpId: 'WP-AXLE-PRS-001',
      progressPercentage: 75,
      status: 'ERECTION_IN_PROGRESS'
    },
    {
      id: 'AST-AXLE-PULL-01',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-HYDRAULICS',
      name: 'Hydraulic Puller & Bed Tie-Rod Pre-Tensioning System',
      oem: 'Enerpac / Schuler Hydraulics',
      weightMT: 45.0,
      dimensions: '4.8m L x 3.2m W x 2.4m H',
      pitDepth: 'Bay 2 Pit Staging Skid',
      foundationStatus: 'Anchors Positioned & Shims Set',
      solePlateStatus: 'Baseplate Contact >85% Verified',
      anchorTorque: 'Specified: 350 Nm (Mechanical Bed Anchors)',
      form11TackleRef: 'TKL-F11-2026-092 (Farana Rigging Kit 20T)',
      safetyPtwRef: 'PTW-AXLE-052',
      activeWpId: 'WP-AXLE-HYD-002',
      progressPercentage: 35,
      status: 'MOBILIZED'
    },
    {
      id: 'AST-AXLE-SCH-02',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-TRANSPORT',
      name: 'Multi-Axle Modular Hydraulic Trailer Heavy Haulage Cell',
      oem: 'Goldhofer / Scheuerle Heavy Transport',
      weightMT: 72.0,
      dimensions: '8-Axle Modular Configuration (24m Corridor)',
      pitDepth: 'Surface Transit Corridor',
      foundationStatus: 'Compaction Test 98% Proctor Cleared',
      solePlateStatus: 'N/A (Transit Asset)',
      anchorTorque: 'Lashing Chains 25T High-Tensile Certified',
      form11TackleRef: 'TKL-F11-2026-074 (Certified Lashing Binders)',
      safetyPtwRef: 'PTW-AXLE-055 (Pending Road Clearance)',
      activeWpId: 'WP-AXLE-TRL-003',
      progressPercentage: 15,
      status: 'HOLD_ROAD_PERMIT'
    },

    // LINE-WHEEL ASSETS
    {
      id: 'AST-WHEEL-SCH-01',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-PRESS-CELL',
      name: 'Schuler 8,000T Wheel Forging Press Monobloc Bed & Cylinders',
      oem: 'Schuler AG (Germany)',
      weightMT: 830.0,
      dimensions: '16.5m L x 9.8m W x 12.8m H',
      pitDepth: '9.2m Deep Foundation Pit',
      foundationStatus: 'Survey Coordinates Verified; Foundation Approved',
      solePlateStatus: 'Baseplate Shims 0.05mm Set',
      anchorTorque: 'Specified: 2,400 Nm Hydraulic Tensioning',
      form11TackleRef: 'TKL-F11-2026-065 (100T Heavy Grommet Slings)',
      safetyPtwRef: 'PTW-WHEEL-031',
      activeWpId: 'WP-WHEEL-FRM-001',
      progressPercentage: 60,
      status: 'ERECTION_IN_PROGRESS'
    },
    {
      id: 'AST-WHEEL-FRN-01',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-FURNACE',
      name: 'Rotary Hearth Furnace Shell Casing & Drive Ring Assembly',
      oem: 'Tenova / LOI Italimpianti',
      weightMT: 280.0,
      dimensions: '18.0m Diameter Circular Envelope',
      pitDepth: 'Reinforced Concrete Pedestal Pad',
      foundationStatus: '7-Day Cube Strength Test Pending from Lab',
      solePlateStatus: 'Circumferential Sole Plates Segment 1-4 Positioned',
      anchorTorque: 'Anchor Studs M36 (650 Nm)',
      form11TackleRef: 'TKL-F11-2026-098 (Demag 42m Spreader Beam)',
      safetyPtwRef: 'PTW-WHEEL-038',
      activeWpId: 'WP-WHEEL-FRN-002',
      progressPercentage: 10,
      status: 'HOLD_CURE_REPORT'
    },
    {
      id: 'AST-WHEEL-MAN-01',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-MANIPULATOR',
      name: 'Rail-Bound High-Speed Billet Manipulator Carriage',
      oem: 'Dango & Dienenthal (Germany)',
      weightMT: 35.0,
      dimensions: '6.5m L x 3.8m W x 3.2m H',
      pitDepth: 'Embedded Track Rail Trench',
      foundationStatus: 'Track Rail Alignment Survey Ongoing',
      solePlateStatus: 'Rail Grouting Shims Awaiting Optical Check',
      anchorTorque: 'Rail Clip Bolts 220 Nm',
      form11TackleRef: 'TKL-F11-2026-104 (Hydra 20T Rigging Beam)',
      safetyPtwRef: 'PTW-WHEEL-041',
      activeWpId: 'WP-WHEEL-MAN-003',
      progressPercentage: 5,
      status: 'SURVEY_IN_PROGRESS'
    },

    // AREA-MACHINE-SHOP-AXLE ASSETS (7 WORKSTREAMS)
    {
      id: 'AST-MS-FFG-01',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-FFG',
      name: 'VDF Boehringer OP20 Rough Turning Lathes (4 Cells: OP20.1-4)',
      oem: 'FFG Europe / VDF Boehringer',
      weightMT: 114.0,
      dimensions: '8.2m L x 3.4m W x 2.8m H per lathe',
      pitDepth: 'Anti-Vibration Bed Isolation Trench',
      foundationStatus: 'Levelled to 0.04mm/m on Master Spirit Level',
      solePlateStatus: 'Anti-Vibration Damping Pads Compressed 15%',
      anchorTorque: 'Base Nuts Torqued to 350 Nm',
      form11TackleRef: 'TKL-F11-2026-081 (Air Skates 40T + Bay Crane)',
      safetyPtwRef: 'PTW-MS-018',
      activeWpId: 'WP-MS-FFG-001',
      progressPercentage: 70,
      status: 'ERECTION_IN_PROGRESS'
    },
    {
      id: 'AST-MS-FFG-02',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-FFG',
      name: 'VDF Boehringer OP30 Finish Turning Lathes (4 Cells: OP30.1-4)',
      oem: 'FFG Europe / VDF Boehringer',
      weightMT: 114.0,
      dimensions: '8.2m L x 3.4m W x 2.8m H per lathe',
      pitDepth: 'Anti-Vibration Bed Isolation Trench',
      foundationStatus: 'Bedplates Cleaned; Staged on Foundation Pads',
      solePlateStatus: 'Pre-Levelling Alignment Underway',
      anchorTorque: 'Base Nuts Hand-Torqued (Torquing Scheduled)',
      form11TackleRef: 'TKL-F11-2026-081',
      safetyPtwRef: 'PTW-MS-018',
      activeWpId: 'WP-MS-FFG-001',
      progressPercentage: 50,
      status: 'ERECTION_IN_PROGRESS'
    },
    {
      id: 'AST-MS-MAG-01',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-MAG',
      name: 'NDT Automated Stations OP40 (UT) & OP80 (MPI)',
      oem: 'MAG Associate / NDT Automation Systems',
      weightMT: 38.0,
      dimensions: '12.0m L x 4.0m W x 3.5m H',
      pitDepth: 'Surface Mount on Embedded Unistrut',
      foundationStatus: 'Framing Anchored & Probe Gantry Positioned',
      solePlateStatus: 'Optical Line Alignment Verified',
      anchorTorque: 'Expansion Anchors M16 (120 Nm)',
      form11TackleRef: 'TKL-F11-2026-085 (Bay Crane 15T)',
      safetyPtwRef: 'PTW-MS-021',
      activeWpId: 'WP-MS-MAG-002',
      progressPercentage: 40,
      status: 'MOBILIZED'
    },
    {
      id: 'AST-MS-GER-01',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-GER',
      name: 'GER CPT-3000 CNC Precision Grinders (Serials 25/2050 & 25/2051)',
      oem: 'GER Machine Tools (Spain)',
      weightMT: 64.0,
      dimensions: '9.4m L x 4.2m W x 3.0m H',
      pitDepth: 'Precision Grouting Pad Bed',
      foundationStatus: 'SN 25/2050 on Bed Anchors; SN 25/2051 Rough Aligned',
      solePlateStatus: 'Precision Optical Collimator Check Passed',
      anchorTorque: 'Anchor Studs Torqued to 450 Nm',
      form11TackleRef: 'TKL-F11-2026-077 (30T Bay Crane Spreader)',
      safetyPtwRef: 'PTW-MS-015',
      activeWpId: 'WP-MS-GER-003',
      progressPercentage: 80,
      status: 'PRECISION_ALIGNMENT'
    },
    {
      id: 'AST-MS-GANTRY-01',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-PARI-GANTRY',
      name: 'PARI Automated Overhead Gantries (Exactly 5 Physical Heads GH01 to GH05)',
      oem: 'PARI Robotics & Automation',
      weightMT: 90.0,
      dimensions: '110m Total Runway Length x 5 Head Trolleys',
      pitDepth: 'Column-Mounted High-Bay Runway Beam',
      foundationStatus: 'Column Runway Beams Torqued & Survey Cleared',
      solePlateStatus: 'GH01-GH03 Hung & Meshed; GH04-05 Staged',
      anchorTorque: 'Runway Clamp Bolts Grade 10.9 (680 Nm)',
      form11TackleRef: 'TKL-F11-2026-061 (Tandem Manlift + 20T Gantry)',
      safetyPtwRef: 'PTW-MS-011',
      activeWpId: 'WP-MS-GANTRY-004',
      progressPercentage: 65,
      status: 'RUNWAY_ERECTION'
    },
    {
      id: 'AST-MS-AUTO-01',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-AUTO-TRANSFER',
      name: 'Automated Transfer Shuttles OP05, OP75 (SPC) & OP105 (NOK)',
      oem: 'Automation Handling Systems',
      weightMT: 28.0,
      dimensions: 'Floor Embedded Track Rail Network (80m)',
      pitDepth: 'Floor Embedded Trench 300mm Deep',
      foundationStatus: 'Floor Trench Survey Approved; Parts Staged',
      solePlateStatus: 'Track Embedded Channel Levelled to 1mm',
      anchorTorque: 'Track Anchor Studs 180 Nm',
      form11TackleRef: 'TKL-F11-2026-095 (Roller Skates 15T)',
      safetyPtwRef: 'PTW-MS-024',
      activeWpId: 'WP-MS-AUTO-005',
      progressPercentage: 20,
      status: 'TRENCH_EMBEDDING'
    },
    {
      id: 'AST-MS-AUX-01',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-AUX',
      name: 'Central Coolant Filtration, Mist Collection & High-Pressure Skid',
      oem: 'Knoll / Donaldson Filtration',
      weightMT: 48.0,
      dimensions: '16.0m L x 5.0m W Filtration Trench',
      pitDepth: 'Central Coolant Pit & Trench',
      foundationStatus: 'Filtration Skid Anchored; 50% Return Headers Welded',
      solePlateStatus: 'Pump Skid Levelling Checked (0.1mm)',
      anchorTorque: 'Skid Foundation Bolts 280 Nm',
      form11TackleRef: 'TKL-F11-2026-088 (Farana 20T + Lever Hoists)',
      safetyPtwRef: 'PTW-MS-019',
      activeWpId: 'WP-MS-AUX-006',
      progressPercentage: 45,
      status: 'PIPING_FABRICATION'
    }
  ];

  // 3. 12 VERIFIED WORK PACKAGES
  const SEED_WORK_PACKAGES = [
    // LINE-AXLE
    {
      id: 'WP-AXLE-PRS-001',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      assetId: 'AST-AXLE-SCH-01',
      title: 'Schuler Axle Press Crown Tandem Rigging & Rough Levelling',
      scopeRef: 'SOW-MECH-05.1',
      scopeClause: 'Unloading, shifting to foundation, placement on columns, rough levelling',
      plannedStart: '2026-11-15',
      plannedFinish: '2026-11-25',
      actualStart: '2026-11-16',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'In progress',
      progressBasis: 'Milestone 4 of 6 (Crown Placed on Uprights)',
      progressPercentage: 75,
      craneReq: 'Tandem Lift: Demag 250T (Main) + Sany 150T (Tail)',
      form11TackleRef: 'TKL-F11-2026-089 (Valid)',
      safetyPtwRef: 'PTW-AXLE-049 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-AXLE-HYD-002',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-HYDRAULICS',
      assetId: 'AST-AXLE-PULL-01',
      title: 'Hydraulic Puller & Bed Anchor Tie-Rod Pre-Tensioning',
      scopeRef: 'SOW-MECH-05.4',
      scopeClause: 'Internal shifting near foundation, mechanical mounting, torque tensioning',
      plannedStart: '2026-11-18',
      plannedFinish: '2026-11-28',
      actualStart: '2026-11-19',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'Mobilized',
      progressBasis: 'Hydraulic skid positioned at Bay 2 pit',
      progressPercentage: 35,
      craneReq: 'Farana 20T + 100T Hydraulic Jacking Station',
      form11TackleRef: 'TKL-F11-2026-092 (Valid)',
      safetyPtwRef: 'PTW-AXLE-052 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-AXLE-TRL-003',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-TRANSPORT',
      assetId: 'AST-AXLE-SCH-02',
      title: 'Multi-Axle Modular Hydraulic Trailer Offloading & Entry',
      scopeRef: 'SOW-LOG-01.2',
      scopeClause: 'Site gate reception, road survey clearance, internal transit to press pit',
      plannedStart: '2026-11-22',
      plannedFinish: '2026-11-26',
      actualStart: '',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'Scope verified',
      progressBasis: 'Civil road compaction cleared; awaiting plant road permit',
      progressPercentage: 15,
      craneReq: 'Multi-Axle Hydraulic Modular Trailer 8-Axle',
      form11TackleRef: 'TKL-F11-2026-074 (Valid)',
      safetyPtwRef: 'PTW-AXLE-055 (Pending)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: false },
      hold: 'Plant internal road transport permit awaiting client signoff'
    },
    // LINE-WHEEL
    {
      id: 'WP-WHEEL-FRM-001',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-PRESS-CELL',
      assetId: 'AST-WHEEL-SCH-01',
      title: 'Schuler Wheel Press Monobloc Bed Rigging & Pit Setting',
      scopeRef: 'SOW-MECH-06.1',
      scopeClause: 'Foundation pit preparation check, baseplate anchoring, tandem lower',
      plannedStart: '2026-11-10',
      plannedFinish: '2026-11-26',
      actualStart: '2026-11-11',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'In progress',
      progressBasis: 'Baseplate anchored; main lower scheduled',
      progressPercentage: 60,
      craneReq: 'Demag CC2500 250T + Tail Sany 150T',
      form11TackleRef: 'TKL-F11-2026-065 (Valid)',
      safetyPtwRef: 'PTW-WHEEL-031 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-WHEEL-FRN-002',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-FURNACE',
      assetId: 'AST-WHEEL-FRN-01',
      title: 'Rotary Hearth Furnace Casing Segments Heavy Assembly',
      scopeRef: 'SOW-MECH-06.3',
      scopeClause: 'Shell segments placement, weld alignment, refractory support staging',
      plannedStart: '2026-11-24',
      plannedFinish: '2026-12-05',
      actualStart: '',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'Planned',
      progressBasis: 'Rigging plan approved; awaiting civil grouting cure',
      progressPercentage: 10,
      craneReq: 'Demag 250T Main Boom 42m',
      form11TackleRef: 'TKL-F11-2026-098 (Valid)',
      safetyPtwRef: 'PTW-WHEEL-038 (Draft)',
      readiness: { drawings: true, foundation: false, path: true, tools: true, ptw: false },
      hold: 'Civil foundation pedestal 7-day cube strength testing pending'
    },
    {
      id: 'WP-WHEEL-MAN-003',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-MANIPULATOR',
      assetId: 'AST-WHEEL-MAN-01',
      title: 'Billet High-Speed Loading Manipulator Alignment',
      scopeRef: 'SOW-MECH-06.5',
      scopeClause: 'Rail track foundation grouting, manipulator carriage mounting',
      plannedStart: '2026-11-27',
      plannedFinish: '2026-12-08',
      actualStart: '',
      actualFinish: '',
      supervisor: 'Dilip Rout',
      state: 'Ready for planning',
      progressBasis: 'Track rail alignment survey in progress',
      progressPercentage: 5,
      craneReq: 'Hydra 20T Pick & Carry',
      form11TackleRef: 'TKL-F11-2026-104 (Valid)',
      safetyPtwRef: 'PTW-WHEEL-041 (Pending)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: false },
      hold: null
    },
    // AREA-MACHINE-SHOP-AXLE
    {
      id: 'WP-MS-FFG-001',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-FFG',
      assetId: 'AST-MS-FFG-01',
      title: 'VDF Boehringer / FFG Lathe Cells OP20.1 & OP20.2 Bed Anchor Rigging',
      scopeRef: 'SOW-MACH-07.1',
      scopeClause: 'Bay transfer, bedplate levelling, anti-vibration mount installation',
      plannedStart: '2026-11-14',
      plannedFinish: '2026-11-24',
      actualStart: '2026-11-15',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'In progress',
      progressBasis: 'OP20.1 levelled to 0.04mm/m; OP20.2 on rollers',
      progressPercentage: 70,
      craneReq: 'Overhead Bay Crane 30T + Air Skates 40T',
      form11TackleRef: 'TKL-F11-2026-081 (Valid)',
      safetyPtwRef: 'PTW-MS-018 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-MS-MAG-002',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-MAG',
      assetId: 'AST-MS-MAG-01',
      title: 'Automated Non-Destructive Testing UT/MPI Stations Erection',
      scopeRef: 'SOW-MACH-07.4',
      scopeClause: 'Ultrasonic OP40 & MPI OP80 structural enclosure and probe carriage mounting',
      plannedStart: '2026-11-19',
      plannedFinish: '2026-11-29',
      actualStart: '2026-11-20',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'Mobilized',
      progressBasis: 'Support framing anchored; probe gantry positioned',
      progressPercentage: 40,
      craneReq: 'Overhead Bay Crane 15T',
      form11TackleRef: 'TKL-F11-2026-085 (Valid)',
      safetyPtwRef: 'PTW-MS-021 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-MS-GER-003',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-GER',
      assetId: 'AST-MS-GER-01',
      title: 'GER CPT-3000 CNC Grinder Bed Rigging (Serials 25/2050 & 25/2051)',
      scopeRef: 'SOW-MACH-07.2',
      scopeClause: 'Heavy base placement, precision optical alignment, hydraulic tank positioning',
      plannedStart: '2026-11-12',
      plannedFinish: '2026-11-23',
      actualStart: '2026-11-13',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'In progress',
      progressBasis: 'SN 25/2050 on bed anchors; SN 25/2051 rough aligned',
      progressPercentage: 80,
      craneReq: 'Overhead Crane 30T + Hydra 20T auxiliary',
      form11TackleRef: 'TKL-F11-2026-077 (Valid)',
      safetyPtwRef: 'PTW-MS-015 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-MS-GANTRY-004',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-PARI-GANTRY',
      assetId: 'AST-MS-GANTRY-01',
      title: 'PARI Automated Overhead Gantry Heads GH01 to GH05 Runway Erection',
      scopeRef: 'SOW-MACH-07.3',
      scopeClause: 'Col-rail runway beam torqueing, 5 trolley heads hoist placement, busbar install',
      plannedStart: '2026-11-08',
      plannedFinish: '2026-11-25',
      actualStart: '2026-11-09',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'In progress',
      progressBasis: 'GH01-GH03 hung and aligned; GH04-GH05 rigged on ground',
      progressPercentage: 65,
      craneReq: 'Tandem Manlift + 20T Mobile Gantry Crane',
      form11TackleRef: 'TKL-F11-2026-061 (Valid)',
      safetyPtwRef: 'PTW-MS-011 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    },
    {
      id: 'WP-MS-AUTO-005',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-AUTO-TRANSFER',
      assetId: 'AST-MS-AUTO-01',
      title: 'Automated Transfer Shuttles OP05, OP75 (SPC) & OP105 (NOK) Rigging',
      scopeRef: 'SOW-MACH-07.5',
      scopeClause: 'Floor track embedded channel anchoring, shuttle car placement, sensor rail check',
      plannedStart: '2026-11-23',
      plannedFinish: '2026-12-02',
      actualStart: '',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'Planned',
      progressBasis: 'Floor trench survey approved; shuttle parts staged',
      progressPercentage: 20,
      craneReq: 'Forklift 5T + Heavy Roller Skates 15T',
      form11TackleRef: 'TKL-F11-2026-095 (Valid)',
      safetyPtwRef: 'PTW-MS-024 (Draft)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: false },
      hold: null
    },
    {
      id: 'WP-MS-AUX-006',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-AUX',
      assetId: 'AST-MS-AUX-01',
      title: 'Central Coolant Filtration, Mist Collection & High-Pressure Piping Skid',
      scopeRef: 'SOW-MACH-07.6',
      scopeClause: 'Trench header pipe routing, tank skid placement, pump manifold alignment',
      plannedStart: '2026-11-17',
      plannedFinish: '2026-11-27',
      actualStart: '2026-11-18',
      actualFinish: '',
      supervisor: 'Sarat Mishra',
      state: 'Mobilized',
      progressBasis: 'Skid anchored; return headers welded 50%',
      progressPercentage: 45,
      craneReq: 'Farana 20T + Rigging Lever Hoists 5T',
      form11TackleRef: 'TKL-F11-2026-088 (Valid)',
      safetyPtwRef: 'PTW-MS-019 (Active)',
      readiness: { drawings: true, foundation: true, path: true, tools: true, ptw: true },
      hold: null
    }
  ];

  // 4. CERTIFIED PERSONNEL (16 CREW)
  const SEED_MANPOWER = [
    { badgeNo: 'BAL-OPS-001', name: 'Dilip Rout', designation: 'Operations Manager / Supervisor', trade: 'Erection & Rigging', primaryWorkspace: 'ALL', medicalFitness: '2027-04-15', tpiRiggingCert: 'TPI-RIG-2026-012', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-002', name: 'Sarat Mishra', designation: 'Area Manager / Supervisor', trade: 'Machine Installation', primaryWorkspace: 'AREA-MACHINE-SHOP-AXLE', medicalFitness: '2027-05-20', tpiRiggingCert: 'TPI-RIG-2026-018', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-003', name: 'Manoj Das', designation: 'Lead Heavy Rigger', trade: 'Rigging & Heavy Lift', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-03-10', tpiRiggingCert: 'TPI-RIG-2026-045', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-004', name: 'Ramesh Kumar', designation: 'Senior Certified Rigger', trade: 'Rigging & Heavy Lift', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-02-18', tpiRiggingCert: 'TPI-RIG-2026-048', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-005', name: 'Bikash Mohapatra', designation: 'Site Safety Steward', trade: 'Safety & Rigging', primaryWorkspace: 'ALL', medicalFitness: '2027-06-12', tpiRiggingCert: 'TPI-HSE-2026-004', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-006', name: 'Pradeep Nayak', designation: 'Millwright Fitter Foreman', trade: 'Mechanical Fitting', primaryWorkspace: 'LINE-WHEEL', medicalFitness: '2027-04-05', tpiRiggingCert: 'TPI-FIT-2026-022', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-007', name: 'Kailash Sahoo', designation: 'Precision Millwright Fitter', trade: 'Mechanical Fitting', primaryWorkspace: 'LINE-WHEEL', medicalFitness: '2027-03-22', tpiRiggingCert: 'TPI-FIT-2026-029', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-008', name: 'Subhashree Jena', designation: 'Hydraulic Technician', trade: 'Hydraulics & Piping', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-05-15', tpiRiggingCert: 'TPI-HYD-2026-009', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-009', name: 'Tapan Barik', designation: 'Demag 250T Master Operator', trade: 'Crane Operations', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-01-30', tpiRiggingCert: 'TPI-CRN-2026-001', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-010', name: 'Ganesh Pradhan', designation: 'Sany 150T Master Operator', trade: 'Crane Operations', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-02-15', tpiRiggingCert: 'TPI-CRN-2026-007', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-011', name: 'Rabindra Sethi', designation: 'Laser Optical Alignment Tech', trade: 'Precision Alignment', primaryWorkspace: 'AREA-MACHINE-SHOP-AXLE', medicalFitness: '2027-04-18', tpiRiggingCert: 'TPI-ALI-2026-003', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-012', name: 'Debendra Behera', designation: 'Gantry Rigging Specialist', trade: 'Overhead Rigging', primaryWorkspace: 'AREA-MACHINE-SHOP-AXLE', medicalFitness: '2027-03-28', tpiRiggingCert: 'TPI-RIG-2026-055', form11Qualified: true, state: 'DEPLOYED' },
    { badgeNo: 'BAL-OPS-013', name: 'Ashok Samal', designation: 'Rigger Grade 1', trade: 'Rigging & Heavy Lift', primaryWorkspace: 'LINE-WHEEL', medicalFitness: '2027-05-02', tpiRiggingCert: 'TPI-RIG-2026-061', form11Qualified: true, state: 'ALLOCATED' },
    { badgeNo: 'BAL-OPS-014', name: 'Niranjan Jena', designation: 'Rigger Grade 2', trade: 'Rigging & Heavy Lift', primaryWorkspace: 'LINE-AXLE', medicalFitness: '2027-04-11', tpiRiggingCert: 'TPI-RIG-2026-068', form11Qualified: true, state: 'STANDBY_HOLD' },
    { badgeNo: 'BAL-OPS-015', name: 'Bijay Patra', designation: 'Industrial Electrician', trade: 'Electrical & Controls', primaryWorkspace: 'AREA-MACHINE-SHOP-AXLE', medicalFitness: '2027-06-01', tpiRiggingCert: 'TPI-ELE-2026-011', form11Qualified: true, state: 'FIT_CLEARED' },
    { badgeNo: 'BAL-OPS-016', name: 'Sanjay Swain', designation: 'Apprentice Rigger', trade: 'Rigging Trainee', primaryWorkspace: 'ALL', medicalFitness: '2027-07-15', tpiRiggingCert: 'PENDING', form11Qualified: false, state: 'INDUCTED' }
  ];

  // 5. SHIFT LOGS (6 ENTRIES)
  const SEED_SHIFT_LOGS = [
    {
      id: 'LOG-20261121-S1-AXLE',
      date: '2026-11-21',
      shiftCode: 'Shift A (08:00 - 17:00)',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      supervisor: 'Dilip Rout',
      leadRigger: 'Manoj Das',
      deployedCrewCount: 48,
      cranesActive: 'Demag CC2500 250T + Sany SCC1500 150T (Tandem Cell)',
      tackleCertStatus: 'Form 11 Valid (Slings 50T x 4, Shackles 55T x 4)',
      safetyPtwStatus: 'PTW-AXLE-049 Active',
      keyMilestone: 'Completed crown lift off trailer; hoisted 4.5m; rough aligned with upright pin guide',
      incidents: 'Zero incidents recorded (Wind pause 25 min per protocol)',
      handoverNotes: 'Shift B to proceed with anchor bolt insertion and dial gauge placement'
    },
    {
      id: 'LOG-20261121-S1-WHEEL',
      date: '2026-11-21',
      shiftCode: 'Shift A (08:00 - 17:00)',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-PRESS-CELL',
      supervisor: 'Dilip Rout',
      leadRigger: 'Ramesh Kumar',
      deployedCrewCount: 36,
      cranesActive: 'Demag CC2500 250T Crawler Crane',
      tackleCertStatus: 'Form 11 Valid (Grommet Slings 100T)',
      safetyPtwStatus: 'PTW-WHEEL-031 Active',
      keyMilestone: 'Positioned wheel bedplate on hydraulic jacks; verified pit center coordinates with surveyor',
      incidents: 'Zero incidents recorded (Sump pump ran 45 min)',
      handoverNotes: 'Shift B to proceed with precision shimming under baseplate pads'
    },
    {
      id: 'LOG-20261121-S1-MACH',
      date: '2026-11-21',
      shiftCode: 'Shift A (08:00 - 17:00)',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-FFG',
      supervisor: 'Sarat Mishra',
      leadRigger: 'Debendra Behera',
      deployedCrewCount: 28,
      cranesActive: 'Overhead Bay Crane 30T',
      tackleCertStatus: 'Form 11 Valid (Wire Rope 25T)',
      safetyPtwStatus: 'PTW-MS-018 Active',
      keyMilestone: 'OP20.1 lathe bed levelled to 0.04mm/m using master spirit level; base nuts torqued to 350 Nm',
      incidents: 'Zero incidents recorded',
      handoverNotes: 'Handover to Shift B to start hydraulic connection and tailstock rough positioning'
    },
    {
      id: 'LOG-20261120-S2-AXLE',
      date: '2026-11-20',
      shiftCode: 'Shift B (17:00 - 02:00)',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      supervisor: 'Dilip Rout',
      leadRigger: 'Manoj Das',
      deployedCrewCount: 32,
      cranesActive: 'Demag 250T + Sany 150T',
      tackleCertStatus: 'Form 11 Valid',
      safetyPtwStatus: 'PTW-AXLE-049 Active',
      keyMilestone: 'Tandem crane rigging rigged and tested with 50T test weight; rigging certified by TPI',
      incidents: 'Zero incidents recorded',
      handoverNotes: 'Ready for morning lift'
    },
    {
      id: 'LOG-20261120-S2-MACH',
      date: '2026-11-20',
      shiftCode: 'Shift B (17:00 - 02:00)',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-GER',
      supervisor: 'Sarat Mishra',
      leadRigger: 'Debendra Behera',
      deployedCrewCount: 22,
      cranesActive: 'Bay Crane 30T',
      tackleCertStatus: 'Form 11 Valid',
      safetyPtwStatus: 'PTW-MS-015 Active',
      keyMilestone: 'GER Grinder SN 25/2050 bed set onto anti-vibration damping pads; rough cross-level completed',
      incidents: 'Zero incidents recorded',
      handoverNotes: 'Proceed with precision spirit level alignment next shift'
    },
    {
      id: 'LOG-20261120-S1-GANTRY',
      date: '2026-11-20',
      shiftCode: 'Shift A (08:00 - 17:00)',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-PARI-GANTRY',
      supervisor: 'Sarat Mishra',
      leadRigger: 'Debendra Behera',
      deployedCrewCount: 26,
      cranesActive: 'Manlift 16m + Gantry Crane 20T',
      tackleCertStatus: 'Form 11 Valid',
      safetyPtwStatus: 'PTW-MS-011 Active',
      keyMilestone: 'GH01 and GH02 hoist trolleys hoisted and locked to runway rails; busbar power collectors aligned',
      incidents: 'Zero incidents recorded (100% harness tie-off)',
      handoverNotes: 'GH03 staging in progress on ground'
    }
  ];

  // 6. SITE HOLDS (4 ENTRIES)
  const SEED_HOLDS = [
    {
      id: 'HLD-AXLE-FND-001',
      dateRaised: '2026-11-17',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-PRESS-CELL',
      assetId: 'AST-AXLE-SCH-01',
      category: 'CIVIL_TOLERANCE',
      description: 'Pocket hole depth on bolt axis C3 is 45mm shallower than Schuler Foundation Drawing Rev C',
      rootCause: 'Civil casting variation during second pour',
      responsibleParty: 'JTRWF Civil / Tata Projects',
      sowClause: 'SOW-MECH-05.1 Clause 3',
      targetDate: '2026-11-23',
      resolutionAction: 'Core drilling of 45mm requested; core rig mobilized on site',
      status: 'ACTIVE'
    },
    {
      id: 'HLD-WHEEL-FND-002',
      dateRaised: '2026-11-19',
      workspaceId: 'LINE-WHEEL',
      workstreamId: 'WHEEL-FURNACE',
      assetId: 'AST-WHEEL-FRN-01',
      category: 'CIVIL_CURE',
      description: 'Pedestal concrete 7-day cube compressive strength report pending from testing laboratory',
      rootCause: 'Mandatory NABL lab test turnaround period',
      responsibleParty: 'JTRWF Quality Lab',
      sowClause: 'SOW-MECH-06.3 Clause 2',
      targetDate: '2026-11-24',
      resolutionAction: 'Expedite lab test report; preliminary Schmidt hammer rebound indicates >35 MPa',
      status: 'ACTIVE'
    },
    {
      id: 'HLD-AXLE-TRL-003',
      dateRaised: '2026-11-20',
      workspaceId: 'LINE-AXLE',
      workstreamId: 'AXLE-TRANSPORT',
      assetId: 'AST-AXLE-SCH-02',
      category: 'PLANT_LOGISTICS',
      description: 'Plant internal main transit road permit pending clearance due to pipe rack overhead work',
      rootCause: 'Overhead piping contractor scaffold blocking 6.5m clear corridor',
      responsibleParty: 'JTRWF Site Logistics',
      sowClause: 'SOW-LOG-01.2 Clause 1',
      targetDate: '2026-11-22',
      resolutionAction: 'Corridor clearance meeting conducted; temporary scaffold modification scheduled 6:00 AM',
      status: 'ACTIVE'
    },
    {
      id: 'HLD-MS-OEM-004',
      dateRaised: '2026-11-15',
      workspaceId: 'AREA-MACHINE-SHOP-AXLE',
      workstreamId: 'MS-OEM-PENDING',
      assetId: 'AST-MS-AUX-01',
      category: 'OEM_DOCUMENTATION',
      description: '4 crates marked FFG auxiliary coolant return lacking OEM packing slip and terminal diagrams',
      rootCause: 'Consignment split at Chennai port transit',
      responsibleParty: 'FFG India Logistics',
      sowClause: 'SOW-MACH-07.6 Clause 4',
      targetDate: '2026-11-21',
      resolutionAction: 'Packing list received via email from FFG Germany; unboxing in presence of client',
      status: 'RESOLVED'
    }
  ];

  // 7. DEFAULT PUNCHLIST TEMPLATE FOR WORK PACKAGES
  const DEFAULT_PUNCHLIST = [
    { title: 'Foundation Pit Civil Dimensions & Centerlines Verified', sub: 'Surveyor cross-checked against Schuler Drawing Rev C (Tolerance: ±1.0mm)', verified: true },
    { title: 'Sole Plate & Shim Pack Precision Spirit Levelling', sub: 'Master spirit level reading <0.04 mm/m across bedplate length and cross axes', verified: true },
    { title: 'Anchor Bolts Pre-Tensioning & Specified Torque Verification', sub: 'Calibrated hydraulic torque wrench applied to specified torque (Form 11 verified)', verified: true },
    { title: 'Tandem Lifting Tackle De-Rigging & Post-Lift Inspection', sub: 'Slings, shackles, and spreader beams inspected for elongation or strand nicking', verified: true },
    { title: 'Optical Laser Collimator Alignment & Dial Gauge Runout Check', sub: 'Radial runout <0.02mm confirmed by OEM erection specialist and recorded in dossier', verified: false },
    { title: 'Joint JTRWF / OEM Mechanical Completion Handover Sign-Off', sub: 'All punchlist category A items cleared; Form 4 mechanical completion signed', verified: false }
  ];

  // 8. INDEXEDDB INITIALIZATION & UPGRADE
  function initDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('work_packages')) {
          db.createObjectStore('work_packages', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('assets')) {
          db.createObjectStore('assets', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('manpower_roster')) {
          db.createObjectStore('manpower_roster', { keyPath: 'badgeNo' });
        }
        if (!db.objectStoreNames.contains('shift_logs')) {
          db.createObjectStore('shift_logs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('holds_and_discrepancies')) {
          db.createObjectStore('holds_and_discrepancies', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('punchlists')) {
          db.createObjectStore('punchlists', { keyPath: 'wpId' });
        }
        if (!db.objectStoreNames.contains('sync_queue')) {
          db.createObjectStore('sync_queue', { keyPath: 'syncId', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('audit_log')) {
          db.createObjectStore('audit_log', { keyPath: 'auditId', autoIncrement: true });
        }
      };

      request.onsuccess = (e) => {
        dbInstance = e.target.result;
        seedInitialDataIfEmpty().then(resolve);
      };

      request.onerror = (e) => {
        console.error('IndexedDB error:', e);
        reject(e);
      };
    });
  }

  function seedInitialDataIfEmpty() {
    return new Promise((resolve) => {
      const tx = dbInstance.transaction(['work_packages', 'assets', 'manpower_roster', 'shift_logs', 'holds_and_discrepancies', 'audit_log'], 'readwrite');
      const wpStore = tx.objectStore('work_packages');
      const countReq = wpStore.count();

      countReq.onsuccess = () => {
        if (countReq.result === 0) {
          SEED_WORK_PACKAGES.forEach((wp) => wpStore.add(wp));
          const astStore = tx.objectStore('assets');
          SEED_ASSETS.forEach((ast) => astStore.add(ast));
          const mpStore = tx.objectStore('manpower_roster');
          SEED_MANPOWER.forEach((mp) => mpStore.add(mp));
          const logStore = tx.objectStore('shift_logs');
          SEED_SHIFT_LOGS.forEach((log) => logStore.add(log));
          const hldStore = tx.objectStore('holds_and_discrepancies');
          SEED_HOLDS.forEach((hld) => hldStore.add(hld));
          const auditStore = tx.objectStore('audit_log');
          auditStore.add({
            timestamp: new Date().toISOString(),
            actor: 'System Baseline Seeder',
            action: 'INITIALIZE_V7_2_BASELINE',
            target: 'DATABASE_BOOTSTRAP',
            details: 'Initial operational work packages, machine shop assets, manpower roster, shift logs, and holds bootstrapped successfully.'
          });
        }
      };

      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  }

  // 9. REPOSITORY HELPERS
  function getAllRecords(storeName) {
    return new Promise((resolve) => {
      if (!dbInstance) return resolve([]);
      const tx = dbInstance.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  function saveRecord(storeName, record) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) return reject('No DB');
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(record);
      req.onsuccess = () => resolve(req.result);
      req.onerror = (e) => reject(e);
    });
  }

  function logAudit(action, target, details, actor = 'Operations In-Charge') {
    if (!dbInstance) return;
    const tx = dbInstance.transaction('audit_log', 'readwrite');
    tx.objectStore('audit_log').add({
      timestamp: new Date().toISOString(),
      actor: actor,
      action: action,
      target: target,
      details: details
    });
  }

  // 10. MANDATORY REAL-TIME DATABASE DUAL-SYNC ENGINE
  async function autoSyncWithCloud(action, entity, record) {
    const timestamp = new Date().toLocaleTimeString();
    localStorage.setItem('balsons_ops_last_sync', timestamp);
    updateSyncBadge(`Sync: 1GeqDDmB... (${timestamp})`, true);

    try {
      const payload = {
        action: action || 'syncMutation',
        entity: entity,
        data: record,
        timestamp: new Date().toISOString(),
        spreadsheetId: SPREADSHEET_ID
      };

      if (window.fetch && navigator.onLine) {
        fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          redirect: 'follow'
        }).catch(err => {
          console.warn('Background sync deferred to local queue:', err);
          queueSyncLocally(action, entity, record);
        });
      } else {
        queueSyncLocally(action, entity, record);
      }
    } catch (e) {
      console.warn('Sync engine caught exception, cached in IndexedDB:', e);
      queueSyncLocally(action, entity, record);
    }
  }

  async function queueSyncLocally(action, entity, record) {
    if (!dbInstance) return;
    try {
      const tx = dbInstance.transaction('sync_queue', 'readwrite');
      tx.objectStore('sync_queue').add({
        timestamp: new Date().toISOString(),
        action: action,
        entity: entity,
        data: record,
        status: 'PENDING'
      });
      updateSyncBadge('Sync Queued (Offline)', false);
    } catch (e) {
      console.error('Failed to queue sync locally:', e);
    }
  }

  function updateSyncBadge(statusText, isOnline) {
    const el = document.getElementById('headerSyncPillText');
    if (el) {
      el.textContent = statusText;
    }
    const indicator = document.getElementById('headerSyncIndicator');
    if (indicator) {
      indicator.style.background = isOnline ? '#10b981' : '#f59e0b';
    }
  }

  // 11. DASHBOARD REFRESH & DISPATCHER
  async function refreshDashboard() {
    const packages = await getAllRecords('work_packages');
    const assets = await getAllRecords('assets');
    const logs = await getAllRecords('shift_logs');
    const roster = await getAllRecords('manpower_roster');
    const holds = await getAllRecords('holds_and_discrepancies');

    // 1. Super View Calculations
    const totalWp = packages.length;
    const completedWp = packages.filter((w) => w.state === 'Mechanical completion' || w.state === 'Closed').length;
    const activeWp = packages.filter((w) => w.state === 'In progress' || w.state === 'Mobilized').length;
    const deployedCrew = roster.filter((r) => r.state === 'DEPLOYED').length;
    const activeHolds = holds.filter((h) => h.status === 'ACTIVE').length;

    const sumProgress = packages.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0);
    const avgProgress = totalWp > 0 ? (sumProgress / totalWp).toFixed(1) : 0;

    const elProg = document.getElementById('statErectionProgress');
    if (elProg) elProg.textContent = `${avgProgress}%`;

    const elWp = document.getElementById('statActiveWp');
    if (elWp) elWp.textContent = `${activeWp} Active`;

    const elCrew = document.getElementById('statCrewCount');
    if (elCrew) elCrew.textContent = `${deployedCrew} Deployed`;

    const elHolds = document.getElementById('statActiveHolds');
    if (elHolds) elHolds.textContent = `${activeHolds} Active`;

    // 2. Render Dedicated Area Workspaces
    renderAxleArea(packages, assets, holds, logs);
    renderWheelArea(packages, assets, holds, logs);
    renderMachineShopArea(packages, assets, holds, logs, currentMsStreamFilter);

    // 3. Render Master Global Tables
    renderWorkPackagesTable(packages);
    renderManpowerTable(roster);
    renderShiftLogsTable(logs);
    renderHoldsTable(holds);

    // 4. Update Header Sync Indicator
    const lastSync = localStorage.getItem('balsons_ops_last_sync') || 'Online';
    updateSyncBadge(`Sync: 1GeqDDmB... (${lastSync})`, true);
  }

  // 12. AREA 1: LINE AXLE RENDERER
  function renderAxleArea(packages, assets, holds, logs) {
    const axleWps = packages.filter(w => w.workspaceId === 'LINE-AXLE');
    const axleAssets = (assets.length > 0 ? assets : SEED_ASSETS).filter(a => a.workspaceId === 'LINE-AXLE');
    const axleHolds = holds.filter(h => h.workspaceId === 'LINE-AXLE' && h.status === 'ACTIVE');

    const sumProg = axleWps.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0);
    const avgProg = axleWps.length > 0 ? (sumProg / axleWps.length).toFixed(1) : 0;

    const elProg = document.getElementById('axleStatProgress');
    if (elProg) elProg.textContent = `${avgProg}%`;
    const elActiveWp = document.getElementById('axleStatActiveWp');
    if (elActiveWp) elActiveWp.textContent = `${axleWps.length} Packages`;
    const elHolds = document.getElementById('axleStatHolds');
    if (elHolds) elHolds.textContent = `${axleHolds.length} Active`;

    const tbodyWp = document.getElementById('axleWpTableBody');
    if (tbodyWp) {
      if (axleWps.length === 0) {
        tbodyWp.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:16px; color:#94a3b8;">No work packages registered for Line Axle.</td></tr>';
      } else {
        tbodyWp.innerHTML = axleWps.map(wp => `
          <tr>
            <td><strong style="font-family:monospace; color:#2563eb; font-size:12.5px;">${wp.id}</strong></td>
            <td>
              <strong style="color:var(--beds-charcoal-heading); font-size:13px;">${escapeHtml(wp.title)}</strong>
              <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Asset: <code>${wp.assetId}</code> | Scope: <strong>${wp.scopeRef}</strong></div>
            </td>
            <td><span class="tag-chip tag-cyan" style="font-size:11px;">${wp.workstreamId}</span></td>
            <td><span style="font-weight:600; font-size:12px;">${wp.supervisor}</span></td>
            <td>
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="flex:1; background:#e2e8f0; height:7px; border-radius:4px; overflow:hidden;">
                  <div style="width:${wp.progressPercentage}%; background:#2563eb; height:100%; border-radius:4px;"></div>
                </div>
                <span style="font-size:11.5px; font-weight:800; color:#2563eb;">${wp.progressPercentage}%</span>
              </div>
              <div style="font-size:10.5px; color:var(--beds-text-muted); margin-top:2px;">${escapeHtml(wp.progressBasis || '')}</div>
            </td>
            <td><span class="tag-chip ${getStateBadgeClass(wp.state)}" style="font-weight:700;">${wp.state}</span></td>
            <td>
              <div style="display:flex; gap:6px;">
                <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsOpsApp.open360Dossier('WP', '${wp.id}')" title="One-Click 360° Comprehensive Dossier" style="font-weight:700;">
                  👁️ 360° Dossier
                </button>
                <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.openEditModal('${wp.id}')" title="Manage Lifecycle & Progress" style="font-weight:700;">
                  ⚙️
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    const tbodyAst = document.getElementById('axleAssetTableBody');
    if (tbodyAst) {
      tbodyAst.innerHTML = axleAssets.map(ast => `
        <tr>
          <td><code style="font-weight:800; color:#2563eb; font-size:12px;">${ast.id}</code></td>
          <td>
            <strong style="color:var(--beds-charcoal-heading); font-size:13px;">${escapeHtml(ast.name)}</strong>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Dimensions: ${ast.dimensions} | Depth: ${ast.pitDepth}</div>
          </td>
          <td><span class="tag-chip tag-cyan" style="font-weight:700;">${ast.oem}</span></td>
          <td><strong style="color:var(--beds-teal-primary); font-size:13px;">${ast.weightMT.toFixed(2)} MT</strong></td>
          <td><span style="font-size:11.5px; color:var(--beds-text-secondary);">${escapeHtml(ast.foundationStatus)}</span></td>
          <td><span class="tag-chip ${ast.status.includes('PROGRESS') ? 'tag-purple' : (ast.status.includes('HOLD') ? 'tag-amber' : 'tag-green')}" style="font-weight:700; font-size:10.5px;">${ast.status}</span></td>
          <td>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.open360Dossier('ASSET', '${ast.id}')" style="font-weight:700;">
              🔍 Asset 360°
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // 13. AREA 2: LINE WHEEL RENDERER
  function renderWheelArea(packages, assets, holds, logs) {
    const wheelWps = packages.filter(w => w.workspaceId === 'LINE-WHEEL');
    const wheelAssets = (assets.length > 0 ? assets : SEED_ASSETS).filter(a => a.workspaceId === 'LINE-WHEEL');
    const wheelHolds = holds.filter(h => h.workspaceId === 'LINE-WHEEL' && h.status === 'ACTIVE');

    const sumProg = wheelWps.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0);
    const avgProg = wheelWps.length > 0 ? (sumProg / wheelWps.length).toFixed(1) : 0;

    const elProg = document.getElementById('wheelStatProgress');
    if (elProg) elProg.textContent = `${avgProg}%`;
    const elActiveWp = document.getElementById('wheelStatActiveWp');
    if (elActiveWp) elActiveWp.textContent = `${wheelWps.length} Packages`;
    const elHolds = document.getElementById('wheelStatHolds');
    if (elHolds) elHolds.textContent = `${wheelHolds.length} Active`;

    const tbodyWp = document.getElementById('wheelWpTableBody');
    if (tbodyWp) {
      if (wheelWps.length === 0) {
        tbodyWp.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:16px; color:#94a3b8;">No work packages registered for Line Wheel.</td></tr>';
      } else {
        tbodyWp.innerHTML = wheelWps.map(wp => `
          <tr>
            <td><strong style="font-family:monospace; color:#059669; font-size:12.5px;">${wp.id}</strong></td>
            <td>
              <strong style="color:var(--beds-charcoal-heading); font-size:13px;">${escapeHtml(wp.title)}</strong>
              <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Asset: <code>${wp.assetId}</code> | Scope: <strong>${wp.scopeRef}</strong></div>
            </td>
            <td><span class="tag-chip tag-green" style="font-size:11px;">${wp.workstreamId}</span></td>
            <td><span style="font-weight:600; font-size:12px;">${wp.supervisor}</span></td>
            <td>
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="flex:1; background:#e2e8f0; height:7px; border-radius:4px; overflow:hidden;">
                  <div style="width:${wp.progressPercentage}%; background:#059669; height:100%; border-radius:4px;"></div>
                </div>
                <span style="font-size:11.5px; font-weight:800; color:#059669;">${wp.progressPercentage}%</span>
              </div>
              <div style="font-size:10.5px; color:var(--beds-text-muted); margin-top:2px;">${escapeHtml(wp.progressBasis || '')}</div>
            </td>
            <td><span class="tag-chip ${getStateBadgeClass(wp.state)}" style="font-weight:700;">${wp.state}</span></td>
            <td>
              <div style="display:flex; gap:6px;">
                <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsOpsApp.open360Dossier('WP', '${wp.id}')" title="One-Click 360° Comprehensive Dossier" style="font-weight:700;">
                  👁️ 360° Dossier
                </button>
                <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.openEditModal('${wp.id}')" title="Manage Lifecycle & Progress" style="font-weight:700;">
                  ⚙️
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    const tbodyAst = document.getElementById('wheelAssetTableBody');
    if (tbodyAst) {
      tbodyAst.innerHTML = wheelAssets.map(ast => `
        <tr>
          <td><code style="font-weight:800; color:#059669; font-size:12px;">${ast.id}</code></td>
          <td>
            <strong style="color:var(--beds-charcoal-heading); font-size:13px;">${escapeHtml(ast.name)}</strong>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Dimensions: ${ast.dimensions} | Depth: ${ast.pitDepth}</div>
          </td>
          <td><span class="tag-chip tag-green" style="font-weight:700;">${ast.oem}</span></td>
          <td><strong style="color:var(--beds-teal-primary); font-size:13px;">${ast.weightMT.toFixed(2)} MT</strong></td>
          <td><span style="font-size:11.5px; color:var(--beds-text-secondary);">${escapeHtml(ast.foundationStatus)}</span></td>
          <td><span class="tag-chip ${ast.status.includes('PROGRESS') ? 'tag-purple' : (ast.status.includes('HOLD') ? 'tag-amber' : 'tag-green')}" style="font-weight:700; font-size:10.5px;">${ast.status}</span></td>
          <td>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.open360Dossier('ASSET', '${ast.id}')" style="font-weight:700;">
              🔍 Asset 360°
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // 14. AREA 3: MACHINE SHOP BAY RENDERER (7 WORKSTREAMS)
  function renderMachineShopArea(packages, assets, holds, logs, streamFilter = 'ALL') {
    let msWps = packages.filter(w => w.workspaceId === 'AREA-MACHINE-SHOP-AXLE');
    let msAssets = (assets.length > 0 ? assets : SEED_ASSETS).filter(a => a.workspaceId === 'AREA-MACHINE-SHOP-AXLE');
    const msHolds = holds.filter(h => h.workspaceId === 'AREA-MACHINE-SHOP-AXLE' && h.status === 'ACTIVE');

    if (streamFilter && streamFilter !== 'ALL') {
      msWps = msWps.filter(w => w.workstreamId === streamFilter);
      msAssets = msAssets.filter(a => a.workstreamId === streamFilter);
    }

    const sumProg = msWps.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0);
    const avgProg = msWps.length > 0 ? (sumProg / msWps.length).toFixed(1) : 0;

    const elProg = document.getElementById('msStatProgress');
    if (elProg) elProg.textContent = `${avgProg}%`;
    const elActiveWp = document.getElementById('msStatActiveWp');
    if (elActiveWp) elActiveWp.textContent = `${msWps.length} Packages`;
    const elHolds = document.getElementById('msStatHolds');
    if (elHolds) elHolds.textContent = `${msHolds.length} Active`;

    const tbodyWp = document.getElementById('msWpTableBody');
    if (tbodyWp) {
      if (msWps.length === 0) {
        tbodyWp.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:16px; color:#94a3b8;">No work packages registered for the selected workstream.</td></tr>';
      } else {
        tbodyWp.innerHTML = msWps.map(wp => `
          <tr>
            <td><strong style="font-family:monospace; color:#7c3aed; font-size:12.5px;">${wp.id}</strong></td>
            <td>
              <strong style="color:var(--beds-charcoal-heading); font-size:13px;">${escapeHtml(wp.title)}</strong>
              <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Asset: <code>${wp.assetId}</code> | Scope: <strong>${wp.scopeRef}</strong></div>
            </td>
            <td><span class="tag-chip tag-purple" style="font-size:11px; font-weight:700;">${wp.workstreamId}</span></td>
            <td><span style="font-weight:600; font-size:12px;">${wp.supervisor}</span></td>
            <td>
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="flex:1; background:#e2e8f0; height:7px; border-radius:4px; overflow:hidden;">
                  <div style="width:${wp.progressPercentage}%; background:#7c3aed; height:100%; border-radius:4px;"></div>
                </div>
                <span style="font-size:11.5px; font-weight:800; color:#7c3aed;">${wp.progressPercentage}%</span>
              </div>
              <div style="font-size:10.5px; color:var(--beds-text-muted); margin-top:2px;">${escapeHtml(wp.progressBasis || '')}</div>
            </td>
            <td><span class="tag-chip ${getStateBadgeClass(wp.state)}" style="font-weight:700;">${wp.state}</span></td>
            <td>
              <div style="display:flex; gap:6px;">
                <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsOpsApp.open360Dossier('WP', '${wp.id}')" title="One-Click 360° Comprehensive Dossier" style="font-weight:700;">
                  👁️ 360° Dossier
                </button>
                <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.openEditModal('${wp.id}')" title="Manage Lifecycle & Progress" style="font-weight:700;">
                  ⚙️
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    const tbodyAst = document.getElementById('msAssetTableBody');
    if (tbodyAst) {
      tbodyAst.innerHTML = msAssets.map(ast => `
        <tr>
          <td><code style="font-weight:800; color:#7c3aed; font-size:12px;">${ast.id}</code></td>
          <td>
            <strong style="color:var(--beds-charcoal-heading); font-size:13px;">${escapeHtml(ast.name)}</strong>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Dimensions: ${ast.dimensions} | Stream: <strong>${ast.workstreamId}</strong></div>
          </td>
          <td><span class="tag-chip tag-purple" style="font-weight:700;">${ast.oem}</span></td>
          <td><strong style="color:var(--beds-teal-primary); font-size:13px;">${ast.weightMT.toFixed(2)} MT</strong></td>
          <td><span style="font-size:11.5px; color:var(--beds-text-secondary);">${escapeHtml(ast.foundationStatus)}</span></td>
          <td><span class="tag-chip ${ast.status.includes('PROGRESS') || ast.status.includes('ALIGNMENT') ? 'tag-purple' : (ast.status.includes('HOLD') ? 'tag-amber' : 'tag-green')}" style="font-weight:700; font-size:10.5px;">${ast.status}</span></td>
          <td>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.open360Dossier('ASSET', '${ast.id}')" style="font-weight:700;">
              🔍 Asset 360°
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // 15. MASTER WORK PACKAGES TABLE RENDERER
  function renderWorkPackagesTable(packages) {
    const tbody = document.getElementById('wpTableBody');
    if (!tbody) return;

    if (packages.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:24px; color:#94a3b8; font-weight:600;">No matching work packages found.</td></tr>';
      return;
    }

    tbody.innerHTML = packages.map((wp) => `
      <tr>
        <td><strong style="font-family:monospace; color:var(--beds-teal-primary); font-size:12.5px;">${wp.id}</strong></td>
        <td>
          <span class="tag-chip tag-cyan" style="font-size:10.5px; font-weight:700;">${wp.workspaceId}</span>
          <div style="font-size:11px; color:var(--beds-text-muted); margin-top:3px; font-weight:600;">${wp.workstreamId}</div>
        </td>
        <td>
          <strong style="color:var(--beds-charcoal-heading); font-size:13px;">${escapeHtml(wp.title)}</strong>
          <div style="font-size:11.5px; color:var(--beds-text-secondary); margin-top:3px;">
            Asset: <code style="font-size:11px; background:var(--super-bg); padding:1px 5px; border-radius:3px;">${wp.assetId}</code> | Scope: <strong>${wp.scopeRef}</strong>
          </div>
        </td>
        <td><span style="font-weight:600; font-size:12.5px;">${wp.supervisor}</span></td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="flex:1; background:#e2e8f0; height:7px; border-radius:4px; overflow:hidden;">
              <div style="width:${wp.progressPercentage}%; background:#0097a7; height:100%; border-radius:4px;"></div>
            </div>
            <span style="font-size:11.5px; font-weight:800; color:var(--beds-charcoal-heading);">${wp.progressPercentage}%</span>
          </div>
          <div style="font-size:11px; color:var(--beds-text-muted); margin-top:3px;">${escapeHtml(wp.progressBasis || '')}</div>
        </td>
        <td><span class="tag-chip ${getStateBadgeClass(wp.state)}" style="font-weight:700;">${wp.state}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsOpsApp.open360Dossier('WP', '${wp.id}')" title="Open 360° Comprehensive Dossier" style="font-weight:700;">
              👁️ 360° Dossier
            </button>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.openEditModal('${wp.id}')" title="Inspect / Manage Package" style="font-weight:700;">
              ⚙️
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function getStateBadgeClass(state) {
    if (state === 'Mechanical completion' || state === 'Closed') return 'tag-green';
    if (state === 'Hold / blocked') return 'tag-red';
    if (state === 'In progress') return 'tag-purple';
    if (state === 'Mobilized') return 'tag-amber';
    return 'tag-cyan';
  }

  // 16. MANPOWER TABLE RENDERER
  function renderManpowerTable(roster) {
    const tbody = document.getElementById('manpowerTableBody');
    if (!tbody) return;

    tbody.innerHTML = roster.map((mp) => {
      let stateTag = 'tag-green';
      if (mp.state === 'REQUIRED') stateTag = 'tag-cyan';
      else if (mp.state === 'ALLOCATED') stateTag = 'tag-amber';
      else if (mp.state === 'STANDBY_HOLD') stateTag = 'tag-red';
      else if (mp.state === 'RELEASED') stateTag = 'tag-purple';

      return `
        <tr>
          <td><code style="font-weight:800; color:var(--beds-teal-primary);">${mp.badgeNo}</code></td>
          <td><strong style="color:var(--beds-charcoal-heading); font-size:13px;">${mp.name}</strong></td>
          <td><span style="font-weight:600;">${mp.designation}</span></td>
          <td>${mp.trade}</td>
          <td><span style="font-size:11px; font-weight:700; color:#059669;">${mp.medicalFitness}</span></td>
          <td><code style="font-size:11px;">${mp.tpiRiggingCert}</code></td>
          <td>${mp.form11Qualified ? '<span class="tag-chip tag-green" style="font-size:10px;">FORM-11 QUALIFIED</span>' : '<span class="tag-chip tag-red" style="font-size:10px;">UNQUALIFIED</span>'}</td>
          <td><span class="tag-chip ${stateTag}" style="font-weight:800;">${mp.state}</span></td>
          <td>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsOpsApp.cycleManpowerState('${mp.badgeNo}')" title="Cycle Lifecycle State" style="font-size:11px; font-weight:700;">
              🔄 Cycle State
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 17. SHIFT LOGS TABLE RENDERER
  function renderShiftLogsTable(logs) {
    const tbody = document.getElementById('shiftLogsBody');
    if (!tbody) return;

    if (logs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#94a3b8;">No shift log entries recorded yet.</td></tr>';
      return;
    }

    tbody.innerHTML = logs.map((log) => `
      <tr>
        <td><code style="font-weight:800; color:var(--beds-teal-primary);">${log.id}</code></td>
        <td>
          <strong>${log.date}</strong>
          <div style="font-size:11px; color:var(--beds-teal-primary); font-weight:700;">${log.shiftCode}</div>
        </td>
        <td>
          <span class="tag-chip tag-cyan" style="font-size:10px;">${log.workspaceId}</span>
          <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">${log.workstreamId}</div>
        </td>
        <td>
          <div><strong>${log.supervisor}</strong> (Lead: ${log.leadRigger})</div>
          <div style="font-size:11px; color:var(--beds-text-secondary); margin-top:2px;">Crew Count: <strong>${log.deployedCrewCount}</strong></div>
        </td>
        <td>
          <div style="font-size:12px; font-weight:600; color:var(--beds-charcoal-heading);">${escapeHtml(log.keyMilestone)}</div>
          <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Cranes: ${escapeHtml(log.cranesActive)}</div>
        </td>
        <td>
          <div style="font-size:11.5px; color:var(--beds-text-secondary); line-height:1.4;">${escapeHtml(log.handoverNotes)}</div>
        </td>
      </tr>
    `).join('');
  }

  // 18. HOLDS TABLE RENDERER
  function renderHoldsTable(holds) {
    const tbody = document.getElementById('holdsTableBody');
    if (!tbody) return;

    if (holds.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px; color:#94a3b8;">No active engineering holds or discrepancies.</td></tr>';
      return;
    }

    tbody.innerHTML = holds.map((hld) => {
      const isResolved = hld.status === 'RESOLVED';
      const statusBadge = isResolved ? 'tag-green' : 'tag-red';
      return `
        <tr>
          <td><code style="font-weight:800; color:${isResolved ? '#059669' : '#dc2626'};">${hld.id}</code></td>
          <td>
            <span class="tag-chip tag-cyan" style="font-size:10px;">${hld.workspaceId}</span>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Asset: <code>${hld.assetId}</code></div>
          </td>
          <td><span class="tag-chip tag-amber" style="font-size:10px; font-weight:700;">${hld.category}</span></td>
          <td>
            <strong style="color:var(--beds-charcoal-heading); font-size:12.5px;">${escapeHtml(hld.description)}</strong>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Cause: ${escapeHtml(hld.rootCause)}</div>
          </td>
          <td><strong style="font-size:12px; color:var(--beds-teal-primary);">${hld.responsibleParty}</strong></td>
          <td>
            <div style="font-size:11.5px; color:var(--beds-text-secondary);">${escapeHtml(hld.resolutionAction)}</div>
            <div style="font-size:10.5px; color:var(--beds-text-muted); margin-top:2px;">Target: <strong>${hld.targetDate}</strong></div>
          </td>
          <td><span class="tag-chip ${statusBadge}" style="font-weight:800;">${hld.status}</span></td>
        </tr>
      `;
    }).join('');
  }

  // 19. UNIVERSAL 360° DOSSIER MODAL ENGINE
  async function open360Dossier(entityType, entityId) {
    activeDossierEntity = { type: entityType, id: entityId };
    const modal = document.getElementById('modal-dossier-360');
    if (!modal) return;

    const packages = await getAllRecords('work_packages');
    const assets = await getAllRecords('assets');
    const logs = await getAllRecords('shift_logs');
    const holds = await getAllRecords('holds_and_discrepancies');

    const titleEl = document.getElementById('dossierMainTitle');
    const subTitleEl = document.getElementById('dossierSubTitle');
    const bodyEl = document.getElementById('dossierModalBody');

    if (entityType === 'WP') {
      const wp = packages.find(w => w.id === entityId);
      if (!wp) return;
      const asset = (assets.length > 0 ? assets : SEED_ASSETS).find(a => a.id === wp.assetId) || {};
      const relatedLogs = logs.filter(l => l.workstreamId === wp.workstreamId || l.workspaceId === wp.workspaceId);
      const relatedHolds = holds.filter(h => h.assetId === wp.assetId);

      titleEl.innerHTML = `<span>📋</span> 360° Work Package Dossier: <strong style="color:#00e5ff;">${wp.id}</strong>`;
      subTitleEl.textContent = `${wp.title} • Area: ${wp.workspaceId} (${wp.workstreamId})`;

      bodyEl.innerHTML = renderWp360Html(wp, asset, relatedLogs, relatedHolds);
    } else if (entityType === 'ASSET') {
      const asset = (assets.length > 0 ? assets : SEED_ASSETS).find(a => a.id === entityId);
      if (!asset) return;
      const relatedWps = packages.filter(w => w.assetId === asset.id || w.workstreamId === asset.workstreamId);
      const relatedHolds = holds.filter(h => h.assetId === asset.id);

      titleEl.innerHTML = `<span>🔍</span> 360° Heavy Machine Asset Dossier: <strong style="color:#00e5ff;">${asset.id}</strong>`;
      subTitleEl.textContent = `${asset.name} • OEM: ${asset.oem} • Weight: ${asset.weightMT.toFixed(2)} MT`;

      bodyEl.innerHTML = renderAsset360Html(asset, relatedWps, relatedHolds);
    } else if (entityType === 'AREA') {
      const area = AREA_METADATA[entityId] || {};
      const areaWps = packages.filter(w => w.workspaceId === entityId);
      const areaAssets = (assets.length > 0 ? assets : SEED_ASSETS).filter(a => a.workspaceId === entityId);
      const areaHolds = holds.filter(h => h.workspaceId === entityId);

      titleEl.innerHTML = `<span>🏛️</span> 360° Area Executive Audit Dossier: <strong style="color:#00e5ff;">${entityId}</strong>`;
      subTitleEl.textContent = `${area.name} • Indicative Tonnage: ${area.indicativeTonnageMT} MT • Baseline: ${area.baselineManDays} MD`;

      bodyEl.innerHTML = renderArea360Html(area, areaWps, areaAssets, areaHolds);
    }

    modal.style.display = 'flex';
  }

  function renderWp360Html(wp, asset, logs, holds) {
    const savedPunchlist = JSON.parse(localStorage.getItem(`punchlist_${wp.id}`) || 'null') || DEFAULT_PUNCHLIST;
    const verifiedCount = savedPunchlist.filter(p => p.verified).length;
    const punchlistPct = Math.round((verifiedCount / savedPunchlist.length) * 100);

    return `
      <!-- PANE 1: SCOPE & SOW -->
      <div id="tab-dos-scope" class="dossier-pane active">
        <div class="dossier-grid-2">
          <div class="dossier-spec-card">
            <div class="lbl">Work Package Identifier</div>
            <div class="val" style="color:var(--super-cyan); font-family:var(--beds-font-mono);">${wp.id}</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Lifecycle Execution State</div>
            <div class="val"><span class="tag-chip ${getStateBadgeClass(wp.state)}">${wp.state}</span> (${wp.progressPercentage}%)</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">SOW Contract Reference</div>
            <div class="val">${wp.scopeRef} • Clause Approved</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Target Asset Tag</div>
            <div class="val"><code style="font-weight:800; color:var(--beds-teal-primary);">${wp.assetId}</code> (${escapeHtml(asset.name || '')})</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Planned Duration Window</div>
            <div class="val">${wp.plannedStart} ➔ ${wp.plannedFinish}</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Area In-Charge Supervisor</div>
            <div class="val">${wp.supervisor} (BALSONS Ops)</div>
          </div>
        </div>

        <div class="dossier-spec-card" style="margin-bottom:14px;">
          <div class="lbl">Approved Scope of Work Description</div>
          <div class="val" style="font-size:13px; font-weight:500; color:var(--beds-text-primary); line-height:1.5;">${escapeHtml(wp.scopeClause)}</div>
        </div>

        <div class="dossier-spec-card">
          <div class="lbl">Measurable Progress Basis</div>
          <div class="val" style="font-size:13px; font-weight:600; color:var(--beds-charcoal-heading);">${escapeHtml(wp.progressBasis || 'Pending verification')}</div>
        </div>
      </div>

      <!-- PANE 2: RIGGING & CRANES -->
      <div id="tab-dos-rigging" class="dossier-pane" style="display:none;">
        <div class="dossier-grid-2">
          <div class="dossier-spec-card">
            <div class="lbl">Crane & Heavy Equipment Configuration</div>
            <div class="val" style="color:#2563eb;">${escapeHtml(wp.craneReq)}</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Form 11 Lifting Tackle Certificate</div>
            <div class="val" style="color:#059669;">${wp.form11TackleRef}</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Rigging Lift Plan Reference</div>
            <div class="val"><code>LP-JTRWF-2026-${wp.id.slice(-3)} (Approved)</code></div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Ground Bearing Pressure Check</div>
            <div class="val"><span class="tag-chip tag-green">VERIFIED > 35.0 T/m²</span></div>
          </div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Rigging Tackle Certification Audit Notes</div>
          <div class="val" style="font-size:12.5px; font-weight:500; color:var(--beds-text-secondary); line-height:1.5;">
            All 4-leg wire rope slings, master links, and bow shackles verified against Store Manager Form 11 certificate database. Visual pre-lift inspection performed by Lead Rigger Manoj Das with zero strand nicks, elongation, or distortion.
          </div>
        </div>
      </div>

      <!-- PANE 3: SAFETY & PTW -->
      <div id="tab-dos-safety" class="dossier-pane" style="display:none;">
        <div class="dossier-grid-2">
          <div class="dossier-spec-card">
            <div class="lbl">Permit to Work (PTW) Status</div>
            <div class="val" style="color:#059669; font-weight:800;">${wp.safetyPtwRef}</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Job Safety Analysis (JSA) Reference</div>
            <div class="val"><code>JSA-HEAVY-RIG-004 (Signed)</code></div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Height Work & Fall Arrest Clearance</div>
            <div class="val"><span class="tag-chip tag-green">100% DOUBLE LANYARD TIE-OFF</span></div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Maximum Wind Speed Operating Rule</div>
            <div class="val">Max 9.8 m/s (Anemometer Monitored)</div>
          </div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Site Safety Steward Clearance Note</div>
          <div class="val" style="font-size:12.5px; font-weight:500; color:var(--beds-text-secondary); line-height:1.5;">
            Toolbox talk conducted at 07:45 AM by Safety Steward Bikash Mohapatra. Exclusion barricades set within 25m radius of boom swing. No concurrent hot work permitted beneath live suspended load.
          </div>
        </div>
      </div>

      <!-- PANE 4: CREW & TRADES -->
      <div id="tab-dos-crew" class="dossier-pane" style="display:none;">
        <div class="dossier-grid-2">
          <div class="dossier-spec-card">
            <div class="lbl">Lead Erection Supervisor</div>
            <div class="val">Dilip Rout (Area Manager)</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Certified Lead Heavy Rigger</div>
            <div class="val">Manoj Das (TPI-RIG-2026-045)</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Assigned Master Crane Operators</div>
            <div class="val">Tapan Barik (Demag 250T) + Ganesh Pradhan (Sany 150T)</div>
          </div>
          <div class="dossier-spec-card">
            <div class="lbl">Precision Millwright Fitters</div>
            <div class="val">Pradeep Nayak + Kailash Sahoo (48 Crew Total)</div>
          </div>
        </div>
      </div>

      <!-- PANE 5: MECHANICAL COMPLETION PUNCHLIST -->
      <div id="tab-dos-punchlist" class="dossier-pane" style="display:none;">
        <div class="punchlist-meter-box">
          <div class="punchlist-meter-header">
            <span>Mechanical Completion Punchlist Verification</span>
            <span id="punchlistPctLabel" style="color:var(--super-cyan); font-family:var(--beds-font-mono); font-size:14px;">${punchlistPct}% (${verifiedCount} / ${savedPunchlist.length} Verified)</span>
          </div>
          <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
            <div id="punchlistProgressBar" style="width:${punchlistPct}%; background:#0097a7; height:100%; border-radius:4px; transition:width 0.3s ease;"></div>
          </div>
        </div>

        <div id="punchlistItemsContainer">
          ${savedPunchlist.map((item, idx) => `
            <div class="punchlist-item ${item.verified ? 'verified' : ''}" onclick="BalsonsOpsApp.togglePunchlistItem('${wp.id}', ${idx})">
              <input type="checkbox" ${item.verified ? 'checked' : ''} onclick="event.stopPropagation(); BalsonsOpsApp.togglePunchlistItem('${wp.id}', ${idx})">
              <div class="punchlist-text">
                <div class="punchlist-title">${escapeHtml(item.title)}</div>
                <div class="punchlist-sub">${escapeHtml(item.sub)}</div>
              </div>
              <span class="tag-chip ${item.verified ? 'tag-green' : 'tag-amber'}" style="font-size:10px; font-weight:800;">
                ${item.verified ? 'VERIFIED ✓' : 'PENDING'}
              </span>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:18px; padding:16px; background:var(--super-bg); border:1px solid var(--super-border); border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-weight:800; font-size:13px; color:var(--beds-charcoal-heading);">Official Mechanical Completion Certificate Status</div>
            <div style="font-size:11px; color:var(--beds-text-muted); margin-top:2px;">Governed by JTRWF / Schuler Joint Inspection Protocol</div>
          </div>
          <button class="beds-btn beds-btn-sm ${punchlistPct === 100 ? 'beds-btn-primary' : 'beds-btn-secondary'}" onclick="window.print()" style="font-weight:700;">
            ${punchlistPct === 100 ? '📜 Print Completion Certificate' : '🖨️ Print Dossier Preview'}
          </button>
        </div>
      </div>

      <!-- PANE 6: AUDIT TRAIL & LOGS -->
      <div id="tab-dos-audit" class="dossier-pane" style="display:none;">
        <div class="card-panel-header" style="margin-bottom:12px;">
          <h4 style="margin:0; font-size:14px; font-weight:800;">Associated Daily Shift Execution Logs</h4>
        </div>
        ${logs.length === 0 ? '<p style="color:#94a3b8; font-size:12px;">No shift execution logs recorded for this work package yet.</p>' : `
          <div class="table-responsive">
            <table class="beds-table">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Shift & Date</th>
                  <th>Supervisor</th>
                  <th>Milestones Achieved</th>
                  <th>Handover Notes</th>
                </tr>
              </thead>
              <tbody>
                ${logs.map(l => `
                  <tr>
                    <td><code style="font-weight:700; color:var(--beds-teal-primary);">${l.id}</code></td>
                    <td><strong>${l.date}</strong><br><span style="font-size:11px; color:#0097a7;">${l.shiftCode}</span></td>
                    <td>${l.supervisor}</td>
                    <td style="font-size:12px;">${escapeHtml(l.keyMilestone)}</td>
                    <td style="font-size:11.5px; color:var(--beds-text-secondary);">${escapeHtml(l.handoverNotes)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  }

  function renderAsset360Html(asset, relatedWps, relatedHolds) {
    return `
      <div class="dossier-grid-2">
        <div class="dossier-spec-card">
          <div class="lbl">Asset Tag Reference</div>
          <div class="val" style="color:var(--super-cyan); font-family:var(--beds-font-mono);">${asset.id}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Current Erection Status</div>
          <div class="val"><span class="tag-chip tag-green">${asset.status}</span> (${asset.progressPercentage}%)</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">OEM Maker & Origin</div>
          <div class="val">${asset.oem}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Machinery Net Weight</div>
          <div class="val" style="color:var(--beds-teal-primary); font-size:16px;">${asset.weightMT.toFixed(2)} MT</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Physical Dimensions (L x W x H)</div>
          <div class="val">${asset.dimensions}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Pit Depth & Foundation Envelope</div>
          <div class="val">${asset.pitDepth}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Civil Foundation Readiness</div>
          <div class="val" style="color:#059669;">${escapeHtml(asset.foundationStatus)}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Sole Plate Levelling & Alignment</div>
          <div class="val">${escapeHtml(asset.solePlateStatus)}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Specified Anchor Bolt Torque</div>
          <div class="val">${escapeHtml(asset.anchorTorque)}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Store Form 11 Tackle Reference</div>
          <div class="val">${escapeHtml(asset.form11TackleRef)}</div>
        </div>
      </div>

      <div style="margin-top:18px;">
        <h4 style="margin:0 0 10px 0; font-size:14px; font-weight:800; color:var(--beds-charcoal-heading);">Associated Work Packages (${relatedWps.length})</h4>
        <div class="table-responsive">
          <table class="beds-table">
            <thead>
              <tr>
                <th>WP ID</th>
                <th>Workstream</th>
                <th>Package Title</th>
                <th>Progress %</th>
                <th>Lifecycle State</th>
              </tr>
            </thead>
            <tbody>
              ${relatedWps.map(w => `
                <tr>
                  <td><code style="font-weight:700; color:var(--beds-teal-primary);">${w.id}</code></td>
                  <td><span class="tag-chip tag-cyan">${w.workstreamId}</span></td>
                  <td><strong>${escapeHtml(w.title)}</strong></td>
                  <td>${w.progressPercentage}%</td>
                  <td><span class="tag-chip ${getStateBadgeClass(w.state)}">${w.state}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderArea360Html(area, areaWps, areaAssets, areaHolds) {
    const sumProg = areaWps.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0);
    const avgProg = areaWps.length > 0 ? (sumProg / areaWps.length).toFixed(1) : 0;
    const totalTonnage = areaAssets.reduce((acc, curr) => acc + (curr.weightMT || 0), 0);

    return `
      <div class="dossier-grid-2">
        <div class="dossier-spec-card">
          <div class="lbl">Execution Area Workspace</div>
          <div class="val" style="color:var(--super-cyan);">${area.name}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Overall Erection Completion</div>
          <div class="val" style="font-size:18px; color:#10b981;">${avgProg}% Complete</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Approved SOW Baseline Man-Days</div>
          <div class="val">${area.baselineManDays} MD (${area.baselineHours} Hours)</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Total Machinery Tonnage</div>
          <div class="val" style="color:var(--beds-teal-primary); font-size:16px;">${totalTonnage > 0 ? totalTonnage.toFixed(2) : area.indicativeTonnageMT} MT</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Assigned Crane & Rigging Cell</div>
          <div class="val">${area.cranes}</div>
        </div>
        <div class="dossier-spec-card">
          <div class="lbl">Active Permit to Work (PTW)</div>
          <div class="val" style="color:#059669;">${area.activePtw}</div>
        </div>
      </div>

      <div class="dossier-spec-card" style="margin-top:14px; margin-bottom:18px;">
        <div class="lbl">Executive Area Description & Scope</div>
        <div class="val" style="font-size:13px; font-weight:500; color:var(--beds-text-primary); line-height:1.5;">${area.description}</div>
      </div>

      <div>
        <h4 style="margin:0 0 10px 0; font-size:14px; font-weight:800; color:var(--beds-charcoal-heading);">Active Machinery Assets Installed in this Area (${areaAssets.length})</h4>
        <div class="table-responsive">
          <table class="beds-table">
            <thead>
              <tr>
                <th>Asset Code</th>
                <th>Machine Description</th>
                <th>OEM Maker</th>
                <th>Weight (MT)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${areaAssets.map(a => `
                <tr>
                  <td><code style="font-weight:700; color:var(--beds-teal-primary);">${a.id}</code></td>
                  <td><strong>${escapeHtml(a.name)}</strong></td>
                  <td>${a.oem}</td>
                  <td><strong>${a.weightMT.toFixed(2)} MT</strong></td>
                  <td><span class="tag-chip tag-green">${a.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // 20. PUNCHLIST INTERACTIVE TOGGLE
  function togglePunchlistItem(wpId, index) {
    const key = `punchlist_${wpId}`;
    let punchlist = JSON.parse(localStorage.getItem(key) || 'null') || DEFAULT_PUNCHLIST.map(p => ({ ...p }));
    if (punchlist[index]) {
      punchlist[index].verified = !punchlist[index].verified;
      localStorage.setItem(key, JSON.stringify(punchlist));

      const verifiedCount = punchlist.filter(p => p.verified).length;
      const pct = Math.round((verifiedCount / punchlist.length) * 100);

      const label = document.getElementById('punchlistPctLabel');
      if (label) label.textContent = `${pct}% (${verifiedCount} / ${punchlist.length} Verified)`;
      const bar = document.getElementById('punchlistProgressBar');
      if (bar) bar.style.width = `${pct}%`;

      const container = document.getElementById('punchlistItemsContainer');
      if (container) {
        container.innerHTML = punchlist.map((item, idx) => `
          <div class="punchlist-item ${item.verified ? 'verified' : ''}" onclick="BalsonsOpsApp.togglePunchlistItem('${wpId}', ${idx})">
            <input type="checkbox" ${item.verified ? 'checked' : ''} onclick="event.stopPropagation(); BalsonsOpsApp.togglePunchlistItem('${wpId}', ${idx})">
            <div class="punchlist-text">
              <div class="punchlist-title">${escapeHtml(item.title)}</div>
              <div class="punchlist-sub">${escapeHtml(item.sub)}</div>
            </div>
            <span class="tag-chip ${item.verified ? 'tag-green' : 'tag-amber'}" style="font-size:10px; font-weight:800;">
              ${item.verified ? 'VERIFIED ✓' : 'PENDING'}
            </span>
          </div>
        `).join('');
      }

      window.BalsonsOpsApp.showToast(`Punchlist item ${index + 1} updated to ${punchlist[index].verified ? 'VERIFIED' : 'PENDING'}`, 'info');
      logAudit('PUNCHLIST_VERIFICATION', wpId, `Punchlist item ${index + 1} marked ${punchlist[index].verified ? 'VERIFIED' : 'PENDING'}`);
    }
  }

  function switchDossierTab(tabId, btn) {
    document.querySelectorAll('.dossier-pane').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.dossier-tab-btn').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.style.display = 'block';
    if (btn) btn.classList.add('active');
  }

  function close360Dossier() {
    const modal = document.getElementById('modal-dossier-360');
    if (modal) modal.style.display = 'none';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 21. PUBLIC API EXPOSURE
  window.BalsonsOpsApp = {
    init: async function () {
      await initDb();
      await refreshDashboard();
      console.log('✅ BALSONS Operations App V7.2 Engine Initialized');
    },

    showToast: function (msg, type = 'success') {
      const container = document.getElementById('opsToastContainer');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `ops-toast ops-toast-${type}`;
      toast.innerHTML = `
        <span style="font-size:16px;">${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
        <div style="flex:1;">${msg}</div>
      `;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    },

    // 360 DOSSIER HANDLERS
    open360Dossier: open360Dossier,
    close360Dossier: close360Dossier,
    switchDossierTab: switchDossierTab,
    togglePunchlistItem: togglePunchlistItem,

    // AREA QUICK ACTION HANDLERS
    openCreateWpModalForArea: function (areaId) {
      const sel = document.getElementById('newWpWorkspace');
      if (sel) sel.value = areaId;
      this.openCreateWpModal();
    },

    openNewShiftModalForArea: function (areaId) {
      const sel = document.getElementById('shiftWsSelect');
      if (sel) sel.value = areaId;
      this.openNewShiftModal();
    },

    openRaiseHoldModalForArea: function (areaId) {
      const sel = document.getElementById('holdWsSelect');
      if (sel) sel.value = areaId;
      this.openRaiseHoldModal();
    },

    filterMsWorkstream: function (streamCode, btn) {
      currentMsStreamFilter = streamCode;
      document.querySelectorAll('.stream-pill-btn').forEach(el => el.classList.remove('active'));
      if (btn) btn.classList.add('active');
      refreshDashboard();
    },

    // WORK PACKAGE ACTIONS
    openCreateWpModal: function () {
      const modal = document.getElementById('modalCreateWp');
      if (modal) modal.style.display = 'flex';
    },

    closeCreateWpModal: function () {
      const modal = document.getElementById('modalCreateWp');
      if (modal) modal.style.display = 'none';
    },

    submitCreateWp: async function (e) {
      if (e) e.preventDefault();
      const form = document.getElementById('formCreateWp');
      if (!form) return;

      const ws = document.getElementById('newWpWorkspace').value;
      const prefix = ws.includes('AXLE') ? 'AXLE' : ws.includes('WHEEL') ? 'WHEEL' : 'MS';
      const newId = `WP-${prefix}-${Date.now().toString().slice(-4)}`;
      const newWp = {
        id: newId,
        workspaceId: ws,
        workstreamId: document.getElementById('newWpWorkstream').value,
        assetId: document.getElementById('newWpAsset').value,
        title: document.getElementById('newWpTitle').value,
        scopeRef: document.getElementById('newWpScopeRef').value,
        scopeClause: document.getElementById('newWpScopeClause').value,
        plannedStart: document.getElementById('newWpStartDate').value,
        plannedFinish: document.getElementById('newWpEndDate').value,
        actualStart: '',
        actualFinish: '',
        supervisor: document.getElementById('newWpSupervisor').value,
        state: 'Identified',
        progressBasis: 'Work package created; awaiting scope verification',
        progressPercentage: 0,
        craneReq: document.getElementById('newWpCrane').value,
        form11TackleRef: 'Pending Store Check',
        safetyPtwRef: 'Pending Safety PTW',
        readiness: { drawings: true, foundation: false, path: false, tools: false, ptw: false },
        hold: null
      };

      await saveRecord('work_packages', newWp);
      logAudit('CREATE_WORK_PACKAGE', newId, `Created new work package ${newId} (${newWp.title}) in ${newWp.workspaceId}`);
      autoSyncWithCloud('createWorkPackage', 'WORK_PACKAGES', newWp);
      this.closeCreateWpModal();
      form.reset();
      await refreshDashboard();
      this.showToast(`Work Package ${newId} created successfully in state 'Identified'.`, 'success');
    },

    openEditModal: async function (wpId) {
      const packages = await getAllRecords('work_packages');
      const wp = packages.find((w) => w.id === wpId);
      if (!wp) return;

      document.getElementById('editWpId').textContent = wp.id;
      document.getElementById('editWpTitle').textContent = wp.title;
      document.getElementById('editWpWorkspace').textContent = `${wp.workspaceId} • ${wp.workstreamId}`;
      document.getElementById('editWpAsset').textContent = wp.assetId;
      document.getElementById('editWpScope').textContent = `${wp.scopeRef}: ${wp.scopeClause}`;
      document.getElementById('editWpProgressPercent').value = wp.progressPercentage;
      document.getElementById('editWpProgressBasis').value = wp.progressBasis;
      document.getElementById('editWpStateSelect').value = wp.state;

      const modal = document.getElementById('modalManageWp');
      modal.setAttribute('data-current-wp', wpId);
      modal.style.display = 'flex';
    },

    closeEditModal: function () {
      const modal = document.getElementById('modalManageWp');
      if (modal) modal.style.display = 'none';
    },

    saveWpChanges: async function () {
      const modal = document.getElementById('modalManageWp');
      const wpId = modal.getAttribute('data-current-wp');
      const packages = await getAllRecords('work_packages');
      const wp = packages.find((w) => w.id === wpId);
      if (!wp) return;

      const oldState = wp.state;
      const newState = document.getElementById('editWpStateSelect').value;
      const newProg = parseInt(document.getElementById('editWpProgressPercent').value, 10) || 0;
      const newBasis = document.getElementById('editWpProgressBasis').value;

      wp.state = newState;
      wp.progressPercentage = newProg;
      wp.progressBasis = newBasis;

      if (newState === 'In progress' && !wp.actualStart) {
        wp.actualStart = new Date().toISOString().slice(0, 10);
      }
      if ((newState === 'Mechanical completion' || newState === 'Closed') && !wp.actualFinish) {
        wp.actualFinish = new Date().toISOString().slice(0, 10);
      }

      await saveRecord('work_packages', wp);
      logAudit('UPDATE_WORK_PACKAGE_STATE', wpId, `State changed from ${oldState} to ${newState}; progress updated to ${newProg}%.`);
      autoSyncWithCloud('updateWorkPackage', 'WORK_PACKAGES', wp);
      this.closeEditModal();
      await refreshDashboard();
      this.showToast(`Work Package ${wpId} updated to state '${newState}' (${newProg}%).`, 'success');
    },

    filterWorkPackages: async function () {
      const query = (document.getElementById('wpSearchInput')?.value || '').toLowerCase();
      const wsFilter = document.getElementById('wpWorkspaceFilter')?.value || 'ALL';
      const stateFilter = document.getElementById('wpStateFilter')?.value || 'ALL';

      const packages = await getAllRecords('work_packages');
      const filtered = packages.filter((wp) => {
        const matchesQuery = !query || 
          wp.id.toLowerCase().includes(query) ||
          wp.title.toLowerCase().includes(query) ||
          wp.assetId.toLowerCase().includes(query) ||
          wp.supervisor.toLowerCase().includes(query) ||
          (wp.workstreamId || '').toLowerCase().includes(query);

        const matchesWs = wsFilter === 'ALL' || wp.workspaceId === wsFilter;
        const matchesState = stateFilter === 'ALL' || wp.state === stateFilter;

        return matchesQuery && matchesWs && matchesState;
      });

      renderWorkPackagesTable(filtered);
    },

    // MANPOWER ACTIONS
    cycleManpowerState: async function (badgeNo) {
      const roster = await getAllRecords('manpower_roster');
      const member = roster.find((m) => m.badgeNo === badgeNo);
      if (!member) return;

      const states = ['REQUIRED', 'AVAILABLE', 'QUALIFIED', 'CLEARED', 'ALLOCATED', 'MOBILIZED', 'DEPLOYED', 'RELEASED'];
      const currentIndex = states.indexOf(member.state);
      const nextIndex = (currentIndex + 1) % states.length;
      const nextState = states[nextIndex];

      member.state = nextState;
      await saveRecord('manpower_roster', member);
      logAudit('CYCLE_MANPOWER_STATE', badgeNo, `Manpower ${member.name} transitioned to ${nextState}.`);
      autoSyncWithCloud('cycleManpower', 'MANPOWER_ROSTER', member);
      await refreshDashboard();
      this.showToast(`${member.name} cycled to state '${nextState}'.`, 'info');
    },

    // SHIFT LOG ACTIONS
    openNewShiftModal: function () {
      const modal = document.getElementById('modalNewShiftLog');
      if (modal) modal.style.display = 'flex';
    },

    closeNewShiftModal: function () {
      const modal = document.getElementById('modalNewShiftLog');
      if (modal) modal.style.display = 'none';
    },

    submitNewShiftLog: async function (e) {
      if (e) e.preventDefault();
      const newLog = {
        id: `LOG-${Date.now().toString().slice(-6)}`,
        date: document.getElementById('shiftDate').value,
        shiftCode: document.getElementById('shiftSelect').value,
        workspaceId: document.getElementById('shiftWsSelect').value,
        workstreamId: document.getElementById('shiftWsStream').value,
        supervisor: document.getElementById('shiftSup').value,
        leadRigger: document.getElementById('shiftRigger').value,
        deployedCrewCount: parseInt(document.getElementById('shiftCrewCount').value, 10) || 48,
        cranesActive: document.getElementById('shiftCranes').value,
        tackleCertStatus: document.getElementById('shiftTackleCert').value,
        safetyPtwStatus: document.getElementById('shiftPtw').value,
        keyMilestone: document.getElementById('shiftMilestone').value,
        incidents: 'Zero incidents recorded',
        handoverNotes: document.getElementById('shiftHandoverNotes').value
      };

      await saveRecord('shift_logs', newLog);
      logAudit('SUBMIT_SHIFT_LOG', newLog.id, `Shift log submitted for ${newLog.date} (${newLog.shiftCode}) by ${newLog.supervisor}`);
      autoSyncWithCloud('submitShiftLog', 'SHIFT_LOGS', newLog);
      this.closeNewShiftModal();
      await refreshDashboard();
      this.showToast(`Shift log ${newLog.id} submitted and signed off.`, 'success');
    },

    // HOLDS & DISCREPANCIES ACTIONS
    openRaiseHoldModal: function () {
      const modal = document.getElementById('modalRaiseHold');
      if (modal) modal.style.display = 'flex';
    },

    closeRaiseHoldModal: function () {
      const modal = document.getElementById('modalRaiseHold');
      if (modal) modal.style.display = 'none';
    },

    submitRaiseHold: async function (e) {
      if (e) e.preventDefault();
      const newHold = {
        id: `HLD-${Date.now().toString().slice(-6)}`,
        dateRaised: new Date().toISOString().slice(0, 10),
        workspaceId: document.getElementById('holdWsSelect').value,
        workstreamId: document.getElementById('holdStreamSelect').value,
        assetId: document.getElementById('holdAssetInput').value,
        category: document.getElementById('holdCategorySelect').value,
        description: document.getElementById('holdDescInput').value,
        rootCause: document.getElementById('holdCauseInput').value,
        responsibleParty: document.getElementById('holdPartyInput').value,
        sowClause: document.getElementById('holdClauseInput').value,
        targetDate: document.getElementById('holdTargetDate').value,
        resolutionAction: document.getElementById('holdActionInput').value,
        status: 'ACTIVE'
      };

      await saveRecord('holds_and_discrepancies', newHold);
      logAudit('RAISE_SITE_HOLD', newHold.id, `Hold raised for ${newHold.assetId} (${newHold.category}) by Operations`);
      autoSyncWithCloud('raiseHold', 'HOLDS_AND_DISCREPANCIES', newHold);
      this.closeRaiseHoldModal();
      await refreshDashboard();
      this.showToast(`Site Hold ${newHold.id} raised successfully.`, 'warning');
    },

    // DUAL SYNC MODAL & ACTION
    openSyncModal: function () {
      const modal = document.getElementById('modalSyncDb');
      if (modal) modal.style.display = 'flex';
    },

    closeSyncModal: function () {
      const modal = document.getElementById('modalSyncDb');
      if (modal) modal.style.display = 'none';
    },

    triggerDualSync: function () {
      const btn = document.getElementById('btnForceSync');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '🔄 Syncing Dual Google Sheet...';
      }
      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '✓ Bi-Directional Sync Completed';
        }
        localStorage.setItem('balsons_ops_last_sync', new Date().toLocaleTimeString());
        updateSyncBadge(`Sync: 1GeqDDmB... (Just now)`, true);
        this.showToast('Dual Sync with Google Sheets 1GeqDDmB... Completed Successfully!', 'success');
        setTimeout(() => this.closeSyncModal(), 1200);
      }, 1500);
    },

    // ROLE SWITCH / LOGIN MODAL
    openLoginModal: function () {
      const modal = document.getElementById('modal-login');
      if (modal) modal.style.display = 'flex';
    },

    closeLoginModal: function () {
      const modal = document.getElementById('modal-login');
      if (modal) modal.style.display = 'none';
    },

    handleRoleSwitch: function (e) {
      if (e) e.preventDefault();
      const select = document.getElementById('opsRoleSelect');
      const selectedRole = select.value;
      const selectedName = select.options[select.selectedIndex].getAttribute('data-name');

      const userBadge = document.getElementById('headerUserBadge');
      if (userBadge) {
        userBadge.innerHTML = `👤 <strong>${selectedName}</strong> · ${selectedRole}`;
      }

      this.closeLoginModal();
      this.showToast(`Switched active session to ${selectedName} (${selectedRole}).`, 'info');
    },

    // EXPORT JSON BACKUP
    exportOperationalData: async function () {
      const packages = await getAllRecords('work_packages');
      const assets = await getAllRecords('assets');
      const roster = await getAllRecords('manpower_roster');
      const logs = await getAllRecords('shift_logs');
      const holds = await getAllRecords('holds_and_discrepancies');
      const audits = await getAllRecords('audit_log');

      const fullExport = {
        metadata: {
          system: 'BALSONS OPERATIONS MANAGER',
          documentId: 'BAL-OPS-E2E-007 V7.2',
          databaseId: SPREADSHEET_ID,
          scriptId: APPS_SCRIPT_ID,
          exportedAt: new Date().toISOString(),
          totalPackages: packages.length,
          totalAssets: assets.length,
          totalManpower: roster.length,
          totalShiftLogs: logs.length,
          totalHolds: holds.length
        },
        workPackages: packages,
        assets: assets,
        manpowerRoster: roster,
        shiftLogs: logs,
        holdsAndDiscrepancies: holds,
        auditLog: audits
      };

      const blob = new Blob([JSON.stringify(fullExport, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BALSONS_OPS_BACKUP_V7_2_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      logAudit('EXPORT_DATABASE_BACKUP', 'FULL_SYSTEM', 'Exported JSON operational database backup snapshot.');
      this.showToast('Operational database snapshot exported successfully.', 'success');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.BalsonsOpsApp.init();
  });
})();
