const fs = require('fs');
const path = require('path');

function searchDir(dir, needle) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'BALSONS GATE ENTRY MANAGER') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchDir(full, needle);
    } else if (f.endsWith('.html') || f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes(needle)) {
        console.log(`Found "${needle}" in ${full}`);
      }
    }
  }
}

['BALSONS_HR_WORKFORCE', 'WORKFORCE_360', 'balsons_enterprise_sync', 'photo'].forEach(n => {
  console.log(`=== Searching for ${n} ===`);
  searchDir('.', n);
});
