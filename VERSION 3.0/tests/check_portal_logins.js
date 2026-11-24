const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'BALSONS GATE ENTRY MANAGER/frontend/index.html',
  'BALSONS HR MANAGER/frontend/index.html',
  'BALSONS HR MANAGER/frontend/register.html',
  'BALSONS OPERATIONS MANAGER/index.html',
  'BALSONS PURCHASE MANAGER/index.html',
  'BALSONS SAFETY MANAGER/frontend/index.html',
  'BALSONS STORE MANAGER/frontend/index.html',
  'BALSONS REPOTS PORTAL/index.html',
  'BALSONS ENTERPRISE LAUNCHER/index.html',
  'balsons-master-ecosystem-directory.html',
  'mobile/index.html',
  'BALSONS_MOBILE_PORTALS/index.html'
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasPassword = /type=["']password["']|id=["'][^"']*pass[^"']*["']/i.test(content);
    const hasToggle = /toggle.*pass|pass.*toggle|beds-pw-toggle|eye/i.test(content);
    const hasBedsLogin = /beds-portal-login\.js/i.test(content);
    const hasInlineLogin = /id=["']loginModal["']|id=["']bedsLoginModal["']/i.test(content);
    console.log(file + ':');
    console.log('  hasPassword:', hasPassword, '| hasToggle:', hasToggle, '| hasBedsLogin:', hasBedsLogin, '| hasInlineLogin:', hasInlineLogin);
    
    // Find all password inputs
    const pwMatches = content.match(/<input[^>]*type=["']password["'][^>]*>/gi);
    if (pwMatches) {
      console.log('  Password inputs:', pwMatches);
    }
  } else {
    console.log(file + ': NOT FOUND');
  }
});
