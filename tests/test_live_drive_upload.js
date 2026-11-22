const https = require('https');

function postJson(urlStr, bodyObj) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bodyObj);
    const u = new URL(urlStr);
    const req = https.request(u, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (res2) => {
          let resp = '';
          res2.on('data', c => resp += c);
          res2.on('end', () => {
            try {
              resolve(JSON.parse(resp));
            } catch(e) {
              resolve({ raw: resp });
            }
          });
        }).on('error', reject);
      } else {
        let resp = '';
        res.on('data', c => resp += c);
        res.on('end', () => {
          try {
            resolve(JSON.parse(resp));
          } catch(e) {
            resolve({ raw: resp });
          }
        });
      }
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  const url = 'https://script.google.com/macros/s/AKfycbzqG6THkjhA-8324dOg9cbMAc3IWCZdmp9sT6zTdPINUWAgB0cOm4H4TFCWprYmT9lXNg/exec';
  
  console.log('1. Logging in with username "admin" and password "balsons2026"...');
  const loginRes = await postJson(url, {
    action: 'auth.login',
    payload: {
      username: 'admin',
      password: 'balsons2026'
    }
  });
  console.log('Login result:', loginRes.success ? 'SUCCESS ✅' : 'FAILED ❌');

  const token = loginRes.data && (loginRes.data.sessionToken || loginRes.data.authToken);
  if (token) {
    console.log('2. Got sessionToken:', token.slice(0, 16) + '...');
    console.log('3. Uploading real file to Google Drive via Apps Script...');
    const uploadRes = await postJson(url, {
      action: 'drive.upload_document',
      authToken: token,
      payload: {
        fileBase64: Buffer.from('BALSONS HEAVY LIFT & SHIFT - GOOGLE DRIVE SYNC TEST - ' + new Date().toISOString()).toString('base64'),
        fileName: 'BALSONS_LIVE_DRIVE_SYNC_TEST.txt',
        mimeType: 'text/plain',
        portalCode: '01_GATE_ENTRY_MANAGER',
        categoryCode: '01_GATE_PASSES',
        subCategory: 'RETURNABLE_GATE_PASSES_RGP'
      }
    });
    console.log('Upload result:', JSON.stringify(uploadRes, null, 2));
  }
}

run().catch(console.error);
