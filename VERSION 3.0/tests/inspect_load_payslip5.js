const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const psIdx = content.indexOf('function loadPayslipPreview');
console.log(content.slice(psIdx + 11500, psIdx + 14500));
