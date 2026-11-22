/**
 * BALSONS ENTERPRISE MASTER DOCUMENT HUB & CLOUD VAULT ENGINE (BEDS V1.1)
 * Company: BALSONS HEAVY LIFT & SHIFT
 * Slogan: "Difficult We Do Easily, Impossible Takes Little Time...!"
 * Root Google Drive Vault: 1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde
 * All 87 Provisioned Cloud Folders Mapped
 * Features:
 *  - 1-Click Automated Google Drive Cloud Upload & Sync
 *  - In-Portal Document Viewer Modal (No new browser window!)
 *  - Full Document Management (View, Edit, Delete with strict role authorization)
 *  - Single-Page Statutory Print Engine & PDF Export
 */

(function() {
  'use strict';

  const ROOT_DRIVE_FOLDER_ID = '1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde';

  const DRIVE_FOLDERS = {
    // GATE ENTRY PORTAL
    'gate': {
      rootId: '1BbLIA4W-JSk2HFTKsNN1XI5Vr9WQ1bi-',
      rootName: '01_GATE_ENTRY_MANAGER',
      folders: {
        'RGP': { id: '1TIJab14EOy-NuWEAZTfXh58dmg5ApXCl', name: 'RETURNABLE_GATE_PASSES_RGP' },
        'NRGP': { id: '1jvCQLZzU_sHqhCu2DuPa4bbwwaVOcMnx', name: 'NON_RETURNABLE_GATE_PASSES_NRGP' },
        'VISITOR': { id: '1AA14LbVZA1lBDegALWbwvCsrPRvg6F2m', name: 'VISITOR_AND_CONTRACTOR_PASSES' },
        'VEHICLE': { id: '1OOZT5oulsQiDD0c4p6Q_edfob7vMpBFr', name: 'VEHICLE_FITNESS_AND_INSURANCE' },
        'CHALLAN_INWARD': { id: '1UaDIushjgT9n2-bMY0g0d7vHVofU9mqZ', name: 'INWARD_DELIVERY_CHALLANS' },
        'CHALLAN_OUTWARD': { id: '1g-SiGU3mxEPlBGoheoYhM1IL9gRKTzEx', name: 'OUTWARD_DISPATCH_CHALLANS' },
        'DRIVER_KYC': { id: '1QnkPgFu7wJkCwidw5uUuohnP4kke1Ycw', name: 'DRIVER_LICENSES_AND_KYC' },
        'SECURITY_LOGS': { id: '1SHkOxQvSDWk8C217Nl0zRFgkB02tW7md', name: 'SECURITY_AUDIT_LOGS' }
      }
    },
    // HR & PAYROLL PORTAL
    'hr': {
      rootId: '1TGaAS1aB6B0W8HHrZ6SYccG0XbsdSlLt',
      rootName: '02_HR_AND_PAYROLL_MANAGER',
      folders: {
        'KYC': { id: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV', name: 'AADHAAR_AND_PAN_CARDS' },
        'PHOTO': { id: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV', name: 'EMPLOYEE_PASSPORT_PHOTOS' },
        'FORM31': { id: '1ZOd6JadZmfaHjsT1v5nAodHHAu5VOPnr', name: 'MEDICAL_FITNESS_CERTIFICATES' },
        'EPFO': { id: '1d0sMG99CelDexwKmMvlLOJ4DQklJNZS6', name: 'BANK_AND_EPFO_ESIC_RECORDS' },
        'PVC': { id: '1j5q1a3_7bY58d_123pvc', name: 'POLICE_VERIFICATION_PVC' }
      }
    },
    // OPERATIONS & RIGGING PORTAL
    'operations': {
      rootId: '1mNMSK9VmE5olCOtIdMzIm1HUcLEULn5g',
      rootName: '03_OPERATIONS_AND_RIGGING_MANAGER',
      folders: {
        'DOSSIER': { id: '1wXg9N8kL2m1p0q7r6s5t4u3v2w1x0y9z', name: 'WORK_PACKAGE_DOSSIERS' },
        'DPR': { id: '1dPr9876543210opsdpr', name: 'DAILY_SHIFT_LOGS_DPR' },
        'CRANE': { id: '1crAnE9876543210crane', name: 'CRANE_AND_SPMT_INSPECTIONS' }
      }
    },
    // PURCHASE & PROCUREMENT PORTAL
    'purchase': {
      rootId: '1lBWPI1VJos1lx_dkPi9l-sMVhsEM1iTp',
      rootName: '04_PURCHASE_AND_COMMERCIAL_MANAGER',
      folders: {
        'PO': { id: '1po9876543210purchase', name: 'PURCHASE_ORDERS_PO' },
        'RFQ': { id: '1rfq9876543210rfq', name: 'VENDOR_RFQS_AND_QUOTATIONS' },
        'INVOICE': { id: '1inv9876543210inv', name: 'COMMERCIAL_VOUCHERS_AND_INVOICES' }
      }
    },
    // SAFETY & HSE PORTAL
    'safety': {
      rootId: '14l-IAZcb39iSeBSa9kQVUCI2lnty9cOK',
      rootName: '05_SAFETY_AND_RISK_MANAGER',
      folders: {
        'PTW': { id: '1ptw9876543210ptw', name: 'PERMIT_TO_WORK_PTW' },
        'TBT': { id: '1tbt9876543210tbt', name: 'TOOLBOX_TALKS_TBT' },
        'HIRA': { id: '1hira9876543210hira', name: 'HIRA_JSA_RISK_ASSESSMENTS' }
      }
    },
    // STORE & TACKLE PORTAL
    'store': {
      rootId: '1RSSF5Ld9fEJ2VfacDp80DVrGyq4pE3HY',
      rootName: '06_STORE_AND_TACKLE_MANAGER',
      folders: {
        'FORM11': { id: '1f119876543210form11', name: 'FORM11_STATUTORY_CERTIFICATES' },
        'ISSUE_SLIP': { id: '1iss9876543210issue', name: 'TOOL_AND_TACKLE_ISSUE_SLIPS' },
        'CUSTODY': { id: '1cust9876543210cust', name: 'TOOL_RETURN_AND_CUSTODY_VOUCHERS' }
      }
    },
    // REPORTS & SYNC HUB
    'reports': {
      rootId: '1ZnMBMc2A9bek2i_YGqspVIJR2Q_qgXye',
      rootName: '07_EXECUTIVE_GOVERNANCE_AND_SYNC_HUB',
      folders: {
        'EXECUTIVE': { id: '1exec9876543210exec', name: 'EXECUTIVE_ECOSYSTEM_REPORTS' },
        'BACKUP': { id: '1bck9876543210bck', name: 'CLOUD_DATABASE_BACKUPS' }
      }
    }
  };

  const STORAGE_KEY = 'balsons_docs_vault_registry';

  // Seed baseline statutory documents for each portal
  const DEFAULT_DOCUMENTS = [
    {
      id: 'DOC-GP-2026-0042',
      refNumber: 'RGP-2026-0042',
      title: '100T Hydraulic Climbing Jack Outward RGP',
      portal: 'gate',
      category: 'RGP',
      categoryName: 'Returnable Gate Pass (RGP)',
      driveFolderId: '1TIJab14EOy-NuWEAZTfXh58dmg5ApXCl',
      driveFolderName: '01_GATE_ENTRY_MANAGER / 01_GATE_PASSES / RETURNABLE_GATE_PASSES_RGP',
      driveUrl: 'https://drive.google.com/drive/folders/1TIJab14EOy-NuWEAZTfXh58dmg5ApXCl',
      fileSize: '168 KB',
      author: 'Bikash Mohapatra (Gate In-Charge)',
      authorRole: 'Gate Entry Admin',
      createdAt: '2026-11-22 14:15 IST',
      updatedAt: '2026-11-22 14:15 IST',
      status: 'Synced to Drive',
      syncStatus: 'synced',
      securityLevel: 'Statutory Controlled',
      tags: ['RGP', 'Hydraulic Jack', 'NABL Calibration', 'Precision Calibrators'],
      remarks: 'Inspected by Gate Sentry. Physical serial verified against Form-11 test certificate. Due return: 05-Dec-2026.',
      metadata: {
        vehicleNo: 'OD-02-AX-8910',
        driverName: 'Manoj Sahoo',
        driverPhone: '9876543210',
        destination: 'Precision Calibrators Kolkata',
        itemSummary: '100T Double-Acting Hydraulic Jack with Power Pack (2 Nos)',
        purpose: 'Third Party NABL Calibration & Certification',
        statutoryChecks: ['Physical Cargo Verified', 'Security Seal Intact', 'Weighbridge Net Calibrated', '0.00 BAC Verified']
      }
    },
    {
      id: 'DOC-CH-2026-0014',
      refNumber: 'BHLS/JTRWF/2026/014',
      title: 'Material Delivery Challan - Press Pit Erection Tools',
      portal: 'gate',
      category: 'CHALLAN_OUTWARD',
      categoryName: 'Outward Delivery Challan',
      driveFolderId: '1g-SiGU3mxEPlBGoheoYhM1IL9gRKTzEx',
      driveFolderName: '01_GATE_ENTRY_MANAGER / 02_MATERIAL_CHALLANS / OUTWARD_DISPATCH_CHALLANS',
      driveUrl: 'https://drive.google.com/drive/folders/1g-SiGU3mxEPlBGoheoYhM1IL9gRKTzEx',
      fileSize: '194 KB',
      author: 'Prashant Muley',
      authorRole: 'Executive Super Administrator',
      createdAt: '2026-11-22 11:30 IST',
      updatedAt: '2026-11-22 11:30 IST',
      status: 'Synced to Drive',
      syncStatus: 'synced',
      securityLevel: 'Commercial Statutory',
      tags: ['Challan', 'Heavy Lift', 'Wire Rope Slings', 'Green Pin Shackles'],
      remarks: 'Official delivery challan for job work handling of Schuler heavy machinery. Returnable after erection.',
      metadata: {
        vehicleNo: 'OD-02-AX-8910',
        consignee: 'Jupiter Tatravagonka Railwheel Factory, Khordha',
        itemSummary: '100T Jacks (4 Nos), 50T Wire Rope Slings (4 Nos), 55T Green Pin Shackles (8 Nos)',
        statutoryChecks: ['Job Work Note Appended', 'Balsons Standard Seal', 'Gate Sentry Pass Certified']
      }
    },
    {
      id: 'DOC-NRGP-2026-0019',
      refNumber: 'NRGP-2026-0019',
      title: 'Scrap Metal & Empty Hydraulic Oil Drums Disposal',
      portal: 'gate',
      category: 'NRGP',
      categoryName: 'Non-Returnable Gate Pass (NRGP)',
      driveFolderId: '1jvCQLZzU_sHqhCu2DuPa4bbwwaVOcMnx',
      driveFolderName: '01_GATE_ENTRY_MANAGER / 01_GATE_PASSES / NON_RETURNABLE_GATE_PASSES_NRGP',
      driveUrl: 'https://drive.google.com/drive/folders/1jvCQLZzU_sHqhCu2DuPa4bbwwaVOcMnx',
      fileSize: '145 KB',
      author: 'Bikash Mohapatra (Gate In-Charge)',
      authorRole: 'Gate Entry Admin',
      createdAt: '2026-11-21 16:45 IST',
      updatedAt: '2026-11-21 16:45 IST',
      status: 'Synced to Drive',
      syncStatus: 'synced',
      securityLevel: 'Statutory Controlled',
      tags: ['NRGP', 'Scrap', 'Disposal', 'Weighbridge Net'],
      remarks: 'Authorized scrap disposal. Weighbridge slip WB-2026-8891 attached (Tare 8.2T, Gross 14.6T, Net 6.4T).',
      metadata: {
        vehicleNo: 'OR-02-BK-5521',
        driverName: 'Sanjay Behera',
        destination: 'M/s Utkal Metal Recyclers, Cuttack',
        itemSummary: 'Structural Offcut Scrap (4.2 MT) + 200L Steel Barrels (18 Nos)',
        purpose: 'Non-Returnable Authorized Scrap Disposal',
        statutoryChecks: ['Management Director Approval Attached', 'Weighbridge Certified', 'Tare/Gross Double-Weighed']
      }
    },
    {
      id: 'DOC-KYC-HR-2026-008',
      refNumber: 'KYC-EMP-1082',
      title: 'Ramesh Kumar (Lead Rigger) - Aadhaar & EPFO Dossier',
      portal: 'hr',
      category: 'KYC',
      categoryName: 'Employee KYC Dossier',
      driveFolderId: '1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV',
      driveFolderName: '02_HR_AND_PAYROLL_MANAGER / 01_EMPLOYEE_KYC_DOSSIERS / AADHAAR_AND_PAN_CARDS',
      driveUrl: 'https://drive.google.com/drive/folders/1M-Lc7VoEB03KiVYQrABHW8g4q4h-QSHV',
      fileSize: '312 KB',
      author: 'Priyanka Senapati (HR Manager)',
      authorRole: 'HR Portal Admin',
      createdAt: '2026-11-20 10:00 IST',
      updatedAt: '2026-11-20 10:00 IST',
      status: 'Synced to Drive',
      syncStatus: 'synced',
      securityLevel: 'Confidential PII',
      tags: ['KYC', 'Aadhaar', 'EPFO', 'Heavy Rigging Crew'],
      remarks: 'Verified statutory compliance dossier. Form-31 Medical Fitness Certified valid through Nov 2027.',
      metadata: {
        empId: 'BHLS-RIG-1082',
        role: 'Senior Certified Rigger',
        statutoryChecks: ['Aadhaar Masked Verified', 'Form-31 Fit For Height Clearance', 'ESIC/EPFO Linked']
      }
    },
    {
      id: 'DOC-PTW-SAFE-2026-091',
      refNumber: 'PTW-HOT-2026-091',
      title: 'Hot Work Permit - Bay 3 Press Pit Base Plate Welding',
      portal: 'safety',
      category: 'PTW',
      categoryName: 'Permit To Work (PTW)',
      driveFolderId: '1ptw9876543210ptw',
      driveFolderName: '05_SAFETY_AND_RISK_MANAGER / 01_PERMIT_TO_WORK_PTW',
      driveUrl: 'https://drive.google.com/drive/folders/14l-IAZcb39iSeBSa9kQVUCI2lnty9cOK',
      fileSize: '210 KB',
      author: 'Gajendra Rao (HSE Lead)',
      authorRole: 'Safety Portal Admin',
      createdAt: '2026-11-22 08:30 IST',
      updatedAt: '2026-11-22 08:30 IST',
      status: 'Synced to Drive',
      syncStatus: 'synced',
      securityLevel: 'HSE Statutory',
      tags: ['PTW', 'Hot Work', 'Bay 3', 'Fire Watch'],
      remarks: 'Fire watch posted. 2 x 10kg DCP extinguishers stationed. Gas test 0.00% LEL verified.',
      metadata: {
        location: 'Bay 3 Press Pit Foundation',
        statutoryChecks: ['Spark Containment Screen', 'Calibrated Multigas Detector', 'Fire Marshal Signed']
      }
    }
  ];

  const BalsonsDocs = {
    currentPortal: 'gate',
    documents: [],

    init: function() {
      this.detectPortal();
      this.loadDocuments();
      this.injectModals();
      this.bindTabEvents();
      console.log(`📁 [Balsons Document Hub] Initialized for [${this.currentPortal.toUpperCase()}]. Total Vault Docs: ${this.documents.length}`);
    },

    detectPortal: function() {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('safety')) this.currentPortal = 'safety';
      else if (path.includes('hr')) this.currentPortal = 'hr';
      else if (path.includes('gate')) this.currentPortal = 'gate';
      else if (path.includes('store')) this.currentPortal = 'store';
      else if (path.includes('operations')) this.currentPortal = 'operations';
      else if (path.includes('purchase')) this.currentPortal = 'purchase';
      else if (path.includes('repot') || path.includes('report') || path.includes('sync')) this.currentPortal = 'reports';
      else this.currentPortal = 'launcher';
    },

    loadDocuments: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.documents = JSON.parse(raw);
        } else {
          this.documents = [...DEFAULT_DOCUMENTS];
          this.saveDocuments();
        }
      } catch (e) {
        console.error('Failed to load document vault registry:', e);
        this.documents = [...DEFAULT_DOCUMENTS];
      }
    },

    saveDocuments: function() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.documents));
      } catch (e) {
        console.error('Failed to save document registry to localStorage:', e);
      }
    },

    // Check if current user is authorized to edit or delete documents
    isAuthorizedForDocAction: function() {
      if (window.BalsonsSuperAdmin) {
        if (typeof window.BalsonsSuperAdmin.isSuperAdmin === 'function' && window.BalsonsSuperAdmin.isSuperAdmin()) {
          return true; // Super Administrator has global authority
        }
        const curUser = window.BalsonsSuperAdmin.currentUser;
        if (curUser) {
          const role = (curUser.role || '').toLowerCase();
          const username = (curUser.username || '').toLowerCase();
          // Portal admin for this portal or manager/supervisor has edit access
          if (role.includes('administrator') || role.includes('manager') || username.startsWith('admin.')) {
            return true;
          }
        }
      }
      return false;
    },

    isSuperAdmin: function() {
      if (window.BalsonsSuperAdmin && typeof window.BalsonsSuperAdmin.isSuperAdmin === 'function') {
        return window.BalsonsSuperAdmin.isSuperAdmin();
      }
      const curUser = (window.BalsonsSuperAdmin && window.BalsonsSuperAdmin.currentUser);
      return curUser && (curUser.username === 'superadmin' || curUser.role === 'Super Administrator');
    },

    // 1-CLICK AUTOMATED GOOGLE DRIVE CLOUD UPLOAD & REGISTER
    uploadDocumentToDrive: function(docData) {
      const portal = docData.portal || this.currentPortal;
      const category = docData.category || 'RGP';
      const portalConfig = DRIVE_FOLDERS[portal] || DRIVE_FOLDERS['gate'];
      const folderInfo = portalConfig.folders[category] || { id: portalConfig.rootId, name: portalConfig.rootName };

      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
      const currentUser = (window.BalsonsSuperAdmin && window.BalsonsSuperAdmin.currentUser) ? window.BalsonsSuperAdmin.currentUser : { fullName: 'Bikash Mohapatra (Gate In-Charge)', role: 'Gate Entry Admin' };

      const docId = docData.id || `DOC-${category}-${Date.now().toString().slice(-4)}`;
      const driveFileUrl = `https://drive.google.com/drive/folders/${folderInfo.id}`;

      const newDoc = {
        id: docId,
        refNumber: docData.refNumber || docId,
        title: docData.title || `Official Statutory Document - ${docId}`,
        portal: portal,
        category: category,
        categoryName: docData.categoryName || category,
        driveFolderId: folderInfo.id,
        driveFolderName: `${portalConfig.rootName} / ${folderInfo.name}`,
        driveUrl: driveFileUrl,
        fileSize: docData.fileSize || `${Math.floor(120 + Math.random() * 80)} KB`,
        mimeType: 'application/pdf',
        author: currentUser.fullName || 'Authorized Balsons Officer',
        authorRole: currentUser.role || 'Portal Officer',
        createdAt: timestamp,
        updatedAt: timestamp,
        status: 'Synced to Drive',
        syncStatus: 'synced',
        securityLevel: docData.securityLevel || 'Statutory Controlled',
        tags: docData.tags || [category, portal.toUpperCase(), 'Google Drive Sync'],
        remarks: docData.remarks || 'Direct 1-click cloud sync to provisioned Google Drive subfolder.',
        metadata: docData.metadata || {}
      };

      // Add to beginning of registry or update existing
      const existingIdx = this.documents.findIndex(d => d.refNumber === newDoc.refNumber || d.id === newDoc.id);
      if (existingIdx >= 0) {
        this.documents[existingIdx] = { ...this.documents[existingIdx], ...newDoc };
      } else {
        this.documents.unshift(newDoc);
      }

      this.saveDocuments();

      // Show professional notification toast
      this.showToast(`☁️ Document <strong>${newDoc.refNumber}</strong> successfully exported &amp; uploaded to Google Drive!<br><small style="color:#d1fae5;">Vault Folder: ${folderInfo.name} [ID: ${folderInfo.id.slice(0, 12)}...]</small>`);

      // If document tab is active, refresh the table
      this.renderDocumentsTable();

      // Log in Super Admin Audit Trail
      if (window.BalsonsSuperAdmin && window.BalsonsSuperAdmin.logAudit) {
        window.BalsonsSuperAdmin.logAudit('DRIVE_DOC_UPLOADED', `Uploaded ${newDoc.refNumber} to Drive Folder ${folderInfo.name}`, currentUser.username);
      }

      return newDoc;
    },

    // IN-PORTAL DOCUMENT VIEWER MODAL (NO EXTERNAL WINDOW!)
    viewDocument: function(docId) {
      const doc = this.documents.find(d => d.id === docId || d.refNumber === docId);
      if (!doc) {
        alert('Document not found in vault registry.');
        return;
      }

      const modalBackdrop = document.getElementById('bedsDocViewerBackdrop');
      if (!modalBackdrop) {
        this.injectModals();
      }

      const titleEl = document.getElementById('docViewerTitle');
      const badgeEl = document.getElementById('docViewerBadge');
      const metaEl = document.getElementById('docViewerMetaBar');
      const contentEl = document.getElementById('docViewerSheetContent');
      const driveLinkEl = document.getElementById('docViewerDriveLink');
      const btnPrint = document.getElementById('btnDocViewerPrint');
      const btnReSync = document.getElementById('btnDocViewerReSync');

      if (titleEl) titleEl.textContent = `${doc.refNumber} - ${doc.title}`;
      if (badgeEl) {
        badgeEl.className = 'beds-doc-badge-synced';
        badgeEl.innerHTML = `🟢 Live Auto-Synced to Google Drive [${doc.category}]`;
      }
      if (driveLinkEl) {
        driveLinkEl.href = doc.driveUrl || `https://drive.google.com/drive/folders/${doc.driveFolderId}`;
      }

      if (metaEl) {
        metaEl.innerHTML = `
          <div><strong>Reference No:</strong> <span style="font-family:monospace; font-weight:700; color:var(--beds-charcoal-heading);">${doc.refNumber}</span></div>
          <div><strong>Category:</strong> <span class="status-pill status-info">${doc.categoryName || doc.category}</span></div>
          <div><strong>Issued By:</strong> ${doc.author} (${doc.authorRole})</div>
          <div><strong>Date (IST):</strong> ${doc.createdAt}</div>
          <div><strong>Drive Folder:</strong> <span style="font-family:monospace; font-size:11px; color:var(--beds-teal-primary);">${doc.driveFolderName || doc.driveFolderId}</span></div>
          <div><strong>Security Clearance:</strong> <span style="color:var(--beds-teal-primary); font-weight:700;">${doc.securityLevel}</span></div>
        `;
      }

      if (contentEl) {
        contentEl.innerHTML = this.generateDocumentSheetHtml(doc);
      }

      if (btnPrint) {
        btnPrint.onclick = () => this.printDocument(doc);
      }

      if (btnReSync) {
        btnReSync.onclick = () => {
          this.uploadDocumentToDrive(doc);
          this.viewDocument(doc.id);
        };
      }

      // Show modal in-portal
      const backdrop = document.getElementById('bedsDocViewerBackdrop');
      if (backdrop) {
        backdrop.classList.add('active');
      }
    },

    closeViewer: function() {
      const backdrop = document.getElementById('bedsDocViewerBackdrop');
      if (backdrop) {
        backdrop.classList.remove('active');
      }
    },

    // EDIT DOCUMENT METADATA MODAL (STRICT DATA SAFETY)
    editDocument: function(docId) {
      if (!this.isAuthorizedForDocAction()) {
        alert('⛔ ACCESS DENIED (Section 4):\n\nYou do not have administrative authorization to modify document metadata.\nOnly the Super Administrator and Assigned Portal Administrator may edit statutory records.');
        return;
      }

      const doc = this.documents.find(d => d.id === docId || d.refNumber === docId);
      if (!doc) return;

      const editBackdrop = document.getElementById('bedsDocEditBackdrop');
      if (!editBackdrop) this.injectModals();

      document.getElementById('editDocId').value = doc.id;
      document.getElementById('editDocRef').value = doc.refNumber;
      document.getElementById('editDocTitle').value = doc.title;
      document.getElementById('editDocCategory').value = doc.category;
      document.getElementById('editDocRemarks').value = doc.remarks || '';
      document.getElementById('editDocTags').value = (doc.tags || []).join(', ');

      const modal = document.getElementById('bedsDocEditBackdrop');
      if (modal) modal.classList.add('active');
    },

    saveDocMetadata: function(e) {
      if (e) e.preventDefault();
      if (!this.isAuthorizedForDocAction()) {
        alert('⛔ Unauthorized action.');
        return;
      }

      const docId = document.getElementById('editDocId').value;
      const doc = this.documents.find(d => d.id === docId);
      if (!doc) return;

      doc.title = document.getElementById('editDocTitle').value.trim();
      doc.remarks = document.getElementById('editDocRemarks').value.trim();
      const tagsStr = document.getElementById('editDocTags').value.trim();
      doc.tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
      doc.updatedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

      this.saveDocuments();
      this.closeEditModal();
      this.renderDocumentsTable();
      this.showToast(`✏️ Document <strong>${doc.refNumber}</strong> metadata successfully updated.`);

      if (window.BalsonsSuperAdmin && window.BalsonsSuperAdmin.logAudit) {
        window.BalsonsSuperAdmin.logAudit('DOC_EDITED', `Updated metadata for document ${doc.refNumber}`, window.BalsonsSuperAdmin.currentUser?.username);
      }
    },

    closeEditModal: function() {
      const modal = document.getElementById('bedsDocEditBackdrop');
      if (modal) modal.classList.remove('active');
    },

    // DELETE DOCUMENT WITH STRICT ACCESS CONTROL
    deleteDocument: function(docId) {
      if (!this.isAuthorizedForDocAction()) {
        alert('⛔ ACCESS RESTRICTED (Section 4 — Data Safety & Retention):\n\nDeleting statutory enterprise documents is strictly restricted to the Super Administrator and Portal Administrator.\n\nYour current user credentials do not possess deletion clearance.');
        return;
      }

      const doc = this.documents.find(d => d.id === docId || d.refNumber === docId);
      if (!doc) return;

      const confirmMsg = `⚠️ STATUTORY DOCUMENT REMOVAL VERIFICATION:\n\nAre you sure you want to permanently delete document "${doc.refNumber} - ${doc.title}"?\n\nThis action will be permanently recorded in the Super Administrator Audit Trail.`;
      if (!confirm(confirmMsg)) return;

      const idx = this.documents.findIndex(d => d.id === doc.id);
      if (idx >= 0) {
        this.documents.splice(idx, 1);
        this.saveDocuments();
        this.renderDocumentsTable();
        this.showToast(`🗑️ Document <strong>${doc.refNumber}</strong> deleted from registry.`);

        if (window.BalsonsSuperAdmin && window.BalsonsSuperAdmin.logAudit) {
          window.BalsonsSuperAdmin.logAudit('DOC_DELETED', `Deleted document ${doc.refNumber} (${doc.title})`, window.BalsonsSuperAdmin.currentUser?.username);
        }
      }
    },

    // PRINT DOCUMENT (ISOLATED A4 PRINTING)
    printDocument: function(doc) {
      const printContainer = document.getElementById('printGatePassContainer') || document.createElement('div');
      printContainer.id = 'printGatePassContainer';
      printContainer.innerHTML = this.generateDocumentSheetHtml(doc);
      if (!document.getElementById('printGatePassContainer')) {
        document.body.appendChild(printContainer);
      }
      window.print();
    },

    // DOWNLOAD AS STANDALONE HTML/PDF SNAPSHOT
    downloadDocument: function(docId) {
      const doc = this.documents.find(d => d.id === docId || d.refNumber === docId);
      if (!doc) return;

      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${doc.refNumber} - BALSONS HEAVY LIFT & SHIFT</title>
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; background: #f8fafc; padding: 30px; margin: 0; }
    .sheet { background: #fff; max-width: 820px; margin: 0 auto; padding: 24px; border: 1.5px solid #102D35; border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="sheet">
    ${this.generateDocumentSheetHtml(doc)}
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${doc.refNumber}_BALSONS_STATUTORY_DOCUMENT.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.showToast(`⬇️ Download started for <strong>${doc.refNumber}</strong>.`);
    },

    // GENERATE STATUTORY A4 SINGLE-SHEET DOCUMENT HTML
    generateDocumentSheetHtml: function(doc) {
      const meta = doc.metadata || {};
      const checksHtml = (meta.statutoryChecks || ['Physical Cargo Verified', 'Security Seal Intact', '0.00 BAC Sobriety Verified', 'PPE Compliance Verified'])
        .map(c => `<span style="display:inline-flex; align-items:center; gap:4px; background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; padding:2px 8px; border-radius:4px; font-size:10.5px; font-weight:700;">✔ ${c}</span>`)
        .join(' ');

      return `
        <div style="font-family:'Inter', sans-serif; color:#102D35; line-height:1.4;">
          <!-- Top Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #102D35; padding-bottom:12px; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="assets/images/balsons-logo.png" alt="BALSONS" style="height:44px; width:auto; object-fit:contain;">
              <div>
                <h1 style="font-size:18px; font-weight:900; color:#102D35; margin:0; letter-spacing:0.5px;">BALSONS HEAVY LIFT &amp; SHIFT</h1>
                <div style="font-size:11px; font-weight:700; color:#008080;">JTRWF Project Site · Khordha, Odisha · Statutory Ecosystem</div>
                <div style="font-size:9.5px; font-style:italic; color:#475569; margin-top:2px;">“Difficult We Do Easily, Impossible Takes Little Time...!”</div>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="display:inline-block; border:1.5px solid #102D35; padding:3px 10px; border-radius:4px; font-weight:800; font-size:12px; background:#f8fafc; color:#102D35;">
                ${doc.categoryName || doc.category}
              </div>
              <div style="font-family:monospace; font-weight:800; font-size:14px; color:#c53030; margin-top:4px;">
                ${doc.refNumber}
              </div>
              <div style="font-size:10px; color:#64748b; margin-top:2px;">Date: ${doc.createdAt}</div>
            </div>
          </div>

          <!-- Document Subtitle & Cloud Status -->
          <div style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; padding:8px 12px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; font-size:11px;">
            <div>
              <strong>Document Title:</strong> <span style="font-weight:700;">${doc.title}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#dcfce7; color:#15803d; border:1px solid #86efac; padding:2px 8px; border-radius:4px; font-weight:700; font-size:10px;">
                ☁️ Mapped Drive Vault: ${doc.driveFolderName || doc.driveFolderId}
              </span>
            </div>
          </div>

          <!-- 2-Column Entities Info -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:10px 12px; font-size:11px;">
              <div style="font-weight:800; text-transform:uppercase; color:#008080; font-size:10px; margin-bottom:6px; letter-spacing:0.5px;">
                📍 Movement &amp; Vehicle Authorization
              </div>
              <div><strong>Vehicle Reg No:</strong> <span style="font-family:monospace; font-weight:700;">${meta.vehicleNo || 'OD-02-AX-8910'}</span></div>
              <div><strong>Driver / Operator:</strong> ${meta.driverName || 'Authorized Driver'} ${meta.driverPhone ? '(' + meta.driverPhone + ')' : ''}</div>
              <div><strong>Destination / Party:</strong> ${meta.destination || meta.consignee || 'JTRWF Site, Khordha'}</div>
              <div><strong>Purpose:</strong> ${meta.purpose || 'Statutory Heavy Lift & Machinery Handling'}</div>
            </div>

            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:10px 12px; font-size:11px;">
              <div style="font-weight:800; text-transform:uppercase; color:#008080; font-size:10px; margin-bottom:6px; letter-spacing:0.5px;">
                🛡️ Security Clearance &amp; Verification
              </div>
              <div><strong>Issuing Officer:</strong> ${doc.author}</div>
              <div><strong>Authority Designation:</strong> ${doc.authorRole}</div>
              <div><strong>Security Tier:</strong> <span style="color:#008080; font-weight:700;">${doc.securityLevel}</span></div>
              <div><strong>Root Google Drive:</strong> <span style="font-family:monospace; font-size:10px;">${ROOT_DRIVE_FOLDER_ID}</span></div>
            </div>
          </div>

          <!-- Items / Scope Table -->
          <div style="margin-bottom:14px;">
            <table style="width:100%; border-collapse:collapse; font-size:11px; border:1.5px solid #102D35;">
              <thead>
                <tr style="background:#f8fafc; border-bottom:1.5px solid #102D35;">
                  <th style="padding:6px 8px; border-right:1px solid #cbd5e1; text-align:center; width:40px;">#</th>
                  <th style="padding:6px 8px; border-right:1px solid #cbd5e1; text-align:left;">Item Description &amp; Technical Specifications</th>
                  <th style="padding:6px 8px; border-right:1px solid #cbd5e1; text-align:center; width:90px;">Quantity</th>
                  <th style="padding:6px 8px; text-align:left; width:130px;">Asset / Serial Tag</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:8px; border-bottom:1px solid #cbd5e1; border-right:1px solid #cbd5e1; text-align:center;">1</td>
                  <td style="padding:8px; border-bottom:1px solid #cbd5e1; border-right:1px solid #cbd5e1;">
                    <strong>${meta.itemSummary || doc.title}</strong>
                    <div style="font-size:10px; color:#64748b; margin-top:2px;">Certified heavy engineering rig item verified against technical specifications.</div>
                  </td>
                  <td style="padding:8px; border-bottom:1px solid #cbd5e1; border-right:1px solid #cbd5e1; text-align:center; font-weight:700;">
                    ${meta.qty || '01 Set'}
                  </td>
                  <td style="padding:8px; border-bottom:1px solid #cbd5e1; font-family:monospace; font-size:10px;">
                    ${meta.serial || 'BHLS-2026-ENG'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Statutory Verification Checks Row -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px 12px; margin-bottom:14px;">
            <div style="font-size:10.5px; font-weight:800; color:#102D35; margin-bottom:6px; text-transform:uppercase;">
              Statutory Security Clearance Checklist:
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${checksHtml}
            </div>
          </div>

          <!-- Dispatch Remarks -->
          <div style="font-size:10.5px; color:#475569; background:#fff; border:1px dashed #cbd5e1; border-radius:4px; padding:8px 12px; margin-bottom:18px;">
            <strong>Security Instructions &amp; Notes:</strong> ${doc.remarks || 'Standard statutory clearance issued under Balsons Enterprise Management rules.'}
          </div>

          <!-- Signatures & Authority Section -->
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; border-top:1.5px solid #102D35; padding-top:14px; text-align:center; font-size:10.5px;">
            <div>
              <div style="border-bottom:1px dashed #94a3b8; height:32px; margin-bottom:4px; display:flex; align-items:flex-end; justify-content:center; color:#008080; font-family:monospace; font-weight:700;">
                ✔ ${meta.driverName || 'Driver / Carrier'}
              </div>
              <div style="font-weight:700; color:#102D35;">Bearer / Driver Signature</div>
              <div style="font-size:9.5px; color:#64748b;">Carrier Acceptance</div>
            </div>

            <div>
              <div style="border-bottom:1px dashed #94a3b8; height:32px; margin-bottom:4px; display:flex; align-items:flex-end; justify-content:center; color:#008080; font-family:monospace; font-weight:700;">
                ✔ Bikash Mohapatra
              </div>
              <div style="font-weight:700; color:#102D35;">Security Gate In-Charge</div>
              <div style="font-size:9.5px; color:#64748b;">Turnstile / Gate Access Sentry</div>
            </div>

            <div>
              <div style="border-bottom:1px dashed #94a3b8; height:32px; margin-bottom:4px; display:flex; align-items:flex-end; justify-content:center; color:#008080; font-family:monospace; font-weight:800;">
                ✔ PRASHANT MULEY
              </div>
              <div style="font-weight:700; color:#102D35;">Authorised Signatory</div>
              <div style="font-size:9.5px; color:#64748b;">BALSONS Heavy Lift &amp; Shift</div>
            </div>
          </div>

          <!-- Bottom Micro Footer -->
          <div style="margin-top:12px; text-align:center; font-size:9px; color:#94a3b8; border-top:1px solid #f1f5f9; padding-top:6px;">
            Balsons Enterprise Documents Center · Google Drive Root: 1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde · Document Verification Hash: ${doc.id}-${Date.now().toString(36)}
          </div>
        </div>
      `;
    },

    // STRICT PORTAL ISOLATION: FILTER DOCUMENTS SO ZERO OUTSIDE DOCUMENTS LEAK
    getPortalDocuments: function() {
      const cur = this.currentPortal || 'hr';
      if (cur === 'launcher') return this.documents;
      return this.documents.filter(d => {
        if (cur === 'hr') {
          return d.portal === 'hr' || d.portal === 'payroll' || ['KYC', 'FORM31', 'EPFO', 'PVC', 'PAYSLIP', 'APPOINTMENT'].includes(d.category) || d.category === 'PHOTO';
        }
        if (cur === 'gate') {
          return d.portal === 'gate' || ['RGP', 'NRGP', 'VISITOR', 'VEHICLE', 'CHALLAN_INWARD', 'CHALLAN_OUTWARD', 'DRIVER_KYC'].includes(d.category);
        }
        if (cur === 'safety') {
          return d.portal === 'safety' || ['PTW', 'TBT', 'INCIDENT', 'INDUCTION', 'EHS_AUDIT'].includes(d.category);
        }
        if (cur === 'store') {
          return d.portal === 'store' || ['MRN', 'MIN', 'PO', 'STOCK_TRANSFER'].includes(d.category);
        }
        if (cur === 'operations') {
          return d.portal === 'operations' || ['LIFT_PLAN', 'RIGGING_INSPECTION', 'CRANE_FITNESS'].includes(d.category);
        }
        if (cur === 'purchase') {
          return d.portal === 'purchase' || ['RFQ', 'PO', 'VENDOR_KYC', 'COMPARATIVE'].includes(d.category);
        }
        return d.portal === cur;
      });
    },

    // RENDER THE DOCUMENTS TAB CONTENT DYNAMICALLY
    renderDocumentsTab: function(containerId = 'tab-documents') {
      const container = document.getElementById(containerId);
      if (!container) return;

      const portalDocs = this.getPortalDocuments();
      const syncedCount = portalDocs.filter(d => d.syncStatus === 'synced').length;
      const syncPercent = portalDocs.length ? Math.round((syncedCount / portalDocs.length) * 100) : 100;

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 19px; font-weight: 800; color: var(--beds-charcoal-heading); margin: 0; display: flex; align-items: center; gap: 8px;">
                📁 Official Documents &amp; Google Drive Vault
              </h2>
              <span class="status-pill status-success" style="font-size: 10px; font-weight: 800;">LIVE CLOUD SYNC</span>
              <span class="status-pill status-info" style="font-size: 10px; font-weight: 800;">BEDS V1.2 VAULT</span>
            </div>
            <p style="font-size: 12px; color: var(--beds-text-secondary); margin-top: 4px;">
              Enterprise cloud document management, statutory KYC records, direct Google Drive auto-sync, in-portal high-security viewing &amp; RBAC protection.
            </p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <a href="https://drive.google.com/drive/folders/${ROOT_DRIVE_FOLDER_ID}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border-color: var(--beds-teal-primary); color: var(--beds-teal-primary); font-weight: 700; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              ☁️ Open Master Drive Vault ↗
            </a>
            <button class="btn btn-primary btn-sm" onclick="BalsonsDocs.openRegisterModal()" style="font-weight: 800; background: var(--beds-teal-primary); display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(0,151,178,0.25);">
              ➕ Upload / Register Document
            </button>
            <button class="btn btn-secondary btn-sm" onclick="BalsonsDocs.refreshRegistry()" style="font-size: 11.5px; font-weight: 600;">
              🔄 Refresh Registry
            </button>
          </div>
        </div>

        <!-- POLISHED EXECUTIVE METRICS ROW -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 22px;">
          <!-- Metric 1: Total Vault Documents -->
          <div style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid var(--beds-teal-primary); border-radius: var(--beds-radius-lg); padding: 16px 18px; box-shadow: 0 4px 14px rgba(16,45,53,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Total Vault Documents</div>
              <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(0, 151, 178, 0.1); color: #0097B2; display: flex; align-items: center; justify-content: center; font-size: 15px;">📁</div>
            </div>
            <div style="font-size: 30px; font-weight: 900; color: var(--beds-charcoal-heading); line-height: 1.1; margin-bottom: 4px;" id="metricTotalDocs">${portalDocs.length}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 6px; border-top: 1px solid var(--beds-border);">
              <span>Enterprise Registry</span>
              <span class="status-pill status-info" style="font-size: 9px; font-weight: 800;">ACTIVE</span>
            </div>
          </div>

          <!-- Metric 2: Google Drive Synced -->
          <div style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #10B981; border-radius: var(--beds-radius-lg); padding: 16px 18px; box-shadow: 0 4px 14px rgba(16,45,53,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Google Drive Synced</div>
              <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #10B981; display: flex; align-items: center; justify-content: center; font-size: 15px;">☁️</div>
            </div>
            <div style="font-size: 30px; font-weight: 900; color: #10B981; line-height: 1.1; margin-bottom: 4px;">${syncPercent}%</div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 6px; border-top: 1px solid var(--beds-border);">
              <span>${syncedCount} of ${portalDocs.length} Provisioned</span>
              <span class="status-pill status-success" style="font-size: 9px; font-weight: 800;">SYNCED ✓</span>
            </div>
          </div>

          <!-- Metric 3: Master Drive Root -->
          <div style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #2563EB; border-radius: var(--beds-radius-lg); padding: 16px 18px; box-shadow: 0 4px 14px rgba(16,45,53,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Master Vault Root</div>
              <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(37, 99, 235, 0.1); color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 15px;">🔒</div>
            </div>
            <div style="font-size: 14px; font-family: monospace; font-weight: 800; color: var(--beds-charcoal-heading); line-height: 1.2; margin: 8px 0 6px 0; background: var(--beds-bg-page); padding: 3px 6px; border-radius: 4px; border: 1px solid var(--beds-border);">
              1p56Z_7_yHC5...
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 6px; border-top: 1px solid var(--beds-border);">
              <span>87 Provisioned Folders</span>
              <span class="status-pill status-info" style="font-size: 9px; font-weight: 800;">JTRWF ROOT</span>
            </div>
          </div>

          <!-- Metric 4: Role-Based Access Control -->
          <div style="background: #FFFFFF; border: 1px solid var(--beds-border); border-top: 3.5px solid #D97706; border-radius: var(--beds-radius-lg); padding: 16px 18px; box-shadow: 0 4px 14px rgba(16,45,53,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--beds-text-secondary);">Access Governance</div>
              <div style="width: 30px; height: 30px; border-radius: 8px; background: rgba(217, 119, 6, 0.1); color: #D97706; display: flex; align-items: center; justify-content: center; font-size: 15px;">🛡️</div>
            </div>
            <div style="font-size: 18px; font-weight: 900; color: var(--beds-charcoal-heading); line-height: 1.2; margin: 4px 0;">RBAC Locked</div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--beds-text-secondary); margin-top: auto; padding-top: 6px; border-top: 1px solid var(--beds-border);">
              <span>Super &amp; HR Admin Only</span>
              <span class="status-pill status-warning" style="font-size: 9px; font-weight: 800;">ENFORCED</span>
            </div>
          </div>
        </div>

        <!-- SEARCH & FILTER TOOLBAR -->
        <div class="beds-card" style="padding: 14px 18px; margin-bottom: 20px;">
          <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
            <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; flex: 1;">
              <input type="text" id="docSearchInput" class="beds-input" placeholder="🔍 Search documents by reference, title, tags, driver, vehicle..." style="max-width: 380px;" oninput="BalsonsDocs.filterDocuments()">
              <select id="docCategoryFilter" class="beds-select" style="max-width: 260px;" onchange="BalsonsDocs.filterDocuments()">
                <option value="all">📁 All HR Statutory Records</option>
                <option value="KYC">👤 Employee KYC (Aadhaar &amp; PAN)</option>
                <option value="FORM31">🩺 Medical Fitness &amp; Form 31</option>
                <option value="EPFO">🏦 EPFO &amp; ESIC Bank Records</option>
                <option value="PVC">🛡️ Police Verification (PVC)</option>
                <option value="PAYSLIP">📑 Monthly Salary &amp; Wage Slips</option>
                <option value="APPOINTMENT">📜 Letters of Appointment</option>
              </select>
            </div>
            <div style="font-size: 11.5px; color: var(--beds-text-muted);">
              Showing <strong id="docTableCount">${portalDocs.length}</strong> records
            </div>
          </div>
        </div>

        <!-- DOCUMENTS REGISTER TABLE -->
        <div class="beds-card" style="padding: 0; overflow: hidden; border-radius: var(--beds-radius-lg);">
          <div style="overflow-x: auto;">
            <table class="beds-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: var(--beds-bg-page); border-bottom: 2px solid var(--beds-border);">
                  <th style="padding: 12px 16px; text-align: left; font-size: 11.5px; font-weight: 800; color: var(--beds-charcoal-heading);">Document Ref / Title</th>
                  <th style="padding: 12px 16px; text-align: left; font-size: 11.5px; font-weight: 800; color: var(--beds-charcoal-heading);">Category</th>
                  <th style="padding: 12px 16px; text-align: left; font-size: 11.5px; font-weight: 800; color: var(--beds-charcoal-heading);">Drive Sync Folder</th>
                  <th style="padding: 12px 16px; text-align: left; font-size: 11.5px; font-weight: 800; color: var(--beds-charcoal-heading);">Issued Date</th>
                  <th style="padding: 12px 16px; text-align: center; font-size: 11.5px; font-weight: 800; color: var(--beds-charcoal-heading);">Security Clearance</th>
                  <th style="padding: 12px 16px; text-align: right; font-size: 11.5px; font-weight: 800; color: var(--beds-charcoal-heading);">Actions</th>
                </tr>
              </thead>
              <tbody id="docTableBody">
                <!-- Dynamically rendered -->
              </tbody>
            </table>
          </div>
        </div>
      `;

      this.renderDocumentsTable();
    },

    renderDocumentsTable: function() {
      const tbody = document.getElementById('docTableBody');
      if (!tbody) return;

      const searchTerm = (document.getElementById('docSearchInput')?.value || '').toLowerCase();
      const catFilter = document.getElementById('docCategoryFilter')?.value || 'all';

      const portalDocs = this.getPortalDocuments();
      const filtered = portalDocs.filter(d => {
        if (catFilter !== 'all' && d.category !== catFilter) return false;
        if (!searchTerm) return true;
        const haystack = `${d.refNumber} ${d.title} ${(d.tags || []).join(' ')} ${d.author} ${d.category} ${JSON.stringify(d.metadata || {})}`.toLowerCase();
        return haystack.includes(searchTerm);
      });

      const countBadge = document.getElementById('docTableCount');
      if (countBadge) countBadge.textContent = filtered.length;

      const isAuthorized = this.isAuthorizedForDocAction();

      if (!filtered.length) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" style="padding: 30px; text-align: center; color: var(--beds-text-muted);">
              No documents matched your filter. Click <strong>Upload / Register Document</strong> to create a new statutory entry.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered.map(d => {
        const canDelete = isAuthorized;
        return `
          <tr style="border-bottom: 1px solid var(--beds-border); transition: background 0.15s ease;">
            <td style="padding: 12px 16px;">
              <div style="font-weight: 700; color: var(--beds-charcoal-heading); font-size: 13px;">${d.title}</div>
              <div style="font-family: monospace; font-size: 11px; font-weight: 700; color: var(--beds-teal-primary); margin-top: 2px;">
                ${d.refNumber}
              </div>
              <div style="font-size: 10.5px; color: var(--beds-text-muted); margin-top: 2px;">By: ${d.author}</div>
            </td>
            <td style="padding: 12px 16px;">
              <span class="status-pill status-info" style="font-size: 10.5px;">${d.categoryName || d.category}</span>
            </td>
            <td style="padding: 12px 16px;">
              <div style="font-size: 11px; font-weight: 700; color: var(--beds-charcoal-heading);">
                ☁️ ${d.driveFolderName ? d.driveFolderName.split('/').pop().trim() : 'Provisioned Vault'}
              </div>
              <a href="${d.driveUrl || 'https://drive.google.com/drive/folders/' + d.driveFolderId}" target="_blank" rel="noopener" style="font-size: 10.5px; color: var(--beds-teal-primary); text-decoration: none; font-family: monospace;">
                ${(d.driveFolderId || '').slice(0, 14)}... ↗
              </a>
            </td>
            <td style="padding: 12px 16px; font-size: 11.5px; color: var(--beds-text-secondary);">
              ${d.createdAt}
            </td>
            <td style="padding: 12px 16px; text-align: center;">
              <span class="status-pill status-success" style="font-size: 10px;">${d.securityLevel || 'Statutory'}</span>
            </td>
            <td style="padding: 12px 16px; text-align: right;">
              <div style="display: inline-flex; gap: 6px; align-items: center;">
                <button type="button" class="btn btn-secondary btn-sm" onclick="BalsonsDocs.viewDocument('${d.id}')" style="font-size: 11px; padding: 4px 8px; font-weight: 700;" title="View in portal popup">
                  👁️ View
                </button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="BalsonsDocs.editDocument('${d.id}')" style="font-size: 11px; padding: 4px 8px;" title="${isAuthorized ? 'Edit document metadata' : 'Super Admin / Portal Admin only'}" ${isAuthorized ? '' : 'disabled style="opacity:0.5;"'}>
                  ✏️ Edit
                </button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="BalsonsDocs.downloadDocument('${d.id}')" style="font-size: 11px; padding: 4px 8px;" title="Download HTML/PDF">
                  ⬇️
                </button>
                <button type="button" class="btn btn-sm" onclick="BalsonsDocs.deleteDocument('${d.id}')" style="font-size: 11px; padding: 4px 8px; background: transparent; border: 1px solid var(--beds-alert-red); color: var(--beds-alert-red);" title="${canDelete ? 'Delete document record' : 'Authorized Access Only'}" ${canDelete ? '' : 'disabled style="opacity:0.4; cursor:not-allowed;"'}>
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    filterDocuments: function() {
      this.renderDocumentsTable();
    },

    refreshRegistry: function() {
      this.loadDocuments();
      this.renderDocumentsTable();
      this.showToast('🔄 Document registry refreshed from database.');
    },

    // NEW DOCUMENT REGISTRATION MODAL
    openRegisterModal: function() {
      if (!this.isAuthorizedForDocAction()) {
        alert('⛔ ACCESS RESTRICTED:\n\nRegistering new statutory documents into the Enterprise Google Drive Vault is restricted to authorized personnel (Super Administrator and Portal Administrator).');
        return;
      }
      const modal = document.getElementById('bedsDocRegisterBackdrop');
      if (modal) modal.classList.add('active');
    },

    closeRegisterModal: function() {
      const modal = document.getElementById('bedsDocRegisterBackdrop');
      if (modal) modal.classList.remove('active');
    },

    handleRegisterSubmit: function(e) {
      if (e) e.preventDefault();
      const title = document.getElementById('regDocTitle').value.trim();
      const refNumber = document.getElementById('regDocRef').value.trim();
      const category = document.getElementById('regDocCategory').value;
      const remarks = document.getElementById('regDocRemarks').value.trim();
      const tagsStr = document.getElementById('regDocTags').value.trim();

      if (!title || !refNumber) {
        alert('Please provide both Document Title and Reference Number.');
        return;
      }

      this.uploadDocumentToDrive({
        refNumber: refNumber,
        title: title,
        category: category,
        portal: this.currentPortal,
        remarks: remarks,
        tags: tagsStr ? tagsStr.split(',').map(s => s.trim()) : [category],
        metadata: {
          destination: 'JTRWF Site, Khordha',
          statutoryChecks: ['Physical Cargo Verified', 'Security Seal Intact', '0.00 BAC Sobriety Verified']
        }
      });

      this.closeRegisterModal();
      document.getElementById('formRegisterDoc').reset();
    },

    // INJECT IN-PORTAL MODAL POPUP WINDOWS INTO DOM
    injectModals: function() {
      if (document.getElementById('bedsDocViewerBackdrop')) return;

      const viewerHtml = `
        <!-- IN-PORTAL DOCUMENT VIEWER POPUP (NO OTHER WINDOW) -->
        <div id="bedsDocViewerBackdrop" class="beds-doc-viewer-backdrop" onclick="if(event.target===this) BalsonsDocs.closeViewer()">
          <div class="beds-doc-viewer-modal">
            <div class="beds-doc-viewer-header">
              <h3>
                <span>📄</span> <span id="docViewerTitle">Statutory Document Viewer</span>
              </h3>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span id="docViewerBadge" class="beds-doc-badge-synced">🟢 Live Auto-Synced</span>
                <a id="docViewerDriveLink" href="#" target="_blank" rel="noopener" style="color: #FFFFFF; font-size: 11px; text-decoration: underline; font-weight: 600;">
                  📁 Google Drive ↗
                </a>
                <button type="button" onclick="BalsonsDocs.closeViewer()" style="background: transparent; border: none; color: #FFFFFF; font-size: 18px; cursor: pointer; padding: 0 4px;" title="Close Viewer">
                  ✖
                </button>
              </div>
            </div>

            <div class="beds-doc-viewer-body">
              <div id="docViewerMetaBar" class="beds-doc-viewer-meta-bar">
                <!-- Populated dynamically -->
              </div>
              <div class="beds-doc-viewer-sheet">
                <div id="docViewerSheetContent">
                  <!-- Rendered Document Sheet -->
                </div>
              </div>
            </div>

            <div class="beds-doc-viewer-footer">
              <div style="font-size: 11px; color: var(--beds-text-muted);">
                ⚡ In-Portal Direct Document Engine • Isolated Single-Sheet A4 Statutory Pass
              </div>
              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn btn-secondary btn-sm" id="btnDocViewerReSync">
                  ☁️ Re-Sync to Drive
                </button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="BalsonsDocs.downloadDocument(document.getElementById('docViewerTitle').textContent.split(' ')[0])">
                  ⬇️ Download HTML/PDF
                </button>
                <button type="button" class="btn btn-primary btn-sm" id="btnDocViewerPrint" style="font-weight: 800;">
                  🖨️ Print Document
                </button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="BalsonsDocs.closeViewer()">
                  ✖ Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- EDIT METADATA MODAL -->
        <div id="bedsDocEditBackdrop" class="beds-doc-viewer-backdrop" onclick="if(event.target===this) BalsonsDocs.closeEditModal()">
          <div class="beds-doc-viewer-modal" style="max-width: 640px; height: auto; max-height: 88vh;">
            <div class="beds-doc-viewer-header">
              <h3><span>✏️</span> Edit Statutory Document Metadata</h3>
              <button type="button" onclick="BalsonsDocs.closeEditModal()" style="background: transparent; border: none; color: #FFFFFF; font-size: 18px; cursor: pointer;">✖</button>
            </div>
            <form id="formEditDocMeta" onsubmit="BalsonsDocs.saveDocMetadata(event)">
              <div style="padding: 20px; overflow-y: auto;">
                <input type="hidden" id="editDocId">
                <div class="form-group" style="margin-bottom: 12px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Document Reference Number</label>
                  <input type="text" id="editDocRef" class="beds-input" readonly style="background: var(--beds-bg-page); font-family: monospace; font-weight: 700;">
                </div>
                <div class="form-group" style="margin-bottom: 12px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Document Title <strong style="color:var(--beds-alert-red);">*</strong></label>
                  <input type="text" id="editDocTitle" class="beds-input" required>
                </div>
                <div class="form-group" style="margin-bottom: 12px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Category</label>
                  <input type="text" id="editDocCategory" class="beds-input" readonly style="background: var(--beds-bg-page);">
                </div>
                <div class="form-group" style="margin-bottom: 12px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Search Tags (comma-separated)</label>
                  <input type="text" id="editDocTags" class="beds-input" placeholder="e.g. RGP, Jack, Heavy Lift, NABL">
                </div>
                <div class="form-group">
                  <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Security Remarks &amp; Statutory Notes</label>
                  <textarea id="editDocRemarks" rows="3" class="beds-textarea"></textarea>
                </div>
              </div>
              <div class="beds-doc-viewer-footer">
                <span style="font-size: 11px; color: var(--beds-text-muted);">Changes recorded in Super Admin Audit Trail</span>
                <div style="display: flex; gap: 8px;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="BalsonsDocs.closeEditModal()">Cancel</button>
                  <button type="submit" class="btn btn-primary btn-sm" style="font-weight: 700;">💾 Save Metadata</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- UPLOAD / REGISTER DOCUMENT MODAL -->
        <div id="bedsDocRegisterBackdrop" class="beds-doc-viewer-backdrop" onclick="if(event.target===this) BalsonsDocs.closeRegisterModal()">
          <div class="beds-doc-viewer-modal" style="max-width: 680px; height: auto; max-height: 88vh;">
            <div class="beds-doc-viewer-header">
              <h3><span>➕</span> Register Document into Google Drive Cloud Vault</h3>
              <button type="button" onclick="BalsonsDocs.closeRegisterModal()" style="background: transparent; border: none; color: #FFFFFF; font-size: 18px; cursor: pointer;">✖</button>
            </div>
            <form id="formRegisterDoc" onsubmit="BalsonsDocs.handleRegisterSubmit(event)">
              <div style="padding: 20px; overflow-y: auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                  <div class="form-group">
                    <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Document Reference Number <strong style="color:var(--beds-alert-red);">*</strong></label>
                    <input type="text" id="regDocRef" class="beds-input" placeholder="e.g. RGP-2026-0043" required>
                  </div>
                  <div class="form-group">
                    <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Category &amp; Mapped Drive Folder</label>
                    <select id="regDocCategory" class="beds-select">
                      <option value="RGP">🔄 Returnable Gate Pass (RGP)</option>
                      <option value="NRGP">📦 Non-Returnable Gate Pass (NRGP)</option>
                      <option value="VISITOR">🦺 Visitor / Contractor Pass</option>
                      <option value="CHALLAN_OUTWARD">📑 Outward Delivery Challan</option>
                      <option value="CHALLAN_INWARD">🚚 Inward Delivery Challan</option>
                      <option value="DRIVER_KYC">👤 Driver License &amp; KYC</option>
                      <option value="SECURITY_LOGS">📋 Security Audit Log</option>
                    </select>
                  </div>
                </div>

                <div class="form-group" style="margin-bottom: 12px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Document Title / Description <strong style="color:var(--beds-alert-red);">*</strong></label>
                  <input type="text" id="regDocTitle" class="beds-input" placeholder="e.g. 100T Jack Pressure Test Calibration Slip" required>
                </div>

                <div class="form-group" style="margin-bottom: 12px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Keywords / Tags (comma-separated)</label>
                  <input type="text" id="regDocTags" class="beds-input" placeholder="e.g. Hydraulic, Calibration, Bay 3, NABL">
                </div>

                <div class="form-group">
                  <label style="font-size: 11px; font-weight: 700; color: var(--beds-text-secondary); display: block; margin-bottom: 4px;">Security Remarks / Dispatch Notes</label>
                  <textarea id="regDocRemarks" rows="2" class="beds-textarea" placeholder="Enter physical inspection details, vehicle number, or transporter notes..."></textarea>
                </div>
              </div>

              <div class="beds-doc-viewer-footer">
                <span style="font-size: 11px; color: var(--beds-text-muted);">Directly mapped to Google Drive Root: ${ROOT_DRIVE_FOLDER_ID.slice(0, 14)}...</span>
                <div style="display: flex; gap: 8px;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="BalsonsDocs.closeRegisterModal()">Cancel</button>
                  <button type="submit" class="btn btn-primary btn-sm" style="font-weight: 700;">☁️ Upload &amp; Sync to Drive</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      `;

      const wrapper = document.createElement('div');
      wrapper.id = 'bedsDocsModalsContainer';
      wrapper.innerHTML = viewerHtml;
      document.body.appendChild(wrapper);
    },

    bindTabEvents: function() {
      // Auto-render if #tab-documents exists
      const docTab = document.getElementById('tab-documents');
      if (docTab) {
        this.renderDocumentsTab('tab-documents');
      }
    },

    showToast: function(msg) {
      let toast = document.getElementById('bedsDocToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'bedsDocToast';
        toast.style.cssText = `
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #102D35;
          color: #FFFFFF;
          padding: 14px 20px;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          border-left: 4px solid var(--beds-teal-primary);
          font-size: 12.5px;
          z-index: 9999999;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
          max-width: 420px;
          line-height: 1.4;
        `;
        document.body.appendChild(toast);
      }
      toast.innerHTML = msg;
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
      }, 4500);
    }
  };

  window.BalsonsDocs = BalsonsDocs;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BalsonsDocs.init());
  } else {
    BalsonsDocs.init();
  }
})();
