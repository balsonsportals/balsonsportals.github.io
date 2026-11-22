const fs = require('fs');

console.log('Gate appsscript.json:');
console.log(fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/appsscript.json', 'utf8'));

console.log('HR appsscript.json:');
console.log(fs.readFileSync('BALSONS HR MANAGER/apps-script/appsscript.json', 'utf8'));
