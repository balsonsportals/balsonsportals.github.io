const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'utf8');

const m = js.match(/function renderDossierCard[\s\S]*?function|window\.BalsonsDossier360\s*=\s*{[\s\S]*?};/);
if (m) {
  console.log(m[0].slice(0, 1500));
} else {
  console.log(js.slice(js.length - 1500));
}
