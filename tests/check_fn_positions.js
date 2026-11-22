const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

function findFn(name) {
  const idx = content.indexOf(`function ${name}`);
  console.log(`Function ${name}: ${idx}`);
}

findFn('renderEmployeesTable');
findFn('renderAttendanceTable');
findFn('renderAdvanceTable');
findFn('renderPayrollTable');
findFn('loadPayslipPreview');
findFn('renderAuditTable');
findFn('renderHrSafetyDirectory');
findFn('verifyHrSafetyClearance');
