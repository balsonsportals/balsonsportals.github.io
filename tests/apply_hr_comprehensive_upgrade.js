const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
let content = fs.readFileSync(file, 'utf8');

console.log('Read BALSONS HR MANAGER/frontend/index.html. Original length:', content.length);

// 1. UPDATE PRINT CSS FOR BULK PAYSLIPS & ENROLMENT
const oldPrintRegex = /@media print\s*\{[\s\S]*?Print Case 3: Payslips[\s\S]*?margin:\s*0;\s*\}\s*\}/;

const newPrintCss = `@media print {
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

      /* Print Case 3: Single Payslip */
      body.printing-payslip #printablePayslip,
      body.printing-payslip #printablePayslip *,
      body:not(.printing-idcard):not(.printing-enrolment):not(.printing-bulk-payslips) #printablePayslip,
      body:not(.printing-idcard):not(.printing-enrolment):not(.printing-bulk-payslips) #printablePayslip * {
        visibility: visible !important;
      }
      body.printing-payslip #printablePayslip,
      body:not(.printing-idcard):not(.printing-enrolment):not(.printing-bulk-payslips) #printablePayslip {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
      }

      /* Print Case 4: Bulk Batch Salary Slips */
      body.printing-bulk-payslips #printableBulkPayslips,
      body.printing-bulk-payslips #printableBulkPayslips * {
        visibility: visible !important;
      }
      body.printing-bulk-payslips #printableBulkPayslips {
        display: block !important;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      .payslip-page-break {
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        margin-bottom: 0 !important;
        padding: 8mm 10mm !important;
        box-sizing: border-box !important;
        min-height: 275mm !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
      }
    }`;

if (oldPrintRegex.test(content)) {
  content = content.replace(oldPrintRegex, newPrintCss);
  console.log('✓ 1. Upgraded @media print rules with Bulk Salary Slip support');
} else {
  console.warn('⚠️ Could not match oldPrintRegex');
}

// 2. UPGRADE TAB 3: ATTENDANCE TO FULL EDITABLE ATTENDANCE ENTRY
const oldAttTableRegex = /<table class="beds-table">[\r\n\s]*<thead>[\r\n\s]*<tr>[\r\n\s]*<th>Emp ID<\/th>[\r\n\s]*<th>Employee Name<\/th>[\s\S]*?<\/tbody>[\r\n\s]*<\/table>/;

const newAttSectionHtml = `<!-- ATTENDANCE MUSTER TOOLBAR & CONTROLS -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px; background: var(--beds-bg-page); padding: 10px 14px; border-radius: var(--beds-radius-md); border: 1px solid var(--beds-border);">
          <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
            <span style="font-size: 11px; font-weight: 800; color: var(--beds-charcoal-heading); text-transform: uppercase;">Muster Filter:</span>
            <button class="btn btn-primary btn-sm" id="btnAttAll" onclick="filterAttendanceCategory('ALL')">All Workforce (68)</button>
            <button class="btn btn-secondary btn-sm" id="btnAttMonthly" onclick="filterAttendanceCategory('MONTHLY')">Monthly Staff (28)</button>
            <button class="btn btn-secondary btn-sm" id="btnAttDaily" onclick="filterAttendanceCategory('DAILY_PAY')">Daily Pay Crew (40)</button>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <input type="text" id="searchAttendanceInput" class="beds-input" placeholder="🔍 Search worker or trade..." style="font-size: 12px; width: 220px; padding: 4px 8px;" oninput="renderAttendanceTable(this.value)">
            <button class="btn btn-secondary btn-sm" onclick="markAllFullAttendance()" title="Auto-fill 26 present + 4 weekly offs for all monthly staff">⚡ Fill 30d/26d Standard</button>
            <button class="btn btn-primary btn-sm" onclick="saveAttendanceMuster()" style="background: #10b981; border-color: #10b981; font-weight: 800;">💾 Save &amp; Dual-Sync</button>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="beds-table">
            <thead>
              <tr style="background: var(--beds-bg-page);">
                <th style="width: 110px;">Emp ID</th>
                <th>Employee / Worker</th>
                <th style="width: 105px;">Wage Category</th>
                <th style="width: 80px; text-align: center;">Present (d)</th>
                <th style="width: 70px; text-align: center;">Weekly Off</th>
                <th style="width: 70px; text-align: center;">Paid Leave</th>
                <th style="width: 95px; text-align: center;">Payable Days</th>
                <th style="width: 85px; text-align: center;">OT (Hours)</th>
                <th>Statutory Rule</th>
                <th style="width: 140px; text-align: center;">Actions</th>
              </tr>
            </thead>
            <tbody id="attendanceTableBody">
              <!-- Dynamically populated with interactive editable inputs -->
            </tbody>
          </table>
        </div>`;

const oldAttSectionRegex = /<table class="beds-table">[\s\S]*?id="attendanceTableBody"[\s\S]*?<\/table>/;
if (oldAttSectionRegex.test(content)) {
  content = content.replace(oldAttSectionRegex, newAttSectionHtml);
  console.log('✓ 2. Upgraded Attendance tab to full interactive editable grid');
} else {
  console.warn('⚠️ Could not match oldAttSectionRegex');
}

// 3. UPGRADE TAB 6: PAYSLIPS WITH BULK PRINTING CONTROLS & BULK CONTAINER
const oldPayslipSectionRegex = /<!-- TAB 6: SALARY SLIP STUDIO -->[\s\S]*?<!-- Printable Payslip Preview -->[\r\n\s]*<div id="printablePayslip" class="payslip-sheet">[\s\S]*?<\/div>[\r\n\s]*<\/section>/;

const newPayslipSectionHtml = `<!-- TAB 6: SALARY SLIP STUDIO (OFFICIAL BALSONS BRANDED & BULK ENGINE) -->
    <section id="tab-payslips" class="section-view">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px; background: var(--beds-bg-panel); padding: 14px 18px; border-radius: var(--beds-radius-md); border-left: 4px solid var(--beds-teal-primary); border: 1px solid var(--beds-border);">
        <div>
          <h2 style="font-size: 18px; font-weight: 800; color: var(--beds-charcoal-heading); margin: 0; display: flex; align-items: center; gap: 8px;">
            📑 Official Salary &amp; Wage Slip Studio
            <span class="status-pill status-success" style="font-size: 10px;">MATERIAL CHALLAN HEADER &amp; FOOTER</span>
          </h2>
          <p style="font-size: 12px; color: var(--beds-text-secondary); margin: 2px 0 0 0;">
            Unified BALSONS corporate baseline styling across all statutory documents. Single slip &amp; high-volume bulk PDF batch printing.
          </p>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
          <select id="payslipEmpSelect" class="beds-select" style="min-width: 280px; font-size: 12px;" onchange="loadPayslipPreview(this.value)">
            <!-- Options populated by JS -->
          </select>
          <button class="btn btn-primary btn-sm" onclick="printPayslip()" style="font-weight: 800;">🖨️ Print Single Slip</button>
          <button class="btn btn-primary btn-sm" onclick="printBulkPayslips('ALL')" style="background: #D97706; border-color: #D97706; font-weight: 800;" title="Print all 68 workforce salary slips in continuous PDF with page breaks">🖨️ Bulk Print All (68)</button>
          <button class="btn btn-secondary btn-sm" onclick="printBulkPayslips('MONTHLY')" title="Print only monthly staff slips">📑 Bulk Monthly (28)</button>
          <button class="btn btn-secondary btn-sm" onclick="printBulkPayslips('DAILY_PAY')" title="Print only daily wage slips">📑 Bulk Daily Pay (40)</button>
          <button class="btn btn-secondary btn-sm" onclick="exportCurrentPayslipToDrive()" style="font-weight: 700; border-color: var(--beds-teal-primary); color: var(--beds-teal-primary);">☁️ Upload to Drive</button>
          <button class="btn btn-secondary btn-sm" onclick="exportAllPayslipsToDrive()" style="font-weight: 700; border-color: #10b981; color: #10b981;">☁️ Sync All to Drive</button>
          <button class="btn btn-secondary btn-sm" onclick="openPayslipEmpDossier()" style="font-weight: 700; color: #0097B2; border-color: #0097B2;">📄 Open 360° Dossier</button>
        </div>
      </div>

      <!-- Printable Payslip Preview (Single) -->
      <div id="printablePayslip" class="payslip-sheet">
        <!-- Populated dynamically by generateOfficialPayslipHtml() -->
      </div>

      <!-- Bulk Printable Container (Hidden on Screen, Active on Print) -->
      <div id="printableBulkPayslips" class="bulk-payslips-container" style="display: none;">
        <!-- Populated during bulk print -->
      </div>
    </section>`;

if (oldPayslipSectionRegex.test(content)) {
  content = content.replace(oldPayslipSectionRegex, newPayslipSectionHtml);
  console.log('✓ 3. Upgraded Payslip tab with Bulk Print engine and Challan header layout');
} else {
  console.warn('⚠️ Could not match oldPayslipSectionRegex');
}

// 4. UPGRADE TAB 9: SAFETY CLEARANCE WITH CATEGORY-WISE SEPARATION & 360 DOSSIER INTEGRATION
const oldClearanceTableRegex = /<!-- Master Workforce Safety Status Directory -->[\s\S]*?<div class="table-container">[\s\S]*?<table class="beds-table">[\s\S]*?id="hrSafetyDirectoryBody"[\s\S]*?<\/table>[\r\n\s]*<\/div>/;

const newClearanceSectionHtml = `<!-- Master Workforce Safety Status Directory (Category-Wise Separation) -->
      <div class="table-container">
        <div class="table-header" style="flex-wrap: wrap; gap: 12px;">
          <div>
            <h2>📋 Master Workforce Safety Induction &amp; Gate Pass Status Directory</h2>
            <p style="font-size: 12px; color: var(--beds-text-secondary); margin-top: 2px;">
              Cross-portal statutory gate entry clearance under Factory Rules and JTRWF Safety Standards.
            </p>
          </div>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <input type="text" id="searchHrSafetyInput" class="beds-input" placeholder="🔍 Search worker, badge, trade..." style="width: 240px; font-size: 12px;" oninput="renderHrSafetyDirectory(this.value)">
          </div>
        </div>

        <!-- CATEGORY-WISE FILTER PILLS -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap; padding: 10px 16px; background: var(--beds-bg-page); border-bottom: 1px solid var(--beds-border); align-items: center;">
          <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); margin-right: 4px;">Clearance Category:</span>
          <button class="btn btn-primary btn-sm" id="btnClrAll" onclick="filterClearanceCategory('ALL')">All Personnel (68)</button>
          <button class="btn btn-secondary btn-sm" id="btnClrLeadership" onclick="filterClearanceCategory('LEADERSHIP')">🏗️ Rigging Leads &amp; Engineers (8)</button>
          <button class="btn btn-secondary btn-sm" id="btnClrCrane" onclick="filterClearanceCategory('CRANE_OPS')">🚜 Crane Operators (12)</button>
          <button class="btn btn-secondary btn-sm" id="btnClrRiggers" onclick="filterClearanceCategory('SKILLED_RIGGERS')">🧰 Skilled Riggers &amp; Fitters (28)</button>
          <button class="btn btn-secondary btn-sm" id="btnClrHelpers" onclick="filterClearanceCategory('HELPERS')">👷 Helpers &amp; Trainees (19)</button>
          <button class="btn btn-secondary btn-sm" id="btnClrBlocked" onclick="filterClearanceCategory('BLOCKED')" style="color: #DC2626; border-color: #DC2626; font-weight: 700;">🔴 Blocked / Pending (1)</button>
        </div>

        <div style="overflow-x: auto;">
          <table class="beds-table">
            <thead>
              <tr style="background: var(--beds-bg-page);">
                <th>Induction ID</th>
                <th>Emp ID</th>
                <th>Full Name</th>
                <th>Trade / Role</th>
                <th>Category</th>
                <th>Safety Induction</th>
                <th>Helmet Badge</th>
                <th>Medical Fitness</th>
                <th>PTW Permit</th>
                <th>Gate Access Verdict</th>
                <th style="width: 170px; text-align: center;">Actions</th>
              </tr>
            </thead>
            <tbody id="hrSafetyDirectoryBody">
              <!-- Populated dynamically with Category & 360 Dossier link -->
            </tbody>
          </table>
        </div>
      </div>`;

if (oldClearanceTableRegex.test(content)) {
  content = content.replace(oldClearanceTableRegex, newClearanceSectionHtml);
  console.log('✓ 4. Upgraded Safety Clearance tab with Category-Wise Separation');
} else {
  console.warn('⚠️ Could not match oldClearanceTableRegex');
}

// 5. INJECT EDIT EMPLOYEE MODAL
const editEmployeeModalHtml = `
  <!-- 5. Edit Employee Master & Compensation Modal -->
  <div id="modalEditEmployee" class="beds-modal-backdrop modal-backdrop" style="display: none;">
    <div class="beds-modal modal-box" style="width: 760px; max-width: 95vw; max-height: 92vh; overflow-y: auto; padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--beds-teal-primary); padding-bottom: 12px; margin-bottom: 18px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 26px;">✏️</div>
          <div>
            <div class="modal-title" style="font-size: 17px; margin-bottom: 2px;">Edit Employee Master Record &amp; Compensation</div>
            <div style="font-size: 11.5px; color: var(--beds-text-secondary);">
              Direct in-portal master update • Instant synchronization across all registers &amp; databases
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeEditEmployeeModal()">✖</button>
      </div>

      <form id="editEmployeeForm" onsubmit="handleEditEmployeeSubmit(event)">
        <input type="hidden" id="editEmpId">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Employee ID
            </label>
            <input type="text" id="editEmpIdDisplay" class="beds-input" readonly style="width: 100%; background: var(--beds-bg-page); font-weight: 800; font-family: monospace;">
          </div>
          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Full Legal Name *
            </label>
            <input type="text" id="editEmpName" class="beds-input" required style="width: 100%; font-weight: 700;">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Trade / Designation *
            </label>
            <input type="text" id="editEmpTrade" class="beds-input" required style="width: 100%;">
          </div>
          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Department *
            </label>
            <input type="text" id="editEmpDept" class="beds-input" required style="width: 100%;" value="Heavy Lift &amp; Rigging Operations">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Wage Category *
            </label>
            <select id="editEmpWageType" class="beds-select" style="width: 100%; font-weight: 700;" onchange="toggleEditWageFields()">
              <option value="MONTHLY">Monthly Salaried Staff (With PF &amp; ESIC)</option>
              <option value="DAILY_PAY">Daily Pay Workforce (Exempt: No PF/ESIC)</option>
            </select>
          </div>

          <div id="editMonthlyCtcWrap">
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Monthly CTC (₹) *
            </label>
            <input type="number" id="editEmpCtc" class="beds-input" min="10000" step="500" style="width: 100%; font-weight: 700;">
          </div>

          <div id="editDailyRateWrap" style="display: none;">
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Daily Wage Rate (₹ / 8h Shift) *
            </label>
            <input type="number" id="editEmpDailyRate" class="beds-input" min="300" step="50" style="width: 100%; font-weight: 700;">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Bank Account (Last 4 Digits)
            </label>
            <input type="text" id="editEmpBank" class="beds-input" maxlength="4" style="width: 100%; font-family: monospace;">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Mobile Number
            </label>
            <input type="text" id="editEmpPhone" class="beds-input" style="width: 100%;">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading); display: block; margin-bottom: 5px;">
              Status
            </label>
            <select id="editEmpStatus" class="beds-select" style="width: 100%; font-weight: 700;">
              <option value="ACTIVE">🟢 Active Duty</option>
              <option value="ON_LEAVE">🟡 Approved Leave</option>
              <option value="SUSPENDED">🔴 Suspended / Blocked</option>
            </select>
          </div>
        </div>

        <div style="background: rgba(0, 151, 178, 0.08); border: 1px solid var(--beds-teal-primary); border-radius: var(--beds-radius-md); padding: 10px 14px; margin-bottom: 18px; font-size: 11.5px;">
          ⚡ <strong>Dual Sync Assurance:</strong> Updates will immediately recalculate muster days, gross earnings, PF/ESIC deductions, and sync to the cloud database without manual Google Sheet editing.
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeEditEmployeeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm" style="font-weight: 800;">✓ Save &amp; Update Record</button>
        </div>
      </form>
    </div>
  </div>`;

// Insert edit modal right after modalRecordAdvance
const modalAdvanceEnd = '  </div>\n\n  <script src="assets/js/config.js"></script>';
if (content.includes('id="modalRecordAdvance"')) {
  const insertIdx = content.indexOf('<script src="assets/js/config.js"></script>');
  if (insertIdx !== -1) {
    content = content.slice(0, insertIdx) + editEmployeeModalHtml + '\n\n  ' + content.slice(insertIdx);
    console.log('✓ 5. Injected modalEditEmployee markup');
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('Saved intermediate updates to index.html');
