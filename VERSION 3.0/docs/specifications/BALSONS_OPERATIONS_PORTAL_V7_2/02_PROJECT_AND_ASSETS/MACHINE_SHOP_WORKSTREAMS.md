# MACHINE SHOP WORKSTREAM TAXONOMY
**Parent Workspace:** `AREA-MACHINE-SHOP-AXLE`  
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§03)  

### 1. Workstream Classification Rule
Workstream classification and OEM/manufacturer attribution are separate attributes. An asset may belong to a confirmed operational workstream while its OEM/sub-OEM remains pending. Uncertain equipment is quarantined in `MS-OEM-PENDING` and must never be forced into FFG, MAG, or other buckets.

### 2. Seven Controlled Workstreams

| Workstream ID | Workstream Name | Scope & Covered Assets | OEM Baseline & Rules |
| :--- | :--- | :--- | :--- |
| **`MS-FFG`** | FFG Machines Workstream | OP20.1–OP20.4, OP30.1–OP30.4 (Rough & Finish Turning Lathes) | VDF Boehringer / FFG association. Verify 450T vs 450 4T suffix from nameplates. |
| **`MS-MAG`** | MAG Associated Assets | OP40.1 / OP40.2 (UT), OP80.1 / OP80.2 (MPI) | Operational association confirmed; actual sub-OEM/model unconfirmed. |
| **`MS-GER`** | GER Grinding Machines | OP50.1 / OP50.2 (CPT-3000 CNC Grinding Machines) | GER Grinding. Serial numbers 25/2050 and 25/2051; track both assets separately. |
| **`MS-PARI-GANTRY`** | PARI Gantry Systems | Exactly 5 Physical Gantry Heads (`GH01` through `GH05`) | PARI Robotics. Exactly 5 physical heads. Gantry cell sum is 221. IT Point is not a gantry head. |
| **`MS-AUTO-TRANSFER`** | Automation & Handling | OP05, OP75 (SPC Shuttle), OP105 (NOK Shuttle), Conveyors | Transfer shuttles and conveyors; do not count as gantry heads. |
| **`MS-AUX`** | Auxiliary Utilities | Coolant systems, mist collection, filtration, dryers, tanks | Supplementary utilities; verify package associations. |
| **`MS-OEM-PENDING`** | Controlled Pending Queue | OP10.1, OP10.2, OP60 CSM-H19 | Controlled queue for unconfirmed OEM attribution. Do not assume FFG or MAG. |
