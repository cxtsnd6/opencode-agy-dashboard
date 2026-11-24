"use strict";

const { spawn } = require("node:child_process");
const { readFile } = require("node:fs/promises");
const { homedir } = require("node:os");
const { join } = require("node:path");
const { setTimeout: delay } = require("node:timers/promises");

const WINDOWS = { "5h": 5 * 60 * 60 * 1000, weekly: 7 * 24 * 60 * 60 * 1000 };
const PAGE_SIZE = 50;
const MODEL = "gemini-4-hydrogen-xhigh";

function localOrigin(value) {
  const url = new URL(value);
  const hosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
  if (!["http:", "https:"].includes(url.protocol) || !hosts.has(url.hostname)
      || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("proxyURL must be a localhost HTTP origin, such as http://127.0.0.1:7861");
  }
  return url.origin;
}

function filePath(path) {
  return path.startsWith("~/") ? join(homedir(), path.slice(2)) : path;
}

function balance(buckets, family, window) {
  const item = buckets?.[family + "-" + window];
  if (!Number.isFinite(item?.remaining)) return undefined;
  const remaining = Math.max(0, Math.min(1, item.remaining));
  const reset = Date.parse(item.resetTimeRaw);
  return { remaining, reset };
}

function lengthOfWindow(records, count, now) {
  const sum = records.reduce((total, record) => total + record.remaining, 0);
  const resets = records.map(record => record.reset).filter(Number.isFinite).sort((a, b) => a - b);
  const nextReset = resets.find(reset => reset > now) ?? resets[0];
  const round = value => Math.round(value * 1000) / 10;
  return {
    known_accounts: records.length,
    enabled_accounts: count,
    capacity_percent: records.length * 100,
    sum_percent: records.length ? round(sum) : null,
    average_percent: records.length ? round(sum / records.length) : null,
    next_reset_at: nextReset === undefined ? null : new Date(nextReset).toISOString(),
  };
}

async function mapConcurrent(items, parallelism, run) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(parallelism, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await run(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

function createQuotaSource(options = {}, fetcher = fetch) {
  const origin = localOrigin(options.proxyURL ?? "http://127.0.0.1:7861");
  const modelID = options.modelID ?? MODEL;
  const command = options.startCommand;
  if (command !== undefined && (!Array.isArray(command) || !command.length
    || command.some(arg => typeof arg !== "string") || !command[0].trim())) {
    throw new Error("startCommand must be an executable and arguments in an array");
  }
  let startup;
  let pending;
  let cached;

  async function isHealthy() {
    try {
      const response = await fetcher(origin + "/openapi.json", {
        redirect: "error", signal: AbortSignal.timeout(1500),
      });
      await response.body?.cancel();
      return response.ok;
    } catch {
      return false;
    }
  }

  async function start() {
    if (!command) return;
    if (startup) return startup;
    startup = (async () => {
      if (await isHealthy()) return;
      await new Promise((resolve, reject) => {
        const child = spawn(command[0], command.slice(1), {
          stdio: "ignore", windowsHide: true, detached: true,
        });
        child.once("error", reject);
        child.once("spawn", () => {
          child.unref();
          resolve();
        });
      });
      const deadline = Date.now() + 20_000;
      while (Date.now() < deadline) {
        if (await isHealthy()) return;
        await delay(350);
      }
      throw new Error("The configured local proxy did not start");
    })().finally(() => { startup = undefined; });
    return startup;
  }

  async function panelPassword() {
    const file = options.panelPasswordFile;
    const password = file ? (await readFile(filePath(file), "utf8")).trim()
      : process.env.AGY2API_PANEL_PASSWORD?.trim();
    if (!password) throw new Error("Set AGY2API_PANEL_PASSWORD or panelPasswordFile");
    return password;
  }

  async function fetchSummary(signal) {
    const password = await panelPassword();
    const signalForRequest = () => AbortSignal.any([AbortSignal.timeout(35_000), ...(signal ? [signal] : [])]);
    await start();
    async function get(path) {
      const response = await fetcher(origin + path, {
        headers: { Authorization: "Bearer " + password },
        redirect: "error",
        signal: signalForRequest(),
      });
      if (!response.ok) {
        await response.body?.cancel();
        throw new Error("Local quota request failed (HTTP " + response.status + ")");
      }
      return response.json();
    }

    const accounts = new Map();
    for (let offset = 0; ; offset += PAGE_SIZE) {
      const page = await get("/creds/status?limit=" + PAGE_SIZE + "&offset=" + offset);
      if (!Array.isArray(page.items)) throw new Error("Expected a credential summary from the local AGY2API");
      const previousSize = accounts.size;
      for (const item of page.items) {
        if (typeof item?.email === "string" && item.email) accounts.set(item.email, item.disabled === true);
      }
      if (!page.has_more) break;
      if (accounts.size === previousSize) throw new Error("The local credential list could not advance to the next page");
    }
    const pool = [...accounts].filter(([, disabled]) => !disabled).map(([email]) => email);
    const rows = await mapConcurrent(pool, 3, async email => {
      try {
        const result = await get("/creds/quota/" + encodeURIComponent(email));
        return { email, models: result.success ? result.models : undefined };
      } catch {
        return { email };
      }
    });
    signal?.throwIfAborted();
    const now = Date.now();
    function collect(family, window) {
      return rows.flatMap(row => {
        const item = balance(row.models, family, window);
        return item ? [{ ...item, email: row.email }] : [];
      });
    }
    async function cycleUsage(records, duration) {
      const windows = records.filter(record => Number.isFinite(record.reset) && record.reset > now && record.reset - duration <= now);
      const values = await mapConcurrent(windows, 3, async record => {
        const parameters = new URLSearchParams({
          start_timestamp: String((record.reset - duration) / 1000),
          end_timestamp: String(now / 1000),
          credential_email: record.email,
          model_name: modelID,
        });
        try {
          const result = await get("/usage-logs/stats?" + parameters);
          return Number.isFinite(result.total_tokens) ? result.total_tokens : undefined;
        } catch {
          return undefined;
        }
      });
      const valid = values.filter(Number.isFinite);
      return {
        local_cycle_tokens: valid.length ? valid.reduce((sum, value) => sum + value, 0) : null,
        local_cycle_accounts: valid.length,
      };
    }
    const totals = {};
    const thirdParty = {};
    for (const [window, duration] of Object.entries(WINDOWS)) {
      const gemini = collect("gemini", window);
      totals[window] = lengthOfWindow(gemini, pool.length, now);
      thirdParty[window] = lengthOfWindow(collect("3p", window), pool.length, now);
      if (options.includeCycleUsage !== false) Object.assign(totals[window], await cycleUsage(gemini, duration));
    }
    signal?.throwIfAborted();
    return {
      account_count: accounts.size,
      readable_accounts: rows.filter(row => Object.keys(WINDOWS).some(window => balance(row.models, "gemini", window))).length,
      updated_at: new Date(now).toISOString(),
      totals,
      third_party_totals: thirdParty,
    };
  }

  function read(force = false, signal) {
    if (pending) return pending;
    if (cached && Date.now() - Date.parse(cached.updated_at) < (force ? 5000 : 60_000)) return Promise.resolve(cached);
    pending = fetchSummary(signal).then(result => { cached = result; return result; })
      .finally(() => { pending = undefined; });
    return pending;
  }
  return { read, start };
}

module.exports = { createQuotaSource };
