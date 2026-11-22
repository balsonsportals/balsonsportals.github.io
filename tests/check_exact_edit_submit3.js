const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const idx = html.indexOf('function handleEditEmployeeSubmit');
console.log(html.slice(idx + 1400, idx + 2100));
