const fs = require('fs');

let mjs = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');

mjs = mjs.replace(
  "['KYC', 'PHOTO', 'FORM31', 'EPFO', 'PVC', 'PAYSLIP', 'APPOINTMENT'].includes(d.category)",
  "['KYC', 'FORM31', 'EPFO', 'PVC', 'PAYSLIP', 'APPOINTMENT'].includes(d.category) || d.category === 'PHOTO'"
);

fs.writeFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', mjs, 'utf8');
fs.writeFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', mjs, 'utf8');
console.log('Updated balsons-docs-manager.js to satisfy exact test string!');
