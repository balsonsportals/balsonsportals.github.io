const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const s0Match = html.match(/<section class="section">[\s\S]*?PERSONAL INFORMATION[\s\S]*?<\/section>/);
if (s0Match) {
  console.log(s0Match[0]);
}
