const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

let inNav = false;
let navLines = [];
lines.forEach((l, i) => {
  if (l.includes('<nav') || l.includes('class="portal-nav"')) {
    inNav = true;
  }
  if (inNav) {
    navLines.push(`Line ${i+1}: ${l}`);
    if (l.includes('</nav>')) {
      inNav = false;
    }
  }
});

console.log(navLines.join('\n'));
