const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

// 1. Update onbPhotoSection with CRLF-safe regex
const onbPhotoRegex = /<strong style="font-size: 11\.5px; color: var\(--beds-charcoal-heading\);">📷 1\. Employee Photo<\/strong>[\s\S]*?<div style="font-size: 10px; color: var\(--beds-text-secondary\);" id="photoStatusText">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const newOnbPhotoSection = `<strong style="font-size: 11.5px; color: var(--beds-charcoal-heading);">📷 1. Employee Photo (35mm × 45mm)</strong>
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

if (onbPhotoRegex.test(html)) {
  html = html.replace(onbPhotoRegex, newOnbPhotoSection);
  console.log('✅ Updated onbPhotoSection with camera button');
} else {
  console.warn('⚠️ onbPhotoRegex did not match');
}

// 2. Update renderEmployeesTable to include avatar thumbnail
const oldEmpRowRegex = /tr\.innerHTML\s*=\s*`\s*<td><strong style="font-family: monospace;">\$\{emp\.empId\}<\/strong><\/td>\s*<td><a href="javascript:void\(0\)" onclick="Balsons360Dossier\.openModal\('\$\{emp\.empId\}'\)" style="font-weight: 700; color: var\(--beds-teal-primary\); text-decoration: none;" title="Open 360° Personnel Dossier">\$\{escapeHtml\(emp\.name\)\} 📄<\/a><\/td>/;

const newEmpRow = `tr.innerHTML = \`
          <td><strong style="font-family: monospace;">\${emp.empId}</strong></td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="\${emp.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" alt="\${escapeHtml(emp.name)}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--beds-teal-primary); flex-shrink: 0;" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'">
              <a href="javascript:void(0)" onclick="Balsons360Dossier.openModal('\${emp.empId}')" style="font-weight: 700; color: var(--beds-teal-primary); text-decoration: none;" title="Open 360° Personnel Dossier">\${escapeHtml(emp.name)} 📄</a>
            </div>
          </td>`;

if (oldEmpRowRegex.test(html)) {
  html = html.replace(oldEmpRowRegex, newEmpRow);
  console.log('✅ Updated renderEmployeesTable with photo avatar');
} else {
  console.warn('⚠️ oldEmpRowRegex did not match');
}

// 3. Update openEditEmployeeModal to load photo
const oldOpenEditRegex = /function openEditEmployeeModal\(empId\)\s*\{[\s\S]*?toggleEditWageFields\(\);/;

const newOpenEdit = `function openEditEmployeeModal(empId) {
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

      // Load Employee Photo into editor
      const photoImg = document.getElementById('editEmpPhotoImg');
      if (photoImg) {
        photoImg.src = e.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
      }
      const photoStatus = document.getElementById('editPhotoStatus');
      if (photoStatus) photoStatus.textContent = 'Active profile photo loaded';
      const photoBadge = document.getElementById('editPhotoBadge');
      if (photoBadge) {
        photoBadge.textContent = 'ACTIVE IDENTITY';
        photoBadge.className = 'status-pill status-info';
      }

      toggleEditWageFields();`;

if (oldOpenEditRegex.test(html)) {
  html = html.replace(oldOpenEditRegex, newOpenEdit);
  console.log('✅ Updated openEditEmployeeModal with photo population');
} else {
  console.warn('⚠️ oldOpenEditRegex did not match');
}

// 4. Update handleEditEmployeeSubmit to persist photo, sync with Drive KYC and update 360 directory
const oldEditSubmitRegex = /function handleEditEmployeeSubmit\(e\)\s*\{[\s\S]*?alert\(`✅ Employee Record for \$\{emp\.name\} \(\$\{empId\}\) Updated Successfully![\s\S]*?`\);\s*\}/;

const newEditSubmit = `function handleEditEmployeeSubmit(e) {
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

      // Handle Updated Photo
      const photoEl = document.getElementById('editEmpPhotoImg');
      if (photoEl && photoEl.src) {
        emp.photo = photoEl.src;
        try {
          const photos = JSON.parse(localStorage.getItem('BALSONS_EMPLOYEE_PHOTOS') || '{}');
          photos[empId] = emp.photo;
          if (emp.aadhaar) photos[emp.aadhaar] = emp.photo;
          localStorage.setItem('BALSONS_EMPLOYEE_PHOTOS', JSON.stringify(photos));
        } catch(err) {}

        // Auto-sync photo document into Google Drive KYC folder (1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV)
        if (window.BalsonsDocs && typeof BalsonsDocs.uploadDocumentToDrive === 'function') {
          BalsonsDocs.uploadDocumentToDrive({
            id: 'DOC-PHOTO-' + empId.replace('EMP-2026-', ''),
            refNumber: empId,
            title: 'Updated Passport Photo - ' + emp.name + ' (' + empId + ')',
            portal: 'hr',
            category: 'KYC',
            categoryName: 'AADHAAR_AND_PAN_CARDS / PHOTOS',
            empId: empId,
            empName: emp.name,
            fileSize: '240 KB',
            type: 'IMAGE',
            driveFolderId: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV'
          });
        }
      }

      if (emp.wageType === 'MONTHLY') {
        emp.ctc = parseFloat(document.getElementById('editEmpCtc').value) || 35000;
        emp.basic = Math.round(emp.ctc * 0.50);
        emp.hra = Math.round(emp.ctc * 0.25);
        emp.allow = Math.round(emp.ctc * 0.25);
      } else {
        emp.dailyRate = parseFloat(document.getElementById('editEmpDailyRate').value) || 850;
      }

      const att = attendanceData.find(a => a.empId === empId);
      if (att) {
        att.name = emp.name;
        att.wageType = emp.wageType;
        if (att.wageType === 'MONTHLY') att.payable = Math.min(31, att.present + att.wo + att.pl);
        else att.payable = att.present;
      }

      // Update 360 directory record as well
      if (window.WORKFORCE_360_DIRECTORY) {
        const d360 = window.WORKFORCE_360_DIRECTORY.find(x => x.empId === empId);
        if (d360) {
          d360.name = emp.name;
          d360.trade = emp.trade;
          d360.dept = emp.dept;
          if (emp.photo) d360.photo = emp.photo;
        }
      }

      renderEmployeesTable();
      renderAttendanceTable();
      renderPayrollTable();
      renderAdvanceTable();
      renderHrSafetyDirectory();
      populatePayslipSelect();
      populateIdCardSelect();
      closeEditEmployeeModal();

      broadcastHrUpdate('EMPLOYEE_UPDATE', emp);

      alert(\`✅ Employee Record & Photo for \${emp.name} (\${empId}) Updated Successfully!\\n\\nMuster days, payroll, 360° dossier and gate identity badges synchronized.\`);
    }`;

if (oldEditSubmitRegex.test(html)) {
  html = html.replace(oldEditSubmitRegex, newEditSubmit);
  console.log('✅ Updated handleEditEmployeeSubmit with photo persistence and drive sync');
} else {
  console.warn('⚠️ oldEditSubmitRegex did not match');
}

// 5. Update handleOnboardSubmit to save photo to localStorage and Google Drive KYC folder
const oldOnboardSubmitEndRegex = /employeesData\.unshift\(newEmp\);[\s\S]*?if \(autoOpenIdCard\)/;

const newOnboardSubmitEnd = `// Save photo to localStorage BALSONS_EMPLOYEE_PHOTOS
      try {
        const photos = JSON.parse(localStorage.getItem('BALSONS_EMPLOYEE_PHOTOS') || '{}');
        photos[newId] = photoSrc;
        if (aadhaar) photos[aadhaar] = photoSrc;
        if (mobile) photos[mobile] = photoSrc;
        localStorage.setItem('BALSONS_EMPLOYEE_PHOTOS', JSON.stringify(photos));
      } catch(err) {}

      // Auto-sync photo document into Google Drive KYC folder (1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV)
      if (window.BalsonsDocs && typeof BalsonsDocs.uploadDocumentToDrive === 'function') {
        BalsonsDocs.uploadDocumentToDrive({
          id: 'DOC-PHOTO-' + newId.replace('EMP-2026-', ''),
          refNumber: newId,
          title: 'Passport Photo - ' + name + ' (' + newId + ')',
          portal: 'hr',
          category: 'KYC',
          categoryName: 'AADHAAR_AND_PAN_CARDS / PHOTOS',
          empId: newId,
          empName: name,
          fileSize: '240 KB',
          type: 'IMAGE',
          driveFolderId: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV'
        });
      }

      // Add to WORKFORCE_360_DIRECTORY so instant dossier view displays new employee
      if (window.WORKFORCE_360_DIRECTORY) {
        window.WORKFORCE_360_DIRECTORY.unshift({
          empId: newId,
          name: name,
          photo: photoSrc,
          trade: trade,
          dept: dept,
          project: project,
          bloodGroup: bloodGroup,
          wageType: wageType,
          isInducted: true,
          gateAccessStatus: 'ACTIVE',
          aadhaar: aadhaar,
          pan: pan,
          policeNo: police
        });
      }

      employeesData.unshift(newEmp);
      attendanceData.unshift({
        empId: newId,
        name: name,
        wageType: wageType,
        trade: trade,
        present: 26,
        wo: 4,
        pl: 0,
        payable: (wageType === 'MONTHLY' ? 30 : 26),
        otHours: 0
      });

      // Log in Audit Trail
      hrAuditData.unshift({
        time: 'Just now',
        actor: BalsonsHrAuth.getUser().fullName || 'HR Head',
        role: 'HR Head',
        action: 'ONBOARD_DETAILED_RECORD',
        ref: newId,
        outcome: 'SUCCESS',
        details: \`Registered \${name} [\${wageType}] with Photo, PAN, Aadhaar, Police, and Medical verification documents\`
      });

      renderEmployeesTable();
      renderAttendanceTable();
      renderPayrollTable();
      renderAuditTable();
      populatePayslipSelect();
      populateIdCardSelect();
      closeOnboardModal();

      broadcastHrUpdate('EMPLOYEE_ONBOARD', newEmp);

      if (autoOpenIdCard)`;

if (oldOnboardSubmitEndRegex.test(html)) {
  html = html.replace(oldOnboardSubmitEndRegex, newOnboardSubmitEnd);
  console.log('✅ Updated handleOnboardSubmit with photo persistence and drive sync');
} else {
  console.warn('⚠️ oldOnboardSubmitEndRegex did not match');
}

// 6. Add Helper functions for Webcam & Edit Photo upload
const additionalJs = `
    // ─── PHOTO UPLOAD & WEBCAM CAPTURE CONTROLS ───
    let hrWebcamStream = null;
    let hrWebcamTarget = 'onboard'; // 'onboard' or 'edit'

    function handleEditPhotoSelect(e) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('Photo size exceeds 5MB limit: ' + file.name);
          return;
        }
        const reader = new FileReader();
        reader.onload = function(evt) {
          const img = document.getElementById('editEmpPhotoImg');
          if (img) img.src = evt.target.result;
          const status = document.getElementById('editPhotoStatus');
          if (status) status.textContent = \`\${file.name} (\${Math.round(file.size/1024)} KB) • Photo Attached ✓\`;
          const badge = document.getElementById('editPhotoBadge');
          if (badge) {
            badge.textContent = 'UPDATED ✓';
            badge.className = 'status-pill status-success';
          }
        };
        reader.readAsDataURL(file);
      }
    }

    function triggerWebcamForOnboard() {
      hrWebcamTarget = 'onboard';
      openWebcamModal();
    }

    function triggerWebcamForEdit() {
      hrWebcamTarget = 'edit';
      openWebcamModal();
    }

    function openWebcamModal() {
      const modal = document.getElementById('modalWebcamCapture');
      if (!modal) return;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      const video = document.getElementById('hrWebcamVideo');
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } })
          .then(stream => {
            hrWebcamStream = stream;
            video.srcObject = stream;
            video.play();
          })
          .catch(err => {
            console.warn('[Webcam] Camera access error:', err);
            alert('Live camera access is unavailable or blocked in this browser. Please use the "Choose Photo..." button to upload an image file.');
            closeWebcamModal();
          });
      } else {
        alert('Webcam API is not supported in this browser. Please upload an image file.');
        closeWebcamModal();
      }
    }

    function captureWebcamPhoto() {
      const video = document.getElementById('hrWebcamVideo');
      const canvas = document.getElementById('hrWebcamCanvas');
      if (!video || !canvas) return;

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

      if (hrWebcamTarget === 'onboard') {
        const img = document.getElementById('onbPhotoImg');
        if (img) img.src = dataUrl;
        const status = document.getElementById('photoStatusText');
        if (status) status.textContent = 'Live camera photo captured (Webcam 0.92 JPEG) ✓';
        const badge = document.getElementById('badgePhoto');
        if (badge) {
          badge.textContent = 'ATTACHED ✓';
          badge.className = 'status-pill status-success';
        }
      } else if (hrWebcamTarget === 'edit') {
        const img = document.getElementById('editEmpPhotoImg');
        if (img) img.src = dataUrl;
        const status = document.getElementById('editPhotoStatus');
        if (status) status.textContent = 'Live camera photo captured ✓';
        const badge = document.getElementById('editPhotoBadge');
        if (badge) {
          badge.textContent = 'CAMERA CAPTURED ✓';
          badge.className = 'status-pill status-success';
        }
      }

      closeWebcamModal();
    }

    function closeWebcamModal() {
      const modal = document.getElementById('modalWebcamCapture');
      if (modal) modal.style.display = 'none';
      document.body.style.overflow = '';
      if (hrWebcamStream) {
        hrWebcamStream.getTracks().forEach(track => track.stop());
        hrWebcamStream = null;
      }
    }
`;

if (!html.includes('triggerWebcamForOnboard')) {
  html = html.replace('</script>\n</body>', additionalJs + '\n</script>\n</body>');
  console.log('✅ Injected Webcam and Photo functions into index.html');
}

fs.writeFileSync('BALSONS HR MANAGER/frontend/index.html', html, 'utf8');
console.log('Successfully wrote all index.html updates.');
