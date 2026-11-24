# BALSONS ENTERPRISE ASSETS & IMAGES REFERENCE DIRECTORY
## Official Brand Marks, High-Definition Operational Covers, Design Tokens & Verified UI Screenshots

**Document Identifier:** `BAL-REF-ASSETS-V1.0`  
**Governing Standard:** BFast Enterprise Design System (`BEDS V2.0`)  
**Enterprise Entity:** BALSONS Heavy Lift & Shift  
**Anchor Project:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  

---

## 1. REPOSITORY ASSETS DIRECTORY STRUCTURE

```
PROJECT ASSETS AND IMAGES REFERENCE/
├── README.md                                    # This authoritative assets reference catalog
├── css/
│   └── beds.css                                 # Master BEDS design tokens, layouts & components
├── images/                                      # Official Brand Marks & High-Definition Covers
│   ├── balsons-logo.png                         # Master BALSONS corporate identity mark
│   ├── login-document-hub.jpg                   # Central Document & Compliance Hub backdrop
│   ├── login-gate.jpg                           # Gate Entry & Turnstile Access split-screen cover
│   ├── login-hr.jpg                             # HR & Dual-Wage Payroll split-screen cover
│   ├── login-operations.jpg                     # Operations & Heavy Erection split-screen cover
│   ├── login-purchase.jpg                       # Commercial Purchase & Vendor split-screen cover
│   ├── login-reports.jpg                        # Central Enterprise Launcher & Telemetry cover
│   ├── login-safety.jpg                         # Safety, EHS & PTW Governance split-screen cover
│   └── login-store.jpg                          # Store & Rigging Tackle Master split-screen cover
├── js/                                          # Core Enterprise JavaScript Libraries
│   ├── beds-workspace.js                        # Enterprise topbar, Dual-Sync & department switcher
│   ├── beds-superadmin.js                       # Master Super Admin governance & console
│   ├── beds-portal-login.js                     # Split-screen login modal controller
│   ├── balsons-sam-auth.js                      # SAM-2026 client authentication helper
│   └── balsons-docs-manager.js                  # Document manager & Drive integration
└── screenshots/                                 # 100% Verified Automated Playwright Screenshots
    ├── gf_launcher_desktop.png                  # Greenfield Launcher Desktop View (1440x900)
    ├── gf_launcher_mobile.png                   # Greenfield Launcher Mobile View (375x812)
    ├── gf_hr_registration_wizard.png            # Greenfield Candidate 6-Step Onboarding Wizard
    ├── gf_gate_desktop.png                      # Greenfield Gate Entry Radar & Turnstile Stream
    ├── gf_safety_desktop.png                    # Greenfield Safety Portal & 10-Permit Studio
    ├── gf_store_desktop.png                     # Greenfield Store Manager 264-Tool Catalog
    ├── gf_purchase_desktop.png                  # Greenfield Purchase Workbench & PO Generator
    └── gf_operations_desktop.png                # Greenfield Operations Heavy Erection Tracker
```

---

## 2. OFFICIAL BRAND MARKS & CORPORATE VISUAL IDENTITY

### 2.1 Corporate Logo (`balsons-logo.png`)
* **File Path:** [`images/balsons-logo.png`](file:///d:/BALSONS%20JUPITER%20PROJECT/OTHER/balsons%20portals/PROJECT%20ASSETS%20AND%20IMAGES%20REFERENCE/images/balsons-logo.png)
* **Byte Size:** 194,271 bytes (~190 KB)
* **Color Palette:** BALSONS Industrial Teal (`#0097B2`) and Deep Charcoal (`#102D35`).
* **Usage Rules:** Displayed on all portal topbars, splash screens, payslips, CR80 badges, delivery challans, and gate passes.

---

## 3. DOMAIN-SPECIFIC HIGH-DEFINITION LOGIN PHOTOGRAPHY COVERS

Each operational portal utilizes an authentic, high-definition photograph rendered in a 50/50 split-screen layout on desktop viewports:

| File Name | Byte Size | Target Operational Portal | Visual Subject Matter | CSS Full-Bleed Rule |
| :--- | :---: | :--- | :--- | :--- |
| **`login-reports.jpg`** | 928 KB | **Central Enterprise Launcher** | Executive operations center, telemetry screens. | `object-fit: cover; width: 100%; height: 100%;` |
| **`login-hr.jpg`** | 1.33 MB | **HR & Dual-Wage Payroll Manager** | Technical workforce briefing, engineering planning. | `object-fit: cover; width: 100%; height: 100%;` |
| **`login-gate.jpg`** | 1.40 MB | **Gate Entry & Turnstile Access** | Industrial plant perimeter gate, vehicle lanes. | `object-fit: cover; width: 100%; height: 100%;` |
| **`login-safety.jpg`** | 2.15 MB | **Safety, EHS & PTW Governance** | Rigging safety inspection, safety officer checklist. | `object-fit: cover; width: 100%; height: 100%;` |
| **`login-store.jpg`** | 1.51 MB | **Store & Rigging Tackle Master** | Heavy rigging warehouse, hydraulic jacks, shackles. | `object-fit: cover; width: 100%; height: 100%;` |
| **`login-purchase.jpg`**| 1.71 MB | **Commercial Purchase Manager** | Industrial procurement, engineering contracts. | `object-fit: cover; width: 100%; height: 100%;` |
| **`login-operations.jpg`**| 1.69 MB | **Operations & Heavy Erection** | Schuler press line assembly, crawler crane lift. | `object-fit: cover; width: 100%; height: 100%;` |
| **`login-document-hub.jpg`**| 920 KB | **Statutory Compliance Vault** | Document vault, statutory records archive. | `object-fit: cover; width: 100%; height: 100%;` |

---

## 4. BEDS V2.0 CSS TOKENS & APPLICATION STYLING (`css/beds.css`)

### 4.1 Master Color Tokens
* `--beds-teal-primary`: `#0097B2` (Primary interactive, focus, brand accents)
* `--beds-charcoal-heading`: `#102D35` (Headers, topbars, deep typography)
* `--beds-alert-red`: `#E64646` (Critical safety alerts, muster, BLOCKED state)
* `--beds-bg-canvas`: `#F3F6F8` (Fatigue-free industrial page canvas)
* `--beds-bg-surface`: `#FFFFFF` (High-contrast cards and panels)
* `--beds-status-cleared`: `#10B981` (Emerald green for approved/cleared)
* `--beds-status-conditional`: `#F59E0B` (Amber for conditional/pending)
* `--beds-status-blocked`: `#E64646` (Crimson for blocked/expired)

### 4.2 Standard Split-Screen CSS Implementation
```css
.login-split-left {
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--beds-charcoal-dark);
}

.login-split-left img.login-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
```

---

## 5. AUTOMATED PLAYWRIGHT VERIFICATION SCREENSHOT EVIDENCE

All 8 greenfield desktop and mobile screenshots captured during the 100% pass verification run are stored in [`screenshots/`](file:///d:/BALSONS%20JUPITER%20PROJECT/OTHER/balsons%20portals/PROJECT%20ASSETS%20AND%20IMAGES%20REFERENCE/screenshots):
* `gf_launcher_desktop.png` · `gf_launcher_mobile.png`
* `gf_hr_registration_wizard.png` · `gf_gate_desktop.png`
* `gf_safety_desktop.png` · `gf_store_desktop.png`
* `gf_purchase_desktop.png` · `gf_operations_desktop.png`
