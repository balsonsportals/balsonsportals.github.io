const fs = require('fs');

const files = [
  '.clasp.json',
  'BALSONS GATE ENTRY MANAGER/.clasp.json',
  'BALSONS HR MANAGER/.clasp.json'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    console.log(`=== ${f} ===`);
    console.log(fs.readFileSync(f, 'utf8'));
  } else {
    console.log(`=== ${f} NOT FOUND ===`);
  }
});
