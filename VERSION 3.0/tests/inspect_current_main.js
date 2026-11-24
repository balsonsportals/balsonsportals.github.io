const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const mainIdx = html.indexOf('<main>');
const advIdx = html.indexOf('id="tab-advances"');
console.log(html.slice(mainIdx, advIdx));
