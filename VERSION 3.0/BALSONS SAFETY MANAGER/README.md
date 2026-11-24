# BALSONS SAFETY PORTAL & WORK AUTHORISATION SYSTEM
**Project:** Jupiter Tatravagonka Railwheel Factory Pvt. Ltd. (JTRWF)  
**Contractor:** BALSONS HEAVY LIFT & SHIFT  
**Location:** Khordha, Odisha, India  
**System Architecture:** SAM-2026 (Locked Baseline) · BEDS V1.0  
**Version:** V1.0.0-Production  

---

## 1. System Overview
The **BALSONS Safety Portal** is an enterprise-grade, auditable Safety Management and Work Authorisation System engineered specifically for heavy lifting, rigging, and mechanical erection at the JTRWF project site.

It provides end-to-end digital governance across 12 master safety modules, ensuring no high-risk activity proceeds without verifiable prerequisites, continuous monitoring, and sequential multi-tier sign-off.

---

## 2. Master System Modules
1. **Safety Dashboard:** Live KPI radar (Safe Man-Hours, Days Without LTI, Active & Pending Permits, Open CAPAs, Compliance Score).
2. **Toolbox Talks (TBT):** Pre-shift briefings, attendance logs, and worker acknowledgements.
3. **Safety Inspections & Checklists:** Routine inspections (LTT, Scaffolding, Electrical, Fire, PPE) with automatic non-compliance CAPA generation.
4. **Heavy Lifting & Rigging Safety:** Rigging plan evaluation, crane capacity utilization calculations (`Load / Capacity * 100`), tandem lift controls.
5. **Permit-to-Work (PTW) System:**
   - **4 Master Categories:** `GENERAL`, `HOT WORK`, `HEIGHT WORK`, `CONFINED SPACE`
   - **10 Standard Templates:**
     - `PTW-T01`: General Cold Work Permit
     - `PTW-T02`: Hot Work & Welding Permit
     - `PTW-T03`: Work at Height Permit (>1.8M)
     - `PTW-T04`: Confined Space Entry Permit
     - `PTW-T05`: Electrical & LOTO Isolation Permit
     - `PTW-T06`: Mechanical / Hydraulic Isolation Permit
     - `PTW-T07`: Heavy Lifting & Rigging Permit
     - `PTW-T08`: Excavation & Ground Breaking Permit
     - `PTW-T09`: Line Breaking / Pipeline Opening Permit
     - `PTW-T10`: Roof Access & Fragile Surface Permit
   - **4-Stage Sequential Approval Workflow:**
     - Stage 1: Work Supervisor (`Submit`)
     - Stage 2: Safety Officer (`Verify`)
     - Stage 3: Site Manager / Project Head (`Approve & Issue`)
     - Stage 4: Permit Holder & Safety Officer (`Handback & Close`)
   - **Official Printable A4 Format:** Complete formatted certificate with company branding, risk ratings, verified prerequisites, and 4-tier signature blocks.
6. **Hazards & Observations:** Unsafe Act (UA) and Unsafe Condition (UC) reporting and immediate containment tracking.
7. **Incident & Near Miss Management:** Incident classification and 5-Why root cause investigations.
8. **Manpower Safety & Competency:** Inducted workforce registry, Form 31 medical fitness, Height Pass certification, crane licenses.
9. **Emergency Readiness & Fire Safety:** Emergency response directory, assembly points, fire extinguisher inspection tracking.
10. **Method Statements & HIRA:** JSA and risk assessment repository.
11. **CAPA Register:** Corrective and preventive action tracking from identification through verification and closure.
12. **Daily Safety Reports (DSR):** Automated daily safety summaries and executive reporting.

---

## 3. Technology Stack
- **Frontend:** Pure HTML5, CSS3 (BEDS V1.0), Vanilla JavaScript (ES6+).
- **Backend:** Google Apps Script Web App API (`doGet` / `doPost` with text/plain CORS-safe transport).
- **Database:** Google Sheets (`BALSONS-SAM-2026`) with 20 relational sheets initialized via `DbInit.gs`.
- **Bilingual Support:** Live English & Hindi (हिन्दी) interface.

---

## 4. Default System Credentials
| Role | Username | Password | Assigned Scope |
|---|---|---|---|
| Owner / Super Admin | `admin` | `Balsons@2026` | Complete System Control (ALL) |
| Safety Manager | `safety.mgr` | `Balsons@2026` | Approvals & HSE Management (ALL) |
| Safety Officer | `safety.off` | `Balsons@2026` | Verification & Inspections (AREA-01, AREA-02) |
| Work Supervisor | `sup.ramesh` | `Balsons@2026` | Work Requests & TBTs (AREA-01) |
| Client Reviewer | `client.jtrwf` | `Balsons@2026` | Read-only Audits & DSR Reports (ALL) |
