# BALSONS SAFETY PORTAL
## REQUIREMENTS REFERENCE MASTER
**Project:** Jupiter Tatravagonka Railwheel Factory Pvt. Ltd. (JTRWF)  
**Prepared for:** BALSONS HEAVY LIFT & SHIFT  
**Document Type:** Business Requirements Document (BRD) + Functional & Technical Requirements Baseline  
**Version:** Draft V1.0  
**Status:** Reviewed & Baseline Proposed  
**Project Scope:** JTRWF – Khordha, Odisha, India

---

# 1. DOCUMENT PURPOSE

This document establishes the complete functional, operational, technical and administrative requirements for the BALSONS SAFETY PORTAL.

The portal shall operate as a centralised Safety Management and Work Authorisation System for BALSONS activities at the JTRWF project site.

It shall manage safety activities from initial planning and personnel compliance verification through work authorisation, execution monitoring, inspections, incident reporting, corrective actions, reporting and final record closure.

This document shall serve as the single authoritative reference for:

- System planning and architecture.
- Functional and module development.
- Database and master register design.
- User roles and access permissions.
- Safety workflows and approval processes.
- Permit-to-Work (PTW) management.
- Inspection, incident and corrective-action management.
- Reports, notifications and audit trails.
- Testing, acceptance and deployment.

---

# 2. PROJECT OBJECTIVE

Develop a professional, reliable and auditable digital Safety Management Portal that:

1. Centralises all BALSONS project safety records.
2. Controls work authorisation through a structured approval process.
3. Ensures safety prerequisites are verified before work begins.
4. Maintains personnel, competency and safety training records.
5. Controls high-risk activities such as lifting, hot work, confined-space entry and work at height.
6. Provides digital safety inspections and checklists.
7. Records incidents, near misses, unsafe conditions and observations.
8. Tracks corrective and preventive actions until verified closure.
9. Provides real-time safety status to authorised management.
10. Maintains complete historical records and an auditable approval trail.
11. Provides English and Hindi interfaces.
12. Generates professional safety reports and registers.

---

# 3. PROJECT SCOPE

## 3.1 Project Coverage

The portal shall be configured exclusively for:

**Jupiter Tatravagonka Railwheel Factory Pvt. Ltd. (JTRWF), Khordha, Odisha.**

Initial work areas:

| Code | Work Area |
|---|---|
| AREA-01 | AXLE FORGING LINE |
| AREA-02 | WHEEL FORGING LINE |
| AREA-03 | MACHINE SHOP |
| AREA-04 | DIE SHOP |

The system shall permit authorised administrators to configure additional work areas without changing the application code.

## 3.2 Work Activities Covered

The system shall support safety management for:

- Heavy lifting and rigging operations.
- Hydraulic jacking and load shifting.
- Machinery unloading and positioning.
- Mechanical erection and installation.
- Forging press installation.
- Electrical and pneumatic activities.
- Work at height.
- Hot work and welding.
- Confined-space activities.
- Equipment installation and commissioning.
- Material handling and transportation.
- Contractor and subcontractor activities.
- General maintenance and other approved site activities.

## 3.3 Scope Boundary

The Safety Portal is a dedicated safety management system.
It shall not be merged with the Gate Entry Portal, HR/Payroll Portal or Manpower Management Portal.
Where integration is later approved, the systems may exchange controlled reference data without merging their databases, permissions or business workflows.
A safety clearance or PTW approval shall not automatically constitute gate entry approval or permission to bypass any separate site authorisation.

---

# 4. PLATFORM AND TECHNICAL BASELINE

| Parameter | Requirement |
|---|---|
| System Name | BALSONS SAFETY PORTAL |
| Project | JTRWF (PRJ-JTRWF-SCHULER) |
| Frontend | HTML5, CSS3 (BEDS V1.0) and Vanilla JavaScript |
| Backend | Google Apps Script (Modular Gateway) |
| Primary data platform | Google Sheets (Live Relational Database) |
| File storage | Google Drive / Base64 Document Storage |
| Hosting | GitHub Pages (Frontend) + Google Apps Script Web App (API) |
| Account | Dedicated BALSONS Google account (balsonsportals@gmail.com) |
| Connectivity | Online operation with offline resilience |
| User Interface | Responsive desktop, tablet and mobile |
| Languages | English and Hindi (हिन्दी) |
| Authentication | Role-based authenticated access (RBAC) |
| Audit | Server-side transaction and access logging |
| Reporting | PDF, Excel/CSV-compatible export and printable reports |
| Daily processing | Scheduled 12:00 AM refresh and summary |

---

# 5. USER MANAGEMENT AND ACCESS CONTROL

## 5.1 User Roles

| Role | Responsibility |
|---|---|
| Owner / Super Admin | Complete system control and configuration |
| Safety Manager | Overall safety management, high-risk reviews, final approvals |
| Safety Officer / Safety Team | Inspections, verification, field monitoring and safety records |
| Work Supervisor | Work requests, permits, worksite readiness and execution updates |
| Read-only / Client Reviewer | Controlled viewing of authorised records and reports (JTRWF/Schuler) |

## 5.2 Authentication & Security
- Individual user accounts with salted password hashing.
- Role-based and work-area-based access restrictions.
- Server-side permission validation (no frontend-only security bypass).
- Session timeout and failed login monitoring.
- Permanent audit trail for all safety-critical transactions (no hard delete).

---

# 6. MASTER SYSTEM MODULES (12 MODULES)

- **MODULE 01 – SAFETY DASHBOARD:** Real-time KPI radar, active permits, pending approvals, open inspections, incidents, overdue CAPA, TBT count, lifting status.
- **MODULE 02 – TOOLBOX TALKS (TBT):** Daily pre-work briefings, topics, supervisor ID, digital attendance register, photo evidence, unique TBT reference.
- **MODULE 03 – SAFETY INSPECTIONS & CHECKLISTS:** Routine (Daily, Weekly) and category checklists (PPE, Electrical, Height, Lifting, Scaffolding, Fire).
- **MODULE 04 – LIFTING AND RIGGING SAFETY:** Critical vs Routine lifts, crane configurations, load charts, sling/shackle inspections (Form 11), rigger competency.
- **MODULE 05 – PERMIT TO WORK (PTW):** 4 Master Categories (`GENERAL`, `HOT WORK`, `HEIGHT WORK`, `CONFINED SPACE`) mapped to 10 detailed templates. Sequential workflow: `Supervisor Submit → Safety Officer Verify → Site Manager Authorise → Issuance`.
- **MODULE 06 – HAZARD, INCIDENT & NEAR-MISS:** Unsafe acts/conditions, near-misses, first-aid cases, property/equipment damage, 5-Why root cause analysis, evidence logs.
- **MODULE 07 – MANPOWER & COMPETENCY SAFETY:** Medical fitness (Form 31), safety induction, height pass, crane operator license, rigger certifications, validity tracking.
- **MODULE 08 – EMERGENCY PREPAREDNESS:** Assembly points, ERT team contacts, fire extinguisher registers, mock drill schedules and attendance logs.
- **MODULE 09 – DOCUMENTS & COMPLIANCE:** JSA, Risk Assessments, Method Statements, Third-party test certificates, calibration logs, revision control.
- **MODULE 10 – CORRECTIVE & PREVENTIVE ACTION (CAPA):** `Open → Assigned → Action in Progress → Verification → Closed`. Escalation on overdue.
- **MODULE 11 – REPORTS & SAFETY AUDITS:** Daily Safety Report (DSR), PTW registers, TBT summaries, Incident registers, CAPA status, PDF/CSV export.
- **MODULE 12 – ADMINISTRATION & AUDIT TRAIL:** User management, work area masters, checklist templates, notification settings, immutable audit log.

---

# 7. RESOLUTION OF OPEN DECISIONS (D-01 to D-12)

| ID | Decision Item | Locked Resolution (Under SAM-2026) |
|---|---|---|
| **D-01** | Live Database | **Google Sheets** (`BALSONS_JTRWF_SAFETY_DB`) as the single live relational source of truth. |
| **D-02** | Authentication | Custom username/password with SHA-256 password hashing + salt, session tokens in `localStorage`. |
| **D-03** | Approval Authority | Sequential: `Supervisor (Submit)` ➔ `Safety Officer (Verify)` ➔ `Site Manager (Approve)` ➔ `Permit Issued`. |
| **D-04** | PTW Categories & Templates | 4 Primary Categories containing 10 specialised templates configured via `PERMIT_TEMPLATES` master. |
| **D-05** | Conditional Permits | Shift-based validity (max 12 hrs), prerequisite checklist mandatory before release, revalidation required for extensions. |
| **D-06** | Evidence Storage | Document and photo uploads stored via Base64/Drive in `SAFETY_DOCUMENTS` with role-restricted viewing. |
| **D-07** | Notifications | Immediate alerts for Critical Incidents/Stoppages; Daily 12:00 AM summary refresh for dashboard KPIs. |
| **D-08** | User Access | 5 Hierarchical Roles with server-side validation on every transaction. |
| **D-09** | Site Rules | JTRWF Khordha specific safety rules (100% PPE, Zero Tolerance, Area Barricading, Hot Work Fire Watch). |
| **D-10** | Legal Compliance | Odisha Factories Rules compliance: Form 11 (Lifting), Form 31 (Medical Fitness), Rule 61 (Work at Height). |
| **D-11** | Backup | Daily automated backup snapshots logged in `BACKUP_LOG`. |
| **D-12** | Deployment | Dedicated GitHub Repo (`BALSONS_SAFETY_PORTAL`) + Google Apps Script Web App API Gateway. |
