const fs = require('fs');

let hrCode = fs.readFileSync('BALSONS HR MANAGER/apps-script/Code.gs', 'utf8');

const regex = /case 'auth\.login':\s*\/\/\s*Test role mapping\s*responseData\s*=\s*\{[\s\S]*?\};\s*break;/;
const replacement = `case 'auth.login':
        // Common enterprise authentication (balsons2026)
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

if (regex.test(hrCode)) {
  hrCode = hrCode.replace(regex, replacement);
  fs.writeFileSync('BALSONS HR MANAGER/apps-script/Code.gs', hrCode, 'utf8');
  console.log('✅ Updated HR Code.gs with authentication password check');
} else {
  console.error('Regex did not match');
}
