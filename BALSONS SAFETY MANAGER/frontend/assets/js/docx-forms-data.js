/**
 * BALSONS CONTROLLED 3-PERMIT MASTER SPECIFICATION (REV V2.0)
 * Exact Standard Derived From: BALSONS_JTRWF_GENERAL_WORK_PERMIT_GREEN_V2.0.pdf
 * PERMIT COLOUR KEY:
 *  1. GENERAL WORK (Green #059669) - Type 1 of 3
 *  2. HOT WORK (Red #DC2626) - Type 2 of 3
 *  3. SPECIAL / HIGH-RISK (Amber #D97706) - Type 3 of 3
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
    categoryNote: 'Mandatory for welding, cutting, grinding, heating, or flame-producing work.',
    sections: {
      secC_block1_title: 'BASIC WORK CONTROLS',
      secC_block1: [
        'Approved Hot Work JSA / method and fire risk plan briefed to crew',
        'Work area inspected; 10m-15m spark perimeter barricaded and marked',
        'Welding / grinding tools inspected; cables, ground clamps in safe condition',
        'Hot work PPE (welding hood, leather apron, fire-retardant gloves) worn',
        'Nearby combustible materials removed, covered, or shielded with fire blankets',
        'Emergency fire alarm, nearest fire extinguisher and muster point briefed'
      ],
      secC_block2_title: 'HOT WORK & FIRE CONTROLS',
      secC_block2: [
        'Combustibles removed or protected within 10m-15m radius of spark hazard',
        'Fire blankets / spark screens deployed around hot work boundary',
        'Charged fire extinguisher (10kg DCP / CO2) and dedicated fire watch assigned with whistle',
        'Gas cylinders upright, secured with chain, valve key fitted and flashback arrestors verified',
        'Atmospheric test verified safe: Flammable gas 0% LEL prior to strike',
        'Dedicated post-work fire watch sustained for minimum 30-60 minutes after extinguishing flame'
      ],
      secC_block3_title: 'ENERGY & EQUIPMENT',
      secC_block3: [
        'Equipment made safe; power supplies isolated or earthed',
        'Welding machine grounded to common plant earth point',
        'Gas hoses inspected, leak tested with soapy water, no cracks',
        'Work area handed back safe with hot slag cool to touch'
      ],
      secC_block4_title: 'ENVIRONMENT & SITE INTERFACE',
      secC_block4: [
        'Fume extraction / natural ventilation adequate for welders',
        'Weather and wind direction suitable; sparks contained from downwind bays',
        'Fire water connection and hydrant route unobstructed',
        'All personnel briefed on stop-work authority in case of spark escape'
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
    categoryNote: 'Mandatory for Height (>1.8m), Confined Space, Critical/Tandem Lifting, or Electrical LOTO.',
    sections: {
      secC_block1_title: 'BASIC WORK CONTROLS',
      secC_block1: [
        'Approved Critical JSA & Method Statement verified and briefed',
        'Work area fully barricaded (10m exclusion radius) with restricted access',
        'Specialized equipment, rigging tackle, gas detectors calibrated and tagged',
        'Full body harness, fall arrester, or escape BA checked by safety officer',
        'SIMOPS review completed with adjacent line supervisors',
        'Emergency response team, rescue plan and first-aid team alerted'
      ],
      secC_block2_title: 'SPECIAL / HIGH-RISK CONTROLS (TICK APPLICABLE MODULES)',
      secC_block2: [
        'HEIGHT WORK: Double lanyard harness 100% tied off to tested anchor (>22kN); scaffold tagged GREEN; rescue gear ready',
        'CONFINED SPACE: Gas test (O2 19.5-23.5%, LEL 0%, CO <25ppm, H2S <10ppm); forced ventilation; standby watcher at manway',
        'CRITICAL LIFTING: Approved lift plan; ground compaction / outrigger mats verified; certified rigger & single banksman',
        'ELECTRICAL LOTO: Lockout padlocks & danger tags applied; zero-energy verified with proven tester; Arc Flash PPE worn'
      ],
      secC_block3_title: 'ENERGY & EQUIPMENT',
      secC_block3: [
        'High voltage / high pressure / hydraulic systems de-energized and locked',
        'Mechanical chocks, locking pins and zero-potential verified',
        'Crane load cell, wire ropes and limit switches inspected',
        'Controlled de-isolation sequence documented before hand-back'
      ],
      secC_block4_title: 'ENVIRONMENT & SITE INTERFACE',
      secC_block4: [
        'Atmospheric monitoring continuous during high-risk task',
        'Wind speed < 32 km/h; lightning warning system monitored',
        'Emergency access pathways strictly clear of equipment and vehicles',
        'Absolute stop-work authority reinforced to all crew members'
      ]
    }
  }
];

const BALSONS_PTW_SAMPLE_DATA = {
  'PTW-GEN': {
    permitNo: 'PTW-JTRWF-2026-GEN-0041',
    date: '2026-11-24',
    validFrom: '08:00 AM',
    validUntil: '08:00 PM',
    workArea: 'AXLE FORGING',
    exactLocation: 'Axle Forging Line, Finishing Bay, Roller Table RT-04',
    shift: 'General / Shift A',
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
    tbtDate: '2026-11-24',
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
    conditions: 'Maintain safe distance from moving crane overhead; ensure safety goggles worn during cleaning.',
    closedBy: 'Rajesh K. Sharma',
    closureTime: '2026-11-24 07:30 PM',
    isoReinstatedBy: 'Sanjay Mohanty',
    closureRemarks: 'All tools retrieved, guards refitted, worksite cleaned and handed back in safe operating state.'
  },
  'PTW-HOT': {
    permitNo: 'PTW-JTRWF-2026-HOT-0028',
    date: '2026-11-24',
    validFrom: '08:30 AM',
    validUntil: '04:30 PM',
    workArea: 'WHEEL FORGING',
    exactLocation: 'Wheel Forging Bay, Quenching Tank Structure Reinforcement Grid #B-7',
    shift: 'Day Shift',
    crewSize: '4 Persons',
    supervisor: 'Sanjay Panda (Welding Supervisor)',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    workDescription: 'Structural hot work: SMAW welding and edge grinding of gusset plates on support steelwork of Quenching Tank Platform.',
    equipmentAsset: 'ESAB Mig-Tig Welder 400A / Bosch Heavy Angle Grinder 9-inch',
    jsaRef: 'JSA-JTRWF-HOT-2026-009',
    isolationNos: 'ISO-WHL-2026-0019 (Quenching Tank Power Locked)',
    verifiedBy: 'Bikram Patra (Safety Officer)',
    precautions: 'Fire blankets deployed; continuous fire watch assigned with 10kg DCP extinguisher.',
    emergencyContact: '+91 94370 12345 (Site HSE Control Room)',
    musterPoint: 'Muster Point #3 (Wheel Bay North)',
    tbtDate: '2026-11-24',
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
    conditions: 'Maintain fire watch during lunch break and for 45 minutes after final weld bead.',
    closedBy: 'Sanjay Panda',
    closureTime: '2026-11-24 05:15 PM',
    isoReinstatedBy: 'Bikram Patra',
    closureRemarks: 'Welding completed, 45-min fire watch verified cold to touch, slag swept, gas cylinders turned off.'
  },
  'PTW-SPEC': {
    permitNo: 'PTW-JTRWF-2026-SPEC-0015',
    date: '2026-11-24',
    validFrom: '09:00 AM',
    validUntil: '05:00 PM',
    workArea: 'MACHINE SHOP',
    exactLocation: 'Machine Shop Bay 1, Schuler 1600T Press Foundation Pit & Overhead Gantry Crane Rail',
    shift: 'Special Heavy Lift Window',
    crewSize: '6 Persons',
    supervisor: 'Ramesh Kumar (Senior Rigger Lead)',
    contractor: 'BALSONS HEAVY LIFT & SHIFT',
    workDescription: 'Critical tandem lift and rigging positioning of 1600T Schuler Press Upper Tie-Rod Beam (48T) at elevation 9.5m; working at height and tandem crane operation.',
    equipmentAsset: 'Terex Demag AC-250 (250T) + Kobelco CKE1800 (180T) Crane Duo / 100T Rigging Slings',
    jsaRef: 'JSA-JTRWF-LIFT-2026-002-CRITICAL',
    isolationNos: 'LOTO-GANTRY-2026-0007 (Overhead Power Rail 415V Locked)',
    verifiedBy: 'Gajendra Rao (HSE Lead)',
    precautions: 'Full exclusion zone 15m radius barricaded; outrigger steel spreader mats placed on tested 25T/m2 soil.',
    emergencyContact: '+91 94370 12345 (Site HSE Control Room)',
    musterPoint: 'Muster Point #1 (Main Engineering Gate)',
    tbtDate: '2026-11-24',
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
    closureTime: '2026-11-24 04:45 PM',
    isoReinstatedBy: 'Gajendra Rao',
    closureRemarks: 'Tie-rod beam landed smoothly on anchor pins, rigging released, cranes parked, gantry rail de-isolated.'
  }
};

// Global scope attachment
if (typeof window !== 'undefined') {
  window.BALSONS_EXACT_PTW_FORMS = BALSONS_EXACT_PTW_FORMS;
  window.BALSONS_PTW_SAMPLE_DATA = BALSONS_PTW_SAMPLE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BALSONS_EXACT_PTW_FORMS, BALSONS_PTW_SAMPLE_DATA };
}
