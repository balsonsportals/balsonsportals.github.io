const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('initHrApp') || l.includes('function initHr')) {
    console.log(`Line ${i+1}: ${l}`);
    console.log(lines.slice(i, i+30).join('\n'));
  }
});
