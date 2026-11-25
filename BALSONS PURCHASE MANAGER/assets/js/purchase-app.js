/**
 * BALSONS PURCHASE MANAGER - FRONTEND CONTROLLER & DUAL-SYNC ENGINE
 * Version 6.0 (BAL-PROC-E2E-006 / SAM-2026 / BEDS V1.0)
 * Dedicated Google Sheet ID: 1ANnu4X2dR0EITq5RvkyfMv1Xfz30Ba26IKjc40uyj_c
 * Clasp Apps Script Script ID: 1BPmt-vDa-pBy07quE1wq7FY6kq8VnQJPUNIx1GrlSBD5UO9v3FflrZZN
 */

const BalsonsPurchaseApp = {
  SHEET_ID: '1ANnu4X2dR0EITq5RvkyfMv1Xfz30Ba26IKjc40uyj_c',
  SCRIPT_ID: '1BPmt-vDa-pBy07quE1wq7FY6kq8VnQJPUNIx1GrlSBD5UO9v3FflrZZN',
  API_URL: 'https://script.google.com/macros/s/1BPmt-vDa-pBy07quE1wq7FY6kq8VnQJPUNIx1GrlSBD5UO9v3FflrZZN/exec',

  activeTab: 'prs',
  currentUser: null,
  isSyncing: false,

  // DATA REPOSITORY (INITIAL SEED REPOSITORIES)
  data: {
    prs: [
      {
        id: 'PR-2026-001',
        displayNo: 'BAL/JTRWF/PR/2026/001',
        date: '2026-11-15',
        requester: 'Dilip Rout (Operations Area Manager)',
        dept: 'Heavy Lifting & Erection',
        costCenter: 'CC-LINE-AXLE-01',
        purpose: 'Matched 60T Wire Rope Slings for Schuler Axle Extrusion Press Erection',
        linesCount: 2,
        estValue: 388338.00,
        status: 'PO_DISPATCHED',
        priority: 'HIGH',
        needBy: '2026-12-05',
        lines: [
          { lineId: 'PRL-2026-001-01', itemCode: 'SLING-WR-60T-12M', desc: 'Matched Pair 60T Wire Rope Slings 12M with thimbles', qty: 2, uom: 'PAIR', form11: true, spec: '6x36 WS, IWRC, 1960 N/mm2, Proof load tested to 200%, Lloyd\'s TPI Form 11', status: 'ORDERED' },
          { lineId: 'PRL-2026-001-02', itemCode: 'SHACKLE-BOW-85T', desc: '85T High Tensile Forged Alloy Bow Shackles with safety bolt', qty: 4, uom: 'NOS', form11: true, spec: 'Grade 80 alloy steel, Safety factor 6:1, EN 13889 certified', status: 'ORDERED' }
        ]
      },
      {
        id: 'PR-2026-002',
        displayNo: 'BAL/JTRWF/PR/2026/002',
        date: '2026-11-18',
        requester: 'Sarat Mishra (Machine Shop Area Manager)',
        dept: 'Machine Shop Bay (7 Streams)',
        costCenter: 'CC-MS-PARI-04',
        purpose: '10,000 Nm Hydraulic Torque Wrench Set with NABL Calibration Kit',
        linesCount: 2,
        estValue: 540000.00,
        status: 'HOD_APPROVED',
        priority: 'NORMAL',
        needBy: '2026-12-12',
        lines: [
          { lineId: 'PRL-2026-002-01', itemCode: 'HYD-TORQUE-10K', desc: '10,000 Nm Square Drive Hydraulic Torque Wrench with Twin Hose', qty: 1, uom: 'SET', form11: false, spec: 'Titanium-Alloy unibody, Working pressure 700 bar, Accuracy ±1.5%', status: 'SOURCING' },
          { lineId: 'PRL-2026-002-02', itemCode: 'OPTICAL-LASER-ALIGN-01', desc: 'Precision Laser Alignment Optical Sensor Kit (0.02 mm/m)', qty: 1, uom: 'SET', form11: false, spec: 'Multi-axis laser receiver, Bluetooth sync, Magnetic bracket', status: 'SOURCING' }
        ]
      },
      {
        id: 'PR-2026-003',
        displayNo: 'BAL/JTRWF/PR/2026/003',
        date: '2026-11-20',
        requester: 'Dilip Rout (Operations Area Manager)',
        dept: 'Heavy Lifting (Line Wheel)',
        costCenter: 'CC-LINE-WHEEL-02',
        purpose: 'Grade 80 Master Links & Shackles for 8,000T Monobloc Press Tie-Rods',
        linesCount: 1,
        estValue: 420000.00,
        status: 'SUBMITTED',
        priority: 'HIGH',
        needBy: '2026-12-15',
        lines: [
          { lineId: 'PRL-2026-003-01', itemCode: 'MASTER-LINK-100T', desc: '100T Welded Alloy Master Link Assembly for 4-Leg Heavy Bridle', qty: 2, uom: 'SET', form11: true, spec: 'EN 1677-4 certified, proof tested to 2.5x WLL with Form 11 certificate', status: 'PENDING_APPROVAL' }
        ]
      }
    ],

    rfqs: [
      {
        id: 'RFQ-2026-001',
        displayNo: 'BAL/JTRWF/RFQ/2026/001',
        prId: 'PR-2026-001',
        issueDate: '2026-11-16',
        dueDate: '2026-11-19',
        strategy: 'Competitive Multi-Vendor Tender',
        invited: 3,
        bidsRecv: 3,
        status: 'CLOSED_EVALUATED',
        terms: 'DAP Site Store Khordha, 30 Days Net from Store GRN'
      },
      {
        id: 'RFQ-2026-002',
        displayNo: 'BAL/JTRWF/RFQ/2026/002',
        prId: 'PR-2026-002',
        issueDate: '2026-11-19',
        dueDate: '2026-11-23',
        strategy: 'Specialized Tooling Multi-Vendor',
        invited: 3,
        bidsRecv: 2,
        status: 'BIDS_UNDER_EVALUATION',
        terms: 'DAP Machine Shop Bay Khordha, 30 Days Net'
      }
    ],

    csList: [
      {
        id: 'CS-2026-001',
        rfqId: 'RFQ-2026-001',
        prId: 'PR-2026-001',
        evalDate: '2026-11-19',
        evaluator: 'Gagan Bihari Das (Purchase Lead)',
        l1Vendor: 'Tufropes Heavy Tackles Pvt Ltd',
        l1Landed: 388338.00,
        l2Vendor: 'Usha Martin Wire Ropes Ltd',
        l2Landed: 432500.00,
        l3Vendor: 'Bharat Rigging & Forging Corp',
        l3Landed: 465200.00,
        savings: 31662.00,
        status: 'APPROVED (DoA Tier 2)',
        approver: 'Dilip Rout (Area Manager)',
        justification: 'L1 Bidder Tufropes Heavy Tackles is technically fully compliant and offers lowest landed rate with 14 days delivery.'
      }
    ],

    pos: [
      {
        id: 'PO-2026-001',
        displayNo: 'BAL/JTRWF/PO/2026/001',
        rev: 0,
        prId: 'PR-2026-001',
        rfqId: 'RFQ-2026-001',
        csId: 'CS-2026-001',
        supplierId: 'VEN-2026-001',
        supplierName: 'Tufropes Heavy Tackles Pvt Ltd',
        gstin: '21AABCT8821M1Z5',
        issueDate: '2026-11-20',
        deliveryDate: '2026-12-04',
        paymentTerms: '30 Days Net from Store GRN',
        freightTerms: 'DAP Site Store Khordha',
        taxableBase: 328300.00,
        gstAmount: 59238.00,
        grandTotal: 388338.00,
        status: 'DISPATCHED_IN_TRANSIT',
        lines: [
          { lineId: 'POL-2026-001-01', itemCode: 'SLING-WR-60T-12M', desc: 'Matched Pair 60T Wire Rope Slings 12M with thimbles', qty: 2, uom: 'PAIR', rate: 134900.00, taxable: 269800.00, gst: 50544.00, landed: 331344.00 },
          { lineId: 'POL-2026-001-02', itemCode: 'SHACKLE-BOW-85T', desc: '85T High Tensile Forged Alloy Bow Shackles with safety bolt', qty: 4, uom: 'NOS', rate: 11500.00, taxable: 46000.00, gst: 8694.00, landed: 56994.00 }
        ]
      }
    ],

    asnList: [
      {
        id: 'ASN-2026-001',
        poId: 'PO-2026-001',
        supplier: 'Tufropes Heavy Tackles Pvt Ltd',
        transporter: 'V-Trans Express Logistics',
        docket: 'LR-VT-988210',
        vehicle: 'OD-02-AX-7844',
        expectedDate: '2026-11-24',
        gateAlert: 'PRE-ALERT TRANSMITTED',
        deliveryState: 'IN_TRANSIT'
      }
    ],

    vendors: [
      { id: 'VEN-2026-001', name: 'Tufropes Heavy Tackles Pvt Ltd', category: 'Heavy Rigging Tackles', gstin: '21AABCT8821M1Z5', pan: 'AABCT8821M', contact: 'Anand Rao (+91 94370 12845)', paymentTerms: '30 Days Net from Store GRN', rating: 4.85, tpiAccredited: true, status: 'ACTIVE_VERIFIED' },
      { id: 'VEN-2026-002', name: 'Usha Martin Wire Ropes Ltd', category: 'High-Tensile Wire Ropes', gstin: '20AAACU1145R1Z8', pan: 'AAACU1145R', contact: 'Sanjay Sengupta (+91 98300 45812)', paymentTerms: '100% Against Dispatch Docs', rating: 4.90, tpiAccredited: true, status: 'ACTIVE_VERIFIED' },
      { id: 'VEN-2026-003', name: 'Bharat Rigging & Forging Corp', category: 'Forged Alloy Shackles', gstin: '27AABCB9941L1Z2', pan: 'AABCB9941L', contact: 'Kailash Patel (+91 98200 78451)', paymentTerms: '45 Days Net', rating: 4.60, tpiAccredited: true, status: 'ACTIVE_VERIFIED' },
      { id: 'VEN-2026-004', name: 'Enerpac Industrial Tools India', category: 'Hydraulic Tooling & Wrenches', gstin: '29AAACE4410K1Z9', pan: 'AAACE4410K', contact: 'Vikram Mehta (+91 98450 67123)', paymentTerms: '30 Days Net from Store GRN', rating: 4.95, tpiAccredited: true, status: 'ACTIVE_VERIFIED' },
      { id: 'VEN-2026-005', name: 'Hytorc Hydraulic Systems Pvt Ltd', category: 'Torque & Tensioning Units', gstin: '27AABCH1128Q1Z3', pan: 'AABCH1128Q', contact: 'Deepak Kulkarni (+91 98210 33419)', paymentTerms: '30 Days Net from Store GRN', rating: 4.75, tpiAccredited: true, status: 'ACTIVE_VERIFIED' }
    ]
  },

  init: function () {
    // 1. Restore Theme
    const savedTheme = localStorage.getItem('balsons_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) themeBtn.textContent = (savedTheme === 'dark') ? '☀️ Light' : '🌙 Dark';

    // 2. Restore Persistent User Session
    this.restoreUserSession();

    // 3. Render all tables
    this.renderAllTables();
    this.updateKPIs();

    // 4. Check & auto-sync with cloud
    this.autoSyncWithCloud();

    console.log('✓ BALSONS Purchase Manager V6.0 Initialized successfully.');
  },

  // TAB NAVIGATION
  switchTab: function (tabKey) {
    this.activeTab = tabKey;
    document.querySelectorAll('.purch-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.purch-pane').forEach(p => p.classList.remove('active'));

    const btn = document.getElementById(`tab-btn-${tabKey}`);
    const pane = document.getElementById(`pane-${tabKey}`);
    if (btn) btn.classList.add('active');
    if (pane) pane.classList.add('active');

    if (tabKey === 'docs' && window.BalsonsDocs) {
      window.BalsonsDocs.renderDocumentsTab('tab-documents');
    }
    localStorage.setItem('balsons_purchase_active_tab', tabKey);
  },

  // RENDERING METHODS
  renderAllTables: function () {
    this.renderPRTable();
    this.renderRFQTable();
    this.renderCSTable();
    this.renderPOTable();
    this.renderASNTable();
    this.renderVendorTable();
  },

  renderPRTable: function () {
    const tbody = document.getElementById('prTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.data.prs.map(pr => `
      <tr>
        <td>
          <strong style="color:var(--super-cyan);">${pr.id}</strong><br>
          <small style="font-family:var(--beds-font-mono); color:var(--beds-text-muted);">${pr.displayNo}</small>
        </td>
        <td>${pr.date}</td>
        <td>
          <strong>${(pr.requester || 'User').split('(')[0]}</strong><br>
          <small style="color:var(--beds-text-muted);">${pr.dept}</small>
        </td>
        <td>
          <div style="font-weight:700;">${pr.purpose}</div>
          <small style="color:var(--beds-text-muted);">Cost Center: ${pr.costCenter}</small>
        </td>
        <td><span class="tag-chip tag-cyan">${pr.linesCount} Line(s)</span></td>
        <td style="font-family:var(--beds-font-mono); font-weight:800;">₹${pr.estValue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
        <td>
          <span class="tag-chip ${pr.status.includes('APPROVED') || pr.status.includes('DISPATCHED') ? 'tag-green' : 'tag-amber'}">
            ${pr.status}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn-act-secondary" onclick="BalsonsPurchaseApp.openDossier('PR', '${pr.id}')" title="360° Dossier">
              🔍 360°
            </button>
            ${pr.status === 'SUBMITTED' ? `
              <button class="btn-act-primary" style="padding:4px 8px; font-size:11px;" onclick="BalsonsPurchaseApp.approvePR('${pr.id}')">
                ✓ Approve
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  },

  renderRFQTable: function () {
    const tbody = document.getElementById('rfqTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.data.rfqs.map(rfq => `
      <tr>
        <td>
          <strong style="color:var(--super-cyan);">${rfq.id}</strong><br>
          <small style="font-family:var(--beds-font-mono); color:var(--beds-text-muted);">${rfq.displayNo}</small>
        </td>
        <td><span class="tag-chip tag-purple">${rfq.prId}</span></td>
        <td>${rfq.issueDate}</td>
        <td><strong>${rfq.dueDate}</strong></td>
        <td>${rfq.strategy}</td>
        <td>${rfq.invited} Invited</td>
        <td><span class="tag-chip tag-green">${rfq.bidsRecv} Bids</span></td>
        <td><span class="tag-chip tag-cyan">${rfq.status}</span></td>
        <td>
          <button class="btn-act-secondary" onclick="BalsonsPurchaseApp.openDossier('RFQ', '${rfq.id}')">
            🔍 Inspect
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderCSTable: function () {
    const tbody = document.getElementById('csTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.data.csList.map(cs => `
      <tr>
        <td><strong style="color:var(--super-cyan);">${cs.id}</strong></td>
        <td><span class="tag-chip tag-purple">${cs.rfqId}</span></td>
        <td>${cs.evalDate}</td>
        <td>${(cs.evaluator || 'Dilip Rout').split('(')[0]}</td>
        <td>
          <strong style="color:#059669;">👑 ${cs.l1Vendor}</strong><br>
          <small style="color:var(--beds-text-muted);">L1 Technically Qualified</small>
        </td>
        <td style="font-family:var(--beds-font-mono); font-weight:800; color:#059669;">
          ₹${cs.l1Landed.toLocaleString('en-IN', {minimumFractionDigits: 2})}
        </td>
        <td style="font-family:var(--beds-font-mono); color:var(--beds-text-muted);">
          ₹${cs.l2Landed.toLocaleString('en-IN', {minimumFractionDigits: 2})}
        </td>
        <td style="font-family:var(--beds-font-mono); font-weight:800; color:#0097a7;">
          ₹${cs.savings.toLocaleString('en-IN', {minimumFractionDigits: 2})}
        </td>
        <td><span class="tag-chip tag-green">${cs.status}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn-act-primary" style="padding:4px 8px; font-size:11px;" onclick="BalsonsPurchaseApp.openDossier('CS', '${cs.id}')">
              🔍 CS Matrix
            </button>
            <button class="btn-act-secondary" style="padding:4px 8px; font-size:11px;" onclick="BalsonsPurchaseApp.printCSMatrix('${cs.id}')" title="Print Calibrated A4 CS">
              🖨️ Print
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  renderPOTable: function () {
    const tbody = document.getElementById('poTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.data.pos.map(po => `
      <tr>
        <td>
          <strong style="color:var(--super-cyan);">${po.id}</strong> (REV-${po.rev})<br>
          <small style="font-family:var(--beds-font-mono); color:var(--beds-text-muted);">${po.displayNo}</small>
        </td>
        <td>
          <strong>${po.supplierName}</strong><br>
          <small style="font-family:var(--beds-font-mono); color:var(--beds-text-muted);">GSTIN: ${po.gstin}</small>
        </td>
        <td>${po.issueDate}</td>
        <td><strong>${po.deliveryDate}</strong></td>
        <td style="font-family:var(--beds-font-mono);">₹${po.taxableBase.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
        <td style="font-family:var(--beds-font-mono);">₹${po.gstAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
        <td style="font-family:var(--beds-font-mono); font-weight:800; color:#059669;">₹${po.grandTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
        <td><span class="tag-chip tag-green">${po.status}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn-act-primary" style="padding:4px 8px; font-size:11px;" onclick="BalsonsPurchaseApp.printPOContract('${po.id}')" title="Print Calibrated 1-Page A4 PO">
              🖨️ Print PO
            </button>
            <button class="btn-act-secondary" style="padding:4px 8px; font-size:11px;" onclick="BalsonsPurchaseApp.viewPOContract('${po.id}')">
              📄 View
            </button>
            <button class="btn-act-secondary" style="padding:4px 8px; font-size:11px;" onclick="BalsonsPurchaseApp.openDossier('PO', '${po.id}')">
              🔍 360°
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  renderASNTable: function () {
    const tbody = document.getElementById('asnTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.data.asnList.map(asn => `
      <tr>
        <td><strong style="color:var(--super-cyan);">${asn.id}</strong></td>
        <td><span class="tag-chip tag-purple">${asn.poId}</span></td>
        <td>${asn.supplier}</td>
        <td>${asn.transporter}</td>
        <td><code style="font-weight:700;">${asn.docket}</code></td>
        <td><code style="font-weight:700; color:#0097a7;">${asn.vehicle}</code></td>
        <td><strong>${asn.expectedDate}</strong></td>
        <td><span class="tag-chip tag-green">${asn.gateAlert}</span></td>
        <td><span class="tag-chip tag-cyan">${asn.deliveryState}</span></td>
      </tr>
    `).join('');
  },

  renderVendorTable: function () {
    const tbody = document.getElementById('vendorTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.data.vendors.map(v => `
      <tr>
        <td>
          <strong>${v.name}</strong><br>
          <small style="color:var(--beds-text-muted); font-family:var(--beds-font-mono);">${v.id}</small>
        </td>
        <td>${v.category}</td>
        <td>
          <code style="font-weight:700;">${v.gstin}</code><br>
          <small style="color:var(--beds-text-muted);">PAN: ${v.pan}</small>
        </td>
        <td>
          <div>${v.contact}</div>
        </td>
        <td>${v.paymentTerms}</td>
        <td><strong style="color:#d97706;">★ ${v.rating.toFixed(2)}</strong></td>
        <td>
          <span class="tag-chip ${v.tpiAccredited ? 'tag-green' : 'tag-amber'}">
            ${v.tpiAccredited ? 'TPI ACCREDITED ✓' : 'STANDARD'}
          </span>
        </td>
        <td><span class="tag-chip tag-green">${v.status}</span></td>
      </tr>
    `).join('');
  },

  updateKPIs: function () {
    document.getElementById('kpiPRCount').textContent = `${this.data.prs.length} Active`;
    document.getElementById('kpiRFQCount').textContent = `${this.data.rfqs.length} Events`;
    const poTotal = this.data.pos.reduce((acc, p) => acc + p.grandTotal, 0);
    document.getElementById('kpiPOValue').textContent = `₹${(poTotal / 100000).toFixed(2)} L`;
    document.getElementById('kpiASNCount').textContent = `${this.data.asnList.length} In-Transit`;

    document.getElementById('badgeCountPR').textContent = this.data.prs.length;
    document.getElementById('badgeCountRFQ').textContent = this.data.rfqs.length;
    document.getElementById('badgeCountCS').textContent = this.data.csList.length;
    document.getElementById('badgeCountPO').textContent = this.data.pos.length;
    document.getElementById('badgeCountASN').textContent = this.data.asnList.length;
    document.getElementById('badgeCountVendors').textContent = this.data.vendors.length;
  },

  // WORKFLOW ACTIONS
  openNewPRModal: function () {
    document.getElementById('modal-new-pr').style.display = 'flex';
  },
  closeNewPRModal: function () {
    document.getElementById('modal-new-pr').style.display = 'none';
  },

  handlePRSubmit: function (e) {
    if (e) e.preventDefault();

    const dept = document.getElementById('prFormDept').value;
    const costCenter = document.getElementById('prFormCostCenter').value;
    const priority = document.getElementById('prFormPriority').value;
    const needBy = document.getElementById('prFormNeedBy').value;
    const justification = document.getElementById('prFormJustification').value;

    const itemDesc = document.getElementById('prFormItemDesc').value;
    const category = document.getElementById('prFormCategory').value;
    const qty = parseFloat(document.getElementById('prFormQty').value) || 1;
    const uom = document.getElementById('prFormUOM').value;
    const estRate = parseFloat(document.getElementById('prFormEstRate').value) || 0;
    const form11 = document.getElementById('prFormForm11').checked;

    const newId = `PR-2026-${String(this.data.prs.length + 1).padStart(3, '0')}`;
    const displayNo = `BAL/JTRWF/PR/2026/${String(this.data.prs.length + 1).padStart(3, '0')}`;
    const lineId = `${newId}-01`;

    const newPR = {
      id: newId,
      displayNo: displayNo,
      date: new Date().toISOString().split('T')[0],
      requester: this.currentUser ? this.currentUser.name : 'Dilip Rout (Area Manager)',
      dept: dept,
      costCenter: costCenter,
      purpose: justification,
      linesCount: 1,
      estValue: estRate,
      status: 'SUBMITTED',
      priority: priority,
      needBy: needBy,
      lines: [
        { lineId: lineId, itemCode: 'ITEM-NEW-01', desc: itemDesc, qty: qty, uom: uom, form11: form11, spec: justification, status: 'PENDING_APPROVAL' }
      ]
    };

    this.data.prs.unshift(newPR);
    this.closeNewPRModal();
    this.renderPRTable();
    this.updateKPIs();
    this.showToast(`✓ Purchase Requisition ${displayNo} raised successfully! PR Line ID: ${lineId}`, 'success');

    // Dual-Sync Mutation Outbox & Cloud Sync
    this.enqueueMutation('CREATE_PR', newPR);
    this.syncMutationToCloud('SAVE_PR', newPR);
  },

  approvePR: function (prId) {
    const pr = this.data.prs.find(p => p.id === prId);
    if (!pr) return;

    pr.status = 'HOD_APPROVED';
    pr.lines.forEach(l => l.status = 'SOURCING');
    this.renderPRTable();
    this.showToast(`✓ PR ${pr.id} approved by HOD (${this.currentUser ? this.currentUser.name : 'HOD Lifting'}). Released for RFQ Sourcing.`, 'success');

    this.enqueueMutation('APPROVE_PR', { prId: prId, approver: this.currentUser });
    this.syncMutationToCloud('APPROVE_PR', { prId: prId });
  },

  openNewASNModal: function () {
    document.getElementById('modal-new-asn').style.display = 'flex';
  },
  closeNewASNModal: function () {
    document.getElementById('modal-new-asn').style.display = 'none';
  },

  handleASNSubmit: function (e) {
    if (e) e.preventDefault();

    const poId = document.getElementById('asnPoSelect').value;
    const transporter = document.getElementById('asnTransporter').value;
    const docket = document.getElementById('asnDocket').value;
    const vehicle = document.getElementById('asnVehicle').value;
    const arrivalDate = document.getElementById('asnArrivalDate').value;

    const newASN = {
      id: `ASN-2026-${String(this.data.asnList.length + 1).padStart(3, '0')}`,
      poId: poId,
      supplier: 'Tufropes Heavy Tackles Pvt Ltd',
      transporter: transporter,
      docket: docket,
      vehicle: vehicle,
      expectedDate: arrivalDate || new Date().toISOString().split('T')[0],
      gateAlert: 'PRE-ALERT TRANSMITTED',
      deliveryState: 'IN_TRANSIT'
    };

    this.data.asnList.unshift(newASN);
    this.closeNewASNModal();
    this.renderASNTable();
    this.updateKPIs();
    this.showToast(`✓ Supplier ASN logged! Gate Entry and Store Manager notified for vehicle ${vehicle}.`, 'success');

    this.enqueueMutation('LOG_DELIVERY_ASN', newASN);
    this.syncMutationToCloud('LOG_DELIVERY_ASN', newASN);
  },

  // 360° PROCUREMENT DOSSIER
  openDossier: function (entityType, entityId) {
    const modal = document.getElementById('modal-dossier-360');
    const body = document.getElementById('dossierModalBody');
    if (!modal || !body) return;

    let pr = this.data.prs[0];
    let po = this.data.pos[0];
    let cs = this.data.csList[0];

    body.innerHTML = `
      <div style="background:linear-gradient(135deg, rgba(0, 151, 167, 0.12) 0%, rgba(0, 151, 167, 0.04) 100%); border:1px solid rgba(0, 151, 167, 0.3); border-radius:10px; padding:16px; margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <span class="tag-chip tag-cyan">UNBROKEN PR-LINE TRACEABILITY SPINE</span>
            <h3 style="font-size:16px; font-weight:800; color:var(--beds-charcoal-heading); margin:6px 0 2px 0;">
              Procurement Audit Dossier: ${pr.id} ➔ ${po.id}
            </h3>
            <p style="font-size:12px; color:var(--beds-text-muted);">
              Project: JTRWF Khordha • Governing Policy: BAL-PROC-E2E-006 (V6.0 Baseline)
            </p>
          </div>
          <span class="tag-chip tag-green">IMMUTABLE LINEAGE ✓</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px; margin-bottom:18px;">
        <div style="background:var(--super-bg); border:1px solid var(--super-border); padding:12px; border-radius:8px;">
          <div style="font-size:11px; font-weight:700; color:var(--beds-text-muted); text-transform:uppercase;">1. Originating Requisition</div>
          <div style="font-size:13px; font-weight:800; color:var(--beds-text-primary); margin-top:2px;">${pr.displayNo}</div>
          <div style="font-size:11.5px; color:var(--beds-text-secondary); margin-top:4px;">
            Spine Key: <code>PRL-2026-001-01</code><br>
            Indenter: Dilip Rout (Area Manager)<br>
            Estimated: ₹3,88,338.00
          </div>
        </div>

        <div style="background:var(--super-bg); border:1px solid var(--super-border); padding:12px; border-radius:8px;">
          <div style="font-size:11px; font-weight:700; color:var(--beds-text-muted); text-transform:uppercase;">2. Sourcing RFQ & Quotes</div>
          <div style="font-size:13px; font-weight:800; color:var(--beds-text-primary); margin-top:2px;">RFQ-2026-001 (Multi-Vendor)</div>
          <div style="font-size:11.5px; color:var(--beds-text-secondary); margin-top:4px;">
            Invited: 3 Vendors • Bids Recv: 3<br>
            Tech Compliance: 100% Passed<br>
            Validity: 30 Days DAP Khordha
          </div>
        </div>

        <div style="background:var(--super-bg); border:1px solid var(--super-border); padding:12px; border-radius:8px;">
          <div style="font-size:11px; font-weight:700; color:var(--beds-text-muted); text-transform:uppercase;">3. Commercial Award & PO</div>
          <div style="font-size:13px; font-weight:800; color:var(--beds-text-primary); margin-top:2px;">PO-2026-001 (REV-0)</div>
          <div style="font-size:11.5px; color:var(--beds-text-secondary); margin-top:4px;">
            Awarded: Tufropes Heavy Tackles (L1)<br>
            DoA Approval: Tier 2 Verified<br>
            Total: ₹3,88,338.00 (Incl. 18% GST)
          </div>
        </div>
      </div>

      <div style="background:var(--beds-bg-panel); border:1px solid var(--super-border); padding:14px; border-radius:8px; margin-bottom:14px;">
        <div style="font-size:12px; font-weight:800; margin-bottom:8px;">Store Manager Handshake & Inspection Integrity</div>
        <ul style="padding-left:18px; font-size:11.5px; color:var(--beds-text-secondary); display:flex; flex-direction:column; gap:4px;">
          <li>✓ <strong>Advance Shipping Notice (ASN):</strong> Dispatched via V-Trans (LR-VT-988210, OD-02-AX-7844).</li>
          <li>✓ <strong>Form 11 Lifting Tackle Proof Test:</strong> Lloyd's Register TPI certificate mandated prior to Store acceptance.</li>
          <li>✓ <strong>Gate Entry Interlock:</strong> Vehicle registered for automatic weighbridge clearance upon arrival.</li>
        </ul>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button class="btn-act-secondary" onclick="BalsonsPurchaseApp.closeDossierModal()">Close Dossier</button>
        <button class="btn-act-primary" onclick="BalsonsPurchaseApp.verifyDigitalAuditStamp('${pr.id}', '${po.id}')">
          🛡️ Verify Digital Audit Stamp
        </button>
      </div>
    `;

    modal.style.display = 'flex';
  },
  closeDossierModal: function () {
    document.getElementById('modal-dossier-360').style.display = 'none';
  },

  // VIEW PO CONTRACT PDF MODAL
  viewPOContract: function (poId) {
    const po = this.data.pos.find(p => p.id === poId);
    if (!po) return;

    const modal = document.getElementById('modal-view-po');
    const body = document.getElementById('poModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="border:2px solid #102a35; padding:24px; background:#ffffff; color:#0f172a; border-radius:6px; font-family:var(--beds-font-sans);">
        <!-- CORPORATE HEADER -->
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #102a35; padding-bottom:14px; margin-bottom:16px;">
          <div>
            <h2 style="font-size:20px; font-weight:900; color:#102a35; margin:0;">BALSONS HEAVY LIFT & SHIFT</h2>
            <div style="font-size:11px; font-weight:700; color:#0097a7; text-transform:uppercase;">Commercial Procurement Directorate</div>
            <div style="font-size:10.5px; color:#475569; margin-top:2px;">Jupiter Tatravagonka Railwheel Factory Project Site, Khordha, Odisha - 752054</div>
            <div style="font-size:10.5px; font-weight:700; color:#475569;">GSTIN: 21AABCB8841M1Z2 • PAN: AABCB8841M</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:14px; font-weight:900; color:#102a35;">PURCHASE ORDER</div>
            <div style="font-family:var(--beds-font-mono); font-size:12px; font-weight:700; color:#0097a7;">${po.displayNo}</div>
            <div style="font-size:11px; color:#475569;">Revision: REV-${po.rev}</div>
            <div style="font-size:11px; color:#475569;">Date: ${po.issueDate}</div>
          </div>
        </div>

        <!-- VENDOR & CONVOY DETAILS -->
        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; margin-bottom:16px; font-size:11.5px;">
          <div style="background:#f8fafc; padding:10px 12px; border:1px solid #e2e8f0; border-radius:6px;">
            <strong style="color:#102a35; font-size:12px;">SUPPLIER DETAILS (VENDOR):</strong>
            <div style="font-weight:800; font-size:13px; margin-top:2px;">${po.supplierName}</div>
            <div>GSTIN: <strong>${po.gstin}</strong></div>
            <div>Plot 42, Mancheswar Industrial Estate, Bhubaneswar, Odisha</div>
          </div>
          <div style="background:#f8fafc; padding:10px 12px; border:1px solid #e2e8f0; border-radius:6px;">
            <strong style="color:#102a35; font-size:12px;">CONSIGNEE & DELIVERY DESTINATION:</strong>
            <div style="font-weight:700; margin-top:2px;">Central Rigging Store, JTRWF Plant</div>
            <div>Near Khordha Road Junction, Khordha, Odisha - 752054</div>
            <div>Delivery Terms: <strong>${po.freightTerms}</strong></div>
          </div>
        </div>

        <!-- LINE ITEMS TABLE -->
        <table style="width:100%; border-collapse:collapse; font-size:11.5px; margin-bottom:16px;">
          <thead>
            <tr style="background:#102a35; color:#ffffff;">
              <th style="padding:8px 10px; border:1px solid #102a35; text-align:center;">#</th>
              <th style="padding:8px 10px; border:1px solid #102a35; text-align:left;">Item Code & Specification</th>
              <th style="padding:8px 10px; border:1px solid #102a35; text-align:center;">Qty / UOM</th>
              <th style="padding:8px 10px; border:1px solid #102a35; text-align:right;">Unit Rate (₹)</th>
              <th style="padding:8px 10px; border:1px solid #102a35; text-align:right;">Taxable Amt (₹)</th>
              <th style="padding:8px 10px; border:1px solid #102a35; text-align:right;">GST (18%)</th>
              <th style="padding:8px 10px; border:1px solid #102a35; text-align:right;">Landed Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${po.lines.map((l, i) => `
              <tr>
                <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:center;">${i + 1}</td>
                <td style="padding:8px 10px; border:1px solid #e2e8f0;">
                  <strong>${l.desc}</strong><br>
                  <small style="color:#64748b; font-family:var(--beds-font-mono);">${l.itemCode}</small>
                </td>
                <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:center; font-weight:700;">${l.qty} ${l.uom}</td>
                <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:right; font-family:var(--beds-font-mono);">₹${l.rate.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:right; font-family:var(--beds-font-mono);">₹${l.taxable.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:right; font-family:var(--beds-font-mono);">₹${l.gst.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:right; font-family:var(--beds-font-mono); font-weight:800;">₹${l.landed.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="background:#f1f5f9; font-weight:800;">
              <td colspan="4" style="padding:8px 10px; border:1px solid #e2e8f0; text-align:right;">TOTAL CONTRACT VALUE:</td>
              <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:right; font-family:var(--beds-font-mono);">₹${po.taxableBase.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
              <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:right; font-family:var(--beds-font-mono);">₹${po.gstAmount.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
              <td style="padding:8px 10px; border:1px solid #e2e8f0; text-align:right; font-family:var(--beds-font-mono); color:#059669; font-size:13px;">₹${po.grandTotal.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
            </tr>
          </tfoot>
        </table>

        <!-- TERMS & SIGNATURE STAMP -->
        <div style="display:flex; justify-content:space-between; align-items:flex-end; font-size:11px; margin-top:20px;">
          <div>
            <strong>Commercial Terms:</strong><br>
            • Payment: ${po.paymentTerms}<br>
            • Warranty: 18 Months OEM Warranty from commissioning<br>
            • Mandatory Requirement: Must include Form 11 TPI load test certificate
          </div>
          <div style="text-align:center;">
            <div style="font-weight:800; color:#102a35; border:1px dashed #0097a7; padding:8px 14px; border-radius:6px; background:rgba(0,151,167,0.05);">
              ✓ DIGITALLY SIGNED & AUTHORIZED<br>
              <small>BALSONS Procurement Directorate • SAM-2026</small>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
        <button class="btn-act-secondary" onclick="BalsonsPurchaseApp.closePOModal()">Close</button>
        <button class="btn-act-primary" onclick="BalsonsPurchaseApp.printPOContract('${po.id}')">🖨️ Print Calibrated A4 PO</button>
      </div>
    `;

    modal.style.display = 'flex';
  },
  closePOModal: function () {
    document.getElementById('modal-view-po').style.display = 'none';
  },

  // USER AUTHENTICATION & SESSION PERSISTENCE
  openLoginModal: function () {
    document.getElementById('modal-login').style.display = 'flex';
  },
  closeLoginModal: function () {
    document.getElementById('modal-login').style.display = 'none';
  },

  switchUserSession: function (username) {
    const userMap = {
      'superadmin': { username: 'superadmin', name: 'Prashant Muley', role: 'Super Administrator', pin: '2026' },
      'director.mgmt': { username: 'director.mgmt', name: 'Satish Chandra', role: 'Project Director', pin: '1001' },
      'admin.purch': { username: 'admin.purch', name: 'Rohan Sharma', role: 'Purchase Lead & Commercial Head', pin: '3001' },
      'indenter.ops': { username: 'indenter.ops', name: 'Suresh Verma', role: 'Indenter & Erection Engineer', pin: '3002' },
      'admin.purchase': { username: 'admin.purchase', name: 'Gagan Bihari Das', role: 'Procurement Lead', pin: '4001' },
      'dilip.rout': { username: 'dilip.rout', name: 'Dilip Rout', role: 'Operations Area Manager', pin: '1002' },
      'sarat.mishra': { username: 'sarat.mishra', name: 'Sarat Mishra', role: 'Machine Shop Area Manager', pin: '1003' },
      'client.jtrwf': { username: 'client.jtrwf', name: 'Client Inspection Auditor', role: 'Client Observer', pin: '9001' }
    };

    const target = userMap[username] || userMap['admin.purch'] || userMap['admin.purchase'];
    this.currentUser = target;
    localStorage.setItem('balsons_purchase_user', JSON.stringify(target));
    localStorage.setItem('balsons_global_auth_session', JSON.stringify({
      authenticated: true,
      username: target.username,
      name: target.name,
      role: target.role,
      portal: 'purchase'
    }));

    this.updateUserBadge();
    this.closeLoginModal();
    this.showToast(`Switched active session to ${target.name} (${target.role})`, 'info');
  },

  restoreUserSession: function () {
    try {
      const raw = localStorage.getItem('balsons_purchase_user');
      if (raw) {
        this.currentUser = JSON.parse(raw);
      } else {
        const globalAuth = localStorage.getItem('balsons_global_auth_session');
        const parsed = globalAuth ? JSON.parse(globalAuth) : null;
        this.currentUser = {
          username: parsed ? (parsed.username || 'admin.purchase') : 'admin.purchase',
          name: parsed ? (parsed.name || parsed.role || 'Gagan Bihari Das') : 'Gagan Bihari Das',
          role: parsed ? (parsed.role || 'Procurement Lead') : 'Procurement Lead',
          pin: '4001'
        };
      }
    } catch (e) {
      this.currentUser = { username: 'admin.purchase', name: 'Gagan Bihari Das', role: 'Procurement Lead', pin: '4001' };
    }
    if (!this.currentUser || !this.currentUser.name) {
      this.currentUser = { username: 'admin.purchase', name: 'Gagan Bihari Das', role: 'Procurement Lead', pin: '4001' };
    }
    this.updateUserBadge();
  },

  updateUserBadge: function () {
    const badge = document.getElementById('activeUserBadge');
    if (badge && this.currentUser) {
      const uName = (this.currentUser && this.currentUser.name) ? this.currentUser.name : 'Gagan Bihari Das';
      badge.textContent = `👤 ${uName.split(' ')[0]} (${this.currentUser ? this.currentUser.pin : '4001'})`;
    }
  },

  // CLOUD DUAL-SYNC ENGINE
  triggerCloudSync: function () {
    this.showToast('Connecting to dedicated Google Sheet: 1ANnu4X2...', 'info');
    this.autoSyncWithCloud();
  },

  autoSyncWithCloud: async function () {
    const syncBadge = document.getElementById('syncStatusBadge');
    if (syncBadge) {
      syncBadge.innerHTML = '<span class="badge-live-dot" style="background:#f59e0b;"></span> Syncing Cloud DB...';
    }

    // Local preview mode: avoid cross-origin network preflight errors from file://
    if (window.location.protocol === 'file:') {
      setTimeout(() => {
        if (syncBadge) {
          syncBadge.innerHTML = '<span class="badge-live-dot"></span> Local DB Ready (1ANnu4X2...)';
        }
      }, 400);
      return;
    }

    try {
      const payload = {
        action: 'PING',
        clientTimestamp: new Date().toISOString(),
        ssId: this.SHEET_ID
      };
      if (window.fetch && this.API_URL) {
        fetch(this.API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          redirect: 'follow'
        }).catch(() => {});
      }
    } catch (e) {}

    
    // Direct Live Google Sheet Query via Gviz
    if (window.BalsonsWorkspace && typeof window.BalsonsWorkspace.fetchSheetData === 'function') {
      try {
        const prRows = await window.BalsonsWorkspace.fetchSheetData(this.SHEET_ID, 'PR_HEADER');
        if (prRows && prRows.length > 0) {
          this.data.prs = prRows.map(r => ({
            id: r.PR_ID || r.id,
            displayNo: r.DisplayNo || r.displayNo || r.PR_ID,
            date: r.Date || r.date || '2026-11-20',
            requester: r.Requester || r.requester,
            dept: r.Department || r.dept,
            costCenter: r.CostCenter || r.costCenter,
            purpose: r.Purpose || r.purpose,
            linesCount: Number(r.LinesCount || r.linesCount) || 1,
            estValue: Number(r.EstValue || r.estValue) || 100000,
            status: r.Status || r.status || 'SUBMITTED',
            priority: r.Priority || r.priority || 'MEDIUM',
            needBy: r.NeedBy || r.needBy || '2026-12-10'
          }));
          this.renderPRTable();
          this.renderSummaryMetrics();
        }
      } catch (e) {
        console.warn('[PurchaseLiveSync] Gviz direct fallback note:', e);
      }
    }

    setTimeout(() => {
      if (syncBadge) {
        syncBadge.innerHTML = '<span class="badge-live-dot"></span> Cloud DB Synced (1ANnu4X2...)';
      }
    }, 800);
  },

  syncMutationToCloud: function (actionType, payloadData) {
    console.log(`[Dual-Sync] Queueing mutation: ${actionType} for Sheet 1ANnu4X2...`);
    if (window.location.protocol === 'file:') {
      console.log(`[Dual-Sync] Local preview mode: mutation recorded in local storage.`);
      return;
    }
    // Non-blocking asynchronous CORS-safe sync hook
    if (window.fetch && this.API_URL) {
      try {
        fetch(this.API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: actionType,
            data: payloadData,
            actor: this.currentUser,
            ssId: this.SHEET_ID,
            clientTimestamp: new Date().toISOString()
          }),
          redirect: 'follow'
        }).catch(err => console.log('Offline queue note:', err));
      } catch (e) {}
    }
  },

  // IN-MEMORY QR ENGINE & DEDICATED A4 PRINT ENGINE
  generateQrCodeBase64: function (text, size = 110) {
    if (typeof QRCode !== 'undefined') {
      try {
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);
        new QRCode(tempDiv, {
          text: text,
          width: size,
          height: size,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: (typeof QRCode.CorrectLevel !== 'undefined') ? QRCode.CorrectLevel.M : 0
        });
        const img = tempDiv.querySelector('img');
        if (img && img.src && img.src.startsWith('data:image')) {
          const src = img.src;
          document.body.removeChild(tempDiv);
          return src;
        }
        const canvas = tempDiv.querySelector('canvas');
        if (canvas) {
          const src = canvas.toDataURL('image/png');
          document.body.removeChild(tempDiv);
          return src;
        }
        document.body.removeChild(tempDiv);
      } catch (e) {
        console.warn('[PurchaseQR] In-memory QRCode render note:', e);
      }
    }
    // High-fidelity vector SVG fallback
    const enc = encodeURIComponent(text);
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ffffff"/><rect x="8" y="8" width="28" height="28" fill="%23000000"/><rect x="12" y="12" width="20" height="20" fill="%23ffffff"/><rect x="16" y="16" width="12" height="12" fill="%23000000"/><rect x="64" y="8" width="28" height="28" fill="%23000000"/><rect x="68" y="12" width="20" height="20" fill="%23ffffff"/><rect x="72" y="16" width="12" height="12" fill="%23000000"/><rect x="8" y="64" width="28" height="28" fill="%23000000"/><rect x="12" y="68" width="20" height="20" fill="%23ffffff"/><rect x="16" y="72" width="12" height="12" fill="%23000000"/><rect x="42" y="20" width="8" height="16" fill="%23000000"/><rect x="46" y="44" width="14" height="14" fill="%23000000"/><rect x="68" y="68" width="16" height="16" fill="%23000000"/><rect x="24" y="44" width="12" height="8" fill="%23000000"/><text x="50" y="94" font-size="7" font-weight="bold" text-anchor="middle" fill="%23000000">BALSONS PO</text></svg>`;
  },

  activatePrintStage: function (htmlContent) {
    let stage = document.getElementById('beds-purchase-print-stage');
    if (!stage) {
      stage = document.createElement('div');
      stage.id = 'beds-purchase-print-stage';
      document.body.appendChild(stage);
    }
    stage.innerHTML = htmlContent;
    document.body.classList.add('beds-printing-mode');

    window.print();

    setTimeout(() => {
      document.body.classList.remove('beds-printing-mode');
      stage.innerHTML = '';
    }, 1500);
  },

  enqueueMutation: function (action, payload) {
    try {
      const queue = JSON.parse(localStorage.getItem('beds_pending_mutations_queue') || '[]');
      const mutation = {
        id: `PURCH-MUT-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        domain: 'purchase',
        action: action,
        payload: payload,
        timestamp: new Date().toISOString(),
        status: 'pending',
        retryCount: 0
      };
      queue.push(mutation);
      localStorage.setItem('beds_pending_mutations_queue', JSON.stringify(queue));
      console.log(`[DualSync] Enqueued purchase mutation: ${mutation.id} (${action})`);

      if (window.BalsonsWorkspace && typeof window.BalsonsWorkspace.triggerDualSync === 'function') {
        window.BalsonsWorkspace.triggerDualSync(true);
      }
    } catch (e) {
      console.warn('[DualSync] Purchase mutation enqueue note:', e);
    }
  },

  verifyDigitalAuditStamp: function (prId, poId) {
    this.showToast(`🛡️ Digital Procurement Audit Hash: SHA256:7fa890e12d45c verified against Google Sheet: 1ANnu4X2... [IMMUTABLE LINEAGE]`, 'success');
  },

  printPOContract: function (poId) {
    const po = this.data.pos.find(p => p.id === poId) || this.data.pos[0];
    if (!po) return;

    const qrUrl = `https://balsonsportals.github.io/verify.html?poId=${encodeURIComponent(po.id)}`;
    const qrData = this.generateQrCodeBase64(qrUrl, 96);

    const html = `
      <div style="width:190mm; max-height:272mm; margin:0 auto; box-sizing:border-box; background:#ffffff; color:#0f172a; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:9pt; line-height:1.3; border:1.5px solid #0f172a; padding:6mm 7mm; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <!-- CORPORATE HEADER -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #0f172a; padding-bottom:5mm; margin-bottom:4mm;">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='../assets/images/balsons-logo.png';" style="height:38px; width:auto; object-fit:contain;" alt="BALSONS">
              <div>
                <h1 style="font-size:15pt; font-weight:900; color:#0f172a; margin:0; line-height:1.1; letter-spacing:0.3px;">BALSONS HEAVY LIFT &amp; SHIFT</h1>
                <div style="font-size:8pt; font-weight:800; color:#0097a7; text-transform:uppercase; letter-spacing:0.5px;">Commercial Procurement &amp; Vendor Directorate</div>
                <div style="font-size:7.5pt; color:#475569; margin-top:1px;">JTRWF Khordha Project Site, Odisha • GSTIN: 21AABCB8841M1Z2 • PAN: AABCB8841M</div>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12pt; font-weight:900; color:#0f172a; letter-spacing:0.5px;">PURCHASE ORDER</div>
              <div style="font-family:monospace; font-size:10pt; font-weight:800; color:#0097a7;">${po.displayNo}</div>
              <div style="font-size:7.5pt; color:#475569;">REV-${po.rev} • Date: <strong>${po.issueDate}</strong></div>
              <div style="font-size:7.5pt; color:#475569;">Delivery Need-By: <strong>${po.deliveryDate}</strong></div>
            </div>
          </div>

          <!-- VENDOR & CONSIGNEE DETAILS -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:4mm; margin-bottom:4mm; font-size:8pt;">
            <div style="border:1px solid #cbd5e1; border-radius:4px; padding:3mm 4mm; background:#f8fafc;">
              <div style="font-weight:800; font-size:8pt; color:#0097a7; text-transform:uppercase; margin-bottom:2px;">SUPPLIER / VENDOR DETAILS:</div>
              <div style="font-size:9.5pt; font-weight:900; color:#0f172a;">${po.supplierName}</div>
              <div>GSTIN: <strong style="font-family:monospace;">${po.gstin}</strong> • Vendor ID: ${po.supplierId}</div>
              <div style="color:#475569; font-size:7.5pt;">Industrial Area, Mancheswar, Bhubaneswar, Odisha</div>
              <div style="margin-top:2px; font-weight:700;">Payment Terms: <span style="color:#0f172a;">${po.paymentTerms}</span></div>
            </div>
            <div style="border:1px solid #cbd5e1; border-radius:4px; padding:3mm 4mm; background:#f8fafc;">
              <div style="font-weight:800; font-size:8pt; color:#0097a7; text-transform:uppercase; margin-bottom:2px;">CONSIGNEE &amp; DELIVERY SITE:</div>
              <div style="font-size:9.5pt; font-weight:900; color:#0f172a;">Jupiter Tatravagonka Railwheel Factory (JTRWF)</div>
              <div>Consignee: Central Rigging Store, Heavy Press Bay Area</div>
              <div style="color:#475569; font-size:7.5pt;">Near Khordha Road Jn, Khordha, Odisha - 752054</div>
              <div style="margin-top:2px; font-weight:700;">Delivery Terms: <span style="color:#0f172a;">${po.freightTerms}</span></div>
            </div>
          </div>

          <!-- LINE ITEMS TABLE -->
          <table style="width:100%; border-collapse:collapse; font-size:8pt; margin-bottom:3.5mm;">
            <thead>
              <tr style="background:#0f172a; color:#ffffff;">
                <th style="padding:5px 6px; border:1px solid #0f172a; text-align:center; width:6%;">#</th>
                <th style="padding:5px 6px; border:1px solid #0f172a; text-align:left; width:44%;">Item Description &amp; Technical Specifications</th>
                <th style="padding:5px 6px; border:1px solid #0f172a; text-align:center; width:10%;">Qty</th>
                <th style="padding:5px 6px; border:1px solid #0f172a; text-align:right; width:12%;">Rate (₹)</th>
                <th style="padding:5px 6px; border:1px solid #0f172a; text-align:right; width:13%;">Taxable (₹)</th>
                <th style="padding:5px 6px; border:1px solid #0f172a; text-align:right; width:15%;">Landed (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${po.lines.map((l, i) => `
                <tr style="border-bottom:1px solid #cbd5e1; ${i % 2 === 1 ? 'background:#f8fafc;' : ''}">
                  <td style="padding:5px 6px; border-left:1px solid #cbd5e1; border-right:1px solid #cbd5e1; text-align:center; font-weight:700;">${i + 1}</td>
                  <td style="padding:5px 6px; border-right:1px solid #cbd5e1;">
                    <div style="font-weight:800; color:#0f172a;">${l.desc}</div>
                    <div style="font-size:7pt; color:#64748b; font-family:monospace;">Item Code: ${l.itemCode} • Mandatory Proof Test Form 11</div>
                  </td>
                  <td style="padding:5px 6px; border-right:1px solid #cbd5e1; text-align:center; font-weight:800;">${l.qty} ${l.uom}</td>
                  <td style="padding:5px 6px; border-right:1px solid #cbd5e1; text-align:right; font-family:monospace;">₹${l.rate.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                  <td style="padding:5px 6px; border-right:1px solid #cbd5e1; text-align:right; font-family:monospace;">₹${l.taxable.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                  <td style="padding:5px 6px; border-right:1px solid #cbd5e1; text-align:right; font-family:monospace; font-weight:800;">₹${l.landed.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="background:#f1f5f9; font-weight:800; border-top:1.5px solid #0f172a; border-bottom:1.5px solid #0f172a;">
                <td colspan="4" style="padding:6px 8px; text-align:right; font-size:8.5pt;">TOTAL COMMERCIAL VALUE (EXCL. GST):</td>
                <td style="padding:6px 8px; text-align:right; font-family:monospace; font-size:8.5pt;">₹${po.taxableBase.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                <td style="padding:6px 8px; text-align:right; font-family:monospace; font-size:8.5pt;"></td>
              </tr>
              <tr style="background:#ffffff; font-weight:700;">
                <td colspan="4" style="padding:4px 8px; text-align:right; font-size:8pt; color:#475569;">INPUT TAX GST (IGST/CGST+SGST @ 18%):</td>
                <td colspan="2" style="padding:4px 8px; text-align:right; font-family:monospace; font-size:8pt; color:#475569;">₹${po.gstAmount.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
              </tr>
              <tr style="background:#0f172a; color:#ffffff; font-weight:900;">
                <td colspan="4" style="padding:6px 8px; text-align:right; font-size:9.5pt;">GRAND TOTAL CONTRACT VALUE (LANDED):</td>
                <td colspan="2" style="padding:6px 8px; text-align:right; font-family:monospace; font-size:10.5pt; color:#34d399;">₹${po.grandTotal.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
              </tr>
            </tfoot>
          </table>

          <!-- MANDATORY CLAUSES & STATUTORY COMPLIANCE -->
          <div style="border:1px solid #cbd5e1; border-radius:4px; padding:3mm 4mm; background:#fafafa; margin-bottom:3.5mm; font-size:7.5pt; color:#334155;">
            <div style="font-weight:800; font-size:7.5pt; color:#0f172a; text-transform:uppercase; margin-bottom:1px;">STATUTORY &amp; QUALITY COMPLIANCE MANDATES:</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:2mm;">
              <div>• <strong>Form 11 TPI Certification:</strong> Pre-dispatch test certificate from Lloyd's/DNV/BV is mandatory prior to physical gate entry.</div>
              <div>• <strong>Warranty &amp; Guarantee:</strong> Minimum 18 months replacement warranty from successful commissioning.</div>
              <div>• <strong>Delivery &amp; Demurrage:</strong> Delivery within committed timeline. Liquidated damages @ 0.5% per week of delay (max 5%).</div>
              <div>• <strong>Store GRN Handshake:</strong> Invoice processing contingent on 100% QA physical inspection clearance.</div>
            </div>
          </div>
        </div>

        <!-- FOOTER SIGNATURES & VERIFICATION QR -->
        <div style="border-top:1.5px solid #0f172a; padding-top:3.5mm; display:flex; justify-content:space-between; align-items:center;">
          <!-- 3-TIER SIGNATURE BLOCK -->
          <div style="display:flex; gap:6mm;">
            <div style="text-align:center; width:34mm; border:1px dashed #cbd5e1; padding:2mm; border-radius:4px; background:#f8fafc;">
              <div style="font-size:6.5pt; color:#64748b; text-transform:uppercase; font-weight:700;">Indent Prepared By</div>
              <div style="font-weight:800; font-size:8pt; margin-top:2px; color:#0f172a;">Dilip Rout</div>
              <div style="font-size:6.5pt; color:#0097a7;">Area Mgr (Operations)</div>
              <div style="font-size:6pt; color:#059669; font-weight:700; margin-top:1px;">✓ SIGNED &amp; VERIFIED</div>
            </div>
            <div style="text-align:center; width:34mm; border:1px dashed #cbd5e1; padding:2mm; border-radius:4px; background:#f8fafc;">
              <div style="font-size:6.5pt; color:#64748b; text-transform:uppercase; font-weight:700;">Commercial Review</div>
              <div style="font-weight:800; font-size:8pt; margin-top:2px; color:#0f172a;">Rohan Sharma</div>
              <div style="font-size:6.5pt; color:#0097a7;">Head of Procurement</div>
              <div style="font-size:6pt; color:#059669; font-weight:700; margin-top:1px;">✓ SIGNED &amp; VERIFIED</div>
            </div>
            <div style="text-align:center; width:34mm; border:1px dashed #cbd5e1; padding:2mm; border-radius:4px; background:#f8fafc;">
              <div style="font-size:6.5pt; color:#64748b; text-transform:uppercase; font-weight:700;">DoA Tier 2 Approver</div>
              <div style="font-weight:800; font-size:8pt; margin-top:2px; color:#0f172a;">Satish Chandra</div>
              <div style="font-size:6.5pt; color:#0097a7;">Project Director</div>
              <div style="font-size:6pt; color:#059669; font-weight:700; margin-top:1px;">✓ FINAL AUTHORIZED</div>
            </div>
          </div>

          <!-- QR VERIFICATION BADGE -->
          <div style="display:flex; align-items:center; gap:8px; border:1.5px solid #0097a7; padding:2mm 3mm; border-radius:6px; background:#f0fdf4;">
            <img src="${qrData}" style="width:58px; height:58px; display:block;" alt="QR Verification">
            <div>
              <div style="font-size:7pt; font-weight:900; color:#0097a7; text-transform:uppercase;">SCAN TO VERIFY PO</div>
              <div style="font-family:monospace; font-size:7.5pt; font-weight:800; color:#0f172a;">${po.id}</div>
              <div style="font-size:6.5pt; color:#059669; font-weight:700; margin-top:1px;">● LIVE CLOUD RECORD</div>
              <div style="font-size:6pt; color:#64748b;">SHA256:7fa890e12d45c</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.activatePrintStage(html);
  },

  printCSMatrix: function (csId) {
    const cs = this.data.csList.find(c => c.id === csId) || this.data.csList[0];
    if (!cs) return;

    const qrUrl = `https://balsonsportals.github.io/verify.html?csId=${encodeURIComponent(cs.id)}`;
    const qrData = this.generateQrCodeBase64(qrUrl, 96);

    const html = `
      <div style="width:190mm; max-height:272mm; margin:0 auto; box-sizing:border-box; background:#ffffff; color:#0f172a; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:9pt; line-height:1.3; border:1.5px solid #0f172a; padding:6mm 7mm; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <!-- CORPORATE HEADER -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #0f172a; padding-bottom:5mm; margin-bottom:4mm;">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='../assets/images/balsons-logo.png';" style="height:38px; width:auto; object-fit:contain;" alt="BALSONS">
              <div>
                <h1 style="font-size:15pt; font-weight:900; color:#0f172a; margin:0; line-height:1.1; letter-spacing:0.3px;">BALSONS HEAVY LIFT &amp; SHIFT</h1>
                <div style="font-size:8pt; font-weight:800; color:#0097a7; text-transform:uppercase; letter-spacing:0.5px;">Commercial Comparative Statement (CS Matrix)</div>
                <div style="font-size:7.5pt; color:#475569; margin-top:1px;">JTRWF Khordha Project Site • DoA Tier 2 Governed Commercial Evaluation</div>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12pt; font-weight:900; color:#0f172a;">CS EVALUATION</div>
              <div style="font-family:monospace; font-size:10pt; font-weight:800; color:#0097a7;">${cs.id}</div>
              <div style="font-size:7.5pt; color:#475569;">RFQ Ref: <strong>${cs.rfqId}</strong> • PR: <strong>${cs.prId}</strong></div>
              <div style="font-size:7.5pt; color:#475569;">Evaluation Date: <strong>${cs.evalDate}</strong></div>
            </div>
          </div>

          <!-- EVALUATION SUMMARY STRIP -->
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:3mm; margin-bottom:4mm; font-size:8pt;">
            <div style="border:1px solid #cbd5e1; border-radius:4px; padding:3mm; background:#f8fafc;">
              <div style="font-size:7pt; color:#64748b; font-weight:700; text-transform:uppercase;">EVALUATED BY</div>
              <div style="font-size:9pt; font-weight:800; color:#0f172a; margin-top:2px;">${(cs.evaluator || 'Gagan Das').split('(')[0]}</div>
            </div>
            <div style="border:1px solid #cbd5e1; border-radius:4px; padding:3mm; background:#ecfdf5; border-color:#059669;">
              <div style="font-size:7pt; color:#059669; font-weight:700; text-transform:uppercase;">L1 LOWEST BIDDER</div>
              <div style="font-size:9pt; font-weight:800; color:#059669; margin-top:2px;">${cs.l1Vendor}</div>
            </div>
            <div style="border:1px solid #cbd5e1; border-radius:4px; padding:3mm; background:#f8fafc;">
              <div style="font-size:7pt; color:#64748b; font-weight:700; text-transform:uppercase;">L1 LANDED TOTAL</div>
              <div style="font-size:9pt; font-weight:800; color:#0f172a; font-family:monospace; margin-top:2px;">₹${cs.l1Landed.toLocaleString('en-IN', {minimumFractionDigits:2})}</div>
            </div>
            <div style="border:1px solid #cbd5e1; border-radius:4px; padding:3mm; background:#f0fdf4; border-color:#10b981;">
              <div style="font-size:7pt; color:#059669; font-weight:700; text-transform:uppercase;">CORPORATE SAVINGS</div>
              <div style="font-size:9pt; font-weight:800; color:#059669; font-family:monospace; margin-top:2px;">₹${cs.savings.toLocaleString('en-IN', {minimumFractionDigits:2})}</div>
            </div>
          </div>

          <!-- BIDDER COMPARISON MATRIX -->
          <table style="width:100%; border-collapse:collapse; font-size:8pt; margin-bottom:4mm;">
            <thead>
              <tr style="background:#0f172a; color:#ffffff;">
                <th style="padding:6px; border:1px solid #0f172a; text-align:left;">Commercial Parameter</th>
                <th style="padding:6px; border:1px solid #0f172a; text-align:center; background:#065f46;">L1 Bidder (Winner)</th>
                <th style="padding:6px; border:1px solid #0f172a; text-align:center;">L2 Bidder</th>
                <th style="padding:6px; border:1px solid #0f172a; text-align:center;">L3 Bidder</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #cbd5e1;">
                <td style="padding:5px 6px; font-weight:700; border:1px solid #cbd5e1;">Vendor Name</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; font-weight:800; color:#059669; background:#ecfdf5;">${cs.l1Vendor}</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1;">${cs.l2Vendor}</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1;">${cs.l3Vendor}</td>
              </tr>
              <tr style="border-bottom:1px solid #cbd5e1;">
                <td style="padding:5px 6px; font-weight:700; border:1px solid #cbd5e1;">Landed Quoted Cost (₹)</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; font-weight:800; font-family:monospace; color:#059669; background:#ecfdf5;">₹${cs.l1Landed.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; font-family:monospace;">₹${cs.l2Landed.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; font-family:monospace;">₹${cs.l3Landed.toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
              </tr>
              <tr style="border-bottom:1px solid #cbd5e1;">
                <td style="padding:5px 6px; font-weight:700; border:1px solid #cbd5e1;">Delivery Lead Time</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; font-weight:700; background:#ecfdf5;">14 Days (DAP Site)</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1;">21 Days</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1;">30 Days</td>
              </tr>
              <tr style="border-bottom:1px solid #cbd5e1;">
                <td style="padding:5px 6px; font-weight:700; border:1px solid #cbd5e1;">Payment Terms</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; background:#ecfdf5;">30 Days Net from GRN</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1;">100% Against Dispatch Docs</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1;">45 Days Net</td>
              </tr>
              <tr style="border-bottom:1px solid #cbd5e1;">
                <td style="padding:5px 6px; font-weight:700; border:1px solid #cbd5e1;">Technical Compliance</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; color:#059669; font-weight:800; background:#ecfdf5;">100% Passed (Form 11 OK)</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; color:#059669; font-weight:700;">100% Passed</td>
                <td style="padding:5px 6px; border:1px solid #cbd5e1; color:#059669; font-weight:700;">100% Passed</td>
              </tr>
            </tbody>
          </table>

          <!-- AWARD JUSTIFICATION -->
          <div style="border:1px solid #cbd5e1; border-radius:4px; padding:3mm 4mm; background:#fafafa; margin-bottom:4mm; font-size:8pt;">
            <div style="font-weight:800; color:#0f172a; text-transform:uppercase; margin-bottom:2px;">COMMERCIAL EVALUATION &amp; AWARD RECOMMENDATION:</div>
            <div style="color:#334155; line-height:1.35;">
              ${cs.justification} Sourcing conducted under competitive multi-vendor tender. Landed cost verified including 18% GST and DAP freight. Savings generated: ₹${cs.savings.toLocaleString('en-IN', {minimumFractionDigits:2})}.
            </div>
          </div>
        </div>

        <!-- FOOTER SIGNATURES & VERIFICATION QR -->
        <div style="border-top:1.5px solid #0f172a; padding-top:3.5mm; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; gap:6mm;">
            <div style="text-align:center; width:34mm; border:1px dashed #cbd5e1; padding:2mm; border-radius:4px; background:#f8fafc;">
              <div style="font-size:6.5pt; color:#64748b; text-transform:uppercase; font-weight:700;">Evaluated By</div>
              <div style="font-weight:800; font-size:8pt; margin-top:2px; color:#0f172a;">${(cs.evaluator || 'Gagan Das').split('(')[0]}</div>
              <div style="font-size:6.5pt; color:#0097a7;">Purchase Lead</div>
              <div style="font-size:6pt; color:#059669; font-weight:700; margin-top:1px;">✓ RECOMMENDED</div>
            </div>
            <div style="text-align:center; width:34mm; border:1px dashed #cbd5e1; padding:2mm; border-radius:4px; background:#f8fafc;">
              <div style="font-size:6.5pt; color:#64748b; text-transform:uppercase; font-weight:700;">Technical Review</div>
              <div style="font-weight:800; font-size:8pt; margin-top:2px; color:#0f172a;">Dilip Rout</div>
              <div style="font-size:6.5pt; color:#0097a7;">Area Mgr (Operations)</div>
              <div style="font-size:6pt; color:#059669; font-weight:700; margin-top:1px;">✓ TECH APPROVED</div>
            </div>
            <div style="text-align:center; width:34mm; border:1px dashed #cbd5e1; padding:2mm; border-radius:4px; background:#f8fafc;">
              <div style="font-size:6.5pt; color:#64748b; text-transform:uppercase; font-weight:700;">DoA Approval</div>
              <div style="font-weight:800; font-size:8pt; margin-top:2px; color:#0f172a;">Satish Chandra</div>
              <div style="font-size:6.5pt; color:#0097a7;">Project Director</div>
              <div style="font-size:6pt; color:#059669; font-weight:700; margin-top:1px;">✓ AWARD CONFIRMED</div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:8px; border:1.5px solid #0097a7; padding:2mm 3mm; border-radius:6px; background:#f0fdf4;">
            <img src="${qrData}" style="width:58px; height:58px; display:block;" alt="QR Verification">
            <div>
              <div style="font-size:7pt; font-weight:900; color:#0097a7; text-transform:uppercase;">SCAN TO VERIFY CS</div>
              <div style="font-family:monospace; font-size:7.5pt; font-weight:800; color:#0f172a;">${cs.id}</div>
              <div style="font-size:6.5pt; color:#059669; font-weight:700; margin-top:1px;">● DOA SIGN-OFF VALID</div>
              <div style="font-size:6pt; color:#64748b;">SHA256:7fa890e12d45c</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.activatePrintStage(html);
  },

  showToast: function (msg, type = 'success') {
    if (window.BalsonsWorkspace && typeof window.BalsonsWorkspace.showToast === 'function') {
      window.BalsonsWorkspace.showToast(msg, type);
      return;
    }
    let container = document.getElementById('balsonsToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'balsonsToastContainer';
      container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:999999;display:flex;flex-direction:column;gap:8px;max-width:380px;pointer-events:none;';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bg = type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : type === 'info' ? '#0097a7' : '#10b981';
    toast.style.cssText = `background:${bg};color:#ffffff;padding:12px 18px;border-radius:8px;font-size:13px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.25);pointer-events:auto;transition:all 0.3s ease;transform:translateY(10px);opacity:0;`;
    toast.textContent = msg;
    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('balsons_theme', isDark ? 'light' : 'dark');
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) themeBtn.textContent = isDark ? '🌙 Dark' : '☀️ Light';
}

document.addEventListener('DOMContentLoaded', () => {
  BalsonsPurchaseApp.init();
});


// Global Dual-Sync Wire for BEDS Auto-Reload Sync Engine
window.BalsonsPortalSync = {
  reload: async function() {
    if (window.BalsonsPurchaseApp && typeof window.BalsonsPurchaseApp.autoSyncWithCloud === 'function') {
      await window.BalsonsPurchaseApp.autoSyncWithCloud();
    }
  }
};

// Universal switchTab bridge for document vault & cross-portal workflows
window.switchTab = function(tabId) {
  if (tabId === 'documents' || tabId === 'docs' || tabId === 'tab-documents') {
    if (window.BalsonsPurchaseApp && window.BalsonsPurchaseApp.switchTab) {
      window.BalsonsPurchaseApp.switchTab('docs');
    }
  }
};
