# BALSONS OPERATIONS PORTAL • MASTER TECHNICAL REFERENCE V7.2
## Consolidated Deep-Dive Master Reference & Technical Baseline Specification

**Document ID:** `BAL-OPS-E2E-007`  
**Proposed Version:** `V7.2 – Consolidated Deep Technical Baseline`  
**Reference Date:** 21 November 2026  
**Project Context:** JUPITER / JTRWF – Schuler Forging & Axle Machining Installation  
**Enterprise Alignment:** SAM-2026 / BALSONS Enterprise Ecosystem  
**Design Foundation:** BALSONS Enterprise Design System (BEDS V1.0 Locked Baseline)  
**Document Status:** Proposed – Owner Review and Approval Required  
**Governing Source Reference:** BALSONS Operations Portal Full End-to-End Master Reference V7.0  
**Current Authorization Status:** STRICT TECHNICAL HOLD — Read-Only Specification Review  

---

### Executive Mandate & Governing Value
The BALSONS Operations Portal controls BALSONS operational execution: manpower planning and deployment, equipment/work-package planning, progress, constraints, evidence, coordination, and mechanical completion status.

### Non-Negotiable Core Principles
1. **Umbrella Hierarchy:** `JUPITER` is the umbrella project context only. It is **NOT** a third Schuler forging line and must not be used as an execution workspace.
2. **Three Locked Execution Workspaces:** Exactly `LINE-AXLE`, `LINE-WHEEL`, and `AREA-MACHINE-SHOP-AXLE`.
3. **Owner Protection Rule:** Preserve the existing portal and protected assets. Read-only inspection first. No database, UI, feature, authentication, workflow or deployment change without specific written authorization.
4. **Source Authority Boundaries:**
   - **HR Portal:** Authoritative master for employee identity, employment, and payroll.
   - **Safety Portal:** Authoritative master for PTW, JSA, LOTO, height clearances.
   - **Store Portal:** Authoritative master for tool/equipment master, QR identity, Form 11 lifting tackle validity, and stock custody.
   - **Gate Entry Portal:** Authoritative master for physical access, entry/exit, and muster roll-call.
   - **Finance / Commercial:** Authoritative master for costing, billing, accounts, and payments.
   - **Project Management / Engineering:** Authoritative master for project WBS, scope baselines, and lift calculations.
5. **Separate Metric Categories:** Physical machine count, gantry count (5 physical heads GH01–GH05), station count (30), commercial units (31), package count, Qty-cell sum (334), and weight (1,796.114 MT main + 131.200 MT supplementary = 1,927.314 MT indicative) must remain distinct measures.
6. **Immutable Protected Excel Master:** The original Excel workbook is read-only. No write-back, append, macro, or replacement.
