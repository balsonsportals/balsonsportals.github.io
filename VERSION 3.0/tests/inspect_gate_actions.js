const fs = require('fs');
const js = fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/Code.gs', 'utf8');

const idx = js.indexOf('switch (action)');
if (idx !== -1) {
  console.log(js.slice(idx, idx + 2500));
} else {
  console.log(js.slice(2000, 4500));
}
