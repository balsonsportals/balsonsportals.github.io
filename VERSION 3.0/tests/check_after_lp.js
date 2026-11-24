const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const lpIdx = content.indexOf('function loadPayslipPreview');
console.log('--- loadPayslipPreview starts at:', lpIdx);
console.log(content.slice(lpIdx, lpIdx + 300));

// Find the end of loadPayslipPreview
// What function is defined after loadPayslipPreview?
const sub = content.slice(lpIdx);
const nextFnMatch = sub.slice(100).match(/function\s+([a-zA-Z0-9_$]+)\s*\(/);
if (nextFnMatch) {
  console.log('Next function after loadPayslipPreview:', nextFnMatch[1]);
  const nextFnIdx = lpIdx + 100 + sub.slice(100).indexOf(nextFnMatch[0]);
  console.log('Next function at:', nextFnIdx);
  console.log(content.slice(nextFnIdx - 50, nextFnIdx + 100));
}
