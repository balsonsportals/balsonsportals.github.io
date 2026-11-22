const fs = require('fs');

const gateLogin = fs.readFileSync('BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-portal-login.js', 'utf8');
const hrLogin = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/beds-portal-login.js', 'utf8');

console.log('Gate login length:', gateLogin.length);
console.log('HR login length:', hrLogin.length);
console.log('Are they identical?', gateLogin === hrLogin);

const gateHasCommonPass = gateLogin.includes('balsons2026');
const hrHasCommonPass = hrLogin.includes('balsons2026');
console.log('Gate has balsons2026:', gateHasCommonPass);
console.log('HR has balsons2026:', hrHasCommonPass);
