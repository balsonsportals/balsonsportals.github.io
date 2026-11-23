/**
 * BALSONS ENTERPRISE HR & PAYROLL MANAGER - HIGH-LEVEL QR CODE STUDIO
 * Production-Grade Dynamic QR Generator for Workforce ID Cards, Security Passes & Muster Badges
 * Standard: ISO/IEC 18004 & BEDS V1.1 Unified Enterprise Specification
 */

(function(window) {
  'use strict';

  const BalsonsQrStudio = {
    selectedEmpId: 'EMP-2026-0001',
    mode: 'VERIFICATION_URL', // SECURITY_PASS | VERIFICATION_URL | VCARD | MUSTER_TOKEN | CUSTOM_TEXT
    fgColor: '#102D35',
    bgColor: '#FFFFFF',
    correctLevel: 2, // 0: L (7%), 1: M (15%), 2: Q (25%), 3: H (30%)
    size: 280,
    includeLogo: true,
    customPayload: '',

    // Enterprise Color Palettes
    swatches: [
      { name: 'Corporate Teal', hex: '#102D35' },
      { name: 'Balsons Cyan', hex: '#0097B2' },
      { name: 'Safety Red', hex: '#E64646' },
      { name: 'Industrial Black', hex: '#000000' },
      { name: 'Amber Gold', hex: '#D97706' },
      { name: 'Emerald Pass', hex: '#059669' }
    ],

    getEmployeeList: function() {
      if (typeof window.employeesData !== 'undefined' && Array.isArray(window.employeesData) && window.employeesData.length > 0) {
        return window.employeesData;
      }
      if (typeof employeesData !== 'undefined' && Array.isArray(employeesData) && employeesData.length > 0) {
        return employeesData;
      }
      return [
        { empId: 'EMP-2026-0001', name: 'Ramesh Kumar', trade: 'Rigger Lead', dept: 'Heavy Lift & Rigging Operations', bloodGroup: 'B+', emergency: '+91 98610 99881', wageType: 'MONTHLY', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', mobile: '+91 98610 88721', aadhaar: '4928 1192 8840', pan: 'ABCDE1234F', police: 'POL-KHD-2026-9912', address: 'At/Po: Haldiapada, Khordha Tahasil, District Khordha, Odisha - 752056' },
        { empId: 'EMP-2026-0002', name: 'Sunil Swain', trade: 'Hydraulic Tech', dept: 'Hydraulic & Heavy Erection', bloodGroup: 'O+', emergency: '+91 94371 44520', wageType: 'MONTHLY', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', mobile: '+91 94371 88320', aadhaar: '5821 9912 3341', pan: 'BCDEF2345G', police: 'POL-KHD-2026-9913', address: 'Plot 42, Gantry Colony, Paradeep Port, Jagatsinghpur, Odisha - 754142' },
        { empId: 'EMP-2026-0003', name: 'Ajay Verma', trade: 'Heavy Lift Specialist', dept: 'Heavy Rigging Operations', bloodGroup: 'A+', emergency: '+91 98612 33410', wageType: 'DAILY_PAY', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80', mobile: '+91 98612 11924', aadhaar: '6912 4410 7729', pan: 'CDEFG3456H', police: 'POL-KHD-2026-9914', address: 'Village Badapokharia, Khordha District, Odisha - 752057' },
        { empId: 'EMP-2026-0004', name: 'Dharmendra Pradhan', trade: 'Crane Specialist', dept: 'Crane Operations', bloodGroup: 'B+', emergency: '+91 98614 77219', wageType: 'DAILY_PAY', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', mobile: '+91 98614 55102', aadhaar: '7729 8810 5519', pan: 'DEFGH4567I', police: 'POL-KHD-2026-9915', address: 'Site Camp Quarter C-12, JTRWF Khordha, Odisha - 752056' },
        { empId: 'EMP-2026-0005', name: 'Bikash Jena', trade: 'Rigging Helper', dept: 'Site Logistics', bloodGroup: 'AB+', emergency: '+91 98619 11024', wageType: 'DAILY_PAY', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', mobile: '+91 98619 44321', aadhaar: '8810 2231 6640', pan: 'EFGHI5678J', police: 'POL-KHD-2026-9916', address: 'At/Po: Nirakarpur, Tangi Block, District Khordha, Odisha - 752019' }
      ];
    },

    getEmployee: function(empId) {
      const id = empId || this.selectedEmpId;
      const list = this.getEmployeeList();
      return list.find(x => x.empId === id) || list[0];
    },

    init: function() {
      this.populateEmployeeDropdown();
      this.syncPayloadWithSelection();
      this.renderQrCode();
    },

    populateEmployeeDropdown: function() {
      const select = document.getElementById('qrEmpSelect');
      if (!select) return;

      const list = this.getEmployeeList();
      select.innerHTML = list.map(e => `
        <option value="${e.empId}" ${e.empId === this.selectedEmpId ? 'selected' : ''}>
          ${e.empId} • ${e.name} (${e.trade || 'Worker'})
        </option>
      `).join('');
    },

    onEmployeeChange: function(empId) {
      this.selectedEmpId = empId;
      this.syncPayloadWithSelection();
      this.renderQrCode();
    },

    setMode: function(mode) {
      this.mode = mode;
      document.querySelectorAll('.qr-mode-pill').forEach(btn => {
        if (btn.getAttribute('data-mode') === mode) {
          btn.classList.add('active');
          btn.style.background = '#0097B2';
          btn.style.color = '#FFFFFF';
        } else {
          btn.classList.remove('active');
          btn.style.background = 'var(--beds-bg-page, #F8FAFC)';
          btn.style.color = 'var(--beds-charcoal-heading, #102D35)';
        }
      });
      this.syncPayloadWithSelection();
      this.renderQrCode();
    },

    generatePayload: function() {
      const e = this.getEmployee();

      if (this.mode === 'SECURITY_PASS') {
        // High-security gate entry verification format
        const em = e.emergency ? e.emergency.split('-').pop().trim() : '+91 98610 99881';
        return `BALSONS:GATE:PASS|ID=${e.empId}|NAME=${e.name}|TRADE=${e.trade || 'Worker'}|DEPT=${e.dept || 'Operations'}|BLOOD=${e.bloodGroup || 'B+'}|EMERGENCY=${em}|VALID=2026-12-31|GATE=AUTH-1-2|MUSTER=READY`;
      } 
      else if (this.mode === 'VERIFICATION_URL') {
        return `https://balsonsportals.github.io/verify.html?empId=${encodeURIComponent(e.empId)}`;
      } 
      else if (this.mode === 'VCARD') {
        const em = e.emergency ? e.emergency.split('-').pop().trim() : '+91 98610 99881';
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${e.name}`,
          'ORG:BALSONS HEAVY LIFT & SHIFT',
          `TITLE:${e.trade || 'Worker'} - PRJ-JTRWF-SCHULER`,
          `TEL;TYPE=WORK,VOICE:${e.mobile || '+91 98610 88721'}`,
          `TEL;TYPE=EMERGENCY,VOICE:${em}`,
          `NOTE:Emp ID: ${e.empId} | Blood Group: ${e.bloodGroup || 'B+'} | Medical Form 31: Certified | Police Clearance: Recorded`,
          'URL:https://balsonsportals.github.io',
          'END:VCARD'
        ].join('\n');
      } 
      else if (this.mode === 'MUSTER_TOKEN') {
        return `MUSTER:BHLS-JTRWF:${e.empId}:${new Date().toISOString().slice(0, 10).replace(/-/g, '')}:BIO-AUTH-VERIFIED`;
      } 
      else {
        return this.customPayload || `BALSONS HEAVY LIFT & SHIFT • ${e.empId} • ${e.name}`;
      }
    },

    syncPayloadWithSelection: function() {
      const payload = this.generatePayload();
      const ta = document.getElementById('qrPayloadText');
      if (ta) ta.value = payload;
      this.updatePayloadStats(payload);
    },

    updatePayloadStats: function(payload) {
      const statEl = document.getElementById('qrPayloadStats');
      if (statEl) {
        statEl.innerHTML = `
          <span>Length: <strong>${payload.length} chars</strong></span> • 
          <span>Encoding: <strong>UTF-8 Byte</strong></span> • 
          <span>Type: <strong>${this.mode.replace('_', ' ')}</strong></span>
        `;
      }
    },

    onPayloadInput: function(val) {
      this.customPayload = val;
      this.updatePayloadStats(val);
      this.renderQrCode();
    },

    setColor: function(color) {
      this.fgColor = color;
      const input = document.getElementById('qrColorCustom');
      if (input) input.value = color;
      this.renderQrCode();
    },

    setSize: function(size) {
      this.size = parseInt(size, 10) || 280;
      const lbl = document.getElementById('qrSizeLabel');
      if (lbl) lbl.textContent = `${this.size} × ${this.size} px`;
      this.renderQrCode();
    },

    setCorrectLevel: function(level) {
      this.correctLevel = parseInt(level, 10);
      this.renderQrCode();
    },

    toggleLogo: function(checked) {
      this.includeLogo = Boolean(checked);
      this.renderQrCode();
    },

    renderQrCode: function() {
      const container = document.getElementById('qrCodeCanvasTarget');
      if (!container) return;

      const payload = (document.getElementById('qrPayloadText') && document.getElementById('qrPayloadText').value)
        ? document.getElementById('qrPayloadText').value
        : this.generatePayload();

      container.innerHTML = '';

      // Check if QRCode is available from assets/js/qrcode.min.js
      if (typeof window.QRCode === 'function') {
        try {
          const qrWrapper = document.createElement('div');
          qrWrapper.id = 'balsonsQrTempDiv';
          container.appendChild(qrWrapper);

          const qrlib = new window.QRCode(qrWrapper, {
            text: payload,
            width: this.size,
            height: this.size,
            colorDark: this.fgColor,
            colorLight: this.bgColor,
            correctLevel: this.correctLevel
          });

          // Embed Logo Overlay onto Canvas after generation
          setTimeout(() => {
            const canvas = qrWrapper.querySelector('canvas');
            if (canvas && this.includeLogo) {
              const ctx = canvas.getContext('2d');
              const logoSize = Math.round(this.size * 0.22);
              const logoX = Math.round((this.size - logoSize) / 2);
              const logoY = Math.round((this.size - logoSize) / 2);

              // Circular protective white background with subtle shadow
              ctx.save();
              ctx.beginPath();
              ctx.arc(this.size / 2, this.size / 2, (logoSize / 2) + 4, 0, Math.PI * 2);
              ctx.fillStyle = '#FFFFFF';
              ctx.fill();
              ctx.lineWidth = 2;
              ctx.strokeStyle = this.fgColor;
              ctx.stroke();

              // Draw Balsons corporate emblem in center
              ctx.beginPath();
              ctx.arc(this.size / 2, this.size / 2, logoSize / 2, 0, Math.PI * 2);
              ctx.fillStyle = this.fgColor;
              ctx.fill();

              // Clean "B" symbol monogram
              ctx.fillStyle = '#FFFFFF';
              ctx.font = `bold ${Math.round(logoSize * 0.65)}px Arial, sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('B', this.size / 2, this.size / 2 + 1);
              ctx.restore();
            }
          }, 60);

        } catch (err) {
          console.warn('[QrStudio] Local QRCode engine error:', err);
          this.renderFallbackQr(container, payload);
        }
      } else {
        this.renderFallbackQr(container, payload);
      }
    },

    renderFallbackQr: function(container, payload) {
      // High-resolution fallback generator
      const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${this.size}x${this.size}&color=${this.fgColor.replace('#', '')}&bgcolor=${this.bgColor.replace('#', '')}&data=${encodeURIComponent(payload)}`;
      container.innerHTML = `
        <img src="${qrDataUrl}" alt="QR Code" style="width: ${this.size}px; height: ${this.size}px; border-radius: 6px; box-shadow: 0 4px 12px rgba(16, 45, 53, 0.12);" onerror="this.src='assets/images/balsons-logo.png'">
      `;
    },

    // ─── ACTION 1: APPLY TO EMPLOYEE ID CARD PASS ───
    applyToIdCard: function() {
      const container = document.getElementById('qrCodeCanvasTarget');
      const canvas = container ? container.querySelector('canvas') : null;
      let qrDataUrl = '';

      if (canvas) {
        qrDataUrl = canvas.toDataURL('image/png');
      } else {
        const img = container ? container.querySelector('img') : null;
        if (img) qrDataUrl = img.src;
      }

      if (!qrDataUrl) {
        alert('Please wait for the QR code to finish rendering.');
        return;
      }

      const e = this.getEmployee();
      e.customQrDataUrl = qrDataUrl;

      // Update in employeesData if window.employeesData exists
      if (window.employeesData) {
        const found = window.employeesData.find(x => x.empId === e.empId);
        if (found) found.customQrDataUrl = qrDataUrl;
      }
      if (typeof employeesData !== 'undefined') {
        const found = employeesData.find(x => x.empId === e.empId);
        if (found) found.customQrDataUrl = qrDataUrl;
      }

      // Also persist to localStorage for continuous sessions
      try {
        const saved = JSON.parse(localStorage.getItem('BALSONS_HR_CUSTOM_QRS') || '{}');
        saved[e.empId] = qrDataUrl;
        localStorage.setItem('BALSONS_HR_CUSTOM_QRS', JSON.stringify(saved));
      } catch (err) {}

      // Update screen ID Card if modal is open
      const idCardQrImg = document.getElementById('idCardQrImage');
      if (idCardQrImg) idCardQrImg.src = qrDataUrl;
      const idCardBackQr = document.getElementById('idCardBackQrImg');
      if (idCardBackQr) idCardBackQr.src = qrDataUrl;

      // Show toast confirmation
      this.showToast(`✔ QR Code successfully linked to ${e.name} (${e.empId}) ID Pass!`);
    },

    // ─── ACTION 2: PRINT CALIBRATED CR80 ID CARD WITH THIS QR ───
    printCalibratedIdCard: function() {
      this.applyToIdCard();
      if (typeof window.printGateIdCard === 'function') {
        window.printGateIdCard(this.selectedEmpId);
      } else {
        window.print();
      }
    },

    // ─── ACTION 3: DOWNLOAD HIGH-RESOLUTION PNG ───
    downloadPng: function() {
      const container = document.getElementById('qrCodeCanvasTarget');
      const canvas = container ? container.querySelector('canvas') : null;
      const e = this.getEmployee();
      const fileName = `BALSONS_QR_${e.empId}_${e.name.replace(/\s+/g, '_').toUpperCase()}.png`;

      if (canvas) {
        const a = document.createElement('a');
        a.download = fileName;
        a.href = canvas.toDataURL('image/png');
        a.click();
      } else {
        const img = container ? container.querySelector('img') : null;
        if (img) {
          const a = document.createElement('a');
          a.download = fileName;
          a.href = img.src;
          a.target = '_blank';
          a.click();
        }
      }
    },

    // ─── ACTION 4: DOWNLOAD VECTOR SVG ───
    downloadSvg: function() {
      const e = this.getEmployee();
      const payload = document.getElementById('qrPayloadText') ? document.getElementById('qrPayloadText').value : this.generatePayload();
      const fileName = `BALSONS_QR_${e.empId}_VECTOR.svg`;

      const svgContent = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${this.size}" height="${this.size}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <desc>BALSONS Heavy Lift &amp; Shift - Workforce Security QR Code - ${e.empId} - ${e.name}</desc>
  <rect width="100%" height="100%" fill="${this.bgColor}"/>
  <image href="${document.querySelector('#qrCodeCanvasTarget canvas') ? document.querySelector('#qrCodeCanvasTarget canvas').toDataURL('image/png') : ''}" width="${this.size}" height="${this.size}"/>
</svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = fileName;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    },

    // ─── ACTION 5: BULK PRINT WORKFORCE QR PASS SHEET (ALL EMPLOYEES) ───
    printBulkQrSheet: function() {
      const list = this.getEmployeeList();

      const stage = (typeof window.getBedsPrintStage === 'function')
        ? window.getBedsPrintStage()
        : document.createElement('div');

      let cardsHtml = '';
      list.forEach(emp => {
        const em = emp.emergency ? emp.emergency.split('-').pop().trim() : '+91 98610 99881';
        let qrUrl = '';
        if (typeof window.getEmployeeQrDataUrl === 'function') {
          qrUrl = window.getEmployeeQrDataUrl(emp.empId, 180);
        } else {
          const pl = `https://balsonsportals.github.io/verify.html?empId=${encodeURIComponent(emp.empId)}`;
          qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=102D35&data=${encodeURIComponent(pl)}`;
        }

        cardsHtml += `
          <div style="border: 1.5px solid #102D35; border-radius: 4px; padding: 3mm 4mm; background: #FFFFFF; display: flex; align-items: center; gap: 3.5mm; box-sizing: border-box; page-break-inside: avoid;">
            <img src="${qrUrl}" alt="QR" style="width: 22mm; height: 22mm; border: 1px solid #CBD5E1; border-radius: 2px; object-fit: contain;">
            <div style="flex: 1; font-size: 7.5pt; line-height: 1.25; color: #102D35;">
              <div style="font-size: 8pt; font-weight: 900; color: #0097B2;">BALSONS HEAVY LIFT</div>
              <div style="font-size: 9pt; font-weight: 900; text-transform: uppercase;">${emp.name}</div>
              <div style="font-family: monospace; font-weight: 800; color: #102D35;">${emp.empId} • ${emp.trade || 'Worker'}</div>
              <div style="color: #64748B; font-size: 6.8pt; margin-top: 1mm;">
                Blood: <strong style="color: #DC2626;">${emp.bloodGroup || 'B+'}</strong> • Em: <strong>${em}</strong>
              </div>
              <div style="color: #059669; font-weight: 800; font-size: 6.5pt; margin-top: 0.5mm;">● GATE 1 &amp; 2 AUTHORIZED</div>
            </div>
          </div>
        `;
      });

      stage.innerHTML = `
        <div class="beds-print-a4-sheet" style="width: 194mm; max-width: 194mm; height: 278mm; padding: 6mm 8mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background: #FFFFFF; border: 1.5px solid #102D35; border-radius: 4px;">
          <!-- Corporate Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0097B2; padding-bottom: 3mm; margin-bottom: 4mm;">
            <div>
              <div style="font-size: 14pt; font-weight: 900; color: #102D35;">BALSONS HEAVY LIFT &amp; SHIFT</div>
              <div style="font-size: 9pt; font-weight: 800; color: #0097B2;">WORKFORCE GATE ENTRY &amp; BIOMETRIC QR CODE STICKER DIRECTORY</div>
              <div style="font-size: 8pt; color: #64748B;">Project: PRJ-JTRWF-SCHULER • Site: Jupiter Tatravagonka Railwheel Factory, Khordha</div>
            </div>
            <div style="text-align: right;">
              <div style="background: #102D35; color: #FFFFFF; padding: 2px 8px; font-size: 8.5pt; font-weight: 800; border-radius: 3px;">MUSTER VERIFIED</div>
              <div style="font-size: 8pt; color: #64748B; margin-top: 1mm;">Period: NOV 2026</div>
            </div>
          </div>

          <!-- Cards Grid (2 Columns) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; flex: 1;">
            ${cardsHtml}
          </div>

          <!-- Footer -->
          <div style="border-top: 1.5px solid #102D35; padding-top: 2mm; margin-top: 4mm; display: flex; justify-content: space-between; align-items: center; font-size: 8pt; font-weight: 700; color: #102D35;">
            <div>Page | 1 of 1</div>
            <div style="font-family: 'Brush Script MT', cursive; font-size: 13pt; color: #00769E; font-style: italic;">Difficult we do easily impossible takes little time…!</div>
            <div style="font-size: 7.5pt; color: #64748B;">Official Security QR Badge Directory • PRJ-JTRWF-SCHULER</div>
          </div>
        </div>
      `;

      if (typeof window.setupPrintCleanup === 'function') {
        window.setupPrintCleanup(stage);
      }
      window.print();
    },

    showToast: function(msg) {
      const toast = document.createElement('div');
      toast.style.cssText = 'position: fixed; bottom: 24px; right: 24px; background: #102D35; color: #FFFFFF; border-left: 4px solid #10B981; padding: 12px 20px; border-radius: 6px; font-weight: 700; font-size: 13px; box-shadow: 0 6px 20px rgba(0,0,0,0.25); z-index: 99999; animation: fadeIn 0.2s ease;';
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }
  };

  window.BalsonsQrStudio = BalsonsQrStudio;

})(window);
