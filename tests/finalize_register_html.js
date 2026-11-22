const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

// Replace declarationAccepted block
const declOldRegex = /declarationAccepted:\s*document\.getElementById\('declarationAccepted'\)\.checked,\s*attachments:\s*uploadedAttachments/;
const declNew = `declarationAccepted: document.getElementById('declarationAccepted').checked,
    photoData: window.__PASSPORT_PHOTO_DATA__ || (uploadedAttachments.find(a => a.docType === 'PHOTO') || {}).dataUrl || '',
    attachments: uploadedAttachments`;

if (declOldRegex.test(html)) {
  html = html.replace(declOldRegex, declNew);
  console.log('✅ Updated payload with photoData');
} else {
  console.warn('⚠️ declOldRegex did not match');
}

// Update completeSubmissionUI
const compOldRegex = /function completeSubmissionUI\(regId,\s*payload\)\s*\{\s*\/\/\s*Save to localStorage as backup\s*try\s*\{\s*const existing = JSON\.parse\(localStorage\.getItem\('BALSONS_SAVED_REGISTRATIONS'\) \|\| '\[\]'\);\s*existing\.push\(\{ regId: regId, timestamp: new Date\(\)\.toISOString\(\), payload: payload \}\);\s*localStorage\.setItem\('BALSONS_SAVED_REGISTRATIONS', JSON\.stringify\(existing\)\);\s*\}\s*catch\s*\(e\)\s*\{/;

const compNew = `function completeSubmissionUI(regId, payload) {
  // Save to localStorage as backup
  try {
    const existing = JSON.parse(localStorage.getItem('BALSONS_SAVED_REGISTRATIONS') || '[]');
    existing.push({ regId: regId, timestamp: new Date().toISOString(), payload: payload });
    localStorage.setItem('BALSONS_SAVED_REGISTRATIONS', JSON.stringify(existing));

    if (payload.photoData) {
      const photos = JSON.parse(localStorage.getItem('BALSONS_EMPLOYEE_PHOTOS') || '{}');
      photos[regId] = payload.photoData;
      if (payload.aadhaarNo) photos[payload.aadhaarNo] = payload.photoData;
      if (payload.mobile) photos[payload.mobile] = payload.photoData;
      localStorage.setItem('BALSONS_EMPLOYEE_PHOTOS', JSON.stringify(photos));
    }
  } catch (e) {`;

if (compOldRegex.test(html)) {
  html = html.replace(compOldRegex, compNew);
  console.log('✅ Updated completeSubmissionUI with BALSONS_EMPLOYEE_PHOTOS');
} else {
  console.warn('⚠️ compOldRegex did not match');
}

// Update handleFileSelect for #up-photo sync
const hfsOldRegex = /(uploadedAttachments\.push\(\{\s*inputId:\s*input\.id,\s*docType:\s*docType,\s*fileName:\s*file\.name,\s*fileSize:\s*file\.size,\s*mimeType:\s*file\.type,\s*dataUrl:\s*e\.target\.result\s*\}\);)/;
const hfsNew = `$1\n    if (input.id === 'up-photo') {\n      applyPassportPhoto(e.target.result, file.name, file.size);\n    }`;

if (hfsOldRegex.test(html)) {
  html = html.replace(hfsOldRegex, hfsNew);
  console.log('✅ Updated handleFileSelect for #up-photo sync');
}

// Update clearForm to also remove photo
const clrOldRegex = /function clearForm\(\)\s*\{\s*if \(!confirm\('Are you sure you want to clear all form entries\?'\)\) return;\s*document\.getElementById\('balsonsEmployeeRegistrationForm'\)\.reset\(\);/;
const clrNew = `function clearForm() {
  if (!confirm('Are you sure you want to clear all form entries?')) return;
  document.getElementById('balsonsEmployeeRegistrationForm').reset();
  removePassportPhoto();`;

if (clrOldRegex.test(html)) {
  html = html.replace(clrOldRegex, clrNew);
  console.log('✅ Updated clearForm to call removePassportPhoto()');
}

fs.writeFileSync('BALSONS HR MANAGER/frontend/register.html', html, 'utf8');
console.log('Done updating register.html!');
