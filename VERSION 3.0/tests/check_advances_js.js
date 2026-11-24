const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('advanceTableBody') || l.includes('ADVANCES') || l.includes('renderAdvance')) {
    console.log(`Line ${i+1}: ${l.trim()}`);
  }
});
