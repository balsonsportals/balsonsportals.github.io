const cp = require('child_process');

const content = cp.execSync('git show def5c40:"BALSONS HR MANAGER/frontend/index.html"', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');
const mainIdx = content.indexOf('<main>');
const advIdx = content.indexOf('id="tab-advances"');
console.log(content.slice(mainIdx, advIdx));
