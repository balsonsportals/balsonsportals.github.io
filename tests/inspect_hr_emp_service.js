const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/apps-script/EmployeeService.gs', 'utf8');

console.log('HR EmployeeService.gs (length: ' + js.length + '):');
console.log(js.slice(0, 1500));
