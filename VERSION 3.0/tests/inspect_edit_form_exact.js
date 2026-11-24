const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const m = html.match(/<form id="editEmployeeForm"[\s\S]*?<\/form>/);
console.log(m[0]);
