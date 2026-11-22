const fs = require('fs');
const js = fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/AuthService.gs', 'utf8');

console.log('AuthService.gs in Gate:');
console.log(js.slice(0, 1500));
