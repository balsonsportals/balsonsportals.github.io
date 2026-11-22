const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'utf8');

console.log('dossier-360.js length:', content.length);
console.log(content.slice(0, 1500));
