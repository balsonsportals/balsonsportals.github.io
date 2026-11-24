const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

// Find all section-views
const sectionMatches = html.match(/<section[^>]*class="[^"]*section-view[^"]*"[^>]*>/g);
console.log('=== All section-view tags ===');
console.log(sectionMatches);

// Check all id="tab-*"
const tabMatches = html.match(/id="tab-[^"]+"/g);
console.log('=== All tab IDs ===');
console.log(tabMatches);

// Check switchHrTab function
const switchFn = html.match(/function switchHrTab[\s\S]*?^}/m);
console.log('=== switchHrTab function ===');
console.log(switchFn ? switchFn[0] : 'not found');
