/**
 * BALSONS SAFETY PORTAL - FRONTEND CONFIGURATION
 * Baseline: SAM-2026 & BEDS V2.0
 * Reference Standard: BALSONS_JTRWF_GENERAL_WORK_PERMIT_GREEN_V2.0.pdf
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 * Version: 2.0.0 (3 Controlled V2.0 Permits Standard)
 */

const BALSONS_SAFETY_CONFIG = {
  PROJECT_ID: 'PRJ-JTRWF-SCHULER',
  PORTAL_NAME: 'BALSONS Safety Manager',
  PROJECT_NAME: 'Jupiter Tatravagonka Railwheel Factory (JTRWF)',
  CLIENT_NAME: 'Jupiter Tatravagonka Railwheel Factory Pvt. Ltd.',
  CONTRACTOR_NAME: 'BALSONS HEAVY LIFT & SHIFT',
  LOCATION: 'Khordha, Odisha, India',
  VERSION: '2.0.0-v2-three-permits',
  ENV: 'production',
  
  // Database Reference
  SPREADSHEET_ID: '1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0',
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0/edit',

  // Google Apps Script Web App Deployment URL
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwgutbfm18PJPhsj_3-0C9Kt5AeaLqvGzoP8RMPab6ESzfm5SBkEPf8YslN8tJhOZJL/exec',
  USE_TEXT_PLAIN_TRANSPORT: true,

  STORAGE_SESSION_KEY: 'balsons_safety_session',
  STORAGE_THEME_KEY: 'beds_theme_preference',
  STORAGE_LANG_KEY: 'balsons_safety_lang',

  WORK_AREAS: [
    { code: 'AREA-01', name: 'Axle Forging Line (Main Bay South)', hod: 'Rajesh K. Sharma', safetyOfficer: 'Bikram Patra' },
    { code: 'AREA-02', name: 'Wheel Forging Line (Main Bay North)', hod: 'Sanjay Panda', safetyOfficer: 'Bikram Patra' },
    { code: 'AREA-03', name: 'Machine Shop (Auxiliary Bay 1)', hod: 'Manoj Mohanty', safetyOfficer: 'Rakesh Swain' },
    { code: 'AREA-04', name: 'Die Shop & Heavy Tooling', hod: 'Ajay Verma', safetyOfficer: 'Rakesh Swain' },
    { code: 'AREA-05', name: 'Heavy Rigging Yard & Crane Bay', hod: 'Debendra Nayak', safetyOfficer: 'Bikram Patra' },
    { code: 'AREA-06', name: 'Substation & HT Utilities', hod: 'Pradeep Rout', safetyOfficer: 'Rakesh Swain' }
  ],

  /**
   * 3 Controlled Operational PTW Templates (V2.0 Standard)
   * Exact Match: BALSONS_JTRWF_GENERAL_WORK_PERMIT_GREEN_V2.0.pdf
   * PERMIT COLOUR KEY:
   *  1. GENERAL: Green (#059669)
   *  2. HOT WORK: Red (#DC2626)
   *  3. SPECIAL / HIGH-RISK: Amber/Gold (#D97706)
   */
  PTW_TEMPLATES: [
    {
      code: 'PTW-GEN',
      typeNum: 1,
      category: 'GENERAL',
      colorKey: '#059669',
      colorBg: '#ECFDF5',
      badgeClass: 'badge-general',
      docNo: 'BAL-JTRWF-SAF-PTW-001-V2.0',
      name: 'General Work Permit',
      title: 'GENERAL WORK PERMIT TO WORK',
      validity: 12,
      prerequisites: [
        'Approved JSA / method and sequence briefed to crew',
        'Work area inspected; access, barricades and signage controlled',
        'Tools / equipment inspected; guards and safe condition verified',
        'PPE, lighting, housekeeping and work environment suitable',
        'Nearby work / SIMOPS and pedestrian or vehicle routes controlled',
        'Emergency alarm, first aid, evacuation and muster point briefed',
        'No hot work, confined space, height work, electrical, or critical lifting under this permit',
        'Stop and obtain the correct permit if scope or hazards change',
        'Equipment made safe; energy sources identified and isolated',
        'All personnel know stop-work authority and reporting route'
      ]
    },
    {
      code: 'PTW-HOT',
      typeNum: 2,
      category: 'HOT WORK',
      colorKey: '#DC2626',
      colorBg: '#FEF2F2',
      badgeClass: 'badge-hotwork',
      docNo: 'BAL-JTRWF-SAF-PTW-002-V2.0',
      name: 'Hot Work Permit',
      title: 'HOT WORK PERMIT TO WORK',
      validity: 8,
      hasAtmosphericTest: true,
      prerequisites: [
        'Approved Hot Work JSA / fire risk assessment briefed to crew',
        'Combustibles cleared within 10m-15m radius or shielded with fire blankets',
        'Flammable atmosphere tested and verified 0% LEL prior to ignition',
        'Dedicated fire watch assigned with charged fire extinguisher (10kg DCP / CO2)',
        'Gas cylinders upright, secured with cylinder trolley, valve keys and flashback arrestors',
        'Welding leads, cables, and earthing clamp in safe condition',
        'Screens / spark containment blankets deployed to protect adjacent bays / SIMOPS',
        'Post-work fire watch sustained for minimum 30 to 60 minutes after flame extinguished',
        'Emergency alarm, nearest fire alarm call point and muster station briefed',
        'Stop-work authority briefed to all hot work operators'
      ]
    },
    {
      code: 'PTW-SPEC',
      typeNum: 3,
      category: 'SPECIAL / HIGH-RISK',
      colorKey: '#D97706',
      colorBg: '#FFFBEB',
      badgeClass: 'badge-special',
      docNo: 'BAL-JTRWF-SAF-PTW-003-V2.0',
      name: 'Special / High-Risk Permit',
      title: 'SPECIAL / HIGH-RISK PERMIT TO WORK',
      validity: 8,
      hasAtmosphericTest: true,
      hasIsolationRecord: true,
      hasLiftingRecord: true,
      prerequisites: [
        'Approved Critical JSA & Task Method Statement reviewed and briefed',
        'Working at Height: Full body harness 100% tied off, lifeline >22kN, scaffold green tagged',
        'Confined Space: Multi-gas calibrated test (O2 19.5-23.5%, LEL 0%), continuous forced ventilation, standby watcher',
        'Critical Lifting: Lift plan verified, SWL/boom radius checked, outriggers fully extended on mats',
        'Electrical LOTO: Padlocks and danger tags applied, zero-energy verified with proven tester',
        'Exclusion barricades (10m radius) and safety signage installed around danger zone',
        'Certified competent operators, riggers, watchers and supervisors assigned',
        'Rescue procedure, emergency escape apparatus and trained rescue team on standby',
        'SIMOPS coordination and adjacent equipment interlocks verified safe',
        'Personal stop-work authority acknowledged by every team member'
      ]
    }
  ]
};

// Freeze configuration for runtime protection
if (typeof Object.freeze === 'function') {
  Object.freeze(BALSONS_SAFETY_CONFIG);
}

// Global scope attachment
if (typeof window !== 'undefined') {
  window.BALSONS_SAFETY_CONFIG = BALSONS_SAFETY_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BALSONS_SAFETY_CONFIG;
}
