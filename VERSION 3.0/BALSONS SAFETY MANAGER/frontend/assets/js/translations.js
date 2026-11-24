/**
 * BALSONS SAFETY PORTAL - BILINGUAL TRANSLATIONS
 * English & Hindi (हिन्दी)
 * Architecture: SAM-2026
 */

const BalsonsSafetyI18n = {
  currentLang: localStorage.getItem('balsons_safety_lang') || 'en',

  translations: {
    en: {
      portal_title: 'BALSONS Safety Portal',
      portal_sub: 'JTRWF Khordha Project · Work Authorisation System',
      nav_dashboard: 'Safety Dashboard',
      nav_work_auth: 'Work Authorisation (PTW)',
      nav_ptw_master: 'Master PTW Register',
      nav_permit_studio: 'Controlled 7 Permit Forms Studio',
      nav_ptw: 'Permit-to-Work (PTW)',
      nav_lifting: 'Heavy Lifting & Rigging',
      nav_hira: 'HIRA & JSA Repository',
      nav_safety_inspections: 'Safety & Field Inspections',
      nav_tbt: 'Toolbox Talks (TBT)',
      nav_inspections: 'Digital Safety Inspections',
      nav_emergency: 'Emergency Readiness & Fire',
      nav_hazards_incidents: 'Hazards & Incidents',
      nav_hazards: 'Hazard Observations (UA/UC)',
      nav_incidents: 'Incident & Near Miss Management',
      nav_capa: 'CAPA Register',
      nav_manpower_reports: 'Manpower & Reports',
      nav_manpower: 'Manpower Competency & Form 31',
      nav_reports: 'Daily Safety Report (DSR)',
      nav_admin: 'Administration & Audit',

      // Studio
      studio_title: 'BALSONS CONTROLLED PERMIT FORMS STUDIO (V1.1 LIBRARY)',
      studio_sub: 'Official 7 Controlled Work Permits for JTRWF Khordha Project · Standards Compliant Print & Digital Authorisation',
      btn_print_form: '🖨️ Print Form (A4)',
      btn_export_pdf_blank: '📥 Export Printable PDF',
      btn_fill_initiate: '⚡ Fill & Initiate Digital PTW',

      // Dashboard KPIs
      kpi_safe_hours: 'Safe Man-Hours Worked',
      kpi_days_lti: 'Days Without LTI (Zero Harm)',
      kpi_active_permits: 'Active Authorized Permits',
      kpi_pending_permits: 'Permits Awaiting Approval',
      kpi_tbts_today: 'TBTs Conducted Today',
      kpi_open_capas: 'Open Corrective Actions (CAPA)',
      kpi_compliance_rate: 'HSE Compliance Rating',
      
      // Actions & Buttons
      btn_new_ptw: '+ Create Work Permit (PTW)',
      btn_conduct_tbt: '+ Log Toolbox Talk',
      btn_new_inspection: '+ New Inspection Checklist',
      btn_plan_lift: '+ Heavy Lifting Plan',
      btn_report_hazard: '+ Report Hazard / UA',
      btn_report_incident: '+ File Incident Report',
      btn_generate_dsr: 'Generate Daily Safety Report (DSR)',
      btn_print_permit: 'Print Permit (A4)',
      btn_verify: 'Verify (Safety Officer)',
      btn_approve: 'Approve & Issue (Site Mgr)',
      btn_reject: 'Reject',
      btn_close: 'Close Permit (Handback)',
      btn_filter: 'Filter',
      btn_search: 'Search...',
      btn_export_pdf: 'Export PDF',
      btn_save: 'Save & Submit',
      btn_cancel: 'Cancel',

      // PTW Form & Fields
      lbl_permit_id: 'Permit ID',
      lbl_template: 'Permit Type / Template',
      lbl_category: 'Category',
      lbl_area: 'Designated Work Area',
      lbl_description: 'Detailed Scope of Work',
      lbl_contractor: 'Executing Contractor',
      lbl_supervisor: 'Work Supervisor',
      lbl_risk_level: 'Assessed Risk Level',
      lbl_planned_start: 'Planned Start Time',
      lbl_planned_end: 'Planned Completion Time',
      lbl_prerequisites: 'Mandatory Safety Prerequisites Checklist',
      lbl_status: 'Workflow Status',
      lbl_actions: 'Actions',

      // Common Statuses
      st_submitted: 'SUBMITTED',
      st_verified: 'VERIFIED',
      st_issued: 'ISSUED (ACTIVE)',
      st_closed: 'CLOSED',
      st_rejected: 'REJECTED'
    },

    hi: {
      portal_title: 'बाल्सन्स सुरक्षा पोर्टल',
      portal_sub: 'JTRWF खोरधा प्रोजेक्ट · कार्य प्राधिकरण प्रणाली',
      nav_dashboard: 'सुरक्षा डैशबोर्ड',
      nav_work_auth: 'कार्य प्राधिकरण (PTW)',
      nav_ptw_master: 'मास्टर पीटीडब्ल्यू रजिस्टर',
      nav_permit_studio: 'नियंत्रित 7 परमिट फॉर्म स्टूडियो',
      nav_ptw: 'कार्य अनुमति (PTW)',
      nav_lifting: 'भारी लिफ्टिंग एवं रिगिंग',
      nav_hira: 'कार्य विधि एवं जोखिम आकलन (HIRA/JSA)',
      nav_safety_inspections: 'सुरक्षा एवं फील्ड निरीक्षण',
      nav_tbt: 'टूलबॉक्स सुरक्षा वार्ता (TBT)',
      nav_inspections: 'डिजिटल सुरक्षा निरीक्षण',
      nav_emergency: 'आपातकालीन तैयारी व अग्निशमन',
      nav_hazards_incidents: 'खतरे एवं दुर्घटना प्रबंधन',
      nav_hazards: 'खतरे व असुरक्षित स्थितियाँ (UA/UC)',
      nav_incidents: 'दुर्घटना व नियर मिस रिपोर्टिंग',
      nav_capa: 'सुधारात्मक कार्रवाई रजिस्टर (CAPA)',
      nav_manpower_reports: 'मानव शक्ति एवं रिपोर्ट',
      nav_manpower: 'मानव शक्ति योग्यता व फॉर्म 31',
      nav_reports: 'दैनिक सुरक्षा रिपोर्ट (DSR)',
      nav_admin: 'प्रशासन एवं ऑडिट ट्रेल',

      // Studio
      studio_title: 'बाल्सन्स नियंत्रित परमिट फॉर्म स्टूडियो (V1.1 लाइब्रेरी)',
      studio_sub: 'JTRWF खोरधा प्रोजेक्ट के लिए 7 आधिकारिक नियंत्रित वर्क परमिट · मानक अनुरूप प्रिंट एवं डिजिटल प्राधिकरण',
      btn_print_form: '🖨️ फॉर्म प्रिंट करें (A4)',
      btn_export_pdf_blank: '📥 प्रिंट करने योग्य PDF',
      btn_fill_initiate: '⚡ डिजिटल परमिट भरें और जारी करें',

      // Dashboard KPIs
      kpi_safe_hours: 'सुरक्षित कार्य मानव-घंटे',
      kpi_days_lti: 'शून्य दुर्घटना दिवस (LTI मुक्त)',
      kpi_active_permits: 'सक्रिय वैध परमिट (PTW)',
      kpi_pending_permits: 'अनुमोदन प्रतीक्षारत परमिट',
      kpi_tbts_today: 'आज आयोजित सुरक्षा वार्ताएं',
      kpi_open_capas: 'लंबित सुधारात्मक कार्य (CAPA)',
      kpi_compliance_rate: 'HSE सुरक्षा अनुपालन दर',

      // Actions & Buttons
      btn_new_ptw: '+ नया कार्य परमिट बनाएं',
      btn_conduct_tbt: '+ सुरक्षा वार्ता (TBT) दर्ज करें',
      btn_new_inspection: '+ नया सुरक्षा निरीक्षण',
      btn_plan_lift: '+ भारी लिफ्टिंग योजना',
      btn_report_hazard: '+ खतरा / असुरक्षित स्थिति दर्ज करें',
      btn_report_incident: '+ दुर्घटना / नियर मिस रिपोर्ट करें',
      btn_generate_dsr: 'दैनिक सुरक्षा रिपोर्ट (DSR) बनाएं',
      btn_print_permit: 'परमिट प्रिंट करें (A4)',
      btn_verify: 'सत्यापित करें (सुरक्षा अधिकारी)',
      btn_approve: 'स्वीकृत एवं जारी करें (साइट प्रबंधक)',
      btn_reject: 'अस्वीकार करें',
      btn_close: 'परमिट बंद करें (हैंडबैक)',
      btn_filter: 'फ़िल्टर करें',
      btn_search: 'खोजें...',
      btn_export_pdf: 'PDF निर्यात करें',
      btn_save: 'सुरक्षित करें और सबमिट करें',
      btn_cancel: 'रद्द करें',

      // PTW Form & Fields
      lbl_permit_id: 'परमिट क्रमांक',
      lbl_template: 'परमिट का प्रकार / टेम्पलेट',
      lbl_category: 'श्रेणी',
      lbl_area: 'नामित कार्य क्षेत्र',
      lbl_description: 'कार्य का विस्तृत विवरण',
      lbl_contractor: 'कार्यकारी ठेकेदार',
      lbl_supervisor: 'कार्य पर्यवेक्षक',
      lbl_risk_level: 'आंकलित जोखिम स्तर',
      lbl_planned_start: 'नियोजित प्रारंभ समय',
      lbl_planned_end: 'नियोजित समाप्ति समय',
      lbl_prerequisites: 'अनिवार्य सुरक्षा पूर्व-शर्तें चेकलिस्ट',
      lbl_status: 'प्रक्रिया स्थिति',
      lbl_actions: 'कार्रवाई',

      // Common Statuses
      st_submitted: 'सबमिट किया गया',
      st_verified: 'सत्यापित',
      st_issued: 'जारी (सक्रिय)',
      st_closed: 'सुरक्षित बंद',
      st_rejected: 'अस्वीकृत'
    }
  },

  t: function(key) {
    const lang = this.currentLang;
    if (this.translations[lang] && this.translations[lang][key]) {
      return this.translations[lang][key];
    }
    if (this.translations.en[key]) {
      return this.translations.en[key];
    }
    return key;
  },

  setLang: function(lang) {
    if (lang === 'en' || lang === 'hi') {
      this.currentLang = lang;
      localStorage.setItem('balsons_safety_lang', lang);
      this.applyTranslations();
    }
  },

  applyTranslations: function() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = this.t(key);
      if (translated) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.setAttribute('placeholder', translated);
        } else {
          el.textContent = translated;
        }
      }
    });

    // Update active state on language pills
    document.querySelectorAll('.lang-pill').forEach(btn => {
      if (btn.getAttribute('data-lang') === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
};
