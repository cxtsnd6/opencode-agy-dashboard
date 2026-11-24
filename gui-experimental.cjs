"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/dashboard.css
var require_dashboard = __commonJS({
  "src/dashboard.css"(exports2, module2) {
    module2.exports = '.hq-card, .hq-usage, .hq-hover {\n  --hq-ink: var(--text-base, #25262a);\n  --hq-muted: var(--text-weak, #62656a);\n  --hq-line: var(--border-weak-base, #d8dade);\n  --hq-surface: var(--surface-raised-base, #fdfdfd);\n  --hq-quiet: var(--background-stronger, #ebebed);\n  --hq-accent: #cf7656;\n  --hq-warning: var(--text-warning-base, #92652a);\n  color: var(--hq-ink);\n  box-sizing: border-box;\n  font: inherit;\n  font-size: 12px;\n  line-height: 1.45;\n}\n.hq-card { width: 100%; max-width: 440px; padding: 10px 12px 9px; }\n.hq-card *, .hq-usage * { box-sizing: border-box; }\n.hq-line, .hq-card-head, .hq-card-title, .hq-values, .hq-card-footer, .hq-number-with-unit,\n.hq-usage-top, .hq-period, .hq-actions, .hq-secondary-meter {\n  display: flex; align-items: center; gap: 7px;\n}\n.hq-card-head, .hq-line, .hq-card-footer, .hq-usage-top, .hq-period { justify-content: space-between; }\n.hq-card-head { padding-bottom: 8px; }\n.hq-card-title, .hq-window-title { font-weight: 560; line-height: 1.3; }\n.hq-card-title { min-width: 0; }\n.hq-icon { color: var(--hq-muted); width: 15px; font-size: 15px; flex: 0 0 auto; }\n.hq-muted { color: var(--hq-muted); }\n.hq-accent { color: var(--hq-accent); }\n.hq-warn { color: var(--hq-warning); font-weight: 550; }\n.hq-values, .hq-number-with-unit { white-space: nowrap; }\n.hq-number-with-unit { align-items: baseline; }\n.hq-number, .hq-context-used, .hq-window-number, .hq-stat strong, .hq-model-table {\n  font-variant-numeric: tabular-nums;\n}\n.hq-number { font-size: clamp(20px, 2.5vw, 31px); font-weight: 650; letter-spacing: -.045em; line-height: 1.25; }\n.hq-context-used { font-size: 24px; font-weight: 650; letter-spacing: -.035em; }\n.hq-context-model { max-width: 52%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.hq-context-hero { flex-wrap: wrap; margin: 2px 0 9px; }\n.hq-speed-hero { display: grid; grid-template-columns: minmax(100px, 1fr) minmax(70px, .85fr); align-items: center; gap: 8px; padding: 7px 0 5px; }\n.hq-spark { width: 100%; height: auto; min-height: 22px; }\n.hq-card-footer { margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--hq-line); }\n.hq-cache-card .hq-card-footer { justify-content: flex-end; }\n.hq-cache-hero { margin: 2px 0 8px; }\n.hq-track { height: 5px; position: relative; overflow: hidden; border-radius: 8px; background: var(--hq-quiet); }\n.hq-fill { height: 100%; border-radius: inherit; background: var(--hq-accent); }\n.hq-fill[data-tone="low"] { background: #a87426; }\n.hq-striped { position: absolute; inset-block: 0; background: repeating-linear-gradient(135deg, transparent 0 3px, #fff9 3px 5px); }\n.hq-segments { display: flex; gap: 1px; }\n.hq-segment { background: #6b6f76; }\n.hq-segment[data-kind="read"] { background: var(--hq-accent); }\n.hq-segment[data-kind="input"] { background: #b4a19b; }\n.hq-segment[data-kind="write"] { background: #97806f; }\n.hq-segment[data-kind="thinking"] { background: #9397a7; }\n.hq-divider { border-top: 1px solid var(--hq-line); margin-top: 10px; padding-top: 8px; }\n.hq-three, .hq-two, .hq-counters, .hq-usage-kpis { display: grid; gap: 8px; }\n.hq-three, .hq-counters { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n.hq-two { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n.hq-stat { min-width: 0; overflow-wrap: anywhere; }\n.hq-stat > span { display: block; font-size: 10.5px; }\n.hq-stat strong { display: block; margin-top: 2px; font-size: 13px; font-weight: 640; }\n.hq-chip { border-radius: 5px; padding: 1px 6px; font-size: 10.5px; background: var(--hq-quiet); }\n.hq-accent-chip { color: var(--hq-accent); font-size: 12px; font-weight: 620; background: color-mix(in srgb, var(--hq-accent) 11%, transparent); }\n.hq-warn-chip { color: var(--hq-warning); background: color-mix(in srgb, var(--hq-warning) 12%, transparent); }\n.hq-quota-group { border-top: 1px solid var(--hq-line); margin-top: 12px; padding-top: 9px; }\n.hq-quota-title { margin-bottom: 3px; }\n.hq-quota-title strong { font-size: 14px; font-weight: 650; }\n.hq-dot { box-sizing: content-box; width: 6px; height: 6px; background: var(--hq-accent); border-radius: 50%; }\n.hq-window { border-bottom: 1px solid var(--hq-line); padding: 9px 0 8px; }\n.hq-window > .hq-line:first-child { margin-bottom: 5px; flex-wrap: wrap; }\n.hq-window-number { font-size: 14px; font-weight: 650; }\n.hq-window .hq-accent { font-size: 10.5px; }\n.hq-quota-total, .hq-quota-detail, .hq-speed-note, .hq-compact-note, .hq-cache-note { font-size: 10.5px; }\n.hq-quota-total { padding-top: 4px; flex-wrap: wrap; }\n.hq-quota-detail, .hq-compact-note { margin: 4px 0 0; }\n.hq-speed-note, .hq-cache-note { margin-top: 6px; }\n.hq-secondary { margin-top: 9px; }\n.hq-secondary-toggle {\n  display: flex; width: 100%; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 5px;\n  border: 0; border-radius: 6px; background: var(--hq-quiet); padding: 6px 7px; color: inherit; font: inherit; cursor: pointer;\n}\n.hq-secondary-toggle strong { font-weight: 590; }\n.hq-secondary-meter { gap: 3px; font-size: 10px; }\n.hq-mini-track { width: 18px; height: 3px; background: color-mix(in srgb, var(--hq-muted) 20%, transparent); }\n.hq-mini-track .hq-fill { background: var(--hq-muted); }\n.hq-button, .hq-text-button, .hq-switch-item, .hq-tab, .hq-calendar-cell, .hq-subagent-pill {\n  color: inherit; font: inherit; cursor: pointer;\n}\n.hq-button { background: transparent; border: 1px solid var(--hq-line); border-radius: 6px; padding: 3px 8px; }\n.hq-text-button { background: transparent; border: 0; border-radius: 5px; padding: 3px 5px; color: var(--hq-accent); }\n.hq-text-button[data-failed="true"] { color: var(--hq-warning); }\n.hq-button:hover:enabled, .hq-text-button:hover:enabled, .hq-subagent-pill:hover { background: var(--hq-quiet); }\n.hq-button:disabled, .hq-text-button:disabled { opacity: .55; cursor: default; }\n.hq-switch { display: flex; flex: 0 0 auto; gap: 2px; padding: 2px; border-radius: 6px; background: var(--hq-quiet); }\n.hq-switch-item { border: 0; background: transparent; padding: 2px 5px; font-size: 10px; border-radius: 4px; white-space: nowrap; }\n.hq-switch-item[aria-pressed="true"] { background: var(--hq-surface); box-shadow: 0 1px 3px #0002; font-weight: 620; }\n.hq-card button:focus-visible, .hq-usage button:focus-visible, .hq-subagent-pill:focus-visible {\n  outline: 2px solid var(--hq-accent); outline-offset: 2px;\n}\n.hq-hover {\n  position: fixed; z-index: 3000; width: min(394px, calc(100vw - 16px)); max-height: calc(100vh - 16px);\n  overflow: auto; background: var(--hq-surface); border: 1px solid var(--hq-line);\n  border-radius: 12px; box-shadow: 0 8px 26px #0002;\n}\n.hq-hover .hq-card { padding: 12px 13px 10px; }\n.hq-subagent-strip { display: flex; flex-wrap: wrap; gap: 3px; }\n.hq-subagent-pill { background: transparent; border: 1px solid var(--border-weak-base, #ddd); border-radius: 6px; padding: 2px 5px; font-size: 10px; }\n.hq-usage { padding: 12px 16px 16px; width: 100%; overflow: auto; max-height: 76vh; }\n.hq-usage-narrow { max-height: none; }\n.hq-usage h3 { margin: 0; font-size: 13px; font-weight: 620; }\n.hq-usage-top, .hq-period { flex-wrap: wrap; }\n.hq-actions { flex-wrap: wrap; }\n.hq-usage-nav { display: flex; gap: 15px; border-bottom: 1px solid var(--hq-line); }\n.hq-tab { padding: 10px 0 6px; border: 0; border-bottom: 2px solid transparent; background: transparent; color: var(--hq-muted); }\n.hq-tab[aria-pressed="true"] { border-color: var(--hq-accent); color: var(--hq-ink); font-weight: 650; }\n.hq-usage-kpis { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); border-bottom: 1px solid var(--hq-line); padding: 14px 0; }\n.hq-usage-kpis .hq-stat { padding-inline: 6px; border-inline-start: 1px solid var(--hq-line); }\n.hq-usage-kpis .hq-stat strong { font-size: 17px; }\n.hq-counters { margin: 13px 0; }\n.hq-calendar-section { margin-top: 14px; overflow-x: auto; }\n.hq-calendar {\n  display: grid; grid-auto-flow: column; grid-template-rows: repeat(7, 13px); grid-auto-columns: 13px;\n  align-content: start; gap: 3px; margin-top: 9px; width: max-content;\n}\n.hq-calendar-week { grid-template-rows: 13px; }\n.hq-calendar-cell { width: 13px; height: 13px; border: 0; border-radius: 3px; background: var(--hq-quiet); padding: 0; }\n.hq-calendar-cell[data-level="1"] { background: color-mix(in srgb, var(--hq-accent) 30%, var(--hq-quiet)); }\n.hq-calendar-cell[data-level="2"] { background: color-mix(in srgb, var(--hq-accent) 53%, var(--hq-quiet)); }\n.hq-calendar-cell[data-level="3"] { background: color-mix(in srgb, var(--hq-accent) 76%, var(--hq-quiet)); }\n.hq-calendar-cell[data-level="4"] { background: var(--hq-accent); }\n.hq-calendar-cell:disabled { opacity: .45; cursor: default; }\n.hq-calendar-hint, .hq-notice { margin: 12px 0 0; font-size: 11px; }\n.hq-period { padding-top: 13px; }\n.hq-period-date { font-size: 11px; white-space: nowrap; }\n.hq-model-filters { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 9px; }\n.hq-model-filters [aria-pressed="true"] { border-color: var(--hq-accent); }\n.hq-usage-chart { border-top: 1px solid var(--hq-line); padding: 12px 0; margin-top: 8px; overflow-x: auto; }\n.hq-iceberg-chart { padding: 8px 0 0; display: flex; width: 100%; min-width: 300px; font-variant-numeric: tabular-nums; }\n.hq-iceberg-column { flex: 1 1 0; min-width: 10px; text-align: center; }\n.hq-iceberg-top, .hq-iceberg-bottom { height: 70px; display: flex; justify-content: center; align-items: flex-end; }\n.hq-iceberg-bottom { align-items: flex-start; border-top: 1px solid var(--hq-ink); }\n.hq-iceberg-fresh, .hq-iceberg-cached { display: block; width: min(66%, 17px); background: var(--hq-ink); border-radius: 3px 3px 0 0; }\n.hq-iceberg-cached { background: repeating-linear-gradient(135deg, var(--hq-muted) 0 1px, transparent 1px 4px); border-radius: 0 0 3px 3px; }\n.hq-iceberg-label { font-size: 9px; color: var(--hq-muted); }\n.hq-punch-matrix {\n  display: grid; grid-template-columns: minmax(85px, 1fr) repeat(var(--hq-columns), minmax(13px, 1fr)) 50px;\n  align-items: center; justify-items: center; gap: 5px 2px; font-size: 9px; margin-top: 8px; min-width: max-content;\n}\n.hq-punch-label { justify-self: start; font-size: 10px; }\n.hq-punch-total { justify-self: end; font-variant-numeric: tabular-nums; }\n.hq-punch-dot { height: var(--hq-size); width: var(--hq-size); border-radius: 50%; background: var(--hq-muted); opacity: .55; }\n.hq-punch-dot[data-active="true"] { background: var(--hq-ink); opacity: 1; }\n.hq-table-wrap { overflow-x: auto; }\n.hq-model-table { width: 100%; border-collapse: collapse; font-size: 11px; }\n.hq-model-table th, .hq-model-table td { padding: 6px; text-align: right; border-top: 1px solid var(--hq-line); white-space: nowrap; }\n.hq-model-table th:first-child, .hq-model-table td:first-child { text-align: left; }\n@media (max-width: 390px) {\n  .hq-card { padding: 8px 9px; }\n  .hq-window .hq-values { flex-wrap: wrap; }\n  .hq-usage { padding-inline: 9px; }\n}\n';
  }
});

// src/metrics.cjs
var require_metrics = __commonJS({
  "src/metrics.cjs"(exports2, module2) {
    "use strict";
    var SECOND = 1e3;
    var MINUTE = 60 * SECOND;
    var HOUR = 60 * MINUTE;
    var DAY = 24 * HOUR;
    var SHANGHAI = 8 * HOUR;
    var TZ = "Asia/Shanghai";
    function count(value) {
      return Number.isFinite(value) && value > 0 ? value : 0;
    }
    function tokens(value) {
      return {
        input: count(value?.input),
        read: count(value?.cache?.read),
        write: count(value?.cache?.write),
        output: count(value?.output),
        thinking: count(value?.reasoning)
      };
    }
    function addTokens(list) {
      const total = tokens();
      for (const value of list) {
        for (const key of Object.keys(total)) total[key] += value[key];
      }
      return total;
    }
    var inputSize = (value) => value.input + value.read + value.write;
    var outputSize = (value) => value.output + value.thinking;
    var tokenTotal2 = (value) => inputSize(value) + outputSize(value);
    var cacheRate2 = (value) => inputSize(value) ? 100 * value.read / inputSize(value) : null;
    var modelKey2 = (model) => model ? model.providerID + "/" + model.id : "";
    function contextStep2(messages, boundary) {
      const end = boundary ? messages.findIndex((message) => message.id === boundary) : messages.length;
      for (let i = end - 1; i >= 0; i--) {
        const message = messages[i];
        if (message.type === "compaction" && message.status === "completed") break;
        if (message.type === "assistant" && message.tokens && !message.error) return message;
      }
    }
    function toolDuration(parts) {
      const tools = parts.filter((part) => part.type === "tool");
      const durations = tools.map((part) => {
        const start = part.time?.ran ?? part.time?.created;
        return count(part.time?.completed - start);
      });
      return { count: tools.length, took: durations.reduce((a, b) => a + b, 0) };
    }
    function sessionMetrics2(messages, info, subagents, model, partial) {
      const rates = [];
      let modelMs = 0;
      let toolMs = 0;
      let toolCalls = 0;
      let prompts = 0;
      let steps = 0;
      let compacted = 0;
      let latest;
      const messageTokens = [];
      for (const message of messages) {
        if (message.type === "user") prompts++;
        if (message.type === "compaction" && message.status === "completed") compacted++;
        if (message.type !== "assistant") continue;
        const tools = toolDuration(message.content ?? []);
        toolCalls += tools.count;
        toolMs += tools.took;
        if (!message.tokens) continue;
        const usage = tokens(message.tokens);
        messageTokens.push(usage);
        if (message.error || message.finish === "error") continue;
        steps++;
        const { created, firstToken, streamed, completed } = message.time ?? {};
        const end = streamed ?? completed;
        const requestMs = count(end - created);
        const generationMs = count(end - firstToken);
        const generated = outputSize(usage);
        const ttftMs = count(firstToken - created);
        modelMs += requestMs;
        latest = {
          generated,
          requestMs,
          generationMs,
          ttftMs,
          speed: firstToken >= created && generationMs >= 80 && generated ? generated * SECOND / generationMs : null,
          elapsedSpeed: requestMs && generated ? generated * SECOND / requestMs : null,
          usage
        };
        if (latest.speed !== null) rates.push(latest);
      }
      const direct = info?.tokens ? tokens(info.tokens) : addTokens(messageTokens);
      const delegated = addTokens(subagents.map((agent) => tokens(agent.tokens)));
      const used = contextStep2(messages, info?.revert?.messageID);
      const capacity = count(model?.limit?.context);
      const occupied = used ? inputSize(tokens(used.tokens)) : null;
      const context = {
        name: model?.name ?? used?.model?.id ?? info?.model?.id ?? "Hydrogen Extra",
        occupied,
        capacity,
        percent: occupied !== null && capacity ? 100 * occupied / capacity : null,
        compacted
      };
      const allGenerated = rates.reduce((sum, item) => sum + item.generated, 0);
      const streamMs = rates.reduce((sum, item) => sum + item.generationMs, 0);
      return {
        latest,
        rates: rates.slice(-18).map((item) => item.speed),
        average: streamMs ? allGenerated * SECOND / streamMs : null,
        peak: rates.reduce((peak, item) => Math.max(peak, item.speed), 0) || null,
        samples: rates.length,
        streamMs,
        modelMs,
        toolMs,
        toolCalls,
        prompts,
        steps,
        direct,
        delegated,
        family: addTokens([direct, delegated]),
        subagents: subagents.length,
        context,
        partial
      };
    }
    function liveSpeed2(message, now) {
      if (message?.type !== "assistant" || message.time?.streamed || message.time?.completed) return null;
      const firstToken = message.time?.firstToken;
      if (!Number.isFinite(firstToken) || now - firstToken < 300) return null;
      let estimated = 0;
      for (const part of message.content ?? []) {
        if (part.type !== "text" && part.type !== "reasoning") continue;
        const text = part.text ?? "";
        const nonAscii = (text.match(/[^\x00-\x7F]/gu) ?? []).length;
        estimated += (text.length - nonAscii) / 4 + nonAscii / 1.3;
      }
      return estimated >= 1 ? estimated * SECOND / (now - firstToken) : null;
    }
    function descendants2(sessions, root) {
      const byParent = /* @__PURE__ */ new Map();
      for (const session of sessions) {
        if (!session.parentID) continue;
        if (!byParent.has(session.parentID)) byParent.set(session.parentID, []);
        byParent.get(session.parentID).push(session);
      }
      const seen = /* @__PURE__ */ new Set([root]);
      const result = [];
      const pending = [...byParent.get(root) ?? []];
      for (const session of pending) {
        if (seen.has(session.id)) continue;
        seen.add(session.id);
        result.push(session);
        pending.push(...byParent.get(session.id) ?? []);
      }
      return result;
    }
    function localDate(timestamp) {
      return new Date(timestamp + SHANGHAI);
    }
    function dayStart(timestamp) {
      return Math.floor((timestamp + SHANGHAI) / DAY) * DAY - SHANGHAI;
    }
    function weekStart(timestamp) {
      const day = dayStart(timestamp);
      return day - (localDate(day).getUTCDay() + 6) % 7 * DAY;
    }
    function monthStart(timestamp, offset = 0) {
      const date = localDate(timestamp);
      return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + offset, 1) - SHANGHAI;
    }
    function dateKey(timestamp) {
      return localDate(timestamp).toISOString().slice(0, 10);
    }
    function rangeFor(unit, offset, now = Date.now()) {
      if (unit === "day") {
        const from2 = dayStart(now) + offset * DAY;
        return { from: from2, until: from2 + DAY, step: 3 * HOUR, label: dateKey(from2) };
      }
      if (unit === "week") {
        const from2 = weekStart(now) + offset * 7 * DAY;
        return { from: from2, until: from2 + 7 * DAY, step: DAY, label: dateKey(from2) + " \u2013 " + dateKey(from2 + 6 * DAY) };
      }
      const from = monthStart(now, offset);
      return { from, until: monthStart(now, offset + 1), step: DAY, label: dateKey(from).slice(0, 7) };
    }
    function quotaHistory2() {
      const histories = /* @__PURE__ */ new Map();
      function record(snapshot) {
        const timestamp = Date.parse(snapshot.updated_at);
        if (!Number.isFinite(timestamp)) return;
        for (const [key, window2] of Object.entries(snapshot.totals ?? {})) {
          if (!Number.isFinite(window2.average_percent) || window2.known_accounts !== snapshot.account_count) {
            histories.delete(key);
            continue;
          }
          const signature = [window2.capacity_percent, window2.next_reset_at].join(":");
          let history = histories.get(key);
          const previous = history?.samples.at(-1);
          if (!history || history.signature !== signature || window2.average_percent > previous?.remaining + 0.4) {
            history = { signature, samples: [] };
            histories.set(key, history);
          }
          if (history.samples.at(-1)?.time >= timestamp) continue;
          history.samples.push({ time: timestamp, remaining: window2.average_percent });
          history.samples = history.samples.filter((sample) => sample.time >= timestamp - HOUR).slice(-30);
        }
      }
      function forecast(key, window2, now) {
        const samples = histories.get(key)?.samples ?? [];
        const first = samples[0];
        const last = samples.at(-1);
        const reset = Date.parse(window2?.next_reset_at);
        if (samples.length < 3 || last.time - first.time < 5 * MINUTE || reset <= now || !Number.isFinite(reset)) return null;
        const spent = first.remaining - last.remaining;
        if (spent < 0.75 || now - last.time > 3 * MINUTE) return null;
        const rate = spent / (last.time - first.time);
        const remaining = Math.max(0, last.remaining - (now - last.time) * rate);
        const untilEmpty = remaining / rate;
        return {
          remainingAtReset: Math.max(0, remaining - (reset - now) * rate),
          untilEmpty,
          beforeReset: untilEmpty < reset - now
        };
      }
      return { record, forecast };
    }
    module2.exports = {
      SECOND,
      MINUTE,
      HOUR,
      DAY,
      TZ,
      count,
      tokens,
      addTokens,
      inputSize,
      outputSize,
      tokenTotal: tokenTotal2,
      cacheRate: cacheRate2,
      modelKey: modelKey2,
      contextStep: contextStep2,
      sessionMetrics: sessionMetrics2,
      liveSpeed: liveSpeed2,
      descendants: descendants2,
      localDate,
      dayStart,
      weekStart,
      monthStart,
      dateKey,
      rangeFor,
      quotaHistory: quotaHistory2
    };
  }
});

// src/view.cjs
var require_view = __commonJS({
  "src/view.cjs"(exports2, module2) {
    "use strict";
    var { createEffect: createEffect2, createSignal: createSignal2, onCleanup: onCleanup2 } = require("solid-js");
    var { MINUTE } = require_metrics();
    var copy = {
      dashboard: ["Hydrogen \u7528\u91CF\u4EEA\u8868\u76D8", "Hydrogen Usage Dashboard", "Hydrogen \u7528\u91CF\u5100\u8868\u677F"],
      speed: ["\u6700\u65B0\u901F\u5EA6", "Latest speed", "\u6700\u65B0\u901F\u5EA6"],
      live: ["\u5B9E\u65F6\u901F\u5EA6", "Live speed", "\u5373\u6642\u901F\u5EA6"],
      weighted: ["\u4F1A\u8BDD\u5E73\u5747", "Session average", "\u6703\u8A71\u5E73\u5747"],
      firstToken: ["\u9996\u5B57\u8017\u65F6", "First token", "\u9996\u5B57\u8017\u6642"],
      peak: ["\u5CF0\u503C", "Peak", "\u5CF0\u503C"],
      modelTime: ["\u6A21\u578B\u7528\u65F6", "Model time", "\u6A21\u578B\u7528\u6642"],
      toolTime: ["\u5DE5\u5177\u7528\u65F6", "Tool time", "\u5DE5\u5177\u7528\u6642"],
      streamTime: ["\u751F\u6210\u7528\u65F6", "Generation time", "\u751F\u6210\u7528\u6642"],
      toolCalls: ["\u5DE5\u5177\u8C03\u7528", "Tool calls", "\u5DE5\u5177\u547C\u53EB"],
      output: ["\u8F93\u51FA", "Output", "\u8F38\u51FA"],
      reasoning: ["\u63A8\u7406", "Reasoning", "\u63A8\u7406"],
      prompts: ["\u8F6E", "prompts", "\u8F2A"],
      steps: ["\u6B65", "steps", "\u6B65"],
      samples: ["\u6B21\u6D4B\u901F", "speed samples", "\u6B21\u6E2C\u901F"],
      estimates: ["\u6D41\u5F0F\u901F\u5EA6\u4E3A\u5B9E\u65F6\u4F30\u7B97\uFF0C\u7ED3\u675F\u540E\u4F7F\u7528\u5B9E\u6D4B token \u6570\u3002", "Live rate is estimated. Completed rates use reported tokens.", "\u4E32\u6D41\u901F\u5EA6\u70BA\u5373\u6642\u4F30\u7B97\uFF0C\u5B8C\u6210\u5F8C\u63A1\u7528\u5BE6\u6E2C token \u6578\u3002"],
      awaiting: ["\u7B49\u5F85\u9996\u5B57\u2026", "Waiting for first token\u2026", "\u7B49\u5F85\u9996\u5B57\u2026"],
      working: ["\u6B63\u5728\u751F\u6210\u2026", "Generating\u2026", "\u6B63\u5728\u751F\u6210\u2026"],
      listening: ["\u6682\u65E0\u751F\u6210\u8BB0\u5F55", "No generation yet", "\u66AB\u7121\u751F\u6210\u8A18\u9304"],
      elapsed: ["\u542B\u9996\u5B57\u7B49\u5F85", "Includes first-token wait", "\u542B\u9996\u5B57\u7B49\u5F85"],
      partialSteps: ["\u6309\u5F53\u524D\u52A0\u8F7D\u7684\u5BF9\u8BDD\u6B65\u9AA4\u7EDF\u8BA1", "Based on loaded conversation steps", "\u6309\u76EE\u524D\u8F09\u5165\u7684\u5C0D\u8A71\u6B65\u9A5F\u7D71\u8A08"],
      cache: ["Token \u7528\u91CF", "Token usage", "Token \u7528\u91CF"],
      cacheRead: ["\u7F13\u5B58\u8BFB\u53D6", "Cache read", "\u5FEB\u53D6\u8B80\u53D6"],
      cacheWrite: ["\u7F13\u5B58\u5199\u5165", "Cache write", "\u5FEB\u53D6\u5BEB\u5165"],
      uncached: ["\u672A\u7F13\u5B58\u8F93\u5165", "Uncached input", "\u672A\u5FEB\u53D6\u8F38\u5165"],
      cacheRate: ["\u7F13\u5B58\u7387", "Cache hit rate", "\u5FEB\u53D6\u547D\u4E2D\u7387"],
      currentAgent: ["\u5F53\u524D\u4EE3\u7406", "Current agent", "\u76EE\u524D\u4EE3\u7406"],
      subagents: ["\u5B50\u4EE3\u7406", "Subagents", "\u5B50\u4EE3\u7406"],
      context: ["\u4E0A\u4E0B\u6587\u7A97\u53E3", "Context window", "\u4E0A\u4E0B\u6587\u8996\u7A97"],
      used: ["\u5DF2\u7528", "used", "\u5DF2\u7528"],
      compactions: ["\u6B21\u538B\u7F29", "compactions", "\u6B21\u58D3\u7E2E"],
      quota: ["\u5171\u4EAB\u989D\u5EA6", "Shared quotas", "\u5171\u4EAB\u984D\u5EA6"],
      accounts: ["\u4E2A\u8D26\u53F7\u5408\u8BA1", "accounts combined", "\u500B\u5E33\u865F\u5408\u8A08"],
      fetched: ["\u4E2A\u8D26\u53F7\u5DF2\u8BFB\u53D6", "accounts read", "\u500B\u5E33\u865F\u5DF2\u8B80\u53D6"],
      reset: ["\u6700\u8FD1\u91CD\u7F6E", "Next reset", "\u6700\u8FD1\u91CD\u7F6E"],
      resetDue: ["\u91CD\u7F6E\u65F6\u95F4\u5DF2\u5230\uFF0C\u7B49\u5F85\u66F4\u65B0", "Reset due, waiting for update", "\u91CD\u7F6E\u6642\u9593\u5DF2\u5230\uFF0C\u7B49\u5F85\u66F4\u65B0"],
      quotaShort: ["5 \u5C0F\u65F6\u989D\u5EA6", "Five-hour quota", "5 \u5C0F\u6642\u984D\u5EA6"],
      quotaWeek: ["\u6BCF\u5468\u989D\u5EA6", "Weekly quota", "\u6BCF\u9031\u984D\u5EA6"],
      totalQuota: ["\u5408\u8BA1", "Combined", "\u5408\u8A08"],
      cycleTokens: ["\u672C\u673A\u5468\u671F\u7528\u91CF", "Local cycle usage", "\u672C\u6A5F\u9031\u671F\u7528\u91CF"],
      cycleTokensHint: ["\u5728\u5DF2\u8BFB\u53D6\u7684\u989D\u5EA6\u5468\u671F\u5185\uFF0C\u7ECF\u672C\u673A\u4EE3\u7406\u4F7F\u7528 Hydrogen Extra \u7684 token\u3002", "Hydrogen Extra tokens logged by the local proxy within the available quota windows.", "\u5DF2\u8B80\u53D6\u984D\u5EA6\u9031\u671F\u5167\uFF0C\u7D93\u672C\u6A5F\u4EE3\u7406\u4F7F\u7528 Hydrogen Extra \u7684 token\u3002"],
      projected: ["\u9884\u8BA1\u91CD\u7F6E\u65F6\u5269", "Estimated left at reset", "\u9810\u8A08\u91CD\u7F6E\u6642\u5269"],
      runsOut: ["\u9884\u8BA1\u8017\u5C3D\u4E8E", "Estimated to run out in", "\u9810\u8A08\u8017\u76E1\u65BC"],
      low: ["\u989D\u5EA6\u504F\u7D27", "Quota running low", "\u984D\u5EA6\u504F\u7DCA"],
      calibrating: ["\u6D88\u8017\u8D8B\u52BF\u91C7\u6837\u4E2D", "Sampling usage pace", "\u6B63\u5728\u53D6\u6A23\u6D88\u8017\u8DA8\u52E2"],
      updated: ["\u66F4\u65B0", "updated", "\u66F4\u65B0"],
      refresh: ["\u5237\u65B0", "Refresh", "\u91CD\u65B0\u6574\u7406"],
      loading: ["\u8BFB\u53D6\u4E2D\u2026", "Loading\u2026", "\u8B80\u53D6\u4E2D\u2026"],
      failed: ["\u66F4\u65B0\u5931\u8D25\uFF0C\u663E\u793A\u4E0A\u6B21\u6570\u636E", "Refresh failed. Showing last data.", "\u66F4\u65B0\u5931\u6557\uFF0C\u986F\u793A\u4E0A\u6B21\u8CC7\u6599"],
      noData: ["\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6", "Unavailable", "\u66AB\u6642\u7121\u6CD5\u8B80\u53D6"],
      today: ["\u4ECA\u65E5\u7528\u91CF", "Today", "\u4ECA\u65E5\u7528\u91CF"],
      week: ["\u672C\u5468\u7528\u91CF", "This week", "\u672C\u9031\u7528\u91CF"],
      month: ["\u672C\u6708\u7528\u91CF", "This month", "\u672C\u6708\u7528\u91CF"],
      all: ["\u7D2F\u8BA1\u7528\u91CF", "All time", "\u7D2F\u8A08\u7528\u91CF"],
      cost: ["\u6309\u516C\u5F00\u5355\u4EF7\u4F30\u7B97", "Estimated at catalog rates", "\u6309\u516C\u958B\u55AE\u50F9\u4F30\u7B97"],
      noPrice: ["\u65E0\u516C\u5F00\u5355\u4EF7", "No catalog price", "\u7121\u516C\u958B\u55AE\u50F9"],
      openUsage: ["\u67E5\u770B\u7528\u91CF\u7EDF\u8BA1", "View usage statistics", "\u67E5\u770B\u7528\u91CF\u7D71\u8A08"],
      stats: ["\u7528\u91CF\u7EDF\u8BA1", "Usage statistics", "\u7528\u91CF\u7D71\u8A08"],
      activity: ["\u6D3B\u52A8\u6982\u89C8", "Activity overview", "\u6D3B\u52D5\u7E3D\u89BD"],
      breakdown: ["\u7528\u91CF\u8BE6\u60C5", "Usage details", "\u7528\u91CF\u8A73\u60C5"],
      dailyActivity: ["\u6BCF\u65E5\u6D3B\u52A8", "Daily activity", "\u6BCF\u65E5\u6D3B\u52D5"],
      weeklyActivity: ["\u6BCF\u5468\u6D3B\u52A8", "Weekly activity", "\u6BCF\u9031\u6D3B\u52D5"],
      activeDays: ["\u6D3B\u8DC3\u5929\u6570", "Active days", "\u6D3B\u8E8D\u5929\u6578"],
      streak: ["\u8FDE\u7EED\u6D3B\u8DC3", "Active streak", "\u9023\u7E8C\u6D3B\u8E8D"],
      requests: ["\u6B21\u8BF7\u6C42", "requests", "\u6B21\u8ACB\u6C42"],
      day: ["\u5929", "Day", "\u5929"],
      weekly: ["\u5468", "Week", "\u9031"],
      monthly: ["\u6708", "Month", "\u6708"],
      previous: ["\u4E0A\u4E00\u5468\u671F", "Previous period", "\u4E0A\u4E00\u9031\u671F"],
      next: ["\u4E0B\u4E00\u5468\u671F", "Next period", "\u4E0B\u4E00\u9031\u671F"],
      byModel: ["\u6309\u6A21\u578B\u7EDF\u8BA1", "Usage by model", "\u6309\u6A21\u578B\u7D71\u8A08"],
      iceberg: ["Token \u51B0\u5C71", "Token iceberg", "Token \u51B0\u5C71"],
      fresh: ["\u65B0\u589E token", "New tokens", "\u65B0\u589E token"],
      punch: ["\u6A21\u578B \xD7 \u65F6\u95F4", "Model \xD7 time", "\u6A21\u578B \xD7 \u6642\u9593"],
      model: ["\u6A21\u578B", "Model", "\u6A21\u578B"],
      allModels: ["\u5168\u90E8\u6A21\u578B", "All models", "\u5168\u90E8\u6A21\u578B"],
      tokenTotal: ["\u603B Token", "Total tokens", "\u7E3D Token"],
      local: ["\u672C\u673A OpenCode \xB7 \u5171\u4EAB\u8D26\u53F7\u6C60", "Local OpenCode \xB7 shared account pool", "\u672C\u6A5F OpenCode \xB7 \u5171\u7528\u5E33\u865F\u6C60"],
      entire: ["\u5F53\u524D\u8303\u56F4", "Current range", "\u76EE\u524D\u7BC4\u570D"],
      noUsage: ["\u8BE5\u5468\u671F\u6682\u65E0\u7528\u91CF", "No usage in this period", "\u8A72\u9031\u671F\u66AB\u7121\u7528\u91CF"],
      calendarHint: ["\u6309\u5317\u4EAC\u65F6\u95F4\u7EDF\u8BA1 \xB7 \u5468\u4E00\u4E3A\u4E00\u5468\u8D77\u59CB", "Asia/Shanghai \xB7 Monday-start weeks", "\u6309\u5317\u4EAC\u6642\u9593\u7D71\u8A08 \xB7 \u9031\u4E00\u70BA\u4E00\u9031\u8D77\u59CB"]
    };
    function languageState2() {
      const key = "opencode-agy-dashboard.language";
      let initial = 0;
      try {
        const saved = Number(localStorage.getItem(key));
        if ([0, 1, 2].includes(saved)) initial = saved;
      } catch {
      }
      const [index, update] = createSignal2(initial);
      function set(value) {
        update(value);
        try {
          localStorage.setItem(key, String(value));
        } catch {
        }
      }
      return { index, set, t: (name) => copy[name]?.[index()] ?? name };
    }
    function element2(tag, className, text) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== void 0) node.textContent = text;
      return node;
    }
    function button2(className, text, run) {
      const control = element2("button", className, text);
      control.type = "button";
      control.addEventListener("click", run);
      return control;
    }
    function row(className, ...nodes) {
      const result = element2("div", className);
      result.append(...nodes);
      return result;
    }
    function compact2(value) {
      if (!Number.isFinite(value)) return "\u2014";
      for (const [base, unit] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]]) {
        if (value >= base) return Number((value / base).toFixed(1)) + unit;
      }
      return String(Math.round(value));
    }
    var exact = (value) => Number.isFinite(value) ? value.toLocaleString("en-US") : "\u2014";
    var percent = (value) => Number.isFinite(value) ? value.toFixed(1) + "%" : "\u2014";
    var speed2 = (value) => Number.isFinite(value) ? value.toFixed(1) : "\u2014";
    function duration(value, english = false) {
      if (!Number.isFinite(value) || value <= 0) return "\u2014";
      if (value < MINUTE) return (value / 1e3).toFixed(value < 1e4 ? 2 : 1) + " s";
      const minutes = Math.floor(value / MINUTE);
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor(minutes % 1440 / 60);
      const fields = [];
      if (days) fields.push(days + (english ? "d" : "\u5929"));
      if (hours) fields.push(hours + (english ? "h" : "\u65F6"));
      if (minutes % 60 || !fields.length) fields.push(minutes % 60 + (english ? "m" : "\u5206"));
      if (minutes < 60) fields.push(Math.floor(value % MINUTE / 1e3) + (english ? "s" : "\u79D2"));
      return fields.join(" ");
    }
    function languagePicker(language) {
      const group = element2("div", "hq-switch hq-language");
      group.setAttribute("aria-label", "Language");
      const options = ["EN", "\u7B80", "\u7E41"].map((label, i) => {
        const value = [1, 0, 2][i];
        const control = button2("hq-switch-item", label, () => language.set(value));
        createEffect2(() => control.setAttribute("aria-pressed", String(language.index() === value)));
        return control;
      });
      group.append(...options);
      return group;
    }
    function block(label, value, title) {
      const item = element2("div", "hq-stat");
      item.append(element2("span", "hq-muted", label), element2("strong", "", value));
      if (title !== void 0) item.title = title;
      return item;
    }
    function clock2(interval) {
      const [now, setNow] = createSignal2(Date.now());
      const timer = setInterval(() => setNow(Date.now()), interval);
      onCleanup2(() => clearInterval(timer));
      return now;
    }
    module2.exports = {
      languageState: languageState2,
      languagePicker,
      element: element2,
      button: button2,
      row,
      compact: compact2,
      exact,
      percent,
      speed: speed2,
      duration,
      block,
      clock: clock2
    };
  }
});

// src/cards.cjs
var require_cards = __commonJS({
  "src/cards.cjs"(exports2, module2) {
    "use strict";
    var { createEffect: createEffect2, createSignal: createSignal2 } = require("solid-js");
    var { MINUTE, cacheRate: cacheRate2, tokenTotal: tokenTotal2, outputSize, tokens } = require_metrics();
    var { element: element2, button: button2, row, block, compact: compact2, exact, percent, speed: speed2, duration, clock: clock2, languagePicker } = require_view();
    var windows = [["5h", "quotaShort", "\u25F7"], ["weekly", "quotaWeek", "\u25A6"]];
    var updateTime = new Intl.DateTimeFormat("zh-CN", {
      timeZone: "Asia/Shanghai",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    });
    function heading(icon, label, extra) {
      const title = row("hq-card-title", element2("span", "hq-icon", icon), element2("span", "", label));
      return extra ? row("hq-card-head", title, extra) : row("hq-card-head", title);
    }
    function progress(fraction, tone, projected) {
      const bar = element2("div", "hq-track");
      const shown = Number.isFinite(fraction) ? Math.min(100, Math.max(0, fraction)) : 0;
      const fill = element2("div", "hq-fill");
      fill.dataset.tone = tone ?? "normal";
      fill.style.width = shown + "%";
      bar.setAttribute("aria-hidden", "true");
      bar.append(fill);
      if (Number.isFinite(projected) && projected < shown) {
        const stripe = element2("span", "hq-striped");
        stripe.style.left = Math.max(0, projected) + "%";
        stripe.style.width = shown - Math.max(0, projected) + "%";
        bar.append(stripe);
      }
      return bar;
    }
    function sparkline(values) {
      const chart = element2("canvas", "hq-spark");
      chart.width = 330;
      chart.height = 94;
      chart.title = values.map((value) => speed2(value)).join(" \xB7 ") + " tok/s";
      const context = chart.getContext("2d");
      if (!context || !values.length) return chart;
      const width = chart.width;
      const height = chart.height;
      const peak = Math.max(1, ...values);
      const points = values.map((value, index) => [
        5 + (width - 10) * index / Math.max(1, values.length - 1),
        height - 5 - (height - 16) * value / peak
      ]);
      context.lineTo(points[0][0], height);
      for (const [x, y] of points) context.lineTo(x, y);
      context.lineTo(points.at(-1)[0], height);
      context.fillStyle = "rgba(209,114,79,.16)";
      context.fill();
      context.beginPath();
      context.moveTo(...points[0]);
      for (const [x, y] of points.slice(1)) context.lineTo(x, y);
      context.strokeStyle = "#d17756";
      context.lineWidth = 3;
      context.lineJoin = "round";
      context.stroke();
      context.beginPath();
      context.arc(...points.at(-1), 4, 0, 2 * Math.PI);
      context.fillStyle = "#d17756";
      context.fill();
      return chart;
    }
    function speedCard2(state) {
      const { language: { t, index }, metrics, running, live } = state;
      const card = element2("section", "hq-card hq-speed-card");
      const headline = element2("div", "hq-card-head");
      const label = row("hq-card-title", element2("span", "hq-icon", "\u223F"), element2("span"));
      const [averageView, setAverageView] = createSignal2(false);
      const latestControl = button2("hq-switch-item", "", () => setAverageView(false));
      const averageControl = button2("hq-switch-item", "", () => setAverageView(true));
      const switcher = row("hq-switch", latestControl, averageControl);
      headline.append(label, switcher);
      const detail = element2("div");
      card.append(headline, detail);
      createEffect2(() => {
        const review = metrics();
        const estimate = live();
        const active = running();
        const useAverage = averageView();
        const last = review?.latest;
        const rate = useAverage ? review?.average : estimate ?? last?.speed ?? last?.elapsedSpeed;
        const partial = !useAverage && estimate != null;
        latestControl.textContent = t("speed");
        averageControl.textContent = t("weighted");
        latestControl.setAttribute("aria-pressed", String(!useAverage));
        averageControl.setAttribute("aria-pressed", String(useAverage));
        label.lastChild.textContent = t(partial ? "live" : useAverage ? "weighted" : "speed");
        const hero = row("hq-speed-hero", row(
          "hq-number-with-unit",
          element2("strong", "hq-number", (partial ? "\u2248" : "") + speed2(rate)),
          element2("span", "hq-muted", "tok/s")
        ), sparkline(review?.rates ?? []));
        const firstToken = last?.ttftMs ? duration(last.ttftMs, index() === 1) : "\u2014";
        const stats = row(
          "hq-three hq-divider",
          block(t("weighted"), speed2(review?.average) + " tok/s"),
          block(t("firstToken"), firstToken),
          block(t("peak"), speed2(review?.peak) + " tok/s")
        );
        const totals = row(
          "hq-three hq-divider",
          block(t("modelTime"), duration(review?.modelMs, index() === 1)),
          block(t("toolTime"), duration(review?.toolMs, index() === 1)),
          block(t("streamTime"), duration(review?.streamMs, index() === 1))
        );
        const content = [hero, stats, totals];
        if (review) {
          const info = row(
            "hq-line hq-muted hq-speed-note",
            element2("span", "", review.prompts + " " + t("prompts") + " \xB7 " + review.steps + " " + t("steps") + " \xB7 " + review.samples + " " + t("samples")),
            element2("span", "", exact(last?.generated) + " toks")
          );
          content.push(info, element2("p", "hq-muted hq-compact-note", t("toolCalls") + " " + review.toolCalls));
        }
        if (active) content.push(element2("p", "hq-muted hq-compact-note", t(partial ? "estimates" : "working")));
        if (!active && !review?.latest) content.push(element2("p", "hq-muted hq-compact-note", t("listening")));
        if (!active && last?.speed == null && last?.elapsedSpeed != null && !useAverage) {
          content.push(element2("p", "hq-muted hq-compact-note", t("elapsed")));
        }
        if (review?.partial) content.push(element2("p", "hq-muted hq-compact-note", t("partialSteps")));
        detail.replaceChildren(...content);
      });
      return card;
    }
    function tokenSegments(value) {
      const total = tokenTotal2(value);
      const track = element2("div", "hq-track hq-segments");
      if (!total) return track;
      for (const key of ["read", "input", "write", "thinking", "output"]) {
        const fill = element2("span", "hq-segment");
        fill.dataset.kind = key;
        fill.style.width = value[key] / total * 100 + "%";
        track.append(fill);
      }
      return track;
    }
    function cacheCard2(state, close = () => {
    }) {
      const { language: { t }, metrics, usage, openUsage } = state;
      const card = element2("section", "hq-card hq-cache-card");
      const detail = element2("div");
      const open = button2("hq-text-button", "", () => {
        close();
        openUsage();
      });
      card.append(detail, row("hq-card-footer", open));
      void usage.refresh().catch(() => {
      });
      createEffect2(() => {
        const review = metrics();
        const value = review?.family ?? tokens();
        const balance = tokenTotal2(value);
        const rate = percent(cacheRate2(value));
        const large = row(
          "hq-line hq-cache-hero",
          row(
            "hq-number-with-unit",
            element2("strong", "hq-number", exact(balance)),
            element2("span", "hq-muted", "toks")
          ),
          element2("span", "hq-chip hq-accent-chip", rate)
        );
        large.title = t("cacheRate") + " " + rate;
        const parts = row(
          "hq-three hq-divider",
          block(t("cacheRead"), compact2(value.read) + " toks", exact(value.read)),
          block(t("uncached"), compact2(value.input) + " toks", exact(value.input)),
          block(t("output"), compact2(outputSize(value)) + " toks", exact(outputSize(value)))
        );
        const extra = row(
          "hq-line hq-muted hq-cache-note",
          element2("span", "", t("cacheWrite") + " " + compact2(value.write)),
          element2("span", "", t("reasoning") + " " + compact2(value.thinking))
        );
        const content = [heading("\u25A4", t("cache")), large, tokenSegments(value), parts, extra];
        if (review?.subagents) {
          content.push(row(
            "hq-two hq-divider",
            block(t("currentAgent"), compact2(tokenTotal2(review.direct)) + " toks"),
            block(t("subagents") + " (" + review.subagents + ")", compact2(tokenTotal2(review.delegated)) + " toks")
          ));
        }
        const base = usage.summary();
        if (base) {
          content.push(row(
            "hq-two hq-divider",
            block(t("today"), compact2(tokenTotal2(tokens(base.today.tokens))) + " toks"),
            block(t("month"), compact2(tokenTotal2(tokens(base.month.tokens))) + " toks")
          ));
        }
        detail.replaceChildren(...content);
        open.textContent = t("openUsage") + " \u203A";
      });
      return card;
    }
    function resetLabel(raw, now, language) {
      const reset = Date.parse(raw);
      if (!Number.isFinite(reset)) return "";
      if (reset <= now) return language.t("resetDue");
      return language.t("reset") + " " + duration(Math.ceil((reset - now) / MINUTE) * MINUTE, language.index() === 1);
    }
    function quotaWindow(state, quota, key, label, icon, now, projected) {
      const language = state.language;
      const t = language.t;
      const total = quota?.totals?.[key];
      const normalized = total?.average_percent;
      const sum = total?.sum_percent;
      const read = total?.known_accounts ?? 0;
      const registered = quota?.account_count;
      const labelNode = element2("span", "hq-window-title", icon + " " + t(label));
      const reset = element2("span", "hq-accent", resetLabel(total?.next_reset_at, now, language));
      const amount = element2("strong", "hq-window-number", percent(normalized));
      const window2 = row("hq-window", row("hq-line", labelNode, row("hq-values", reset, amount)));
      window2.append(progress(normalized, normalized < 20 ? "low" : "", projected?.remainingAtReset));
      const sumText = Number.isFinite(sum) ? t("totalQuota") + " " + percent(sum) + " / " + total.capacity_percent + "%" : t("noData");
      const scope = read < registered ? read + "/" + registered + " " + t("fetched") : "";
      window2.append(row(
        "hq-line hq-muted hq-quota-total",
        element2("span", "", sumText),
        element2("span", "", scope)
      ));
      if (projected) {
        const estimate = projected.beforeReset ? t("runsOut") + " " + (projected.untilEmpty > MINUTE ? duration(projected.untilEmpty, language.index() === 1) : "< 1m") : t("projected") + " ~" + percent(projected.remainingAtReset);
        window2.append(element2("div", projected.beforeReset ? "hq-warn hq-quota-detail" : "hq-muted hq-quota-detail", estimate));
      }
      if (Number.isFinite(total?.local_cycle_tokens)) {
        const period = row(
          "hq-line hq-muted hq-quota-detail",
          element2("span", "", t("cycleTokens")),
          element2("strong", "", compact2(total.local_cycle_tokens) + " toks")
        );
        period.title = t("cycleTokensHint");
        window2.append(period);
      }
      return window2;
    }
    function contextCard2(state) {
      const { language, metrics, quota } = state;
      const { t } = language;
      const now = clock2(15e3);
      const [thirdOpen, setThirdOpen] = createSignal2(false);
      const card = element2("section", "hq-card hq-context-card");
      const context = element2("div");
      const primary = element2("div", "hq-quota-group");
      const secondary = element2("div", "hq-secondary");
      const other = button2("hq-secondary-toggle", "", () => setThirdOpen((value) => !value));
      const expanded = element2("div", "hq-secondary-detail");
      secondary.append(other, expanded);
      const refresh = button2("hq-text-button", "", () => void state.refreshQuota(true));
      const footer = row("hq-card-footer", languagePicker(language), refresh);
      card.append(context, primary, secondary, footer);
      createEffect2(() => {
        const usage = metrics()?.context;
        const title = heading("\u25F7", t("context"), element2("span", "hq-muted hq-context-model", usage?.name ?? "Hydrogen Extra"));
        const shown = Number.isFinite(usage?.percent) ? Math.round(usage.percent) + "% " + t("used") : "\u2014";
        const amounts = element2("span", "hq-muted", usage?.occupied != null && usage.capacity ? compact2(usage.occupied) + " / " + compact2(usage.capacity) + " toks" : "");
        const values = row("hq-values", amounts);
        if (usage?.compacted) {
          const compacted = element2("span", "hq-chip", "\u2195 " + usage.compacted + "\xD7");
          compacted.title = usage.compacted + " " + t("compactions");
          values.prepend(compacted);
        }
        context.replaceChildren(
          title,
          row("hq-line hq-context-hero", element2("strong", "hq-context-used", shown), values),
          progress(usage?.percent, usage?.percent >= 80 ? "low" : "")
        );
      });
      createEffect2(() => {
        const data = quota();
        const timestamp = now();
        const forecasts = windows.map(([key]) => state.forecast(key, data?.totals?.[key], timestamp));
        const low = forecasts.some((item) => item?.beforeReset) || windows.some(([key]) => {
          const remaining = data?.totals?.[key]?.average_percent;
          return Number.isFinite(remaining) && remaining < 20;
        });
        const status = data ? data.account_count + " " + t("accounts") : t(state.quotaFailed() ? "noData" : "loading");
        const title = row(
          "hq-line hq-quota-title",
          row("hq-values", element2("span", "hq-dot"), element2("strong", "", "Gemini")),
          element2("span", low ? "hq-chip hq-warn-chip" : "hq-muted", low ? t("low") : status)
        );
        const details = windows.map(([key, label, icon], index) => quotaWindow(state, data, key, label, icon, timestamp, forecasts[index]));
        primary.replaceChildren(title, ...details);
        if (data && !forecasts.some(Boolean) && !state.quotaFailed()) {
          primary.append(element2("div", "hq-muted hq-quota-detail", t("calibrating")));
        }
      });
      createEffect2(() => {
        const data = quota();
        const third = data?.third_party_totals;
        secondary.hidden = !third || windows.every(([key]) => !third[key]?.known_accounts);
        if (secondary.hidden) return;
        const expandedNow = thirdOpen();
        const quick = windows.map(([key]) => {
          const total = third[key];
          const label = (key === "5h" ? "5h " : t("weekly") + " ") + percent(total?.average_percent);
          const mini = progress(total?.average_percent);
          mini.classList.add("hq-mini-track");
          return row("hq-secondary-meter", element2("span", "", label), mini);
        });
        other.replaceChildren(element2("strong", "", "Claude / GPT"), ...quick);
        other.setAttribute("aria-expanded", String(expandedNow));
        expanded.hidden = !expandedNow;
        if (expandedNow) {
          const thirdQuota = { totals: third, account_count: data.account_count };
          expanded.replaceChildren(...windows.map(([key, label, icon]) => quotaWindow(state, thirdQuota, key, label, icon, now())));
        }
      });
      createEffect2(() => {
        const data = quota();
        const fetching = state.quotaLoading();
        const time = Date.parse(data?.updated_at);
        refresh.disabled = fetching;
        refresh.textContent = fetching ? t("loading") : "\u21BB " + t("refresh");
        refresh.title = state.quotaFailed() ? t(data ? "failed" : "noData") : Number.isFinite(time) ? updateTime.format(time) + " " + t("updated") : t("quota");
        if (state.quotaFailed()) refresh.dataset.failed = "true";
        else delete refresh.dataset.failed;
      });
      return card;
    }
    module2.exports = { speedCard: speedCard2, cacheCard: cacheCard2, contextCard: contextCard2 };
  }
});

// src/usage-view.cjs
var require_usage_view = __commonJS({
  "src/usage-view.cjs"(exports2, module2) {
    "use strict";
    var { createEffect: createEffect2, createSignal: createSignal2, onCleanup: onCleanup2 } = require("solid-js");
    var {
      DAY,
      TZ,
      tokens,
      tokenTotal: tokenTotal2,
      outputSize,
      cacheRate: cacheRate2,
      modelKey: modelKey2,
      addTokens,
      dayStart,
      weekStart,
      monthStart,
      dateKey,
      localDate,
      rangeFor
    } = require_metrics();
    var { element: element2, button: button2, row, block, compact: compact2, exact, percent, languagePicker } = require_view();
    var HYDROGEN = "antigravity/gemini-4-hydrogen-xhigh";
    var dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
    var periodLabels = { day: "day", week: "weekly", month: "monthly" };
    function readUsage2(ctx) {
      const known = /* @__PURE__ */ new Map();
      const [summary, setSummary] = createSignal2();
      let loading;
      function get(from, until) {
        const now = Date.now();
        const key = [from, until].join(":");
        const previous = known.get(key);
        if (previous && now - previous.time < 6e4) return previous.value;
        const to = until === void 0 ? void 0 : Math.min(now, until - 1);
        const value = ctx.client.session.stats({ from, to, timezone: TZ, tools: "none" }, {
          signal: AbortSignal.any([ctx.signal, AbortSignal.timeout(2e4)])
        }).catch((error) => {
          if (known.get(key)?.value === value) known.delete(key);
          throw error;
        });
        if (known.size >= 100) known.delete(known.keys().next().value);
        known.set(key, { time: now, value });
        return value;
      }
      function refresh(force = false) {
        if (loading) return loading;
        if (force) known.clear();
        const now = Date.now();
        loading = Promise.all([get(dayStart(now)), get(weekStart(now)), get(monthStart(now)), get()]).then(([today, week, month, all]) => {
          const result = { today, week, month, all };
          setSummary(result);
          return result;
        }).finally(() => {
          loading = void 0;
        });
        return loading;
      }
      return { get, refresh, summary };
    }
    function modelName(model) {
      return modelKey2(model) === HYDROGEN ? "Hydrogen Extra" : model?.id ?? "\u2014";
    }
    function selectModels(stats, filter) {
      return (stats?.models ?? []).filter((model) => !filter || modelKey2(model.model) === filter);
    }
    function showUsageStats(stats, filter) {
      if (!stats) return void 0;
      if (!filter) return { usage: tokens(stats.tokens), cost: stats.cost, steps: stats.steps };
      const models = selectModels(stats, filter);
      return {
        usage: addTokens(models.map((model) => tokens(model.tokens))),
        cost: models.reduce((sum, model) => sum + (model.cost ?? 0), 0),
        steps: models.reduce((sum, model) => sum + (model.steps ?? 0), 0)
      };
    }
    async function periodSeries(reader, period, summary, unit, active) {
      const now = Date.now();
      const dates = new Set((summary?.activity ?? []).filter((item) => item.steps > 0).map((item) => item.date));
      const points = [];
      for (let from = period.from; from < period.until; from += period.step) {
        const until = Math.min(from + period.step, period.until);
        const date = localDate(from);
        const label = unit === "day" ? String(date.getUTCHours()).padStart(2, "0") : String(date.getUTCDate());
        const caption = unit === "day" ? dateKey(from) + " " + label + ":00" : dateKey(from);
        points.push({ from, until, label, caption, populated: from <= now && dates.has(dateKey(from)) });
      }
      for (let i = 0; i < points.length && active(); i += 3) {
        await Promise.all(points.slice(i, i + 3).filter((point) => point.populated).map(async (point) => {
          point.stats = await reader.get(point.from, point.until);
        }));
      }
      return points;
    }
    function makeCalendar(all, byWeek, t, drill) {
      const days = new Map((all.activity ?? []).map((item) => [item.date, item.steps]));
      const weeks = byWeek ? 26 : 16;
      const current = weekStart(Date.now());
      const first = current - (weeks - 1) * 7 * DAY;
      const cells = [];
      for (let column = 0; column < weeks; column++) {
        const week = first + column * 7 * DAY;
        for (let day = 0; day < (byWeek ? 1 : 7); day++) {
          const stamp = week + day * DAY;
          const steps = byWeek ? Array.from({ length: 7 }, (_, n) => days.get(dateKey(stamp + n * DAY)) ?? 0).reduce((a, b) => a + b, 0) : days.get(dateKey(stamp)) ?? 0;
          cells.push({ stamp, steps });
        }
      }
      const peak = Math.max(1, ...cells.map((item) => item.steps));
      const grid = element2("div", byWeek ? "hq-calendar hq-calendar-week" : "hq-calendar");
      for (const { stamp, steps } of cells) {
        const item = button2("hq-calendar-cell", "", () => drill(byWeek ? "week" : "day", stamp));
        item.dataset.level = steps ? String(Math.ceil(4 * Math.sqrt(steps / peak))) : "0";
        item.title = dateKey(stamp) + " \xB7 " + steps + " " + t("requests");
        item.setAttribute("aria-label", item.title);
        item.disabled = stamp > Date.now();
        grid.append(item);
      }
      return row("hq-calendar-section", element2("h3", "", t(byWeek ? "weeklyActivity" : "dailyActivity")), grid);
    }
    function iceberg(points, filter, t) {
      const chart = element2("div", "hq-iceberg-chart");
      const portions = points.map((point) => {
        const usage = showUsageStats(point.stats, filter)?.usage ?? tokens();
        return { point, fresh: tokenTotal2(usage) - usage.read, cached: usage.read };
      });
      const max = Math.max(1, ...portions.map((item) => Math.max(item.fresh, item.cached)));
      for (const { point, fresh, cached } of portions) {
        const column = element2("div", "hq-iceberg-column");
        const top = element2("div", "hq-iceberg-top");
        const bottom = element2("div", "hq-iceberg-bottom");
        const newBar = element2("span", "hq-iceberg-fresh");
        const cacheBar = element2("span", "hq-iceberg-cached");
        newBar.style.height = 100 * fresh / max + "%";
        cacheBar.style.height = 100 * cached / max + "%";
        top.append(newBar);
        bottom.append(cacheBar);
        column.title = point.caption + " \xB7 " + t("fresh") + " " + exact(fresh) + " \xB7 " + t("cacheRead") + " " + exact(cached);
        column.append(top, bottom, element2("span", "hq-iceberg-label", point.label));
        chart.append(column);
      }
      return row("hq-usage-chart", row(
        "hq-line",
        element2("h3", "", t("iceberg")),
        element2("span", "hq-muted", "\u25A0 " + t("fresh") + "  \u25A7 " + t("cacheRead"))
      ), chart);
    }
    function punchCard(points, models, t) {
      const records = points.map((point) => new Map((point.stats?.models ?? []).map((model) => [modelKey2(model.model), tokenTotal2(tokens(model.tokens))])));
      const peak = Math.max(1, ...records.flatMap((item) => [...item.values()]));
      const matrix = element2("div", "hq-punch-matrix");
      matrix.style.setProperty("--hq-columns", String(points.length));
      matrix.append(
        element2("span"),
        ...points.map((point) => element2("span", "hq-muted", point.label)),
        element2("span", "hq-muted", t("totalQuota"))
      );
      for (const model of models) {
        matrix.append(element2("strong", "hq-punch-label", modelName(model.model)));
        const id = modelKey2(model.model);
        for (const [index, record] of records.entries()) {
          const total = record.get(id) ?? 0;
          const size = total ? Math.max(3, Math.sqrt(total / peak) * 17) : 2;
          const dot = element2("span", "hq-punch-dot");
          dot.dataset.active = String(total > 0);
          dot.style.setProperty("--hq-size", size + "px");
          dot.title = modelName(model.model) + " \xB7 " + points[index].caption + " \xB7 " + exact(total) + " toks";
          matrix.append(dot);
        }
        matrix.append(element2("span", "hq-punch-total", compact2(tokenTotal2(tokens(model.tokens)))));
      }
      return row("hq-usage-chart", element2("h3", "", t("punch")), matrix);
    }
    function modelTable(models, t) {
      const table = element2("table", "hq-model-table");
      const labels = ["model", "tokenTotal", "uncached", "cacheRead", "cacheWrite", "output", "cacheRate", "cost"];
      const header = element2("tr");
      header.append(...labels.map((label) => element2("th", "", t(label))));
      const head = element2("thead");
      head.append(header);
      const body = element2("tbody");
      for (const item of models) {
        const usage = tokens(item.tokens);
        const values = [
          modelName(item.model),
          compact2(tokenTotal2(usage)),
          compact2(usage.input),
          compact2(usage.read),
          compact2(usage.write),
          compact2(outputSize(usage)),
          percent(cacheRate2(usage)),
          item.cost > 0 ? dollars.format(item.cost) : "\u2014"
        ];
        const line = element2("tr");
        line.append(...values.map((value) => element2("td", "", value)));
        line.title = exact(item.steps) + " " + t("requests") + " \xB7 " + exact(tokenTotal2(usage)) + " toks";
        body.append(line);
      }
      table.append(head, body);
      return row("hq-table-wrap", table);
    }
    function usageView2(reader, language, { narrow = false } = {}) {
      const t = language.t;
      const root = element2("section", narrow ? "hq-usage hq-usage-narrow" : "hq-usage");
      const [tab, setTab] = createSignal2("activity");
      const [unit, setUnit] = createSignal2("month");
      const [offset, setOffset] = createSignal2(0);
      const [filter, setFilter] = createSignal2("");
      const [data, setData] = createSignal2();
      const [failed, setFailed] = createSignal2(false);
      const [working, setWorking] = createSignal2(false);
      const [revision, setRevision] = createSignal2(0);
      let alive = true;
      let loadID = 0;
      onCleanup2(() => {
        alive = false;
      });
      function drill(granularity, date) {
        const now = Date.now();
        const change = granularity === "day" ? (dayStart(date) - dayStart(now)) / DAY : (weekStart(date) - weekStart(now)) / (7 * DAY);
        setUnit(granularity);
        setOffset(Math.min(0, change));
        setTab("breakdown");
      }
      createEffect2(() => {
        const mode = tab();
        const granularity = unit();
        const range = rangeFor(granularity, offset());
        const current = ++loadID;
        const active = () => alive && loadID === current;
        revision();
        setWorking(true);
        setFailed(false);
        void (async () => {
          try {
            const summary = await reader.refresh();
            if (!active()) return;
            if (mode === "activity") {
              setData({ summary, mode });
              return;
            }
            const selected = await reader.get(range.from, range.until);
            const points = await periodSeries(reader, range, selected, granularity, active);
            if (active()) setData({ summary, mode, range, selected, points });
          } catch {
            if (active()) setFailed(true);
          } finally {
            if (active()) setWorking(false);
          }
        })();
      });
      function refresh() {
        void reader.refresh(true).catch(() => {
        });
        setRevision((number) => number + 1);
      }
      createEffect2(() => {
        const view = data();
        const selectedTab = tab();
        const pending = working();
        const issue = failed();
        const controls = row(
          "hq-usage-top",
          element2("span", "hq-muted", t("local")),
          row("hq-actions", languagePicker(language), button2("hq-button", "\u21BB " + t("refresh"), refresh))
        );
        const nav = element2("div", "hq-usage-nav");
        for (const item of ["activity", "breakdown"]) {
          const control = button2("hq-tab", t(item), () => setTab(item));
          control.setAttribute("aria-pressed", String(selectedTab === item));
          nav.append(control);
        }
        const content = [controls, nav];
        if (issue || pending) content.push(element2(
          "div",
          "hq-muted hq-notice",
          issue ? t(view ? "failed" : "noData") : t("loading")
        ));
        if (view) {
          const summary = view.summary;
          const kpis = ["today", "week", "month", "all"].map((key) => block(t(key), compact2(tokenTotal2(tokens(summary[key]?.tokens))) + " toks"));
          const cost = summary.all?.cost;
          kpis.push(block(t("cost"), cost > 0 ? dollars.format(cost) : "\u2014", cost > 0 ? void 0 : t("noPrice")));
          content.push(row("hq-usage-kpis", ...kpis));
          if (selectedTab === "activity") {
            content.push(row(
              "hq-counters",
              block(t("activeDays"), exact(summary.all.activeDays)),
              block(t("streak"), exact(summary.all.streak)),
              block(t("requests"), exact(summary.all.steps))
            ));
            content.push(makeCalendar(summary.all, false, t, drill), makeCalendar(summary.all, true, t, drill));
          } else {
            const previous = button2("hq-button", "\u2039", () => setOffset((value) => value - 1));
            previous.setAttribute("aria-label", t("previous"));
            const next = button2("hq-button", "\u203A", () => setOffset((value) => value + 1));
            next.setAttribute("aria-label", t("next"));
            next.disabled = offset() >= 0;
            const range = rangeFor(unit(), offset());
            const toggle = element2("div", "hq-switch");
            for (const [key, label] of Object.entries(periodLabels)) {
              const control = button2("hq-switch-item", t(label), () => {
                setUnit(key);
                setOffset(0);
              });
              control.setAttribute("aria-pressed", String(unit() === key));
              toggle.append(control);
            }
            content.push(row(
              "hq-period",
              element2("h3", "", t("byModel")),
              row("hq-actions", previous, element2("span", "hq-period-date", range.label), next, toggle)
            ));
            if (view.mode === "breakdown" && view.range.label === range.label) {
              const models = selectModels(view.selected).sort((a, b) => tokenTotal2(tokens(b.tokens)) - tokenTotal2(tokens(a.tokens)));
              const choice = filter() && models.some((model) => modelKey2(model.model) === filter()) ? filter() : "";
              const options = row("hq-model-filters");
              for (const option of [{ id: "", label: t("allModels") }, ...models.map((model) => ({ id: modelKey2(model.model), label: modelName(model.model) }))]) {
                const toggle2 = button2("hq-button", option.label, () => setFilter(option.id));
                toggle2.setAttribute("aria-pressed", String(option.id === choice));
                options.append(toggle2);
              }
              const activeModels = selectModels(view.selected, choice);
              const shown = showUsageStats(view.selected, choice);
              content.push(options);
              if (shown?.steps > 0) {
                content.push(element2("p", "hq-muted", compact2(tokenTotal2(shown.usage)) + " toks \xB7 " + exact(shown.steps) + " " + t("requests")));
                content.push(iceberg(view.points, choice, t), punchCard(view.points, activeModels, t), modelTable(activeModels, t));
              } else {
                content.push(element2("p", "hq-muted hq-notice", t("noUsage")));
              }
            }
          }
          content.push(element2("p", "hq-muted hq-calendar-hint", t("calendarHint")));
        }
        root.replaceChildren(...content);
      });
      return root;
    }
    module2.exports = { readUsage: readUsage2, usageView: usageView2, showUsageStats };
  }
});

// src/quota-source.cjs
var require_quota_source = __commonJS({
  "src/quota-source.cjs"(exports2, module2) {
    "use strict";
    var { spawn } = require("node:child_process");
    var { readFile } = require("node:fs/promises");
    var { homedir } = require("node:os");
    var { join } = require("node:path");
    var { setTimeout: delay } = require("node:timers/promises");
    var WINDOWS = { "5h": 5 * 60 * 60 * 1e3, weekly: 7 * 24 * 60 * 60 * 1e3 };
    var PAGE_SIZE = 50;
    var MODEL = "gemini-4-hydrogen-xhigh";
    function localOrigin(value) {
      const url = new URL(value);
      const hosts = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "[::1]"]);
      if (!["http:", "https:"].includes(url.protocol) || !hosts.has(url.hostname) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
        throw new Error("proxyURL must be a localhost HTTP origin, such as http://127.0.0.1:7861");
      }
      return url.origin;
    }
    function filePath(path) {
      return path.startsWith("~/") ? join(homedir(), path.slice(2)) : path;
    }
    function balance(buckets, family, window2) {
      const item = buckets?.[family + "-" + window2];
      if (!Number.isFinite(item?.remaining)) return void 0;
      const remaining = Math.max(0, Math.min(1, item.remaining));
      const reset = Date.parse(item.resetTimeRaw);
      return { remaining, reset };
    }
    function lengthOfWindow(records, count, now) {
      const sum = records.reduce((total, record) => total + record.remaining, 0);
      const resets = records.map((record) => record.reset).filter(Number.isFinite).sort((a, b) => a - b);
      const nextReset = resets.find((reset) => reset > now) ?? resets[0];
      const round = (value) => Math.round(value * 1e3) / 10;
      return {
        known_accounts: records.length,
        enabled_accounts: count,
        capacity_percent: records.length * 100,
        sum_percent: records.length ? round(sum) : null,
        average_percent: records.length ? round(sum / records.length) : null,
        next_reset_at: nextReset === void 0 ? null : new Date(nextReset).toISOString()
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
    function createQuotaSource2(options = {}, fetcher = fetch) {
      const origin = localOrigin(options.proxyURL ?? "http://127.0.0.1:7861");
      const modelID = options.modelID ?? MODEL;
      const command = options.startCommand;
      if (command !== void 0 && (!Array.isArray(command) || !command.length || command.some((arg) => typeof arg !== "string") || !command[0].trim())) {
        throw new Error("startCommand must be an executable and arguments in an array");
      }
      let startup;
      let pending;
      let cached;
      async function isHealthy() {
        try {
          const response = await fetcher(origin + "/openapi.json", {
            redirect: "error",
            signal: AbortSignal.timeout(1500)
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
              stdio: "ignore",
              windowsHide: true,
              detached: true
            });
            child.once("error", reject);
            child.once("spawn", () => {
              child.unref();
              resolve();
            });
          });
          const deadline = Date.now() + 2e4;
          while (Date.now() < deadline) {
            if (await isHealthy()) return;
            await delay(350);
          }
          throw new Error("The configured local proxy did not start");
        })().finally(() => {
          startup = void 0;
        });
        return startup;
      }
      async function panelPassword() {
        const file = options.panelPasswordFile;
        const password = file ? (await readFile(filePath(file), "utf8")).trim() : process.env.AGY2API_PANEL_PASSWORD?.trim();
        if (!password) throw new Error("Set AGY2API_PANEL_PASSWORD or panelPasswordFile");
        return password;
      }
      async function fetchSummary(signal) {
        const password = await panelPassword();
        const signalForRequest = () => AbortSignal.any([AbortSignal.timeout(35e3), ...signal ? [signal] : []]);
        await start();
        async function get(path) {
          const response = await fetcher(origin + path, {
            headers: { Authorization: "Bearer " + password },
            redirect: "error",
            signal: signalForRequest()
          });
          if (!response.ok) {
            await response.body?.cancel();
            throw new Error("Local quota request failed (HTTP " + response.status + ")");
          }
          return response.json();
        }
        const accounts = /* @__PURE__ */ new Map();
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
        const rows = await mapConcurrent(pool, 3, async (email) => {
          try {
            const result = await get("/creds/quota/" + encodeURIComponent(email));
            return { email, models: result.success ? result.models : void 0 };
          } catch {
            return { email };
          }
        });
        signal?.throwIfAborted();
        const now = Date.now();
        function collect(family, window2) {
          return rows.flatMap((row) => {
            const item = balance(row.models, family, window2);
            return item ? [{ ...item, email: row.email }] : [];
          });
        }
        async function cycleUsage(records, duration) {
          const windows = records.filter((record) => Number.isFinite(record.reset) && record.reset > now && record.reset - duration <= now);
          const values = await mapConcurrent(windows, 3, async (record) => {
            const parameters = new URLSearchParams({
              start_timestamp: String((record.reset - duration) / 1e3),
              end_timestamp: String(now / 1e3),
              credential_email: record.email,
              model_name: modelID
            });
            try {
              const result = await get("/usage-logs/stats?" + parameters);
              return Number.isFinite(result.total_tokens) ? result.total_tokens : void 0;
            } catch {
              return void 0;
            }
          });
          const valid = values.filter(Number.isFinite);
          return {
            local_cycle_tokens: valid.length ? valid.reduce((sum, value) => sum + value, 0) : null,
            local_cycle_accounts: valid.length
          };
        }
        const totals = {};
        const thirdParty = {};
        for (const [window2, duration] of Object.entries(WINDOWS)) {
          const gemini = collect("gemini", window2);
          totals[window2] = lengthOfWindow(gemini, pool.length, now);
          thirdParty[window2] = lengthOfWindow(collect("3p", window2), pool.length, now);
          if (options.includeCycleUsage !== false) Object.assign(totals[window2], await cycleUsage(gemini, duration));
        }
        signal?.throwIfAborted();
        return {
          account_count: accounts.size,
          readable_accounts: rows.filter((row) => Object.keys(WINDOWS).some((window2) => balance(row.models, "gemini", window2))).length,
          updated_at: new Date(now).toISOString(),
          totals,
          third_party_totals: thirdParty
        };
      }
      function read(force = false, signal) {
        if (pending) return pending;
        if (cached && Date.now() - Date.parse(cached.updated_at) < (force ? 5e3 : 6e4)) return Promise.resolve(cached);
        pending = fetchSummary(signal).then((result) => {
          cached = result;
          return result;
        }).finally(() => {
          pending = void 0;
        });
        return pending;
      }
      return { read, start };
    }
    module2.exports = { createQuotaSource: createQuotaSource2 };
  }
});

// src/gui.cjs
var { Plugin, Ipc, Command, ComposerPill, MenuItem, Panel, SettingsPage, Slot, TitlebarItem, Style } = require("@opencode/plugin/gui");
var { Schema } = require("effect");
var { createSignal, createEffect, createMemo, createComponent, createRoot, runWithOwner, getOwner, onCleanup, untrack } = require("solid-js");
var css = require_dashboard();
var { cacheRate, tokenTotal, modelKey, contextStep, sessionMetrics, liveSpeed, descendants, quotaHistory } = require_metrics();
var { element, button, compact, speed, languageState, clock } = require_view();
var { speedCard, cacheCard, contextCard } = require_cards();
var { readUsage, usageView } = require_usage_view();
var { createQuotaSource } = require_quota_source();
var Quota = Ipc.define({
  id: "opencode-agy-dashboard.quota",
  methods: { read: { input: Schema.Boolean, output: Schema.String } }
});
var surfaces = [
  { id: "speed", icon: "waveform", make: speedCard },
  { id: "cache", icon: "server", make: cacheCard },
  { id: "context", icon: "status", make: contextCard }
];
function quotaState(ctx) {
  const api = ctx.main(Quota);
  const history = quotaHistory();
  const [quota, setQuota] = createSignal();
  const [quotaLoading, setLoading] = createSignal(false);
  const [quotaFailed, setFailed] = createSignal(false);
  async function refreshQuota(force = false) {
    if (quotaLoading() || ctx.signal.aborted) return;
    setLoading(true);
    try {
      const data = JSON.parse(await api.read(force, { signal: ctx.signal }));
      if (ctx.signal.aborted) return;
      history.record(data);
      setQuota(data);
      setFailed(false);
    } catch {
      if (!ctx.signal.aborted) setFailed(true);
    } finally {
      if (!ctx.signal.aborted) setLoading(false);
    }
  }
  void refreshQuota();
  const timer = setInterval(() => void refreshQuota(), 6e4);
  onCleanup(() => clearInterval(timer));
  return { quota, quotaLoading, quotaFailed, refreshQuota, forecast: history.forecast };
}
function currentSessionState(ctx) {
  const current = createMemo(() => ctx.sessions.current());
  const messages = () => {
    const session = current();
    return session?.server.data.session.message.list(session.id) ?? [];
  };
  const info = () => {
    const session = current();
    return session?.server.data.session.get(session.id);
  };
  const ticks = clock(500);
  const running = () => {
    const session = current();
    return session?.server.data.session.status(session.id) === "running";
  };
  const live = createMemo(() => running() ? liveSpeed(messages().at(-1), ticks()) : null);
  const key = createMemo(() => current()?.key);
  createEffect(() => {
    if (!key()) return;
    const session = untrack(current);
    void session.server.data.session.sync(session.id, { children: true }).catch(() => {
    });
  });
  const metrics = createMemo(() => {
    const session = current();
    const details = info();
    if (!session) return void 0;
    const timeline = messages();
    const model = contextStep(timeline, details?.revert?.messageID)?.model ?? details?.model;
    const host = session.server.data;
    const definition = session.location && host.location.model.list(session.location)?.find((item) => modelKey(item) === modelKey(model));
    const children = descendants(host.session.list(), session.id);
    const partial = host.session.message.more(session.id);
    return sessionMetrics(timeline, details, children, definition, partial);
  });
  return { current, info, metrics, running, live };
}
function pillTitle(state, id) {
  return "Hydrogen Extra \xB7 " + state.language.t(id);
}
function pillAppearance(state, surface) {
  const review = state.metrics();
  const t = state.language.t;
  const common = { icon: surface.icon, title: pillTitle(state, surface.id) };
  if (surface.id === "speed") {
    const estimate = state.live();
    const value = estimate ?? review?.average ?? review?.latest?.speed ?? review?.latest?.elapsedSpeed;
    const active = estimate != null;
    return {
      ...common,
      label: Number.isFinite(value) ? (active ? "\u2248" : "") + speed(value) + " tok/s" : state.running() ? t("working") : "\u2014 tok/s"
    };
  }
  if (surface.id === "cache") {
    const value = review?.family;
    const rate = value && cacheRate(value);
    return { ...common, label: value ? compact(tokenTotal(value)) + " toks \xB7 " + (rate == null ? "\u2014" : Math.round(rate) + "%") : "\u2014 toks" };
  }
  const used = review?.context.percent;
  const shown = Number.isFinite(used) ? Math.round(used) + "%" : "\u2014";
  const weekly = state.quota()?.totals?.weekly?.sum_percent;
  const quota = Number.isFinite(weekly) ? " \xB7 " + t("weekly") + " " + Math.round(weekly) + "%" : "";
  return { ...common, label: t("context") + " " + shown + quota, tone: used >= 80 ? "warning" : void 0 };
}
function installHover(state) {
  const owner = getOwner();
  let anchor;
  let popup;
  let dispose;
  let showTimer;
  let hideTimer;
  let observer;
  function close() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    observer?.disconnect();
    popup?.remove();
    dispose?.();
    anchor = popup = dispose = observer = void 0;
  }
  function position() {
    if (!anchor?.isConnected || !popup?.isConnected) return close();
    const bounds = anchor.getBoundingClientRect();
    const left = Math.max(8, Math.min(bounds.left, window.innerWidth - popup.offsetWidth - 8));
    const above = bounds.top - popup.offsetHeight - 6;
    const top = above >= 8 ? above : Math.max(8, Math.min(bounds.bottom + 6, window.innerHeight - popup.offsetHeight - 8));
    popup.style.left = left + "px";
    popup.style.top = top + "px";
  }
  function show(surface) {
    if (!anchor?.isConnected || anchor.getAttribute("aria-expanded") === "true") return close();
    runWithOwner(owner, () => createRoot((cleanup) => {
      dispose = cleanup;
      popup = element("div", "hq-hover");
      popup.setAttribute("role", "region");
      popup.setAttribute("aria-label", pillTitle(state, surface.id));
      popup.append(surface.make(state, close));
      popup.addEventListener("pointerenter", () => clearTimeout(hideTimer));
      popup.addEventListener("pointerleave", scheduleClose);
      document.body.append(popup);
      observer = new ResizeObserver(position);
      observer.observe(popup);
      position();
    }));
  }
  function scheduleClose() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(close, 210);
  }
  function find(target) {
    if (!(target instanceof Element)) return;
    const control = target.closest("button[aria-label]");
    const title = control?.getAttribute("aria-label");
    const surface = surfaces.find((item) => title === pillTitle(state, item.id));
    if (surface) return { control, surface };
  }
  function enter(event) {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const hit = find(event.target);
    if (!hit || hit.control.contains(event.relatedTarget)) return;
    const delay = popup ? 0 : 250;
    close();
    anchor = hit.control;
    showTimer = setTimeout(() => show(hit.surface), delay);
  }
  function leave(event) {
    if (!anchor?.contains(event.target) || anchor.contains(event.relatedTarget)) return;
    scheduleClose();
  }
  function click(event) {
    if (anchor && !popup?.contains(event.target)) close();
  }
  function key(event) {
    if (event.key === "Escape") close();
  }
  document.addEventListener("pointerover", enter);
  document.addEventListener("pointerout", leave);
  document.addEventListener("pointerdown", click, true);
  document.addEventListener("keydown", key);
  window.addEventListener("resize", position);
  createEffect(() => {
    state.current()?.key;
    close();
  });
  onCleanup(() => {
    close();
    document.removeEventListener("pointerover", enter);
    document.removeEventListener("pointerout", leave);
    document.removeEventListener("pointerdown", click, true);
    document.removeEventListener("keydown", key);
    window.removeEventListener("resize", position);
  });
}
function setupMain(ctx) {
  const source = createQuotaSource(ctx.options);
  ctx.provide(Quota, {
    read: async (force, caller) => JSON.stringify(await source.read(force, caller.signal))
  });
  void source.start().catch(() => ctx.log.write("warn", "The configured local proxy did not start"));
}
module.exports.default = Plugin.define({
  setup(ctx) {
    const language = languageState();
    const usage = readUsage(ctx);
    const state = { ...quotaState(ctx), ...currentSessionState(ctx), language, usage };
    function dialog(title, make, size = "fit") {
      return ctx.dialogs.open((handle) => createComponent(ctx.ui.Dialog, {
        title,
        size,
        get children() {
          return make(handle.close);
        }
      }));
    }
    function openCard(surface) {
      dialog(pillTitle(state, surface.id), (close) => surface.make(state, close));
    }
    state.openUsage = () => dialog(language.t("stats"), () => usageView(usage, language), "x-large");
    ctx.add(Style, css);
    for (const surface of surfaces) {
      ctx.add(ComposerPill, {
        id: surface.id,
        show: (input) => input.session.key === state.current()?.key ? pillAppearance(state, surface) : void 0,
        menu: (input) => surface.make(state, input.close)
      });
    }
    installHover(state);
    ctx.add(Command, () => ({
      id: "quota",
      title: pillTitle(state, "quota"),
      slash: { name: "quota" },
      featured: true,
      run: () => openCard(surfaces[2])
    }));
    ctx.add(Command, () => ({
      id: "stats",
      title: language.t("dashboard"),
      slash: { name: "token-usage" },
      featured: true,
      run: state.openUsage
    }));
    ctx.add(TitlebarItem, () => ({
      id: "stats",
      label: language.t("dashboard"),
      icon: "window-analytics",
      run: state.openUsage
    }));
    ctx.add(SettingsPage, {
      id: "hydrogen-quota",
      get title() {
        return pillTitle(state, "quota");
      },
      icon: "status",
      render: () => contextCard(state)
    });
    const statsTab = { id: "stats", get title() {
      return language.t("stats");
    }, closable: "compact" };
    ctx.add(Panel, {
      id: "stats",
      region: "side",
      width: 490,
      list: (input) => input.open.includes("stats") ? [statsTab] : [],
      render: () => usageView(usage, language, { narrow: true })
    });
    ctx.add(MenuItem, () => {
      const session = state.current();
      if (!session) return void 0;
      const key = ctx.id + ":stats";
      return {
        id: "stats",
        menu: "session.panel",
        title: language.t("stats"),
        icon: "window-analytics",
        opened: ctx.layout.state(key, session) !== "closed",
        run: () => ctx.layout.open(key, session)
      };
    });
    ctx.add(Slot, {
      at: "session.header",
      order: 40,
      render(input) {
        const strip = element("div", "hq-subagent-strip");
        const controls = surfaces.map((surface) => button("hq-subagent-pill", "", () => openCard(surface)));
        strip.append(...controls);
        createEffect(() => {
          strip.hidden = !input.active || !state.info()?.parentID || input.session.key !== state.current()?.key;
          if (strip.hidden) return;
          for (const [index, surface] of surfaces.entries()) {
            const view = pillAppearance(state, surface);
            controls[index].textContent = view.label;
            controls[index].setAttribute("aria-label", view.title);
          }
        });
        return strip;
      }
    });
  },
  main: setupMain
});
