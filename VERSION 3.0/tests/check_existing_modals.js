const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== MODAL ONBOARD HEADER & CONTAINER ===');
console.log(lines.slice(1490, 1530).join('\n'));

console.log('\n=== MODAL ID CARD HEADER & CONTAINER ===');
console.log(lines.slice(1842, 1875).join('\n'));

console.log('\n=== MODAL PRINT ENROLMENT HEADER & CONTAINER ===');
console.log(lines.slice(2028, 2060).join('\n'));
