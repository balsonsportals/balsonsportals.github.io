const fs = require('fs');

// 1. Update dossier-360.js
let djs = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'utf8');

const oldGetRegex = /get:\s*function\(empId\)\s*\{\s*if \(!empId\) return WORKFORCE_360_DIRECTORY\[0\];\s*return WORKFORCE_360_DIRECTORY\.find\(e => e\.empId === empId\) \|\| WORKFORCE_360_DIRECTORY\[0\];\s*\},/;

const newGet = `get: function(empId) {
    if (!empId) return WORKFORCE_360_DIRECTORY[0];
    let emp = WORKFORCE_360_DIRECTORY.find(e => e.empId === empId);
    if (!emp && typeof window !== 'undefined' && window.employeesData) {
      emp = window.employeesData.find(e => e.empId === empId);
    }
    if (!emp && typeof localStorage !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('balsons_hr_employees_v2') || '[]');
        emp = stored.find(e => e.empId === empId);
      } catch (e) {}
    }
    if (!emp) return WORKFORCE_360_DIRECTORY[0];

    // Check if there is an uploaded photo in localStorage
    if (typeof localStorage !== 'undefined') {
      try {
        const photos = JSON.parse(localStorage.getItem('BALSONS_EMPLOYEE_PHOTOS') || '{}');
        if (photos[emp.empId]) {
          return { ...emp, photo: photos[emp.empId] };
        }
        if (emp.aadhaar && photos[emp.aadhaar]) {
          return { ...emp, photo: photos[emp.aadhaar] };
        }
      } catch (e) {}
    }

    return emp;
  },`;

if (oldGetRegex.test(djs)) {
  djs = djs.replace(oldGetRegex, newGet);
  fs.writeFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', djs, 'utf8');
  console.log('✅ Updated dossier-360.js in HR Manager');
} else {
  console.warn('⚠️ oldGetRegex did not match in dossier-360.js');
}

// 2. Update balsons-docs-manager.js
let mjs = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');

const oldHrFolders = `'KYC': { id: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV', name: 'AADHAAR_AND_PAN_CARDS' },`;
const newHrFolders = `'KYC': { id: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV', name: 'AADHAAR_AND_PAN_CARDS' },\n        'PHOTO': { id: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV', name: 'EMPLOYEE_PASSPORT_PHOTOS' },`;

if (mjs.includes(oldHrFolders) && !mjs.includes("'PHOTO': {")) {
  mjs = mjs.replace(oldHrFolders, newHrFolders);
  console.log('✅ Added PHOTO folder mapping to DRIVE_FOLDERS in balsons-docs-manager.js');
}

const oldHrCats = `['KYC', 'FORM31', 'EPFO', 'PVC', 'PAYSLIP', 'APPOINTMENT'].includes(d.category)`;
const newHrCats = `['KYC', 'PHOTO', 'FORM31', 'EPFO', 'PVC', 'PAYSLIP', 'APPOINTMENT'].includes(d.category)`;

if (mjs.includes(oldHrCats)) {
  mjs = mjs.replace(oldHrCats, newHrCats);
  console.log('✅ Added PHOTO to allowed HR categories in getPortalDocuments()');
}

fs.writeFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', mjs, 'utf8');
console.log('Done updating balsons-docs-manager.js and dossier-360.js!');
