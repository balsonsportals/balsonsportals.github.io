const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

let inPayslips = false;
let payLines = [];
lines.forEach((l, i) => {
  if (l.includes('id="tab-payslips"') || l.includes("id='tab-payslips'")) {
    inPayslips = true;
  }
  if (inPayslips) {
    payLines.push(`Line ${i+1}: ${l}`);
    if (l.includes('</section>')) {
      inPayslips = false;
    }
  }
});

console.log(payLines.slice(0, 50).join('\n'));
console.log('... Total lines in tab-payslips:', payLines.length);
console.log(payLines.slice(-30).join('\n'));
