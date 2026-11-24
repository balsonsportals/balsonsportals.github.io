const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');

const rdtIdx = content.indexOf('renderDocumentsTable:');
console.log(content.slice(rdtIdx, rdtIdx + 1500));
