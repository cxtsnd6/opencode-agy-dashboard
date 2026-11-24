import { Plugin } from "@opencode/plugin";
import quotaSource from "./src/quota-source.cjs";

export default Plugin.define({
  id: "opencode-agy-dashboard",
  async setup(ctx) {
    // Desktop owns automatic startup; server tools use the same read-only panel API.
    const source = quotaSource.createQuotaSource({ ...ctx.options, startCommand: undefined });
    await ctx.tool.transform(editor => {
      editor.add({
        name: "agy_quota_total",
        description: "Get combined Antigravity weekly and five-hour quota windows from the local AGY2API account pool.",
        input: { type: "object", properties: { refresh: { type: "boolean" } }, additionalProperties: false },
        async execute(input, request) {
          return { content: JSON.stringify(await source.read(input?.refresh === true, request.signal)) };
        },
      });
    });
  },
});
