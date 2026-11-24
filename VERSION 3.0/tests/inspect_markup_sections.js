const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const attIdx = html.indexOf('id="attendanceTableBody"');
console.log('--- HTML around attendanceTableBody ---');
console.log(html.slice(Math.max(0, attIdx - 1500), attIdx + 200));

// Search for any other occurrence of employeeTableBody in HTML (outside <script>)
const scriptIdx = html.indexOf('<script>');
const htmlBeforeScript = html.slice(0, scriptIdx);
console.log('HTML before script includes employeeTableBody:', htmlBeforeScript.includes('employeeTableBody'));
if (htmlBeforeScript.includes('employeeTableBody')) {
  const empIdx = htmlBeforeScript.indexOf('employeeTableBody');
  console.log('--- HTML before script around employeeTableBody ---');
  console.log(htmlBeforeScript.slice(Math.max(0, empIdx - 1000), empIdx + 200));
} else {
  console.log('employeeTableBody is MISSING from HTML markup before <script>!');
}
