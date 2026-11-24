# WORK-PACKAGE LIFECYCLE SPECIFICATION
**Primary Operational Control Object:** Work Package (`WP`)  
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§08)  

### 1. The 8-State Governance Lifecycle

```
[1. Identified] ──> [2. Scope Verified] ──> [3. Ready for Planning] ──> [4. Planned]
                                                                            │
[8. Closed] <── [7. Mechanical Completion] <── [6. In Progress] <── [5. Mobilized]
                                                    │     ▲
                                                    ▼     │
                                              [HOLD / BLOCKED]
```

### 2. State Transition Requirements & Exit Evidence

| State | Name | Required Operational Controls | Mandatory Exit Evidence |
| :---: | :--- | :--- | :--- |
| **1** | **Identified** | Workspace, workstream, asset ID, source reference, location, scope description, owner. | Traceable Work Package record created. |
| **2** | **Scope Verified** | Verified against approved SOW clauses; included/excluded boundaries checked. | Scope verification sign-off or recorded variation hold. |
| **3** | **Ready for Planning**| Civil foundation cured, lifting path clear, drawings approved, PTW & Store tackle ready. | Completed readiness checklist with zero blockers. |
| **4** | **Planned** | Activity sequence, predecessors, dates, shift, manpower demand, crane allocation. | Approved schedule baseline revision. |
| **5** | **Mobilized** | Personnel rostered, safety clearance verified, muster confirmed, tools issued. | Mobilization roll-call record & tool issue slip. |
| **6** | **In Progress** | Daily progress recording, actual hours, crane utilization, photo evidence. | Dated daily shift logbook entry signed by Supervisor. |
| **--** | **Hold / Blocked** | Reason code, responsible party, start time, impact assessment, action owner. | Formal hold record with release criteria. |
| **7** | **Mechanical Completion** | Scope completed, rough levelling (< 1.0 mm), X-Y axis positioning verified. | Signed Mechanical Completion Dossier. |
| **8** | **Closed** | Punch points resolved, equipment released, final dossier archived. | Project Director closure sign-off. |
