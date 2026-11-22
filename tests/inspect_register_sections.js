const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const s1Match = html.match(/<section[\s\S]*?<\/section>/g);
if (s1Match) {
  s1Match.slice(0, 3).forEach((sec, idx) => {
    console.log(`=== SECTION ${idx} ===`);
    console.log(sec.slice(0, 400));
  });
}
