const fs = require('fs');

const oldNav = `<nav id="master-nav-tabs">
    <!-- Group 1: Workforce Radar (Direct) -->
    <button class="beds-nav-tab active" data-target="radar" onclick="switchHrTab('radar')">
      🧭 Workforce Radar
    </button>

    <!-- Group 2: Manpower & Attendance Dropdown -->
    <div class="beds-nav-dropdown">
      <button class="beds-nav-tab beds-dropdown-toggle" id="toggle-hr-manpower" type="button">
        👥 Manpower & Attendance <span class="beds-caret">▾</span>
      </button>
      <div class="beds-dropdown-menu">
        <a class="beds-dropdown-item" data-target="employees" onclick="switchHrTab('employees')">
          <span class="item-icon">👥</span>
          <div class="item-text">
            <strong>Employee Master</strong>
            <small>Active workforce, wage types & statutory KYC</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="attendance" onclick="switchHrTab('attendance')">
          <span class="item-icon">📅</span>
          <div class="item-text">
            <strong>Attendance & OT Grid</strong>
            <small>Duty days, overtime hours & shift records</small>
          </div>
        </a>
      </div>
    </div>

    <!-- Group 3: Payroll & Earnings Dropdown -->
    <div class="beds-nav-dropdown">
      <button class="beds-nav-tab beds-dropdown-toggle" id="toggle-hr-payroll" type="button">
        💰 Payroll & Earnings <span class="beds-caret">▾</span>
      </button>
      <div class="beds-dropdown-menu">
        <a class="beds-dropdown-item" data-target="payroll" onclick="switchHrTab('payroll')">
          <span class="item-icon">⚙️</span>
          <div class="item-text">
            <strong>Payroll Processing</strong>
            <small>Gross wage, PF, ESIC & net disbursements</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="advances" onclick="switchHrTab('advances')">
          <span class="item-icon">💵</span>
          <div class="item-text">
            <strong>Advances & Deductions</strong>
            <small>Mid-month salary advances & loan recovery</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="payslips" onclick="switchHrTab('payslips')">
          <span class="item-icon">📑</span>
          <div class="item-text">
            <strong>Salary Slips Studio</strong>
            <small>Monthly PF/ESIC slips & daily wage sheets</small>
          </div>
        </a>
      </div>
    </div>

    <!-- Group 4: Safety & Governance Dropdown -->
    <div class="beds-nav-dropdown">
      <button class="beds-nav-tab beds-dropdown-toggle" id="toggle-hr-safety" type="button">
        🛡️ Safety & Governance <span class="beds-caret">▾</span>
      </button>
      <div class="beds-dropdown-menu">
        <a class="beds-dropdown-item" data-target="safety-clearance" onclick="switchHrTab('safety-clearance')">
          <span class="item-icon">🛡️</span>
          <div class="item-text">
            <strong>Safety Induction & Gate Clearance</strong>
            <small>Cross-portal safety passes, Form 31 & gate status</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="dossier-360" onclick="switchHrTab('dossier-360')">
          <span class="item-icon">📄</span>
          <div class="item-text">
            <strong>360° Workforce Dossier</strong>
            <small>Unified cross-portal master personnel record</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="documents" onclick="switchHrTab('documents')">
          <span class="item-icon">📋</span>
          <div class="item-text">
            <strong>HR Documents & Dossiers</strong>
            <small>Enrolment dossiers, appointment letters & ID passes</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="audit" onclick="switchHrTab('audit')">
          <span class="item-icon">📜</span>
          <div class="item-text">
            <strong>Audit Trail & Logs</strong>
            <small>Immutable change logs & statutory compliance</small>
          </div>
        </a>
      </div>
    </div>
  </nav>`;

const newNav = `<nav id="master-nav-tabs">
    <!-- Group 1: Workforce Radar (Direct Main Tab) -->
    <button class="beds-nav-tab active" data-target="radar" onclick="switchHrTab('radar')">
      🧭 Workforce Radar
    </button>

    <!-- Group 2: Employee Master (Direct Main Tab - Extracted from Dropdown) -->
    <button class="beds-nav-tab" data-target="employees" onclick="switchHrTab('employees')">
      👥 Employee Master
    </button>

    <!-- Group 3: Attendance Grid (Direct Main Tab) -->
    <button class="beds-nav-tab" data-target="attendance" onclick="switchHrTab('attendance')">
      📅 Attendance &amp; OT Grid
    </button>

    <!-- Group 4: Payroll & Earnings Dropdown -->
    <div class="beds-nav-dropdown">
      <button class="beds-nav-tab beds-dropdown-toggle" id="toggle-hr-payroll" type="button">
        💰 Payroll &amp; Earnings <span class="beds-caret">▾</span>
      </button>
      <div class="beds-dropdown-menu">
        <a class="beds-dropdown-item" data-target="payroll" onclick="switchHrTab('payroll')">
          <span class="item-icon">⚙️</span>
          <div class="item-text">
            <strong>Payroll Processing</strong>
            <small>Gross wage, PF, ESIC &amp; net disbursements</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="advances" onclick="switchHrTab('advances')">
          <span class="item-icon">💵</span>
          <div class="item-text">
            <strong>Advances &amp; Deductions</strong>
            <small>Mid-month salary advances &amp; loan recovery</small>
          </div>
        </a>
      </div>
    </div>

    <!-- Group 5: Salary Slips Studio (Direct Main Tab - Extracted from Dropdown) -->
    <button class="beds-nav-tab" data-target="payslips" onclick="switchHrTab('payslips')">
      📑 Salary Slips Studio
    </button>

    <!-- Group 6: Safety & Governance Dropdown -->
    <div class="beds-nav-dropdown">
      <button class="beds-nav-tab beds-dropdown-toggle" id="toggle-hr-safety" type="button">
        🛡️ Safety &amp; Governance <span class="beds-caret">▾</span>
      </button>
      <div class="beds-dropdown-menu">
        <a class="beds-dropdown-item" data-target="safety-clearance" onclick="switchHrTab('safety-clearance')">
          <span class="item-icon">🛡️</span>
          <div class="item-text">
            <strong>Safety Induction &amp; Gate Clearance</strong>
            <small>Cross-portal safety passes, Form 31 &amp; gate status</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="dossier-360" onclick="switchHrTab('dossier-360')">
          <span class="item-icon">📄</span>
          <div class="item-text">
            <strong>360° Workforce Dossier</strong>
            <small>Unified cross-portal master personnel record</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="documents" onclick="switchHrTab('documents')">
          <span class="item-icon">📋</span>
          <div class="item-text">
            <strong>HR Documents &amp; Dossiers</strong>
            <small>Enrolment dossiers, appointment letters &amp; ID passes</small>
          </div>
        </a>
        <a class="beds-dropdown-item" data-target="audit" onclick="switchHrTab('audit')">
          <span class="item-icon">📜</span>
          <div class="item-text">
            <strong>Audit Trail &amp; Logs</strong>
            <small>Immutable change logs &amp; statutory compliance</small>
          </div>
        </a>
      </div>
    </div>
  </nav>`;

let file = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');
const normalizedOld = oldNav.replace(/\r?\n/g, '\n');
const normalizedFile = file.replace(/\r?\n/g, '\n');

if (!normalizedFile.includes(normalizedOld)) {
  console.error('ERROR: oldNav not found in file!');
  process.exit(1);
} else {
  console.log('SUCCESS: oldNav matches perfectly!');
}
