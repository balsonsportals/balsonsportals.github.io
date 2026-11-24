const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== CSS MODAL LINES (560 - 595) ===');
console.log(lines.slice(560, 595).join('\n'));

console.log('\n=== CSS PRINT LINES (780 - 805) ===');
console.log(lines.slice(780, 805).join('\n'));
