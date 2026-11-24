const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

console.log(lines.slice(785, 810).join('\n'));
