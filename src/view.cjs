"use strict";

const { createEffect, createSignal, onCleanup } = require("solid-js");
const { MINUTE } = require("./metrics.cjs");

const copy = {
  dashboard: ["Hydrogen 用量仪表盘", "Hydrogen Usage Dashboard", "Hydrogen 用量儀表板"],
  speed: ["最新速度", "Latest speed", "最新速度"],
  live: ["实时速度", "Live speed", "即時速度"],
  weighted: ["会话平均", "Session average", "會話平均"],
  firstToken: ["首字耗时", "First token", "首字耗時"],
  peak: ["峰值", "Peak", "峰值"],
  modelTime: ["模型用时", "Model time", "模型用時"],
  toolTime: ["工具用时", "Tool time", "工具用時"],
  streamTime: ["生成用时", "Generation time", "生成用時"],
  toolCalls: ["工具调用", "Tool calls", "工具呼叫"],
  output: ["输出", "Output", "輸出"],
  reasoning: ["推理", "Reasoning", "推理"],
  prompts: ["轮", "prompts", "輪"],
  steps: ["步", "steps", "步"],
  samples: ["次测速", "speed samples", "次測速"],
  estimates: ["流式速度为实时估算，结束后使用实测 token 数。", "Live rate is estimated. Completed rates use reported tokens.", "串流速度為即時估算，完成後採用實測 token 數。"],
  awaiting: ["等待首字…", "Waiting for first token…", "等待首字…"],
  working: ["正在生成…", "Generating…", "正在生成…"],
  listening: ["暂无生成记录", "No generation yet", "暫無生成記錄"],
  elapsed: ["含首字等待", "Includes first-token wait", "含首字等待"],
  partialSteps: ["按当前加载的对话步骤统计", "Based on loaded conversation steps", "按目前載入的對話步驟統計"],
  cache: ["Token 用量", "Token usage", "Token 用量"],
  cacheRead: ["缓存读取", "Cache read", "快取讀取"],
  cacheWrite: ["缓存写入", "Cache write", "快取寫入"],
  uncached: ["未缓存输入", "Uncached input", "未快取輸入"],
  cacheRate: ["缓存率", "Cache hit rate", "快取命中率"],
  currentAgent: ["当前代理", "Current agent", "目前代理"],
  subagents: ["子代理", "Subagents", "子代理"],
  context: ["上下文窗口", "Context window", "上下文視窗"],
  used: ["已用", "used", "已用"],
  compactions: ["次压缩", "compactions", "次壓縮"],
  quota: ["共享额度", "Shared quotas", "共享額度"],
  accounts: ["个账号合计", "accounts combined", "個帳號合計"],
  fetched: ["个账号已读取", "accounts read", "個帳號已讀取"],
  reset: ["最近重置", "Next reset", "最近重置"],
  resetDue: ["重置时间已到，等待更新", "Reset due, waiting for update", "重置時間已到，等待更新"],
  quotaShort: ["5 小时额度", "Five-hour quota", "5 小時額度"],
  quotaWeek: ["每周额度", "Weekly quota", "每週額度"],
  totalQuota: ["合计", "Combined", "合計"],
  cycleTokens: ["本机周期用量", "Local cycle usage", "本機週期用量"],
  cycleTokensHint: ["在已读取的额度周期内，经本机代理使用 Hydrogen Extra 的 token。", "Hydrogen Extra tokens logged by the local proxy within the available quota windows.", "已讀取額度週期內，經本機代理使用 Hydrogen Extra 的 token。"],
  projected: ["预计重置时剩", "Estimated left at reset", "預計重置時剩"],
  runsOut: ["预计耗尽于", "Estimated to run out in", "預計耗盡於"],
  low: ["额度偏紧", "Quota running low", "額度偏緊"],
  calibrating: ["消耗趋势采样中", "Sampling usage pace", "正在取樣消耗趨勢"],
  updated: ["更新", "updated", "更新"],
  refresh: ["刷新", "Refresh", "重新整理"],
  loading: ["读取中…", "Loading…", "讀取中…"],
  failed: ["更新失败，显示上次数据", "Refresh failed. Showing last data.", "更新失敗，顯示上次資料"],
  noData: ["暂时无法读取", "Unavailable", "暫時無法讀取"],
  today: ["今日用量", "Today", "今日用量"],
  week: ["本周用量", "This week", "本週用量"],
  month: ["本月用量", "This month", "本月用量"],
  all: ["累计用量", "All time", "累計用量"],
  cost: ["按公开单价估算", "Estimated at catalog rates", "按公開單價估算"],
  noPrice: ["无公开单价", "No catalog price", "無公開單價"],
  openUsage: ["查看用量统计", "View usage statistics", "查看用量統計"],
  stats: ["用量统计", "Usage statistics", "用量統計"],
  activity: ["活动概览", "Activity overview", "活動總覽"],
  breakdown: ["用量详情", "Usage details", "用量詳情"],
  dailyActivity: ["每日活动", "Daily activity", "每日活動"],
  weeklyActivity: ["每周活动", "Weekly activity", "每週活動"],
  activeDays: ["活跃天数", "Active days", "活躍天數"],
  streak: ["连续活跃", "Active streak", "連續活躍"],
  requests: ["次请求", "requests", "次請求"],
  day: ["天", "Day", "天"],
  weekly: ["周", "Week", "週"],
  monthly: ["月", "Month", "月"],
  previous: ["上一周期", "Previous period", "上一週期"],
  next: ["下一周期", "Next period", "下一週期"],
  byModel: ["按模型统计", "Usage by model", "按模型統計"],
  iceberg: ["Token 冰山", "Token iceberg", "Token 冰山"],
  fresh: ["新增 token", "New tokens", "新增 token"],
  punch: ["模型 × 时间", "Model × time", "模型 × 時間"],
  model: ["模型", "Model", "模型"],
  allModels: ["全部模型", "All models", "全部模型"],
  tokenTotal: ["总 Token", "Total tokens", "總 Token"],
  local: ["本机 OpenCode · 共享账号池", "Local OpenCode · shared account pool", "本機 OpenCode · 共用帳號池"],
  entire: ["当前范围", "Current range", "目前範圍"],
  noUsage: ["该周期暂无用量", "No usage in this period", "該週期暫無用量"],
  calendarHint: ["按北京时间统计 · 周一为一周起始", "Asia/Shanghai · Monday-start weeks", "按北京時間統計 · 週一為一週起始"],
};

function languageState() {
  const key = "opencode-agy-dashboard.language";
  let initial = 0;
  try {
    const saved = Number(localStorage.getItem(key));
    if ([0, 1, 2].includes(saved)) initial = saved;
  } catch {}
  const [index, update] = createSignal(initial);
  function set(value) {
    update(value);
    try { localStorage.setItem(key, String(value)); } catch {}
  }
  return { index, set, t: name => copy[name]?.[index()] ?? name };
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function button(className, text, run) {
  const control = element("button", className, text);
  control.type = "button";
  control.addEventListener("click", run);
  return control;
}

function row(className, ...nodes) {
  const result = element("div", className);
  result.append(...nodes);
  return result;
}

function compact(value) {
  if (!Number.isFinite(value)) return "—";
  for (const [base, unit] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]]) {
    if (value >= base) return Number((value / base).toFixed(1)) + unit;
  }
  return String(Math.round(value));
}

const exact = value => Number.isFinite(value) ? value.toLocaleString("en-US") : "—";
const percent = value => Number.isFinite(value) ? value.toFixed(1) + "%" : "—";
const speed = value => Number.isFinite(value) ? value.toFixed(1) : "—";

function duration(value, english = false) {
  if (!Number.isFinite(value) || value <= 0) return "—";
  if (value < MINUTE) return (value / 1000).toFixed(value < 10_000 ? 2 : 1) + " s";
  const minutes = Math.floor(value / MINUTE);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor(minutes % 1440 / 60);
  const fields = [];
  if (days) fields.push(days + (english ? "d" : "天"));
  if (hours) fields.push(hours + (english ? "h" : "时"));
  if (minutes % 60 || !fields.length) fields.push(minutes % 60 + (english ? "m" : "分"));
  if (minutes < 60) fields.push(Math.floor(value % MINUTE / 1000) + (english ? "s" : "秒"));
  return fields.join(" ");
}

function languagePicker(language) {
  const group = element("div", "hq-switch hq-language");
  group.setAttribute("aria-label", "Language");
  const options = ["EN", "简", "繁"].map((label, i) => {
    const value = [1, 0, 2][i];
    const control = button("hq-switch-item", label, () => language.set(value));
    createEffect(() => control.setAttribute("aria-pressed", String(language.index() === value)));
    return control;
  });
  group.append(...options);
  return group;
}

function block(label, value, title) {
  const item = element("div", "hq-stat");
  item.append(element("span", "hq-muted", label), element("strong", "", value));
  if (title !== undefined) item.title = title;
  return item;
}

function clock(interval) {
  const [now, setNow] = createSignal(Date.now());
  const timer = setInterval(() => setNow(Date.now()), interval);
  onCleanup(() => clearInterval(timer));
  return now;
}

module.exports = {
  languageState, languagePicker, element, button, row, compact, exact, percent, speed, duration, block, clock,
};
