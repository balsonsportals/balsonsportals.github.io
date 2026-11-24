const fs = require('fs');
const js = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'utf8');

const photoIndices = [];
let p = 0;
while ((p = js.indexOf('photo', p)) !== -1) {
  photoIndices.push(p);
  p += 5;
}
console.log('photo found count:', photoIndices.length);
photoIndices.slice(0, 5).forEach(pos => {
  console.log('--- snippet ---');
  console.log(js.slice(Math.max(0, pos - 50), pos + 100));
});
