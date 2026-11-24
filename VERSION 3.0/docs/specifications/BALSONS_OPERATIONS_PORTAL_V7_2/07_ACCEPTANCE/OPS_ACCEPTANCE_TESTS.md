# ACCEPTANCE TEST CATALOGUE (OPS-01 TO OPS-52)
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§24)  
**Total Acceptance Tests:** 52 Rigorous Test Cases across 5 Categories  

### Category A: Source & Data Preservation (OPS-01 to OPS-12)
- `OPS-01`: Source package fingerprint verification (file sizes, SHA-256 hashes, line counts).
- `OPS-02`: No-write assurance targeting original Excel Master (100% read-only).
- `OPS-03`: Read-only workbook import parsing without file alteration.
- `OPS-04`: Historical workbook structure integrity (sheets, formulas, relationships preserved).
- `OPS-05`: Import exception handling for unsupported formats.
- `OPS-06`: Workspace hierarchy enforcement (exactly 3 top-level workspaces; JUPITER umbrella only).
- `OPS-07`: Machine Shop child workstream hierarchy (exactly 7 workstreams).
- `OPS-08`: Machine identity traceability (lathes, grinders, UT/MPI cells).
- `OPS-09`: Gantry identity verification (exactly 5 physical heads GH01–GH05).
- `OPS-10`: Quantity classification isolation (station, unit, machine, gantry, package, Qty sum).
- `OPS-11`: Weight reconciliation preservation (1,796 MT main + 131 MT supp = 1,927.314 MT indicative).
- `OPS-12`: OEM/model uncertainty preservation (quarantined in `MS-OEM-PENDING`).

### Category B: Scope & Work-Package Control (OPS-13 to OPS-24)
- `OPS-13`: Included mechanical scope enforcement (7 mechanical activities).
- `OPS-14`: Excluded scope enforcement (blocking electrical, civil, precision alignment, commissioning).
- `OPS-15`: Scope variation authorization check for new/unlisted scope.
- `OPS-16`: Work-package mandatory field validation upon creation.
- `OPS-17`: Work-package 8-state lifecycle transition enforcement.
- `OPS-18`: Readiness evaluation gate enforcement prior to mobilization.
- `OPS-19`: Hold point recording, root cause tagging, and release evidence check.
- `OPS-20`: Measurable progress basis validation (no arbitrary percentages).
- `OPS-21`: Baseline revision tracking and historical version preservation.
- `OPS-22`: Mechanical completion dossier checklist and sign-off verification.
- `OPS-23`: Closure control blocking when open punch points remain.
- `OPS-24`: Authorized reopening workflow with attributable audit reason.

### Category C: Manpower & Resource Control (OPS-25 to OPS-33)
- `OPS-25`: Distinct tracking of all 8 manpower lifecycle states.
- `OPS-26`: HR source ownership preservation (zero mutation of employee master).
- `OPS-27`: Qualification and competency verification against authoritative records.
- `OPS-28`: Safety induction, height pass, and gate clearance checks.
- `OPS-29`: Overlapping allocation conflict detection for rostered crew.
- `OPS-30`: Personnel transfer control with source release and destination acceptance.
- `OPS-31`: Supervisor physical deployment confirmation.
- `OPS-32`: Store equipment custody reference without inventory duplication.
- `OPS-33`: Engineering lift plan authority boundary preservation.

### Category D: Security & Authorization (OPS-34 to OPS-41)
- `OPS-34`: No default authenticated user or auto-initialized Super Admin.
- `OPS-35`: Server-verified cryptographic credential verification.
- `OPS-36`: Deactivated account blocking on protected endpoints.
- `OPS-37`: Immediate session invalidation upon logout or administrative revocation.
- `OPS-38`: Action-level server-side RBAC enforcement.
- `OPS-39`: Workspace boundary isolation (no cross-workspace editing without grant).
- `OPS-40`: Complete elimination of runtime role simulator and test identities.
- `OPS-41`: Attributable, append-only security audit trail recording.

### Category E: Integration, Offline & Release (OPS-42 to OPS-52)
- `OPS-42`: Dedicated Operations data source (zero Store database pointer reuse).
- `OPS-43`: Synchronization truthfulness (green LIVE only upon verified server response).
- `OPS-44`: Idempotent event processing and retry backoff.
- `OPS-45`: Concurrency version conflict detection and resolution.
- `OPS-46`: Controlled offline draft outbox handling with explicit status tags.
- `OPS-47`: Photographic and inspection evidence integrity hashing.
- `OPS-48`: Permission-checked, auditable data export logging.
- `OPS-49`: Isolated non-production backup restoration verification.
- `OPS-50`: Offline asset packaging (local fonts, local images, zero remote CDN blocks).
- `OPS-51`: Multi-user concurrency testing without silent data overwrite.
- `OPS-52`: Release package verification with rollback readiness.
