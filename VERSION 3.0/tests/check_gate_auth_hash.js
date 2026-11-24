const fs = require('fs');
const js = fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/AuthService.gs', 'utf8');

const idx = js.indexOf('computedHash');
console.log(js.slice(idx - 100, idx + 400));
