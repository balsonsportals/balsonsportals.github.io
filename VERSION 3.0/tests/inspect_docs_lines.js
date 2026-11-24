const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');

const lines = content.split('\n');
console.log(lines.slice(715, 760).join('\n'));
