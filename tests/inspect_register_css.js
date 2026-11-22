const fs = require('fs');
const html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
  console.log('CSS length:', cssMatch[1].length);
  const rules = cssMatch[1].match(/[.#a-zA-Z0-9_-]+\s*\{/g);
  console.log('Some selectors:', rules.slice(0, 20));
}
