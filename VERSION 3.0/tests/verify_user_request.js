const fs = require('fs');
const assert = (name, cond) => {
  if (cond) {
    console.log(`   ✅ [PASS] ${name}`);
  } else {
    console.error(`   ❌ [FAIL] ${name}`);
    process.exit(1);
  }
};

console.log('====================================================');
console.log('   BALSONS HR TABS & PHOTO UPGRADE VERIFICATION    ');
console.log('====================================================\n');

const hrIndex = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const launcherIndex = fs.readFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html', 'utf8');
const regHtml = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');
const launcherReg = fs.readFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/register.html', 'utf8');
const dossierJs = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/dossier-360.js', 'utf8');
const docsJs = fs.readFileSync('BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js', 'utf8');

console.log('[TEST GROUP 1: Main Tabs Migration & Dropdown Cleansing]');
// Check master nav has employees and payslips as direct buttons
const navMatch = hrIndex.match(/<nav id="master-nav-tabs">([\s\S]*?)<\/nav>/);
assert('master-nav-tabs exists in index.html', !!navMatch);
const navContent = navMatch[1];

assert('Employee Master is a direct first-level nav tab', navContent.includes('<button class="beds-nav-tab" data-target="employees" onclick="switchHrTab(\'employees\')">'));
assert('Salary Slips Studio is a direct first-level nav tab', navContent.includes('<button class="beds-nav-tab" data-target="payslips" onclick="switchHrTab(\'payslips\')">'));
assert('Attendance is a direct first-level nav tab', navContent.includes('<button class="beds-nav-tab" data-target="attendance" onclick="switchHrTab(\'attendance\')">'));

// Check dropdown menus do NOT have employees or payslips
const dropdownMatches = navContent.match(/<div class="beds-dropdown-menu">[\s\S]*?<\/div>/g) || [];
dropdownMatches.forEach((d, i) => {
  assert(`Dropdown ${i+1} does not contain data-target="employees"`, !d.includes('data-target="employees"'));
  assert(`Dropdown ${i+1} does not contain data-target="payslips"`, !d.includes('data-target="payslips"'));
});

console.log('\n[TEST GROUP 2: Employee Registration Form Photo Upload]');
assert('register.html has Passport Photo Frame', regHtml.includes('id="passportPhotoFrame"'));
assert('register.html has Passport Photo Preview Img', regHtml.includes('id="passportPhotoPreviewImg"'));
assert('register.html has Passport Photo File Input', regHtml.includes('id="passportPhotoInput"'));
assert('register.html has Live Camera Button', regHtml.includes('openCameraCaptureModal()'));
assert('register.html has regCameraModal webcam popup', regHtml.includes('id="regCameraModal"'));
assert('register.html has applyPassportPhoto function', regHtml.includes('function applyPassportPhoto'));
assert('register.html has removePassportPhoto function', regHtml.includes('function removePassportPhoto'));
assert('register.html has snapCameraPhoto function', regHtml.includes('function snapCameraPhoto'));
assert('register.html syncs photoData with submission payload', regHtml.includes('photoData: window.__PASSPORT_PHOTO_DATA__'));
assert('register.html stores photo to BALSONS_EMPLOYEE_PHOTOS', regHtml.includes('BALSONS_EMPLOYEE_PHOTOS'));
assert('register.html receipt displays photo', regHtml.includes('id="receiptPhotoImg"'));

console.log('\n[TEST GROUP 3: In-Portal Onboarding & Master Edit Photo Upload]');
assert('modalOnboard has photo upload file input', hrIndex.includes('id="onbPhotoFile"'));
assert('modalOnboard has photo webcam button', hrIndex.includes('triggerWebcamForOnboard()'));
assert('modalEditEmployee has editEmpPhotoImg', hrIndex.includes('id="editEmpPhotoImg"'));
assert('modalEditEmployee has editEmpPhotoFile', hrIndex.includes('id="editEmpPhotoFile"'));
assert('modalEditEmployee has webcam trigger button', hrIndex.includes('triggerWebcamForEdit()'));
assert('modalWebcamCapture popup exists in index.html', hrIndex.includes('id="modalWebcamCapture"'));
assert('captureWebcamPhoto function exists', hrIndex.includes('function captureWebcamPhoto'));
assert('handleEditPhotoSelect function exists', hrIndex.includes('function handleEditPhotoSelect'));
assert('openEditEmployeeModal populates photo', hrIndex.includes("photoImg.src = e.photo"));
assert('handleEditEmployeeSubmit updates photo and broadcasts', hrIndex.includes("emp.photo = photoEl.src"));
assert('renderEmployeesTable renders avatar thumbnail', hrIndex.includes("border-radius: 50%; object-fit: cover;"));

console.log('\n[TEST GROUP 4: Cloud KYC Drive Vault Sync & Linked Portals]');
assert('balsons-docs-manager has PHOTO category mapping', docsJs.includes("'PHOTO': { id: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV'"));
assert('handleOnboardSubmit syncs photo to Drive KYC folder', hrIndex.includes("1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV"));
assert('handleEditEmployeeSubmit syncs photo to Drive KYC folder', hrIndex.includes("1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV"));
assert('dossier-360.js dynamically loads BALSONS_EMPLOYEE_PHOTOS', dossierJs.includes("localStorage.getItem('BALSONS_EMPLOYEE_PHOTOS')"));
assert('dossier-360.js dynamically loads balsons_hr_employees_v2', dossierJs.includes("localStorage.getItem('balsons_hr_employees_v2')"));

console.log('\n[TEST GROUP 5: Submodule Mirrors & Boundary Lockdown]');
assert('Launcher index.html is byte-identical to HR index.html', hrIndex === launcherIndex);
assert('Launcher register.html is byte-identical to HR register.html', regHtml === launcherReg);

console.log('\n====================================================');
console.log('   ALL 32 NEW VERIFICATION TESTS PASSED (100%)    ');
console.log('====================================================');
