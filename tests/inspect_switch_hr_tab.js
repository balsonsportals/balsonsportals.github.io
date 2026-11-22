const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const m = html.match(/function switchHrTab[\s\S]*?function/);
if (m) {
  console.log(m[0]);
}
