"use strict";

const { createEffect, createSignal } = require("solid-js");
const { MINUTE, cacheRate, tokenTotal, outputSize, tokens } = require("./metrics.cjs");
const { element, button, row, block, compact, exact, percent, speed, duration, clock, languagePicker } = require("./view.cjs");

const windows = [["5h", "quotaShort", "◷"], ["weekly", "quotaWeek", "▦"]];
const updateTime = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

function heading(icon, label, extra) {
  const title = row("hq-card-title", element("span", "hq-icon", icon), element("span", "", label));
  return extra ? row("hq-card-head", title, extra) : row("hq-card-head", title);
}

function progress(fraction, tone, projected) {
  const bar = element("div", "hq-track");
  const shown = Number.isFinite(fraction) ? Math.min(100, Math.max(0, fraction)) : 0;
  const fill = element("div", "hq-fill");
  fill.dataset.tone = tone ?? "normal";
  fill.style.width = shown + "%";
  bar.setAttribute("aria-hidden", "true");
  bar.append(fill);
  if (Number.isFinite(projected) && projected < shown) {
    const stripe = element("span", "hq-striped");
    stripe.style.left = Math.max(0, projected) + "%";
    stripe.style.width = shown - Math.max(0, projected) + "%";
    bar.append(stripe);
  }
  return bar;
}

function sparkline(values) {
  const chart = element("canvas", "hq-spark");
  chart.width = 330;
  chart.height = 94;
  chart.title = values.map(value => speed(value)).join(" · ") + " tok/s";
  const context = chart.getContext("2d");
  if (!context || !values.length) return chart;
  const width = chart.width;
  const height = chart.height;
  const peak = Math.max(1, ...values);
  const points = values.map((value, index) => [
    5 + (width - 10) * index / Math.max(1, values.length - 1),
    height - 5 - (height - 16) * value / peak,
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

function speedCard(state) {
  const { language: { t, index }, metrics, running, live } = state;
  const card = element("section", "hq-card hq-speed-card");
  const headline = element("div", "hq-card-head");
  const label = row("hq-card-title", element("span", "hq-icon", "∿"), element("span"));
  const [averageView, setAverageView] = createSignal(false);
  const latestControl = button("hq-switch-item", "", () => setAverageView(false));
  const averageControl = button("hq-switch-item", "", () => setAverageView(true));
  const switcher = row("hq-switch", latestControl, averageControl);
  headline.append(label, switcher);
  const detail = element("div");
  card.append(headline, detail);

  createEffect(() => {
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

    const hero = row("hq-speed-hero", row("hq-number-with-unit",
      element("strong", "hq-number", (partial ? "≈" : "") + speed(rate)),
      element("span", "hq-muted", "tok/s")), sparkline(review?.rates ?? []));
    const firstToken = last?.ttftMs ? duration(last.ttftMs, index() === 1) : "—";
    const stats = row("hq-three hq-divider",
      block(t("weighted"), speed(review?.average) + " tok/s"),
      block(t("firstToken"), firstToken),
      block(t("peak"), speed(review?.peak) + " tok/s"));
    const totals = row("hq-three hq-divider",
      block(t("modelTime"), duration(review?.modelMs, index() === 1)),
      block(t("toolTime"), duration(review?.toolMs, index() === 1)),
      block(t("streamTime"), duration(review?.streamMs, index() === 1)));
    const content = [hero, stats, totals];
    if (review) {
      const info = row("hq-line hq-muted hq-speed-note",
        element("span", "", review.prompts + " " + t("prompts") + " · " + review.steps + " " + t("steps") + " · " + review.samples + " " + t("samples")),
        element("span", "", exact(last?.generated) + " toks"));
      content.push(info, element("p", "hq-muted hq-compact-note", t("toolCalls") + " " + review.toolCalls));
    }
    if (active) content.push(element("p", "hq-muted hq-compact-note", t(partial ? "estimates" : "working")));
    if (!active && !review?.latest) content.push(element("p", "hq-muted hq-compact-note", t("listening")));
    if (!active && last?.speed == null && last?.elapsedSpeed != null && !useAverage) {
      content.push(element("p", "hq-muted hq-compact-note", t("elapsed")));
    }
    if (review?.partial) content.push(element("p", "hq-muted hq-compact-note", t("partialSteps")));
    detail.replaceChildren(...content);
  });
  return card;
}

function tokenSegments(value) {
  const total = tokenTotal(value);
  const track = element("div", "hq-track hq-segments");
  if (!total) return track;
  for (const key of ["read", "input", "write", "thinking", "output"]) {
    const fill = element("span", "hq-segment");
    fill.dataset.kind = key;
    fill.style.width = value[key] / total * 100 + "%";
    track.append(fill);
  }
  return track;
}

function cacheCard(state, close = () => {}) {
  const { language: { t }, metrics, usage, openUsage } = state;
  const card = element("section", "hq-card hq-cache-card");
  const detail = element("div");
  const open = button("hq-text-button", "", () => { close(); openUsage(); });
  card.append(detail, row("hq-card-footer", open));
  void usage.refresh().catch(() => {});

  createEffect(() => {
    const review = metrics();
    const value = review?.family ?? tokens();
    const balance = tokenTotal(value);
    const rate = percent(cacheRate(value));
    const large = row("hq-line hq-cache-hero", row("hq-number-with-unit",
      element("strong", "hq-number", exact(balance)), element("span", "hq-muted", "toks")),
      element("span", "hq-chip hq-accent-chip", rate));
    large.title = t("cacheRate") + " " + rate;
    const parts = row("hq-three hq-divider",
      block(t("cacheRead"), compact(value.read) + " toks", exact(value.read)),
      block(t("uncached"), compact(value.input) + " toks", exact(value.input)),
      block(t("output"), compact(outputSize(value)) + " toks", exact(outputSize(value))));
    const extra = row("hq-line hq-muted hq-cache-note",
      element("span", "", t("cacheWrite") + " " + compact(value.write)),
      element("span", "", t("reasoning") + " " + compact(value.thinking)));
    const content = [heading("▤", t("cache")), large, tokenSegments(value), parts, extra];
    if (review?.subagents) {
      content.push(row("hq-two hq-divider",
        block(t("currentAgent"), compact(tokenTotal(review.direct)) + " toks"),
        block(t("subagents") + " (" + review.subagents + ")", compact(tokenTotal(review.delegated)) + " toks")));
    }
    const base = usage.summary();
    if (base) {
      content.push(row("hq-two hq-divider",
        block(t("today"), compact(tokenTotal(tokens(base.today.tokens))) + " toks"),
        block(t("month"), compact(tokenTotal(tokens(base.month.tokens))) + " toks")));
    }
    detail.replaceChildren(...content);
    open.textContent = t("openUsage") + " ›";
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
  const labelNode = element("span", "hq-window-title", icon + " " + t(label));
  const reset = element("span", "hq-accent", resetLabel(total?.next_reset_at, now, language));
  const amount = element("strong", "hq-window-number", percent(normalized));
  const window = row("hq-window", row("hq-line", labelNode, row("hq-values", reset, amount)));
  window.append(progress(normalized, normalized < 20 ? "low" : "", projected?.remainingAtReset));
  const sumText = Number.isFinite(sum) ? t("totalQuota") + " " + percent(sum) + " / " + total.capacity_percent + "%" : t("noData");
  const scope = read < registered ? read + "/" + registered + " " + t("fetched") : "";
  window.append(row("hq-line hq-muted hq-quota-total",
    element("span", "", sumText), element("span", "", scope)));

  if (projected) {
    const estimate = projected.beforeReset
      ? t("runsOut") + " " + (projected.untilEmpty > MINUTE ? duration(projected.untilEmpty, language.index() === 1) : "< 1m")
      : t("projected") + " ~" + percent(projected.remainingAtReset);
    window.append(element("div", projected.beforeReset ? "hq-warn hq-quota-detail" : "hq-muted hq-quota-detail", estimate));
  }
  if (Number.isFinite(total?.local_cycle_tokens)) {
    const period = row("hq-line hq-muted hq-quota-detail",
      element("span", "", t("cycleTokens")), element("strong", "", compact(total.local_cycle_tokens) + " toks"));
    period.title = t("cycleTokensHint");
    window.append(period);
  }
  return window;
}

function contextCard(state) {
  const { language, metrics, quota } = state;
  const { t } = language;
  const now = clock(15_000);
  const [thirdOpen, setThirdOpen] = createSignal(false);
  const card = element("section", "hq-card hq-context-card");
  const context = element("div");
  const primary = element("div", "hq-quota-group");
  const secondary = element("div", "hq-secondary");
  const other = button("hq-secondary-toggle", "", () => setThirdOpen(value => !value));
  const expanded = element("div", "hq-secondary-detail");
  secondary.append(other, expanded);
  const refresh = button("hq-text-button", "", () => void state.refreshQuota(true));
  const footer = row("hq-card-footer", languagePicker(language), refresh);
  card.append(context, primary, secondary, footer);

  createEffect(() => {
    const usage = metrics()?.context;
    const title = heading("◷", t("context"), element("span", "hq-muted hq-context-model", usage?.name ?? "Hydrogen Extra"));
    const shown = Number.isFinite(usage?.percent) ? Math.round(usage.percent) + "% " + t("used") : "—";
    const amounts = element("span", "hq-muted", usage?.occupied != null && usage.capacity
      ? compact(usage.occupied) + " / " + compact(usage.capacity) + " toks" : "");
    const values = row("hq-values", amounts);
    if (usage?.compacted) {
      const compacted = element("span", "hq-chip", "↕ " + usage.compacted + "×");
      compacted.title = usage.compacted + " " + t("compactions");
      values.prepend(compacted);
    }
    context.replaceChildren(title, row("hq-line hq-context-hero", element("strong", "hq-context-used", shown), values),
      progress(usage?.percent, usage?.percent >= 80 ? "low" : ""));
  });

  createEffect(() => {
    const data = quota();
    const timestamp = now();
    const forecasts = windows.map(([key]) => state.forecast(key, data?.totals?.[key], timestamp));
    const low = forecasts.some(item => item?.beforeReset) || windows.some(([key]) => {
      const remaining = data?.totals?.[key]?.average_percent;
      return Number.isFinite(remaining) && remaining < 20;
    });
    const status = data ? data.account_count + " " + t("accounts") : t(state.quotaFailed() ? "noData" : "loading");
    const title = row("hq-line hq-quota-title", row("hq-values", element("span", "hq-dot"), element("strong", "", "Gemini")),
      element("span", low ? "hq-chip hq-warn-chip" : "hq-muted", low ? t("low") : status));
    const details = windows.map(([key, label, icon], index) =>
      quotaWindow(state, data, key, label, icon, timestamp, forecasts[index]));
    primary.replaceChildren(title, ...details);
    if (data && !forecasts.some(Boolean) && !state.quotaFailed()) {
      primary.append(element("div", "hq-muted hq-quota-detail", t("calibrating")));
    }
  });

  createEffect(() => {
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
      return row("hq-secondary-meter", element("span", "", label), mini);
    });
    other.replaceChildren(element("strong", "", "Claude / GPT"), ...quick);
    other.setAttribute("aria-expanded", String(expandedNow));
    expanded.hidden = !expandedNow;
    if (expandedNow) {
      const thirdQuota = { totals: third, account_count: data.account_count };
      expanded.replaceChildren(...windows.map(([key, label, icon]) =>
        quotaWindow(state, thirdQuota, key, label, icon, now())));
    }
  });

  createEffect(() => {
    const data = quota();
    const fetching = state.quotaLoading();
    const time = Date.parse(data?.updated_at);
    refresh.disabled = fetching;
    refresh.textContent = fetching ? t("loading") : "↻ " + t("refresh");
    refresh.title = state.quotaFailed() ? t(data ? "failed" : "noData")
      : Number.isFinite(time) ? updateTime.format(time) + " " + t("updated") : t("quota");
    if (state.quotaFailed()) refresh.dataset.failed = "true";
    else delete refresh.dataset.failed;
  });
  return card;
}

module.exports = { speedCard, cacheCard, contextCard };
