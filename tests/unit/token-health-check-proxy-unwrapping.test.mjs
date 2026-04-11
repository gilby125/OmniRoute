import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function makeTempDir(prefix) {
  return fs.mkdtempSync(path.join(process.cwd(), prefix));
}

async function importFresh(modulePath) {
  const url = new URL(modulePath, import.meta.url);
  return import(`${url.href}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

async function waitFor(fn, { timeoutMs = 2000, intervalMs = 25 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const value = await fn();
    if (value) return value;

    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return null;
}

test("token healthcheck passes resolved proxy value (not wrapper) to token refresh", async () => {
  const originalEnv = {
    DATA_DIR: process.env.DATA_DIR,
    NODE_ENV: process.env.NODE_ENV,
    OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: process.env.OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK,
    OMNIROUTE_HIDE_HEALTHCHECK_LOGS: process.env.OMNIROUTE_HIDE_HEALTHCHECK_LOGS,
  };

  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const hadCaches = Object.prototype.hasOwnProperty.call(globalThis, "caches");
  const originalCaches = globalThis.caches;

  const tempDir = makeTempDir("omniroute-tokenhc-proxy-");

  try {
    process.env.DATA_DIR = tempDir;
    process.env.NODE_ENV = "development";
    delete process.env.OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK;
    process.env.OMNIROUTE_HIDE_HEALTHCHECK_LOGS = "1";

    // Reset global singletons that survive module reloads.
    delete globalThis.__omnirouteTokenHC;

    const core = await import("../../src/lib/db/core.ts");
    core.resetDbInstance();

    const providersDb = await import("../../src/lib/db/providers.ts");

    const refreshToken = `refresh-token-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const created = await providersDb.createProviderConnection({
      provider: "gemini-cli",
      authType: "oauth",
      email: "test@example.com",
      isActive: true,
      refreshToken,
      accessToken: "old-access-token",
    });

    // Prevent open-sse proxyFetch from patching global fetch during this test.
    // It treats presence of `caches` as a cloud runtime signal.
    // Important: do this only AFTER DB modules are imported (db/core.ts uses the same signal).
    globalThis.caches = {};

    const fetchCalls = [];
    globalThis.fetch = async (...args) => {
      fetchCalls.push(args);
      return new Response(JSON.stringify({ access_token: "new-access-token", expires_in: 3600 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    // Speed up initTokenHealthCheck() — it waits 10 seconds before the first sweep.
    globalThis.setTimeout = (callback, delay, ...args) => {
      const actualDelay = delay === 10_000 ? 0 : delay;
      return originalSetTimeout(callback, actualDelay, ...args);
    };

    const tokenHealthCheck = await importFresh("../../src/lib/tokenHealthCheck.ts");

    const updated = await waitFor(
      async () => {
        const conn = await providersDb.getProviderConnectionById(created.id);
        if (!conn?.lastHealthCheckAt) return null;
        return conn;
      },
      { timeoutMs: 2000 }
    );

    tokenHealthCheck.stopTokenHealthCheck();

    assert.ok(updated, "expected health check sweep to update lastHealthCheckAt");
    assert.ok(fetchCalls.length > 0, "expected token refresh to call fetch() at least once");
    assert.match(
      String(fetchCalls[0]?.[0] || ""),
      /oauth2\.googleapis\.com\/token/,
      "expected token refresh to call Google's OAuth token endpoint"
    );
    assert.equal(updated.lastError ?? null, null);
    assert.equal(updated.accessToken, "new-access-token");
    assert.equal(updated.testStatus, "active");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;

    if (!hadCaches) {
      delete globalThis.caches;
    } else {
      globalThis.caches = originalCaches;
    }

    // Best-effort cleanup
    try {
      const core = await import("../../src/lib/db/core.ts");
      core.resetDbInstance();
    } catch {}

    fs.rmSync(tempDir, { recursive: true, force: true });

    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
});
