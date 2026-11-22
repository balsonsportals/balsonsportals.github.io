const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const pIdx = content.indexOf('function renderPayrollTable');
console.log(content.slice(pIdx, pIdx + 2000));
