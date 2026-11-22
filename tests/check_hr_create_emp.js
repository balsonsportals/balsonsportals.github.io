const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/apps-script/EmployeeService.gs', 'utf8');

const idx = js.indexOf('createEmployee:');
console.log(js.slice(idx, idx + 1500));
