# BALSONS Heavy Lift & Shift • Enterprise Multi-Portal Ecosystem
## Standard Architecture Model (SAM-2026) & BEDS V1.0 Master Workspace

**Anchor Project Base:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  
**Core Client / Scope:** JTRWF Heavy Forging Press & Heat Treatment Plant (Schuler Line)  
**Access Governance:** Global Super Administrator Policy V1.0 ("One Super Administrator • All Portals • Complete Control")  
**Design Baseline:** BALSONS Enterprise Design System (BEDS V1.0)  

---

## 1. Workspace Directory Map

```
balsons portals/
├── BALSONS ENTERPRISE LAUNCHER/    # Central Executive Multi-Portal Launcher Hub
├── BALSONS GATE ENTRY MANAGER/     # Personnel & Vehicle Turnstiles, Pre-Clearance, RGP/NRGP
├── BALSONS HR MANAGER/             # Dual-Wage Payroll (Staff + Daily Crew), Attendance & Biometrics
├── BALSONS OPERATIONS MANAGER/     # Crane Logistics, SPMT Heavy Haulage, Rigging & Erection
├── BALSONS PURCHASE MANAGER/       # Commercial RFQ, Purchase Orders, Vendor Sourcing & GRN
├── BALSONS REPOTS PORTAL/          # Central Sync Hub & Cross-Portal Audit Analytics
├── BALSONS SAFETY MANAGER/         # HSE Permits-to-Work (7 PTW Forms), JSA & Safety Compliance
├── BALSONS STORE MANAGER/          # Rigging Tool Master, Form 11 Lifting Tackles, Issue & Loans
├── assets/                         # Shared Logos, Favicons, Brand Typography & BEDS UI Assets
├── docs/                           # Master Specifications, Architecture Baselines & Audits
│   ├── specifications/             # BEDS V1.0, SAM-2026, Access Governance & Credentials
│   └── audits/                     # Governing V5.3 Master Baseline & Verification Registers
├── tests/                          # Test Fixtures & Quality Inspection Resources
├── beds.css                        # Master BEDS Design System Stylesheet
├── index.html                      # Root Central Enterprise Launcher Entry Point
└── README.md                       # Master Workspace Directory Catalog (This File)
```

---

## 2. Live Operational Portal Directory

| Portal Module | Live Link (GitHub Pages) | Local Path | Dedicated Google Sheet Database |
| :--- | :--- | :--- | :--- |
| 🚀 **Central Launcher** | [Launcher Portal](https://balsonsportals.github.io/index.html) | `BALSONS ENTERPRISE LAUNCHER/index.html` | Cross-Portal Coordination Hub |
| 🚧 **Gate Entry Manager** | [Gate Entry Portal](https://balsonsportals.github.io/BALSONS_GATE_ENTRY_PORTAL/frontend/index.html) | `BALSONS GATE ENTRY MANAGER/frontend/index.html` | [`1v_0Xo44...`](https://docs.google.com/spreadsheets/d/1v_0Xo44U_zU_7B8uU_mX2xV8Xo44U_zU/edit) |
| 📦 **Store Manager** | [Store Portal](https://balsonsportals.github.io/BALSONS_STORE_MANAGER/frontend/index.html) | `BALSONS STORE MANAGER/frontend/index.html` | [`1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ`](https://docs.google.com/spreadsheets/d/1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ/edit) |
| 🦺 **Safety Manager** | [Safety Portal](https://balsonsportals.github.io/BALSONS_SAFETY_PORTAL/frontend/index.html) | `BALSONS SAFETY MANAGER/frontend/index.html` | [`1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0`](https://docs.google.com/spreadsheets/d/1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0/edit) |
| 👥 **HR & Payroll** | [HR Portal](https://balsonsportals.github.io/BALSONS_HR_PORTAL/frontend/index.html) | `BALSONS HR MANAGER/frontend/index.html` | [`1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw`](https://docs.google.com/spreadsheets/d/1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw/edit) |
| 📝 **Employee Self-Reg** | [Self-Registration](https://balsonsportals.github.io/BALSONS_HR_PORTAL/frontend/register.html) | `BALSONS HR MANAGER/frontend/register.html` | Integrated HR Pipeline |
| 🏗️ **Operations Manager** | [Operations Portal](https://balsonsportals.github.io/BALSONS%20OPERATIONS%20MANAGER/index.html) ([Repo](https://github.com/balsonsportals/BALSONS_OPERATIONS_PORTAL)) | `BALSONS OPERATIONS MANAGER/index.html` | [`1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E`](https://docs.google.com/spreadsheets/d/1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E/edit) |
| 🛒 **Purchase Manager** | Internal Deployment / Local | `BALSONS PURCHASE MANAGER/index.html` | Commercial Procurement Master |
| 📊 **Sync & Reports Hub** | Internal Deployment / Local | `BALSONS REPOTS PORTAL/index.html` | Executive Reporting Master |

---

## 3. Personnel Matrix Governance (1 Admin · 1 Area Mgr · Max 3 Supervisors)

Every operational domain enforces a strict supervisory hierarchy:

| Domain | 👑 Admin | 🏛️ Area Manager | 👷 Shift Supervisors (Max 3) |
| :--- | :--- | :--- | :--- |
| **Gate Entry & Security** | Bikash Mohapatra *(Gate In-Charge)* | Satish Chandra *(Directorate)* | 1. Pradeep Nayak<br>2. Manoj Das<br>3. Subhashree Jena |
| **Store & Rigging Tools** | Gagan Bihari Das *(Store In-Charge)* | Satish Chandra *(Directorate)* | 1. Ashok Mohanty<br>2. Kailash Sahu<br>3. Bijay Barik |
| **Safety & HSE Compliance** | Gajendra Rao *(HSE Lead)* | Satish Chandra *(Directorate)* | 1. Dilip Rout<br>2. Niranjan Sahu<br>3. Rakesh Panda |
| **HR & Payroll** | Priyanka Senapati *(HR Manager)* | Satish Chandra *(Directorate)* | 1. Rashmi Ranjan<br>2. Alok Patra<br>3. Snehalata Mishra |
| **Heavy Operations** | Satish Chandra *(Management Director)* | Ashok Mohanty *(HOD Rigging)* | 1. Dilip Rout<br>2. Suresh Behera<br>3. Kartik Nayak |
| **Procurement & Commercial** | Gagan Bihari Das *(Commercial Lead)* | Satish Chandra *(Directorate)* | 1. Sanjay Verma<br>2. Amit Pradhan<br>3. Pravat Rout |
| **Central Sync Hub** | Prashant Mohanty *(Super Admin)* | Satish Chandra *(Directorate)* | 1. Gajendra Rao<br>2. Priyanka Senapati<br>3. Gagan Bihari Das |
| **Site Accounts & Imprest** | Bikash Mohapatra *(Accounts)* | Satish Chandra *(Directorate)* | 1. Dilip Rout<br>2. Kailash Sahu<br>3. Rashmi Ranjan |

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
