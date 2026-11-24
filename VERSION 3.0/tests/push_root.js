const { execSync } = require('child_process');

console.log('Staging files in root...');
execSync('git add -A', { stdio: 'inherit' });

console.log('Checking staged files...');
const status = execSync('git status --short').toString();
console.log(status);

console.log('Committing in root...');
try {
  execSync('git commit -m "feat(hr): polish employee master, document vault, sticky nav freeze, print preview and sync"', { stdio: 'inherit' });
} catch(e) {
  console.log('Commit note:', e.message);
}

console.log('Pushing root to origin main...');
execSync('git push origin main', { stdio: 'inherit' });
console.log('Root push complete!');
