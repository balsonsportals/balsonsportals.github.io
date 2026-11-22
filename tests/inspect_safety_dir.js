const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const sIdx = content.indexOf('function renderHrSafetyDirectory');
console.log(content.slice(sIdx, sIdx + 2000));
