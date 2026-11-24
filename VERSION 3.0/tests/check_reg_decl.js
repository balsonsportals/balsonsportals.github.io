const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const idx1 = html.indexOf('declarationAccepted:');
console.log('--- declarationAccepted ---');
console.log(html.slice(idx1, idx1 + 200));

const idx2 = html.indexOf('function completeSubmissionUI');
console.log('--- completeSubmissionUI ---');
console.log(html.slice(idx2, idx2 + 400));
