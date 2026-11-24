const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const fnIdx = html.indexOf('function switchHrTab');
console.log(html.substring(fnIdx + 1200, fnIdx + 2500));
