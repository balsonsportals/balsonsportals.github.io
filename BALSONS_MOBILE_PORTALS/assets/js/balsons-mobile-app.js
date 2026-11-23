/**
 * =========================================================================
 * BALSONS MOBILE ECOSYSTEM - MASTER PRODUCTION APPLICATION SUITE (V6.0)
 * BEDS V1.0 Mobile & Tablet Framework for JTRWF Heavy Industrial Execution
 * Governed by Global Super Administrator Policy V1.0 (SAM-2026 Standard)
 * =========================================================================
 */

const BalsonsMobileApp = {
  // 1. AUTHORIZED ENTERPRISE USER SESSIONS (14 CANONICAL ACCOUNTS)
  accounts: [
    { username: 'superadmin', name: 'Prashant Muley', role: 'Super Administrator', badge: 'BAL-ADM-001', pass: 'Balsons@Super2026!', pin: '2026', scope: 'ALL 7 Portals (Unrestricted Write)' },
    { username: 'director.mgmt', name: 'Satish Chandra', role: 'Project Director', badge: 'BAL-DIR-001', pass: 'Balsons@Mgmt2026!', pin: '1001', scope: 'Directorate & Governance' },
    { username: 'admin.purch', name: 'Rohan Sharma', role: 'Purchase Lead / Commercial Head', badge: 'BAL-PUR-001', pass: 'Purch@Admin2026!', pin: '3001', scope: 'Purchase Manager (Full Commercial Write)' },
    { username: 'indenter.ops', name: 'Suresh Verma', role: 'Indenter / Site Engineer', badge: 'BAL-PUR-002', pass: 'Indent@Ops2026!', pin: '3002', scope: 'Purchase (PR Drafting & Tech Specs)' },
    { username: 'dilip.rout', name: 'Dilip Rout', role: 'Operations Area Manager', badge: 'BAL-OPS-001', pass: 'Ops@Dilip2026!', pin: '1002', scope: 'Line-Axle & Line-Wheel Erection' },
    { username: 'sarat.mishra', name: 'Sarat Mishra', role: 'Machine Shop Area Manager', badge: 'BAL-OPS-002', pass: 'Ops@Sarat2026!', pin: '1003', scope: 'Machine Shop 7 Workstreams' },
    { username: 'admin.store', name: 'Gagan Bihari Das', role: 'Store Portal Admin', badge: 'BAL-STR-001', pass: 'Store@Admin2026!', pin: '4001', scope: 'Store & Tackle Form 11' },
    { username: 'admin.safety', name: 'Gajendra Rao', role: 'Safety Portal Admin', badge: 'BAL-SAF-001', pass: 'Safety@Admin2026!', pin: '3001', scope: 'Safety & PTW Risk' },
    { username: 'admin.gate', name: 'Bikash Mohapatra', role: 'Gate Security Admin', badge: 'BAL-SEC-001', pass: 'Gate@Admin2026!', pin: '5001', scope: 'Gate Entry & Muster' },
    { username: 'admin.hr', name: 'Priyanka Senapati', role: 'HR Portal Admin', badge: 'BAL-HR-001', pass: 'HR@Admin2026!', pin: '6001', scope: 'HR & Statutory KYC' },
    { username: 'hod.rigging', name: 'K. N. Sharma', role: 'HOD Heavy Rigging', badge: 'BAL-OPS-005', pass: 'Rig@Hod2026!', pin: '7001', scope: 'Operations & Heavy Cranes' },
    { username: 'manoj.das', name: 'Manoj Das', role: 'Lead Heavy Rigger', badge: 'BAL-OPS-003', pass: 'Rig@Manoj2026!', pin: '1004', scope: 'Shift Execution & Rigging Crew' },
    { username: 'emp.ramesh', name: 'Ramesh Kumar', role: 'Senior Certified Rigger', badge: 'BAL-OPS-004', pass: 'Rig@Ramesh2026!', pin: '1005', scope: 'Turnstile & Self-Service' },
    { username: 'client.jtrwf', name: 'Client Auditor', role: 'Client Inspection Auditor', badge: 'BAL-AUD-001', pass: 'Client@JTRWF2026!', pin: '9001', scope: 'Operations (360° Dossiers Read-Only)' }
  ],

  // 2. OPERATIONS & HEAVY RIGGING WORK PACKAGES
  LIFECYCLE_STATES: ['STAGED', 'RIGGED', 'LIFTED', 'ALIGNED', 'TORQUED', 'TPI_INSPECTED', 'CLIENT_CLEARED', 'COMMISSIONED'],

  workPackages: [
    {
      id: 'WP-AXLE-01',
      title: 'Schuler Axle Cold Extrusion Press Erection',
      area: 'LINE-AXLE',
      tag: 'CRITICAL TANDEM LIFT',
      weightMT: 145.0,
      baselineMD: 280,
      state: 'TPI_INSPECTED',
      progress: 85,
      equipment: 'Demag CC-2800 (600T) + Liebherr 400T',
      lead: 'Dilip Rout / Manoj Das',
      craneCapacity: '600T Crawler + 400T Telescopic',
      shift: 'Day Shift (Bay 1)',
      punchlist: [
        { id: 'p1', title: 'Plinth Concrete Curing & Pre-Grout Survey', done: true },
        { id: 'p2', title: 'Tackle Form 11 Certificates Validated (TPI)', done: true },
        { id: 'p3', title: 'SPMT Modular Trailer Haulage & Spotting', done: true },
        { id: 'p4', title: '600T Tandem Crane Lift to Anchor Bolts', done: true },
        { id: 'p5', title: 'Optical Laser Alignment (0.02 mm/m tolerance)', done: true },
        { id: 'p6', title: 'Hydraulic Piping Flushing & Client Sign-Off', done: false }
      ]
    },
    {
      id: 'WP-AXLE-02',
      title: 'Hydraulic Pullers & Axle Transfer Gantry',
      area: 'LINE-AXLE',
      tag: 'IN PROGRESS',
      weightMT: 68.5,
      baselineMD: 160,
      state: 'ALIGNED',
      progress: 65,
      equipment: 'Krupp 100T Crane',
      lead: 'Dilip Rout',
      craneCapacity: '100T Mobile Telescopic',
      shift: 'Night Shift (Bay 2)',
      punchlist: [
        { id: 'p1', title: 'Anchor Pull Testing (120 kN calibration)', done: true },
        { id: 'p2', title: 'Sling & Shackle Form 11 Clearance', done: true },
        { id: 'p3', title: 'Overhead Gantry Girder Placement', done: true },
        { id: 'p4', title: 'Power Rail & Busbar Integration', done: false },
        { id: 'p5', title: 'Load Test with 125% Test Weight (TPI)', done: false }
      ]
    },
    {
      id: 'WP-AXLE-03',
      title: 'Axle Induction Hardening Furnace Skid',
      area: 'LINE-AXLE',
      tag: 'ELECTRICAL / RIG',
      weightMT: 38.0,
      baselineMD: 95,
      state: 'RIGGED',
      progress: 40,
      equipment: 'Tadano 75T Crane',
      lead: 'Manoj Das',
      craneCapacity: '75T Rough Terrain',
      shift: 'Day Shift (Bay 1)',
      punchlist: [
        { id: 'p1', title: 'Skid Unloading at Gate 2', done: true },
        { id: 'p2', title: 'Civil Foundation Centerline Survey', done: true },
        { id: 'p3', title: 'Spreader Beam Tackle Rigging', done: false },
        { id: 'p4', title: 'Plinth Lowering & Bolt Torquing', done: false }
      ]
    },
    {
      id: 'WP-WHEEL-01',
      title: '8,000T Monobloc Wheel Forging Press Plinth',
      area: 'LINE-WHEEL',
      tag: 'SUPER HEAVY TANDEM',
      weightMT: 285.0,
      baselineMD: 420,
      state: 'LIFTED',
      progress: 58,
      equipment: 'Liebherr LTM-11200 + Goldhofer SPMT',
      lead: 'Dilip Rout / Ramesh Kumar',
      craneCapacity: '1200T Telescopic + 12-Axle SPMT',
      shift: 'Day Shift (High-Density Bay)',
      punchlist: [
        { id: 'p1', title: 'Pit Excavation & Foundation Laser Grid', done: true },
        { id: 'p2', title: 'Base Bedplate SPMT Roll-In', done: true },
        { id: 'p3', title: 'Tier 1 Tie-Rod Tensioning (Form 11 Tool)', done: true },
        { id: 'p4', title: 'Hydraulic Cylinder Positioning (Tandem)', done: false },
        { id: 'p5', title: 'Hydrostatic Pressure Testing (350 bar)', done: false },
        { id: 'p6', title: 'Client Inspection Final Acceptance', done: false }
      ]
    },
    {
      id: 'WP-WHEEL-02',
      title: 'Rotary Hearth Furnace Shell & Hearth Drive',
      area: 'LINE-WHEEL',
      tag: 'HOT WORK & CRANE',
      weightMT: 110.0,
      baselineMD: 230,
      state: 'TORQUED',
      progress: 75,
      equipment: 'Telescopic Crane 160T',
      lead: 'Dilip Rout',
      craneCapacity: '160T All-Terrain',
      shift: 'Day Shift (Bay 3)',
      punchlist: [
        { id: 'p1', title: 'Hearth Center Pivot Bearing Alignment', done: true },
        { id: 'p2', title: 'Circular Rail Track Levelling (0.1 mm)', done: true },
        { id: 'p3', title: 'Refractory Lining Staging', done: true },
        { id: 'p4', title: 'Burner Piping Hot Permitted Clearance', done: true },
        { id: 'p5', title: 'Drive Rotation No-Load Commissioning', done: false }
      ]
    },
    {
      id: 'WP-WHEEL-03',
      title: 'Wheel Rim Quenching Tank & High-Pressure Sprays',
      area: 'LINE-WHEEL',
      tag: 'CIVIL & RIG',
      weightMT: 45.0,
      baselineMD: 110,
      state: 'CLIENT_CLEARED',
      progress: 95,
      equipment: 'EOT Crane 50T',
      lead: 'Ramesh Kumar',
      craneCapacity: '50T Shop EOT',
      shift: 'Day Shift (Bay 4)',
      punchlist: [
        { id: 'p1', title: 'Tank Leakage Hydro-test (24 Hours)', done: true },
        { id: 'p2', title: 'Submersible Pump Alignment', done: true },
        { id: 'p3', title: 'TPI Ultrasonic Weld Test on Nozzles', done: true },
        { id: 'p4', title: 'Client Sign-off & Punchlist Zero Defect', done: true }
      ]
    },
    {
      id: 'WP-MS-01',
      title: 'MS-FFG: Forged Flange Turning Lathe Cell',
      area: 'AREA-MACHINE-SHOP-AXLE',
      tag: 'STREAM 1/7 (TURNING)',
      weightMT: 42.0,
      baselineMD: 95,
      state: 'CLIENT_CLEARED',
      progress: 92,
      equipment: 'Shop EOT Crane 50T',
      lead: 'Sarat Mishra',
      craneCapacity: '50T Overhead EOT',
      shift: 'Day Shift (Machine Shop Bay)',
      punchlist: [
        { id: 'p1', title: 'Machine Bed Foundation Fastening', done: true },
        { id: 'p2', title: 'Precision Bed Levelling (0.01 mm)', done: true },
        { id: 'p3', title: 'CNC Console Cabling & Interlock', done: true },
        { id: 'p4', title: 'Spindle Runout Laser Inspection', done: true },
        { id: 'p5', title: 'Client Pilot Turning Clearance', done: true }
      ]
    },
    {
      id: 'WP-MS-02',
      title: 'MS-PARI-GANTRY: Automated Gantry Loading Rail',
      area: 'AREA-MACHINE-SHOP-AXLE',
      tag: 'STREAM 4/7 (AUTOMATION)',
      weightMT: 56.0,
      baselineMD: 140,
      state: 'ALIGNED',
      progress: 70,
      equipment: 'Mobile Crane 75T',
      lead: 'Sarat Mishra',
      craneCapacity: '75T Telescopic',
      shift: 'Night Shift (Machine Shop Bay)',
      punchlist: [
        { id: 'p1', title: 'Overhead Gantry Column Anchor Bolts', done: true },
        { id: 'p2', title: 'Longitudinal Runway Beam Alignment', done: true },
        { id: 'p3', title: 'Servo Gripper Carriage Hoisting', done: true },
        { id: 'p4', title: 'Optical Collision Sensor Calibration', done: false },
        { id: 'p5', title: 'Full Cycle High-Speed Robotic Pick Test', done: false }
      ]
    },
    {
      id: 'WP-MS-03',
      title: 'MS-DEEP-HOLE: Deep Hole Drilling & Trepanning Machine',
      area: 'AREA-MACHINE-SHOP-AXLE',
      tag: 'STREAM 6/7 (BORING)',
      weightMT: 62.5,
      baselineMD: 155,
      state: 'RIGGED',
      progress: 45,
      equipment: 'Demag 100T Crane',
      lead: 'Sarat Mishra',
      craneCapacity: '100T Heavy Mobile',
      shift: 'Day Shift (Machine Shop Bay)',
      punchlist: [
        { id: 'p1', title: 'Heavy Foundation Bed Alignment', done: true },
        { id: 'p2', title: 'High-Pressure Coolant Filtration Rig', done: true },
        { id: 'p3', title: 'Boring Head Carriage Staging', done: false },
        { id: 'p4', title: 'Vibration Analysis at 1500 RPM', done: false }
      ]
    }
  ],

  // 3. PURCHASE & COMMERCIAL SOURCING DATA
  purchaseData: {
    prs: [
      { id: 'PR-2026-001', title: 'High-Tensile Rigging Shackles & Heavy Grommet Slings', dept: 'Operations & Rigging', amount: 1450000, doaTier: 'Tier 3 (≤₹25L)', status: 'APPROVED', date: '2026-11-15', indenter: 'Suresh Verma' },
      { id: 'PR-2026-002', title: 'Calibrated Digital Torque Multipliers (2,500 Nm)', dept: 'Store & Tackle', amount: 485000, doaTier: 'Tier 2 (≤₹5L)', status: 'APPROVED', date: '2026-11-16', indenter: 'Gagan Bihari Das' },
      { id: 'PR-2026-003', title: 'Specialized Fall Arrest Retractable Lifelines (50 Nos)', dept: 'Safety & HSE', amount: 38000, doaTier: 'Tier 1 (≤₹50k)', status: 'PENDING_APPROVAL', date: '2026-11-20', indenter: 'Gajendra Rao' },
      { id: 'PR-2026-004', title: 'Hydraulic Tandem Equalizer Spreader Beam 300T', dept: 'Operations & Rigging', amount: 3200000, doaTier: 'Tier 4 (>₹25L Super Admin)', status: 'SUBMITTED', date: '2026-11-21', indenter: 'Dilip Rout' }
    ],
    rfqs: [
      { id: 'RFQ-2026-001', prRef: 'PR-2026-001', title: 'Supply of Heavy Grommet Slings 150T SWL', vendorsInvited: 3, quotesRecv: 3, status: 'EVALUATING', deadline: '2026-11-25' },
      { id: 'RFQ-2026-002', prRef: 'PR-2026-002', title: 'Calibrated Torque Multipliers & Calibration Certs', vendorsInvited: 4, quotesRecv: 3, status: 'CS_PREPARED', deadline: '2026-11-24' },
      { id: 'RFQ-2026-003', prRef: 'PR-2026-004', title: 'Fabrication of 300T Tandem Equalizer Beam', vendorsInvited: 2, quotesRecv: 2, status: 'OPEN', deadline: '2026-11-30' }
    ],
    pos: [
      { id: 'PO-2026-001', rfqRef: 'RFQ-2026-001', vendor: 'Jindal Heavy Lifting Ltd', poValue: 1469100, rev: 'REV-0', status: 'ISSUED', deliveryDate: '2026-12-05', paymentTerms: '30 Days PDC against TPI Form 11 Cert' },
      { id: 'PO-2026-002', rfqRef: 'RFQ-2026-002', vendor: 'Stahlwille Industrial Tools', poValue: 485000, rev: 'REV-0', status: 'UNDER_EXECUTION', deliveryDate: '2026-11-28', paymentTerms: '100% on Store Gate Inward' }
    ],
    asns: [
      { id: 'ASN-2026-001', poRef: 'PO-2026-001', vendor: 'Jindal Heavy Lifting Ltd', carrier: 'VRL Logistics (OD-02-AK-9844)', items: 'Grommet Slings 150T (4 Sets)', eta: '2026-11-24 14:00', gateStatus: 'IN_TRANSIT', storeStatus: 'BIN_RESERVED' },
      { id: 'ASN-2026-002', poRef: 'PO-2026-002', vendor: 'Stahlwille Industrial Tools', carrier: 'Blue Dart Surface (OD-05-BX-1120)', items: 'Torque Multiplier Kit (2 Units)', eta: '2026-11-23 11:30', gateStatus: 'GATE_PRE_ALERT', storeStatus: 'CALIBRATION_HOLD' }
    ],
    vendors: [
      { id: 'VEN-001', name: 'Jindal Heavy Lifting Ltd', category: 'Slings & Rigging Tackle', rating: 'A (Approved)', msme: 'Large', gst: '21AAACJ1234F1Z1', city: 'Bhubaneswar' },
      { id: 'VEN-002', name: 'Stahlwille Industrial Tools', category: 'Torque & Calibration', rating: 'A (OEM)', msme: 'Medium', gst: '27AABCS5542G1ZP', city: 'Mumbai' },
      { id: 'VEN-003', name: 'Texmaco Infrastructure Co', category: 'Steel Structural Fab', rating: 'B (Qualified)', msme: 'Large', gst: '19AAACT9876E1Z5', city: 'Kolkata' },
      { id: 'VEN-004', name: 'SKF India Bearings', category: 'Precision Spindles', rating: 'A (OEM)', msme: 'Large', gst: '27AAACS1122M1ZK', city: 'Pune' }
    ]
  },

  // 4. STORE & TACKLE FORM 11 INVENTORY DATA
  storeData: {
    activeFilter: 'ALL',
    tackles: [
      { id: 'STR-TK-001', desc: '100T Four-Legged Wire Rope Sling (36mm)', tpiCert: 'TPI/FORM11/2026/894', swl: '100.0 MT', testDate: '2026-09-10', validUntil: '2027-03-09', status: 'VALID', odiaStatus: 'କାର୍ଯ୍ୟକ୍ଷମ', loc: 'Rack A-04' },
      { id: 'STR-TK-002', desc: '55T Grade-80 Alloy Steel Bow Shackle (Green Pin)', tpiCert: 'TPI/FORM11/2026/912', swl: '55.0 MT', testDate: '2026-10-02', validUntil: '2027-04-01', status: 'VALID', odiaStatus: 'କାର୍ଯ୍ୟକ୍ଷମ', loc: 'Bin B-12' },
      { id: 'STR-TK-003', desc: '200T Modular Spreader Lifting Beam (12m)', tpiCert: 'TPI/FORM11/2026/410', swl: '200.0 MT', testDate: '2026-06-01', validUntil: '2026-11-30', status: 'EXPIRING_SOON', odiaStatus: 'ଶୀଘ୍ର ନବୀକରଣ', loc: 'Yard Bay 1' },
      { id: 'STR-TK-004', desc: '10T Webbing Sling Endless (Polyester)', tpiCert: 'TPI/FORM11/2025/112', swl: '10.0 MT', testDate: '2025-11-05', validUntil: '2026-05-04', status: 'EXPIRED_QUARANTINE', odiaStatus: 'କାର୍ଯ୍ୟକ୍ଷମ ନୁହେଁ (କ୍ୱାରାଣ୍ଟାଇନ୍)', loc: 'Quarantine Cage' },
      { id: 'STR-TK-005', desc: '30T Grade 100 Short-Link Chain Block', tpiCert: 'TPI/FORM11/2026/978', swl: '30.0 MT', testDate: '2026-11-01', validUntil: '2027-04-30', status: 'VALID', odiaStatus: 'କାର୍ଯ୍ୟକ୍ଷମ', loc: 'Rack C-02' }
    ],
    calibratedTools: [
      { id: 'TOOL-CAL-01', name: 'Norbar 1,500 Nm Digital Torque Multiplier', calCert: 'NABL/CAL/2026/441', calDate: '2026-08-15', dueDate: '2027-02-14', status: 'VALID', custodian: 'Dilip Rout' },
      { id: 'TOOL-CAL-02', name: 'Leica Laser Tracker AT-403 (Alignment)', calCert: 'LEICA/NABL/8890', calDate: '2026-05-20', dueDate: '2026-11-19', status: 'RECALIBRATION_REQ', custodian: 'Site Lab' },
      { id: 'TOOL-CAL-03', name: 'Stahlwille 800 Nm Click Torque Wrench', calCert: 'NABL/CAL/2026/512', calDate: '2026-10-10', dueDate: '2027-04-09', status: 'VALID', custodian: 'Manoj Das' }
    ],
    issues: [
      { id: 'ISS-001', tool: 'STR-TK-001 (100T Sling)', issuedTo: 'Manoj Das (Lead Rigger)', date: '2026-11-21 07:30', wpRef: 'WP-AXLE-01', status: 'ACTIVE' },
      { id: 'ISS-002', tool: 'TOOL-CAL-01 (Torque Multiplier)', issuedTo: 'Ramesh Kumar', date: '2026-11-21 08:15', wpRef: 'WP-WHEEL-01', status: 'ACTIVE' },
      { id: 'ISS-003', tool: 'STR-TK-002 (55T Shackle)', issuedTo: 'Dilip Rout', date: '2026-11-20 09:00', wpRef: 'WP-MS-02', status: 'RETURNED' }
    ]
  },

  // 5. SAFETY & PERMIT-TO-WORK (PTW) RISK DATA
  safetyData: {
    windSpeedMPS: 6.4,
    windLimitMPS: 9.8,
    craneInterlock: 'SAFE_TO_LIFT',
    activePTWs: [
      { id: 'PTW-2026-089', type: 'CRITICAL_TANDEM_LIFT', location: 'Line Axle Bay 1', wpRef: 'WP-AXLE-01', fourEyeSign: 'APPROVED (4-EYE)', hseSteward: 'Gajendra Rao', engineer: 'Dilip Rout', status: 'VALID', expires: '2026-11-21 18:00' },
      { id: 'PTW-2026-090', type: 'HEIGHT_WORK (>2M)', location: 'Line Wheel Plinth', wpRef: 'WP-WHEEL-01', fourEyeSign: 'APPROVED (4-EYE)', hseSteward: 'Gajendra Rao', engineer: 'Ramesh Kumar', status: 'VALID', expires: '2026-11-21 17:30' },
      { id: 'PTW-2026-091', type: 'HOT_WORK (WELDING)', location: 'Machine Shop Gantry', wpRef: 'WP-MS-02', fourEyeSign: 'PENDING_HSE', hseSteward: 'Pending Sign-Off', engineer: 'Sarat Mishra', status: 'PENDING', expires: '2026-11-21 16:00' },
      { id: 'PTW-2026-092', type: 'CONFINED_SPACE', location: 'Hydraulic Pit Line Wheel', wpRef: 'WP-WHEEL-02', fourEyeSign: 'REJECTED (GAS CHECK REQ)', hseSteward: 'Gajendra Rao', engineer: 'Manoj Das', status: 'SUSPENDED', expires: '2026-11-21 12:00' }
    ]
  },

  // 6. GATE ENTRY & RFID TURNSTILE MUSTER DATA
  gateData: {
    siteMusterCount: 42,
    barrierState: 'LOCKED',
    recentTurnstileSwipes: [
      { time: '07:54 AM', badge: 'BAL-OPS-003', name: 'Manoj Das', role: 'Lead Heavy Rigger', kyc: 'VERIFIED', ptw: 'ACTIVE', decision: 'ACCESS_GRANTED', dir: 'IN' },
      { time: '07:58 AM', badge: 'BAL-OPS-004', name: 'Ramesh Kumar', role: 'Certified Rigger', kyc: 'VERIFIED', ptw: 'ACTIVE', decision: 'ACCESS_GRANTED', dir: 'IN' },
      { time: '08:05 AM', badge: 'BAL-CTR-098', name: 'Contract Welder #3', role: 'Contractor', kyc: 'AADHAAR_VERIFIED', ptw: 'EXPIRED', decision: 'ACCESS_DENIED (NO_PTW)', dir: 'IN' },
      { time: '08:12 AM', badge: 'BAL-ADM-001', name: 'Prashant Muley', role: 'Super Administrator', kyc: 'MASTER_VERIFIED', ptw: 'EXEMPT', decision: 'ACCESS_GRANTED', dir: 'IN' }
    ],
    vehiclePasses: [
      { id: 'GP-VEH-041', truckNo: 'OD-02-AK-9844', driver: 'Bikram Jena', carrier: 'VRL Heavy Haulage', cargo: 'Grommet Slings 150T (PO-2026-001)', grossWeight: '28.4 MT', gateStatus: 'ENTERED' },
      { id: 'GP-VEH-042', truckNo: 'OD-33-BB-7712', driver: 'Kailash Sahu', carrier: 'Goldhofer SPMT Escort', cargo: 'Modular Hydraulic Trailer Bed', grossWeight: '42.0 MT', gateStatus: 'WEIGHBRIDGE_CHECK' }
    ]
  },

  // 7. HUMAN RESOURCES (HR) WORKFORCE KYC & STATUTORY LEDGER
  hrData: {
    activeDept: 'ALL',
    searchQuery: '',
    employees: [
      { id: 'BAL-OPS-001', name: 'Dilip Rout', role: 'Operations Area Manager', dept: 'OPERATIONS', phone: '+91 94370 11223', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (04-2027)', cert: 'TPI Rigger Level 3 / Lifting Supervisor', attendance: 'PRESENT' },
      { id: 'BAL-OPS-002', name: 'Sarat Mishra', role: 'Machine Shop Area Manager', dept: 'MACHINE_SHOP', phone: '+91 98610 44556', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (06-2027)', cert: 'Mechanical Alignment Specialist', attendance: 'PRESENT' },
      { id: 'BAL-OPS-003', name: 'Manoj Das', role: 'Lead Heavy Rigger', dept: 'HEAVY_RIGGING', phone: '+91 97780 77889', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (10-2027)', cert: 'Heavy Rigger Class 1 / Signalman', attendance: 'PRESENT' },
      { id: 'BAL-OPS-004', name: 'Ramesh Kumar', role: 'Senior Certified Rigger', dept: 'HEAVY_RIGGING', phone: '+91 91240 33445', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (08-2027)', cert: 'Height Worker & Rigger Class 2', attendance: 'PRESENT' },
      { id: 'BAL-SAF-001', name: 'Gajendra Rao', role: 'HSE Steward & Safety Lead', dept: 'SAFETY', phone: '+91 99370 66778', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (03-2027)', cert: 'NEBOSH IGC / CSP Officer', attendance: 'PRESENT' },
      { id: 'BAL-STR-001', name: 'Gagan Bihari Das', role: 'Store Portal Admin', dept: 'STORE', phone: '+91 94380 99001', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (05-2027)', cert: 'Tackle Certification Auditor', attendance: 'PRESENT' },
      { id: 'BAL-SEC-001', name: 'Bikash Mohapatra', role: 'Gate Security Admin', dept: 'SECURITY', phone: '+91 94390 22334', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (12-2026)', cert: 'Access Control Officer', attendance: 'PRESENT' },
      { id: 'BAL-PUR-001', name: 'Rohan Sharma', role: 'Purchase Lead / Commercial Head', dept: 'PROCUREMENT', phone: '+91 98110 55667', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (01-2027)', cert: 'Contracts & Commercial Head', attendance: 'PRESENT' },
      { id: 'BAL-PUR-002', name: 'Suresh Verma', role: 'Indenter / Site Engineer', dept: 'OPERATIONS', phone: '+91 98220 77889', kyc: 'AADHAAR_VERIFIED', form31: 'VALID (02-2027)', cert: 'Mechanical Requisitions Engineer', attendance: 'PRESENT' }
    ]
  },

  // ACTIVE RUNTIME SESSION
  currentUser: null,
  activeArea: 'LINE-AXLE',

  // INITIALIZATION ENGINE
  init: function () {
    this.restoreSession();
    this.bindEvents();
    this.updateHeaderUI();
    this.renderCurrentView();
  },

  // SESSION PERSISTENCE (INDEXEDDB / LOCALSTORAGE)
  restoreSession: function () {
    try {
      const stored = localStorage.getItem('balsons_mobile_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      } else {
        this.currentUser = this.accounts[0]; // Default to Super Admin
        localStorage.setItem('balsons_mobile_user', JSON.stringify(this.currentUser));
      }
    } catch (e) {
      this.currentUser = this.accounts[0];
    }
  },

  saveSession: function (user) {
    this.currentUser = user;
    try {
      localStorage.setItem('balsons_mobile_user', JSON.stringify(user));
    } catch (e) {}
    this.updateHeaderUI();
  },

  updateHeaderUI: function () {
    const pill = document.getElementById('activeUserPill');
    if (pill && this.currentUser) {
      pill.innerHTML = `👤 ${this.currentUser.name.split(' ')[0]} (${this.currentUser.pin})`;
      pill.title = `${this.currentUser.name} - ${this.currentUser.role} [${this.currentUser.badge}]`;
    }
  },

  // THEME SWITCHER
  toggleTheme: function () {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try {
      localStorage.setItem('beds_theme', next);
    } catch (e) {}
    const themeBtn = document.getElementById('btnMobileTheme');
    if (themeBtn) {
      themeBtn.innerHTML = next === 'dark' ? '☀️' : '🌙';
    }
  },

  // ==========================================
  // OPERATIONS CONTROLLERS
  // ==========================================
  setArea: function (areaName, btnElement) {
    this.activeArea = areaName;
    const pills = document.querySelectorAll('#opsAreaPills .segment-pill-btn');
    pills.forEach(p => p.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    this.renderOperationsCards();
  },

  renderOperationsCards: function () {
    const container = document.getElementById('opsPackageListContainer');
    if (!container) return;

    const filtered = this.workPackages.filter(wp => wp.area === this.activeArea);
    if (filtered.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:24px; color:var(--b-text-muted);">No work packages found in this area.</div>';
      return;
    }

    container.innerHTML = filtered.map(wp => `
      <div class="m-card" id="card-${wp.id}">
        <div class="m-card-header">
          <div class="m-card-header-title">
            <h4>${wp.title}</h4>
            <span>${wp.id} • ${wp.equipment}</span>
          </div>
          <span class="tl-badge ${wp.state === 'COMMISSIONED' || wp.state === 'CLIENT_CLEARED' ? 'tl-green' : 'tl-blue'}">
            ${wp.state.replace('_', ' ')}
          </span>
        </div>

        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:var(--b-text-muted); margin-top:4px;">
          8-State Rigging Lifecycle:
        </div>
        <div class="m-state-stepper">
          ${this.LIFECYCLE_STATES.map((st, idx) => {
            const isCompleted = this.LIFECYCLE_STATES.indexOf(wp.state) > idx;
            const isCurrent = wp.state === st;
            return `
              <span class="m-state-chip ${isCurrent ? 'current' : isCompleted ? 'completed' : ''}" 
                    onclick="BalsonsMobileApp.advanceStateTo('${wp.id}', '${st}')">
                ${st.replace('_', ' ')}
              </span>
            `;
          }).join('')}
        </div>

        <div class="m-kv-grid">
          <div class="m-kv-item"><span class="m-kv-lbl">Erection Tonnage</span><span class="m-kv-val">${wp.weightMT} MT</span></div>
          <div class="m-kv-item"><span class="m-kv-lbl">Baseline Man-Days</span><span class="m-kv-val">${wp.baselineMD} MD</span></div>
          <div class="m-kv-item"><span class="m-kv-lbl">Crane Assignment</span><span class="m-kv-val">${wp.craneCapacity}</span></div>
          <div class="m-kv-item"><span class="m-kv-lbl">Execution Lead</span><span class="m-kv-val">${wp.lead}</span></div>
        </div>

        <div style="margin: 8px 0;">
          <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700; color:var(--b-text-secondary); margin-bottom:4px;">
            <span>Erection Completion Progress</span>
            <span style="color:var(--b-cyan-primary);">${wp.progress}%</span>
          </div>
          <div style="background:var(--b-border); border-radius:9999px; height:7px; overflow:hidden;">
            <div style="background:var(--b-cyan-primary); height:100%; width:${wp.progress}%; transition:width 0.3s ease;"></div>
          </div>
        </div>

        <div style="display:flex; gap:8px; margin-top:12px;">
          <button class="m-btn-action m-btn-primary" style="flex:1;" onclick="BalsonsMobileApp.openDossier('WP', '${wp.id}')">
            📋 360° Dossier & Punchlist (${wp.punchlist.filter(p => p.done).length}/${wp.punchlist.length})
          </button>
          <button class="m-btn-action m-btn-secondary" onclick="BalsonsMobileApp.cycleState('${wp.id}')" title="Advance to next state">
            ⚡ Advance State
          </button>
        </div>
      </div>
    `).join('');
  },

  cycleState: function (wpId) {
    const wp = this.workPackages.find(w => w.id === wpId);
    if (!wp) return;
    const currentIdx = this.LIFECYCLE_STATES.indexOf(wp.state);
    if (currentIdx < this.LIFECYCLE_STATES.length - 1) {
      wp.state = this.LIFECYCLE_STATES[currentIdx + 1];
      wp.progress = Math.min(100, wp.progress + 15);
      this.renderOperationsCards();
      this.showToast(`✓ ${wp.id} advanced to: ${wp.state.replace('_', ' ')}`);
    } else {
      this.showToast(`ℹ ${wp.id} is already in final state: COMMISSIONED`);
    }
  },

  advanceStateTo: function (wpId, targetState) {
    const wp = this.workPackages.find(w => w.id === wpId);
    if (!wp) return;
    wp.state = targetState;
    const idx = this.LIFECYCLE_STATES.indexOf(targetState);
    wp.progress = Math.round(((idx + 1) / this.LIFECYCLE_STATES.length) * 100);
    this.renderOperationsCards();
    this.showToast(`✓ State updated to: ${targetState.replace('_', ' ')}`);
  },

  togglePunchItem: function (wpId, punchId) {
    const wp = this.workPackages.find(w => w.id === wpId);
    if (!wp) return;
    const item = wp.punchlist.find(p => p.id === punchId);
    if (!item) return;

    item.done = !item.done;
    const doneCount = wp.punchlist.filter(p => p.done).length;
    wp.progress = Math.round((doneCount / wp.punchlist.length) * 100);

    this.openDossier('WP', wpId);
    this.renderOperationsCards();
    this.showToast(`${item.done ? '✓ Cleared' : '○ Re-opened'}: ${item.title}`);
  },

  syncWorkPackageCloud: function (wpId) {
    this.showToast(`⚡ Dual-syncing ${wpId} with Sheet 1GeqDDmB...`);
    setTimeout(() => {
      this.showToast(`✓ Cloud synchronized: Sheet 1GeqDDmB updated successfully.`);
    }, 800);
  },

  // ==========================================
  // PURCHASE CONTROLLERS
  // ==========================================
  approvePR: function (prId) {
    const pr = this.purchaseData.prs.find(p => p.id === prId);
    if (!pr) return;
    pr.status = 'APPROVED';
    this.closeDossier();
    this.showToast(`✓ Requisition ${prId} approved per ${pr.doaTier}`);
    const rowEl = document.getElementById(`pr-status-${prId}`);
    if (rowEl) {
      rowEl.innerHTML = '<span class="tl-badge tl-green">APPROVED</span>';
    }
  },

  // ==========================================
  // STORE & FORM 11 CONTROLLERS
  // ==========================================
  filterStoreTackles: function (status, btnEl) {
    this.storeData.activeFilter = status;
    document.querySelectorAll('#storeFilterBar .m-filter-pill').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    this.renderStoreTackles();
  },

  renderStoreTackles: function () {
    const tbody = document.getElementById('storeTacklesTbody');
    if (!tbody) return;

    const filtered = this.storeData.activeFilter === 'ALL'
      ? this.storeData.tackles
      : this.storeData.tackles.filter(t => t.status === this.storeData.activeFilter);

    tbody.innerHTML = filtered.map(t => `
      <tr style="${t.status === 'EXPIRED_QUARANTINE' ? 'background:rgba(239,68,68,0.06);' : ''}">
        <td><strong>${t.id}</strong></td>
        <td>${t.desc}<br><small style="color:var(--b-text-muted);">${t.loc}</small></td>
        <td><strong>${t.swl}</strong></td>
        <td><code>${t.tpiCert}</code></td>
        <td style="${t.status === 'EXPIRED_QUARANTINE' ? 'color:#dc2626; font-weight:700;' : ''}">${t.validUntil}</td>
        <td>
          <span class="tl-badge ${t.status === 'VALID' ? 'tl-green' : t.status === 'EXPIRING_SOON' ? 'tl-yellow' : 'tl-red'}">
            ${t.status === 'VALID' ? 'VALID (କାର୍ଯ୍ୟକ୍ଷମ)' : t.status === 'EXPIRING_SOON' ? 'EXPIRING (ଶୀଘ୍ର)' : 'QUARANTINE (ଅକ୍ଷମ)'}
          </span>
        </td>
      </tr>
    `).join('');
  },

  issueToolCustody: function (toolId, riggerName, wpRef) {
    const newId = `ISS-00${this.storeData.issues.length + 1}`;
    this.storeData.issues.unshift({
      id: newId,
      tool: toolId,
      issuedTo: riggerName,
      date: 'Just Now (2026-11-21)',
      wpRef: wpRef,
      status: 'ACTIVE'
    });
    this.showToast(`✓ Tool ${toolId} issued to ${riggerName}`);
  },

  returnToolCustody: function (issId) {
    const item = this.storeData.issues.find(i => i.id === issId);
    if (item) {
      item.status = 'RETURNED';
      this.showToast(`✓ Tool ${item.tool} returned to Store Bin`);
    }
  },

  // ==========================================
  // SAFETY & WIND INTERLOCK CONTROLLERS
  // ==========================================
  setWindSpeed: function (speedMPS) {
    this.safetyData.windSpeedMPS = parseFloat(speedMPS);
    const speedEl = document.getElementById('liveWindSpeedVal');
    const badgeEl = document.getElementById('liveWindBadge');
    const bannerEl = document.getElementById('craneInterlockAlertBanner');

    if (speedEl) speedEl.innerHTML = `${speedMPS} m/s`;

    if (this.safetyData.windSpeedMPS > this.safetyData.windLimitMPS) {
      this.safetyData.craneInterlock = 'HALTED_INTERLOCKED';
      if (speedEl) speedEl.style.color = '#ef4444';
      if (badgeEl) {
        badgeEl.className = 'tl-badge tl-red';
        badgeEl.innerHTML = 'CRITICAL WIND: HALT CRANES';
      }
      if (bannerEl) {
        bannerEl.style.display = 'block';
        bannerEl.innerHTML = `⚠️ HIGH WIND ALERT (${speedMPS} m/s > 9.8 m/s): CRANE HOIST MOTORS INTERLOCKED! ALL TANDEM LIFTS SUSPENDED!`;
      }
      this.showToast(`🚨 HIGH WIND (${speedMPS} m/s): CRANE BOOMS HALTED BY INTERLOCK!`);
    } else {
      this.safetyData.craneInterlock = 'SAFE_TO_LIFT';
      if (speedEl) speedEl.style.color = '#10b981';
      if (badgeEl) {
        badgeEl.className = 'tl-badge tl-green';
        badgeEl.innerHTML = 'GREEN: SAFE TO LIFT';
      }
      if (bannerEl) bannerEl.style.display = 'none';
      this.showToast(`✓ Normal Wind (${speedMPS} m/s): Crane Hoist Operations Permitted.`);
    }
  },

  approvePTW: function (ptwId) {
    const ptw = this.safetyData.activePTWs.find(p => p.id === ptwId);
    if (!ptw) return;
    ptw.fourEyeSign = 'APPROVED (4-EYE)';
    ptw.status = 'VALID';
    this.showToast(`✓ ${ptwId} 4-Eye Approval Completed by HSE Steward`);
    const statusEl = document.getElementById(`ptw-status-${ptwId}`);
    if (statusEl) statusEl.innerHTML = '<span class="tl-badge tl-green">4-EYE APPROVED</span>';
  },

  // ==========================================
  // GATE ENTRY & TURNSTILE SIMULATOR
  // ==========================================
  simulateTurnstileSwipe: function (badgeId, direction) {
    let emp = this.hrData.employees.find(e => e.id === badgeId);
    let name = emp ? emp.name : 'Visitor / Unknown';
    let role = emp ? emp.role : 'Contractor';
    let kyc = emp ? emp.kyc : 'VERIFIED';
    let ptw = 'ACTIVE';

    if (badgeId === 'BAL-CTR-098') {
      name = 'Contract Welder #3';
      role = 'Contractor';
      ptw = 'EXPIRED';
    }

    let isApproved = false;
    let decisionReason = '';

    // TRI-PORTAL BARRIER LOGIC: HR KYC == VERIFIED && PTW == ACTIVE
    if (kyc.includes('VERIFIED') && ptw === 'ACTIVE') {
      isApproved = true;
      decisionReason = 'ACCESS_GRANTED';
    } else {
      isApproved = false;
      decisionReason = ptw !== 'ACTIVE' ? 'ACCESS_DENIED (NO_PTW)' : 'ACCESS_DENIED (KYC_HOLD)';
    }

    // Barrier Visual Response
    const barrierIndicator = document.getElementById('gateBarrierVisual');
    const barrierLed = document.getElementById('gateLedIndicator');
    const resultBox = document.getElementById('gateSwipeResultBox');

    if (isApproved) {
      if (direction === 'IN') {
        this.gateData.siteMusterCount++;
      } else {
        this.gateData.siteMusterCount = Math.max(0, this.gateData.siteMusterCount - 1);
      }
      if (barrierLed) {
        barrierLed.style.background = '#10b981';
        barrierLed.style.boxShadow = '0 0 16px #10b981';
      }
      if (barrierIndicator) {
        barrierIndicator.innerHTML = '🟢 BARRIER UNLATCHED: SWING OPEN';
        barrierIndicator.style.color = '#059669';
      }
      if (resultBox) {
        resultBox.innerHTML = `✓ ${direction} Permitted: ${name} (${badgeId}) • Reason: Tri-Portal Verified`;
        resultBox.style.color = '#059669';
      }
      this.showToast(`✓ [TURNSTILE ${direction}] ${name}: Access Granted!`);
    } else {
      if (barrierLed) {
        barrierLed.style.background = '#ef4444';
        barrierLed.style.boxShadow = '0 0 16px #ef4444';
      }
      if (barrierIndicator) {
        barrierIndicator.innerHTML = '🔴 BARRIER LOCKED: ACCESS DENIED';
        barrierIndicator.style.color = '#dc2626';
      }
      if (resultBox) {
        resultBox.innerHTML = `✕ Access Denied: ${name} (${badgeId}) • Reason: ${decisionReason}`;
        resultBox.style.color = '#dc2626';
      }
      this.showToast(`🚨 [TURNSTILE LOCKED] ${name}: ${decisionReason}`);
    }

    // Update Muster Count Display
    const countEl = document.getElementById('liveSiteMusterCount');
    if (countEl) countEl.innerHTML = `${this.gateData.siteMusterCount} Crew`;

    // Append to Swipe Log Table
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logTbody = document.getElementById('gateSwipesTbody');
    if (logTbody) {
      const newRow = `
        <tr style="${!isApproved ? 'background:rgba(239,68,68,0.06);' : ''}">
          <td>${timeStr}</td>
          <td><strong>${badgeId}</strong></td>
          <td>${name}</td>
          <td><span class="tl-badge tl-green">${kyc}</span></td>
          <td><span class="tl-badge ${ptw === 'ACTIVE' ? 'tl-green' : 'tl-red'}">${ptw}</span></td>
          <td><span class="tl-badge ${isApproved ? 'tl-green' : 'tl-red'}">${decisionReason}</span></td>
        </tr>
      `;
      logTbody.insertAdjacentHTML('afterbegin', newRow);
    }

    // Restore Barrier after 3.5 seconds
    setTimeout(() => {
      if (barrierIndicator) {
        barrierIndicator.innerHTML = '🔒 BARRIER RESTORED: READY';
        barrierIndicator.style.color = 'var(--b-text-secondary)';
      }
      if (barrierLed) {
        barrierLed.style.background = '#f59e0b';
        barrierLed.style.boxShadow = 'none';
      }
    }, 3500);
  },

  // ==========================================
  // HR & WORKFORCE SEARCH & FILTER
  // ==========================================
  filterHR: function (deptName, btnEl) {
    this.hrData.activeDept = deptName;
    document.querySelectorAll('#hrDeptPills .m-filter-pill').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    this.renderHRTable();
  },

  searchHR: function (query) {
    this.hrData.searchQuery = query.toLowerCase().trim();
    this.renderHRTable();
  },

  renderHRTable: function () {
    const tbody = document.getElementById('hrWorkforceTbody');
    if (!tbody) return;

    const filtered = this.hrData.employees.filter(emp => {
      const matchDept = this.hrData.activeDept === 'ALL' || emp.dept === this.hrData.activeDept;
      const matchSearch = !this.hrData.searchQuery ||
        emp.name.toLowerCase().includes(this.hrData.searchQuery) ||
        emp.id.toLowerCase().includes(this.hrData.searchQuery) ||
        emp.role.toLowerCase().includes(this.hrData.searchQuery);
      return matchDept && matchSearch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:16px;">No workforce personnel found.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(emp => `
      <tr>
        <td><strong>${emp.id}</strong></td>
        <td><strong>${emp.name}</strong><br><small style="color:var(--b-text-muted);">${emp.phone}</small></td>
        <td>${emp.role}</td>
        <td><span class="tl-badge tl-green">${emp.kyc}</span></td>
        <td><span class="tl-badge tl-green">${emp.form31}</span></td>
        <td><small>${emp.cert}</small></td>
        <td><span class="tl-badge tl-green">${emp.attendance}</span></td>
      </tr>
    `).join('');
  },

  // ==========================================
  // DIRECTORY CREDENTIALS COPY & TOGGLE
  // ==========================================
  toggleAllPasswords: function () {
    const masks = document.querySelectorAll('.m-pw-val-text');
    const isMasked = masks.length > 0 && masks[0].classList.contains('masked');
    masks.forEach(m => {
      if (isMasked) {
        m.classList.remove('masked');
        m.innerText = m.getAttribute('data-plain');
      } else {
        m.classList.add('masked');
        m.innerText = '••••••••••••••';
      }
    });
    this.showToast(isMasked ? '👁️ All passwords visible' : '🔒 All passwords masked');
  },

  toggleSinglePassword: function (spanId, btnEl) {
    const el = document.getElementById(spanId);
    if (!el) return;
    if (el.classList.contains('masked')) {
      el.classList.remove('masked');
      el.innerText = el.getAttribute('data-plain');
      if (btnEl) btnEl.innerText = '🔒';
    } else {
      el.classList.add('masked');
      el.innerText = '••••••••••••••';
      if (btnEl) btnEl.innerText = '👁️';
    }
  },

  copyText: function (str, btnEl) {
    navigator.clipboard.writeText(str).then(() => {
      this.showToast(`📋 Copied: "${str}"`);
      if (btnEl) {
        const orig = btnEl.innerText;
        btnEl.innerText = '✓';
        setTimeout(() => { btnEl.innerText = orig; }, 1400);
      }
    }).catch(() => {
      this.showToast(`Copied: ${str}`);
    });
  },

  // ==========================================
  // 360° UNIVERSAL DOSSIER MODAL BOTTOM SHEET
  // ==========================================
  openDossier: function (type, id) {
    const titleEl = document.getElementById('sheetDossierTitle');
    const subEl = document.getElementById('sheetDossierSub');
    const bodyEl = document.getElementById('sheetPunchlistContainer');

    if (!titleEl || !bodyEl) return;

    if (type === 'WP') {
      const wp = this.workPackages.find(w => w.id === id);
      if (!wp) return;

      titleEl.innerHTML = `📋 360° Dossier: ${wp.id}`;
      subEl.innerHTML = `${wp.title} • Area: ${wp.area}`;

      bodyEl.innerHTML = `
        <div style="background:var(--b-bg-subtle); border:1px solid var(--b-border); border-radius:10px; padding:12px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>State: ${wp.state.replace('_', ' ')}</strong>
            <span class="tl-badge tl-cyan">${wp.progress}% Complete</span>
          </div>
          <div style="font-size:11px; color:var(--b-text-muted); margin-top:4px;">
            Crane: ${wp.craneCapacity} • Shift: ${wp.shift}
          </div>
        </div>

        <h4 style="font-size:12.5px; font-weight:800; text-transform:uppercase; margin-bottom:8px; color:var(--b-text-secondary);">
          Interactive Field Punchlist (${wp.punchlist.filter(p => p.done).length}/${wp.punchlist.length} Cleared):
        </h4>

        ${wp.punchlist.map(p => `
          <div class="punch-item ${p.done ? 'done' : ''}" onclick="BalsonsMobileApp.togglePunchItem('${wp.id}', '${p.id}')">
            <input type="checkbox" class="punch-chk" ${p.done ? 'checked' : ''} onclick="event.stopPropagation(); BalsonsMobileApp.togglePunchItem('${wp.id}', '${p.id}')">
            <div class="punch-content">
              <div class="punch-title" style="${p.done ? 'text-decoration: line-through; color:var(--b-text-muted);' : ''}">${p.title}</div>
              <div class="punch-desc">Tap anywhere on item to sign off verification milestone</div>
            </div>
          </div>
        `).join('')}

        <div style="display:flex; gap:8px; margin-top:16px;">
          <button class="m-btn-action m-btn-primary" style="flex:1;" onclick="BalsonsMobileApp.syncWorkPackageCloud('${wp.id}')">
            ⚡ Dual-Sync with Sheet 1GeqDDmB...
          </button>
        </div>
      `;
    } else if (type === 'PR') {
      const pr = this.purchaseData.prs.find(p => p.id === id);
      if (!pr) return;
      titleEl.innerHTML = `🛒 Requisition Dossier: ${pr.id}`;
      subEl.innerHTML = `${pr.title} • DoA: ${pr.doaTier}`;
      bodyEl.innerHTML = `
        <div class="m-kv-grid">
          <div class="m-kv-item"><span class="m-kv-lbl">Indent Amount</span><span class="m-kv-val">₹${pr.amount.toLocaleString()}</span></div>
          <div class="m-kv-item"><span class="m-kv-lbl">DoA Authority Tier</span><span class="m-kv-val">${pr.doaTier}</span></div>
          <div class="m-kv-item"><span class="m-kv-lbl">Department</span><span class="m-kv-val">${pr.dept}</span></div>
          <div class="m-kv-item"><span class="m-kv-lbl">Indenter</span><span class="m-kv-val">${pr.indenter}</span></div>
        </div>
        <div style="margin-top:12px;">
          <strong>Approval Status:</strong> <span class="tl-badge ${pr.status === 'APPROVED' ? 'tl-green' : 'tl-yellow'}">${pr.status}</span>
        </div>
        ${pr.status !== 'APPROVED' ? `
          <button class="m-btn-action m-btn-success" style="width:100%; margin-top:14px;" onclick="BalsonsMobileApp.approvePR('${pr.id}')">
            ✓ Sign-Off & Approve Requisition (DoA Authorized)
          </button>
        ` : ''}
      `;
    } else if (type === 'PO') {
      const po = this.purchaseData.pos.find(p => p.id === id);
      if (!po) return;
      titleEl.innerHTML = `📄 Purchase Order: ${po.id}`;
      subEl.innerHTML = `Vendor: ${po.vendor} • Value: ₹${po.poValue.toLocaleString()}`;
      bodyEl.innerHTML = `
        <div class="m-doc-preview">
          <div class="m-doc-title">
            <span>BALSONS FORMAL PURCHASE ORDER</span>
            <span style="color:#0284c7;">${po.rev}</span>
          </div>
          <p><strong>PO Number:</strong> ${po.id} &nbsp;|&nbsp; <strong>Date:</strong> 2026-11-21</p>
          <p><strong>Contractor:</strong> ${po.vendor}</p>
          <p><strong>Total Landed Value:</strong> ₹${po.poValue.toLocaleString()} (All-Inclusive)</p>
          <p><strong>Delivery Milestone:</strong> ${po.deliveryDate}</p>
          <p><strong>Payment Terms:</strong> ${po.paymentTerms}</p>
          <div style="border-top:1px dashed #cbd5e1; margin-top:10px; padding-top:8px; font-size:10px; color:var(--b-text-muted);">
            Certified by Purchase Lead (BAL-PUR-001) & Super Administrator under SAM-2026 Procurement Baseline.
          </div>
        </div>
      `;
    }

    document.getElementById('dossierSheetBackdrop').classList.add('open');
    document.getElementById('dossierBottomSheet').classList.add('open');
  },

  closeDossier: function () {
    const backdrop = document.getElementById('dossierSheetBackdrop');
    const sheet = document.getElementById('dossierBottomSheet');
    if (backdrop) backdrop.classList.remove('open');
    if (sheet) sheet.classList.remove('open');
  },

  // ==========================================
  // USER SWITCHER SHEET
  // ==========================================
  openUserSwitcher: function () {
    const container = document.getElementById('sheetCredContainer');
    if (!container) return;

    container.innerHTML = this.accounts.map(acc => `
      <div style="background:var(--b-bg-subtle); border:1px solid var(--b-border); border-radius:10px; padding:12px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="font-size:13px; color:var(--b-text-primary);">${acc.name}</strong>
          <div style="font-size:11px; color:var(--b-text-muted);">${acc.role} (${acc.badge})</div>
          <div style="font-size:10px; font-family:var(--b-font-mono); color:var(--b-cyan-primary); margin-top:2px;">
            PIN: ${acc.pin} • Scope: ${acc.scope}
          </div>
        </div>
        <button class="m-btn-action m-btn-primary" style="padding:4px 10px; font-size:11px;" onclick="BalsonsMobileApp.switchUser('${acc.username}')">
          Sign In
        </button>
      </div>
    `).join('');

    document.getElementById('credSheetBackdrop').classList.add('open');
    document.getElementById('credBottomSheet').classList.add('open');
  },

  closeUserSwitcher: function () {
    const backdrop = document.getElementById('credSheetBackdrop');
    const sheet = document.getElementById('credBottomSheet');
    if (backdrop) backdrop.classList.remove('open');
    if (sheet) sheet.classList.remove('open');
  },

  switchUser: function (username) {
    const acc = this.accounts.find(a => a.username === username);
    if (!acc) return;
    this.saveSession(acc);
    this.closeUserSwitcher();
    this.showToast(`✓ Active Session: ${acc.name} (${acc.role})`);
  },

  // TOAST NOTIFICATION
  showToast: function (msg) {
    let toast = document.getElementById('mobileToastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mobileToastNotice';
      toast.style.cssText = 'position:fixed; top:70px; left:50%; transform:translateX(-50%); background:#0b1924; color:#ffffff; padding:10px 18px; border-radius:20px; font-size:12px; font-weight:700; z-index:9999; box-shadow:0 4px 16px rgba(0,0,0,0.3); border:1px solid #0097a7; transition:opacity 0.2s ease; pointer-events:none; text-align:center; max-width:90%;';
      document.body.appendChild(toast);
    }
    toast.innerHTML = msg;
    toast.style.opacity = '1';
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
    }, 2800);
  },

  bindEvents: function () {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDossier();
        this.closeUserSwitcher();
      }
    });
  },

  renderCurrentView: function () {
    if (document.getElementById('opsPackageListContainer')) {
      this.renderOperationsCards();
    }
    if (document.getElementById('storeTacklesTbody')) {
      this.renderStoreTackles();
    }
    if (document.getElementById('hrWorkforceTbody')) {
      this.renderHRTable();
    }
  }
};

// AUTO-INITIALIZE ON DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
  BalsonsMobileApp.init();
});
