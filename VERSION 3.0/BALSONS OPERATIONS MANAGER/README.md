# BALSONS Operations Manager • Heavy Erection & Lift Execution Portal
## Enterprise Operations Execution Governance System (Document ID: BAL-OPS-E2E-007 V7.2)

**Anchor Project:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  
**Architecture Standard:** `SAM-2026` / `BEDS V1.0 Locked Baseline`  
**Governance Policy:** `Global Super Administrator Policy (Version 1.0)`  
**Dedicated Google Sheet Database ID:** [`1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E`](https://docs.google.com/spreadsheets/d/1GeqDDmBgdVm3ZUp4c9iB36__iLJ9wADQQRhEIwVxa-E/edit)  
**Dedicated Google Apps Script Project ID:** [`1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny`](https://script.google.com/d/1an3LeD6Ich14qtWZ5GFgJMaa3dYQSboZRwFy9g_gf9zWicPDB9KpFNny/edit)  
**Clasp Management:** Configured with `.clasp.json` (rootDir: `apps-script`, push verified via `clasp push --force`)  
**Live Portal Deployment:** [BALSONS Operations Manager](https://balsonsportals.github.io/BALSONS%20OPERATIONS%20MANAGER/index.html)  

---

### Core Execution Scope & Workspaces:
1. **`LINE-AXLE`:** Schuler Axle Forging Press cell mechanical installation, hydraulic pullers, trailer haulage, 717 MD baseline.
2. **`LINE-WHEEL`:** Schuler Wheel Forging Press cell mechanical assembly, furnace shell rigging, rotary manipulator, 1,075 MD baseline.
3. **`AREA-MACHINE-SHOP-AXLE`:** Complete Axle Machining Bay with 7 controlled child workstreams:
   - `MS-FFG`: VDF Boehringer / FFG lathes (`OP20.1`–`4`, `OP30.1`–`4`).
   - `MS-MAG`: Associated UT (`OP40.1`/`2`) and MPI (`OP80.1`/`2`).
   - `MS-GER`: GER CPT-3000 CNC grinding machines (Serials `25/2050` and `25/2051`).
   - `MS-PARI-GANTRY`: Exactly 5 physical gantry heads (`GH01` through `GH05`).
   - `MS-AUTO-TRANSFER`: `OP05`, `OP75` (SPC Shuttle), `OP105` (NOK Shuttle), conveyors.
   - `MS-AUX`: Coolant filtration, mist collection, dryers, tanks.
   - `MS-OEM-PENDING`: Controlled temporary queue for unconfirmed OEM attribution.

### Operational Features:
- **Executive Super View:** Real-time milestone-weighted erection progress, active work packages, crew counts, crane configurations.
- **8-State Work Package Lifecycle:** Full CRUD management (`Identified` ➔ `Scope verified` ➔ `Ready for planning` ➔ `Planned` ➔ `Mobilized` ➔ `In progress` ➔ `Hold / blocked` ➔ `Mechanical completion` ➔ `Closed`).
- **8-Stage Manpower Model:** Assignment-specific roster tracking (`REQUIRED` to `RELEASED`) with Schuler historical comparison.
- **Daily Shift Logbook:** Shift A / Shift B logging, tandem crane lift coordination (Demag 250T + Sany 150T), Store Form 11 tackle checks, and Safety PTW checks.
- **Reconciliation Dashboard:** Segregated metrics for 30 RFQ stations, 31 SOW units, 334 Qty-sum cells, 1,927.314 MT indicative weight, and 5 physical gantries.
- **Local-First Persistence:** Transactional IndexedDB engine (`balsons_ops_db_v7_2`) with JSON backup export.
