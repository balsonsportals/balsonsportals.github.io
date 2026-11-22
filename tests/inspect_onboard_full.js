const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const onboardMatch = html.match(/<div id="modalOnboard"[\s\S]*?<\/form>/);
if (onboardMatch) {
  console.log(onboardMatch[0]);
}
