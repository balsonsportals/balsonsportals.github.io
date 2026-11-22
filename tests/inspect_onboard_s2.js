const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const s2Match = html.match(/<!-- SECTION 2:[\s\S]*?<!-- SECTION 3:/);
if (s2Match) {
  console.log(s2Match[0]);
}
