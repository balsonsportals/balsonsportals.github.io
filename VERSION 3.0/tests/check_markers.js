const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const lpIdx = content.indexOf('loadPayslipPreview');
console.log('Index:', lpIdx);
console.log(content.slice(lpIdx - 20, lpIdx + 80));

const vIdx = content.indexOf('verifyHrSafetyClearance');
console.log('Verify index:', vIdx);
console.log(content.slice(vIdx - 20, vIdx + 80));
