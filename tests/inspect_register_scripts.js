const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const scriptMatches = html.match(/<script[\s\S]*?<\/script>/g);
if (scriptMatches) {
  scriptMatches.forEach((s, idx) => {
    console.log(`=== SCRIPT ${idx} (length ${s.length}) ===`);
    console.log(s.slice(0, 500));
  });
}
