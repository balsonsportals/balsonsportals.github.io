# ASSET REGISTER SPECIFICATION
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§05)  

### 1. Project Asset vs Store Equipment Distinction
- **Project Asset (Operations Scope):** The client/factory machinery being unloaded, shifted, and installed (e.g., Schuler Press Crown, FFG Lathe OP20.1, GER Grinder OP50.1, Gantry Head GH02).
- **Store Equipment (Store Scope):** The tools, cranes, slings, shackles, hydraulic pullers, and jacks used by BALSONS to perform the installation. Store is the authoritative master for tool inventory and Form 11 custody.

### 2. Asset Register Data Schema
Every machine, gantry, and automation asset must maintain the following attributes:
1. `Asset_ID`: Unique project asset reference (e.g., `AST-MS-GER-050.1`).
2. `Original_Station_Ref`: RFQ / Packing reference (e.g., `OP50.1`).
3. `Workspace_ID`: One of the 3 approved workspaces (`LINE-AXLE`, `LINE-WHEEL`, `AREA-MACHINE-SHOP-AXLE`).
4. `Workstream_ID`: Applicable child workstream (e.g., `MS-GER`).
5. `Asset_Description`: Full equipment description.
6. `Make_Model`: Manufacturer and model number (e.g., `GER CPT-3000 CNC`).
7. `Serial_Number`: Verified serial number (e.g., `25/2050`).
8. `Attribution_Status`: `VERIFIED`, `PROVISIONAL`, or `PENDING_CLIENT`.
9. `Nameplate_Evidence_Ref`: Photographic evidence reference of machine nameplate.
10. `Weight_Indicative_MT`: Stated or calculated weight in metric tonnes.
11. `Foundation_Location`: Specific bay coordinates / centerline.
12. `Mechanical_Status`: `UNLOADED`, `UNPACKED`, `SHIFTED`, `MOUNTED`, `ROUGH_LEVELLED`, `XY_ALIGNED`, `COMPLETED`.
