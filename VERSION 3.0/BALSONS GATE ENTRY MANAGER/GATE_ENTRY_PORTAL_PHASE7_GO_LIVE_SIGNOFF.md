# BALSONS HEAVY LIFT & SHIFT
## JTRWF GATE ENTRY & SITE ACCESS PORTAL (`PRJ-JTRWF-SCHULER`)
### PHASE 7: UAT & GO-LIVE FINAL RELEASE SIGN-OFF (LOCKED BASELINE)

**Document Date:** 19 November 2026  
**System:** BALSONS JTRWF Gate Entry & Site Access Portal  
**Platform Architecture:** BALSONS-SAM-2026 (Locked Baseline)  
**Enterprise Design Standard:** BEDS V1.0 (Inter Typography, Brand Teal `#0097B2`, Industrial Charcoal `#102D35`, Alert Red `#E64646`, Default Premium Light Mode)  
**Google Apps Script Version:** Version 16 (`v1.5.1-audit`)  
**Database Spreadsheet ID:** `1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o` (`BALSONS_JTRWF_GATE_MASTER_DB`)  
**Deployment Target:** GitHub Pages / Central Enterprise Portal Launcher  
**Company Motto:** *“Difficult we do easily, impossible takes little time…!”*

---

### 1. EXECUTIVE STATEMENT & RELEASE LOCK
The **BALSONS JTRWF Gate Entry & Site Access Portal** has successfully passed all statutory, architectural, and operational acceptance tests (JGE-001 to JGE-019). The system is declared **LOCKED & READY FOR PRODUCTION GO-LIVE** at the Jupiter Tatravagonka Railwheel Factory (JTRWF) site in Khordha, Odisha.

Under no circumstances should any developer, sentry, or administrator alter the non-waivable statutory safety blocker engine or the calibrated single-sheet A4 Material Movement Challan print layout without formal written HSE governance approval.

---

### 2. ACCEPTANCE TEST MATRIX VERIFICATION (JGE-001 TO JGE-019)

| Test ID | Test Category | Scope & Statutory Rule | Verification Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **JGE-001** | Architecture Proof | CORS-safe `POST` transport via `text/plain` payload | Handshake tested; zero CORS preflight failures | **PASSED** |
| **JGE-002** | Foundation | Google Sheets relational schema (22 tabs) | Verified via `DbInit.gs`; frozen headers & UUIDs | **PASSED** |
| **JGE-003** | Auth & Session | PBKDF2/SHA-256 hashed credentials & role tokens | Multi-role login (`admin`, `safety.manager`, `safety.team`) verified | **PASSED** |
| **JGE-004** | Master Data: Contractor | Atomic `CON-2026-XXXX` generation via LockService | Live CRUD, deduplication, and audit logging active | **PASSED** |
| **JGE-005** | Master Data: Personnel | Atomic `PER-2026-XXXX` generation & Aadhaar masking | `XXXXXXXX1234` masking enforced; photo/trade linked | **PASSED** |
| **JGE-006** | Master Data: Equipment | Atomic `EQ-2026-XXXX` for cranes, jacks & power packs | SWL capacity, Form-11 references & TPI validity tracked | **PASSED** |
| **JGE-007** | Master Data: Vehicle | Atomic `VEH-2026-XXXX` for hydraulic pullers & trailers | PUC, fitness & commercial insurance validation active | **PASSED** |
| **JGE-008** | 9-Discipline Compliance | Server-side deterministic compliance evaluation | Evaluates all 9 statutory safety disciplines (v1.4.0) | **PASSED** |
| **JGE-009** | Height/Vertigo Rule | Section 40, Odisha Factories Rules (>1.8m elevation) | **BLOCKED** if height work selected without vertigo clearance | **PASSED** |
| **JGE-010** | Police Background | State Crime Branch / District Police verification | **BLOCKED** if missing or expired (>12 months) | **PASSED** |
| **JGE-011** | Workmen Compensation | Active policy coverage matching trade & contractor | **BLOCKED** if contractor policy expired | **PASSED** |
| **JGE-012** | PPE & Morning TBT | 6-Point PPE inspection & daily gate plaza briefing | **CONDITIONAL** if TBT pending; cleared post-briefing | **PASSED** |
| **JGE-013** | Statutory Blockers | Non-waivable statutory blocker protection | Overrides strictly prohibited for Vertigo/Form-11/WC/Police | **PASSED** |
| **JGE-014** | Safety Override | Audited Safety Manager exception workflow | Logged to `EXCEPTION_LOG` & `AUDIT_LOG` with 4h-12h limits | **PASSED** |
| **JGE-015** | Material Inward (PO/DC) | Receipt of Schuler/Ferroterro shipments (`IGE-2026-XXXX`) | Unloading bay tracking & automated Store notification | **PASSED** |
| **JGE-016** | Controlled Gate Pass | Returnable (RGP) & Non-Returnable (NRGP) asset tracking | Dynamic **🚨 OVERDUE** calculation for expired RGPs | **PASSED** |
| **JGE-017** | RGP Return Reconcile | Store receiving & condition inspection modal | Reconciles plant inventory and marks `RETURNED_CLOSED` | **PASSED** |
| **JGE-018** | Live Muster Radar | Emergency evacuation headcount & bay distribution | Active Headcount (48), Bay breakdown & 1-click print | **PASSED** |
| **JGE-019** | Audit Ledger | Immutable chronological cryptographic audit log | Action & outcome filtering, search, and 1-click CSV export | **PASSED** |

---

### 3. STATUTORY MATERIAL CHALLAN PRINT SPECIFICATION (LOCKED)
- **Document Matching:** 100% Word replica of `MMFL RETURN CHALLAN-1.docx` and `MATERIAL CHALLAN.pdf`.
- **Page Border:** `border: 1.5px solid #102D35 !important;` surrounding the entire printable sheet.
- **Strict A4 Single Sheet Guarantee:**
  - `@media print` margin: `top: 10mm; bottom: 10mm; left: 12mm; right: 12mm;`.
  - Ancestor isolation: `body > *:not(main) { display: none !important; }`, `main > *:not(#tab-challan) { display: none !important; }`.
  - Physical Page Count: **Strictly 1 sheet of paper (`1 of 1`)** verified by Headless Chrome engine and PyPDF.

---

### 4. GOOGLE APPS SCRIPT BACKEND DEPLOYMENT RECORD
- **Deployment ID:** `AKfycbzqG6THkjhA-8324dOg9cbMAc3IWCZdmp9sT6zTdPINUWAgB0cOm4H4TFCWprYmT9lXNg`
- **Active Release Version:** `Version 16` (`v1.5.1-audit`)
- **Pushed Service Modules:**
  1. `appsscript.json` (Manifest)
  2. `Code.gs` (Controller & Master Action Dispatcher)
  3. `AuthService.gs` (Session & Credential Security)
  4. `MasterDataService.gs` (Contractors, Personnel, Equipment, Vehicles)
  5. `ClearanceEngine.gs` (9-Discipline Matrix & Safety Overrides)
  6. `GateTransactionService.gs` (Material Inward PO/DC, RGP/NRGP Pass Center, Gate Log)
  7. `AuditService.gs` (Immutable Ledger & CSV Export)
  8. `DbInit.gs` (Relational Schema Provisioning)

---

### 5. GIT REPOSITORY COMMITS & INTEGRITY
```
2f3a86f feat(phase6): wire dynamic audit trail ledger, real-time filtering, and csv export
bd5690c feat(audit): implement listAuditLogs and helper aliases in AuditService
a84d1ff feat(phase5): wire physical gate transactions, material inward po-dc, and controlled rgp-nrgp pass center
bd546bc feat(phase4): wire 9-discipline compliance console, tri-state clearance engine, and audited safety override
276645d fix(print): rework Material Challan to 100% Word replica with clean page border and strict 1-page A4 narrow margin
2ffc407 fix(print): calibrate Material Challan to A4 paper with narrow margins (8mm) and full vertical coverage
```

---
*Signed for BALSONS HEAVY LIFT & SHIFT:*  
**Project Owner / HSE Lead — JTRWF Khordha Site**  
*“Difficult we do easily, impossible takes little time…!”*
