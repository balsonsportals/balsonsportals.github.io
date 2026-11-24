/**
 * BALSONS SAFETY PORTAL - API CLIENT & LOCAL FALLBACK BRIDGE
 * Baseline: SAM-2026 & BEDS V1.0
 * CORS-Safe Transport: POST text/plain
 */

const BalsonsSafetyApi = {
  // Local fallback state store
  _localStore: {
    permits: [
      {
        PermitID: 'PTW-JTRWF-2026-SPEC-0015',
        TemplateCode: 'PTW-SPEC',
        Category: 'SPECIAL / HIGH-RISK',
        AreaCode: 'AREA-03',
        WorkDescription: 'Special / High-Risk Tandem Lift of Schuler 1600T Press Tie-Rod Beam',
        Contractor: 'BALSONS HEAVY LIFT & SHIFT',
        SupervisorID: 'Ramesh Kumar (Lifting Sup.)',
        PlannedStart: '2026-11-24T09:00:00Z',
        PlannedEnd: '2026-11-24T17:00:00Z',
        RiskLevel: 'CRITICAL',
        Status: 'ISSUED',
        IssuedTimestamp: '2026-11-24T08:58:00Z',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Approved Critical JSA & Method Statement verified", "Terex Demag 250T + Kobelco 180T lift plan approved", "Ground compaction 25T/m2 verified on steel mats", "Full body harness 100% tied off", "15m exclusion barricaded"]',
        TechnicalData: '{"loadWeight":"48.0 Tons", "craneCapacity":"190.0 Tons", "radius":"9.5 Meters", "utilization":"68.5%"}'
      },
      {
        PermitID: 'PTW-JTRWF-2026-HOT-0028',
        TemplateCode: 'PTW-HOT',
        Category: 'HOT WORK',
        AreaCode: 'AREA-02',
        WorkDescription: 'Structural Hot Work: SMAW Welding & Grinding on Quenching Tank Structure Grid #B-7',
        Contractor: 'BALSONS HEAVY LIFT & SHIFT',
        SupervisorID: 'Sanjay Panda',
        PlannedStart: '2026-11-24T08:30:00Z',
        PlannedEnd: '2026-11-24T16:30:00Z',
        RiskLevel: 'HIGH',
        Status: 'ISSUED',
        IssuedTimestamp: '2026-11-24T08:30:00Z',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Approved Hot Work JSA briefed", "Combustibles removed (15m radius)", "Flammable atmosphere tested 0% LEL", "Dedicated fire watch assigned with 10kg DCP", "Fire blankets deployed"]',
        TechnicalData: '{"fireWatch":"Kailash Sahoo", "extinguisher":"2x 10kg DCP", "postWatchMinutes":45}'
      },
      {
        PermitID: 'PTW-JTRWF-2026-GEN-0041',
        TemplateCode: 'PTW-GEN',
        Category: 'GENERAL',
        AreaCode: 'AREA-01',
        WorkDescription: 'General Work: Routine Preventive Maintenance on Roller Table RT-04 Conveyor',
        Contractor: 'BALSONS HEAVY LIFT & SHIFT',
        SupervisorID: 'Rajesh K. Sharma',
        PlannedStart: '2026-11-24T08:00:00Z',
        PlannedEnd: '2026-11-24T20:00:00Z',
        RiskLevel: 'MEDIUM',
        Status: 'ISSUED',
        IssuedTimestamp: '2026-11-24T08:00:00Z',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Approved JSA briefed to crew", "Work area inspected and barricaded", "Tools inspected", "PPE worn", "LOTO lockbox verified"]',
        TechnicalData: '{"equipmentAsset":"Roller Conveyor RT-04", "isolationTag":"LOTO-MCH-2026-0044"}'
      }
    ],
    tbts: [
      {
        TbtID: 'TBT-JTRWF-2026-001',
        Date: '2026-11-19',
        Time: '07:30',
        AreaCode: 'AREA-01',
        Topic: 'Tandem Lifting Hazards & Single Banksman Hand Signals',
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
    ],
    inspections: [
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
    ],
    liftingPlans: [
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
    ],
    hazards: [
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
    ],
    incidents: [
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
    ],
    capas: [
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
    ],
    inductions: [
      {
        InductionID: 'IND-JTRWF-2026-0001',
        EmployeeID: 'EMP-2026-0001',
        FullName: 'Ramesh Kumar',
        Trade: 'Senior Rigger Lead',
        Contractor: 'BALSONS HEAVY LIFT & SHIFT',
        InductionDate: '2026-01-10',
        ValidUntil: '2027-01-09',
        SafetyPassNo: 'SP-2026-001',
        MedicalFitness: 'FIT (Form 31 Certified)',
        BloodGroup: 'O+',
        EmergencyContact: '+91 94370 11223',
        ConductedBy: 'Manoj Kumar (Safety Officer)',
        Status: 'INDUCTED',
        ClearanceStatus: 'CLEARED_FOR_WORK',
        AuthorizedAreas: ['AREA-01', 'AREA-02', 'AREA-03', 'AREA-04'],
        ActivePermitID: 'PTW-LFT-2026-0048'
      },
      {
        InductionID: 'IND-JTRWF-2026-0002',
        EmployeeID: 'EMP-2026-0002',
        FullName: 'Suresh Sharma',
        Trade: 'Welder 6G (SMAW / GTAW)',
        Contractor: 'BALSONS FABRICATION WING',
        InductionDate: '2026-02-15',
        ValidUntil: '2027-02-14',
        SafetyPassNo: 'SP-2026-002',
        MedicalFitness: 'FIT (Form 31 Certified)',
        BloodGroup: 'B+',
        EmergencyContact: '+91 94370 22334',
        ConductedBy: 'Manoj Kumar (Safety Officer)',
        Status: 'INDUCTED',
        ClearanceStatus: 'CLEARED_FOR_WORK',
        AuthorizedAreas: ['AREA-02', 'AREA-04'],
        ActivePermitID: 'PTW-HOT-2026-0043'
      },
      {
        InductionID: 'IND-JTRWF-2026-0003',
        EmployeeID: 'EMP-2026-0003',
        FullName: 'Manoj Patra',
        Trade: 'Mechanical Fitter / Scaffolder',
        Contractor: 'BALSONS STRUCTURAL ERECTORS',
        InductionDate: '2026-03-01',
        ValidUntil: '2027-02-28',
        SafetyPassNo: 'SP-2026-003',
        MedicalFitness: 'FIT (Height Pass Certified)',
        BloodGroup: 'A+',
        EmergencyContact: '+91 94370 33445',
        ConductedBy: 'Manoj Kumar (Safety Officer)',
        Status: 'INDUCTED',
        ClearanceStatus: 'CLEARED_FOR_WORK',
        AuthorizedAreas: ['AREA-01', 'AREA-03'],
        ActivePermitID: 'PTW-HT-2026-0044'
      },
      {
        InductionID: 'IND-JTRWF-2026-0004',
        EmployeeID: 'EMP-2026-0004',
        FullName: 'Bikram Jena',
        Trade: 'Chief Electrical Technician (HT)',
        Contractor: 'BALSONS ELECTRICAL SERVICES',
        InductionDate: '2026-01-20',
        ValidUntil: '2027-01-19',
        SafetyPassNo: 'SP-2026-004',
        MedicalFitness: 'FIT (Dielectric & Visual Certified)',
        BloodGroup: 'AB+',
        EmergencyContact: '+91 94370 44556',
        ConductedBy: 'Manoj Kumar (Safety Officer)',
        Status: 'INDUCTED',
        ClearanceStatus: 'CLEARED_FOR_WORK',
        AuthorizedAreas: ['AREA-04', 'AREA-06'],
        ActivePermitID: 'PTW-ELE-2026-0046'
      },
      {
        InductionID: 'IND-JTRWF-2026-0005',
        EmployeeID: 'EMP-2026-0005',
        FullName: 'Rajesh Mohanty',
        Trade: 'Hydraulic & Jacking Specialist',
        Contractor: 'BALSONS HEAVY LIFT & SHIFT',
        InductionDate: '2026-02-05',
        ValidUntil: '2027-02-04',
        SafetyPassNo: 'SP-2026-005',
        MedicalFitness: 'FIT (Form 31 Certified)',
        BloodGroup: 'O+',
        EmergencyContact: '+91 94370 55667',
        ConductedBy: 'Manoj Kumar (Safety Officer)',
        Status: 'INDUCTED',
        ClearanceStatus: 'CLEARED_FOR_WORK',
        AuthorizedAreas: ['AREA-02'],
        ActivePermitID: 'PTW-MHI-2026-0047'
      },
      {
        InductionID: 'IND-JTRWF-2026-0006',
        EmployeeID: 'EMP-2026-0006',
        FullName: 'Alok Verma',
        Trade: 'Certified Rigger & Banksman',
        Contractor: 'BALSONS HEAVY LIFT & SHIFT',
        InductionDate: '2026-02-18',
        ValidUntil: '2027-02-17',
        SafetyPassNo: 'SP-2026-006',
        MedicalFitness: 'FIT (Form 31 Certified)',
        BloodGroup: 'B+',
        EmergencyContact: '+91 94370 66778',
        ConductedBy: 'Manoj Kumar (Safety Officer)',
        Status: 'INDUCTED',
        ClearanceStatus: 'CLEARED_FOR_WORK',
        AuthorizedAreas: ['AREA-01'],
        ActivePermitID: 'PTW-LFT-2026-0048'
      },
      {
        InductionID: 'IND-JTRWF-2026-0007',
        EmployeeID: 'EMP-2026-0007',
        FullName: 'Deepak Nayak',
        Trade: 'Helper / General Trainee',
        Contractor: 'BALSONS CIVIL WING',
        InductionDate: 'PENDING',
        ValidUntil: 'PENDING',
        SafetyPassNo: 'NONE',
        MedicalFitness: 'Awaiting OHC Check',
        BloodGroup: 'O-',
        EmergencyContact: '+91 94370 77889',
        ConductedBy: 'NONE',
        Status: 'PENDING_INDUCTION',
        ClearanceStatus: 'BLOCKED_NO_INDUCTION',
        AuthorizedAreas: [],
        ActivePermitID: 'NONE'
      },
      {
        InductionID: 'IND-JTRWF-2026-0008',
        EmployeeID: 'EMP-2026-0008',
        FullName: 'Subhash Rao',
        Trade: 'Heavy Crawler Crane Operator (150T)',
        Contractor: 'BALSONS HEAVY LIFT & SHIFT',
        InductionDate: '2026-01-08',
        ValidUntil: '2027-01-07',
        SafetyPassNo: 'SP-2026-008',
        MedicalFitness: 'FIT (Eyesight & Hearing 100%)',
        BloodGroup: 'A+',
        EmergencyContact: '+91 94370 88990',
        ConductedBy: 'Manoj Kumar (Safety Officer)',
        Status: 'INDUCTED',
        ClearanceStatus: 'CLEARED_FOR_WORK',
        AuthorizedAreas: ['AREA-01', 'AREA-02'],
        ActivePermitID: 'PTW-LFT-2026-0048'
      }
    ]
  },

  // In-flight request registry for duplicate protection (V5.0 Hardened)
  _inFlight: new Map(),

  /**
   * Universal Dispatch Call (V5.0 Hardened: AbortController 10s timeout & deduplication)
   */
  call: async function(action, payload = {}, timeoutMs = 10000) {
    const actor = (typeof BalsonsSafetyAuth !== 'undefined' && BalsonsSafetyAuth.getUser) ? BalsonsSafetyAuth.getUser() : null;
    const dedupeKey = `${action}:${JSON.stringify(payload)}`;

    if (this._inFlight.has(dedupeKey)) {
      console.warn(`[BalsonsSafetyApi] In-flight request for '${action}' already in progress. Reusing promise.`);
      return this._inFlight.get(dedupeKey);
    }

    const requestPromise = (async () => {
      // If online GAS URL is configured, try network call with timeout
      if (BALSONS_SAFETY_CONFIG.APPS_SCRIPT_URL) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        try {
          const response = await fetch(BALSONS_SAFETY_CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: action, payload: payload, actor: actor }),
            signal: controller.signal,
            redirect: 'follow'
          });
          clearTimeout(timeoutId);
          if (response.ok) {
            const res = await response.json();
            if (res.success) return res;
          }
        } catch (e) {
          clearTimeout(timeoutId);
          console.warn(`[BalsonsSafetyApi] Network call fallback to local dispatch (${action}):`, e.message);
        }
      }

      // Local Fallback Handler
      return this._localDispatch(action, payload, actor);
    })();

    this._inFlight.set(dedupeKey, requestPromise);
    try {
      return await requestPromise;
    } finally {
      this._inFlight.delete(dedupeKey);
    }
  },

  _localDispatch: function(action, payload, actor) {
    payload = payload || {};
    switch (action) {
      case 'induction.list':
        let indList = this._localStore.inductions || [];
        if (payload.status && payload.status !== 'ALL') {
          indList = indList.filter(i => i.Status === payload.status);
        }
        return { success: true, data: { inductions: indList } };

      case 'induction.create':
        const newInd = {
          InductionID: 'IND-JTRWF-2026-' + Math.floor(1000 + Math.random() * 9000),
          EmployeeID: payload.EmployeeID || 'EMP-2026-0007',
          FullName: payload.FullName || 'Worker',
          Trade: payload.Trade || 'General Worker',
          Contractor: payload.Contractor || 'BALSONS HEAVY LIFT & SHIFT',
          InductionDate: payload.InductionDate || new Date().toISOString().split('T')[0],
          ValidUntil: payload.ValidUntil || new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
          SafetyPassNo: payload.SafetyPassNo || ('SP-2026-' + Math.floor(100 + Math.random() * 900)),
          MedicalFitness: payload.MedicalFitness || 'FIT (Form 31 Certified)',
          BloodGroup: payload.BloodGroup || 'O+',
          EmergencyContact: payload.EmergencyContact || '+91 94370 12345',
          ConductedBy: actor ? actor.fullName : 'Manoj Kumar (Safety Officer)',
          Status: 'INDUCTED',
          ClearanceStatus: 'CLEARED_FOR_WORK',
          AuthorizedAreas: ['AREA-01', 'AREA-02', 'AREA-03', 'AREA-04'],
          ActivePermitID: 'PTW-GEN-0042'
        };
        if (!this._localStore.inductions) this._localStore.inductions = [];
        this._localStore.inductions.unshift(newInd);
        return { success: true, data: { induction: newInd, message: 'Safety induction completed and pass issued.' } };

      case 'gate.checkClearance':
        const empId = (payload.employeeId || 'EMP-2026-0001').trim();
        const indRecord = (this._localStore.inductions || []).find(i => i.EmployeeID.toLowerCase() === empId.toLowerCase());
        const activePermits = (this._localStore.permits || []).filter(p => p.Status === 'ISSUED');
        
        let verdict = {
          employeeId: empId,
          hrStatus: 'ACTIVE',
          name: indRecord ? indRecord.FullName : (empId === 'EMP-2026-0007' ? 'Deepak Nayak' : 'Worker'),
          trade: indRecord ? indRecord.Trade : (empId === 'EMP-2026-0007' ? 'Helper / Trainee' : 'General Worker'),
          contractor: indRecord ? indRecord.Contractor : 'BALSONS HEAVY LIFT & SHIFT',
          isInducted: indRecord ? (indRecord.Status === 'INDUCTED') : false,
          safetyPassNo: indRecord ? indRecord.SafetyPassNo : 'NONE',
          validUntil: indRecord ? indRecord.ValidUntil : 'PENDING',
          medicalFitness: indRecord ? indRecord.MedicalFitness : 'PENDING',
          activePermit: activePermits.length > 0 ? activePermits[0] : null,
          authorizedToEnter: false,
          gateDecision: 'BLOCKED'
        };

        if (verdict.isInducted && verdict.medicalFitness.includes('FIT')) {
          verdict.authorizedToEnter = true;
          verdict.gateDecision = 'ACCESS_GRANTED';
        } else {
          verdict.authorizedToEnter = false;
          verdict.gateDecision = 'ACCESS_DENIED_NO_INDUCTION';
        }
        return { success: true, data: verdict };

      case 'system.ping':
        return { success: true, data: { status: 'ONLINE', mode: 'LOCAL_FALLBACK' } };

      case 'dashboard.stats':
        const active = this._localStore.permits.filter(p => p.Status === 'ISSUED').length;
        const pending = this._localStore.permits.filter(p => p.Status === 'SUBMITTED' || p.Status === 'VERIFIED_BY_SAFETY').length;
        const closed = this._localStore.permits.filter(p => p.Status === 'CLOSED').length;
        const openCapa = this._localStore.capas.filter(c => c.ClosureStatus !== 'CLOSED').length;
        return {
          success: true,
          data: {
            activePermits: active,
            pendingPermits: pending,
            closedPermits: closed,
            totalPermitsToday: this._localStore.permits.length,
            tbtsConductedToday: this._localStore.tbts.length,
            inspectionsCompleted: this._localStore.inspections.length,
            openIncidents: this._localStore.incidents.filter(i => i.Status !== 'CLOSED').length,
            openCapas: openCapa,
            safeManHours: 148520,
            lostTimeInjury: 0,
            daysWithoutLTI: 142,
            complianceScore: 98.4,
            criticalAlerts: [
              { id: 'ALT-01', text: 'Heavy Tandem Lift active in AREA-01 (Axle Forging Line) - 10M exclusion zone strictly enforced.', severity: 'WARNING' },
              { id: 'ALT-02', text: 'Hot Work welding in AREA-04 requires 30-min continuous fire watch post-completion.', severity: 'INFO' }
            ]
          }
        };

      case 'ptw.list':
        let list = this._localStore.permits;
        if (payload.filter && payload.filter !== 'ALL') {
          list = list.filter(p => p.Status === payload.filter || p.Category === payload.filter);
        }
        return { success: true, data: { permits: list } };

      case 'ptw.create':
        const tmpl = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.find(t => t.code === (payload.templateCode || payload.TemplateCode)) || BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0];
        const newPermit = {
          PermitID: payload.PermitID || payload.permitId || ('PTW-JTRWF-2026-' + Math.floor(1000 + Math.random() * 9000)),
          TemplateCode: tmpl.code,
          Category: tmpl.category,
          AreaCode: payload.areaCode || payload.AreaCode || 'AREA-01',
          WorkDescription: payload.workDescription || payload.WorkDescription || tmpl.name,
          Contractor: payload.contractor || payload.Contractor || 'BALSONS HEAVY LIFT & SHIFT',
          SupervisorID: payload.SupervisorID || (actor ? actor.fullName : 'Ramesh Kumar'),
          PlannedStart: payload.plannedStart || payload.PlannedStart || new Date().toISOString(),
          PlannedEnd: payload.plannedEnd || payload.PlannedEnd || new Date(Date.now() + tmpl.validity * 3600000).toISOString(),
          RiskLevel: payload.riskLevel || payload.RiskLevel || 'HIGH',
          Status: payload.Status || 'ISSUED',
          IssuedTimestamp: new Date().toISOString(),
          ClosedTimestamp: '',
          PrerequisitesChecked: JSON.stringify(payload.prerequisites || tmpl.prerequisites)
        };
        this._localStore.permits.unshift(newPermit);
        return { success: true, data: { permit: newPermit, message: 'Permit submitted successfully for verification.' } };

      case 'ptw.verify':
        const pVerify = this._localStore.permits.find(p => p.PermitID === payload.permitId);
        if (pVerify) pVerify.Status = 'VERIFIED_BY_SAFETY';
        return { success: true, data: { permitId: payload.permitId, status: 'VERIFIED_BY_SAFETY', message: 'Verified by Safety Officer.' } };

      case 'ptw.approve':
        const pApprove = this._localStore.permits.find(p => p.PermitID === payload.permitId);
        if (pApprove) {
          pApprove.Status = 'ISSUED';
          pApprove.IssuedTimestamp = new Date().toISOString();
        }
        return { success: true, data: { permitId: payload.permitId, status: 'ISSUED', message: 'Permit officially issued!' } };

      case 'ptw.reject':
        const pReject = this._localStore.permits.find(p => p.PermitID === payload.permitId);
        if (pReject) pReject.Status = 'REJECTED';
        return { success: true, data: { permitId: payload.permitId, status: 'REJECTED', message: 'Permit has been rejected.' } };

      case 'ptw.close':
        const pClose = this._localStore.permits.find(p => p.PermitID === payload.permitId);
        if (pClose) {
          pClose.Status = 'CLOSED';
          pClose.ClosedTimestamp = new Date().toISOString();
        }
        return { success: true, data: { permitId: payload.permitId, status: 'CLOSED', message: 'Permit safely closed and worksite handed back.' } };

      case 'tbt.list':
        return { success: true, data: { tbts: this._localStore.tbts } };

      case 'tbt.create':
        const newTbt = {
          TbtID: 'TBT-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          Date: payload.date || new Date().toISOString().split('T')[0],
          Time: payload.time || '08:00',
          AreaCode: payload.areaCode || 'AREA-01',
          Topic: payload.topic || 'Workplace Safety & Rigging Controls',
          SupervisorID: actor ? actor.fullName : 'Ramesh Kumar',
          AttendeesCount: payload.attendeesCount || 10,
          PhotoUrl: 'assets/images/tbt_sample.jpg',
          KeyPointsDiscussed: payload.keyPoints || 'Pinch points, 100% tie-off, housekeeping.',
          Status: 'CONDUCTED'
        };
        this._localStore.tbts.unshift(newTbt);
        return { success: true, data: { tbt: newTbt, message: 'Toolbox Talk recorded.' } };

      case 'inspection.list':
        return { success: true, data: { inspections: this._localStore.inspections } };

      case 'inspection.create':
        const nonComp = parseInt(payload.nonCompliantCount) || 0;
        const newInsp = {
          InspID: 'INSP-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          Date: payload.date || new Date().toISOString().split('T')[0],
          AreaCode: payload.areaCode || 'AREA-01',
          Category: payload.category || 'General Safety Inspection',
          InspectorName: actor ? actor.fullName : 'Bikram Patra',
          TotalItems: payload.totalItems || 10,
          CompliantCount: payload.compliantCount || 10,
          NonCompliantCount: nonComp,
          Status: nonComp > 0 ? 'ACTION_REQUIRED' : 'SATISFACTORY'
        };
        this._localStore.inspections.unshift(newInsp);
        if (nonComp > 0 && payload.observation) {
          const newCapa = {
            CapaID: 'CAPA-2026-' + Math.floor(100 + Math.random() * 900),
            SourceType: 'INSPECTION',
            SourceRefID: newInsp.InspID,
            FindingDescription: payload.observation,
            RiskLevel: payload.riskLevel || 'MEDIUM',
            CorrectiveAction: payload.correctiveAction || 'Immediate rectification on site',
            PreventiveAction: payload.preventiveAction || 'Supervisory checklist review',
            AssignedOwner: payload.assignedOwner || 'Area Supervisor',
            TargetDate: new Date(Date.now() + 48 * 3600000).toISOString().split('T')[0],
            ClosureStatus: 'OPEN',
            VerifiedBy: '',
            ClosedDate: ''
          };
          this._localStore.capas.unshift(newCapa);
        }
        return { success: true, data: { inspection: newInsp, message: 'Inspection logged.' } };

      case 'lifting.list':
        return { success: true, data: { liftingPlans: this._localStore.liftingPlans } };

      case 'lifting.create':
        const load = parseFloat(payload.loadWeightTons) || 10;
        const cap = parseFloat(payload.calculatedCapacityTons) || 50;
        const util = (load / cap) * 100;
        const newLift = {
          LiftID: 'LFT-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          PermitID: payload.permitId || 'PTW-JTRWF-2026-1001',
          LiftCategory: util > 80 ? 'CRITICAL / TANDEM LIFT' : 'STANDARD HEAVY LIFT',
          CraneID: payload.craneId || 'CRN-DEMAG-250T',
          LoadWeightTons: load,
          CalculatedCapacityTons: cap,
          RiggingPlanRef: payload.riggingPlanRef || 'RP-SCHULER-V1',
          RiggerLeader: payload.riggerLeader || 'Ramesh Kumar',
          ApprovedBy: actor ? actor.fullName : 'Gajendra Rao',
          Status: 'APPROVED'
        };
        this._localStore.liftingPlans.unshift(newLift);
        return { success: true, data: { liftingPlan: newLift, message: 'Lifting plan verified.' } };

      case 'hazard.list':
        return { success: true, data: { hazards: this._localStore.hazards } };

      case 'hazard.create':
        const newHaz = {
          HazardID: 'HAZ-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          ReportedDate: payload.reportedDate || new Date().toISOString().split('T')[0],
          AreaCode: payload.areaCode || 'AREA-01',
          HazardType: payload.hazardType || 'Unsafe Act (UA)',
          Severity: payload.severity || 'MEDIUM',
          Description: payload.description || 'Observed hazard',
          ReportedBy: actor ? actor.fullName : 'Site Personnel',
          ImmediateAction: payload.immediateAction || 'Contained immediately',
          Status: 'CONTAINED'
        };
        this._localStore.hazards.unshift(newHaz);
        return { success: true, data: { hazard: newHaz, message: 'Hazard reported.' } };

      case 'incident.list':
        return { success: true, data: { incidents: this._localStore.incidents } };

      case 'incident.create':
        const newInc = {
          IncidentID: 'INC-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          DateTime: payload.dateTime || new Date().toISOString(),
          AreaCode: payload.areaCode || 'AREA-01',
          IncidentType: payload.incidentType || 'NEAR MISS',
          Severity: payload.severity || 'LOW',
          Title: payload.title || 'Near Miss Event Reported',
          Description: payload.description || '',
          InjuredPerson: payload.injuredPerson || 'NONE',
          DamagedEquipment: payload.damagedEquipment || 'NONE',
          InvestigatorID: actor ? actor.fullName : 'Bikram Patra',
          Status: 'UNDER_INVESTIGATION'
        };
        this._localStore.incidents.unshift(newInc);
        return { success: true, data: { incident: newInc, message: 'Incident reported.' } };

      case 'capa.list':
        return { success: true, data: { capas: this._localStore.capas } };

      case 'capa.update':
        const capa = this._localStore.capas.find(c => c.CapaID === payload.capaId);
        if (capa) {
          capa.ClosureStatus = payload.status || 'CLOSED';
          capa.VerifiedBy = actor ? actor.fullName : 'Safety Manager';
          capa.ClosedDate = new Date().toISOString().split('T')[0];
        }
        return { success: true, data: { capaId: payload.capaId, message: 'CAPA updated.' } };

      case 'reports.generateDSR':
        const dateStr = payload.date || new Date().toISOString().split('T')[0];
        return {
          success: true,
          data: {
            dsr: {
              reportDate: dateStr,
              project: BALSONS_SAFETY_CONFIG.PROJECT_NAME,
              location: BALSONS_SAFETY_CONFIG.LOCATION,
              contractor: BALSONS_SAFETY_CONFIG.CONTRACTOR_NAME,
              executiveSummary: 'Zero reportable injuries or LTIs across all active bays. Heavy lifting of press components executed in full adherence with approved rigging plans.',
              kpis: {
                safeManHours: 148520,
                daysWithoutLTI: 142,
                activePermits: this._localStore.permits.filter(p => p.Status === 'ISSUED').length,
                tbtsConductedToday: this._localStore.tbts.length,
                openIncidents: 0,
                complianceScore: 98.4
              },
              manpowerOnSite: 68,
              certifiedRiggersActive: 8,
              equipmentInspectedToday: 6,
              permits: this._localStore.permits,
              tbts: this._localStore.tbts,
              capas: this._localStore.capas
            }
          }
        };

      default:
        return { success: true, data: {} };
    }
  }
};
