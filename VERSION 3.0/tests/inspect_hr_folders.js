const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');
const idx = js.indexOf("'hr': {");
if (idx !== -1) {
  console.log(js.slice(idx, idx + 800));
}
