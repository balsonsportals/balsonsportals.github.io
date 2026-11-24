const fs = require('fs');

const file = 'BALSONS HR MANAGER/frontend/index.html';
let content = fs.readFileSync(file, 'utf8');

const oldPrint = `    @media print {
      body * { visibility: hidden; }
      #printablePayslip, #printablePayslip * { visibility: visible; }
      #printablePayslip {
        position: absolute;
        left: 0; top: 0; width: 100%;
        border: none; box-shadow: none; padding: 0; margin: 0;
      }
    }`;

const newPrint = `    /* Unified BEDS Statutory Print Engine */
    @media print {
      @page {
        size: A4 portrait;
        margin: 8mm 10mm;
      }
      body * {
        visibility: hidden;
      }
      
      /* Print Case 1: ID Card Badge */
      body.printing-idcard #printableIdCardContainer,
      body.printing-idcard #printableIdCardContainer * {
        visibility: visible !important;
      }
      body.printing-idcard #printableIdCardContainer {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        display: flex !important;
        justify-content: center;
        gap: 15mm;
        padding-top: 15mm;
      }

      /* Print Case 2: Full Filled Enrolment Dossier */
      body.printing-enrolment #printableEnrolmentDossier,
      body.printing-enrolment #printableEnrolmentDossier * {
        visibility: visible !important;
      }
      body.printing-enrolment #printableEnrolmentDossier {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        max-width: 190mm;
        margin: 0 auto;
        box-shadow: none !important;
      }

      /* Print Case 3: Payslips */
      body.printing-payslip #printablePayslip,
      body.printing-payslip #printablePayslip *,
      body:not(.printing-idcard):not(.printing-enrolment) #printablePayslip,
      body:not(.printing-idcard):not(.printing-enrolment) #printablePayslip * {
        visibility: visible !important;
      }
      body.printing-payslip #printablePayslip,
      body:not(.printing-idcard):not(.printing-enrolment) #printablePayslip {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
      }
    }`;

const regex = /@media print\s*\{[\r\n\s]*body\s*\*[\s\S]*?#printablePayslip\s*\{[\s\S]*?margin:\s*0;\s*\}\s*\}/;

if (regex.test(content)) {
  content = content.replace(regex, newPrint.trim());
  fs.writeFileSync(file, content, 'utf8');
  console.log('✅ Updated print CSS cleanly!');
  
  const launcherFile = 'BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html';
  if (fs.existsSync(launcherFile)) {
    fs.writeFileSync(launcherFile, content, 'utf8');
    console.log('✅ Synchronized to launcher mirror');
  }
} else {
  console.log('❌ Could not match regex');
}
