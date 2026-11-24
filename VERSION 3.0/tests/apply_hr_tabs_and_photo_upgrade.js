const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

// 1. UPDATE NAVIGATION BAR:
// Extract Employee Master and Salary Slips Studio to main tabs and remove from dropdowns
const oldNavRegex = /<nav id="master-nav-tabs">[\s\S]*?<\/nav>/;

const newNav = `<nav id="master-nav-tabs">
    <!-- Group 1: Workforce Radar (Direct Main Tab) -->
    <button class="beds-nav-tab active" data-target="radar" onclick="switchHrTab('radar')">
      🧭 Workforce Radar
    </button>

    <!-- Group 2: Employee Master (Direct Main Tab - Promoted from Dropdown) -->
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

    <!-- Group 5: Salary Slips Studio (Direct Main Tab - Promoted from Dropdown) -->
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

if (!oldNavRegex.test(html)) {
  console.error('Failed to find old nav regex in index.html');
  process.exit(1);
}
html = html.replace(oldNavRegex, newNav);
console.log('✅ Replaced master-nav-tabs successfully');

// 2. ENHANCE MODAL ONBOARD PHOTO UPLOAD CONTROLS
// Add camera capture and live photo sync
const oldOnbPhotoSection = `<div style="background: var(--beds-bg-panel); border: 1px solid var(--beds-border); border-radius: var(--beds-radius-sm); padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 11.5px; color: var(--beds-charcoal-heading);">📷 1. Employee Photo</strong>
                <span class="status-pill status-info" id="badgePhoto">REQUIRED</span>
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <div id="onbPhotoBox" style="width: 55px; height: 68px; border: 1.5px solid var(--beds-teal-primary); border-radius: 4px; overflow: hidden; background: #E2E8F0; display: flex; align-items: center; justify-content: center;">
                  <img id="onbPhotoImg" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="flex: 1;">
                  <label class="btn btn-secondary btn-sm" style="display: inline-block; cursor: pointer; margin-bottom: 4px;">
                    Choose Photo...
                    <input type="file" id="onbPhotoFile" accept="image/*" style="display: none;" onchange="handlePhotoSelect(event)">
                  </label>
                  <div style="font-size: 10px; color: var(--beds-text-secondary);" id="photoStatusText">JPG/PNG portrait, max 2MB</div>
                </div>
              </div>
            </div>`;

const newOnbPhotoSection = `<div style="background: var(--beds-bg-panel); border: 1px solid var(--beds-border); border-radius: var(--beds-radius-sm); padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 11.5px; color: var(--beds-charcoal-heading);">📷 1. Employee Photo (35mm × 45mm)</strong>
                <span class="status-pill status-info" id="badgePhoto">REQUIRED</span>
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <div id="onbPhotoBox" style="width: 58px; height: 72px; border: 1.5px solid var(--beds-teal-primary); border-radius: 4px; overflow: hidden; background: #E2E8F0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.08);">
                  <img id="onbPhotoImg" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="flex: 1;">
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
                    <label class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer; padding: 4px 8px; font-size: 11px;">
                      📁 Choose Photo...
                      <input type="file" id="onbPhotoFile" accept="image/*" style="display: none;" onchange="handlePhotoSelect(event)">
                    </label>
                    <button type="button" class="btn btn-secondary btn-sm" onclick="triggerWebcamForOnboard()" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; font-size: 11px;">
                      📸 Camera
                    </button>
                  </div>
                  <div style="font-size: 10px; color: var(--beds-text-secondary);" id="photoStatusText">JPG/PNG portrait, max 5MB • Syncs with KYC Vault</div>
                </div>
              </div>
            </div>`;

if (html.includes(oldOnbPhotoSection)) {
  html = html.replace(oldOnbPhotoSection, newOnbPhotoSection);
  console.log('✅ Updated modalOnboard photo section');
} else {
  console.warn('⚠️ Could not find exact oldOnbPhotoSection');
}

// 3. ENHANCE MODAL EDIT EMPLOYEE WITH PHOTO UPLOAD & PREVIEW
const oldEditFormStart = `<form id="editEmployeeForm" onsubmit="handleEditEmployeeSubmit(event)">
        <input type="hidden" id="editEmpId">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">`;

const newEditFormStart = `<form id="editEmployeeForm" onsubmit="handleEditEmployeeSubmit(event)">
        <input type="hidden" id="editEmpId">
        
        <!-- Photo Upload & Identity Card Sync -->
        <div style="display: flex; gap: 14px; align-items: center; background: var(--beds-bg-page); border: 1.5px dashed var(--beds-teal-primary); border-radius: var(--beds-radius-md); padding: 12px 16px; margin-bottom: 16px;">
          <div style="width: 58px; height: 72px; border: 2px solid var(--beds-teal-primary); border-radius: 4px; overflow: hidden; background: #E2E8F0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
            <img id="editEmpPhotoImg" src="" alt="Employee Photo" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="font-size: 12px; color: var(--beds-charcoal-heading);">📷 Employee Passport Photo (35mm × 45mm)</strong>
              <span class="status-pill status-info" id="editPhotoBadge" style="font-size: 9.5px;">ACTIVE IDENTITY</span>
            </div>
            <div style="font-size: 11px; color: var(--beds-text-secondary); margin-bottom: 8px;">
              Directly updates Gate Entry badge, ID card, 360° personnel dossier, and cloud KYC vault.
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <label class="btn btn-secondary btn-sm" style="cursor: pointer; font-size: 11px;">
                📁 Choose New Photo...
                <input type="file" id="editEmpPhotoFile" accept="image/*" style="display: none;" onchange="handleEditPhotoSelect(event)">
              </label>
              <button type="button" class="btn btn-secondary btn-sm" onclick="triggerWebcamForEdit()" style="font-size: 11px;">
                📸 Live Camera
              </button>
              <span id="editPhotoStatus" style="font-size: 10.5px; color: var(--beds-teal-primary); font-weight: 600;">Current profile photo loaded</span>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">`;

if (html.includes(oldEditFormStart)) {
  html = html.replace(oldEditFormStart, newEditFormStart);
  console.log('✅ Added photo upload section to editEmployeeForm');
} else {
  console.warn('⚠️ Could not find exact oldEditFormStart');
}

// 4. ADD WEBCAM MODAL FOR HR PORTAL (FOR BOTH ONBOARD & EDIT EMPLOYEE)
const webcamModalHtml = `
  <!-- WEBCAM CAPTURE MODAL -->
  <div id="modalWebcamCapture" class="beds-modal-backdrop modal-backdrop" style="display: none;">
    <div class="beds-modal modal-box" style="width: 520px; max-width: 95vw; padding: 22px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--beds-teal-primary); padding-bottom: 10px; margin-bottom: 14px;">
        <div style="font-size: 16px; font-weight: 800; color: var(--beds-charcoal-heading);">📸 Live Camera Photo Capture</div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeWebcamModal()">✖</button>
      </div>
      <div style="position: relative; width: 100%; height: 320px; background: #000; border-radius: 6px; overflow: hidden; margin-bottom: 14px; display: flex; align-items: center; justify-content: center;">
        <video id="hrWebcamVideo" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
        <canvas id="hrWebcamCanvas" style="display: none;"></canvas>
        <!-- Portrait Overlay Guide -->
        <div style="position: absolute; width: 175px; height: 225px; border: 2px dashed rgba(255,255,255,0.7); border-radius: 6px; pointer-events: none; box-shadow: 0 0 0 9999px rgba(0,0,0,0.35);"></div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 11px; color: var(--beds-text-secondary);">Center face within frame</span>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeWebcamModal()">Cancel</button>
          <button type="button" class="btn btn-primary btn-sm" onclick="captureWebcamPhoto()" style="font-weight: 800; background: var(--beds-teal-primary);">
            📸 Snap Photo
          </button>
        </div>
      </div>
    </div>
  </div>
`;

if (!html.includes('id="modalWebcamCapture"')) {
  // Insert before </body>
  html = html.replace('</body>', webcamModalHtml + '\n</body>');
  console.log('✅ Injected modalWebcamCapture');
}

fs.writeFileSync('BALSONS HR MANAGER/frontend/index.html', html, 'utf8');
console.log('Done writing initial index.html updates.');
