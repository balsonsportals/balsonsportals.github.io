const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'utf8');

const idx = js.indexOf('renderCard: function');
if (idx !== -1) {
  console.log(js.slice(idx, idx + 1200));
}
