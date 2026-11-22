const fs = require('fs');

console.log('Testing planned updates...');

// 1. Check index.html can be read
const hrIndex = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
console.log('HR index length:', hrIndex.length);

// 2. Check register.html can be read
const regHtml = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');
console.log('Register HTML length:', regHtml.length);

// 3. Check dossier-360.js can be read
const dossierJs = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'utf8');
console.log('Dossier JS length:', dossierJs.length);

// 4. Check docs manager
const docsJs = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');
console.log('Docs manager length:', docsJs.length);

console.log('All source files accessible.');
