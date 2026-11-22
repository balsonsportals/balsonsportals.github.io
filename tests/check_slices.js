const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

function showSliceAround(str, before = 20, after = 150) {
  const idx = content.indexOf(str);
  if (idx === -1) {
    console.log(`NOT FOUND: ${str}`);
  } else {
    console.log(`FOUND "${str}":\n` + JSON.stringify(content.slice(idx - before, idx + after)));
  }
}

showSliceAround('.modal-backdrop {');
showSliceAround('@media print {');
showSliceAround('1so_aH05vVxiUJsIK6VS');
showSliceAround('Validate Attendance');
showSliceAround('payslipEmpSelect');
showSliceAround('switchHrTab(tabId)');
showSliceAround('initHrApp()');
showSliceAround('userPillWrap');
