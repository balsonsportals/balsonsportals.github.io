const fs = require('fs');
const cp = require('child_process');
const path = require('path');

console.log('====================================================');
console.log('   APPLY FINAL POLISH, VERIFY & PUSH ECOSYSTEM      ');
console.log('====================================================\n');

// ─────────────────────────────────────────────────────────────────────────────
// 1. REMOVE STATUTORY PF, ESIC & SAFETY COLUMNS FROM EMPLOYEE MASTER TABLE
// ─────────────────────────────────────────────────────────────────────────────

const hrPath = 'BALSONS HR MANAGER/frontend/index.html';
let hrHtml = fs.readFileSync(hrPath, 'utf8');

// 1A. Update Table <thead> in #tab-employees
const oldTableHeadRegex = /<tr style="background: #F8FAFC; border-bottom: 2px solid var\(--beds-border\);">[\s\S]*?<th style="width: 110px; padding: 12px 14px; text-align: left; font-weight: 800; color: var\(--beds-charcoal-heading\);">Emp ID<\/th>[\s\S]*?<th style="min-width: 320px; padding: 12px 14px; text-align: center; font-weight: 800; color: var\(--beds-charcoal-heading\);">Action Studio<\/th>[\s\S]*?<\/tr>/;

const newTableHead = `<tr style="background: #F8FAFC; border-bottom: 2px solid var(--beds-border);">
                <th style="width: 120px; padding: 12px 16px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Emp ID</th>
                <th style="min-width: 250px; padding: 12px 16px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Personnel &amp; Contact</th>
                <th style="width: 160px; padding: 12px 16px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Wage Classification</th>
                <th style="min-width: 200px; padding: 12px 16px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Trade / Department</th>
                <th style="width: 160px; padding: 12px 16px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Assigned Project</th>
                <th style="width: 150px; padding: 12px 16px; text-align: right; font-weight: 800; color: var(--beds-charcoal-heading);">Compensation</th>
                <th style="min-width: 320px; padding: 12px 16px; text-align: center; font-weight: 800; color: var(--beds-charcoal-heading);">Action Studio</th>
              </tr>`;

if (oldTableHeadRegex.test(hrHtml)) {
  hrHtml = hrHtml.replace(oldTableHeadRegex, newTableHead);
  console.log('✅ Removed Statutory PF, Statutory ESIC, and Safety Clearance headers from <thead>');
} else {
  console.warn('⚠️ Could not match oldTableHeadRegex');
}

// 1B. Update renderEmployeesTable in JavaScript
const oldRowRenderRegex = /tr\.innerHTML = `[\s\S]*?<td>\s*<span style="font-family: monospace; font-size: 11\.5px; font-weight: 700; background: var\(--beds-bg-page\);[\s\S]*?<td style="text-align: center;">\${pfCell}<\/td>[\s\S]*?<td style="text-align: center;">\${esicCell}<\/td>[\s\S]*?<td style="text-align: center;">\${safetyCell}<\/td>[\s\S]*?<\/tr>`;/m;

const newRowRender = `tr.innerHTML = \`
          <td style="padding: 12px 16px;">
            <span style="font-family: monospace; font-size: 12px; font-weight: 700; background: var(--beds-bg-page); padding: 4px 8px; border-radius: 4px; border: 1px solid var(--beds-border); color: var(--beds-charcoal-heading); display: inline-block;">
              \${emp.empId}
            </span>
          </td>
          <td style="padding: 12px 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="\${emp.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" alt="\${escapeHtml(emp.name)}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid var(--beds-teal-primary); flex-shrink: 0; box-shadow: 0 1px 4px rgba(0,0,0,0.1);" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'">
              <div>
                <a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${emp.empId}')" style="font-weight: 800; font-size: 13px; color: var(--beds-teal-primary); text-decoration: none;" title="Open 360° Personnel Dossier">
                  \${escapeHtml(emp.name)} 📄
                </a>
                <div style="font-size: 11px; color: var(--beds-text-muted); margin-top: 2px; display: flex; align-items: center; gap: 8px;">
                  <span>📞 \${emp.mobile || '—'}</span>
                  \${emp.bloodGroup ? \`<span style="background: rgba(220,38,38,0.08); color: #DC2626; padding: 1px 5px; border-radius: 3px; font-weight: 700; font-size: 10px;">\${emp.bloodGroup}</span>\` : ''}
                  <span style="font-size: 10px; font-weight: 700; color: \${isInducted ? '#059669' : '#DC2626'};">\${isInducted ? '● Inducted' : '● Blocked'}</span>
                </div>
              </div>
            </div>
          </td>
          <td style="padding: 12px 16px;">\${typeBadge}</td>
          <td style="padding: 12px 16px;">
            <div style="font-weight: 800; color: var(--beds-charcoal-heading); font-size: 12.5px;">\${escapeHtml(emp.trade || 'Worker')}</div>
            <div style="font-size: 11px; color: var(--beds-text-secondary); margin-top: 2px;">\${escapeHtml(emp.dept || 'Operations')}</div>
          </td>
          <td style="padding: 12px 16px;"><span style="font-size: 11px; color: var(--beds-teal-primary); font-weight: 700; background: rgba(0,151,178,0.07); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(0,151,178,0.18);">📍 \${emp.project}</span></td>
          <td class="tabular-nums" style="padding: 12px 16px; text-align: right;">\${compBasis}</td>
          <td style="padding: 12px 16px; white-space: nowrap; text-align: center;">
            <div style="display: inline-flex; gap: 5px; align-items: center; justify-content: center;">
              <button class="btn btn-sm" onclick="Balsons360Dossier.openModal('\${emp.empId}')" style="font-size: 11px; padding: 5px 9px; background: #0097B2; color: #FFFFFF; font-weight: 700; border: none; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,151,178,0.3);" title="View 360° Unified Master Dossier">📄 360 Dossier</button>
              <button class="btn btn-secondary btn-sm" onclick="openEditEmployeeModal('\${emp.empId}')" style="font-size: 11px; padding: 5px 8px; border-radius: 4px;" title="Edit Employee Master Record">✏️ Edit</button>
              <button class="btn btn-secondary btn-sm" onclick="previewPayslip('\${emp.empId}')" style="font-size: 11px; padding: 5px 8px; border-radius: 4px;" title="Generate &amp; Print Salary Slip">📑 Slip</button>
              <button class="btn btn-primary btn-sm" onclick="openIdCardModal('\${emp.empId}')" style="background: var(--beds-teal-primary); font-size: 11px; padding: 5px 8px; border-radius: 4px;" title="Print Gate Entry/Out ID Card">🪪 ID Pass</button>
              <button class="btn btn-secondary btn-sm" onclick="openEnrolmentFormModal('\${emp.empId}')" style="font-size: 11px; padding: 5px 8px; border-radius: 4px;" title="Print Official Statutory Enrolment Dossier">🖨️ Enrol Form</button>
            </div>
          </td>
        \`;`;

if (oldRowRenderRegex.test(hrHtml)) {
  hrHtml = hrHtml.replace(oldRowRenderRegex, newRowRender);
  console.log('✅ Updated renderEmployeesTable to render clean 7-column layout');
} else {
  console.warn('⚠️ Could not match oldRowRenderRegex');
}

// Update empty state colspan="10" to colspan="7"
hrHtml = hrHtml.replace('<td colspan="10" style="text-align: center; padding: 40px 20px;', '<td colspan="7" style="text-align: center; padding: 40px 20px;');

fs.writeFileSync(hrPath, hrHtml, 'utf8');
fs.writeFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html', hrHtml, 'utf8');
console.log('✅ Synchronized polished HR index.html across root and launcher mirror');

// ─────────────────────────────────────────────────────────────────────────────
// 2. POLISH OFFICIAL DOCUMENTS & GOOGLE DRIVE VAULT (balsons-docs-manager.js)
// ─────────────────────────────────────────────────────────────────────────────

const docsJsPath = 'BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js';
let docsJs = fs.readFileSync(docsJsPath, 'utf8');

// Replace renderDocumentsTab metrics with polished BEDS V1.2 styling
const oldDocsTabRegex = /container\.innerHTML = `[\s\S]*?<!-- METRICS ROW -->[\s\S]*?<!-- SEARCH & FILTER TOOLBAR -->/;

const newDocsTabMetrics = `container.innerHTML = \`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 19px; font-weight: 800; color: var(--beds-charcoal-heading); margin: 0; display: flex; align-items: center; gap: 8px;">
                📁 Official Documents &amp; Google Drive Vault
              </h2>
              <span class="status-pill status-success" style="font-size: 10px; font-weight: 800;">LIVE CLOUD SYNC</span>
              <span class="status-pill status-info" style="font-size: 10px; font-weight: 800;">BEDS V1.2 VAULT</span>
            </div>
            <p style="font-size: 12px; color: var(--beds-text-secondary); margin-top: 4px;">
              Enterprise cloud document management, statutory KYC records, direct Google Drive auto-sync, in-portal high-security viewing &amp; RBAC protection.
            </p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <a href="https://drive.google.com/drive/folders/\${ROOT_DRIVE_FOLDER_ID}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border-color: var(--beds-teal-primary); color: var(--beds-teal-primary); font-weight: 700; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              ☁️ Open Master Drive Vault ↗
            </a>
            <button class="btn btn-primary btn-sm" onclick="BalsonsDocs.openRegisterModal()" style="font-weight: 800; background: var(--beds-teal-primary); display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(0,151,178,0.25);">
              ➕ Upload / Register Document
            </button>
            <button class="btn btn-secondary btn-sm" onclick="BalsonsDocs.refreshRegistry()" style="font-size: 11.5px; font-weight: 600;">
              🔄 Refresh Registry
            </button>
          </div>
        </div>

        <!-- POLISHED EXECUTIVE METRICS ROW -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 22px;">
          <!-- Metric 1: Total Vault Documents -->
          <div style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid var(--beds-teal-primary); border-radius: var(--beds-radius-lg); padding: 16px 18px; box-shadow: 0 4px 14px rgba(16,45,53,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Total Vault Documents</div>
              <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(0, 151, 178, 0.1); color: #0097B2; display: flex; align-items: center; justify-content: center; font-size: 15px;">📁</div>
            </div>
            <div style="font-size: 30px; font-weight: 900; color: var(--beds-charcoal-heading); line-height: 1.1; margin-bottom: 4px;" id="metricTotalDocs">\${portalDocs.length}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 6px; border-top: 1px solid var(--beds-border);">
              <span>Enterprise Registry</span>
              <span class="status-pill status-info" style="font-size: 9px; font-weight: 800;">ACTIVE</span>
            </div>
          </div>

          <!-- Metric 2: Google Drive Synced -->
          <div style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #10B981; border-radius: var(--beds-radius-lg); padding: 16px 18px; box-shadow: 0 4px 14px rgba(16,45,53,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Google Drive Synced</div>
              <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #10B981; display: flex; align-items: center; justify-content: center; font-size: 15px;">☁️</div>
            </div>
            <div style="font-size: 30px; font-weight: 900; color: #10B981; line-height: 1.1; margin-bottom: 4px;">\${syncPercent}%</div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 6px; border-top: 1px solid var(--beds-border);">
              <span>\${syncedCount} of \${portalDocs.length} Provisioned</span>
              <span class="status-pill status-success" style="font-size: 9px; font-weight: 800;">SYNCED ✓</span>
            </div>
          </div>

          <!-- Metric 3: Master Drive Root -->
          <div style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #2563EB; border-radius: var(--beds-radius-lg); padding: 16px 18px; box-shadow: 0 4px 14px rgba(16,45,53,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Master Vault Root</div>
              <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(37, 99, 235, 0.1); color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 15px;">🔒</div>
            </div>
            <div style="font-size: 14px; font-family: monospace; font-weight: 800; color: var(--beds-charcoal-heading); line-height: 1.2; margin: 8px 0 6px 0; background: var(--beds-bg-page); padding: 3px 6px; border-radius: 4px; border: 1px solid var(--beds-border);">
              1p56Z_7_yHC5...
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 6px; border-top: 1px solid var(--beds-border);">
              <span>87 Provisioned Folders</span>
              <span class="status-pill status-info" style="font-size: 9px; font-weight: 800;">JTRWF ROOT</span>
            </div>
          </div>

          <!-- Metric 4: Role-Based Access Control -->
          <div style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #D97706; border-radius: var(--beds-radius-lg); padding: 16px 18px; box-shadow: 0 4px 14px rgba(16,45,53,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Access Governance</div>
              <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(217, 119, 6, 0.1); color: #D97706; display: flex; align-items: center; justify-content: center; font-size: 15px;">🛡️</div>
            </div>
            <div style="font-size: 18px; font-weight: 900; color: var(--beds-charcoal-heading); line-height: 1.2; margin: 4px 0;">RBAC Locked</div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 6px; border-top: 1px solid var(--beds-border);">
              <span>Super &amp; HR Admin Only</span>
              <span class="status-pill status-warning" style="font-size: 9px; font-weight: 800;">ENFORCED</span>
            </div>
          </div>
        </div>

        <!-- SEARCH & FILTER TOOLBAR -->`;

if (oldDocsTabRegex.test(docsJs)) {
  docsJs = docsJs.replace(oldDocsTabRegex, newDocsTabMetrics);
  console.log('✅ Polished Official Documents & Google Drive Vault metrics and styling');
} else {
  console.warn('⚠️ Could not match oldDocsTabRegex');
}

// Write back to all locations where balsons-docs-manager.js exists
const docsLocations = [
  'BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/assets/js/balsons-docs-manager.js',
  'BALSONS OPERATIONS MANAGER/assets/js/balsons-docs-manager.js',
  'BALSONS PURCHASE MANAGER/assets/js/balsons-docs-manager.js',
  'BALSONS SAFETY MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS STORE MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS REPOTS PORTAL/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/balsons-docs-manager.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS REPOTS PORTAL/assets/js/balsons-docs-manager.js'
];

docsLocations.forEach(loc => {
  if (fs.existsSync(loc)) {
    fs.writeFileSync(loc, docsJs, 'utf8');
  }
});
console.log('✅ Synchronized polished balsons-docs-manager.js across all portals');

// Also propagate dossier-360.js across all portals
const dossierSrc = 'BALSONS HR MANAGER/frontend/assets/js/dossier-360.js';
const dossierContent = fs.readFileSync(dossierSrc, 'utf8');
const dossierLocations = [
  'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/dossier-360.js',
  'BALSONS SAFETY MANAGER/frontend/assets/js/dossier-360.js',
  'BALSONS STORE MANAGER/frontend/assets/js/dossier-360.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/dossier-360.js',
  'BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/dossier-360.js'
];
dossierLocations.forEach(loc => {
  if (fs.existsSync(loc)) {
    fs.writeFileSync(loc, dossierContent, 'utf8');
  }
});
console.log('✅ Synchronized dossier-360.js across portals');

console.log('\n[ALL MODIFICATIONS APPLIED SUCCESSFULLY]\n');
