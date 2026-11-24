const fs = require('fs');
const testJs = fs.readFileSync('tests/verify_user_request.js', 'utf8');
const idx = testJs.indexOf('receipt displays photo');
console.log(testJs.slice(idx - 20, idx + 100));

const regHtml = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');
console.log('regHtml has id="receiptPhotoImg":', regHtml.includes('id="receiptPhotoImg"'));
