/**
 * BALSONS STORE MANAGER - CORE APPLICATION CONTROLLER
 * Architecture: BALSONS-SAM-2026 & BEDS V1.0
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 * Operating Scope: Single-Project Master Store & Heavy Rigging Inventory (264 Tools)
 */

document.addEventListener('DOMContentLoaded', function() {
  BalsonsStoreApp.init();
});

const BalsonsStoreApp = {
  tools: [],
  transactions: [],
  quarantine: [],
  receipts: [],
  procurement: [],
  vendors: [],

  currentSectionFilter: 'ALL',
  currentStatusFilter: 'ALL',
  searchQuery: '',

  escapeHtml: function(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  enqueueMutation: function(action, entityId, payload) {
    try {
      const mutation = {
        id: 'mut_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        domain: 'store',
        action: action,
        entityId: entityId,
        payload: payload,
        timestamp: new Date().toISOString()
      };
      let queue = [];
      try {
        queue = JSON.parse(localStorage.getItem('beds_pending_mutations_queue') || '[]');
      } catch(e) {}
      queue.push(mutation);
      localStorage.setItem('beds_pending_mutations_queue', JSON.stringify(queue));
      console.log('[Store Mutation Enqueued]:', action, entityId);
    } catch (err) {
      console.warn('[Store Mutation Queue Error]:', err);
    }
    if (window.BalsonsWorkspace && typeof window.BalsonsWorkspace.triggerDualSync === 'function') {
      window.BalsonsWorkspace.triggerDualSync(true);
    }
  },

  activatePrintStage: function(htmlContent) {
    let stage = document.getElementById('beds-store-print-stage');
    if (!stage) {
      stage = document.createElement('div');
      stage.id = 'beds-store-print-stage';
      document.body.appendChild(stage);
    }
    stage.innerHTML = htmlContent;
    document.body.classList.add('beds-printing-mode');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('beds-printing-mode');
    }, 1000);
  },

  init: function() {
    this.initTheme();
    this.initAuth();
    this.initLanguage();
    this.loadData();
    this.initNavigation();
    this.bindEvents();
    this.renderAll();
    console.log('✅ BALSONS Store Manager Fully Initialized (264 Tools, Form 11, Loans, GRN, Red-Tag Quarantine, PRs, Vendors)');
  },

  initTheme: function() {
    const savedTheme = localStorage.getItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeBtn(savedTheme);

    const btn = document.getElementById('btn-toggle-theme');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.THEME, next);
        this.updateThemeBtn(next);
      });
    }
  },

  updateThemeBtn: function(theme) {
    const btn = document.getElementById('btn-toggle-theme');
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  },

  initAuth: function() {
    if (window.BalsonsSAMAuth) {
      BalsonsSAMAuth.renderGlobalSuperAdminBar('store', (newSession) => {
        window.location.reload();
      });
      const samSession = BalsonsSAMAuth.getSession();
      if (samSession) {
        const userEl = document.getElementById('header-user-display');
        const roleEl = document.getElementById('header-role-badge');
        if (userEl) userEl.textContent = samSession.fullName;
        if (roleEl) {
          roleEl.textContent = samSession.role === 'SUPER_ADMIN' ? 'Owner / Super Admin' : samSession.roleInfo.title;
          roleEl.className = 'role-badge role-Owner';
        }
        const switchBtn = document.getElementById('btn-switch-user');
        if (switchBtn) {
          switchBtn.addEventListener('click', () => {
            if (samSession.role === 'SUPER_ADMIN') {
              BalsonsSAMAuth.openGovernanceConsole('store');
            } else {
              BalsonsSAMAuth.openAccessMatrixModal();
            }
          });
        }
        return;
      }
    }

    const user = BalsonsStoreAuth.getUser();
    const userEl = document.getElementById('header-user-display');
    const roleEl = document.getElementById('header-role-badge');
    if (userEl) userEl.textContent = user.fullName;
    if (roleEl) {
      roleEl.textContent = user.role;
      roleEl.className = `role-badge role-${user.role}`;
    }

    const switchBtn = document.getElementById('btn-switch-user');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        const modal = document.getElementById('modal-login');
        if (modal) {
          modal.classList.add('active');
        } else {
          const roles = ['StoreManager', 'Owner', 'PurchaseManager', 'MaintenanceEngineer', 'Viewer'];
          const currentIdx = roles.indexOf(user.role);
          const nextRole = roles[(currentIdx + 1) % roles.length];
          BalsonsStoreAuth.switchRole(nextRole);
          window.location.reload();
        }
      });
    }
  },

  initLanguage: function() {
    BalsonsStoreI18n.init();
    document.querySelectorAll('.lang-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.lang-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const lang = pill.getAttribute('data-lang');
        BalsonsStoreI18n.setLanguage(lang);
      });
    });
  },

  loadData: function() {
    function safeParse(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) {
        console.warn(`[StoreApp] Safe parse fallback for ${key}:`, e);
        return fallback;
      }
    }

    // 1. Tools (Locked 264 Master items)
    this.tools = safeParse(BALSONS_STORE_CONFIG.STORAGE_KEYS.TOOLS, [...BALSONS_STORE_DATA.tools]);

    // 2. Transactions
    this.transactions = safeParse(BALSONS_STORE_CONFIG.STORAGE_KEYS.TRANSACTIONS, [...BALSONS_STORE_DATA.transactions]);

    // 3. Receipts
    this.receipts = safeParse(BALSONS_STORE_CONFIG.STORAGE_KEYS.RECEIPTS, [...BALSONS_STORE_DATA.receipts]);

    // 4. Quarantine
    this.quarantine = safeParse(BALSONS_STORE_CONFIG.STORAGE_KEYS.QUARANTINE, [...BALSONS_STORE_DATA.quarantine]);

    // 5. Procurement
    this.procurement = safeParse(BALSONS_STORE_CONFIG.STORAGE_KEYS.PROCUREMENT, [...BALSONS_STORE_DATA.procurement]);

    // 6. Vendors
    this.vendors = safeParse(BALSONS_STORE_CONFIG.STORAGE_KEYS.VENDORS, [...BALSONS_STORE_DATA.vendors]);
  },

  saveTools: function() {
    localStorage.setItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.TOOLS, JSON.stringify(this.tools));
  },

  saveTransactions: function() {
    localStorage.setItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(this.transactions));
  },

  saveQuarantine: function() {
    localStorage.setItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.QUARANTINE, JSON.stringify(this.quarantine));
  },

  saveReceipts: function() {
    localStorage.setItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.RECEIPTS, JSON.stringify(this.receipts));
  },

  saveProcurement: function() {
    localStorage.setItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.PROCUREMENT, JSON.stringify(this.procurement));
  },

  saveVendors: function() {
    localStorage.setItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.VENDORS, JSON.stringify(this.vendors));
  },

  refreshData: async function() {
    this.loadData();
    this.renderAll();
    if (window.BalsonsStoreApi && typeof BalsonsStoreApi.syncWithLiveDb === 'function') { setTimeout(() => BalsonsStoreApi.syncWithLiveDb(), 500); }
    console.log('🔄 BalsonsStoreApp data refreshed from dedicated store registers');
  },

  renderAll: function() {
    this.renderRadarDashboard();
    this.renderToolMasterTable();
    this.renderForm11Table();
    this.renderTransactionsTable();
    this.renderReceiptsTable();
    this.renderQuarantineTable();
    this.renderProcurementTable();
    this.renderVendorsTable();
    this.renderRgpPrintableSheet();
    this.renderQrTagStudio('LF');
  },

  // -------------------------------------------------------------
  // NAVIGATION ROUTING
  // -------------------------------------------------------------
  initNavigation: function() {
    document.querySelectorAll('.beds-nav-tab[data-target]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = tab.getAttribute('data-target');
        this.switchView(target);
      });
    });

    document.querySelectorAll('.beds-dropdown-item[data-target]').forEach(item => {
      item.addEventListener('click', (e) => {
        const target = item.getAttribute('data-target');
        this.switchView(target);
        document.querySelectorAll('.beds-nav-dropdown').forEach(dd => dd.classList.remove('open'));
      });
    });

    // Dropdown Toggles
    document.querySelectorAll('.beds-dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = btn.closest('.beds-nav-dropdown');
        const wasOpen = parent.classList.contains('open');
        document.querySelectorAll('.beds-nav-dropdown').forEach(dd => dd.classList.remove('open'));
        if (!wasOpen) parent.classList.add('open');
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.beds-nav-dropdown').forEach(dd => dd.classList.remove('open'));
    });
  },

  switchView: function(viewId) {
    document.querySelectorAll('.beds-nav-tab, .beds-dropdown-item').forEach(item => {
      const target = item.getAttribute('data-target');
      if (target === viewId) {
        item.classList.add('active');
        const parentToggle = item.closest('.beds-nav-dropdown')?.querySelector('.beds-dropdown-toggle');
        if (parentToggle) parentToggle.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    document.querySelectorAll('.beds-view-panel').forEach(v => {
      if (v.id === viewId) v.classList.add('active');
      else v.classList.remove('active');
    });

    if (viewId === 'view-dossier-360') {
      this.render360DossierPage();
    }

    if (viewId === 'view-documents' && window.BalsonsDocs) {
      window.BalsonsDocs.renderDocumentsTab('tab-documents');
    }

    BalsonsStoreI18n.applyTranslations();
  },

  bindEvents: function() {
    // Escape key closes open modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.beds-modal-overlay.active').forEach(m => m.classList.remove('active'));
      }
    });

    // Close on overlay backdrop click
    document.querySelectorAll('.beds-modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    });
  },

  // -------------------------------------------------------------
  // MODULE 01: COMMAND RADAR & KPIS
  // -------------------------------------------------------------
  renderRadarDashboard: function() {
    const total = this.tools.length;
    const available = this.tools.filter(t => t.status === 'AVAILABLE').length;
    const issued = this.tools.filter(t => t.status === 'ISSUED').length;
    const quarantined = this.tools.filter(t => t.status === 'QUARANTINED').length;
    const underRepair = this.tools.filter(t => t.status === 'UNDER_REPAIR').length;

    // Statutory Form 11 due in 30 days
    const now = new Date();
    const in30Days = new Date(Date.now() + 30 * 86400000);
    const form11Due = this.tools.filter(t => {
      if (!t.isLifting || !t.nextInspection) return false;
      const d = new Date(t.nextInspection);
      return d <= in30Days;
    }).length;

    const elTotal = document.getElementById('kpi-total-tools'); if (elTotal) elTotal.textContent = total;
    const elAvail = document.getElementById('kpi-avail-tools'); if (elAvail) elAvail.textContent = available;
    const elIssued = document.getElementById('kpi-issued-tools'); if (elIssued) elIssued.textContent = issued;
    const elQuar = document.getElementById('kpi-quar-tools'); if (elQuar) elQuar.textContent = quarantined;
    const elForm11 = document.getElementById('kpi-form11-due'); if (elForm11) elForm11.textContent = form11Due;
    const elRepair = document.getElementById('kpi-repair-tools'); if (elRepair) elRepair.textContent = underRepair;
  },

  // -------------------------------------------------------------
  // MODULE 02: 264 TOOL INVENTORY MASTER TABLE
  // -------------------------------------------------------------
  renderToolMasterTable: function(filterSec = this.currentSectionFilter, query = this.searchQuery, filterStatus = this.currentStatusFilter) {
    const tbody = document.getElementById('tools-table-body');
    if (!tbody) return;

    this.currentSectionFilter = filterSec;
    this.searchQuery = query;
    this.currentStatusFilter = filterStatus;

    let filtered = this.tools;
    if (filterSec !== 'ALL') {
      filtered = filtered.filter(t => t.section === filterSec);
    }
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(t => 
        t.id.toLowerCase().includes(q) || 
        t.desc.toLowerCase().includes(q) || 
        t.make.toLowerCase().includes(q) ||
        (t.capacity && t.capacity.toLowerCase().includes(q))
      );
    }

    const countEl = document.getElementById('tool-count-badge');
    if (countEl) countEl.textContent = `Showing ${filtered.length} of ${this.tools.length} Tools`;

    tbody.innerHTML = filtered.map(t => {
      let statusClass = 'status-success';
      if (t.status === 'ISSUED') statusClass = 'status-info';
      else if (t.status === 'QUARANTINED') statusClass = 'status-critical';
      else if (t.status === 'UNDER_REPAIR') statusClass = 'status-warning';
      else if (t.status === 'RETIRED') statusClass = 'status-neutral';

      return `
        <tr>
          <td>
            <a href="javascript:void(0)" onclick="BalsonsStoreApp.openToolDetailModal('${this.escapeHtml(t.id)}')" style="font-family: monospace; font-weight: 800; color: var(--beds-teal-primary); text-decoration: none;" title="Click for complete specification dossier">
              ${this.escapeHtml(t.id)} 🔍
            </a>
          </td>
          <td>
            <strong style="color: var(--beds-charcoal-heading);">${this.escapeHtml(t.desc)}</strong><br>
            <small style="color: var(--beds-text-muted);">${this.escapeHtml(t.make)} · ${this.escapeHtml(t.model)}</small>
          </td>
          <td><span class="meta-tag">${this.escapeHtml(t.section)}</span></td>
          <td><strong>${this.escapeHtml(t.capacity || t.spec)}</strong></td>
          <td>${this.escapeHtml(t.binLocation || 'STORE-01')}</td>
          <td><span class="status-pill ${statusClass}">● ${this.escapeHtml(t.status)}</span></td>
          <td>
            <small>${this.escapeHtml(t.issuedTo || 'In Store Bins')}</small>
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <button class="beds-btn beds-btn-sm beds-btn-secondary" style="background: rgba(0, 151, 178, 0.1); color: #0097B2; border-color: #0097B2; font-weight: 800;" onclick="Balsons360Dossier.openToolModal('${this.escapeHtml(t.id)}')" title="360° Equipment Dossier">📄 360°</button>
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsStoreApp.openToolDetailModal('${this.escapeHtml(t.id)}')" title="View Specs">Specs</button>
            ${t.status === 'AVAILABLE' ? `
              <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsStoreApp.openIssueModal('${this.escapeHtml(t.id)}')">Issue →</button>
            ` : (t.status === 'ISSUED' ? `
              <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsStoreApp.openReturnModal('${this.escapeHtml(t.id)}')">Return ↵</button>
            ` : `
              <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsStoreApp.openQuarantineModal('${this.escapeHtml(t.id)}')">Red Tag</button>
            `)}
          </td>
        </tr>
      `;
    }).join('');
  },

  filterToolsByCategory: function(secCode, btn) {
    this.switchView('view-inventory');
    this.currentStatusFilter = 'ALL';
    document.querySelectorAll('.tool-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else {
      const targetBtn = document.querySelector(`.tool-filter-btn[data-sec="${secCode}"]`);
      if (targetBtn) targetBtn.classList.add('active');
    }
    const q = document.getElementById('tool-search-input')?.value || '';
    this.renderToolMasterTable(secCode, q, 'ALL');
  },

  filterToolsByStatus: function(status) {
    this.switchView('view-inventory');
    document.querySelectorAll('.tool-filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.tool-filter-btn[data-sec="ALL"]');
    if (allBtn) allBtn.classList.add('active');
    this.renderToolMasterTable('ALL', '', status);
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`🔍 Filtered Inventory: Displaying ${status} tools`, 'info');
    }
  },

  filterForm11Due: function() {
    this.switchView('view-form11');
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`📜 Displaying Statutory Form 11 Lifting Register (53 statutory tackles)`, 'info');
    }
  },

  searchTools: function(query) {
    this.renderToolMasterTable(this.currentSectionFilter, query, this.currentStatusFilter);
  },

  // -------------------------------------------------------------
  // MODULE 03: STATUTORY FORM 11 REGISTER (ODISHA FACTORIES RULES)
  // -------------------------------------------------------------
  renderForm11Table: function() {
    const tbody = document.getElementById('form11-table-body');
    if (!tbody) return;

    const liftingTackles = this.tools.filter(t => t.isLifting);
    const now = new Date();
    const in30Days = new Date(Date.now() + 30 * 86400000);

    tbody.innerHTML = liftingTackles.map((t, idx) => {
      let comp = 'VALID';
      let compClass = 'status-success';
      if (!t.nextInspection) {
        comp = 'DATE_NOT_SET';
        compClass = 'status-neutral';
      } else {
        const d = new Date(t.nextInspection);
        if (d < now) {
          comp = 'OVERDUE';
          compClass = 'status-critical';
        } else if (d <= in30Days) {
          comp = 'DUE_SOON';
          compClass = 'status-warning';
        }
      }

      return `
        <tr>
          <td>
            <a href="javascript:void(0)" onclick="BalsonsStoreApp.openForm11CertModal('${t.id}')" style="font-family: monospace; font-weight: 800; color: var(--beds-teal-primary); text-decoration: none;">
              ${t.id}
            </a>
          </td>
          <td>
            <strong>${t.desc}</strong><br>
            <small style="color: var(--beds-text-muted);">${t.make} · Serial: ${t.model}</small>
          </td>
          <td><strong style="color: #059669;">${t.capacity}</strong></td>
          <td><span style="font-family: monospace; font-size: 11px; font-weight: 700;">${t.form11Cert || 'F11-JTRWF-2026-101'}</span></td>
          <td>${t.lastInspection || '2026-08-15'}</td>
          <td><strong>${t.nextInspection || '2027-02-14'}</strong></td>
          <td><span class="status-pill ${compClass}">● ${comp}</span></td>
          <td style="text-align: right; white-space: nowrap;">
            <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsStoreApp.openForm11CertModal('${t.id}')">📜 View Cert</button>
          </td>
        </tr>
      `;
    }).join('');
  },

  // -------------------------------------------------------------
  // MODULE 04: TOOL LOANS & ISSUE DESK
  // -------------------------------------------------------------
  renderTransactionsTable: function() {
    const tbody = document.getElementById('transactions-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.transactions.map(tx => `
      <tr>
        <td><strong style="font-family: monospace;">${tx.txId}</strong></td>
        <td><strong style="color: var(--beds-teal-primary);">${tx.toolId}</strong> - ${tx.toolDesc}</td>
        <td>
          <strong>${tx.empName}</strong> (${tx.empTrade})<br>
          <small style="color: var(--beds-text-muted);">${tx.empId} · ${tx.dept}</small>
        </td>
        <td>${tx.area}</td>
        <td>${tx.issueDate}</td>
        <td>${tx.expectedReturn || 'Open'}</td>
        <td><span class="status-pill ${tx.status === 'ACTIVE_LOAN' ? 'status-info' : 'status-success'}">● ${tx.status}</span></td>
        <td style="text-align: right; white-space: nowrap;">
          ${tx.status === 'ACTIVE_LOAN' ? `
            <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsStoreApp.openReturnModal('${tx.toolId}')">Return & Inspect ↵</button>
          ` : `
            <span style="font-size: 11px; font-weight: 600; color: #059669;">${tx.conditionReturned || 'Returned OK'}</span>
          `}
        </td>
      </tr>
    `).join('');
  },

  openIssueModal: function(toolId) {
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) return;

    const modal = document.getElementById('modal-issue-tool');
    if (modal) {
      document.getElementById('issue-tool-id').value = tool.id;
      document.getElementById('issue-tool-desc').value = `${tool.desc} (${tool.capacity || tool.spec})`;
      modal.classList.add('active');
    }
  },

  submitToolIssue: function(e) {
    e.preventDefault();
    const toolId = document.getElementById('issue-tool-id').value;
    const empSelect = document.getElementById('issue-emp-select');
    const empId = empSelect.value;
    const empName = empSelect.options[empSelect.selectedIndex].text;
    const area = document.getElementById('issue-work-area').value;
    const purpose = document.getElementById('issue-purpose').value;
    const expectedReturn = document.getElementById('issue-return-date').value;

    const tool = this.tools.find(t => t.id === toolId);
    if (tool) {
      tool.status = 'ISSUED';
      tool.issuedTo = `${empId} (${empName.split('-')[0].trim()})`;
      tool.issuedDate = new Date().toISOString().split('T')[0];
      this.saveTools();
      if (window.BalsonsStoreApi && typeof BalsonsStoreApi.call === 'function') {
        BalsonsStoreApi.call('loans.issue', {
          toolId: toolId,
          empId: empId,
          empName: empName.split('-')[0].trim(),
          workArea: area,
          purpose: purpose,
          expectedReturn: expectedReturn
        }).catch(err => console.warn('Cloud sync error on tool issue:', err));
      }
    }

    const rnd = Math.floor(100 + Math.random() * 900);
    const newTx = {
      txId: `TX-JTRWF-2026-${rnd}`,
      toolId: toolId,
      toolDesc: tool ? tool.desc : 'Tool',
      empId: empId,
      empName: empName.split('-')[0].trim(),
      empTrade: 'Site Rigging Specialist',
      dept: 'Heavy Lift & Shift',
      area: area,
      issueDate: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0,5),
      expectedReturn: expectedReturn || '2026-11-22 18:00',
      actualReturn: null,
      status: 'ACTIVE_LOAN',
      purpose: purpose || 'Heavy Plant Erection',
      conditionIssued: 'GOOD',
      conditionReturned: null,
      issuedBy: BalsonsStoreAuth.getUser().fullName
    };

    this.transactions.unshift(newTx);
    this.saveTransactions();
    this.enqueueMutation('loans.issue', toolId, {
      toolId: toolId,
      empId: empId,
      empName: empName.split('-')[0].trim(),
      workArea: area,
      purpose: purpose,
      expectedReturn: expectedReturn
    });

    this.renderRadarDashboard();
    this.renderToolMasterTable();
    this.renderTransactionsTable();

    document.getElementById('modal-issue-tool').classList.remove('active');
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`✅ Tool ${toolId} successfully issued to ${empId} (${empName})!`, 'success');
    }
  },

  // -------------------------------------------------------------
  // TOOL RETURN & INSPECTION MODAL (NO BROWSER PROMPT)
  // -------------------------------------------------------------
  openReturnModal: function(toolId) {
    const tx = this.transactions.find(t => t.toolId === toolId && t.status === 'ACTIVE_LOAN');
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) return;

    document.getElementById('return-tx-id').value = tx ? tx.txId : '';
    document.getElementById('return-tool-id').value = tool.id;
    document.getElementById('return-tool-display').textContent = tool.id;
    document.getElementById('return-desc-display').textContent = `${tool.desc} · ${tool.capacity || tool.spec}`;
    document.getElementById('return-borrower-display').textContent = tx 
      ? `Active Custody: ${tx.empName} (${tx.empId}) · ${tx.area} · Issued: ${tx.issueDate}`
      : `Current Status: ${tool.status}`;

    // Reset condition selector
    const goodRadio = document.querySelector('input[name="returnCondition"][value="GOOD"]');
    if (goodRadio) goodRadio.checked = true;
    this.toggleReturnDamagedSection(false);

    document.getElementById('modal-return-tool').classList.add('active');
  },

  toggleReturnDamagedSection: function(isDamaged) {
    const section = document.getElementById('return-damaged-fields');
    if (section) section.style.display = isDamaged ? 'block' : 'none';
  },

  submitToolReturn: function(e) {
    e.preventDefault();
    const txId = document.getElementById('return-tx-id').value;
    const toolId = document.getElementById('return-tool-id').value;
    const condition = document.querySelector('input[name="returnCondition"]:checked').value;
    const defectCat = document.getElementById('return-defect-cat').value;
    const defectNotes = document.getElementById('return-defect-notes').value;
    const quarBin = document.getElementById('return-quar-bin').value;
    const generalNotes = document.getElementById('return-general-notes').value;

    const returnTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0,5);

    // 1. Update Transaction
    if (txId) {
      const tx = this.transactions.find(t => t.txId === txId);
      if (tx) {
        tx.actualReturn = returnTime;
        tx.status = condition === 'DAMAGED_DEFECTIVE' ? 'RETURNED_DAMAGED' : 'RETURNED_OK';
        tx.conditionReturned = condition === 'DAMAGED_DEFECTIVE' ? `DAMAGED: ${defectCat}` : (condition === 'MINOR_SERVICE' ? 'SERVICE NEEDED' : 'GOOD');
      }
      this.saveTransactions();
    }

    // 2. Update Tool
    const tool = this.tools.find(t => t.id === toolId);
    if (tool) {
      if (condition === 'DAMAGED_DEFECTIVE') {
        tool.status = 'QUARANTINED';
        tool.condition = `DEFECTIVE: ${defectCat}`;
        tool.binLocation = quarBin;

        // Create Quarantine Red-Tag
        const qRnd = Math.floor(100 + Math.random() * 900);
        const newQr = {
          redTagId: `RED-TAG-2026-${qRnd}`,
          toolId: tool.id,
          toolDesc: tool.desc,
          quarantinedDate: new Date().toISOString().split('T')[0],
          quarantinedBy: BalsonsStoreAuth.getUser().fullName,
          defectCategory: defectCat,
          defectDetail: defectNotes || 'Damaged during site rigging operations. Physical red tag applied.',
          actionTaken: `PHYSICAL RED TAG APPLIED · MOVED TO ${quarBin}`,
          resolution: 'Awaiting repair assessment by Rigging Engineer / Scrap condemnation.',
          status: 'HOLD_DEFECTIVE'
        };
        this.quarantine.unshift(newQr);
        this.saveQuarantine();
      } else if (condition === 'MINOR_SERVICE') {
        tool.status = 'UNDER_REPAIR';
        tool.condition = 'MINOR SERVICE / CLEANING REQUIRED';
        tool.issuedTo = null;
        tool.issuedDate = null;
      } else {
        tool.status = 'AVAILABLE';
        tool.condition = 'GOOD';
        tool.issuedTo = null;
        tool.issuedDate = null;
      }
      this.saveTools();
    }

    this.renderRadarDashboard();
    this.renderToolMasterTable();
    this.renderTransactionsTable();
    this.renderQuarantineTable();

    this.enqueueMutation('loans.return', toolId, {
      txId: txId,
      returnCondition: condition,
      conditionReturned: tool ? tool.condition : condition,
      status: tool ? tool.status : 'AVAILABLE',
      notes: generalNotes || defectNotes || ''
    });

    if (window.BalsonsStoreApi && typeof BalsonsStoreApi.call === 'function') {
      BalsonsStoreApi.call('loans.return', {
        txId: txId,
        returnCondition: condition,
        notes: generalNotes || defectNotes || ''
      }).catch(err => console.warn('Cloud sync error on tool return:', err));
    }

    document.getElementById('modal-return-tool').classList.remove('active');

    if (window.BalsonsWorkspace) {
      const msg = condition === 'DAMAGED_DEFECTIVE' 
        ? `⛔ Tool ${toolId} returned DAMAGED! Red Tag applied & moved to ${quarBin}.`
        : `↵ Tool ${toolId} successfully checked in and restored to Store Inventory.`;
      window.BalsonsWorkspace.showToast(msg, condition === 'DAMAGED_DEFECTIVE' ? 'critical' : 'success');
    }
  },

  // -------------------------------------------------------------
  // ADD NEW RIGGING TOOL MODAL
  // -------------------------------------------------------------
  openAddToolModal: function() {
    this.onSectionChangeInAddModal('LF');
    document.getElementById('add-tool-desc').value = '';
    document.getElementById('add-tool-make').value = '';
    document.getElementById('add-tool-model').value = '';
    document.getElementById('add-tool-capacity').value = '';
    document.getElementById('modal-add-tool').classList.add('active');
  },

  onSectionChangeInAddModal: function(secCode) {
    const secTools = this.tools.filter(t => t.section === secCode);
    const nextNum = String(secTools.length + 1).padStart(3, '0');
    const typePrefix = secCode === 'LF' ? 'HYJ' : (secCode === 'PT' ? 'MGD' : (secCode === 'MT' ? 'TQW' : 'TLS'));
    document.getElementById('add-tool-id').value = `BAL-${secCode}-${typePrefix}-${nextNum}`;
  },

  submitAddTool: function(e) {
    e.preventDefault();
    const sec = document.getElementById('add-tool-sec').value;
    const id = document.getElementById('add-tool-id').value.trim();
    const desc = document.getElementById('add-tool-desc').value.trim();
    const make = document.getElementById('add-tool-make').value.trim();
    const model = document.getElementById('add-tool-model').value.trim();
    const capacity = document.getElementById('add-tool-capacity').value.trim();
    const bin = document.getElementById('add-tool-bin').value.trim();
    const status = document.getElementById('add-tool-status').value;
    const isLifting = document.getElementById('add-tool-islifting').checked;
    const cert = document.getElementById('add-tool-cert').value.trim();
    const due = document.getElementById('add-tool-due').value;

    if (this.tools.some(t => t.id === id)) {
      if (window.BalsonsWorkspace) {
        window.BalsonsWorkspace.showToast(`⚠️ Tool ID ${id} already exists in master inventory!`, 'warning');
      }
      return;
    }

    const secNames = {
      'LF': 'Lifting Equipment', 'PT': 'Power Tools', 'MT': 'Measuring Tools',
      'HF': 'Hand Tools', 'CC': 'Chemicals', 'ELE': 'Electrical',
      'SF': 'Safety Gear', 'HT': 'Heavy Tooling'
    };

    const newTool = {
      id: id,
      section: sec,
      sectionName: secNames[sec] || 'Rigging Gear',
      type: id.split('-')[2] || 'GEN',
      desc: desc,
      spec: `${make} ${model}`,
      capacity: capacity,
      make: make,
      model: model,
      isLifting: isLifting,
      form11Cert: isLifting ? cert : null,
      lastInspection: new Date().toISOString().split('T')[0],
      nextInspection: due || '2027-02-14',
      status: status,
      binLocation: bin,
      issuedTo: null,
      issuedDate: null,
      condition: 'GOOD (NEW)'
    };

    this.tools.unshift(newTool);
    this.saveTools();
    this.enqueueMutation('tools.add', id, newTool);

    this.renderRadarDashboard();
    this.renderToolMasterTable();
    this.renderForm11Table();

    document.getElementById('modal-add-tool').classList.remove('active');

    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`✅ Rigging Asset ${id} (${desc}) added to Master Inventory! Total: ${this.tools.length} Tools`, 'success');
    }
  },

  // -------------------------------------------------------------
  // TOOL SPECIFICATION & DOSSIER MODAL
  // -------------------------------------------------------------
  openToolDetailModal: function(toolId) {
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) return;

    const qrData = encodeURIComponent(`https://balsonsportals.github.io/BALSONS_STORE_MANAGER/?toolId=${tool.id}`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}`;

    const content = document.getElementById('tool-detail-content');
    content.innerHTML = `
      <div style="display: flex; gap: 18px; align-items: center; border-bottom: 1px solid var(--beds-border); padding-bottom: 16px; margin-bottom: 16px;">
        <img src="${qrUrl}" alt="QR" style="width: 90px; height: 90px; border: 1px solid var(--beds-border); padding: 4px; border-radius: 6px; background: #FFFFFF;">
        <div>
          <span class="meta-tag" style="background: var(--beds-teal-subtle); color: var(--beds-teal-primary); font-weight: 800;">${tool.section} · ${tool.sectionName || 'Rigging'}</span>
          <div style="font-size: 18px; font-weight: 900; color: var(--beds-teal-primary); font-family: monospace; margin: 4px 0;">${tool.id}</div>
          <div style="font-size: 14px; font-weight: 700; color: var(--beds-charcoal-heading);">${tool.desc}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; font-size: 12.5px;">
        <div>
          <span style="color: var(--beds-text-muted);">Safe Working Load (SWL/WLL):</span><br>
          <strong style="color: #059669; font-size: 14px;">${tool.capacity || tool.spec}</strong>
        </div>
        <div>
          <span style="color: var(--beds-text-muted);">Current Operating Status:</span><br>
          <span class="status-pill ${tool.status === 'AVAILABLE' ? 'status-success' : (tool.status === 'ISSUED' ? 'status-info' : 'status-critical')}">● ${tool.status}</span>
        </div>
        <div>
          <span style="color: var(--beds-text-muted);">Manufacturer & Model:</span><br>
          <strong>${tool.make} · ${tool.model}</strong>
        </div>
        <div>
          <span style="color: var(--beds-text-muted);">Store Bin Location:</span><br>
          <strong>${tool.binLocation || 'BIN-STORE-01'}</strong>
        </div>
      </div>

      <!-- Statutory Form 11 Section -->
      <div style="background: var(--beds-bg-page); border: 1px solid var(--beds-border); border-left: 4px solid #059669; border-radius: var(--beds-radius-md); padding: 12px 16px; margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 800; color: #059669; text-transform: uppercase;">
          ${tool.isLifting ? '📜 Statutory Form 11 Compliance (Factories Act)' : '🔧 General Rigging Asset Compliance'}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px; margin-top: 8px;">
          <div>Certificate No: <strong>${tool.form11Cert || 'F11-PENDING'}</strong></div>
          <div>Proof Test Due: <strong>${tool.nextInspection || '2027-02-14'}</strong></div>
          <div>Last Examined: <strong>${tool.lastInspection || '2026-08-15'}</strong></div>
          <div>Competent Person: <strong>Er. N. K. Mohapatra (Govt Approved)</strong></div>
        </div>
      </div>

      <!-- Active Custody Section -->
      <div style="background: var(--beds-bg-page); border: 1px solid var(--beds-border); border-radius: var(--beds-radius-md); padding: 12px 16px; font-size: 12px;">
        <div style="font-size: 12px; font-weight: 800; color: var(--beds-charcoal-heading);">
          📋 Current Site Custody & History
        </div>
        <div style="margin-top: 6px;">
          ${tool.status === 'ISSUED' ? `
            <div>Issued To: <strong style="color: var(--beds-teal-primary);">${tool.issuedTo}</strong></div>
            <div>Issue Date: <strong>${tool.issuedDate || '2026-11-18'}</strong></div>
          ` : `
            <div style="color: #059669; font-weight: 600;">✓ In Store Custody. Ready for immediate issue to safety-inducted personnel.</div>
          `}
        </div>
      </div>
    `;

    const footer = document.getElementById('tool-detail-footer');
    footer.innerHTML = `
      <button type="button" class="beds-btn beds-btn-secondary" onclick="BalsonsStoreApp.printSingleTag('${tool.id}')">🏷️ Print Asset Tag</button>
      ${tool.status === 'AVAILABLE' ? `
        <button type="button" class="beds-btn beds-btn-primary" onclick="document.getElementById('modal-tool-detail').classList.remove('active'); BalsonsStoreApp.openIssueModal('${tool.id}')">Issue to Site →</button>
      ` : (tool.status === 'ISSUED' ? `
        <button type="button" class="beds-btn beds-btn-secondary" onclick="document.getElementById('modal-tool-detail').classList.remove('active'); BalsonsStoreApp.openReturnModal('${tool.id}')">Check-In Return ↵</button>
      ` : '')}
      <button type="button" class="beds-btn beds-btn-secondary btn-modal-cancel" onclick="document.getElementById('modal-tool-detail').classList.remove('active')">Close</button>
    `;

    document.getElementById('modal-tool-detail').classList.add('active');
  },

  // -------------------------------------------------------------
  // MODULE 05: MATERIAL INWARD (GRN)
  // -------------------------------------------------------------
  renderReceiptsTable: function() {
    const tbody = document.getElementById('receipts-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.receipts.map(r => `
      <tr>
        <td><strong style="font-family: monospace; color: var(--beds-teal-primary);">${r.grnNo}</strong></td>
        <td>
          <strong>${r.vendorName}</strong><br>
          <small style="color: var(--beds-text-muted);">Receipt Date: ${r.receiptDate}</small>
        </td>
        <td><strong>${r.poNo}</strong><br><small>${r.challanNo}</small></td>
        <td>${r.itemDesc}</td>
        <td><strong>${r.receivedQty} ${r.unit}</strong></td>
        <td>
          <span style="color: #059669; font-weight: 700;">${r.acceptedQty} Accepted</span>
          ${r.rejectedQty > 0 ? `<br><span style="color: #DC2626; font-weight: 700;">${r.rejectedQty} Rejected</span>` : ''}
        </td>
        <td><span class="status-pill ${r.inspectionStatus.includes('ACCEPT') ? 'status-success' : 'status-warning'}">● ${r.inspectionStatus}</span></td>
        <td><small>${r.inspectedBy}</small></td>
      </tr>
    `).join('');
  },

  openNewGrnModal: function() {
    const nextNum = String(this.receipts.length + 1).padStart(3, '0');
    document.getElementById('grn-no').value = `GRN-JTRWF-2026-${nextNum}`;
    document.getElementById('grn-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('grn-po').value = `PO-BAL-JTRWF-${110 + this.receipts.length}`;
    document.getElementById('grn-challan').value = `DC-VEN-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById('grn-desc').value = '';
    document.getElementById('modal-new-grn').classList.add('active');
  },

  submitNewGrn: function(e) {
    e.preventDefault();
    const grnNo = document.getElementById('grn-no').value;
    const date = document.getElementById('grn-date').value;
    const vendor = document.getElementById('grn-vendor').value;
    const po = document.getElementById('grn-po').value;
    const challan = document.getElementById('grn-challan').value;
    const desc = document.getElementById('grn-desc').value;
    const ordQty = Number(document.getElementById('grn-qty-ordered').value);
    const recQty = Number(document.getElementById('grn-qty-received').value);
    const accQty = Number(document.getElementById('grn-qty-accepted').value);
    const rejQty = Number(document.getElementById('grn-qty-rejected').value);
    const status = document.getElementById('grn-status').value;
    const inspector = document.getElementById('grn-inspector').value;

    const newRc = {
      grnNo: grnNo,
      poNo: po,
      vendorName: vendor,
      challanNo: challan,
      receiptDate: date,
      itemDesc: desc,
      orderedQty: ordQty,
      receivedQty: recQty,
      acceptedQty: accQty,
      rejectedQty: rejQty,
      unit: 'Nos',
      inspectionStatus: status,
      inspectedBy: inspector,
      remarks: 'Verified physical consignment vs supplier delivery challan'
    };

    this.receipts.unshift(newRc);
    this.saveReceipts();
    this.enqueueMutation('grn.create', grnNo, newRc);
    this.renderReceiptsTable();

    document.getElementById('modal-new-grn').classList.remove('active');
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`📥 Inward Consignment ${grnNo} recorded & stock updated!`, 'success');
    }
  },

  // -------------------------------------------------------------
  // MODULE 06: SAFETY QUARANTINE DESK
  // -------------------------------------------------------------
  renderQuarantineTable: function() {
    const tbody = document.getElementById('quarantine-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.quarantine.map(q => `
      <tr>
        <td><strong style="font-family: monospace; color: #DC2626;">${q.redTagId}</strong></td>
        <td>
          <strong style="color: var(--beds-teal-primary);">${q.toolId}</strong><br>
          <small>${q.toolDesc}</small>
        </td>
        <td>${q.quarantinedDate}</td>
        <td><span class="meta-tag" style="background: rgba(220, 38, 38, 0.1); color: #DC2626; font-weight: 700;">${q.defectCategory}</span></td>
        <td>${q.defectDetail}</td>
        <td><small>${q.actionTaken}</small></td>
        <td><span class="status-pill status-critical">● ${q.status}</span></td>
      </tr>
    `).join('');
  },

  openQuarantineModal: function(toolId) {
    const select = document.getElementById('quar-tool-select');
    select.innerHTML = this.tools.map(t => `
      <option value="${t.id}" ${t.id === toolId ? 'selected' : ''}>
        ${t.id} - ${t.desc} (${t.capacity || t.spec}) · ${t.status}
      </option>
    `).join('');

    const nextNum = String(this.quarantine.length + 1).padStart(3, '0');
    document.getElementById('quar-tag-id').value = `RED-TAG-2026-${nextNum}`;
    document.getElementById('quar-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('quar-defect-detail').value = '';
    document.getElementById('modal-quarantine-tag').classList.add('active');
  },

  onQuarantineToolSelect: function(toolId) {
    const tool = this.tools.find(t => t.id === toolId);
    if (tool) {
      document.getElementById('quar-defect-detail').placeholder = `Enter physical defect observed on ${tool.desc}`;
    }
  },

  submitQuarantineTag: function(e) {
    e.preventDefault();
    const tagId = document.getElementById('quar-tag-id').value;
    const toolId = document.getElementById('quar-tool-select').value;
    const date = document.getElementById('quar-date').value;
    const cat = document.getElementById('quar-defect-cat').value;
    const disposition = document.getElementById('quar-disposition').value;
    const detail = document.getElementById('quar-defect-detail').value;
    const officer = document.getElementById('quar-tagged-by').value;
    const loc = document.getElementById('quar-location').value;

    const tool = this.tools.find(t => t.id === toolId);
    if (tool) {
      tool.status = 'QUARANTINED';
      tool.condition = `DEFECTIVE: ${cat}`;
      tool.binLocation = loc;
      this.saveTools();
    }

    const newQr = {
      redTagId: tagId,
      toolId: toolId,
      toolDesc: tool ? tool.desc : 'Tool',
      quarantinedDate: date,
      quarantinedBy: officer,
      defectCategory: cat,
      defectDetail: detail,
      actionTaken: `PHYSICAL RED TAG APPLIED · MOVED TO ${loc}`,
      resolution: `Disposition: ${disposition}. Statutory lock active.`,
      status: disposition
    };

    this.quarantine.unshift(newQr);
    this.saveQuarantine();
    this.enqueueMutation('quarantine.tag', tagId, newQr);

    this.renderRadarDashboard();
    this.renderToolMasterTable();
    this.renderQuarantineTable();

    document.getElementById('modal-quarantine-tag').classList.remove('active');
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`⛔ Red Tag ${tagId} applied to ${toolId}. Quarantined in ${loc}!`, 'critical');
    }
  },

  // -------------------------------------------------------------
  // MODULE 07: RGP / NRGP GATE PASS STUDIO
  // -------------------------------------------------------------
  generateRgpChallan: function() {
    this.renderRgpPrintableSheet();
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast('🚛 RGP Material Gate Pass Challan generated and ready for print!', 'info');
    }
  },

  renderRgpPrintableSheet: function() {
    const container = document.getElementById('rgp-printable-sheet');
    if (!container) return;

    const type = document.getElementById('rgp-type')?.value || 'RGP';
    const vehicle = document.getElementById('rgp-vehicle')?.value || 'OD-02-AK-4412';
    const dest = document.getElementById('rgp-dest')?.value || 'Enerpac Service Center';
    const retDate = document.getElementById('rgp-return-date')?.value || '2026-11-28';
    const purpose = document.getElementById('rgp-purpose')?.value || 'Statutory calibration and proof load recertification';
    const itemsRaw = document.getElementById('rgp-items')?.value || '1. Hydraulic Jack 500T (BAL-LF-HYJ-001)\n2. Torque Wrench 1200Nm (BAL-HT-TRQ-001)';

    const passNo = `GP-${type}-JTRWF-2026-088`;
    const issueDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const qrUrl = window.BalsonsQrGenerator ? window.BalsonsQrGenerator.getToolQrDataUrl(passNo, 180) : '';

    const rows = itemsRaw.split('\n').filter(r => r.trim()).map((r, i) => `
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #0F172A; text-align: center; font-weight: 700;">${i+1}</td>
        <td style="padding: 5px 8px; border: 1px solid #0F172A; font-weight: 600;">${r}</td>
        <td style="padding: 5px 8px; border: 1px solid #0F172A; text-align: center; font-weight: 700;">1 No</td>
        <td style="padding: 5px 8px; border: 1px solid #0F172A;">Statutory Calibration / Testing</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="calibrated-rgp-sheet" style="width: 190mm; max-height: 275mm; margin: 0 auto; box-sizing: border-box; background: #FFFFFF; color: #0F172A; border: 2px solid #0F172A; padding: 16px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <!-- Official Master Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0F172A; padding-bottom: 10px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="assets/images/balsons-logo.png" alt="Logo" style="height: 38px; width: auto; object-fit: contain;">
            <div>
              <div style="font-size: 16px; font-weight: 900; color: #0F172A; letter-spacing: -0.2px;">BALSONS HEAVY LIFT &amp; SHIFT</div>
              <div style="font-size: 10px; font-weight: 800; color: #0097B2; text-transform: uppercase;">
                Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
              </div>
              <div style="font-size: 8.5px; color: #64748B;">Central Logistics &amp; Rigging Tackle Governance System</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="text-align: right;">
              <div style="font-size: 13.5px; font-weight: 900; color: #0F172A;">${type === 'RGP' ? 'RETURNABLE GATE PASS (RGP)' : 'NON-RETURNABLE GATE PASS (NRGP)'}</div>
              <div style="font-size: 11px; font-weight: 900; font-family: monospace; color: #0097B2;">PASS NO: ${passNo}</div>
              <div style="font-size: 8.5px; color: #059669; font-weight: 800;">● GATE CLEARANCE VERIFIED</div>
            </div>
            <div style="text-align: center; border-left: 1px solid #E2E8F0; padding-left: 10px;">
              <img src="${qrUrl}" alt="QR" style="width: 48px; height: 48px; border: 1px solid #0F172A; padding: 1.5px; border-radius: 3px; display: block;">
              <div style="font-size: 5pt; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-top: 1px;">SCAN TO VERIFY</div>
            </div>
          </div>
        </div>

        <!-- Meta Dispatch Parameters Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 10.5px; margin-bottom: 12px; background: #F8FAFC; padding: 10px 14px; border: 1px solid #CBD5E1; border-radius: 4px;">
          <div><strong>Date of Dispatch:</strong> <span style="font-family: monospace; font-weight: 700;">${issueDate}</span></div>
          <div><strong>Vehicle / Carrier No:</strong> <span style="font-weight: 800; color: #0F172A;">${vehicle}</span></div>
          <div><strong>Consignee Destination:</strong> <span style="font-weight: 700;">${dest}</span></div>
          <div><strong>Expected Return Date:</strong> <strong style="color: #0097B2; font-family: monospace;">${retDate}</strong></div>
          <div style="grid-column: span 2;"><strong>Operational Purpose:</strong> ${purpose}</div>
        </div>

        <!-- Monochrome Table -->
        <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 20px;">
          <thead>
            <tr style="background: #0F172A; color: #FFFFFF;">
              <th style="padding: 6px; border: 1px solid #0F172A; width: 40px; text-align: center;">S.NO</th>
              <th style="padding: 6px; border: 1px solid #0F172A; text-align: left;">DESCRIPTION OF RIGGING TOOLS / MATERIALS &amp; IDENTIFIERS</th>
              <th style="padding: 6px; border: 1px solid #0F172A; width: 80px; text-align: center;">QUANTITY</th>
              <th style="padding: 6px; border: 1px solid #0F172A; width: 170px; text-align: left;">REMARKS &amp; STATUS</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <!-- Mandatory Security Notice -->
        <div style="background: #F1F5F9; border: 1px solid #CBD5E1; border-radius: 4px; padding: 6px 10px; font-size: 8.5px; color: #475569; margin-bottom: 26px; line-height: 1.4;">
          <strong>SECURITY &amp; MATERIAL CONTROL NOTICE:</strong> This gate pass authorises outward movement of the listed plant assets solely for the stated purpose. The security in-charge at Main Gate 1 shall record outgoing vehicle timestamp, verify physical tackle markings against this pass, and log the gate clearance record. Returnable items must be returned on or before the specified date.
        </div>

        <!-- 3-Tier Signatures -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; font-size: 9.5px; text-align: center; border-top: 1px dashed #94A3B8; padding-top: 14px;">
          <div>
            <div style="height: 32px;"></div>
            <div style="font-weight: 800; border-top: 1px solid #0F172A; padding-top: 4px;">Prepared By (Store Lead)</div>
            <div style="color: #475569;">Gagan Bihari Das</div>
          </div>
          <div>
            <div style="height: 32px;"></div>
            <div style="font-weight: 800; border-top: 1px solid #0F172A; padding-top: 4px;">Authorized Signatory (Site Lead)</div>
            <div style="color: #475569;">Pradeep Muley (Director)</div>
          </div>
          <div>
            <div style="height: 32px;"></div>
            <div style="font-weight: 800; border-top: 1px solid #0F172A; padding-top: 4px;">Security Gate Out-Stamp</div>
            <div style="color: #475569;">Main Gate 1 Security Officer</div>
          </div>
        </div>

        <!-- Corporate Motto Footer -->
        <div style="text-align: center; margin-top: 18px; font-size: 8.5px; color: #0097B2; font-style: italic; font-weight: 700;">
          &ldquo;Difficult We Do Easily, Impossible Takes Little Time...&rdquo;
        </div>
      </div>
    `;
  },

  printRgpChallan: function() {
    this.renderRgpPrintableSheet();
    const sheet = document.getElementById('rgp-printable-sheet');
    if (!sheet) return;
    this.activatePrintStage(sheet.innerHTML);
  },

  // -------------------------------------------------------------
  // MODULE 08: PROCUREMENT (PR)
  // -------------------------------------------------------------
  renderProcurementTable: function() {
    const tbody = document.getElementById('procurement-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.procurement.map(p => `
      <tr>
        <td><strong style="font-family: monospace; color: var(--beds-teal-primary);">${p.prId}</strong></td>
        <td>
          <strong>${p.itemDesc}</strong><br>
          <small style="color: var(--beds-text-muted);">${p.justification}</small>
        </td>
        <td><span class="meta-tag">${p.category}</span></td>
        <td><strong>${p.qty} ${p.unit}</strong></td>
        <td>${p.requestedBy}</td>
        <td>${p.requiredByDate}</td>
        <td><strong style="color: #059669;">${p.estimatedCost}</strong></td>
        <td><span class="status-pill status-success">● ${p.status}</span></td>
      </tr>
    `).join('');
  },

  openNewPrModal: function() {
    const nextNum = String(this.procurement.length + 1).padStart(3, '0');
    document.getElementById('pr-id').value = `PR-JTRWF-2026-${nextNum}`;
    document.getElementById('pr-date').value = '2026-11-28';
    document.getElementById('pr-desc').value = '';
    document.getElementById('pr-justification').value = '';
    document.getElementById('modal-new-pr').classList.add('active');
  },

  submitNewPr: function(e) {
    e.preventDefault();
    const id = document.getElementById('pr-id').value;
    const date = document.getElementById('pr-date').value;
    const desc = document.getElementById('pr-desc').value;
    const cat = document.getElementById('pr-cat').value;
    const qty = Number(document.getElementById('pr-qty').value);
    const unit = document.getElementById('pr-unit').value;
    const cost = document.getElementById('pr-cost').value;
    const just = document.getElementById('pr-justification').value;
    const req = document.getElementById('pr-requester').value;

    const newPr = {
      prId: id,
      itemDesc: desc,
      category: cat,
      qty: qty,
      unit: unit,
      requestedBy: req,
      requiredByDate: date,
      estimatedCost: cost,
      status: 'APPROVED_BY_DIRECTOR',
      justification: just
    };

    this.procurement.unshift(newPr);
    this.saveProcurement();
    this.enqueueMutation('procurement.pr', id, newPr);
    this.renderProcurementTable();

    document.getElementById('modal-new-pr').classList.remove('active');
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`📑 Purchase Requisition ${id} raised and approved!`, 'success');
    }
  },

  // -------------------------------------------------------------
  // MODULE 09: VENDOR DIRECTORY
  // -------------------------------------------------------------
  renderVendorsTable: function() {
    const tbody = document.getElementById('vendors-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.vendors.map(v => `
      <tr>
        <td><strong style="font-family: monospace; color: var(--beds-teal-primary);">${v.id}</strong></td>
        <td>
          <strong style="font-size: 13.5px; color: var(--beds-charcoal-heading);">${v.name}</strong>
        </td>
        <td>
          <strong>${v.contact}</strong><br>
          <small>${v.phone} · ${v.email}</small>
        </td>
        <td><span style="font-family: monospace; font-size: 11.5px; font-weight: 700;">${v.gst}</span></td>
        <td><span class="meta-tag">${v.category}</span></td>
        <td><span class="status-pill status-success">★ ${v.rating}</span></td>
      </tr>
    `).join('');
  },

  openNewVendorModal: function() {
    const nextNum = String(this.vendors.length + 1).padStart(3, '0');
    document.getElementById('ven-id').value = `VEN-${nextNum}`;
    document.getElementById('ven-name').value = '';
    document.getElementById('ven-cat').value = '';
    document.getElementById('ven-gst').value = '';
    document.getElementById('ven-contact').value = '';
    document.getElementById('ven-email').value = '';
    document.getElementById('modal-add-vendor').classList.add('active');
  },

  submitNewVendor: function(e) {
    e.preventDefault();
    const id = document.getElementById('ven-id').value;
    const name = document.getElementById('ven-name').value;
    const cat = document.getElementById('ven-cat').value;
    const gst = document.getElementById('ven-gst').value;
    const contact = document.getElementById('ven-contact').value;
    const email = document.getElementById('ven-email').value;
    const rating = document.getElementById('ven-rating').value;

    const newVn = {
      id: id,
      name: name,
      contact: contact.split('(')[0].trim(),
      phone: contact.includes('(') ? contact.split('(')[1].replace(')', '').trim() : '+91 94370 00000',
      email: email,
      gst: gst,
      category: cat,
      rating: rating
    };

    this.vendors.unshift(newVn);
    this.saveVendors();
    this.enqueueMutation('vendors.add', id, newVn);
    this.renderVendorsTable();

    document.getElementById('modal-add-vendor').classList.remove('active');
    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`🏢 Vendor ${name} successfully registered in Master Directory!`, 'success');
    }
  },

  // -------------------------------------------------------------
  // MODULE 10: STATUTORY FORM 11 CERTIFICATE VIEWER
  // -------------------------------------------------------------
  openForm11CertModal: function(toolId) {
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) return;

    const certContent = document.getElementById('form11-cert-content');
    certContent.innerHTML = `
      <div style="background: #FFFFFF; color: #102D35; border: 2px solid #102D35; padding: 20px; border-radius: 6px; font-family: Inter, Arial, sans-serif;">
        <div style="text-align: center; border-bottom: 2px solid #0097B2; padding-bottom: 10px; margin-bottom: 12px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">GOVERNMENT OF ODISHA · DIRECTORATE OF FACTORIES & BOILERS</div>
          <div style="font-size: 16px; font-weight: 900; color: #0097B2; margin: 4px 0;">STATUTORY FORM 11: CERTIFICATE OF EXAMINATION OF LIFTING TACKLES</div>
          <div style="font-size: 10.5px; color: #52636B;">Prescribed under Rule 55 of the Odisha Factories Rules, 1950 & Section 29 of Factories Act, 1948</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11.5px; background: #F8FAFC; padding: 10px; border: 1px solid #E2E8F0; margin-bottom: 14px;">
          <div><strong>Certificate No:</strong> <span style="font-family: monospace; font-weight: 800; color: #0097B2;">${tool.form11Cert || 'F11-JTRWF-2026-101'}</span></div>
          <div><strong>Inspection Date:</strong> ${tool.lastInspection || '2026-08-15'}</div>
          <div><strong>Occupier / Rigging Contractor:</strong> BALSONS HEAVY LIFT & SHIFT</div>
          <div><strong>Next Statutory Due:</strong> <strong style="color: #059669;">${tool.nextInspection || '2027-02-14'}</strong></div>
          <div style="grid-column: span 2;"><strong>Factory Location:</strong> Jupiter Tatravagonka Railwheel Factory, Khordha, Odisha</div>
        </div>

        <div style="font-size: 12px; font-weight: 800; margin-bottom: 6px; color: #102D35;">LIFTING TACKLE PARTICULARS:</div>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 14px;">
          <tr>
            <td style="padding: 6px; border: 1px solid #CBD5E1; width: 35%; background: #F1F5F9;"><strong>Equipment Asset ID:</strong></td>
            <td style="padding: 6px; border: 1px solid #CBD5E1; font-family: monospace; font-weight: 800; color: #0097B2;">${tool.id}</td>
          </tr>
          <tr>
            <td style="padding: 6px; border: 1px solid #CBD5E1; background: #F1F5F9;"><strong>Description of Tackle:</strong></td>
            <td style="padding: 6px; border: 1px solid #CBD5E1;">${tool.desc}</td>
          </tr>
          <tr>
            <td style="padding: 6px; border: 1px solid #CBD5E1; background: #F1F5F9;"><strong>Manufacturer & Serial No:</strong></td>
            <td style="padding: 6px; border: 1px solid #CBD5E1;">${tool.make} · Serial/Model: ${tool.model}</td>
          </tr>
          <tr>
            <td style="padding: 6px; border: 1px solid #CBD5E1; background: #F1F5F9;"><strong>Safe Working Load (SWL/WLL):</strong></td>
            <td style="padding: 6px; border: 1px solid #CBD5E1; font-weight: 800; color: #059669; font-size: 12px;">${tool.capacity || tool.spec}</td>
          </tr>
          <tr>
            <td style="padding: 6px; border: 1px solid #CBD5E1; background: #F1F5F9;"><strong>Proof Load Test Applied:</strong></td>
            <td style="padding: 6px; border: 1px solid #CBD5E1; font-weight: 700;">1.5x SWL Proof Load Test Applied via Calibrated Tension Test Rig</td>
          </tr>
          <tr>
            <td style="padding: 6px; border: 1px solid #CBD5E1; background: #F1F5F9;"><strong>Examination Result:</strong></td>
            <td style="padding: 6px; border: 1px solid #CBD5E1; color: #059669; font-weight: 800;">PASSED STATUTORY PROOF LOAD TEST. Zero permanent deformation or cracking.</td>
          </tr>
        </table>

        <div style="font-size: 11px; line-height: 1.4; color: #475569; margin-bottom: 20px;">
          I certify that on the date specified above, the lifting tackle described herein was thoroughly examined by me and found free from patent defects. The safe working load has been verified under applicable rules.
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px dashed #CBD5E1; padding-top: 14px; font-size: 11px;">
          <div>
            <div>Competent Person Reg No: <strong>CP/OD/2021/FACT-084</strong></div>
            <div>Valid Through: <strong>31-Dec-2027</strong></div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 800; font-size: 12px;">Er. N. K. Mohapatra</div>
            <div>Approved Competent Person (Odisha)</div>
            <div style="font-size: 10px; color: #059669; font-weight: 700;">[DIGITALLY VERIFIED SEAL & SIGNATURE]</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('modal-form11-cert').classList.add('active');
  },

  printForm11Certificate: function() {
    const cert = document.getElementById('form11-cert-content');
    if (!cert) return;
    this.activatePrintStage(cert.innerHTML);
  },

  // -------------------------------------------------------------
  // MODULE 11: QR TAG STUDIO
  // -------------------------------------------------------------
  renderQrTagStudio: function(sectionCode) {
    const container = document.getElementById('qr-sheet-container');
    if (!container) return;

    let targetTools = this.tools.filter(t => t.section === sectionCode);
    if (targetTools.length === 0) targetTools = this.tools.slice(0, 8);
    container.innerHTML = BalsonsQrGenerator.renderA4Sheet(targetTools.slice(0, 8));
  },

  printQrTagSheet: function() {
    const sheet = document.getElementById('qr-sheet-container');
    if (!sheet) return;
    this.activatePrintStage(sheet.innerHTML);
  },

  printSingleTag: function(toolId) {
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) return;
    const tagHtml = `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #FFFFFF;">
        ${BalsonsQrGenerator.renderTagCard(tool)}
      </div>
    `;
    this.activatePrintStage(tagHtml);
  },

  // -------------------------------------------------------------
  // MODULE 12: 360 WORKFORCE DOSSIER INTEGRATION
  // -------------------------------------------------------------
  render360DossierPage: function() {
    const container = document.getElementById('dossier-360-container');
    if (!container) return;
    BalsonsDossier360.renderUnifiedDossier(container, 'EMP-2026-0001');
  },

  // -------------------------------------------------------------
  // CSV UNIVERSAL EXPORT UTILITY
  // -------------------------------------------------------------
  downloadCsv: function(filename, headers, rows) {
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.BalsonsWorkspace) {
      window.BalsonsWorkspace.showToast(`📥 Exported: ${filename} downloaded successfully!`, 'success');
    }
  },

  exportToolsCsv: function() {
    const headers = ['ToolID', 'Section', 'SectionName', 'Description', 'CapacitySWL', 'Make', 'Model', 'Status', 'StoreBin', 'Form11Statutory', 'CertNo', 'LastInspection', 'NextDue', 'IssuedTo'];
    const rows = this.tools.map(t => [
      t.id, t.section, t.sectionName || '', t.desc, t.capacity || t.spec, t.make, t.model, t.status, t.binLocation || '', t.isLifting ? 'YES' : 'NO', t.form11Cert || '', t.lastInspection || '', t.nextInspection || '', t.issuedTo || ''
    ]);
    this.downloadCsv(`BALSONS_STORE_INVENTORY_264_TOOLS_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  },

  exportForm11Csv: function() {
    const lifting = this.tools.filter(t => t.isLifting);
    const headers = ['ItemNo', 'ToolID', 'Description', 'CapacitySWL', 'Form11CertNo', 'LastProofTest', 'NextDue', 'CompetentPerson', 'Status'];
    const rows = lifting.map((t, idx) => [
      idx + 1, t.id, t.desc, t.capacity, t.form11Cert || 'F11-PENDING', t.lastInspection || '2026-08-15', t.nextInspection || '2027-02-14', 'Er. N. K. Mohapatra', 'VALID'
    ]);
    this.downloadCsv(`BALSONS_STATUTORY_FORM11_REGISTER_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  },

  exportLoansCsv: function() {
    const headers = ['TxID', 'ToolID', 'ToolDescription', 'BorrowerName', 'BorrowerEmpID', 'Trade', 'Department', 'Area', 'IssueDate', 'ExpectedReturn', 'ActualReturn', 'Status', 'Purpose', 'ConditionReturned'];
    const rows = this.transactions.map(tx => [
      tx.txId, tx.toolId, tx.toolDesc, tx.empName, tx.empId, tx.empTrade, tx.dept, tx.area, tx.issueDate, tx.expectedReturn || '', tx.actualReturn || '', tx.status, tx.purpose, tx.conditionReturned || ''
    ]);
    this.downloadCsv(`BALSONS_TOOL_LOANS_REGISTER_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  },

  exportGrnCsv: function() {
    const headers = ['GrnNo', 'ReceiptDate', 'PoNo', 'VendorName', 'ChallanNo', 'ItemDescription', 'OrderedQty', 'ReceivedQty', 'AcceptedQty', 'RejectedQty', 'InspectionStatus', 'InspectedBy'];
    const rows = this.receipts.map(r => [
      r.grnNo, r.receiptDate, r.poNo, r.vendorName, r.challanNo, r.itemDesc, r.orderedQty, r.receivedQty, r.acceptedQty, r.rejectedQty, r.inspectionStatus, r.inspectedBy
    ]);
    this.downloadCsv(`BALSONS_MATERIAL_INWARD_GRN_REGISTER_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  },

  exportQuarantineCsv: function() {
    const headers = ['RedTagID', 'ToolID', 'ToolDescription', 'QuarantineDate', 'QuarantinedBy', 'DefectCategory', 'DefectDetail', 'ActionTaken', 'Status'];
    const rows = this.quarantine.map(q => [
      q.redTagId, q.toolId, q.toolDesc, q.quarantinedDate, q.quarantinedBy, q.defectCategory, q.defectDetail, q.actionTaken, q.status
    ]);
    this.downloadCsv(`BALSONS_SAFETY_QUARANTINE_RED_TAGS_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  },

  exportProcurementCsv: function() {
    const headers = ['PrID', 'ItemDescription', 'Category', 'Quantity', 'Unit', 'RequestedBy', 'RequiredDate', 'EstimatedCost', 'ApprovalStatus', 'Justification'];
    const rows = this.procurement.map(p => [
      p.prId, p.itemDesc, p.category, p.qty, p.unit, p.requestedBy, p.requiredByDate, p.estimatedCost, p.status, p.justification
    ]);
    this.downloadCsv(`BALSONS_PURCHASE_REQUISITIONS_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  },

  exportVendorsCsv: function() {
    const headers = ['VendorID', 'CompanyName', 'Category', 'ContactPerson', 'Phone', 'Email', 'GSTIN', 'Rating'];
    const rows = this.vendors.map(v => [
      v.id, v.name, v.category, v.contact, v.phone, v.email, v.gst, v.rating
    ]);
    this.downloadCsv(`BALSONS_APPROVED_VENDOR_MASTER_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  }
};

window.BalsonsStoreApp = BalsonsStoreApp;

window.onStoreUserSelectChange = function(sel) {
  const passwords = {
    'store.head': 'Store@2026!',
    'admin': 'Admin@2026!',
    'purchase.lead': 'Purchase@2026!',
    'maint.eng': 'Maint@2026!',
    'site.viewer': 'Viewer@2026!'
  };
  const passEl = document.getElementById('store-login-pass');
  if (passEl && passwords[sel.value]) passEl.value = passwords[sel.value];
};

window.handleStoreLogin = function(e) {
  if (e) e.preventDefault();
  const username = document.getElementById('store-login-user').value;
  const pass = document.getElementById('store-login-pass').value;
  const res = BalsonsStoreAuth.login(username, pass);
  if (res && res.success) {
    const modal = document.getElementById('modal-login');
    if (modal) modal.classList.remove('active');
    window.location.reload();
  } else {
    const errEl = document.getElementById('storeLoginError');
    if (errEl) {
      errEl.textContent = res ? res.message : 'Invalid credentials';
      errEl.style.display = 'block';
    }
  }
};


// Global Dual-Sync Wire for BEDS Auto-Reload Sync Engine
window.BalsonsPortalSync = {
  reload: async function() {
    if (window.BalsonsStoreApi && typeof window.BalsonsStoreApi.syncWithLiveDb === 'function') {
      await window.BalsonsStoreApi.syncWithLiveDb();
    } else if (window.BalsonsStoreApp && typeof window.BalsonsStoreApp.refreshData === 'function') {
      await window.BalsonsStoreApp.refreshData();
    }
  }
};

// Universal switchTab bridge for document vault & cross-portal workflows
window.switchTab = function(tabId) {
  if (tabId === 'documents' || tabId === 'tab-documents' || tabId === 'view-documents') {
    if (window.BalsonsStoreApp && window.BalsonsStoreApp.switchView) {
      window.BalsonsStoreApp.switchView('view-documents');
    }
  }
};
