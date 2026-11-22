const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/apps-script/Code.gs', 'utf8');

const idx = js.indexOf('auth.login');
console.log(js.slice(idx - 20, idx + 400));
