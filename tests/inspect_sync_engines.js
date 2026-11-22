const fs = require('fs');

console.log('=== API CLIENT IN HR PORTAL ===');
const apiPath = 'BALSONS HR MANAGER/frontend/assets/js/api-client.js';
if (fs.existsSync(apiPath)) {
  const content = fs.readFileSync(apiPath, 'utf8');
  console.log('Length:', content.length);
  console.log(content.slice(0, 1500));
}

console.log('\n=== WORKSPACE SYNC IN HR PORTAL ===');
const wsPath = 'BALSONS HR MANAGER/frontend/assets/js/beds-workspace.js';
if (fs.existsSync(wsPath)) {
  const content = fs.readFileSync(wsPath, 'utf8');
  console.log('Length:', content.length);
  console.log(content.slice(0, 1500));
}
