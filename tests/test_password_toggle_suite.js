const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('   BALSONS PORTAL PASSWORD TOGGLE TEST SUITE       ');
console.log('====================================================');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`   ✅ [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`   ❌ [FAIL] ${message}`);
  }
}

// SUITE 1: Verify all 16 copies of beds-portal-login.js
console.log('\n[SUITE 1: beds-portal-login.js File Consistency & Integrity]');
const rootLogin = fs.readFileSync('assets/js/beds-portal-login.js', 'utf8');

assert(rootLogin.includes('id="bedsTogglePwBtn"'), 'Root beds-portal-login.js contains id="bedsTogglePwBtn"');
assert(rootLogin.includes('.beds-pw-toggle:hover'), 'Root beds-portal-login.js contains .beds-pw-toggle:hover styling');
assert(rootLogin.includes('togglePasswordVisibility: function(triggerBtn)'), 'Root beds-portal-login.js contains updated toggle function');
assert(rootLogin.includes('eyeSlashSvg'), 'Root beds-portal-login.js contains eyeSlashSvg icon');

const allLoginPaths = [
  'BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-portal-login.js',
  'BALSONS HR MANAGER/frontend/assets/js/beds-portal-login.js',
  'BALSONS OPERATIONS MANAGER/assets/js/beds-portal-login.js',
  'BALSONS PURCHASE MANAGER/assets/js/beds-portal-login.js',
  'BALSONS REPOTS PORTAL/assets/js/beds-portal-login.js',
  'BALSONS SAFETY MANAGER/frontend/assets/js/beds-portal-login.js',
  'BALSONS STORE MANAGER/frontend/assets/js/beds-portal-login.js',
  'BALSONS ENTERPRISE LAUNCHER/assets/js/beds-portal-login.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-portal-login.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/beds-portal-login.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/beds-portal-login.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/beds-portal-login.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS REPOTS PORTAL/assets/js/beds-portal-login.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/beds-portal-login.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/beds-portal-login.js'
];

allLoginPaths.forEach(fp => {
  const c = fs.readFileSync(fp, 'utf8');
  assert(c === rootLogin, `Sync verified: ${path.basename(path.dirname(fp))}/${path.basename(fp)} is byte-identical to root`);
});

// SUITE 2: Functional DOM Simulation for ALL 8 Portals
console.log('\n[SUITE 2: Functional Password Toggle Execution Across All 8 Portals]');

const portals = ['gate', 'hr', 'safety', 'store', 'operations', 'purchase', 'reports', 'launcher'];

portals.forEach(portalName => {
  // Create a minimal DOM environment
  const elements = {};
  const doc = {
    readyState: 'complete',
    body: {
      classList: {
        add: () => {},
        remove: () => {}
      },
      appendChild: (el) => {
        elements[el.id] = el;
      }
    },
    createElement: (tag) => {
      const el = {
        tagName: tag.toUpperCase(),
        id: '',
        className: '',
        innerHTML: '',
        style: {},
        classList: {
          add: () => {},
          remove: () => {}
        },
        querySelector: (sel) => {
          if (sel === '.beds-login-card') return { classList: { remove: () => {} } };
          return null;
        },
        querySelectorAll: () => []
      };
      return el;
    },
    getElementById: (id) => elements[id] || null,
    querySelector: (sel) => {
      if (sel === '.beds-pw-toggle') return elements['bedsTogglePwBtn'] || null;
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel === '.beds-pw-toggle, #bedsTogglePwBtn') return [elements['bedsTogglePwBtn']];
      return [];
    },
    addEventListener: () => {},
    activeElement: null
  };

  const win = {
    location: { pathname: `/${portalName}/index.html` },
    document: doc,
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    },
    sessionStorage: {
      clear: () => {}
    },
    console: {
      log: () => {},
      warn: () => {},
      error: () => {}
    },
    BalsonsSuperAdmin: {
      users: [],
      currentUser: null,
      saveSession: () => {},
      isSuperAdmin: () => false,
      logAudit: () => {}
    }
  };
  win.window = win;
  win.globalThis = win;

  // Run beds-portal-login in this sandbox
  const vm = require('vm');
  const context = vm.createContext(win);
  vm.runInContext(rootLogin, context);

  // Now the login wrapper was appended
  const wrapper = elements['beds-portal-login-wrapper'];
  assert(!!wrapper, `Portal [${portalName.toUpperCase()}]: beds-portal-login-wrapper injected`);

  // Parse out the elements from the wrapper innerHTML
  const html = wrapper.innerHTML;
  assert(html.includes('id="loginPassword"'), `Portal [${portalName.toUpperCase()}]: loginPassword input generated`);
  assert(html.includes('id="bedsTogglePwBtn"'), `Portal [${portalName.toUpperCase()}]: bedsTogglePwBtn button generated`);

  // Mock the password input and button objects in doc.getElementById
  const pwInput = {
    id: 'loginPassword',
    type: 'password',
    value: 'balsons2026',
    setSelectionRange: () => {}
  };
  const toggleBtn = {
    id: 'bedsTogglePwBtn',
    attrs: {
      'aria-pressed': 'false',
      'title': 'Show Password',
      'aria-label': 'Show Password'
    },
    setAttribute: function(k, v) { this.attrs[k] = v; },
    getAttribute: function(k) { return this.attrs[k]; },
    innerHTML: '<svg class="beds-pw-eye-icon"><path d="M1 12s4-8"></path></svg>'
  };

  elements['loginPassword'] = pwInput;
  elements['bedsTogglePwBtn'] = toggleBtn;

  // TEST TOGGLE CLICK: SHOW PASSWORD
  context.BalsonsPortalLogin.togglePasswordVisibility(toggleBtn);
  assert(pwInput.type === 'text', `Portal [${portalName.toUpperCase()}]: Password input changed from "password" to "text" (REVEALED)`);
  assert(toggleBtn.getAttribute('title') === 'Hide Password', `Portal [${portalName.toUpperCase()}]: Button title updated to "Hide Password"`);
  assert(toggleBtn.getAttribute('aria-pressed') === 'true', `Portal [${portalName.toUpperCase()}]: Button aria-pressed updated to "true"`);
  assert(toggleBtn.innerHTML.includes('M17.94'), `Portal [${portalName.toUpperCase()}]: Button icon updated to Eye-Off (Slash) SVG`);

  // TEST TOGGLE CLICK AGAIN: HIDE PASSWORD
  context.BalsonsPortalLogin.togglePasswordVisibility(toggleBtn);
  assert(pwInput.type === 'password', `Portal [${portalName.toUpperCase()}]: Password input changed from "text" to "password" (HIDDEN)`);
  assert(toggleBtn.getAttribute('title') === 'Show Password', `Portal [${portalName.toUpperCase()}]: Button title updated to "Show Password"`);
  assert(toggleBtn.getAttribute('aria-pressed') === 'false', `Portal [${portalName.toUpperCase()}]: Button aria-pressed updated to "false"`);
  assert(toggleBtn.innerHTML.includes('M1 12s4-8'), `Portal [${portalName.toUpperCase()}]: Button icon updated to Eye-Open SVG`);
});

// SUITE 3: Inline Secondary Modals
console.log('\n[SUITE 3: Inline Secondary Modals Across Portals]');
const safetyHtml = fs.readFileSync('BALSONS SAFETY MANAGER/frontend/index.html', 'utf8');
assert(safetyHtml.includes('btn-safety-pw-toggle'), 'Safety Manager has btn-safety-pw-toggle button');
assert(safetyHtml.includes('toggleSafetyPassword'), 'Safety Manager has toggleSafetyPassword function');

const storeHtml = fs.readFileSync('BALSONS STORE MANAGER/frontend/index.html', 'utf8');
assert(storeHtml.includes('btn-store-pw-toggle'), 'Store Manager has btn-store-pw-toggle button');
assert(storeHtml.includes('toggleStorePassword'), 'Store Manager has toggleStorePassword function');

const opsHtml = fs.readFileSync('BALSONS OPERATIONS MANAGER/index.html', 'utf8');
assert(opsHtml.includes('btn-ops-pw-toggle'), 'Operations Manager has btn-ops-pw-toggle button');
assert(opsHtml.includes('toggleOpsPassword'), 'Operations Manager has toggleOpsPassword function');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('toggleInputFieldPassword'), 'Launcher index.html has toggleInputFieldPassword function');

// SUITE 4: Main Index Files Synchronization for Both Portals
console.log('\n[SUITE 4: Main Index Files Synchronization for Both Portals (Gate & HR)]');
const gateMain = fs.readFileSync('BALSONS GATE ENTRY MANAGER/frontend/index.html', 'utf8');
const gateLauncher = fs.readFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/index.html', 'utf8');
assert(gateMain === gateLauncher, 'Gate Entry frontend/index.html is 100% byte-identical between portal repo & launcher mirror');

const hrMain = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const hrLauncher = fs.readFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html', 'utf8');
assert(hrMain === hrLauncher, 'HR Manager frontend/index.html is 100% byte-identical between portal repo & launcher mirror');

console.log('====================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('====================================================');

if (failedTests > 0) process.exit(1);
