const fs = require('fs');
const js = fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/AuthService.gs', 'utf8');

const idx = js.indexOf('userRecord');
console.log(js.slice(idx + 500, idx + 1500));
