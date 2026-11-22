const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const targetRegex = /function handleEditEmployeeSubmit\(e\)\s*\{[\s\S]*?alert\(`✅ \$\{emp\.name\} \(\$\{emp\.empId\}\) updated successfully!\`\);\s*\}\s*\}/;

const replacement = `function handleEditEmployeeSubmit(e) {
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

      // Handle Updated Employee Passport Photo
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
      populateAdvanceSelect();
      closeEditEmployeeModal();

      broadcastHrUpdate('EMPLOYEE_UPDATE', { empId, emp });

      if (window.BalsonsDocs && typeof window.BalsonsDocs.showToast === 'function') {
        window.BalsonsDocs.showToast(\`✅ <strong>\${emp.name} (\${emp.empId})</strong> master profile, photo &amp; wage rate updated and synced!\`);
      } else {
        alert(\`✅ \${emp.name} (\${emp.empId}) updated successfully!\`);
      }
    }`;

if (!targetRegex.test(html)) {
  console.error('Target regex did not match!');
  process.exit(1);
}

html = html.replace(targetRegex, replacement);
fs.writeFileSync('BALSONS HR MANAGER/frontend/index.html', html, 'utf8');
console.log('✅ Successfully updated handleEditEmployeeSubmit with photo handling!');
