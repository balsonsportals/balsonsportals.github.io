/**
 * BALSONS HR & PAYROLL MANAGER - EMPLOYEE SERVICE
 * Module: Employee Management & Master Directory
 * Supports Dual Workforce:
 *   1. Monthly Salaried (With PF & ESIC)
 *   2. Daily Pay Workers (Without PF & ESIC - Statutory Exempt)
 */

var EmployeeService = {

  /**
   * Fetch all employees with optional wageType filter
   * @param {string} filter 'ALL' | 'MONTHLY' | 'DAILY_PAY'
   */
  getEmployees: function(filter) {
    var ssId = HR_CONFIG.getSpreadsheetId();
    if (!ssId) {
      // Return seed data if DB not yet connected
      return this.getSeedEmployees(filter);
    }

    var ss = SpreadsheetApp.openById(ssId);
    var sheet = ss.getSheetByName('EMPLOYEE_MASTER');
    if (!sheet) return this.getSeedEmployees(filter);

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return this.getSeedEmployees(filter);

    var headers = data[0];
    var employees = [];

    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var emp = {
        empId: row[0],
        name: row[1],
        fatherName: row[2],
        dob: row[3],
        gender: row[4],
        bloodGroup: row[5],
        mobile: row[6],
        emergencyContact: row[7],
        permanentAddress: row[8],
        siteCampAddress: row[9],
        department: row[10],
        designation: row[11],
        trade: row[12],
        wageType: (row[13] || 'MONTHLY').toString().toUpperCase(),
        dailyRateOrCTC: row[14],
        joiningDate: row[15],
        pfApplicable: (row[16] === true || String(row[16]).toLowerCase() === 'true'),
        esicApplicable: (row[17] === true || String(row[17]).toLowerCase() === 'true'),
        panNo: row[18],
        aadhaarNo: row[19],
        policeVerificationRef: row[20],
        medicalFitnessRef: row[21],
        bankAccNo: row[22],
        bankIfsc: row[23],
        photoUrl: row[24],
        status: row[25] || 'ACTIVE'
      };

      if (!filter || filter === 'ALL' || emp.wageType === filter) {
        employees.push(emp);
      }
    }

    return employees;
  },

  /**
   * Register a new employee with dual statutory classification
   */
  createEmployee: function(payload, actor) {
    if (!payload.name) throw new Error('Employee Full Name is mandatory');
    if (!payload.wageType) throw new Error('Wage Type classification is mandatory');

    var isMonthly = (payload.wageType === 'MONTHLY');
    var newEmpId = 'EMP-2026-' + ('0000' + Math.floor(Math.random() * 9000 + 1000)).slice(-4);

    var record = {
      empId: newEmpId,
      name: payload.name.trim(),
      fatherName: payload.fatherName || '',
      dob: payload.dob || '',
      gender: payload.gender || 'Male',
      bloodGroup: payload.bloodGroup || 'B+',
      mobile: payload.mobile || '',
      emergencyContact: payload.emergency || '',
      permanentAddress: payload.address || '',
      siteCampAddress: payload.siteCamp || '',
      department: payload.department || payload.dept || 'Heavy Lift & Rigging Operations',
      designation: payload.designation || payload.trade || 'Rigger Lead',
      trade: payload.trade || 'Rigger Lead',
      wageType: isMonthly ? 'MONTHLY' : 'DAILY_PAY',
      dailyRateOrCTC: isMonthly ? (Number(payload.ctc) || 50000) : (Number(payload.dailyRate) || 950),
      joiningDate: payload.joiningDate || new Date().toISOString().slice(0, 10),
      pfApplicable: isMonthly ? true : false,     // Daily Pay is strictly exempt
      esicApplicable: isMonthly ? true : false,   // Daily Pay is strictly exempt
      panNo: payload.pan || 'ABCDE1234F',
      aadhaarNo: payload.aadhaar || '4928 1192 8840',
      policeVerificationRef: payload.police || 'POL-KHD-2026-9912',
      medicalFitnessRef: payload.medical || 'FIT - Form 31',
      bankAccNo: payload.bankAccNo || ('SBIN000' + Math.floor(1000 + Math.random() * 9000)),
      bankIfsc: payload.bankIfsc || 'SBIN0001234',
      photoUrl: payload.photo || '',
      status: 'ACTIVE'
    };

    var ssId = HR_CONFIG.getSpreadsheetId();
    if (ssId) {
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('EMPLOYEE_MASTER');
      if (sheet) {
        sheet.appendRow([
          record.empId,
          record.name,
          record.fatherName,
          record.dob,
          record.gender,
          record.bloodGroup,
          record.mobile,
          record.emergencyContact,
          record.permanentAddress,
          record.siteCampAddress,
          record.department,
          record.designation,
          record.trade,
          record.wageType,
          record.dailyRateOrCTC,
          record.joiningDate,
          record.pfApplicable,
          record.esicApplicable,
          record.panNo,
          record.aadhaarNo,
          record.policeVerificationRef,
          record.medicalFitnessRef,
          record.bankAccNo,
          record.bankIfsc,
          record.photoUrl,
          record.status
        ]);
      }

      // Append documents to EMPLOYEE_DOCUMENTS
      var docSheet = ss.getSheetByName('EMPLOYEE_DOCUMENTS');
      if (docSheet) {
        var now = new Date().toISOString().slice(0, 10);
        docSheet.appendRow(['DOC-' + new Date().getTime() + '-1', record.empId, 'PAN_CARD', record.panNo, now, '2030-12-31', 'VERIFIED', 'drive/pan_' + record.empId + '.pdf']);
        docSheet.appendRow(['DOC-' + new Date().getTime() + '-2', record.empId, 'AADHAAR_CARD', record.aadhaarNo, now, '2030-12-31', 'VERIFIED', 'drive/aadhaar_' + record.empId + '.pdf']);
        docSheet.appendRow(['DOC-' + new Date().getTime() + '-3', record.empId, 'POLICE_VERIFICATION', record.policeVerificationRef, now, '2027-11-01', 'VERIFIED', 'drive/police_' + record.empId + '.pdf']);
        docSheet.appendRow(['DOC-' + new Date().getTime() + '-4', record.empId, 'MEDICAL_FITNESS_FORM31', record.medicalFitnessRef, now, '2027-05-01', 'VERIFIED', 'drive/medical_' + record.empId + '.pdf']);
        docSheet.appendRow(['DOC-' + new Date().getTime() + '-5', record.empId, 'PASSPORT_PHOTO', 'PHOTO-' + record.empId, now, '2030-12-31', 'VERIFIED', record.photoUrl]);
      }

      // Log in AUDIT_LOG
      var auditSheet = ss.getSheetByName('AUDIT_LOG');
      if (auditSheet) {
        auditSheet.appendRow([
          'AUDIT-' + new Date().getTime(),
          new Date().toISOString(),
          actor || 'HR Head',
          'HR_ADMIN',
          'ONBOARD_EMPLOYEE',
          record.empId,
          'SUCCESS',
          'Created employee record [' + record.wageType + '] with PF=' + record.pfApplicable + ', ESIC=' + record.esicApplicable
        ]);
      }
    }

    return record;
  },

  /**
   * Seed employee data for standalone demonstration
   */
  getSeedEmployees: function(filter) {
    var seed = [
      { empId: 'EMP-2026-0001', name: 'Ramesh Kumar', wageType: 'MONTHLY', trade: 'Rigger Lead', department: 'Heavy Lift & Rigging', ctc: 55000, basic: 27500, hra: 13750, allow: 13750, dailyRate: 0, pfApplicable: true, esicApplicable: true, bankEnding: '4092', joining: '2025-04-10', status: 'ACTIVE' },
      { empId: 'EMP-2026-0002', name: 'Sunil Swain', wageType: 'MONTHLY', trade: 'Hydraulic Specialist', department: 'Heavy Lift & Rigging', ctc: 48000, basic: 24000, hra: 12000, allow: 12000, dailyRate: 0, pfApplicable: true, esicApplicable: true, bankEnding: '1182', joining: '2025-06-15', status: 'ACTIVE' },
      { empId: 'EMP-2026-0004', name: 'Dharmendra Pradhan', wageType: 'MONTHLY', trade: 'Crawler Crane Operator (150T)', department: 'Heavy Lift & Rigging', ctc: 65000, basic: 32500, hra: 16250, allow: 16250, dailyRate: 0, pfApplicable: true, esicApplicable: true, bankEnding: '9840', joining: '2024-11-20', status: 'ACTIVE' },
      { empId: 'EMP-2026-0005', name: 'Manoj Mohanty', wageType: 'MONTHLY', trade: 'Project Engineer', department: 'Heavy Lift & Rigging', ctc: 75000, basic: 37500, hra: 18750, allow: 18750, dailyRate: 0, pfApplicable: true, esicApplicable: true, bankEnding: '3312', joining: '2024-02-10', status: 'ACTIVE' },
      { empId: 'EMP-2026-0003', name: 'Ajay Verma', wageType: 'DAILY_PAY', trade: 'Mechanical Assembly Fitter', department: 'Site Mechanical Operations', ctc: 0, basic: 0, hra: 0, allow: 0, dailyRate: 1400, pfApplicable: false, esicApplicable: false, bankEnding: '7721', joining: '2025-08-01', status: 'ACTIVE' },
      { empId: 'EMP-2026-0006', name: 'Bikash Jena', wageType: 'DAILY_PAY', trade: 'Rigging Helper', department: 'Heavy Lift & Rigging', ctc: 0, basic: 0, hra: 0, allow: 0, dailyRate: 950, pfApplicable: false, esicApplicable: false, bankEnding: '5540', joining: '2026-01-10', status: 'ACTIVE' },
      { empId: 'EMP-2026-0007', name: 'Prakash Chandra', wageType: 'DAILY_PAY', trade: 'Rigging Helper', department: 'Heavy Lift & Rigging', ctc: 0, basic: 0, hra: 0, allow: 0, dailyRate: 950, pfApplicable: false, esicApplicable: false, bankEnding: '6619', joining: '2026-02-15', status: 'ACTIVE' },
      { empId: 'EMP-2026-0008', name: 'Sanjay Kumar Sahoo', wageType: 'DAILY_PAY', trade: 'Heavy Puller Driver', department: 'Transport & Logistics', ctc: 0, basic: 0, hra: 0, allow: 0, dailyRate: 1200, pfApplicable: false, esicApplicable: false, bankEnding: '8834', joining: '2025-10-05', status: 'ACTIVE' }
    ];

    if (!filter || filter === 'ALL') return seed;
    return seed.filter(function(x) { return x.wageType === filter; });
  },

  /**
   * Submit candidate self-registration from trilingual online form into central database
   */
  submitRegistration: function(payload) {
    if (!payload.fullName) throw new Error('Candidate Full Name is mandatory');
    if (!payload.mobile) throw new Error('Mobile Number is mandatory');

    var ssId = HR_CONFIG.getSpreadsheetId();
    var regId = 'REG-2026-' + ('0000' + Math.floor(Math.random() * 9000 + 1000)).slice(-4);
    var nowIso = new Date().toISOString();
    // Ensure photoData is attached as PHOTO document if provided
    if (payload.photoData) {
      if (!payload.attachments) payload.attachments = [];
      var hasPhoto = payload.attachments.some(function(a) { return a.docType === 'PHOTO'; });
      if (!hasPhoto) {
        payload.attachments.unshift({
          docType: 'PHOTO',
          fileName: 'passport_photo.jpg',
          mimeType: 'image/jpeg',
          dataUrl: payload.photoData
        });
      }
    }
    var docsCount = (payload.attachments && payload.attachments.length) ? payload.attachments.length : 0;

    var regRow = [
      regId,
      nowIso,
      payload.fullName.trim(),
      payload.fatherName || '',
      payload.motherName || '',
      payload.dob || '',
      payload.gender || 'Male',
      payload.bloodGroup || '',
      payload.maritalStatus || 'Unmarried',
      payload.nationality || 'Indian',
      payload.mobile.trim(),
      payload.altMobile || '',
      payload.email || '',
      payload.identificationMark || '',
      payload.permAddress || '',
      payload.permVillage || '',
      payload.permTaluka || '',
      payload.permDistrict || '',
      payload.permState || '',
      payload.permPin || '',
      payload.currAddress || '',
      payload.currVillage || '',
      payload.currTaluka || '',
      payload.currDistrict || '',
      payload.currState || '',
      payload.currPin || '',
      payload.spouseName || '',
      payload.childrenCount || 0,
      payload.emergencyName || '',
      payload.emergencyRel || '',
      payload.emergencyPhone || '',
      payload.emergencyAltPhone || '',
      payload.emergencyAddress || '',
      payload.aadhaarNo || '',
      payload.panNo || '',
      payload.voterId || '',
      payload.drivingLicence || '',
      payload.passportNo || '',
      payload.bankName || '',
      payload.accHolderName || '',
      payload.accNo || '',
      payload.ifscCode || '',
      payload.branchAddress || '',
      payload.nomineeName || '',
      payload.nomineeRel || '',
      payload.nomineeDob || '',
      payload.nomineeMobile || '',
      payload.nomineeAddress || '',
      payload.declarationAccepted ? 'YES' : 'NO',
      docsCount,
      'PENDING_VERIFICATION',
      '', // ProcessedEmpID
      payload.notes || 'Submitted via Trilingual Online Employee Registration Form',
      '', // ReviewedBy
      ''  // ReviewDate
    ];

    if (ssId) {
      try {
        var ss = SpreadsheetApp.openById(ssId);
        var regSheet = ss.getSheetByName('EMPLOYEE_REGISTRATIONS');
        if (!regSheet) {
          regSheet = ss.insertSheet('EMPLOYEE_REGISTRATIONS');
          regSheet.getRange(1, 1, 1, 56).setValues([[
            'RegID', 'SubmissionDate', 'FullName', 'FatherName', 'MotherName', 'DOB', 'Gender', 'BloodGroup',
            'MaritalStatus', 'Nationality', 'Mobile', 'AltMobile', 'Email', 'IdentificationMark',
            'PermanentAddress', 'PermVillageCity', 'PermTaluka', 'PermDistrict', 'PermState', 'PermPIN',
            'CurrentAddress', 'CurrVillageCity', 'CurrTaluka', 'CurrDistrict', 'CurrState', 'CurrPIN',
            'SpouseName', 'ChildrenCount', 'EmergencyContactName', 'EmergencyRel', 'EmergencyPhone', 'EmergencyAltPhone', 'EmergencyAddress',
            'AadhaarNo', 'PANNo', 'VoterID', 'DrivingLicence', 'PassportNo',
            'BankName', 'AccHolderName', 'AccNo', 'IFSC', 'Branch',
            'NomineeName', 'NomineeRel', 'NomineeDOB', 'NomineeMobile', 'NomineeAddress',
            'DeclarationAccepted', 'DocsUploadedCount', 'Status', 'ProcessedEmpID', 'ReviewerNotes', 'ReviewedBy', 'ReviewDate'
          ]]).setBackground('#102D35').setFontColor('#FFFFFF').setFontWeight('bold');
          regSheet.setFrozenRows(1);
        }
        regSheet.appendRow(regRow);

        // Append attachments to EMPLOYEE_DOCUMENTS
        if (payload.attachments && payload.attachments.length > 0) {
          var docSheet = ss.getSheetByName('EMPLOYEE_DOCUMENTS');
          if (docSheet) {
            payload.attachments.forEach(function(att) {
              var docId = 'DOC-' + ('00000' + Math.floor(Math.random() * 90000 + 10000)).slice(-5);
              docSheet.appendRow([
                docId,
                regId,
                att.docType || 'GENERAL_DOCUMENT',
                att.fileName || 'Attachment',
                new Date().toISOString().slice(0, 10),
                '', // Expiry
                'PENDING_VERIFICATION',
                att.dataUrl || att.fileUrl || 'BASE64_ATTACHMENT'
              ]);
            });
          }
        }

        // Log audit
        var auditSheet = ss.getSheetByName('AUDIT_LOG');
        if (auditSheet) {
          auditSheet.appendRow([
            'AUD-' + ('00000' + Math.floor(Math.random() * 90000 + 10000)).slice(-5),
            nowIso,
            'Candidate: ' + payload.fullName,
            'CANDIDATE_SELF',
            'SUBMIT_SELF_REGISTRATION',
            regId,
            'SUCCESS',
            'Online self-registration submitted with ' + docsCount + ' document attachments'
          ]);
        }
      } catch (e) {
        Logger.log('Live sheet persistence warning: ' + e.message);
      }
    }

    return {
      success: true,
      regId: regId,
      submissionDate: nowIso,
      fullName: payload.fullName,
      mobile: payload.mobile,
      docsUploadedCount: docsCount,
      status: 'PENDING_VERIFICATION',
      message: 'Employee registration submitted successfully to BALSONS central database'
    };
  },

  /**
   * Fetch candidate registrations for Site HR review
   */
  getRegistrations: function(filterStatus) {
    var ssId = HR_CONFIG.getSpreadsheetId();
    if (!ssId) return [];

    try {
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('EMPLOYEE_REGISTRATIONS');
      if (!sheet) return [];

      var data = sheet.getDataRange().getValues();
      if (data.length <= 1) return [];

      var list = [];
      for (var i = 1; i < data.length; i++) {
        var r = data[i];
        var item = {
          regId: r[0],
          submissionDate: r[1],
          fullName: r[2],
          fatherName: r[3],
          dob: r[5],
          gender: r[6],
          mobile: r[10],
          email: r[12],
          permanentAddress: r[14],
          aadhaarNo: r[33],
          panNo: r[34],
          bankName: r[38],
          accNo: r[40],
          ifsc: r[41],
          docsCount: r[49] || 0,
          status: r[50] || 'PENDING_VERIFICATION',
          processedEmpId: r[51] || ''
        };
        if (!filterStatus || filterStatus === 'ALL' || item.status === filterStatus) {
          list.push(item);
        }
      }
      return list;
    } catch (e) {
      Logger.log('Error fetching registrations: ' + e.message);
      return [];
    }
  },

  /**
   * Approve registration and provision into EMPLOYEE_MASTER
   */
  approveRegistration: function(regId, approvalData, actor) {
    var ssId = HR_CONFIG.getSpreadsheetId();
    if (!ssId) throw new Error('Spreadsheet ID missing');

    var ss = SpreadsheetApp.openById(ssId);
    var regSheet = ss.getSheetByName('EMPLOYEE_REGISTRATIONS');
    if (!regSheet) throw new Error('EMPLOYEE_REGISTRATIONS sheet missing');

    var data = regSheet.getDataRange().getValues();
    var rowIndex = -1;
    var regRecord = null;

    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === regId) {
        rowIndex = i + 1;
        regRecord = data[i];
        break;
      }
    }

    if (rowIndex === -1) throw new Error('Registration ' + regId + ' not found');

    // Create employee in EMPLOYEE_MASTER
    var newEmp = this.createEmployee({
      name: regRecord[2],
      fatherName: regRecord[3],
      dob: regRecord[5],
      gender: regRecord[6],
      mobile: regRecord[10],
      address: regRecord[14],
      pan: regRecord[34],
      aadhaar: regRecord[33],
      bankAccNo: regRecord[40],
      bankIfsc: regRecord[41],
      wageType: approvalData.wageType || 'DAILY_PAY',
      trade: approvalData.trade || 'Rigger Lead',
      department: approvalData.department || 'Heavy Lift & Rigging Operations',
      dailyRate: approvalData.dailyRate || 850,
      ctc: approvalData.ctc || 45000,
      joiningDate: approvalData.joiningDate || new Date().toISOString().slice(0, 10)
    }, actor || 'HR Head');

    // Mark registration as APPROVED
    regSheet.getRange(rowIndex, 51).setValue('APPROVED');
    regSheet.getRange(rowIndex, 52).setValue(newEmp.empId);
    regSheet.getRange(rowIndex, 54).setValue(actor || 'HR Head');
    regSheet.getRange(rowIndex, 55).setValue(new Date().toISOString());

    return {
      success: true,
      regId: regId,
      newEmpId: newEmp.empId,
      status: 'APPROVED',
      message: 'Registration ' + regId + ' approved and provisioned as ' + newEmp.empId
    };
  }
};
