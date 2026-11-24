const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/apps-script/EmployeeService.gs', 'utf8');

const idx = js.indexOf('submitRegistration');
console.log(js.slice(idx + 3200, idx + 5000));
