# PROPOSED DATA DICTIONARY
**Classification:** Proposed Logical Data Schema (Not yet instantiated in database)  
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§15.5)  

### Core Logical Entities (27 Total):

1. `PROJECT_REFERENCE`: Anchor project identity (`PRJ-JTRWF-SCHULER`), site details, contract terms.
2. `WORKSPACE`: The three approved execution workspaces (`LINE-AXLE`, `LINE-WHEEL`, `AREA-MACHINE-SHOP-AXLE`).
3. `WORKSTREAM`: Seven child workstreams under Machine Shop (`MS-FFG`, `MS-MAG`, etc.).
4. `PROJECT_ASSET_REFERENCE`: Client machinery installed (`Asset_ID`, `Make_Model`, `Serial_No`, `Weight`).
5. `ASSET_ATTRIBUTION_ISSUE`: Open discrepancies on OEM/model mapping (e.g., `OP10.1`, `OP60`).
6. `WORK_PACKAGE`: Primary execution unit (`WP_ID`, `Title`, `Scope_Ref`, `Planned_Dates`, `State`).
7. `WORK_PACKAGE_REVISION`: Immutable history of schedule and scope baseline revisions.
8. `ACTIVITY`: Detailed work breakdown tasks within a work package.
9. `ACTIVITY_DEPENDENCY`: Predecessor-successor relationships (Finish-to-Start, Start-to-Start).
10. `PLAN_BASELINE`: Approved contractual dates and manpower baselines.
11. `MANPOWER_DEMAND`: Skill and headcount requirement per trade, shift, and package.
12. `PERSON_ASSIGNMENT`: Operational employee allocation (`Employee_Ref`, `WP_ID`, `Shift`, `State`).
13. `RESOURCE_DEMAND`: Crane, trailer, and tackle requirements for lifting operations.
14. `RESOURCE_ASSIGNMENT`: Allocation of Store equipment references to lifts (`Crane_ID`, `Tackle_ID`).
15. `EXECUTION_SHIFT`: Calendar shift record (`Date`, `Shift_Code`, `Supervisor_ID`).
16. `DAILY_EXECUTION`: Shift execution logbook entry (`Planned_Vs_Actual`, `Crew_Count`, `Constraints`).
17. `PROGRESS_MEASUREMENT`: Quantity completed, measurement basis, percentage calculation.
18. `HOLD_CONSTRAINT`: Delay and blocker log (`Reason_Code`, `Responsible_Party`, `Impact_Hours`).
19. `READINESS_CHECK`: Prerequisite verification checklist items and sign-offs.
20. `SCOPE_VARIATION`: Formal variation request and approval records.
21. `EVIDENCE_DOCUMENT`: Photographic and inspection document metadata (`File_Hash`, `MIME`, `Path`).
22. `COMPLETION_DOSSIER`: Levelling, alignment, and punch point completion records.
23. `APPROVAL_RECORD`: Attributable operational approvals and sign-offs.
24. `EXTERNAL_STATUS_SNAPSHOT`: Cached read-only status references from HR, Safety, Gate, Store.
25. `INTEGRATION_EVENT`: Inbound/outbound event envelope and transmission logs.
26. `AUDIT_EVENT`: Append-only audit trail capturing user, action, target, timestamp, and changes.
27. `OFFLINE_OUTBOX`: Client-side queue for drafts captured in disconnected mode.
