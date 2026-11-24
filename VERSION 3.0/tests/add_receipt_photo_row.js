const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const targetRegex = /(<table class="receipt-table">\s*<tr>\s*<td>Full Name<\/td>)/;
const replacement = `<table class="receipt-table">
      <tr>
        <td>Employee Passport Photo</td>
        <td id="receiptPhotoCell">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img id="receiptPhotoImg" src="" alt="Passport Photo" style="width: 48px; height: 60px; object-fit: cover; border-radius: 4px; border: 1.5px solid var(--teal); display: none;">
            <span id="receiptPhotoBadge" style="font-size: 11px; font-weight: 700; color: #10b981;">✓ Stored in Central KYC Vault</span>
          </div>
        </td>
      </tr>
      <tr>
        <td>Full Name</td>`;

if (targetRegex.test(html)) {
  html = html.replace(targetRegex, replacement);
  fs.writeFileSync('BALSONS HR MANAGER/frontend/register.html', html, 'utf8');
  fs.writeFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/register.html', html, 'utf8');
  console.log('✅ Successfully added receipt photo row!');
} else {
  console.error('Target regex did not match!');
  process.exit(1);
}
