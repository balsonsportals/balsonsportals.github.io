const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/apps-script/BalsonsDriveProvisioner.gs', 'utf8');

console.log('BalsonsDriveProvisioner.gs:');
console.log(js.slice(0, 1500));
