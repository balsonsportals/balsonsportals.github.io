const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (i > 2200 && i < 2320) {
    if (l.includes('</div>') || l.includes('<script')) {
      console.log(`Line ${i+1}: ${l}`);
    }
  }
});
