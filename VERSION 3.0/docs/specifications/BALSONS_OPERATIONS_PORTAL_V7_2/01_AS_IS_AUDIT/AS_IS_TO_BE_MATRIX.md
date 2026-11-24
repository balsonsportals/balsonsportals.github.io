# AS-IS VS TO-BE FEATURE MATRIX

| Capability Dimension | As-Is Verified Status | Proposed V7.2 Target Specification | Variance / Action Required |
| :--- | :--- | :--- | :--- |
| **Execution Workspaces** | 3 Static Cards | 3 Interactive Workspaces (`LINE-AXLE`, `LINE-WHEEL`, `AREA-MACHINE-SHOP-AXLE`) | Implement workspace context switching and state management. |
| **Machine Shop Taxonomy** | Single generic paragraph | 7 Distinct Workstreams (`MS-FFG`, `MS-MAG`, `MS-GER`, `MS-PARI-GANTRY`, `MS-AUTO-TRANSFER`, `MS-AUX`, `MS-OEM-PENDING`) | Build hierarchical workstream navigator and asset register. |
| **Work Package Engine** | None | 8-State Lifecycle Tracker (`Identified` to `Closed`) + Hold/Blocked management | Develop Work Package state transition engine with readiness gates. |
| **Manpower Management** | None | 8-State Manpower Lifecycle (`REQUIRED` to `RELEASED`) + Assignment-specific tracking | Implement manpower demand, allocation, and supervisor deployment model. |
| **Historical Baseline** | None | Schuler Forge Baseline (1,792 MD / 16,128 h) + Zero Machine Shop baseline note | Embed read-only baseline comparison dashboard. |
| **Daily Progress Capture** | None | Daily execution shift logbook with measurable progress and supervisor sign-off | Develop structured shift logbook and handover workflow. |
| **Lifting Coordination** | Text mention in README | Store Form 11 tackle status reference and crane demand allocation | Interface with Store tackle register; block lifts with invalid certification. |
| **Safety Integration** | None | Safety PTW status reference linking and clearance verification | Consume Safety PTW status; block execution lacking active permit. |
| **Database Storage** | Reusing Store DB | Dedicated, isolated Operations Transaction Store | Create dedicated Operations database design; approve platform. |
| **Authentication** | Client-side localStorage | Server-verified session and action-level RBAC | Eliminate client user seeding; integrate trusted enterprise auth authority. |
