# TEST EVIDENCE REGISTER & TRACEABILITY MATRIX
**Governing Standard:** BAL-OPS-E2E-007 V7.2  

| Test ID | Mapped Finding / Requirement | Source File Reference | Expected Test Result | Test Evidence Required |
| :--- | :--- | :--- | :--- | :--- |
| **`OPS-01`** | Source Fingerprint | `BALSONS OPERATIONS MANAGER/` | File sizes, SHA-256 hashes match baseline. | Hash verification log. |
| **`OPS-02`** | Excel Master No-Write | Original Excel Workbook | Zero write-capable paths target file. | Filesystem read-only audit. |
| **`OPS-06`** | Workspace Hierarchy | `index.html`, Solution Arch | Exactly 3 workspaces; JUPITER is context only. | Workspace UI navigation tree. |
| **`OPS-09`** | Gantry Count (5 Heads)| Machine Shop Taxonomy | GH01–GH05 tracked; IT Point excluded. | Asset register database export. |
| **`OPS-10`** | Quantity Separation | Reconciliation Register | 30 RFQ, 31 SOW, 334 Qty sum isolated. | Comparison dashboard screenshot. |
| **`OPS-13`** | Included Mechanical Scope | SOW Boundaries Spec | 7 mechanical tasks permitted. | Work package form validation test. |
| **`OPS-14`** | Excluded Scope Blocking | SOW Boundaries Spec | Electrical/civil tasks blocked from WP. | Negative test rejection log. |
| **`OPS-25`** | 8 Manpower States | Manpower Lifecycle Spec | All 8 states distinct in assignment flow. | State transition event log. |
| **`OPS-34`** | No Default Session | `balsons-sam-auth.js` | Unauthenticated on load; no auto admin. | Session inspection trace. |
| **`OPS-35`** | Password Verification | `beds-portal-login.js` | Server cryptographic check; length bypass blocked. | Auth service mock test report. |
| **`OPS-42`** | Dedicated DB Pointer | `beds-workspace.js` | Operations DB pointer detached from Store DB. | Workspace configuration dump. |
| **`OPS-43`** | Truthful Sync Indicator| `beds-workspace.js` | Displays `NOT CONFIGURED`; no false green LIVE. | Sync UI state screenshot. |
