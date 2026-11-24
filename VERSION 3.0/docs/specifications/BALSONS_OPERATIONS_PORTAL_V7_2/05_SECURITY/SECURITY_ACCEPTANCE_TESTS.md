# SECURITY ACCEPTANCE TEST SPECIFICATION
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§24.D)  

- **`OPS-34` (No Default Privileged Session):** Verify that opening the application without a session token leaves the user unauthenticated; no default admin session is created.
- **`OPS-35` (Cryptographic Credential Verification):** Verify that incorrect passwords return `HTTP 401 Unauthorized` regardless of length.
- **`OPS-36` (Deactivated Account Enforcement):** Verify that an account with `IsActive = False` is immediately blocked from executing protected actions.
- **`OPS-37` (Session Revocation):** Verify that logging out immediately invalidates the server session token.
- **`OPS-38` (Method-Level Authorization):** Verify that submitting a work-package completion without `APPROVE` permission returns `HTTP 403 Forbidden`.
- **`OPS-39` (Workspace Isolation):** Verify that a planner assigned to `LINE-AXLE` cannot create work packages in `LINE-WHEEL`.
- **`OPS-40` (Production Role Simulation Elimination):** Verify that quick-switch buttons and developer simulator bars are completely absent from production builds.
- **`OPS-41` (Immutable Audit Logging):** Verify that every protected operational action writes an attributable audit record to the secure audit log.
