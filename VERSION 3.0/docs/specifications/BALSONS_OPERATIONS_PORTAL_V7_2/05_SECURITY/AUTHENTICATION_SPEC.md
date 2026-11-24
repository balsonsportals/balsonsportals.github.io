# ENTERPRISE AUTHENTICATION SPECIFICATION
**Document ID:** `BAL-OPS-SEC-001`  
**Governing Standard:** BAL-OPS-E2E-007 V7.2 (§18)  

### 1. Mandatory Security Principles
1. **No Client-Side Authentication:** Client-side user arrays, localStorage session tokens, and browser-generated identities are strictly prohibited from serving as security boundaries.
2. **Server-Verified Sessions:** Every protected operational action must be verified server-side against an active, authorized user session.
3. **Alignment with Gate V5.3 Architecture:** If Gate's `USER_MASTER` is approved as the enterprise identity source, Operations will integrate with its 9-column schema:
   `['UserID','Username','FullName','Role','PasswordHash','Salt','IsActive','LastLogin','CreatedAt']`
4. **Mandatory First-Login Password Change:** Accounts marked with `LastLogin = '-'` must be forced into the password change workflow prior to receiving normal session credentials.
5. **Session Revocation:** Deactivating an account in the identity master must immediately invalidate all active sessions across all devices.
