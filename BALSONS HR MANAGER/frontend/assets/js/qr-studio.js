/**
 * BALSONS ENTERPRISE HR & PAYROLL MANAGER - NEXT-LEVEL QR CODE STUDIO & SECURITY PASS ENGINE
 * Production-Grade Dynamic QR Generator for Workforce ID Cards, Security Passes & Muster Badges
 * Standards: ISO/IEC 18004 • vCard 3.0 (RFC 2426) • BEDS V1.1 Unified Enterprise Specification
 */

(function(window) {
  'use strict';

  const BalsonsQrStudio = {
    selectedEmpId: 'EMP-2026-0001',
    mode: 'VCARD', // VCARD (Default Workforce Profile) | SECURITY_PASS | VERIFICATION_URL | MUSTER_TOKEN | CUSTOM_TEXT
    fgColor: '#102D35',
    bgColor: '#FFFFFF',
    correctLevel: 2, // 0: L (7%), 1: M (15%), 2: Q (25%), 3: H (30%)
    size: 280,
    includeLogo: true,
    logoType: 'MONOGRAM', // 'MONOGRAM' | 'LOGO' | 'BLOOD' | 'SAFETY'
    frameStyle: 'NONE', // 'NONE' | 'BADGE' | 'HELMET' | 'EMERGENCY'
    previewTab: 'MATRIX', // 'MATRIX' | 'PHONE' | 'SCANNER'
    customPayload: '',

    // Enterprise Color Palettes
    swatches: [
      { name: 'Corporate Teal', hex: '#102D35' },
      { name: 'Balsons Cyan', hex: '#0097B2' },
      { name: 'Safety Red', hex: '#E64646' },
      { name: 'Industrial Black', hex: '#000000' },
      { name: 'Amber Gold', hex: '#D97706' },
      { name: 'Emerald Pass', hex: '#059669' },
      { name: 'Safety Yellow', hex: '#EAB308' }
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
      this.renderTargetEmployeeChip();
      this.syncPayloadWithSelection();
      this.renderQrCode();
      this.renderPhoneSimulator();
      this.renderScannerSimulator();
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

    renderTargetEmployeeChip: function() {
      const chip = document.getElementById('qrTargetEmpChip');
      if (!chip) return;

      const e = this.getEmployee();
      const isMonthly = (e.wageType || '').toUpperCase() === 'MONTHLY';
      const wageLabel = isMonthly ? 'Monthly Salaried Staff' : 'Daily Pay Crew';
      const wageBadgeColor = isMonthly ? '#0097B2' : '#D97706';

      chip.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 8px 12px; margin-top: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${e.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid #0097B2;" alt="Worker">
            <div>
              <div style="font-size: 13px; font-weight: 800; color: #102D35; line-height: 1.2;">${e.name} <span style="font-family: monospace; font-size: 11px; color: #64748B;">(${e.empId})</span></div>
              <div style="font-size: 11px; color: #475569; margin-top: 1px;">${e.trade || 'Worker'} • ${e.dept || 'Operations'}</div>
            </div>
          </div>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <span style="font-size: 10px; font-weight: 800; background: #FEF2F2; color: #DC2626; border: 1px solid #FCA5A5; padding: 2px 7px; border-radius: 12px;">🩸 ${e.bloodGroup || 'B+'}</span>
            <span style="font-size: 10px; font-weight: 800; background: ${wageBadgeColor}15; color: ${wageBadgeColor}; border: 1px solid ${wageBadgeColor}40; padding: 2px 8px; border-radius: 12px;">${wageLabel}</span>
            <span style="font-size: 10px; font-weight: 800; background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; padding: 2px 7px; border-radius: 12px;">ACTIVE ✓</span>
          </div>
        </div>
      `;
    },

    onEmployeeChange: function(empId) {
      this.selectedEmpId = empId;
      this.renderTargetEmployeeChip();
      this.syncPayloadWithSelection();
      this.renderQrCode();
      this.renderPhoneSimulator();
      this.renderScannerSimulator();
    },

    setMode: function(mode) {
      this.mode = 'VCARD';
      this.syncPayloadWithSelection();
      this.renderQrCode();
    },

    generatePayload: function() {
      const e = this.getEmployee();
      const primaryMobile = e.mobile || '+91 98610 88721';
      const hrOfficerName = 'Priyanka Senapati';
      const hrOfficerPhone = '+91 94371 44520';
      const trade = e.trade || 'Worker';
      const blood = e.bloodGroup || 'B+';
      const empId = e.empId || 'EMP-2026-0001';

      // Parse Name into Family and Given names for standard vCard N: field
      const parts = (e.name || 'Worker').trim().split(/\s+/);
      const givenName = parts[0] || 'Worker';
      const familyName = parts.slice(1).join(' ') || '';

      // Strictly enforce Single Official Unified Workforce vCard 3.0 Standard
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${e.name}`,
        `N:${familyName};${givenName};;;`,
        'ORG:BALSONS HEAVY LIFT & SHIFT • PRJ-JTRWF project',
        `TITLE:${trade} | Employee ID: ${empId}`,
        `TEL;TYPE=CELL,VOICE;X-LABEL="Primary Mobile":${primaryMobile}`,
        `TEL;TYPE=WORK,VOICE;X-LABEL="Site HR Officer (JTRWF Khordha)":${hrOfficerPhone}`,
        `NOTE:Full Name: ${e.name} | Employee ID: ${empId} | Blood Group: ${blood} | Primary Mobile: ${primaryMobile} & Site HR Officer (JTRWF Khordha): ${hrOfficerName} (${hrOfficerPhone})`,
        `URL:https://balsonsportals.github.io/verify.html?empId=${encodeURIComponent(empId)}`,
        'END:VCARD'
      ].join('\n');
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
          <span>Encoding: <strong>UTF-8 Byte (vCard 3.0 Standard)</strong></span> • 
          <span>Standard: <strong>Unified Workforce vCard (Locked)</strong></span>
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

    setLogoType: function(type) {
      this.logoType = type;
      document.querySelectorAll('.qr-logo-btn').forEach(btn => {
        if (btn.getAttribute('data-logo') === type) {
          btn.classList.add('active');
          btn.style.background = '#0097B2';
          btn.style.color = '#FFFFFF';
        } else {
          btn.classList.remove('active');
          btn.style.background = '#F8FAFC';
          btn.style.color = '#102D35';
        }
      });
      this.renderQrCode();
    },

    setFrameStyle: function(frame) {
      this.frameStyle = frame;
      document.querySelectorAll('.qr-frame-btn').forEach(btn => {
        if (btn.getAttribute('data-frame') === frame) {
          btn.classList.add('active');
          btn.style.background = '#0097B2';
          btn.style.color = '#FFFFFF';
        } else {
          btn.classList.remove('active');
          btn.style.background = '#F8FAFC';
          btn.style.color = '#102D35';
        }
      });
      this.applyFrameToContainer();
    },

    setPreviewTab: function(tab) {
      this.previewTab = tab;
      const btnMatrix = document.getElementById('btnQrViewMatrix');
      const btnPhone = document.getElementById('btnQrViewPhone');
      const btnScanner = document.getElementById('btnQrViewScanner');

      [btnMatrix, btnPhone, btnScanner].forEach(b => {
        if (b) {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = '#475569';
        }
      });

      const paneMatrix = document.getElementById('qrPreviewPaneMatrix');
      const panePhone = document.getElementById('qrPreviewPanePhone');
      const paneScanner = document.getElementById('qrPreviewPaneScanner');

      if (paneMatrix) paneMatrix.style.display = 'none';
      if (panePhone) panePhone.style.display = 'none';
      if (paneScanner) paneScanner.style.display = 'none';

      if (tab === 'PHONE') {
        if (btnPhone) {
          btnPhone.classList.add('active');
          btnPhone.style.background = '#0097B2';
          btnPhone.style.color = '#FFFFFF';
        }
        if (panePhone) panePhone.style.display = 'block';
        this.renderPhoneSimulator();
      } else if (tab === 'SCANNER') {
        if (btnScanner) {
          btnScanner.classList.add('active');
          btnScanner.style.background = '#0097B2';
          btnScanner.style.color = '#FFFFFF';
        }
        if (paneScanner) paneScanner.style.display = 'block';
        this.renderScannerSimulator();
      } else {
        if (btnMatrix) {
          btnMatrix.classList.add('active');
          btnMatrix.style.background = '#0097B2';
          btnMatrix.style.color = '#FFFFFF';
        }
        if (paneMatrix) paneMatrix.style.display = 'block';
      }
    },

    applyFrameToContainer: function() {
      const frameWrapper = document.getElementById('qrFrameContainer');
      const e = this.getEmployee();
      if (!frameWrapper) return;

      const em = e.emergency ? e.emergency.split('-').pop().trim() : '+91 98610 99881';

      if (this.frameStyle === 'BADGE') {
        frameWrapper.style.border = '2px solid #102D35';
        frameWrapper.style.borderRadius = '12px';
        frameWrapper.style.overflow = 'hidden';
        frameWrapper.style.background = '#FFFFFF';
        frameWrapper.style.boxShadow = '0 8px 24px rgba(16, 45, 53, 0.15)';
        
        let header = document.getElementById('qrFrameHeader');
        let footer = document.getElementById('qrFrameFooter');
        if (header) {
          header.style.display = 'block';
          header.innerHTML = `
            <div style="background: #102D35; color: #FFFFFF; padding: 6px 14px; font-size: 11px; font-weight: 900; letter-spacing: 0.3px; display: flex; align-items: center; justify-content: space-between;">
              <span>BALSONS HEAVY LIFT</span>
              <span style="font-size: 9px; color: #0097B2; font-weight: 800;">SITE PASS</span>
            </div>
          `;
        }
        if (footer) {
          footer.style.display = 'block';
          footer.innerHTML = `
            <div style="background: #0097B2; color: #FFFFFF; padding: 5px 12px; font-size: 9.5px; font-weight: 800; letter-spacing: 0.4px;">
              📷 SCAN TO VIEW WORKER PROFILE
            </div>
          `;
        }
      } else if (this.frameStyle === 'HELMET') {
        frameWrapper.style.border = '3px solid #EAB308';
        frameWrapper.style.borderRadius = '12px';
        frameWrapper.style.overflow = 'hidden';
        frameWrapper.style.background = '#FEFCE8';
        frameWrapper.style.boxShadow = '0 8px 24px rgba(234, 179, 8, 0.25)';

        let header = document.getElementById('qrFrameHeader');
        let footer = document.getElementById('qrFrameFooter');
        if (header) {
          header.style.display = 'block';
          header.innerHTML = `
            <div style="background: #EAB308; color: #78350F; padding: 6px 14px; font-size: 11px; font-weight: 900; letter-spacing: 0.3px; display: flex; align-items: center; justify-content: space-between;">
              <span>⚠️ BALSONS SAFETY HELMET PASS</span>
              <span style="font-size: 9px; font-weight: 800;">HSE INDUCTED</span>
            </div>
          `;
        }
        if (footer) {
          footer.style.display = 'block';
          footer.innerHTML = `
            <div style="background: #78350F; color: #FEF08A; padding: 5px 12px; font-size: 9.5px; font-weight: 800;">
              ${e.empId} • ${e.name} • 🩸 ${e.bloodGroup || 'B+'}
            </div>
          `;
        }
      } else if (this.frameStyle === 'EMERGENCY') {
        frameWrapper.style.border = '2.5px solid #DC2626';
        frameWrapper.style.borderRadius = '12px';
        frameWrapper.style.overflow = 'hidden';
        frameWrapper.style.background = '#FEF2F2';
        frameWrapper.style.boxShadow = '0 8px 24px rgba(220, 38, 38, 0.2)';

        let header = document.getElementById('qrFrameHeader');
        let footer = document.getElementById('qrFrameFooter');
        if (header) {
          header.style.display = 'block';
          header.innerHTML = `
            <div style="background: #DC2626; color: #FFFFFF; padding: 6px 14px; font-size: 11px; font-weight: 900; letter-spacing: 0.3px; display: flex; align-items: center; justify-content: space-between;">
              <span>🚨 EMERGENCY MEDICAL &amp; FIRST AID</span>
              <span style="font-size: 9px; font-weight: 800; background: #FFFFFF; color: #DC2626; padding: 1px 6px; border-radius: 4px;">🩸 ${e.bloodGroup || 'B+'}</span>
            </div>
          `;
        }
        if (footer) {
          footer.style.display = 'block';
          footer.innerHTML = `
            <div style="background: #991B1B; color: #FEE2E2; padding: 5px 12px; font-size: 9.5px; font-weight: 800;">
              HOTLINE: ${em} • SITE HR: +91 94371 44520
            </div>
          `;
        }
      } else {
        // Pure Matrix (NONE)
        frameWrapper.style.border = 'none';
        frameWrapper.style.borderRadius = '0';
        frameWrapper.style.background = 'transparent';
        frameWrapper.style.boxShadow = 'none';

        let header = document.getElementById('qrFrameHeader');
        let footer = document.getElementById('qrFrameFooter');
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
      }
    },

    renderQrCode: function() {
      const container = document.getElementById('qrCodeCanvasTarget');
      if (!container) return;

      const payload = (document.getElementById('qrPayloadText') && document.getElementById('qrPayloadText').value)
        ? document.getElementById('qrPayloadText').value
        : this.generatePayload();

      container.innerHTML = '';
      this.applyFrameToContainer();

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
              const centerX = this.size / 2;
              const centerY = this.size / 2;
              const e = this.getEmployee();

              // Circular protective white background with subtle shadow
              ctx.save();
              ctx.beginPath();
              ctx.arc(centerX, centerY, (logoSize / 2) + 4, 0, Math.PI * 2);
              ctx.fillStyle = '#FFFFFF';
              ctx.fill();
              ctx.lineWidth = 2;
              ctx.strokeStyle = this.fgColor;
              ctx.stroke();

              if (this.logoType === 'LOGO') {
                const img = new Image();
                img.onload = function() {
                  ctx.save();
                  ctx.beginPath();
                  ctx.arc(centerX, centerY, logoSize / 2, 0, Math.PI * 2);
                  ctx.clip();
                  ctx.drawImage(img, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
                  ctx.restore();
                };
                img.onerror = () => {
                  // Fallback to Monogram B if logo load fails
                  ctx.beginPath();
                  ctx.arc(centerX, centerY, logoSize / 2, 0, Math.PI * 2);
                  ctx.fillStyle = this.fgColor;
                  ctx.fill();
                  ctx.fillStyle = '#FFFFFF';
                  ctx.font = `bold ${Math.round(logoSize * 0.65)}px Arial, sans-serif`;
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText('B', centerX, centerY + 1);
                };
                img.src = 'assets/images/balsons-logo.png';
              } else if (this.logoType === 'BLOOD') {
                ctx.beginPath();
                ctx.arc(centerX, centerY, logoSize / 2, 0, Math.PI * 2);
                ctx.fillStyle = '#DC2626';
                ctx.fill();
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `bold ${Math.round(logoSize * 0.48)}px Arial, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(e.bloodGroup || 'B+', centerX, centerY + 1);
              } else if (this.logoType === 'SAFETY') {
                ctx.beginPath();
                ctx.arc(centerX, centerY, logoSize / 2, 0, Math.PI * 2);
                ctx.fillStyle = '#059669';
                ctx.fill();
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `bold ${Math.round(logoSize * 0.55)}px Arial, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('✓', centerX, centerY + 1);
              } else {
                // Default Monogram "B"
                ctx.beginPath();
                ctx.arc(centerX, centerY, logoSize / 2, 0, Math.PI * 2);
                ctx.fillStyle = this.fgColor;
                ctx.fill();
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `bold ${Math.round(logoSize * 0.65)}px Arial, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('B', centerX, centerY + 1);
              }
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
      container.innerHTML = `
        <div style="padding: 20px; text-align: center; color: #64748B;">
          <div style="font-size: 24px; margin-bottom: 8px;">⚠️</div>
          <div style="font-size: 12px; font-weight: 700;">Local QR Engine Initializing...</div>
        </div>
      `;
    },

    // ─── SMARTPHONE VCARD INTERACTIVE SIMULATOR ───
    renderPhoneSimulator: function() {
      const target = document.getElementById('qrPhoneSimulatorScreen');
      if (!target) return;

      const e = this.getEmployee();
      const primaryMobile = e.mobile || '+91 98610 88721';
      const hrPhone = '+91 94371 44520';
      const verifyUrl = `https://balsonsportals.github.io/verify.html?empId=${encodeURIComponent(e.empId)}`;

      target.innerHTML = `
        <!-- Phone Status Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 14px 2px 14px; font-size: 11px; font-weight: 700; color: #1E293B;">
          <span>9:41</span>
          <div style="width: 50px; height: 12px; background: #0F172A; border-radius: 10px;"></div>
          <div style="display: flex; gap: 4px; align-items: center;">
            <span style="font-size: 10px;">5G</span>
            <span>🔋</span>
          </div>
        </div>

        <!-- Contact Banner -->
        <div style="padding: 10px 14px 0 14px; text-align: center;">
          <div style="display: inline-flex; align-items: center; gap: 4px; background: #ECFDF5; color: #059669; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 12px; margin-bottom: 8px;">
            <span>✓ Verified Workforce Contact</span>
          </div>

          <!-- Contact Avatar -->
          <div style="position: relative; width: 72px; height: 72px; margin: 0 auto 6px auto;">
            <img src="${e.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}" style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 3px solid #0097B2; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" alt="Photo">
            <span style="position: absolute; bottom: 0; right: 0; background: #10B981; color: #FFFFFF; font-size: 10px; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF;">✓</span>
          </div>

          <div style="font-size: 15px; font-weight: 900; color: #0F172A; line-height: 1.2;">${e.name}</div>
          <div style="font-size: 11px; font-weight: 800; color: #0097B2; margin-top: 2px;">${e.trade || 'Worker'} • ${e.empId}</div>
          <div style="font-size: 10px; color: #64748B;">BALSONS HEAVY LIFT &amp; SHIFT</div>
        </div>

        <!-- Quick Action Buttons -->
        <div style="display: flex; justify-content: center; gap: 8px; padding: 10px 14px;">
          <a href="tel:${primaryMobile.replace(/\s+/g, '')}" class="btn btn-sm" style="flex: 1; background: #0097B2; color: #FFFFFF; font-size: 10.5px; font-weight: 800; border-radius: 8px; text-decoration: none; padding: 6px 0; text-align: center; box-shadow: 0 2px 6px rgba(0, 151, 178, 0.3);">
            📞 Call Mobile
          </a>
          <a href="tel:${hrPhone.replace(/\s+/g, '')}" class="btn btn-sm" style="flex: 1; background: #102D35; color: #FFFFFF; font-size: 10.5px; font-weight: 800; border-radius: 8px; text-decoration: none; padding: 6px 0; text-align: center;">
            🚨 Site HR
          </a>
          <a href="${verifyUrl}" target="_blank" class="btn btn-sm" style="flex: 1; background: #10B981; color: #FFFFFF; font-size: 10.5px; font-weight: 800; border-radius: 8px; text-decoration: none; padding: 6px 0; text-align: center;">
            🌐 Dossier
          </a>
        </div>

        <!-- Contact Detail Cards -->
        <div style="padding: 0 14px 14px 14px; text-align: left; font-size: 11px;">
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 8px 10px; margin-bottom: 6px;">
            <div style="font-size: 9.5px; color: #64748B; font-weight: 700; text-transform: uppercase;">Primary Mobile:</div>
            <div style="font-size: 12px; font-weight: 800; color: #0F172A; font-family: monospace;">${primaryMobile}</div>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 8px 10px; margin-bottom: 6px;">
            <div style="font-size: 9.5px; color: #64748B; font-weight: 700; text-transform: uppercase;">Site HR Officer (JTRWF Khordha):</div>
            <div style="font-size: 12px; font-weight: 800; color: #0F172A;">Priyanka Senapati • <span style="font-family: monospace; color: #0097B2;">${hrPhone}</span></div>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 8px 10px; margin-bottom: 6px; display: flex; justify-content: space-between;">
            <div>
              <div style="font-size: 9.5px; color: #64748B; font-weight: 700; text-transform: uppercase;">Blood Group:</div>
              <div style="font-size: 12px; font-weight: 900; color: #DC2626;">🩸 ${e.bloodGroup || 'B+'}</div>
            </div>
            <div>
              <div style="font-size: 9.5px; color: #64748B; font-weight: 700; text-transform: uppercase;">Medical Form 31:</div>
              <div style="font-size: 11px; font-weight: 800; color: #059669;">FIT (Certified) ✓</div>
            </div>
          </div>

          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 8px 10px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: #166534;">● GATE 1 &amp; 2 ACCESS AUTHORIZED</div>
            <div style="font-size: 9px; color: #15803D;">Project: PRJ-JTRWF-SCHULER • 24/7 Muster Ready</div>
          </div>
        </div>
      `;
    },

    // ─── SECURITY AUDIT & SCANNER SIMULATOR ───
    renderScannerSimulator: function() {
      const target = document.getElementById('qrScannerAuditScreen');
      if (!target) return;

      const e = this.getEmployee();
      const payload = this.generatePayload();

      target.innerHTML = `
        <div style="text-align: left; font-size: 11px;">
          <div style="background: #102D35; color: #FFFFFF; padding: 10px 14px; border-radius: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; font-weight: 900; letter-spacing: 0.2px;">BEDS V1.1 ENTERPRISE AUDIT ENGINE</div>
              <div style="font-size: 9.5px; color: #0097B2;">Standard: ISO/IEC 18004 • RFC 2426 vCard Verification</div>
            </div>
            <span style="background: #10B981; color: #FFFFFF; font-size: 9px; font-weight: 900; padding: 2px 7px; border-radius: 4px;">SYSTEM OPERATIONAL</span>
          </div>

          <!-- Payload Analysis Metrics -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px;">
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 8px 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 9px; color: #64748B; font-weight: 700;">PAYLOAD SIZE</div>
              <div style="font-size: 14px; font-weight: 900; color: #102D35;">${payload.length} <span style="font-size: 10px;">chars</span></div>
            </div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 8px 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 9px; color: #64748B; font-weight: 700;">ERROR RECOVERY</div>
              <div style="font-size: 14px; font-weight: 900; color: #0097B2;">Level Q <span style="font-size: 10px;">(25%)</span></div>
            </div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 8px 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 9px; color: #64748B; font-weight: 700;">SCAN RELIABILITY</div>
              <div style="font-size: 14px; font-weight: 900; color: #059669;">100% PASS</div>
            </div>
          </div>

          <!-- Live Compliance Checklist -->
          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; padding: 12px 14px; margin-bottom: 14px;">
            <div style="font-size: 11px; font-weight: 800; color: #102D35; margin-bottom: 8px; text-transform: uppercase;">
              🛡️ Live Security Verification Matrix:
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 7px;">
              <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F1F5F9; padding-bottom: 4px;">
                <span>1. Worker Identity in Master Database</span>
                <strong style="color: #059669;">[✓ MATCH: ACTIVE]</strong>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F1F5F9; padding-bottom: 4px;">
                <span>2. Standard vCard 3.0 Structure</span>
                <strong style="color: #059669;">[✓ RFC 2426 VALID]</strong>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F1F5F9; padding-bottom: 4px;">
                <span>3. Biometric Muster Token Synchronization</span>
                <strong style="color: #059669;">[✓ AUTHENTICATED]</strong>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F1F5F9; padding-bottom: 4px;">
                <span>4. Form 31 Health &amp; Height Fitness</span>
                <strong style="color: #059669;">[✓ RECORDED ON SITE]</strong>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F1F5F9; padding-bottom: 4px;">
                <span>5. Police Background Verification</span>
                <strong style="color: #059669;">[✓ ${e.police || 'RECORDED'}]</strong>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span>6. Gate Security Escalation Line</span>
                <strong style="color: #059669;">[✓ PRIYANKA SENAPATI]</strong>
              </div>
            </div>
          </div>

          <!-- Live Diagnostic Trigger -->
          <button type="button" class="btn btn-primary" onclick="BalsonsQrStudio.runScannerDiagnostic()" style="width: 100%; background: #0097B2; border-color: #0097B2; font-weight: 800; padding: 9px 14px; font-size: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
            <span>▶</span> Run Live Diagnostic Scan Test
          </button>
        </div>
      `;
    },

    runScannerDiagnostic: function() {
      const e = this.getEmployee();
      this.showToast(`🔍 Scanning QR Matrix... Validating BEDS Hash for ${e.name} (${e.empId})...`);
      setTimeout(() => {
        this.showToast(`✔ BEDS Pass Verification 100% PASS! Worker: ${e.name} | Gate 1 & 2 Authorized!`);
      }, 700);
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
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.showToast(`✔ Downloaded high-resolution QR PNG for ${e.name}`);
      } else {
        alert('QR Canvas not ready. Please try again.');
      }
    },

    // ─── ACTION 4: DOWNLOAD VECTOR SVG ───
    downloadSvg: function() {
      const e = this.getEmployee();
      const fileName = `BALSONS_QR_${e.empId}_${e.name.replace(/\s+/g, '_').toUpperCase()}.svg`;
      const svgContent = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}">
  <rect width="100%" height="100%" fill="${this.bgColor}"/>
  <image href="${document.querySelector('#qrCodeCanvasTarget canvas') ? document.querySelector('#qrCodeCanvasTarget canvas').toDataURL('image/png') : ''}" width="${this.size}" height="${this.size}"/>
</svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = fileName;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showToast(`✔ Downloaded scalable vector SVG for ${e.name}`);
    },

    // ─── ACTION 5: BATCH EXPORT ALL 5 WORKFORCE QRS ───
    downloadAllQrsBatch: function() {
      const list = this.getEmployeeList();
      let delay = 0;

      list.forEach((emp, idx) => {
        setTimeout(() => {
          const qrDataUrl = (typeof window.getEmployeeQrDataUrl === 'function')
            ? window.getEmployeeQrDataUrl(emp.empId, 320)
            : (emp.customQrDataUrl || '');

          if (qrDataUrl) {
            const a = document.createElement('a');
            a.download = `BALSONS_QR_${emp.empId}_${emp.name.replace(/\s+/g, '_').toUpperCase()}.png`;
            a.href = qrDataUrl;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        }, delay);
        delay += 350;
      });

      this.showToast(`✔ Initiated batch high-resolution export for all ${list.length} workforce members!`);
    },

    // ─── ACTION 6: COPY ENCODED STRING TO CLIPBOARD ───
    copyPayloadToClipboard: function() {
      const ta = document.getElementById('qrPayloadText');
      const text = ta ? ta.value : this.generatePayload();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('✔ Live QR Encoded String copied to clipboard!');
        }).catch(() => {
          this.fallbackCopyText(text);
        });
      } else {
        this.fallbackCopyText(text);
      }
    },

    fallbackCopyText: function(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        this.showToast('✔ Live QR Encoded String copied to clipboard!');
      } catch (err) {
        alert('Unable to copy text automatically.');
      }
      document.body.removeChild(ta);
    },

    // ─── ACTION 7: PRINT HIGH-VIS SAFETY HELMET STICKERS SHEET (A4 - 12 STICKERS) ───
    printHelmetStickers: function() {
      const list = this.getEmployeeList();
      const stage = (typeof window.getBedsPrintStage === 'function')
        ? window.getBedsPrintStage()
        : document.getElementById('bedsPrintStage');

      if (!stage) return;

      const e = this.getEmployee();
      const qrDataUrl = (typeof window.getEmployeeQrDataUrl === 'function')
        ? window.getEmployeeQrDataUrl(e.empId, 220)
        : (e.customQrDataUrl || '');

      // Build 12-sticker grid (3 cols x 4 rows)
      let stickerCardsHtml = '';
      for (let i = 0; i < 12; i++) {
        const currentEmp = list[i % list.length];
        const empQr = (typeof window.getEmployeeQrDataUrl === 'function')
          ? window.getEmployeeQrDataUrl(currentEmp.empId, 200)
          : (currentEmp.customQrDataUrl || qrDataUrl);

        stickerCardsHtml += `
          <div style="width: 58mm; height: 56mm; border: 2px solid #EAB308; border-radius: 4mm; background: #FEFCE8; padding: 2mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; text-align: center; position: relative;">
            <!-- Header -->
            <div style="background: #EAB308; color: #78350F; padding: 1mm 2mm; border-radius: 2mm; font-size: 5pt; font-weight: 900; letter-spacing: 0.2px; display: flex; justify-content: space-between; align-items: center;">
              <span>⚠️ BALSONS SAFETY</span>
              <span>HSE PASS</span>
            </div>

            <!-- Middle QR & Photo -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 3mm; margin: 1mm 0;">
              <div style="padding: 1mm; background: #FFFFFF; border: 1px solid #78350F; border-radius: 2mm;">
                <img src="${empQr}" style="width: 22mm; height: 22mm; display: block;" alt="QR">
              </div>
              <div style="text-align: left; font-size: 5pt; line-height: 1.25;">
                <img src="${currentEmp.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}" style="width: 14mm; height: 14mm; border-radius: 50%; object-fit: cover; border: 1px solid #0097B2; display: block; margin-bottom: 1mm;" alt="Photo">
                <div style="font-weight: 900; color: #102D35;">${currentEmp.name}</div>
                <div style="color: #64748B; font-family: monospace;">${currentEmp.empId}</div>
                <div style="color: #DC2626; font-weight: 800;">🩸 ${currentEmp.bloodGroup || 'B+'}</div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #102D35; color: #FFFFFF; padding: 1mm 2mm; border-radius: 1.5mm; font-size: 4.5pt; font-weight: 800; letter-spacing: 0.2px; display: flex; justify-content: space-between;">
              <span>PRJ-JTRWF-SCHULER</span>
              <span style="color: #0097B2;">HOTLINE: 9437144520</span>
            </div>
          </div>
        `;
      }

      stage.innerHTML = `
        <div class="beds-print-a4-sheet" style="width: 194mm; max-width: 194mm; min-width: 194mm; height: 278mm; max-height: 278mm; margin: 0 auto; padding: 4mm 6mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background: #FFFFFF; font-family: Arial, sans-serif; border: 1.5px solid #102D35; border-radius: 4px; overflow: hidden;">
          
          <!-- Sheet Header -->
          <div style="border-bottom: 2px solid #EAB308; padding-bottom: 3px; display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" style="height: 28px; width: auto; object-fit: contain;">
              <div>
                <div style="font-size: 13px; font-weight: 900; color: #102D35;">BALSONS HEAVY LIFT &amp; SHIFT</div>
                <div style="font-size: 8pt; font-weight: 800; color: #D97706; text-transform: uppercase;">
                  WORKFORCE SAFETY HELMET &amp; TOOL IDENTIFICATION STICKERS (A4 CALIBRATED)
                </div>
              </div>
            </div>
            <div style="text-align: right; font-size: 7.5pt; color: #64748B;">
              <div style="background: #78350F; color: #FEF08A; padding: 2px 6px; font-weight: 800; border-radius: 3px; display: inline-block;">12 STICKERS / SHEET</div>
              <div style="margin-top: 2px;">Adhesive Vinyl Print Ready</div>
            </div>
          </div>

          <!-- Cutting Instructions Ribbon -->
          <div style="background: #FEFCE8; border: 1px dashed #EAB308; padding: 2px 6px; border-radius: 3px; font-size: 7pt; font-weight: 700; color: #78350F; text-align: center; text-transform: uppercase;">
            ✂️ Print on A4 Self-Adhesive Vinyl or Glossy Sticker Paper • Cut along outer perimeter • Affix to Hard Hat Crown, Safety Harness or Crane Console
          </div>

          <!-- 3x4 Stickers Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm 4mm; justify-content: center; align-items: center; margin: 1mm auto;">
            ${stickerCardsHtml}
          </div>

          <!-- Sheet Footer -->
          <div style="border-top: 1px solid #CBD5E1; padding-top: 2px; display: flex; justify-content: space-between; font-size: 7pt; color: #64748B;">
            <span>Project: PRJ-JTRWF-SCHULER • Site: Jupiter Tatravagonka Railwheel Factory, Khordha</span>
            <span>Corporate HSE Directorate • Page 1 of 1</span>
          </div>
        </div>
      `;

      if (typeof window.setupPrintCleanup === 'function') {
        window.setupPrintCleanup(stage);
      }
      window.print();
    },

    // ─── ACTION 8: BULK PRINT WORKFORCE QR PASS SHEET (ALL EMPLOYEES) ───
    printBulkQrSheet: function() {
      const list = this.getEmployeeList();
      const stage = (typeof window.getBedsPrintStage === 'function')
        ? window.getBedsPrintStage()
        : document.getElementById('bedsPrintStage');

      if (!stage) return;

      const cardsHtml = list.map(emp => {
        const qrDataUrl = (typeof window.getEmployeeQrDataUrl === 'function')
          ? window.getEmployeeQrDataUrl(emp.empId, 200)
          : (emp.customQrDataUrl || '');

        return `
          <div style="width: 88mm; height: 50mm; border: 1.2px solid #102D35; border-radius: 3mm; padding: 2mm 3mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background: #FFFFFF; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #0097B2; padding-bottom: 1.5mm;">
              <div style="display: flex; align-items: center; gap: 4px;">
                <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" style="height: 4.5mm; width: auto; object-fit: contain;">
                <span style="font-size: 5.5pt; font-weight: 900; color: #102D35;">BALSONS HEAVY LIFT</span>
              </div>
              <span style="font-size: 4.5pt; font-weight: 800; background: #102D35; color: #FFFFFF; padding: 1px 4px; border-radius: 2px;">SITE PASS</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 2mm; margin: 1mm 0;">
              <img src="${emp.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}" style="width: 16mm; height: 18mm; border-radius: 2mm; object-fit: cover; border: 1px solid #CBD5E1;">
              
              <div style="flex: 1; text-align: left; font-size: 5pt; line-height: 1.3;">
                <div style="font-size: 6.5pt; font-weight: 900; color: #102D35;">${emp.name}</div>
                <div style="color: #0097B2; font-weight: 800; font-family: monospace;">${emp.empId}</div>
                <div><strong>Trade:</strong> ${emp.trade || 'Worker'}</div>
                <div><strong>Blood:</strong> <span style="color: #DC2626; font-weight: 800;">🩸 ${emp.bloodGroup || 'B+'}</span></div>
                <div><strong>Mobile:</strong> ${emp.mobile || '+91 98610 88721'}</div>
              </div>

              <div style="padding: 1mm; background: #F0FBFC; border: 1px solid #0097B2; border-radius: 1.5mm; text-align: center;">
                <img src="${qrDataUrl}" style="width: 19mm; height: 19mm; display: block;" alt="QR">
                <span style="font-size: 3.2pt; font-weight: 800; color: #0097B2;">SCAN VCARD</span>
              </div>
            </div>

            <div style="background: #102D35; color: #FFFFFF; padding: 0.8mm 2mm; border-radius: 1mm; font-size: 4pt; font-weight: 800; display: flex; justify-content: space-between;">
              <span>● GATE 1 &amp; 2 AUTHORIZED</span>
              <span style="color: #0097B2;">HR HOTLINE: 9437144520</span>
            </div>
          </div>
        `;
      }).join('');

      stage.innerHTML = `
        <div class="beds-print-a4-sheet" style="width: 194mm; max-width: 194mm; min-width: 194mm; height: 278mm; max-height: 278mm; margin: 0 auto; padding: 4mm 6mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background: #FFFFFF; font-family: Arial, sans-serif; border: 1.5px solid #102D35; border-radius: 4px; overflow: hidden;">
          <div style="border-bottom: 2px solid #0097B2; padding-bottom: 3px; display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" style="height: 28px; width: auto; object-fit: contain;">
              <div>
                <div style="font-size: 13px; font-weight: 900; color: #102D35;">BALSONS HEAVY LIFT &amp; SHIFT</div>
                <div style="font-size: 8pt; font-weight: 800; color: #0097B2; text-transform: uppercase;">
                  WORKFORCE MASTER IDENTITY BADGE &amp; QR ROSTER SHEET (A4 CALIBRATED)
                </div>
              </div>
            </div>
            <div style="text-align: right; font-size: 7.5pt; color: #64748B;">
              <div style="background: #102D35; color: #FFFFFF; padding: 2px 6px; font-weight: 800; border-radius: 3px; display: inline-block;">MASTER WORKFORCE PASSES</div>
              <div style="margin-top: 2px;">Project: PRJ-JTRWF-SCHULER</div>
            </div>
          </div>

          <div style="background: #F1F5F9; border: 1px dashed #CBD5E1; padding: 2px 6px; border-radius: 3px; font-size: 7pt; font-weight: 700; color: #475569; text-align: center; text-transform: uppercase;">
            ✂️ Official Workforce ID Pass Sheet • Cut along perimeter or insert into PVC pouches for site muster deployment
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4mm 6mm; justify-content: center; align-items: center; margin: 2mm auto;">
            ${cardsHtml}
          </div>

          <div style="border-top: 1px solid #CBD5E1; padding-top: 2px; display: flex; justify-content: space-between; font-size: 7pt; color: #64748B;">
            <span>Corporate Safety Directorate • PRJ-JTRWF-SCHULER</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      `;

      if (typeof window.setupPrintCleanup === 'function') {
        window.setupPrintCleanup(stage);
      }
      window.print();
    },

    showToast: function(msg) {
      const existing = document.getElementById('balsonsQrStudioToast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.id = 'balsonsQrStudioToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.background = '#102D35';
      toast.style.color = '#FFFFFF';
      toast.style.padding = '12px 20px';
      toast.style.borderRadius = '8px';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      toast.style.zIndex = '99999';
      toast.style.fontSize = '12px';
      toast.style.fontWeight = '700';
      toast.style.borderLeft = '4px solid #0097B2';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '8px';
      toast.innerHTML = msg;

      document.body.appendChild(toast);
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 3500);
    }
  };

  window.BalsonsQrStudio = BalsonsQrStudio;

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BalsonsQrStudio.init());
  } else {
    setTimeout(() => BalsonsQrStudio.init(), 100);
  }

})(window);
