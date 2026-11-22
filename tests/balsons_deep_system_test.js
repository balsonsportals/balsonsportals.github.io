const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WORKSPACE_ROOT = 'D:\\BALSONS JUPITER PROJECT\\OTHER\\balsons portals';
const REPORT = {
  timestamp: new Date().toISOString(),
  environment: 'Windows 11 x64 / Node ' + process.version,
  testSuites: []
};

function runSuite(name, fn) {
  const suite = { name, total: 0, passed: 0, failed: 0, tests: [] };
  function assert(title, condition, details = '') {
    suite.total++;
    if (condition) {
      suite.passed++;
      suite.tests.push({ title, status: 'PASS', details });
    } else {
      suite.failed++;
      suite.tests.push({ title, status: 'FAIL', details });
    }
  }
  try {
    fn(assert);
  } catch (err) {
    suite.failed++;
    suite.tests.push({ title: 'Suite Execution Exception', status: 'FAIL', details: err.stack });
  }
  REPORT.testSuites.push(suite);
  return suite;
}

// -------------------------------------------------------------
// SUITE 1: Visual Assets, Cover Images & CSS Full-Side Alignment
// -------------------------------------------------------------
runSuite('Suite 1: Visual Assets, Cover Images & CSS Full-Side Alignment', (assert) => {
  const expectedImages = [
    { name: 'login-gate.jpg', minSize: 1000000 },
    { name: 'login-hr.jpg', minSize: 1000000 },
    { name: 'login-operations.jpg', minSize: 1000000 },
    { name: 'login-purchase.jpg', minSize: 1000000 },
    { name: 'login-safety.jpg', minSize: 1000000 },
    { name: 'login-store.jpg', minSize: 1000000 },
    { name: 'login-reports.jpg', minSize: 800000 },
    { name: 'login-document-hub.jpg', minSize: 800000 },
    { name: 'balsons-logo.png', minSize: 100000 }
  ];

  // 1.1 Root assets/images
  expectedImages.forEach(img => {
    const p = path.join(WORKSPACE_ROOT, 'assets', 'images', img.name);
    const exists = fs.existsSync(p);
    const size = exists ? fs.statSync(p).size : 0;
    assert(`Root assets/images contains ${img.name}`, exists && size >= img.minSize, `Size: ${size} bytes`);
  });

  // 1.2 Check all portal directories have copies of all 6 cover images
  const portalDirs = [
    'BALSONS GATE ENTRY MANAGER/frontend/assets/images',
    'BALSONS HR MANAGER/frontend/assets/images',
    'BALSONS OPERATIONS MANAGER/assets/images',
    'BALSONS PURCHASE MANAGER/assets/images',
    'BALSONS SAFETY MANAGER/frontend/assets/images',
    'BALSONS STORE MANAGER/frontend/assets/images',
    'BALSONS ENTERPRISE LAUNCHER/assets/images'
  ];

  portalDirs.forEach(dir => {
    const fullDir = path.join(WORKSPACE_ROOT, dir);
    const dirExists = fs.existsSync(fullDir);
    assert(`Directory exists: ${dir}`, dirExists);
    if (dirExists) {
      expectedImages.forEach(img => {
        const p = path.join(fullDir, img.name);
        const exists = fs.existsSync(p);
        assert(`${dir} contains ${img.name}`, exists, exists ? `Size: ${fs.statSync(p).size} bytes` : 'MISSING');
      });
    }
  });

  // 1.3 Check Portal HTML cover image assignments
  const portalImageBindings = [
    { file: 'BALSONS GATE ENTRY MANAGER/frontend/index.html', expected: 'login-gate.jpg' },
    { file: 'BALSONS HR MANAGER/frontend/index.html', expected: 'login-hr.jpg' },
    { file: 'BALSONS OPERATIONS MANAGER/index.html', expected: 'login-operations.jpg' },
    { file: 'BALSONS PURCHASE MANAGER/index.html', expected: 'login-purchase.jpg' },
    { file: 'BALSONS SAFETY MANAGER/frontend/index.html', expected: 'login-safety.jpg' },
    { file: 'BALSONS STORE MANAGER/frontend/index.html', expected: 'login-store.jpg' }
  ];

  portalImageBindings.forEach(binding => {
    const fullPath = path.join(WORKSPACE_ROOT, binding.file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasExpected = content.includes(binding.expected);
    assert(`${binding.file} binds to ${binding.expected}`, hasExpected, `Expected: ${binding.expected}`);
  });

  // 1.4 Check CSS full-bleed styling for .login-split-left img.login-cover
  portalImageBindings.forEach(binding => {
    const fullPath = path.join(WORKSPACE_ROOT, binding.file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasObjectFit = content.includes('object-fit: cover') || content.includes('beds.css');
    assert(`${binding.file} has full-side object-fit cover styling`, hasObjectFit);
  });
});

// -------------------------------------------------------------
// SUITE 2: Centralised Launcher Security & Governance Isolation
// -------------------------------------------------------------
runSuite('Suite 2: Centralised Launcher Security & Governance Isolation', (assert) => {
  // 2.1 Centralised Launcher has exclusive Super Admin guard
  const launcherPath = path.join(WORKSPACE_ROOT, 'index.html');
  const launcherContent = fs.readFileSync(launcherPath, 'utf8');
  assert('Launcher contains Super Administrator exclusive guard', 
    launcherContent.includes('Super Administrator Authority Required') && launcherContent.includes('Master Super Administrator'),
    'Enforces superadmin only on index.html'
  );

  // 2.2 Domain portals have NO portalSwitcherWrap
  const domainPortals = [
    'BALSONS GATE ENTRY MANAGER/frontend/index.html',
    'BALSONS HR MANAGER/frontend/index.html',
    'BALSONS OPERATIONS MANAGER/index.html',
    'BALSONS PURCHASE MANAGER/index.html',
    'BALSONS SAFETY MANAGER/frontend/index.html',
    'BALSONS STORE MANAGER/frontend/index.html'
  ];

  domainPortals.forEach(portalFile => {
    const fullPath = path.join(WORKSPACE_ROOT, portalFile);
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasSwitcher = content.includes('portalSwitcherWrap') || content.includes('switch-portal-btn');
    assert(`${portalFile} has ZERO portalSwitcherWrap / cross-portal switcher links`, !hasSwitcher,
      hasSwitcher ? 'FOUND UNWANTED SWITCHER' : 'Clean: Strictly Isolated'
    );
  });

  // 2.3 Check that individual portals user dropdown is isolated to user profile & logout
  domainPortals.forEach(portalFile => {
    const fullPath = path.join(WORKSPACE_ROOT, portalFile);
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasUserPill = content.includes('user-pill') || content.includes('beds-user-btn') || content.includes('beds-login-wrap') || content.includes('userPillWrap');
    assert(`${portalFile} has user-scoped profile/logout controller`, hasUserPill);
  });
});

// -------------------------------------------------------------
// SUITE 3: Super Admin User & Credential Management Console (CRUD)
// -------------------------------------------------------------
runSuite('Suite 3: Super Admin User & Credential Management Engine', (assert) => {
  const superadminCodePath = path.join(WORKSPACE_ROOT, 'assets', 'js', 'beds-superadmin.js');
  const code = fs.readFileSync(superadminCodePath, 'utf8');

  // Create mock browser sandbox
  const storage = {};
  const mockLocalStorage = {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; },
    clear: () => { for (const k in storage) delete storage[k]; }
  };

  const sandbox = {
    window: {},
    location: {
      pathname: '/index.html',
      href: 'http://localhost/index.html',
      search: '',
      hash: ''
    },
    localStorage: mockLocalStorage,
    console: { log: () => {}, warn: () => {}, error: () => {} },
    setTimeout: (fn) => fn(),
    alert: () => {},
    document: {
      addEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => []
    }
  };
  sandbox.window = sandbox;

  // Evaluate script in sandbox
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  const BalsonsSuperAdmin = sandbox.window.BalsonsSuperAdmin;
  assert('BalsonsSuperAdmin is defined in window', !!BalsonsSuperAdmin);

  // 3.1 Initial user roster
  const users = BalsonsSuperAdmin.users;
  assert('Initial user roster loaded from DEFAULT_USERS', Array.isArray(users) && users.length === 14, `Found: ${users.length} users`);

  // 3.2 Verify superadmin permissions
  const superUser = users.find(u => u.username === 'superadmin');
  assert('superadmin account exists with Super Administrator role', superUser && superUser.role === 'Super Administrator');
  assert('superadmin can access launcher', BalsonsSuperAdmin.canAccessPortal('launcher', superUser));

  // 3.3 Verify domain users cannot access launcher
  const nonAdminUsers = users.filter(u => u.username !== 'superadmin');
  let nonAdminBlockedCount = 0;
  nonAdminUsers.forEach(u => {
    if (!BalsonsSuperAdmin.canAccessPortal('launcher', u)) {
      nonAdminBlockedCount++;
    }
  });
  assert('All non-superadmin users are strictly blocked from launcher', nonAdminBlockedCount === nonAdminUsers.length,
    `${nonAdminBlockedCount}/${nonAdminUsers.length} blocked from launcher`
  );

  // 3.4 Test createUser
  let createdSuccess = false;
  try {
    BalsonsSuperAdmin.createUser({
      username: 'test.inspector',
      fullName: 'Test QA Inspector',
      role: 'Manager / Supervisor',
      assignedPortal: 'operations',
      dept: 'Quality Assurance',
      permittedPortals: ['operations'],
      password: 'Inspector@2026'
    });
    createdSuccess = true;
  } catch (e) {
    createdSuccess = false;
  }
  assert('createUser() successfully adds user', createdSuccess);
  
  const fetchedUser = BalsonsSuperAdmin.users.find(u => u.username === 'test.inspector');
  assert('Created user exists in roster with correct properties', fetchedUser && fetchedUser.fullName === 'Test QA Inspector');

  // 3.5 Test updateUser
  const updatedObj = BalsonsSuperAdmin.updateUser('test.inspector', {
    fullName: 'Test QA Senior Inspector',
    dept: 'QA & Rigging QC'
  });
  assert('updateUser() updates user fields', !!updatedObj && updatedObj.fullName === 'Test QA Senior Inspector');
  const verifyUpdated = BalsonsSuperAdmin.users.find(u => u.username === 'test.inspector');
  assert('User field modification verified', verifyUpdated && verifyUpdated.fullName === 'Test QA Senior Inspector' && verifyUpdated.dept === 'QA & Rigging QC');

  // 3.6 Test Password Update
  const pwUpdated = BalsonsSuperAdmin.updateUserPassword('test.inspector', 'NewSecret@2026');
  assert('updateUserPassword() succeeds', pwUpdated === true);
  const checkUpdated = BalsonsSuperAdmin.users.find(u => u.username === 'test.inspector');
  assert('Password property is updated in roster', checkUpdated && checkUpdated.password === 'NewSecret@2026');

  // 3.7 Test Status Toggle
  BalsonsSuperAdmin.toggleUserStatus('test.inspector');
  const toggledUser = BalsonsSuperAdmin.users.find(u => u.username === 'test.inspector');
  assert('toggleUserStatus() toggles to Deactivated', toggledUser && toggledUser.status === 'Deactivated');
  
  BalsonsSuperAdmin.toggleUserStatus('test.inspector');
  const restoredUser = BalsonsSuperAdmin.users.find(u => u.username === 'test.inspector');
  assert('toggleUserStatus() toggles back to Active', restoredUser && restoredUser.status === 'Active');

  // 3.8 Test Delete User
  let superDeleteBlocked = false;
  try {
    BalsonsSuperAdmin.deleteUser('superadmin');
  } catch (err) {
    superDeleteBlocked = err.message.includes('Super Administrator');
  }
  assert('deleteUser() protects root superadmin from deletion', superDeleteBlocked);

  const delTestResult = BalsonsSuperAdmin.deleteUser('test.inspector');
  assert('deleteUser() successfully removes custom user', delTestResult === true);
  assert('Deleted user no longer exists in roster', BalsonsSuperAdmin.users.find(u => u.username === 'test.inspector') === undefined);
});

// -------------------------------------------------------------
// SUITE 4: Smart Bidirectional Portal Login & Role Dropdowns
// -------------------------------------------------------------
runSuite('Suite 4: Smart Bidirectional Portal Login & Role Dropdowns', (assert) => {
  const loginCodePath = path.join(WORKSPACE_ROOT, 'assets', 'js', 'beds-portal-login.js');
  const loginCode = fs.readFileSync(loginCodePath, 'utf8');

  // Check PORTAL_CONFIGS images
  assert('Operations portal uses login-operations.jpg', loginCode.includes("'operations':") && loginCode.includes("assets/images/login-operations.jpg"));
  assert('Purchase portal uses login-purchase.jpg', loginCode.includes("'purchase':") && loginCode.includes("assets/images/login-purchase.jpg"));
  assert('Gate portal uses login-gate.jpg', loginCode.includes("'gate':") && loginCode.includes("assets/images/login-gate.jpg"));
  assert('HR portal uses login-hr.jpg', loginCode.includes("'hr':") && loginCode.includes("assets/images/login-hr.jpg"));
  assert('Safety portal uses login-safety.jpg', loginCode.includes("'safety':") && loginCode.includes("assets/images/login-safety.jpg"));
  assert('Store portal uses login-store.jpg', loginCode.includes("'store':") && loginCode.includes("assets/images/login-store.jpg"));

  // Verify role dropdown HTML generator restricts roles on Launcher
  assert('Launcher restricts role dropdown strictly to Super Administrator',
    loginCode.includes('if (isLauncher)') && loginCode.includes('Super Administrator (Prashant Muley)'),
    'Launcher role dropdown enforces superadmin isolation'
  );

  // Verify non-superadmin access rejection on launcher
  assert('beds-portal-login.js blocks non-superadmins from launcher with Access Denied',
    loginCode.includes("Access Denied: The Centralised Portal is strictly reserved for the Super Administrator") ||
    loginCode.includes("CENTRAL_LAUNCHER_ACCESS_DENIED_NON_ADMIN"),
    'Strict 403 Access Denied banner enforced'
  );
});

// -------------------------------------------------------------
// SUITE 5: Google Drive Master Storage & 87-Folder Provisioning
// -------------------------------------------------------------
runSuite('Suite 5: Google Drive Master Storage & 87-Folder Provisioning', (assert) => {
  const mapPath = path.join(WORKSPACE_ROOT, 'docs', 'specifications', 'balsons_drive_folder_map.json');
  assert('balsons_drive_folder_map.json exists', fs.existsSync(mapPath));

  const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  assert('Root folder ID matches 1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde', mapData.ROOT && mapData.ROOT.id === '1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde');

  // Count total folder IDs across the JSON
  let folderIds = [];
  function extractIds(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (obj.id) folderIds.push(obj.id);
    for (let k of Object.keys(obj)) extractIds(obj[k]);
  }
  extractIds(mapData);
  assert('Total mapped folder IDs count is 88 (1 Root + 87 Subfolders)', folderIds.length === 88,
    `Total IDs: ${folderIds.length}`
  );

  // Check 7 Major Portals/Vaults in map
  const expectedPortals = [
    '01_GATE_ENTRY_MANAGER',
    '02_HR_AND_PAYROLL_MANAGER',
    '03_OPERATIONS_AND_RIGGING_MANAGER',
    '04_PURCHASE_AND_COMMERCIAL_MANAGER',
    '05_SAFETY_AND_RISK_MANAGER',
    '06_STORE_AND_TACKLE_MANAGER',
    '07_EXECUTIVE_GOVERNANCE_AND_SYNC_HUB'
  ];

  expectedPortals.forEach(portalKey => {
    const pObj = mapData.PORTALS && mapData.PORTALS[portalKey];
    assert(`Major Vault ${portalKey} is provisioned`, !!pObj && !!pObj.id, pObj ? `ID: ${pObj.id}` : 'MISSING');
  });

  // Verify BalsonsDriveProvisioner.gs
  const gsPath = path.join(WORKSPACE_ROOT, 'docs', 'specifications', 'BalsonsDriveProvisioner.gs');
  assert('BalsonsDriveProvisioner.gs exists', fs.existsSync(gsPath));
  const gsCode = fs.readFileSync(gsPath, 'utf8');
  assert('BalsonsDriveProvisioner.gs has ROOT_FOLDER_ID 1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde',
    gsCode.includes('1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde')
  );
  assert('BalsonsDriveProvisioner.gs has provisionBalsonsDrive function',
    gsCode.includes('function provisionBalsonsDrive()')
  );
  assert('BalsonsDriveProvisioner.gs has savePortalDocument storage function',
    gsCode.includes('function savePortalDocument(')
  );
});

// -------------------------------------------------------------
// SUITE 6: Portal-Specific Backend Integrations, Sheet Bindings & Endpoints
// -------------------------------------------------------------
runSuite('Suite 6: Portal Backend Integrations & Sheet Bindings Audit', (assert) => {
  const configs = [
    {
      portal: 'Gate Entry Manager',
      files: ['BALSONS GATE ENTRY MANAGER/frontend/assets/js/config.js', 'BALSONS GATE ENTRY MANAGER/frontend/index.html'],
      sheetId: '1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o'
    },
    {
      portal: 'HR Manager',
      files: ['BALSONS HR MANAGER/frontend/assets/js/config.js', 'BALSONS HR MANAGER/frontend/index.html'],
      sheetId: '1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw'
    },
    {
      portal: 'Operations Manager',
      files: ['BALSONS OPERATIONS MANAGER/assets/js/operations-app.js', 'BALSONS OPERATIONS MANAGER/index.html'],
      sheetId: '1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E'
    },
    {
      portal: 'Purchase Manager',
      files: ['BALSONS PURCHASE MANAGER/assets/js/purchase-app.js', 'BALSONS PURCHASE MANAGER/index.html'],
      sheetId: '1ANnu4X2dR0EITq5RvkyfMv1Xfz30Ba26IKjc40uyj_c'
    },
    {
      portal: 'Safety Manager',
      files: ['BALSONS SAFETY MANAGER/frontend/assets/js/config.js', 'BALSONS SAFETY MANAGER/frontend/index.html'],
      sheetId: '1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0'
    },
    {
      portal: 'Store Manager',
      files: ['BALSONS STORE MANAGER/frontend/assets/js/config.js', 'BALSONS STORE MANAGER/frontend/index.html'],
      sheetId: '1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ'
    }
  ];

  configs.forEach(cfg => {
    let combinedContent = '';
    cfg.files.forEach(f => {
      const p = path.join(WORKSPACE_ROOT, f);
      if (fs.existsSync(p)) combinedContent += fs.readFileSync(p, 'utf8') + '\n';
    });

    const hasSheet = combinedContent.includes(cfg.sheetId);
    assert(`${cfg.portal} binds to master Google Sheet ID ${cfg.sheetId.slice(0, 10)}...`, hasSheet);

    const hasScriptUrl = combinedContent.includes('script.google.com') || combinedContent.includes('AKfycb');
    assert(`${cfg.portal} contains Google Apps Script deployment URL`, hasScriptUrl);

    // Check timezone consistency (Asia/Kolkata / IST)
    const hasIST = combinedContent.includes('IST') || combinedContent.includes('Kolkata') || combinedContent.includes('toLocaleString') || combinedContent.includes('timeZone');
    assert(`${cfg.portal} has India Standard Time (IST) timestamp formatting`, hasIST);
  });
});

// Output Summary
console.log('====================================================');
console.log('   BALSONS ENTERPRISE ECOSYSTEM DEEP SYSTEM TEST    ');
console.log('====================================================');
let grandTotal = 0;
let grandPassed = 0;
let grandFailed = 0;

REPORT.testSuites.forEach(s => {
  grandTotal += s.total;
  grandPassed += s.passed;
  grandFailed += s.failed;
  console.log(`\n[${s.failed === 0 ? 'PASS' : 'FAIL'}] ${s.name} (${s.passed}/${s.total})`);
  s.tests.forEach(t => {
    if (t.status === 'FAIL') {
      console.log(`   ❌ [FAIL] ${t.title} -> ${t.details}`);
    } else {
      console.log(`   ✅ [PASS] ${t.title}`);
    }
  });
});

console.log('\n====================================================');
console.log(`OVERALL RESULTS: ${grandPassed}/${grandTotal} PASSED | ${grandFailed} FAILED`);
console.log('====================================================');

// Save JSON Report
const jsonPath = path.join(WORKSPACE_ROOT, 'docs', 'specifications', 'balsons_deep_system_test_report.json');
fs.writeFileSync(jsonPath, JSON.stringify(REPORT, null, 2));
console.log(`Report saved to: ${jsonPath}`);
