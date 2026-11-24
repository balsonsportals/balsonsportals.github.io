const fs = require('fs');
const content = fs.readFileSync('BALSONS GATE ENTRY MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

console.log(lines.slice(3465, 3540).join('\n'));
