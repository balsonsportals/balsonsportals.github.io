const fs = require('fs');

let content = fs.readFileSync('assets/js/beds-portal-login.js', 'utf8');
const isCrlf = content.includes('\r\n');
console.log('Is CRLF?', isCrlf);

function norm(s) {
  return isCrlf ? s.replace(/\r?\n/g, '\r\n') : s.replace(/\r\n/g, '\n');
}

const oldStyleEnd = norm(`          @keyframes bedsRoleBadgeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>`);

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

const oldToggleFn = norm(`    togglePasswordVisibility: function() {
      const pwInput = document.getElementById('loginPassword');
      if (pwInput) {
        pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
      }
    },`);

console.log('Matches oldStyleEnd with norm?', content.includes(oldStyleEnd));
console.log('Matches oldPwHtml with norm?', content.includes(oldPwHtml));
console.log('Matches oldToggleFn with norm?', content.includes(oldToggleFn));
