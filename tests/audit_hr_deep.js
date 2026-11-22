const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
const content = fs.readFileSync(file, 'utf8');

console.log('=== 1. CHECK ONCLICK HANDLERS IN HTML ===');
const onclickRegex = /onclick="([^"]+)"/g;
let match;
const onclicks = new Set();
while ((match = onclickRegex.exec(content)) !== null) {
  onclicks.add(match[1]);
}

console.log(`Found ${onclicks.size} unique onclick expressions.`);
const functionCalls = [];
onclicks.forEach(expr => {
  const fnMatch = expr.match(/^([a-zA-Z0-9_$]+)\s*\(/);
  if (fnMatch) {
    functionCalls.push({ fn: fnMatch[1], expr });
  } else {
    // console.log('Non-function onclick:', expr);
  }
});

const missingFns = [];
functionCalls.forEach(({ fn, expr }) => {
  if (['alert', 'confirm', 'prompt'].includes(fn)) return;
  // Check if defined in js
  const defRegex = new RegExp(`(function\\s+${fn}\\b|window\\.${fn}\\s*=|const\\s+${fn}\\s*=|let\\s+${fn}\\s*=|var\\s+${fn}\\s*=)`);
  if (!defRegex.test(content)) {
    missingFns.push({ fn, expr });
  }
});

console.log('Potentially undefined onclick functions:', missingFns);

console.log('\n=== 2. CHECK LOGIN CONFIGURATION ===');
const hasCommonPass = content.includes('balsons2026');
console.log('Has balsons2026 mentioned:', hasCommonPass);

console.log('\n=== 3. CHECK MODALS & BACKDROPS ===');
const modalRegex = /<div[^>]+id=["']([^"']+)["'][^>]*class=["']([^"']+)["']/g;
let modalMatches = [];
while ((match = modalRegex.exec(content)) !== null) {
  if (match[1].toLowerCase().includes('modal') || match[2].toLowerCase().includes('modal')) {
    modalMatches.push({ id: match[1], class: match[2] });
  }
}
console.log('Modals found:', modalMatches);

console.log('\n=== 4. CHECK SCRIPT TAGS IN HEAD & BODY ===');
const scriptRegex = /<script[^>]*src=["']([^"']+)["']/g;
let scripts = [];
while ((match = scriptRegex.exec(content)) !== null) {
  scripts.push(match[1]);
}
console.log('Script sources:', scripts);
