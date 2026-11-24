const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const idx = html.indexOf('<div class="section-head">01 &nbsp; PERSONAL INFORMATION</div>');
console.log(html.slice(idx, idx + 400));
