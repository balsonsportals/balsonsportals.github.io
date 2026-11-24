const fs = require('fs');
const path = require('path');

function listDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist!`);
    return;
  }
  const files = fs.readdirSync(dir);
  console.log(`=== Files in ${dir} ===`);
  files.forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    console.log(`  - ${f} (${stat.size} bytes)`);
  });
}

listDir('BALSONS GATE ENTRY MANAGER/apps-script');
listDir('BALSONS HR MANAGER/apps-script');
