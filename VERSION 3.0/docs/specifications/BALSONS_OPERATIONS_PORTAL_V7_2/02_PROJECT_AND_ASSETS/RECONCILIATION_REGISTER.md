# QUANTITY & WEIGHT RECONCILIATION REGISTER
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§06)  

### 1. Mandatory Data Governance Rule
Never merge physical machines, station entries, commercial units, packages, Qty-cell sums, and weight measures into a single generic number. Each measure must be tracked separately with its calculation method and verification source.

### 2. Baseline Reconciliation Register

| Measure Category | Baseline Value | Interpretation & Limitation | Data Source & Verification Status |
| :--- | :---: | :--- | :--- |
| **RFQ Station Entries** | **30** | RFQ schedule rows; not physical equipment count. | Stated in reference document; RFQ schedule. |
| **Commercial SOW Units** | **31** | Commercially scheduled equipment billing units. | Stated in reference document; Commercial SOW. |
| **Main Packing List Qty Sum** | **334** | Mathematical sum of Qty cells; **NOT** physical crates. | Stated in reference document; Excel packing list. |
| **Main Packing Gross Weight** | **1,796.114 MT** | Provisional calculated gross weight; not certified billable. | Derived calculation; Main packing list. |
| **Supplementary Equipment Weight** | **~131.200 MT** | OP40, OP50, OP80 approximate supplementary weight. | Derived calculation; Supplementary list. |
| **Combined Indicative Weight** | **1,927.314 MT** | Arithmetic combination only; not certified billable weight. | Derived calculation; Sum of main + supp. |
| **Physical PARI Gantry Heads** | **5** | Exactly 5 physical heads (`GH01` through `GH05`). | Verified in engineering reference. |
| **PARI Packing Qty Cell Sum** | **221** | Arithmetic cell sum; not 221 physical gantries. | Stated in reference document; Gantry packing list. |
