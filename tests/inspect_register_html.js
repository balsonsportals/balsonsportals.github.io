const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const photoMatch = html.match(/up-photo[\s\S]{0,500}/);
if (photoMatch) {
  console.log('=== up-photo match in register.html ===');
  console.log(photoMatch[0]);
}

const formMatch = html.match(/<form[\s\S]*?<\/form>/);
if (formMatch) {
  console.log('Form found, length:', formMatch[0].length);
}
