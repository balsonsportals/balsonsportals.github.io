# BALSONS JTRWF GATE ENTRY & SITE ACCESS PORTAL
## Detailed 8-Phase Engineering Roadmap & Acceptance Matrix

**Project:** Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha  
**Platform:** `BALSONS-SAM-2026` (GitHub Pages + Apps Script + Google Sheets)  
**Document Reference:** `BALSONS_JTRWF_GATE_ENTRY_PORTAL_REQUIREMENTS_V1_1_GITHUB_GAS.docx`  
**Baseline Version:** 1.1  

---

### Phase Summary & Milestones

1. **Phase 0 — Architecture & Transport Proof (Immediate Exit Gate):**
   * *Deliverables:* `apps-script/Code.gs`, `frontend/phase0-probe.html`, `api-client.js`.
   * *Acceptance Tests:* `JGE-002`, `JGE-003`, `JGE-004`.
   * *Exit Criteria:* Browser makes authenticated POST simple-request, follows 302 redirect, parses JSON response without CORS preflight failure.

2. **Phase 1 — Foundation, CI/CD & Database Auto-Init:**
   * *Deliverables:* Git branches, `.github/workflows/deploy-frontend.yml`, `DbInit.gs` (auto-builds all 22 sheets).
   * *Acceptance Tests:* `JGE-001`, `JGE-006`.
   * *Exit Criteria:* Database provisioned; frontend builds over HTTPS.

3. **Phase 2 — Authentication & Server-Side RBAC:**
   * *Deliverables:* `AuthService.gs`, salted hash login, session token validation, 3 roles (`Owner`, `Safety Manager`, `Safety Team`), `AUDIT_LOG`.
   * *Acceptance Tests:* `JGE-004`, `JGE-005`, `JGE-022`.
   * *Exit Criteria:* Unauthorized calls blocked; role permissions strictly enforced on server.

4. **Phase 3 — Master Data Engines & Concurrency Control:**
   * *Deliverables:* `MasterDataService.gs` for Contractors, Personnel, Equipment, Vehicles, Drivers with `LockService` sequential IDs.
   * *Acceptance Tests:* `JGE-007`, `JGE-027`.
   * *Exit Criteria:* Concurrent registrations produce zero duplicate IDs.

5. **Phase 4 — 9-Discipline Compliance & Decision Engine:**
   * *Deliverables:* `ClearanceEngine.gs` covering Police, Medical (Height Vertigo check), Insurance, Competency, PPE, RA/JSA/Lifting Plan, Form-11/TPI, Tools & Tackles, Vehicles.
   * *Decision Logic:* Deterministic `CLEARED`, `CONDITIONAL`, or `BLOCKED` with reason codes.
   * *Acceptance Tests:* `JGE-008` through `JGE-019` (12 tests).
   * *Exit Criteria:* All 12 test scenarios output exact reason codes and corrective actions.

6. **Phase 5 — Physical Gate Transactions & Material Passes:**
   * *Deliverables:* Physical entry/exit logging, IGE delivery receipt, serialized RGP & NRGP passes, overdue alert engine.
   * *Acceptance Tests:* `JGE-020`, `JGE-021`.
   * *Exit Criteria:* Physical entry separated from pre-clearance; RGP overdue tracking operational.

7. **Phase 6 — Live Command Radar & Emergency Muster:**
   * *Deliverables:* Live headcount counter, 1-click Emergency Evacuation Roll Call, daily registers.
   * *Acceptance Tests:* `JGE-023`.
   * *Exit Criteria:* Live muster count balances with physical entry/exit delta.

8. **Phase 7 — Acceptance Testing, HSE Sign-Off & Go-Live:**
   * *Deliverables:* Complete test run of all 27 Acceptance Tests, rollback drills, JTRWF HSE approval, tagged `v1.0.0` release.
   * *Acceptance Tests:* `JGE-024`, `JGE-025`, `JGE-026`.
   * *Exit Criteria:* 27/27 tests pass; formal sign-off recorded.
