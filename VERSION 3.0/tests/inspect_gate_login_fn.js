const fs = require('fs');
const js = fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/AuthService.gs', 'utf8');

const idx = js.indexOf('login:');
console.log(js.slice(idx, idx + 1500));
