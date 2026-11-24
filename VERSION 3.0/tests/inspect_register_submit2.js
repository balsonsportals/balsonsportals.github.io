const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const regSubmit = html.match(/function handleRegistrationSubmit[\s\S]*?<\/script>/);
if (regSubmit) {
  console.log(regSubmit[0].slice(2500, 6000));
}
