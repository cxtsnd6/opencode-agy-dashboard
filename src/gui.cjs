"use strict";

const { Plugin, Ipc, Command, ComposerPill, MenuItem, Panel, SettingsPage, Slot, TitlebarItem, Style } = require("@opencode/plugin/gui");
const { Schema } = require("effect");
const { createSignal, createEffect, createMemo, createComponent, createRoot, runWithOwner, getOwner, onCleanup, untrack } = require("solid-js");
const css = require("./dashboard.css");
const { cacheRate, tokenTotal, modelKey, contextStep, sessionMetrics, liveSpeed, descendants, quotaHistory } = require("./metrics.cjs");
const { element, button, compact, speed, languageState, clock } = require("./view.cjs");
const { speedCard, cacheCard, contextCard } = require("./cards.cjs");
const { readUsage, usageView } = require("./usage-view.cjs");
const { createQuotaSource } = require("./quota-source.cjs");

const Quota = Ipc.define({
  id: "opencode-agy-dashboard.quota",
  methods: { read: { input: Schema.Boolean, output: Schema.String } },
});
const surfaces = [
  { id: "speed", icon: "waveform", make: speedCard },
  { id: "cache", icon: "server", make: cacheCard },
  { id: "context", icon: "status", make: contextCard },
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
  const timer = setInterval(() => void refreshQuota(), 60_000);
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
    void session.server.data.session.sync(session.id, { children: true }).catch(() => {});
  });

  const metrics = createMemo(() => {
    const session = current();
    const details = info();
    if (!session) return undefined;
    const timeline = messages();
    const model = contextStep(timeline, details?.revert?.messageID)?.model ?? details?.model;
    const host = session.server.data;
    const definition = session.location && host.location.model.list(session.location)
      ?.find(item => modelKey(item) === modelKey(model));
    const children = descendants(host.session.list(), session.id);
    const partial = host.session.message.more(session.id);
    return sessionMetrics(timeline, details, children, definition, partial);
  });
  return { current, info, metrics, running, live };
}

function pillTitle(state, id) {
  return "Hydrogen Extra · " + state.language.t(id);
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
      label: Number.isFinite(value) ? (active ? "≈" : "") + speed(value) + " tok/s"
        : state.running() ? t("working") : "— tok/s",
    };
  }
  if (surface.id === "cache") {
    const value = review?.family;
    const rate = value && cacheRate(value);
    return { ...common, label: value ? compact(tokenTotal(value)) + " toks · " + (rate == null ? "—" : Math.round(rate) + "%") : "— toks" };
  }

  const used = review?.context.percent;
  const shown = Number.isFinite(used) ? Math.round(used) + "%" : "—";
  const weekly = state.quota()?.totals?.weekly?.sum_percent;
  const quota = Number.isFinite(weekly) ? " · " + t("weekly") + " " + Math.round(weekly) + "%" : "";
  return { ...common, label: t("context") + " " + shown + quota, tone: used >= 80 ? "warning" : undefined };
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
    anchor = popup = dispose = observer = undefined;
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
    runWithOwner(owner, () => createRoot(cleanup => {
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
    const surface = surfaces.find(item => title === pillTitle(state, item.id));
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
    read: async (force, caller) => JSON.stringify(await source.read(force, caller.signal)),
  });
  void source.start().catch(() => ctx.log.write("warn", "The configured local proxy did not start"));
}

module.exports.default = Plugin.define({
  setup(ctx) {
    const language = languageState();
    const usage = readUsage(ctx);
    const state = { ...quotaState(ctx), ...currentSessionState(ctx), language, usage };
    function dialog(title, make, size = "fit") {
      return ctx.dialogs.open(handle => createComponent(ctx.ui.Dialog, {
        title,
        size,
        get children() { return make(handle.close); },
      }));
    }
    function openCard(surface) {
      dialog(pillTitle(state, surface.id), close => surface.make(state, close));
    }
    state.openUsage = () => dialog(language.t("stats"), () => usageView(usage, language), "x-large");

    ctx.add(Style, css);
    for (const surface of surfaces) {
      ctx.add(ComposerPill, {
        id: surface.id,
        show: input => input.session.key === state.current()?.key ? pillAppearance(state, surface) : undefined,
        menu: input => surface.make(state, input.close),
      });
    }
    installHover(state);

    ctx.add(Command, () => ({
      id: "quota", title: pillTitle(state, "quota"), slash: { name: "quota" },
      featured: true, run: () => openCard(surfaces[2]),
    }));
    ctx.add(Command, () => ({
      id: "stats", title: language.t("dashboard"), slash: { name: "token-usage" },
      featured: true, run: state.openUsage,
    }));
    ctx.add(TitlebarItem, () => ({
      id: "stats", label: language.t("dashboard"), icon: "window-analytics", run: state.openUsage,
    }));
    ctx.add(SettingsPage, {
      id: "hydrogen-quota", get title() { return pillTitle(state, "quota"); },
      icon: "status", render: () => contextCard(state),
    });

    const statsTab = { id: "stats", get title() { return language.t("stats"); }, closable: "compact" };
    ctx.add(Panel, {
      id: "stats", region: "side", width: 490,
      list: input => input.open.includes("stats") ? [statsTab] : [],
      render: () => usageView(usage, language, { narrow: true }),
    });
    ctx.add(MenuItem, () => {
      const session = state.current();
      if (!session) return undefined;
      const key = ctx.id + ":stats";
      return {
        id: "stats", menu: "session.panel", title: language.t("stats"), icon: "window-analytics",
        opened: ctx.layout.state(key, session) !== "closed",
        run: () => ctx.layout.open(key, session),
      };
    });
    ctx.add(Slot, {
      at: "session.header", order: 40,
      render(input) {
        const strip = element("div", "hq-subagent-strip");
        const controls = surfaces.map(surface => button("hq-subagent-pill", "", () => openCard(surface)));
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
      },
    });
  },
  main: setupMain,
});
