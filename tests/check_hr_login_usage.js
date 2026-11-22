const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== LOGIN OCCURRENCES IN HR INDEX.HTML ===');
lines.forEach((l, i) => {
  if (l.includes('login') || l.includes('Login') || l.includes('BalsonsHrAuth')) {
    if (l.includes('function') || l.includes('const') || l.includes('let') || l.includes('addEventListener') || l.includes('modal') || l.includes('submit')) {
      console.log(`Line ${i+1}: ${l.trim()}`);
    }
  }
});
