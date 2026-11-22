const fs = require('fs');

console.log('Polishing and formatting Employee Master tab workspace...');

const hrPath = 'BALSONS HR MANAGER/frontend/index.html';
const launcherPath = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html';

let html = fs.readFileSync(hrPath, 'utf8');

// 1. Target section: #tab-employees
const oldSectionRegex = /<!-- TAB 2: EMPLOYEE MASTER -->[\s\S]*?<section id="tab-employees" class="section-view">[\s\S]*?<\/section>/;

if (!oldSectionRegex.test(html)) {
  console.error('❌ Could not locate old #tab-employees section');
  process.exit(1);
}

const newSectionHtml = `<!-- TAB 2: EMPLOYEE MASTER -->
    <section id="tab-employees" class="section-view">
      
      <!-- EXECUTIVE KPI METRIC BANNER -->
      <div class="kpi-row" style="margin-bottom: 20px;">
        <div class="kpi-card teal">
          <div class="kpi-label">Total Active Personnel</div>
          <div class="kpi-value" id="kpiEmpMasterTotal">68</div>
          <div class="kpi-sub">JTRWF Khordha Project Deployment</div>
        </div>
        <div class="kpi-card green">
          <div class="kpi-label">Monthly Staff (PF + ESIC)</div>
          <div class="kpi-value" style="color: var(--beds-teal-primary);" id="kpiEmpMasterMonthly">28</div>
          <div class="kpi-sub">100% PF (12%) &amp; ESIC (0.75%) Covered</div>
        </div>
        <div class="kpi-card amber">
          <div class="kpi-label">Daily Wage Crew</div>
          <div class="kpi-value" style="color: #D97706;" id="kpiEmpMasterDaily">40</div>
          <div class="kpi-sub">Heavy Rigging, SPMT &amp; Support Crew</div>
        </div>
        <div class="kpi-card teal">
          <div class="kpi-label">Safety Clearance Status</div>
          <div class="kpi-value" style="color: #059669;" id="kpiEmpMasterSafety">67 / 68</div>
          <div class="kpi-sub">98.5% Inducted • 1 Pending Gate Pass</div>
        </div>
      </div>

      <!-- POLISHED MASTER TABLE WORKSPACE -->
      <div class="table-container" style="box-shadow: 0 4px 20px rgba(16,45,53,0.06); border: 1px solid var(--beds-border); border-radius: var(--beds-radius-lg); background: #FFFFFF; overflow: hidden;">
        
        <!-- TOP TIER: TITLE, METADATA & QUICK ACTIONS -->
        <div style="padding: 16px 20px; background: #FFFFFF; border-bottom: 1px solid var(--beds-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 18px; font-weight: 800; color: var(--beds-charcoal-heading); margin: 0; display: flex; align-items: center; gap: 8px;">
                👥 Employee Master Directory &amp; Statutory KYC Registry
              </h2>
              <span class="status-pill status-info" style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">EMPLOYEE_MASTER</span>
              <span class="status-pill status-success" style="font-size: 10px; font-weight: 800;">LIVE SYNC</span>
            </div>
            <p style="font-size: 12px; color: var(--beds-text-secondary); margin: 4px 0 0 0;">
              Single source of truth employee database with wage type categorization (Monthly vs Daily Pay), verified KYC photos, biometric Aadhaar, and site clearance.
            </p>
          </div>

          <!-- PRIMARY ACTION BUTTONS -->
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="exportEmployeesCsv()" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600;" title="Export current filtered roster as CSV">
              📥 Export CSV
            </button>
            <button class="btn btn-secondary btn-sm" onclick="copyRegistrationLink()" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600;" title="Copy public registration link to share via WhatsApp/Email">
              📋 Share Link
            </button>
            <a href="register.html" target="_blank" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none; font-weight: 600;" title="Open Trilingual Candidate Registration Portal">
              🔗 Registration Form
            </a>
            <button class="btn btn-primary btn-sm" onclick="openOnboardModal()" style="display: inline-flex; align-items: center; gap: 6px; background: var(--beds-teal-primary); font-weight: 800; box-shadow: 0 2px 6px rgba(0, 151, 178, 0.25);">
              ➕ Onboard Employee
            </button>
          </div>
        </div>

        <!-- LOWER TIER: FILTER, SEARCH & DEPARTMENT TOOLBAR -->
        <div style="padding: 12px 20px; background: var(--beds-bg-page); border-bottom: 1px solid var(--beds-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          
          <!-- CATEGORY PILL FILTER -->
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <span style="font-size: 11px; font-weight: 800; color: var(--beds-charcoal-heading); text-transform: uppercase; margin-right: 4px;">Classification:</span>
            <div class="filter-btn-group" style="display: inline-flex; background: #FFFFFF; padding: 2px; border-radius: var(--beds-radius-md); border: 1px solid var(--beds-border);">
              <button class="btn btn-primary btn-sm" id="btnEmpAll" onclick="filterEmployeeCategory('ALL')" style="font-size: 11.5px; padding: 4px 10px; border-radius: 4px;">All Workforce (68)</button>
              <button class="btn btn-secondary btn-sm" id="btnEmpMonthly" onclick="filterEmployeeCategory('MONTHLY')" style="font-size: 11.5px; padding: 4px 10px; border-radius: 4px;">Monthly Staff (28)</button>
              <button class="btn btn-secondary btn-sm" id="btnEmpDaily" onclick="filterEmployeeCategory('DAILY_PAY')" style="font-size: 11.5px; padding: 4px 10px; border-radius: 4px;">Daily Crew (40)</button>
            </div>
          </div>

          <!-- TRADE / DEPARTMENT SELECTOR & SEARCH -->
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <select id="empTradeFilter" class="beds-input" style="font-size: 12px; padding: 4px 10px; height: 32px; border-radius: var(--beds-radius-md); background: #FFFFFF; cursor: pointer;" onchange="filterEmployeeTrade(this.value)">
              <option value="ALL">All Departments &amp; Trades</option>
              <option value="Heavy Lift">Heavy Lift &amp; Rigging Operations</option>
              <option value="SPMT">SPMT &amp; Heavy Transport</option>
              <option value="Crane">Crane &amp; Lifting Operations</option>
              <option value="Mechanical">Mechanical &amp; Erection</option>
              <option value="Safety">HSE &amp; Safety Compliance</option>
              <option value="Accounts">Site Administration &amp; Accounts</option>
            </select>

            <!-- LIVE SEARCH BAR -->
            <div style="position: relative; display: inline-flex; align-items: center;">
              <span style="position: absolute; left: 10px; color: var(--beds-text-secondary); font-size: 13px; pointer-events: none;">🔍</span>
              <input type="text" id="searchEmpInput" class="beds-input" placeholder="Search name, ID, trade, mobile..." style="width: 230px; font-size: 12px; padding: 5px 10px 5px 30px; height: 32px; border-radius: var(--beds-radius-md); background: #FFFFFF;" oninput="searchEmployees(this.value)">
              <button id="clearEmpSearch" onclick="clearEmployeeSearch()" style="position: absolute; right: 8px; background: none; border: none; font-size: 12px; cursor: pointer; color: var(--beds-text-muted); display: none;">✕</button>
            </div>

            <!-- RECORD COUNT BADGE -->
            <span id="empRecordCount" style="font-size: 11px; font-weight: 700; color: var(--beds-teal-primary); background: rgba(0,151,178,0.08); padding: 5px 10px; border-radius: 12px; border: 1px solid rgba(0,151,178,0.2);">
              68 Records
            </span>
          </div>
        </div>

        <!-- RESPONSIVE TABLE WRAPPER -->
        <div style="overflow-x: auto; max-width: 100%;">
          <table class="beds-table" style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 2px solid var(--beds-border);">
                <th style="width: 110px; padding: 12px 14px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Emp ID</th>
                <th style="min-width: 220px; padding: 12px 14px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Personnel &amp; Contact</th>
                <th style="width: 140px; padding: 12px 14px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Wage Classification</th>
                <th style="min-width: 180px; padding: 12px 14px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Trade / Department</th>
                <th style="width: 140px; padding: 12px 14px; text-align: left; font-weight: 800; color: var(--beds-charcoal-heading);">Assigned Project</th>
                <th style="width: 130px; padding: 12px 14px; text-align: right; font-weight: 800; color: var(--beds-charcoal-heading);">Compensation</th>
                <th style="width: 110px; padding: 12px 14px; text-align: center; font-weight: 800; color: var(--beds-charcoal-heading);">Statutory PF</th>
                <th style="width: 110px; padding: 12px 14px; text-align: center; font-weight: 800; color: var(--beds-charcoal-heading);">Statutory ESIC</th>
                <th style="width: 150px; padding: 12px 14px; text-align: center; font-weight: 800; color: var(--beds-charcoal-heading);">🛡️ Safety Clearance</th>
                <th style="min-width: 320px; padding: 12px 14px; text-align: center; font-weight: 800; color: var(--beds-charcoal-heading);">Action Studio</th>
              </tr>
            </thead>
            <tbody id="employeeTableBody">
              <!-- Populated dynamically -->
            </tbody>
          </table>
        </div>

        <!-- TABLE FOOTER STATUS BAR -->
        <div style="padding: 10px 20px; background: #FAFBFB; border-top: 1px solid var(--beds-border); display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--beds-text-secondary); flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; gap: 16px; align-items: center;">
            <span>🟢 <strong>67 Active Gate Inductions</strong></span>
            <span>🔴 <strong>1 Induction Pending</strong> (EMP-2026-0007)</span>
            <span>🔒 <strong>Statutory Compliance: Reconciled</strong></span>
          </div>
          <div>
            <span>Project Base: <strong>Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha</strong></span>
          </div>
        </div>

      </div>
    </section>`;

html = html.replace(oldSectionRegex, newSectionHtml);
console.log('✅ Updated #tab-employees markup');

// 2. Update renderEmployeesTable in JavaScript
const oldRenderFnRegex = /function renderEmployeesTable\(searchQ\) \{[\s\S]*?tbody\.appendChild\(tr\);[\s\S]*?\}\);[\s\S]*?\}/;

if (!oldRenderFnRegex.test(html)) {
  console.error('❌ Could not locate old renderEmployeesTable function');
  process.exit(1);
}

const newRenderFn = `let currentEmpTradeFilter = 'ALL';

    function filterEmployeeTrade(trade) {
      currentEmpTradeFilter = trade;
      renderEmployeesTable(document.getElementById('searchEmpInput')?.value);
    }

    function clearEmployeeSearch() {
      const inp = document.getElementById('searchEmpInput');
      if (inp) inp.value = '';
      const clr = document.getElementById('clearEmpSearch');
      if (clr) clr.style.display = 'none';
      renderEmployeesTable('');
    }

    function exportEmployeesCsv() {
      let list = employeesData;
      if (currentEmpFilter === 'MONTHLY') list = list.filter(x => x.wageType === 'MONTHLY');
      else if (currentEmpFilter === 'DAILY_PAY') list = list.filter(x => x.wageType === 'DAILY_PAY');
      if (currentEmpTradeFilter && currentEmpTradeFilter !== 'ALL') {
        list = list.filter(x => (x.dept && x.dept.includes(currentEmpTradeFilter)) || (x.trade && x.trade.includes(currentEmpTradeFilter)));
      }
      const q = document.getElementById('searchEmpInput')?.value;
      if (q) {
        const lq = q.toLowerCase().trim();
        list = list.filter(e => 
          (e.name && e.name.toLowerCase().includes(lq)) || 
          (e.empId && e.empId.toLowerCase().includes(lq)) || 
          (e.trade && e.trade.toLowerCase().includes(lq))
        );
      }

      const headers = ['Emp ID', 'Full Name', 'Wage Category', 'Trade / Role', 'Department', 'Project', 'Compensation (INR)', 'PF Covered', 'ESIC Covered', 'Mobile', 'Blood Group', 'Safety Status'];
      const rows = list.map(e => [
        \`"\${e.empId}"\`,
        \`"\${e.name}"\`,
        \`"\${e.wageType}"\`,
        \`"\${e.trade || ''}"\`,
        \`"\${e.dept || ''}"\`,
        \`"\${e.project || ''}"\`,
        \`"\${e.wageType === 'MONTHLY' ? e.ctc : e.dailyRate}"\`,
        \`"\${e.wageType === 'MONTHLY' ? 'Yes (12%)' : 'Exempt'}"\`,
        \`"\${e.wageType === 'MONTHLY' ? 'Yes (0.75%)' : 'Exempt'}"\`,
        \`"\${e.mobile || ''}"\`,
        \`"\${e.bloodGroup || ''}"\`,
        \`"\${e.empId !== 'EMP-2026-0007' ? 'Inducted' : 'Pending Induction'}"\`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', \`BALSONS_Employee_Master_\${new Date().toISOString().slice(0,10)}.csv\`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function renderEmployeesTable(searchQ) {
      const tbody = document.getElementById('employeeTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      let list = employeesData;
      if (currentEmpFilter === 'MONTHLY') list = list.filter(x => x.wageType === 'MONTHLY');
      else if (currentEmpFilter === 'DAILY_PAY') list = list.filter(x => x.wageType === 'DAILY_PAY');

      if (currentEmpTradeFilter && currentEmpTradeFilter !== 'ALL') {
        const tf = currentEmpTradeFilter.toLowerCase();
        list = list.filter(x => (x.dept && x.dept.toLowerCase().includes(tf)) || (x.trade && x.trade.toLowerCase().includes(tf)));
      }

      if (searchQ) {
        const q = searchQ.toLowerCase().trim();
        list = list.filter(e => 
          (e.name && e.name.toLowerCase().includes(q)) || 
          (e.empId && e.empId.toLowerCase().includes(q)) || 
          (e.trade && e.trade.toLowerCase().includes(q)) ||
          (e.dept && e.dept.toLowerCase().includes(q)) ||
          (e.mobile && e.mobile.toLowerCase().includes(q))
        );
        const clr = document.getElementById('clearEmpSearch');
        if (clr) clr.style.display = q ? 'block' : 'none';
      } else {
        const clr = document.getElementById('clearEmpSearch');
        if (clr) clr.style.display = 'none';
      }

      // Update record count badge
      const countEl = document.getElementById('empRecordCount');
      if (countEl) {
        countEl.textContent = \`Showing \${list.length} of \${employeesData.length} Records\`;
      }

      if (list.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td colspan="10" style="text-align: center; padding: 40px 20px; color: var(--beds-text-muted);">
            <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
            <div style="font-weight: 700; font-size: 14px; color: var(--beds-charcoal-heading);">No Personnel Found</div>
            <div style="font-size: 12px; margin-top: 4px;">No employee records match the active search query or filter criteria.</div>
            <button class="btn btn-secondary btn-sm" onclick="clearEmployeeSearch(); filterEmployeeCategory('ALL');" style="margin-top: 12px;">Reset All Filters</button>
          </td>
        \`;
        tbody.appendChild(tr);
        return;
      }

      list.forEach(emp => {
        const tr = document.createElement('tr');
        const isMonthly = emp.wageType === 'MONTHLY';
        const typeBadge = isMonthly 
          ? \`<span class="status-pill status-info" style="font-size: 10px; font-weight: 700; letter-spacing: 0.3px;">MONTHLY (PF+ESIC)</span>\`
          : \`<span class="status-pill status-warning" style="font-size: 10px; font-weight: 700; letter-spacing: 0.3px;">DAILY PAY (NO PF/ESIC)</span>\`;

        const compBasis = isMonthly 
          ? \`<span style="font-weight: 700; color: var(--beds-charcoal-heading);">₹ \${emp.ctc.toLocaleString('en-IN')}</span> <span style="font-size: 10.5px; color: var(--beds-text-secondary);">/ mo</span>\`
          : \`<strong style="color: #D97706;">₹ \${emp.dailyRate.toLocaleString('en-IN')}</strong> <span style="font-size: 10.5px; color: var(--beds-text-secondary);">/ Day</span>\`;

        const pfCell = isMonthly ? \`<span class="status-pill status-success">Covered (12%)</span>\` : \`<span style="color: var(--beds-text-muted); font-size: 11px;">Exempt (₹ 0)</span>\`;
        const esicCell = isMonthly ? \`<span class="status-pill status-success">Covered (0.75%)</span>\` : \`<span style="color: var(--beds-text-muted); font-size: 11px;">Exempt (₹ 0)</span>\`;

        const isInducted = emp.empId !== 'EMP-2026-0007';
        const safetyPassNo = isInducted ? 'SP-2026-' + emp.empId.slice(-3) : 'NONE';
        const safetyCell = isInducted
          ? \`<span class="status-pill status-success" style="font-size: 10px; font-weight: 800;">🟢 INDUCTED (\${safetyPassNo})</span>\`
          : \`<span class="status-pill status-danger" style="font-size: 10px; font-weight: 800;">🔴 PENDING INDUCTION (GATE BLOCKED)</span>\`;

        tr.innerHTML = \`
          <td>
            <span style="font-family: monospace; font-size: 11.5px; font-weight: 700; background: var(--beds-bg-page); padding: 3px 6px; border-radius: 4px; border: 1px solid var(--beds-border); color: var(--beds-charcoal-heading); display: inline-block;">
              \${emp.empId}
            </span>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="\${emp.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" alt="\${escapeHtml(emp.name)}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--beds-teal-primary); flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.08);" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'">
              <div>
                <a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${emp.empId}')" style="font-weight: 700; font-size: 12.5px; color: var(--beds-teal-primary); text-decoration: none;" title="Open 360° Personnel Dossier">
                  \${escapeHtml(emp.name)} 📄
                </a>
                <div style="font-size: 10.5px; color: var(--beds-text-muted); margin-top: 1px; display: flex; align-items: center; gap: 6px;">
                  <span>📞 \${emp.mobile || '—'}</span>
                  \${emp.bloodGroup ? \`<span style="background: rgba(220,38,38,0.08); color: #DC2626; padding: 0 4px; border-radius: 2px; font-weight: 700;">\${emp.bloodGroup}</span>\` : ''}
                </div>
              </div>
            </div>
          </td>
          <td>\${typeBadge}</td>
          <td>
            <div style="font-weight: 700; color: var(--beds-charcoal-heading); font-size: 12px;">\${escapeHtml(emp.trade || 'Worker')}</div>
            <div style="font-size: 10.5px; color: var(--beds-text-secondary); margin-top: 1px;">\${escapeHtml(emp.dept || 'Operations')}</div>
          </td>
          <td><span style="font-size: 11px; color: var(--beds-teal-primary); font-weight: 700; background: rgba(0,151,178,0.07); padding: 3px 6px; border-radius: 4px; border: 1px solid rgba(0,151,178,0.18);">📍 \${emp.project}</span></td>
          <td class="tabular-nums" style="text-align: right;">\${compBasis}</td>
          <td style="text-align: center;">\${pfCell}</td>
          <td style="text-align: center;">\${esicCell}</td>
          <td style="text-align: center;">\${safetyCell}</td>
          <td style="white-space: nowrap; text-align: center;">
            <div style="display: inline-flex; gap: 4px; align-items: center; justify-content: center;">
              <button class="btn btn-sm" onclick="Balsons360Dossier.openModal('\${emp.empId}')" style="font-size: 11px; padding: 4px 8px; background: #0097B2; color: #FFFFFF; font-weight: 700; border: none; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,151,178,0.3);" title="View 360° Unified Master Dossier">📄 360 Dossier</button>
              <button class="btn btn-secondary btn-sm" onclick="openEditEmployeeModal('\${emp.empId}')" style="font-size: 11px; padding: 4px 7px; border-radius: 4px;" title="Edit Employee Master Record">✏️ Edit</button>
              <button class="btn btn-secondary btn-sm" onclick="previewPayslip('\${emp.empId}')" style="font-size: 11px; padding: 4px 7px; border-radius: 4px;" title="Generate &amp; Print Salary Slip">📑 Slip</button>
              <button class="btn btn-primary btn-sm" onclick="openIdCardModal('\${emp.empId}')" style="background: var(--beds-teal-primary); font-size: 11px; padding: 4px 7px; border-radius: 4px;" title="Print Gate Entry/Out ID Card">🪪 ID Pass</button>
              <button class="btn btn-secondary btn-sm" onclick="openEnrolmentFormModal('\${emp.empId}')" style="font-size: 11px; padding: 4px 7px; border-radius: 4px;" title="Print Official Statutory Enrolment Dossier">🖨️ Enrol Form</button>
            </div>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }`;

html = html.replace(oldRenderFnRegex, newRenderFn);
console.log('✅ Updated renderEmployeesTable and added trade/search helpers');

// Write to BALSONS HR MANAGER
fs.writeFileSync(hrPath, html, 'utf8');
console.log('✅ Successfully written to', hrPath);

// Mirror to Launcher
fs.writeFileSync(launcherPath, html, 'utf8');
console.log('✅ Successfully mirrored to', launcherPath);
