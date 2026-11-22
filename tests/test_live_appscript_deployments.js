const https = require('https');

function testEndpoint(name, url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect for Apps Script
        https.get(res.headers.location, (res2) => {
          let data2 = '';
          res2.on('data', chunk => data2 += chunk);
          res2.on('end', () => {
            console.log(`✅ [${name}] HTTP ${res2.statusCode}: ${data2.slice(0, 200)}`);
            resolve(true);
          });
        }).on('error', err => {
          console.error(`❌ [${name}] Redirect error: ${err.message}`);
          resolve(false);
        });
        return;
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ [${name}] HTTP ${res.statusCode}: ${data.slice(0, 200)}`);
        resolve(true);
      });
    }).on('error', err => {
      console.error(`❌ [${name}] Request error: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Testing live Apps Script deployments...');
  await testEndpoint(
    'Gate Entry Manager',
    'https://script.google.com/macros/s/AKfycbzqG6THkjhA-8324dOg9cbMAc3IWCZdmp9sT6zTdPINUWAgB0cOm4H4TFCWprYmT9lXNg/exec?action=health'
  );
  await testEndpoint(
    'HR & Payroll Manager',
    'https://script.google.com/macros/s/AKfycbyNreoI0QmRsiPgIBbJSh8YUjZCBa5f4E2UpsG3y03fcdcyUV_u76ZTCAcKfmAuXOWFmw/exec?action=health'
  );
  console.log('Live deployment testing complete.');
}

run();
