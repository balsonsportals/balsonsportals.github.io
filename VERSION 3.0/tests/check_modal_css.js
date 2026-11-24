const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== MODAL CSS RULES IN HR PORTAL ===');
lines.forEach((l, i) => {
  if (l.includes('.modal-') || l.includes('.beds-modal')) {
    console.log(`Line ${i+1}: ${l}`);
  }
});
