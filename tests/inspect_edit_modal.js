const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const editMatch = html.match(/<div id="modalEditEmployee"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>/);
if (editMatch) {
  console.log(editMatch[0].slice(0, 1500));
} else {
  console.log('modalEditEmployee not found by regex');
}
