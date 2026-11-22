const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src);
  for (const entry of entries) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} -> ${destPath}`);
    }
  }
}

copyDir('BALSONS GATE ENTRY MANAGER/apps-script', 'BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/apps-script');
copyDir('BALSONS HR MANAGER/apps-script', 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/apps-script');
console.log('Apps script mirroring complete.');
