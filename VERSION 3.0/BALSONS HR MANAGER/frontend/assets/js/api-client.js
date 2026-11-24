/**
 * BALSONS HR & PAYROLL MANAGER
 * API Client — CORS-Safe Transport Bridge
 * Transport: POST with text/plain (avoids CORS preflight failures across origins)
 */

const BalsonsHrApi = {
  // In-flight request registry for duplicate protection
  _inFlight: new Map(),

  /**
   * Send an authenticated API request (V5.0 Hardened: AbortController timeout & deduplication)
   */
  call: async function(action, payload = {}, timeoutMs = 10000) {
    const dedupeKey = `${action}:${JSON.stringify(payload)}`;
    if (this._inFlight.has(dedupeKey)) {
      console.warn(`[BalsonsHrApi] In-flight request for '${action}' already in progress. Reusing promise.`);
      return this._inFlight.get(dedupeKey);
    }

    const requestPromise = (async () => {
      const session = (typeof BalsonsHrAuth !== 'undefined' && BalsonsHrAuth.getSession) ? BalsonsHrAuth.getSession() : null;
      const token = session ? session.token : null;

      const requestBody = {
        action: action,
        authToken: token,
        payload: payload,
        clientTimestamp: new Date().toISOString(),
        requestId: 'REQ-HR-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(BALSONS_HR_CONFIG.APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
          redirect: 'follow'
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        let resJson;
        try {
          resJson = await response.json();
        } catch (jsonErr) {
          throw new Error(`Invalid JSON payload from Google Apps Script: ${jsonErr.message}`);
        }
        return resJson;
      } catch (err) {
        clearTimeout(timeoutId);
        const isTimeout = err.name === 'AbortError' || err.message.includes('abort');
        console.warn(`[BalsonsHrApi] Transport Notice (${action}):`, err.message);
        // Fallback response structure
        return {
          success: false,
          error: {
            code: isTimeout ? 'REQUEST_TIMEOUT' : 'NETWORK_OR_OFFLINE',
            message: isTimeout ? `Request timed out after ${timeoutMs}ms` : err.message
          },
          data: null
        };
      } finally {
        this._inFlight.delete(dedupeKey);
      }
    })();

    this._inFlight.set(dedupeKey, requestPromise);
    return requestPromise;
  },

  /**
   * Alias for send() to provide standard SAM-2026 parity
   */
  send: async function(action, payload = {}) {
    return this.call(action, payload);
  }
};
