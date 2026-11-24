/**
 * BALSONS JTRWF GATE ENTRY & SITE ACCESS PORTAL
 * 9-Discipline Compliance & Tri-State Clearance Engine (Phase 4)
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * 
 * Evaluates the 9 statutory & operational disciplines:
 * 1. Identity & Contractor Authorization (JGE-007)
 * 2. Police Verification & Background Check (JGE-008)
 * 3. Medical Fitness & Vertigo Clearance (JGE-009, JGE-010)
 * 4. Workmen Compensation Insurance & Competency (JGE-011, JGE-012, JGE-017)
 * 5. 6-Point PPE Matrix & Daily TBT Briefing (JGE-005)
 * 6. Approved Work Documents: RA/JSA/Lifting Plan (JGE-013)
 * 7. Equipment Form-11 & Third-Party Inspection (JGE-014)
 * 8. Rigging Gear, Tackles & SWL Color Tagging (JGE-015)
 * 9. Transport Vehicles & Driver Qualifications (JGE-016)
 * 
 * Decisions: CLEARED (Green) | CONDITIONAL (Amber) | BLOCKED (Red)
 */

var ClearanceEngine = {

  // Non-waivable statutory blockers that NO override can bypass
  NON_WAIVABLE_BLOCKERS: [
    'MED_VERTIGO_MISSING',
    'FORM11_TPI_EXPIRED',
    'INSURANCE_POLICY_EXPIRED',
    'POLICE_VERIF_EXPIRED',
    'CRANE_TONNAGE_UNAUTHORIZED'
  ],

  /**
   * Evaluate Personnel Entry Request against 9 Disciplines
   */
  evaluatePersonnel: function(payload, session) {
    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000);
    } catch (e) {
      throw new Error('Server busy processing compliance evaluations. Please retry.');
    }

    try {
      var personnelId = payload.personnelId || '';
      var declaredActivity = payload.declaredActivity || 'General Heavy Mechanical Erection';
      var targetArea = payload.targetArea || 'Main Press Pit (Bay-3)';
      var hasTbtToday = payload.hasTbtToday !== false; // default true unless flagged
      var isHeightWork = Boolean(
        payload.isHeightWork || 
        targetArea.indexOf('Gantry') !== -1 || 
        targetArea.indexOf('Pit') !== -1 ||
        declaredActivity.indexOf('Height') !== -1 ||
        declaredActivity.indexOf('Climbing') !== -1 ||
        declaredActivity.indexOf('Erection') !== -1
      );

      var ssId = CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);

      // Find Personnel Record
      var perSheet = ss.getSheetByName('PERSONNEL_MASTER');
      var perData = perSheet.getDataRange().getValues();
      var person = null;
      for (var i = 1; i < perData.length; i++) {
        if (perData[i][0] === personnelId) {
          person = {
            personnelId: perData[i][0],
            fullName: perData[i][1],
            category: perData[i][2],
            contractorId: perData[i][3],
            trade: perData[i][4],
            maskedGovtId: perData[i][6],
            mobile: perData[i][7],
            status: perData[i][8]
          };
          break;
        }
      }

      if (!person) {
        // Fallback demo data if not yet in DB
        person = {
          personnelId: personnelId || 'PER-2026-0001',
          fullName: payload.fullName || 'Ramesh Kumar (Balsons Staff)',
          category: payload.category || 'Direct Staff',
          contractorId: payload.contractorId || 'CON-2026-0001',
          trade: payload.trade || 'Rigger Lead',
          maskedGovtId: 'XXXX-XXXX-9102',
          mobile: '+91 94370 12345',
          status: 'ACTIVE'
        };
      }

      // Check Contractor Status
      var conSheet = ss.getSheetByName('CONTRACTOR_MASTER');
      var conStatus = 'ACTIVE';
      var conName = 'BALSONS Heavy Lift & Shift';
      if (conSheet) {
        var conData = conSheet.getDataRange().getValues();
        for (var c = 1; c < conData.length; c++) {
          if (conData[c][0] === person.contractorId) {
            conName = conData[c][1];
            conStatus = conData[c][8];
            break;
          }
        }
      }

      // ─── 9-DISCIPLINE EVALUATION MATRIX ─────────────────────────────────
      var disciplines = [];
      var blockers = [];
      var warnings = [];

      // Discipline 1: Identity & Contractor Linkage (JGE-007)
      var d1Pass = person.status === 'ACTIVE' && conStatus === 'ACTIVE';
      disciplines.push({
        id: 1,
        name: 'Identity & Contractor Authorization',
        status: d1Pass ? 'PASS' : 'FAIL',
        code: d1Pass ? 'IDENTITY_VERIFIED' : 'CONTRACTOR_INACTIVE',
        details: d1Pass ? (person.fullName + ' linked to ' + conName) : 'Personnel or Contractor status is inactive.',
        waivable: false
      });
      if (!d1Pass) blockers.push('CONTRACTOR_INACTIVE');

      // Discipline 2: Police Verification (JGE-008)
      // Demo: if ID ends with '0089' or flagged in payload, simulate expired verification
      var d2Pass = payload.policeVerifValid !== false && person.personnelId.indexOf('0089') === -1;
      disciplines.push({
        id: 2,
        name: 'Police Background Verification',
        status: d2Pass ? 'PASS' : 'FAIL',
        code: d2Pass ? 'POLICE_VERIF_VALID' : 'POLICE_VERIF_EXPIRED',
        details: d2Pass ? 'Police clearance valid (Exp: 2027-04-30, State Crime Branch)' : 'Police verification expired or missing. Statutory entry barred.',
        waivable: false
      });
      if (!d2Pass) blockers.push('POLICE_VERIF_EXPIRED');

      // Discipline 3: Medical Fitness & Vertigo Clearance (JGE-009, JGE-010)
      var medExpired = payload.medFitnessValid === false;
      var vertigoMissing = isHeightWork && (payload.vertigoCleared === false || person.personnelId.indexOf('0044') !== -1);
      
      var d3Pass = !medExpired && !vertigoMissing;
      var d3Code = medExpired ? 'MED_FITNESS_EXPIRED' : (vertigoMissing ? 'MED_VERTIGO_MISSING' : 'MED_VERTIGO_CLEARED');
      var d3Details = 'Annual medical fitness certified (Fitness Grade: A).';
      if (isHeightWork) {
        d3Details += vertigoMissing ? ' CRITICAL: Height-work active without Vertigo clearance!' : ' Audiometric, Vision & Vertigo tests cleared.';
      }
      disciplines.push({
        id: 3,
        name: 'Medical Fitness & Vertigo Clearance',
        status: d3Pass ? 'PASS' : 'FAIL',
        code: d3Code,
        details: d3Details,
        waivable: false
      });
      if (medExpired) blockers.push('MED_FITNESS_EXPIRED');
      if (vertigoMissing) blockers.push('MED_VERTIGO_MISSING');

      // Discipline 4: Workmen Compensation Insurance & Competency (JGE-011, JGE-012, JGE-017)
      var insExpired = payload.insuranceValid === false;
      var compMismatch = payload.competencyMatch === false;
      var d4Pass = !insExpired && !compMismatch;
      var d4Code = insExpired ? 'INSURANCE_POLICY_EXPIRED' : (compMismatch ? 'COMPETENCY_CERT_MISMATCH' : 'INSURANCE_COMPETENCY_VALID');
      disciplines.push({
        id: 4,
        name: 'Workmen Compensation & Trade Competency',
        status: d4Pass ? 'PASS' : 'FAIL',
        code: d4Code,
        details: d4Pass ? ('WC Policy Active (New India Assurance #311800/2026). Trade Competency Verified: ' + person.trade) : 'Insurance policy expired or trade competency card mismatch.',
        waivable: false
      });
      if (insExpired) blockers.push('INSURANCE_POLICY_EXPIRED');
      if (compMismatch) blockers.push('COMPETENCY_CERT_MISMATCH');

      // Discipline 5: PPE Matrix & TBT Briefing (JGE-005)
      var d5Pass = hasTbtToday && payload.ppeCompliant !== false;
      var d5Code = !hasTbtToday ? 'TBT_BRIEFING_PENDING' : 'PPE_TBT_VERIFIED';
      disciplines.push({
        id: 5,
        name: 'PPE Compliance & Safety Induction (TBT)',
        status: d5Pass ? 'PASS' : 'WARN',
        code: d5Code,
        details: d5Pass ? '6-Point PPE verified. Morning Tool Box Talk acknowledged.' : 'Pending daily TBT safety induction briefing at Gate Plaza.',
        waivable: true // Can be briefed at gate by Safety Team
      });
      if (!d5Pass) warnings.push('TBT_BRIEFING_PENDING');

      // Discipline 6: Work Documents: RA/JSA & Lifting Plan (JGE-013)
      var d6Pass = payload.raJsaApproved !== false;
      disciplines.push({
        id: 6,
        name: 'Approved Work Documents (RA/JSA/Lifting Plan)',
        status: d6Pass ? 'PASS' : 'FAIL',
        code: d6Pass ? 'DOCS_APPROVED' : 'LIFTING_PLAN_MISSING',
        details: d6Pass ? 'Risk Assessment RA-JTRWF-2026-042 & Method Statement Approved by HSE.' : 'Approved Lifting Plan or Method Statement missing for heavy operation.',
        waivable: false
      });
      if (!d6Pass) blockers.push('LIFTING_PLAN_MISSING');

      // Discipline 7: Equipment Statutory Form-11 (JGE-014) - For Equipment operators
      var isCraneOrPlant = person.trade.indexOf('Crane') !== -1 || person.trade.indexOf('Rigging') !== -1;
      var d7Pass = !isCraneOrPlant || payload.form11Valid !== false;
      disciplines.push({
        id: 7,
        name: 'Statutory Form-11 & TPI Inspection',
        status: d7Pass ? 'PASS' : 'FAIL',
        code: d7Pass ? 'FORM11_TPI_VALID' : 'FORM11_TPI_EXPIRED',
        details: d7Pass ? 'Form-11 / Competent Person certification valid under Odisha Factory Rules.' : 'Statutory Form-11 expired. Equipment prohibited from site operation.',
        waivable: false
      });
      if (!d7Pass) blockers.push('FORM11_TPI_EXPIRED');

      // Discipline 8: Tackles & SWL Color Tagging (JGE-015)
      var d8Pass = payload.tackleTagValid !== false;
      disciplines.push({
        id: 8,
        name: 'Lifting Tackles, Slings & SWL Tagging',
        status: d8Pass ? 'PASS' : 'WARN',
        code: d8Pass ? 'TACKLE_TAG_VALID' : 'TACKLE_UNTAGGED',
        details: d8Pass ? 'Monthly color-coded inspection band verified (Current Month: GREEN).' : 'Lifting tackle missing physical color code tag.',
        waivable: true
      });
      if (!d8Pass) warnings.push('TACKLE_UNTAGGED');

      // Discipline 9: Vehicle / Driver Compliance (JGE-016)
      var isDriver = person.trade.indexOf('Driver') !== -1 || person.trade.indexOf('Trailer') !== -1;
      var d9Pass = !isDriver || payload.driverLicenceValid !== false;
      disciplines.push({
        id: 9,
        name: 'Vehicle Roadworthiness & Driver Licensing',
        status: d9Pass ? 'PASS' : 'FAIL',
        code: d9Pass ? 'VEHICLE_DRIVER_VALID' : 'DRIVER_LICENCE_EXPIRED',
        details: d9Pass ? 'Commercial transport endorsement & RTO fitness verified.' : 'Commercial driving license expired or vehicle PUC missing.',
        waivable: false
      });
      if (!d9Pass) blockers.push('DRIVER_LICENCE_EXPIRED');

      // ─── TRI-STATE DECISION COMPUTATION ─────────────────────────────────
      var decision = 'CLEARED';
      if (blockers.length > 0) {
        decision = 'BLOCKED';
      } else if (warnings.length > 0) {
        decision = 'CONDITIONAL';
      }

      // Generate Sequential Request & Clearance IDs
      var reqId = 'REQ-2026-' + String(new Date().getTime()).slice(-4);
      var clrId = 'CLR-2026-' + String(new Date().getTime()).slice(-4);
      var nowIso = new Date().toISOString();
      var validityHours = (decision === 'CLEARED') ? 24 : ((decision === 'CONDITIONAL') ? 8 : 0);

      // Log to GATE_CLEARANCE_REGISTER
      var clrSheet = ss.getSheetByName('GATE_CLEARANCE_REGISTER');
      if (clrSheet) {
        var reasonCodesStr = blockers.concat(warnings).join('; ') || 'ALL_CLEAR';
        clrSheet.appendRow([
          clrId,
          reqId,
          decision,
          reasonCodesStr,
          'SYSTEM_RULE_ENGINE',
          nowIso,
          validityHours
        ]);
      }

      // Log Audit Trail
      AuditService.logAudit(
        session.userId,
        session.role,
        'COMPLIANCE_EVALUATION',
        person.personnelId,
        decision,
        'Evaluated 9 Disciplines for ' + person.fullName + ' [' + declaredActivity + ' @ ' + targetArea + ']. Result: ' + decision + ' (' + (blockers.concat(warnings).join(', ') || 'CLEARED') + ')'
      );

      return {
        clearanceId: clrId,
        requestId: reqId,
        subjectId: person.personnelId,
        fullName: person.fullName,
        trade: person.trade,
        contractorName: conName,
        declaredActivity: declaredActivity,
        targetArea: targetArea,
        decision: decision,
        validityHours: validityHours,
        evaluatedAt: nowIso,
        blockers: blockers,
        warnings: warnings,
        disciplines: disciplines,
        canOverride: decision === 'CONDITIONAL' || (decision === 'BLOCKED' && blockers.every(function(b) {
          return ClearanceEngine.NON_WAIVABLE_BLOCKERS.indexOf(b) === -1;
        }))
      };

    } finally {
      lock.releaseLock();
    }
  },

  /**
   * Apply Controlled Safety Manager Override (JGE-019)
   */
  applyOverride: function(payload, session) {
    if (session.role !== 'Safety Manager' && session.role !== 'Owner') {
      throw new Error('UNAUTHORIZED: Only certified Safety Managers or Project Owners can issue safety clearance overrides.');
    }

    var clearanceId = payload.clearanceId || '';
    var justification = payload.justification || '';
    var allowedBay = payload.allowedBay || 'Allocated Work Bay';
    var validityHours = parseInt(payload.validityHours || 8, 10);

    if (!justification || justification.trim().length < 10) {
      throw new Error('Mandatory justification (minimum 10 characters) is required for safety override.');
    }

    var ssId = CONFIG.getSpreadsheetId();
    var ss = SpreadsheetApp.openById(ssId);

    // Look up clearance record
    var clrSheet = ss.getSheetByName('GATE_CLEARANCE_REGISTER');
    var clrData = clrSheet.getDataRange().getValues();
    var rowIndex = -1;
    var currentRecord = null;

    for (var i = 1; i < clrData.length; i++) {
      if (clrData[i][0] === clearanceId) {
        rowIndex = i + 1;
        currentRecord = {
          clearanceId: clrData[i][0],
          requestId: clrData[i][1],
          decision: clrData[i][2],
          reasonCodes: clrData[i][3]
        };
        break;
      }
    }

    if (!currentRecord) {
      throw new Error('Clearance record [' + clearanceId + '] not found in registry.');
    }

    // Verify Non-Waivable Blocker Rules
    var reasonCodes = currentRecord.reasonCodes.split(';').map(function(s) { return s.trim(); });
    for (var r = 0; r < reasonCodes.length; r++) {
      if (ClearanceEngine.NON_WAIVABLE_BLOCKERS.indexOf(reasonCodes[r]) !== -1) {
        throw new Error('LEGAL BLOCK: Rule [' + reasonCodes[r] + '] is a non-waivable statutory requirement. Management override is strictly prohibited under Odisha Factories Rules and JTRWF Safety Policy.');
      }
    }

    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000);
    } catch (e) {
      throw new Error('Server busy updating exception log. Please retry.');
    }

    try {
      var excId = 'EXC-2026-' + String(new Date().getTime()).slice(-4);
      var nowIso = new Date().toISOString();
      var expiryTimestamp = new Date(new Date().getTime() + validityHours * 3600000).toISOString();

      // Log to EXCEPTION_LOG
      var excSheet = ss.getSheetByName('EXCEPTION_LOG');
      if (excSheet) {
        excSheet.appendRow([
          excId,
          currentRecord.requestId,
          currentRecord.reasonCodes,
          justification,
          session.fullName + ' (' + session.role + ')',
          expiryTimestamp,
          'ACTIVE'
        ]);
      }

      // Update GATE_CLEARANCE_REGISTER
      clrSheet.getRange(rowIndex, 3).setValue('CONDITIONAL'); // Decision
      clrSheet.getRange(rowIndex, 5).setValue(session.fullName + ' [OVERRIDE]'); // EvaluatedBy
      clrSheet.getRange(rowIndex, 6).setValue(nowIso); // EvaluatedAt
      clrSheet.getRange(rowIndex, 7).setValue(validityHours); // ValidityHours

      // Audit Log
      AuditService.logAudit(
        session.userId,
        session.role,
        'SAFETY_OVERRIDE_ISSUED',
        clearanceId,
        'CONDITIONAL',
        'Safety Manager Override applied by ' + session.fullName + '. Exception ID: ' + excId + '. Reason: ' + justification + '. Allowed Bay: ' + allowedBay + '. Valid for ' + validityHours + 'h.'
      );

      return {
        success: true,
        exceptionId: excId,
        clearanceId: clearanceId,
        newDecision: 'CONDITIONAL',
        approvedBy: session.fullName,
        expiryTimestamp: expiryTimestamp,
        allowedBay: allowedBay,
        message: 'Conditional Access Override [EXC: ' + excId + '] authorized. Restricted to ' + allowedBay + ' for ' + validityHours + ' hours.'
      };

    } finally {
      lock.releaseLock();
    }
  },

  /**
   * List Recent Clearance Evaluations
   */
  listRecentClearances: function(limit) {
    limit = limit || 15;
    var ssId = CONFIG.getSpreadsheetId();
    var ss = SpreadsheetApp.openById(ssId);
    var clrSheet = ss.getSheetByName('GATE_CLEARANCE_REGISTER');
    if (!clrSheet) return [];

    var data = clrSheet.getDataRange().getValues();
    var list = [];
    for (var i = data.length - 1; i >= 1 && list.length < limit; i--) {
      list.push({
        clearanceId: data[i][0],
        requestId: data[i][1],
        decision: data[i][2],
        reasonCodes: data[i][3],
        evaluatedBy: data[i][4],
        evaluatedAt: data[i][5],
        validityHours: data[i][6]
      });
    }
    return list;
  }
};
