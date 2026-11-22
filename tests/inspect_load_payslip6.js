const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const psIdx = content.indexOf('function loadPayslipPreview');
console.log(content.slice(psIdx + 14500, psIdx + 16500));
