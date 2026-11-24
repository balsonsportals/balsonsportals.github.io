const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');
const idx = html.indexOf('id="successModal"');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 1800));
}
