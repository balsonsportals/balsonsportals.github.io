const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== LINES 2475 to 2515 ===');
console.log(lines.slice(2474, 2515).join('\n'));

console.log('\n=== LINES 3630 to 3675 ===');
console.log(lines.slice(3629, 3675).join('\n'));
