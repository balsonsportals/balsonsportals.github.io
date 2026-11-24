const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('detectCurrentPortal') || l.includes('currentPortal')) {
    console.log(lines.slice(i, i+15).join('\n'));
  }
});
