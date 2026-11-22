const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');
const idx = html.indexOf('class="receipt-table"');
console.log(html.slice(idx, idx + 250));
