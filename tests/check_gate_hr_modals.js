const fs = require('fs');

function checkModals(file) {
  const content = fs.readFileSync(file, 'utf8');
  console.log('=== ' + file + ' ===');
  const hasLoginModal = content.includes('id="loginModal"');
  console.log('has loginModal:', hasLoginModal);
  if (hasLoginModal) {
    const idx = content.indexOf('id="loginModal"');
    console.log(content.substring(idx - 50, idx + 400));
  }
}

checkModals('BALSONS GATE ENTRY MANAGER/frontend/index.html');
checkModals('BALSONS HR MANAGER/frontend/index.html');
