const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

console.log('=== SEARCHING OPEN ADVANCE MODAL ===');
lines.forEach((line, idx) => {
  if (line.includes('openAdvanceModal') || line.includes('closeAdvanceModal') || line.includes('AdvanceModal')) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
  }
});

console.log('\n=== MODALS IN HR PORTAL ===');
lines.forEach((line, idx) => {
  if (line.includes('id="modal') || line.includes("id='modal")) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
  }
});

console.log('\n=== TABS AND SWITCH HR TAB ===');
lines.forEach((line, idx) => {
  if (line.includes('switchHrTab') || line.includes('switchTab')) {
    if (line.includes('function') || line.includes('const') || line.includes('let') || idx < 500) {
      console.log(`Line ${idx+1}: ${line.trim()}`);
    }
  }
});

console.log('\n=== TAB DOCUMENTS SECTION ===');
let inDocSection = false;
let docLines = [];
lines.forEach((line, idx) => {
  if (line.includes('id="tab-documents"') || line.includes("id='tab-documents'")) {
    inDocSection = true;
  }
  if (inDocSection) {
    docLines.push(`Line ${idx+1}: ${line}`);
    if (line.includes('</section>') || docLines.length > 30) {
      inDocSection = false;
    }
  }
});
console.log(docLines.join('\n'));
