const fs = require('fs');

const html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

console.log('=== HR & PAYROLL PORTAL AUDIT ===\n');
console.log('HTML File Length:', html.length, 'characters, Lines:', html.split('\n').length);

// 1. Navigation items
const navMatch = html.match(/<nav[\s\S]*?<\/nav>/);
if (navMatch) {
  console.log('\n--- Navigation Bar ---');
  const buttons = navMatch[0].match(/<(?:button|a)[^>]*>/g) || [];
  buttons.forEach(b => console.log('  ' + b));
} else {
  console.log('\n❌ <nav> NOT FOUND!');
}

// 2. Sections / Tabs
console.log('\n--- Section Views & Tabs ---');
const sectionMatches = html.match(/<section[^>]*id="[^"]+"[^>]*>/g) || [];
sectionMatches.forEach(s => console.log('  ' + s));

// 3. Modals
console.log('\n--- Modals in DOM ---');
const modalMatches = html.match(/<div[^>]*id="modal[^"]*"[^>]*>/gi) || [];
modalMatches.forEach(m => console.log('  ' + m));

// 4. Onclick functions
console.log('\n--- Onclick Functions Audit ---');
const onclickMatches = html.match(/onclick="([^"]+)"/g) || [];
const fnSet = new Set();
onclickMatches.forEach(m => {
  const match = m.match(/onclick="([a-zA-Z0-9_$.]+)\s*\(/);
  if (match) fnSet.add(match[1]);
});

console.log(`Distinct onclick function calls: ${fnSet.size}`);
const missingFns = [];
fnSet.forEach(fn => {
  // Check if defined in html or js files
  const simpleName = fn.includes('.') ? fn.split('.').pop() : fn;
  const inHtml = html.includes('function ' + simpleName) || html.includes(simpleName + ' =') || html.includes(simpleName + ':');
  let inJs = false;
  const jsDir = 'BALSONS HR MANAGER/frontend/assets/js/';
  if (fs.existsSync(jsDir)) {
    fs.readdirSync(jsDir).forEach(f => {
      if (f.endsWith('.js')) {
        const c = fs.readFileSync(jsDir + f, 'utf8');
        if (c.includes('function ' + simpleName) || c.includes(simpleName + ' =') || c.includes(simpleName + ':') || c.includes('window.' + simpleName)) {
          inJs = true;
        }
      }
    });
  }
  if (!inHtml && !inJs) {
    missingFns.push(fn);
    console.log(`  ❌ MISSING: ${fn}`);
  } else {
    console.log(`  ✓ Found: ${fn}`);
  }
});
console.log(`Missing onclick functions: ${missingFns.length}`);

// 5. Check loginModal references
const loginModalRefs = html.match(/loginModal/g) || [];
console.log(`\nloginModal references: ${loginModalRefs.length}`);

// 6. Check Documents Tab & Google Drive integration
console.log('\n--- Documents Tab & Drive Integration ---');
console.log('Contains #tab-documents:', html.includes('id="tab-documents"'));
console.log('Contains BalsonsDocs:', html.includes('BalsonsDocs'));
console.log('Contains balsons-docs-manager.js script:', html.includes('balsons-docs-manager.js'));
console.log('Contains bedsDocViewerBackdrop:', html.includes('bedsDocViewerBackdrop'));
