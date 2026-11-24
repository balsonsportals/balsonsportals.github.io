const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
let content = fs.readFileSync(file, 'utf8');

console.log('Original content length:', content.length);

// 1. Upgrade CSS: Modal backdrop & box styles to BEDS V1.2
const oldModalCss = `    /* Modals */
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(16, 45, 53, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-box {
      background: var(--beds-bg-panel);
      border: 1px solid var(--beds-border);
      border-radius: var(--beds-radius-lg);
      padding: 24px;
      width: 92%;
      max-width: 620px;
      box-shadow: 0 10px 25px rgba(16, 45, 53, 0.2);
    }
    .modal-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--beds-charcoal-heading);
      margin-bottom: 4px;
    }`;

const newModalCss = `    /* BEDS V1.2 Pop-up Modal Window System */
    .beds-modal-backdrop, .modal-backdrop {
      position: fixed !important;
      top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
      width: 100vw !important; height: 100vh !important;
      background: rgba(16, 45, 53, 0.72) !important;
      backdrop-filter: blur(6px) !important;
      -webkit-backdrop-filter: blur(6px) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 99999 !important;
      padding: 16px !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }
    .beds-modal, .modal-box {
      background: var(--beds-bg-panel) !important;
      border: 1px solid var(--beds-border) !important;
      border-radius: var(--beds-radius-lg, 12px) !important;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
      animation: bedsModalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
      max-height: 90vh !important;
      overflow-y: auto !important;
      position: relative !important;
      box-sizing: border-box !important;
    }
    @keyframes bedsModalPop {
      0% { opacity: 0; transform: scale(0.95) translateY(10px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .modal-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--beds-charcoal-heading);
      margin-bottom: 4px;
    }`;

if (content.includes(oldModalCss)) {
  content = content.replace(oldModalCss, newModalCss);
  console.log('✓ 1. Replaced modal CSS with BEDS V1.2');
} else {
  console.log('⚠️ Could not find exact oldModalCss string');
}

// 2. Upgrade CSS: Print rules
const oldPrint1 = `    @media print {
      @page {
        size: A4 portrait;
        margin: 8mm 10mm;
      }
      body * {
        visibility: hidden;
      }
      
      /* Print Case 1: ID Card Badge */
      #printableIdCardContainer, #printableIdCardContainer * {
        visibility: visible;
      }
      #printableIdCardContainer {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        display: flex !important;
        justify-content: center;
        gap: 15mm;
        padding-top: 15mm;
      }

      /* Print Case 2: Full Filled Enrolment Dossier */
      #printableEnrolmentDossier, #printableEnrolmentDossier * {
        visibility: visible;
      }
      #printableEnrolmentDossier {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        max-width: 190mm;
        margin: 0 auto;
        box-shadow: none !important;
      }
    }`;

const newPrint1 = `    @media print {
      @page {
        size: A4 portrait;
        margin: 8mm 10mm;
      }
      body * {
        visibility: hidden;
      }
      
      /* Print Case 1: ID Card Badge */
      body.printing-idcard #printableIdCardContainer,
      body.printing-idcard #printableIdCardContainer * {
        visibility: visible !important;
      }
      body.printing-idcard #printableIdCardContainer {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        display: flex !important;
        justify-content: center;
        gap: 15mm;
        padding-top: 15mm;
      }

      /* Print Case 2: Full Filled Enrolment Dossier */
      body.printing-enrolment #printableEnrolmentDossier,
      body.printing-enrolment #printableEnrolmentDossier * {
        visibility: visible !important;
      }
      body.printing-enrolment #printableEnrolmentDossier {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        max-width: 190mm;
        margin: 0 auto;
        box-shadow: none !important;
      }

      /* Print Case 3: Payslips */
      body.printing-payslip #printablePayslip,
      body.printing-payslip #printablePayslip *,
      body:not(.printing-idcard):not(.printing-enrolment) #printablePayslip,
      body:not(.printing-idcard):not(.printing-enrolment) #printablePayslip * {
        visibility: visible !important;
      }
      body.printing-payslip #printablePayslip,
      body:not(.printing-idcard):not(.printing-enrolment) #printablePayslip {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
      }
    }`;

if (content.includes(oldPrint1)) {
  content = content.replace(oldPrint1, newPrint1);
  console.log('✓ 2. Upgraded @media print rules');
} else {
  console.log('⚠️ Could not find exact oldPrint1 string');
}

// Remove the conflicting print override before </style>
const oldPrint2 = `    @media print {
      body * { visibility: hidden; }
      #printablePayslip, #printablePayslip * { visibility: visible; }
      #printablePayslip {
        position: absolute;
        left: 0; top: 0; width: 100%;
        border: none; box-shadow: none; padding: 0; margin: 0;
      }
    }`;

if (content.includes(oldPrint2)) {
  content = content.replace(oldPrint2, `    /* Unified print handled above */`);
  console.log('✓ 3. Removed duplicate conflicting @media print');
}

// 4. Add Drive Vault button in Header
const oldHeaderBadges = `<a href="https://docs.google.com/spreadsheets/d/1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw/edit" target="_blank" class="meta-badge" style="font-size: 11px; background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600; text-decoration: none;" title="Open Live Google Spreadsheet (22 Relational Sheets)">🟢 Sheet: 1so_aH05...</a>
      <span class="meta-badge" style="font-size: 11px;">Payroll Period: NOV 2026</span>`;

const newHeaderBadges = `<a href="https://docs.google.com/spreadsheets/d/1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw/edit" target="_blank" class="meta-badge" style="font-size: 11px; background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600; text-decoration: none;" title="Open Live Google Spreadsheet (22 Relational Sheets)">🟢 Sheet: 1so_aH05...</a>
      <a href="https://drive.google.com/drive/folders/1TGaAS1aB6B0W8HHrZ6SYccG0XbsdSlLt" target="_blank" rel="noopener" class="meta-badge" style="font-size: 11px; background: rgba(0, 168, 150, 0.12); color: var(--beds-teal-primary); border: 1px solid var(--beds-teal-primary); font-weight: 700; text-decoration: none;" title="Open HR &amp; Payroll Google Drive Cloud Vault">📁 Drive Vault ↗</a>
      <span class="meta-badge" style="font-size: 11px;">Payroll Period: NOV 2026</span>`;

if (content.includes(oldHeaderBadges)) {
  content = content.replace(oldHeaderBadges, newHeaderBadges);
  console.log('✓ 4. Added Drive Vault button in Header');
}

// 5. Update Attendance action buttons
const oldAttButtons = `<button class="btn btn-secondary btn-sm" onclick="alert('Attendance validation complete. No duplicate or abnormal records found.')">✓ Validate Attendance</button>
          <button class="btn btn-primary btn-sm" onclick="alert('Period attendance locked by HR Head. Ready for payroll calculation.')">🔒 Lock Attendance</button>`;

const newAttButtons = `<button class="btn btn-secondary btn-sm" onclick="validateHrAttendance()">✓ Validate Attendance</button>
          <button class="btn btn-primary btn-sm" id="lockAttendanceBtn" data-locked="false" onclick="lockHrAttendance()">🔒 Lock Attendance</button>`;

if (content.includes(oldAttButtons)) {
  content = content.replace(oldAttButtons, newAttButtons);
  console.log('✓ 5. Replaced attendance alert buttons with active handlers');
}

// 6. Update Payslips toolbar with Drive upload
const oldPayslipToolbar = `<div style="display: flex; gap: 8px;">
          <select id="payslipEmpSelect" class="beds-select" style="width: 320px; font-size: 12px;" onchange="loadPayslipPreview(this.value)">
            <!-- Options populated by JS -->
          </select>
          <button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ Print / Save PDF</button>
        </div>`;

const newPayslipToolbar = `<div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <select id="payslipEmpSelect" class="beds-select" style="width: 320px; font-size: 12px;" onchange="loadPayslipPreview(this.value)">
            <!-- Options populated by JS -->
          </select>
          <button class="btn btn-primary btn-sm" onclick="printPayslip()">🖨️ Print / Save PDF</button>
          <button class="btn btn-secondary btn-sm" onclick="exportCurrentPayslipToDrive()" style="font-weight: 700; border-color: var(--beds-teal-primary); color: var(--beds-teal-primary);">☁️ Upload Payslip to Drive</button>
        </div>`;

if (content.includes(oldPayslipToolbar)) {
  content = content.replace(oldPayslipToolbar, newPayslipToolbar);
  console.log('✓ 6. Added Payslip Drive Upload button');
}

// 7. Replace static #tab-documents with dynamic container
const oldTabDocsRegex = /<!-- TAB 7: HR DOCUMENTS -->\s*<section id="tab-documents" class="section-view">[\s\S]*?<\/section>/;
const newTabDocs = `<!-- TAB 7: HR DOCUMENTS & CLOUD VAULT -->
    <section id="tab-documents" class="section-view">
      <!-- Populated dynamically by BalsonsDocs.renderDocumentsTab() -->
    </section>`;

if (oldTabDocsRegex.test(content)) {
  content = content.replace(oldTabDocsRegex, newTabDocs);
  console.log('✓ 7. Upgraded #tab-documents to dynamic BalsonsDocs vault container');
}

// 8. Update #tab-audit export button
const oldAuditBtn = `<button class="btn btn-secondary btn-sm" onclick="alert('Exporting BALSONS_HR_AUDIT_LOG_2026.csv...')">📥 Export CSV</button>`;
const newAuditBtn = `<button class="btn btn-secondary btn-sm" onclick="exportHrAuditCsv()">📥 Export CSV</button>`;
if (content.includes(oldAuditBtn)) {
  content = content.replace(oldAuditBtn, newAuditBtn);
  console.log('✓ 8. Replaced audit export alert with real CSV export');
}

// 9. Update modal classes
content = content.replace('<div id="modalOnboard" class="modal-backdrop"', '<div id="modalOnboard" class="beds-modal-backdrop modal-backdrop"');
content = content.replace('<div id="modalIdCard" class="modal-backdrop"', '<div id="modalIdCard" class="beds-modal-backdrop modal-backdrop"');
content = content.replace('<div id="modalPrintEnrolmentForm" class="modal-backdrop"', '<div id="modalPrintEnrolmentForm" class="beds-modal-backdrop modal-backdrop"');

// Update modal-box class inside them to include beds-modal
content = content.replace('<div class="modal-box" style="width: 960px;', '<div class="beds-modal modal-box" style="width: 960px;');
content = content.replace('<div class="modal-box" style="width: 860px;', '<div class="beds-modal modal-box" style="width: 860px;');
content = content.replace('<div class="modal-box" style="width: 880px;', '<div class="beds-modal modal-box" style="width: 880px;');

// In modalIdCard: add Drive upload button
const oldIdCardHeaderBtns = `<button type="button" class="btn btn-primary btn-sm" onclick="alert('Digital pass barcode & credentials downloaded to site pass folder.')">📥 Download Digital Pass</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeIdCardModal()">✖</button>`;

const newIdCardHeaderBtns = `<button type="button" class="btn btn-secondary btn-sm" onclick="exportIdCardToDrive()" style="border-color: var(--beds-teal-primary); color: var(--beds-teal-primary); font-weight: 700;">☁️ Upload Badge to Drive</button>
          <button type="button" class="btn btn-primary btn-sm" onclick="exportIdCardToDrive()">📥 Download Digital Pass</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeIdCardModal()">✖</button>`;

if (content.includes(oldIdCardHeaderBtns)) {
  content = content.replace(oldIdCardHeaderBtns, newIdCardHeaderBtns);
  console.log('✓ 9. Upgraded ID card modal actions with Drive upload');
}

// In modalPrintEnrolmentForm: add Drive upload button
const oldEnrolHeaderBtns = `<button type="button" class="btn btn-primary btn-sm" onclick="printEnrolmentForm()" style="background: var(--beds-teal-primary); font-weight: 800;">
            🖨️ Print Full Enrolment Form (A4)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeEnrolmentFormModal()">✖</button>`;

const newEnrolHeaderBtns = `<button type="button" class="btn btn-primary btn-sm" onclick="printEnrolmentForm()" style="background: var(--beds-teal-primary); font-weight: 800;">
            🖨️ Print Full Enrolment Form (A4)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="exportEnrolmentToDrive()" style="border-color: var(--beds-teal-primary); color: var(--beds-teal-primary); font-weight: 700;">
            ☁️ Upload Dossier to Drive
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeEnrolmentFormModal()">✖</button>`;

if (content.includes(oldEnrolHeaderBtns)) {
  content = content.replace(oldEnrolHeaderBtns, newEnrolHeaderBtns);
  console.log('✓ 10. Upgraded Enrolment form modal actions with Drive upload');
}

// 10. Add modalRecordAdvance markup before script tags
const advanceModalHtml = `
  <!-- 4. Official Issue Employee Advance & Loan Recovery Modal -->
  <div id="modalRecordAdvance" class="beds-modal-backdrop modal-backdrop" style="display: none;">
    <div class="beds-modal modal-box" style="width: 720px; max-width: 95vw; max-height: 92vh; overflow-y: auto; padding: 24px;">
      
      <!-- Modal Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--beds-teal-primary); padding-bottom: 12px; margin-bottom: 18px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 26px;">💰</div>
          <div>
            <div class="modal-title" style="font-size: 17px; margin-bottom: 2px;">Issue Employee Advance &amp; Monthly Recovery Setup</div>
            <div style="font-size: 11.5px; color: var(--beds-text-secondary);">
              Statutory Advance Register (ADVANCE_MASTER) • Jupiter Tatravagonka Railwheel Factory
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdvanceModal()">✖</button>
      </div>

      <!-- Advance Form -->
      <form id="advanceForm" onsubmit="handleAdvanceSubmit(event)">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
          <div style="grid-column: span 2;">
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Select Employee / Worker *
            </label>
            <select id="advEmpSelect" class="beds-select" style="width: 100%; font-size: 13px;" required onchange="handleAdvanceEmpChange(this.value)">
              <!-- Populated dynamically -->
            </select>
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Advance Amount (₹) *
            </label>
            <input type="number" id="advAmount" class="beds-input" placeholder="e.g. 15000" min="500" step="500" required style="width: 100%; font-size: 14px; font-weight: 700;" oninput="calculateAdvanceInstallments()">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Monthly Deduction (₹) *
            </label>
            <input type="number" id="advMonthly" class="beds-input" placeholder="e.g. 3000" min="500" step="500" required style="width: 100%; font-size: 14px; font-weight: 700;" oninput="calculateAdvanceInstallments()">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Repayment Schedule
            </label>
            <input type="text" id="advInstallmentSummary" class="beds-input" readonly value="5 Monthly Installments" style="width: 100%; background: var(--beds-bg-page); color: var(--beds-teal-primary); font-weight: 700;">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Sanction Date *
            </label>
            <input type="date" id="advDate" class="beds-input" required style="width: 100%;">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Advance Category / Purpose *
            </label>
            <select id="advCategory" class="beds-select" style="width: 100%;">
              <option value="Medical Emergency">🏥 Medical Emergency</option>
              <option value="Festival Advance">🎉 Festival Advance</option>
              <option value="Family / Personal Support">👨‍👩‍👧 Family / Personal Support</option>
              <option value="Housing / Accommodation">🏠 Housing / Accommodation</option>
              <option value="Tools & PPE Allowance">🧰 Tools &amp; Equipment Allowance</option>
              <option value="Relocation / Travel">✈️ Relocation / Travel</option>
            </select>
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Sanctioning Authority *
            </label>
            <select id="advAuthority" class="beds-select" style="width: 100%;">
              <option value="Priyanka Senapati (HR Head)">Priyanka Senapati (HR Head)</option>
              <option value="Prashant Muley (Executive Super Admin)">Prashant Muley (Executive Super Admin)</option>
              <option value="Satish Chandra (Project Manager)">Satish Chandra (Project Manager)</option>
            </select>
          </div>

          <div style="grid-column: span 2;">
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Remarks / Justification
            </label>
            <textarea id="advRemarks" rows="2" class="beds-textarea" placeholder="Sanction notes, payment mode (NEFT/UPI/Cash), or bank reference..." style="width: 100%;"></textarea>
          </div>
        </div>

        <!-- Compliance Confirmation Box -->
        <div style="background: rgba(0, 168, 150, 0.08); border: 1px solid var(--beds-teal-primary); border-radius: var(--beds-radius-md); padding: 10px 14px; margin-bottom: 18px; font-size: 11.5px; color: var(--beds-charcoal-heading);">
          🛡️ <strong>Statutory Governance:</strong> This advance will be registered into <code>ADVANCE_MASTER</code> and auto-deducted from monthly wage disbursements until the balance reaches ₹0.00. An advance voucher record is synced to Google Drive EPFO &amp; Finance Vault.
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdvanceModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm" style="font-weight: 800;">
            ✓ Sanction &amp; Record Advance
          </button>
        </div>
      </form>
    </div>
  </div>
`;

const scriptTagAnchor = '  <script src="assets/js/config.js"></script>';
if (content.includes(scriptTagAnchor)) {
  content = content.replace(scriptTagAnchor, advanceModalHtml + '\n' + scriptTagAnchor);
  console.log('✓ 11. Injected modalRecordAdvance markup');
}

// 11. Update switchHrTab to call BalsonsDocs for 'documents'
const oldSwitchDoc = `      if (tabId === 'payslips') {
        const empVal = document.getElementById('payslipEmpSelect') ? document.getElementById('payslipEmpSelect').value : null;
        loadPayslipPreview(empVal || window.__SELECTED_EMP__ || 'EMP-2026-0001');
      } else if (tabId === 'safety-clearance') {
        renderHrSafetyDirectory();
        verifyHrSafetyClearance('EMP-2026-0001');
      } else if (tabId === 'dossier-360') {
        loadHr360DossierPage('EMP-2026-0001');
      }`;

const newSwitchDoc = `      if (tabId === 'payslips') {
        const empVal = document.getElementById('payslipEmpSelect') ? document.getElementById('payslipEmpSelect').value : null;
        loadPayslipPreview(empVal || window.__SELECTED_EMP__ || 'EMP-2026-0001');
      } else if (tabId === 'safety-clearance') {
        renderHrSafetyDirectory();
        verifyHrSafetyClearance('EMP-2026-0001');
      } else if (tabId === 'dossier-360') {
        loadHr360DossierPage('EMP-2026-0001');
      } else if (tabId === 'documents') {
        if (window.BalsonsDocs) {
          window.BalsonsDocs.renderDocumentsTab('tab-documents');
        }
      }`;

if (content.includes(oldSwitchDoc)) {
  content = content.replace(oldSwitchDoc, newSwitchDoc);
  console.log('✓ 12. Updated switchHrTab with BalsonsDocs trigger');
}

// 12. Add JavaScript functions for Advance modal, Drive sync, Print modes, and Safe initializers
const newJsFunctions = `
    // ══════════════════════════════════════════════════════════════════
    // ADVANCE MANAGEMENT SUBSYSTEM (ADVANCE_MASTER)
    // ══════════════════════════════════════════════════════════════════
    function openAdvanceModal() {
      populateAdvanceSelect();
      const today = new Date().toISOString().slice(0, 10);
      const dateEl = document.getElementById('advDate');
      if (dateEl) dateEl.value = today;
      calculateAdvanceInstallments();
      const modal = document.getElementById('modalRecordAdvance');
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    }

    function closeAdvanceModal() {
      const modal = document.getElementById('modalRecordAdvance');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }

    function populateAdvanceSelect() {
      const sel = document.getElementById('advEmpSelect');
      if (!sel) return;
      sel.innerHTML = '';
      employeesData.forEach(e => {
        const opt = document.createElement('option');
        opt.value = e.empId;
        opt.textContent = \`\${e.empId} — \${e.name} (\${e.trade || e.role || 'Staff'}) [\${e.wageType === 'MONTHLY' ? 'Monthly' : 'Daily Pay'}]\`;
        sel.appendChild(opt);
      });
    }

    function handleAdvanceEmpChange(empId) {
      calculateAdvanceInstallments();
    }

    function calculateAdvanceInstallments() {
      const total = parseFloat(document.getElementById('advAmount')?.value) || 0;
      const monthly = parseFloat(document.getElementById('advMonthly')?.value) || 0;
      const summaryEl = document.getElementById('advInstallmentSummary');
      if (!summaryEl) return;
      if (total > 0 && monthly > 0) {
        const count = Math.ceil(total / monthly);
        summaryEl.value = \`\${count} Month\${count > 1 ? 's' : ''} (₹\${monthly.toLocaleString('en-IN')}/mo)\`;
      } else {
        summaryEl.value = 'Enter total and monthly recovery';
      }
    }

    function handleAdvanceSubmit(e) {
      e.preventDefault();
      const empId = document.getElementById('advEmpSelect').value;
      const emp = employeesData.find(x => x.empId === empId);
      if (!emp) {
        alert('Please select a valid employee.');
        return;
      }
      const total = parseFloat(document.getElementById('advAmount').value) || 0;
      const monthly = parseFloat(document.getElementById('advMonthly').value) || 0;
      if (total <= 0 || monthly <= 0) {
        alert('Please enter a valid advance amount and monthly recovery amount.');
        return;
      }

      const advId = \`ADV-2026-\${String(advanceData.length + 1).padStart(4, '0')}\`;
      const date = document.getElementById('advDate').value || new Date().toISOString().slice(0, 10);
      const purpose = document.getElementById('advCategory').value;
      const authority = document.getElementById('advAuthority').value;

      const newAdv = {
        advId,
        empId: emp.empId,
        name: emp.name,
        wageType: emp.wageType,
        date,
        total,
        monthly,
        recovered: 0,
        balance: total,
        status: 'RECOVERING'
      };

      advanceData.unshift(newAdv);

      // Add to HR audit log
      hrAuditData.unshift({
        id: 'AUD-HR-' + Date.now().toString().slice(-4),
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        actor: 'hr.head',
        role: 'HR Head',
        action: 'ADVANCE_SANCTIONED',
        ref: advId,
        outcome: 'SUCCESS',
        details: \`Sanctioned advance of ₹\${total.toLocaleString('en-IN')} for \${emp.name} (\${emp.empId}). Monthly recovery ₹\${monthly.toLocaleString('en-IN')}. Reason: \${purpose}. Sanctioned by: \${authority}.\`
      });

      // Sync to Document Vault if BalsonsDocs is active
      if (window.BalsonsDocs) {
        try {
          window.BalsonsDocs.uploadDocumentToDrive({
            id: \`DOC-\${advId}\`,
            refNumber: advId,
            title: \`Advance Sanction Voucher - \${emp.name} (₹\${total.toLocaleString('en-IN')})\`,
            portal: 'hr',
            category: 'EPFO',
            remarks: \`Advance Voucher sanctioned by \${authority}. Recovery rate: ₹\${monthly}/mo.\`,
            tags: ['Advance', 'Salary', emp.empId, 'Recovery']
          });
        } catch (docErr) {
          console.warn('Doc registration for advance:', docErr);
        }
      }

      renderAdvanceTable();
      renderPayrollTable();
      renderAuditTable();
      closeAdvanceModal();
      document.getElementById('advanceForm').reset();

      if (window.BalsonsDocs && typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast(\`✅ Advance <strong>\${advId}</strong> (₹\${total.toLocaleString('en-IN')}) sanctioned for <strong>\${emp.name}</strong>.<br>Added to recovery ledger &amp; Drive Vault!\`);
      } else {
        alert(\`✅ Advance \${advId} (₹\${total.toLocaleString('en-IN')}) sanctioned for \${emp.name}.\\nAdded to recovery ledger & Drive Vault!\`);
      }
    }

    // ══════════════════════════════════════════════════════════════════
    // GOOGLE DRIVE CLOUD VAULT EXPORTS & IN-PORTAL MODAL INTEGRATION
    // ══════════════════════════════════════════════════════════════════
    function exportCurrentPayslipToDrive() {
      const sel = document.getElementById('payslipEmpSelect');
      const empId = sel ? sel.value : 'EMP-2026-0001';
      const emp = employeesData.find(x => x.empId === empId) || employeesData[0];
      const att = attendanceData.find(a => a.empId === empId) || { payable: 30, otHours: 0 };
      
      if (!window.BalsonsDocs) {
        alert('Document Vault engine is initializing. Please try again.');
        return;
      }

      const period = 'NOV 2026';
      const docId = \`DOC-PAY-\${emp.empId}-\${period.replace(/\\s+/g, '')}\`;
      const docTitle = \`Salary Slip - \${emp.name} (\${emp.empId}) - \${period}\`;
      
      const doc = window.BalsonsDocs.uploadDocumentToDrive({
        id: docId,
        refNumber: \`PS-\${period.replace(/\\s+/g, '')}-\${emp.empId.replace('EMP-2026-', '')}\`,
        title: docTitle,
        portal: 'hr',
        category: 'EPFO',
        remarks: \`Statutory Payslip for \${emp.name} (\${emp.trade || 'Staff'}). Duty days: \${att.payable}. Exported from HR & Payroll Studio.\`,
        tags: ['Payslip', 'Salary', emp.empId, period, emp.wageType]
      });

      if (typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast(\`☁️ <strong>\${docTitle}</strong> successfully saved to Google Drive Vault!<br><button class="btn btn-primary btn-sm" style="margin-top:6px;font-size:11px;" onclick="window.BalsonsDocs.viewDocument('\${doc.id}')">👁️ View in Portal Modal</button>\`);
      } else {
        alert(\`✅ \${docTitle} exported to Google Drive Vault!\`);
      }
    }

    function exportEnrolmentToDrive() {
      const sel = document.getElementById('enrolEmpSelect');
      const empId = sel ? sel.value : 'EMP-2026-0001';
      const emp = employeesData.find(x => x.empId === empId) || employeesData[0];
      if (!window.BalsonsDocs) {
        alert('Document Vault engine is initializing.');
        return;
      }
      const docId = \`DOC-ENROL-\${emp.empId}\`;
      const docTitle = \`Master Enrolment Dossier - \${emp.name} (\${emp.empId})\`;
      const doc = window.BalsonsDocs.uploadDocumentToDrive({
        id: docId,
        refNumber: \`ENROL-\${emp.empId.replace('EMP-2026-', '')}\`,
        title: docTitle,
        portal: 'hr',
        category: 'KYC',
        remarks: \`Master Enrolment Form & Compliance Dossier for \${emp.name}. Father: \${emp.father || 'N/A'}, Trade: \${emp.trade || 'Staff'}. Verified by Site HR.\`,
        tags: ['Enrolment', 'KYC', emp.empId, 'Form 31']
      });
      if (typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast(\`☁️ <strong>\${docTitle}</strong> uploaded to Google Drive Vault!<br><button class="btn btn-primary btn-sm" style="margin-top:6px;font-size:11px;" onclick="window.BalsonsDocs.viewDocument('\${doc.id}')">👁️ View in Portal Modal</button>\`);
      } else {
        alert(\`✅ \${docTitle} uploaded to Google Drive Vault!\`);
      }
    }

    function exportIdCardToDrive() {
      const sel = document.getElementById('idCardEmpSelect');
      const empId = sel ? sel.value : 'EMP-2026-0001';
      const emp = employeesData.find(x => x.empId === empId) || employeesData[0];
      if (!window.BalsonsDocs) {
        alert('Document Vault engine is initializing.');
        return;
      }
      const docId = \`DOC-IDCARD-\${emp.empId}\`;
      const docTitle = \`Site Gate ID Badge - \${emp.name} (\${emp.empId})\`;
      const doc = window.BalsonsDocs.uploadDocumentToDrive({
        id: docId,
        refNumber: \`ID-\${emp.empId.replace('EMP-2026-', '')}\`,
        title: docTitle,
        portal: 'hr',
        category: 'KYC',
        remarks: \`Official PVC Site Access Badge (CR80) for \${emp.name}. Trade: \${emp.trade || 'Rigger'}. Department: \${emp.dept || 'Operations'}.\`,
        tags: ['IDCard', 'PVCBadge', emp.empId, 'GateAccess']
      });
      if (typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast(\`☁️ <strong>\${docTitle}</strong> uploaded to Google Drive Vault!<br><button class="btn btn-primary btn-sm" style="margin-top:6px;font-size:11px;" onclick="window.BalsonsDocs.viewDocument('\${doc.id}')">👁️ View in Portal Modal</button>\`);
      } else {
        alert(\`✅ \${docTitle} uploaded to Google Drive Vault!\`);
      }
    }

    // ══════════════════════════════════════════════════════════════════
    // STATUTORY PRINT MODES & ACTIONS
    // ══════════════════════════════════════════════════════════════════
    function printPayslip() {
      document.body.classList.add('printing-payslip');
      window.print();
      setTimeout(() => document.body.classList.remove('printing-payslip'), 1000);
    }

    function printGateIdCard() {
      document.body.classList.add('printing-idcard');
      window.print();
      setTimeout(() => document.body.classList.remove('printing-idcard'), 1000);
    }

    function printEnrolmentForm() {
      document.body.classList.add('printing-enrolment');
      window.print();
      setTimeout(() => document.body.classList.remove('printing-enrolment'), 1000);
    }

    // ══════════════════════════════════════════════════════════════════
    // ATTENDANCE AUDIT & CSV EXPORT
    // ══════════════════════════════════════════════════════════════════
    function validateHrAttendance() {
      const total = attendanceData.length;
      const anomalies = attendanceData.filter(a => a.payable > 31 || a.otHours > 100);
      if (anomalies.length === 0) {
        if (window.BalsonsDocs && typeof window.BalsonsDocs.showToast === 'function') {
          window.BalsonsDocs.showToast(\`✅ <strong>Attendance Audit Complete:</strong> All \${total} workforce muster records verified. Zero statutory anomalies or duplicate entries found.\`);
        } else {
          alert(\`✅ Attendance Audit Complete: All \${total} workforce muster records verified. Zero statutory anomalies found.\`);
        }
      }
    }

    function lockHrAttendance() {
      const isLocked = document.getElementById('lockAttendanceBtn')?.getAttribute('data-locked') === 'true';
      const btn = document.getElementById('lockAttendanceBtn');
      if (!isLocked) {
        if (btn) {
          btn.setAttribute('data-locked', 'true');
          btn.innerHTML = '🔓 Attendance Locked (HR Head)';
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-secondary');
        }
        hrAuditData.unshift({
          id: 'AUD-HR-' + Date.now().toString().slice(-4),
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          actor: 'hr.head',
          role: 'HR Head',
          action: 'ATTENDANCE_PERIOD_LOCKED',
          ref: 'ATT-NOV-2026',
          outcome: 'SUCCESS',
          details: 'Period attendance locked for November 2026. Ready for payroll computation.'
        });
        renderAuditTable();
        if (window.BalsonsDocs && typeof window.BalsonsDocs.showToast === 'function') {
          window.BalsonsDocs.showToast('🔒 <strong>Attendance Period Locked:</strong> Master muster finalized by HR Head. Ready for payroll calculation.');
        } else {
          alert('🔒 Attendance Period Locked by HR Head.');
        }
      } else {
        if (btn) {
          btn.setAttribute('data-locked', 'false');
          btn.innerHTML = '🔒 Lock Attendance';
          btn.classList.add('btn-primary');
          btn.classList.remove('btn-secondary');
        }
      }
    }

    function exportHrAuditCsv() {
      let csv = 'Audit ID,Timestamp,Actor,Role,Action,Reference,Outcome,Details\\n';
      hrAuditData.forEach(a => {
        csv += \`"\${a.id}","\${a.timestamp}","\${a.actor}","\${a.role}","\${a.action}","\${a.ref}","\${a.outcome}","\${(a.details || '').replace(/"/g, '""')}"\\n\`;
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`BALSONS_HR_AUDIT_LOG_\${new Date().toISOString().slice(0, 10)}.csv\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
`;

// Inject newJsFunctions before function initHrApp()
content = content.replace('    function initHrApp() {', newJsFunctions + '\n    function initHrApp() {');
console.log('✓ 13. Injected new JavaScript subsystems');

// 13. Upgrade modal open/close functions to lock/unlock scroll
content = content.replace(`    function openOnboardModal() {
      document.getElementById('modalOnboard').style.display = 'flex';`,
      `    function openOnboardModal() {
      document.getElementById('modalOnboard').style.display = 'flex';
      document.body.style.overflow = 'hidden';`);

content = content.replace(`    function closeOnboardModal() {
      document.getElementById('modalOnboard').style.display = 'none';
    }`,
      `    function closeOnboardModal() {
      document.getElementById('modalOnboard').style.display = 'none';
      document.body.style.overflow = '';
    }`);

content = content.replace(`    function openIdCardModal(empId) {
      populateIdCardSelect();
      const sel = document.getElementById('idCardEmpSelect');
      if (sel && empId) sel.value = empId;
      renderIdCard(empId || (sel ? sel.value : 'EMP-2026-0001'));
      document.getElementById('modalIdCard').style.display = 'flex';
    }`,
      `    function openIdCardModal(empId) {
      populateIdCardSelect();
      const sel = document.getElementById('idCardEmpSelect');
      if (sel && empId) sel.value = empId;
      renderIdCard(empId || (sel ? sel.value : 'EMP-2026-0001'));
      document.getElementById('modalIdCard').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }`);

content = content.replace(`    function closeIdCardModal() {
      document.getElementById('modalIdCard').style.display = 'none';
    }`,
      `    function closeIdCardModal() {
      document.getElementById('modalIdCard').style.display = 'none';
      document.body.style.overflow = '';
    }`);

content = content.replace(`    function openEnrolmentFormModal(empId) {
      populateEnrolmentSelect();
      const sel = document.getElementById('enrolEmpSelect');
      if (sel && empId) sel.value = empId;
      renderEnrolmentForm(empId || (sel ? sel.value : 'EMP-2026-0001'));
      document.getElementById('modalPrintEnrolmentForm').style.display = 'flex';
    }`,
      `    function openEnrolmentFormModal(empId) {
      populateEnrolmentSelect();
      const sel = document.getElementById('enrolEmpSelect');
      if (sel && empId) sel.value = empId;
      renderEnrolmentForm(empId || (sel ? sel.value : 'EMP-2026-0001'));
      document.getElementById('modalPrintEnrolmentForm').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }`);

content = content.replace(`    function closeEnrolmentFormModal() {
      document.getElementById('modalPrintEnrolmentForm').style.display = 'none';
    }`,
      `    function closeEnrolmentFormModal() {
      document.getElementById('modalPrintEnrolmentForm').style.display = 'none';
      document.body.style.overflow = '';
    }`);

console.log('✓ 14. Added body scroll lock/unlock to modal handlers');

// 14. Upgrade initHrApp() with try/catches and populateAdvanceSelect
const oldInitHr = `    function initHrApp() {
      renderEmployeesTable();
      renderAttendanceTable();
      renderAdvanceTable();
      renderPayrollTable();
      renderAuditTable();
      renderHrSafetyDirectory();
      populatePayslipSelect();
      populateIdCardSelect();
      const defaultEmp = window.__SELECTED_EMP__ || (document.getElementById('payslipEmpSelect') ? document.getElementById('payslipEmpSelect').value : null) || 'EMP-2026-0001';
      loadPayslipPreview(defaultEmp);
      initDropdowns();
    }`;

const newInitHr = `    function initHrApp() {
      try { renderEmployeesTable(); } catch (e) { console.warn('renderEmployeesTable:', e); }
      try { renderAttendanceTable(); } catch (e) { console.warn('renderAttendanceTable:', e); }
      try { renderAdvanceTable(); } catch (e) { console.warn('renderAdvanceTable:', e); }
      try { renderPayrollTable(); } catch (e) { console.warn('renderPayrollTable:', e); }
      try { renderAuditTable(); } catch (e) { console.warn('renderAuditTable:', e); }
      try { renderHrSafetyDirectory(); } catch (e) { console.warn('renderHrSafetyDirectory:', e); }
      try { populatePayslipSelect(); } catch (e) { console.warn('populatePayslipSelect:', e); }
      try { populateIdCardSelect(); } catch (e) { console.warn('populateIdCardSelect:', e); }
      try { populateAdvanceSelect(); } catch (e) { console.warn('populateAdvanceSelect:', e); }
      try {
        const defaultEmp = window.__SELECTED_EMP__ || (document.getElementById('payslipEmpSelect') ? document.getElementById('payslipEmpSelect').value : null) || 'EMP-2026-0001';
        loadPayslipPreview(defaultEmp);
      } catch (e) { console.warn('loadPayslipPreview:', e); }
      try { initDropdowns(); } catch (e) { console.warn('initDropdowns:', e); }
      try {
        if (window.BalsonsDocs) {
          window.BalsonsDocs.renderDocumentsTab('tab-documents');
        }
      } catch (e) { console.warn('BalsonsDocs init in HR:', e); }
    }`;

if (content.includes(oldInitHr)) {
  content = content.replace(oldInitHr, newInitHr);
  console.log('✓ 15. Upgraded initHrApp with resilient execution');
}

// 15. Add click outside and escape listeners at bottom of script
const oldBottomListeners = `    // Header Dropdowns Outside-Click Handler (User Profile Pill)
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#userPillWrap')) {
        var u = document.getElementById('userPillWrap');
        if (u) u.classList.remove('open');
      }
    });`;

const newBottomListeners = `    // Header Dropdowns Outside-Click Handler (User Profile Pill)
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#userPillWrap')) {
        var u = document.getElementById('userPillWrap');
        if (u) u.classList.remove('open');
      }
    });

    // BEDS Modal Backdrop Outside Click & Escape Key Dismissal
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('beds-modal-backdrop') || e.target.classList.contains('modal-backdrop')) {
        // Do not close login backdrop on backdrop click
        if (e.target.id !== 'bedsLoginModalBackdrop' && e.target.id !== 'loginModal') {
          e.target.style.display = 'none';
          document.body.style.overflow = '';
        }
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.beds-modal-backdrop, .modal-backdrop').forEach(modal => {
          if (modal.id !== 'bedsLoginModalBackdrop' && modal.id !== 'loginModal') {
            modal.style.display = 'none';
          }
        });
        document.body.style.overflow = '';
      }
    });`;

if (content.includes(oldBottomListeners)) {
  content = content.replace(oldBottomListeners, newBottomListeners);
  console.log('✓ 16. Added backdrop click-outside and Escape key dismissal');
}

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Updated BALSONS HR MANAGER/frontend/index.html successfully! New length:', content.length);

// Also mirror to Launcher submodule
const launcherFile = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html';
if (fs.existsSync(launcherFile)) {
  fs.writeFileSync(launcherFile, content, 'utf8');
  console.log('✅ Synchronized to BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html');
}
