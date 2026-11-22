const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const attIdx = html.indexOf('id="attendanceTableBody"');
console.log(html.slice(Math.max(0, attIdx - 4000), attIdx - 1000));
