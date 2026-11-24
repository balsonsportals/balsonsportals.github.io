/**
 * BALSONS STORE MANAGER - BILINGUAL TRANSLATIONS (EN / HI)
 * Standard: BEDS V1.0
 */

const BalsonsStoreI18n = {
  currentLang: 'en',
  
  translations: {
    en: {
      portal_title: "BALSONS STORE MANAGER",
      portal_sub: "JTRWF Khordha Project · Store & Heavy Rigging Inventory System",
      nav_radar: "Store Radar",
      nav_inventory: "264 Tool Master",
      nav_form11: "Statutory Form 11",
      nav_loans: "Tool Loans & Issue",
      nav_receipts: "Material Inward (GRN)",
      nav_quarantine: "Quarantine Desk",
      nav_rgp: "RGP / NRGP Studio",
      nav_procurement: "Procurement & PR",
      nav_vendors: "Vendor Master",
      nav_dossier: "360° Workforce Dossier"
    },
    hi: {
      portal_title: "बालसंस स्टोर मैनेजर",
      portal_sub: "जेटीआरडब्ल्यूएफ खोरधा प्रोजेक्ट · स्टोर एवं भारी रिगिंग इन्वेंटरी प्रणाली",
      nav_radar: "स्टोर रडार",
      nav_inventory: "264 टूल मास्टर",
      nav_form11: "वैधानिक फॉर्म 11",
      nav_loans: "टूल जारी एवं वापसी",
      nav_receipts: "सामग्री आवक (GRN)",
      nav_quarantine: "क्वारंटाइन डेस्क",
      nav_rgp: "गेट पास (RGP/NRGP)",
      nav_procurement: "खरीद एवं मांग",
      nav_vendors: "विक्रेता रजिस्टर",
      nav_dossier: "360° कार्यबल डॉसियर"
    }
  },

  init: function() {
    const saved = localStorage.getItem('balsons_store_lang') || 'en';
    this.setLang(saved);
  },

  setLanguage: function(lang) {
    this.setLang(lang);
  },

  setLang: function(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('balsons_store_lang', lang);
      this.applyTranslations();
    }
  },

  applyTranslations: function() {
    const dict = this.translations[this.currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.querySelectorAll('.lang-pill').forEach(btn => {
      if (btn.getAttribute('data-lang') === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
};

window.BalsonsStoreI18n = BalsonsStoreI18n;
