const fs = require('fs');

console.log('=== INSPECTING MATERIAL CHALLAN HEADER & FOOTER FROM GATE ENTRY ===');
const gate = fs.readFileSync('BALSONS GATE ENTRY MANAGER/frontend/index.html', 'utf8');

// Search for printableChallan or challan header/footer
const challanIdx = gate.indexOf('printableChallan');
if (challanIdx !== -1) {
  console.log(gate.slice(challanIdx - 50, challanIdx + 1200));
} else {
  // Search for challan-sheet or similar
  const matches = gate.match(/<div[^>]+id=["'][^"']*challan[^"']*["'][^>]*>/gi);
  console.log('Challan divs:', matches);
}

// Let's also search for gate pass header/footer in gate
const passIdx = gate.indexOf('printableGatePass');
if (passIdx !== -1) {
  console.log('\n=== GATE PASS SHEET HEADER ===');
  console.log(gate.slice(passIdx - 50, passIdx + 1000));
}
