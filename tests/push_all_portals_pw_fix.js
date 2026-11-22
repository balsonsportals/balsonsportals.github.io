const { execSync } = require('child_process');

const repos = [
  { name: 'BALSONS GATE ENTRY MANAGER', path: 'BALSONS GATE ENTRY MANAGER', branch: 'main' },
  { name: 'BALSONS HR MANAGER', path: 'BALSONS HR MANAGER', branch: 'main' },
  { name: 'BALSONS OPERATIONS MANAGER', path: 'BALSONS OPERATIONS MANAGER', branch: 'main' },
  { name: 'BALSONS PURCHASE MANAGER', path: 'BALSONS PURCHASE MANAGER', branch: 'main' },
  { name: 'BALSONS SAFETY MANAGER', path: 'BALSONS SAFETY MANAGER', branch: 'main' },
  { name: 'BALSONS STORE MANAGER', path: 'BALSONS STORE MANAGER', branch: 'main' },
  { name: 'BALSONS ENTERPRISE LAUNCHER', path: 'BALSONS ENTERPRISE LAUNCHER', branch: 'main' },
  { name: 'ROOT MONOREPO', path: '.', branch: 'main' }
];

console.log('====================================================');
console.log('   PUSHING PASSWORD TOGGLE & MAIN INDEX UPDATES     ');
console.log('====================================================');

for (const r of repos) {
  console.log(`\nProcessing repository: ${r.name}...`);
  try {
    // Stage all changes
    execSync('git add -A', { cwd: r.path, stdio: 'inherit' });
    
    // Check if there are changes to commit
    const status = execSync('git status --short', { cwd: r.path }).toString().trim();
    if (status) {
      console.log(`Changes to commit in ${r.name}:\n${status}`);
      execSync('git commit -m "feat(auth): upgrade password hide/show toggle across all portal login pages and sync main index"', { cwd: r.path, stdio: 'inherit' });
    } else {
      console.log(`No new uncommitted changes in ${r.name}. Checking unpushed commits...`);
    }

    // Push to origin
    console.log(`Pushing ${r.name} to origin ${r.branch}...`);
    execSync(`git push origin ${r.branch}`, { cwd: r.path, stdio: 'inherit' });
    console.log(`✅ ${r.name} pushed successfully!`);
  } catch (err) {
    console.error(`❌ Error in ${r.name}:`, err.message);
  }
}

console.log('\n====================================================');
console.log('   ALL REPOSITORIES PROCESSED!                      ');
console.log('====================================================');
