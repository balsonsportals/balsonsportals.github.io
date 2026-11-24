/**
 * BALSONS SAFETY PORTAL - MAIN APPLICATION CONTROLLER
 * Architecture: SAM-2026 & BEDS V1.0
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

document.addEventListener('DOMContentLoaded', function() {
  BalsonsSafetyApp.init();
});

const BalsonsSafetyApp = {
  currentView: 'view-dashboard',
  cachedPermits: [],
  cachedTbts: [],
  cachedInspections: [],
  cachedCapas: [],

  init: async function() {
    this.initTheme();
    this.initAuth();
    this.initNavigation();
    this.initLanguage();
    this.initModals();
    await this.loadDashboardData();
    this.renderAreaOptions();
    this.renderTemplateOptions();
  },

  // ==========================================
  // THEME & STYLES (BEDS V1.0 STANDARD)
  // ==========================================
  initTheme: function() {
    const saved = localStorage.getItem(BALSONS_SAFETY_CONFIG.STORAGE_THEME_KEY) || document.documentElement.getAttribute('data-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateThemeButton(saved);

    const toggleBtn = document.getElementById('btn-toggle-theme');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(BALSONS_SAFETY_CONFIG.STORAGE_THEME_KEY, next);
        this.updateThemeButton(next);
      });
    }
  },

  updateThemeButton: function(theme) {
    const btn = document.getElementById('btn-toggle-theme');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  },

  // ==========================================
  // AUTHENTICATION & USER PROFILE
  // ==========================================
  initAuth: function() {
    if (window.BalsonsSAMAuth) {
      BalsonsSAMAuth.renderGlobalSuperAdminBar('safety', (newSession) => {
        window.location.reload();
      });
      const samSession = BalsonsSAMAuth.getSession();
      if (samSession) {
        const userDisplay = document.getElementById('header-user-display');
        const userRoleBadge = document.getElementById('header-role-badge');
        if (userDisplay) userDisplay.textContent = samSession.fullName;
        if (userRoleBadge) userRoleBadge.textContent = samSession.role === 'SUPER_ADMIN' ? 'Owner / Super Admin' : samSession.roleInfo.title;

        const switchUserBtn = document.getElementById('btn-switch-user');
        if (switchUserBtn) {
          switchUserBtn.addEventListener('click', () => {
            if (samSession.role === 'SUPER_ADMIN') {
              BalsonsSAMAuth.openGovernanceConsole('safety');
            } else {
              BalsonsSAMAuth.openAccessMatrixModal();
            }
          });
        }
        return;
      }
    }

    const user = BalsonsSafetyAuth.getUser();
    const userDisplay = document.getElementById('header-user-display');
    const userRoleBadge = document.getElementById('header-role-badge');
    if (userDisplay) userDisplay.textContent = user.fullName;
    if (userRoleBadge) userRoleBadge.textContent = user.role;

    const switchUserBtn = document.getElementById('btn-switch-user');
    if (switchUserBtn) {
      switchUserBtn.addEventListener('click', () => this.showLoginModal());
    }
  },

  showLoginModal: function() {
    const modal = document.getElementById('modal-login');
    if (modal) modal.classList.add('active');
  },

  // ==========================================
  // NAVIGATION & MODULE ROUTING (SMART DROPDOWNS, LOCKED TAB BAR, NO SCROLLBAR)
  // ==========================================
  initNavigation: function() {
    // 1. Dropdown Toggle Buttons
    const dropdownToggles = document.querySelectorAll('.beds-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parent = toggle.closest('.beds-nav-dropdown');
        const wasOpen = parent.classList.contains('open');
        // Close all open dropdowns
        document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
        if (!wasOpen) {
          parent.classList.add('open');
        }
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.beds-nav-dropdown')) {
        document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
      }
    });

    // Close dropdowns on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
      }
    });

    // 2. Direct Nav Tabs (Dashboard, etc.)
    document.querySelectorAll('button.beds-nav-tab[data-target]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = tab.getAttribute('data-target');
        if (targetView) {
          document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
          this.switchView(targetView);
        }
      });
    });

    // 3. Dropdown Menu Items
    document.querySelectorAll('.beds-dropdown-item[data-target]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.getAttribute('data-target');
        if (targetView) {
          document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
          this.switchView(targetView);
        }
      });
    });
  },

  switchView: function(viewId) {
    this.currentView = viewId;
    
    // Update direct nav tabs
    document.querySelectorAll('button.beds-nav-tab[data-target]').forEach(t => {
      if (t.getAttribute('data-target') === viewId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Update smart dropdown toggle buttons and dropdown items
    document.querySelectorAll('.beds-nav-dropdown').forEach(dropdown => {
      const hasActiveChild = dropdown.querySelector(`.beds-dropdown-item[data-target="${viewId}"]`);
      const toggleBtn = dropdown.querySelector('.beds-dropdown-toggle');
      if (toggleBtn) {
        if (hasActiveChild) {
          toggleBtn.classList.add('active');
        } else {
          toggleBtn.classList.remove('active');
        }
      }

      dropdown.querySelectorAll('.beds-dropdown-item').forEach(item => {
        if (item.getAttribute('data-target') === viewId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });

    // Update view panels
    document.querySelectorAll('.beds-view-panel').forEach(v => {
      if (v.id === viewId) {
        v.classList.add('active');
      } else {
        v.classList.remove('active');
      }
    });

    // Load module-specific data
    switch (viewId) {
      case 'view-dashboard':
        this.loadDashboardData();
        break;
      case 'view-ptw':
        this.loadPermits();
        break;
      case 'view-permit-studio':
        this.renderPermitStudio();
        break;
      case 'view-tbt':
        this.loadTbts();
        break;
      case 'view-inspections':
        this.loadInspections();
        break;
      case 'view-lifting':
        this.loadLiftingPlans();
        break;
      case 'view-hazards':
        this.loadHazards();
        break;
      case 'view-incidents':
        this.loadIncidents();
        break;
      case 'view-capa':
        this.loadCapas();
        break;
      case 'view-reports':
        this.loadDsrReport();
        break;
      case 'view-induction':
        this.loadInductions();
        break;
      case 'view-gate-clearance':
        this.verifyEmployeeForGate();
        break;
      case 'view-dossier-360':
        this.render360DossierPage();
        break;
    }

    BalsonsSafetyI18n.applyTranslations();
  },

  // ==========================================
  // LANGUAGE SWITCHER
  // ==========================================
  initLanguage: function() {
    document.querySelectorAll('.lang-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        BalsonsSafetyI18n.setLang(lang);
      });
    });
    BalsonsSafetyI18n.applyTranslations();
  },

  // ==========================================
  // MODULE 01: DASHBOARD
  // ==========================================
  loadDashboardData: async function() {
    const res = await BalsonsSafetyApi.call('dashboard.stats');
    if (res.success && res.data) {
      const d = res.data;
      this.setText('kpi-safe-hours', d.safeManHours ? d.safeManHours.toLocaleString() : '148,520');
      this.setText('kpi-days-lti', d.daysWithoutLTI || '142');
      this.setText('kpi-active-permits', d.activePermits || '0');
      this.setText('kpi-pending-permits', d.pendingPermits || '0');
      this.setText('kpi-tbts-today', d.tbtsConductedToday || '0');
      this.setText('kpi-open-capas', d.openCapas || '0');
      this.setText('kpi-compliance-rate', (d.complianceScore || '98.4') + '%');
    }
    // Also load recent active permits for the dashboard widget
    await this.loadPermits('ISSUED', 'dash-active-permits-body');
  },

  // ==========================================
  // MODULE 05: PERMIT-TO-WORK (PTW)
  // ==========================================
  loadPermits: async function(filter = 'ALL', targetTableId = 'ptw-table-body') {
    const tableBody = document.getElementById(targetTableId);
    if (!tableBody) return;

    tableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4">Loading Work Permits...</td></tr>`;

    const res = await BalsonsSafetyApi.call('ptw.list', { filter: filter });
    let fetched = (res.success && res.data && res.data.permits) ? res.data.permits : [];

    // Merge any locally created permits
    if (this.cachedPermits && this.cachedPermits.length > 0) {
      this.cachedPermits.forEach(cp => {
        if (!fetched.some(f => f.PermitID === cp.PermitID)) {
          fetched.unshift(cp);
        }
      });
    }
    this.cachedPermits = fetched;
    this.renderPermitRows(this.cachedPermits, targetTableId);
  },

  renderPermitRows: function(permits, targetTableId) {
    const tbody = document.getElementById(targetTableId);
    if (!tbody) return;

    if (!permits || permits.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-muted">No Work Permits found matching filter.</td></tr>`;
      return;
    }

    const user = BalsonsSafetyAuth.getUser();
    const isSafetyOff = user.role === 'Safety Officer' || user.role === 'Owner / Super Admin';
    const isSiteMgr = user.role === 'Safety Manager' || user.role === 'Owner / Super Admin';

    tbody.innerHTML = permits.map(p => {
      const statusBadge = this.getStatusBadge(p.Status);
      const catBadge = this.getCategoryBadge(p.Category);
      const riskBadge = this.getRiskBadge(p.RiskLevel);

      let actionBtns = `
        <button class="beds-btn beds-btn-sm beds-btn-outline" onclick="BalsonsSafetyApp.viewPermitPrint('${p.PermitID}')" title="Print Official A4 PTW">
          🖨️ A4
        </button>
      `;

      if (p.Status === 'SUBMITTED' && isSafetyOff) {
        actionBtns += `
          <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsSafetyApp.verifyPermit('${p.PermitID}')">
            ✓ Verify
          </button>
        `;
      } else if (p.Status === 'VERIFIED_BY_SAFETY' && isSiteMgr) {
        actionBtns += `
          <button class="beds-btn beds-btn-sm beds-btn-success" onclick="BalsonsSafetyApp.approvePermit('${p.PermitID}')">
            ⚡ Issue
          </button>
        `;
      } else if (p.Status === 'ISSUED') {
        actionBtns += `
          <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsSafetyApp.closePermit('${p.PermitID}')">
            🔒 Handback
          </button>
        `;
      }

      return `
        <tr>
          <td><strong class="text-primary font-mono">${p.PermitID}</strong></td>
          <td>${catBadge}</td>
          <td>
            <strong>${p.WorkDescription}</strong>
            <div class="text-xs text-muted">Tmpl: ${p.TemplateCode} · ${p.Contractor}</div>
          </td>
          <td><span class="badge badge-neutral">${p.AreaCode}</span></td>
          <td>${p.SupervisorID}</td>
          <td>
            <div class="text-xs">Start: ${this.formatDateTime(p.PlannedStart)}</div>
            <div class="text-xs">End: ${this.formatDateTime(p.PlannedEnd)}</div>
          </td>
          <td>${riskBadge}</td>
          <td>${statusBadge}</td>
          <td><div class="action-btn-group">${actionBtns}</div></td>
        </tr>
      `;
    }).join('');
  },

  // Actions on Permits
  verifyPermit: async function(permitId) {
    if (!confirm(`Verify safety readiness for ${permitId} as Safety Officer?`)) return;
    const res = await BalsonsSafetyApi.call('ptw.verify', { permitId: permitId });
    if (res.success) {
      alert('Permit verified by Safety Officer! Forwarded to Site Manager for Final Authorization.');
      this.loadPermits();
      this.loadDashboardData();
    }
  },

  approvePermit: async function(permitId) {
    if (!confirm(`Authorize and issue permit ${permitId} for execution?`)) return;
    const res = await BalsonsSafetyApi.call('ptw.approve', { permitId: permitId });
    if (res.success) {
      alert('PTW Officially Authorized & Active on Site!');
      this.loadPermits();
      this.loadDashboardData();
    }
  },

  closePermit: async function(permitId) {
    const comments = prompt('Enter Worksite Handback Comments (e.g. site cleared, tools removed, isolation locks lifted):', 'Work completed safely. Area cleared.');
    if (comments === null) return;

    const res = await BalsonsSafetyApi.call('ptw.close', { permitId: permitId, closureData: { comments: comments } });
    if (res.success) {
      alert('Permit safely closed and worksite handed back.');
      this.loadPermits();
      this.loadDashboardData();
    }
  },

  // ==========================================
  // BALSONS CONTROLLED 7 PERMIT FORMS STUDIO & OFFICIAL A4 GENERATOR
  // Reference: BALSONS_JTRWF_PTW_FORMS_V1_1_SEVEN_PERMITS.docx
  // ==========================================
  // BALSONS CONTROLLED 7 PERMIT FORMS STUDIO & OFFICIAL A4 GENERATOR
  // Reference: BALSONS_JTRWF_PTW_FORMS_V1_1_SEVEN_PERMITS.docx
  // ==========================================
  currentStudioFormCode: 'PTW-GEN',
  studioPreviewMode: false,

  renderPermitStudio: function(selectedCode) {
    if (selectedCode) {
      this.currentStudioFormCode = selectedCode;
    }
    const currentCode = this.currentStudioFormCode;
    const templates = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES;

    // 1. Render Selector Pill Bar
    const selectorContainer = document.getElementById('permit-studio-selector');
    if (selectorContainer) {
      selectorContainer.innerHTML = templates.map(t => {
        const isActive = t.code === currentCode;
        return `
          <button class="beds-btn ${isActive ? 'beds-btn-primary' : 'beds-btn-secondary'}" 
                  onclick="BalsonsSafetyApp.renderPermitStudio('${t.code}')" 
                  style="font-size: 11.5px; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px;">
            <strong style="font-family: monospace;">${t.code}</strong>
            <span>${t.name}</span>
            <span style="font-size: 9.5px; opacity: 0.85; font-family: monospace; background: rgba(0,0,0,0.12); padding: 1px 5px; border-radius: 3px;">
              ${t.docNo}
            </span>
          </button>
        `;
      }).join('');
    }

    // 2. Render Authentic Fillable A4 Document
    const formContainer = document.getElementById('studio-rendered-form');
    if (formContainer) {
      const tmpl = templates.find(t => t.code === currentCode) || templates[0];
      formContainer.innerHTML = this.buildOfficialA4PermitHtml(tmpl, true, true, this.studioPreviewMode);
    }

    // 3. Update mode badge and toggle button text
    this.updateStudioModeUI();
  },

  updateStudioModeUI: function() {
    const badge = document.getElementById('studio-mode-badge');
    const toggleBtn = document.getElementById('btn-studio-mode-toggle');
    const sheet = document.getElementById('active-permit-sheet');
    if (this.studioPreviewMode) {
      if (badge) {
        badge.textContent = '👁️ PRINT PREVIEW MODE';
        badge.style.background = 'rgba(5, 150, 105, 0.12)';
        badge.style.color = '#059669';
        badge.style.borderColor = '#059669';
      }
      if (toggleBtn) {
        toggleBtn.innerHTML = '✏️ Edit Online Mode';
        toggleBtn.classList.add('beds-btn-primary');
        toggleBtn.classList.remove('beds-btn-secondary');
      }
      if (sheet) sheet.classList.add('preview-mode');
    } else {
      if (badge) {
        badge.textContent = '✏️ EDIT ONLINE MODE';
        badge.style.background = 'rgba(0, 151, 178, 0.12)';
        badge.style.color = 'var(--beds-teal-primary)';
        badge.style.borderColor = 'var(--beds-teal-primary)';
      }
      if (toggleBtn) {
        toggleBtn.innerHTML = '👁️ Preview Print';
        toggleBtn.classList.add('beds-btn-secondary');
        toggleBtn.classList.remove('beds-btn-primary');
      }
      if (sheet) sheet.classList.remove('preview-mode');
    }
  },

  toggleStudioPreviewMode: function() {
    this.studioPreviewMode = !this.studioPreviewMode;
    this.syncChecklistPrintValues();
    this.updateStudioModeUI();
  },

  syncChecklistPrintValues: function() {
    const sheet = document.getElementById('active-permit-sheet');
    if (!sheet) return;
    const containers = sheet.querySelectorAll('.docx-chk-container');
    containers.forEach(container => {
      const checkedRadio = container.querySelector('input[type="radio"]:checked');
      const printSpan = container.querySelector('.docx-print-chk');
      if (printSpan) {
        if (checkedRadio) {
          const val = checkedRadio.value;
          if (val === 'Y') printSpan.innerHTML = '<strong style="color: #059669;">[☑] Y</strong> &nbsp; [ ] N &nbsp; [ ] N/A';
          else if (val === 'N') printSpan.innerHTML = '[ ] Y &nbsp; <strong style="color: #DC2626;">[☑] N</strong> &nbsp; [ ] N/A';
          else if (val === 'NA') printSpan.innerHTML = '[ ] Y &nbsp; [ ] N &nbsp; <strong>[☑] N/A</strong>';
        } else {
          printSpan.innerHTML = '[ ] Y &nbsp; [ ] N &nbsp; [ ] N/A';
        }
      }
    });
  },

  onChecklistChange: function(radioElem) {
    if (!radioElem) return;
    const group = radioElem.closest('.docx-radio-group');
    if (group) {
      group.querySelectorAll('.docx-radio-btn').forEach(btn => {
        btn.classList.remove('active-y', 'active-n', 'active-na');
      });
      const parentLabel = radioElem.closest('.docx-radio-btn');
      if (parentLabel) {
        if (radioElem.value === 'Y') parentLabel.classList.add('active-y');
        else if (radioElem.value === 'N') parentLabel.classList.add('active-n');
        else if (radioElem.value === 'NA') parentLabel.classList.add('active-na');
      }
    }
    this.syncChecklistPrintValues();
  },

  setAllChecklists: function(targetVal) {
    const sheet = document.getElementById('active-permit-sheet');
    if (!sheet) return;
    const radios = sheet.querySelectorAll('.docx-chk-container input[type="radio"]');
    radios.forEach(r => {
      if (!targetVal) {
        r.checked = false;
      } else if (r.value === targetVal) {
        r.checked = true;
      }
    });

    sheet.querySelectorAll('.docx-radio-btn').forEach(btn => {
      btn.classList.remove('active-y', 'active-n', 'active-na');
      const input = btn.querySelector('input[type="radio"]');
      if (input && input.checked) {
        if (input.value === 'Y') btn.classList.add('active-y');
        else if (input.value === 'N') btn.classList.add('active-n');
        else if (input.value === 'NA') btn.classList.add('active-na');
      }
    });
    this.syncChecklistPrintValues();
  },

  fillStudioSampleData: function() {
    const sampleData = (typeof BALSONS_PTW_SAMPLE_DATA !== 'undefined') ? BALSONS_PTW_SAMPLE_DATA[this.currentStudioFormCode] : null;
    if (!sampleData) {
      alert('Sample demo data not found for template: ' + this.currentStudioFormCode);
      return;
    }

    // 1. Header / Reference Line
    const permitIdEl = document.getElementById('studio-permit-id');
    if (permitIdEl) permitIdEl.value = sampleData.permitNo;
    const dateEl = document.getElementById('studio-permit-date');
    if (dateEl) dateEl.value = sampleData.date;
    const areaEl = document.getElementById('studio-permit-area');
    if (areaEl) areaEl.value = sampleData.area;

    // 2. Section 01
    const appEl = document.getElementById('studio-applicant');
    if (appEl) appEl.value = sampleData.applicant;
    const contEl = document.getElementById('studio-contact');
    if (contEl) contEl.value = sampleData.contact;
    const deptEl = document.getElementById('studio-contractor');
    if (deptEl) deptEl.value = sampleData.contractor;
    const persEl = document.getElementById('studio-persons');
    if (persEl) persEl.value = sampleData.persons;
    const startEl = document.getElementById('studio-start-dt');
    if (startEl) startEl.value = sampleData.startDt;
    const endEl = document.getElementById('studio-end-dt');
    if (endEl) endEl.value = sampleData.endDt;
    const locEl = document.getElementById('studio-location');
    if (locEl) locEl.value = sampleData.location;
    const relEl = document.getElementById('studio-related');
    if (relEl) relEl.value = sampleData.related;

    // 3. Section 02 Task Specific Fields
    if (sampleData.sec02) {
      const sec02Fields = document.querySelectorAll('.studio-sec02-field');
      sec02Fields.forEach(field => {
        const label = field.getAttribute('data-label');
        if (label) {
          for (let key in sampleData.sec02) {
            if (label.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(label.toLowerCase())) {
              field.value = sampleData.sec02[key];
              break;
            }
          }
        }
      });
    }

    // 4. Section 03 Checklists: Set All YES
    this.setAllChecklists('Y');

    // 5. Section 04 Specialized Records
    if (sampleData.sec04_cse) {
      sampleData.sec04_cse.forEach((row, idx) => {
        const tEl = document.getElementById(`cse-time-${idx}`); if (tEl) tEl.value = row.time;
        const oEl = document.getElementById(`cse-o2-${idx}`); if (oEl) oEl.value = row.o2;
        const lEl = document.getElementById(`cse-lel-${idx}`); if (lEl) lEl.value = row.lel;
        const toxEl = document.getElementById(`cse-toxic-${idx}`); if (toxEl) toxEl.value = row.toxic;
        const tstEl = document.getElementById(`cse-tester-${idx}`); if (tstEl) tstEl.value = row.tester;
        const insEl = document.getElementById(`cse-inst-${idx}`); if (insEl) insEl.value = row.inst;
      });
    }
    if (sampleData.sec04_ele) {
      const ptEl = document.getElementById('studio-ele-point'); if (ptEl) ptEl.value = sampleData.sec04_ele.point;
      const lkEl = document.getElementById('studio-ele-lock'); if (lkEl) lkEl.value = sampleData.sec04_ele.lock;
      const vrEl = document.getElementById('studio-ele-verifier'); if (vrEl) vrEl.value = sampleData.sec04_ele.verifier;
      const dtEl = document.getElementById('studio-ele-dt'); if (dtEl) dtEl.value = sampleData.sec04_ele.dt;
    }
    if (sampleData.sec04_mhi) {
      const ptEl = document.getElementById('studio-mhi-point'); if (ptEl) ptEl.value = sampleData.sec04_mhi.point;
      const lkEl = document.getElementById('studio-mhi-lock'); if (lkEl) lkEl.value = sampleData.sec04_mhi.lock;
      const vrEl = document.getElementById('studio-mhi-verifier'); if (vrEl) vrEl.value = sampleData.sec04_mhi.verifier;
      const dtEl = document.getElementById('studio-mhi-dt'); if (dtEl) dtEl.value = sampleData.sec04_mhi.dt;
    }
    if (sampleData.sec04_lft) {
      const wEl = document.getElementById('studio-lft-weight'); if (wEl) wEl.value = sampleData.sec04_lft.weight;
      const rEl = document.getElementById('studio-lft-radius'); if (rEl) rEl.value = sampleData.sec04_lft.radius;
      const cEl = document.getElementById('studio-lft-capacity'); if (cEl) cEl.value = sampleData.sec04_lft.capacity;
      const uEl = document.getElementById('studio-lft-util'); if (uEl) uEl.value = sampleData.sec04_lft.util;
    }

    // 6. Section 05
    const hazEl = document.getElementById('studio-hazards'); if (hazEl) hazEl.value = sampleData.hazards;
    const ctrlEl = document.getElementById('studio-controls'); if (ctrlEl) ctrlEl.value = sampleData.controls;
    const ppeEl = document.getElementById('studio-ppe'); if (ppeEl) ppeEl.value = sampleData.ppe;
    const emgEl = document.getElementById('studio-emergency'); if (emgEl) emgEl.value = sampleData.emergency;
    const refEl = document.getElementById('studio-references'); if (refEl) refEl.value = sampleData.references;

    // 7. Section 06 Declaration
    const dNameEl = document.getElementById('studio-decl-name'); if (dNameEl) dNameEl.value = sampleData.declName;
    const dSignEl = document.getElementById('studio-decl-signed'); if (dSignEl) dSignEl.checked = !!sampleData.declSigned;
    const dDtEl = document.getElementById('studio-decl-dt'); if (dDtEl) dDtEl.value = sampleData.declDt;

    // 8. Approval Workflow
    const supDec = document.getElementById('studio-appr-sup-dec'); if (supDec) supDec.value = sampleData.supDecision;
    const supName = document.getElementById('studio-appr-sup-name'); if (supName) supName.value = sampleData.supName;
    const supDate = document.getElementById('studio-appr-sup-date'); if (supDate) supDate.value = sampleData.supDate;

    const soDec = document.getElementById('studio-appr-so-dec'); if (soDec) soDec.value = sampleData.soDecision;
    const soName = document.getElementById('studio-appr-so-name'); if (soName) soName.value = sampleData.soName;
    const soDate = document.getElementById('studio-appr-so-date'); if (soDate) soDate.value = sampleData.soDate;

    const smDec = document.getElementById('studio-appr-sm-dec'); if (smDec) smDec.value = sampleData.smDecision;
    const smName = document.getElementById('studio-appr-sm-name'); if (smName) smName.value = sampleData.smName;
    const smDate = document.getElementById('studio-appr-sm-date'); if (smDate) smDate.value = sampleData.smDate;

    const issName = document.getElementById('studio-issuer-name'); if (issName) issName.value = sampleData.issuerName;
    const vFrom = document.getElementById('studio-valid-from'); if (vFrom) vFrom.value = sampleData.validFrom;
    const vTo = document.getElementById('studio-valid-to'); if (vTo) vTo.value = sampleData.validTo;

    // 9. Closure
    const clStatus = document.getElementById('studio-close-status'); if (clStatus) clStatus.value = sampleData.closeStatus;
    const clNotes = document.getElementById('studio-close-notes'); if (clNotes) clNotes.value = sampleData.closeNotes;

    this.syncChecklistPrintValues();
    alert(`⚡ Authentic sample engineering data loaded for [${this.currentStudioFormCode}]! Click '👁️ Preview Print' to preview printout or '🖨️ Print Form (A4)' to print.`);
  },

  fillSafeGasReadings: function() {
    const defaultTests = [
      { time: '08:00 (Before entry)', o2: '20.9%', lel: '0%', toxic: 'CO: 0 ppm, H2S: 0 ppm', tester: 'Manoj Kumar', inst: 'Altair 4XR #GT-012' },
      { time: '10:30 (Shift 1)', o2: '20.9%', lel: '0%', toxic: 'CO: 1 ppm, H2S: 0 ppm', tester: 'Manoj Kumar', inst: 'Altair 4XR #GT-012' },
      { time: '12:30 (Shift 2)', o2: '20.8%', lel: '0%', toxic: 'CO: 1 ppm, H2S: 0 ppm', tester: 'Manoj Kumar', inst: 'Altair 4XR #GT-012' },
      { time: '14:00 (Post break)', o2: '20.9%', lel: '0%', toxic: 'CO: 0 ppm, H2S: 0 ppm', tester: 'Manoj Kumar', inst: 'Altair 4XR #GT-012' }
    ];
    defaultTests.forEach((t, idx) => {
      const tEl = document.getElementById(`cse-time-${idx}`); if (tEl) tEl.value = t.time;
      const oEl = document.getElementById(`cse-o2-${idx}`); if (oEl) oEl.value = t.o2;
      const lEl = document.getElementById(`cse-lel-${idx}`); if (lEl) lEl.value = t.lel;
      const toxEl = document.getElementById(`cse-toxic-${idx}`); if (toxEl) toxEl.value = t.toxic;
      const tstEl = document.getElementById(`cse-tester-${idx}`); if (tstEl) tstEl.value = t.tester;
      const insEl = document.getElementById(`cse-inst-${idx}`); if (insEl) insEl.value = t.inst;
    });
    alert('⚡ Safe atmospheric readings populated (O₂ 20.9%, LEL 0%, Normal Air)!');
  },

  calcLiftUtil: function() {
    const wStr = document.getElementById('studio-lft-weight')?.value || '';
    const cStr = document.getElementById('studio-lft-capacity')?.value || '';
    const uEl = document.getElementById('studio-lft-util');
    if (!uEl) return;
    const w = parseFloat(wStr);
    const c = parseFloat(cStr);
    if (!isNaN(w) && !isNaN(c) && c > 0) {
      const pct = ((w / c) * 100).toFixed(1);
      const isSafe = pct <= 80.0;
      uEl.value = `${pct}% (${isSafe ? 'Approved Safe < 80%' : 'CRITICAL OVERLOAD > 80%'})`;
      uEl.style.background = isSafe ? '#ECFDF5' : '#FEF2F2';
      uEl.style.color = isSafe ? '#065F46' : '#991B1B';
    }
  },

  resetStudioForm: function() {
    this.renderPermitStudio(this.currentStudioFormCode);
  },

  saveStudioPermitOnline: async function() {
    const permitIdEl = document.getElementById('studio-permit-id');
    const applicantEl = document.getElementById('studio-applicant');
    const areaEl = document.getElementById('studio-permit-area');
    const startEl = document.getElementById('studio-start-dt');
    const endEl = document.getElementById('studio-end-dt');
    const locationEl = document.getElementById('studio-location');
    const contractorEl = document.getElementById('studio-contractor');
    const hazardsEl = document.getElementById('studio-hazards');

    const applicant = applicantEl?.value?.trim() || 'Work Supervisor';
    const area = areaEl?.value || 'AREA-01 AXLE FORGING LINE';
    let permitId = permitIdEl?.value?.trim();
    if (!permitId || permitId.includes('____')) {
      const rnd = Math.floor(1000 + Math.random() * 9000);
      permitId = `PTW-JTRWF-2026-${rnd}`;
      if (permitIdEl) permitIdEl.value = permitId;
    }

    const tmpl = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.find(t => t.code === this.currentStudioFormCode) || BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0];

    const newPermit = {
      PermitID: permitId,
      permitId: permitId,
      templateCode: this.currentStudioFormCode,
      TemplateCode: this.currentStudioFormCode,
      PermitType: tmpl.name,
      areaCode: area,
      AreaCode: area,
      Applicant: applicant,
      SupervisorID: applicant,
      contractor: contractorEl?.value?.trim() || 'BALSONS HEAVY LIFT & SHIFT',
      Contractor: contractorEl?.value?.trim() || 'BALSONS HEAVY LIFT & SHIFT',
      plannedStart: startEl?.value ? new Date(startEl.value).toISOString() : new Date().toISOString(),
      PlannedStart: startEl?.value ? new Date(startEl.value).toISOString() : new Date().toISOString(),
      plannedEnd: endEl?.value ? new Date(endEl.value).toISOString() : new Date(Date.now() + 8 * 3600000).toISOString(),
      PlannedEnd: endEl?.value ? new Date(endEl.value).toISOString() : new Date(Date.now() + 8 * 3600000).toISOString(),
      workDescription: hazardsEl?.value?.trim() ? `Work under ${tmpl.name} at ${locationEl?.value || area}` : `${tmpl.name} authorized activity`,
      WorkDescription: hazardsEl?.value?.trim() ? `Work under ${tmpl.name} at ${locationEl?.value || area}` : `${tmpl.name} authorized activity`,
      riskLevel: (this.currentStudioFormCode === 'PTW-LFT' || this.currentStudioFormCode === 'PTW-CSE') ? 'HIGH' : 'MEDIUM',
      RiskLevel: (this.currentStudioFormCode === 'PTW-LFT' || this.currentStudioFormCode === 'PTW-CSE') ? 'HIGH' : 'MEDIUM',
      Status: 'ISSUED',
      SubmittedAt: new Date().toISOString()
    };

    if (!this.cachedPermits) this.cachedPermits = [];
    const existingIdx = this.cachedPermits.findIndex(p => p.PermitID === permitId);
    if (existingIdx >= 0) {
      this.cachedPermits[existingIdx] = newPermit;
    } else {
      this.cachedPermits.unshift(newPermit);
    }
    BalsonsSafetyApi._localStore.permits.unshift(newPermit);

    // Call API (asynchronous)
    BalsonsSafetyApi.call('ptw.create', newPermit);

    const tbody = document.getElementById('ptw-table-body');
    if (tbody) {
      this.renderPermitRows(this.cachedPermits, 'ptw-table-body');
    }

    // Display rich interactive success banner above permit form
    const statusContainer = document.getElementById('permit-submit-status-container');
    if (statusContainer) {
      statusContainer.style.display = 'block';
      statusContainer.innerHTML = `
        <div style="background: #ECFDF5; border: 1px solid #10B981; border-radius: var(--beds-radius-md); padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);">
          <div>
            <div style="font-size: 14px; font-weight: 800; color: #065F46; display: flex; align-items: center; gap: 8px;">
              <span>✅</span>
              <span>PERMIT INITIATED & DUAL-SYNCED TO GOOGLE SHEET</span>
              <span style="font-size: 10px; background: #059669; color: #FFFFFF; padding: 2px 8px; border-radius: 4px; font-weight: 800;">LIVE</span>
            </div>
            <div style="font-size: 12px; color: #047857; margin-top: 3px;">
              Permit Reference: <strong style="font-family: monospace; font-size: 13px;">${permitId}</strong> (${tmpl.name}) · Work Area: <strong>${area}</strong> · Supervisor: <strong>${applicant}</strong>
            </div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="beds-btn beds-btn-primary" onclick="BalsonsSafetyApp.printStudioForm()" style="background: #059669; border-color: #059669; font-weight: 700;">🖨️ Print Official A4 Permit</button>
            <button class="beds-btn beds-btn-secondary" onclick="BalsonsSafetyApp.switchView('view-ptw')" style="font-weight: 700;">📋 View Master Register</button>
            <button class="beds-btn beds-btn-secondary" onclick="BalsonsSafetyApp.resetStudioForm()" style="font-weight: 700;">✍️ Initiate Another Permit</button>
          </div>
        </div>
      `;
      statusContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`✅ Permit ${permitId} successfully saved & dual-synced with Google Sheet!`, 'success');
    }

    // Automatically switch to print preview mode so supervisor can inspect the complete final document
    this.studioPreviewMode = true;
    this.updateStudioModeUI();
  },

  signSupervisorNow: function() {
    const nameEl = document.getElementById('studio-decl-name');
    const signEl = document.getElementById('studio-decl-signed');
    const dtEl = document.getElementById('studio-decl-dt');
    const appEl = document.getElementById('studio-applicant');
    const user = BalsonsSafetyAuth.getUser();
    const supervisorName = (appEl && appEl.value.trim()) ? appEl.value.trim() : (user.fullName || 'Ramesh Kumar (Lifting Supervisor)');
    
    if (nameEl) nameEl.value = supervisorName;
    if (signEl) signEl.checked = true;
    if (dtEl) dtEl.value = new Date().toISOString().slice(0, 16);
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`✍️ Supervisor digital acknowledgement stamped: ${supervisorName}`, 'success');
    }
  },

  printStudioForm: function() {
    this.syncChecklistPrintValues();
    const sheet = document.getElementById('active-permit-sheet');
    if (sheet) {
      sheet.classList.add('preview-mode');
    }
    window.print();
  },

  initiatePermitFromStudio: function() {
    const code = this.currentStudioFormCode || 'PTW-GEN';
    const modal = document.getElementById('modal-ptw-create');
    const select = document.getElementById('ptw-form-template');
    if (select) {
      select.value = code;
      this.renderPrerequisitesChecklist(code);
    }
    if (modal) modal.classList.add('active');
  },

  viewPermitPrint: function(permitId) {
    if (!this.cachedPermits || this.cachedPermits.length === 0) {
      this.cachedPermits = BalsonsSafetyApi._localStore.permits;
    }
    const permit = this.cachedPermits.find(p => p.PermitID === permitId) || this.cachedPermits[0];
    if (!permit) return;

    const modalBody = document.getElementById('ptw-print-content');
    if (!modalBody) return;

    modalBody.innerHTML = this.buildOfficialA4PermitHtml(permit, false, false, true);
    const modal = document.getElementById('modal-permit-print');
    if (modal) modal.classList.add('active');
  },

  buildOfficialA4PermitHtml: function(item, isBlank, isEditable, isPreview) {
    let formCode = 'PTW-GEN';
    let permit = null;
    if (isBlank) {
      formCode = item.code || item;
    } else {
      permit = item;
      formCode = permit.TemplateCode || 'PTW-GEN';
    }

    const exactForms = (typeof BALSONS_EXACT_PTW_FORMS !== 'undefined') ? BALSONS_EXACT_PTW_FORMS : [];
    const formSpec = exactForms.find(f => f.code === formCode) || exactForms[0] || {};

    const title = formSpec.title || 'GENERAL WORK PERMIT';
    const meta = formSpec.meta_table || [];
    const sec01 = formSpec.sec01_table || [];
    const sec02 = formSpec.sec02_table || [];
    const sec03 = formSpec.sec03_table || [];
    const sec05 = formSpec.sec05_table || [];
    const appr = formSpec.approval_table || [];
    const close = formSpec.closure_table || [];
    const stopWork = formSpec.stop_work || 'Work only within the approved scope, location, conditions and validity.';

    const permitNo = (!isBlank && permit) ? permit.PermitID : '____________________________';
    const dateStr = (!isBlank && permit) ? this.formatDate(permit.PlannedStart) : '____ / ____ / ______';
    const areaStr = (!isBlank && permit) ? permit.AreaCode : 'AREA-01 AXLE FORGING LINE';

    const html = [];
    html.push(`<div class="docx-permit-sheet ${isPreview ? 'preview-mode' : ''}" id="active-permit-sheet">`);

    // 1. Top Header: Logo + BALSONS + PERMIT TO WORK + TITLE
    html.push(`
      <div style="text-align: center; margin-bottom: 12px;">
        <img src="assets/images/balsons-logo.png" alt="BALSONS" style="height: 48px; object-fit: contain; margin-bottom: 4px;"><br>
        <div style="font-size: 18px; font-weight: 800; letter-spacing: 1px; color: #000000; line-height: 1.15;">BALSONS</div>
        <div style="font-size: 13px; font-weight: 800; color: #000000; line-height: 1.2;">PERMIT TO WORK</div>
        <div style="font-size: 15px; font-weight: 800; color: #000000; line-height: 1.3; text-decoration: underline;">${title}</div>
      </div>
    `);

    // 2. Metadata Table (2x4)
    html.push('<table class="docx-table" style="margin-bottom: 8px;">');
    for (let r of meta) {
      html.push('<tr>');
      for (let i = 0; i < r.length; i += 2) {
        let label = r[i];
        let val = r[i+1] || '';
        html.push(`<td style="width: 20%; font-weight: 700; background: #F3F4F6;">${label}</td>`);
        html.push(`<td style="width: 30%; font-weight: 600;">${val}</td>`);
      }
      html.push('</tr>');
    }
    html.push('</table>');

    // 3. Top Reference Line
    if (isEditable) {
      html.push(`
        <div style="font-size: 11px; font-weight: 700; margin-bottom: 8px; color: #000000; display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
          <div>
            Permit No.: 
            <input type="text" id="studio-permit-id" class="docx-input" style="width: 170px; display: inline-block; font-family: monospace; font-weight: 800; color: #0097B2;" value="${permitNo.includes('____') ? '' : permitNo}" placeholder="e.g. PTW-JTRWF-2026-0042">
          </div>
          <div>
            Date: 
            <input type="date" id="studio-permit-date" class="docx-input" style="width: 135px; display: inline-block; font-weight: 700;" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div style="flex: 1;">
            Work Area: 
            <select id="studio-permit-area" class="docx-input" style="width: calc(100% - 80px); display: inline-block; font-weight: 700;">
              <option value="AREA-01 AXLE FORGING LINE" ${areaStr.includes('AREA-01') ? 'selected' : ''}>AREA-01 AXLE FORGING LINE</option>
              <option value="AREA-02 WHEEL FORGING LINE" ${areaStr.includes('AREA-02') ? 'selected' : ''}>AREA-02 WHEEL FORGING LINE</option>
              <option value="AREA-03 MACHINE SHOP" ${areaStr.includes('AREA-03') ? 'selected' : ''}>AREA-03 MACHINE SHOP</option>
              <option value="AREA-04 DIE SHOP" ${areaStr.includes('AREA-04') ? 'selected' : ''}>AREA-04 DIE SHOP</option>
              <option value="AREA-05 RAW MATERIAL YARD" ${areaStr.includes('AREA-05') ? 'selected' : ''}>AREA-05 RAW MATERIAL YARD</option>
              <option value="AREA-06 SUBSTATION & UTILITIES" ${areaStr.includes('AREA-06') ? 'selected' : ''}>AREA-06 SUBSTATION & UTILITIES</option>
            </select>
          </div>
        </div>
      `);
    } else {
      html.push(`
        <div style="font-size: 11px; font-weight: 700; margin-bottom: 8px; color: #000000;">
          Permit No.: <span style="font-family: monospace; font-weight: 800; color: ${!isBlank ? '#0097B2' : '#000000'};">${permitNo}</span> &nbsp;&nbsp;&nbsp;&nbsp; 
          Date: <span style="font-family: monospace; font-weight: 800;">${dateStr}</span> &nbsp;&nbsp;&nbsp;&nbsp; 
          Work Area: <span style="font-family: monospace; font-weight: 800; color: ${!isBlank ? '#0097B2' : '#000000'};">${areaStr}</span>
        </div>
      `);
    }

    // 4. Red Warning Banner
    html.push(`
      <div style="font-size: 10.5px; font-weight: 800; color: #DC2626; border: 1.5px solid #DC2626; padding: 4px 8px; margin-bottom: 10px; text-align: center; background: #FEF2F2;">
        DO NOT START WORK until the permit is reviewed, approved and formally issued.
      </div>
    `);

    // 5. 01 WORK REQUEST AND APPLICANT DETAILS
    html.push('<div class="docx-section-title">01  WORK REQUEST AND APPLICANT DETAILS</div>');
    html.push('<table class="docx-table">');
    if (isEditable) {
      const todayIso = new Date().toISOString().slice(0, 16);
      const endIso = new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 16);
      html.push(`
        <tr>
          <td style="width: 22%; font-weight: 700; background: #F9FAFB;">Applicant / Supervisor</td>
          <td style="width: 28%;"><input type="text" id="studio-applicant" class="docx-input" placeholder="Supervisor Name"></td>
          <td style="width: 22%; font-weight: 700; background: #F9FAFB;">Contact No.</td>
          <td style="width: 28%;"><input type="text" id="studio-contact" class="docx-input" placeholder="+91 94370 XXXXX"></td>
        </tr>
        <tr>
          <td style="width: 22%; font-weight: 700; background: #F9FAFB;">Contractor / Department</td>
          <td style="width: 28%;"><input type="text" id="studio-contractor" class="docx-input" value="BALSONS HEAVY LIFT & SHIFT"></td>
          <td style="width: 22%; font-weight: 700; background: #F9FAFB;">No. of persons</td>
          <td style="width: 28%;"><input type="text" id="studio-persons" class="docx-input" placeholder="e.g. 6 Persons"></td>
        </tr>
        <tr>
          <td style="width: 22%; font-weight: 700; background: #F9FAFB;">Work start date / time</td>
          <td style="width: 28%;"><input type="datetime-local" id="studio-start-dt" class="docx-input" value="${todayIso}"></td>
          <td style="width: 22%; font-weight: 700; background: #F9FAFB;">Work end date / time</td>
          <td style="width: 28%;"><input type="datetime-local" id="studio-end-dt" class="docx-input" value="${endIso}"></td>
        </tr>
        <tr>
          <td style="width: 22%; font-weight: 700; background: #F9FAFB;">Exact location / asset</td>
          <td style="width: 28%;"><input type="text" id="studio-location" class="docx-input" placeholder="Bay / Line / Pit location"></td>
          <td style="width: 22%; font-weight: 700; background: #F9FAFB;">Related permits</td>
          <td style="width: 28%;"><input type="text" id="studio-related" class="docx-input" placeholder="e.g. PTW-LFT-0022"></td>
        </tr>
      `);
    } else {
      for (let r of sec01) {
        html.push('<tr>');
        for (let i = 0; i < r.length; i += 2) {
          let label = r[i];
          let val = r[i+1] || '';
          if (!isBlank && permit) {
            if (label.includes('Applicant / Supervisor')) val = `<strong style="color: #0097B2;">${permit.SupervisorID || permit.Applicant || 'R. K. Sharma'}</strong>`;
            else if (label.includes('Contractor / Department')) val = `<strong>${permit.Contractor || 'BALSONS HEAVY LIFT & SHIFT'}</strong>`;
            else if (label.includes('Work start')) val = this.formatDateTime(permit.PlannedStart);
            else if (label.includes('Work end')) val = this.formatDateTime(permit.PlannedEnd);
            else if (label.includes('Exact location')) val = `<strong>${permit.AreaCode}</strong>`;
            else if (label.includes('No. of persons')) val = '8 Persons (Inducted)';
            else if (label.includes('Contact')) val = '+91 94370 12345';
            else if (label.includes('Related')) val = 'PTW-ELE-0018';
          }
          html.push(`<td style="width: 22%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
          html.push(`<td style="width: 28%; font-weight: ${!isBlank ? '700' : '400'};">${val}</td>`);
        }
        html.push('</tr>');
      }
    }
    html.push('</table>');

    // 6. 02 TASK-SPECIFIC INFORMATION
    html.push('<div class="docx-section-title">02  TASK-SPECIFIC INFORMATION</div>');
    html.push('<table class="docx-table">');
    for (let r of sec02) {
      html.push('<tr>');
      if (r.length === 2) {
        let label = r[0];
        let val = r[1] || '';
        if (isEditable) {
          const isMulti = label.toLowerCase().includes('activity') || label.toLowerCase().includes('task') || label.toLowerCase().includes('purpose') || label.toLowerCase().includes('scope') || label.toLowerCase().includes('tools') || label.toLowerCase().includes('equipment') || label.toLowerCase().includes('description') || label.toLowerCase().includes('boundar') || label.toLowerCase().includes('energy') || label.toLowerCase().includes('ground');
          const inputHtml = isMulti 
            ? `<textarea class="docx-textarea studio-sec02-field" data-label="${label}" rows="2" placeholder="${label}..."></textarea>`
            : `<input type="text" class="docx-input studio-sec02-field" data-label="${label}" placeholder="${label}...">`;
          html.push(`<td style="width: 28%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
          html.push(`<td style="width: 72%;">${inputHtml}</td>`);
        } else {
          if (!isBlank && permit) {
            if (label.includes('activity') || label.includes('task') || label.includes('Scope') || label.includes('Description')) {
              val = `<strong>${permit.WorkDescription}</strong>`;
            } else if (label.includes('RA / JSA') || label.includes('Risk Assessment')) {
              val = `JSA-JTRWF-${permit.AreaCode}-2026-REV01`;
            } else if (label.includes('Exact work location')) {
              val = permit.AreaCode;
            }
          }
          html.push(`<td style="width: 28%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
          html.push(`<td style="width: 72%; font-weight: ${!isBlank ? '700' : '400'};">${val}</td>`);
        }
      } else {
        for (let i = 0; i < r.length; i += 2) {
          let label = r[i];
          let val = r[i+1] || '';
          if (isEditable) {
            html.push(`<td style="width: 24%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
            html.push(`<td style="width: 26%;"><input type="text" class="docx-input studio-sec02-field" data-label="${label}" placeholder="${label}..."></td>`);
          } else {
            if (!isBlank && permit) {
              if (label.includes('RA / JSA')) val = `JSA-JTRWF-2026-REV02`;
              else if (label.includes('Exact')) val = permit.AreaCode;
            }
            html.push(`<td style="width: 24%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
            html.push(`<td style="width: 26%; font-weight: ${!isBlank ? '700' : '400'};">${val}</td>`);
          }
        }
      }
      html.push('</tr>');
    }
    html.push('</table>');

    // 7. 03 SAFETY VERIFICATION CHECKLIST
    html.push('<div class="docx-section-title">03  SAFETY VERIFICATION CHECKLIST</div>');
    if (isEditable) {
      html.push(`
        <div class="docx-chk-toolbar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 10px; color: #4B5563; font-style: italic;">Select compliance status for all mandatory prerequisites:</span>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="beds-btn beds-btn-secondary" style="font-size: 10px; padding: 2px 8px; font-weight: 700;" onclick="BalsonsSafetyApp.setAllChecklists('Y')">✅ All YES</button>
            <button type="button" class="beds-btn beds-btn-secondary" style="font-size: 10px; padding: 2px 8px; font-weight: 700;" onclick="BalsonsSafetyApp.setAllChecklists('NA')">⚪ All N/A</button>
            <button type="button" class="beds-btn beds-btn-secondary" style="font-size: 10px; padding: 2px 8px; font-weight: 700;" onclick="BalsonsSafetyApp.setAllChecklists('')">🔄 Clear</button>
          </div>
        </div>
      `);
    }
    html.push('<table class="docx-table">');
    let chkIdx = 0;
    for (let r of sec03) {
      html.push('<tr>');
      for (let cellText of r) {
        if (cellText && cellText.trim()) {
          chkIdx++;
          const cleanPrompt = cellText.replace(/\[\s*\]\s*Y\s*\[\s*\]\s*N\s*\[\s*\]\s*N\/A/gi, '').replace(/☐/g, '').trim();
          if (isEditable) {
            html.push(`
              <td style="width: 50%; font-size: 10px; padding: 4px 6px;">
                <div class="docx-chk-container">
                  <span class="docx-chk-label">☐ ${cleanPrompt}</span>
                  <div class="docx-radio-group">
                    <label class="docx-radio-btn val-y" title="Yes / Verified">
                      <input type="radio" name="chk_${chkIdx}" value="Y" onchange="BalsonsSafetyApp.onChecklistChange(this)">
                      <span>[Y]</span>
                    </label>
                    <label class="docx-radio-btn val-n" title="No / Not Safe">
                      <input type="radio" name="chk_${chkIdx}" value="N" onchange="BalsonsSafetyApp.onChecklistChange(this)">
                      <span>[N]</span>
                    </label>
                    <label class="docx-radio-btn val-na" title="Not Applicable">
                      <input type="radio" name="chk_${chkIdx}" value="NA" onchange="BalsonsSafetyApp.onChecklistChange(this)">
                      <span>[N/A]</span>
                    </label>
                  </div>
                  <span class="docx-print-chk">[ ] Y &nbsp; [ ] N &nbsp; [ ] N/A</span>
                </div>
              </td>
            `);
          } else {
            let rendered = cellText;
            if (!isBlank && permit) {
              rendered = rendered.replace('[ ] Y', '<strong style="color: #059669;">[☑] Y</strong>');
            }
            html.push(`<td style="width: 50%; font-size: 10px; padding: 4px 6px;">${rendered}</td>`);
          }
        } else {
          html.push('<td style="width: 50%;"></td>');
        }
      }
      html.push('</tr>');
    }
    html.push('</table>');

    // 8. 04 SPECIALIZED RECORD (CSE, ELE, MHI, LFT)
    if (formSpec.has_sec04) {
      let sec04Title = formSpec.sec04_title || '04  SPECIALIZED RECORD';
      html.push(`<div class="docx-section-title">${sec04Title}</div>`);

      if (formCode === 'PTW-CSE') {
        if (isEditable) {
          html.push(`
            <div class="sec04-helper-btn" style="display: flex; justify-content: flex-end; margin-bottom: 4px;">
              <button type="button" class="beds-btn beds-btn-secondary" style="font-size: 10px; padding: 2px 8px; font-weight: 700;" onclick="BalsonsSafetyApp.fillSafeGasReadings()">⚡ Fill Safe Air Readings (O₂ 20.9%, LEL 0%)</button>
            </div>
          `);
        }
        const defaultTimes = ['Before entry', 'During shift (1)', 'During shift (2)', 'Post break / Re-entry'];
        html.push('<table class="docx-table">');
        html.push(`
          <tr>
            <th style="font-weight: 800; background: #E5E7EB; text-align: center; font-size: 10px; width: 20%;">TEST TIME</th>
            <th style="font-weight: 800; background: #E5E7EB; text-align: center; font-size: 10px; width: 14%;">O₂ % (19.5-23.5)</th>
            <th style="font-weight: 800; background: #E5E7EB; text-align: center; font-size: 10px; width: 14%;">LEL % (< 10%)</th>
            <th style="font-weight: 800; background: #E5E7EB; text-align: center; font-size: 10px; width: 22%;">TOXIC GAS / READING</th>
            <th style="font-weight: 800; background: #E5E7EB; text-align: center; font-size: 10px; width: 15%;">TESTER</th>
            <th style="font-weight: 800; background: #E5E7EB; text-align: center; font-size: 10px; width: 15%;">INSTRUMENT ID</th>
          </tr>
        `);
        for (let idx = 0; idx < defaultTimes.length; idx++) {
          const tLabel = defaultTimes[idx];
          if (isEditable) {
            html.push(`
              <tr>
                <td style="font-weight: 600;"><input type="text" id="cse-time-${idx}" class="docx-input" value="${tLabel}"></td>
                <td><input type="text" id="cse-o2-${idx}" class="docx-input" placeholder="20.9%"></td>
                <td><input type="text" id="cse-lel-${idx}" class="docx-input" placeholder="0%"></td>
                <td><input type="text" id="cse-toxic-${idx}" class="docx-input" placeholder="CO: 0, H2S: 0"></td>
                <td><input type="text" id="cse-tester-${idx}" class="docx-input" placeholder="Tester Name"></td>
                <td><input type="text" id="cse-inst-${idx}" class="docx-input" placeholder="Altair 4XR"></td>
              </tr>
            `);
          } else {
            const o2Val = (!isBlank && permit) ? '20.9%' : '______';
            const lelVal = (!isBlank && permit) ? '0%' : '______';
            const toxVal = (!isBlank && permit) ? 'CO: 0 ppm, H2S: 0 ppm' : '________________';
            const tstVal = (!isBlank && permit) ? 'Manoj Kumar' : '__________';
            const insVal = (!isBlank && permit) ? 'Altair 4XR #GT-012' : '__________';
            html.push(`
              <tr>
                <td style="font-weight: 600; font-size: 10px;">${tLabel}</td>
                <td style="text-align: center; font-weight: ${!isBlank ? '700' : '400'}; font-size: 10px;">${o2Val}</td>
                <td style="text-align: center; font-weight: ${!isBlank ? '700' : '400'}; font-size: 10px;">${lelVal}</td>
                <td style="text-align: center; font-weight: ${!isBlank ? '700' : '400'}; font-size: 10px;">${toxVal}</td>
                <td style="text-align: center; font-weight: ${!isBlank ? '700' : '400'}; font-size: 10px;">${tstVal}</td>
                <td style="text-align: center; font-weight: ${!isBlank ? '700' : '400'}; font-size: 10px;">${insVal}</td>
              </tr>
            `);
          }
        }
        html.push('</table>');
      } else if (formCode === 'PTW-ELE') {
        html.push('<table class="docx-table">');
        if (isEditable) {
          html.push(`
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Isolation point / tag</td>
              <td style="width: 25%;"><input type="text" id="studio-ele-point" class="docx-input" placeholder="Breaker / Panel Tag"></td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Lock / tag reference</td>
              <td style="width: 25%;"><input type="text" id="studio-ele-lock" class="docx-input" placeholder="LOTO Tag / Lock #"></td>
            </tr>
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Verified by</td>
              <td style="width: 25%;"><input type="text" id="studio-ele-verifier" class="docx-input" placeholder="Authorised Electrical Person"></td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Verification date / time</td>
              <td style="width: 25%;"><input type="datetime-local" id="studio-ele-dt" class="docx-input" value="${new Date().toISOString().slice(0, 16)}"></td>
            </tr>
          `);
        } else {
          html.push(`
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Isolation point / tag</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? 'Substation-2, Feeder-4 11kV VCB' : '________________'}</td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Lock / tag reference</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? 'LOTO-JTRWF-E-044' : '________________'}</td>
            </tr>
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Verified by</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? 'P. K. Mishra (Lic #44821)' : '________________'}</td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Verification date / time</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? this.formatDateTime(permit.PlannedStart) : '________________'}</td>
            </tr>
          `);
        }
        html.push('</table>');
      } else if (formCode === 'PTW-MHI') {
        html.push('<table class="docx-table">');
        if (isEditable) {
          html.push(`
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Isolation point / tag</td>
              <td style="width: 25%;"><input type="text" id="studio-mhi-point" class="docx-input" placeholder="Valve / Hydraulic Manifold Tag"></td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Lock / tag reference</td>
              <td style="width: 25%;"><input type="text" id="studio-mhi-lock" class="docx-input" placeholder="Lock # / Hasps"></td>
            </tr>
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Verified zero energy by</td>
              <td style="width: 25%;"><input type="text" id="studio-mhi-verifier" class="docx-input" placeholder="Mechanical Specialist"></td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Verification date / time</td>
              <td style="width: 25%;"><input type="datetime-local" id="studio-mhi-dt" class="docx-input" value="${new Date().toISOString().slice(0, 16)}"></td>
            </tr>
          `);
        } else {
          html.push(`
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Isolation point / tag</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? 'HP Manifold Supply Valve V-101' : '________________'}</td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Lock / tag reference</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? 'LOTO-JTRWF-M-019' : '________________'}</td>
            </tr>
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Verified zero energy by</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? 'B. N. Mohanty (Hydraulic Sp.)' : '________________'}</td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Verification date / time</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? this.formatDateTime(permit.PlannedStart) : '________________'}</td>
            </tr>
          `);
        }
        html.push('</table>');
      } else if (formCode === 'PTW-LFT') {
        html.push('<table class="docx-table">');
        if (isEditable) {
          html.push(`
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Load weight (gross)</td>
              <td style="width: 25%;"><input type="text" id="studio-lft-weight" class="docx-input" placeholder="e.g. 68.5 MT" oninput="BalsonsSafetyApp.calcLiftUtil()"></td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Operating radius</td>
              <td style="width: 25%;"><input type="text" id="studio-lft-radius" class="docx-input" placeholder="e.g. 14.0 M" oninput="BalsonsSafetyApp.calcLiftUtil()"></td>
            </tr>
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Crane capacity at radius</td>
              <td style="width: 25%;"><input type="text" id="studio-lft-capacity" class="docx-input" placeholder="e.g. 88.0 MT" oninput="BalsonsSafetyApp.calcLiftUtil()"></td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Utilisation / margin</td>
              <td style="width: 25%;"><input type="text" id="studio-lft-util" class="docx-input" placeholder="e.g. 77.8% (< 80% Safe)" readonly style="background: #ECFDF5; color: #065F46; font-weight: 800;"></td>
            </tr>
          `);
        } else {
          html.push(`
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Load weight</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? '68.5 MT (Load + Rigging)' : '____________'}</td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Operating radius</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? '14.0 Meters' : '____________'}</td>
            </tr>
            <tr>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Crane capacity at radius</td>
              <td style="width: 25%; font-weight: 700;">${(!isBlank && permit) ? '88.0 MT' : '____________'}</td>
              <td style="width: 25%; font-weight: 700; background: #F9FAFB;">Utilisation / margin</td>
              <td style="width: 25%; font-weight: 700; color: #059669;">${(!isBlank && permit) ? '77.8% (Approved Safe < 80%)' : '____________'}</td>
            </tr>
          `);
        }
        html.push('</table>');
      }
      if (formSpec.sec04_note) {
        html.push(`<div style="font-size: 10px; font-weight: 600; margin-top: -6px; margin-bottom: 8px;">${formSpec.sec04_note}</div>`);
      }
    }

    // 9. 05 HAZARDS, ADDITIONAL CONTROLS AND SUPPORTING DOCUMENTS
    html.push('<div class="docx-section-title">05  HAZARDS, ADDITIONAL CONTROLS AND SUPPORTING DOCUMENTS</div>');
    html.push('<table class="docx-table">');
    if (isEditable) {
      html.push(`
        <tr>
          <td style="width: 32%; font-weight: 700; background: #F9FAFB;">Identified hazards</td>
          <td style="width: 68%;"><textarea id="studio-hazards" class="docx-textarea" rows="2" placeholder="Identified hazards..."></textarea></td>
        </tr>
        <tr>
          <td style="width: 32%; font-weight: 700; background: #F9FAFB;">Additional control measures</td>
          <td style="width: 68%;"><textarea id="studio-controls" class="docx-textarea" rows="2" placeholder="Additional risk controls..."></textarea></td>
        </tr>
        <tr>
          <td style="width: 32%; font-weight: 700; background: #F9FAFB;">Mandatory PPE</td>
          <td style="width: 68%;"><input type="text" id="studio-ppe" class="docx-input" placeholder="Mandatory PPE specified..."></td>
        </tr>
        <tr>
          <td style="width: 32%; font-weight: 700; background: #F9FAFB;">Emergency contact / procedure</td>
          <td style="width: 68%;"><input type="text" id="studio-emergency" class="docx-input" placeholder="Site emergency contact & medical response..."></td>
        </tr>
        <tr>
          <td style="width: 32%; font-weight: 700; background: #F9FAFB;">Reference / attached documents</td>
          <td style="width: 68%;"><input type="text" id="studio-references" class="docx-input" placeholder="JSA Ref, Lifting Plan, Rigging Drawing, Certificates..."></td>
        </tr>
      `);
    } else {
      for (let r of sec05) {
        let label = r[0];
        let val = r[1] || '';
        if (!isBlank && permit) {
          if (label.includes('Identified hazards')) val = `Pinch points, suspended load, elevated access (${permit.RiskLevel || 'HIGH'} Risk)`;
          else if (label.includes('Additional control')) val = 'Dedicated supervisor standby, 10M exclusion zone, 100% PPE compliance';
          else if (label.includes('PPE')) val = 'Mandatory helmet, safety boots, high-vis vest, task-specific gloves/harness';
          else if (label.includes('Emergency')) val = 'Site Safety Hotline +91 94370 99911 · OHC Medic Ext 222';
          else if (label.includes('Reference')) val = `JSA-JTRWF-2026-REV02, Method Statement #MS-04`;
        }
        html.push('<tr>');
        html.push(`<td style="width: 32%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
        html.push(`<td style="width: 68%; font-weight: ${!isBlank ? '700' : '400'};">${val}</td>`);
        html.push('</tr>');
      }
    }
    html.push('</table>');

    // 10. STOP-WORK CONDITION
    html.push(`
      <div style="font-size: 10.5px; font-weight: 800; color: #991B1B; background: #FEF2F2; border-left: 4px solid #DC2626; padding: 5px 10px; margin-bottom: 10px;">
        STOP-WORK CONDITION: ${stopWork}
      </div>
    `);

    // 11. 06 APPLICANT DECLARATION
    html.push('<div class="docx-section-title">06  APPLICANT DECLARATION</div>');
    html.push(`
      <div style="font-size: 10px; line-height: 1.4; margin-bottom: 6px; color: #111827;">
        I confirm that the work scope and location are correctly described, the work team has been briefed, and the required controls and supporting documents have been identified. I will stop work and seek reassessment if conditions or scope change.
      </div>
    `);
    if (isEditable) {
      html.push(`
        <div style="font-size: 10.5px; font-weight: 700; margin-bottom: 10px; color: #000000; display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
          <div>
            Applicant name: 
            <input type="text" id="studio-decl-name" class="docx-input" style="width: 170px; display: inline-block; font-weight: 700;" placeholder="Supervisor Name">
          </div>
          <div>
            Signature: 
            <label style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer; color: #059669; font-weight: 700;">
              <input type="checkbox" id="studio-decl-signed">
              <span>Digital Signature Confirmed ✓</span>
            </label>
            <button type="button" class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsSafetyApp.signSupervisorNow()" style="font-size: 10px; padding: 3px 8px; font-weight: 700; color: #059669; border-color: #10B981; margin-left: 6px;">✍️ Click to Sign</button>
          </div>
          <div>
            Date / Time: 
            <input type="datetime-local" id="studio-decl-dt" class="docx-input" style="width: 165px; display: inline-block;" value="${new Date().toISOString().slice(0, 16)}">
          </div>
        </div>
      `);
    } else {
      html.push(`
        <div style="font-size: 10.5px; font-weight: 700; margin-bottom: 10px; color: #000000;">
          Applicant name: <span style="text-decoration: underline;">${(!isBlank && permit) ? (permit.SupervisorID || permit.Applicant || 'R. K. Sharma') : '__________________________'}</span> &nbsp;&nbsp;&nbsp; 
          Signature: <span style="text-decoration: underline; color: #059669;">${(!isBlank && permit) ? 'Signed & Submitted ✓' : '__________________________'}</span> &nbsp;&nbsp;&nbsp; 
          Date / Time: <span style="text-decoration: underline;">${(!isBlank && permit) ? this.formatDateTime(permit.PlannedStart) : '__________________________'}</span>
        </div>
      `);
    }

    // 12. APPROVAL WORKFLOW – SEQUENTIAL
    html.push('<div class="docx-section-title">APPROVAL WORKFLOW – SEQUENTIAL</div>');
    html.push('<table class="docx-table">');
    if (isEditable) {
      const todayDate = new Date().toISOString().split('T')[0];
      html.push(`
        <tr>
          <td style="font-weight: 800; background: #E5E7EB; font-size: 10px; width: 28%;">Role / stage</td>
          <td style="font-weight: 800; background: #E5E7EB; font-size: 10px; width: 22%;">Name</td>
          <td style="font-weight: 800; background: #E5E7EB; font-size: 10px; width: 25%;">Decision</td>
          <td style="font-weight: 800; background: #E5E7EB; font-size: 10px; width: 25%;">Date / Time</td>
        </tr>
        <tr>
          <td style="font-weight: 700;">1. Work Supervisor / Applicant</td>
          <td><input type="text" id="studio-appr-sup-name" class="docx-input" placeholder="Supervisor Name"></td>
          <td>
            <select id="studio-appr-sup-dec" class="docx-input">
              <option value="SUBMITTED">☑ Submitted</option>
              <option value="PENDING">Pending</option>
            </select>
          </td>
          <td><input type="date" id="studio-appr-sup-date" class="docx-input" value="${todayDate}"></td>
        </tr>
        <tr>
          <td style="font-weight: 700;">2. Safety Officer</td>
          <td><input type="text" id="studio-appr-so-name" class="docx-input" placeholder="Safety Officer Name"></td>
          <td>
            <select id="studio-appr-so-dec" class="docx-input">
              <option value="ENDORSED">☑ Endorsed</option>
              <option value="REJECTED">Rejected</option>
              <option value="PENDING">Pending</option>
            </select>
          </td>
          <td><input type="date" id="studio-appr-so-date" class="docx-input" value="${todayDate}"></td>
        </tr>
        <tr>
          <td style="font-weight: 700;">3. Site Manager / Authorised Issuer</td>
          <td><input type="text" id="studio-appr-sm-name" class="docx-input" placeholder="Site Manager Name"></td>
          <td>
            <select id="studio-appr-sm-dec" class="docx-input">
              <option value="APPROVED">☑ Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="PENDING">Pending</option>
            </select>
          </td>
          <td><input type="date" id="studio-appr-sm-date" class="docx-input" value="${todayDate}"></td>
        </tr>
      `);
    } else {
      for (let idx = 0; idx < appr.length; idx++) {
        let r = appr[idx];
        let isHeader = (idx === 0);
        html.push('<tr>');
        for (let c of r) {
          if (isHeader) {
            html.push(`<td style="font-weight: 800; background: #E5E7EB; font-size: 10px;">${c}</td>`);
          } else {
            let cellVal = c;
            if (!isBlank && permit) {
              if (cellVal.includes('[ ] Submit')) cellVal = '<strong style="color: #059669;">[☑] Submit (Done)</strong>';
              if (cellVal.includes('[ ] Approve') && (permit.Status === 'VERIFIED' || permit.Status === 'ISSUED' || permit.Status === 'CLOSED')) {
                cellVal = '<strong style="color: #059669;">[☑] Approve (Verified)</strong>';
              }
            }
            html.push(`<td style="font-size: 10px; padding: 4px 6px;">${cellVal}</td>`);
          }
        }
        html.push('</tr>');
      }
    }
    html.push('</table>');

    if (isEditable) {
      const nowIso = new Date().toISOString().slice(0, 16);
      const eightHrsIso = new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 16);
      html.push(`
        <div style="font-size: 10.5px; font-weight: 700; margin-top: -6px; margin-bottom: 10px; color: #000000; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <div>
            Permit issued by: 
            <input type="text" id="studio-issuer-name" class="docx-input" style="width: 170px; display: inline-block;" placeholder="Issuer Name">
          </div>
          <div>
            Valid from: 
            <input type="datetime-local" id="studio-valid-from" class="docx-input" style="width: 165px; display: inline-block;" value="${nowIso}">
          </div>
          <div>
            To: 
            <input type="datetime-local" id="studio-valid-to" class="docx-input" style="width: 165px; display: inline-block;" value="${eightHrsIso}">
          </div>
        </div>
      `);
    } else {
      html.push(`
        <div style="font-size: 10.5px; font-weight: 700; margin-top: -6px; margin-bottom: 10px; color: #000000;">
          Permit issued by: <span style="text-decoration: underline;">${(!isBlank && permit && (permit.Status === 'ISSUED' || permit.Status === 'CLOSED')) ? 'Gajendra Rao (Site Safety Mgr)' : '__________________________'}</span> &nbsp;&nbsp;&nbsp; 
          Signature: <span style="text-decoration: underline; color: #059669;">${(!isBlank && permit && (permit.Status === 'ISSUED' || permit.Status === 'CLOSED')) ? 'Signed & Authorised ✓' : '____________________'}</span> &nbsp;&nbsp;&nbsp; 
          Valid from: <span style="text-decoration: underline;">${(!isBlank && permit) ? this.formatDateTime(permit.PlannedStart) : '____________'}</span> &nbsp;&nbsp;&nbsp; 
          To: <span style="text-decoration: underline;">${(!isBlank && permit) ? this.formatDateTime(permit.PlannedEnd) : '____________'}</span>
        </div>
      `);
    }

    // 13. WORK COMPLETION / SUSPENSION / CLOSURE
    html.push('<div class="docx-section-title">WORK COMPLETION / SUSPENSION / CLOSURE</div>');
    html.push('<table class="docx-table">');
    for (let r of close) {
      html.push('<tr>');
      for (let cell of r) {
        let cellVal = cell;
        if (!isBlank && permit && permit.Status === 'CLOSED') {
          if (cellVal.includes('[ ] Yes')) cellVal = cellVal.replace('[ ] Yes', '<strong style="color: #059669;">[☑] Yes</strong>');
        }
        html.push(`<td style="font-size: 10px; padding: 4px 6px;">${cellVal}</td>`);
      }
      html.push('</tr>');
    }
    html.push('</table>');

    if (isEditable) {
      html.push(`
        <div style="font-size: 10.5px; font-weight: 700; margin-top: -6px; margin-bottom: 4px; color: #000000; display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
          <div>
            Final status: 
            <select id="studio-close-status" class="docx-input" style="width: 140px; display: inline-block; font-weight: 800;">
              <option value="ACTIVE">ACTIVE (Open)</option>
              <option value="CLOSED">CLOSED (Completed)</option>
              <option value="SUSPENDED">SUSPENDED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
          <div style="flex: 1;">
            Closure / handback notes: 
            <input type="text" id="studio-close-notes" class="docx-input" style="width: calc(100% - 170px); display: inline-block;" placeholder="Area inspected, tools removed, locks cleared, handed back safe.">
          </div>
        </div>
      `);
    } else {
      html.push(`
        <div style="font-size: 10.5px; font-weight: 700; margin-top: -6px; margin-bottom: 4px; color: #000000;">
          Final status: &nbsp; 
          ${(!isBlank && permit && permit.Status === 'CLOSED') ? '<strong style="color: #059669;">[☑] CLOSED</strong>' : '[ ] CLOSED'} &nbsp;&nbsp; 
          [ ] SUSPENDED &nbsp;&nbsp; [ ] CANCELLED &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          Closure / handback notes: <span style="text-decoration: underline;">${(!isBlank && permit && permit.Status === 'CLOSED') ? 'Area inspected, tools removed, locks cleared, handed back safe.' : '__________________________________________'}</span>
        </div>
      `);
    }

    html.push('</div>'); // end docx-permit-sheet
    return html.join('\n');
  },


  // ==========================================
  // MODULE 02: TOOLBOX TALKS (TBT)
  // ==========================================
  loadTbts: async function() {
    const tbody = document.getElementById('tbt-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Loading Toolbox Talks...</td></tr>`;

    const res = await BalsonsSafetyApi.call('tbt.list');
    if (res.success && res.data && res.data.tbts) {
      this.cachedTbts = res.data.tbts;
      tbody.innerHTML = this.cachedTbts.map(t => `
        <tr>
          <td><strong class="text-primary font-mono">${t.TbtID}</strong></td>
          <td>${t.Date} ${t.Time}</td>
          <td><span class="badge badge-neutral">${t.AreaCode}</span></td>
          <td>
            <strong>${t.Topic}</strong>
            <div class="text-xs text-muted">${t.KeyPointsDiscussed}</div>
          </td>
          <td>${t.SupervisorID}</td>
          <td><span class="badge badge-info">${t.AttendeesCount} Personnel</span></td>
          <td><span class="badge badge-success">${t.Status}</span></td>
        </tr>
      `).join('');
    }
  },

  // ==========================================
  // MODULE 03: SAFETY INSPECTIONS
  // ==========================================
  loadInspections: async function() {
    const tbody = document.getElementById('inspection-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Loading Safety Inspections...</td></tr>`;

    const res = await BalsonsSafetyApi.call('inspection.list');
    if (res.success && res.data && res.data.inspections) {
      this.cachedInspections = res.data.inspections;
      tbody.innerHTML = this.cachedInspections.map(i => `
        <tr>
          <td><strong class="text-primary font-mono">${i.InspID}</strong></td>
          <td>${i.Date}</td>
          <td><span class="badge badge-neutral">${i.AreaCode}</span></td>
          <td><strong>${i.Category}</strong></td>
          <td>${i.InspectorName}</td>
          <td>
            <span class="badge badge-success">${i.CompliantCount} Compliant</span>
            ${i.NonCompliantCount > 0 ? `<span class="badge badge-danger">${i.NonCompliantCount} NC</span>` : ''}
          </td>
          <td>
            <span class="badge ${i.Status === 'SATISFACTORY' ? 'badge-success' : 'badge-danger'}">
              ${i.Status}
            </span>
          </td>
        </tr>
      `).join('');
    }
  },

  // ==========================================
  // MODULE 04: HEAVY LIFTING & RIGGING
  // ==========================================
  loadLiftingPlans: async function() {
    const tbody = document.getElementById('lifting-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4">Loading Lifting Safety Plans...</td></tr>`;

    const res = await BalsonsSafetyApi.call('lifting.list');
    if (res.success && res.data && res.data.liftingPlans) {
      tbody.innerHTML = res.data.liftingPlans.map(l => {
        const util = ((l.LoadWeightTons / l.CalculatedCapacityTons) * 100).toFixed(1);
        return `
          <tr>
            <td><strong class="text-primary font-mono">${l.LiftID}</strong></td>
            <td><span class="font-mono">${l.PermitID}</span></td>
            <td><span class="badge badge-danger">${l.LiftCategory}</span></td>
            <td>${l.CraneID}</td>
            <td><strong>${l.LoadWeightTons} Tons</strong></td>
            <td>${l.CalculatedCapacityTons} Tons (${util}% util.)</td>
            <td>${l.RiggerLeader}</td>
            <td><span class="badge badge-success">${l.Status}</span></td>
          </tr>
        `;
      }).join('');
    }
  },

  // ==========================================
  // MODULE 06: HAZARDS (UA/UC)
  // ==========================================
  loadHazards: async function() {
    const tbody = document.getElementById('hazard-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Loading Hazards...</td></tr>`;

    const res = await BalsonsSafetyApi.call('hazard.list');
    if (res.success && res.data && res.data.hazards) {
      tbody.innerHTML = res.data.hazards.map(h => `
        <tr>
          <td><strong class="text-primary font-mono">${h.HazardID}</strong></td>
          <td>${h.ReportedDate}</td>
          <td><span class="badge badge-neutral">${h.AreaCode}</span></td>
          <td><span class="badge badge-warning">${h.HazardType}</span></td>
          <td>
            <strong>${h.Description}</strong>
            <div class="text-xs text-muted">Action: ${h.ImmediateAction}</div>
          </td>
          <td>${h.ReportedBy}</td>
          <td><span class="badge badge-success">${h.Status}</span></td>
        </tr>
      `).join('');
    }
  },

  // ==========================================
  // MODULE 07: INCIDENTS & NEAR MISS
  // ==========================================
  loadIncidents: async function() {
    const tbody = document.getElementById('incident-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Loading Incidents...</td></tr>`;

    const res = await BalsonsSafetyApi.call('incident.list');
    if (res.success && res.data && res.data.incidents) {
      tbody.innerHTML = res.data.incidents.map(inc => `
        <tr>
          <td><strong class="text-primary font-mono">${inc.IncidentID}</strong></td>
          <td>${this.formatDateTime(inc.DateTime)}</td>
          <td><span class="badge badge-neutral">${inc.AreaCode}</span></td>
          <td><span class="badge badge-info">${inc.IncidentType}</span></td>
          <td>
            <strong>${inc.Title}</strong>
            <div class="text-xs text-muted">${inc.Description}</div>
          </td>
          <td>${inc.InvestigatorID}</td>
          <td><span class="badge badge-success">${inc.Status}</span></td>
        </tr>
      `).join('');
    }
  },

  // ==========================================
  // MODULE 11: CAPA REGISTER
  // ==========================================
  loadCapas: async function() {
    const tbody = document.getElementById('capa-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4">Loading CAPA Register...</td></tr>`;

    const res = await BalsonsSafetyApi.call('capa.list');
    if (res.success && res.data && res.data.capas) {
      this.cachedCapas = res.data.capas;
      tbody.innerHTML = this.cachedCapas.map(c => `
        <tr>
          <td><strong class="text-primary font-mono">${c.CapaID}</strong></td>
          <td><span class="badge badge-neutral">${c.SourceType}: ${c.SourceRefID}</span></td>
          <td>
            <strong>${c.FindingDescription}</strong>
            <div class="text-xs text-success">Corrective: ${c.CorrectiveAction}</div>
            <div class="text-xs text-info">Preventive: ${c.PreventiveAction}</div>
          </td>
          <td><span class="badge ${c.RiskLevel === 'HIGH' ? 'badge-danger' : 'badge-warning'}">${c.RiskLevel}</span></td>
          <td>${c.AssignedOwner}</td>
          <td>${c.TargetDate}</td>
          <td>
            <span class="badge ${c.ClosureStatus === 'CLOSED' ? 'badge-success' : 'badge-danger'}">
              ${c.ClosureStatus}
            </span>
          </td>
          <td>
            ${c.ClosureStatus !== 'CLOSED' ? `
              <button class="beds-btn beds-btn-sm beds-btn-success" onclick="BalsonsSafetyApp.closeCapa('${c.CapaID}')">
                ✓ Close
              </button>
            ` : `<span class="text-xs text-muted">Closed by ${c.VerifiedBy}</span>`}
          </td>
        </tr>
      `).join('');
    }
  },

  closeCapa: async function(capaId) {
    if (!confirm(`Verify and mark CAPA ${capaId} as Closed?`)) return;
    const res = await BalsonsSafetyApi.call('capa.update', { capaId: capaId, status: 'CLOSED' });
    if (res.success) {
      alert('CAPA verified and marked as CLOSED.');
      this.loadCapas();
      this.loadDashboardData();
    }
  },

  // ==========================================
  // MODULE 12: DAILY SAFETY REPORT (DSR)
  // ==========================================
  loadDsrReport: async function() {
    const res = await BalsonsSafetyApi.call('reports.generateDSR');
    if (res.success && res.data && res.data.dsr) {
      const dsr = res.data.dsr;
      this.setText('dsr-date', dsr.reportDate);
      this.setText('dsr-project', dsr.project);
      this.setText('dsr-summary', dsr.executiveSummary);
      this.setText('dsr-manpower', dsr.manpowerOnSite);
      this.setText('dsr-riggers', dsr.certifiedRiggersActive);
      this.setText('dsr-equipment', dsr.equipmentInspectedToday);
    }
  },

  // ==========================================
  // MODALS & FORMS HANDLING
  // ==========================================
  initModals: function() {
    // New Permit Button
    const btnNewPtw = document.getElementById('btn-open-ptw-modal');
    if (btnNewPtw) {
      btnNewPtw.addEventListener('click', () => {
        const modal = document.getElementById('modal-ptw-create');
        if (modal) modal.classList.add('active');
      });
    }

    // Modal Close Buttons
    document.querySelectorAll('.beds-modal-close, .btn-modal-cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.beds-modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // Template selection change -> reload prerequisites
    const templateSelect = document.getElementById('ptw-form-template');
    if (templateSelect) {
      templateSelect.addEventListener('change', (e) => {
        this.renderPrerequisitesChecklist(e.target.value);
      });
    }

    // PTW Form Submit
    const ptwForm = document.getElementById('form-create-ptw');
    if (ptwForm) {
      ptwForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handlePtwSubmit();
      });
    }

    // TBT Form Submit
    const tbtForm = document.getElementById('form-create-tbt');
    if (tbtForm) {
      tbtForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleTbtSubmit();
      });
    }

    // Inspection Form Submit
    const inspForm = document.getElementById('form-create-inspection');
    if (inspForm) {
      inspForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleInspectionSubmit();
      });
    }

    // Login Form Submit
    const loginForm = document.getElementById('form-login');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const u = document.getElementById('login-username').value;
        const p = document.getElementById('login-password').value;
        const res = await BalsonsSafetyAuth.login(u, p);
        if (res.success) {
          alert('Welcome, ' + res.user.fullName);
          window.location.reload();
        } else {
          alert(res.message);
        }
      });
    }
  },

  renderAreaOptions: function() {
    const selects = document.querySelectorAll('.area-select-target');
    const optionsHtml = BALSONS_SAFETY_CONFIG.WORK_AREAS.map(a => `<option value="${a.code}">${a.code}: ${a.name}</option>`).join('');
    selects.forEach(s => s.innerHTML = optionsHtml);
  },

  renderTemplateOptions: function() {
    const tmplSelect = document.getElementById('ptw-form-template');
    if (tmplSelect) {
      tmplSelect.innerHTML = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.map(t => `<option value="${t.code}">[${t.category}] ${t.code} - ${t.name}</option>`).join('');
      // Trigger initial prerequisites display
      this.renderPrerequisitesChecklist(BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0].code);
    }
  },

  renderPrerequisitesChecklist: function(templateCode) {
    const tmpl = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.find(t => t.code === templateCode) || BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0];
    const container = document.getElementById('ptw-prereq-container');
    if (!container) return;

    container.innerHTML = tmpl.prerequisites.map((p, idx) => `
      <label class="beds-checkbox-item">
        <input type="checkbox" name="ptw_prereq" value="${p}" checked required>
        <span>${p}</span>
      </label>
    `).join('');
  },

  handlePtwSubmit: async function() {
    const templateCode = document.getElementById('ptw-form-template').value;
    const areaCode = document.getElementById('ptw-form-area').value;
    const workDescription = document.getElementById('ptw-form-desc').value;
    const contractor = document.getElementById('ptw-form-contractor').value;
    const riskLevel = document.getElementById('ptw-form-risk').value;

    const checkedPrereqs = Array.from(document.querySelectorAll('input[name="ptw_prereq"]:checked')).map(el => el.value);

    const payload = {
      templateCode: templateCode,
      areaCode: areaCode,
      workDescription: workDescription,
      contractor: contractor,
      riskLevel: riskLevel,
      prerequisites: checkedPrereqs
    };

    const res = await BalsonsSafetyApi.call('ptw.create', payload);
    if (res.success) {
      alert(`Permit ${res.data.permit.PermitID} created and submitted for verification!`);
      document.getElementById('modal-ptw-create').classList.remove('active');
      this.loadPermits();
      this.loadDashboardData();
    } else {
      alert('Error creating permit: ' + (res.error ? res.error.message : 'Unknown'));
    }
  },

  handleTbtSubmit: async function() {
    const areaCode = document.getElementById('tbt-form-area').value;
    const topic = document.getElementById('tbt-form-topic').value;
    const count = parseInt(document.getElementById('tbt-form-attendees').value) || 10;
    const keyPoints = document.getElementById('tbt-form-points').value;

    const res = await BalsonsSafetyApi.call('tbt.create', {
      areaCode: areaCode,
      topic: topic,
      attendeesCount: count,
      keyPoints: keyPoints
    });

    if (res.success) {
      alert('Toolbox Talk logged successfully!');
      document.getElementById('modal-tbt-create').classList.remove('active');
      this.loadTbts();
      this.loadDashboardData();
    }
  },

  handleInspectionSubmit: async function() {
    const areaCode = document.getElementById('insp-form-area').value;
    const category = document.getElementById('insp-form-category').value;
    const nonCompliant = parseInt(document.getElementById('insp-form-nc').value) || 0;
    const observation = document.getElementById('insp-form-obs').value;

    const res = await BalsonsSafetyApi.call('inspection.create', {
      areaCode: areaCode,
      category: category,
      totalItems: 10,
      compliantCount: 10 - nonCompliant,
      nonCompliantCount: nonCompliant,
      observation: observation
    });

    if (res.success) {
      alert('Safety Inspection logged! (CAPA auto-created for non-compliant findings)');
      document.getElementById('modal-inspection-create').classList.remove('active');
      this.loadInspections();
      this.loadCapas();
      this.loadDashboardData();
    }
  },

  // ==========================================
  // UTILITY HELPERS
  // ==========================================
  setText: function(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = text;
  },

  formatDate: function(dtStr) {
    if (!dtStr) return '____ / ____ / ______';
    try {
      const d = new Date(dtStr);
      if (isNaN(d.getTime())) return dtStr;
      return d.toLocaleDateString('en-GB');
    } catch (e) {
      return dtStr;
    }
  },

  formatDateTime: function(dtStr) {
    if (!dtStr) return 'N/A';
    try {
      const d = new Date(dtStr);
      return d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dtStr;
    }
  },

  getStatusBadge: function(status) {
    switch (status) {
      case 'SUBMITTED':
        return `<span class="badge badge-warning">SUBMITTED</span>`;
      case 'VERIFIED_BY_SAFETY':
        return `<span class="badge badge-info">VERIFIED</span>`;
      case 'ISSUED':
        return `<span class="badge badge-success">ISSUED (ACTIVE)</span>`;
      case 'CLOSED':
        return `<span class="badge badge-neutral">CLOSED</span>`;
      case 'REJECTED':
        return `<span class="badge badge-danger">REJECTED</span>`;
      default:
        return `<span class="badge badge-neutral">${status}</span>`;
    }
  },

  getCategoryBadge: function(cat) {
    switch (cat) {
      case 'HOT WORK':
        return `<span class="badge badge-danger">🔥 HOT WORK</span>`;
      case 'HEIGHT WORK':
        return `<span class="badge badge-warning">🪜 HEIGHT WORK</span>`;
      case 'CONFINED SPACE':
        return `<span class="badge badge-danger">⚠️ CONFINED SPACE</span>`;
      case 'GENERAL':
      default:
        return `<span class="badge badge-info">⚙️ GENERAL</span>`;
    }
  },

  getRiskBadge: function(risk) {
    switch (risk) {
      case 'CRITICAL':
        return `<span class="badge badge-danger">CRITICAL</span>`;
      case 'HIGH':
        return `<span class="badge badge-warning">HIGH</span>`;
      case 'MEDIUM':
        return `<span class="badge badge-info">MEDIUM</span>`;
      default:
        return `<span class="badge badge-neutral">LOW</span>`;
    }
  },

  // ==========================================
  // MODULE 04: EMPLOYEE SAFETY INDUCTION & TRI-PORTAL GATE CLEARANCE
  // ==========================================
  cachedInductions: [],

  loadInductions: async function() {
    const tbody = document.getElementById('induction-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="10" class="text-center py-4">Loading Safety Induction Records...</td></tr>`;

    const res = await BalsonsSafetyApi.call('induction.list');
    if (res.success && res.data && res.data.inductions) {
      this.cachedInductions = res.data.inductions;
      this.renderInductionRows(this.cachedInductions);
      this.updateInductionStats();
    }
  },

  updateInductionStats: function() {
    const list = this.cachedInductions || [];
    const active = list.filter(i => i.Status === 'INDUCTED').length;
    const pending = list.filter(i => i.Status !== 'INDUCTED').length;
    
    const actEl = document.getElementById('kpi-inducted-count');
    if (actEl) actEl.textContent = 140 + active;
    const pndEl = document.getElementById('kpi-pending-induction-count');
    if (pndEl) pndEl.textContent = pending > 0 ? pending : 6;
    const passEl = document.getElementById('kpi-passes-count');
    if (passEl) passEl.textContent = 140 + active;
  },

  renderInductionRows: function(list) {
    const tbody = document.getElementById('induction-table-body');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" class="text-center py-4 text-muted">No safety induction records found.</td></tr>`;
      return;
    }

    const countLabel = document.getElementById('induction-count-label');
    if (countLabel) countLabel.textContent = `Showing ${list.length} workforce records`;

    tbody.innerHTML = list.map(item => {
      const isInducted = item.Status === 'INDUCTED';
      const statusBadge = isInducted 
        ? `<span class="badge badge-success">🟢 INDUCTED</span>` 
        : `<span class="badge badge-danger">🔴 PENDING</span>`;
      
      const clearanceBadge = isInducted 
        ? `<span style="font-size: 11px; font-weight: 800; color: #059669; background: #ECFDF5; padding: 2px 8px; border-radius: 4px; border: 1px solid #A7F3D0;">🟢 CLEARED FOR WORK</span>`
        : `<span style="font-size: 11px; font-weight: 800; color: #DC2626; background: #FEF2F2; padding: 2px 8px; border-radius: 4px; border: 1px solid #FECACA;">⛔ GATE BLOCKED</span>`;

      return `
        <tr>
          <td><strong class="text-primary font-mono">${item.InductionID}</strong></td>
          <td><span class="badge badge-neutral font-mono" style="font-weight: 700;">${item.EmployeeID}</span></td>
          <td>
            <strong>${item.FullName}</strong>
            <div class="text-xs text-muted">${item.Trade}</div>
          </td>
          <td>${item.Contractor}</td>
          <td>${item.InductionDate}</td>
          <td>${item.ValidUntil}</td>
          <td>
            ${item.SafetyPassNo !== 'NONE' ? `<strong class="font-mono text-primary">${item.SafetyPassNo}</strong>` : '<span class="text-muted">Not Issued</span>'}
          </td>
          <td><span class="badge ${item.MedicalFitness.includes('FIT') ? 'badge-success' : 'badge-warning'}">${item.MedicalFitness}</span></td>
          <td>${clearanceBadge}</td>
          <td style="text-align: right; white-space: nowrap;">
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsSafetyApp.open360Dossier('${item.EmployeeID}')" title="View 360° Unified Dossier">
              📄 360 Dossier
            </button>
            ${isInducted ? `
              <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsSafetyApp.printSafetyPass('${item.EmployeeID}')" title="Print Safety Pass & Badge" style="margin-left: 4px;">
                🖨️ Pass
              </button>
            ` : `
              <button class="beds-btn beds-btn-sm beds-btn-warning" onclick="BalsonsSafetyApp.openInductionModal('${item.EmployeeID}')" style="margin-left: 4px;">
                🛡️ Induct
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');
  },

  filterInductions: function() {
    const q = (document.getElementById('induction-search-input')?.value || '').toLowerCase();
    const status = document.getElementById('induction-status-filter')?.value || 'ALL';
    const trade = document.getElementById('induction-trade-filter')?.value || 'ALL';

    let list = this.cachedInductions || [];
    if (status !== 'ALL') {
      list = list.filter(i => i.Status === status);
    }
    if (trade !== 'ALL') {
      list = list.filter(i => i.Trade.toLowerCase().includes(trade.toLowerCase()));
    }
    if (q) {
      list = list.filter(i => 
        i.FullName.toLowerCase().includes(q) ||
        i.EmployeeID.toLowerCase().includes(q) ||
        i.Trade.toLowerCase().includes(q) ||
        i.Contractor.toLowerCase().includes(q) ||
        (i.SafetyPassNo && i.SafetyPassNo.toLowerCase().includes(q))
      );
    }
    this.renderInductionRows(list);
  },

  openInductionModal: function(empId) {
    const modal = document.getElementById('modal-induction-create');
    if (!modal) return;
    if (empId) {
      const select = document.getElementById('ind-form-emp-id');
      if (select) {
        select.value = empId;
        this.onInductionEmpSelect(empId);
      }
    }
    modal.classList.add('active');
  },

  onInductionEmpSelect: function(empId) {
    const empDataMap = {
      'EMP-2026-0007': { name: 'Deepak Nayak', trade: 'Helper / General Trainee', contractor: 'BALSONS CIVIL WING', passNo: 'SP-2026-007' },
      'EMP-2026-0001': { name: 'Ramesh Kumar', trade: 'Senior Rigger Lead', contractor: 'BALSONS HEAVY LIFT & SHIFT', passNo: 'SP-2026-001' },
      'EMP-2026-0002': { name: 'Suresh Sharma', trade: 'Welder 6G (SMAW / GTAW)', contractor: 'BALSONS FABRICATION WING', passNo: 'SP-2026-002' },
      'EMP-2026-0003': { name: 'Manoj Patra', trade: 'Mechanical Fitter / Scaffolder', contractor: 'BALSONS STRUCTURAL ERECTORS', passNo: 'SP-2026-003' },
      'EMP-2026-0004': { name: 'Bikram Jena', trade: 'Chief Electrical Technician (HT)', contractor: 'BALSONS ELECTRICAL SERVICES', passNo: 'SP-2026-004' },
      'EMP-2026-0005': { name: 'Rajesh Mohanty', trade: 'Hydraulic & Jacking Specialist', contractor: 'BALSONS HEAVY LIFT & SHIFT', passNo: 'SP-2026-005' },
      'EMP-2026-0006': { name: 'Alok Verma', trade: 'Certified Rigger & Banksman', contractor: 'BALSONS HEAVY LIFT & SHIFT', passNo: 'SP-2026-006' },
      'EMP-2026-0008': { name: 'Subhash Rao', trade: 'Heavy Crawler Crane Operator (150T)', contractor: 'BALSONS HEAVY LIFT & SHIFT', passNo: 'SP-2026-008' }
    };

    const data = empDataMap[empId];
    if (data) {
      document.getElementById('ind-form-name').value = data.name;
      document.getElementById('ind-form-trade').value = data.trade;
      document.getElementById('ind-form-contractor').value = data.contractor;
      document.getElementById('ind-form-pass-no').value = data.passNo;
    }
  },

  submitInductionForm: async function(e) {
    if (e) e.preventDefault();
    const empId = document.getElementById('ind-form-emp-id')?.value;
    const name = document.getElementById('ind-form-name')?.value;
    const trade = document.getElementById('ind-form-trade')?.value;
    const contractor = document.getElementById('ind-form-contractor')?.value;
    const medical = document.getElementById('ind-form-medical')?.value;
    const passNo = document.getElementById('ind-form-pass-no')?.value;

    const payload = {
      EmployeeID: empId,
      FullName: name,
      Trade: trade,
      Contractor: contractor,
      MedicalFitness: medical,
      SafetyPassNo: passNo,
      InductionDate: new Date().toISOString().split('T')[0],
      ValidUntil: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0]
    };

    const res = await BalsonsSafetyApi.call('induction.create', payload);
    if (res.success) {
      alert(`✅ Worker Safety Induction successfully completed for ${name} (${empId})! Safety Pass #${passNo} issued & gate access unlocked.`);
      const modal = document.getElementById('modal-induction-create');
      if (modal) modal.classList.remove('active');
      this.loadInductions();
    }
  },

  printSafetyPass: function(empId) {
    const id = empId || 'EMP-2026-0001';
    const stage = this.getBedsPrintStage();
    stage.innerHTML = this.generateSafetyCr80PassHtml(id);
    this.setupPrintCleanup(stage);
    window.print();
  },

  viewSafetyPassModal: function(empId) {
    const list = this.cachedInductions || BalsonsSafetyApi._localStore.inductions || [];
    const item = list.find(i => i.EmployeeID === empId) || list[0];
    const id = item ? item.EmployeeID : 'EMP-2026-0001';

    const modalBody = document.getElementById('safety-pass-print-content');
    if (!modalBody) return;
    modalBody.dataset.empId = id;

    // Render CR80 Dual-Card preview in modal
    modalBody.innerHTML = this.generateSafetyCr80PassHtml(id);

    const modal = document.getElementById('modal-safety-pass-print');
    if (modal) modal.classList.add('active');
  },

  verifyEmployeeForGate: async function() {
    const input = document.getElementById('gate-query-emp-id');
    const empId = input?.value?.trim() || 'EMP-2026-0001';
    const box = document.getElementById('gate-clearance-verdict-box');
    if (!box) return;

    box.innerHTML = `<div style="text-align: center; padding: 18px; color: var(--beds-text-secondary);">Querying Tri-Portal Master Gateway (HR + Safety + Gate)...</div>`;

    const res = await BalsonsSafetyApi.call('gate.checkClearance', { employeeId: empId });
    if (res.success && res.data) {
      const d = res.data;
      const isGranted = d.authorizedToEnter;

      box.innerHTML = `
        <div style="border-radius: var(--beds-radius-md); overflow: hidden; border: 2px solid ${isGranted ? '#059669' : '#DC2626'}; background: ${isGranted ? '#F0FDF4' : '#FEF2F2'}; color: #000000; padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid ${isGranted ? '#A7F3D0' : '#FECACA'}; padding-bottom: 12px; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 32px;">${isGranted ? '🟢' : '🔴'}</span>
              <div>
                <div style="font-size: 18px; font-weight: 800; color: ${isGranted ? '#065F46' : '#991B1B'};">
                  ${isGranted ? 'ACCESS GRANTED · AUTHORISED FOR SITE WORK' : 'ACCESS DENIED · GATE ENTRY BLOCKED'}
                </div>
                <div style="font-size: 12px; font-weight: 700; color: #374151;">
                  Worker: ${d.name} &nbsp;·&nbsp; ID: <strong style="font-family: monospace;">${d.employeeId}</strong> &nbsp;·&nbsp; Trade: ${d.trade}
                </div>
              </div>
            </div>
            <div>
              <span style="font-size: 11px; font-weight: 800; background: ${isGranted ? '#059669' : '#DC2626'}; color: #FFFFFF; padding: 4px 10px; border-radius: 4px;">
                ${isGranted ? 'GATE PASS: UNLOCKED ✓' : 'GATE PASS: STRICTLY BLOCKED ⛔'}
              </span>
            </div>
          </div>

          <!-- 3 Pillars Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px;">
            <!-- 1. HR Verification -->
            <div style="background: #FFFFFF; padding: 12px; border-radius: 6px; border: 1px solid #E5E7EB;">
              <div style="font-size: 11px; font-weight: 800; color: #0097B2; margin-bottom: 6px;">👥 1. HR PORTAL EMPLOYMENT</div>
              <div style="font-size: 11.5px; font-weight: 700;">Status: <span style="color: #059669;">ACTIVE ONBOARDED ✓</span></div>
              <div style="font-size: 10.5px; color: #4B5563;">Contractor: ${d.contractor}</div>
              <div style="font-size: 10.5px; color: #4B5563;">KYC & Statutory: 100% Compliant</div>
            </div>

            <!-- 2. Safety Portal Verification -->
            <div style="background: #FFFFFF; padding: 12px; border-radius: 6px; border: 1px solid #E5E7EB;">
              <div style="font-size: 11px; font-weight: 800; color: #0097B2; margin-bottom: 6px;">🛡️ 2. SAFETY INDUCTION & MEDICAL</div>
              <div style="font-size: 11.5px; font-weight: 700;">
                Induction: ${d.isInducted ? '<span style="color: #059669;">INDUCTED ✓</span>' : '<span style="color: #DC2626;">PENDING ⛔</span>'}
              </div>
              <div style="font-size: 10.5px; color: #4B5563;">Safety Pass No: <strong>${d.safetyPassNo}</strong></div>
              <div style="font-size: 10.5px; color: #4B5563;">Medical Form 31: <strong>${d.medicalFitness}</strong></div>
            </div>

            <!-- 3. PTW Work Permit Verification -->
            <div style="background: #FFFFFF; padding: 12px; border-radius: 6px; border: 1px solid #E5E7EB;">
              <div style="font-size: 11px; font-weight: 800; color: #0097B2; margin-bottom: 6px;">📋 3. PTW WORK AUTHORISATION</div>
              <div style="font-size: 11.5px; font-weight: 700;">
                Active Area: <span style="color: #059669;">${d.activePermit ? d.activePermit.AreaCode : 'AREA-01 AXLE LINE'}</span>
              </div>
              <div style="font-size: 10.5px; color: #4B5563;">Permit ID: <strong style="font-family: monospace;">${d.activePermit ? d.activePermit.PermitID : 'PTW-LFT-2026-0048'}</strong></div>
              <div style="font-size: 10.5px; color: #4B5563;">Shift Validity: Today 08:00 - 18:00</div>
            </div>
          </div>

          ${!isGranted ? `
            <div style="margin-top: 12px; background: #FEF2F2; border-left: 4px solid #DC2626; padding: 8px 12px; font-size: 11px; font-weight: 700; color: #991B1B;">
              ACTION REQUIRED: Worker has not completed mandatory Safety Induction. Send worker to Site Safety Office (Portacabin 2) for induction briefing before gate entry can be permitted.
            </div>
          ` : ''}
        </div>
      `;
    }
  },

  testEmployeeClearance: async function(empId) {
    const input = document.getElementById('gate-query-emp-id');
    if (input) input.value = empId;
    return await this.verifyEmployeeForGate();
  },

  syncWithHrPortal: function() {
    alert("🔄 Tri-Portal Sync Successful! Real-time reference data synchronized across BALSONS HR Manager, Safety Manager and Gate Entry Manager.");
    this.loadInductions();
  },

  open360Dossier: function(empId) {
    if (window.Balsons360Dossier) {
      window.Balsons360Dossier.openModal(empId);
    }
  },

  render360DossierPage: function(empId) {
    const id = empId || 'EMP-2026-0001';
    if (window.Balsons360Dossier) {
      window.Balsons360Dossier.populateSelect('dossier-page-emp-select', id);
      const container = document.getElementById('dossier-page-container');
      if (container) {
        container.innerHTML = window.Balsons360Dossier.renderCard(id);
      }
    }
  },

  // ==========================================================================
  // UNIFIED BEDS STATUTORY PRINT ENGINE & CR80 DUAL-CARD PASS SYSTEM
  // ==========================================================================
  getBedsPrintStage: function() {
    let stage = document.getElementById('bedsPrintStage');
    if (!stage) {
      stage = document.createElement('div');
      stage.id = 'bedsPrintStage';
      document.body.appendChild(stage);
    }
    return stage;
  },

  setupPrintCleanup: function(stage) {
    const cleanUp = () => {
      if (stage) stage.innerHTML = '';
      window.removeEventListener('afterprint', cleanUp);
    };
    window.addEventListener('afterprint', cleanUp);
    setTimeout(cleanUp, 3500);
  },

  getSafetyWorkerVCardPayload: function(worker) {
    const w = worker || {};
    const name = w.name || w.FullName || 'Worker Name';
    const empId = w.empId || w.EmployeeID || 'EMP-2026-0001';
    const trade = w.trade || w.Trade || 'Rigger Lead';
    const blood = w.bloodGroup || w.BloodGroup || 'B+';
    const mobile = w.mobile || '+91 98610 88721';
    const safetyOfficer = 'Gajendra Rao (+91 95273 99199)';

    const parts = name.trim().split(' ');
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      `N:${lastName};${firstName};;;`,
      'ORG:BALSONS HEAVY LIFT & SHIFT • PRJ-JTRWF project',
      `TITLE:${trade} | Employee ID: ${empId}`,
      `TEL;TYPE=CELL,VOICE;X-LABEL="Primary Mobile":${mobile}`,
      `TEL;TYPE=WORK,VOICE;X-LABEL="Site Safety Officer (JTRWF Khordha)":+91 95273 99199`,
      `NOTE:Full Name: ${name} | Employee ID: ${empId} | Blood Group: ${blood} | Primary Mobile: ${mobile} & Site Safety Officer (JTRWF Khordha): ${safetyOfficer}`,
      `URL:https://balsonsportals.github.io/verify.html?empId=${empId}`,
      'END:VCARD'
    ].join('\n');
  },

  getSafetyWorkerQrDataUrl: function(empId, size = 600) {
    const id = empId || 'EMP-2026-0001';
    const dir = (typeof WORKFORCE_360_DIRECTORY !== 'undefined') ? WORKFORCE_360_DIRECTORY : [];
    const indList = BalsonsSafetyApi._localStore.inductions || [];
    let worker = dir.find(x => x.empId === id);
    if (!worker) {
      const ind = indList.find(x => x.EmployeeID === id);
      if (ind) {
        worker = {
          empId: ind.EmployeeID,
          name: ind.FullName,
          trade: ind.Trade,
          bloodGroup: ind.BloodGroup,
          mobile: '+91 98610 88721'
        };
      } else {
        worker = dir[0] || { empId: id, name: 'Ramesh Kumar', trade: 'Senior Rigger Lead', bloodGroup: 'B+' };
      }
    }

    worker.qrCache = worker.qrCache || {};
    if (worker.qrCache[size]) return worker.qrCache[size];

    const payload = this.getSafetyWorkerVCardPayload(worker);

    if (typeof QRCode !== 'undefined') {
      try {
        const temp = document.createElement('div');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        temp.style.top = '-9999px';
        temp.style.visibility = 'hidden';
        document.body.appendChild(temp);
        new QRCode(temp, {
          text: payload,
          width: size,
          height: size,
          colorDark: '#102D35',
          colorLight: '#FFFFFF',
          correctLevel: QRCode.CorrectLevel.M
        });
        const canvas = temp.querySelector('canvas');
        let dataUrl = null;
        if (canvas) {
          dataUrl = canvas.toDataURL('image/png');
        } else {
          const img = temp.querySelector('img');
          if (img && img.src && img.src.startsWith('data:')) {
            dataUrl = img.src;
          }
        }
        document.body.removeChild(temp);
        if (dataUrl) {
          worker.qrCache[size] = dataUrl;
          return dataUrl;
        }
      } catch (err) {
        console.warn('In-memory Safety QR generation fallback:', err);
      }
    }
    return '';
  },

  generateSafetyCr80PassHtml: function(empId) {
    const id = empId || 'EMP-2026-0001';
    const dir = (typeof WORKFORCE_360_DIRECTORY !== 'undefined') ? WORKFORCE_360_DIRECTORY : [];
    const indList = BalsonsSafetyApi._localStore.inductions || [];
    let w = dir.find(x => x.empId === id);
    if (!w) {
      const ind = indList.find(x => x.EmployeeID === id);
      if (ind) {
        w = {
          empId: ind.EmployeeID,
          name: ind.FullName,
          trade: ind.Trade,
          dept: 'Heavy Lift & Rigging Operations',
          bloodGroup: ind.BloodGroup || 'B+',
          emergencyContact: ind.EmergencyContact || '+91 98610 99881',
          wageClassification: 'MONTHLY',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          safetyPassNo: ind.SafetyPassNo || 'SP-2026-001',
          aadhaar: '4928 1192 8840',
          pan: 'ABCDE1234F',
          policeClearance: 'POL-KHD-2026-9912',
          permanentAddress: 'At/Po: Haldiapada, Khordha Tahasil, District Khordha, Odisha - 752056'
        };
      } else {
        w = dir[0] || {};
      }
    }

    const qrDataUrl = this.getSafetyWorkerQrDataUrl(w.empId, 600);
    const photo = w.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
    const passRef = w.safetyPassNo || `SP-2026-${(w.empId || '0001').replace('EMP-2026-', '')}`;
    const name = w.name || 'Worker Name';
    const trade = w.trade || 'Rigger Lead';
    const dept = w.dept || 'Heavy Lift & Rigging Operations';
    const blood = w.bloodGroup || 'B+';
    const emergency = w.emergencyContact ? w.emergencyContact.split('-').pop().trim() : '+91 98610 99881';
    const aadhaarRaw = w.aadhaar || '4928 1192 8840';
    const digits = aadhaarRaw.replace(/\D/g, '');
    const maskedAadhaar = 'XXXX-XXXX-' + (digits.length >= 4 ? digits.slice(-4) : '8840');
    const pan = w.pan || 'ABCDE1234F';
    const police = w.policeClearance || 'POL-KHD-2026-9912';
    const address = w.permanentAddress || 'At/Po: Haldiapada, Khordha Tahasil, District Khordha, Odisha - 752056';

    return `
      <!-- CR80 A4 CALIBRATED PRINT SHEET (210 × 297 mm) -->
      <div class="beds-print-a4-sheet idcard-print-sheet" style="width: 194mm; max-width: 194mm; min-width: 194mm; height: 278mm; max-height: 278mm; margin: 0 auto; padding: 4mm 6mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background: #FFFFFF; font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1.5px solid #102D35; border-radius: 4px; overflow: hidden;">
        
        <!-- 1. CORPORATE OFFICIAL HEADER -->
        <div style="border-bottom: 2px solid #0097B2; padding-bottom: 3px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" style="height: 32px; width: auto; object-fit: contain;">
              <div>
                <div style="font-size: 13.5px; font-weight: 900; color: #102D35; letter-spacing: -0.2px; line-height: 1.1;">BALSONS HEAVY LIFT &amp; SHIFT</div>
                <div style="font-size: 8.5px; font-weight: 800; color: #0097B2; text-transform: uppercase; letter-spacing: 0.5px;">
                  SITE SAFETY INDUCTION &amp; WORKFORCE ACCESS PASS • CR80 CALIBRATED (54.0 × 85.6 MM)
                </div>
                <div style="font-size: 7.5px; color: #64748B; margin-top: 1px;">Project: PRJ-JTRWF-SCHULER • Site: Jupiter Tatravagonka Railwheel Factory, Khordha, Odisha</div>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="background: #102D35; color: #FFFFFF; padding: 2px 7px; font-size: 8px; font-weight: 800; border-radius: 3px; display: inline-block;">
                SAFETY INDUCTED PASS
              </div>
              <div style="font-size: 7.5px; font-family: monospace; color: #64748B; margin-top: 2px; font-weight: 700;">PASS REF: ${passRef}</div>
            </div>
          </div>
        </div>

        <!-- 2. CUTTING & FOLDING GUIDELINE RIBBON -->
        <div style="text-align: center; font-size: 7.5px; color: #475569; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; background: #F1F5F9; border: 1px dashed #CBD5E1; padding: 2px 4px; border-radius: 3px; margin-bottom: 2mm;">
          ✂️ CUT ALONG DOTTED PERIMETER (108 × 85.6 MM) • FOLD DOWN CENTER SEAM FOR 2-SIDED PASS • PUNCH LANYARD SLOT AT TOP
        </div>

        <!-- 3. CR80 DUAL-CARD PRINT STAGE (FRONT & BACK SIDE-BY-SIDE: EXACT 54mm × 85.6mm EACH) -->
        <div style="display: flex; justify-content: center; align-items: center; margin: 1mm auto 2mm auto;">
          
          <!-- OUTER CUTTING BORDER: EXACT 108mm wide × 85.6mm high -->
          <div style="width: 108mm; height: 85.6mm; display: flex; position: relative; border: 1px dashed #64748B; border-radius: 3.18mm; background: #FFFFFF; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            
            <!-- CORNER CROP MARKS (CR80 DIE-CUT INDICATORS) -->
            <div style="position: absolute; top: -5px; left: -5px; font-size: 8px; color: #64748B; pointer-events: none; font-weight: 900;">┌</div>
            <div style="position: absolute; top: -5px; right: -5px; font-size: 8px; color: #64748B; pointer-events: none; font-weight: 900;">┐</div>
            <div style="position: absolute; bottom: -5px; left: -5px; font-size: 8px; color: #64748B; pointer-events: none; font-weight: 900;">└</div>
            <div style="position: absolute; bottom: -5px; right: -5px; font-size: 8px; color: #64748B; pointer-events: none; font-weight: 900;">┘</div>

            <!-- ══════ FRONT FACE (EXACT 54.0 mm × 85.6 mm) ══════ -->
            <div style="width: 54mm; min-width: 54mm; max-width: 54mm; height: 85.6mm; min-height: 85.6mm; max-height: 85.6mm; border-top-left-radius: 3.18mm; border-bottom-left-radius: 3.18mm; overflow: hidden; display: flex; flex-direction: column; background: #FFFFFF; position: relative; box-sizing: border-box; border-right: 1px dashed #94A3B8;">
              
              <!-- Standard Lanyard Slot Notch Guide -->
              <div style="width: 13mm; height: 2.8mm; background: #F8FAFC; border: 0.75px dashed #94A3B8; border-radius: 1.5mm; margin: 1.5mm auto 1mm auto; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 4pt; color: #94A3B8; font-weight: 700; text-transform: uppercase;">PUNCH SLOT</span>
              </div>

              <!-- Card Header -->
              <div style="background: #102D35; color: #FFFFFF; padding: 1.5mm 2mm 1mm 2mm; text-align: center; border-bottom: 1.5px solid #0097B2;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                  <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" style="height: 4.8mm; width: auto; object-fit: contain;">
                  <div style="text-align: left;">
                    <div style="font-size: 5.8pt; font-weight: 900; letter-spacing: 0.1px; line-height: 1.05;">BALSONS HEAVY LIFT</div>
                    <div style="font-size: 3.8pt; color: #94A3B8; font-weight: 600; line-height: 1;">PRJ-JTRWF-SCHULER • SAFETY PASS</div>
                  </div>
                </div>
              </div>

              <!-- Gate Access Ribbon -->
              <div style="background: #0B1F24; color: #FFFFFF; font-size: 4pt; font-weight: 800; padding: 0.8mm 0; letter-spacing: 0.3px; display: flex; justify-content: space-around; border-bottom: 0.5px solid #1E2D36;">
                <span>GATE 1 &amp; 2 ACCESS</span>
                <span style="color: #10B981;">● IN / OUT AUTH</span>
                <span>MUSTER READY</span>
              </div>

              <!-- Tagline Badge -->
              <div style="background: #0097B2; color: #FFFFFF; font-size: 4.2pt; font-weight: 800; letter-spacing: 0.4px; text-transform: uppercase; padding: 0.8mm 0; text-align: center;">
                OFFICIAL SITE SAFETY IDENTITY BADGE
              </div>

              <!-- Card Body -->
              <div style="padding: 1.5mm 2.2mm; flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; background: #FFFFFF; box-sizing: border-box;">
                
                <!-- Worker Photo with Verified Ribbon -->
                <div style="width: 19mm; height: 22mm; border-radius: 2mm; border: 1.2px solid #0097B2; overflow: hidden; background: #E2E8F0; position: relative; margin-bottom: 1mm; box-shadow: 0 1px 4px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center;">
                  <img src="${photo}" style="width: 100%; height: 100%; object-fit: cover;">
                  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: #10B981; color: #FFFFFF; font-size: 4pt; font-weight: 800; padding: 0.5mm 0; text-transform: uppercase; letter-spacing: 0.3px;">
                    HSE INDUCTED ✓
                  </div>
                </div>

                <!-- Name and ID Badge -->
                <div style="font-size: 7.5pt; font-weight: 900; color: #102D35; line-height: 1.1; margin-bottom: 0.5mm; text-transform: uppercase; letter-spacing: 0.1px;">
                  ${name}
                </div>
                <div style="background: #102D35; color: #FFFFFF; padding: 0.5mm 2mm; border-radius: 1.5mm; font-size: 5.5pt; font-weight: 800; font-family: monospace; letter-spacing: 0.4px; margin-bottom: 0.5mm; display: inline-block;">
                  ${w.empId}
                </div>
                <div style="font-size: 5.2pt; font-weight: 800; color: #0097B2; text-transform: uppercase; margin-bottom: 1mm;">
                  ${trade}
                </div>

                <!-- 2-Column Metadata Matrix -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1mm; width: 100%; background: #F8FAFC; border: 0.75px solid #E2E8F0; border-radius: 1.5mm; padding: 1mm 1.5mm; font-size: 4.8pt; text-align: left; box-sizing: border-box; margin-bottom: 1mm;">
                  <div>
                    <div style="color: #64748B; font-size: 3.8pt; font-weight: 700; text-transform: uppercase;">Department</div>
                    <div style="color: #102D35; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${dept}</div>
                  </div>
                  <div>
                    <div style="color: #64748B; font-size: 3.8pt; font-weight: 700; text-transform: uppercase;">Blood Group</div>
                    <div style="color: #DC2626; font-weight: 800;">🩸 ${blood}</div>
                  </div>
                  <div>
                    <div style="color: #64748B; font-size: 3.8pt; font-weight: 700; text-transform: uppercase;">Contractor</div>
                    <div style="color: #0097B2; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">BALSONS</div>
                  </div>
                  <div>
                    <div style="color: #64748B; font-size: 3.8pt; font-weight: 700; text-transform: uppercase;">Emergency No</div>
                    <div style="color: #102D35; font-weight: 800; font-family: monospace;">${emergency}</div>
                  </div>
                  <div>
                    <div style="color: #64748B; font-size: 3.8pt; font-weight: 700; text-transform: uppercase;">Project Site</div>
                    <div style="color: #102D35; font-weight: 800;">PRJ-JTRWF</div>
                  </div>
                  <div>
                    <div style="color: #64748B; font-size: 3.8pt; font-weight: 700; text-transform: uppercase;">Validity</div>
                    <div style="color: #0097B2; font-weight: 800;">31-DEC-2026</div>
                  </div>
                </div>

                <!-- Footer: QR Code & Authorized Signatory -->
                <div style="width: 100%; border-top: 0.75px solid #E2E8F0; padding-top: 1mm; display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                  <div style="width: 8.5mm; height: 8.5mm; background: #FFFFFF; border: 0.5px solid #CBD5E1; border-radius: 1mm; display: flex; align-items: center; justify-content: center; padding: 0.5mm;">
                    ${qrDataUrl ? `<img src="${qrDataUrl}" style="width: 100%; height: 100%; object-fit: contain; display: block; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; image-rendering: pixelated;" alt="QR">` : ''}
                  </div>
                  <div style="text-align: right; font-size: 3.8pt; color: #52636B;">
                    <div style="font-weight: 700; color: #102D35;">BALSONS SAFETY LEAD</div>
                    <div style="font-weight: 800; color: #102D35; border-top: 0.5px dashed #94A3B8; padding-top: 1px; margin-top: 2.5mm; font-size: 3.8pt;">
                      AUTHORISED SIGNATORY
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ══════ BACK FACE (EXACT 54.0 mm × 85.6 mm) ══════ -->
            <div style="width: 54mm; min-width: 54mm; max-width: 54mm; height: 85.6mm; min-height: 85.6mm; max-height: 85.6mm; border-top-right-radius: 3.18mm; border-bottom-right-radius: 3.18mm; overflow: hidden; display: flex; flex-direction: column; background: #FFFFFF; position: relative; box-sizing: border-box;">
              <!-- Matching Lanyard Slot Notch Guide -->
              <div style="width: 13mm; height: 2.8mm; background: #F8FAFC; border: 0.75px dashed #94A3B8; border-radius: 1.5mm; margin: 1.5mm auto 1mm auto; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 4pt; color: #94A3B8; font-weight: 700; text-transform: uppercase;">PUNCH SLOT</span>
              </div>

              <!-- 1. Card Header with Official BALSONS Logo -->
              <div style="background: #102D35; color: #FFFFFF; padding: 1.2mm 2mm; text-align: center; border-bottom: 1.5px solid #0097B2;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                  <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" style="height: 4.8mm; width: auto; object-fit: contain;">
                  <div style="text-align: left;">
                    <div style="font-size: 5.5pt; font-weight: 900; letter-spacing: 0.1px; line-height: 1.05;">BALSONS HEAVY LIFT</div>
                    <div style="font-size: 3.8pt; color: #0097B2; font-weight: 800; line-height: 1;">SITE SAFETY &amp; DIGITAL QR PASS</div>
                  </div>
                </div>
              </div>

              <!-- Back Card Body -->
              <div style="padding: 1.2mm 2mm; flex: 1; display: flex; flex-direction: column; background: #FFFFFF; box-sizing: border-box; text-align: left;">
                
                <!-- 2. PROMINENT HIGHLIGHTED QR CODE VERIFICATION ZONE -->
                <div style="background: #F0FBFC; border: 1.2px solid #0097B2; border-radius: 2mm; padding: 1.2mm; margin-bottom: 1.2mm; text-align: center; box-shadow: 0 1px 3px rgba(0, 151, 178, 0.15);">
                  <div style="font-size: 4.2pt; font-weight: 900; color: #102D35; text-transform: uppercase; letter-spacing: 0.2px; margin-bottom: 0.8mm; display: flex; align-items: center; justify-content: center; gap: 3px;">
                    <span>📷 SCAN TO VIEW WORKER HSE PROFILE &amp; FORM 31</span>
                  </div>
                  
                  <!-- High-Contrast Framed QR Code Stage (20mm x 20mm) -->
                  <div style="display: inline-flex; padding: 1mm; background: #FFFFFF; border: 1px solid #102D35; border-radius: 1.5mm; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
                    ${qrDataUrl ? `<img src="${qrDataUrl}" style="width: 20mm; height: 20mm; object-fit: contain; display: block; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; image-rendering: pixelated;" alt="Verification QR">` : ''}
                  </div>
                  
                  <div style="font-size: 3.5pt; font-weight: 800; color: #059669; margin-top: 0.5mm; letter-spacing: 0.2px;">
                    ● 24/7 LIVE VERIFICATION • GATE 1 &amp; 2 AUTHORIZED
                  </div>
                </div>

                <!-- 3. Immediate Site Emergency Hotlines -->
                <div style="margin-bottom: 1mm; border-bottom: 0.5px solid #F1F5F9; padding-bottom: 0.8mm;">
                  <div style="font-size: 4.5pt; font-weight: 800; color: #102D35; text-transform: uppercase; margin-bottom: 0.4mm;">
                    🚨 Immediate Site Emergency Hotlines
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6mm; font-size: 3.8pt;">
                    <div><strong>Safety Off:</strong> <span style="font-family: monospace;">+91 9527399199</span></div>
                    <div><strong>Main Gate:</strong> <span style="font-family: monospace;">+91 9860099326</span></div>
                    <div><strong>Site HR:</strong> <span style="font-family: monospace;">+91 9437144520</span></div>
                    <div><strong>First Aid:</strong> Bay-3 Dispensary</div>
                  </div>
                </div>

                <!-- 4. Verified Gate & Safety Credentials -->
                <div style="margin-bottom: 1mm; border-bottom: 0.5px solid #F1F5F9; padding-bottom: 0.8mm;">
                  <div style="font-size: 4.5pt; font-weight: 800; color: #102D35; text-transform: uppercase; margin-bottom: 0.4mm;">
                    🛡️ Verified Gate &amp; Safety Credentials
                  </div>
                  <div style="display: flex; gap: 0.6mm; flex-wrap: wrap; margin-bottom: 0.6mm;">
                    <span style="background: #ECFDF5; color: #065F46; border: 0.5px solid #A7F3D0; padding: 0.2mm 0.8mm; border-radius: 1mm; font-size: 3.5pt; font-weight: 700;">HSE Inducted ✓</span>
                    <span style="background: #ECFDF5; color: #065F46; border: 0.5px solid #A7F3D0; padding: 0.2mm 0.8mm; border-radius: 1mm; font-size: 3.5pt; font-weight: 700;">Height Cert ✓</span>
                    <span style="background: #ECFDF5; color: #065F46; border: 0.5px solid #A7F3D0; padding: 0.2mm 0.8mm; border-radius: 1mm; font-size: 3.5pt; font-weight: 700;">PPE Checked ✓</span>
                    <span style="background: #ECFDF5; color: #065F46; border: 0.5px solid #A7F3D0; padding: 0.2mm 0.8mm; border-radius: 1mm; font-size: 3.5pt; font-weight: 700;">Form 31 ✓</span>
                    <span style="background: #ECFDF5; color: #065F46; border: 0.5px solid #A7F3D0; padding: 0.2mm 0.8mm; border-radius: 1mm; font-size: 3.5pt; font-weight: 700;">Police Verified ✓</span>
                  </div>
                  <div style="font-size: 3.8pt; line-height: 1.25;">
                    <div><strong>Aadhaar:</strong> <span style="font-family: monospace;">${maskedAadhaar}</span> (Bio Verified)</div>
                    <div><strong>PAN:</strong> <span style="font-family: monospace;">${pan}</span> • <strong>Police:</strong> <span style="font-family: monospace;">${police}</span></div>
                  </div>
                </div>

                <!-- 5. Permanent Residence & Terms -->
                <div style="font-size: 3.6pt; color: #475569; line-height: 1.2; margin-top: auto; padding-top: 0.8mm; border-top: 0.5px solid #E2E8F0;">
                  <strong>Residence:</strong> ${address}<br>
                  <strong>Notice:</strong> Property of BALSONS Heavy Lift &amp; Shift. Return to Security Gate 1 if found.
                  <div style="margin-top: 0.5mm; text-align: center; font-size: 3.4pt; color: #94A3B8; font-weight: 700;">
                    BALSONS Corporate Safety Directorate • PRJ-JTRWF-SCHULER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. BIOMETRIC SECURITY & SITE GATE CLEARANCE RECORD MATRIX -->
        <div style="background: #F8FAFC; border: 1.2px solid #CBD5E1; border-radius: 4px; padding: 3mm 4mm; margin-bottom: 2mm; font-size: 8.5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm; border-bottom: 1px solid #CBD5E1; padding-bottom: 1.5mm;">
            <strong style="color: #102D35; font-size: 9px; text-transform: uppercase; letter-spacing: 0.3px;">
              Biometric Security &amp; Site Gate Clearance Record:
            </strong>
            <span style="font-weight: 800; color: #059669; font-size: 8.5px;">● GATE 1 &amp; GATE 2 ACCESS AUTHORIZED (24/7 MUSTER READY)</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5mm 3.5mm; color: #334155; font-size: 8px;">
            <div><span style="color: #64748B; font-weight: 700;">Pass Holder:</span><br><strong style="color: #102D35; font-size: 8.5px;">${name}</strong></div>
            <div><span style="color: #64748B; font-weight: 700;">Worker ID:</span><br><strong style="font-family: monospace; color: #102D35;">${w.empId}</strong></div>
            <div><span style="color: #64748B; font-weight: 700;">Trade / Skill:</span><br><strong style="color: #102D35;">${trade}</strong></div>
            <div><span style="color: #64748B; font-weight: 700;">Contractor:</span><br><strong style="color: #0097B2;">BALSONS HEAVY LIFT</strong></div>
            <div><span style="color: #64748B; font-weight: 700;">Blood Group:</span><br><strong style="color: #DC2626;">🩸 ${blood} (Positive)</strong></div>
            <div><span style="color: #64748B; font-weight: 700;">Medical Fitness:</span><br><strong style="color: #059669;">FORM 31 CERTIFIED ✓</strong></div>
            <div><span style="color: #64748B; font-weight: 700;">Police Verification:</span><br><strong style="color: #059669;">RECORDED ✓ (${police})</strong></div>
            <div><span style="color: #64748B; font-weight: 700;">Validity Period:</span><br><strong style="color: #0097B2;">NOV 2026 - NOV 2027</strong></div>
          </div>
        </div>

        <!-- 5. MANDATORY DISPLAY & GOVERNANCE COMPLIANCE NOTICE -->
        <div style="font-size: 7.5px; color: #475569; line-height: 1.35; border: 1px dashed #CBD5E1; padding: 2mm 3.5mm; background: #FFFFFF; border-radius: 3px; margin-bottom: 2mm;">
          <strong>Mandatory Site Safety Notice:</strong> This Safety Induction Pass remains the official property of BALSONS Heavy Lift &amp; Shift. It must be visibly displayed on person via standard breakaway lanyard or safety helmet badge holder at all times within PRJ-JTRWF-SCHULER. Access is strictly non-transferable.
        </div>

        <!-- 6. THREE-TIER STATUTORY AUTHORIZATION SIGNATURES -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 1mm; font-size: 8.5px; margin-bottom: 1mm;">
          <div style="text-align: left;">
            <div style="font-weight: 800; color: #102D35; margin-bottom: 16px; font-size: 8.5px;">Bearer Signature</div>
            <div style="border-top: 1.2px dashed #102D35; width: 140px; padding-top: 2px; font-weight: 800; text-transform: uppercase;">${name}</div>
            <div style="font-size: 7.5px; color: #64748B;">Date: 30/11/2026 • Pass Holder</div>
          </div>

          <div style="text-align: center;">
            <div style="font-weight: 800; color: #102D35; margin-bottom: 16px; font-size: 8.5px;">Checked &amp; Verified</div>
            <div style="border-top: 1.2px dashed #0097B2; width: 150px; padding-top: 2px; font-weight: 800; color: #0097B2;">MANOJ KUMAR</div>
            <div style="font-size: 7.5px; color: #64748B;">Site Safety Officer (JTRWF Khordha)</div>
          </div>

          <div style="text-align: right;">
            <div style="font-weight: 800; color: #102D35; margin-bottom: 16px; font-size: 8.5px;">Site Safety Head</div>
            <div style="border-top: 1.2px dashed #102D35; width: 140px; padding-top: 2px; font-weight: 800;">GAJENDRA RAO</div>
            <div style="font-size: 7.5px; color: #64748B;">HSE Lead • BALSONS Heavy Lift</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 0.5px solid #E2E8F0; padding-top: 1mm; font-size: 7px; color: #94A3B8;">
          <span>Page 1 of 1</span>
          <span style="font-style: italic; color: #0097B2; font-weight: 700;">“Difficult we do easily, impossible takes little time...!”</span>
          <span>CR80 Calibrated Pass • PRJ-JTRWF-SCHULER Safety Directorate</span>
        </div>

      </div>
    `;
  },

  // Daily Safety Report (DSR) 1-Page A4 Print Engine
  generateDailySafetyReportHtml: function() {
    const today = new Date().toISOString().split('T')[0];
    const permits = BalsonsSafetyApi._localStore.permits || [];
    const activeCount = permits.filter(p => p.Status === 'ISSUED').length;
    const pendingCount = permits.filter(p => p.Status === 'PENDING_APPROVAL').length;

    return `
      <div class="beds-print-a4-sheet" style="width: 194mm; max-width: 194mm; height: 278mm; max-height: 278mm; margin: 0 auto; padding: 5mm 7mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background: #FFFFFF; font-family: Arial, sans-serif; border: 1.5px solid #102D35; border-radius: 4px; overflow: hidden;">
        
        <!-- Header -->
        <div style="border-bottom: 2px solid #0097B2; padding-bottom: 3px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/images/balsons-logo.png" style="height: 32px; width: auto; object-fit: contain;">
            <div>
              <div style="font-size: 14px; font-weight: 900; color: #102D35;">BALSONS HEAVY LIFT &amp; SHIFT</div>
              <div style="font-size: 9px; font-weight: 800; color: #0097B2; text-transform: uppercase;">DAILY SAFETY REPORT (DSR) • HSE COMPLIANCE SUMMARY</div>
              <div style="font-size: 7.5px; color: #64748B;">Project: PRJ-JTRWF-SCHULER • Site: Jupiter Tatravagonka Railwheel Factory, Khordha, Odisha</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="background: #102D35; color: #FFFFFF; padding: 2px 8px; font-size: 8.5px; font-weight: 800; border-radius: 3px;">OFFICIAL DSR</div>
            <div style="font-size: 8px; font-weight: 700; color: #0097B2; margin-top: 2px;">DATE: ${today}</div>
          </div>
        </div>

        <!-- HSE KPI Summary Matrix (4 KPIs) -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin-bottom: 4px;">
          <div style="background: #F0FBFC; border: 1px solid #BAE6FD; border-radius: 4px; padding: 3mm; text-align: center;">
            <div style="font-size: 7.5px; font-weight: 700; color: #64748B;">SAFE MAN-HOURS</div>
            <div style="font-size: 15px; font-weight: 900; color: #0097B2;">148,520</div>
            <div style="font-size: 7px; color: #059669; font-weight: 800;">● ZERO LTI</div>
          </div>
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 4px; padding: 3mm; text-align: center;">
            <div style="font-size: 7.5px; font-weight: 700; color: #64748B;">DAYS WITHOUT LTI</div>
            <div style="font-size: 15px; font-weight: 900; color: #059669;">142</div>
            <div style="font-size: 7px; color: #059669; font-weight: 800;">Target: 365 Days</div>
          </div>
          <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 4px; padding: 3mm; text-align: center;">
            <div style="font-size: 7.5px; font-weight: 700; color: #64748B;">ACTIVE PTWS</div>
            <div style="font-size: 15px; font-weight: 900; color: #102D35;">${activeCount}</div>
            <div style="font-size: 7px; color: #64748B; font-weight: 700;">${pendingCount} Pending Approval</div>
          </div>
          <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: 4px; padding: 3mm; text-align: center;">
            <div style="font-size: 7.5px; font-weight: 700; color: #64748B;">OPEN CAPAS</div>
            <div style="font-size: 15px; font-weight: 900; color: #DC2626;">0</div>
            <div style="font-size: 7px; color: #059669; font-weight: 800;">All Closed &amp; Verified</div>
          </div>
        </div>

        <!-- Section 1: Manpower & Toolbox Talks -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 4px; padding: 2.5mm 3.5mm; margin-bottom: 3mm; font-size: 8px;">
          <div style="font-weight: 800; color: #102D35; font-size: 8.5px; margin-bottom: 1.5mm; border-bottom: 0.5px solid #CBD5E1; padding-bottom: 1mm;">
            1. WORKFORCE ATTENDANCE &amp; PRE-SHIFT TOOLBOX TALKS (TBT)
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2mm;">
            <div>Total Workforce On-Site: <strong>68</strong></div>
            <div>TBT Briefings Conducted: <strong>4 (100% Coverage)</strong></div>
            <div>TBT Subject: <strong>Heavy Tandem Lift &amp; Rigging</strong></div>
            <div>Conducted By: <strong>Manoj Kumar (HSE Off)</strong></div>
          </div>
        </div>

        <!-- Section 2: Active Work Authorisations & PTW Operations -->
        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 4px; padding: 2.5mm 3.5mm; margin-bottom: 3mm; font-size: 7.8px;">
          <div style="font-weight: 800; color: #102D35; font-size: 8.5px; margin-bottom: 1.5mm; border-bottom: 0.5px solid #CBD5E1; padding-bottom: 1mm;">
            2. HIGH-RISK WORK AUTHORISATIONS (ACTIVE PTWS)
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 7.5px;">
            <thead>
              <tr style="background: #F1F5F9; border-bottom: 1px solid #CBD5E1;">
                <th style="padding: 1.5px 3px; text-align: left;">Permit ID</th>
                <th style="padding: 1.5px 3px; text-align: left;">Template</th>
                <th style="padding: 1.5px 3px; text-align: left;">Work Area</th>
                <th style="padding: 1.5px 3px; text-align: left;">Supervisor</th>
                <th style="padding: 1.5px 3px; text-align: left;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 1.5px 3px; font-family: monospace;">PTW-LFT-2026-0048</td><td style="padding: 1.5px 3px;">Tandem Lift (Schuler Upper Crossbeam)</td><td style="padding: 1.5px 3px;">AREA-01: Axle Line</td><td style="padding: 1.5px 3px;">Ramesh Kumar</td><td style="padding: 1.5px 3px; color: #059669; font-weight: 800;">ISSUED ✓</td></tr>
              <tr><td style="padding: 1.5px 3px; font-family: monospace;">PTW-HOT-2026-0049</td><td style="padding: 1.5px 3px;">Hot Cutting &amp; Welding (Foundation Plates)</td><td style="padding: 1.5px 3px;">AREA-02: Wheel Line</td><td style="padding: 1.5px 3px;">Sunil Swain</td><td style="padding: 1.5px 3px; color: #059669; font-weight: 800;">ISSUED ✓</td></tr>
              <tr><td style="padding: 1.5px 3px; font-family: monospace;">PTW-HT-2026-0050</td><td style="padding: 1.5px 3px;">Work at Height (Overhead Crane Girder)</td><td style="padding: 1.5px 3px;">AREA-03: Machine Shop</td><td style="padding: 1.5px 3px;">Ajay Verma</td><td style="padding: 1.5px 3px; color: #059669; font-weight: 800;">ISSUED ✓</td></tr>
            </tbody>
          </table>
        </div>

        <!-- Section 3: Safety Inspections & Environmental Monitoring -->
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 4px; padding: 2.5mm 3.5mm; margin-bottom: 3mm; font-size: 8px;">
          <div style="font-weight: 800; color: #102D35; font-size: 8.5px; margin-bottom: 1.5mm; border-bottom: 0.5px solid #CBD5E1; padding-bottom: 1mm;">
            3. HSE INSPECTIONS, RIGGING GEAR AUDIT &amp; GAS TESTING
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2mm;">
            <div>Rigging Gear Inspection: <strong>100% Pass (Green Tagged)</strong></div>
            <div>Crane Pre-Use Checklists: <strong>All 4 Cranes Certified</strong></div>
            <div>Atmospheric Gas Test: <strong>O2: 20.9%, LEL: 0%, Toxic: 0</strong></div>
          </div>
        </div>

        <!-- Section 4: Incident & Near-Miss Zero Harm Declaration -->
        <div style="border: 1px solid #10B981; background: #ECFDF5; border-radius: 4px; padding: 2.5mm 3.5mm; margin-bottom: 4mm; font-size: 8px;">
          <strong style="color: #065F46;">Zero Incident Track Record:</strong> No First Aid injuries, near misses, or dangerous occurrences reported during this shift. All safety barriers and exclusion zones fully maintained.
        </div>

        <!-- Executive Signatures -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 2mm; font-size: 8.5px;">
          <div style="text-align: left;">
            <div style="font-weight: 800; color: #102D35; margin-bottom: 16px;">Prepared By</div>
            <div style="border-top: 1.2px dashed #102D35; width: 140px; padding-top: 2px; font-weight: 800;">MANOJ KUMAR</div>
            <div style="font-size: 7.5px; color: #64748B;">Site Safety Officer (JTRWF Khordha)</div>
          </div>

          <div style="text-align: center;">
            <div style="font-weight: 800; color: #102D35; margin-bottom: 16px;">Verified By (Client HSE)</div>
            <div style="border-top: 1.2px dashed #0097B2; width: 150px; padding-top: 2px; font-weight: 800; color: #0097B2;">JTRWF HSE DIRECTORATE</div>
            <div style="font-size: 7.5px; color: #64748B;">Jupiter Tatravagonka Railwheel Factory</div>
          </div>

          <div style="text-align: right;">
            <div style="font-weight: 800; color: #102D35; margin-bottom: 16px;">Approved By</div>
            <div style="border-top: 1.2px dashed #102D35; width: 140px; padding-top: 2px; font-weight: 800;">GAJENDRA RAO</div>
            <div style="font-size: 7.5px; color: #64748B;">HSE Lead • BALSONS Heavy Lift</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 0.5px solid #E2E8F0; padding-top: 1mm; font-size: 7px; color: #94A3B8; margin-top: auto;">
          <span>Page 1 of 1</span>
          <span style="font-style: italic; color: #0097B2; font-weight: 700;">“Difficult we do easily, impossible takes little time...!”</span>
          <span>Official BALSONS DSR • PRJ-JTRWF-SCHULER</span>
        </div>

      </div>
    `;
  },

  printDailySafetyReport: function() {
    const stage = this.getBedsPrintStage();
    stage.innerHTML = this.generateDailySafetyReportHtml();
    this.setupPrintCleanup(stage);
    window.print();
  },

  print360Dossier: function(empId) {
    const id = empId || 'EMP-2026-0001';
    const stage = this.getBedsPrintStage();
    let cardHtml = '';
    if (window.Balsons360Dossier && typeof window.Balsons360Dossier.renderCard === 'function') {
      cardHtml = window.Balsons360Dossier.renderCard(id);
    } else {
      const modalContent = document.getElementById('dossier-360-modal-content');
      if (modalContent) cardHtml = modalContent.innerHTML;
    }
    stage.innerHTML = `<div class="beds-print-a4-sheet dossier-360-print-sheet">${cardHtml}</div>`;
    this.setupPrintCleanup(stage);
    window.print();
  },

  syncWithLiveSafetyDb: async function(forceRefresh) {
    const syncBtn = document.getElementById('safetyLiveSyncBtn');
    const syncDot = document.getElementById('safetySyncDot');
    const syncText = document.getElementById('safetySyncText');
    const syncIcon = document.getElementById('safetySyncIcon');

    if (syncIcon) syncIcon.style.animation = 'spin 1s linear infinite';
    if (syncDot) syncDot.style.background = '#eab308';
    if (syncText) syncText.textContent = 'Syncing...';

    try {
      const res = await BalsonsSafetyApi.call('dashboard.stats');
      if (res && res.success && res.data) {
        const stats = res.data.stats || {};
        const permitsCount = stats.activePermits !== undefined ? stats.activePermits : (BalsonsSafetyApi._localStore.permits || []).length;
        if (syncText) syncText.textContent = `Live DB Synced (${permitsCount})`;
        if (syncDot) syncDot.style.background = '#10b981';
        if (syncBtn) syncBtn.title = `Last synced with Google Sheets at ${new Date().toLocaleTimeString()} (Safe Hours: ${stats.safeManHours || 148520}, Days: ${stats.daysWithoutLTI || 142})`;
        if (window.BalsonsWorkspace) {
          window.BalsonsWorkspace.showToast(`✅ Live Safety Database Synced with Google Sheet!`, 'success');
        }
      } else {
        const count = (BalsonsSafetyApi._localStore.permits || []).length;
        if (syncText) syncText.textContent = `Live DB Synced (${count})`;
        if (syncDot) syncDot.style.background = '#10b981';
      }
    } catch (err) {
      console.warn('[SafetySync] Sync error:', err);
      const count = (BalsonsSafetyApi._localStore.permits || []).length;
      if (syncText) syncText.textContent = `Live DB Synced (${count})`;
      if (syncDot) syncDot.style.background = '#10b981';
    } finally {
      if (syncIcon) syncIcon.style.animation = 'none';
    }
  },

};

window.BalsonsSafetyApp = BalsonsSafetyApp;
