const cp = require('child_process');
const fs = require('fs');

const commitMsg = 'feat(hr): polish employee master & document vault, freeze sticky nav, enable print preview & gate pass, and sync ecosystem';

const repos = [
  { dir: 'BALSONS GATE ENTRY MANAGER', branch: 'main', remote: 'origin' },
  { dir: 'BALSONS HR MANAGER', branch: 'main', remote: 'origin' },
  { dir: 'BALSONS OPERATIONS MANAGER', branch: 'main', remote: 'origin' },
  { dir: 'BALSONS PURCHASE MANAGER', branch: 'main', remote: 'origin' },
  { dir: 'BALSONS SAFETY MANAGER', branch: 'main', remote: 'origin' },
  { dir: 'BALSONS STORE MANAGER', branch: 'main', remote: 'origin' },
  { dir: 'BALSONS_MOBILE_PORTALS', branch: 'main', remote: 'origin' },
  { dir: 'BALSONS ENTERPRISE LAUNCHER', branch: 'main', remote: 'launcher-repo' },
  { dir: '.', branch: 'main', remote: 'origin' }
];

console.log('====================================================');
console.log('   PUSHING ALL BALSONS ECOSYSTEM REPOSITORIES       ');
console.log('====================================================\n');

repos.forEach(repo => {
  try {
    console.log(`=== Processing: ${repo.dir} ===`);
    
    // Check git status
    const status = cp.execSync('git status --porcelain', { cwd: repo.dir }).toString().trim();
    if (!status) {
      console.log(`  ✓ Working tree clean in ${repo.dir}, nothing to commit.`);
    } else {
      console.log(`  Adding changes in ${repo.dir}...`);
      cp.execSync('git add -A', { cwd: repo.dir, stdio: 'inherit' });
      
      console.log(`  Committing in ${repo.dir}...`);
      try {
        cp.execSync(`git commit -m "${commitMsg}"`, { cwd: repo.dir, stdio: 'inherit' });
      } catch (commitErr) {
        console.log('  Notice during commit:', commitErr.message);
      }
    }

    console.log(`  Pushing ${repo.dir} to ${repo.remote} ${repo.branch}...`);
    cp.execSync(`git push ${repo.remote} ${repo.branch}`, { cwd: repo.dir, stdio: 'inherit' });
    console.log(`  ✅ Successfully pushed ${repo.dir}!\n`);
  } catch (err) {
    console.error(`  ❌ Error processing ${repo.dir}:`, err.message);
  }
});

console.log('====================================================');
console.log('   ALL REPOSITORIES PROCESSED SUCCESSFULLY!         ');
console.log('====================================================');
