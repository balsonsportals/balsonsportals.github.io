const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== MOBILE BAR IN HR PORTAL ===');
lines.forEach((l, i) => {
  if (l.includes('mobile-pill') || l.includes('mobile-nav') || l.includes('mobile-bar') || l.includes('bottom-bar') || l.includes('beds-mobile')) {
    console.log(`Line ${i+1}: ${l}`);
  }
});
