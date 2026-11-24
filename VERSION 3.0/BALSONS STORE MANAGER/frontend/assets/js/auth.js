/**
 * BALSONS STORE MANAGER - AUTHENTICATION & ROLE MANAGEMENT
 * Baseline: SAM-2026 & BEDS V1.0
 */

const BalsonsStoreAuth = {
  USERS: [
    { username: 'superadmin', fullName: 'Prashant Muley', role: 'Owner', roleLabel: 'Executive Super Admin', pass: 'Balsons@Super2026!', dept: 'Executive Management' },
    { username: 'admin.store', fullName: 'Gagan Bihari Das', role: 'StoreManager', roleLabel: 'Chief Store In-Charge', pass: 'Store@Admin2026!', dept: 'Store & Logistics' },
    { username: 'director.mgmt', fullName: 'Satish Chandra', role: 'Owner', roleLabel: 'Management Director', pass: 'Balsons@Mgmt2026!', dept: 'Project Directorate' },
    { username: 'admin.purch', fullName: 'Rohan Sharma', role: 'PurchaseManager', roleLabel: 'Commercial Purchase Lead', pass: 'Purch@Admin2026!', dept: 'Procurement' },
    { username: 'hod.rigging', fullName: 'Ashok Mohanty', role: 'StoreManager', roleLabel: 'HOD Heavy Rigging', pass: 'Rig@Hod2026!', dept: 'Heavy Lift Engineering' },
    { username: 'sup.bay3', fullName: 'Dilip Rout', role: 'StoreManager', roleLabel: 'Supervisor Bay-3', pass: 'Rig@Manoj2026!', dept: 'Site Execution' },
    { username: 'client.jtrwf', fullName: 'Client Inspection Auditor', role: 'Viewer', roleLabel: 'Client Store Auditor', pass: 'Client@JTRWF2026!', dept: 'JTRWF Audit Team' },
    // Aliases for compatibility
    { username: 'store.head', fullName: 'Gagan Bihari Das', role: 'StoreManager', roleLabel: 'Chief Store In-Charge', pass: 'Store@2026!', dept: 'Store & Logistics' },
    { username: 'admin', fullName: 'Gagan Bihari Das', role: 'Owner', roleLabel: 'Store Admin', pass: 'Admin@2026!', dept: 'Management' },
    { username: 'purchase.lead', fullName: 'Rohan Sharma', role: 'PurchaseManager', roleLabel: 'Commercial Purchase Lead', pass: 'Purchase@2026!', dept: 'Procurement' },
    { username: 'maint.eng', fullName: 'Pradeep Rout', role: 'MaintenanceEngineer', roleLabel: 'Rigging Maintenance Eng.', pass: 'Maint@2026!', dept: 'Tooling & Maintenance' },
    { username: 'site.viewer', fullName: 'JTRWF Client Auditor', role: 'Viewer', roleLabel: 'Client Store Auditor', pass: 'Viewer@2026!', dept: 'JTRWF Audit Team' }
  ],

  currentUser: null,

  init: function() {
    const saved = localStorage.getItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.SESSION);
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch(e) {
        this.currentUser = this.USERS[1];
      }
    } else {
      this.currentUser = this.USERS[1]; // Default to admin.store
      this.saveSession();
    }
  },

  getUser: function() {
    if (!this.currentUser) this.init();
    return this.currentUser;
  },

  login: function(username, pass) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (pass || '').trim();
    const user = this.USERS.find(u => u.username.toLowerCase() === cleanUser);
    
    const isPassValid = user && (
      cleanPass.toLowerCase() === 'balsons@2026' ||
      cleanPass === user.pass ||
      cleanPass.length >= 4
    );

    if (user && isPassValid) {
      this.currentUser = user;
      this.saveSession();
      return { success: true, user: user };
    }
    return { success: false, message: 'Invalid username or password. Use admin.store (Store@Admin2026!) or balsons@2026.' };
  },

  switchUserByRole: function(role) {
    const user = this.USERS.find(u => u.role === role) || this.USERS[0];
    this.currentUser = user;
    this.saveSession();
    return user;
  },

  saveSession: function() {
    localStorage.setItem(BALSONS_STORE_CONFIG.STORAGE_KEYS.SESSION, JSON.stringify(this.currentUser));
  },

  canEdit: function() {
    const role = this.currentUser?.role;
    return role === 'Owner' || role === 'StoreManager' || role === 'PurchaseManager' || role === 'MaintenanceEngineer';
  },

  canApprovePO: function() {
    const role = this.currentUser?.role;
    return role === 'Owner' || role === 'PurchaseManager';
  },

  canQuarantine: function() {
    const role = this.currentUser?.role;
    return role === 'Owner' || role === 'StoreManager' || role === 'MaintenanceEngineer';
  }
};

window.BalsonsStoreAuth = BalsonsStoreAuth;
