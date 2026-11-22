const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Add getPortalDocuments method before renderDocumentsTab
const targetMethod = '    // RENDER THE DOCUMENTS TAB CONTENT DYNAMICALLY\n    renderDocumentsTab: function(containerId = \'tab-documents\') {';

const newMethod = `    // STRICT PORTAL ISOLATION: FILTER DOCUMENTS SO ZERO OUTSIDE DOCUMENTS LEAK
    getPortalDocuments: function() {
      const cur = this.currentPortal || 'hr';
      if (cur === 'launcher') return this.documents;
      return this.documents.filter(d => {
        if (cur === 'hr') {
          return d.portal === 'hr' || d.portal === 'payroll' || ['KYC', 'FORM31', 'EPFO', 'PVC', 'PAYSLIP', 'APPOINTMENT'].includes(d.category);
        }
        if (cur === 'gate') {
          return d.portal === 'gate' || ['RGP', 'NRGP', 'VISITOR', 'VEHICLE', 'CHALLAN_INWARD', 'CHALLAN_OUTWARD', 'DRIVER_KYC'].includes(d.category);
        }
        if (cur === 'safety') {
          return d.portal === 'safety' || ['PTW', 'TBT', 'INCIDENT', 'INDUCTION', 'EHS_AUDIT'].includes(d.category);
        }
        if (cur === 'store') {
          return d.portal === 'store' || ['MRN', 'MIN', 'PO', 'STOCK_TRANSFER'].includes(d.category);
        }
        if (cur === 'operations') {
          return d.portal === 'operations' || ['LIFT_PLAN', 'RIGGING_INSPECTION', 'CRANE_FITNESS'].includes(d.category);
        }
        if (cur === 'purchase') {
          return d.portal === 'purchase' || ['RFQ', 'PO', 'VENDOR_KYC', 'COMPARATIVE'].includes(d.category);
        }
        return d.portal === cur;
      });
    },

    // RENDER THE DOCUMENTS TAB CONTENT DYNAMICALLY
    renderDocumentsTab: function(containerId = 'tab-documents') {`;

if (content.includes(targetMethod)) {
  content = content.replace(targetMethod, newMethod);
  console.log('✓ Injected getPortalDocuments()');
} else {
  // Try CRLF
  const targetMethodCRLF = targetMethod.replace(/\n/g, '\r\n');
  if (content.includes(targetMethodCRLF)) {
    content = content.replace(targetMethodCRLF, newMethod.replace(/\n/g, '\r\n'));
    console.log('✓ Injected getPortalDocuments() (CRLF)');
  } else {
    console.warn('❌ Could not find targetMethod');
  }
}

// 2. In renderDocumentsTab: use getPortalDocuments
content = content.replace('const portalDocs = this.documents;', 'const portalDocs = this.getPortalDocuments();');

// 3. In renderDocumentsTable: use getPortalDocuments
content = content.replace('const filtered = this.documents.filter(d => {', 'const portalDocs = this.getPortalDocuments();\n      const filtered = portalDocs.filter(d => {');

// 4. Update Category dropdown in renderDocumentsTab
const oldSelectRegex = /<select id="docCategoryFilter"[\s\S]*?<\/select>/;
const newSelect = `<select id="docCategoryFilter" class="beds-select" style="max-width: 260px;" onchange="BalsonsDocs.filterDocuments()">
                <option value="all">📁 All HR Statutory Records</option>
                <option value="KYC">👤 Employee KYC (Aadhaar &amp; PAN)</option>
                <option value="FORM31">🩺 Medical Fitness &amp; Form 31</option>
                <option value="EPFO">🏦 EPFO &amp; ESIC Bank Records</option>
                <option value="PVC">🛡️ Police Verification (PVC)</option>
                <option value="PAYSLIP">📑 Monthly Salary &amp; Wage Slips</option>
                <option value="APPOINTMENT">📜 Letters of Appointment</option>
              </select>`;

if (oldSelectRegex.test(content)) {
  content = content.replace(oldSelectRegex, newSelect);
  console.log('✓ Upgraded docCategoryFilter options for HR');
}

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Updated BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js');

// Mirror to Launcher submodule
const launcherFile = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js';
if (fs.existsSync(launcherFile)) {
  fs.writeFileSync(launcherFile, content, 'utf8');
  console.log('✅ Synchronized to Launcher mirror');
}
