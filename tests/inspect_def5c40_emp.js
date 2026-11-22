const cp = require('child_process');

const content = cp.execSync('git show def5c40:"BALSONS HR MANAGER/frontend/index.html"', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');
const idx = content.indexOf('id="employeeTableBody"');
if (idx !== -1) {
  console.log('=== Found employeeTableBody in def5c40 ===');
  console.log(content.slice(Math.max(0, idx - 2000), idx + 800));
} else {
  console.log('Not found in def5c40');
}
