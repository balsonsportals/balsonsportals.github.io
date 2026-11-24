# ARCHITECTURE DECISION PAPER: OFFLINE / ONLINE / HYBRID
**Decision Reference:** `ADR-OPS-001`  
**Classification:** Owner Decision Pending (OD-03)  

### 1. Evaluation of Architecture Options

#### Option A: Local-Only Offline Application
- **Mechanism:** Standalone HTML/JS running entirely in browser using localStorage / IndexedDB.
- **Pros:** Zero server infrastructure; works in completely disconnected bay locations.
- **Cons:** No multi-user concurrency control; client-side authentication can be bypassed; high risk of data divergence across multiple supervisor laptops/tablets; no centralized backup.
- **Assessment:** **NOT RECOMMENDED** for enterprise project execution governance.

#### Option B: Connected Cloud / Server Application
- **Mechanism:** Standard client-server architecture with trusted backend and database.
- **Pros:** True server-side authentication; ACID transactional integrity; real-time dashboard sync.
- **Cons:** Fails completely when mobile network drops in deep plant bay areas.
- **Assessment:** Partially viable, but creates site usability friction.

#### Option C: Hybrid Offline-First Application (RECOMMENDED)
- **Mechanism:** Trusted cloud/backend is the authoritative transaction master. Frontend uses Service Worker and IndexedDB for local draft caching and offline shift logging.
- **Offline Behavior:** Supervisors can record shift progress and photos offline; records enter a local `OFFLINE_OUTBOX` clearly tagged `OFFLINE_DRAFT`.
- **Sync Behavior:** When connectivity returns, outbox records are transmitted with idempotency keys; server verifies user credentials, permissions, and record versions, reconciling conflicts through controlled review.
- **Recommendation:** **PROPOSED TARGET ARCHITECTURE** pending formal owner sign-off.
