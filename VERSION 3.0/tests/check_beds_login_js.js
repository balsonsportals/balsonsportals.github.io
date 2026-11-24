const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/beds-portal-login.js', 'utf8');
const lines = content.split('\n');

console.log('=== BEDS-PORTAL-LOGIN.JS DETECT & INIT ===');
lines.forEach((l, i) => {
  if (l.includes('init') || l.includes('detect') || l.includes('balsons2026') || l.includes('login(')) {
    console.log(`Line ${i+1}: ${l.trim()}`);
  }
});
