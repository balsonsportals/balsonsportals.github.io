# SECURITY THREAT REGISTER & MITIGATION MODEL
**Classification:** Critical Security Governance  

| Threat ID | Threat Category | Risk Description | Severity | Target Mitigation |
| :--- | :--- | :--- | :---: | :--- |
| **`THR-01`** | Privilege Elevation | User tampers with localStorage role label to impersonate Super Admin. | Critical | Server-side session validation; ignore all client-supplied role claims. |
| **`THR-02`** | Credential Tampering | Attacker exploits `password.length >= 4` check to bypass authentication. | Critical | Enforce PBKDF2 / Argon2 cryptographic hash verification in backend service. |
| **`THR-03`** | Cross-Workspace Leak | Supervisor in `LINE-AXLE` mutates work packages in `LINE-WHEEL`. | High | Scoped authorization tokens restricting write access to assigned workspace ID. |
| **`THR-04`** | Source Mutation | Attacker or script writes data back to protected Excel Master. | Critical | Complete isolation: no write-back path, no append macro, read-only permissions. |
| **`THR-05`** | Audit Repudiation | Operational supervisor denies submitting false progress report. | High | Cryptographically signed, append-only server audit log capturing IP, user, timestamp. |
