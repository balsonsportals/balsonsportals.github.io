# BALSONS Enterprise Portal Ecosystem • Documentation & Governance Library

**Project Base:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  
**Standard Architecture Model (SAM-2026)** | **BEDS V1.0 Locked Baseline**  

This directory contains the governing technical baseline specifications, architectural standards, security audit registers, and access control documentation for the entire BALSONS multi-portal platform.

---

## Directory Index

```
docs/
├── specifications/
│   ├── BALSONS_ANTIGRAVITY_ALL_PORTALS_UPDATE_REFERENCE_V1_0.pdf
│   ├── BALSONS_Common_Portal_Super_Admin_Access_Control_V1_0.pdf
│   ├── BALSONS_PORTAL_LOCKED_SAM_ARCHITECTURE.md
│   ├── BEDS_ENTERPRISE_DESIGN_SYSTEM_V1_0.md
│   └── PORTAL PASSWORD.pdf
├── audits/
│   ├── BALSONS_FINAL_MASTER_TECHNICAL_BASELINE_V5.3.md
│   ├── BALSONS_GLOBAL_PORTAL_ENHANCEMENT_REPAIR_BASELINE_V5.0.pdf
│   └── BALSONS_Portals_Strict_Technical_Audit_2026-11-21.pdf
└── README.md
```

---

## 1. Specifications (`docs/specifications/`)

| Document | Format | Description |
| :--- | :--- | :--- |
| **`BALSONS_ANTIGRAVITY_ALL_PORTALS_UPDATE_REFERENCE_V1_0.pdf`** | PDF | Master reference for multi-portal synchronization, common branded login cards, and BEDS design specifications. |
| **`BALSONS_Common_Portal_Super_Admin_Access_Control_V1_0.pdf`** | PDF | Single Super Administrator Access Policy V1.0: "One Super Administrator • All Portals • All Data • Complete Control". |
| **`BALSONS_PORTAL_LOCKED_SAM_ARCHITECTURE.md`** | Markdown | Standard Architecture Model (SAM-2026) specification defining portal isolation, gas endpoints, and database boundaries. |
| **`BEDS_ENTERPRISE_DESIGN_SYSTEM_V1_0.md`** | Markdown | BALSONS Enterprise Design System (BEDS V1.0) complete token directory, color scales, components, and typography rules. |
| **`PORTAL PASSWORD.pdf`** | PDF | Official directory of administrative user IDs, standard default password (`balsons@2026`), and access matrix. |

---

## 2. Audits & Technical Baselines (`docs/audits/`)

| Document | Format | Status | Description |
| :--- | :--- | :--- | :--- |
| **`BALSONS_FINAL_MASTER_TECHNICAL_BASELINE_V5.3.md`** | Markdown | **GOVERNING MASTER** | Definitive 40-finding security register, 42 acceptance criteria, and file-by-file implementation baseline approved by the user. |
| **`BALSONS_GLOBAL_PORTAL_ENHANCEMENT_REPAIR_BASELINE_V5.0.pdf`** | PDF | Baseline | Global repair authorization and baseline technical scope. |
| **`BALSONS_Portals_Strict_Technical_Audit_2026-11-21.pdf`** | PDF | Audit Evidence | Comprehensive source code audit identifying backend bypasses, database mismatches, and schema alignments. |

---

## 3. Core Enterprise Access Directory

| Role Tier | User ID | Default Password | Assigned Personnel | Domain Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Super Administrator** | `superadmin` | `balsons@2026` | **Prashant Mohanty** | All Portals & All Data (Full Master Access) |
| **Management / Director** | `director.mgmt` | `balsons@2026` | **Satish Chandra** | Project Directorate (Store, Safety, Launcher) |
| **Safety Portal Admin** | `admin.safety` | `balsons@2026` | **Gajendra Rao** | HSE & PTW Manager |
| **HR Portal Admin** | `admin.hr` | `balsons@2026` | **Priyanka Senapati** | HR & Dual-Wage Payroll |
| **Gate Entry Admin** | `admin.gate` | `balsons@2026` | **Bikash Mohapatra** | Gate Entry & Site Security |
| **Store Portal Admin** | `admin.store` | `balsons@2026` | **Gagan Bihari Das** | Rigging Store & Tool Master |
| **HOD / Department Head** | `hod.rigging` | `balsons@2026` | **Ashok Mohanty** | Heavy Rigging & Lifting Operations |
| **Manager / Supervisor** | `sup.bay3` | `balsons@2026` | **Dilip Rout** | Bay-3 Lifting Operations & Permits |
| **Employee / Crew** | `emp.ramesh` | `balsons@2026` | **Ramesh Kumar** | Site Turnstile & General Shift Access |
