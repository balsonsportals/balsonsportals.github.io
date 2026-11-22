const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('function openOnboard') || l.includes('function closeOnboard') || l.includes('function openIdCard') || l.includes('function closeIdCard') || l.includes('function openEnrolment') || l.includes('function closeEnrolment')) {
    console.log(`Line ${i+1}: ${l}`);
    console.log(lines.slice(i, i+15).join('\n'));
    console.log('---');
  }
});
