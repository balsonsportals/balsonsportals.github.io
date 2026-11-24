# BALSONS JTRWF GATE ENTRY & SITE ACCESS PORTAL
## Master Blueprint & Phased Execution Roadmap

**Project:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  
**Architecture Standard:** `BALSONS-SAM-2026` (Locked)  
**Version:** 1.1 Baseline  

---

### 1. Locked 4-Tier Cloud Architecture
* **Frontend:** GitHub Pages (`https://<user>.github.io/...`) — Zero-secret, responsive HTML5/CSS/Vanilla JS.
* **Backend:** Google Apps Script Web App — V8 engine, session authentication, clearance logic, audit ledger.
* **Database:** Google Sheets — 22-tab live relational operational store.
* **Document Store:** Restricted Google Drive — Inspection evidence, Form-11/TPI certificates, PDF exports.

---

### 2. Phase 0 Integration Transport Specification
* **Constraint:** Apps Script Web Apps do not handle browser CORS `OPTIONS` preflight requests.
* **Solution:** Browser communicates via `POST` with `Content-Type: text/plain;charset=utf-8` simple-request payload.
* **Envelope Format:**
  * Request: `{ action, requestId, authToken, environment, timestamp, payload }`
  * Response: `{ success, status, requestId, action, serverTimestamp, data, error }`
* **Forbidden Practices:** No `mode: no-cors`, no tokens in URL query strings, no direct frontend Sheets access.

---

### 3. Phased Roadmap Milestones
1. **Phase 0:** Architecture & Transport Proof (Exit: Successful cross-origin handshake).
2. **Phase 1:** Foundation & Google Sheets Database Init (Exit: 22 tabs auto-generated via `DbInit.gs`).
3. **Phase 2:** Authentication & RBAC (Exit: Owner, Safety Manager, Safety Team logins passing tests).
4. **Phase 3:** Master Data Engines (Exit: Personnel, Contractor, Equipment, Vehicle CRUD validated).
5. **Phase 4:** Compliance & Tri-State Clearance Engine (Exit: `CLEARED`, `CONDITIONAL`, `BLOCKED` with reason codes).
6. **Phase 5:** Physical Gate Transactions & Pass Center (Exit: IGE, RGP, NRGP logging & overdue tracking).
7. **Phase 6:** Command Dashboard & Emergency Radar (Exit: Live muster headcount & daily registers).
8. **Phase 7:** Acceptance Testing & Go-Live (Exit: Pass all 27 Acceptance Tests `JGE-001` to `JGE-027`).
