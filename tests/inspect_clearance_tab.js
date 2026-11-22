const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const clrIdx = content.indexOf('tab-safety-clearance');
console.log(content.slice(clrIdx - 50, clrIdx + 3000));
