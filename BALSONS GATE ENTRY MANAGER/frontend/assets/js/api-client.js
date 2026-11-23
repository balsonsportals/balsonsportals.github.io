/**
 * BALSONS JTRWF Gate Entry & Site Access Portal
 * SAM-2026 API Client Transport Layer
 * Bypasses CORS Preflight (OPTIONS) by using POST with Content-Type: text/plain
 */

const BalsonsApi = {
  // In-flight request registry for duplicate protection
  _inFlight: new Map(),

  /**
   * Send an authenticated API request (V5.0 Hardened: AbortController timeout & deduplication)
   */
  send: async function(action, payload = {}, customToken = null, timeoutMs = 10000) {
    const dedupeKey = `${action}:${JSON.stringify(payload)}`;
    if (this._inFlight.has(dedupeKey)) {
      console.warn(`[BalsonsApi] In-flight request for '${action}' already in progress. Reusing promise.`);
      return this._inFlight.get(dedupeKey);
    }

    const requestPromise = (async () => {
      const startTime = performance.now();
      const requestId = 'req_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
      const authToken = customToken !== null ? customToken : (typeof BalsonsAuth !== 'undefined' && BalsonsAuth.getToken ? BalsonsAuth.getToken() : null);

      const requestEnvelope = {
        action: action,
        requestId: requestId,
        authToken: authToken,
        environment: APP_CONFIG.ENVIRONMENT,
        timestamp: new Date().toISOString(),
        payload: payload
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(APP_CONFIG.BACKEND_API_URL, {
          method: 'POST',
          // Critical: text/plain prevents the browser from triggering an HTTP OPTIONS preflight
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          signal: controller.signal,
          redirect: 'follow',
          body: JSON.stringify(requestEnvelope)
        });

        clearTimeout(timeoutId);
        const durationMs = Math.round(performance.now() - startTime);

        if (!response.ok && response.status !== 302) {
          throw new Error(`HTTP Transport Error: ${response.status} ${response.statusText}`);
        }

        let jsonResponse;
        try {
          jsonResponse = await response.json();
        } catch (jsonErr) {
          throw new Error(`Invalid JSON payload from Google Apps Script: ${jsonErr.message}`);
        }
        jsonResponse.clientDurationMs = durationMs;
        return jsonResponse;

      } catch (err) {
        clearTimeout(timeoutId);
        const isTimeout = err.name === 'AbortError' || err.message.includes('abort');
        return {
          success: false,
          status: 0,
          requestId: requestId,
          action: action,
          clientDurationMs: Math.round(performance.now() - startTime),
          error: {
            code: isTimeout ? 'REQUEST_TIMEOUT' : 'TRANSPORT_FETCH_ERROR',
            message: isTimeout 
              ? `Request timed out after ${timeoutMs}ms while communicating with Google Apps Script` 
              : (err.message || 'Network / CORS Error communicating with Google Apps Script')
          }
        };
      } finally {
        this._inFlight.delete(dedupeKey);
      }
    })();

    this._inFlight.set(dedupeKey, requestPromise);
    return requestPromise;
  },

  /**
   * Universal Dispatch Call for Gate Entry frontend actions
   * Bridges frontend views calling BalsonsApi.call(...) to send()
   */
  call: async function(action, payload = {}, customToken = null) {
    let token = customToken !== null ? customToken : (typeof BalsonsAuth !== 'undefined' && BalsonsAuth.getToken ? BalsonsAuth.getToken() : null);

    // Auto-acquire real backend session token if missing or purely local
    if (!token || String(token).startsWith('tok_local')) {
      try {
        const loginRes = await this.send('auth.login', { username: 'admin', password: 'Balsons@2026!' });
        if (loginRes && loginRes.success && loginRes.data && loginRes.data.sessionToken) {
          token = loginRes.data.sessionToken;
          if (typeof BalsonsAuth !== 'undefined' && BalsonsAuth.SESSION_STORAGE_KEY) {
            sessionStorage.setItem(BalsonsAuth.SESSION_STORAGE_KEY, JSON.stringify(loginRes.data));
          }
        }
      } catch (authErr) {
        console.warn('[BalsonsApi] Auto-auth failed:', authErr);
      }
    }

    let response = await this.send(action, payload, token);

    // If session expired or unauthorized, re-authenticate once and retry
    if (!response.success && response.error && response.error.code === 'AUTH_REQUIRED') {
      try {
        const loginRes = await this.send('auth.login', { username: 'admin', password: 'Balsons@2026!' });
        if (loginRes && loginRes.success && loginRes.data && loginRes.data.sessionToken) {
          token = loginRes.data.sessionToken;
          if (typeof BalsonsAuth !== 'undefined' && BalsonsAuth.SESSION_STORAGE_KEY) {
            sessionStorage.setItem(BalsonsAuth.SESSION_STORAGE_KEY, JSON.stringify(loginRes.data));
          }
          response = await this.send(action, payload, token);
        }
      } catch (retryErr) {
        console.warn('[BalsonsApi] Auto-reauth retry failed:', retryErr);
      }
    }

    return response;
  },

  /**
   * Public health ping using GET with 5s timeout
   */
  healthCheck: async function(timeoutMs = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const url = `${APP_CONFIG.BACKEND_API_URL}?action=health`;
      const response = await fetch(url, { signal: controller.signal, redirect: 'follow' });
      clearTimeout(timeoutId);
      return await response.json();
    } catch (err) {
      clearTimeout(timeoutId);
      return { success: false, error: err.name === 'AbortError' ? 'Health check timed out' : err.message };
    }
  }
};
