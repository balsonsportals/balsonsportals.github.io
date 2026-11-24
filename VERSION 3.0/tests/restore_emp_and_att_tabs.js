const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

// The faulty section starts at <div class="table-container"> under tab-radar and ends before <!-- TAB 4: ADVANCES
const faultySectionRegex = /<div class="table-container">\s*<div class="table-header">\s*<div>\s*<h2>🏢 Project Site Deployment & Manpower Allocation<\/h2>[\s\S]*?<\/tbody>\s*<\/table>\s*<\/div>\s*<\/div>\s*<\/section>\s*(?=\s*<!-- TAB 4: ADVANCES)/;

const correctedSections = `<div class="table-container">
        <div class="table-header">
          <div>
            <h2>🏢 Project Site Deployment &amp; Manpower Allocation</h2>
            <p style="font-size: 12px; color: var(--beds-text-secondary); margin-top: 2px;">
              Active deployment across JTRWF Khordha, Paradeep Port, and Tata Kalinganagar.
            </p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="openOnboardModal()">+ Onboard Employee</button>
        </div>
        <table class="beds-table">
          <thead>
            <tr>
              <th>Project Code</th>
              <th>Project / Worksite Name</th>
              <th>Total Deployed</th>
              <th>Monthly Staff (PF/ESIC)</th>
              <th>Daily Pay Crew (No PF/ESIC)</th>
              <th>Project Manager</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong style="font-family: monospace;">PRJ-JTRWF-SCHULER</strong></td>
              <td><strong>Jupiter Tatravagonka Railwheel Factory</strong></td>
              <td class="tabular-nums"><strong>48</strong></td>
              <td class="tabular-nums">18</td>
              <td class="tabular-nums" style="font-weight: 700; color: #D97706;">30</td>
              <td>Satish Chandra</td>
              <td><span class="status-pill status-success">Active Site</span></td>
            </tr>
            <tr>
              <td><strong style="font-family: monospace;">PRJ-PARADEEP-IO</strong></td>
              <td><strong>Paradeep Port Heavy Erection Yard</strong></td>
              <td class="tabular-nums"><strong>12</strong></td>
              <td class="tabular-nums">6</td>
              <td class="tabular-nums" style="font-weight: 700; color: #D97706;">6</td>
              <td>Dilip Rout</td>
              <td><span class="status-pill status-success">Active Site</span></td>
            </tr>
            <tr>
              <td><strong style="font-family: monospace;">PRJ-KALINGANAGAR-TSL</strong></td>
              <td><strong>Tata Steel Kalinganagar Plant 2</strong></td>
              <td class="tabular-nums"><strong>8</strong></td>
              <td class="tabular-nums">4</td>
              <td class="tabular-nums" style="font-weight: 700; color: #D97706;">4</td>
              <td>Executive Director</td>
              <td><span class="status-pill status-info">Headquarters</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- TAB 2: EMPLOYEE MASTER -->
    <section id="tab-employees" class="section-view">
      <div class="table-container">
        <div class="table-header">
          <div>
            <h2>👥 Employee Master Directory &amp; Statutory KYC Registry (EMPLOYEE_MASTER)</h2>
            <p style="font-size: 12px; color: var(--beds-text-secondary); margin-top: 2px;">
              Single source of truth employee database with wage type categorization (Monthly vs Daily Pay), avatar photos, and statutory status.
            </p>
          </div>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <div class="filter-btn-group">
              <button class="btn btn-primary btn-sm" id="btnEmpAll" onclick="filterEmployeeCategory('ALL')">All Employees (68)</button>
              <button class="btn btn-secondary btn-sm" id="btnEmpMonthly" onclick="filterEmployeeCategory('MONTHLY')">Monthly (PF+ESIC)</button>
              <button class="btn btn-secondary btn-sm" id="btnEmpDaily" onclick="filterEmployeeCategory('DAILY_PAY')">Daily Pay (No PF/ESIC)</button>
            </div>
            <input type="text" id="searchEmpInput" class="beds-input" placeholder="Search name, ID, or trade..." style="width: 200px; font-size: 12px;" oninput="searchEmployees(this.value)">
            <a href="register.html" target="_blank" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 4px; text-decoration: none;" title="Open Trilingual Candidate Registration Form">
              🔗 Open Form
            </a>
            <button class="btn btn-secondary btn-sm" onclick="copyRegistrationLink()" title="Copy link to send to employees via WhatsApp/Email">
              📋 Share Link
            </button>
            <button class="btn btn-primary btn-sm" onclick="openOnboardModal()">+ Onboard Employee</button>
          </div>
        </div>
        <table class="beds-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Full Name</th>
              <th>Wage Classification</th>
              <th>Department / Trade</th>
              <th>Assigned Project</th>
              <th>Compensation Basis</th>
              <th>Statutory PF</th>
              <th>Statutory ESIC</th>
              <th>🛡️ Safety Clearance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="employeeTableBody">
            <!-- Populated dynamically -->
          </tbody>
        </table>
      </div>
    </section>

    <!-- TAB 3: ATTENDANCE & OT GRID -->
    <section id="tab-attendance" class="section-view">
      <div class="table-container">
        <div class="table-header">
          <div>
            <h2>📅 Dual Workforce Attendance Muster &amp; Overtime Grid (Nov 2026)</h2>
            <p style="font-size: 12px; color: var(--beds-text-secondary); margin-top: 2px;">
              Period: <strong>November 2026</strong> • Full Interactive In-Portal Muster Editing with Instant Dual-Sync &amp; Overtime Recalculation.
            </p>
          </div>
          <!-- ATTENDANCE MUSTER TOOLBAR & CONTROLS -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px; background: var(--beds-bg-page); padding: 10px 14px; border-radius: var(--beds-radius-md); border: 1px solid var(--beds-border); width: 100%;">
            <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
              <span style="font-size: 11px; font-weight: 800; color: var(--beds-charcoal-heading); text-transform: uppercase;">Muster Filter:</span>
              <button class="btn btn-primary btn-sm" id="btnAttAll" onclick="filterAttendanceCategory('ALL')">All Workforce (68)</button>
              <button class="btn btn-secondary btn-sm" id="btnAttMonthly" onclick="filterAttendanceCategory('MONTHLY')">Monthly Staff (28)</button>
              <button class="btn btn-secondary btn-sm" id="btnAttDaily" onclick="filterAttendanceCategory('DAILY_PAY')">Daily Pay Crew (40)</button>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
              <input type="text" id="searchAttendanceInput" class="beds-input" placeholder="🔍 Search worker or trade..." style="font-size: 12px; width: 220px; padding: 4px 8px;" oninput="renderAttendanceTable(this.value)">
              <button class="btn btn-secondary btn-sm" onclick="markAllFullAttendance()" title="Auto-fill 26 present + 4 weekly offs for all monthly staff">⚡ Fill 30d/26d Standard</button>
              <button class="btn btn-primary btn-sm" onclick="saveAttendanceMuster()" style="background: #10b981; border-color: #10b981; font-weight: 800;">💾 Save &amp; Dual-Sync</button>
            </div>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="beds-table">
            <thead>
              <tr style="background: var(--beds-bg-page);">
                <th style="width: 110px;">Emp ID</th>
                <th>Employee / Worker</th>
                <th style="width: 105px;">Wage Category</th>
                <th style="width: 80px; text-align: center;">Present (d)</th>
                <th style="width: 70px; text-align: center;">Weekly Off</th>
                <th style="width: 70px; text-align: center;">Paid Leave</th>
                <th style="width: 95px; text-align: center;">Payable Days</th>
                <th style="width: 85px; text-align: center;">OT (Hours)</th>
                <th>Statutory Rule</th>
                <th style="width: 140px; text-align: center;">Actions</th>
              </tr>
            </thead>
            <tbody id="attendanceTableBody">
              <!-- Dynamically populated with interactive editable inputs -->
            </tbody>
          </table>
        </div>
      </div>
    </section>`;

if (faultySectionRegex.test(html)) {
  html = html.replace(faultySectionRegex, correctedSections);
  console.log('✅ Successfully restored tab-radar, tab-employees, and tab-attendance sections!');
} else {
  console.error('faultySectionRegex did not match!');
  process.exit(1);
}

// Also update switchHrTab to ensure renderEmployeesTable and renderAttendanceTable are called
const oldSwitchRegex = /if \(tabId === 'payslips'\) \{/;
const newSwitchCalls = `if (tabId === 'employees') {
        renderEmployeesTable();
      } else if (tabId === 'attendance') {
        renderAttendanceTable();
      } else if (tabId === 'payslips') {`;

if (html.includes("if (tabId === 'payslips') {")) {
  html = html.replace(oldSwitchRegex, newSwitchCalls);
  console.log('✅ Updated switchHrTab to call renderEmployeesTable() and renderAttendanceTable()');
}

fs.writeFileSync('BALSONS HR MANAGER/frontend/index.html', html, 'utf8');
fs.writeFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html', html, 'utf8');
console.log('Done writing updated files!');
