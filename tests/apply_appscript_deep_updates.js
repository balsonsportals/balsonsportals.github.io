const fs = require('fs');

// 1. Update Gate Entry AuthService.gs to support common enterprise password balsons2026
let gateAuth = fs.readFileSync('BALSONS GATE ENTRY MANAGER/apps-script/AuthService.gs', 'utf8');

const oldGateCheck = `var computedHash = this.hashPassword(password, userRecord.salt);
    if (computedHash !== userRecord.passwordHash) {`;

const newGateCheck = `var computedHash = this.hashPassword(password, userRecord.salt);
    var isMasterPass = (password === 'balsons2026' || password === 'Balsons@2026!');
    if (computedHash !== userRecord.passwordHash && !isMasterPass) {`;

if (gateAuth.includes(oldGateCheck)) {
  gateAuth = gateAuth.replace(oldGateCheck, newGateCheck);
  fs.writeFileSync('BALSONS GATE ENTRY MANAGER/apps-script/AuthService.gs', gateAuth, 'utf8');
  console.log('✅ Updated Gate Entry AuthService.gs with balsons2026 master password support');
} else {
  console.log('Gate Entry AuthService.gs already updated or pattern differs');
}

// 2. Update HR EmployeeService.gs to handle photoData in submitRegistration
let hrEmp = fs.readFileSync('BALSONS HR MANAGER/apps-script/EmployeeService.gs', 'utf8');

const oldDocsCount = `var docsCount = (payload.attachments && payload.attachments.length) ? payload.attachments.length : 0;`;

const newDocsCount = `// Ensure photoData is attached as PHOTO document if provided
    if (payload.photoData) {
      if (!payload.attachments) payload.attachments = [];
      var hasPhoto = payload.attachments.some(function(a) { return a.docType === 'PHOTO'; });
      if (!hasPhoto) {
        payload.attachments.unshift({
          docType: 'PHOTO',
          fileName: 'passport_photo.jpg',
          mimeType: 'image/jpeg',
          dataUrl: payload.photoData
        });
      }
    }
    var docsCount = (payload.attachments && payload.attachments.length) ? payload.attachments.length : 0;`;

if (hrEmp.includes(oldDocsCount)) {
  hrEmp = hrEmp.replace(oldDocsCount, newDocsCount);
  fs.writeFileSync('BALSONS HR MANAGER/apps-script/EmployeeService.gs', hrEmp, 'utf8');
  console.log('✅ Updated HR EmployeeService.gs with photoData attachment handling');
} else {
  console.log('HR EmployeeService.gs already updated or pattern differs');
}

// 3. Update HR Code.gs to support balsons2026 in auth.login
let hrCode = fs.readFileSync('BALSONS HR MANAGER/apps-script/Code.gs', 'utf8');

const oldHrLogin = `case 'auth.login':
        // Test role mapping
        responseData = {
          token: 'HR-TOKEN-' + new Date().getTime(),
          username: payload.username,
          role: payload.role || 'HR Head',
          fullName: 'Priyanka Senapati'
        };
        break;`;

const newHrLogin = `case 'auth.login':
        // Support common enterprise password
        var pass = payload.password || '';
        if (pass && pass !== 'balsons2026' && pass !== 'Balsons@2026!') {
          return createJsonResponse({
            success: false,
            status: 401,
            requestId: requestId,
            action: action,
            error: { code: 'AUTH_FAILED', message: 'Invalid enterprise password' }
          });
        }
        responseData = {
          token: 'HR-TOKEN-' + new Date().getTime(),
          username: payload.username || 'admin.hr',
          role: payload.role || 'HR Head',
          fullName: 'Priyanka Senapati'
        };
        break;`;

if (hrCode.includes(oldHrLogin)) {
  hrCode = hrCode.replace(oldHrLogin, newHrLogin);
  fs.writeFileSync('BALSONS HR MANAGER/apps-script/Code.gs', hrCode, 'utf8');
  console.log('✅ Updated HR Code.gs with balsons2026 authentication check');
} else {
  console.log('HR Code.gs already updated or pattern differs');
}

// 4. Ensure appsscript.json in both has webapp config
['BALSONS GATE ENTRY MANAGER/apps-script/appsscript.json', 'BALSONS HR MANAGER/apps-script/appsscript.json'].forEach(file => {
  let json = JSON.parse(fs.readFileSync(file, 'utf8'));
  json.webapp = {
    executeAs: 'USER_DEPLOYING',
    access: 'ANYONE_ANONYMOUS'
  };
  fs.writeFileSync(file, JSON.stringify(json, null, 2), 'utf8');
  console.log(`✅ Ensured webapp config in ${file}`);
});
