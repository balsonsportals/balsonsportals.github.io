const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const navMatch = html.match(/<nav id="master-nav-tabs"[\s\S]*?<\/nav>/);
if (navMatch) {
  console.log('=== NAV TABS ===');
  console.log(navMatch[0]);
}

const switchMatch = html.match(/function switchHrTab[\s\S]*?^}/m);
if (switchMatch) {
  console.log('=== switchHrTab ===');
  console.log(switchMatch[0]);
}

const onboardMatch = html.match(/<div id="modalOnboard"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>/);
if (onboardMatch) {
  console.log('=== modalOnboard ===');
  console.log(onboardMatch[0].slice(0, 1500));
}
