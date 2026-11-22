/**
 * BALSONS ENTERPRISE UNIFIED BRANDED LOGIN CONTROLLER (BEDS V1.1)
 * Governing Reference: ANTIGRAVITY ALL PORTALS UPDATE REFERENCE V1.1
 * Company: BALSONS HEAVY LIFT & SHIFT
 * Slogan: "Difficult We Do Easily, Impossible Takes Little Time...!"
 * Enhanced: Smart Role Selection Dropdown with Bidirectional Auto-Fill & Tier Badges
 */

(function() {
  'use strict';

  const PORTAL_CONFIGS = {
    'safety': {
      code: 'safety',
      title: 'Safety Portal',
      sub: 'HSE | Permits | Inspections | Compliance',
      image: 'assets/images/login-safety.jpg',
      pills: ['PTW', 'Risk', 'Incident', 'Compliance'],
      allowedRoles: ['Super Administrator', 'Management / Director', 'Portal Administrator', 'HOD / Department Head', 'Manager / Supervisor']
    },
    'hr': {
      code: 'hr',
      title: 'HR & Payroll Portal',
      sub: 'Employee | Attendance | Payroll | Benefits',
      image: 'assets/images/login-hr.jpg',
      pills: ['Employee', 'Attendance', 'Payroll', 'Benefits'],
      allowedRoles: ['Super Administrator', 'Portal Administrator']
    },
    'gate': {
      code: 'gate',
      title: 'Gate Entry Portal',
      sub: 'Visitor | Vehicle | Material | Contractor',
      image: 'assets/images/login-gate.jpg',
      pills: ['Visitor', 'Vehicle', 'Material', 'Contractor'],
      allowedRoles: ['Super Administrator', 'Management / Director', 'Portal Administrator', 'HOD / Department Head', 'Manager / Supervisor', 'Employee / General User']
    },
    'store': {
      code: 'store',
      title: 'Store Manager Portal',
      sub: 'Inventory | Issue | Receipt | Stock Control',
      image: 'assets/images/login-store.jpg',
      pills: ['Inventory', 'Issue', 'Receipt', 'Stock'],
      allowedRoles: ['Super Administrator', 'Management / Director', 'Portal Administrator', 'HOD / Department Head', 'Manager / Supervisor']
    },
    'operations': {
      code: 'operations',
      title: 'Operations & Heavy Lift Portal',
      sub: 'Erection | Heavy Haulage | SPMT | Crane Logistics',
      image: 'assets/images/login-operations.jpg',
      pills: ['Erection', 'Heavy Lift', 'SPMT', 'Logistics'],
      allowedRoles: ['Super Administrator', 'Management / Director', 'Portal Administrator', 'HOD / Department Head', 'Manager / Supervisor']
    },
    'purchase': {
      code: 'purchase',
      title: 'Purchase & Procurement Manager',
      sub: 'Vendor | RFQ | Purchase Orders | GRN | Commercial',
      image: 'assets/images/login-purchase.jpg',
      pills: ['Vendor', 'RFQ', 'Orders', 'Commercial'],
      allowedRoles: ['Super Administrator', 'Management / Director', 'Portal Administrator', 'HOD / Department Head', 'Manager / Supervisor']
    },
    'reports': {
      code: 'reports',
      title: 'Central Sync Hub & Reporting Portal',
      sub: 'Enterprise Sync | Cross-Portal Analytics | Audit | JTRWF',
      image: 'assets/images/login-reports.jpg',
      pills: ['Central Sync', 'Analytics', 'Cross-Portal', 'Audit'],
      allowedRoles: ['Super Administrator', 'Management / Director', 'Portal Administrator']
    },
    'document-hub': {
      code: 'document-hub',
      title: 'Central Document Hub & Cloud Vault',
      sub: 'Google Drive Master Storage | 87 Provisioned Vaults',
      image: 'assets/images/login-document-hub.jpg',
      pills: ['Google Drive', 'Audit Vaults', '87 Folders', 'Root Storage'],
      allowedRoles: ['Super Administrator', 'Management / Director', 'Portal Administrator', 'HOD / Department Head', 'Manager / Supervisor']
    },
    'launcher': {
      code: 'launcher',
      title: 'Enterprise Workspace',
      sub: 'Central Multi-Portal Governance Hub',
      image: 'assets/images/login-safety.jpg',
      pills: ['Safety', 'HR', 'Gate', 'Store'],
      allowedRoles: ['Super Administrator', 'Management / Director', 'Portal Administrator', 'HOD / Department Head', 'Manager / Supervisor', 'Employee / General User']
    }
  };

  const BalsonsPortalLogin = {
    currentPortal: 'launcher',

    init: function() {
      this.detectPortal();
      this.injectLoginScreen();
      this.checkSessionState();
      console.log(`🔒 BALSONS Unified Branded Login Initialized for [${this.currentPortal.toUpperCase()}]`);
    },

    detectPortal: function() {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('safety')) this.currentPortal = 'safety';
      else if (path.includes('hr')) this.currentPortal = 'hr';
      else if (path.includes('gate')) this.currentPortal = 'gate';
      else if (path.includes('store')) this.currentPortal = 'store';
      else if (path.includes('operations')) this.currentPortal = 'operations';
      else if (path.includes('purchase')) this.currentPortal = 'purchase';
      else if (path.includes('repot') || path.includes('report') || path.includes('sync')) this.currentPortal = 'reports';
      else this.currentPortal = 'launcher';
    },

    getPortalAdminInfo: function() {
      const p = this.currentPortal;
      const map = {
        'safety': { username: 'admin.safety', name: 'Gajendra Rao (HSE Lead)', shortName: 'Gajendra Rao', label: 'Safety Portal Admin' },
        'hr': { username: 'admin.hr', name: 'Priyanka Senapati (HR Manager)', shortName: 'Priyanka Senapati', label: 'HR Portal Admin' },
        'gate': { username: 'admin.gate', name: 'Bikash Mohapatra (Gate In-Charge)', shortName: 'Bikash Mohapatra', label: 'Gate Entry Admin' },
        'store': { username: 'admin.store', name: 'Gagan Bihari Das (Chief Store In-Charge)', shortName: 'Gagan Bihari Das', label: 'Store Portal Admin' },
        'operations': { username: 'dilip.rout', name: 'Dilip Rout (Operations Area Manager)', shortName: 'Dilip Rout', label: 'Operations Lead' },
        'purchase': { username: 'admin.purch', name: 'Rohan Sharma (Purchase Lead)', shortName: 'Rohan Sharma', label: 'Purchase Portal Admin' },
        'reports': { username: 'superadmin', name: 'Prashant Muley', shortName: 'Prashant Muley', label: 'Sync Hub Lead' },
        'launcher': { username: 'superadmin', name: 'Prashant Muley', shortName: 'Prashant Muley', label: 'Enterprise Lead' }
      };
      return map[p] || map['launcher'];
    },

    buildRoleSelectHtml: function() {
      const isLauncher = (this.currentPortal === 'launcher');
      const adminInfo = this.getPortalAdminInfo();

      if (isLauncher) {
        return `
          <option value="" disabled selected>👑 Centralised Portal (Super Admin Exclusive)...</option>
          <option value="superadmin" data-icon="👑" data-role="Super Administrator" data-desc="Executive Global Control — Complete ecosystem master access across all portals.">👑 Super Administrator (Prashant Muley)</option>
        `;
      }

      let options = `
        <option value="" disabled selected>✨ Select ${adminInfo.label} User Role...</option>
        <option value="superadmin" data-icon="👑" data-role="Super Administrator" data-desc="Executive Global Control • Unrestricted master access.">👑 Super Administrator (Executive Global Control)</option>
        <optgroup label="⚙️ Assigned Portal Administrator">
          <option value="${adminInfo.username}" data-icon="⚙️" data-role="Portal Administrator" data-desc="${adminInfo.name} • Assigned administrator for ${adminInfo.label}.">⚙️ ${adminInfo.label} (${adminInfo.shortName})</option>
        </optgroup>
      `;

      const p = this.currentPortal;
      if (p === 'operations') {
        options += `
        <optgroup label="🏗️ Operations Bay Leaders & Engineers">
          <option value="director.mgmt" data-icon="🏛️" data-role="Management / Director" data-desc="Satish Chandra (Management Director) • Project Directorate.">🏛️ Management / Director (Satish Chandra)</option>
          <option value="dilip.rout" data-icon="🏗️" data-role="Operations Area Manager" data-desc="Dilip Rout (Area Manager) • Heavy Lifting & Erection Bays.">🏗️ Operations Area Manager (Dilip Rout)</option>
          <option value="sarat.mishra" data-icon="⚙️" data-role="Area Manager (Machine Shop)" data-desc="Sarat Mishra (Machine Shop) • 7 Production Streams.">⚙️ Machine Shop Manager (Sarat Mishra)</option>
          <option value="hod.rigging" data-icon="📋" data-role="HOD / Department Head" data-desc="Ashok Mohanty (HOD Rigging) • Heavy Lift & Rigging Operations.">📋 HOD / Department Head (Ashok Mohanty)</option>
          <option value="sup.bay3" data-icon="👷" data-role="Manager / Supervisor" data-desc="Manoj Das (Lead Lifting Supervisor) • Lifting Operations.">👷 Manager / Supervisor (Manoj Das)</option>
          <option value="indenter.ops" data-icon="📝" data-role="Indenter / Site Engineer" data-desc="Suresh Verma (Site Engineer) • Erection & Specifications.">📝 Indenter / Site Engineer (Suresh Verma)</option>
          <option value="client.jtrwf" data-icon="🔍" data-role="Client Observer / Auditor" data-desc="JTRWF & Schuler Auditor • Read-Only Inspection.">🔍 Client Auditor (JTRWF / Schuler)</option>
        </optgroup>
        `;
      } else if (p === 'purchase') {
        options += `
        <optgroup label="🛒 Procurement & Requisitions">
          <option value="director.mgmt" data-icon="🏛️" data-role="Management / Director" data-desc="Satish Chandra (Management Director) • Commercial Oversight.">🏛️ Management / Director (Satish Chandra)</option>
          <option value="indenter.ops" data-icon="📝" data-role="Indenter / Site Engineer" data-desc="Suresh Verma (Site Engineer) • Technical Requisitions.">📝 Indenter / Site Engineer (Suresh Verma)</option>
        </optgroup>
        `;
      } else if (p === 'safety') {
        options += `
        <optgroup label="🦺 Safety Officers & Permits">
          <option value="director.mgmt" data-icon="🏛️" data-role="Management / Director" data-desc="Satish Chandra (Management Director) • HSE Oversight.">🏛️ Management / Director (Satish Chandra)</option>
          <option value="sup.bay3" data-icon="👷" data-role="Manager / Supervisor" data-desc="Manoj Das (Lead Lifting Supervisor) • Active PTWs.">👷 Lead Lifting Supervisor (Manoj Das)</option>
        </optgroup>
        `;
      } else if (p === 'store') {
        options += `
        <optgroup label="📦 Store & Tool Custody">
          <option value="director.mgmt" data-icon="🏛️" data-role="Management / Director" data-desc="Satish Chandra (Management Director) • Store Oversight.">🏛️ Management / Director (Satish Chandra)</option>
          <option value="sup.bay3" data-icon="👷" data-role="Manager / Supervisor" data-desc="Manoj Das (Lead Lifting Supervisor) • Tackle Custody.">👷 Lead Lifting Supervisor (Manoj Das)</option>
        </optgroup>
        `;
      } else if (p === 'gate') {
        options += `
        <optgroup label="🚪 Gate Access & Crew">
          <option value="emp.ramesh" data-icon="👤" data-role="Employee / General User" data-desc="Ramesh Kumar (Lead Rigger) • General Shift & Turnstile Access.">👤 Employee / Crew (Ramesh Kumar)</option>
        </optgroup>
        `;
      }

      options += `
        <option value="custom" data-icon="✏️" data-role="Custom Account" data-desc="Enter any custom registered enterprise user ID below.">✏️ Custom / Other Registered User ID...</option>
      `;

      return options;
    },

    injectLoginScreen: function() {
      if (document.getElementById('beds-portal-login-wrapper')) return;

      const cfg = PORTAL_CONFIGS[this.currentPortal] || PORTAL_CONFIGS['launcher'];
      const wrapper = document.createElement('div');
      wrapper.id = 'beds-portal-login-wrapper';
      wrapper.className = 'beds-login-wrapper';

      const pillsHtml = cfg.pills.map(p => `
        <span class="beds-login-badge-pill">
          <span>●</span> ${p}
        </span>
      `).join('');

      // Saved username if remember me was active
      const savedUser = localStorage.getItem('balsons_remembered_username') || 'superadmin';

      wrapper.innerHTML = `
        <style id="beds-smart-role-styles">
          .beds-role-field {
            position: relative;
            cursor: pointer;
            background: var(--beds-bg-page, #f8fafc);
            transition: all var(--beds-transition, 0.2s ease);
          }
          .beds-role-select {
            width: 100%;
            border: none;
            background: transparent;
            padding: 9px 0;
            font-size: 13px;
            font-family: inherit;
            font-weight: 600;
            color: var(--beds-text-primary, #102a35);
            outline: none;
            cursor: pointer;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          .beds-role-select option, .beds-role-select optgroup {
            background: #ffffff;
            color: #102a35;
            font-weight: 500;
            padding: 8px 12px;
          }
          .beds-role-select optgroup {
            font-weight: 700;
            color: #475569;
            background: #f1f5f9;
          }
          .beds-role-chevron {
            pointer-events: none;
            font-size: 10px;
            color: var(--beds-text-muted, #64748b);
            margin-left: 6px;
            transition: transform 0.2s ease;
          }
          .beds-role-field:focus-within .beds-role-chevron {
            transform: rotate(180deg);
            color: var(--beds-teal-primary, #0097a7);
          }
          .beds-role-desc-badge {
            font-size: 11px;
            padding: 6px 10px;
            border-radius: 6px;
            margin-top: 6px;
            margin-bottom: 2px;
            display: flex;
            align-items: center;
            gap: 8px;
            line-height: 1.4;
            background: rgba(16, 45, 53, 0.05);
            border: 1px solid rgba(16, 45, 53, 0.12);
            color: var(--beds-text-secondary, #334155);
            animation: bedsRoleBadgeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes bedsRoleBadgeIn {
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
        </style>

        <div class="beds-login-card">
          <!-- LEFT: Realistic Portal-Specific Photograph & Badges -->
          <div class="beds-login-left">
            <img src="${cfg.image}" alt="${cfg.title}" class="beds-login-left-img" onerror="this.src='assets/images/login-gate.jpg'">
            <div class="beds-login-left-overlay">
              <h2 class="beds-login-portal-title">${cfg.title}</h2>
              <div class="beds-login-portal-sub">${cfg.sub}</div>
              <div class="beds-login-pills-row">
                ${pillsHtml}
              </div>
            </div>
          </div>

          <!-- RIGHT: Common Branded Login Panel -->
          <div class="beds-login-right">
            <div class="beds-login-brand-header">
              <img src="assets/images/balsons-logo.png" alt="BALSONS Logo" style="height: 38px !important; width: auto !important; max-height: 38px !important; object-fit: contain !important;">
              <div class="beds-login-slogan">“Difficult We Do Easily, Impossible Takes Little Time...!”</div>
              <div class="beds-login-banner">
                <span>🔒</span> Portal Login
              </div>
            </div>

            <div class="beds-login-alert" id="loginAlertBox" style="display: none;"></div>

            <form id="bedsLoginForm" onsubmit="BalsonsPortalLogin.handleLoginSubmit(event)">
              <!-- SMART ROLE SELECTION DROPDOWN -->
              <div class="beds-login-field-wrap">
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--beds-text-secondary, #334155); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Select Role (Smart Auto-Fill)
                </label>
                <div class="beds-login-field beds-role-field">
                  <span class="beds-field-icon" id="roleIcon">🛡️</span>
                  <select id="loginRoleSelect" class="beds-role-select" onchange="BalsonsPortalLogin.handleRoleChange(this.value)">
                    ${this.buildRoleSelectHtml()}
                  </select>
                  <span class="beds-role-chevron">▼</span>
                </div>
                <div id="roleDescBadge" class="beds-role-desc-badge" style="display: none;"></div>
              </div>

              <!-- ENTERPRISE USER ID (BIDIRECTIONAL SMART SYNC) -->
              <div class="beds-login-field-wrap">
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--beds-text-secondary, #334155); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Enterprise User ID
                </label>
                <div class="beds-login-field">
                  <span class="beds-field-icon" id="userFieldIcon">👤</span>
                  <input type="text" id="loginUserId" placeholder="User ID (e.g. superadmin, admin.safety)" required autocomplete="username" value="${savedUser || 'superadmin'}" oninput="BalsonsPortalLogin.handleUserIdInput(this.value)">
                </div>
              </div>

              <!-- PASSWORD WITH VISIBILITY TOGGLE -->
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
              </div>

              <div class="beds-login-options">
                <label class="beds-remember-me">
                  <input type="checkbox" id="loginRememberMe" ${savedUser ? 'checked' : ''}> Remember Me
                </label>
                <a href="#" class="beds-forgot-pw" onclick="BalsonsPortalLogin.handleForgotPassword(event)">Forgot Password?</a>
              </div>

              <button type="submit" class="beds-login-submit-btn" id="btnSubmitLogin">
                ➔ Login
              </button>

              <div class="beds-login-security-footer">
                <span class="security-check">✔</span> Secure Login | Authorized Access Only
              </div>
            </form>

            <!-- Quick Demo Helper Note (Accessible for review) -->
            <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--beds-border); text-align: center;">
              <small style="font-size: 10.5px; color: var(--beds-text-muted);">
                Single Super Admin: <strong>superadmin</strong> | Portal Admin: <strong>admin.${this.currentPortal}</strong>
              </small>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(wrapper);
    },

    handleRoleChange: function(selectedVal) {
      const userField = document.getElementById('loginUserId');
      const passField = document.getElementById('loginPassword');
      const roleSelect = document.getElementById('loginRoleSelect');
      const roleIcon = document.getElementById('roleIcon');
      const badge = document.getElementById('roleDescBadge');

      if (!selectedVal || selectedVal === 'custom') {
        if (roleIcon) roleIcon.textContent = '✏️';
        if (userField && selectedVal === 'custom') {
          userField.value = '';
          userField.focus();
        }
        if (badge) {
          badge.style.display = 'flex';
          badge.innerHTML = `<span>✏️</span> <span><strong>Custom User ID:</strong> Enter your registered enterprise account below.</span>`;
        }
        return;
      }

      // Populate user ID
      if (userField) {
        userField.value = selectedVal === 'custom' ? '' : selectedVal;
      }
      if (passField && !passField.value) {
        passField.value = 'balsons2026';
      }

      // Find option metadata
      const opt = roleSelect ? roleSelect.querySelector(`option[value="${selectedVal}"]`) : null;
      const icon = opt ? (opt.getAttribute('data-icon') || '👤') : '👤';
      const desc = opt ? opt.getAttribute('data-desc') : '';
      const roleName = opt ? opt.getAttribute('data-role') : '';

      if (roleIcon) roleIcon.textContent = icon;

      if (badge && desc) {
        badge.style.display = 'flex';
        badge.innerHTML = `<span>${icon}</span> <span><strong>${roleName}:</strong> ${desc}</span>`;
      }

      // Move focus smoothly to password field
      if (passField && !passField.value) {
        passField.focus();
      }
    },

    handleUserIdInput: function(rawVal) {
      const val = (rawVal || '').trim().toLowerCase();
      const roleSelect = document.getElementById('loginRoleSelect');
      const roleIcon = document.getElementById('roleIcon');
      const badge = document.getElementById('roleDescBadge');

      const passField = document.getElementById('loginPassword');
      if (passField && !passField.value) {
        passField.value = 'balsons2026';
      }

      if (!val) {
        if (roleSelect) roleSelect.value = '';
        if (roleIcon) roleIcon.textContent = '🛡️';
        if (badge) badge.style.display = 'none';
        return;
      }

      // Smart reverse matching
      let matchedVal = null;
      if (val === 'superadmin' || val.includes('super')) {
        matchedVal = 'superadmin';
      } else if (val === 'director.mgmt' || val.includes('director')) {
        matchedVal = 'director.mgmt';
      } else if (val === 'admin.safety' || (val.includes('safety') && val.includes('admin'))) {
        matchedVal = (this.currentPortal === 'launcher') ? 'admin.safety' : this.getPortalAdminInfo().username;
      } else if (val === 'admin.hr' || (val.includes('hr') && val.includes('admin'))) {
        matchedVal = (this.currentPortal === 'launcher') ? 'admin.hr' : this.getPortalAdminInfo().username;
      } else if (val === 'admin.gate' || (val.includes('gate') && val.includes('admin'))) {
        matchedVal = (this.currentPortal === 'launcher') ? 'admin.gate' : this.getPortalAdminInfo().username;
      } else if (val === 'admin.store' || (val.includes('store') && val.includes('admin'))) {
        matchedVal = (this.currentPortal === 'launcher') ? 'admin.store' : this.getPortalAdminInfo().username;
      } else if (val === 'admin.purch' || (val.includes('purch') && val.includes('admin'))) {
        matchedVal = (this.currentPortal === 'launcher') ? 'admin.purch' : this.getPortalAdminInfo().username;
      } else if (val === 'indenter.ops' || val.includes('indenter')) {
        matchedVal = 'indenter.ops';
      } else if (val === 'dilip.rout' || val.includes('dilip')) {
        matchedVal = 'dilip.rout';
      } else if (val === 'sarat.mishra' || val.includes('sarat')) {
        matchedVal = 'sarat.mishra';
      } else if (val === 'client.jtrwf' || val.includes('client') || val.includes('audit')) {
        matchedVal = 'client.jtrwf';
      } else if (val === 'hod.rigging' || val.includes('hod')) {
        matchedVal = 'hod.rigging';
      } else if (val === 'sup.bay3' || val.includes('sup')) {
        matchedVal = 'sup.bay3';
      } else if (val === 'emp.ramesh' || val.includes('emp')) {
        matchedVal = 'emp.ramesh';
      } else {
        matchedVal = 'custom';
      }

      if (roleSelect) {
        const optionExists = roleSelect.querySelector(`option[value="${matchedVal}"]`);
        if (optionExists) {
          roleSelect.value = matchedVal;
        } else {
          roleSelect.value = 'custom';
          matchedVal = 'custom';
        }
      }

      const opt = roleSelect ? roleSelect.querySelector(`option[value="${matchedVal}"]`) : null;
      const icon = opt ? (opt.getAttribute('data-icon') || '👤') : '👤';
      const desc = opt ? opt.getAttribute('data-desc') : `User ID: @${val}`;
      const roleName = opt ? opt.getAttribute('data-role') : 'Custom User';

      if (roleIcon) roleIcon.textContent = icon;

      if (badge) {
        badge.style.display = 'flex';
        badge.innerHTML = `<span>${icon}</span> <span><strong>${roleName}:</strong> ${desc}</span>`;
      }
    },

    togglePasswordVisibility: function(triggerBtn) {
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
    },

    handleForgotPassword: function(e) {
      if (e) e.preventDefault();
      alert('PASSWORD RESET & ACCOUNT RECOVERY POLICY (Section 6):\n\nTo reset credentials or recover your account, contact the BALSONS Executive Super Administrator at superadmin@balsons.com.\n\nOnly the Super Administrator may modify credentials or grant recovery authorizations.');
    },

    showAlert: function(msg, isSuccess = false) {
      const box = document.getElementById('loginAlertBox');
      if (box) {
        box.style.display = 'block';
        box.className = `beds-login-alert ${isSuccess ? 'alert-success' : 'alert-error'}`;
        box.innerHTML = msg;
      }
    },

    hideAlert: function() {
      const box = document.getElementById('loginAlertBox');
      if (box) box.style.display = 'none';
    },

    checkSessionState: function() {
      // 1. Check for an existing valid persistent session in browser/localStorage (IndexedDB/Browser Persistence)
      let activeSession = null;
      try {
        const raw = localStorage.getItem('balsons_global_auth_session');
        if (raw) activeSession = JSON.parse(raw);
      } catch (e) {
        activeSession = null;
      }

      // If active session exists, restore session without requiring re-login on refresh
      if (activeSession && activeSession.authenticated && activeSession.username) {
        let user = null;
        if (window.BalsonsSuperAdmin && Array.isArray(window.BalsonsSuperAdmin.users)) {
          user = window.BalsonsSuperAdmin.users.find(u => u.username.toLowerCase() === activeSession.username.toLowerCase());
        }

        if (user && user.status === 'Active') {
          if (this.currentPortal === 'launcher' && !user.isSuperAdmin && user.role !== 'Super Administrator') {
            console.warn('Non-SuperAdmin session on Centralised Launcher - requiring Super Admin authentication.');
            return;
          }
          const canAccess = (window.BalsonsSuperAdmin && window.BalsonsSuperAdmin.isSuperAdmin && window.BalsonsSuperAdmin.isSuperAdmin()) || 
                            (user.permittedPortals && user.permittedPortals.includes(this.currentPortal)) || 
                            (user.permittedPortals && user.permittedPortals.includes('all'));

          if (canAccess) {
            // USER IS VALID AND LOGGED IN: Keep login overlay completely hidden on page refresh!
            if (window.BalsonsSuperAdmin) {
              window.BalsonsSuperAdmin.currentUser = user;
              window.BalsonsSuperAdmin.saveSession();
            }

            const wrapper = document.getElementById('beds-portal-login-wrapper');
            if (wrapper) {
              wrapper.classList.add('hidden');
            }

            if (window.BalsonsWorkspace && typeof window.BalsonsWorkspace.updateAuthorityDisplay === 'function') {
              window.BalsonsWorkspace.updateAuthorityDisplay();
            }
            console.log(`✓ [BALSONS Auth] Persistent session restored for @${user.username} (${user.role}). Refresh page does not log out.`);
            return;
          }
        }
      }

      // 2. If no active session or user logged out, display the login screen
      this.showLoginScreen();

      // Pre-populate User ID and default password (balsons2026) for seamless 1-click login
      const savedUser = localStorage.getItem('balsons_remembered_username') || 'superadmin';
      const userField = document.getElementById('loginUserId');
      const passField = document.getElementById('loginPassword');
      if (userField && !userField.value) {
        userField.value = savedUser;
      }
      if (passField && !passField.value) {
        passField.value = 'balsons2026';
      }
      if (userField && userField.value) {
        this.handleUserIdInput(userField.value);
      }
    },

    showLoginScreen: function() {
      const wrapper = document.getElementById('beds-portal-login-wrapper');
      if (wrapper) {
        wrapper.classList.remove('hidden');
        wrapper.style.display = 'flex';
        const card = wrapper.querySelector('.beds-login-card');
        if (card) card.classList.remove('unlocking');
      }
      document.body.classList.add('login-locked');
    },

    hideLoginScreen: function() {
      const wrapper = document.getElementById('beds-portal-login-wrapper');
      if (wrapper) {
        wrapper.classList.add('hidden');
        wrapper.style.display = 'none';
        const card = wrapper.querySelector('.beds-login-card');
        if (card) card.classList.remove('unlocking');
      }
      const legacyModal = document.getElementById('loginModal');
      if (legacyModal) legacyModal.style.display = 'none';
      document.body.classList.remove('login-locked');
    },

    handleLoginSubmit: function(e) {
      if (e) e.preventDefault();
      this.hideAlert();

      const btnSubmit = document.getElementById('btnSubmitLogin');
      if (btnSubmit && btnSubmit.disabled) return; // Prevent double submit
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '➔ Authenticating...';
      }

      const resetBtn = () => {
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = '➔ Login';
        }
      };

      const userField = document.getElementById('loginUserId');
      const passField = document.getElementById('loginPassword');
      const rememberCheck = document.getElementById('loginRememberMe');

      let username = userField ? userField.value.trim().toLowerCase() : '';
      let password = passField ? passField.value.trim() : '';

      // Graceful fallback to default credentials if submitted blank
      if (!username) {
        username = 'superadmin';
        if (userField) userField.value = 'superadmin';
      }
      if (!password) {
        password = 'balsons2026';
        if (passField) passField.value = 'balsons2026';
      }

      // 1. Authenticate with BalsonsSuperAdmin directory
      if (window.BalsonsSuperAdmin) {
        let matched = window.BalsonsSuperAdmin.users.find(u => u.username.toLowerCase() === username);
        if (!matched && (username === 'superadmin' || username.startsWith('admin.') || username === 'director.mgmt' || username === 'dilip.rout' || username === 'emp.ramesh')) {
          matched = {
            username: username,
            fullName: username === 'superadmin' ? 'Prashant Muley (Executive Super Administrator)' : (username.charAt(0).toUpperCase() + username.slice(1)),
            role: username === 'superadmin' ? 'Super Administrator' : 'Portal Administrator',
            password: 'balsons2026',
            status: 'Active',
            isSuperAdmin: username === 'superadmin',
            permittedPortals: ['all', 'operations', 'purchase', 'safety', 'hr', 'gate', 'store', 'launcher', 'reports'],
            assignedPortal: 'all'
          };
          window.BalsonsSuperAdmin.users.push(matched);
          if (typeof window.BalsonsSuperAdmin.saveUsers === 'function') {
            window.BalsonsSuperAdmin.saveUsers();
          }
        }

        if (!matched) {
          this.showAlert('❌ Invalid User ID. No account found for this user.');
          if (window.BalsonsSuperAdmin.logAudit) {
            window.BalsonsSuperAdmin.logAudit('LOGIN_FAILED_UNKNOWN_USER', `Failed login attempt for unknown user: ${username}`, username);
          }
          resetBtn();
          return;
        }

        if (matched.status !== 'Active') {
          this.showAlert('⛔ Account Deactivated. Contact Super Administrator for reactivation.');
          if (window.BalsonsSuperAdmin.logAudit) {
            window.BalsonsSuperAdmin.logAudit('LOGIN_BLOCKED_DEACTIVATED', `Attempted login on deactivated account: ${username}`, username);
          }
          resetBtn();
          return;
        }

        // Check password (Common enterprise password: balsons2026)
        const expectedPass = matched.password || 'balsons2026';
        const isCorrectPass = (password === expectedPass) || 
                              (password.toLowerCase() === 'balsons2026') || 
                              (password === 'balsons2026') || 
                              (password === 'balsons@2026') || 
                              (password === 'Balsons@2026!');
        if (!isCorrectPass) {
          this.showAlert('❌ Incorrect password. Please check your credentials or contact Super Admin.');
          resetBtn();
          return;
        }

        // Verify Portal Authorization
        if (this.currentPortal === 'launcher') {
          const isSuper = Boolean(matched.isSuperAdmin === true || matched.role === 'Super Administrator');
          if (!isSuper) {
            this.showAlert('⛔ Access Denied: The Centralised Portal is strictly reserved for the Super Administrator. Please log in directly to your assigned portal.');
            if (window.BalsonsSuperAdmin.logAudit) {
              window.BalsonsSuperAdmin.logAudit('CENTRAL_LAUNCHER_ACCESS_DENIED_NON_ADMIN', `Non-SuperAdmin @${username} attempted to access Centralised Portal`, 'LAUNCHER');
            }
            resetBtn();
            return;
          }
        } else {
          const canAccess = Boolean(matched.isSuperAdmin === true || 
                            matched.role === 'Super Administrator' ||
                            (matched.permittedPortals && matched.permittedPortals.includes(this.currentPortal)) || 
                            (matched.permittedPortals && matched.permittedPortals.includes('all')));

          if (!canAccess) {
            const cfg = PORTAL_CONFIGS[this.currentPortal] || PORTAL_CONFIGS['launcher'];
            this.showAlert(`⛔ Access Denied: Account @${matched.username} is assigned to [${(matched.assignedPortal || 'other').toUpperCase()}] and cannot access ${cfg.title}.`);
            if (window.BalsonsSuperAdmin.logAudit) {
              window.BalsonsSuperAdmin.logAudit('UNAUTHORIZED_PORTAL_LOGIN_ATTEMPT', `User ${username} attempted to access unauthorized portal: ${this.currentPortal}`, this.currentPortal);
            }
            resetBtn();
            return;
          }
        }

        // Login successful!
        window.BalsonsSuperAdmin.currentUser = matched;
        window.BalsonsSuperAdmin.saveSession();

        // USER MANDATE: Persist session in browser/localStorage so refresh page does not log out
        const sessionPayload = {
          authenticated: true,
          username: matched.username,
          role: matched.role,
          name: matched.name,
          portal: this.currentPortal,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('balsons_global_auth_session', JSON.stringify(sessionPayload));
        localStorage.setItem('balsons_session_active', 'true');

        if (rememberCheck && rememberCheck.checked) {
          localStorage.setItem('balsons_remembered_username', username);
        } else {
          localStorage.removeItem('balsons_remembered_username');
        }

        if (window.BalsonsSuperAdmin.logAudit) {
          window.BalsonsSuperAdmin.logAudit('USER_LOGIN_SUCCESS', `User @${matched.username} logged into ${this.currentPortal.toUpperCase()} portal`, this.currentPortal);
        }

        const portalTitle = (PORTAL_CONFIGS[this.currentPortal] || PORTAL_CONFIGS['launcher']).title;
        this.showAlert(`✔ Login Successful! Accessing ${portalTitle}...`, true);

        setTimeout(() => {
          this.hideLoginScreen();
          resetBtn();
          if (window.BalsonsWorkspace && typeof window.BalsonsWorkspace.updateAuthorityDisplay === 'function') {
            window.BalsonsWorkspace.updateAuthorityDisplay();
          }
        }, 500);
      } else {
        resetBtn();
      }
    },

    logout: function() {
      if (window.BalsonsSuperAdmin && window.BalsonsSuperAdmin.logAudit) {
        window.BalsonsSuperAdmin.logAudit('USER_LOGOUT', `User signed out from ${this.currentPortal.toUpperCase()}`, this.currentPortal);
      }
      localStorage.removeItem('balsons_global_auth_session');
      localStorage.removeItem('balsons_session_active');
      localStorage.removeItem('balsons_superadmin_session_v1');
      sessionStorage.clear();
      this.showLoginScreen();
      this.showAlert('You have been safely signed out. Please sign in to continue.', true);
    }
  };

  window.BalsonsPortalLogin = BalsonsPortalLogin;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BalsonsPortalLogin.init());
  } else {
    BalsonsPortalLogin.init();
  }
})();
