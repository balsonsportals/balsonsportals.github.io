const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /<!-- TAB 6: SALARY SLIPS -->\s*<section id="tab-payslips" class="section-view">[\s\S]*?<\/section>/;

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
          <select id="payslipEmpSelect" class="beds-select" style="min-width: 260px; font-size: 12px;" onchange="loadPayslipPreview(this.value)">
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

if (regex.test(content)) {
  content = content.replace(regex, newPayslipSectionHtml);
  fs.writeFileSync(file, content, 'utf8');
  console.log('✅ Updated tab-payslips successfully!');
} else {
  console.warn('❌ Could not match tab-payslips regex');
}
