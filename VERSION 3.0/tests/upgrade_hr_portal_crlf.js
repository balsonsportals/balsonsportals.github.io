const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
let content = fs.readFileSync(file, 'utf8');

console.log('Original content length:', content.length);

// 1. Upgrade CSS: Modal backdrop & box styles to BEDS V1.2
const modalCssRegex = /\/\* Modals \*\/[\r\n\s]*\.modal-backdrop[\s\S]*?\.modal-title\s*\{[\s\S]*?margin-bottom:\s*4px;\s*\}/;
const newModalCss = `/* BEDS V1.2 Pop-up Modal Window System */
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

if (modalCssRegex.test(content)) {
  content = content.replace(modalCssRegex, newModalCss);
  console.log('✓ 1. Replaced modal CSS with BEDS V1.2');
} else {
  console.log('⚠️ Could not match modalCssRegex');
}

// 2. Upgrade CSS: Print rules (first @media print block)
const print1Regex = /@media print\s*\{[\s\S]*?Print Case 2: Full Filled Enrolment Dossier[\s\S]*?box-shadow:\s*none\s*!important;\s*\}\s*\}/;
const newPrint1 = `@media print {
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

if (print1Regex.test(content)) {
  content = content.replace(print1Regex, newPrint1);
  console.log('✓ 2. Upgraded @media print rules');
} else {
  console.log('⚠️ Could not match print1Regex');
}

// 3. Remove conflicting second @media print block
const print2Regex = /@media print\s*\{[\s\S]*?#printablePayslip\s*\{[\s\S]*?margin:\s*0;\s*\}\s*\}/;
if (print2Regex.test(content)) {
  content = content.replace(print2Regex, '/* Unified print handled above */');
  console.log('✓ 3. Removed duplicate conflicting @media print');
}

// 4. Add Drive Vault button in Header
const headerBadgesRegex = /(<a href="https:\/\/docs\.google\.com\/spreadsheets\/d\/1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw\/edit"[^>]*>[\s\S]*?<\/a>)(\s*)(<span class="meta-badge" style="font-size: 11px;">Payroll Period: NOV 2026<\/span>)/;
if (headerBadgesRegex.test(content)) {
  content = content.replace(headerBadgesRegex, `$1$2<a href="https://drive.google.com/drive/folders/1TGaAS1aB6B0W8HHrZ6SYccG0XbsdSlLt" target="_blank" rel="noopener" class="meta-badge" style="font-size: 11px; background: rgba(0, 168, 150, 0.12); color: var(--beds-teal-primary); border: 1px solid var(--beds-teal-primary); font-weight: 700; text-decoration: none;" title="Open HR &amp; Payroll Google Drive Cloud Vault">📁 Drive Vault ↗</a>$2$3`);
  console.log('✓ 4. Added Drive Vault button in Header');
}

// 5. Update Attendance action buttons
const attButtonsRegex = /<button class="btn btn-secondary btn-sm" onclick="alert\('Attendance validation complete[^']*'\)">✓ Validate Attendance<\/button>[\r\n\s]*<button class="btn btn-primary btn-sm" onclick="alert\('Period attendance locked[^']*'\)">🔒 Lock Attendance<\/button>/;
const newAttButtons = `<button class="btn btn-secondary btn-sm" onclick="validateHrAttendance()">✓ Validate Attendance</button>
            <button class="btn btn-primary btn-sm" id="lockAttendanceBtn" data-locked="false" onclick="lockHrAttendance()">🔒 Lock Attendance</button>`;

if (attButtonsRegex.test(content)) {
  content = content.replace(attButtonsRegex, newAttButtons);
  console.log('✓ 5. Replaced attendance alert buttons with active handlers');
} else {
  console.log('⚠️ Could not match attButtonsRegex');
}

// 6. Update Payslips toolbar with Drive upload
const payslipToolbarRegex = /<select id="payslipEmpSelect"[\s\S]*?<\/select>[\r\n\s]*<button class="btn btn-primary btn-sm" onclick="window\.print\(\)">🖨️ Print \/ Save PDF<\/button>/;
const newPayslipToolbar = `<select id="payslipEmpSelect" class="beds-select" style="width: 320px; font-size: 12px;" onchange="loadPayslipPreview(this.value)">
            <!-- Options populated by JS -->
          </select>
          <button class="btn btn-primary btn-sm" onclick="printPayslip()">🖨️ Print / Save PDF</button>
          <button class="btn btn-secondary btn-sm" onclick="exportCurrentPayslipToDrive()" style="font-weight: 700; border-color: var(--beds-teal-primary); color: var(--beds-teal-primary);">☁️ Upload Payslip to Drive</button>`;

if (payslipToolbarRegex.test(content)) {
  content = content.replace(payslipToolbarRegex, newPayslipToolbar);
  console.log('✓ 6. Added Payslip Drive Upload button');
} else {
  console.log('⚠️ Could not match payslipToolbarRegex');
}

// 9. Update modal classes
content = content.replace(/<div id="modalOnboard" class="modal-backdrop"/g, '<div id="modalOnboard" class="beds-modal-backdrop modal-backdrop"');
content = content.replace(/<div id="modalIdCard" class="modal-backdrop"/g, '<div id="modalIdCard" class="beds-modal-backdrop modal-backdrop"');
content = content.replace(/<div id="modalPrintEnrolmentForm" class="modal-backdrop"/g, '<div id="modalPrintEnrolmentForm" class="beds-modal-backdrop modal-backdrop"');

// Update modal-box class inside them to include beds-modal
content = content.replace(/<div class="modal-box" style="width: 960px;/g, '<div class="beds-modal modal-box" style="width: 960px;');
content = content.replace(/<div class="modal-box" style="width: 860px;/g, '<div class="beds-modal modal-box" style="width: 860px;');
content = content.replace(/<div class="modal-box" style="width: 880px;/g, '<div class="beds-modal modal-box" style="width: 880px;');

// In modalIdCard: add Drive upload button
const idCardBtnsRegex = /<button type="button" class="btn btn-primary btn-sm" onclick="alert\('Digital pass barcode[^']*'\)">📥 Download Digital Pass<\/button>[\r\n\s]*<button type="button" class="btn btn-secondary btn-sm" onclick="closeIdCardModal\(\)">✖<\/button>/;
const newIdCardBtns = `<button type="button" class="btn btn-secondary btn-sm" onclick="exportIdCardToDrive()" style="border-color: var(--beds-teal-primary); color: var(--beds-teal-primary); font-weight: 700;">☁️ Upload Badge to Drive</button>
          <button type="button" class="btn btn-primary btn-sm" onclick="exportIdCardToDrive()">📥 Download Digital Pass</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeIdCardModal()">✖</button>`;

if (idCardBtnsRegex.test(content)) {
  content = content.replace(idCardBtnsRegex, newIdCardBtns);
  console.log('✓ 9. Upgraded ID card modal actions with Drive upload');
} else {
  console.log('⚠️ Could not match idCardBtnsRegex');
}

// In modalPrintEnrolmentForm: add Drive upload button
const enrolBtnsRegex = /<button type="button" class="btn btn-primary btn-sm" onclick="printEnrolmentForm\(\)"[^>]*>[\r\n\s]*🖨️ Print Full Enrolment Form \(A4\)[\r\n\s]*<\/button>[\r\n\s]*<button type="button" class="btn btn-secondary btn-sm" onclick="closeEnrolmentFormModal\(\)">✖<\/button>/;
const newEnrolBtns = `<button type="button" class="btn btn-primary btn-sm" onclick="printEnrolmentForm()" style="background: var(--beds-teal-primary); font-weight: 800;">
            🖨️ Print Full Enrolment Form (A4)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="exportEnrolmentToDrive()" style="border-color: var(--beds-teal-primary); color: var(--beds-teal-primary); font-weight: 700;">
            ☁️ Upload Dossier to Drive
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeEnrolmentFormModal()">✖</button>`;

if (enrolBtnsRegex.test(content)) {
  content = content.replace(enrolBtnsRegex, newEnrolBtns);
  console.log('✓ 10. Upgraded Enrolment form modal actions with Drive upload');
} else {
  console.log('⚠️ Could not match enrolBtnsRegex');
}

// 11. Update switchHrTab to call BalsonsDocs for 'documents'
const switchDocRegex = /(else if \(tabId === 'dossier-360'\) \{[\r\n\s]*loadHr360DossierPage\('EMP-2026-0001'\);[\r\n\s]*\})/;
const newSwitchDoc = `$1 else if (tabId === 'documents') {
        if (window.BalsonsDocs) {
          window.BalsonsDocs.renderDocumentsTab('tab-documents');
        }
      }`;

if (switchDocRegex.test(content) && !content.includes("if (window.BalsonsDocs) {\n          window.BalsonsDocs.renderDocumentsTab('tab-documents');") && !content.includes("window.BalsonsDocs.renderDocumentsTab('tab-documents');")) {
  content = content.replace(switchDocRegex, newSwitchDoc);
  console.log('✓ 11. Updated switchHrTab with BalsonsDocs trigger');
}

// 12. Update initHrApp
const initHrRegex = /function initHrApp\(\) \{[\r\n\s]*renderEmployeesTable\(\);[\r\n\s]*renderAttendanceTable\(\);[\r\n\s]*renderAdvanceTable\(\);[\r\n\s]*renderPayrollTable\(\);[\r\n\s]*renderAuditTable\(\);[\r\n\s]*renderHrSafetyDirectory\(\);[\r\n\s]*populatePayslipSelect\(\);[\r\n\s]*populateIdCardSelect\(\);[\s\S]*?initDropdowns\(\);[\r\n\s]*\}/;
const newInitHr = `function initHrApp() {
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

if (initHrRegex.test(content)) {
  content = content.replace(initHrRegex, newInitHr);
  console.log('✓ 12. Upgraded initHrApp with resilient execution');
} else {
  console.log('⚠️ Could not match initHrRegex');
}

// 13. Add backdrop outside click and Escape key dismissal
const bottomListenersRegex = /(document\.addEventListener\('click', function\(e\) \{[\r\n\s]*if \(!e\.target\.closest\('#userPillWrap'\)\) \{[\s\S]*?\}\s*\}\);)/;
const newBottomListeners = `$1

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

if (bottomListenersRegex.test(content) && !content.includes("BEDS Modal Backdrop Outside Click & Escape Key Dismissal")) {
  content = content.replace(bottomListenersRegex, newBottomListeners);
  console.log('✓ 13. Added backdrop click-outside and Escape key dismissal');
}

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Updated BALSONS HR MANAGER/frontend/index.html successfully! Final length:', content.length);

// Mirror to Launcher submodule
const launcherFile = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html';
if (fs.existsSync(launcherFile)) {
  fs.writeFileSync(launcherFile, content, 'utf8');
  console.log('✅ Synchronized to BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html');
}
