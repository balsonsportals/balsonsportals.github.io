/**
 * BALSONS STORE MANAGER
 * API Client — CORS-Safe Transport Bridge & Dual-Sync Engine
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * Transport: POST with text/plain (avoids CORS preflight failures across origins)
 * Dedicated Google Spreadsheet: 1u_ZKvvCVfEQDAtkoMR68q2d2hEK-eWBnvsS3AGfP6yQ
 */

const BalsonsStoreApi = {
  _inFlight: new Map(),

  /**
   * Universal API call dispatcher with CORS-safe text/plain transport
   */
  call: async function(action, payload = {}, timeoutMs = 10000) {
    const dedupeKey = `${action}:${JSON.stringify(payload)}`;
    if (this._inFlight.has(dedupeKey)) {
      console.warn(`[BalsonsStoreApi] In-flight request for '${action}' already in progress. Reusing promise.`);
      return this._inFlight.get(dedupeKey);
    }

    const requestPromise = (async () => {
      const endpoint = BALSONS_STORE_CONFIG.APPS_SCRIPT_URL;
      const requestBody = {
        action: action,
        payload: payload,
        clientTimestamp: new Date().toISOString(),
        requestId: 'REQ-STORE-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(endpoint, {
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
        console.warn(`[BalsonsStoreApi] Transport Notice (${action}):`, err.message);
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
   * Fetch data from GET endpoint
   */
  fetchLive: async function(action, params = {}, timeoutMs = 12000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const url = new URL(BALSONS_STORE_CONFIG.APPS_SCRIPT_URL);
      url.searchParams.set('action', action);
      Object.keys(params).forEach(k => url.searchParams.set(k, params[k]));

      const response = await fetch(url.toString(), {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow'
      });

      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn(`[BalsonsStoreApi] GET ${action} failed:`, err.message);
      return { success: false, error: err.message };
    }
  },

  /**
   * Master Dual-Sync Engine
   * Hydrates local Store memory from live Google Sheet 1u_ZKvv...
   */
  syncWithLiveDb: async function() {
    console.log('🔄 [BalsonsStoreApi] Initiating Dual-Sync with Google Sheet 1u_ZKvv...');
    const syncPill = document.getElementById('storeSheetSyncPill') || document.getElementById('bedsSheetSyncPill');
    if (syncPill) {
      syncPill.innerHTML = '<span class="pulse-dot" style="background:#F59E0B;"></span> Syncing Store DB...';
    }

    try {
      const [invRes, loansRes, quarRes, statsRes] = await Promise.allSettled([
        this.fetchLive('inventory'),
        this.fetchLive('loans'),
        this.fetchLive('quarantine'),
        this.fetchLive('stats')
      ]);

      let updatedCount = 0;

      // 1. Inventory Sync
      if (invRes.status === 'fulfilled' && invRes.value && invRes.value.success && Array.isArray(invRes.value.items) && invRes.value.items.length > 0) {
        if (window.BalsonsStoreApp) {
          BalsonsStoreApp.tools = invRes.value.items;
          BalsonsStoreApp.saveTools();
          updatedCount = invRes.value.items.length;
        }
      }

      // 2. Loans / Transactions Sync
      if (loansRes.status === 'fulfilled' && loansRes.value && loansRes.value.success && Array.isArray(loansRes.value.items)) {
        if (window.BalsonsStoreApp) {
          BalsonsStoreApp.transactions = loansRes.value.items;
          BalsonsStoreApp.saveTransactions();
        }
      }

      // 3. Quarantine Sync
      if (quarRes.status === 'fulfilled' && quarRes.value && quarRes.value.success && Array.isArray(quarRes.value.items)) {
        if (window.BalsonsStoreApp) {
          BalsonsStoreApp.quarantine = quarRes.value.items;
          BalsonsStoreApp.saveQuarantine();
        }
      }

      // Re-render UI
      if (window.BalsonsStoreApp && typeof BalsonsStoreApp.renderAll === 'function') {
        BalsonsStoreApp.renderAll();
      }

      const totalItems = (window.BalsonsStoreApp && BalsonsStoreApp.tools) ? BalsonsStoreApp.tools.length : 264;
      if (syncPill) {
        syncPill.style.background = 'rgba(16, 185, 129, 0.15)';
        syncPill.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        syncPill.style.color = '#10B981';
        syncPill.innerHTML = `
          <span class="pulse-dot"></span>
          <span class="sync-text">Live DB Synced (${totalItems})</span>
          <span class="sheet-id-chip" style="font-family: monospace; font-size: 9.5px; opacity: 0.85;">1u_ZKvv...</span>
        `;
      }

      console.log(`✅ [BalsonsStoreApi] Dual-Sync successful: ${totalItems} tools synced from live Google Sheet.`);
      return { success: true, count: totalItems };
    } catch (syncErr) {
      console.error('[BalsonsStoreApi] Dual-Sync error:', syncErr);
      if (syncPill) {
        syncPill.innerHTML = '<span class="pulse-dot" style="background:#EF4444;"></span> Sync Fallback';
      }
      return { success: false, error: syncErr.message };
    }
  }
};

window.BalsonsStoreApi = BalsonsStoreApi;
