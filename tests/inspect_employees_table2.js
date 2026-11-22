const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const empIdx = content.indexOf('function renderEmployeesTable');
console.log(content.slice(empIdx + 1900, empIdx + 3400));
