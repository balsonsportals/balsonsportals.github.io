const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const fnIdx = html.indexOf('function switchHrTab');
console.log(html.substring(fnIdx, fnIdx + 1500));
