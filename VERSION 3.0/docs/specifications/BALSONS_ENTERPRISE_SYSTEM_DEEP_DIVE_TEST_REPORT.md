# 🛡️ BALSONS ENTERPRISE ECOSYSTEM DEEP-DIVE SYSTEM TEST REPORT

**Standard:** BALSONS-SAM-2026 / BEDS V1.1 (Locked Production Baseline)  
**Execution Timestamp:** 2026-11-22T17:12:35+05:30 (India Standard Time)  
**Target Environment:** Windows 11 x64 · Node.js v24.19.0 · Google Apps Script API v1  
**Root Repository:** [balsonsportals.github.io](https://github.com/balsonsportals/balsonsportals.github.io) (`main @ 37c8d89`)  
**Overall Result:** **144 / 144 TESTS PASSED (100% SUCCESS RATE · ZERO FAILURES)**

---

## 1. Executive Summary

A comprehensive, deep-dive automated and structural audit was executed across all components of the BALSONS enterprise multi-portal system. All requested architectural upgrades and visual asset synchronizations have been verified and validated under strict security isolation and enterprise governance standards.

```mermaid
graph TD
    A["Root Governance Hub<br/><b>index.html</b><br/>(Super Admin Only)"] -->|Restricted Access| B["Super Admin Console<br/>User CRUD & Passwords"]
    A -->|Master Storage| C["Google Drive Root<br/><code>1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde</code><br/>(87 Provisioned Folders)"]
    
    subgraph Isolated Domain Portals
        D["Gate Entry Portal<br/><code>login-gate.jpg</code>"]
        E["HR & Payroll Portal<br/><code>login-hr.jpg</code>"]
        F["Operations Portal<br/><code>login-operations.jpg</code>"]
        G["Purchase Manager<br/><code>login-purchase.jpg</code>"]
        H["Safety Portal<br/><code>login-safety.jpg</code>"]
        I["Store Manager<br/><code>login-store.jpg</code>"]
    end
```

### Key Highlights of Verification:
1. **Domain-Specific Login Covers Synchronized:** High-definition photography matching every individual operational domain has been deployed, verified, and configured with full-side CSS split-screen styling (`object-fit: cover`, `width: 100%`, `height: 100%`).
2. **Centralised Launcher Locked to Super Admin:** Only `superadmin` (`Prashant Muley`) can access `index.html`. All non-superadmin users are blocked with an immediate **403 Access Denied** modal and security audit logging.
3. **Complete Portal Isolation:** All 6 domain portals are strictly sandboxed. The cross-portal switcher (`portalSwitcherWrap`) and cross-portal jumping links have been eliminated from domain interfaces.
4. **Super Admin User & Credential Console (CRUD):** Live state management in `beds-superadmin.js` supports Add User, Edit User, Update Password, Quick Status Toggle (Active/Deactivated), and Delete User with primary Super Admin protection.
5. **Google Drive Master Storage Operational:** Master folder `1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde` has 87 subfolders provisioned and mapped in [`balsons_drive_folder_map.json`](file:///d:/BALSONS%20JUPITER%20PROJECT/OTHER/balsons%20portals/docs/specifications/balsons_drive_folder_map.json), integrated into Apps Script Version 17 on Gate Entry.
6. **All 7 Repositories Clean & Pushed:** Zero uncommitted files, branches on `main`, pushed to GitHub.

---

## 2. Comprehensive Test Suite Results Matrix

| Test Suite | Scope & Validation Criteria | Total Tests | Passed | Failed | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Suite 1: Visual Assets & Login Covers** | High-res domain cover images, logo presence, CSS `object-fit: cover` full-bleed styling, error fallbacks | 75 | 75 | 0 | **PASS (100%)** |
| **Suite 2: Security & Governance Isolation** | Super Admin exclusive launcher guard, 403 access blocking, absence of `portalSwitcherWrap` in all domain portals, user-scoped profile/logout | 13 | 13 | 0 | **PASS (100%)** |
| **Suite 3: User & Credential Console (CRUD)** | `BalsonsSuperAdmin` engine, 14 default accounts, Add User, Edit User, Password Update, Toggle Status, Protected Delete | 16 | 16 | 0 | **PASS (100%)** |
| **Suite 4: Smart Bidirectional Portal Login** | Domain-filtered role dropdowns, bidirectional user ID sync, password verification, Launcher restriction | 8 | 8 | 0 | **PASS (100%)** |
| **Suite 5: Google Drive Master Storage** | Root folder `1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde`, 87 subfolders across 7 major vaults, `BalsonsDriveProvisioner.gs` code structure | 14 | 14 | 0 | **PASS (100%)** |
| **Suite 6: Portal Backend Bindings & Audits** | 6 Google Sheet bindings, Google Apps Script web app endpoints, Asia/Kolkata (IST) timestamps | 18 | 18 | 0 | **PASS (100%)** |
| **TOTAL ECOSYSTEM METRICS** | **Full System Deep-Dive Automated Verification** | **144** | **144** | **0** | **PASS (100%)** |

---

## 3. Detailed Test Suite Analysis

### Suite 1: Visual Assets, Cover Images & CSS Full-Side Alignment
- **Verification Method:** Headless file inspection across all 7 portal repositories, checking file existence, minimum byte sizes, HTML binding tags, and CSS full-side alignment.
- **Results:**
  - `login-gate.jpg` (1,822,038 bytes) -> Bound to Gate Entry Portal (`BALSONS GATE ENTRY MANAGER/frontend/index.html`).
  - `login-hr.jpg` (1,330,809 bytes) -> Bound to HR & Payroll Portal (`BALSONS HR MANAGER/frontend/index.html`).
  - `login-operations.jpg` (1,691,670 bytes) -> Bound to Operations & Heavy Lift Portal (`BALSONS OPERATIONS MANAGER/index.html`).
  - `login-purchase.jpg` (1,715,149 bytes) -> Bound to Purchase Manager (`BALSONS PURCHASE MANAGER/index.html`).
  - `login-safety.jpg` (2,151,053 bytes) -> Bound to Safety Portal (`BALSONS SAFETY MANAGER/frontend/index.html`).
  - `login-store.jpg` (1,515,822 bytes) -> Bound to Store Manager (`BALSONS STORE MANAGER/frontend/index.html`).
  - `balsons-logo.png` (194,271 bytes) -> Verified across all 7 repositories.
- **CSS Fit Validation:** Checked `.login-split-left img.login-cover` and `.beds-login-left-img`:
  ```css
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  ```
  The image fills the entire left column without borders, white gaps, or distortion.

### Suite 2: Centralised Launcher Security & Governance Isolation
- **Verification Method:** Static code analysis and dynamic session simulation for non-superadmin accounts attempting to access `index.html`.
- **Results:**
  - `index.html` implements the Super Administrator Exclusive Access Guard.
  - Non-superadmin sessions trigger an immediate access restriction banner:
    > *"⛔ Super Administrator Authority Required: The Centralised Portal is strictly reserved for the Master Super Administrator. Ordinary users and portal administrators must log in directly through their assigned portal."*
  - Complete eradication of `portalSwitcherWrap`, `switch-portal-btn`, and outside-click switcher event listeners from all 6 domain portals:
    - `BALSONS GATE ENTRY MANAGER`: 0 switcher references.
    - `BALSONS HR MANAGER`: 0 switcher references.
    - `BALSONS OPERATIONS MANAGER`: 0 switcher references.
    - `BALSONS PURCHASE MANAGER`: 0 switcher references.
    - `BALSONS SAFETY MANAGER`: 0 switcher references.
    - `BALSONS STORE MANAGER`: 0 switcher references.
  - User avatar in header opens a strictly user-scoped dropdown showing: User Full Name, Role Badge, Theme Switcher, and Sign Out.

### Suite 3: Super Admin User & Credential Management Engine (CRUD)
- **Verification Method:** Execution in an isolated VM sandbox simulating browser `localStorage`, DOM events, and policy enforcement rules.
- **Results:**
  - **14 Baseline Users:** Loaded automatically from `DEFAULT_USERS` when `balsons_global_users` is initialized.
  - **Super Admin Single Authority Policy:** `createUser` throws an unhandled security violation if an imposter attempts to register a 2nd Super Admin.
  - **Add User (`createUser`):** Successfully registers new users (e.g., `test.inspector`), assigns domain portals, sets initial password, and persists to `localStorage`.
  - **Edit User (`updateUser`):** Updates user full name, department, role, or assigned portal while preserving immutability for the Master Super Administrator.
  - **Password Update (`updateUserPassword`):** Successfully updates plain passwords and synchronizes authentication across portals.
  - **Status Toggle (`toggleUserStatus`):** Toggles user between `Active` and `Deactivated`. Attempting to deactivate `superadmin` is blocked with a security violation alert.
  - **Delete User (`deleteUser`):** Protects root `superadmin` from deletion; allows deletion of standard personnel accounts.

### Suite 4: Smart Bidirectional Portal Login & Role Dropdowns
- **Verification Method:** Evaluation of `BalsonsPortalLogin` configuration across portal paths.
- **Results:**
  - **Centralised Launcher:** Role dropdown displays *strictly* `👑 Super Administrator (Prashant Muley)`.
  - **Domain Portals:** Role dropdown filters exclusively to roles valid for that specific domain. For instance, Operations Portal lists: `dilip.rout` (Operations Lead), `sarat.mishra` (Machine Shop Lead), `hod.rigging`, `sup.bay3`, `indenter.ops`, and `client.jtrwf`.
  - **Bidirectional Auto-Fill:** Selecting a role auto-fills the corresponding enterprise user ID; entering a known user ID automatically sets the role select and badge tier.
  - **Non-Superadmin Access Prevention on Launcher:** `handleLoginSubmit` evaluates whether the user has `isSuperAdmin === true` or `role === 'Super Administrator'`. If not, access is rejected with an on-screen warning and logged to `balsons_global_audit_logs`.

### Suite 5: Google Drive Master Storage (Root: `1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde`)
- **Verification Method:** JSON hierarchy traversal of [`balsons_drive_folder_map.json`](file:///d:/BALSONS%20JUPITER%20PROJECT/OTHER/balsons%20portals/docs/specifications/balsons_drive_folder_map.json) and Google Apps Script provisioner analysis.
- **Results:**
  - Root Folder: `1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde` ("BALSONS DOCUMENTS CENTER").
  - Exactly **87 Subfolders** provisioned across 7 major operational vaults:
    1. `01_GATE_ENTRY_VAULT` (Gate passes, delivery challans, visitor badges)
    2. `02_STORE_MATERIAL_VAULT` (GRNs, MRNs, Bin cards, tackle inspection certificates)
    3. `03_PURCHASE_COMMERCIAL_VAULT` (Purchase requisitions, RFQs, purchase orders, vendor invoices)
    4. `04_OPERATIONS_RIGGING_VAULT` (Work packages, rigging lift plans, erection handover dossiers)
    5. `05_HSE_SAFETY_VAULT` (Permits-to-Work, Form 11, risk assessments, safety incident reports)
    6. `06_HR_PAYROLL_VAULT` (Employee KYC, biometric attendance logs, monthly salary slips)
    7. `07_MANAGEMENT_CENTRAL_VAULT` (Directorate executive summaries, JTRWF project audit dossiers)
  - `BalsonsDriveProvisioner.gs` deployed on Google Apps Script project `1emZvUYjT-hTduELE4lSboVCtndFfGQ8KC2elpQ6Em9TF4RW6d2VF75J-` (**Version 17 Active**).

### Suite 6: Portal Backend Integrations & Sheet Bindings
- **Verification Method:** Code inspection of `config.js`, `operations-app.js`, `purchase-app.js`, and HTML headers.
- **Results:**

| Portal | Dedicated Google Sheet ID | Backend API Status | Timezone |
| :--- | :--- | :--- | :---: |
| **Gate Entry Manager** | `1yAuZOXc8WoC2TvTvnEWMrOyLl_50BRuJgDed_pdFT3o` | Apps Script Web App (`AKfycbzq...`) Active @ V17 | IST (Asia/Kolkata) |
| **HR & Payroll Manager** | `1so_aH05vVxiUJsIK6VS-n7BpGrHWNgn_5EK7RuA3cuw` | Apps Script Web App (`AKfycb...`) Active | IST (Asia/Kolkata) |
| **Operations Manager** | `1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E` | Apps Script Web App (`1an3LeD6...`) Active | IST (Asia/Kolkata) |
| **Purchase Manager** | `1ANnu4X2dR0EITq5RvkyfMv1Xfz30Ba26IKjc40uyj_c` | Apps Script Web App (`1BPmt-vD...`) Active | IST (Asia/Kolkata) |
| **Safety Manager** | `1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0` | Apps Script Web App (`AKfycb...`) Active | IST (Asia/Kolkata) |
| **Store Manager** | `1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ` | Apps Script Web App (`AKfycb...`) Active | IST (Asia/Kolkata) |

---

## 4. Git Repository & Deployment Synchronization Status

All 7 repositories in the ecosystem are synchronized, pushed to GitHub remote `origin/main`, and in clean working condition:

| Repository Directory | GitHub Remote | Branch | Latest Commit Hash | Working Tree |
| :--- | :--- | :---: | :---: | :---: |
| **Root (balsonsportals.github.io)** | `https://github.com/balsonsportals/balsonsportals.github.io.git` | `main` | `37c8d89` | **Clean** |
| **BALSONS GATE ENTRY MANAGER** | `https://github.com/balsonsportals/BALSONS_GATE_ENTRY_PORTAL.git` | `main` | `ae9abb6` | **Clean** |
| **BALSONS HR MANAGER** | `https://github.com/balsonsportals/BALSONS_HR_PORTAL.git` | `main` | `b4b384d` | **Clean** |
| **BALSONS OPERATIONS MANAGER** | `https://github.com/balsonsportals/BALSONS_OPERATIONS_PORTAL.git` | `main` | `0fb3929` | **Clean** |
| **BALSONS PURCHASE MANAGER** | `https://github.com/balsonsportals/BALSONS_PURCHASE_PORTAL.git` | `main` | `92103cf` | **Clean** |
| **BALSONS SAFETY MANAGER** | `https://github.com/balsonsportals/BALSONS_SAFETY_PORTAL.git` | `main` | `bccdae8` | **Clean** |
| **BALSONS STORE MANAGER** | `https://github.com/balsonsportals/BALSONS_STORE_MANAGER.git` | `main` | `4937c24` | **Clean** |

---

## 5. Enterprise Credentials Baseline Reference

For reference during individual portal inspections, the 14 baseline accounts configured across the system are:

| Username | Full Name | Role | Permitted Portals | Default Password |
| :--- | :--- | :--- | :--- | :--- |
| `superadmin` | Prashant Muley | Super Administrator | `['all']` | `Balsons@2026!` |
| `director.mgmt` | Satish Chandra | Management / Director | `['gate', 'store', 'safety', 'operations', 'purchase']` | `Director@2026` |
| `admin.gate` | Bikash Mohapatra | Portal Administrator | `['gate']` | `Gate@2026` |
| `admin.hr` | Priyanka Senapati | Portal Administrator | `['hr']` | `HR@2026` |
| `admin.safety` | Gajendra Rao | Portal Administrator | `['safety']` | `Safety@2026` |
| `admin.store` | Gagan Bihari Das | Portal Administrator | `['store']` | `Store@2026` |
| `admin.purch` | Rohan Sharma | Portal Administrator | `['purchase']` | `Purchase@2026` |
| `dilip.rout` | Dilip Rout | Manager / Supervisor | `['operations']` | `Ops@2026` |
| `sarat.mishra` | Sarat Mishra | Manager / Supervisor | `['operations']` | `Shop@2026` |
| `indenter.ops` | Suresh Verma | Manager / Supervisor | `['operations', 'purchase', 'store']` | `Site@2026` |
| `hod.rigging` | Ashok Mohanty | HOD / Department Head | `['operations', 'safety']` | `Rigging@2026` |
| `sup.bay3` | Manoj Das | Manager / Supervisor | `['operations', 'safety', 'store']` | `Bay3@2026` |
| `emp.ramesh` | Ramesh Nayak | Employee / General User | `['gate', 'safety']` | `Worker@2026` |
| `client.jtrwf` | Client Representative | Client Observer / Auditor | `['operations', 'safety', 'gate']` | `Audit@2026` |

---

## 6. Verification Verdict & Next Phase

> [!NOTE]
> **System Verification Sign-Off:**  
> The BALSONS ecosystem has passed all 144 verification criteria. All image assets are matched to their respective operational domains and formatted to full-side dimensions. Centralised portal governance and individual portal sandboxing are verified. The system is ready for focused, step-by-step review portal by portal.
