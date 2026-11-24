/**
 * BALSONS ENTERPRISE ECOSYSTEM - 360° MULTI-ENTITY SAFETY DOSSIER HUB
 * Covers: Workforce · Permits (PTW) · Equipment/Cranes · Work Areas · Incidents/CAPA · TBT Briefings
 * Standard: JTRWF Project Khordha, Odisha
 * Print Rule: EXACTLY 1 SHEET OF A4 AT 100% SCALE (DEFAULT) WITH ZERO SPILL
 * Supports: Portrait (A4) & Landscape (A4) Orientation Selection
 * Version: 2.0.0
 */

// ============================================================================
// 1. WORKFORCE 360° DIRECTORY (TRI-PORTAL SYNC)
// ============================================================================
const WORKFORCE_360_DIRECTORY = [
  {
    empId: 'EMP-2026-0001',
    name: 'Ramesh Kumar',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    trade: 'Senior Rigger Lead / Heavy Lift Supervisor',
    dept: 'Heavy Lift & Rigging Operations',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    project: 'PRJ-JTRWF-SCHULER',
    father: 'Dileshwar Kumar',
    dob: '1989-08-14',
    age: 37,
    gender: 'Male',
    bloodGroup: 'B+',
    marital: 'Married',
    mobile: '+91 98610 88721',
    emergencyContact: 'Anita Kumar (Wife) - +91 98610 99881',
    permanentAddress: 'At/Po: Haldiapada, Khordha Tahasil, Dist: Khordha, Odisha - 752056',
    siteCamp: 'JTRWF Site Colony, Quarter B-14',
    joiningDate: '2025-04-10',
    // HR Pillar
    wageClassification: 'MONTHLY',
    wageDisplay: 'Monthly Staff (PF & ESIC Covered)',
    compensation: '₹ 55,000 / month',
    bankEnding: '4092 (State Bank of India)',
    pan: 'ABCDE1234F',
    aadhaar: '4928 1192 8840',
    policeClearance: 'POL-KHD-2026-9912 (Verified Clean)',
    pfUan: '101928374650',
    esicIp: '4491028374',
    hrStatus: 'ACTIVE ONBOARDED ✓',
    // Safety Pillar
    inductionId: 'IND-JTRWF-2026-0001',
    inductionDate: '2026-01-10',
    inductionValidUntil: '2027-01-09',
    safetyPassNo: 'SP-2026-001',
    isInducted: true,
    safetyStatus: 'INDUCTED (Form 31 Certified)',
    medicalFitness: 'FIT - Heavy Rigging & Height (Form 31 Certified)',
    medicalExamDate: '2026-01-08',
    specialCertifications: ['Certified Rigger Signalman', 'Height Pass Class A', 'Confined Space Rescue'],
    tbtAttendedCount: 42,
    incidentHistory: 'Zero Incidents / Clean Safety Track Record',
    activePermitId: 'PTW-JTRWF-2026-SPEC-0015',
    activePermitDesc: 'Special / High-Risk Tandem Lift of Schuler 1600T Press Tie-Rod Beam',
    authorizedAreas: ['AREA-01 AXLE LINE', 'AREA-02 WHEEL FORGING', 'AREA-03 MACHINE SHOP', 'AREA-04 DIE SHOP'],
    // Gate Pillar
    gatePassId: 'GP-SEC-2026-0101',
    gateAccessDecision: 'ACCESS GRANTED',
    turnstileStatus: 'UNLOCKED (Main Gate 1 & Heavy Vehicle Bay 2)',
    currentMuster: 'ON-SITE (Logged 07:42 AM via Bay 2)',
    taggedEquipment: ['50T Webbing Sling Set', 'Certified Safety Harness (Double Lanyard)', 'Torque Wrench 1200Nm (RGP-2026-004)'],
    syncHash: 'SYNC-SHA256-BHLS-772910A',
    syncTimestamp: '2026-11-24 08:00:00 IST',
    triPortalStatus: '100% SYNCHRONIZED & AUDITED'
  },
  {
    empId: 'EMP-2026-0002',
    name: 'Sunil Swain',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    trade: 'Hydraulic & Jacking Specialist / Welder 6G',
    dept: 'Hydraulic Operations & Fabrication Wing',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    project: 'PRJ-JTRWF-SCHULER',
    father: 'Banshidhar Swain',
    dob: '1991-03-22',
    age: 35,
    gender: 'Male',
    bloodGroup: 'O+',
    marital: 'Married',
    mobile: '+91 94371 44520',
    emergencyContact: 'Mamata Swain (Wife) - +91 94371 88201',
    permanentAddress: 'At: Jatni Town, Near Gate 2, Dist: Khordha, Odisha - 752050',
    siteCamp: 'JTRWF Site Colony, Barrack 2',
    joiningDate: '2025-06-15',
    wageClassification: 'MONTHLY',
    wageDisplay: 'Monthly Staff (PF & ESIC Covered)',
    compensation: '₹ 48,000 / month',
    bankEnding: '1182 (HDFC Bank)',
    pan: 'BSPSN8821K',
    aadhaar: '8820 4410 1192',
    policeClearance: 'POL-JAT-2026-4402 (Verified Clean)',
    pfUan: '101928374651',
    esicIp: '4491028375',
    hrStatus: 'ACTIVE ONBOARDED ✓',
    inductionId: 'IND-JTRWF-2026-0002',
    inductionDate: '2026-02-15',
    inductionValidUntil: '2027-02-14',
    safetyPassNo: 'SP-2026-002',
    isInducted: true,
    safetyStatus: 'INDUCTED (Form 31 Certified)',
    medicalFitness: 'FIT - Hydraulic & Welding 6G Certified',
    medicalExamDate: '2026-02-10',
    specialCertifications: ['Certified Welder 6G (IBR)', 'Hydraulic High-Pressure Specialist', 'Fire Watch Certified'],
    tbtAttendedCount: 38,
    incidentHistory: 'Zero Incidents / Commended for Spark Screen Practice',
    activePermitId: 'PTW-JTRWF-2026-HOT-0028',
    activePermitDesc: 'Hot Work Permit: Quenching Tank Structure Reinforcement Grid #B-7',
    authorizedAreas: ['AREA-01 AXLE LINE', 'AREA-02 WHEEL FORGING', 'AREA-04 DIE SHOP'],
    gatePassId: 'GP-SEC-2026-0102',
    gateAccessDecision: 'ACCESS GRANTED',
    turnstileStatus: 'UNLOCKED (Gate 1 Pedestrian)',
    currentMuster: 'ON-SITE (Logged 07:48 AM via Gate 1)',
    taggedEquipment: ['ESAB Inverter Welder 400A (Asset #WLD-09)', 'Full Leather Apron & Gauntlets'],
    syncHash: 'SYNC-SHA256-BHLS-881290B',
    syncTimestamp: '2026-11-24 08:00:00 IST',
    triPortalStatus: '100% SYNCHRONIZED & AUDITED'
  },
  {
    empId: 'EMP-2026-0003',
    name: 'Dillip Biswal',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    trade: 'Mechanical Fitter / Certified Banksman',
    dept: 'Machine Shop Maintenance & Tooling',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    project: 'PRJ-JTRWF-SCHULER',
    father: 'Sridhar Biswal',
    dob: '1993-11-05',
    age: 33,
    gender: 'Male',
    bloodGroup: 'A+',
    marital: 'Married',
    mobile: '+91 98612 33441',
    emergencyContact: 'Subhashree Biswal (Wife) - +91 98612 99882',
    permanentAddress: 'At: Begunia, Dist: Khordha, Odisha - 752062',
    siteCamp: 'JTRWF Site Camp Room 8',
    joiningDate: '2025-08-01',
    wageClassification: 'DAILY',
    wageDisplay: 'Daily Skilled (Wages + Overtime)',
    compensation: '₹ 1,150 / day',
    bankEnding: '9920 (Canara Bank)',
    pan: 'DBISW7712M',
    aadhaar: '7729 4410 8891',
    policeClearance: 'POL-BEG-2026-1120 (Verified Clean)',
    pfUan: '101928374652',
    esicIp: '4491028376',
    hrStatus: 'ACTIVE ONBOARDED ✓',
    inductionId: 'IND-JTRWF-2026-0003',
    inductionDate: '2026-03-01',
    inductionValidUntil: '2027-02-28',
    safetyPassNo: 'SP-2026-003',
    isInducted: true,
    safetyStatus: 'INDUCTED (Form 31 Certified)',
    medicalFitness: 'FIT - General Mechanical & Rigging',
    medicalExamDate: '2026-02-25',
    specialCertifications: ['Certified Crane Signalman', 'LOTO Authorized Person'],
    tbtAttendedCount: 35,
    incidentHistory: 'Zero Incidents',
    activePermitId: 'PTW-JTRWF-2026-GEN-0041',
    activePermitDesc: 'General Work Permit: Roller Table RT-04 Preventive Maintenance',
    authorizedAreas: ['AREA-01 AXLE LINE', 'AREA-03 MACHINE SHOP', 'AREA-05 HEAVY YARD'],
    gatePassId: 'GP-SEC-2026-0103',
    gateAccessDecision: 'ACCESS GRANTED',
    turnstileStatus: 'UNLOCKED (Gate 1 Pedestrian)',
    currentMuster: 'ON-SITE (Logged 07:50 AM)',
    taggedEquipment: ['Torque Wrench 600Nm', 'Signalman Hi-Vis Fluorescent Vest & Radio #6'],
    syncHash: 'SYNC-SHA256-BHLS-991204C',
    syncTimestamp: '2026-11-24 08:00:00 IST',
    triPortalStatus: '100% SYNCHRONIZED & AUDITED'
  }
];

// ============================================================================
// 2. PERMITS 360° DIRECTORY (3 CONTROLLED V2.0 FORMS)
// ============================================================================
const PERMIT_360_DIRECTORY = [
  {
    permitId: 'PTW-JTRWF-2026-GEN-0041',
    templateCode: 'PTW-GEN',
    typeNum: 1,
    title: 'GENERAL WORK PERMIT TO WORK',
    docNo: 'BAL-JTRWF-SAF-PTW-001-V2.0',
    category: 'GENERAL',
    colorKey: '#059669',
    colorBg: '#ECFDF5',
    status: 'ACTIVE / WORK IN PROGRESS',
    statusBadge: 'status-active',
    workArea: 'AREA-01 AXLE FORGING LINE',
    exactLocation: 'Axle Forging Line, Finishing Bay, Roller Table RT-04',
    shift: 'General / Shift A',
    crewSize: 6,
    supervisor: 'Rajesh K. Sharma',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    workDescription: 'Routine preventive maintenance, mechanical guide roller alignment, sensor cleaning and bolting torque check on Roller Table RT-04.',
    equipmentAsset: 'Roller Conveyor RT-04 / Hydraulic Drive HD-02',
    jsaRef: 'JSA-JTRWF-MNT-2026-018',
    isolationNos: 'LOTO-MCH-2026-0044 (Local Lockbox #3)',
    verifiedBy: 'Sanjay Mohanty (Mech Lead)',
    precautions: 'Area barricaded with yellow-black tape; pedestrian crossover walkway kept clear.',
    ppe: ['Safety Helmet', 'Steel Toe Shoes', 'Cut-Resistant Gloves', 'Safety Goggles', 'Hi-Vis Vest'],
    emergencyContact: '+91 94370 12345 (Site HSE Control Room)',
    musterPoint: 'Muster Point #2 (Axle Bay South)',
    validFrom: '2026-11-24 08:00 AM',
    validUntil: '2026-11-24 08:00 PM',
    decision: 'APPROVED',
    specialConditions: 'Maintain safe clearance from overhead cranes; ensure earthing intact during motor cleaning.',
    revalidation: 'Not Required (Valid within shift window)',
    handbackStatus: 'Scheduled 07:30 PM (Tool retrieval & safety guard restoration)',
    crewRoll: [
      { no: 1, empId: 'EMP-2026-0001', name: 'Ramesh Kumar', trade: 'Senior Rigger Lead', sig: 'Ramesh.K', time: '07:35 AM' },
      { no: 2, empId: 'EMP-2026-0002', name: 'Sunil Swain', trade: 'Hydraulic Specialist', sig: 'S.Swain', time: '07:36 AM' },
      { no: 3, empId: 'EMP-2026-0003', name: 'Dillip Biswal', trade: 'Mechanical Fitter', sig: 'D.Biswal', time: '07:37 AM' },
      { no: 4, empId: 'EMP-2026-0004', name: 'Pradeep Rout', trade: 'Mechanical Fitter', sig: 'P.Rout', time: '07:38 AM' },
      { no: 5, empId: 'EMP-2026-0005', name: 'Ashok Mohanty', trade: 'Rigging Helper', sig: 'Ashok.M', time: '07:40 AM' },
      { no: 6, empId: 'EMP-2026-0006', name: 'Kailash Sahoo', trade: 'Safety Attendant', sig: 'K.Sahoo', time: '07:42 AM' }
    ],
    signOffs: {
      requester: { name: 'Rajesh K. Sharma', role: 'Work Supervisor', time: '2026-11-24 07:55 AM', signed: true },
      safetyOfficer: { name: 'Bikram Patra', role: 'Site HSE Officer', time: '2026-11-24 07:58 AM', signed: true },
      approver: { name: 'Gajendra Rao', role: 'HSE Lead / Site Manager', time: '2026-11-24 08:00 AM', signed: true },
      issuer: { name: 'Gajendra Rao', role: 'Authorized Permit Issuer', time: '2026-11-24 08:00 AM', signed: true }
    }
  },
  {
    permitId: 'PTW-JTRWF-2026-HOT-0028',
    templateCode: 'PTW-HOT',
    typeNum: 2,
    title: 'HOT WORK PERMIT TO WORK',
    docNo: 'BAL-JTRWF-SAF-PTW-002-V2.0',
    category: 'HOT WORK',
    colorKey: '#DC2626',
    colorBg: '#FEF2F2',
    status: 'ACTIVE / UNDER FIRE WATCH',
    statusBadge: 'status-hotwork',
    workArea: 'AREA-02 WHEEL FORGING LINE',
    exactLocation: 'Wheel Forging Bay, Quenching Tank Structure Reinforcement Grid #B-7',
    shift: 'Day Shift',
    crewSize: 6,
    supervisor: 'Sanjay Panda',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    workDescription: 'Structural hot work: SMAW welding and edge grinding of gusset plates on support steelwork of Quenching Tank Platform.',
    equipmentAsset: 'ESAB Mig-Tig Welder 400A / Bosch Heavy Angle Grinder 9-inch',
    jsaRef: 'JSA-JTRWF-HOT-2026-009',
    isolationNos: 'ISO-WHL-2026-0019 (Quenching Tank Power Locked)',
    verifiedBy: 'Bikram Patra (Safety Officer)',
    precautions: 'Fire blankets deployed; continuous fire watch assigned with 10kg DCP extinguisher.',
    ppe: ['Welding Hood (Shade 11)', 'Leather Welding Apron', 'Welding Gauntlets', 'Safety Shoes', 'Ear Plugs'],
    emergencyContact: '+91 94370 12345 (Site HSE Control Room)',
    musterPoint: 'Muster Point #3 (Wheel Bay North)',
    validFrom: '2026-11-24 08:30 AM',
    validUntil: '2026-11-24 04:30 PM',
    decision: 'APPROVED',
    specialConditions: 'Maintain fire watch during lunch break and sustain for minimum 45 minutes after final weld bead.',
    revalidation: 'Not Required',
    handbackStatus: 'Slag inspection & fire watch cool-down check scheduled 04:45 PM',
    crewRoll: [
      { no: 1, empId: 'EMP-2026-0002', name: 'Sunil Swain', trade: 'Welder 6G / Specialist', sig: 'S.Swain', time: '08:05 AM' },
      { no: 2, empId: 'EMP-2026-0008', name: 'Birendra Majhi', trade: 'Certified Welder 4G', sig: 'B.Majhi', time: '08:06 AM' },
      { no: 3, empId: 'EMP-2026-0006', name: 'Kailash Sahoo', trade: 'Dedicated Fire Watch', sig: 'K.Sahoo', time: '08:08 AM' },
      { no: 4, empId: 'EMP-2026-0003', name: 'Dillip Biswal', trade: 'Grinder / Fitter', sig: 'D.Biswal', time: '08:10 AM' },
      { no: 5, empId: 'EMP-2026-0004', name: 'Pradeep Rout', trade: 'Mechanical Fitter', sig: 'P.Rout', time: '08:12 AM' },
      { no: 6, empId: 'EMP-2026-0001', name: 'Ramesh Kumar', trade: 'Rigging Lead', sig: 'Ramesh.K', time: '08:15 AM' }
    ],
    signOffs: {
      requester: { name: 'Sanjay Panda', role: 'Welding Supervisor', time: '2026-11-24 08:22 AM', signed: true },
      safetyOfficer: { name: 'Bikram Patra', role: 'Site HSE Officer', time: '2026-11-24 08:25 AM', signed: true },
      approver: { name: 'Gajendra Rao', role: 'HSE Lead / Site Manager', time: '2026-11-24 08:30 AM', signed: true },
      issuer: { name: 'Gajendra Rao', role: 'Authorized Permit Issuer', time: '2026-11-24 08:30 AM', signed: true }
    }
  },
  {
    permitId: 'PTW-JTRWF-2026-SPEC-0015',
    templateCode: 'PTW-SPEC',
    typeNum: 3,
    title: 'SPECIAL / HIGH-RISK PERMIT TO WORK',
    docNo: 'BAL-JTRWF-SAF-PTW-003-V2.0',
    category: 'SPECIAL / HIGH-RISK',
    colorKey: '#D97706',
    colorBg: '#FFFBEB',
    status: 'ACTIVE / CRITICAL SURVEILLANCE',
    statusBadge: 'status-special',
    workArea: 'AREA-03 MACHINE SHOP',
    exactLocation: 'Machine Shop Bay 1, Schuler 1600T Press Foundation Pit & Overhead Gantry Crane Rail',
    shift: 'Special Heavy Lift Window',
    crewSize: 6,
    supervisor: 'Ramesh Kumar (Senior Rigger Lead)',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    workDescription: 'Critical tandem lift and rigging positioning of 1600T Schuler Press Upper Tie-Rod Beam (48T) at elevation 9.5m; working at height and tandem crane operation.',
    equipmentAsset: 'Terex Demag AC-250 (250T) + Kobelco CKE1800 (180T) Crane Duo / 100T Rigging Slings',
    jsaRef: 'JSA-JTRWF-LIFT-2026-002-CRITICAL',
    isolationNos: 'LOTO-GANTRY-2026-0007 (Overhead Power Rail 415V Locked)',
    verifiedBy: 'Gajendra Rao (HSE Lead)',
    precautions: 'Full exclusion zone 15m radius barricaded; outrigger steel spreader mats placed on tested 25T/m2 soil.',
    ppe: ['Safety Helmet', 'Full Body Harness (Double Lanyard)', 'Steel Toe Shoes', 'Rigger Gloves', 'Walkie-Talkie Channel 4'],
    emergencyContact: '+91 94370 12345 (Site HSE Control Room)',
    musterPoint: 'Muster Point #1 (Main Engineering Gate)',
    validFrom: '2026-11-24 09:00 AM',
    validUntil: '2026-11-24 05:00 PM',
    decision: 'APPROVED',
    specialConditions: 'Wind speed must stay below 28 km/h; tag lines held by trained riggers; stop lift if visibility drops.',
    revalidation: 'Pre-Lift Wind & Soil Re-check at 01:00 PM',
    handbackStatus: 'Controlled beam landing, rigging release and gantry rail power reactivation',
    crewRoll: [
      { no: 1, empId: 'EMP-2026-0001', name: 'Ramesh Kumar', trade: 'Senior Rigger Lead / Supervisor', sig: 'Ramesh.K', time: '08:20 AM' },
      { no: 2, empId: 'EMP-2026-0002', name: 'Sunil Swain', trade: 'Hydraulic & Jacking Lead', sig: 'S.Swain', time: '08:22 AM' },
      { no: 3, empId: 'EMP-2026-0010', name: 'Ajay Nayak', trade: 'Certified Heavy Crane Operator', sig: 'A.Nayak', time: '08:25 AM' },
      { no: 4, empId: 'EMP-2026-0003', name: 'Dillip Biswal', trade: 'Certified Signalman / Banksman', sig: 'D.Biswal', time: '08:27 AM' },
      { no: 5, empId: 'EMP-2026-0004', name: 'Pradeep Rout', trade: 'Height Rigging Specialist', sig: 'P.Rout', time: '08:30 AM' },
      { no: 6, empId: 'EMP-2026-0015', name: 'Bikram Patra', trade: 'Safety Officer / Lift Watch', sig: 'B.Patra', time: '08:35 AM' }
    ],
    signOffs: {
      requester: { name: 'Ramesh Kumar', role: 'Senior Rigger Lead', time: '2026-11-24 08:48 AM', signed: true },
      safetyOfficer: { name: 'Bikram Patra', role: 'Site HSE Officer', time: '2026-11-24 08:52 AM', signed: true },
      approver: { name: 'Gajendra Rao', role: 'HSE Lead / Site Manager', time: '2026-11-24 08:58 AM', signed: true },
      issuer: { name: 'Gajendra Rao', role: 'Authorized Permit Issuer', time: '2026-11-24 08:58 AM', signed: true }
    }
  }
];

// ============================================================================
// 3. EQUIPMENT & CRANES 360° DIRECTORY
// ============================================================================
const EQUIPMENT_360_DIRECTORY = [
  {
    assetId: 'CRN-TEREX-DEMAG-250T',
    name: 'Terex Demag AC-250 All-Terrain Mobile Crane',
    category: 'Heavy Lifting Crane',
    owner: 'BALSONS HEAVY LIFT & SHIFT',
    status: 'OPERATIONAL & TPI CERTIFIED',
    statusCode: 'active',
    swl: '250.0 Metric Tons',
    boomLength: '70.0 Meters (Main Boom) + 33m Jib',
    operatingRadius: '3.0m - 58.0m',
    counterweight: '96.6 Tons Full Stack',
    chassisNo: 'WD6839210-TEREX-04',
    regNo: 'OD-02-BH-9912',
    form11CertNo: 'TPI-OR-2026-118',
    certifyingAuthority: 'Bureau Veritas Industrial Services (Form 11 Certified)',
    inspectionDate: '2026-01-15',
    expiryDate: '2027-01-14',
    wireRopeCert: 'WR-28MM-6X36-IWRC-9901 (Tested 480 kN MBL)',
    lastLubeDate: '2026-11-20',
    loadCellCalibration: 'Calibrated 2026-02-10 (Error < 0.8%)',
    limitSwitchesStatus: 'Anti-Two-Block (A2B) & Boom Angle Sensors 100% Functional',
    groundBearingRequirement: '25.0 Tons / m² (Steel Spreader Mats Deployed)',
    assignedOperator: 'Ajay Nayak (Heavy Equipment Lic #OD02-2015-004412)',
    assignedSignalman: 'Dillip Biswal (Certified Rigger / Signalman)',
    activePermitLinked: 'PTW-JTRWF-2026-SPEC-0015 (Schuler 1600T Press Tandem Lift)',
    currentLocation: 'Machine Shop Bay 1 - North Outrigger Pad'
  },
  {
    assetId: 'CRN-KOBELCO-CKE1800',
    name: 'Kobelco CKE1800 Heavy Crawler Crane',
    category: 'Crawler Lattice Boom Crane',
    owner: 'BALSONS HEAVY LIFT & SHIFT',
    status: 'OPERATIONAL & TPI CERTIFIED',
    statusCode: 'active',
    swl: '180.0 Metric Tons',
    boomLength: '61.0 Meters Heavy Duty Lattice',
    operatingRadius: '4.5m - 52.0m',
    counterweight: '60.0 Tons Base + 11T Carbody Counterweight',
    chassisNo: 'KOB-CKE18-9921',
    regNo: 'OD-02-BH-8841',
    form11CertNo: 'TPI-OR-2026-092',
    certifyingAuthority: 'TUV Rheinland India (Form 11 Certified)',
    inspectionDate: '2025-12-10',
    expiryDate: '2026-12-09',
    wireRopeCert: 'WR-26MM-NON-ROTATING-4412',
    lastLubeDate: '2026-11-18',
    loadCellCalibration: 'Calibrated 2026-01-20 (Digital LMI Tested)',
    limitSwitchesStatus: 'Hoist Overwind & Boom Backstop Tested & Verified Safe',
    groundBearingRequirement: '18.0 Tons / m² (Hardwood Timber Mats Deployed)',
    assignedOperator: 'Maheswar Jena (Crawler Specialist Lic #OD02-2012-009918)',
    assignedSignalman: 'Ramesh Kumar (Lead Rigger)',
    activePermitLinked: 'PTW-JTRWF-2026-SPEC-0015 (Schuler 1600T Press Tandem Lift)',
    currentLocation: 'Machine Shop Bay 1 - South Track Pad'
  },
  {
    assetId: 'CRN-FARANA-F17',
    name: 'Escorts Hydra Farana 17T Pick-and-Carry Crane',
    category: 'Auxiliary Yard Crane',
    owner: 'BALSONS HEAVY LIFT & SHIFT',
    status: 'OPERATIONAL & SITE CLEARED',
    statusCode: 'active',
    swl: '17.0 Metric Tons',
    boomLength: '14.2 Meters Telescopic (4 Section)',
    operatingRadius: '1.8m - 10.5m',
    counterweight: 'Integral Chassis Counterweight',
    chassisNo: 'ESC-FAR-17-7729',
    regNo: 'OD-02-BH-5502',
    form11CertNo: 'TPI-OR-2026-304',
    certifyingAuthority: 'SGS India Industrial Inspection',
    inspectionDate: '2026-03-05',
    expiryDate: '2027-03-04',
    wireRopeCert: 'WR-14MM-6X19-CORE-2291',
    lastLubeDate: '2026-11-22',
    loadCellCalibration: 'Calibrated Safe Load Indicator (SLI) Green',
    limitSwitchesStatus: 'Overhoist Limit & Steering Lock Functional',
    groundBearingRequirement: 'Normal Paved Concrete Yard',
    assignedOperator: 'Pabitra Barik (Lic #OD02-2018-8812)',
    assignedSignalman: 'Ashok Mohanty (Rigging Helper)',
    activePermitLinked: 'PTW-JTRWF-2026-GEN-0041 (Roller Table Delivery Support)',
    currentLocation: 'Axle Forging Yard Bay South'
  }
];

// ============================================================================
// 4. WORK AREAS 360° DIRECTORY
// ============================================================================
const WORKAREA_360_DIRECTORY = [
  {
    code: 'AREA-01',
    name: 'Axle Forging Line (Main Bay South)',
    hod: 'Rajesh K. Sharma',
    safetyOfficer: 'Bikram Patra',
    riskLevel: 'MEDIUM (Controlled SIMOPS)',
    activePermitsCount: 3,
    activePermitIds: ['PTW-JTRWF-2026-GEN-0041', 'PTW-JTRWF-2026-GEN-0039'],
    workersOnSite: 24,
    hazardProfile: 'Heavy rotating machinery, hydraulic line 210 Bar, hot billet movement, overhead crane traffic',
    lotoPoints: 12,
    fireHydrantPoint: 'FH-04 (South Wall, Column 18)',
    musterStation: 'Muster Point #2 (Axle Bay South)',
    firstAidBox: 'FA-02 (Near Shift Supervisor Desk)',
    emergencyEyeWash: 'EW-01 (Hydraulic Power Pack Room)',
    lastAuditScore: '96.5% (A+ HSE Rating)',
    simopsStatus: 'Coordinated between BALSONS Maintenance & Client Commissioning'
  },
  {
    code: 'AREA-02',
    name: 'Wheel Forging Line (Main Bay North)',
    hod: 'Sanjay Panda',
    safetyOfficer: 'Bikram Patra',
    riskLevel: 'HIGH (Hot Work & Radiant Heat)',
    activePermitsCount: 2,
    activePermitIds: ['PTW-JTRWF-2026-HOT-0028'],
    workersOnSite: 18,
    hazardProfile: 'Open hot work sparks, quenching oil tank, gas piping, radiant heat, crane travel zone',
    lotoPoints: 16,
    fireHydrantPoint: 'FH-07 (North Column 22 - Foam Trolley Equipped)',
    musterStation: 'Muster Point #3 (Wheel Bay North)',
    firstAidBox: 'FA-03 (Wheel Forging Control Room)',
    emergencyEyeWash: 'EW-03 (Quenching Tank Platform)',
    lastAuditScore: '95.0% (A HSE Rating)',
    simopsStatus: 'Fire watch actively deployed with 10kg DCP extinguishers'
  },
  {
    code: 'AREA-03',
    name: 'Machine Shop (Auxiliary Bay 1)',
    hod: 'Manoj Mohanty',
    safetyOfficer: 'Rakesh Swain',
    riskLevel: 'CRITICAL (Tandem Lifting Active)',
    activePermitsCount: 4,
    activePermitIds: ['PTW-JTRWF-2026-SPEC-0015'],
    workersOnSite: 32,
    hazardProfile: 'Heavy tandem crane operations, foundation pit depth 4.5m, 415V HT busbars, heavy tie-rod rigging',
    lotoPoints: 20,
    fireHydrantPoint: 'FH-02 (Bay 1 Central East)',
    musterStation: 'Muster Point #1 (Main Engineering Gate)',
    firstAidBox: 'FA-01 (Machine Shop Main Entrance)',
    emergencyEyeWash: 'EW-02 (Pit Service Bay)',
    lastAuditScore: '98.0% (Exceptional Rigging Compliance)',
    simopsStatus: 'Exclusion zone 15m radius physically enforced with red-white chains'
  },
  {
    code: 'AREA-04',
    name: 'Die Shop & Heavy Tooling',
    hod: 'Ajay Verma',
    safetyOfficer: 'Rakesh Swain',
    riskLevel: 'LOW / CONTROLLED',
    activePermitsCount: 1,
    activePermitIds: ['PTW-JTRWF-2026-GEN-0038'],
    workersOnSite: 14,
    hazardProfile: 'Heavy die blocks, magnetic chucks, overhead monorail, sharp swarf/metal cuttings',
    lotoPoints: 8,
    fireHydrantPoint: 'FH-09 (Die Shop Tool Crib)',
    musterStation: 'Muster Point #4 (Tooling Yard West)',
    firstAidBox: 'FA-04 (Tool Room Supervisor Station)',
    emergencyEyeWash: 'EW-04 (Acid Etching Bench)',
    lastAuditScore: '94.2% (Good Housekeeping)',
    simopsStatus: 'Normal single-shift tooling maintenance'
  }
];

// ============================================================================
// 5. INCIDENTS & CAPA 360° DIRECTORY
// ============================================================================
const INCIDENT_360_DIRECTORY = [
  {
    incidentId: 'INC-2026-001',
    refNo: 'BAL-SAF-INC-2026-001',
    date: '2026-11-20',
    time: '11:15 AM',
    classification: 'Near Miss (High Potential)',
    workArea: 'AREA-03 MACHINE SHOP',
    exactLocation: 'Bay 1, Overhead Crane Girder Erection Area',
    supervisor: 'Ramesh Kumar',
    investigator: 'Bikram Patra (Site HSE Officer)',
    summary: 'During trial lift of 12-meter cross spreader beam, the secondary polypropylene tag line snagged against the corner of a stacked steel plate crate. The rigger immediately called "STOP WORK" on radio. Load stopped without swing or personnel contact.',
    injuryDetails: 'Zero Injuries. No medical treatment required.',
    propertyDamage: 'Nil. Tag line freed safely without equipment strain.',
    fiveWhyAnalysis: [
      { why: 'Why did the tag line snag?', answer: 'The tag line lay slack along the ground corridor near the material staging pallet.' },
      { why: 'Why was the tag line slack?', answer: 'The secondary tag-line tender stepped backwards into a congested pallet clearance zone.' },
      { why: 'Why was the clearance zone congested?', answer: 'Unloading crates from supplier truck were temporarily parked adjacent to the lift path.' },
      { why: 'Why were crates parked adjacent to the lift corridor?', answer: 'Truck offloading permit and tandem lift corridor boundary lacked defined physical demarcations.' },
      { why: 'Root Cause?', answer: 'Inadequate SIMOPS spatial segregation between heavy lifting corridor and temporary unloading logistics staging.' }
    ],
    capaActions: [
      { action: 'Establish mandatory 15-meter painted yellow barrier around crane radius with no material staging permitted.', owner: 'Gajendra Rao (HSE Lead)', targetDate: '2026-11-21', status: 'VERIFIED CLOSED ✓', proof: 'Yellow boundary painted and photo documented.' },
      { action: 'Conduct stand-down TBT on tag line control and maintaining 45° taut holding angle for all riggers.', owner: 'Ramesh Kumar (Lead Rigger)', targetDate: '2026-11-21', status: 'VERIFIED CLOSED ✓', proof: 'TBT #88 signed by 18 riggers.' },
      { action: 'Update Heavy Lift Procedure to include Logistics Marshaling sign-off before trial lift.', owner: 'Rajesh Sharma', targetDate: '2026-11-23', status: 'VERIFIED CLOSED ✓', proof: 'Lifting SOP Rev 2.1 published.' }
    ],
    closeOutStatus: '100% CLOSED & VERIFIED BY CLIENT HSE'
  },
  {
    incidentId: 'INC-2026-002',
    refNo: 'BAL-SAF-INC-2026-002',
    date: '2026-11-22',
    time: '02:45 PM',
    classification: 'First Aid Case (FAC)',
    workArea: 'AREA-01 AXLE FORGING LINE',
    exactLocation: 'Roller Table RT-02 Gearbox Coupling',
    supervisor: 'Rajesh K. Sharma',
    investigator: 'Bikram Patra (Site HSE Officer)',
    summary: 'Mechanical fitter pinched right index fingertip between flange bolt and spanner while breaking a seized M24 torque bolt. Worker reported immediately to Site First Aid Post FA-02.',
    injuryDetails: 'Superficial skin abrasion right index finger. Antiseptic dressing applied. Worker returned to light duty.',
    propertyDamage: 'Nil.',
    fiveWhyAnalysis: [
      { why: 'Why did the finger pinch occur?', answer: 'The open-ended spanner slipped off the oxidized bolt head under manual pressure.' },
      { why: 'Why did the spanner slip?', answer: 'An open-ended spanner was used instead of a 6-point impact socket or ring spanner.' },
      { why: 'Why was an open-ended spanner used?', answer: 'Flange clearance was tight and standard socket was not immediately at hand in the toolbox.' },
      { why: 'Why was the correct socket missing?', answer: 'Pre-task tool box check did not verify specific socket sizes against flange drawings.' },
      { why: 'Root Cause?', answer: 'Failure to enforce use of ring/socket spanners for stubborn high-torque flange bolts.' }
    ],
    capaActions: [
      { action: 'Provide all fitter crews with offset ring spanners and heavy-duty impact sockets for flange maintenance.', owner: 'Ajay Verma (Tooling Head)', targetDate: '2026-11-23', status: 'VERIFIED CLOSED ✓', proof: '12 new socket sets issued to fitters.' },
      { action: 'Upgrade rigger/fitter gloves to Level 5 Impact & Cut Resistant heavy gauntlets.', owner: 'Gajendra Rao', targetDate: '2026-11-24', status: 'VERIFIED CLOSED ✓', proof: 'Impact gloves distributed.' }
    ],
    closeOutStatus: '100% CLOSED & VERIFIED BY HSE HEAD'
  }
];

// ============================================================================
// 6. TOOLBOX TALKS (TBT) 360° DIRECTORY
// ============================================================================
const TBT_360_DIRECTORY = [
  {
    tbtId: 'TBT-2026-0089',
    topic: 'Tandem Lifting Hazards, Tag Line Discipline & Ground Compaction',
    date: '2026-11-24',
    time: '08:15 AM - 08:45 AM (30 Mins)',
    shift: 'General Day Shift',
    workArea: 'AREA-03 MACHINE SHOP',
    linkedPermit: 'PTW-JTRWF-2026-SPEC-0015',
    conductedBy: 'Ramesh Kumar (Senior Rigger Lead)',
    hseObserver: 'Bikram Patra (Site HSE Officer)',
    totalAttendees: 6,
    briefingSummary: 'Addressed Schuler 1600T Press Tie-Rod tandem lift. Emphasized dual-crane load sharing, radio communication channel 4 silence except for signalman Dillip Biswal, and holding tag lines at 45° away from falling zones.',
    keyHazardPoints: [
      'Tandem crane synchronization: Terex 250T and Kobelco 180T must lift at identical hoist speeds (< 1.5 m/min).',
      'Ground bearing pressure: Verified 25T/m2 compaction test on pit edges; all outrigger mats inspected.',
      'Strict 15m exclusion boundary: Zero unauthorized personnel inside red-white chain perimeter.',
      'Personal Stop-Work Authority: Every crew member empowered to halt lift immediately on any abnormality.'
    ],
    attendees: [
      { no: 1, empId: 'EMP-2026-0001', name: 'Ramesh Kumar', trade: 'Senior Rigger Lead / Supervisor', sig: 'Ramesh.K', time: '08:20 AM', verified: true },
      { no: 2, empId: 'EMP-2026-0002', name: 'Sunil Swain', trade: 'Hydraulic & Jacking Lead', sig: 'S.Swain', time: '08:22 AM', verified: true },
      { no: 3, empId: 'EMP-2026-0010', name: 'Ajay Nayak', trade: 'Certified Heavy Crane Operator', sig: 'A.Nayak', time: '08:25 AM', verified: true },
      { no: 4, empId: 'EMP-2026-0003', name: 'Dillip Biswal', trade: 'Certified Signalman / Banksman', sig: 'D.Biswal', time: '08:27 AM', verified: true },
      { no: 5, empId: 'EMP-2026-0004', name: 'Pradeep Rout', trade: 'Height Rigging Specialist', sig: 'P.Rout', time: '08:30 AM', verified: true },
      { no: 6, empId: 'EMP-2026-0015', name: 'Bikram Patra', trade: 'Safety Officer / Lift Watch', sig: 'B.Patra', time: '08:35 AM', verified: true }
    ],
    leaderSignOff: 'Ramesh Kumar (Rigger Lead)',
    hseSignOff: 'Bikram Patra (Site HSE)',
    complianceScore: '100% Attendance & Understanding Verified'
  },
  {
    tbtId: 'TBT-2026-0090',
    topic: 'Hot Work Spark Containment, 15m Perimeter Clearing & Fire Watch Vigilance',
    date: '2026-11-24',
    time: '08:00 AM - 08:20 AM (20 Mins)',
    shift: 'General Day Shift',
    workArea: 'AREA-02 WHEEL FORGING LINE',
    linkedPermit: 'PTW-JTRWF-2026-HOT-0028',
    conductedBy: 'Sanjay Panda (Welding Supervisor)',
    hseObserver: 'Bikram Patra (Site HSE Officer)',
    totalAttendees: 6,
    briefingSummary: 'Briefed Quenching Tank structural reinforcement welding crew. Re-enforced that sparks can travel over 10m horizontally. All combustible wooden pallets cleared, certified fire blankets clamped, and 10kg DCP extinguisher checked.',
    keyHazardPoints: [
      'Flammable atmosphere: Tested 0% LEL prior to striking arc; confirmed no oily residue in tank drainage.',
      'Fire watch vigilance: Fire watcher Kailash Sahoo dedicated solely to spark surveillance with whistle & extinguisher.',
      'Sustained post-work watch: Fire watch must remain posted for 45 minutes after final weld cool down.'
    ],
    attendees: [
      { no: 1, empId: 'EMP-2026-0002', name: 'Sunil Swain', trade: 'Welder 6G / Specialist', sig: 'S.Swain', time: '08:05 AM', verified: true },
      { no: 2, empId: 'EMP-2026-0008', name: 'Birendra Majhi', trade: 'Certified Welder 4G', sig: 'B.Majhi', time: '08:06 AM', verified: true },
      { no: 3, empId: 'EMP-2026-0006', name: 'Kailash Sahoo', trade: 'Dedicated Fire Watch', sig: 'K.Sahoo', time: '08:08 AM', verified: true },
      { no: 4, empId: 'EMP-2026-0003', name: 'Dillip Biswal', trade: 'Grinder / Fitter', sig: 'D.Biswal', time: '08:10 AM', verified: true },
      { no: 5, empId: 'EMP-2026-0004', name: 'Pradeep Rout', trade: 'Mechanical Fitter', sig: 'P.Rout', time: '08:12 AM', verified: true },
      { no: 6, empId: 'EMP-2026-0001', name: 'Ramesh Kumar', trade: 'Rigging Lead', sig: 'Ramesh.K', time: '08:15 AM', verified: true }
    ],
    leaderSignOff: 'Sanjay Panda (Welding Supervisor)',
    hseSignOff: 'Bikram Patra (Site HSE)',
    complianceScore: '100% Attendance Verified'
  }
];

// ============================================================================
// 7. UNIFIED 360° DOSSIER CONTROLLER & PRINT ENGINE
// ============================================================================
const Balsons360Dossier = {
  activeType: 'workforce',
  activeId: 'EMP-2026-0001',
  printOrientation: 'portrait',

  setPrintOrientation: function(orientation) {
    this.printOrientation = orientation || 'portrait';
    const btnP = document.getElementById('modal-dossier-orient-p');
    const btnL = document.getElementById('modal-dossier-orient-l');
    if (btnP && btnL) {
      if (this.printOrientation === 'landscape') {
        btnL.style.background = '#0097B2';
        btnL.style.color = '#FFFFFF';
        btnP.style.background = 'transparent';
        btnP.style.color = '#1E293B';
      } else {
        btnP.style.background = '#0097B2';
        btnP.style.color = '#FFFFFF';
        btnL.style.background = 'transparent';
        btnL.style.color = '#1E293B';
      }
    }
    this.refreshModalContent();
  },

  switchType: function(type, targetId) {
    this.activeType = type;
    if (targetId) {
      this.activeId = targetId;
    } else {
      if (type === 'workforce') this.activeId = WORKFORCE_360_DIRECTORY[0].empId;
      else if (type === 'permit') this.activeId = PERMIT_360_DIRECTORY[0].permitId;
      else if (type === 'equipment') this.activeId = EQUIPMENT_360_DIRECTORY[0].assetId;
      else if (type === 'area') this.activeId = WORKAREA_360_DIRECTORY[0].code;
      else if (type === 'incident') this.activeId = INCIDENT_360_DIRECTORY[0].incidentId;
      else if (type === 'tbt') this.activeId = TBT_360_DIRECTORY[0].tbtId;
    }

    this.updateCategoryTabsUI();
    this.populateEntitySelect();
    this.refreshModalContent();
  },

  updateCategoryTabsUI: function() {
    const tabs = ['workforce', 'permit', 'equipment', 'area', 'incident', 'tbt'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-dossier-${t}`);
      if (btn) {
        if (t === this.activeType) {
          btn.style.background = '#0097B2';
          btn.style.color = '#FFFFFF';
          btn.style.borderColor = '#0097B2';
          btn.style.fontWeight = '800';
        } else {
          btn.style.background = 'rgba(0,0,0,0.04)';
          btn.style.color = '#334155';
          btn.style.borderColor = '#CBD5E1';
          btn.style.fontWeight = '600';
        }
      }
    });
  },

  populateEntitySelect: function() {
    const sel = document.getElementById('modalDossierEntitySelect');
    if (!sel) return;
    sel.innerHTML = '';

    if (this.activeType === 'workforce') {
      WORKFORCE_360_DIRECTORY.forEach(e => {
        const opt = document.createElement('option');
        opt.value = e.empId;
        opt.textContent = `${e.empId} • ${e.name} (${e.trade.split('/')[0].trim()})`;
        if (e.empId === this.activeId) opt.selected = true;
        sel.appendChild(opt);
      });
    } else if (this.activeType === 'permit') {
      PERMIT_360_DIRECTORY.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.permitId;
        opt.textContent = `${p.permitId} • Type ${p.typeNum}/3 [${p.category}]`;
        if (p.permitId === this.activeId) opt.selected = true;
        sel.appendChild(opt);
      });
    } else if (this.activeType === 'equipment') {
      EQUIPMENT_360_DIRECTORY.forEach(eq => {
        const opt = document.createElement('option');
        opt.value = eq.assetId;
        opt.textContent = `${eq.assetId} • ${eq.swl}`;
        if (eq.assetId === this.activeId) opt.selected = true;
        sel.appendChild(opt);
      });
    } else if (this.activeType === 'area') {
      WORKAREA_360_DIRECTORY.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.code;
        opt.textContent = `${a.code} • ${a.name}`;
        if (a.code === this.activeId) opt.selected = true;
        sel.appendChild(opt);
      });
    } else if (this.activeType === 'incident') {
      INCIDENT_360_DIRECTORY.forEach(inc => {
        const opt = document.createElement('option');
        opt.value = inc.incidentId;
        opt.textContent = `${inc.incidentId} • ${inc.classification}`;
        if (inc.incidentId === this.activeId) opt.selected = true;
        sel.appendChild(opt);
      });
    } else if (this.activeType === 'tbt') {
      TBT_360_DIRECTORY.forEach(tbt => {
        const opt = document.createElement('option');
        opt.value = tbt.tbtId;
        opt.textContent = `${tbt.tbtId} • ${tbt.topic.slice(0, 35)}...`;
        if (tbt.tbtId === this.activeId) opt.selected = true;
        sel.appendChild(opt);
      });
    }
  },

  onSelectChange: function(val) {
    this.activeId = val;
    this.refreshModalContent();
  },

  refreshModalContent: function() {
    const container = document.getElementById('dossier-360-modal-content');
    if (!container) return;
    container.innerHTML = this.renderActiveDossier(false, this.printOrientation);
  },

  openModal: function(empId) {
    this.injectModalIfMissing();
    this.switchType('workforce', empId || 'EMP-2026-0001');
    const modal = document.getElementById('modal-dossier-360');
    if (modal) modal.style.display = 'flex';
  },

  openPermit360: function(permitId) {
    this.injectModalIfMissing();
    this.switchType('permit', permitId || 'PTW-JTRWF-2026-GEN-0041');
    const modal = document.getElementById('modal-dossier-360');
    if (modal) modal.style.display = 'flex';
  },

  openEquipment360: function(assetId) {
    this.injectModalIfMissing();
    this.switchType('equipment', assetId || 'CRN-TEREX-DEMAG-250T');
    const modal = document.getElementById('modal-dossier-360');
    if (modal) modal.style.display = 'flex';
  },

  openWorkArea360: function(areaCode) {
    this.injectModalIfMissing();
    this.switchType('area', areaCode || 'AREA-01');
    const modal = document.getElementById('modal-dossier-360');
    if (modal) modal.style.display = 'flex';
  },

  openIncident360: function(incidentId) {
    this.injectModalIfMissing();
    this.switchType('incident', incidentId || 'INC-2026-001');
    const modal = document.getElementById('modal-dossier-360');
    if (modal) modal.style.display = 'flex';
  },

  openTbt360: function(tbtId) {
    this.injectModalIfMissing();
    this.switchType('tbt', tbtId || 'TBT-2026-0089');
    const modal = document.getElementById('modal-dossier-360');
    if (modal) modal.style.display = 'flex';
  },

  closeModal: function() {
    const modal = document.getElementById('modal-dossier-360');
    if (modal) modal.style.display = 'none';
  },

  printActiveDossier: function() {
    const orientation = this.printOrientation || 'portrait';
    
    // Inject dynamic @page orientation rule
    let dynamicStyle = document.getElementById('beds-dynamic-print-orientation');
    if (!dynamicStyle) {
      dynamicStyle = document.createElement('style');
      dynamicStyle.id = 'beds-dynamic-print-orientation';
      document.head.appendChild(dynamicStyle);
    }
    if (orientation === 'landscape') {
      dynamicStyle.innerHTML = `@media print { @page { size: A4 landscape !important; margin: 5mm 5mm !important; } }`;
      document.body.classList.add('print-landscape');
    } else {
      dynamicStyle.innerHTML = `@media print { @page { size: A4 portrait !important; margin: 4mm 6mm !important; } }`;
      document.body.classList.remove('print-landscape');
    }

    let stage = document.getElementById('bedsPrintStage');
    if (!stage) {
      stage = document.createElement('div');
      stage.id = 'bedsPrintStage';
      document.body.appendChild(stage);
    }

    const htmlContent = this.renderActiveDossier(true, orientation);
    stage.innerHTML = `<div class="beds-print-a4-sheet ${orientation === 'landscape' ? 'landscape-mode' : ''}">${htmlContent}</div>`;

    const cleanup = () => {
      stage.innerHTML = '';
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);

    window.print();
  },

  // ==========================================================================
  // DISPATCHER
  // ==========================================================================
  renderActiveDossier: function(isPrint, orientation) {
    if (this.activeType === 'workforce') return this.renderWorkforceDossier(this.activeId, isPrint, orientation);
    if (this.activeType === 'permit') return this.renderPermitDossier(this.activeId, isPrint, orientation);
    if (this.activeType === 'equipment') return this.renderEquipmentDossier(this.activeId, isPrint, orientation);
    if (this.activeType === 'area') return this.renderWorkAreaDossier(this.activeId, isPrint, orientation);
    if (this.activeType === 'incident') return this.renderIncidentDossier(this.activeId, isPrint, orientation);
    if (this.activeType === 'tbt') return this.renderTbtDossier(this.activeId, isPrint, orientation);
    return `<div style="padding: 20px; text-align: center;">Dossier not found.</div>`;
  },

  // ==========================================================================
  // 1. WORKFORCE DOSSIER RENDERER (1-PAGE A4)
  // ==========================================================================
  renderWorkforceDossier: function(empId, isPrint, orientation) {
    const e = WORKFORCE_360_DIRECTORY.find(x => x.empId === empId) || WORKFORCE_360_DIRECTORY[0];
    const isLand = orientation === 'landscape';

    return `
      <div class="dossier-sheet-root ${isLand ? 'land-layout' : 'port-layout'}" style="font-family: Arial, sans-serif; color: #0F172A; line-height: 1.25; font-size: ${isLand ? '7.5pt' : '8pt'};">
        <!-- Header Banner -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0097B2; padding-bottom: 4px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/images/balsons-logo.png" style="height: 26px; object-fit: contain;">
            <div>
              <div style="font-size: 11pt; font-weight: 900; letter-spacing: 0.5px; color: #000000;">BALSONS HEAVY LIFT & SHIFT • 360° WORKFORCE DOSSIER</div>
              <div style="font-size: 7pt; color: #475569; font-weight: 700;">JTRWF Project Khordha • Tri-Portal Verified Record • Rev V2.0</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="background: #0097B2; color: #FFFFFF; font-weight: 900; padding: 2px 8px; border-radius: 3px; font-size: 8pt;">${e.empId}</span>
            <div style="font-size: 6.5pt; color: #059669; font-weight: 800; margin-top: 2px;">🟢 100% TRI-PORTAL SYNCED</div>
          </div>
        </div>

        <!-- Layout Grid -->
        <div style="display: grid; grid-template-columns: ${isLand ? '1fr 1fr 1fr' : '1.1fr 1fr'}; gap: 6px;">
          <!-- Col 1: Bio & HR Identity -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 5px;">
              <img src="${e.photo}" style="width: 52px; height: 58px; object-fit: cover; border-radius: 4px; border: 1.5px solid #0097B2;">
              <div>
                <div style="font-size: 10pt; font-weight: 900; color: #000000;">${e.name}</div>
                <div style="font-size: 7.5pt; font-weight: 700; color: #0097B2;">${e.trade}</div>
                <div style="font-size: 7pt; color: #475569;">Blood: <strong style="color: #DC2626;">${e.bloodGroup}</strong> | Age: <strong>${e.age} Yrs</strong></div>
              </div>
            </div>
            <div style="font-size: 7.5pt; font-weight: 800; color: #0097B2; margin-bottom: 3px;">1. HR & ONBOARDING PILLAR</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 40%; color: #64748B;">Father's Name:</td><td><strong>${e.father}</strong></td></tr>
              <tr><td style="color: #64748B;">Mobile / Contact:</td><td><strong>${e.mobile}</strong></td></tr>
              <tr><td style="color: #64748B;">Emergency Contact:</td><td><strong style="color: #DC2626;">${e.emergencyContact}</strong></td></tr>
              <tr><td style="color: #64748B;">Aadhaar / PAN:</td><td><strong>${e.aadhaar} / ${e.pan}</strong></td></tr>
              <tr><td style="color: #64748B;">Police Clearance:</td><td><strong style="color: #059669;">${e.policeClearance}</strong></td></tr>
              <tr><td style="color: #64748B;">PF UAN / ESIC:</td><td><strong>${e.pfUan} / ${e.esicIp}</strong></td></tr>
              <tr><td style="color: #64748B;">Wage Classification:</td><td><strong>${e.wageDisplay}</strong></td></tr>
            </table>
          </div>

          <!-- Col 2: Safety & Statutory Compliance -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #059669; margin-bottom: 3px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 3px;">
              2. SAFETY MANAGER & STATUTORY FITNESS PILLAR
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 42%; color: #64748B;">Safety Induction No:</td><td><strong>${e.inductionId}</strong></td></tr>
              <tr><td style="color: #64748B;">Form 31 Certificate:</td><td><strong style="color: #059669;">CERTIFIED VALID</strong></td></tr>
              <tr><td style="color: #64748B;">Medical Exam Status:</td><td><strong style="color: #059669;">${e.medicalFitness}</strong></td></tr>
              <tr><td style="color: #64748B;">Induction Validity:</td><td><strong>Till ${e.inductionValidUntil}</strong></td></tr>
              <tr><td style="color: #64748B;">TBTs Attended:</td><td><strong style="color: #0097B2;">${e.tbtAttendedCount} Briefings</strong></td></tr>
              <tr><td style="color: #64748B;">Special Credentials:</td><td><strong>${e.specialCertifications.join(', ')}</strong></td></tr>
              <tr><td style="color: #64748B;">Safety Track Record:</td><td><strong style="color: #059669;">${e.incidentHistory}</strong></td></tr>
            </table>

            <div style="margin-top: 5px; padding-top: 4px; border-top: 1px dashed #CBD5E1;">
              <div style="font-size: 7pt; font-weight: 800; color: #D97706;">ACTIVE PERMIT-TO-WORK (PTW) LINK:</div>
              <div style="font-size: 7pt; font-family: monospace; font-weight: 800; color: #000000;">${e.activePermitId}</div>
              <div style="font-size: 6.5pt; color: #475569;">${e.activePermitDesc}</div>
            </div>
          </div>

          <!-- Col 3: Gate Access & Security Radar -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC; ${isLand ? '' : 'grid-column: span 2;'}">
            <div style="font-size: 7.5pt; font-weight: 800; color: #1E293B; margin-bottom: 3px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 3px;">
              3. GATE ENTRY & BIOMETRIC ACCESS PILLAR
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 7pt;">
              <div>
                <div>Gate Pass ID: <strong>${e.gatePassId}</strong></div>
                <div>Access Decision: <strong style="color: #059669;">${e.gateAccessDecision}</strong></div>
                <div>Turnstiles: <strong>${e.turnstileStatus}</strong></div>
              </div>
              <div>
                <div>Current Muster: <strong style="color: #059669;">${e.currentMuster}</strong></div>
                <div>Tagged Tools: <strong>${e.taggedEquipment.slice(0, 2).join('; ')}</strong></div>
                <div>Authorized Areas: <strong>${e.authorizedAreas.join('; ')}</strong></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sign-Off Footer -->
        <div style="margin-top: 6px; padding-top: 4px; border-top: 1.5px solid #0097B2; display: flex; justify-content: space-between; align-items: flex-end; font-size: 6.5pt;">
          <div>
            <div>Audit Hash: <span style="font-family: monospace;">${e.syncHash}</span></div>
            <div>Generated: <strong>${new Date().toLocaleString()}</strong> | Official BALSONS Statutory Record</div>
          </div>
          <div style="display: flex; gap: 24px; text-align: center;">
            <div><div style="border-bottom: 1px solid #000000; width: 85px; margin-bottom: 1px;">&nbsp;</div>Safety Officer</div>
            <div><div style="border-bottom: 1px solid #000000; width: 85px; margin-bottom: 1px;">&nbsp;</div>HR Compliance Head</div>
            <div><div style="border-bottom: 1px solid #000000; width: 85px; margin-bottom: 1px;">&nbsp;</div>Site Security Chief</div>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // 2. PERMIT 360° DOSSIER RENDERER (1-PAGE A4)
  // ==========================================================================
  renderPermitDossier: function(permitId, isPrint, orientation) {
    const p = PERMIT_360_DIRECTORY.find(x => x.permitId === permitId) || PERMIT_360_DIRECTORY[0];
    const isLand = orientation === 'landscape';

    return `
      <div class="dossier-sheet-root ${isLand ? 'land-layout' : 'port-layout'}" style="font-family: Arial, sans-serif; color: #0F172A; line-height: 1.25; font-size: ${isLand ? '7.5pt' : '8pt'};">
        <!-- Header Banner -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid ${p.colorKey}; padding-bottom: 4px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/images/balsons-logo.png" style="height: 26px; object-fit: contain;">
            <div>
              <div style="font-size: 11pt; font-weight: 900; color: #000000;">${p.title}</div>
              <div style="font-size: 7pt; color: #475569; font-weight: 700;">JTRWF Project Khordha • Permit 360° Comprehensive Dossier • Type ${p.typeNum} of 3</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="background: ${p.colorKey}; color: #FFFFFF; font-weight: 900; padding: 2px 8px; border-radius: 3px; font-size: 8pt; font-family: monospace;">${p.permitId}</span>
            <div style="font-size: 6.5pt; font-weight: 800; color: ${p.colorKey}; margin-top: 2px;">${p.status}</div>
          </div>
        </div>

        <!-- 2 or 3 Column Grid -->
        <div style="display: grid; grid-template-columns: ${isLand ? '1fr 1fr 1fr' : '1fr 1fr'}; gap: 6px;">
          <!-- Section 1: Job & Location -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: ${p.colorKey}; margin-bottom: 4px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              A. PERMIT & LOCATION PROFILE
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 38%; color: #64748B;">Work Area:</td><td><strong>${p.workArea}</strong></td></tr>
              <tr><td style="color: #64748B;">Exact Location:</td><td><strong>${p.exactLocation}</strong></td></tr>
              <tr><td style="color: #64748B;">Shift / Crew Size:</td><td><strong>${p.shift} / ${p.crewSize} Persons</strong></td></tr>
              <tr><td style="color: #64748B;">Supervisor:</td><td><strong>${p.supervisor}</strong></td></tr>
              <tr><td style="color: #64748B;">Contractor:</td><td><strong>${p.contractor}</strong></td></tr>
              <tr><td style="color: #64748B;">Validity Window:</td><td><strong style="color: #059669;">${p.validFrom} to ${p.validUntil}</strong></td></tr>
              <tr><td style="color: #64748B;">Decision:</td><td><strong style="color: #059669;">${p.decision}</strong></td></tr>
            </table>
            <div style="margin-top: 4px; font-size: 6.8pt; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 4px; border-radius: 3px;">
              <strong style="color: #334155;">Task Description:</strong> ${p.workDescription}
            </div>
          </div>

          <!-- Section 2: Technical, JSA & Isolation -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: ${p.colorKey}; margin-bottom: 4px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              B. ISOLATION, PPE & EMERGENCY
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 40%; color: #64748B;">Equipment / Asset:</td><td><strong>${p.equipmentAsset}</strong></td></tr>
              <tr><td style="color: #64748B;">Approved JSA Ref:</td><td><strong>${p.jsaRef}</strong></td></tr>
              <tr><td style="color: #64748B;">LOTO Lock Nos:</td><td><strong style="color: #DC2626;">${p.isolationNos}</strong></td></tr>
              <tr><td style="color: #64748B;">Isolation Verifier:</td><td><strong>${p.verifiedBy}</strong></td></tr>
              <tr><td style="color: #64748B;">Emergency Contact:</td><td><strong style="color: #DC2626;">${p.emergencyContact}</strong></td></tr>
              <tr><td style="color: #64748B;">Muster Station:</td><td><strong style="color: #059669;">${p.musterPoint}</strong></td></tr>
              <tr><td style="color: #64748B;">Mandatory PPE:</td><td><strong>${p.ppe.join(', ')}</strong></td></tr>
            </table>
            <div style="margin-top: 4px; font-size: 6.8pt; background: #FFFBEB; border: 1px solid #FCD34D; padding: 4px; border-radius: 3px;">
              <strong style="color: #B45309;">Special Restrictions:</strong> ${p.specialConditions}
            </div>
          </div>

          <!-- Section 3: Briefed Crew Register -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC; ${isLand ? '' : 'grid-column: span 2;'}">
            <div style="font-size: 7.5pt; font-weight: 800; color: #1E293B; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>C. BRIEFED WORKFORCE REGISTER (TOOLBOX TALK ACKNOWLEDGEMENT)</span>
              <span style="color: #059669; font-weight: 700;">6 of 6 Signed</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 6.8pt; background: #FFFFFF; border: 1px solid #CBD5E1;">
              <thead>
                <tr style="background: #F1F5F9; border-bottom: 1px solid #CBD5E1; text-align: left;">
                  <th style="padding: 2px 4px; width: 5%;">#</th>
                  <th style="padding: 2px 4px; width: 28%;">Employee Name</th>
                  <th style="padding: 2px 4px; width: 18%;">Employee ID</th>
                  <th style="padding: 2px 4px; width: 25%;">Trade / Designation</th>
                  <th style="padding: 2px 4px; width: 12%;">Signature</th>
                  <th style="padding: 2px 4px; width: 12%;">Ack. Time</th>
                </tr>
              </thead>
              <tbody>
                ${p.crewRoll.map(c => `
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 1.5px 4px; font-weight: 700;">${c.no}</td>
                    <td style="padding: 1.5px 4px; font-weight: 700; color: #000000;">${c.name}</td>
                    <td style="padding: 1.5px 4px; font-family: monospace;">${c.empId}</td>
                    <td style="padding: 1.5px 4px;">${c.trade}</td>
                    <td style="padding: 1.5px 4px; color: #059669; font-weight: 700;">✓ ${c.sig}</td>
                    <td style="padding: 1.5px 4px;">${c.time}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4-Column Multi-Tier Sign-Off Strip -->
        <div style="margin-top: 6px; border: 1px solid #CBD5E1; border-radius: 4px; padding: 4px 6px; background: #F8FAFC;">
          <div style="font-size: 7pt; font-weight: 800; color: #1E293B; margin-bottom: 2px;">D. 4-TIER STATUTORY AUTHORIZATION AUDIT TRAIL</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 4px; font-size: 6.5pt; text-align: center;">
            <div style="border-right: 1px dashed #CBD5E1; padding-right: 4px;">
              <div style="color: #64748B;">1. Work Supervisor</div>
              <strong style="color: #000000;">${p.signOffs.requester.name}</strong>
              <div style="color: #059669;">✓ Approved ${p.signOffs.requester.time.slice(11)}</div>
            </div>
            <div style="border-right: 1px dashed #CBD5E1; padding-right: 4px;">
              <div style="color: #64748B;">2. Safety Officer</div>
              <strong style="color: #000000;">${p.signOffs.safetyOfficer.name}</strong>
              <div style="color: #059669;">✓ Verified ${p.signOffs.safetyOfficer.time.slice(11)}</div>
            </div>
            <div style="border-right: 1px dashed #CBD5E1; padding-right: 4px;">
              <div style="color: #64748B;">3. Site Manager</div>
              <strong style="color: #000000;">${p.signOffs.approver.name}</strong>
              <div style="color: #059669;">✓ Cleared ${p.signOffs.approver.time.slice(11)}</div>
            </div>
            <div>
              <div style="color: #64748B;">4. Permit Issuer</div>
              <strong style="color: #000000;">${p.signOffs.issuer.name}</strong>
              <div style="color: #059669;">✓ Issued ${p.signOffs.issuer.time.slice(11)}</div>
            </div>
          </div>
        </div>

        <div style="margin-top: 4px; font-size: 6pt; color: #64748B; text-align: center;">
          Document standard: ${p.docNo} • Controlled JTRWF Site Safety Record • EXACT 1-PAGE A4 CALIBRATION
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // 3. EQUIPMENT & CRANES 360° DOSSIER RENDERER (1-PAGE A4)
  // ==========================================================================
  renderEquipmentDossier: function(assetId, isPrint, orientation) {
    const eq = EQUIPMENT_360_DIRECTORY.find(x => x.assetId === assetId) || EQUIPMENT_360_DIRECTORY[0];
    const isLand = orientation === 'landscape';

    return `
      <div class="dossier-sheet-root ${isLand ? 'land-layout' : 'port-layout'}" style="font-family: Arial, sans-serif; color: #0F172A; line-height: 1.25; font-size: ${isLand ? '7.5pt' : '8pt'};">
        <!-- Header Banner -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #0097B2; padding-bottom: 4px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/images/balsons-logo.png" style="height: 26px; object-fit: contain;">
            <div>
              <div style="font-size: 11pt; font-weight: 900; color: #000000;">360° HEAVY EQUIPMENT & CRANE DOSSIER</div>
              <div style="font-size: 7pt; color: #475569; font-weight: 700;">${eq.name} • SWL: ${eq.swl} • ${eq.owner}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="background: #0097B2; color: #FFFFFF; font-weight: 900; padding: 2px 8px; border-radius: 3px; font-size: 8pt; font-family: monospace;">${eq.assetId}</span>
            <div style="font-size: 6.5pt; font-weight: 800; color: #059669; margin-top: 2px;">🟢 ${eq.status}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: ${isLand ? '1fr 1fr 1fr' : '1fr 1fr'}; gap: 6px;">
          <!-- Card 1: Technical & Rigging Specifications -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #0097B2; margin-bottom: 4px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              1. CRANE CAPACITY & TECHNICAL PARAMETERS
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 44%; color: #64748B;">Safe Working Load (SWL):</td><td><strong style="color: #000000; font-size: 8pt;">${eq.swl}</strong></td></tr>
              <tr><td style="color: #64748B;">Main Boom Length:</td><td><strong>${eq.boomLength}</strong></td></tr>
              <tr><td style="color: #64748B;">Working Radius:</td><td><strong>${eq.operatingRadius}</strong></td></tr>
              <tr><td style="color: #64748B;">Counterweight Stack:</td><td><strong>${eq.counterweight}</strong></td></tr>
              <tr><td style="color: #64748B;">Chassis / Serial No:</td><td><strong style="font-family: monospace;">${eq.chassisNo}</strong></td></tr>
              <tr><td style="color: #64748B;">RTO Registration:</td><td><strong>${eq.regNo}</strong></td></tr>
              <tr><td style="color: #64748B;">Ground Bearing Req:</td><td><strong style="color: #D97706;">${eq.groundBearingRequirement}</strong></td></tr>
            </table>
          </div>

          <!-- Card 2: Statutory Compliance & Form 11 -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #059669; margin-bottom: 4px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              2. STATUTORY FORM 11 & THIRD PARTY (TPI)
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 44%; color: #64748B;">Form 11 Cert No.:</td><td><strong style="color: #059669; font-size: 7.5pt;">${eq.form11CertNo}</strong></td></tr>
              <tr><td style="color: #64748B;">Certifying Authority:</td><td><strong>${eq.certifyingAuthority}</strong></td></tr>
              <tr><td style="color: #64748B;">Inspection Date:</td><td><strong>${eq.inspectionDate}</strong></td></tr>
              <tr><td style="color: #64748B;">Next Due / Validity:</td><td><strong style="color: #059669;">Valid Till ${eq.expiryDate}</strong></td></tr>
              <tr><td style="color: #64748B;">Wire Rope Cert:</td><td><strong>${eq.wireRopeCert}</strong></td></tr>
              <tr><td style="color: #64748B;">Load Cell Calibration:</td><td><strong style="color: #059669;">${eq.loadCellCalibration}</strong></td></tr>
              <tr><td style="color: #64748B;">Limit Switches (A2B):</td><td><strong style="color: #059669;">${eq.limitSwitchesStatus}</strong></td></tr>
            </table>
          </div>

          <!-- Card 3: Crew & Live Deployment -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC; ${isLand ? '' : 'grid-column: span 2;'}">
            <div style="font-size: 7.5pt; font-weight: 800; color: #1E293B; margin-bottom: 4px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              3. CERTIFIED CREW & LIVE OPERATIONS
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7pt;">
              <div>
                <div>Assigned Heavy Operator: <strong style="color: #000000;">${eq.assignedOperator}</strong></div>
                <div>Designated Signalman: <strong style="color: #000000;">${eq.assignedSignalman}</strong></div>
                <div>Last Lubrication & Greasing: <strong>${eq.lastLubeDate}</strong></div>
              </div>
              <div>
                <div>Active Permit Linked: <strong style="color: #D97706; font-family: monospace;">${eq.activePermitLinked}</strong></div>
                <div>Current Staging Location: <strong>${eq.currentLocation}</strong></div>
                <div>Pre-Operational Inspection: <strong style="color: #059669;">PASSED 100% CHECKLIST TODAY</strong></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Verification Sign-off -->
        <div style="margin-top: 6px; padding-top: 4px; border-top: 1.5px solid #0097B2; display: flex; justify-content: space-between; align-items: flex-end; font-size: 6.5pt;">
          <div>Equipment In-Charge: <strong>Debendra Nayak</strong> | Lead Rigging Superintendent: <strong>Ramesh Kumar</strong></div>
          <div style="text-align: right;">Form 11 Verified: <strong>Capt. R. K. Singh (Site Lead)</strong></div>
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // 4. WORK AREA 360° DOSSIER RENDERER (1-PAGE A4)
  // ==========================================================================
  renderWorkAreaDossier: function(areaCode, isPrint, orientation) {
    const a = WORKAREA_360_DIRECTORY.find(x => x.code === areaCode) || WORKAREA_360_DIRECTORY[0];
    const isLand = orientation === 'landscape';

    return `
      <div class="dossier-sheet-root ${isLand ? 'land-layout' : 'port-layout'}" style="font-family: Arial, sans-serif; color: #0F172A; line-height: 1.25; font-size: ${isLand ? '7.5pt' : '8pt'};">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #0097B2; padding-bottom: 4px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/images/balsons-logo.png" style="height: 26px; object-fit: contain;">
            <div>
              <div style="font-size: 11pt; font-weight: 900; color: #000000;">360° WORK AREA SAFETY & HAZARD DOSSIER</div>
              <div style="font-size: 7pt; color: #475569; font-weight: 700;">${a.name} • JTRWF Project Khordha</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="background: #0097B2; color: #FFFFFF; font-weight: 900; padding: 2px 8px; border-radius: 3px; font-size: 8pt; font-family: monospace;">${a.code}</span>
            <div style="font-size: 6.5pt; font-weight: 800; color: #D97706; margin-top: 2px;">⚡ ${a.riskLevel}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: ${isLand ? '1fr 1fr 1fr' : '1fr 1fr'}; gap: 6px;">
          <!-- Card 1: Operational Snapshot -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #0097B2; margin-bottom: 4px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              1. OPERATIONAL SNAPSHOT & SIMOPS
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 44%; color: #64748B;">Area In-Charge (HOD):</td><td><strong>${a.hod}</strong></td></tr>
              <tr><td style="color: #64748B;">Assigned Safety Officer:</td><td><strong>${a.safetyOfficer}</strong></td></tr>
              <tr><td style="color: #64748B;">Active Permits Today:</td><td><strong style="color: #059669; font-size: 8pt;">${a.activePermitsCount} Permits Active</strong></td></tr>
              <tr><td style="color: #64748B;">Headcount on Site:</td><td><strong>${a.workersOnSite} Inducted Workers</strong></td></tr>
              <tr><td style="color: #64748B;">LOTO Isolation Points:</td><td><strong>${a.lotoPoints} Tagged Lockout Points</strong></td></tr>
              <tr><td style="color: #64748B;">HSE Audit Score:</td><td><strong style="color: #059669;">${a.lastAuditScore}</strong></td></tr>
            </table>
          </div>

          <!-- Card 2: Emergency Readiness & Infrastructure -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #059669; margin-bottom: 4px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              2. EMERGENCY INFRASTRUCTURE & READINESS
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 44%; color: #64748B;">Muster Station:</td><td><strong style="color: #059669; font-size: 7.5pt;">${a.musterStation}</strong></td></tr>
              <tr><td style="color: #64748B;">Fire Hydrant Point:</td><td><strong>${a.fireHydrantPoint}</strong></td></tr>
              <tr><td style="color: #64748B;">First Aid Post:</td><td><strong>${a.firstAidBox}</strong></td></tr>
              <tr><td style="color: #64748B;">Emergency Eye Wash:</td><td><strong>${a.emergencyEyeWash}</strong></td></tr>
              <tr><td style="color: #64748B;">SIMOPS Protocol:</td><td><strong>${a.simopsStatus}</strong></td></tr>
            </table>
          </div>

          <!-- Card 3: Hazards & Active Permits -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC; ${isLand ? '' : 'grid-column: span 2;'}">
            <div style="font-size: 7.5pt; font-weight: 800; color: #1E293B; margin-bottom: 3px;">
              3. HAZARD PROFILE & ACTIVE PERMITS IN THIS AREA
            </div>
            <div style="font-size: 7pt; color: #334155; margin-bottom: 4px;">
              <strong>Key Hazard Profile:</strong> ${a.hazardProfile}
            </div>
            <div style="font-size: 7pt; color: #000000;">
              <strong>Active Permit References:</strong> ${a.activePermitIds.map(id => `<span style="background: #E2E8F0; padding: 1px 4px; border-radius: 3px; font-family: monospace; font-weight: 700; margin-right: 4px;">${id}</span>`).join('')}
            </div>
          </div>
        </div>

        <div style="margin-top: 6px; padding-top: 4px; border-top: 1.5px solid #0097B2; display: flex; justify-content: space-between; font-size: 6.5pt;">
          <div>Area Safety Officer: <strong>${a.safetyOfficer}</strong> | JTRWF Site Emergency Lead: <strong>Capt. R. K. Singh</strong></div>
          <div>Report Timestamp: <strong>${new Date().toLocaleString()}</strong></div>
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // 5. INCIDENT & CAPA 360° DOSSIER RENDERER (1-PAGE A4)
  // ==========================================================================
  renderIncidentDossier: function(incidentId, isPrint, orientation) {
    const inc = INCIDENT_360_DIRECTORY.find(x => x.incidentId === incidentId) || INCIDENT_360_DIRECTORY[0];
    const isLand = orientation === 'landscape';

    return `
      <div class="dossier-sheet-root ${isLand ? 'land-layout' : 'port-layout'}" style="font-family: Arial, sans-serif; color: #0F172A; line-height: 1.25; font-size: ${isLand ? '7.5pt' : '8pt'};">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #DC2626; padding-bottom: 4px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/images/balsons-logo.png" style="height: 26px; object-fit: contain;">
            <div>
              <div style="font-size: 11pt; font-weight: 900; color: #000000;">360° INCIDENT & CAPA INVESTIGATION DOSSIER</div>
              <div style="font-size: 7pt; color: #475569; font-weight: 700;">Ref: ${inc.refNo} • Classification: ${inc.classification}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="background: #DC2626; color: #FFFFFF; font-weight: 900; padding: 2px 8px; border-radius: 3px; font-size: 8pt; font-family: monospace;">${inc.incidentId}</span>
            <div style="font-size: 6.5pt; font-weight: 800; color: #059669; margin-top: 2px;">${inc.closeOutStatus}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: ${isLand ? '1.2fr 1fr' : '1fr 1fr'}; gap: 6px;">
          <!-- Card 1: Event Summary -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #DC2626; margin-bottom: 3px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              1. OCCURRENCE PARTICULARS & IMMEDIATE ACTION
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 38%; color: #64748B;">Date / Time:</td><td><strong>${inc.date} at ${inc.time}</strong></td></tr>
              <tr><td style="color: #64748B;">Work Area:</td><td><strong>${inc.workArea}</strong></td></tr>
              <tr><td style="color: #64748B;">Exact Location:</td><td><strong>${inc.exactLocation}</strong></td></tr>
              <tr><td style="color: #64748B;">Supervisor:</td><td><strong>${inc.supervisor}</strong></td></tr>
              <tr><td style="color: #64748B;">HSE Investigator:</td><td><strong>${inc.investigator}</strong></td></tr>
              <tr><td style="color: #64748B;">Injury / Damage:</td><td><strong style="color: #059669;">${inc.injuryDetails}</strong></td></tr>
            </table>
            <div style="margin-top: 4px; font-size: 6.8pt; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 4px; border-radius: 3px;">
              <strong>Incident Description:</strong> ${inc.summary}
            </div>
          </div>

          <!-- Card 2: 5-Why Root Cause -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #D97706; margin-bottom: 3px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              2. 5-WHY ROOT CAUSE ANALYSIS (RCA)
            </div>
            <div style="font-size: 6.8pt;">
              ${inc.fiveWhyAnalysis.map((w, idx) => `
                <div style="margin-bottom: 2px;">
                  <strong style="color: #0097B2;">Why ${idx+1}:</strong> ${w.why}<br>
                  <span style="color: #000000; padding-left: 8px;">↳ <em>${w.answer}</em></span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Card 3: CAPA Actions -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC; grid-column: span 2;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #059669; margin-bottom: 3px;">
              3. CORRECTIVE & PREVENTIVE ACTIONS (CAPA) REGISTER
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 6.8pt; background: #FFFFFF; border: 1px solid #CBD5E1;">
              <thead>
                <tr style="background: #F1F5F9; border-bottom: 1px solid #CBD5E1;">
                  <th style="padding: 2px 4px; text-align: left; width: 45%;">Action Description</th>
                  <th style="padding: 2px 4px; text-align: left; width: 20%;">Action Owner</th>
                  <th style="padding: 2px 4px; text-align: left; width: 15%;">Target Date</th>
                  <th style="padding: 2px 4px; text-align: left; width: 20%;">Status & Evidence</th>
                </tr>
              </thead>
              <tbody>
                ${inc.capaActions.map(c => `
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 2px 4px;"><strong>${c.action}</strong></td>
                    <td style="padding: 2px 4px;">${c.owner}</td>
                    <td style="padding: 2px 4px;">${c.targetDate}</td>
                    <td style="padding: 2px 4px; color: #059669; font-weight: 700;">${c.status}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div style="margin-top: 6px; padding-top: 4px; border-top: 1.5px solid #DC2626; display: flex; justify-content: space-between; font-size: 6.5pt;">
          <div>Investigator: <strong>${inc.investigator}</strong> | Site HSE Lead: <strong>Gajendra Rao</strong></div>
          <div>Statutory Status: <strong>Form 21 Audited • Zero Lost Time</strong></div>
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // 6. TOOLBOX TALK (TBT) 360° DOSSIER RENDERER (1-PAGE A4)
  // ==========================================================================
  renderTbtDossier: function(tbtId, isPrint, orientation) {
    const t = TBT_360_DIRECTORY.find(x => x.tbtId === tbtId) || TBT_360_DIRECTORY[0];
    const isLand = orientation === 'landscape';

    return `
      <div class="dossier-sheet-root ${isLand ? 'land-layout' : 'port-layout'}" style="font-family: Arial, sans-serif; color: #0F172A; line-height: 1.25; font-size: ${isLand ? '7.5pt' : '8pt'};">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #0097B2; padding-bottom: 4px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/images/balsons-logo.png" style="height: 26px; object-fit: contain;">
            <div>
              <div style="font-size: 11pt; font-weight: 900; color: #000000;">360° TOOLBOX TALK (TBT) BRIEFING & ATTENDANCE DOSSIER</div>
              <div style="font-size: 7pt; color: #475569; font-weight: 700;">${t.topic} • JTRWF Project Khordha</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="background: #0097B2; color: #FFFFFF; font-weight: 900; padding: 2px 8px; border-radius: 3px; font-size: 8pt; font-family: monospace;">${t.tbtId}</span>
            <div style="font-size: 6.5pt; font-weight: 800; color: #059669; margin-top: 2px;">🟢 ${t.complianceScore}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: ${isLand ? '1.1fr 1fr' : '1fr 1fr'}; gap: 6px;">
          <!-- Card 1: Briefing Summary -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #0097B2; margin-bottom: 3px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              1. SESSION PARTICULARS & TOPIC OVERVIEW
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt;">
              <tr><td style="width: 36%; color: #64748B;">Date / Time:</td><td><strong>${t.date} (${t.time})</strong></td></tr>
              <tr><td style="color: #64748B;">Work Area:</td><td><strong>${t.workArea}</strong></td></tr>
              <tr><td style="color: #64748B;">Linked Permit:</td><td><strong style="color: #D97706; font-family: monospace;">${t.linkedPermit}</strong></td></tr>
              <tr><td style="color: #64748B;">Conducted By:</td><td><strong>${t.conductedBy}</strong></td></tr>
              <tr><td style="color: #64748B;">HSE Observer:</td><td><strong>${t.hseObserver}</strong></td></tr>
              <tr><td style="color: #64748B;">Total Attendees:</td><td><strong style="color: #059669;">${t.totalAttendees} Workers</strong></td></tr>
            </table>
            <div style="margin-top: 4px; font-size: 6.8pt; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 4px; border-radius: 3px;">
              <strong>Topic Summary:</strong> ${t.briefingSummary}
            </div>
          </div>

          <!-- Card 2: Hazard Points -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #D97706; margin-bottom: 3px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 2px;">
              2. KEY HAZARDS & CONTROLS EMPHASIZED
            </div>
            <div style="font-size: 6.8pt;">
              ${t.keyHazardPoints.map(p => `
                <div style="margin-bottom: 3px; display: flex; gap: 4px;">
                  <span style="color: #D97706;">⚠️</span>
                  <span>${p}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Card 3: Attendance Roll -->
          <div style="border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px; background: #F8FAFC; grid-column: span 2;">
            <div style="font-size: 7.5pt; font-weight: 800; color: #059669; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>3. EMPLOYEE ATTENDANCE & INDIVIDUAL CONFIRMATION REGISTER</span>
              <span style="font-weight: 700;">100% Signed & Confirmed</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 6.8pt; background: #FFFFFF; border: 1px solid #CBD5E1;">
              <thead>
                <tr style="background: #F1F5F9; border-bottom: 1px solid #CBD5E1; text-align: left;">
                  <th style="padding: 2px 4px; width: 5%;">#</th>
                  <th style="padding: 2px 4px; width: 28%;">Employee Name</th>
                  <th style="padding: 2px 4px; width: 18%;">Employee ID</th>
                  <th style="padding: 2px 4px; width: 25%;">Trade / Designation</th>
                  <th style="padding: 2px 4px; width: 12%;">Signature</th>
                  <th style="padding: 2px 4px; width: 12%;">Time Logged</th>
                </tr>
              </thead>
              <tbody>
                ${t.attendees.map(a => `
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 1.5px 4px; font-weight: 700;">${a.no}</td>
                    <td style="padding: 1.5px 4px; font-weight: 700; color: #000000;">${a.name}</td>
                    <td style="padding: 1.5px 4px; font-family: monospace;">${a.empId}</td>
                    <td style="padding: 1.5px 4px;">${a.trade}</td>
                    <td style="padding: 1.5px 4px; color: #059669; font-weight: 700;">✓ ${a.sig}</td>
                    <td style="padding: 1.5px 4px;">${a.time}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div style="margin-top: 6px; padding-top: 4px; border-top: 1.5px solid #0097B2; display: flex; justify-content: space-between; font-size: 6.5pt;">
          <div>TBT Leader: <strong>${t.leaderSignOff}</strong> | HSE Witness: <strong>${t.hseSignOff}</strong></div>
          <div>Compliance: <strong>Statutory Shift Briefing Record</strong></div>
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // MODAL INJECTION & SETUP
  // ==========================================================================
  injectModalIfMissing: function() {
    if (document.getElementById('modal-dossier-360')) return;

    const modalHtml = `
      <div id="modal-dossier-360" class="beds-modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.65); z-index: 9999; align-items: center; justify-content: center; padding: 12px;">
        <div class="beds-modal-dialog" style="background: #FFFFFF; width: 960px; max-width: 96vw; max-height: 95vh; display: flex; flex-direction: column; border-radius: 8px; border: 1px solid #CBD5E1; box-shadow: 0 16px 36px rgba(0,0,0,0.3); overflow: hidden;">
          
          <!-- Modal Top Header Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; border-bottom: 2px solid #0097B2; padding: 10px 16px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🌐</span>
              <div>
                <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #0F172A;">
                  360° Safety & Operations Master Dossier Hub
                </h3>
                <div style="font-size: 10.5px; color: #64748B;">
                  JTRWF Khordha • Multi-Entity Comprehensive View & 1-Page A4 Printable
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <!-- Orientation Toggle in Modal -->
              <div style="display: inline-flex; align-items: center; background: #E2E8F0; border-radius: 4px; padding: 2px;">
                <button type="button" id="modal-dossier-orient-p" onclick="Balsons360Dossier.setPrintOrientation('portrait')" style="font-size: 11px; padding: 4px 8px; border: none; border-radius: 3px; font-weight: 700; cursor: pointer; background: #0097B2; color: #FFFFFF;" title="Portrait A4">
                  📄 Portrait
                </button>
                <button type="button" id="modal-dossier-orient-l" onclick="Balsons360Dossier.setPrintOrientation('landscape')" style="font-size: 11px; padding: 4px 8px; border: none; border-radius: 3px; font-weight: 700; cursor: pointer; background: transparent; color: #1E293B;" title="Landscape A4">
                  🔄 Landscape
                </button>
              </div>

              <!-- Entity Select Dropdown -->
              <select id="modalDossierEntitySelect" class="beds-select" style="font-size: 11.5px; padding: 4px 8px; font-weight: 700; max-width: 200px;" onchange="Balsons360Dossier.onSelectChange(this.value)">
              </select>

              <!-- Print 1-Page A4 Button -->
              <button type="button" class="beds-btn beds-btn-sm" style="background: #059669; color: #FFFFFF; font-weight: 800; padding: 5px 12px; border: none; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;" onclick="Balsons360Dossier.printActiveDossier()">
                🖨️ Print Dossier (A4)
              </button>

              <button type="button" class="beds-btn beds-btn-sm" style="background: #E2E8F0; color: #1E293B; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; font-weight: 700;" onclick="Balsons360Dossier.closeModal()">
                ✕ Close
              </button>
            </div>
          </div>

          <!-- Category Navigation Tabs -->
          <div style="display: flex; gap: 6px; padding: 8px 16px; background: #FFFFFF; border-bottom: 1px solid #E2E8F0; overflow-x: auto;">
            <button id="tab-dossier-workforce" class="beds-btn beds-btn-xs" style="padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;" onclick="Balsons360Dossier.switchType('workforce')">
              👷 Workforce 360°
            </button>
            <button id="tab-dossier-permit" class="beds-btn beds-btn-xs" style="padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;" onclick="Balsons360Dossier.switchType('permit')">
              📋 Permits (PTW) 360°
            </button>
            <button id="tab-dossier-equipment" class="beds-btn beds-btn-xs" style="padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;" onclick="Balsons360Dossier.switchType('equipment')">
              🏗️ Equipment & Cranes 360°
            </button>
            <button id="tab-dossier-area" class="beds-btn beds-btn-xs" style="padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;" onclick="Balsons360Dossier.switchType('area')">
              🏭 Work Areas 360°
            </button>
            <button id="tab-dossier-incident" class="beds-btn beds-btn-xs" style="padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;" onclick="Balsons360Dossier.switchType('incident')">
              ⚠️ Incidents & CAPA 360°
            </button>
            <button id="tab-dossier-tbt" class="beds-btn beds-btn-xs" style="padding: 5px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;" onclick="Balsons360Dossier.switchType('tbt')">
              🗣️ Toolbox Talks (TBT) 360°
            </button>
          </div>

          <!-- Modal Scrollable Content -->
          <div id="dossier-360-modal-content" style="padding: 14px 16px; overflow-y: auto; flex: 1; background: #F8FAFC;">
            <!-- Injected dynamically via renderActiveDossier -->
          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }
};

// Global Expose
window.WORKFORCE_360_DIRECTORY = WORKFORCE_360_DIRECTORY;
window.PERMIT_360_DIRECTORY = PERMIT_360_DIRECTORY;
window.EQUIPMENT_360_DIRECTORY = EQUIPMENT_360_DIRECTORY;
window.WORKAREA_360_DIRECTORY = WORKAREA_360_DIRECTORY;
window.INCIDENT_360_DIRECTORY = INCIDENT_360_DIRECTORY;
window.TBT_360_DIRECTORY = TBT_360_DIRECTORY;
window.Balsons360Dossier = Balsons360Dossier;

// Compatibility aliases
window.print360Dossier = function(id) {
  if (window.Balsons360Dossier) {
    if (id && id.startsWith('EMP-')) Balsons360Dossier.switchType('workforce', id);
    else if (id && id.startsWith('PTW-')) Balsons360Dossier.switchType('permit', id);
    else if (id && id.startsWith('CRN-')) Balsons360Dossier.switchType('equipment', id);
    else if (id && id.startsWith('AREA-')) Balsons360Dossier.switchType('area', id);
    else if (id && id.startsWith('INC-')) Balsons360Dossier.switchType('incident', id);
    else if (id && id.startsWith('TBT-')) Balsons360Dossier.switchType('tbt', id);
    Balsons360Dossier.printActiveDossier();
  } else {
    window.print();
  }
};
