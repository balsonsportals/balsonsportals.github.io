const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/beds-workspace.js', 'utf8');

const lines = content.split('\n');
console.log('Public methods / objects in beds-workspace.js:');
lines.forEach((l, i) => {
  if (l.includes('window.Beds') || l.includes('window.Balsons') || l.includes('sync') || l.includes('BroadcastChannel')) {
    if (l.includes('function') || l.includes('=') || l.includes(':')) {
      console.log('Line ' + (i+1) + ': ' + l.trim());
    }
  }
});
