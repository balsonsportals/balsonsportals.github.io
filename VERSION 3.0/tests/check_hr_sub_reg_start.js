const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/apps-script/EmployeeService.gs', 'utf8');

const idx = js.indexOf('submitRegistration: function');
console.log(js.slice(idx, idx + 600));
