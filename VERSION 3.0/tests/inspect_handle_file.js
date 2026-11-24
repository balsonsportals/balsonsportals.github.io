const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const fnMatch = html.match(/function handleFileSelect[\s\S]*?function updateUploadSummary/);
if (fnMatch) {
  console.log(fnMatch[0]);
}
