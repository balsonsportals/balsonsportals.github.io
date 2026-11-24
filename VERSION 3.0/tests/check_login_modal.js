const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('id="loginModal"') || l.includes("id='loginModal'")) {
    console.log(`Line ${i+1}: ${l.trim()}`);
    console.log(lines.slice(i, i+30).join('\n'));
  }
});
