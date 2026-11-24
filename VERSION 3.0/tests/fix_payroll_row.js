const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
let content = fs.readFileSync(file, 'utf8');

const targetRegex = /<td><strong>\$\{escapeHtml\(e\.name\)\}<\/strong><\/td>[\r\n\s]*<td>\$\{typeBadge\}<\/td>[\s\S]*?<td><button class="btn btn-secondary btn-sm" onclick="previewPayslip\('\$\{e\.empId\}'\)">Slip<\/button><\/td>/;

const replacement = `<td>
            <a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${e.empId}')" style="font-weight: 700; color: var(--beds-teal-primary); text-decoration: none;" title="Open 360° Personnel Dossier">
              \${escapeHtml(e.name)} 📄
            </a>
          </td>
          <td>\${typeBadge}</td>
          <td class="tabular-nums">\${rateStr}</td>
          <td class="tabular-nums" style="font-weight: 700;">\${att.payable} d</td>
          <td class="tabular-nums">₹ \${baseEarned.toLocaleString('en-IN')}</td>
          <td class="tabular-nums" style="color: #D97706; font-weight: 700;">+₹ \${otPay.toLocaleString('en-IN')}</td>
          <td class="tabular-nums" style="font-weight: 800;">₹ \${gross.toLocaleString('en-IN')}</td>
          <td class="tabular-nums" style="color: var(--beds-alert-red); font-weight: 700;">\${adv.monthly > 0 ? '-₹ ' + adv.monthly.toLocaleString('en-IN') : '₹ 0'}</td>
          <td class="tabular-nums" style="\${pf > 0 ? 'color: var(--beds-alert-red); font-weight: 700;' : 'color: var(--beds-text-muted);'}">\${pf > 0 ? '-₹ ' + pf.toLocaleString('en-IN') : 'Exempt (₹ 0)'}</td>
          <td class="tabular-nums" style="\${esic > 0 ? 'color: var(--beds-alert-red); font-weight: 700;' : 'color: var(--beds-text-muted);'}">\${esic > 0 ? '-₹ ' + esic.toLocaleString('en-IN') : 'Exempt (₹ 0)'}</td>
          <td class="tabular-nums" style="font-weight: 900; color: \${e.wageType === 'MONTHLY' ? 'var(--beds-teal-primary)' : '#D97706'}; font-size: 13.5px;">₹ \${net.toLocaleString('en-IN')}</td>
          <td style="white-space: nowrap;">
            <button class="btn btn-secondary btn-sm" onclick="Balsons360Dossier.openModal('\${e.empId}')" style="font-size: 11px; padding: 3px 8px; margin-right: 4px; background: #0097B2; color: #FFFFFF;" title="View 360 Dossier">📄 Dossier</button>
            <button class="btn btn-secondary btn-sm" onclick="previewPayslip('\${e.empId}')">Slip</button>
          </td>`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('✅ Replaced payroll table row with 360 Dossier link and button!');
  
  const launcherFile = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html';
  if (fs.existsSync(launcherFile)) {
    fs.writeFileSync(launcherFile, content, 'utf8');
    console.log('✅ Synchronized to launcher');
  }
} else {
  console.warn('❌ Could not match targetRegex');
}
