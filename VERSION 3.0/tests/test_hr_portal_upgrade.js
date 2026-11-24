const fs = require('fs');

console.log('====================================================');
console.log('   BALSONS HR & PAYROLL MANAGER COMPREHENSIVE TEST  ');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`   ✅ [PASS] ${description}`);
    passed++;
  } else {
    console.error(`   ❌ [FAIL] ${description}`);
    failed++;
  }
}

const hrHtmlPath = 'BALSONS HR MANAGER/frontend/index.html';
const hrHtml = fs.readFileSync(hrHtmlPath, 'utf8');

const authPath = 'BALSONS HR MANAGER/frontend/assets/js/auth.js';
const authCode = fs.readFileSync(authPath, 'utf8');

const loginPath = 'BALSONS HR MANAGER/frontend/assets/js/beds-portal-login.js';
const loginCode = fs.readFileSync(loginPath, 'utf8');

const docsPath = 'BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js';
const docsCode = fs.readFileSync(docsPath, 'utf8');

console.log('[TEST GROUP 1: Modals & BEDS V1.2 Pop-up System]');
assert('modalOnboard exists with beds-modal-backdrop', hrHtml.includes('id="modalOnboard" class="beds-modal-backdrop modal-backdrop"'));
assert('modalIdCard exists with beds-modal-backdrop', hrHtml.includes('id="modalIdCard" class="beds-modal-backdrop modal-backdrop"'));
assert('modalPrintEnrolmentForm exists with beds-modal-backdrop', hrHtml.includes('id="modalPrintEnrolmentForm" class="beds-modal-backdrop modal-backdrop"'));
assert('modalRecordAdvance exists with beds-modal-backdrop', hrHtml.includes('id="modalRecordAdvance" class="beds-modal-backdrop modal-backdrop"'));
assert('modalEditEmployee exists with beds-modal-backdrop', hrHtml.includes('id="modalEditEmployee" class="beds-modal-backdrop modal-backdrop"'));
assert('Modal CSS includes BEDS V1.2 animation', hrHtml.includes('animation: bedsModalPop'));
assert('Modal backdrop blur and z-index 99999 defined', hrHtml.includes('backdrop-filter: blur(6px)') && hrHtml.includes('z-index: 99999'));

console.log('\n[TEST GROUP 2: Material Challan Header & Footer in Salary Slips]');
assert('Challan header contains Specialized in... bullet points', hrHtml.includes('Heavy Cargo Lifters, Movers &amp; Erectors') && hrHtml.includes('Heavy Crane &amp; Gantry Supplier'));
assert('Challan header contains Industry sectors', hrHtml.includes('Automobile, Forging, Stamping, Petrochemical, Ports, Steel'));
assert('Challan header contains BALSONS HEAVY LIFT & SHIFT with Pune Reg Office', hrHtml.includes('HEAVY LIFT &amp; SHIFT') && hrHtml.includes('Chinchwad Pune Maharashtra'));
assert('Challan header contains dual-color dividing line', hrHtml.includes('background: linear-gradient(to right, #0097B2 45%, #E64646 45%)'));
assert('Payslip footer contains Receiver / Worker Signature', hrHtml.includes('Receiver / Worker Signature'));
assert('Payslip footer contains Site HR Manager (Priyanka Senapati)', hrHtml.includes('PRIYANKA SENAPATI') && hrHtml.includes('Site HR Manager'));
assert('Payslip footer contains Authorised Signatory (Prashant Muley)', hrHtml.includes('AUTHORISED SIGNATORY') && hrHtml.includes('PRASHANT MULEY'));
assert('Payslip footer contains compulsory motto', hrHtml.includes('Difficult we do easily impossible takes little time…!'));

console.log('\n[TEST GROUP 3: Bulk Salary Slip Printing Feature]');
assert('Bulk printing container exists (#printableBulkPayslips)', hrHtml.includes('id="printableBulkPayslips"'));
assert('printBulkPayslips function defined in JS', hrHtml.includes('function printBulkPayslips('));
assert('Bulk print buttons exist for All, Monthly, and Daily Pay', hrHtml.includes("printBulkPayslips('ALL')") && hrHtml.includes("printBulkPayslips('MONTHLY')") && hrHtml.includes("printBulkPayslips('DAILY_PAY')"));
assert('@media print defines .payslip-page-break with page-break-after: always', hrHtml.includes('page-break-after: always !important'));
assert('@media print handles body.printing-bulk-payslips', hrHtml.includes('body.printing-bulk-payslips #printableBulkPayslips'));

console.log('\n[TEST GROUP 4: Full Interactive Editable Attendance Entry]');
assert('Attendance table has interactive number inputs for Present days', hrHtml.includes('updateAttendanceInline(\'${att.empId}\', \'present\''));
assert('Attendance table has interactive number inputs for Weekly Off', hrHtml.includes('updateAttendanceInline(\'${att.empId}\', \'wo\''));
assert('Attendance table has interactive number inputs for Paid Leave', hrHtml.includes('updateAttendanceInline(\'${att.empId}\', \'pl\''));
assert('Attendance table has interactive number inputs for Overtime hours', hrHtml.includes('updateAttendanceInline(\'${att.empId}\', \'otHours\''));
assert('updateAttendanceInline function defined in JS', hrHtml.includes('function updateAttendanceInline('));
assert('markAllFullAttendance function defined in JS', hrHtml.includes('function markAllFullAttendance()'));
assert('saveAttendanceMuster function defined in JS', hrHtml.includes('function saveAttendanceMuster()'));
assert('Quick increment buttons (+1 P, +2h OT) exist in attendance rows', hrHtml.includes('+1 P') && hrHtml.includes('+2h OT'));

console.log('\n[TEST GROUP 5: Tri-Portal Work Authorisation & Category-Wise Clearance]');
assert('Clearance table has category filter pills (All, Leadership, Crane, Riggers, Helpers, Blocked)', 
  hrHtml.includes("filterClearanceCategory('ALL')") &&
  hrHtml.includes("filterClearanceCategory('LEADERSHIP')") &&
  hrHtml.includes("filterClearanceCategory('CRANE_OPS')") &&
  hrHtml.includes("filterClearanceCategory('SKILLED_RIGGERS')") &&
  hrHtml.includes("filterClearanceCategory('HELPERS')") &&
  hrHtml.includes("filterClearanceCategory('BLOCKED')")
);
assert('filterClearanceCategory function defined in JS', hrHtml.includes('function filterClearanceCategory('));
assert('toggleHrGateClearance function defined in JS', hrHtml.includes('function toggleHrGateClearance('));
assert('hrSafetyMasterExpanded contains categorized records', hrHtml.includes('hrSafetyMasterExpanded') && hrHtml.includes('LEADERSHIP'));

console.log('\n[TEST GROUP 6: 360° Dossier Universal Coverage]');
assert('Employees table has 360 Dossier link & button', hrHtml.includes("Balsons360Dossier.openModal('${emp.empId}')"));
assert('Attendance table has 360 Dossier link & button', hrHtml.includes("Balsons360Dossier.openModal('${att.empId}')"));
assert('Advances table has 360 Dossier link & button', hrHtml.includes("Balsons360Dossier.openModal('${adv.empId}')"));
assert('Payroll table has 360 Dossier link & button', hrHtml.includes("Balsons360Dossier.openModal('${e.empId}')"));
assert('Clearance directory has 360 Dossier link & button', hrHtml.includes("Balsons360Dossier.openModal('${item.empId}')"));
assert('Payslip studio has Open 360 Dossier button', hrHtml.includes('onclick="openPayslipEmpDossier()"'));

console.log('\n[TEST GROUP 7: Document Hub Strict Portal Isolation]');
assert('balsons-docs-manager.js contains getPortalDocuments()', docsCode.includes('getPortalDocuments: function()'));
assert('getPortalDocuments filters strictly by currentPortal', docsCode.includes("cur === 'hr'") && docsCode.includes("['KYC', 'FORM31', 'EPFO', 'PVC', 'PAYSLIP', 'APPOINTMENT']"));
assert('docCategoryFilter dropdown in HR documents tab only shows HR categories', docsCode.includes('All HR Statutory Records') && docsCode.includes('Medical Fitness &amp; Form 31'));

console.log('\n[TEST GROUP 8: Dual-Sync & Instant Cross-Portal Auto-Sync]');
assert('BroadcastChannel configured for instant cross-portal sync', hrHtml.includes("new BroadcastChannel('balsons_enterprise_sync')"));
assert('broadcastHrUpdate function defined and updates localStorage & backend', hrHtml.includes('function broadcastHrUpdate(') && hrHtml.includes('localStorage.setItem'));
assert('Edit Employee modal has handleEditEmployeeSubmit', hrHtml.includes('function handleEditEmployeeSubmit('));

console.log('\n[TEST GROUP 9: Launcher Mirror Synchronization]');
const launcherHtml = fs.readFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html', 'utf8');
assert('Launcher mirror is byte-identical to HR portal frontend/index.html', launcherHtml === hrHtml);

console.log('\n====================================================');
console.log(`TOTAL ADVANCED HR SUITE TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('====================================================');

if (failed > 0) process.exit(1);
