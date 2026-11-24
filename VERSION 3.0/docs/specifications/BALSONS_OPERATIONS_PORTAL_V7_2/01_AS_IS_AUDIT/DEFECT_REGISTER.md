# DEFECT AND RISK REGISTER
**Audit Standard:** Strict Technical Audit Classification  
**Total Identified Defects:** 12 Active Findings (OPS-AUD-001 through OPS-AUD-012)  

| Defect ID | Severity | Category | Description | Safe Interim Mitigation |
| :--- | :---: | :--- | :--- | :--- |
| **`OPS-AUD-001`** | **P0** | Authentication | Automatic Super Admin session initialization upon missing/failed session retrieval. | Prohibit browser-side default sessions; enforce server-verified authentication. |
| **`OPS-AUD-002`** | **P0** | Authentication | Password verification bypass (`password.length >= 4` check without credential verification). | Remove length check; require cryptographic hash verification by trusted auth service. |
| **`OPS-AUD-003`** | **P0** | Identity | Conflicting identity models (`BalsonsSAMAuth` vs `BalsonsSuperAdmin` dual stores). | Establish single authoritative enterprise session and identity model. |
| **`OPS-AUD-004`** | **P0** | Authorization | Client-side authorization boundaries enforced only in browser DOM/memory. | Enforce action-level server-side RBAC on all protected endpoints. |
| **`OPS-AUD-005`** | **P0** | Governance | Role simulation and quick-switching controls exposed in runtime JavaScript. | Restrict role simulation to isolated test environments; suppress in production. |
| **`OPS-AUD-006`** | **P0** | Database | Operations database mapped to Store database (`1u_ZKvv...AGfP6yQ`). | **RESOLVED:** Dedicated Google Sheet ID `1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E` assigned and configured. |
| **`OPS-AUD-007`** | **P0** | Synchronization | False-positive synchronization success displayed by `triggerDualSync()`. | Display `SYNC NOT CONFIGURED`; require verified server acknowledgement before success. |
| **`OPS-AUD-008`** | **P1** | Functional | Operations portal is currently a static landing-page shell without transactions. | Retain as reference shell pending functional module build. |
| **`OPS-AUD-009`** | **P1** | Scope | Machine Shop card erroneously claims civil/foundation and precision grouting scope. | Enforce strict mechanical-only scope per V7.0 SOW boundaries. |
| **`OPS-AUD-010`** | **P1** | Status | Misleading "Governed Baseline Active" labels on unconfigured workspaces. | Replace with honest status chips ("Baseline Defined / Implementation Not Verified"). |
| **`OPS-AUD-011`** | **P1** | Offline | External font and image dependencies prevent full offline operation. | Package local font fallbacks and embed local assets. |
| **`OPS-AUD-012`** | **P1** | Governance | Webpage labels V7.0 as "Approved Master Reference" while PDF states "Target Reference for Review". | Update label to "Proposed Master Technical Baseline V7.2 (Pending Owner Approval)". |
