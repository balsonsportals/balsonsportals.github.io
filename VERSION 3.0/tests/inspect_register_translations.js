const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const m = html.match(/const translations\s*=\s*\{[\s\S]*?\};/);
if (m) {
  console.log(m[0].slice(0, 800));
}
