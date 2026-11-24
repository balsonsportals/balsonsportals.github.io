const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const uiMatch = html.match(/function completeSubmissionUI[\s\S]*?function clearForm[\s\S]*?^}/m);
if (uiMatch) {
  console.log(uiMatch[0].slice(0, 2000));
} else {
  const clearIdx = html.indexOf('function clearForm');
  console.log(html.slice(clearIdx, clearIdx + 1000));
}
