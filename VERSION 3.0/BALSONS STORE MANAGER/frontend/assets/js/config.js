/**
 * BALSONS STORE MANAGER - CONFIGURATION & CONSTANTS
 * Baseline: SAM-2026 & BEDS V1.0
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 * Operating Scope: Single-Project Master Store & Heavy Rigging Inventory
 */

const BALSONS_STORE_CONFIG = {
  PROJECT_ID: 'PRJ-JTRWF-SCHULER',
  PORTAL_NAME: 'BALSONS Store Manager',
  SYSTEM_TITLE: 'Store & Heavy Rigging Inventory System',
  PROJECT_NAME: 'Jupiter Tatravagonka Railwheel Factory (JTRWF)',
  CLIENT_NAME: 'Jupiter Tatravagonka Railwheel Factory Pvt. Ltd.',
  CONTRACTOR_NAME: 'BALSONS HEAVY LIFT & SHIFT',
  LOCATION: 'Khordha, Odisha, India',
  VERSION: '1.0.0-store-master',
  ENV: 'production',

  // Dedicated Store Master Google Sheet Database Reference
  SPREADSHEET_ID: '1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ',
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ/edit',

  // Google Apps Script Dedicated Store Gateway Endpoint
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyT6wmujgCq92wK1qUtiZLCTiajMfD8gXlmAoz1iJwDE92JStSTt0o80QX-7pRgI27u/exec',

  STORAGE_KEYS: {
    TOOLS: 'balsons_store_tools_v1',
    TRANSACTIONS: 'balsons_store_tx_v1',
    RECEIPTS: 'balsons_store_grn_v1',
    QUARANTINE: 'balsons_store_quarantine_v1',
    PROCUREMENT: 'balsons_store_pr_v1',
    VENDORS: 'balsons_store_vendors_v1',
    SESSION: 'balsons_store_session',
    THEME: 'beds_theme_preference',
    LANG: 'balsons_store_lang'
  },

  // Locked 264 Tool Baseline Categories
  SECTIONS: [
    { code: 'LF', name: 'Lifting Equipment & Rigging Tackles', count: 41, icon: '🏗️', description: 'Hydraulic jacks, slings, shackles, chain blocks, lever hoists' },
    { code: 'PT', name: 'Power Tools & Machinery', count: 25, icon: '⚡', description: 'Magnetic drills, angle grinders, impact wrenches, multipliers' },
    { code: 'MT', name: 'Measuring & Calibration Tools', count: 13, icon: '📏', description: 'Torque wrenches, laser distance meters, dial gauges, levels' },
    { code: 'HF', name: 'Hand Tools, Hardware & Fasteners', count: 155, icon: '🔧', description: 'Heavy ring spanners, sloggers, socket sets, punches, pry bars' },
    { code: 'CC', name: 'Chemicals, Lubricants & Consumables', count: 6, icon: '🛢️', description: 'Hydraulic oil, grease, penetrating fluid, wire dressing' },
    { code: 'ELE', name: 'Electrical Equipment & Cabling', count: 11, icon: '🔌', description: 'Distribution panels, heavy welding sets, industrial cables' },
    { code: 'SF', name: 'Safety & Fall Protection Gear', count: 9, icon: '🦺', description: 'Full body harnesses, fall arresters, tripods, rescue sets' },
    { code: 'HT', name: 'Heavy Tooling & Hydraulic Power Units', count: 4, icon: '⚙️', description: 'Electric hydraulic power packs, split manifolds, hoses' }
  ],

  // Operational Statuses
  OPERATIONAL_STATUSES: [
    { code: 'AVAILABLE', label: 'Available in Store', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' },
    { code: 'ISSUED', label: 'Issued on Site', color: '#0097B2', bg: 'rgba(0, 151, 178, 0.12)' },
    { code: 'UNDER_REPAIR', label: 'Under Maintenance', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
    { code: 'QUARANTINED', label: 'Quarantined / Defective', color: '#DC2626', bg: 'rgba(220, 38, 38, 0.12)' },
    { code: 'RETIRED', label: 'Retired / Scrap', color: '#64748B', bg: 'rgba(100, 116, 139, 0.12)' }
  ],

  // Statutory Compliance States (Due-soon threshold: 30 days)
  COMPLIANCE_STATES: {
    VALID: { label: 'Statutory Certified (Valid)', color: '#10B981', badge: 'status-success' },
    DUE_SOON: { label: 'Due in < 30 Days (Inspect Soon)', color: '#F59E0B', badge: 'status-warning' },
    OVERDUE: { label: 'Statutory Overdue (Hold Issue)', color: '#DC2626', badge: 'status-critical' },
    DATE_NOT_SET: { label: 'Date Not Set / Non-Lifting', color: '#64748B', badge: 'status-neutral' },
    NOT_APPLICABLE: { label: 'Not Applicable (Hand Tool)', color: '#94A3B8', badge: 'status-neutral' }
  },

  DEFAULT_STORE_BINS: ['BIN-A01', 'BIN-A02', 'BIN-B01', 'BIN-B02', 'BIN-C01', 'BIN-LIFT-01', 'YARD-HEAVY-01']
};

window.BALSONS_STORE_CONFIG = BALSONS_STORE_CONFIG;
