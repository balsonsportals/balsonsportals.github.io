const fs = require('fs');
const testJs = fs.readFileSync('tests/test_hr_portal_upgrade.js', 'utf8');

const idx = testJs.indexOf('TEST GROUP 7');
console.log(testJs.slice(idx, idx + 800));
