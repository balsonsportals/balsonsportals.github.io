const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const idx = html.indexOf('id="tab-documents"');
console.log(html.substring(idx - 50, idx + 800));
