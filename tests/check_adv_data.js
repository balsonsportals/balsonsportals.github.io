const fs = require('fs');
const content = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('advanceData') || l.includes('employeesData') || l.includes('attendanceData')) {
    if (l.includes('const') || l.includes('let') || l.includes('var') || l.includes('=')) {
      console.log(`Line ${i+1}: ${l.trim().slice(0, 100)}`);
    }
  }
});
