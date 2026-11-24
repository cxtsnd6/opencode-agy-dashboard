"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createQuotaSource } = require("../src/quota-source.cjs");

const localURL = "http://127.0.0.1:7861";
const today = new Date(Date.now() + 3600_000).toISOString();
const week = new Date(Date.now() + 86_400_000).toISOString();
const accounts = ["first", "second", "third", "disabled"].map(label => label + "@example.invalid");

test("aggregates across pages using known balances, without exposing account identifiers", async t => {
  const original = process.env.AGY2API_PANEL_PASSWORD;
  process.env.AGY2API_PANEL_PASSWORD = "test-panel-password";
  t.after(() => {
    if (original === undefined) delete process.env.AGY2API_PANEL_PASSWORD;
    else process.env.AGY2API_PANEL_PASSWORD = original;
  });
  const urls = [];
  const quota = remaining => ({
    success: true,
    models: {
      "gemini-5h": { remaining, resetTimeRaw: today },
      "gemini-weekly": { remaining: remaining / 2, resetTimeRaw: week },
      "3p-weekly": { remaining: 0, resetTimeRaw: week },
    },
  });
  const source = createQuotaSource({}, async (raw, options) => {
    const url = new URL(raw);
    assert.equal(url.origin, localURL);
    assert.equal(options.headers.Authorization, "Bearer test-panel-password");
    assert.equal(options.redirect, "error");
    urls.push(url);
    if (url.pathname === "/creds/status") {
      const first = url.searchParams.get("offset") === "0";
      const items = (first ? accounts.slice(0, 2) : accounts.slice(2)).map(email => ({ email, disabled: email === accounts[3] }));
      return Response.json({ items, has_more: first });
    }
    if (url.pathname === "/usage-logs/stats") {
      assert.equal(url.searchParams.get("model_name"), "gemini-4-hydrogen-xhigh");
      const email = url.searchParams.get("credential_email");
      return email === accounts[0] ? Response.json({ total_tokens: 150 }) : new Response(null, { status: 404 });
    }
    const account = decodeURIComponent(url.pathname.split("/").at(-1));
    assert.notEqual(account, accounts[3]);
    if (account === accounts[0]) return Response.json(quota(0.8));
    if (account === accounts[1]) return Response.json(quota(0.4));
    return new Response(null, { status: 400 });
  });

  const [value, concurrentValue] = await Promise.all([source.read(), source.read()]);
  assert.equal(concurrentValue, value);
  assert.equal(await source.read(true), value);
  assert.equal(urls.filter(url => url.pathname === "/creds/status").length, 2);
  assert.equal(value.account_count, 4);
  assert.equal(value.readable_accounts, 2);
  assert.deepEqual(value.totals["5h"], {
    known_accounts: 2, enabled_accounts: 3, capacity_percent: 200, sum_percent: 120,
    average_percent: 60, next_reset_at: today, local_cycle_tokens: 150, local_cycle_accounts: 1,
  });
  assert.equal(value.totals.weekly.sum_percent, 60);
  assert.equal(value.third_party_totals.weekly.average_percent, 0);
  assert.equal(value.third_party_totals["5h"].average_percent, null);
  for (const email of accounts) assert.equal(JSON.stringify(value).includes(email), false);
});

test("rejects nonlocal origins and URLs with embedded credentials", () => {
  for (const proxyURL of ["https://example.invalid", "http://127.0.0.1/panel", "http://user@localhost:7861", "file:///tmp/panel"]) {
    assert.throws(() => createQuotaSource({ proxyURL }), /localhost HTTP origin/);
  }
});
