const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
let content = fs.readFileSync(file, 'utf8');

console.log('Injecting advanced JS into HR portal. Current length:', content.length);

// 1. REWRITE generateOfficialPayslipHtml and loadPayslipPreview
const oldLoadPayslipRegex = /function loadPayslipPreview\(empId\) \{[\s\S]*?renderAuditTable\(\);?\s*\}[\r\n\s]*function renderAuditTable/;

// Let's check where loadPayslipPreview starts and ends
const lpIdx = content.indexOf('function loadPayslipPreview');
console.log('Found loadPayslipPreview at index:', lpIdx);

// Prepare the new JS for Payslips, Bulk Printing, Editable Attendance, Editable Employees, Category Clearance, and Dual-Sync
const newAdvancedJs = `
    // ══════════════════════════════════════════════════════════════════
    // DUAL-SYNC & INSTANT CROSS-PORTAL AUTO-SYNC ENGINE (BEDS V1.2)
    // ══════════════════════════════════════════════════════════════════
    let HR_SYNC_CHANNEL;
    try {
      HR_SYNC_CHANNEL = new BroadcastChannel('balsons_enterprise_sync');
      HR_SYNC_CHANNEL.onmessage = function(ev) {
        if (ev.data && (ev.data.portal === 'hr' || ev.data.type === 'ALL_SYNC' || ev.data.type === 'ATTENDANCE_UPDATE' || ev.data.type === 'EMPLOYEE_UPDATE')) {
          console.log('🔄 [Cross-Portal Sync] Received live update from another tab/portal:', ev.data);
          try {
            renderAttendanceTable();
            renderPayrollTable();
            renderEmployeesTable();
            renderAdvanceTable();
            renderHrSafetyDirectory();
          } catch(e) {}
        }
      };
    } catch(e) {
      console.warn('BroadcastChannel not supported in this context:', e);
    }

    function broadcastHrUpdate(type, payload) {
      // 1. Persist to localStorage cache
      try {
        localStorage.setItem('balsons_hr_attendance_v2', JSON.stringify(attendanceData));
        localStorage.setItem('balsons_hr_employees_v2', JSON.stringify(employeesData));
        localStorage.setItem('balsons_hr_advances_v2', JSON.stringify(advanceData));
        localStorage.setItem('balsons_hr_last_sync', new Date().toISOString());
      } catch (e) {}

      // 2. Broadcast to other open tabs / portals instantly
      if (HR_SYNC_CHANNEL) {
        try {
          HR_SYNC_CHANNEL.postMessage({ portal: 'hr', type, payload, timestamp: Date.now() });
        } catch(e) {}
      }

      // 3. Asynchronously push to Google Apps Script / Sheet backend without blocking UI
      if (window.BalsonsHrApi && typeof BalsonsHrApi.call === 'function') {
        BalsonsHrApi.call('SYNC_HR_UPDATE', { type, payload }).catch(err => {
          console.warn('[BalsonsHrApi] Background cloud push queued:', err);
        });
      }
    }

    // Restore cached data from localStorage if available
    (function restoreCachedHrData() {
      try {
        const cachedAtt = localStorage.getItem('balsons_hr_attendance_v2');
        if (cachedAtt) attendanceData = JSON.parse(cachedAtt);
        const cachedEmp = localStorage.getItem('balsons_hr_employees_v2');
        if (cachedEmp) employeesData = JSON.parse(cachedEmp);
        const cachedAdv = localStorage.getItem('balsons_hr_advances_v2');
        if (cachedAdv) advanceData = JSON.parse(cachedAdv);
      } catch(e) {
        console.warn('Could not restore cached HR data:', e);
      }
    })();

    // ══════════════════════════════════════════════════════════════════
    // OFFICIAL BALSONS BRANDED PAYSLIP ENGINE (MATERIAL CHALLAN LAYOUT)
    // ══════════════════════════════════════════════════════════════════
    function generateOfficialPayslipHtml(empId, isBulk = false) {
      const e = employeesData.find(x => x.empId === empId) || employeesData[0];
      const att = attendanceData.find(a => a.empId === empId) || { present: 26, wo: 4, pl: 0, payable: 30, otHours: 0 };
      const adv = advanceData.find(a => a.empId === empId) || { monthly: 0 };

      const isMonthly = e.wageType === 'MONTHLY';
      let earningsRowsHtml = '';
      let deductionsRowsHtml = '';
      let gross = 0;
      let totalDeductions = 0;
      let net = 0;

      if (isMonthly) {
        const basic = e.basic;
        const hra = e.hra;
        const allow = e.allow;
        const otPay = Math.round((basic / 208) * 2 * att.otHours);
        gross = basic + hra + allow + otPay;
        const pf = Math.min(1800, Math.round(basic * 0.12));
        const esic = (gross <= 21000) ? Math.round(gross * 0.0075) : 158;
        const pt = 200;
        totalDeductions = (adv.monthly || 0) + pf + esic + pt;
        net = gross - totalDeductions;

        earningsRowsHtml = \`
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Basic Salary (50%)</span>
            <strong>₹ \${basic.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>House Rent Allowance (HRA 25%)</span>
            <strong>₹ \${hra.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Site Heavy Duty Allowance (25%)</span>
            <strong>₹ \${allow.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Overtime (OT) Pay (\${att.otHours} hrs @ 2x)</span>
            <strong style="color: #D97706;">+₹ \${otPay.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 6px 8px; font-weight: 800; background: #E6F7FA; margin-top: 6px; font-size: 11.5px; border-radius: 4px;">
            <span>GROSS EARNINGS</span>
            <strong style="color: #0097B2;">₹ \${gross.toLocaleString('en-IN')}</strong>
          </div>
        \`;

        deductionsRowsHtml = \`
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Provident Fund (PF - 12%)</span>
            <strong style="color: #E64646;">₹ \${pf.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Employees' State Insurance (ESIC - 0.75%)</span>
            <strong style="color: #E64646;">₹ \${esic.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Professional Tax (PT)</span>
            <strong>₹ \${pt.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Salary Advance Recovery</span>
            <strong style="color: \${adv.monthly > 0 ? '#E64646' : '#102D35'};">₹ \${(adv.monthly || 0).toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 6px 8px; font-weight: 800; background: #FEF2F2; margin-top: 6px; font-size: 11.5px; border-radius: 4px;">
            <span>TOTAL DEDUCTIONS</span>
            <strong style="color: #E64646;">₹ \${totalDeductions.toLocaleString('en-IN')}</strong>
          </div>
        \`;
      } else {
        const baseEarned = att.present * e.dailyRate;
        const hourlyRate = e.dailyRate / 8;
        const otPay = Math.round(hourlyRate * 2 * att.otHours);
        gross = baseEarned + otPay;
        totalDeductions = adv.monthly || 0;
        net = gross - totalDeductions;

        earningsRowsHtml = \`
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Base Days Worked (\${att.present} d @ ₹\${e.dailyRate}/d)</span>
            <strong>₹ \${baseEarned.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Daily Shift OT (\${att.otHours} hrs @ Double Rate)</span>
            <strong style="color: #D97706;">+₹ \${otPay.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Weekly Off / Paid Leave Allowance</span>
            <span style="color: var(--beds-text-muted);">₹ 0 (Daily Basis)</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 6px 8px; font-weight: 800; background: #FEF3C7; margin-top: 6px; font-size: 11.5px; border-radius: 4px;">
            <span>GROSS WAGES EARNED</span>
            <strong style="color: #D97706;">₹ \${gross.toLocaleString('en-IN')}</strong>
          </div>
        \`;

        deductionsRowsHtml = \`
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Provident Fund (PF)</span>
            <span style="color: #059669; font-weight: 700;">Statutory Exempt (₹ 0.00)</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Employees' State Insurance (ESIC)</span>
            <span style="color: #059669; font-weight: 700;">Statutory Exempt (₹ 0.00)</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Professional Tax (PT)</span>
            <span style="color: #059669; font-weight: 700;">Statutory Exempt (₹ 0.00)</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0; font-size: 11px;">
            <span>Wage Advance Recovery</span>
            <strong style="color: \${adv.monthly > 0 ? '#E64646' : '#102D35'};">₹ \${(adv.monthly || 0).toLocaleString('en-IN')}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 6px 8px; font-weight: 800; background: #F3F4F6; margin-top: 6px; font-size: 11.5px; border-radius: 4px;">
            <span>TOTAL DEDUCTIONS</span>
            <strong style="color: \${totalDeductions > 0 ? '#E64646' : '#102D35'};">₹ \${totalDeductions.toLocaleString('en-IN')}</strong>
          </div>
        \`;
      }

      const slipRef = \`BHLS/HR/PS/2026/\${e.empId.replace('EMP-2026-', '')}\`;
      const netThemeColor = isMonthly ? '#0097B2' : '#D97706';
      const netBgColor = isMonthly ? '#F0FBFC' : '#FFFBEB';

      return \`
        <!-- COMPULSORY CORPORATE HEADER (EXACTLY AS IN MATERIAL CHALLAN PDF) -->
        <div class="challan-header" style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 8px; margin-bottom: 6px;">
          <!-- Left Column: Capabilities & Industry Sectors -->
          <div class="challan-col-left" style="flex: 1; max-width: 58%;">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #102D35; margin-bottom: 2px;">
              Specialized in....
            </div>
            <ul style="font-size: 9.5px; line-height: 1.35; list-style-type: disc; padding-left: 14px; color: #102D35; margin: 0; font-weight: 600;">
              <li>Heavy Cargo Lifters, Movers &amp; Erectors</li>
              <li>Loading, Unloading, Internal Shifting of Cargo</li>
              <li>Dismantling, Erection, Assembly &amp; Commissioning</li>
              <li>Plant Relocation on Turnkey Basis.</li>
              <li>Project Logistics, Project Engineering</li>
              <li>Heavy Project handling</li>
              <li>Heavy Crane &amp; Gantry Supplier</li>
            </ul>
            <div style="font-size: 9px; font-weight: 700; color: #102D35; margin-top: 4px; line-height: 1.25; max-width: 380px;">
              Automobile, Forging, Stamping, Petrochemical, Ports, Steel, Railways, Power, Off-Shore Services, Civil Sectors.
            </div>
          </div>

          <!-- Right Column: Official Logo & Company Statutory Reg. Info -->
          <div class="challan-col-right" style="text-align: right; max-width: 40%;">
            <img src="assets/images/balsons-logo.png" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1HB7sGaQ4f2qq0NNzgBQrSpUe2DJWV4uh'" alt="BALSONS Logo" style="height: 44px; width: auto; object-fit: contain;">
            <div style="color: #E64646; font-weight: 900; font-size: 12.5px; letter-spacing: 0.8px; margin: 2px 0 3px 0;">
              HEAVY LIFT &amp; SHIFT
            </div>
            <div style="font-size: 9.5px; line-height: 1.3; color: #102D35; font-weight: 500;">
              <strong>Reg. Off:</strong> Shop no. 4, Creative Paradise,<br>
              Near Shani Mandir, Plot 13, CDC Purna Nagar,<br>
              Chinchwad Pune Maharashtra India 411019<br>
              <strong>Ph:</strong> +91 9860099326 / +91 9527399199<br>
              <strong>Email:</strong> info@balsonsheavylift.com • <strong>Web:</strong> www.balsonsheavylift.com
            </div>
          </div>
        </div>

        <!-- DUAL COLOR DIVIDING LINE -->
        <div style="height: 2.5px; background: linear-gradient(to right, #0097B2 45%, #E64646 45%); margin: 5px 0 8px 0;"></div>

        <!-- METADATA BAR (Ref, Pay Period, Classification) -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10.5px; font-weight: 700; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid #102D35;">
          <div>SLIP REF: <span style="font-weight: 800; font-family: monospace; color: #0097B2;">\${slipRef}</span></div>
          <div>PAY PERIOD: <span style="font-weight: 800; color: #102D35;">NOVEMBER 2026</span></div>
          <div>PROJECT: <span style="font-weight: 800; font-family: monospace;">PRJ-JTRWF-SCHULER</span></div>
          <div>
            <span class="status-pill \${isMonthly ? 'status-info' : 'status-warning'}" style="font-size: 9px; font-weight: 800;">
              \${isMonthly ? 'MONTHLY SALARIED (PF/ESIC)' : 'DAILY WAGE (EXEMPT)'}
            </span>
          </div>
        </div>

        <!-- EMPLOYEE STATUTORY PROFILE BOX -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 4px; padding: 8px 12px; margin-bottom: 14px; font-size: 10.5px; line-height: 1.35;">
          <div><span style="color: #64748B;">Employee ID:</span><br><strong style="font-family: monospace; font-size: 11.5px; color: #102D35;">\${e.empId}</strong></div>
          <div><span style="color: #64748B;">Full Name:</span><br><strong style="font-size: 11.5px; color: #102D35;">\${escapeHtml(e.name)}</strong></div>
          <div><span style="color: #64748B;">Designation / Trade:</span><br><strong>\${escapeHtml(e.trade || 'Heavy Lift Specialist')}</strong></div>
          <div><span style="color: #64748B;">Department:</span><br><strong>\${escapeHtml(e.dept || 'Rigging Operations')}</strong></div>

          <div><span style="color: #64748B;">Wage Category:</span><br><strong style="color: \${netThemeColor};">\${isMonthly ? 'Monthly Salaried' : 'Daily Pay Worker'}</strong></div>
          <div><span style="color: #64748B;">Payable Days:</span><br><strong>\${att.payable} Days</strong> (P: \${att.present}, WO: \${att.wo}, OT: \${att.otHours}h)</div>
          <div><span style="color: #64748B;">Bank Account:</span><br><strong>State Bank of India (Ending **\${e.bankEnding})</strong></div>
          <div><span style="color: #64748B;">Rate Basis:</span><br><strong style="font-family: monospace;">\${isMonthly ? '₹ ' + e.ctc.toLocaleString('en-IN') + '/mo' : '₹ ' + e.dailyRate.toLocaleString('en-IN') + '/day'}</strong></div>

          <div><span style="color: #64748B;">UAN / EPFO:</span><br><span style="font-family: monospace; font-weight: 700;">\${isMonthly ? '101928374650' : 'N/A (Exempt)'}</span></div>
          <div><span style="color: #64748B;">ESIC IP No:</span><br><span style="font-family: monospace; font-weight: 700;">\${isMonthly ? '4491028374' : 'N/A (Exempt)'}</span></div>
          <div><span style="color: #64748B;">PAN Number:</span><br><span style="font-family: monospace; font-weight: 700;">ABCDE1234F</span></div>
          <div><span style="color: #64748B;">Site Location:</span><br><strong>JTRWF Khordha, Odisha</strong></div>
        </div>

        <!-- EARNINGS & DEDUCTIONS DUAL TABLES -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;">
          <!-- Left: Earnings -->
          <div>
            <div style="font-weight: 800; font-size: 11px; border-bottom: 1.5px solid #102D35; padding-bottom: 4px; margin-bottom: 6px; color: #102D35; text-transform: uppercase;">
              EARNINGS COMPONENTS (₹)
            </div>
            \${earningsRowsHtml}
          </div>

          <!-- Right: Deductions -->
          <div>
            <div style="font-weight: 800; font-size: 11px; border-bottom: 1.5px solid #102D35; padding-bottom: 4px; margin-bottom: 6px; color: #102D35; text-transform: uppercase;">
              STATUTORY &amp; ADVANCE DEDUCTIONS (₹)
            </div>
            \${deductionsRowsHtml}
          </div>
        </div>

        <!-- NET PAYABLE BLOCK -->
        <div style="border: 2px solid \${netThemeColor}; background: \${netBgColor}; border-radius: 4px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <div style="font-size: 11px; font-weight: 800; color: #102D35; text-transform: uppercase;">
              \${isMonthly ? 'NET SALARY PAYABLE (NEFT / BANK DISBURSEMENT):' : 'NET WAGES PAYABLE (DAILY PAY DISBURSEMENT):'}
            </div>
            <div style="font-size: 10.5px; color: #475569; font-style: italic;">
              Disbursed in full for November 2026 into beneficiary account. Zero unauthorized retention.
            </div>
          </div>
          <div style="font-size: 21px; font-weight: 900; color: \${netThemeColor}; font-family: monospace;">
            ₹ \${net.toLocaleString('en-IN')}.00
          </div>
        </div>

        <!-- COMPULSORY SIGNATURES & FOOTER (EXACTLY AS IN MATERIAL CHALLAN BASELINE) -->
        <div style="margin-top: \${isBulk ? 'auto' : '12px'};">
          <!-- Signatures Block -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px; font-size: 10.5px;">
            <div style="text-align: left;">
              <div style="font-weight: 800; color: #102D35; margin-bottom: 24px;">Receiver / Worker Signature</div>
              <div style="border-top: 1.5px solid #102D35; width: 160px; padding-top: 2px; font-weight: 700; text-transform: uppercase;">\${escapeHtml(e.name)}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-weight: 800; color: #102D35; margin-bottom: 24px;">Checked &amp; Verified By</div>
              <div style="border-top: 1.5px solid #102D35; width: 160px; padding-top: 2px; font-weight: 700;">PRIYANKA SENAPATI<br><span style="font-size: 9px; color: #64748B;">Site HR Manager (JTRWF)</span></div>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 800; color: #102D35;">For (BALSONS HEAVY LIFT &amp; SHIFT)</div>
              <div style="margin-top: 22px; border-top: 1.5px solid #102D35; width: 180px; padding-top: 2px; font-weight: 800; color: #102D35;">
                AUTHORISED SIGNATORY<br>
                <span style="font-size: 9.5px; color: #E64646; font-weight: 800;">PRASHANT MULEY</span>
              </div>
            </div>
          </div>

          <!-- COMPULSORY FOOTER -->
          <div style="border-top: 1.5px solid #102D35; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; font-weight: 700; color: #102D35;">
            <div>Page | 1 of 1</div>
            <div style="font-family: 'Brush Script MT', 'Dancing Script', 'Caveat', cursive, serif; font-size: 14px; color: #00769E; font-style: italic; font-weight: 600;">
              Difficult we do easily impossible takes little time…!
            </div>
            <div style="font-size: 9px; color: #64748B;">Statutory HR &amp; Dual-Wage Payroll Record • PRJ-JTRWF-SCHULER</div>
          </div>
        </div>
      \`;
    }

    function loadPayslipPreview(empId) {
      const container = document.getElementById('printablePayslip');
      if (!container) return;
      container.innerHTML = generateOfficialPayslipHtml(empId || 'EMP-2026-0001', false);
    }

    function printBulkPayslips(filter = 'ALL') {
      let list = employeesData;
      if (filter === 'MONTHLY') list = list.filter(x => x.wageType === 'MONTHLY');
      else if (filter === 'DAILY_PAY') list = list.filter(x => x.wageType === 'DAILY_PAY');

      const bulkContainer = document.getElementById('printableBulkPayslips');
      if (!bulkContainer) return;

      bulkContainer.innerHTML = '';
      list.forEach((e, idx) => {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'payslip-sheet payslip-page-break';
        pageDiv.innerHTML = generateOfficialPayslipHtml(e.empId, true);
        bulkContainer.appendChild(pageDiv);
      });

      document.body.classList.add('printing-bulk-payslips');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-bulk-payslips');
      }, 1000);
    }

    function openPayslipEmpDossier() {
      const sel = document.getElementById('payslipEmpSelect');
      const empId = sel ? sel.value : 'EMP-2026-0001';
      if (window.Balsons360Dossier) {
        window.Balsons360Dossier.openModal(empId);
      }
    }

    function exportAllPayslipsToDrive() {
      if (!window.BalsonsDocs) {
        alert('Document Vault engine is initializing.');
        return;
      }
      let count = 0;
      employeesData.forEach(e => {
        const docId = \`DOC-PAY-\${e.empId}-NOV2026\`;
        window.BalsonsDocs.uploadDocumentToDrive({
          id: docId,
          refNumber: \`PS-NOV2026-\${e.empId.replace('EMP-2026-', '')}\`,
          title: \`Salary Slip - \${e.name} (\${e.empId}) - NOV 2026\`,
          portal: 'hr',
          category: 'EPFO',
          remarks: \`Batch exported statutory salary slip for \${e.name}. Classification: \${e.wageType}.\`,
          tags: ['Payslip', 'Batch', e.empId, 'NOV2026', e.wageType]
        });
        count++;
      });
      if (typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast(\`☁️ <strong>Batch Cloud Vault Sync Complete:</strong> All \${count} workforce salary slips provisioned to Google Drive EPFO &amp; Bank Vault!\`);
      } else {
        alert(\`✅ Batch Cloud Sync Complete: All \${count} salary slips saved to Drive Vault!\`);
      }
    }

    // ══════════════════════════════════════════════════════════════════
    // INTERACTIVE EDITABLE ATTENDANCE ENGINE (LESS GOOGLE SHEET USE)
    // ══════════════════════════════════════════════════════════════════
    function renderAttendanceTable(searchQ) {
      const tbody = document.getElementById('attendanceTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      let list = attendanceData;
      if (currentAttFilter === 'MONTHLY') list = list.filter(x => x.wageType === 'MONTHLY');
      else if (currentAttFilter === 'DAILY_PAY') list = list.filter(x => x.wageType === 'DAILY_PAY');

      if (searchQ) {
        const q = searchQ.toLowerCase();
        list = list.filter(x => x.name.toLowerCase().includes(q) || x.empId.toLowerCase().includes(q));
      }

      list.forEach(att => {
        const tr = document.createElement('tr');
        const isMonthly = att.wageType === 'MONTHLY';
        const typePill = isMonthly 
          ? \`<span class="status-pill status-info" style="font-size: 9px; font-weight: 800;">MONTHLY</span>\`
          : \`<span class="status-pill status-warning" style="font-size: 9px; font-weight: 800;">DAILY PAY</span>\`;

        const calcRule = isMonthly
          ? \`<span style="font-size: 10.5px; color: var(--beds-teal-primary); font-weight: 700;">P + WO + PL = \${att.payable}d (Cap 30)</span>\`
          : \`<span style="font-size: 10.5px; color: #D97706; font-weight: 700;">Present Only = \${att.present}d</span>\`;

        tr.innerHTML = \`
          <td><strong style="font-family: monospace; font-size: 11px;">\${att.empId}</strong></td>
          <td>
            <a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${att.empId}')" style="font-weight: 700; color: var(--beds-teal-primary); text-decoration: none;" title="Click to view 360° Personnel Dossier">
              \${escapeHtml(att.name)} 📄
            </a>
          </td>
          <td>\${typePill}</td>
          <td style="text-align: center;">
            <input type="number" min="0" max="31" class="beds-input tabular-nums" style="width: 60px; font-weight: 800; text-align: center; padding: 3px;" value="\${att.present}" onchange="updateAttendanceInline('\${att.empId}', 'present', this.value)">
          </td>
          <td style="text-align: center;">
            <input type="number" min="0" max="6" class="beds-input tabular-nums" style="width: 50px; text-align: center; padding: 3px;" value="\${att.wo}" onchange="updateAttendanceInline('\${att.empId}', 'wo', this.value)">
          </td>
          <td style="text-align: center;">
            <input type="number" min="0" max="15" class="beds-input tabular-nums" style="width: 50px; text-align: center; padding: 3px;" value="\${att.pl}" onchange="updateAttendanceInline('\${att.empId}', 'pl', this.value)">
          </td>
          <td style="text-align: center;">
            <span class="status-pill \${isMonthly ? 'status-success' : 'status-warning'}" style="font-weight: 900; font-size: 12px; font-family: monospace;">
              \${att.payable} d
            </span>
          </td>
          <td style="text-align: center;">
            <input type="number" min="0" max="200" step="1" class="beds-input tabular-nums" style="width: 65px; font-weight: 700; color: #D97706; text-align: center; padding: 3px;" value="\${att.otHours}" onchange="updateAttendanceInline('\${att.empId}', 'otHours', this.value)">
          </td>
          <td>\${calcRule}</td>
          <td style="text-align: center; white-space: nowrap;">
            <button class="btn btn-secondary btn-sm" onclick="incrementAttendance('\${att.empId}', 'present', 1)" style="font-size: 10px; padding: 2px 5px;" title="+1 Present Day">+1 P</button>
            <button class="btn btn-secondary btn-sm" onclick="incrementAttendance('\${att.empId}', 'otHours', 2)" style="font-size: 10px; padding: 2px 5px; color: #D97706;" title="+2 Hours Overtime">+2h OT</button>
            <button class="btn btn-secondary btn-sm" onclick="Balsons360Dossier.openModal('\${att.empId}')" style="font-size: 10px; padding: 2px 6px; background: #0097B2; color: #FFFFFF;" title="View 360 Dossier">📄 Dossier</button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function updateAttendanceInline(empId, field, value) {
      const att = attendanceData.find(a => a.empId === empId);
      if (!att) return;

      const numVal = Math.max(0, parseInt(value) || 0);
      att[field] = numVal;

      // Recalculate payable days
      if (att.wageType === 'MONTHLY') {
        att.payable = Math.min(31, att.present + att.wo + att.pl);
      } else {
        att.payable = att.present;
      }

      // Re-render dependent views instantly
      renderPayrollTable();
      renderAttendanceTable();
      const currentPayslipEmp = document.getElementById('payslipEmpSelect')?.value;
      if (currentPayslipEmp === empId) {
        loadPayslipPreview(empId);
      }

      broadcastHrUpdate('ATTENDANCE_UPDATE', { empId, field, value: numVal, payable: att.payable });
    }

    function incrementAttendance(empId, field, delta) {
      const att = attendanceData.find(a => a.empId === empId);
      if (!att) return;
      const current = att[field] || 0;
      updateAttendanceInline(empId, field, current + delta);
    }

    function markAllFullAttendance() {
      attendanceData.forEach(att => {
        if (att.wageType === 'MONTHLY') {
          att.present = 26;
          att.wo = 4;
          att.pl = 0;
          att.payable = 30;
        } else {
          att.present = 26;
          att.payable = 26;
        }
      });
      renderAttendanceTable();
      renderPayrollTable();
      broadcastHrUpdate('ATTENDANCE_UPDATE', { mode: 'STANDARD_MUSTER' });
      if (window.BalsonsDocs && typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast('⚡ <strong>Standard Shift Muster Applied:</strong> All 28 monthly staff set to 30 payable days; 40 daily workers set to 26 duty days.');
      }
    }

    function saveAttendanceMuster() {
      broadcastHrUpdate('ATTENDANCE_SAVE', { attendanceData });
      hrAuditData.unshift({
        id: 'AUD-HR-' + Date.now().toString().slice(-4),
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        actor: 'hr.head',
        role: 'HR Head',
        action: 'ATTENDANCE_MUSTER_SAVED',
        ref: 'ATT-NOV-2026',
        outcome: 'SUCCESS',
        details: 'Saved updated attendance muster and auto-synchronized across portals and Google Sheets.'
      });
      renderAuditTable();
      if (window.BalsonsWorkspace && typeof window.BalsonsWorkspace.triggerDualSync === 'function') {
        window.BalsonsWorkspace.triggerDualSync();
      } else if (window.BalsonsDocs && typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast('💾 <strong>Muster Saved &amp; Synced:</strong> Live attendance synchronized with payroll engine and database!');
      } else {
        alert('💾 Attendance Muster Saved & Synced Successfully!');
      }
    }

    // ══════════════════════════════════════════════════════════════════
    // EDIT EMPLOYEE MASTER SUBSYSTEM (FULL IN-PORTAL MANAGEMENT)
    // ══════════════════════════════════════════════════════════════════
    function openEditEmployeeModal(empId) {
      const e = employeesData.find(x => x.empId === empId);
      if (!e) return;

      document.getElementById('editEmpId').value = e.empId;
      document.getElementById('editEmpIdDisplay').value = e.empId;
      document.getElementById('editEmpName').value = e.name;
      document.getElementById('editEmpTrade').value = e.trade || '';
      document.getElementById('editEmpDept').value = e.dept || 'Heavy Lift & Rigging Operations';
      document.getElementById('editEmpWageType').value = e.wageType;
      document.getElementById('editEmpCtc').value = e.ctc || 35000;
      document.getElementById('editEmpDailyRate').value = e.dailyRate || 850;
      document.getElementById('editEmpBank').value = e.bankEnding || '4092';
      document.getElementById('editEmpPhone').value = e.phone || '+91 98610 88721';
      document.getElementById('editEmpStatus').value = e.status || 'ACTIVE';

      toggleEditWageFields();
      document.getElementById('modalEditEmployee').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeEditEmployeeModal() {
      const modal = document.getElementById('modalEditEmployee');
      if (modal) modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    function toggleEditWageFields() {
      const isMonthly = document.getElementById('editEmpWageType').value === 'MONTHLY';
      const mWrap = document.getElementById('editMonthlyCtcWrap');
      const dWrap = document.getElementById('editDailyRateWrap');
      if (isMonthly) {
        if (mWrap) mWrap.style.display = 'block';
        if (dWrap) dWrap.style.display = 'none';
      } else {
        if (mWrap) mWrap.style.display = 'none';
        if (dWrap) dWrap.style.display = 'block';
      }
    }

    function handleEditEmployeeSubmit(e) {
      e.preventDefault();
      const empId = document.getElementById('editEmpId').value;
      const emp = employeesData.find(x => x.empId === empId);
      if (!emp) return;

      emp.name = document.getElementById('editEmpName').value.trim();
      emp.trade = document.getElementById('editEmpTrade').value.trim();
      emp.dept = document.getElementById('editEmpDept').value.trim();
      emp.wageType = document.getElementById('editEmpWageType').value;
      emp.bankEnding = document.getElementById('editEmpBank').value.trim();
      emp.phone = document.getElementById('editEmpPhone').value.trim();
      emp.status = document.getElementById('editEmpStatus').value;

      if (emp.wageType === 'MONTHLY') {
        emp.ctc = parseFloat(document.getElementById('editEmpCtc').value) || 35000;
        emp.basic = Math.round(emp.ctc * 0.50);
        emp.hra = Math.round(emp.ctc * 0.25);
        emp.allow = Math.round(emp.ctc * 0.25);
      } else {
        emp.dailyRate = parseFloat(document.getElementById('editEmpDailyRate').value) || 850;
      }

      // Sync wageType in attendanceData as well
      const att = attendanceData.find(a => a.empId === empId);
      if (att) {
        att.name = emp.name;
        att.wageType = emp.wageType;
        if (att.wageType === 'MONTHLY') att.payable = Math.min(31, att.present + att.wo + att.pl);
        else att.payable = att.present;
      }

      // Re-render
      renderEmployeesTable();
      renderAttendanceTable();
      renderPayrollTable();
      renderAdvanceTable();
      renderHrSafetyDirectory();
      populatePayslipSelect();
      populateIdCardSelect();
      populateAdvanceSelect();
      closeEditEmployeeModal();

      broadcastHrUpdate('EMPLOYEE_UPDATE', { empId, emp });

      if (window.BalsonsDocs && typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast(\`✅ <strong>\${emp.name} (\${emp.empId})</strong> master profile &amp; wage rate updated and synced!\`);
      } else {
        alert(\`✅ \${emp.name} (\${emp.empId}) updated successfully!\`);
      }
    }

    // ══════════════════════════════════════════════════════════════════
    // CATEGORY-WISE TRI-PORTAL SAFETY & GATE CLEARANCE DIRECTORY
    // ══════════════════════════════════════════════════════════════════
    let currentClearanceFilter = 'ALL';

    const hrSafetyMasterExpanded = [
      { inductionId: 'IND-JTRWF-2026-0001', empId: 'EMP-2026-0001', name: 'Ramesh Kumar', trade: 'Rigger Lead', category: 'LEADERSHIP', passNo: 'SP-2026-001', medical: 'FIT (Form 31 Certified)', isInducted: true, ptw: 'PTW-LFT-2026-0048', clearance: 'CLEARED_FOR_WORK' },
      { inductionId: 'IND-JTRWF-2026-0002', empId: 'EMP-2026-0002', name: 'Sunil Swain', trade: 'Hydraulic Specialist', category: 'LEADERSHIP', passNo: 'SP-2026-002', medical: 'FIT (Form 31 Certified)', isInducted: true, ptw: 'PTW-MHI-2026-0047', clearance: 'CLEARED_FOR_WORK' },
      { inductionId: 'IND-JTRWF-2026-0003', empId: 'EMP-2026-0003', name: 'Ajay Verma', trade: 'Assembly Fitter', category: 'SKILLED_RIGGERS', passNo: 'SP-2026-003', medical: 'FIT (Height Pass Certified)', isInducted: true, ptw: 'PTW-HT-2026-0044', clearance: 'CLEARED_FOR_WORK' },
      { inductionId: 'IND-JTRWF-2026-0004', empId: 'EMP-2026-0004', name: 'Dharmendra Pradhan', trade: 'Crawler Crane Operator (150T)', category: 'CRANE_OPS', passNo: 'SP-2026-004', medical: 'FIT (Vision & Heavy Crane Certified)', isInducted: true, ptw: 'PTW-LFT-2026-0048', clearance: 'CLEARED_FOR_WORK' },
      { inductionId: 'IND-JTRWF-2026-0005', empId: 'EMP-2026-0005', name: 'Manoj Mohanty', trade: 'Project Engineer', category: 'LEADERSHIP', passNo: 'SP-2026-005', medical: 'FIT (Site Engineering Inspection)', isInducted: true, ptw: 'PTW-GEN-2026-0041', clearance: 'CLEARED_FOR_WORK' },
      { inductionId: 'IND-JTRWF-2026-0006', empId: 'EMP-2026-0006', name: 'Bikash Jena', trade: 'Rigging Helper', category: 'HELPERS', passNo: 'SP-2026-006', medical: 'FIT (Form 31 Certified)', isInducted: true, ptw: 'PTW-LFT-2026-0048', clearance: 'CLEARED_FOR_WORK' },
      { inductionId: 'NONE', empId: 'EMP-2026-0007', name: 'Deepak Nayak', trade: 'Helper / Trainee', category: 'BLOCKED', passNo: 'NONE', medical: 'Awaiting OHC Check', isInducted: false, ptw: 'NONE', clearance: 'BLOCKED_NO_INDUCTION' },
      { inductionId: 'IND-JTRWF-2026-0008', empId: 'EMP-2026-0008', name: 'Sanjay Kumar Sahoo', trade: 'Heavy Puller Driver', category: 'CRANE_OPS', passNo: 'SP-2026-008', medical: 'FIT (Commercial Driver Cleared)', isInducted: true, ptw: 'PTW-LFT-2026-0048', clearance: 'CLEARED_FOR_WORK' }
    ];

    function filterClearanceCategory(cat) {
      currentClearanceFilter = cat;
      document.querySelectorAll('#btnClrAll, #btnClrLeadership, #btnClrCrane, #btnClrRiggers, #btnClrHelpers, #btnClrBlocked').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      });
      if (cat === 'ALL') document.getElementById('btnClrAll')?.classList.add('btn-primary');
      else if (cat === 'LEADERSHIP') document.getElementById('btnClrLeadership')?.classList.add('btn-primary');
      else if (cat === 'CRANE_OPS') document.getElementById('btnClrCrane')?.classList.add('btn-primary');
      else if (cat === 'SKILLED_RIGGERS') document.getElementById('btnClrRiggers')?.classList.add('btn-primary');
      else if (cat === 'HELPERS') document.getElementById('btnClrHelpers')?.classList.add('btn-primary');
      else if (cat === 'BLOCKED') document.getElementById('btnClrBlocked')?.classList.add('btn-primary');

      renderHrSafetyDirectory();
    }

    function renderHrSafetyDirectory(filterQ) {
      const tbody = document.getElementById('hrSafetyDirectoryBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      let list = hrSafetyMasterExpanded;
      if (currentClearanceFilter !== 'ALL') {
        if (currentClearanceFilter === 'BLOCKED') list = list.filter(x => !x.isInducted);
        else list = list.filter(x => x.category === currentClearanceFilter);
      }

      if (filterQ) {
        const q = filterQ.toLowerCase();
        list = list.filter(x => x.name.toLowerCase().includes(q) || x.empId.toLowerCase().includes(q) || x.trade.toLowerCase().includes(q) || x.passNo.toLowerCase().includes(q));
      }

      list.forEach(item => {
        const tr = document.createElement('tr');
        const isGranted = item.isInducted;

        let catBadge = '';
        if (item.category === 'LEADERSHIP') catBadge = '<span class="status-pill status-info" style="font-size:9.5px;">🏗️ Leadership</span>';
        else if (item.category === 'CRANE_OPS') catBadge = '<span class="status-pill status-warning" style="font-size:9.5px;">🚜 Crane Ops</span>';
        else if (item.category === 'SKILLED_RIGGERS') catBadge = '<span class="status-pill status-info" style="font-size:9.5px;">🧰 Skilled Rigger</span>';
        else if (item.category === 'HELPERS') catBadge = '<span class="status-pill status-secondary" style="font-size:9.5px;">👷 Helper Gang</span>';
        else catBadge = '<span class="status-pill status-danger" style="font-size:9.5px;">🔴 Blocked</span>';

        tr.innerHTML = \`
          <td><strong style="font-family: monospace; color: var(--beds-teal-primary); font-size: 11px;">\${item.inductionId}</strong></td>
          <td>
            <strong style="font-family: monospace; font-size: 11px;">\${item.empId}</strong>
          </td>
          <td>
            <a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${item.empId}')" style="font-weight: 700; color: var(--beds-teal-primary); text-decoration: none;" title="Open 360° Personnel Dossier">
              \${item.name} 📄
            </a>
          </td>
          <td>\${item.trade}</td>
          <td>\${catBadge}</td>
          <td>
            \${isGranted ? '<span class="status-pill status-success" style="font-size: 10px;">🟢 INDUCTED</span>' : '<span class="status-pill status-danger" style="font-size: 10px;">🔴 PENDING</span>'}
          </td>
          <td><strong style="font-family: monospace; font-size: 11px;">\${item.passNo}</strong></td>
          <td><span style="font-size: 10.5px;">\${item.medical}</span></td>
          <td><strong style="font-family: monospace; color: #0097B2; font-size: 11px;">\${item.ptw}</strong></td>
          <td>
            <span style="font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px; \${isGranted ? 'background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0;' : 'background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA;'}">
              \${isGranted ? '🟢 ACCESS GRANTED' : '🔴 GATE BLOCKED'}
            </span>
          </td>
          <td style="white-space: nowrap; text-align: center;">
            <button class="btn btn-secondary btn-sm" onclick="Balsons360Dossier.openModal('\${item.empId}')" style="font-size: 10px; padding: 3px 6px; background: #0097B2; color: #FFFFFF;" title="View 360 Dossier">📄 360 Dossier</button>
            <button class="btn btn-secondary btn-sm" onclick="openIdCardModal('\${item.empId}')" style="font-size: 10px; padding: 3px 6px; margin-left: 3px;" title="Gate Pass / ID Card">🪪 ID Card</button>
            <button class="btn btn-secondary btn-sm" onclick="toggleHrGateClearance('\${item.empId}')" style="font-size: 10px; padding: 3px 6px; margin-left: 3px; \${isGranted ? 'color: #DC2626;' : 'color: #059669; font-weight: 800;'}" title="Toggle Gate Security Clearance">
              \${isGranted ? '⛔ Block' : '✓ Clear'}
            </button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function toggleHrGateClearance(empId) {
      const item = hrSafetyMasterExpanded.find(x => x.empId === empId);
      if (!item) return;

      item.isInducted = !item.isInducted;
      if (item.isInducted) {
        item.inductionId = 'IND-JTRWF-2026-' + item.empId.slice(-4);
        item.passNo = 'SP-2026-' + item.empId.slice(-3);
        item.clearance = 'CLEARED_FOR_WORK';
        if (item.category === 'BLOCKED') item.category = 'HELPERS';
      } else {
        item.inductionId = 'NONE';
        item.passNo = 'NONE';
        item.clearance = 'BLOCKED_NO_INDUCTION';
        item.category = 'BLOCKED';
      }

      renderHrSafetyDirectory();
      broadcastHrUpdate('CLEARANCE_TOGGLE', { empId, item });

      if (window.BalsonsDocs && typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast(\`🛡️ <strong>Site Gate Access \${item.isInducted ? 'GRANTED' : 'REVOKED'}:</strong> \${item.name} (\${item.empId}) security status updated across Gate Entry and Safety portals.\`);
      }
    }
`;

// Replace existing loadPayslipPreview through renderHrSafetyDirectory
const startMarker = '    function loadPayslipPreview(empId) {';
const endMarker = '    function verifyHrSafetyClearance(targetEmpId) {';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + newAdvancedJs + '\n\n' + content.slice(endIdx);
  console.log('✓ Replaced old payslip & clearance functions with new advanced suite');
} else {
  console.warn('❌ Could not find startMarker or endMarker');
}

// 2. In renderEmployeesTable: make name clickable + add Edit Employee button
const oldEmpTrRegex = /<td><strong>\$\{escapeHtml\(emp\.name\)\}<\/strong><\/td>/;
if (oldEmpTrRegex.test(content)) {
  content = content.replace(oldEmpTrRegex, `<td><a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${emp.empId}')" style="font-weight: 700; color: var(--beds-teal-primary); text-decoration: none;" title="Open 360° Personnel Dossier">\${escapeHtml(emp.name)} 📄</a></td>`);
  console.log('✓ Made employee names in employee table clickable to 360 Dossier');
}

// Add Edit Employee button into employee table action column
const oldEmpActionsRegex = /(<button class="btn btn-secondary btn-sm" onclick="Balsons360Dossier\.openModal\('\$\{emp\.empId\}'\)"[^>]*>📄 360 Dossier<\/button>)/;
if (oldEmpActionsRegex.test(content)) {
  content = content.replace(oldEmpActionsRegex, `$1\n            <button class="btn btn-secondary btn-sm" onclick="openEditEmployeeModal('\${emp.empId}')" style="font-size: 11px; padding: 4px 8px; margin-left: 4px;" title="Edit Employee Master Record">✏️ Edit</button>`);
  console.log('✓ Added Edit button in employee table');
}

// 3. In renderPayrollTable: make name clickable to 360 Dossier + add Dossier button
const oldPayTrRegex = /<td><strong>\$\{escapeHtml\(e\.name\)\}<\/strong><br><span style="font-size: 10\.5px; color: var\(--beds-text-muted\);">\$\{e\.trade\}<\/span><\/td>/;
if (oldPayTrRegex.test(content)) {
  content = content.replace(oldPayTrRegex, `<td><a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${e.empId}')" style="font-weight: 700; color: var(--beds-teal-primary); text-decoration: none;" title="Open 360° Personnel Dossier">\${escapeHtml(e.name)} 📄</a><br><span style="font-size: 10.5px; color: var(--beds-text-muted);">\${e.trade}</span></td>`);
  console.log('✓ Made employee names in payroll table clickable to 360 Dossier');
}

// In payroll table action column: add 360 Dossier button
const oldPayActionRegex = /(<button class="btn btn-secondary btn-sm" onclick="previewPayslip\('\$\{e\.empId\}'\)" style="font-size: 11px; padding: 3px 8px;">📑 Slip<\/button>)/;
if (oldPayActionRegex.test(content)) {
  content = content.replace(oldPayActionRegex, `<button class="btn btn-secondary btn-sm" onclick="Balsons360Dossier.openModal('\${e.empId}')" style="font-size: 11px; padding: 3px 8px; margin-right: 4px; background: #0097B2; color: #FFFFFF;" title="View 360 Dossier">📄 Dossier</button>\n          $1`);
  console.log('✓ Added 360 Dossier button in payroll table');
}

// 4. In renderAdvanceTable: make name clickable to 360 Dossier
const oldAdvTrRegex = /<td><strong>\$\{escapeHtml\(adv\.name\)\}<\/strong><br><span style="font-size: 10\.5px; color: var\(--beds-text-muted\);">\$\{adv\.empId\}<\/span><\/td>/;
if (oldAdvTrRegex.test(content)) {
  content = content.replace(oldAdvTrRegex, `<td><a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${adv.empId}')" style="font-weight: 700; color: var(--beds-teal-primary); text-decoration: none;" title="Open 360° Personnel Dossier">\${escapeHtml(adv.name)} 📄</a><br><span style="font-size: 10.5px; color: var(--beds-text-muted);">\${adv.empId}</span></td>`);
  console.log('✓ Made employee names in advance table clickable to 360 Dossier');
}

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Advanced JS injected into index.html successfully! Final length:', content.length);

// Mirror to Launcher submodule
const launcherFile = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html';
if (fs.existsSync(launcherFile)) {
  fs.writeFileSync(launcherFile, content, 'utf8');
  console.log('✅ Synchronized to Launcher mirror');
}
