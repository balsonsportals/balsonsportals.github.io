const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const idx = content.indexOf('tab-payslips');
console.log(content.slice(idx - 60, idx + 800));
