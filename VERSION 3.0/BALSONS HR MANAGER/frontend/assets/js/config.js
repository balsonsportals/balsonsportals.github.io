/**
 * BALSONS HR & PAYROLL MANAGER
 * Frontend Configuration & Environment Settings
 * Architecture: BALSONS-SAM-2026 (Locked)
 */

const BALSONS_HR_CONFIG = {
  PROJECT_ID: 'PRJ-BALSONS-HR-2026',
  PORTAL_NAME: 'BALSONS HR & Payroll Manager',
  VERSION: '1.0.0-foundation',
  ENV: 'production',
  SPREADSHEET_ID: '1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw',
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw/edit',
  
  // Google Apps Script Web App Deployment URL (Configurable upon deployment)
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyNreoI0QmRsiPgIBbJSh8YUjZCBa5f4E2UpsG3y03fcdcyUV_u76ZTCAcKfmAuXOWFmw/exec',
  
  // Transport protocol: text/plain POST (prevents CORS preflight failures)
  USE_TEXT_PLAIN_TRANSPORT: true,
  
  DEFAULT_ROLES: ['Super Admin', 'HR Head', 'Project Manager', 'Area Supervisor', 'Employee'],
  
  // Storage Keys
  STORAGE_SESSION_KEY: 'balsons_hr_session',
  STORAGE_THEME_KEY: 'beds_theme_preference'
};
