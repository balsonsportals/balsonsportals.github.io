const fs = require('fs');

function checkPortal(file) {
  const content = fs.readFileSync(file, 'utf8');
  console.log('=== ' + file + ' ===');
  const matches = content.match(/<input[^>]*type=["']password["'][^>]*>/gi);
  console.log('Password inputs in markup:', matches);
  const pwMentions = content.split('\n').filter(l => /loginPassword|password/i.test(l));
  console.log('Password lines count:', pwMentions.length);
  pwMentions.forEach((l, i) => console.log('  ' + (i+1) + ': ' + l.trim()));
}

checkPortal('BALSONS GATE ENTRY MANAGER/frontend/index.html');
checkPortal('BALSONS HR MANAGER/frontend/index.html');
