const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/apps-script/EmployeeService.gs', 'utf8');

const idx = js.indexOf('sheet.appendRow');
console.log(js.slice(idx, idx + 800));
