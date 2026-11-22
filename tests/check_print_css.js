const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

let inPrint = false;
let printLines = [];
lines.forEach((l, i) => {
  if (l.includes('@media print')) {
    inPrint = true;
  }
  if (inPrint) {
    printLines.push(`Line ${i+1}: ${l}`);
    if (l.includes('</style>') || printLines.length > 70) {
      inPrint = false;
    }
  }
});

console.log(printLines.join('\n'));
