const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const attIdx = content.indexOf('function renderAttendanceTable');
console.log(content.slice(attIdx, attIdx + 2000));
