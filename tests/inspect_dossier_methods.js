const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'utf8');

const lines = content.split('\n');
console.log('Balsons360Dossier methods:');
lines.forEach((l, i) => {
  if (l.includes('render') || l.includes('open') || l.includes('show') || l.includes('modal') || l.includes('getRecord')) {
    if (l.includes(':') || l.includes('function') || l.includes('=')) {
      console.log('Line ' + (i+1) + ': ' + l.trim());
    }
  }
});
