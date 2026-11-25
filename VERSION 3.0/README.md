# BALSONS Heavy Lift & Shift • Enterprise Multi-Portal Ecosystem
## Selected Master Architecture (SAM-2026) & BEDS V3.0 Master Workspace

**Anchor Project Base:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  
**Core Client / Scope:** JTRWF Heavy Forging Press & Heat Treatment Plant (Schuler Line)  
**Access Governance:** Global Super Administrator Policy V1.0 ("One Super Administrator • All Portals • Complete Control")  
**Design Baseline:** BALSONS Enterprise Design System (BEDS V3.0)  
**Selected Master Architecture:**
- **Private GitHub repository:** Mandatory frontend source control, version history and release management.
- **Cloudflare Pages:** High-speed edge frontend hosting, connected to the private GitHub repository for controlled deployment.
- **Google Apps Script:** Backend, APIs, business rules, approvals, automation and integration engine.
- **Google Sheets:** Operational databases, with separate data authority for each portal and the Central Sync Hub.
- **Google Drive:** Controlled document and evidence storage (Master Root Vault ID: `1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde`).
- **Synchronization:** BALSONS Central Sync Hub (`beds-workspace.js` with 30s auto-sync and outbox mutation queue).
- **Offline Storage:** IndexedDB (`BALSONS_STORE_DB` local object store).

---

## 1. Selected Master Architecture Summary

| Architectural Layer | Selected Platform | Technical Scope & Implementation |
| :--- | :--- | :--- |
| **Frontend Source** | **Private GitHub Repository** | Mandatory source control, version tagging, branch protection, and release tracking. |
| **Frontend Hosting** | **Cloudflare Pages** | Connected to private GitHub repo; high-availability Anycast edge CDN, automated SSL/TLS, custom domain routing. |
| **Backend Engine** | **Google Apps Script (V8)** | Serverless `doPost` action routers, `LockService` 10s mutex concurrency, `CacheService` 6h session security. |
| **Operational Database** | **Google Sheets (Relational)** | Dedicated relational workbooks per portal (22–24 tabs each) + SHA-256 tamper-evident cryptographic audit chain. |
| **Document & Evidence Vault** | **Google Drive Enterprise Vault** | Master Root Vault ID `1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde` across 7 departmental trees and 87 provisioned subcategories. |
| **Synchronization** | **BALSONS Central Sync Hub** | Automated bi-directional cross-portal sync with dynamic outbox queue (`beds_pending_mutations_queue`). |
| **Offline Storage** | **Browser IndexedDB** | `BALSONS_STORE_DB` client-side object stores for zero-latency rigging tool checkout and field offline resilience. |
| **Edge Hardware Scanning** | **Field Optical Scanners** | 100% In-memory QR generator (`qrcode.min.js`), ISO/IEC 18004 Level Q, 12.83:1 contrast ratio for rugged Zebra/Honeywell units. |
| **Print Output Standard** | **Calibrated Single-Sheet A4 Stage** | `#bedsPrintStage` zero-spill print engine at 100% scale (passes, challans, PTWs, payslips, Form 11, UAT certificates). |

---

## 2. Workspace Directory Map

```
VERSION 3.0/
├── _headers                         # Cloudflare Pages security & caching headers
├── _redirects                       # Cloudflare Pages clean routing rules
├── wrangler.toml                    # Cloudflare Pages project configuration
├── index.html                       # Central Multi-Portal Enterprise Launcher
├── verify.html                      # Universal Digital Verification Gateway (6 Domains)
├── uat_signoff_certificate.html     # Formal Directorate UAT Sign-Off Certificate
├── balsons-master-ecosystem-directory.html # Ecosystem Master Data & Architecture Directory
├── beds.css                         # BEDS V3.0 Master Design System & Color Tokens
├── BALSONS GATE ENTRY MANAGER/      # Gate Turnstiles, Pre-Clearance, RGP/NRGP Material Movements
├── BALSONS HR MANAGER/              # Dual-Wage Payroll (Staff + Daily Crew), Attendance & Biometrics
├── BALSONS SAFETY MANAGER/          # HSE Permits-to-Work (PTW Studio), HIRA, TBT & Safety Compliance
├── BALSONS STORE MANAGER/           # Rigging Tool Master (264 Items), Form 11 Lifting Tackles & Loans
├── BALSONS PURCHASE MANAGER/        # Commercial RFQ, Purchase Orders, Vendor Comparative Statements
├── BALSONS OPERATIONS MANAGER/      # Heavy Crane Logistics, Schuler Press Line Erection & Work Packages
├── BALSONS REPOTS PORTAL/           # Central Sync Hub Telemetry, Cross-Portal Audits & Analytics
├── assets/                          # Shared Logos, Covers, Brand Typography & BEDS UI Libraries
│   ├── css/beds.css
│   ├── images/ (balsons-logo.png, login-*.jpg)
│   └── js/ (balsons-docs-manager.js, beds-workspace.js, beds-superadmin.js, dossier-360.js, qrcode.min.js)
├── docs/                            # Master Specifications & UAT Handover Packages
│   ├── specifications/              # SELECTED_MASTER_ARCHITECTURE_BASELINE.md, balsons_drive_folder_map.json
│   └── certificates/                # BALSONS_ENTERPRISE_UAT_SIGNOFF_CERTIFICATE_LOCKED.pdf
├── tests/                           # Automated E2E Playwright Verification Suites & Reports
└── README.md                        # Master Architecture & Ecosystem Catalog (This File)
```

---

## 3. Operational Portals & Live Endpoints

| Portal Module | Local Path | Dedicated Operational Database |
| :--- | :--- | :--- |
| 🚀 **Central Launcher** | `index.html` | Cross-Portal Coordination Hub & Telemetry |
| 🚧 **Gate Entry Manager** | `BALSONS GATE ENTRY MANAGER/frontend/index.html` | `1v_0Xo44...` (22 relational tabs) |
| 📦 **Store Manager** | `BALSONS STORE MANAGER/frontend/index.html` | `1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ` (264 items + IndexedDB) |
| 🦺 **Safety Manager** | `BALSONS SAFETY MANAGER/frontend/index.html` | `1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0` (10 PTW registers) |
| 👥 **HR & Payroll** | `BALSONS HR MANAGER/frontend/index.html` | `1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw` (24 relational tabs) |
| 📝 **Employee Self-Reg** | `BALSONS HR MANAGER/frontend/register.html` | Integrated HR Pipeline & Onboarding Wizard |
| 🏗️ **Operations Manager** | `BALSONS OPERATIONS MANAGER/index.html` | `1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E` (Schuler press line) |
| 🛒 **Purchase Manager** | `BALSONS PURCHASE MANAGER/index.html` | Commercial Procurement Master & PO Ledger |
| 📊 **Sync & Reports Hub** | `BALSONS REPOTS PORTAL/index.html` | Executive Reporting & Cross-Portal Sync Hub |
| 🔒 **Universal Verify** | `verify.html` | Digital Verification Gateway across all 6 domains |
| 📜 **UAT Certificate** | `uat_signoff_certificate.html` | Formal Directorate System Handover Certificate |

---

## 4. Master Credentials Reference

> **Standard Default Enterprise Password:** `balsons@2026` across all administrative profiles.

| Role | Username | Password | Personnel | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Super Administrator** | `superadmin` | `balsons@2026` | **Prashant Mohanty** | Full Global Access Across All Portals & Data |
| **Management / Director** | `director.mgmt` | `balsons@2026` | **Satish Chandra** | Project Directorate Scope (Store, Safety, Launcher) |
| **Safety Portal Admin** | `admin.safety` | `balsons@2026` | **Gajendra Rao** | HSE Lead Administrator Scope |
| **HR Portal Admin** | `admin.hr` | `balsons@2026` | **Priyanka Senapati** | Human Resources & Dual-Wage Payroll Scope |
| **Gate Entry Admin** | `admin.gate` | `balsons@2026` | **Bikash Mohapatra** | Gate In-Charge & Turnstile Access Scope |
| **Store Portal Admin** | `admin.store` | `balsons@2026` | **Gagan Bihari Das** | Chief Store In-Charge & Tool Custody Scope |
| **HOD / Department Head** | `hod.rigging` | `balsons@2026` | **Ashok Mohanty** | Heavy Rigging Departmental Scope |
| **Supervisor** | `sup.bay3` | `balsons@2026` | **Dilip Rout** | Bay-3 Lifting & Field Operations Scope |
| **Employee / Crew** | `emp.ramesh` | `balsons@2026` | **Ramesh Kumar** | General Shift & Gate Pass Scope |
