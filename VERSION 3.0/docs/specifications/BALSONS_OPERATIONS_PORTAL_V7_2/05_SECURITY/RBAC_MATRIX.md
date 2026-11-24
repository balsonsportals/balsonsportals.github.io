# ROLE-BASED ACCESS CONTROL (RBAC) MATRIX
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§17)  
**Security Policy:** Default Deny • Least Privilege • Scoped Authorization  

### Permission Matrix (8 Roles across 12 Permission Dimensions)

| Role Code | Role Title | View | Create | Edit | Submit | Review | Approve | Reject | Reopen | Close | Export | Admin |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`MGMT`** | Owner / Management Director | ✔ | ❌ | ❌ | ❌ | ✔ | ✔ | ✔ | ❌ | ✔ | ✔ | ❌ |
| **`OPS_MGR`** | Operations Manager | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |
| **`PLANNER`** | Workspace Planner | ✔ | ✔ | ✔ | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ✔ | ❌ |
| **`SUPV`** | Area / Line Supervisor | ✔ | ✔ | ✔ | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **`PM`** | Project Manager | ✔ | ❌ | ❌ | ❌ | ✔ | ✔ | ✔ | ❌ | ✔ | ✔ | ❌ |
| **`ENG_APP`** | Engineering Approver | ✔ | ❌ | ❌ | ❌ | ✔ | ✔ | ✔ | ❌ | ❌ | ✔ | ❌ |
| **`VIEWER`** | Functional Viewer (HR/Safety/Store) | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **`SUPER_ADMIN`**| Global Super Administrator | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✔ | ✔ |

*Note: Global Super Administrator possesses user management and portal access governance only; cannot approve operational work packages, bypass safety permits, or mutate project baseline.*
