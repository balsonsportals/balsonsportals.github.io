/**
 * BALSONS ENTERPRISE ECOSYSTEM - DOCUMENT & GOOGLE DRIVE SYNC TEST SUITE
 * Architecture: BALSONS-BEDS-V1.2 / SAM-2026 Tier 4 Restricted Evidence Store
 * Root Drive Folder: 1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde
 */

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`  ✔ PASS: ${description}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${description}`);
    failed++;
  }
}

console.log('================================================================');
console.log('🧪 RUNNING BALSONS DOCUMENT & GOOGLE DRIVE SYNC TEST SUITE');
console.log('================================================================\n');

// ── TEST GROUP 1: Document Manager JS Mirror Integrity ────────────────────────
console.log('--- TEST GROUP 1: Document Manager JS Mirror Integrity ---');
const rootDocJsPath = 'assets/js/balsons-docs-manager.js';
assert('Root assets/js/balsons-docs-manager.js exists', fs.existsSync(rootDocJsPath));
const rootDocJs = fs.readFileSync(rootDocJsPath, 'utf8');

const mirrorPaths = [
  'BALSONS GATE ENTRY MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS OPERATIONS MANAGER/assets/js/balsons-docs-manager.js',
  'BALSONS PURCHASE MANAGER/assets/js/balsons-docs-manager.js',
  'BALSONS REPOTS PORTAL/assets/js/balsons-docs-manager.js',
  'BALSONS SAFETY MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS STORE MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS REPOTS PORTAL/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/balsons-docs-manager.js'
];

mirrorPaths.forEach((mPath, i) => {
  const exists = fs.existsSync(mPath);
  assert(`Mirror #${i + 1} exists: ${path.basename(path.dirname(mPath))}/${path.basename(mPath)}`, exists);
  if (exists) {
    const content = fs.readFileSync(mPath, 'utf8');
    assert(`Mirror #${i + 1} is byte-identical to root`, content === rootDocJs);
  }
});

// ── TEST GROUP 2: Google Drive Root & Subfolder Architecture ──────────────────
console.log('\n--- TEST GROUP 2: Google Drive Root & Subfolder Architecture ---');
const ROOT_DRIVE_ID = '1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde';
assert('Root Google Drive ID matches specifications (1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde)', rootDocJs.includes(ROOT_DRIVE_ID));

const requiredPortals = ['gate', 'hr', 'operations', 'purchase', 'safety', 'store', 'reports'];
requiredPortals.forEach(portal => {
  assert(`Portal '${portal}' configured in DRIVE_FOLDERS registry`, rootDocJs.includes(`'${portal}': {`));
  assert(`Portal '${portal}' has statutory documents in DEFAULT_DOCUMENTS`, rootDocJs.includes(`portal: '${portal}'`));
});

// ── TEST GROUP 3: Live Sync & Interactive UI Capabilities ─────────────────────
console.log('\n--- TEST GROUP 3: Live Sync & Interactive UI Capabilities ---');
assert('dispatchCloudUpload function implemented', rootDocJs.includes('dispatchCloudUpload: function('));
assert('syncAllPortalDocumentsToDrive batch function implemented', rootDocJs.includes('syncAllPortalDocumentsToDrive: function('));
assert('Interactive Batch Sync modal #modalDriveBatchSync exists', rootDocJs.includes('id="modalDriveBatchSync"'));
assert('Document Viewer modal #bedsDocViewerBackdrop exists', rootDocJs.includes('id="bedsDocViewerBackdrop"'));
assert('Print document action implemented', rootDocJs.includes('id="btnDocViewerPrint"'));
assert('Download offline HTML action implemented', rootDocJs.includes('id="btnDocViewerDownload"'));
assert('Re-Sync to Drive action implemented', rootDocJs.includes('id="btnDocViewerReSync"'));
assert('Base64 encoding with UTF-8 safety implemented', rootDocJs.includes('btoa(unescape(encodeURIComponent(fullHtml)))'));

// ── TEST GROUP 4: Apps Script Manifests & OAuth Scopes ────────────────────────
console.log('\n--- TEST GROUP 4: Apps Script Manifests & OAuth Scopes ---');
const manifestPaths = [
  'BALSONS GATE ENTRY MANAGER/apps-script/appsscript.json',
  'BALSONS HR MANAGER/apps-script/appsscript.json',
  'BALSONS OPERATIONS MANAGER/apps-script/appsscript.json',
  'BALSONS PURCHASE MANAGER/apps-script/appsscript.json',
  'BALSONS STORE MANAGER/apps-script/appsscript.json'
];

manifestPaths.forEach(mPath => {
  if (fs.existsSync(mPath)) {
    const raw = fs.readFileSync(mPath, 'utf8');
    const json = JSON.parse(raw);
    const scopes = json.oauthScopes || [];
    assert(`${path.basename(path.dirname(path.dirname(mPath)))} manifest has drive auth scope`,
      scopes.includes('https://www.googleapis.com/auth/drive'));
    assert(`${path.basename(path.dirname(path.dirname(mPath)))} manifest has spreadsheets auth scope`,
      scopes.includes('https://www.googleapis.com/auth/spreadsheets'));
    assert(`${path.basename(path.dirname(path.dirname(mPath)))} manifest has external_request scope`,
      scopes.includes('https://www.googleapis.com/auth/script.external_request'));
  }
});

// ── TEST GROUP 5: Apps Script Seeder & Upload Handlers ─────────────────────────
console.log('\n--- TEST GROUP 5: Apps Script Seeder & Upload Handlers ---');
const provisionerPaths = [
  'BALSONS GATE ENTRY MANAGER/apps-script/BalsonsDriveProvisioner.gs',
  'BALSONS HR MANAGER/apps-script/BalsonsDriveProvisioner.gs',
  'BALSONS OPERATIONS MANAGER/apps-script/BalsonsDriveProvisioner.gs',
  'BALSONS PURCHASE MANAGER/apps-script/BalsonsDriveProvisioner.gs',
  'BALSONS SAFETY MANAGER/apps-script/BalsonsDriveProvisioner.gs',
  'BALSONS STORE MANAGER/apps-script/BalsonsDriveProvisioner.gs'
];

provisionerPaths.forEach(pPath => {
  if (fs.existsSync(pPath)) {
    const code = fs.readFileSync(pPath, 'utf8');
    const portalName = path.basename(path.dirname(path.dirname(pPath)));
    assert(`${portalName} BalsonsDriveProvisioner has seedAllPortalDocumentsToDrive`,
      code.includes('function seedAllPortalDocumentsToDrive('));
    assert(`${portalName} BalsonsDriveProvisioner has savePortalDocument`,
      code.includes('function savePortalDocument('));
    assert(`${portalName} BalsonsDriveProvisioner has ROOT_FOLDER_ID`,
      code.includes(ROOT_DRIVE_ID));
  }
});

const gateCodeGs = fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/Code.gs', 'utf8');
assert('Gate Entry Code.gs dispatches drive.upload_document', gateCodeGs.includes("case 'drive.upload_document':"));
assert('Gate Entry Code.gs has drive.upload_document in PUBLIC_ACTIONS', gateCodeGs.includes("'drive.upload_document'"));

const hrCodeGs = fs.readFileSync('BALSONS HR MANAGER/apps-script/Code.gs', 'utf8');
assert('HR Manager Code.gs dispatches drive.upload_document', hrCodeGs.includes("case 'drive.upload_document':"));
assert('HR Manager Code.gs has drive.upload_document in PUBLIC_ACTIONS', hrCodeGs.includes("'drive.upload_document'"));

console.log('\n================================================================');
console.log(`📊 TEST SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL DRIVE SYNC TESTS PASSED PERFECTLY!');
}
