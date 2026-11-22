const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

console.log('Includes employeeTableBody:', html.includes('employeeTableBody'));
console.log('Includes attendanceTableBody:', html.includes('attendanceTableBody'));

const empIdx = html.indexOf('employeeTableBody');
if (empIdx !== -1) {
  console.log('--- snippet before employeeTableBody ---');
  console.log(html.slice(Math.max(0, empIdx - 500), empIdx + 200));
}

const attIdx = html.indexOf('attendanceTableBody');
if (attIdx !== -1) {
  console.log('--- snippet before attendanceTableBody ---');
  console.log(html.slice(Math.max(0, attIdx - 500), attIdx + 200));
}
