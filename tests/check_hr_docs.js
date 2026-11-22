const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');
const lines = content.split('\n');

console.log('=== HR FOLDERS IN DRIVE_FOLDERS ===');
lines.forEach((l, i) => {
  if (l.includes("'hr':") || l.includes('HR_MANAGER')) {
    console.log(lines.slice(i, i+15).join('\n'));
  }
});

console.log('=== SAMPLE INITIAL DOCUMENTS ===');
lines.forEach((l, i) => {
  if (l.includes('portal: \'hr\'') || l.includes('portal: "hr"')) {
    console.log(lines.slice(Math.max(0, i-5), i+15).join('\n'));
  }
});
