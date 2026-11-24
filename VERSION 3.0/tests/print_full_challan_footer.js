const fs = require('fs');
const gate = fs.readFileSync('BALSONS GATE ENTRY MANAGER/frontend/index.html', 'utf8');

const challanIdx = gate.indexOf('printableChallan');
console.log(gate.slice(challanIdx + 2800, challanIdx + 4800));
