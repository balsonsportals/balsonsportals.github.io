const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

console.log('1. Modal CSS check:');
const mIdx = content.indexOf('.modal-backdrop');
console.log(content.slice(mIdx - 20, mIdx + 250));

console.log('\n2. Print CSS check:');
const pIdx = content.indexOf('@media print');
console.log(content.slice(pIdx - 20, pIdx + 300));

console.log('\n3. Header badges check:');
const hIdx = content.indexOf('1so_aH05vVxiUJsIK6VS');
console.log(content.slice(hIdx - 50, hIdx + 200));

console.log('\n4. Attendance buttons check:');
const aIdx = content.indexOf('validate Attendance');
console.log(content.slice(aIdx - 50, aIdx + 200));

console.log('\n5. Payslip toolbar check:');
const psIdx = content.indexOf('payslipEmpSelect');
console.log(content.slice(psIdx - 50, psIdx + 200));
