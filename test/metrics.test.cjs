"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { cacheRate, liveSpeed, sessionMetrics } = require("../src/metrics.cjs");

test("combines completed stream timing, cache metrics, context, and separate tool duration", () => {
  const message = {
    type: "assistant",
    time: { created: 1000, firstToken: 2000, streamed: 5000, completed: 6000 },
    tokens: { input: 150, output: 120, reasoning: 30, cache: { read: 300, write: 50 } },
    content: [{ type: "tool", time: { created: 5000, ran: 5100, completed: 5800 } }],
  };
  const result = sessionMetrics([message], {}, [], { name: "Example", limit: { context: 2000 } });
  assert.equal(result.latest.speed, 50);
  assert.equal(result.latest.ttftMs, 1000);
  assert.equal(result.average, 50);
  assert.equal(result.modelMs, 4000);
  assert.equal(result.toolMs, 700);
  assert.equal(result.context.percent, 25);
  assert.equal(cacheRate(result.direct), 60);
  assert.equal(liveSpeed(message, 7000), null);

  const legacy = { ...message, time: { created: 1000, completed: 6000 } };
  const older = sessionMetrics([legacy], {}, [], {});
  assert.equal(older.latest.speed, null);
  assert.equal(older.latest.elapsedSpeed, 30);
  assert.equal(older.average, null);
});
