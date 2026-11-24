const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const idx = html.indexOf('id="onbPhotoBox"');
console.log(html.slice(idx + 250, idx + 800));
