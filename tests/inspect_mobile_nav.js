const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const m = html.match(/<nav class="beds-mobile-nav"[\s\S]*?<\/nav>/);
if (m) {
  console.log('Mobile nav:');
  console.log(m[0]);
}
