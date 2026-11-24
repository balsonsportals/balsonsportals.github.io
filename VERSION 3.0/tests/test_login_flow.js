const fs = require('fs');

console.log('Testing Balsons Portal Login Flow...');

// Mock browser environment
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
    _dump: () => store
  };
})();

// Minimal DOM simulation
const elements = {};
function createElement(tag) {
  const el = {
    tagName: tag.toUpperCase(),
    id: '',
    className: '',
    classList: {
      add: (c) => { if (!el.className.includes(c)) el.className += ' ' + c; },
      remove: (c) => { el.className = el.className.replace(c, '').trim(); },
      contains: (c) => el.className.includes(c)
    },
    style: {},
    attributes: {},
    setAttribute: (k, v) => { el.attributes[k] = v; },
    getAttribute: (k) => el.attributes[k] || null,
    querySelector: (sel) => {
      if (sel.includes('.beds-login-card')) return elements['beds-login-card'] || null;
      return null;
    },
    appendChild: (child) => {
      if (child.id) elements[child.id] = child;
    },
    innerHTML: '',
    value: '',
    disabled: false
  };
  return el;
}

global.window = {
  location: { pathname: '/BALSONS GATE ENTRY MANAGER/frontend/index.html' },
  localStorage: localStorageMock,
  sessionStorage: localStorageMock
};
global.document = {
  readyState: 'complete',
  createElement: createElement,
  getElementById: (id) => elements[id] || null,
  body: {
    classList: {
      add: (c) => console.log('  document.body.classList.add:', c),
      remove: (c) => console.log('  document.body.classList.remove:', c)
    },
    appendChild: (el) => {
      if (el.id) elements[el.id] = el;
    }
  },
  addEventListener: () => {}
};
global.localStorage = localStorageMock;

// 1. Load SuperAdmin JS
require('../BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-superadmin.js');
console.log('✓ Loaded beds-superadmin.js, users count:', window.BalsonsSuperAdmin.users.length);

// 2. Load Portal Login JS
require('../BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-portal-login.js');
console.log('✓ Loaded beds-portal-login.js');

const login = window.BalsonsPortalLogin;
console.log('Detected portal:', login.currentPortal);

// Verify detectPortal identified 'gate'
if (login.currentPortal !== 'gate') {
  console.error('❌ Portal detection failed, got:', login.currentPortal);
  process.exit(1);
}

// Populate elements from the innerHTML injected into beds-portal-login-wrapper
const wrapper = elements['beds-portal-login-wrapper'];
if (!wrapper) {
  console.error('❌ beds-portal-login-wrapper was not created!');
  process.exit(1);
}
console.log('✓ beds-portal-login-wrapper created successfully');

// Simulate DOM fields
elements['loginUserId'] = { id: 'loginUserId', value: 'superadmin', style: {} };
elements['loginPassword'] = { id: 'loginPassword', value: 'balsons2026', style: {} };
elements['btnSubmitLogin'] = { id: 'btnSubmitLogin', disabled: false, innerHTML: '➔ Login' };
elements['loginAlertBox'] = { id: 'loginAlertBox', style: { display: 'none' }, innerHTML: '', className: '' };
elements['loginRememberMe'] = { id: 'loginRememberMe', checked: true };
elements['beds-login-card'] = { classList: { remove: () => {} } };

// Test 1: Submit with superadmin + balsons2026
console.log('\n--- Test 1: superadmin login with balsons2026 ---');
login.handleLoginSubmit({ preventDefault: () => {} });

console.log('Alert box:', elements['loginAlertBox'].innerHTML);
if (!elements['loginAlertBox'].innerHTML.includes('Login Successful')) {
  console.error('❌ Login failed for superadmin!');
  process.exit(1);
}
console.log('✓ Superadmin login SUCCESSFUL!');
console.log('Session stored:', localStorageMock.getItem('balsons_global_auth_session'));

// Test 2: Portal Admin login (admin.gate + balsons2026)
console.log('\n--- Test 2: admin.gate login with balsons2026 ---');
elements['loginUserId'].value = 'admin.gate';
elements['loginPassword'].value = 'balsons2026';
login.handleLoginSubmit({ preventDefault: () => {} });

console.log('Alert box:', elements['loginAlertBox'].innerHTML);
if (!elements['loginAlertBox'].innerHTML.includes('Login Successful')) {
  console.error('❌ Login failed for admin.gate!');
  process.exit(1);
}
console.log('✓ admin.gate login SUCCESSFUL!');

// Test 3: Blank password fallback
console.log('\n--- Test 3: Blank fields fallback test ---');
elements['loginUserId'].value = '';
elements['loginPassword'].value = '';
login.handleLoginSubmit({ preventDefault: () => {} });

console.log('UserId auto-populated:', elements['loginUserId'].value);
console.log('Password auto-populated:', elements['loginPassword'].value);
console.log('Alert box:', elements['loginAlertBox'].innerHTML);
if (!elements['loginAlertBox'].innerHTML.includes('Login Successful')) {
  console.error('❌ Blank submission failed to fallback to default credentials!');
  process.exit(1);
}
console.log('✓ Blank fallback SUCCESSFUL!');

console.log('\n ALL LOGIN FLOW TESTS PASSED PERFECTLY!');
