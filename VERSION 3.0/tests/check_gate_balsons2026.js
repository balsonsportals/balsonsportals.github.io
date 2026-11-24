const fs = require('fs');
const content = fs.readFileSync('BALSONS GATE ENTRY MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('balsons2026')) {
    console.log(`Gate Line ${i+1}: ${l.trim()}`);
  }
});
