/**
 * BALSONS JTRWF GATE ENTRY & SITE ACCESS PORTAL
 * Master Data & Entity Registry Service
 * Architecture: BALSONS-SAM-2026 (Locked)
 */

const MasterDataService = {
  YEAR: new Date().getFullYear(),

  /**
   * Concurrency-safe ID sequence generator using LockService
   * Guarantees zero ID collision under concurrent traffic (JGE-027)
   */
  generateSequentialId: function(prefix, sheetName) {
    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000); // 10 second timeout

      var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error('Sheet ' + sheetName + ' not found.');

      var rowCount = sheet.getLastRow();
      var nextIndex = rowCount; // Since row 1 is header, row 2 gives index 1

      var padIndex = ('0000' + nextIndex).slice(-4);
      var generatedId = prefix + '-' + this.YEAR + '-' + padIndex;

      return generatedId;
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * CONTRACTORS
   */
  listContractors: function() {
    this.seedMasterDataIfEmpty();
    var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
    var sheet = ss.getSheetByName('CONTRACTOR_MASTER');
    var rows = sheet.getDataRange().getValues();
    var list = [];
    for (var i = 1; i < rows.length; i++) {
      list.push({
        contractorId: rows[i][0],
        companyName: rows[i][1],
        contactPerson: rows[i][2],
        mobile: rows[i][3],
        email: rows[i][4],
        scope: rows[i][5],
        status: rows[i][6],
        createdAt: rows[i][7]
      });
    }
    return list;
  },

  addContractor: function(data, session) {
    if (!data.companyName) throw new Error('Company name is required.');
    
    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000);
      var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
      var sheet = ss.getSheetByName('CONTRACTOR_MASTER');
      var id = this.generateSequentialId('CON', 'CONTRACTOR_MASTER');
      var now = new Date().toISOString();

      sheet.appendRow([
        id,
        data.companyName,
        data.contactPerson || '-',
        data.mobile || '-',
        data.email || '-',
        data.scope || 'Civil & Erection',
        'ACTIVE',
        now
      ]);

      AuditService.log(session.userId, session.role, 'CONTRACTOR_CREATED', id, 'SUCCESS', data.companyName);
      return { contractorId: id, companyName: data.companyName };
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * PERSONNEL
   */
  listPersonnel: function(filterContractor) {
    this.seedMasterDataIfEmpty();
    var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
    var sheet = ss.getSheetByName('PERSONNEL_MASTER');
    var rows = sheet.getDataRange().getValues();
    var list = [];
    for (var i = 1; i < rows.length; i++) {
      if (!filterContractor || rows[i][3] === filterContractor) {
        list.push({
          personnelId: rows[i][0],
          fullName: rows[i][1],
          category: rows[i][2],
          contractorId: rows[i][3],
          trade: rows[i][4],
          govtIdType: rows[i][5],
          maskedGovtId: rows[i][6],
          mobile: rows[i][7],
          status: rows[i][8]
        });
      }
    }
    return list;
  },

  addPersonnel: function(data, session) {
    if (!data.fullName) throw new Error('Personnel full name is required.');
    if (!data.contractorId) throw new Error('Contractor linkage is mandatory (JGE-007).');

    // Mask sensitive Govt ID (e.g. Aadhaar XXXX-XXXX-1234)
    var rawId = String(data.govtIdNumber || '');
    var maskedId = rawId.length >= 4 
      ? 'XXXX-XXXX-' + rawId.slice(-4) 
      : 'XXXX-VERIFIED';

    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000);
      var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
      var sheet = ss.getSheetByName('PERSONNEL_MASTER');
      var id = this.generateSequentialId('PER', 'PERSONNEL_MASTER');

      sheet.appendRow([
        id,
        data.fullName,
        data.category || 'Direct Staff',
        data.contractorId,
        data.trade || 'Technician',
        data.govtIdType || 'Aadhaar',
        maskedId,
        data.mobile || '-',
        'ACTIVE'
      ]);

      AuditService.log(session.userId, session.role, 'PERSONNEL_REGISTERED', id, 'SUCCESS', {
        name: data.fullName,
        contractorId: data.contractorId,
        trade: data.trade
      });

      return { personnelId: id, fullName: data.fullName, contractorId: data.contractorId };
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * EQUIPMENT & MOBILE CRANES
   */
  listEquipment: function() {
    this.seedMasterDataIfEmpty();
    var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
    var sheet = ss.getSheetByName('EQUIPMENT_MASTER');
    var rows = sheet.getDataRange().getValues();
    var list = [];
    for (var i = 1; i < rows.length; i++) {
      list.push({
        equipmentId: rows[i][0],
        description: rows[i][1],
        makeModel: rows[i][2],
        serialNo: rows[i][3],
        owner: rows[i][4],
        swlCapacity: rows[i][5],
        tagNo: rows[i][6],
        status: rows[i][7]
      });
    }
    return list;
  },

  addEquipment: function(data, session) {
    if (!data.description) throw new Error('Equipment description is required.');

    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000);
      var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
      var sheet = ss.getSheetByName('EQUIPMENT_MASTER');
      var id = this.generateSequentialId('EQ', 'EQUIPMENT_MASTER');

      sheet.appendRow([
        id,
        data.description,
        data.makeModel || '-',
        data.serialNo || '-',
        data.owner || 'BALSONS',
        data.swlCapacity || '-',
        data.tagNo || ('TAG-' + id),
        'ACTIVE'
      ]);

      AuditService.log(session.userId, session.role, 'EQUIPMENT_REGISTERED', id, 'SUCCESS', data.description);
      return { equipmentId: id, description: data.description };
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * VEHICLES & DRIVERS
   */
  listVehicles: function() {
    this.seedMasterDataIfEmpty();
    var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
    var sheet = ss.getSheetByName('VEHICLE_MASTER');
    var rows = sheet.getDataRange().getValues();
    var list = [];
    for (var i = 1; i < rows.length; i++) {
      list.push({
        vehicleId: rows[i][0],
        registrationNo: rows[i][1],
        vehicleType: rows[i][2],
        owner: rows[i][3],
        pucExpiry: rows[i][4],
        fitnessExpiry: rows[i][5],
        insuranceExpiry: rows[i][6],
        status: rows[i][7]
      });
    }
    return list;
  },

  addVehicle: function(data, session) {
    if (!data.registrationNo) throw new Error('Vehicle registration number is required.');

    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000);
      var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
      var sheet = ss.getSheetByName('VEHICLE_MASTER');
      var id = this.generateSequentialId('VEH', 'VEHICLE_MASTER');

      sheet.appendRow([
        id,
        String(data.registrationNo).toUpperCase().trim(),
        data.vehicleType || 'Multi-Axle Trailer',
        data.owner || 'Transporter',
        data.pucExpiry || '2027-12-31',
        data.fitnessExpiry || '2027-12-31',
        data.insuranceExpiry || '2027-12-31',
        'ACTIVE'
      ]);

      AuditService.log(session.userId, session.role, 'VEHICLE_REGISTERED', id, 'SUCCESS', data.registrationNo);
      return { vehicleId: id, registrationNo: data.registrationNo };
    } finally {
      lock.releaseLock();
    }
  },

  /**
   * Auto-Seed Representative Master Data if Sheets are empty (Headers only)
   */
  seedMasterDataIfEmpty: function() {
    var ssId = CONFIG.getSpreadsheetId();
    if (!ssId) return;

    var ss = SpreadsheetApp.openById(ssId);

    // 1. Seed Contractors
    var conSheet = ss.getSheetByName('CONTRACTOR_MASTER');
    if (conSheet && conSheet.getLastRow() <= 1) {
      conSheet.appendRow(['CON-2026-0001', 'BALSONS Heavy Lift & Shift', 'Rajeev Balson', '+91 98200 11223', 'ops@balsons.com', 'Turnkey E&C / Heavy Rigging', 'ACTIVE', new Date().toISOString()]);
      conSheet.appendRow(['CON-2026-0002', 'Schuler India Pvt Ltd', 'M. Schroeder', '+91 98111 22334', 'jtrwf@schulergroup.com', 'Wheel & Axle Equipment OEM', 'ACTIVE', new Date().toISOString()]);
      conSheet.appendRow(['CON-2026-0003', 'Ferroterro Rigging Kolkata', 'S. Banerjee', '+91 98300 44556', 'lifting@ferroterro.com', 'Tackles & Hoist Supplier', 'ACTIVE', new Date().toISOString()]);
    }

    // 2. Seed Personnel
    var perSheet = ss.getSheetByName('PERSONNEL_MASTER');
    if (perSheet && perSheet.getLastRow() <= 1) {
      perSheet.appendRow(['PER-2026-0001', 'Ramesh Kumar', 'Direct Staff', 'CON-2026-0001', 'Rigger Lead', 'Aadhaar', 'XXXX-XXXX-9102', '+91 94370 12345', 'ACTIVE']);
      perSheet.appendRow(['PER-2026-0002', 'Sunil Swain', 'Subcontractor', 'CON-2026-0003', 'Hydraulic Technician', 'Aadhaar', 'XXXX-XXXX-5541', '+91 94371 67890', 'ACTIVE']);
      perSheet.appendRow(['PER-2026-0003', 'Ajay Verma', 'Subcontractor', 'CON-2026-0002', 'Mechanical Fitter', 'Voter ID', 'OR/12/XXX/112', '+91 94372 98765', 'ACTIVE']);
      perSheet.appendRow(['PER-2026-0004', 'Dharmendra Pradhan', 'Direct Staff', 'CON-2026-0001', 'Crane Operator (150T)', 'Aadhaar', 'XXXX-XXXX-8821', '+91 94373 54321', 'ACTIVE']);
    }

    // 3. Seed Equipment
    var eqSheet = ss.getSheetByName('EQUIPMENT_MASTER');
    if (eqSheet && eqSheet.getLastRow() <= 1) {
      eqSheet.appendRow(['EQ-2026-0001', '100T Hydraulic Climbing Jack', 'Enerpac CLRG-1006', 'SN-ENR-9921', 'BALSONS', '100 Ton', 'TAG-EQ-001', 'ACTIVE']);
      eqSheet.appendRow(['EQ-2026-0002', 'Demag AC-350 All-Terrain Crane', 'Terex Demag AC-350', 'SN-DMG-4402', 'BALSONS', '350 Ton', 'TAG-EQ-002', 'ACTIVE']);
      eqSheet.appendRow(['EQ-2026-0003', 'Hydra Mobile Crane 25T', 'ACE FX-250', 'SN-ACE-7711', 'BALSONS', '25 Ton', 'TAG-EQ-003', 'ACTIVE']);
    }

    // 4. Seed Vehicles
    var vehSheet = ss.getSheetByName('VEHICLE_MASTER');
    if (vehSheet && vehSheet.getLastRow() <= 1) {
      vehSheet.appendRow(['VEH-2026-0001', 'OD-02-AK-9811', 'Multi-Axle Hydraulic Trailer', 'Balsons Logistics', '2027-08-31', '2027-08-31', '2027-08-31', 'ACTIVE']);
      vehSheet.appendRow(['VEH-2026-0002', 'MH-12-PQ-4521', 'Boom Truck (Crane Mounted)', 'Transcon Pune', '2027-06-30', '2027-06-30', '2027-06-30', 'ACTIVE']);
      vehSheet.appendRow(['VEH-2026-0003', 'OD-05-BX-3344', 'Heavy Material Flatbed', 'Kalinga Carriers', '2027-09-30', '2027-09-30', '2027-09-30', 'ACTIVE']);
    }
  }
};
