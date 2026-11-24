const fs = require('fs');

console.log('Applying ID Card Studio, Dossier, Radar KPI, and Nav Freeze upgrades...');

const hrPath = 'BALSONS HR MANAGER/frontend/index.html';
const launcherPath = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html';

let html = fs.readFileSync(hrPath, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 1. FREEZE NAVIGATION: Update CSS for header, nav, and sticky container
// ─────────────────────────────────────────────────────────────────────────────

// Add CSS for .beds-sticky-header-container and refine header & nav
const oldNavCssRegex = /nav\s*\{[\s\S]*?position:\s*sticky;[\s\S]*?top:\s*58px;[\s\S]*?z-index:\s*90;[\s\S]*?\}/;
const newNavCss = `.beds-sticky-header-container {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--beds-bg-panel);
      box-shadow: 0 4px 16px rgba(16, 45, 53, 0.08);
      width: 100%;
    }
    header {
      background-color: var(--beds-bg-panel);
      border-bottom: 1px solid var(--beds-border);
      padding: 10px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
    }
    nav {
      background: var(--beds-bg-panel);
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 28px;
      overflow: visible !important; /* STRICTLY NO SCROLLBAR, ALLOWS DROPDOWNS */
      white-space: normal;
      position: relative;
      z-index: 9;
      border-bottom: 1px solid var(--beds-border);
    }`;

if (oldNavCssRegex.test(html)) {
  html = html.replace(oldNavCssRegex, newNavCss);
  console.log('✅ Updated header & nav CSS to freeze navigation');
} else {
  console.warn('⚠️ Could not match oldNavCssRegex directly');
}

// Wrap header and nav in HTML
const oldHeaderNavRegex = /<header>([\s\S]*?)<\/header>[\s\S]*?<nav id="master-nav-tabs">([\s\S]*?)<\/nav>/;
const headerNavMatch = html.match(oldHeaderNavRegex);

if (headerNavMatch) {
  const newHeaderNavMarkup = `<div id="beds-sticky-header-container" class="beds-sticky-header-container">
  <header>${headerNavMatch[1]}</header>
  <nav id="master-nav-tabs">${headerNavMatch[2]}</nav>
  </div>`;
  html = html.replace(oldHeaderNavRegex, newHeaderNavMarkup);
  console.log('✅ Wrapped header and master-nav-tabs inside #beds-sticky-header-container');
} else {
  console.warn('⚠️ Could not match oldHeaderNavRegex');
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. WORKFORCE RADAR: Polish KPI cards
// ─────────────────────────────────────────────────────────────────────────────
const oldRadarKpiRegex = /<!-- TAB 1: WORKFORCE RADAR -->[\s\S]*?<section id="tab-radar" class="section-view active">[\s\S]*?<div class="kpi-row">[\s\S]*?<\/div>[\s\S]*?<!-- Wage Classification Policy Notice Banner -->/;

const newRadarKpiMarkup = `<!-- TAB 1: WORKFORCE RADAR -->
    <section id="tab-radar" class="section-view active">
      <div class="kpi-row" style="margin-bottom: 24px;">
        <!-- Card 1: Total Active Workforce -->
        <div class="kpi-card teal" style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #0097B2; border-radius: var(--beds-radius-lg); padding: 18px 20px; box-shadow: 0 4px 16px rgba(16, 45, 53, 0.05); display: flex; flex-direction: column; justify-content: space-between; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div class="kpi-label" style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Total Active Workforce</div>
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(0, 151, 178, 0.1); color: #0097B2; display: flex; align-items: center; justify-content: center; font-size: 16px;">👥</div>
          </div>
          <div class="kpi-value" id="kpiTotalEmployees" style="font-size: 34px; font-weight: 900; color: var(--beds-charcoal-heading); line-height: 1.1; margin-bottom: 6px;">68</div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 8px; border-top: 1px solid var(--beds-border);">
            <span>28 Staff • 40 Site Crew</span>
            <span class="status-pill status-info" style="font-size: 9.5px; font-weight: 800;">100% DEPLOYED</span>
          </div>
        </div>

        <!-- Card 2: Monthly Staff (PF + ESIC) -->
        <div class="kpi-card green" style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #2563EB; border-radius: var(--beds-radius-lg); padding: 18px 20px; box-shadow: 0 4px 16px rgba(16, 45, 53, 0.05); display: flex; flex-direction: column; justify-content: space-between; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div class="kpi-label" style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Monthly Staff (PF + ESIC)</div>
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(37, 99, 235, 0.1); color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 16px;">💼</div>
          </div>
          <div class="kpi-value" style="font-size: 34px; font-weight: 900; color: #2563EB; line-height: 1.1; margin-bottom: 6px;">28</div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 8px; border-top: 1px solid var(--beds-border);">
            <span>Regular Payroll • Bank Disbursed</span>
            <span class="status-pill status-success" style="font-size: 9.5px; font-weight: 800;">100% PF &amp; ESIC</span>
          </div>
        </div>

        <!-- Card 3: Daily Pay Workers -->
        <div class="kpi-card amber" style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #D97706; border-radius: var(--beds-radius-lg); padding: 18px 20px; box-shadow: 0 4px 16px rgba(16, 45, 53, 0.05); display: flex; flex-direction: column; justify-content: space-between; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div class="kpi-label" style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Daily Pay Crew (Site Labor)</div>
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(217, 119, 6, 0.1); color: #D97706; display: flex; align-items: center; justify-content: center; font-size: 16px;">🚜</div>
          </div>
          <div class="kpi-value" style="font-size: 34px; font-weight: 900; color: #D97706; line-height: 1.1; margin-bottom: 6px;">40</div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 8px; border-top: 1px solid var(--beds-border);">
            <span>Heavy Rigging, SPMT &amp; Helpers</span>
            <span class="status-pill status-warning" style="font-size: 9.5px; font-weight: 800;">STATUTORY EXEMPT</span>
          </div>
        </div>

        <!-- Card 4: Disbursable Wages -->
        <div class="kpi-card teal" style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #059669; border-radius: var(--beds-radius-lg); padding: 18px 20px; box-shadow: 0 4px 16px rgba(16, 45, 53, 0.05); display: flex; flex-direction: column; justify-content: space-between; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div class="kpi-label" style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Disbursable Wages (Nov 26)</div>
            <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(5, 150, 105, 0.1); color: #059669; display: flex; align-items: center; justify-content: center; font-size: 16px;">💰</div>
          </div>
          <div class="kpi-value tabular-nums" style="font-size: 28px; font-weight: 900; font-family: monospace; color: #059669; line-height: 1.1; margin-bottom: 6px;">₹ 26.64 L</div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 8px; border-top: 1px solid var(--beds-border);">
            <span>Staff: ₹ 18.40 L • Crew: ₹ 8.24 L</span>
            <span class="status-pill status-success" style="font-size: 9.5px; font-weight: 800;">RECONCILED</span>
          </div>
        </div>
      </div>

      <!-- Wage Classification Policy Notice Banner -->`;

if (oldRadarKpiRegex.test(html)) {
  html = html.replace(oldRadarKpiRegex, newRadarKpiMarkup);
  console.log('✅ Polished Workforce Radar KPI cards with stylish executive design');
} else {
  console.warn('⚠️ Could not match oldRadarKpiRegex');
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ID CARD STUDIO MODAL (#modalIdCard): Polish & Remove Side Scrolling
// ─────────────────────────────────────────────────────────────────────────────

const oldIdCardModalRegex = /<!-- 2\. Official Employee ID Card Studio Modal -->[\s\S]*?<div id="modalIdCard" class="beds-modal-backdrop modal-backdrop"[\s\S]*?<\/div>[\s\S]*?<!-- 3\. Official Full Filled Employee Enrolment Dossier/;

const newIdCardModal = `<!-- 2. Official Employee ID Card Studio Modal -->
  <div id="modalIdCard" class="beds-modal-backdrop modal-backdrop" style="display: none;">
    <div class="beds-modal modal-box" style="width: 960px; max-width: 96vw; max-height: 94vh; overflow-y: auto; overflow-x: hidden; padding: 24px 28px; box-sizing: border-box; background: #FFFFFF; border-radius: var(--beds-radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
      
      <!-- Studio Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--beds-teal-primary); padding-bottom: 14px; margin-bottom: 18px; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 14px; flex: 1; min-width: 320px;">
          <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" alt="BALSONS" style="height: 38px; flex-shrink: 0;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 class="modal-title" style="font-size: 17.5px; font-weight: 800; margin: 0; color: var(--beds-charcoal-heading); white-space: nowrap;">
                🪪 BALSONS Official Site Identity Card Studio
              </h3>
              <span class="status-pill status-info" style="font-size: 10px; font-weight: 800;">CR80 STANDARD</span>
            </div>
            <div style="font-size: 11.5px; color: var(--beds-text-secondary); margin-top: 3px;">
              CR80 Standard PVC Badge Generator • PRJ-JTRWF-SCHULER • Jupiter Tatravagonka Railwheel Factory
            </div>
          </div>
        </div>
        
        <!-- Header Actions: Clean non-crowded buttons -->
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary btn-sm" id="btnToggleIdPreview" onclick="toggleIdCardPrintPreview()" style="display: inline-flex; align-items: center; gap: 5px; font-weight: 700;" title="Toggle Full A4 Print Sheet Preview with Crop Marks">
            👁️ Print Preview
          </button>
          <button type="button" class="btn btn-primary btn-sm" onclick="printGateIdCard()" style="display: inline-flex; align-items: center; gap: 5px; background: var(--beds-teal-primary); font-weight: 800; box-shadow: 0 2px 6px rgba(0, 151, 178, 0.25);" title="Calibrated CR80 / A4 Pass Print">
            🖨️ Print Gate Entry ID Card (CR80/A4)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="openEnrolmentFormModal(document.getElementById('idCardEmpSelect').value)" title="View Full Statutory Enrolment Dossier">
            📄 View Full Enrolment Form
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="exportIdCardToDrive()" style="border-color: var(--beds-teal-primary); color: var(--beds-teal-primary); font-weight: 700;" title="Upload badge to Cloud Drive">
            ☁️ Upload Badge to Drive
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeIdCardModal()" style="font-weight: 800; font-size: 14px; padding: 4px 10px;" title="Close Modal">✖</button>
        </div>
      </div>

      <!-- Controls Toolbar -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--beds-bg-page); border: 1px solid var(--beds-border); padding: 10px 16px; border-radius: var(--beds-radius-md); margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading);">Select Worker / Staff:</label>
          <select id="idCardEmpSelect" class="beds-select" style="min-width: 320px; font-size: 12px; padding: 5px 10px; height: 32px; border-radius: var(--beds-radius-md); background: #FFFFFF;" onchange="renderIdCard(this.value)">
            <!-- Populated dynamically -->
          </select>
        </div>
        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
          <div style="display: inline-flex; background: #FFFFFF; padding: 2px; border-radius: var(--beds-radius-md); border: 1px solid var(--beds-border);">
            <button class="btn btn-primary btn-sm" id="btnViewDual" onclick="setIdCardViewMode('dual')" style="font-size: 11px; padding: 4px 10px;">Dual View (Front &amp; Back)</button>
            <button class="btn btn-secondary btn-sm" id="btnViewFront" onclick="setIdCardViewMode('front')" style="font-size: 11px; padding: 4px 10px;">Front Face Only</button>
            <button class="btn btn-secondary btn-sm" id="btnViewBack" onclick="setIdCardViewMode('back')" style="font-size: 11px; padding: 4px 10px;">Back Face Only</button>
          </div>
          <span style="font-size: 11px; color: var(--beds-teal-primary); font-weight: 700; background: rgba(0,151,178,0.08); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(0,151,178,0.2);">
            CR80: 85.6 × 54 mm
          </span>
        </div>
      </div>

      <!-- PRINT PREVIEW SHEET BANNER (Hidden by default, shown on Print Preview toggle) -->
      <div id="idCardPrintPreviewSheet" style="display: none; background: #F8FAFC; border: 1.5px dashed var(--beds-teal-primary); border-radius: var(--beds-radius-md); padding: 16px 20px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <strong style="color: var(--beds-charcoal-heading); font-size: 13px;">🖨️ Calibrated Sheet Print Preview (Actual Size 100% Scale)</strong>
            <div style="font-size: 11px; color: var(--beds-text-secondary); margin-top: 2px;">
              Ready for high-resolution color laser/PVC badge printing with automatic background color forced.
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="printGateIdCard()" style="background: #10B981; border-color: #10B981; font-weight: 800;">
              🖨️ Print Now
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="toggleIdCardPrintPreview()">
              ✕ Close Preview
            </button>
          </div>
        </div>
      </div>

      <!-- ID Card Canvas / Printable Container: Strictly zero side scrolling -->
      <div id="printableIdCardContainer" class="id-card-wrapper" style="overflow-x: hidden; width: 100%; box-sizing: border-box; display: flex; justify-content: center; align-items: flex-start; gap: 28px; padding: 16px 0; flex-wrap: wrap;">
        
        <!-- FRONT FACE OF ID BADGE -->
        <div class="id-card-badge" id="idCardFrontFace">
          <!-- Lanyard slot -->
          <div class="punch-slot"></div>
          
          <!-- Card Header -->
          <div class="id-card-header">
            <div class="logo-row">
              <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" alt="BALSONS">
              <div>
                <div class="comp-title">BALSONS HEAVY LIFT &amp; SHIFT</div>
                <div class="sub-title">PRJ-JTRWF-SCHULER • JTRWF KHORDHA</div>
              </div>
            </div>
          </div>
          <!-- Gate Access Status Ribbon -->
          <div style="background: #102D35; color: #FFFFFF; font-size: 8.5px; font-weight: 800; padding: 2px 0; letter-spacing: 0.5px; display: flex; justify-content: space-around; border-bottom: 1px solid #1E2D36;">
            <span>GATE 1 &amp; 2 ACCESS</span>
            <span style="color: #10B981;">● IN / OUT AUTHORISED</span>
            <span>MUSTER READY</span>
          </div>
          <div class="id-card-tagline" id="idCardTagline">
            SITE ACCESS &amp; RIGGING IDENTITY BADGE
          </div>

          <!-- Body -->
          <div class="id-card-body">
            <!-- Photo -->
            <div class="id-photo-box">
              <img id="idCardPhoto" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&amp;fit=crop&amp;w=200&amp;q=80" alt="Worker Photo">
              <div class="verified-ribbon">VERIFIED ✓</div>
            </div>

            <!-- Name and ID -->
            <div class="id-card-name" id="idCardName">RAMESH KUMAR</div>
            <div class="id-card-empid" id="idCardEmpId">EMP-2026-0001</div>
            <div class="id-card-trade" id="idCardTrade">RIGGER LEAD</div>

            <!-- Metadata Grid -->
            <div class="id-card-meta-grid">
              <div>
                <div class="item-lbl">Department</div>
                <div class="item-val" id="idCardDept">Heavy Lift &amp; Rigging</div>
              </div>
              <div>
                <div class="item-lbl">Blood Group</div>
                <div class="item-val" style="color: #E64646;" id="idCardBlood">🩸 B+ (Positive)</div>
              </div>
              <div>
                <div class="item-lbl">Wage Category</div>
                <div class="item-val" id="idCardCategory">Monthly Salaried Staff</div>
              </div>
              <div>
                <div class="item-lbl">Emergency No</div>
                <div class="item-val" id="idCardEmergency">+91 98610 99881</div>
              </div>
              <div>
                <div class="item-lbl">Project Worksite</div>
                <div class="item-val">PRJ-JTRWF-SCHULER</div>
              </div>
              <div>
                <div class="item-lbl">Validity</div>
                <div class="item-val" style="color: #0097B2;">31-DEC-2026</div>
              </div>
            </div>

            <!-- Footer: QR & Authorized Signatory -->
            <div class="id-card-footer">
              <div class="id-qr-box">
                <svg width="42" height="42" viewBox="0 0 29 29" shape-rendering="crispEdges">
                  <path fill="#102D35" d="M0,0 h7 v7 h-7 z M1,1 h5 v5 h-5 z M2,2 h3 v3 h-3 z M8,0 h2 v1 h-2 z M11,0 h1 v1 h-1 z M13,0 h2 v2 h-2 z M16,0 h1 v2 h-1 z M18,0 h1 v1 h-1 z M22,0 h7 v7 h-7 z M23,1 h5 v5 h-5 z M24,2 h3 v3 h-3 z M8,2 h2 v2 h-2 z M11,2 h1 v1 h-1 z M18,2 h1 v1 h-1 z M19,2 h1 v2 h-1 z M8,4 h1 v2 h-1 z M10,4 h2 v1 h-2 z M13,4 h2 v2 h-2 z M16,4 h1 v1 h-1 z M18,4 h1 v1 h-1 z M20,4 h1 v1 h-1 z M0,8 h1 v1 h-1 z M2,8 h2 v1 h-2 z M5,8 h1 v1 h-1 z M8,8 h2 v1 h-2 z M11,8 h3 v1 h-3 z M16,8 h1 v2 h-1 z M18,8 h2 v2 h-2 z M22,8 h1 v1 h-1 z M24,8 h2 v1 h-2 z M27,8 h2 v1 h-2 z M0,10 h1 v2 h-1 z M2,10 h1 v1 h-1 z M4,10 h1 v1 h-1 z M7,10 h2 v1 h-2 z M10,10 h1 v1 h-1 z M12,10 h1 v1 h-1 z M14,10 h1 v2 h-1 z M21,10 h2 v1 h-2 z M24,10 h1 v1 h-1 z M26,10 h3 v1 h-3 z M1,12 h2 v1 h-2 z M4,12 h3 v1 h-3 z M8,12 h1 v2 h-1 z M10,12 h1 v1 h-1 z M12,12 h1 v1 h-1 z M16,12 h2 v1 h-2 z M19,12 h2 v1 h-2 z M22,12 h1 v1 h-1 z M24,12 h2 v1 h-2 z M27,12 h1 v1 h-1 z M0,14 h1 v1 h-1 z M2,14 h1 v1 h-1 z M4,14 h1 v1 h-1 z M6,14 h1 v1 h-1 z M11,14 h2 v1 h-2 z M15,14 h1 v1 h-1 z M17,14 h1 v1 h-1 z M20,14 h1 v1 h-1 z M23,14 h1 v2 h-1 z M26,14 h1 v1 h-1 z M28,14 h1 v1 h-1 z M0,16 h2 v2 h-2 z M3,16 h1 v1 h-1 z M5,16 h2 v1 h-2 z M8,16 h2 v1 h-2 z M11,16 h1 v2 h-1 z M13,16 h2 v1 h-2 z M16,16 h1 v1 h-1 z M18,16 h2 v1 h-2 z M21,16 h1 v1 h-1 z M25,16 h1 v1 h-1 z M27,16 h2 v1 h-2 z M2,18 h2 v1 h-2 z M5,18 h1 v1 h-1 z M7,18 h1 v2 h-1 z M9,18 h2 v1 h-2 z M14,18 h2 v1 h-2 z M17,18 h1 v1 h-1 z M19,18 h1 v1 h-1 z M22,18 h2 v1 h-2 z M25,18 h1 v1 h-1 z M28,18 h1 v1 h-1 z M0,22 h7 v7 h-7 z M1,23 h5 v5 h-5 z M2,24 h3 v3 h-3 z M8,22 h1 v1 h-1 z M10,22 h1 v1 h-1 z M12,22 h2 v2 h-2 z M15,22 h1 v1 h-1 z M17,22 h1 v1 h-1 z M19,22 h1 v1 h-1 z M21,22 h1 v1 h-1 z M24,22 h1 v1 h-1 z M26,22 h2 v1 h-2 z M8,24 h2 v1 h-2 z M11,24 h1 v1 h-1 z M16,24 h1 v1 h-1 z M18,24 h2 v1 h-2 z M21,24 h1 v1 h-1 z M23,24 h1 v1 h-1 z M25,24 h1 v1 h-1 z M27,24 h2 v1 h-2 z M8,26 h1 v2 h-1 z M10,26 h2 v1 h-2 z M13,26 h1 v1 h-1 z M15,26 h3 v1 h-3 z M19,26 h1 v1 h-1 z M21,26 h1 v1 h-1 z M23,26 h2 v1 h-2 z M26,26 h1 v1 h-1 z M28,26 h1 v1 h-1 z"/>
                </svg>
              </div>
              <div class="id-sign-box">
                <div style="font-weight: 700; color: #102D35;">BALSONS HEAVY LIFT</div>
                <div class="sig-line">AUTHORISED SIGNATORY</div>
              </div>
            </div>
          </div>
        </div>

        <!-- BACK FACE OF ID BADGE -->
        <div class="id-card-badge" id="idCardBackFace">
          <!-- Lanyard slot -->
          <div class="punch-slot"></div>
          
          <!-- Card Header -->
          <div class="id-card-header" style="padding: 8px 12px;">
            <div style="font-size: 11px; font-weight: 900; letter-spacing: 0.3px;">SITE ACCESS &amp; EMERGENCY INSTRUCTIONS</div>
            <div style="font-size: 8.5px; color: #94A3B8;">BALSONS HEAVY LIFT &amp; SHIFT • PRJ-JTRWF-SCHULER</div>
          </div>

          <div class="id-card-back-body">
            <!-- Section: Emergency Site Hotlines -->
            <div class="id-back-section">
              <div class="id-back-title">🚨 Site Emergency Hotlines</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 9px;">
                <div><strong>Site Safety Officer:</strong> <span style="font-family: monospace;">+91 9527399199</span></div>
                <div><strong>JTRWF Main Gate:</strong> <span style="font-family: monospace;">+91 9860099326</span></div>
                <div><strong>Site HR Desk:</strong> <span style="font-family: monospace;">+91 9437144520</span></div>
                <div><strong>First Aid Dispensary:</strong> Bay-3 Station</div>
              </div>
            </div>

            <!-- Section: Verified HSE & Statutory Credentials -->
            <div class="id-back-section">
              <div class="id-back-title">🛡️ Verified Gate &amp; Safety Credentials</div>
              <div class="id-back-badge-row">
                <span class="id-clearance-pill">HSE Inducted ✓</span>
                <span class="id-clearance-pill">Height Certified ✓</span>
                <span class="id-clearance-pill">PPE Inspected ✓</span>
                <span class="id-clearance-pill">Medical Form 31 ✓</span>
                <span class="id-clearance-pill">Police Verified ✓</span>
              </div>
              <div style="margin-top: 6px; font-size: 9px; line-height: 1.4;">
                <div><strong>Aadhaar UID:</strong> <span style="font-family: monospace;" id="idBackAadhaar">XXXX-XXXX-8840</span> (Biometric Verified)</div>
                <div><strong>PAN Ref:</strong> <span style="font-family: monospace;" id="idBackPan">ABCDE1234F</span></div>
                <div><strong>Police Ref:</strong> <span style="font-family: monospace;" id="idBackPolice">POL-KHD-2026-9912</span></div>
              </div>
            </div>

            <!-- Section: Permanent Address -->
            <div class="id-back-section">
              <div class="id-back-title">🏠 Permanent Residence Address</div>
              <div style="font-size: 9px; line-height: 1.3; color: #475569;" id="idBackAddress">
                At/Po: Haldiapada, Khordha Tahasil, District Khordha, Odisha - 752056
              </div>
            </div>

            <!-- Section: Card Rules & Governance -->
            <div style="font-size: 8.5px; color: #64748B; line-height: 1.35; margin-top: auto; padding-top: 6px; border-top: 1px solid #E2E8F0;">
              <strong>Terms of Use:</strong> This pass is the exclusive property of BALSONS HEAVY LIFT &amp; SHIFT and must be visibly displayed at all times within the Jupiter Tatravagonka Railwheel Factory complex. Loss or damage must be reported immediately. If found, hand over to Site Security Gate 1.
              <div style="margin-top: 6px; text-align: center; font-size: 8px; color: #94A3B8;">
                Regd Off: Shop 4, Creative Paradise, Chinchwad, Pune - 411019 • www.balsonsheavylift.com
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- 3. Official Full Filled Employee Enrolment Dossier`;

if (oldIdCardModalRegex.test(html)) {
  html = html.replace(oldIdCardModalRegex, newIdCardModal);
  console.log('✅ Refined modalIdCard: fixed header, removed side scrolling, added preview sheet');
} else {
  console.warn('⚠️ Could not match oldIdCardModalRegex');
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. STATUTORY ENROLMENT DOSSIER MODAL (#modalPrintEnrolmentForm): Polish & Remove Side Scrolling
// ─────────────────────────────────────────────────────────────────────────────

const oldEnrolModalRegex = /<!-- 3\. Official Full Filled Employee Enrolment Dossier \/ Form Modal -->[\s\S]*?<div id="modalPrintEnrolmentForm" class="beds-modal-backdrop modal-backdrop"[\s\S]*?<div id="printableEnrolmentFormWrapper"[\s\S]*?<div id="printableEnrolmentDossier"/;

const newEnrolModalTop = `<!-- 3. Official Full Filled Employee Enrolment Dossier / Form Modal -->
  <div id="modalPrintEnrolmentForm" class="beds-modal-backdrop modal-backdrop" style="display: none;">
    <div class="beds-modal modal-box" style="width: 920px; max-width: 96vw; max-height: 94vh; overflow-y: auto; overflow-x: hidden; padding: 24px; box-sizing: border-box; background: #FFFFFF; border-radius: var(--beds-radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
      
      <!-- Modal Toolbar -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--beds-teal-primary); padding-bottom: 14px; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 320px;">
          <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" alt="BALSONS" style="height: 36px; flex-shrink: 0;">
          <div>
            <div class="modal-title" style="font-size: 16.5px; font-weight: 800; color: var(--beds-charcoal-heading); margin-bottom: 2px;">📄 BALSONS Employee Master Enrolment &amp; Compliance Dossier</div>
            <div style="font-size: 11px; color: var(--beds-text-secondary);">
              Statutory Site Enrolment Form • Jupiter Tatravagonka Railwheel Factory (PRJ-JTRWF-SCHULER)
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary btn-sm" id="btnToggleEnrolPreview" onclick="toggleEnrolmentPrintPreview()" style="display: inline-flex; align-items: center; gap: 5px; font-weight: 700;">
            👁️ Print Preview
          </button>
          <button type="button" class="btn btn-primary btn-sm" onclick="printEnrolmentForm()" style="background: var(--beds-teal-primary); font-weight: 800; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 6px rgba(0,151,178,0.25);">
            🖨️ Print Full Enrolment Form (A4)
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="exportEnrolmentToDrive()" style="border-color: var(--beds-teal-primary); color: var(--beds-teal-primary); font-weight: 700;">
            ☁️ Upload Dossier to Drive
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeEnrolmentFormModal()" style="font-weight: 800; font-size: 14px; padding: 4px 10px;">✖</button>
        </div>
      </div>

      <!-- Employee Switcher -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--beds-bg-page); border: 1px solid var(--beds-border); padding: 10px 16px; border-radius: var(--beds-radius-md); margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--beds-charcoal-heading);">Select Personnel Dossier:</label>
          <select id="enrolEmpSelect" class="beds-select" style="min-width: 320px; font-size: 12px; padding: 5px 10px; height: 32px; border-radius: var(--beds-radius-md); background: #FFFFFF;" onchange="renderEnrolmentForm(this.value)">
            <!-- Populated dynamically -->
          </select>
        </div>
        <span class="status-pill status-success" style="font-size: 10.5px; font-weight: 800;">A4 CALIBRATED SINGLE-PAGE PRINT</span>
      </div>

      <!-- Printable A4 Form Container: Zero horizontal scroll -->
      <div id="printableEnrolmentFormWrapper" style="display: flex; justify-content: center; overflow-x: hidden; width: 100%; box-sizing: border-box;">
        
        <div id="printableEnrolmentDossier"`;

if (oldEnrolModalRegex.test(html)) {
  html = html.replace(oldEnrolModalRegex, newEnrolModalTop);
  console.log('✅ Refined modalPrintEnrolmentForm: removed side scrolling, added preview toggle');
} else {
  console.warn('⚠️ Could not match oldEnrolModalRegex');
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. UPDATE JAVASCRIPT PRINT & PREVIEW FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

// Add toggleIdCardPrintPreview and toggleEnrolmentPrintPreview + fix printGateIdCard and printEnrolmentForm
const jsPrintBlockRegex = /function printGateIdCard\(\) \{[\s\S]*?setTimeout\(\(\) => document\.body\.classList\.remove\('printing-idcard'\), 1000\);[\s\S]*?\}[\s\S]*?function printEnrolmentForm\(\) \{[\s\S]*?setTimeout\(\(\) => document\.body\.classList\.remove\('printing-enrolment'\), 1000\);[\s\S]*?\}/;

const newJsPrintBlock = `function toggleIdCardPrintPreview() {
      const sheet = document.getElementById('idCardPrintPreviewSheet');
      const btn = document.getElementById('btnToggleIdPreview');
      if (!sheet) return;
      if (sheet.style.display === 'none' || !sheet.style.display) {
        sheet.style.display = 'block';
        if (btn) btn.innerHTML = '✕ Close Preview';
        setIdCardViewMode('dual');
      } else {
        sheet.style.display = 'none';
        if (btn) btn.innerHTML = '👁️ Print Preview';
      }
    }

    function printGateIdCard() {
      setIdCardViewMode('dual');
      document.body.classList.remove('printing-enrolment', 'printing-payslip', 'printing-bulk-payslips');
      document.body.classList.add('printing-idcard');
      
      const onAfterPrint = () => {
        document.body.classList.remove('printing-idcard');
        window.removeEventListener('afterprint', onAfterPrint);
      };
      window.addEventListener('afterprint', onAfterPrint);
      
      window.print();
      setTimeout(() => document.body.classList.remove('printing-idcard'), 2500);
    }

    function toggleEnrolmentPrintPreview() {
      const btn = document.getElementById('btnToggleEnrolPreview');
      const wrapper = document.getElementById('printableEnrolmentFormWrapper');
      if (!wrapper) return;
      wrapper.classList.toggle('preview-active');
      if (wrapper.classList.contains('preview-active')) {
        wrapper.style.background = '#F1F5F9';
        wrapper.style.padding = '20px';
        wrapper.style.borderRadius = '8px';
        wrapper.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.1)';
        if (btn) btn.innerHTML = '✕ Close Preview';
      } else {
        wrapper.style.background = '';
        wrapper.style.padding = '';
        wrapper.style.borderRadius = '';
        wrapper.style.boxShadow = '';
        if (btn) btn.innerHTML = '👁️ Print Preview';
      }
    }

    function printEnrolmentForm() {
      document.body.classList.remove('printing-idcard', 'printing-payslip', 'printing-bulk-payslips');
      document.body.classList.add('printing-enrolment');
      
      const onAfterPrint = () => {
        document.body.classList.remove('printing-enrolment');
        window.removeEventListener('afterprint', onAfterPrint);
      };
      window.addEventListener('afterprint', onAfterPrint);
      
      window.print();
      setTimeout(() => document.body.classList.remove('printing-enrolment'), 2500);
    }`;

if (jsPrintBlockRegex.test(html)) {
  html = html.replace(jsPrintBlockRegex, newJsPrintBlock);
  console.log('✅ Updated primary JS print and preview handlers');
} else {
  console.warn('⚠️ Could not match jsPrintBlockRegex');
}

// Remove the duplicate overriding printGateIdCard / printEnrolmentForm at the bottom
const duplicatePrintRegex = /function printEnrolmentForm\(\) \{\s*window\.print\(\);\s*\}\s*function printGateIdCard\(\) \{\s*setIdCardViewMode\('dual'\);\s*window\.print\(\);\s*\}/;

if (duplicatePrintRegex.test(html)) {
  html = html.replace(duplicatePrintRegex, '// Handled by unified printGateIdCard & printEnrolmentForm above');
  console.log('✅ Removed duplicate bottom print overrides');
} else {
  console.warn('⚠️ Could not match duplicatePrintRegex');
}

// Write to BALSONS HR MANAGER
fs.writeFileSync(hrPath, html, 'utf8');
console.log('✅ Successfully written to', hrPath);

// Mirror to Launcher
fs.writeFileSync(launcherPath, html, 'utf8');
console.log('✅ Successfully mirrored to', launcherPath);
