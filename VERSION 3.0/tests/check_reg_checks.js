const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

console.log('Includes handlePassportPhotoSelect:', html.includes('handlePassportPhotoSelect'));
console.log('Includes photoData in payload:', html.includes('photoData:'));
console.log('Includes BALSONS_EMPLOYEE_PHOTOS in register.html:', html.includes('BALSONS_EMPLOYEE_PHOTOS'));
