const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const navMatch = html.match(/<nav id="master-nav-tabs"[\s\S]*?<\/nav>/);
console.log('Original nav match:');
console.log(navMatch[0]);
