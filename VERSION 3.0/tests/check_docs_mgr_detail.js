const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');

const lines = content.split('\n');

console.log('=== renderDocumentsTab (lines 710-740) ===');
console.log(lines.slice(710, 740).join('\n'));

console.log('=== renderDocumentsTable (lines 815-845) ===');
console.log(lines.slice(815, 845).join('\n'));
