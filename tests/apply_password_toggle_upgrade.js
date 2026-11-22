const fs = require('fs');
const path = require('path');

console.log('--- STEP 1: Updating root assets/js/beds-portal-login.js ---');

let loginJs = fs.readFileSync('assets/js/beds-portal-login.js', 'utf8');
const isCrlf = loginJs.includes('\r\n');
const eol = isCrlf ? '\r\n' : '\n';

function norm(s) {
  return isCrlf ? s.replace(/\r?\n/g, '\r\n') : s.replace(/\r\n/g, '\n');
}

// 1. Style update
const oldStyleEnd = norm(`          @keyframes bedsRoleBadgeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>`);

const newStyleEnd = norm(`          @keyframes bedsRoleBadgeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .beds-pw-toggle {
            background: transparent;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 6px 8px;
            margin-left: 4px;
            color: var(--beds-text-muted, #64748b);
            border-radius: 6px;
            transition: all 0.2s ease;
            user-select: none;
            line-height: 1;
          }
          .beds-pw-toggle:hover {
            color: var(--beds-teal-primary, #0097a7);
            background: rgba(0, 151, 167, 0.08);
          }
          .beds-pw-toggle:focus {
            outline: 2px solid var(--beds-teal-primary, #0097a7);
            outline-offset: 1px;
          }
          .beds-pw-toggle:active {
            transform: scale(0.92);
          }
          .beds-pw-eye-icon {
            display: block;
            pointer-events: none;
          }
        </style>`);

if (!loginJs.includes(oldStyleEnd)) {
  console.error('ERROR: oldStyleEnd not found in beds-portal-login.js');
} else {
  loginJs = loginJs.replace(oldStyleEnd, newStyleEnd);
  console.log('✅ Style updated with .beds-pw-toggle rules.');
}

// 2. Password Field Markup update
const oldPwHtml = norm(`              <!-- PASSWORD WITH VISIBILITY TOGGLE -->
              <div class="beds-login-field-wrap">
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--beds-text-secondary, #334155); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Password
                </label>
                <div class="beds-login-field">
                  <span class="beds-field-icon">🔒</span>
                  <input type="password" id="loginPassword" placeholder="balsons2026" value="balsons2026" required autocomplete="current-password">
                  <button type="button" class="beds-pw-toggle" onclick="BalsonsPortalLogin.togglePasswordVisibility()" title="Show/Hide Password">👁</button>
                </div>
              </div>`);

const newPwHtml = norm(`              <!-- PASSWORD WITH VISIBILITY TOGGLE -->
              <div class="beds-login-field-wrap">
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--beds-text-secondary, #334155); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Password
                </label>
                <div class="beds-login-field">
                  <span class="beds-field-icon" id="pwFieldIcon">🔒</span>
                  <input type="password" id="loginPassword" placeholder="balsons2026" value="balsons2026" required autocomplete="current-password">
                  <button type="button" class="beds-pw-toggle" id="bedsTogglePwBtn" onclick="BalsonsPortalLogin.togglePasswordVisibility(this)" title="Show Password" aria-label="Show Password" aria-pressed="false">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="beds-pw-eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>`);

if (!loginJs.includes(oldPwHtml)) {
  console.error('ERROR: oldPwHtml not found in beds-portal-login.js');
} else {
  loginJs = loginJs.replace(oldPwHtml, newPwHtml);
  console.log('✅ Password markup updated with modern SVG toggle.');
}

// 3. Toggle Function update
const oldToggleFn = norm(`    togglePasswordVisibility: function() {
      const pwInput = document.getElementById('loginPassword');
      if (pwInput) {
        pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
      }
    },`);

const newToggleFn = norm(`    togglePasswordVisibility: function(triggerBtn) {
      const pwInput = document.getElementById('loginPassword');
      if (!pwInput) return;

      const isCurrentlyPassword = (pwInput.type === 'password');
      pwInput.type = isCurrentlyPassword ? 'text' : 'password';

      const toggleBtn = triggerBtn || document.getElementById('bedsTogglePwBtn') || document.querySelector('.beds-pw-toggle');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', isCurrentlyPassword ? 'true' : 'false');
        toggleBtn.setAttribute('title', isCurrentlyPassword ? 'Hide Password' : 'Show Password');
        toggleBtn.setAttribute('aria-label', isCurrentlyPassword ? 'Hide Password' : 'Show Password');

        const eyeOpenSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="beds-pw-eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        const eyeSlashSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="beds-pw-eye-icon"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';

        toggleBtn.innerHTML = isCurrentlyPassword ? eyeSlashSvg : eyeOpenSvg;
      }

      try {
        if (document.activeElement === pwInput) {
          const len = pwInput.value.length;
          pwInput.setSelectionRange(len, len);
        }
      } catch (e) {}
    },`);

if (!loginJs.includes(oldToggleFn)) {
  console.error('ERROR: oldToggleFn not found in beds-portal-login.js');
} else {
  loginJs = loginJs.replace(oldToggleFn, newToggleFn);
  console.log('✅ togglePasswordVisibility function updated.');
}

// Write back root assets/js/beds-portal-login.js
fs.writeFileSync('assets/js/beds-portal-login.js', loginJs, 'utf8');
console.log('Saved root assets/js/beds-portal-login.js');

console.log('\n--- STEP 2: Propagating to all 15 other copies ---');
const loginCopies = [
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

loginCopies.forEach(cp => {
  if (fs.existsSync(cp)) {
    fs.writeFileSync(cp, loginJs, 'utf8');
    console.log('  Synced -> ' + cp);
  } else {
    console.warn('  Warning missing: ' + cp);
  }
});

console.log('\n--- STEP 3: Updating secondary inline modals in other portals ---');

// A. Safety Manager
const safetyPath = 'BALSONS SAFETY MANAGER/frontend/index.html';
if (fs.existsSync(safetyPath)) {
  let sHtml = fs.readFileSync(safetyPath, 'utf8');
  const oldSafetyPw = `<input type="password" class="form-control" id="login-password" value="Balsons@2026" required style="height: 42px;">`;
  const newSafetyPw = `<div style="position:relative; display:flex; align-items:center; width:100%;">
              <input type="password" class="form-control" id="login-password" value="Balsons@2026" required style="height: 42px; padding-right: 42px; width: 100%;">
              <button type="button" class="btn-safety-pw-toggle" onclick="toggleSafetyPassword(this)" title="Show Password" aria-label="Show Password" style="position:absolute; right:8px; background:transparent; border:none; cursor:pointer; color:var(--beds-text-muted, #64748b); padding:6px; display:inline-flex; align-items:center; justify-content:center; border-radius:4px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>`;
  if (sHtml.includes(oldSafetyPw)) {
    sHtml = sHtml.replace(oldSafetyPw, newSafetyPw);
    // Add helper function before </script>
    const helperScript = `
  function toggleSafetyPassword(btn) {
    const input = document.getElementById('login-password');
    if (!input) return;
    const isPw = (input.type === 'password');
    input.type = isPw ? 'text' : 'password';
    if (btn) {
      btn.title = isPw ? 'Hide Password' : 'Show Password';
      btn.setAttribute('aria-label', isPw ? 'Hide Password' : 'Show Password');
      btn.innerHTML = isPw 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
  }
`;
    sHtml = sHtml.replace('</body>', `<script>${helperScript}</script>\n</body>`);
    fs.writeFileSync(safetyPath, sHtml, 'utf8');
    const safetyLauncher = 'BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/index.html';
    if (fs.existsSync(safetyLauncher)) fs.writeFileSync(safetyLauncher, sHtml, 'utf8');
    console.log('✅ Safety Manager inline login password toggle upgraded.');
  }
}

// B. Store Manager
const storePath = 'BALSONS STORE MANAGER/frontend/index.html';
if (fs.existsSync(storePath)) {
  let stHtml = fs.readFileSync(storePath, 'utf8');
  const oldStorePw = `<input type="password" class="beds-input" id="store-login-pass" value="Store@2026!" required style="width: 100%; height: 42px;">`;
  const newStorePw = `<div style="position:relative; display:flex; align-items:center; width:100%;">
              <input type="password" class="beds-input" id="store-login-pass" value="Store@2026!" required style="width: 100%; height: 42px; padding-right: 42px;">
              <button type="button" class="btn-store-pw-toggle" onclick="toggleStorePassword(this)" title="Show Password" aria-label="Show Password" style="position:absolute; right:8px; background:transparent; border:none; cursor:pointer; color:var(--beds-text-muted, #64748b); padding:6px; display:inline-flex; align-items:center; justify-content:center; border-radius:4px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>`;
  if (stHtml.includes(oldStorePw)) {
    stHtml = stHtml.replace(oldStorePw, newStorePw);
    const helperScript = `
  function toggleStorePassword(btn) {
    const input = document.getElementById('store-login-pass');
    if (!input) return;
    const isPw = (input.type === 'password');
    input.type = isPw ? 'text' : 'password';
    if (btn) {
      btn.title = isPw ? 'Hide Password' : 'Show Password';
      btn.setAttribute('aria-label', isPw ? 'Hide Password' : 'Show Password');
      btn.innerHTML = isPw 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
  }
`;
    stHtml = stHtml.replace('</body>', `<script>${helperScript}</script>\n</body>`);
    fs.writeFileSync(storePath, stHtml, 'utf8');
    const storeLauncher = 'BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/index.html';
    if (fs.existsSync(storeLauncher)) fs.writeFileSync(storeLauncher, stHtml, 'utf8');
    console.log('✅ Store Manager inline login password toggle upgraded.');
  }
}

// C. Operations Manager
const opsPath = 'BALSONS OPERATIONS MANAGER/index.html';
if (fs.existsSync(opsPath)) {
  let opsHtml = fs.readFileSync(opsPath, 'utf8');
  const oldOpsPw = `<input type="password" class="form-control" value="••••••••••••" readonly style="width: 100%; height: 42px; letter-spacing: 2px;">`;
  const newOpsPw = `<div style="position:relative; display:flex; align-items:center; width:100%;">
              <input type="password" class="form-control" id="opsLoginPass" value="balsons2026" readonly style="width: 100%; height: 42px; padding-right: 42px; letter-spacing: 1px;">
              <button type="button" class="btn-ops-pw-toggle" onclick="toggleOpsPassword(this)" title="Show Credential" aria-label="Show Credential" style="position:absolute; right:8px; background:transparent; border:none; cursor:pointer; color:var(--beds-text-muted, #64748b); padding:6px; display:inline-flex; align-items:center; justify-content:center; border-radius:4px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>`;
  if (opsHtml.includes(oldOpsPw)) {
    opsHtml = opsHtml.replace(oldOpsPw, newOpsPw);
    const helperScript = `
  function toggleOpsPassword(btn) {
    const input = document.getElementById('opsLoginPass');
    if (!input) return;
    const isPw = (input.type === 'password');
    input.type = isPw ? 'text' : 'password';
    if (btn) {
      btn.title = isPw ? 'Hide Credential' : 'Show Credential';
      btn.setAttribute('aria-label', isPw ? 'Hide Credential' : 'Show Credential');
      btn.innerHTML = isPw 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
  }
`;
    opsHtml = opsHtml.replace('</body>', `<script>${helperScript}</script>\n</body>`);
    fs.writeFileSync(opsPath, opsHtml, 'utf8');
    const opsLauncher = 'BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/index.html';
    if (fs.existsSync(opsLauncher)) fs.writeFileSync(opsLauncher, opsHtml, 'utf8');
    console.log('✅ Operations Manager inline login credential toggle upgraded.');
  }
}

// D. Launcher & Root index.html modals
['index.html', 'BALSONS ENTERPRISE LAUNCHER/index.html'].forEach(idxFile => {
  if (fs.existsSync(idxFile)) {
    let html = fs.readFileSync(idxFile, 'utf8');
    
    // addPassword
    const oldAddPw = `<input type="password" id="addPassword" required placeholder="e.g. Balsons@2026!" style="width:100%; height:38px; border:1px solid var(--super-border); border-radius:6px; padding:0 10px; font-size:13px; font-family:inherit; box-sizing:border-box;">`;
    const newAddPw = `<div style="position:relative; display:flex; align-items:center; width:100%;">
              <input type="password" id="addPassword" required placeholder="e.g. Balsons@2026!" style="width:100%; height:38px; border:1px solid var(--super-border); border-radius:6px; padding:0 36px 0 10px; font-size:13px; font-family:inherit; box-sizing:border-box;">
              <button type="button" onclick="toggleInputFieldPassword('addPassword', this)" title="Show Password" style="position:absolute; right:6px; background:transparent; border:none; cursor:pointer; color:var(--beds-text-muted); padding:4px; display:inline-flex; align-items:center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>`;

    // newPassword
    const oldNewPw = `<input type="password" id="newPassword" required placeholder="Minimum 4 characters" style="width:100%; height:38px; border:1px solid var(--super-border); border-radius:6px; padding:0 10px; font-size:13px; font-family:inherit; box-sizing:border-box;">`;
    const newNewPw = `<div style="position:relative; display:flex; align-items:center; width:100%;">
            <input type="password" id="newPassword" required placeholder="Minimum 4 characters" style="width:100%; height:38px; border:1px solid var(--super-border); border-radius:6px; padding:0 36px 0 10px; font-size:13px; font-family:inherit; box-sizing:border-box;">
            <button type="button" onclick="toggleInputFieldPassword('newPassword', this)" title="Show Password" style="position:absolute; right:6px; background:transparent; border:none; cursor:pointer; color:var(--beds-text-muted); padding:4px; display:inline-flex; align-items:center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>`;

    // confirmPassword
    const oldConfPw = `<input type="password" id="confirmPassword" required placeholder="Re-type password" style="width:100%; height:38px; border:1px solid var(--super-border); border-radius:6px; padding:0 10px; font-size:13px; font-family:inherit; box-sizing:border-box;">`;
    const newConfPw = `<div style="position:relative; display:flex; align-items:center; width:100%;">
            <input type="password" id="confirmPassword" required placeholder="Re-type password" style="width:100%; height:38px; border:1px solid var(--super-border); border-radius:6px; padding:0 36px 0 10px; font-size:13px; font-family:inherit; box-sizing:border-box;">
            <button type="button" onclick="toggleInputFieldPassword('confirmPassword', this)" title="Show Password" style="position:absolute; right:6px; background:transparent; border:none; cursor:pointer; color:var(--beds-text-muted); padding:4px; display:inline-flex; align-items:center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>`;

    let changed = false;
    if (html.includes(oldAddPw)) { html = html.replace(oldAddPw, newAddPw); changed = true; }
    if (html.includes(oldNewPw)) { html = html.replace(oldNewPw, newNewPw); changed = true; }
    if (html.includes(oldConfPw)) { html = html.replace(oldConfPw, newConfPw); changed = true; }

    const helperFn = `
    function toggleInputFieldPassword(fieldId, btn) {
      const input = document.getElementById(fieldId);
      if (!input) return;
      const isPw = (input.type === 'password');
      input.type = isPw ? 'text' : 'password';
      if (btn) {
        btn.title = isPw ? 'Hide Password' : 'Show Password';
        btn.innerHTML = isPw 
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      }
    }
`;
    if (!html.includes('function toggleInputFieldPassword')) {
      html = html.replace('function togglePasswordVisibility(username) {', helperFn + '\n    function togglePasswordVisibility(username) {');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(idxFile, html, 'utf8');
      console.log('✅ ' + idxFile + ' updated with modal password toggles.');
    }
  }
});

console.log('\n--- STEP 4: Synchronizing Launcher mirrors for Gate and HR portals ---');
const gateMain = 'BALSONS GATE ENTRY MANAGER/frontend/index.html';
const gateMirror = 'BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/index.html';
if (fs.existsSync(gateMain) && fs.existsSync(gateMirror)) {
  fs.copyFileSync(gateMain, gateMirror);
  console.log('✅ Gate Entry mirror synchronized byte-identically.');
}

const hrMain = 'BALSONS HR MANAGER/frontend/index.html';
const hrMirror = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html';
if (fs.existsSync(hrMain) && fs.existsSync(hrMirror)) {
  fs.copyFileSync(hrMain, hrMirror);
  console.log('✅ HR Manager mirror synchronized byte-identically.');
}

console.log('\n--- ALL UPGRADES APPLIED CLEANLY! ---');
