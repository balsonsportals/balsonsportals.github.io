/**
 * BALSONS SAFETY PORTAL - PTW SERVICE
 * Module 05: Permit-to-Work (PTW) Lifecycle Management
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * Based on Controlled Library: BALSONS_JTRWF_PTW_FORMS_V1_1_SEVEN_PERMITS
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

var PtwService = {
  
  /**
   * 7 Controlled Operational PTW Templates (V1.1 Controlled Library)
   */
  TEMPLATES: {
    'PTW-GEN': {
      category: 'GENERAL',
      code: 'PTW-GEN',
      name: 'General Work Permit',
      validity: 12,
      docNo: 'BAL-JTRWF-SAF-PTW-001',
      prerequisites: [
        'Approved RA/JSA and method statement available',
        'Work area inspected and safe for planned activity',
        'Personnel briefed and competent for assigned task',
        'Required PPE available and worn',
        'Tools and equipment inspected and fit for use',
        'Access, lighting and housekeeping adequate',
        'Barricading / warning signage installed where required',
        'Emergency arrangements and communication understood',
        'Nearby operations and interfaces reviewed',
        'Required supporting permits / isolations identified'
      ]
    },
    'PTW-HOT': {
      category: 'HOT WORK',
      code: 'PTW-HOT',
      name: 'Hot Work Permit',
      validity: 8,
      docNo: 'BAL-JTRWF-SAF-PTW-002',
      prerequisites: [
        'Hot work RA/JSA and method statement approved',
        'Combustibles removed or protected (10m radius)',
        'Flammable atmosphere checked (0% LEL)',
        'Gas cylinders upright and secured as required',
        'Hoses, regulators and flashback arrestors inspected',
        'Suitable fire extinguisher accessible (10kg DCP)',
        'Fire watch assigned and briefed with whistle',
        'Screens / spark containment fire blanket installed',
        'Adjacent areas checked for fire exposure',
        'Post-work fire watch duration defined (min 30 mins)',
        'Hot work equipment isolated and removed after completion'
      ]
    },
    'PTW-HT': {
      category: 'HEIGHT WORK',
      code: 'PTW-HT',
      name: 'Work at Height Permit',
      validity: 10,
      docNo: 'BAL-JTRWF-SAF-PTW-003',
      prerequisites: [
        'Work-at-height RA/JSA approved',
        'Safe platform / access selected',
        'Scaffold / platform inspected and tagged (Green Tag)',
        'Ladders suitable, tied-off and secured',
        'Harness, double lanyard and connectors inspected',
        'Anchor / lifeline suitability verified by competent person (>22kN)',
        'Dropped-object controls and exclusion zone established',
        'Tools and materials secured against falling with tool lanyards',
        'Weather conditions acceptable (wind speed < 32 km/h, no rain)',
        'Rescue plan, trained rescuers and equipment available'
      ]
    },
    'PTW-CSE': {
      category: 'CONFINED SPACE',
      code: 'PTW-CSE',
      name: 'Confined Space Entry Permit',
      validity: 8,
      docNo: 'BAL-JTRWF-SAF-PTW-004',
      prerequisites: [
        'Confined-space classification and RA approved',
        'Energy and material sources isolated and verified (LOTO)',
        'Space cleaned / purged / ventilated as specified',
        'Atmosphere tested by authorised competent person',
        'Oxygen (19.5%-23.5%), flammable (0% LEL) and toxic readings recorded',
        'Continuous / periodic forced-air ventilation confirmed',
        'Standby attendant present outside entry and communication tested',
        'Entrants trained, medically fit and logged',
        'Suitable 24V explosion-proof lighting, tools and PPE available',
        'Rescue tripod winch, harness and breathing apparatus ready',
        'Entry / exit headcount register maintained'
      ]
    },
    'PTW-ELE': {
      category: 'GENERAL',
      code: 'PTW-ELE',
      name: 'Electrical Work & LOTO Permit',
      validity: 12,
      docNo: 'BAL-JTRWF-SAF-PTW-005',
      prerequisites: [
        'Electrical RA/JSA and switching plan available',
        'Competent authorised electrical personnel assigned',
        'All supply sources including backfeed identified',
        'Isolation carried out by authorised electrical person',
        'Lockout and tagout applied at identified breaker points',
        'Absence of voltage tested with approved calibrated tester',
        'Tester proved before and after test on known live source',
        'Stored energy discharged / earthing applied as required',
        'Barriers and Danger warning notices installed',
        'Adjacent live parts protected with insulating mats',
        'Re-energisation and handback process agreed'
      ]
    },
    'PTW-MHI': {
      category: 'GENERAL',
      code: 'PTW-MHI',
      name: 'Mechanical / Hydraulic Isolation Permit',
      validity: 10,
      docNo: 'BAL-JTRWF-SAF-PTW-006',
      prerequisites: [
        'Approved isolation plan and RA/JSA available',
        'All energy sources identified (hydraulic/pneumatic/gravity)',
        'Machine stopped and secured against restart',
        'Associated electrical energy isolated as required',
        'Hydraulic / pneumatic pressure safely released (gauge reads 0 Bar)',
        'Accumulators and stored energy addressed and drained',
        'Raised / suspended components mechanically chocked / pinned',
        'Gravity movement and rotating parts physically restrained',
        'Zero-energy state verified by competent person',
        'Locks / tags and warning notices applied',
        'Safe reinstatement sequence defined'
      ]
    },
    'PTW-LFT': {
      category: 'GENERAL',
      code: 'PTW-LFT',
      name: 'Lifting & Rigging Permit',
      validity: 10,
      docNo: 'BAL-JTRWF-SAF-PTW-007',
      prerequisites: [
        'Approved lifting plan and task risk assessment available',
        'Load weight and centre of gravity (COG) verified',
        'Crane capacity checked for radius and boom configuration',
        'Crane inspection / statutory Form 11 documents valid',
        'Operator competency and heavy equipment licence verified',
        'Rigger and single designated signalman competency verified',
        'Slings, shackles, hooks and accessories inspected (valid color code)',
        'Sling angles and rigging arrangement checked by competent person',
        'Ground condition, outrigger support and load spreader mats verified',
        'Weather / wind limits checked (<32 km/h)',
        'Trial lift and radio communication method agreed',
        'Exclusion zone (10M radius) and tag-line arrangements established'
      ]
    }
  },

  /**
   * Retrieve list of PTW records
   */
  getPermits: function(filter) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('PTW_REGISTER');
      
      if (!sheet || sheet.getLastRow() <= 1) {
        return this.getSeedPermits(filter);
      }
      
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var permits = [];
      
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) {
          item[headers[h]] = row[h];
        }
        
        if (!filter || filter === 'ALL' || item.Status === filter || item.Category === filter) {
          permits.push(item);
        }
      }
      
      return permits.reverse();
    } catch (err) {
      Logger.log('Falling back to seed permits: ' + err.message);
      return this.getSeedPermits(filter);
    }
  },

  /**
   * Create a new Permit to Work (Stage 1: Work Supervisor Submission)
   */
  createPermit: function(data, actor) {
    var templateCode = data.templateCode || 'PTW-GEN';
    var template = this.TEMPLATES[templateCode] || this.TEMPLATES['PTW-GEN'];

    var permitId = 'PTW-JTRWF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    var now = new Date().toISOString();
    
    var record = {
      PermitID: permitId,
      TemplateCode: template.code,
      Category: template.category,
      AreaCode: data.areaCode || 'AREA-01',
      WorkDescription: data.workDescription || template.name,
      Contractor: data.contractor || 'BALSONS HEAVY LIFT',
      SupervisorID: actor ? actor.fullName : (data.supervisorName || 'Ramesh Kumar'),
      PlannedStart: data.plannedStart || now,
      PlannedEnd: data.plannedEnd || new Date(Date.now() + template.validity * 3600 * 1000).toISOString(),
      RiskLevel: data.riskLevel || 'HIGH',
      Status: 'SUBMITTED',
      IssuedTimestamp: '',
      ClosedTimestamp: '',
      PrerequisitesChecked: JSON.stringify(data.prerequisites || template.prerequisites),
      TechnicalData: JSON.stringify(data.technicalData || {})
    };

    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('PTW_REGISTER');
      if (sheet) {
        sheet.appendRow([
          record.PermitID,
          record.TemplateCode,
          record.Category,
          record.AreaCode,
          record.WorkDescription,
          record.Contractor,
          record.SupervisorID,
          record.PlannedStart,
          record.PlannedEnd,
          record.RiskLevel,
          record.Status,
          record.IssuedTimestamp,
          record.ClosedTimestamp
        ]);
      }

      this.logApprovalStep(permitId, 'SUBMISSION', 'SUBMITTED', actor ? actor.fullName : 'Supervisor', 'Work Supervisor', 'Work requested per controlled template ' + template.code);
      AuditService.log(actor ? actor.fullName : 'System', 'Work Supervisor', 'CREATE_PTW', permitId, 'SUCCESS', 'Permit created for ' + template.name);
    } catch (e) {
      Logger.log('Sheet append skipped: ' + e.message);
    }

    return record;
  },

  /**
   * Stage 2: Safety Officer Field Verification
   */
  verifyPermit: function(permitId, verificationData, actor) {
    var status = 'VERIFIED_BY_SAFETY';
    this.updatePermitStatus(permitId, status);
    this.logApprovalStep(permitId, 'SAFETY_VERIFICATION', 'VERIFIED', actor ? actor.fullName : 'Bikram Patra', 'Safety Officer', verificationData.comments || 'On-site physical safety precautions inspected & verified.');
    AuditService.log(actor ? actor.fullName : 'Safety Officer', 'Safety Officer', 'VERIFY_PTW', permitId, 'SUCCESS', 'Physical safety conditions validated.');
    return { permitId: permitId, status: status, message: 'Permit verified by Safety Officer. Forwarded to Site Manager for Final Authorization.' };
  },

  /**
   * Stage 3: Site Manager / Project Head Final Authorization & Issue
   */
  approvePermit: function(permitId, approvalData, actor) {
    var status = 'ISSUED';
    var now = new Date().toISOString();
    this.updatePermitStatus(permitId, status, { IssuedTimestamp: now });
    this.logApprovalStep(permitId, 'SITE_MANAGER_AUTHORISATION', 'APPROVED', actor ? actor.fullName : 'Gajendra Rao', 'Site Manager / Safety Head', approvalData.comments || 'Work authorisation granted. Work permitted strictly per approved JSA.');
    AuditService.log(actor ? actor.fullName : 'Site Manager', 'Site Manager', 'APPROVE_PTW', permitId, 'SUCCESS', 'Permit officially issued to site.');
    return { permitId: permitId, status: status, issuedTimestamp: now, message: 'PTW Officially Issued and Active on Site.' };
  },

  /**
   * Reject Permit
   */
  rejectPermit: function(permitId, rejectionData, actor) {
    var status = 'REJECTED';
    this.updatePermitStatus(permitId, status);
    this.logApprovalStep(permitId, 'PERMIT_REJECTION', 'REJECTED', actor ? actor.fullName : 'Safety Team', actor ? actor.role : 'Safety Authority', rejectionData.reason || 'Safety prerequisites not fulfilled.');
    AuditService.log(actor ? actor.fullName : 'Safety Team', 'Safety Authority', 'REJECT_PTW', permitId, 'REJECTED', rejectionData.reason || 'Prerequisites unmet');
    return { permitId: permitId, status: status, message: 'Permit has been rejected.' };
  },

  /**
   * Stage 4: Work Completion & Handback / Closure
   */
  closePermit: function(permitId, closureData, actor) {
    var status = 'CLOSED';
    var now = new Date().toISOString();
    this.updatePermitStatus(permitId, status, { ClosedTimestamp: now });
    this.logApprovalStep(permitId, 'WORK_COMPLETION_HANDBACK', 'CLOSED', actor ? actor.fullName : 'Supervisor & Safety', 'Permit Holder / Safety Officer', closureData.comments || 'Work successfully completed. Site cleared, tools removed, housekeeping restored, and isolation removed.');
    AuditService.log(actor ? actor.fullName : 'Permit Holder', 'Supervisor', 'CLOSE_PTW', permitId, 'SUCCESS', 'Work handback and permit closure complete.');
    return { permitId: permitId, status: status, closedTimestamp: now, message: 'Permit safely closed. Worksite handed back.' };
  },

  /**
   * Helper to update permit status in sheet
   */
  updatePermitStatus: function(permitId, status, extraFields) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('PTW_REGISTER');
      if (!sheet) return;
      
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (data[i][0] === permitId) {
          sheet.getRange(i + 1, 11).setValue(status);
          if (extraFields && extraFields.IssuedTimestamp) {
            sheet.getRange(i + 1, 12).setValue(extraFields.IssuedTimestamp);
          }
          if (extraFields && extraFields.ClosedTimestamp) {
            sheet.getRange(i + 1, 13).setValue(extraFields.ClosedTimestamp);
          }
          break;
        }
      }
    } catch (e) {
      Logger.log('Update permit error: ' + e.message);
    }
  },

  /**
   * Log Approval Step in PTW_APPROVAL_LOG
   */
  logApprovalStep: function(permitId, stepName, action, actorName, actorRole, comments) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('PTW_APPROVAL_LOG');
      if (sheet) {
        var approvalId = 'APP-' + new Date().getTime();
        sheet.appendRow([
          approvalId,
          permitId,
          stepName,
          action,
          actorName,
          actorRole,
          new Date().toISOString(),
          comments
        ]);
      }
    } catch (e) {
      Logger.log('Approval log write skipped: ' + e.message);
    }
  },

  /**
   * Seed Mock PTW records mapped to official 7 controlled forms
   */
  getSeedPermits: function(filter) {
    var seeds = [
      {
        PermitID: 'PTW-JTRWF-2026-1001',
        TemplateCode: 'PTW-LFT',
        Category: 'GENERAL',
        AreaCode: 'AREA-01',
        WorkDescription: 'Heavy Tandem Lift of Schuler 1600T Forging Press Bed',
        Contractor: 'BALSONS HEAVY LIFT',
        SupervisorID: 'Ramesh Kumar (Lifting Sup.)',
        PlannedStart: '2026-11-19T08:00:00Z',
        PlannedEnd: '2026-11-19T18:00:00Z',
        RiskLevel: 'CRITICAL',
        Status: 'ISSUED',
        IssuedTimestamp: '2026-11-19T07:45:00Z',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Approved lifting plan and task risk assessment available", "Load weight and centre of gravity (COG) verified", "Crane capacity checked for radius and boom configuration", "Crane inspection / statutory Form 11 documents valid", "Operator competency and heavy equipment licence verified", "Rigger and single designated signalman competency verified", "Slings, shackles, hooks and accessories inspected", "Exclusion zone (10M radius) and tag-line arrangements established"]',
        TechnicalData: '{"loadWeight":"145T", "craneCapacity":"190T", "radius":"9.5M", "utilization":"76.3%"}'
      },
      {
        PermitID: 'PTW-JTRWF-2026-1002',
        TemplateCode: 'PTW-HT',
        Category: 'HEIGHT WORK',
        AreaCode: 'AREA-02',
        WorkDescription: 'Erection of Overhead EOT Crane Girders at +14.5M Elevation',
        Contractor: 'BALSONS STRUCTURAL ERECTORS',
        SupervisorID: 'Sanjay Panda',
        PlannedStart: '2026-11-19T09:00:00Z',
        PlannedEnd: '2026-11-19T17:00:00Z',
        RiskLevel: 'HIGH',
        Status: 'VERIFIED_BY_SAFETY',
        IssuedTimestamp: '',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Work-at-height RA/JSA approved", "Safe platform / access selected", "Scaffold / platform inspected and tagged (Green Tag)", "Harness, double lanyard and connectors inspected", "Anchor / lifeline suitability verified (>22kN)", "Dropped-object controls and exclusion zone established"]',
        TechnicalData: '{"elevation":"+14.5M", "accessType":"Certified Modular Scaffold & Static Lifeline"}'
      },
      {
        PermitID: 'PTW-JTRWF-2026-1003',
        TemplateCode: 'PTW-HOT',
        Category: 'HOT WORK',
        AreaCode: 'AREA-04',
        WorkDescription: 'Welding and Thermal Cutting of Heavy Anchor Stool Plates',
        Contractor: 'BALSONS FABRICATION',
        SupervisorID: 'Ajay Verma',
        PlannedStart: '2026-11-19T10:00:00Z',
        PlannedEnd: '2026-11-19T16:00:00Z',
        RiskLevel: 'HIGH',
        Status: 'SUBMITTED',
        IssuedTimestamp: '',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Hot work RA/JSA and method statement approved", "Combustibles removed or protected (10m radius)", "Flammable atmosphere checked (0% LEL)", "Fire watch assigned and briefed with whistle", "Suitable fire extinguisher accessible (10kg DCP)", "Screens / spark containment fire blanket installed"]',
        TechnicalData: '{"fireWatch":"Bikash Nayak", "extinguisher":"2x 10kg DCP", "postWatchMinutes":30}'
      },
      {
        PermitID: 'PTW-JTRWF-2026-1004',
        TemplateCode: 'PTW-CSE',
        Category: 'CONFINED SPACE',
        AreaCode: 'AREA-03',
        WorkDescription: 'Internal Hydraulic Pit Degreasing and Inspection',
        Contractor: 'BALSONS MAINTENANCE',
        SupervisorID: 'Manoj Mohanty',
        PlannedStart: '2026-11-18T11:00:00Z',
        PlannedEnd: '2026-11-18T17:00:00Z',
        RiskLevel: 'CRITICAL',
        Status: 'CLOSED',
        IssuedTimestamp: '2026-11-18T10:50:00Z',
        ClosedTimestamp: '2026-11-18T16:45:00Z',
        PrerequisitesChecked: '["Confined-space classification and RA approved", "Energy and material sources isolated (LOTO)", "Atmosphere tested by authorised competent person", "Oxygen, flammable and toxic readings recorded", "Standby attendant present outside entry", "Rescue tripod winch and harness ready"]',
        TechnicalData: '{"gasTest":{"o2":"20.9%","lel":"0%","co":"0ppm","h2s":"0ppm"}, "standby":"Pradeep Jena"}'
      }
    ];

    if (!filter || filter === 'ALL') return seeds;
    return seeds.filter(function(p) { return p.Status === filter || p.Category === filter; });
  }
};
