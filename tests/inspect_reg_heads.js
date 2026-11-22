const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');
const heads = html.match(/<div class="section-head">[\s\S]*?<\/div>/g);
console.log('Heads:', heads);
