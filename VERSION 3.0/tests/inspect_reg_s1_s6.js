const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const s1Match = html.match(/<section class="section">[\s\S]*?PERSONAL INFORMATION[\s\S]*?<\/section>/);
console.log('--- S1 ---');
console.log(s1Match ? s1Match[0] : 'not found');

const s6Match = html.match(/<section class="section">[\s\S]*?DOCUMENT CHECKLIST[\s\S]*?<\/section>/);
console.log('--- S6 ---');
console.log(s6Match ? s6Match[0] : 'not found');
