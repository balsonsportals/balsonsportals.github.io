const fs = require('fs');
const path = require('path');

function copyFileSafe(src, dest) {
  if (src.includes('BALSONS GATE ENTRY MANAGER') || dest.includes('BALSONS GATE ENTRY MANAGER')) {
    console.warn(`BLOCKED: Attempted to touch Gate Entry Manager! Skipping ${src} -> ${dest}`);
    return;
  }
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${src} -> ${dest}`);
}

// 1. Mirror HR Manager to Launcher
copyFileSafe('BALSONS HR MANAGER/frontend/index.html', 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html');
copyFileSafe('BALSONS HR MANAGER/frontend/register.html', 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/register.html');
copyFileSafe('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js');
copyFileSafe('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/dossier-360.js');

// 2. Propagate dossier-360.js to Safety and Store Managers
copyFileSafe('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'BALSONS SAFETY MANAGER/frontend/assets/js/dossier-360.js');
copyFileSafe('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'BALSONS STORE MANAGER/frontend/assets/js/dossier-360.js');

// 3. Propagate to Launcher Safety and Store Managers
copyFileSafe('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/dossier-360.js');
copyFileSafe('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/dossier-360.js');

console.log('Mirroring completed safely.');
