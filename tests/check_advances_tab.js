const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

let inAdvance = false;
let advLines = [];
lines.forEach((l, i) => {
  if (l.includes('id="tab-advances"') || l.includes("id='tab-advances'")) {
    inAdvance = true;
  }
  if (inAdvance) {
    advLines.push(`Line ${i+1}: ${l}`);
    if (l.includes('</section>')) {
      inAdvance = false;
    }
  }
});

console.log(advLines.join('\n'));
