const fs = require('fs');

if (fs.existsSync('BALSONS GATE ENTRY MANAGER/.env.example')) {
  console.log(fs.readFileSync('BALSONS GATE ENTRY MANAGER/.env.example', 'utf8'));
}
