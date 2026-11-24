const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const idx = html.indexOf('id="editEmployeeForm"');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 2200));
}
