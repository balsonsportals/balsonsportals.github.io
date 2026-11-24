const fs = require('fs');

console.log('=== CHECK BALSONS-DOCS-MANAGER.JS ===');
const docsMgr = fs.readFileSync('common/balsons-docs-manager.js', 'utf8');
console.log('Length:', docsMgr.length);
console.log('Sample functions:', docsMgr.match(/function\s+\w+|window\.BalsonsDocs\s*=\s*{[^}]+/g));

console.log('\n=== CHECK GATE ENTRY TAB-DOCUMENTS & VIEWER ===');
const gate = fs.readFileSync('BALSONS GATE ENTRY MANAGER/frontend/index.html', 'utf8');
const lines = gate.split('\n');

let capturing = false;
let captured = [];
lines.forEach((l, i) => {
  if (l.includes('id="tab-documents"') || l.includes('bedsDocViewerBackdrop')) {
    console.log(`Gate Line ${i+1}: ${l.substring(0, 100)}`);
  }
});
