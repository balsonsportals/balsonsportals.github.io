const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const m = html.match(/function openEditEmployeeModal[\s\S]*?function handleEditEmployeeSubmit[\s\S]*?^}/m);
if (m) {
  console.log(m[0]);
}
