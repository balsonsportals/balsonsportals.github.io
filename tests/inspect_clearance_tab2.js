const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const clrIdx = content.indexOf('tab-safety-clearance');
console.log(content.slice(clrIdx + 2900, clrIdx + 6000));
