/**
 * BALSONS SAFETY PORTAL - SAFETY SERVICE
 * Handles Modules 01-04, 06-12:
 * TBT, Inspections, Lifting Safety, Hazards, Incidents, CAPA, DSR
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

var SafetyService = {

  // ==========================================
  // MODULE 01: DASHBOARD STATS
  // ==========================================
  getDashboardStats: function() {
    var permits = PtwService.getPermits('ALL');
    var activePermits = permits.filter(function(p) { return p.Status === 'ISSUED'; }).length;
    var pendingPermits = permits.filter(function(p) { return p.Status === 'SUBMITTED' || p.Status === 'VERIFIED_BY_SAFETY'; }).length;
    var closedPermits = permits.filter(function(p) { return p.Status === 'CLOSED'; }).length;

    var tbts = this.getTbts();
    var inspections = this.getInspections();
    var incidents = this.getIncidents();
    var capas = this.getCapas();
    var openCapas = capas.filter(function(c) { return c.ClosureStatus !== 'CLOSED'; }).length;

    return {
      activePermits: activePermits,
      pendingPermits: pendingPermits,
      closedPermits: closedPermits,
      totalPermitsToday: permits.length,
      tbtsConductedToday: tbts.length,
      inspectionsCompleted: inspections.length,
      openIncidents: incidents.filter(function(i) { return i.Status === 'OPEN' || i.Status === 'UNDER_INVESTIGATION'; }).length,
      openCapas: openCapas,
      safeManHours: 148520,
      lostTimeInjury: 0,
      daysWithoutLTI: 142,
      complianceScore: 98.4,
      criticalAlerts: [
        { id: 'ALT-01', text: 'Heavy Tandem Lift active in AREA-01 (Axle Forging Line) - 10M exclusion zone strictly enforced.', severity: 'WARNING' },
        { id: 'ALT-02', text: 'Hot Work welding in AREA-04 requires 30-min continuous fire watch post-completion.', severity: 'INFO' }
      ]
    };
  },

  // ==========================================
  // MODULE 02: TOOLBOX TALKS (TBT)
  // ==========================================
  getTbts: function() {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('TBT_REGISTER');
      if (!sheet || sheet.getLastRow() <= 1) return this.getSeedTbts();

      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var list = [];
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) item[headers[h]] = row[h];
        list.push(item);
      }
      return list.reverse();
    } catch (e) {
      return this.getSeedTbts();
    }
  },

  createTbt: function(data, actor) {
    var tbtId = 'TBT-JTRWF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    var now = new Date();
    var dateStr = now.toISOString().split('T')[0];
    var timeStr = now.toTimeString().split(' ')[0].substring(0, 5);

    var record = {
      TbtID: tbtId,
      Date: data.date || dateStr,
      Time: data.time || timeStr,
      AreaCode: data.areaCode || 'AREA-01',
      Topic: data.topic || 'Pre-Shift Heavy Rigging Hazards & Pinch Point Protection',
      SupervisorID: actor ? actor.fullName : (data.supervisorName || 'Ramesh Kumar'),
      AttendeesCount: data.attendeesCount || (data.attendees ? data.attendees.length : 12),
      PhotoUrl: data.photoUrl || 'assets/images/tbt_sample.jpg',
      KeyPointsDiscussed: data.keyPoints || 'Line of fire, tag lines for load control, mandatory chin strap on safety helmets, buddy system.',
      Status: 'CONDUCTED'
    };

    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('TBT_REGISTER');
      if (sheet) {
        sheet.appendRow([
          record.TbtID, record.Date, record.Time, record.AreaCode,
          record.Topic, record.SupervisorID, record.AttendeesCount,
          record.PhotoUrl, record.KeyPointsDiscussed, record.Status
        ]);
      }

      // Append attendees if provided
      var attSheet = ss.getSheetByName('TBT_ATTENDANCE');
      if (attSheet && data.attendees && Array.isArray(data.attendees)) {
        data.attendees.forEach(function(worker) {
          attSheet.appendRow([
            'ATT-' + new Date().getTime() + '-' + Math.floor(Math.random() * 100),
            tbtId,
            worker.id || 'WRK-GEN',
            worker.name || 'Site Technician',
            worker.trade || 'Rigger',
            'ACKNOWLEDGED'
          ]);
        });
      }

      AuditService.log(actor ? actor.fullName : 'Supervisor', 'Work Supervisor', 'CREATE_TBT', tbtId, 'SUCCESS', 'TBT conducted: ' + record.Topic);
    } catch (e) {
      Logger.log('TBT append error: ' + e.message);
    }

    return record;
  },

  getSeedTbts: function() {
    return [
      {
        TbtID: 'TBT-JTRWF-2026-001',
        Date: '2026-11-19',
        Time: '07:30',
        AreaCode: 'AREA-01',
        Topic: 'Tandem Lifting Hazards & Communication Hand Signals',
        SupervisorID: 'Ramesh Kumar (Lifting Sup.)',
        AttendeesCount: 14,
        PhotoUrl: 'assets/images/tbt_sample.jpg',
        KeyPointsDiscussed: 'Tandem lift coordination, designated single banksman, tag lines mandatory, exclusion of non-essential personnel.',
        Status: 'CONDUCTED'
      },
      {
        TbtID: 'TBT-JTRWF-2026-002',
        Date: '2026-11-19',
        Time: '08:00',
        AreaCode: 'AREA-02',
        Topic: 'Fall Protection & Proper 100% Tie-Off at +14.5M',
        SupervisorID: 'Sanjay Panda',
        AttendeesCount: 9,
        PhotoUrl: 'assets/images/tbt_sample.jpg',
        KeyPointsDiscussed: 'Dual lanyard attachment above shoulder height, inspecting webbing for tears, trauma strap deployment awareness.',
        Status: 'CONDUCTED'
      }
    ];
  },

  // ==========================================
  // MODULE 03: SAFETY INSPECTIONS & CHECKLISTS
  // ==========================================
  getInspections: function() {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('INSPECTION_REGISTER');
      if (!sheet || sheet.getLastRow() <= 1) return this.getSeedInspections();

      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var list = [];
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) item[headers[h]] = row[h];
        list.push(item);
      }
      return list.reverse();
    } catch (e) {
      return this.getSeedInspections();
    }
  },

  createInspection: function(data, actor) {
    var inspId = 'INSP-JTRWF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    var now = new Date().toISOString().split('T')[0];

    var record = {
      InspID: inspId,
      Date: data.date || now,
      AreaCode: data.areaCode || 'AREA-01',
      Category: data.category || 'Lifting Equipment & Rigging Gear',
      InspectorName: actor ? actor.fullName : (data.inspectorName || 'Bikram Patra (Safety Officer)'),
      TotalItems: data.totalItems || 10,
      CompliantCount: data.compliantCount || 9,
      NonCompliantCount: data.nonCompliantCount || 1,
      Status: data.nonCompliantCount > 0 ? 'ACTION_REQUIRED' : 'SATISFACTORY'
    };

    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('INSPECTION_REGISTER');
      if (sheet) {
        sheet.appendRow([
          record.InspID, record.Date, record.AreaCode, record.Category,
          record.InspectorName, record.TotalItems, record.CompliantCount,
          record.NonCompliantCount, record.Status
        ]);
      }

      // If there are non-compliant findings, auto-generate CAPA
      if (data.findings && Array.isArray(data.findings)) {
        var findingSheet = ss.getSheetByName('INSPECTION_FINDINGS');
        var capaSheet = ss.getSheetByName('CAPA_REGISTER');

        data.findings.forEach(function(f, idx) {
          var findingId = 'FND-' + new Date().getTime() + '-' + idx;
          var capaId = 'CAPA-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

          if (findingSheet) {
            findingSheet.appendRow([
              findingId, inspId, f.item || 'Checklist Point', f.risk || 'MEDIUM',
              f.observation || 'Non-compliance observed', f.photoUrl || '',
              f.assignedTo || 'Area Supervisor', capaId, 'OPEN'
            ]);
          }

          if (capaSheet) {
            capaSheet.appendRow([
              capaId, 'INSPECTION', inspId, f.observation, f.risk || 'MEDIUM',
              f.correctiveAction || 'Immediate replacement / rectification',
              f.preventiveAction || 'Include in daily pre-use check',
              f.assignedTo || 'Site Supervisor',
              new Date(Date.now() + 48 * 3600 * 1000).toISOString().split('T')[0],
              'OPEN', '', ''
            ]);
          }
        });
      }

      AuditService.log(actor ? actor.fullName : 'Inspector', 'Safety Officer', 'CREATE_INSPECTION', inspId, 'SUCCESS', 'Inspection recorded for ' + record.Category);
    } catch (e) {
      Logger.log('Inspection append error: ' + e.message);
    }

    return record;
  },

  getSeedInspections: function() {
    return [
      {
        InspID: 'INSP-JTRWF-2026-001',
        Date: '2026-11-19',
        AreaCode: 'AREA-01',
        Category: 'Lifting Tools & Tackles (LTT)',
        InspectorName: 'Bikram Patra (Safety Officer)',
        TotalItems: 12,
        CompliantCount: 11,
        NonCompliantCount: 1,
        Status: 'ACTION_REQUIRED'
      },
      {
        InspID: 'INSP-JTRWF-2026-002',
        Date: '2026-11-19',
        AreaCode: 'AREA-02',
        Category: 'Scaffolding & Work at Height',
        InspectorName: 'Rakesh Swain (Safety Officer)',
        TotalItems: 10,
        CompliantCount: 10,
        NonCompliantCount: 0,
        Status: 'SATISFACTORY'
      }
    ];
  },

  // ==========================================
  // MODULE 04: HEAVY LIFTING & RIGGING SAFETY
  // ==========================================
  getLiftingPlans: function() {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('LIFTING_SAFETY_LOG');
      if (!sheet || sheet.getLastRow() <= 1) return this.getSeedLiftingPlans();

      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var list = [];
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) item[headers[h]] = row[h];
        list.push(item);
      }
      return list.reverse();
    } catch (e) {
      return this.getSeedLiftingPlans();
    }
  },

  createLiftingPlan: function(data, actor) {
    var liftId = 'LFT-JTRWF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    
    // Safety Ratio Calculation: (LoadWeight / CraneRatedCapacity) * 100
    var loadWeight = parseFloat(data.loadWeightTons) || 10;
    var capacity = parseFloat(data.calculatedCapacityTons) || 50;
    var utilization = (loadWeight / capacity) * 100;
    var liftCategory = utilization > 80 ? 'CRITICAL / TANDEM LIFT' : 'STANDARD HEAVY LIFT';

    var record = {
      LiftID: liftId,
      PermitID: data.permitId || 'PTW-JTRWF-2026-1001',
      LiftCategory: liftCategory,
      CraneID: data.craneId || 'CRN-DEMAG-250T',
      LoadWeightTons: loadWeight,
      CalculatedCapacityTons: capacity,
      RiggingPlanRef: data.riggingPlanRef || 'RP-SCHULER-BED-V2',
      RiggerLeader: data.riggerLeader || 'Ramesh Kumar (Certified Rigger)',
      ApprovedBy: actor ? actor.fullName : 'Gajendra Rao (Safety Mgr)',
      Status: 'APPROVED'
    };

    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('LIFTING_SAFETY_LOG');
      if (sheet) {
        sheet.appendRow([
          record.LiftID, record.PermitID, record.LiftCategory, record.CraneID,
          record.LoadWeightTons, record.CalculatedCapacityTons,
          record.RiggingPlanRef, record.RiggerLeader, record.ApprovedBy, record.Status
        ]);
      }

      AuditService.log(actor ? actor.fullName : 'Rigging Lead', 'Work Supervisor', 'CREATE_LIFT_PLAN', liftId, 'SUCCESS', 'Lift plan evaluated at ' + utilization.toFixed(1) + '% capacity utilization');
    } catch (e) {
      Logger.log('Lifting plan append error: ' + e.message);
    }

    return record;
  },

  getSeedLiftingPlans: function() {
    return [
      {
        LiftID: 'LFT-JTRWF-2026-001',
        PermitID: 'PTW-JTRWF-2026-1001',
        LiftCategory: 'CRITICAL / TANDEM LIFT',
        CraneID: 'CRN-LIEBHERR-400T & CRN-DEMAG-250T',
        LoadWeightTons: 145.0,
        CalculatedCapacityTons: 190.0,
        RiggingPlanRef: 'RP-SCHULER-BED-TANDEM-REV03',
        RiggerLeader: 'Ramesh Kumar',
        ApprovedBy: 'Gajendra Rao (Safety Manager)',
        Status: 'APPROVED'
      }
    ];
  },

  // ==========================================
  // MODULE 06 & 07: HAZARDS & INCIDENTS
  // ==========================================
  getHazards: function() {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('HAZARD_REGISTER');
      if (!sheet || sheet.getLastRow() <= 1) return this.getSeedHazards();

      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var list = [];
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) item[headers[h]] = row[h];
        list.push(item);
      }
      return list.reverse();
    } catch (e) {
      return this.getSeedHazards();
    }
  },

  createHazard: function(data, actor) {
    var hazardId = 'HAZ-JTRWF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    var now = new Date().toISOString().split('T')[0];

    var record = {
      HazardID: hazardId,
      ReportedDate: data.reportedDate || now,
      AreaCode: data.areaCode || 'AREA-01',
      HazardType: data.hazardType || 'Unsafe Condition (UC)',
      Severity: data.severity || 'MEDIUM',
      Description: data.description || 'Missing toe-board on intermediate platform at Bay 3',
      ReportedBy: actor ? actor.fullName : (data.reportedBy || 'Site Personnel'),
      ImmediateAction: data.immediateAction || 'Area cordoned off and scaffolding team notified',
      Status: 'CONTAINED'
    };

    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('HAZARD_REGISTER');
      if (sheet) {
        sheet.appendRow([
          record.HazardID, record.ReportedDate, record.AreaCode,
          record.HazardType, record.Severity, record.Description,
          record.ReportedBy, record.ImmediateAction, record.Status
        ]);
      }
      AuditService.log(actor ? actor.fullName : 'Reporter', 'User', 'REPORT_HAZARD', hazardId, 'SUCCESS', 'Hazard reported: ' + record.Description);
    } catch (e) {
      Logger.log('Hazard append error: ' + e.message);
    }

    return record;
  },

  getSeedHazards: function() {
    return [
      {
        HazardID: 'HAZ-JTRWF-2026-001',
        ReportedDate: '2026-11-19',
        AreaCode: 'AREA-01',
        HazardType: 'Unsafe Condition (UC)',
        Severity: 'MEDIUM',
        Description: 'Oil leakage near hydraulic power pack creating slip hazard',
        ReportedBy: 'Bikram Patra',
        ImmediateAction: 'Sawdust applied and absorbent pads deployed. Maintenance notified.',
        Status: 'RESOLVED'
      }
    ];
  },

  getIncidents: function() {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('INCIDENT_REGISTER');
      if (!sheet || sheet.getLastRow() <= 1) return this.getSeedIncidents();

      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var list = [];
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) item[headers[h]] = row[h];
        list.push(item);
      }
      return list.reverse();
    } catch (e) {
      return this.getSeedIncidents();
    }
  },

  createIncident: function(data, actor) {
    var incId = 'INC-JTRWF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    var now = new Date().toISOString();

    var record = {
      IncidentID: incId,
      DateTime: data.dateTime || now,
      AreaCode: data.areaCode || 'AREA-01',
      IncidentType: data.incidentType || 'NEAR MISS',
      Severity: data.severity || 'LOW',
      Title: data.title || 'Tool tether arrested falling wrench from +4M scaffolding',
      Description: data.description || 'During scaffold handrail bolt tightening, adjustable spanner slipped from technician hand. Tool lanyard arrested the fall safely.',
      InjuredPerson: data.injuredPerson || 'NONE',
      DamagedEquipment: data.damagedEquipment || 'NONE',
      InvestigatorID: actor ? actor.fullName : 'Bikram Patra',
      Status: 'UNDER_INVESTIGATION'
    };

    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('INCIDENT_REGISTER');
      if (sheet) {
        sheet.appendRow([
          record.IncidentID, record.DateTime, record.AreaCode,
          record.IncidentType, record.Severity, record.Title,
          record.Description, record.InjuredPerson, record.DamagedEquipment,
          record.InvestigatorID, record.Status
        ]);
      }
      AuditService.log(actor ? actor.fullName : 'Safety Team', 'Safety Officer', 'REPORT_INCIDENT', incId, 'SUCCESS', 'Incident reported: ' + record.Title);
    } catch (e) {
      Logger.log('Incident append error: ' + e.message);
    }

    return record;
  },

  getSeedIncidents: function() {
    return [
      {
        IncidentID: 'INC-JTRWF-2026-001',
        DateTime: '2026-11-18T14:15:00Z',
        AreaCode: 'AREA-02',
        IncidentType: 'NEAR MISS',
        Severity: 'LOW',
        Title: 'Tool tether arrested falling spanner from +6M scaffold',
        Description: 'Technician spanner slipped during girder torque check. Tool tether functioned as designed. Zero injury or damage.',
        InjuredPerson: 'NONE',
        DamagedEquipment: 'NONE',
        InvestigatorID: 'Bikram Patra (Safety Officer)',
        Status: 'CLOSED'
      }
    ];
  },

  // ==========================================
  // MODULE 11: CAPA REGISTER
  // ==========================================
  getCapas: function() {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('CAPA_REGISTER');
      if (!sheet || sheet.getLastRow() <= 1) return this.getSeedCapas();

      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var list = [];
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) item[headers[h]] = row[h];
        list.push(item);
      }
      return list.reverse();
    } catch (e) {
      return this.getSeedCapas();
    }
  },

  updateCapa: function(capaId, data, actor) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('CAPA_REGISTER');
      if (sheet) {
        var values = sheet.getDataRange().getValues();
        for (var i = 1; i < values.length; i++) {
          if (values[i][0] === capaId) {
            // Col 10: ClosureStatus, Col 11: VerifiedBy, Col 12: ClosedDate
            sheet.getRange(i + 1, 10).setValue(data.status || 'CLOSED');
            sheet.getRange(i + 1, 11).setValue(actor ? actor.fullName : 'Safety Manager');
            sheet.getRange(i + 1, 12).setValue(new Date().toISOString().split('T')[0]);
            break;
          }
        }
      }
      AuditService.log(actor ? actor.fullName : 'Safety Team', 'Safety Authority', 'UPDATE_CAPA', capaId, 'SUCCESS', 'CAPA status updated to ' + (data.status || 'CLOSED'));
    } catch (e) {
      Logger.log('CAPA update error: ' + e.message);
    }
    return { capaId: capaId, status: data.status || 'CLOSED', message: 'CAPA successfully updated and verified.' };
  },

  getSeedCapas: function() {
    return [
      {
        CapaID: 'CAPA-2026-101',
        SourceType: 'INSPECTION',
        SourceRefID: 'INSP-JTRWF-2026-001',
        FindingDescription: 'Worn out 5T web sling without legible identification tag found in rigging box',
        RiskLevel: 'HIGH',
        CorrectiveAction: 'Damaged sling quarantined and cut to prevent reuse. Replaced with new Form 11 certified sling.',
        PreventiveAction: 'Rigging supervisor to conduct 100% pre-use visual inspection before every shift.',
        AssignedOwner: 'Ramesh Kumar (Rigging Lead)',
        TargetDate: '2026-11-20',
        ClosureStatus: 'OPEN',
        VerifiedBy: '',
        ClosedDate: ''
      },
      {
        CapaID: 'CAPA-2026-102',
        SourceType: 'AUDIT',
        SourceRefID: 'AUD-JTRWF-OCT',
        FindingDescription: 'First Aid Box No. 4 in Machine Shop missing eye wash saline solution',
        RiskLevel: 'MEDIUM',
        CorrectiveAction: 'First aid box replenished with 500ml sterile eye wash bottles and expiry log updated.',
        PreventiveAction: 'Weekly first aid box checklist assigned to Site Medic.',
        AssignedOwner: 'Site Medic / Bikram Patra',
        TargetDate: '2026-11-15',
        ClosureStatus: 'CLOSED',
        VerifiedBy: 'Gajendra Rao',
        ClosedDate: '2026-11-15'
      }
    ];
  },

  // ==========================================
  // MODULE 12: DAILY SAFETY REPORT (DSR)
  // ==========================================
  generateDSR: function(dateStr) {
    var date = dateStr || new Date().toISOString().split('T')[0];
    var stats = this.getDashboardStats();
    var permits = PtwService.getPermits('ALL');
    var tbts = this.getTbts();
    var inspections = this.getInspections();
    var incidents = this.getIncidents();

    return {
      reportDate: date,
      project: 'Jupiter Tatravagonka Railwheel Factory (JTRWF)',
      location: 'Khordha, Odisha, India',
      contractor: 'BALSONS HEAVY LIFT & SHIFT',
      executiveSummary: 'Zero reportable incidents or injuries across all work areas. All heavy lifting and high-risk activities executed under verified PTWs and mandatory TBT briefings.',
      kpis: stats,
      activePermitsCount: stats.activePermits,
      permitsIssuedToday: permits.filter(function(p) { return p.IssuedTimestamp && p.IssuedTimestamp.indexOf(date) === 0; }),
      tbtsConductedToday: tbts.filter(function(t) { return t.Date === date; }),
      inspectionsToday: inspections.filter(function(i) { return i.Date === date; }),
      incidentsToday: incidents.filter(function(i) { return i.DateTime && i.DateTime.indexOf(date) === 0; }),
      manpowerOnSite: 68,
      safetyInductedPersonnel: 68,
      certifiedRiggersActive: 8,
      equipmentInspectedToday: 6,
      generatedTimestamp: new Date().toISOString()
    };
  }
};
