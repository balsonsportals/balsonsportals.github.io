const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const syncMatches = html.match(/(?:BroadcastChannel|balsons_enterprise_sync)[\s\S]{0,500}/g);
if (syncMatches) {
  syncMatches.forEach((s, idx) => {
    console.log(`=== SYNC MATCH ${idx} ===`);
    console.log(s);
  });
}
