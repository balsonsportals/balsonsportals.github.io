const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');

const idx1 = js.indexOf("'hr': {");
console.log('--- DRIVE_FOLDERS hr ---');
console.log(js.slice(idx1, idx1 + 450));

const idx2 = js.indexOf('getPortalDocuments');
console.log('--- getPortalDocuments ---');
console.log(js.slice(idx2, idx2 + 800));
