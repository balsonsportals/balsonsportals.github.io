const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const pIdx = content.indexOf('function renderPayrollTable');
console.log(content.slice(pIdx + 1900, pIdx + 3000));
