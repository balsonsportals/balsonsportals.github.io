# BALSONS PORTAL STANDARD ARCHITECTURE MODEL (SAM-2026)
## End-to-End Blueprint & Master Roadmap for All 6 Portals

**Company:** BALSONS Heavy Lift & Shift  
**Anchor Project:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  
**Architecture Standard:** `BALSONS-SAM-2026`  
**Status:** **LOCKED BASELINE** across all 6 BALSONS Portals  

---

## 1. The Locked 4-Tier Architecture (SAM-2026)

All 6 BALSONS portals strictly adhere to this standardized, cloud-native, serverless architecture:
1. **Tier 1 (Presentation):** GitHub Pages HTTPS Hosting (Ultra-fast, zero-server, responsive HTML5/CSS/Vanilla JS, zero npm/build breakage, high-contrast industrial UI).
2. **Tier 2 (Logic & Security):** Google Apps Script Web App (V8 runtime, session tokens, RBAC, input validation, LockService concurrency, audit ledger).
3. **Tier 3 (Database):** Google Sheets Relational Engine (Live operational records, multi-tab relational model, formula rollups, auto-initialized by `DbInit.gs`).
4. **Tier 4 (Evidence & Storage):** Google Drive Restricted Storage (Certificates, inspection photos, challan scans, generated PDF reports).

---

## 2. Universal API Transport & Security Protocol (Phase 0 Standard)

To solve the genuine cross-origin constraint between GitHub Pages and Google Apps Script:
* **Transport:** POST with `Content-Type: text/plain;charset=utf-8` simple-request envelope to bypass CORS OPTIONS preflight.
* **Standard JSON Envelopes:** Every request and response contains `requestId`, `authToken`, `action`, `status`, and `serverTimestamp`.
* **Zero Secrets in Frontend:** Zero passwords, API keys, or database IDs committed to GitHub.
* **No `no-cors` Mode:** Opaque responses are strictly forbidden so the frontend can read validated success/error JSON payloads.

---

## 3. The 6 Portals Master Ecosystem

The same locked `SAM-2026` architecture governs all 6 modules:
1. **GATE ENTRY MANAGER:** Site access control, personnel/vehicle pre-clearance, RGP/NRGP gate passes, emergency muster.
2. **STORE MANAGER:** Material custody, 264-item tool master, physical goods inspection, tool issue/return.
3. **SAFETY MANAGER:** HSE compliance, risk assessments, safety inductions, vertigo/height clearance, incident logs.
4. **OPERATIONS MANAGER:** Heavy erection planning, crane/puller mobilization, shift execution, Schuler line assembly.
5. **HR MANAGER:** Manpower deployment, contractor labor quotas, trade skill muster, biometric attendance.
6. **PURCHASE MANAGER:** Material procurement, RFQ floating, vendor commercial comparison, PO generation.

---

## 4. Phased Implementation Roadmap (Phases 0 to 7)

* **Phase 0 — Transport Proof:** Prove GitHub Pages ↔ Apps Script ↔ Google Sheets live communication.
* **Phase 1 — Foundation & DB Init:** Repository, CI workflows, and automatic 22-tab database generation via `DbInit.gs`.
* **Phase 2 — Authentication & RBAC:** Salted hash logins, session tokens, role authorization (Owner, Safety Manager, Safety Team).
* **Phase 3 — Master Data Engines:** CRUD services for Contractors, Personnel, Vehicles, Equipment, and Documents.
* **Phase 4 — Clearance & Compliance Engine:** 9-discipline compliance evaluation and server-side `CLEARED`/`CONDITIONAL`/`BLOCKED` decisions.
* **Phase 5 — Physical Gate Transactions:** Real physical entry/exit logging, serialized RGP/NRGP gate passes, overdue tracking.
* **Phase 6 — Live Dashboard & Radar:** Real-time on-site headcount, emergency evacuation roll-call, and daily registers.
* **Phase 7 — Acceptance Testing & Go-Live:** Verification of all 27 Acceptance Tests (`JGE-001` through `JGE-027`), HSE sign-off, tagged `v1.0.0`.
