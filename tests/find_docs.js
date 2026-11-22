const fs = require('fs');
const path = require('path');

function findFiles(dir, name) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (let file of list) {
      if (file === 'node_modules' || file === '.git') continue;
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        results = results.concat(findFiles(full, name));
      } else if (file.toLowerCase().includes(name.toLowerCase())) {
        results.push(full);
      }
    }
  } catch (e) {}
  return results;
}

console.log(findFiles('.', 'docs-manager'));
console.log(findFiles('.', 'balsons-docs'));
