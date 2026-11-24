"use strict";

const { createEffect, createSignal, onCleanup } = require("solid-js");
const { DAY, TZ, tokens, tokenTotal, outputSize, cacheRate, modelKey, addTokens,
  dayStart, weekStart, monthStart, dateKey, localDate, rangeFor } = require("./metrics.cjs");
const { element, button, row, block, compact, exact, percent, languagePicker } = require("./view.cjs");

const HYDROGEN = "antigravity/gemini-4-hydrogen-xhigh";
const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const periodLabels = { day: "day", week: "weekly", month: "monthly" };

function readUsage(ctx) {
  const known = new Map();
  const [summary, setSummary] = createSignal();
  let loading;
  function get(from, until) {
    const now = Date.now();
    const key = [from, until].join(":");
    const previous = known.get(key);
    if (previous && now - previous.time < 60_000) return previous.value;
    const to = until === undefined ? undefined : Math.min(now, until - 1);
    const value = ctx.client.session.stats({ from, to, timezone: TZ, tools: "none" }, {
      signal: AbortSignal.any([ctx.signal, AbortSignal.timeout(20_000)]),
    }).catch(error => {
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
    loading = Promise.all([get(dayStart(now)), get(weekStart(now)), get(monthStart(now)), get()])
      .then(([today, week, month, all]) => {
        const result = { today, week, month, all };
        setSummary(result);
        return result;
      })
      .finally(() => { loading = undefined; });
    return loading;
  }
  return { get, refresh, summary };
}

function modelName(model) {
  return modelKey(model) === HYDROGEN ? "Hydrogen Extra" : model?.id ?? "—";
}

function selectModels(stats, filter) {
  return (stats?.models ?? []).filter(model => !filter || modelKey(model.model) === filter);
}

function showUsageStats(stats, filter) {
  if (!stats) return undefined;
  if (!filter) return { usage: tokens(stats.tokens), cost: stats.cost, steps: stats.steps };
  const models = selectModels(stats, filter);
  return {
    usage: addTokens(models.map(model => tokens(model.tokens))),
    cost: models.reduce((sum, model) => sum + (model.cost ?? 0), 0),
    steps: models.reduce((sum, model) => sum + (model.steps ?? 0), 0),
  };
}

async function periodSeries(reader, period, summary, unit, active) {
  const now = Date.now();
  const dates = new Set((summary?.activity ?? []).filter(item => item.steps > 0).map(item => item.date));
  const points = [];
  for (let from = period.from; from < period.until; from += period.step) {
    const until = Math.min(from + period.step, period.until);
    const date = localDate(from);
    const label = unit === "day" ? String(date.getUTCHours()).padStart(2, "0") : String(date.getUTCDate());
    const caption = unit === "day" ? dateKey(from) + " " + label + ":00" : dateKey(from);
    points.push({ from, until, label, caption, populated: from <= now && dates.has(dateKey(from)) });
  }
  for (let i = 0; i < points.length && active(); i += 3) {
    await Promise.all(points.slice(i, i + 3).filter(point => point.populated).map(async point => {
      point.stats = await reader.get(point.from, point.until);
    }));
  }
  return points;
}

function makeCalendar(all, byWeek, t, drill) {
  const days = new Map((all.activity ?? []).map(item => [item.date, item.steps]));
  const weeks = byWeek ? 26 : 16;
  const current = weekStart(Date.now());
  const first = current - (weeks - 1) * 7 * DAY;
  const cells = [];
  for (let column = 0; column < weeks; column++) {
    const week = first + column * 7 * DAY;
    for (let day = 0; day < (byWeek ? 1 : 7); day++) {
      const stamp = week + day * DAY;
      const steps = byWeek
        ? Array.from({ length: 7 }, (_, n) => days.get(dateKey(stamp + n * DAY)) ?? 0).reduce((a, b) => a + b, 0)
        : days.get(dateKey(stamp)) ?? 0;
      cells.push({ stamp, steps });
    }
  }
  const peak = Math.max(1, ...cells.map(item => item.steps));
  const grid = element("div", byWeek ? "hq-calendar hq-calendar-week" : "hq-calendar");
  for (const { stamp, steps } of cells) {
    const item = button("hq-calendar-cell", "", () => drill(byWeek ? "week" : "day", stamp));
    item.dataset.level = steps ? String(Math.ceil(4 * Math.sqrt(steps / peak))) : "0";
    item.title = dateKey(stamp) + " · " + steps + " " + t("requests");
    item.setAttribute("aria-label", item.title);
    item.disabled = stamp > Date.now();
    grid.append(item);
  }
  return row("hq-calendar-section", element("h3", "", t(byWeek ? "weeklyActivity" : "dailyActivity")), grid);
}

function iceberg(points, filter, t) {
  const chart = element("div", "hq-iceberg-chart");
  const portions = points.map(point => {
    const usage = showUsageStats(point.stats, filter)?.usage ?? tokens();
    return { point, fresh: tokenTotal(usage) - usage.read, cached: usage.read };
  });
  const max = Math.max(1, ...portions.map(item => Math.max(item.fresh, item.cached)));
  for (const { point, fresh, cached } of portions) {
    const column = element("div", "hq-iceberg-column");
    const top = element("div", "hq-iceberg-top");
    const bottom = element("div", "hq-iceberg-bottom");
    const newBar = element("span", "hq-iceberg-fresh");
    const cacheBar = element("span", "hq-iceberg-cached");
    newBar.style.height = 100 * fresh / max + "%";
    cacheBar.style.height = 100 * cached / max + "%";
    top.append(newBar);
    bottom.append(cacheBar);
    column.title = point.caption + " · " + t("fresh") + " " + exact(fresh) + " · " + t("cacheRead") + " " + exact(cached);
    column.append(top, bottom, element("span", "hq-iceberg-label", point.label));
    chart.append(column);
  }
  return row("hq-usage-chart", row("hq-line", element("h3", "", t("iceberg")),
    element("span", "hq-muted", "■ " + t("fresh") + "  ▧ " + t("cacheRead"))), chart);
}

function punchCard(points, models, t) {
  const records = points.map(point => new Map((point.stats?.models ?? [])
    .map(model => [modelKey(model.model), tokenTotal(tokens(model.tokens))])));
  const peak = Math.max(1, ...records.flatMap(item => [...item.values()]));
  const matrix = element("div", "hq-punch-matrix");
  matrix.style.setProperty("--hq-columns", String(points.length));
  matrix.append(element("span"), ...points.map(point => element("span", "hq-muted", point.label)),
    element("span", "hq-muted", t("totalQuota")));
  for (const model of models) {
    matrix.append(element("strong", "hq-punch-label", modelName(model.model)));
    const id = modelKey(model.model);
    for (const [index, record] of records.entries()) {
      const total = record.get(id) ?? 0;
      const size = total ? Math.max(3, Math.sqrt(total / peak) * 17) : 2;
      const dot = element("span", "hq-punch-dot");
      dot.dataset.active = String(total > 0);
      dot.style.setProperty("--hq-size", size + "px");
      dot.title = modelName(model.model) + " · " + points[index].caption + " · " + exact(total) + " toks";
      matrix.append(dot);
    }
    matrix.append(element("span", "hq-punch-total", compact(tokenTotal(tokens(model.tokens)))));
  }
  return row("hq-usage-chart", element("h3", "", t("punch")), matrix);
}

function modelTable(models, t) {
  const table = element("table", "hq-model-table");
  const labels = ["model", "tokenTotal", "uncached", "cacheRead", "cacheWrite", "output", "cacheRate", "cost"];
  const header = element("tr");
  header.append(...labels.map(label => element("th", "", t(label))));
  const head = element("thead");
  head.append(header);
  const body = element("tbody");
  for (const item of models) {
    const usage = tokens(item.tokens);
    const values = [
      modelName(item.model), compact(tokenTotal(usage)), compact(usage.input), compact(usage.read),
      compact(usage.write), compact(outputSize(usage)), percent(cacheRate(usage)),
      item.cost > 0 ? dollars.format(item.cost) : "—",
    ];
    const line = element("tr");
    line.append(...values.map(value => element("td", "", value)));
    line.title = exact(item.steps) + " " + t("requests") + " · " + exact(tokenTotal(usage)) + " toks";
    body.append(line);
  }
  table.append(head, body);
  return row("hq-table-wrap", table);
}

function usageView(reader, language, { narrow = false } = {}) {
  const t = language.t;
  const root = element("section", narrow ? "hq-usage hq-usage-narrow" : "hq-usage");
  const [tab, setTab] = createSignal("activity");
  const [unit, setUnit] = createSignal("month");
  const [offset, setOffset] = createSignal(0);
  const [filter, setFilter] = createSignal("");
  const [data, setData] = createSignal();
  const [failed, setFailed] = createSignal(false);
  const [working, setWorking] = createSignal(false);
  const [revision, setRevision] = createSignal(0);
  let alive = true;
  let loadID = 0;
  onCleanup(() => { alive = false; });

  function drill(granularity, date) {
    const now = Date.now();
    const change = granularity === "day" ? (dayStart(date) - dayStart(now)) / DAY
      : (weekStart(date) - weekStart(now)) / (7 * DAY);
    setUnit(granularity);
    setOffset(Math.min(0, change));
    setTab("breakdown");
  }

  createEffect(() => {
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
    void reader.refresh(true).catch(() => {});
    setRevision(number => number + 1);
  }

  createEffect(() => {
    const view = data();
    const selectedTab = tab();
    const pending = working();
    const issue = failed();
    const controls = row("hq-usage-top", element("span", "hq-muted", t("local")),
      row("hq-actions", languagePicker(language), button("hq-button", "↻ " + t("refresh"), refresh)));
    const nav = element("div", "hq-usage-nav");
    for (const item of ["activity", "breakdown"]) {
      const control = button("hq-tab", t(item), () => setTab(item));
      control.setAttribute("aria-pressed", String(selectedTab === item));
      nav.append(control);
    }
    const content = [controls, nav];
    if (issue || pending) content.push(element("div", "hq-muted hq-notice",
      issue ? t(view ? "failed" : "noData") : t("loading")));
    if (view) {
      const summary = view.summary;
      const kpis = ["today", "week", "month", "all"].map(key =>
        block(t(key), compact(tokenTotal(tokens(summary[key]?.tokens))) + " toks"));
      const cost = summary.all?.cost;
      kpis.push(block(t("cost"), cost > 0 ? dollars.format(cost) : "—", cost > 0 ? undefined : t("noPrice")));
      content.push(row("hq-usage-kpis", ...kpis));
      if (selectedTab === "activity") {
        content.push(row("hq-counters", block(t("activeDays"), exact(summary.all.activeDays)),
          block(t("streak"), exact(summary.all.streak)), block(t("requests"), exact(summary.all.steps))));
        content.push(makeCalendar(summary.all, false, t, drill), makeCalendar(summary.all, true, t, drill));
      } else {
        const previous = button("hq-button", "‹", () => setOffset(value => value - 1));
        previous.setAttribute("aria-label", t("previous"));
        const next = button("hq-button", "›", () => setOffset(value => value + 1));
        next.setAttribute("aria-label", t("next"));
        next.disabled = offset() >= 0;
        const range = rangeFor(unit(), offset());
        const toggle = element("div", "hq-switch");
        for (const [key, label] of Object.entries(periodLabels)) {
          const control = button("hq-switch-item", t(label), () => { setUnit(key); setOffset(0); });
          control.setAttribute("aria-pressed", String(unit() === key));
          toggle.append(control);
        }
        content.push(row("hq-period",
          element("h3", "", t("byModel")),
          row("hq-actions", previous, element("span", "hq-period-date", range.label), next, toggle)));
        if (view.mode === "breakdown" && view.range.label === range.label) {
          const models = selectModels(view.selected).sort((a, b) => tokenTotal(tokens(b.tokens)) - tokenTotal(tokens(a.tokens)));
          const choice = filter() && models.some(model => modelKey(model.model) === filter()) ? filter() : "";
          const options = row("hq-model-filters");
          for (const option of [{ id: "", label: t("allModels") }, ...models.map(model =>
            ({ id: modelKey(model.model), label: modelName(model.model) }))]) {
            const toggle = button("hq-button", option.label, () => setFilter(option.id));
            toggle.setAttribute("aria-pressed", String(option.id === choice));
            options.append(toggle);
          }
          const activeModels = selectModels(view.selected, choice);
          const shown = showUsageStats(view.selected, choice);
          content.push(options);
          if (shown?.steps > 0) {
            content.push(element("p", "hq-muted", compact(tokenTotal(shown.usage)) + " toks · " + exact(shown.steps) + " " + t("requests")));
            content.push(iceberg(view.points, choice, t), punchCard(view.points, activeModels, t), modelTable(activeModels, t));
          } else {
            content.push(element("p", "hq-muted hq-notice", t("noUsage")));
          }
        }
      }
      content.push(element("p", "hq-muted hq-calendar-hint", t("calendarHint")));
    }
    root.replaceChildren(...content);
  });
  return root;
}

module.exports = { readUsage, usageView, showUsageStats };
