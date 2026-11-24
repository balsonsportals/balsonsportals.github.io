# OWNER DECISION REGISTER (OD-01 TO OD-20)
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§25)  
**Governance Policy:** No Guessing • Safe Interim Positions Enforced  

| Decision ID | Required Owner Decision | Safe Interim Baseline (Locked) | Status |
| :--- | :--- | :--- | :---: |
| **`OD-01`** | Confirm original Excel Master file path, name, revision. | Treat existing file as immutable read-only source. | Open |
| **`OD-02`** | Approve separate Operations transaction-store architecture. | **APPROVED BY OWNER:** Dedicated Sheet `1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E` configured. | **Resolved** |
| **`OD-03`** | Select local-only, connected, or hybrid production mode. | Target Option C (Hybrid Offline-First) for evaluation. | Open |
| **`OD-04`** | Approve Operations database platform and host. | **APPROVED BY OWNER:** Google Sheets ID `1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E`. | **Resolved** |
| **`OD-05`** | Confirm enterprise authentication authority. | Prohibit browser-side identity; require server auth. | Open |
| **`OD-06`** | Confirm if Gate V5.3 9-column schema is enterprise identity authority. | Preserve schema boundary; do not alter. | Open |
| **`OD-07`** | Approve Operations role and user assignment matrix. | Enforce least privilege; 1 Admin, 1 Mgr, 3 Sups. | Open |
| **`OD-08`** | Confirm designated sign-off authorities for completion dossiers. | Require Project Director & Area In-Charge dual sign. | Open |
| **`OD-09`** | Confirm project asset naming conventions and serial sources. | Use `AST-[Bay]-[Code]` naming convention. | Open |
| **`OD-10`** | Reconcile RFQ (30) vs SOW (31) vs Packing Qty sum (334). | Preserve all 3 measures separately; do not merge. | Open |
| **`OD-11`** | Resolve OP10.1/2 and OP60 CSM-H19 OEM attribution. | Quarantine in `MS-OEM-PENDING`. | Open |
| **`OD-12`** | Confirm progress measurement and activity weighting rules. | Use quantity-based milestone weighting only. | Open |
| **`OD-13`** | Confirm shift timings (Shift A, Shift B, General) and calendar. | Shift A (08:00-17:00), Shift B (17:00-02:00). | Open |
| **`OD-14`** | Confirm 9-hour-per-man-day contractual conversion basis. | Do not use for payroll or commercial billing. | Open |
| **`OD-15`** | Approve integration source owners and allow-listed fields. | Read-only status consuming only; zero direct mutation. | Open |
| **`OD-16`** | Approve attachment storage provider and retention policies. | Retain metadata locally; hold uploads pending host approval. | Open |
| **`OD-17`** | Approve offline capture and conflict resolution rules. | Outbox drafts require supervisor review upon sync. | Open |
| **`OD-18`** | Approve backup frequency, retention period, RPO and RTO. | Do not invent numerical values; request sponsor SLA. | Open |
| **`OD-19`** | Confirm expected concurrent users and data transaction volume. | Estimate 15 concurrent supervisors across bay. | Open |
| **`OD-20`** | Approve production deployment location and domain. | Host on approved enterprise intranet/domain. | Open |
