const fs = require('fs');
const js = fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/Code.gs', 'utf8');

console.log('Gate Code.gs (length: ' + js.length + '):');
console.log(js.slice(0, 1500));
