"use strict";

const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const SHANGHAI = 8 * HOUR;
const TZ = "Asia/Shanghai";

function count(value) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function tokens(value) {
  return {
    input: count(value?.input),
    read: count(value?.cache?.read),
    write: count(value?.cache?.write),
    output: count(value?.output),
    thinking: count(value?.reasoning),
  };
}

function addTokens(list) {
  const total = tokens();
  for (const value of list) {
    for (const key of Object.keys(total)) total[key] += value[key];
  }
  return total;
}

const inputSize = value => value.input + value.read + value.write;
const outputSize = value => value.output + value.thinking;
const tokenTotal = value => inputSize(value) + outputSize(value);
const cacheRate = value => inputSize(value) ? 100 * value.read / inputSize(value) : null;
const modelKey = model => model ? model.providerID + "/" + model.id : "";

function contextStep(messages, boundary) {
  const end = boundary ? messages.findIndex(message => message.id === boundary) : messages.length;
  for (let i = end - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.type === "compaction" && message.status === "completed") break;
    if (message.type === "assistant" && message.tokens && !message.error) return message;
  }
}

function toolDuration(parts) {
  const tools = parts.filter(part => part.type === "tool");
  const durations = tools.map(part => {
    const start = part.time?.ran ?? part.time?.created;
    return count(part.time?.completed - start);
  });
  return { count: tools.length, took: durations.reduce((a, b) => a + b, 0) };
}

function sessionMetrics(messages, info, subagents, model, partial) {
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
      usage,
    };
    if (latest.speed !== null) rates.push(latest);
  }

  const direct = info?.tokens ? tokens(info.tokens) : addTokens(messageTokens);
  const delegated = addTokens(subagents.map(agent => tokens(agent.tokens)));
  const used = contextStep(messages, info?.revert?.messageID);
  const capacity = count(model?.limit?.context);
  const occupied = used ? inputSize(tokens(used.tokens)) : null;
  const context = {
    name: model?.name ?? used?.model?.id ?? info?.model?.id ?? "Hydrogen Extra",
    occupied,
    capacity,
    percent: occupied !== null && capacity ? 100 * occupied / capacity : null,
    compacted,
  };
  const allGenerated = rates.reduce((sum, item) => sum + item.generated, 0);
  const streamMs = rates.reduce((sum, item) => sum + item.generationMs, 0);
  return {
    latest, rates: rates.slice(-18).map(item => item.speed),
    average: streamMs ? allGenerated * SECOND / streamMs : null,
    peak: rates.reduce((peak, item) => Math.max(peak, item.speed), 0) || null,
    samples: rates.length, streamMs, modelMs, toolMs, toolCalls, prompts, steps,
    direct, delegated, family: addTokens([direct, delegated]), subagents: subagents.length,
    context, partial,
  };
}

function liveSpeed(message, now) {
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

function descendants(sessions, root) {
  const byParent = new Map();
  for (const session of sessions) {
    if (!session.parentID) continue;
    if (!byParent.has(session.parentID)) byParent.set(session.parentID, []);
    byParent.get(session.parentID).push(session);
  }
  const seen = new Set([root]);
  const result = [];
  const pending = [...(byParent.get(root) ?? [])];
  for (const session of pending) {
    if (seen.has(session.id)) continue;
    seen.add(session.id);
    result.push(session);
    pending.push(...(byParent.get(session.id) ?? []));
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
  return day - ((localDate(day).getUTCDay() + 6) % 7) * DAY;
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
    const from = dayStart(now) + offset * DAY;
    return { from, until: from + DAY, step: 3 * HOUR, label: dateKey(from) };
  }
  if (unit === "week") {
    const from = weekStart(now) + offset * 7 * DAY;
    return { from, until: from + 7 * DAY, step: DAY, label: dateKey(from) + " – " + dateKey(from + 6 * DAY) };
  }
  const from = monthStart(now, offset);
  return { from, until: monthStart(now, offset + 1), step: DAY, label: dateKey(from).slice(0, 7) };
}

function quotaHistory() {
  const histories = new Map();

  function record(snapshot) {
    const timestamp = Date.parse(snapshot.updated_at);
    if (!Number.isFinite(timestamp)) return;
    for (const [key, window] of Object.entries(snapshot.totals ?? {})) {
      if (!Number.isFinite(window.average_percent) || window.known_accounts !== snapshot.account_count) {
        histories.delete(key);
        continue;
      }
      const signature = [window.capacity_percent, window.next_reset_at].join(":");
      let history = histories.get(key);
      const previous = history?.samples.at(-1);
      if (!history || history.signature !== signature || window.average_percent > previous?.remaining + 0.4) {
        history = { signature, samples: [] };
        histories.set(key, history);
      }
      if (history.samples.at(-1)?.time >= timestamp) continue;
      history.samples.push({ time: timestamp, remaining: window.average_percent });
      history.samples = history.samples.filter(sample => sample.time >= timestamp - HOUR).slice(-30);
    }
  }

  function forecast(key, window, now) {
    const samples = histories.get(key)?.samples ?? [];
    const first = samples[0];
    const last = samples.at(-1);
    const reset = Date.parse(window?.next_reset_at);
    if (samples.length < 3 || last.time - first.time < 5 * MINUTE || reset <= now || !Number.isFinite(reset)) return null;
    const spent = first.remaining - last.remaining;
    if (spent < 0.75 || now - last.time > 3 * MINUTE) return null;
    const rate = spent / (last.time - first.time);
    const remaining = Math.max(0, last.remaining - (now - last.time) * rate);
    const untilEmpty = remaining / rate;
    return {
      remainingAtReset: Math.max(0, remaining - (reset - now) * rate),
      untilEmpty,
      beforeReset: untilEmpty < reset - now,
    };
  }

  return { record, forecast };
}

module.exports = {
  SECOND, MINUTE, HOUR, DAY, TZ, count, tokens, addTokens, inputSize, outputSize, tokenTotal, cacheRate, modelKey,
  contextStep, sessionMetrics, liveSpeed, descendants, localDate, dayStart, weekStart, monthStart, dateKey, rangeFor, quotaHistory,
};
