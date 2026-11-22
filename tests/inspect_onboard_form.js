const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

let inOnboard = false;
let count = 0;
lines.forEach((l, i) => {
  if (l.includes('id="modalOnboard"')) inOnboard = true;
  if (inOnboard && count < 90) {
    console.log(`Line ${i+1}: ${l}`);
    count++;
  }
});
