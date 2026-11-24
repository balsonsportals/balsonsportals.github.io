/**
 * BALSONS ENTERPRISE WORKSPACE CONTROLLER (BEDS V2.0)
 * Universal Department Switcher, Dedicated Dual-Sync Google Sheet Engine, 
 * Scheduled Auto-Reload Bi-Directional Parity Engine,
 * & Global Super Administrator Access Governance Integration (Policy V1.0)
 * Applicable to all BALSONS operational portals (Safety, HR, Gate Entry, Store, Purchase, Operations, Launcher)
 */

(function() {
  const PORTAL_DATABASES = {
    'store': {
      id: '1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ',
      name: 'Store',
      fullName: 'Store & Heavy Rigging Inventory Master',
      scriptUrl: 'https://script.google.com/macros/s/AKfycbyT6wmujgCq92wK1qUtiZLCTiajMfD8gXlmAoz1iJwDE92JStSTt0o80QX-7pRgI27u/exec'
    },
    'safety': {
      id: '1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0',
      name: 'Safety',
      fullName: 'Safety, EHS & PTW Governance',
      scriptUrl: 'https://script.google.com/macros/s/AKfycbwgutbfm18PJPhsj_3-0C9Kt5AeaLqvGzoP8RMPab6ESzfm5SBkEPf8YslN8tJhOZJL/exec'
    },
    'hr': {
      id: '1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw',
      name: 'HR',
      fullName: 'HR & Dual-Wage Payroll Master',
      scriptUrl: 'https://script.google.com/macros/s/AKfycbyNreoI0QmRsiPgIBbJSh8YUjZCBa5f4E2UpsG3y03fcdcyUV_u76ZTCAcKfmAuXOWFmw/exec'
    },
    'gate': {
      id: '1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o',
      name: 'Gate',
      fullName: 'Gate Entry & Turnstile Access Master',
      scriptUrl: 'https://script.google.com/macros/s/AKfycbzqG6THkjhA-8324dOg9cbMAc3IWCZdmp9sT6zTdPINUWAgB0cOm4H4TFCWprYmT9lXNg/exec'
    },
    'operations': {
      id: '1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E',
      name: 'Operations',
      fullName: 'Operations Erection & Heavy Lift Master',
      scriptUrl: 'https://script.google.com/macros/s/1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny/exec'
    },
    'purchase': {
      id: '1ANnu4X2dR0EITq5RvkyfMv1Xfz30Ba26IKjc40uyj_c',
      name: 'Purchase',
      fullName: 'Commercial Procurement & Vendor Master',
      scriptUrl: 'https://script.google.com/macros/s/1BPmt-vDa-pBy07quE1wq7FY6kq8VnQJPUNIx1GrlSBD5UO9v3FflrZZN/exec'
    },
    'reports': {
      id: '1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ',
      name: 'Central Sync Hub',
      fullName: 'Central Sync Hub & Master Reporting'
    },
    'launcher': {
      id: '1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ',
      name: 'Ecosystem',
      fullName: 'Central Enterprise Launcher'
    }
  };

  const DEPARTMENTS = [
    { code: 'safety', name: '🛡️ Safety & PTW Manager', rootPath: 'BALSONS SAFETY MANAGER/frontend/index.html' },
    { code: 'hr', name: '👥 HR & Dual-Wage Payroll', rootPath: 'BALSONS HR MANAGER/frontend/index.html' },
    { code: 'gate', name: '🚧 Gate Entry & Turnstile Access', rootPath: 'BALSONS GATE ENTRY MANAGER/frontend/index.html' },
    { code: 'store', name: '📦 Store & Rigging Tackles', rootPath: 'BALSONS STORE MANAGER/frontend/index.html' },
    { code: 'operations', name: '🏗️ Operations & Heavy Lift', rootPath: 'BALSONS OPERATIONS MANAGER/index.html' },
    { code: 'purchase', name: '📑 Purchase & Vendor Manager', rootPath: 'BALSONS PURCHASE MANAGER/index.html' },
    { code: 'reports', name: '🌐 Central Sync Hub & Reports', rootPath: 'BALSONS REPOTS PORTAL/index.html' },
    { code: 'launcher', name: '🚀 Central Enterprise Launcher', rootPath: 'index.html' }
  ];

  const BalsonsWorkspace = {
    isDualSyncing: false,
    autoSyncIntervalSeconds: 30,
    autoSyncCountdown: 30,
    autoSyncTimerId: null,
    OUTBOX_STORAGE_KEY: 'beds_pending_mutations_queue',

    init: function() {
      this.injectEnterpriseTopbar();
      this.injectMobileHamburgerAndDrawer();
      this.injectToastContainer();
      this.bindGlobalEvents();
      this.updateAuthorityDisplay();
      this.initScheduledAutoReload();
      console.log('✅ BALSONS Enterprise Workspace, Scheduled Bi-Directional Auto-Reload Dual-Sync Engine Initialized');
    },

    getRootPrefix: function() {
      const p = window.location.pathname.replace(/\\/g, '/').toLowerCase();
      if (p.includes('/frontend/')) return '../../';
      if (p.includes('/balsons enterprise launcher/') || 
          p.includes('/balsons operations manager/') || 
          p.includes('/balsons purchase manager/') || 
          p.includes('/balsons repots portal/')) return '../';
      return '';
    },

    getDeptHref: function(dept) {
      if (typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.includes('github.io')) {
        const ghMap = {
          'safety': '/BALSONS_SAFETY_PORTAL/frontend/index.html',
          'hr': '/BALSONS_HR_PORTAL/frontend/index.html',
          'gate': '/BALSONS_GATE_ENTRY_PORTAL/frontend/index.html',
          'store': '/BALSONS_STORE_MANAGER/frontend/index.html',
          'launcher': '/index.html'
        };
        if (ghMap[dept.code]) return ghMap[dept.code];
      }
      return this.getRootPrefix() + dept.rootPath;
    },

    getCurrentPortalCode: function() {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('safety')) return 'safety';
      if (path.includes('hr')) return 'hr';
      if (path.includes('gate')) return 'gate';
      if (path.includes('store')) return 'store';
      if (path.includes('operations')) return 'operations';
      if (path.includes('purchase')) return 'purchase';
      if (path.includes('repot') || path.includes('report') || path.includes('sync')) return 'reports';
      return 'launcher';
    },

    getCurrentPortalDb: function() {
      const code = this.getCurrentPortalCode();
      return PORTAL_DATABASES[code] || PORTAL_DATABASES['launcher'];
    },

    handleDeptClick: function(e, deptCode, targetHref) {
      if (window.BalsonsSuperAdmin && !window.BalsonsSuperAdmin.canAccessPortal(deptCode)) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        window.BalsonsSuperAdmin.showAccessRestrictedModal(deptCode);
        return false;
      }
      return true;
    },

    handleAuthorityClick: function() {
      if (window.BalsonsSuperAdmin) {
        if (window.BalsonsSuperAdmin.isSuperAdmin()) {
          window.BalsonsSuperAdmin.openGovernanceModal();
        } else {
          window.BalsonsSuperAdmin.openRoleSwitchModal();
        }
      }
    },

    updateAuthorityDisplay: function() {
      const container = document.getElementById('bedsTopbarAuthority');
      if (!container || !window.BalsonsSuperAdmin) return;

      const user = window.BalsonsSuperAdmin.getCurrentUser();
      const isSuper = window.BalsonsSuperAdmin.isSuperAdmin();

      if (isSuper) {
        container.className = 'beds-topbar-authority superadmin';
        container.title = 'Click to open Global Super Administrator Governance Console';
        container.innerHTML = `
          <span>👑</span>
          <span><strong>SUPER ADMINISTRATOR</strong> · ALL PORTALS · ALL DATA · COMPLETE CONTROL</span>
        `;
      } else {
        const role = user.role || 'GUEST';
        const roleName = user.roleName || 'Portal Operator';
        const dept = user.department || 'General';
        container.className = 'beds-topbar-authority';
        container.title = `Current Access: ${role} (${dept}). Click to switch role.`;
        container.innerHTML = `
          <span>🛡️</span>
          <span><strong>${role}</strong> · ${roleName} (${dept})</span>
        `;
      }
    },

    injectEnterpriseTopbar: function() {
      if (document.getElementById('beds-enterprise-topbar')) return;

      const currentPortal = this.getCurrentPortalCode();
      const db = this.getCurrentPortalDb();
      const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/' + db.id + '/edit';

      const deptLinksHtml = DEPARTMENTS.map(d => {
        const targetHref = this.getDeptHref(d);
        const isActive = d.code === currentPortal;
        return `
          <a href="${targetHref}" onclick="return BalsonsWorkspace.handleDeptClick(event, '${d.code}', '${targetHref}')" class="beds-dept-item ${isActive ? 'active' : ''}">
            <span>${d.name}</span>
            ${isActive ? '<span style="font-size:10px; color:var(--beds-teal-primary); margin-left:auto;">● Active</span>' : ''}
          </a>
        `;
      }).join('');

      const topbar = document.createElement('div');
      topbar.id = 'beds-enterprise-topbar';
      topbar.className = 'beds-enterprise-topbar';
      topbar.innerHTML = `
        <div class="beds-topbar-left">
          <span class="beds-topbar-brand">
            🏢 BALSONS ENTERPRISE WORKSPACE
          </span>
          <span class="beds-topbar-divider">|</span>
          <span class="beds-topbar-project">JTRWF Khordha Project</span>
          <span class="beds-topbar-divider">|</span>
          <div class="beds-dept-dropdown" id="bedsDeptDropdown">
            <button class="beds-dept-toggle" onclick="BalsonsWorkspace.toggleDeptDropdown(event)" type="button">
              <span>⚡ Switch Department ▾</span>
            </button>
            <div class="beds-dept-menu">
              <div style="padding: 6px 14px; font-size: 10px; font-weight: 800; text-transform: uppercase; color: var(--beds-text-muted); border-bottom: 1px solid var(--beds-border-subtle);">
                BALSONS OPERATIONAL PORTALS
              </div>
              ${deptLinksHtml}
            </div>
          </div>
        </div>

        <div class="beds-topbar-center">
          <div class="beds-topbar-authority" id="bedsTopbarAuthority" onclick="BalsonsWorkspace.handleAuthorityClick()">
            <!-- Populated by updateAuthorityDisplay() -->
          </div>
        </div>

        <div class="beds-topbar-right">
          <button class="beds-topbar-role-btn" onclick="window.BalsonsSuperAdmin ? window.BalsonsSuperAdmin.openRoleSwitchModal() : null" type="button" title="Switch Policy Role">
            👤 Switch Role
          </button>
          <button class="beds-topbar-role-btn" onclick="window.BalsonsPortalLogin ? window.BalsonsPortalLogin.logout() : null" type="button" title="Sign Out / Lock Portal" style="background: rgba(230, 70, 70, 0.2); border-color: rgba(230, 70, 70, 0.4); color: #FCA5A5;">
            🔒 Sign Out
          </button>
          <a href="${spreadsheetUrl}" target="_blank" class="beds-topbar-sync-pill" id="bedsSheetSyncPill" title="${db.fullName} (Click to Open: ${db.id})">
            <span class="pulse-dot"></span>
            <span class="sync-text">${db.name} DB Sync: <strong>LIVE</strong></span>
            <span class="sheet-id-chip" style="font-family: monospace; font-size: 9.5px; opacity: 0.85;">${db.id.substring(0, 8)}...</span>
            <span class="auto-sync-chip" id="bedsAutoSyncChip" style="font-size: 9.5px; background: rgba(0,0,0,0.25); padding: 1.5px 5px; border-radius: 3px; font-weight: 700; margin-left: 4px;">Auto: 30s</span>
          </a>
          <button class="beds-topbar-sync-btn" onclick="BalsonsWorkspace.triggerDualSync(false)" type="button" title="Force Immediate Bi-Directional Dual Sync for ${db.name}">
            ⚡ Sync ${db.name} Database
          </button>
        </div>
      `;

      // Insert at very top of body
      document.body.insertBefore(topbar, document.body.firstChild);
    },

    toggleDeptDropdown: function(e) {
      if (e) e.stopPropagation();
      const dd = document.getElementById('bedsDeptDropdown');
      if (dd) dd.classList.toggle('open');
    },

    injectMobileHamburgerAndDrawer: function() {
      const header = document.querySelector('header');
      if (header && !document.getElementById('btn-mobile-hamburger')) {
        const brandWrap = header.querySelector('.brand-wrap') || header.querySelector('.brand') || header;
        const btn = document.createElement('button');
        btn.id = 'btn-mobile-hamburger';
        btn.className = 'beds-mobile-hamburger';
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-label', 'Open Mobile Menu');
        btn.innerHTML = '☰ <span>Menu</span>';
        btn.onclick = () => this.openMobileDrawer();
        header.insertBefore(btn, header.firstChild);
      }

      if (!document.getElementById('beds-mobile-nav-drawer')) {
        const db = this.getCurrentPortalDb();
        const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/' + db.id + '/edit';

        const backdrop = document.createElement('div');
        backdrop.id = 'beds-drawer-backdrop';
        backdrop.className = 'beds-drawer-backdrop';
        backdrop.onclick = () => this.closeMobileDrawer();
        document.body.appendChild(backdrop);

        const drawer = document.createElement('div');
        drawer.id = 'beds-mobile-nav-drawer';
        drawer.className = 'beds-mobile-drawer';
        drawer.innerHTML = `
          <div class="beds-drawer-header">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="assets/images/balsons-logo.png" onerror="this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" alt="BALSONS" style="height: 32px; width: auto; object-fit: contain;">
              <div>
                <strong style="font-size: 13px; color: var(--beds-charcoal-heading); display: block; line-height: 1.2;">BALSONS PORTALS</strong>
                <small style="font-size: 10px; color: var(--beds-teal-primary); font-weight: 700;">JTRWF ENTERPRISE WORKSPACE</small>
              </div>
            </div>
            <button class="beds-drawer-close" onclick="BalsonsWorkspace.closeMobileDrawer()">&times;</button>
          </div>

          <div class="beds-drawer-body">
            <div>
              <div class="beds-drawer-group-title">👑 Authority & Governance</div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <button class="beds-drawer-nav-item" onclick="BalsonsWorkspace.handleAuthorityClick(); BalsonsWorkspace.closeMobileDrawer();" style="background: rgba(245, 158, 11, 0.12); color: #D97706; border-color: rgba(245, 158, 11, 0.3);">
                  <span>👑</span>
                  <strong>Super Admin Governance Console</strong>
                </button>
                <button class="beds-drawer-nav-item" onclick="window.BalsonsSuperAdmin.openRoleSwitchModal(); BalsonsWorkspace.closeMobileDrawer();" style="background: rgba(0, 151, 178, 0.08); color: var(--beds-teal-primary); border-color: rgba(0, 151, 178, 0.25);">
                  <span>👤</span>
                  <strong>Switch Authority Role (6 Tiers)</strong>
                </button>
              </div>
            </div>

            <div>
              <div class="beds-drawer-group-title">⚡ Quick Access</div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <button class="beds-drawer-nav-item" onclick="BalsonsWorkspace.triggerDualSync(false); BalsonsWorkspace.closeMobileDrawer();" style="background: rgba(16, 185, 129, 0.1); color: #059669; border-color: rgba(16, 185, 129, 0.3);">
                  <span>⚡</span>
                  <strong>Dual-Sync ${db.name} DB Now</strong>
                </button>
                <button class="beds-drawer-nav-item" onclick="BalsonsWorkspace.handleQuickAction('dossier-360')" style="background: rgba(0, 151, 178, 0.1); color: var(--beds-teal-primary); border-color: rgba(0, 151, 178, 0.3);">
                  <span>📄</span>
                  <strong>360° Workforce Dossier</strong>
                </button>
              </div>
            </div>

            <div id="drawer-dynamic-nav-container">
              <div class="beds-drawer-group-title">📑 Portal Navigation Modules</div>
              <div id="drawer-dynamic-links" style="display: flex; flex-direction: column; gap: 4px;"></div>
            </div>

            <div>
              <div class="beds-drawer-group-title">🏢 Switch Department Portal</div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                ${this.renderDrawerDeptLinks()}
              </div>
            </div>

            <div style="padding-top: 12px; border-top: 1px solid var(--beds-border-subtle); display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; color: var(--beds-text-muted);">BEDS V2.0 · Locked SAM-2026</span>
              <a href="${spreadsheetUrl}" target="_blank" style="font-size: 11px; color: #10B981; font-weight: 700; text-decoration: none;">
                📊 Open ${db.name} Sheet ↗
              </a>
            </div>
          </div>
        `;
        document.body.appendChild(drawer);
        this.populateDrawerDynamicNav();
      }
    },

    renderDrawerDeptLinks: function() {
      const currentPortal = this.getCurrentPortalCode();
      return DEPARTMENTS.map(d => {
        const targetHref = this.getDeptHref(d);
        const isActive = d.code === currentPortal;
        return `
          <a href="${targetHref}" onclick="BalsonsWorkspace.closeMobileDrawer(); return BalsonsWorkspace.handleDeptClick(event, '${d.code}', '${targetHref}')" class="beds-drawer-nav-item ${isActive ? 'active' : ''}">
            <span>${d.name}</span>
            ${isActive ? '<span style="font-size:10px; color:#10B981; margin-left:auto;">● Active</span>' : ''}
          </a>
        `;
      }).join('');
    },

    populateDrawerDynamicNav: function() {
      const container = document.getElementById('drawer-dynamic-links');
      if (!container) return;

      const mainNav = document.querySelector('nav') || document.querySelector('.main-nav');
      if (!mainNav) {
        container.innerHTML = `<span style="font-size: 12px; color: var(--beds-text-muted); padding: 6px;">Portal modules ready.</span>`;
        return;
      }

      const buttons = mainNav.querySelectorAll('button[data-target], button[data-view], a[data-target], a[data-view]');
      if (buttons && buttons.length > 0) {
        container.innerHTML = Array.from(buttons).map(b => {
          const target = b.getAttribute('data-target') || b.getAttribute('data-view') || '';
          const label = b.innerText.trim();
          return `
            <button class="beds-drawer-nav-item" onclick="BalsonsWorkspace.navigateToTarget('${target}')">
              <span>👉</span>
              <span>${label}</span>
            </button>
          `;
        }).join('');
      } else {
        container.innerHTML = `<span style="font-size: 12px; color: var(--beds-text-muted); padding: 6px;">Portal navigation loaded.</span>`;
      }
    },

    navigateToTarget: function(target) {
      this.closeMobileDrawer();
      if (window.BalsonsSafetyApp && typeof window.BalsonsSafetyApp.switchView === 'function') {
        window.BalsonsSafetyApp.switchView(target);
      } else if (window.BalsonsStoreApp && typeof window.BalsonsStoreApp.switchView === 'function') {
        window.BalsonsStoreApp.switchView(target);
      } else if (typeof window.switchHrTab === 'function') {
        let t = target.replace('view-', '').replace('tab-', '');
        if (t === 'dossier-360' || t.includes('dossier')) t = 'dossier-360';
        window.switchHrTab(t);
      } else if (typeof window.switchTab === 'function') {
        let t = target.replace('view-', '').replace('tab-', '');
        if (t === 'dossier-360' || t.includes('dossier')) t = 'gate-dossier-360';
        window.switchTab(t);
      }
    },

    handleQuickAction: function(action) {
      this.closeMobileDrawer();
      if (action === 'dossier-360') {
        if (window.Balsons360Dossier) {
          window.Balsons360Dossier.openModal('EMP-2026-0001');
        } else {
          this.navigateToTarget('view-dossier-360');
        }
      }
    },

    openMobileDrawer: function() {
      const drawer = document.getElementById('beds-mobile-nav-drawer');
      const backdrop = document.getElementById('beds-drawer-backdrop');
      if (drawer) drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    closeMobileDrawer: function() {
      const drawer = document.getElementById('beds-mobile-nav-drawer');
      const backdrop = document.getElementById('beds-drawer-backdrop');
      if (drawer) drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    },

    injectToastContainer: function() {
      if (!document.getElementById('beds-toast-container')) {
        const container = document.createElement('div');
        container.id = 'beds-toast-container';
        container.className = 'beds-toast-container';
        document.body.appendChild(container);
      }
    },

    showToast: function(message, type = 'success') {
      const container = document.getElementById('beds-toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `beds-toast toast-${type}`;
      const icon = type === 'success' ? '✅' : (type === 'warning' ? '⚠️' : 'ℹ️');
      toast.innerHTML = `
        <span style="font-size: 16px;">${icon}</span>
        <div style="flex: 1; line-height: 1.35;">${message}</div>
      `;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 260);
      }, 4200);
    },

    // =========================================================================
    // SCHEDULED AUTO-RELOAD BI-DIRECTIONAL DUAL-SYNC ENGINE
    // =========================================================================
    initScheduledAutoReload: function() {
      // 1. Initial sync after 1500ms
      setTimeout(() => {
        this.triggerDualSync(true);
      }, 1500);

      // 2. Scheduled 30-second loop with live second-by-second countdown
      if (this.autoSyncTimerId) clearInterval(this.autoSyncTimerId);
      this.autoSyncCountdown = this.autoSyncIntervalSeconds;

      this.autoSyncTimerId = setInterval(() => {
        this.autoSyncCountdown--;
        this.updateAutoSyncPillCountdown();

        if (this.autoSyncCountdown <= 0) {
          this.autoSyncCountdown = this.autoSyncIntervalSeconds;
          this.triggerDualSync(true);
        }
      }, 1000);

      // 3. Tab visibility change & Online triggers
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          console.log('[BEDS Auto-Sync] Tab activated, running instant parity sync...');
          this.autoSyncCountdown = this.autoSyncIntervalSeconds;
          this.triggerDualSync(true);
        }
      });

      window.addEventListener('online', () => {
        console.log('[BEDS Auto-Sync] Network online, flushing outbox & syncing database...');
        this.autoSyncCountdown = this.autoSyncIntervalSeconds;
        this.triggerDualSync(false);
      });
    },

    updateAutoSyncPillCountdown: function() {
      const chip = document.getElementById('bedsAutoSyncChip');
      if (chip) {
        chip.textContent = `Auto: ${this.autoSyncCountdown}s`;
      }
    },

    queueMutation: function(portal, action, payload) {
      try {
        const queue = JSON.parse(localStorage.getItem(this.OUTBOX_STORAGE_KEY) || '[]');
        const mutation = {
          id: 'MUT-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          portal: portal || this.getCurrentPortalCode(),
          action: action,
          payload: payload,
          timestamp: new Date().toISOString(),
          status: 'PENDING'
        };
        queue.push(mutation);
        localStorage.setItem(this.OUTBOX_STORAGE_KEY, JSON.stringify(queue));
        console.log(`[BEDS Auto-Sync] Outbox mutation queued (${mutation.id}): ${action}`);
        this.flushMutationQueue();
      } catch (e) {
        console.warn('[BEDS Auto-Sync] Failed to queue mutation:', e);
      }
    },

    flushMutationQueue: async function() {
      try {
        const raw = localStorage.getItem(this.OUTBOX_STORAGE_KEY);
        if (!raw) return;
        const queue = JSON.parse(raw);
        if (!Array.isArray(queue) || queue.length === 0) return;

        const currentPortal = this.getCurrentPortalCode();
        const pendingForThis = queue.filter(item => item.portal === currentPortal);
        if (pendingForThis.length === 0) return;

        console.log(`[BEDS Auto-Sync] Flushing ${pendingForThis.length} pending mutation(s) for ${currentPortal}...`);
        const remaining = queue.filter(item => item.portal !== currentPortal);

        const db = this.getCurrentPortalDb();
        for (const item of pendingForThis) {
          try {
            if (db && db.scriptUrl) {
              const res = await fetch(db.scriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                  action: item.action,
                  payload: item.payload,
                  clientTimestamp: item.timestamp,
                  requestId: item.id
                }),
                redirect: 'follow'
              });
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              console.log(`[BEDS Auto-Sync] Flushed mutation ${item.id} successfully to Google Sheet.`);
            }
          } catch (itemErr) {
            console.warn(`[BEDS Auto-Sync] Mutation flush deferred for ${item.id}:`, itemErr.message);
            remaining.push(item);
          }
        }
        localStorage.setItem(this.OUTBOX_STORAGE_KEY, JSON.stringify(remaining));
      } catch (err) {
        console.warn('[BEDS Auto-Sync] Error during flushMutationQueue:', err);
      }
    },

    triggerDualSync: async function(isSilent = false) {
      if (this.isDualSyncing) return;
      this.isDualSyncing = true;
      this.autoSyncCountdown = this.autoSyncIntervalSeconds;

      const currentPortal = this.getCurrentPortalCode();
      const db = this.getCurrentPortalDb();
      const pill = document.getElementById('bedsSheetSyncPill');
      const autoChip = document.getElementById('bedsAutoSyncChip');

      if (pill) {
        pill.style.background = 'rgba(245, 158, 11, 0.2)';
        pill.style.borderColor = '#F59E0B';
        pill.style.color = '#D97706';
        pill.innerHTML = `
          <span class="pulse-dot" style="background:#F59E0B;"></span>
          <span class="sync-text">${db.name} DB Sync: <strong>SYNCING</strong></span>
          <span class="sheet-id-chip" style="font-family: monospace; font-size: 9.5px; opacity: 0.85;">${db.id.substring(0, 8)}...</span>
          <span class="auto-sync-chip" id="bedsAutoSyncChip" style="font-size: 9.5px; background: rgba(0,0,0,0.25); padding: 1.5px 5px; border-radius: 3px; font-weight: 700; margin-left: 4px;">Syncing...</span>
        `;
      }

      if (!isSilent) {
        this.showToast(`⏳ Initiating Dual Sync with ${db.fullName} (${db.id.substring(0, 8)}...)...`, 'info');
      }

      try {
        // 1. Flush any pending outbound mutations first (Portal -> Database)
        await this.flushMutationQueue();

        // 2. Delegate to portal-specific reload handler (Database -> Portal)
        if (window.BalsonsPortalSync && typeof window.BalsonsPortalSync.reload === 'function') {
          await window.BalsonsPortalSync.reload();
        } else if (currentPortal === 'safety') {
          if (typeof window.syncWithLiveSafetyDb === 'function') {
            await window.syncWithLiveSafetyDb();
          } else if (window.BalsonsSafetyApp && typeof window.BalsonsSafetyApp.loadDashboardData === 'function') {
            await window.BalsonsSafetyApp.loadDashboardData();
            if (typeof window.BalsonsSafetyApp.loadPermits === 'function') await window.BalsonsSafetyApp.loadPermits();
            if (typeof window.BalsonsSafetyApp.loadInductions === 'function') await window.BalsonsSafetyApp.loadInductions();
          }
        } else if (currentPortal === 'store') {
          if (window.BalsonsStoreApi && typeof window.BalsonsStoreApi.syncWithLiveDb === 'function') {
            await window.BalsonsStoreApi.syncWithLiveDb();
          } else if (window.BalsonsStoreApp && typeof window.BalsonsStoreApp.refreshData === 'function') {
            await window.BalsonsStoreApp.refreshData();
          }
        } else if (currentPortal === 'hr') {
          if (typeof window.initHrApp === 'function') {
            window.initHrApp();
          }
        } else if (currentPortal === 'gate') {
          if (typeof window.initGateTransactions === 'function') window.initGateTransactions();
          if (typeof window.initMasterRegistries === 'function') window.initMasterRegistries();
        } else if (currentPortal === 'purchase') {
          if (window.BalsonsPurchaseApp && typeof window.BalsonsPurchaseApp.autoSyncWithCloud === 'function') {
            await window.BalsonsPurchaseApp.autoSyncWithCloud();
          }
        } else if (currentPortal === 'operations') {
          if (typeof window.refreshDashboard === 'function') {
            await window.refreshDashboard();
          } else if (window.BalsonsOpsApp && typeof window.BalsonsOpsApp.init === 'function') {
            await window.BalsonsOpsApp.init();
          }
        }

        await new Promise(r => setTimeout(r, 400));

        const now = new Date().toLocaleTimeString();
        if (pill) {
          pill.style.background = 'rgba(16, 185, 129, 0.15)';
          pill.style.borderColor = 'rgba(16, 185, 129, 0.4)';
          pill.style.color = '#10B981';
          pill.innerHTML = `
            <span class="pulse-dot"></span>
            <span class="sync-text">${db.name} DB Sync: <strong>LIVE</strong></span>
            <span class="sheet-id-chip" style="font-family: monospace; font-size: 9.5px; opacity: 0.85;">${db.id.substring(0, 8)}...</span>
            <span class="auto-sync-chip" id="bedsAutoSyncChip" style="font-size: 9.5px; background: rgba(0,0,0,0.25); padding: 1.5px 5px; border-radius: 3px; font-weight: 700; margin-left: 4px;">Auto: ${this.autoSyncCountdown}s</span>
          `;
        }

        if (!isSilent) {
          this.showToast(`✅ ${db.name} Dual-Sync Complete: Dedicated Database (${db.id.substring(0, 8)}...) synchronized with registers at ${now}!`, 'success');
        }
      } catch (err) {
        console.error('Dual Sync Error:', err);
        if (!isSilent) {
          this.showToast(`⚠️ Dual-Sync fallback engaged at ${new Date().toLocaleTimeString()}`, 'warning');
        }
      } finally {
        this.isDualSyncing = false;
      }
    },

    bindGlobalEvents: function() {
      document.addEventListener('click', function(e) {
        const dd = document.getElementById('bedsDeptDropdown');
        if (dd && !dd.contains(e.target)) {
          dd.classList.remove('open');
        }
      });
    },

    escapeHtml: function(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },

    
    parseCsv: function(text) {
      if (!text) return [];
      const lines = [];
      let row = [''];
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const next = text[i + 1];
        if (c === '"') {
          if (inQuotes && next === '"') { row[row.length - 1] += '"'; i++; }
          else { inQuotes = !inQuotes; }
        } else if (c === ',' && !inQuotes) {
          row.push('');
        } else if ((c === '\r' || c === '\n') && !inQuotes) {
          if (c === '\r' && next === '\n') i++;
          lines.push(row);
          row = [''];
        } else {
          row[row.length - 1] += c;
        }
      }
      if (row.length > 1 || row[0] !== '') lines.push(row);
      if (lines.length < 2) return [];
      const headers = lines[0].map(h => h.trim().replace(/^"|"$/g, ''));
      return lines.slice(1).filter(r => r.some(cell => cell.trim().length > 0)).map(r => {
        const obj = {};
        headers.forEach((h, idx) => {
          obj[h] = (r[idx] !== undefined ? r[idx] : '').trim();
        });
        return obj;
      });
    },

    fetchSheetData: async function(sheetId, tabName, timeoutMs = 8000) {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}&tq=${Date.now()}`;
        const res = await this.fetchWithTimeout(url, { method: 'GET', headers: { 'Cache-Control': 'no-cache' } }, timeoutMs);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        return this.parseCsv(text);
      } catch (err) {
        console.warn(`[BEDS Workspace] Gviz live fetch failed for ${tabName}:`, err.message);
        return null;
      }
    },

    fetchWithTimeout: async function(url, options = {}, timeoutMs = 10000) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error(`Request timed out after ${timeoutMs}ms`);
        }
        throw err;
      }
    },

    _activeGuards: new Set(),
    runGuarded: async function(key, asyncFn) {
      if (this._activeGuards.has(key)) {
        console.warn(`[Workspace] Action '${key}' is already in-flight. Duplicate execution prevented.`);
        return { duplicate: true, success: false };
      }
      this._activeGuards.add(key);
      try {
        return await asyncFn();
      } finally {
        this._activeGuards.delete(key);
      }
    }
  };

  window.bedsEscapeHtml = BalsonsWorkspace.escapeHtml;
  window.BalsonsWorkspace = BalsonsWorkspace;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BalsonsWorkspace.init());
  } else {
    BalsonsWorkspace.init();
  }
})();
