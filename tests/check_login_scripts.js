const fs = require('fs');

const loginJsPath = 'BALSONS HR MANAGER/frontend/assets/js/beds-portal-login.js';
if (fs.existsSync(loginJsPath)) {
  const content = fs.readFileSync(loginJsPath, 'utf8');
  console.log('=== beds-portal-login.js ===');
  console.log('Length:', content.length);
  console.log('Sample:', content.slice(0, 1000));
}

const authJsPath = 'BALSONS HR MANAGER/frontend/assets/js/auth.js';
if (fs.existsSync(authJsPath)) {
  const content = fs.readFileSync(authJsPath, 'utf8');
  console.log('=== auth.js ===');
  console.log('Length:', content.length);
  console.log('Sample:', content.slice(0, 1000));
}

const configJsPath = 'BALSONS HR MANAGER/frontend/assets/js/config.js';
if (fs.existsSync(configJsPath)) {
  const content = fs.readFileSync(configJsPath, 'utf8');
  console.log('=== config.js ===');
  console.log('Length:', content.length);
  console.log('Sample:', content.slice(0, 1000));
}
