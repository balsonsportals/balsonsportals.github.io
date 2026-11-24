/**
 * BALSONS CONTROLLED 3-PERMIT MASTER SPECIFICATION (REV V2.0)
 * Exact Standard Derived From: BALSONS_JTRWF_THREE_TYPE_PERMIT_TO_WORK_SET_V2.0.pdf
 * PERMIT COLOUR KEY:
 *  1. GENERAL WORK (Green #059669) - Type 1 of 3
 *  2. HOT WORK (Red #DC2626) - Type 2 of 3
 *  3. SPECIAL / HIGH-RISK (Amber #D97706) - Type 3 of 3
 * STRICT COLOR RULE:
 *  Color is permitted ONLY in the header/footer color-code badges.
 *  All permit tables, checklist boxes, and section titles use clean monochrome/corporate slate.
 */

const BALSONS_EXACT_PTW_FORMS = [
  {
    code: 'PTW-GEN',
    typeNum: 1,
    title: 'GENERAL WORK PERMIT TO WORK',
    docNo: 'BAL-JTRWF-SAF-PTW-001-V2.0',
    colorKey: '#059669',
    colorBg: '#ECFDF5',
    category: 'GENERAL',
    categoryCheckbox: { gen: true, hot: false, spec: false },
    categoryNote: 'Use only where no high-risk activity is involved.',
    sections: {
      secC_block1_title: 'BASIC WORK CONTROLS',
      secC_block1: [
        'Approved JSA / method and sequence briefed to crew',
        'Work area inspected; access, barricades and signage controlled',
        'Tools / equipment inspected; guards and safe condition verified',
        'PPE, lighting, housekeeping and work environment suitable',
        'Nearby work / SIMOPS and pedestrian or vehicle routes controlled',
        'Emergency alarm, first aid, evacuation and muster point briefed'
      ],
      secC_block2_title: 'GENERAL TASK LIMIT',
      secC_block2: [
        'No hot work, confined-space entry, height work, live electrical work or critical lifting under this permit',
        'Stop and obtain the correct permit if scope or hazards change'
      ],
      secC_block3_title: 'ENERGY & EQUIPMENT',
      secC_block3: [
        'Equipment made safe; energy sources identified',
        'Required isolation / lockout completed and verified before access',
        'Stored energy, pressure, gravity or moving parts controlled',
        'Work area handed back safely after task completion'
      ],
      secC_block4_title: 'ENVIRONMENT & SITE INTERFACE',
      secC_block4: [
        'Spill / dust / noise controls and waste arrangements in place',
        'Weather and visibility suitable for the work',
        'Materials stored securely; escape routes kept clear',
        'All personnel know stop-work authority and reporting route'
      ]
    }
  },
  {
    code: 'PTW-HOT',
    typeNum: 2,
    title: 'HOT WORK PERMIT TO WORK',
    docNo: 'BAL-JTRWF-SAF-PTW-002-V2.0',
    colorKey: '#DC2626',
    colorBg: '#FEF2F2',
    category: 'HOT WORK',
    categoryCheckbox: { gen: false, hot: true, spec: false },
    categoryNote: 'If combined with height, confined space, lifting or other high hazard, use Special / High-Risk form.',
    sections: {
      secC_block1_title: 'FIRE PREVENTION',
      secC_block1: [
        'Combustibles removed or protected; openings / drains covered',
        'Welding screens, spark containment and barricades provided',
        'Suitable fire extinguishers present and accessible',
        'Trained fire watch assigned during work and after completion',
        'Nearby areas checked for spark / heat transfer and ignition risk'
      ],
      secC_block2_title: 'HOT WORK EQUIPMENT',
      secC_block2: [
        'Welding set, leads, clamps and grinders inspected',
        'Gas cylinders upright and secured; regulators / hoses sound',
        'Flashback arrestors fitted where required; leak check completed'
      ],
      secC_block3_title: 'ATMOSPHERE & WORK AREA',
      secC_block3: [
        'Gas test completed where required; readings within approved site limits',
        'Adequate ventilation and safe fume control provided',
        'No flammable atmosphere or uncontrolled combustible process nearby',
        'SIMOPS coordinated; work area access controlled'
      ],
      secC_block4_title: 'HOT WORK CREW',
      secC_block4: [
        'Competent welder / operator and fire watch identified',
        'Welding shield, gloves, eye / face and body PPE available',
        'Emergency response, fire alarm and communication confirmed',
        'Post-work fire inspection / watch period per site rule defined'
      ]
    }
  },
  {
    code: 'PTW-SPEC',
    typeNum: 3,
    title: 'SPECIAL / HIGH-RISK PERMIT TO WORK',
    docNo: 'BAL-JTRWF-SAF-PTW-003-V2.0',
    colorKey: '#D97706',
    colorBg: '#FFFBEB',
    category: 'SPECIAL / HIGH-RISK',
    categoryCheckbox: { gen: false, hot: false, spec: true },
    categoryNote: 'Tick every applicable task below; mark non-applicable modules N/A.',
    sections: {
      secC_block1_title: 'WORK AT HEIGHT',
      secC_block1: [
        'Platform / scaffold / ladder and access inspected',
        'Harness, anchor and fall protection verified; rescue plan ready',
        'Drop zone and falling-object controls established'
      ],
      secC_block2_title: 'CONFINED SPACE',
      secC_block2: [
        'Entry / connected services isolated; entry authorised',
        'Atmosphere tested; ventilation and communication arranged',
        'Attendant, entry log and rescue / retrieval readiness confirmed'
      ],
      secC_block3_title: 'LIFTING / RIGGING',
      secC_block3: [
        'Lift plan, load weight / C.G. and lift path confirmed',
        'Certified equipment / rigging and WLL checked; competent crew assigned',
        'Exclusion zone and ground / support condition verified'
      ],
      secC_block4_title: 'ELECTRICAL / LOTO',
      secC_block4: [
        'Authorised persons and isolation points identified',
        'Lock / tag applied; test-before-touch / zero energy verified',
        'Temporary supply, earthing and access barriers checked'
      ],
      secC_block5_title: 'MECHANICAL / HYDRAULIC / PNEUMATIC',
      secC_block5: [
        'All energy sources isolated; pressure / stored energy released',
        'Raised / moving parts blocked; zero-energy state verified',
        'Isolation register completed; locks controlled'
      ],
      secC_block6_title: 'HOT WORK AS PART OF HIGH-RISK TASK',
      secC_block6: [
        'Combustibles protected; extinguisher and fire watch in place',
        'Gas test / ventilation completed where required',
        'Fire watch and post-work inspection arranged'
      ],
      secC_block7_title: 'COMMON HIGH-RISK CONTROLS',
      secC_block7: [
        'Task-specific JSA / method and competent persons confirmed',
        'Rescue / emergency plan, communication and exclusion zones ready',
        'Adjacent work / SIMOPS coordinated; stop-work triggers briefed'
      ]
    }
  }
];

// Authentic Sample Data for One-Click Fill in Permit Studio
const BALSONS_PTW_SAMPLE_DATA = {
  'PTW-GEN': {
    permitNo: 'PTW-JTRWF-2026-GEN-0041',
    date: new Date().toISOString().split('T')[0],
    validFrom: '08:00 AM',
    validUntil: '08:00 PM',
    workArea: 'AXLE FORGING',
    location: 'Axle Forging Line, Finishing Bay, Roller Table RT-04',
    shift: 'Shift A',
    crewSize: '6 Persons',
    supervisor: 'Rajesh K. Sharma (Emp ID: EMP-2026-0012)',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    workDescription: 'Routine preventive maintenance, mechanical guide roller alignment, sensor cleaning and bolting torque check on Roller Table RT-04.',
    equipmentAsset: 'Roller Conveyor RT-04 / Hydraulic Drive HD-02',
    jsaRef: 'JSA-JTRWF-MNT-2026-018',
    isolationNos: 'LOTO-MCH-2026-0044 (Local Lockbox #3)',
    verifiedBy: 'Sanjay Mohanty (Mech Lead)',
    precautions: 'Area barricaded with yellow-black tape; pedestrian crossover walkway kept clear.',
    emergencyContact: '+91 94370 12345 (Site HSE Control Room)',
    musterPoint: 'Muster Point #2 (Axle Bay South)',
    tbtDate: new Date().toISOString().split('T')[0],
    tStart: '07:30 AM',
    tEnd: '07:50 AM',
    tLocation: 'Axle Forging Briefing Room 1',
    tConductedBy: 'Rajesh K. Sharma (Supervisor)',
    crew: [
      { no: 1, name: 'Ramesh Kumar', id: 'EMP-2026-0001', trade: 'Senior Rigger Lead', sig: 'Ramesh.K', time: '07:35 AM' },
      { no: 2, name: 'Sunil Swain', id: 'EMP-2026-0002', trade: 'Hydraulic Specialist', sig: 'S.Swain', time: '07:36 AM' },
      { no: 3, name: 'Dillip Biswal', id: 'EMP-2026-0003', trade: 'Mechanical Fitter', sig: 'D.Biswal', time: '07:37 AM' },
      { no: 4, name: 'Pradeep Rout', id: 'EMP-2026-0004', trade: 'Mechanical Fitter', sig: 'P.Rout', time: '07:38 AM' },
      { no: 5, name: 'Ashok Mohanty', id: 'EMP-2026-0005', trade: 'Rigging Helper', sig: 'Ashok.M', time: '07:40 AM' },
      { no: 6, name: 'Kailash Sahoo', id: 'EMP-2026-0006', trade: 'Safety Attendant', sig: 'K.Sahoo', time: '07:42 AM' }
    ],
    tLeader: 'Rajesh K. Sharma',
    supName: 'Rajesh K. Sharma',
    supDate: '2026-11-24 07:55 AM',
    soName: 'Bikram Patra (Site HSE Officer)',
    soDate: '2026-11-24 07:58 AM',
    smName: 'Gajendra Rao (HSE Lead / Site Manager)',
    smDate: '2026-11-24 08:00 AM',
    issuerName: 'Gajendra Rao',
    conditions: 'Maintain safe distance from overhead cranes; ensure goggles worn during cleaning.',
    closedBy: 'Rajesh K. Sharma',
    closureTime: '07:30 PM',
    isoReinstatedBy: 'Sanjay Mohanty',
    closureRemarks: 'All tools retrieved, guards refitted, worksite cleaned and handed back safe.'
  },
  'PTW-HOT': {
    permitNo: 'PTW-JTRWF-2026-HOT-0028',
    date: new Date().toISOString().split('T')[0],
    validFrom: '08:30 AM',
    validUntil: '04:30 PM',
    workArea: 'WHEEL FORGING',
    location: 'Wheel Forging Line, Quenching Tank Structure Grid #B-7',
    shift: 'Shift A',
    crewSize: '6 Persons',
    supervisor: 'Sanjay Panda (Emp ID: EMP-2026-0014)',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    workDescription: 'Structural SMAW welding and heavy seam grinding on reinforcement gussets of Quenching Tank support beam.',
    equipmentAsset: 'ESAB Mig-Tig Welder 400A / Bosch Heavy Angle Grinder 9-inch',
    jsaRef: 'JSA-JTRWF-HOT-2026-009',
    gasTestTime: '08:15 AM',
    gasO2: '20.9%',
    gasLEL: '0.0%',
    gasH2S: '0 ppm',
    gasCO: '0 ppm',
    gasOther: 'Nil',
    gasTestedBy: 'Bikram Patra (Safety Officer)',
    fireWatchName: 'Kailash Sahoo (Certified Watcher)',
    fireWatchStart: '08:30 AM',
    fireWatchUntil: '05:30 PM (60 min post-watch)',
    isolationNos: 'ISO-WHL-2026-0019 (Quenching Tank Power Locked)',
    verifiedBy: 'Bikram Patra (Safety Officer)',
    precautions: 'Fire blankets deployed; continuous fire watch assigned with 10kg DCP extinguisher.',
    emergencyContact: '+91 94370 12345 (Site HSE Control Room)',
    musterPoint: 'Muster Point #3 (Wheel Bay North)',
    tbtDate: new Date().toISOString().split('T')[0],
    tStart: '08:00 AM',
    tEnd: '08:20 AM',
    tLocation: 'Wheel Forging Tooling Area',
    tConductedBy: 'Sanjay Panda (Supervisor)',
    crew: [
      { no: 1, name: 'Sunil Swain', id: 'EMP-2026-0002', trade: 'Welder 6G / Specialist', sig: 'S.Swain', time: '08:05 AM' },
      { no: 2, name: 'Birendra Majhi', id: 'EMP-2026-0008', trade: 'Certified Welder 4G', sig: 'B.Majhi', time: '08:06 AM' },
      { no: 3, name: 'Kailash Sahoo', id: 'EMP-2026-0006', trade: 'Dedicated Fire Watch', sig: 'K.Sahoo', time: '08:08 AM' },
      { no: 4, name: 'Dillip Biswal', id: 'EMP-2026-0003', trade: 'Grinder / Fitter', sig: 'D.Biswal', time: '08:10 AM' },
      { no: 5, name: 'Pradeep Rout', id: 'EMP-2026-0004', trade: 'Mechanical Fitter', sig: 'P.Rout', time: '08:12 AM' },
      { no: 6, name: 'Ramesh Kumar', id: 'EMP-2026-0001', trade: 'Rigging Lead', sig: 'Ramesh.K', time: '08:15 AM' }
    ],
    tLeader: 'Sanjay Panda',
    supName: 'Sanjay Panda',
    supDate: '2026-11-24 08:22 AM',
    soName: 'Bikram Patra (Site HSE Officer)',
    soDate: '2026-11-24 08:25 AM',
    smName: 'Gajendra Rao (HSE Lead / Site Manager)',
    smDate: '2026-11-24 08:30 AM',
    issuerName: 'Gajendra Rao',
    conditions: 'Continuous fire watch mandatory; post-weld inspection 60 minutes after shutdown.',
    closedBy: 'Sanjay Panda',
    closureTime: '05:30 PM',
    isoReinstatedBy: 'Bikram Patra',
    closureRemarks: 'Welding completed, spark area inspected, zero embers, fire watch released at 17:30.'
  },
  'PTW-SPEC': {
    permitNo: 'PTW-JTRWF-2026-SPEC-0015',
    date: new Date().toISOString().split('T')[0],
    validFrom: '09:00 AM',
    validUntil: '05:00 PM',
    workArea: 'MACHINE SHOP',
    location: 'Machine Shop Bay 1, Schuler 1600T Press Foundation Pit',
    shift: 'Shift A',
    crewSize: '6 Persons',
    supervisor: 'Ramesh Kumar (Emp ID: EMP-2026-0001)',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    workDescription: 'Special / High-Risk Tandem Lifting & Rigging of Schuler 1600T Tie-Rod Beam (48 Tons) into foundation pit.',
    selectedTasks: { height: true, confined: false, lifting: true, electrical: true, mech: true, hot: false },
    equipmentAsset: 'Terex Demag AC250-1 (250T) & Kobelco CKE1800 (180T)',
    isolationNos: 'LOTO-ELEC-415V-0082 & LOTO-HYD-PRESS-0012',
    zeroEnergyVerifiedBy: 'Bikram Jena (Chief Electrical HT)',
    gasTestRef: 'GAS-CALIB-2026-102 (O2: 20.9%, LEL: 0%)',
    liftPlanRef: 'LIFT-PLAN-SCHULER-TANDEM-REV04 (Approved 2026-11-23)',
    precautions: 'Full exclusion zone 15m radius barricaded; outrigger steel spreader mats placed on tested 25T/m2 soil.',
    emergencyContact: '+91 94370 12345 (Site HSE Control Room)',
    musterPoint: 'Muster Point #1 (Main Engineering Gate)',
    tbtDate: new Date().toISOString().split('T')[0],
    tStart: '08:15 AM',
    tEnd: '08:45 AM',
    tLocation: 'Machine Shop Tooling Bay',
    tConductedBy: 'Ramesh Kumar (Rigger Lead)',
    crew: [
      { no: 1, name: 'Ramesh Kumar', id: 'EMP-2026-0001', trade: 'Senior Rigger Lead / Supervisor', sig: 'Ramesh.K', time: '08:20 AM' },
      { no: 2, name: 'Sunil Swain', id: 'EMP-2026-0002', trade: 'Hydraulic & Jacking Lead', sig: 'S.Swain', time: '08:22 AM' },
      { no: 3, name: 'Ajay Nayak', id: 'EMP-2026-0010', trade: 'Certified Heavy Crane Operator', sig: 'A.Nayak', time: '08:25 AM' },
      { no: 4, name: 'Dillip Biswal', id: 'EMP-2026-0003', trade: 'Certified Signalman / Banksman', sig: 'D.Biswal', time: '08:27 AM' },
      { no: 5, name: 'Pradeep Rout', id: 'EMP-2026-0004', trade: 'Height Rigging Specialist', sig: 'P.Rout', time: '08:30 AM' },
      { no: 6, name: 'Bikram Patra', id: 'EMP-2026-0015', trade: 'Safety Officer / Lift Watch', sig: 'B.Patra', time: '08:35 AM' }
    ],
    tLeader: 'Ramesh Kumar',
    supName: 'Ramesh Kumar',
    supDate: '2026-11-24 08:48 AM',
    soName: 'Bikram Patra (Site HSE Officer)',
    soDate: '2026-11-24 08:52 AM',
    smName: 'Gajendra Rao (HSE Lead / Site Manager)',
    smDate: '2026-11-24 08:58 AM',
    issuerName: 'Gajendra Rao',
    conditions: 'Wind speed must stay below 28 km/h; tag lines held by trained riggers; stop lift if visibility drops.',
    closedBy: 'Ramesh Kumar',
    closureTime: '04:55 PM',
    isoReinstatedBy: 'Bikram Jena',
    closureRemarks: 'Tie-rod beam landed on foundation soleplates safely. Cranes de-rigged and barricades cleared.'
  }
};

if (typeof window !== 'undefined') {
  window.BALSONS_EXACT_PTW_FORMS = BALSONS_EXACT_PTW_FORMS;
  window.BALSONS_PTW_SAMPLE_DATA = BALSONS_PTW_SAMPLE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BALSONS_EXACT_PTW_FORMS, BALSONS_PTW_SAMPLE_DATA };
}
