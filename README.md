# OpenCode AGY Dashboard

在 OpenCode Desktop 里查看本机 AGY2API 的 Gemini 多账号总额度，以及当前会话的 tok/s、缓存和上下文用量。额度卡片和 Token 统计直接嵌在桌面应用里。

- 查看 5 小时和每周剩余、最近重置时间与消耗趋势。有足够的历史采样时，显示预计用尽时间。代理返回 Claude / GPT 配额组时，可以展开该组的总额。
- 查看输出 tok/s、首 token 延迟、平均和峰值速度、工具耗时、缓存命中率，以及上下文压缩次数。
- 用 `/quota` 打开额度卡片，用 `/token-usage` 或标题栏图标打开 Token 统计。统计包括时间走势、模型明细、会话和子任务。

## AGY 反代报错时怎么改提示词

先用同一个模型和账号测试一条短请求。短请求成功，但带 OpenCode 项目指令和工具的会话报错时，检查 **AGY2API 发往 AGY 的 `request.systemInstruction`**。在代理里做下面的适配。

1. 在代理构建 AGY 请求的公共出口调整 `systemInstruction`。将代理使用的 AGY 系统提示词作为第一段，开头形如 `You are Antigravity.`。只在客户端系统段以 `You are opencode` 开头时替换这段前缀。保留余下的项目规则、工具说明和原始对话。若该段 AGY 提示词已经存在，重试时复用。
2. 如果带长系统指令的请求仍然失败，而且你的 AGY2API 支持此选项，在代理环境中设置 `SYSTEM_INSTRUCTION_AS_USER_MESSAGE=true` 并重启，或在代理面板启用「系统指令转为首条 user 消息」。代理把原客户端系统文本包进 `<system-instructions>`，作为 `contents` 第一条 user 消息。公共出口继续在 `systemInstruction` 中放 AGY 提示词。改完后发起一个新会话，分别验证正常回复和一个简单的本地文件读取。

如果部署的分支缺少这段处理，可把 [提示词适配示例](compat/opencode_agy_prompt.py) 放在代理自己的 Python 导入路径上。将调用放在 OpenAI 请求已转换、AGY 外层请求尚未封包的地方。例如在 `wrap_cli_request` 中，`inner` 是将赋给外层 `request` 字段的对象。

```python
from opencode_agy_prompt import adapt_system_instruction

# agy_preamble 是本地代理正在使用的 AGY 系统提示词。
inner = adapt_system_instruction(inner, preamble=agy_preamble)
```

需要由示例处理第二步时，传入 `as_user_message=True`。如果代理转换器已启用 `SYSTEM_INSTRUCTION_AS_USER_MESSAGE`，使用示例默认值即可。两种模式的请求结构和重试行为可以用示例的单元测试复现。

| 代理返回 | 排查方式 |
| --- | --- |
| 短请求成功，带长系统提示或项目工具的请求失败 | 对照上面两步看发往 AGY 的系统段。若错误详情指向工具参数，检查对应的 JSON Schema。 |
| 本机 `/creds/status` 返回 `401` 或 `403` | 核对额度插件读取的面板密码和代理的 `PANEL_PASSWORD`。 |
| `400 invalid_grant`，或 `403 VALIDATION_REQUIRED` | 在本地代理面板重新授权对应账号，按 Google 的提示完成身份验证。 |
| `429` 且上游返回配额已耗尽、`Retry-After` 或重置时间 | 按上游给出的时间重试。 |

## 安装到 OpenCode Desktop

1. 启动自己的 AGY2API，将监听地址设为本机回环地址，在代理面板授权要汇总的账号。额度需要代理提供 `GET /creds/status` 和 `GET /creds/quota/{email}`，并在 `models` 返回 `gemini-5h`、`gemini-weekly` 等配额桶。`GET /usage-logs/stats` 是可选接口，用于展示本机代理记录的周期 Token 数。
2. 下载或克隆本仓库。使用 Node.js 20.19+ 和 pnpm 安装本地依赖。仓库自带构建好的桌面入口，修改源码后可重建。

   ```sh
   pnpm install --frozen-lockfile --ignore-scripts
   pnpm build
   ```

3. 将 [示例配置](examples/opencode.example.jsonc) 合并到 OpenCode 的全局 `~/.config/opencode/opencode.json(c)`。把 `plugins[].package` 改为实际目录的绝对路径。Windows 路径可以写成 `D:/apps/opencode-agy-dashboard`。将代理的面板密码和 API 密钥分别存到配置所指的 `agy-panel.key`、`agy-api.key`，每个文件一行。如需沿用现有 provider 配置，只合并 `plugins` 条目。
4. 示例模型显示为 `Hydrogen Extra`。若代理的 `/v1/models` 返回不同的 ID 或限制，按实际值修改 `model`、`providers.antigravity.models` 和可选的 `options.modelID`。
5. 重启 OpenCode Desktop。在 **设置 → Extensions → Plugins** 确认加载。代理就绪后在任意会话输入 `/quota`。

桌面 SDK 以 OpenCode Desktop **2.4.0** 为目标。插件的安装目录和配置方式见 [OpenCode GUI 插件文档](https://opencode.ai/docs/build/plugins/gui/) 和 [OpenCode 配置文档](https://opencode.ai/docs/config/)。

### 插件选项

| 选项 | 用途 |
| --- | --- |
| `proxyURL` | 本机 AGY2API 地址，默认 `http://127.0.0.1:7861`。 |
| `panelPasswordFile` | 面板密码文件，支持 `~/`。省略时从 OpenCode 进程的 `AGY2API_PANEL_PASSWORD` 读取。 |
| `modelID` | 周期 Token 统计的模型 ID，默认 `gemini-4-hydrogen-xhigh`。 |
| `includeCycleUsage` | 设为 `false` 时关闭周期 Token 查询。 |
| `startCommand` | 可选启动命令数组。OpenCode Desktop 启动时会探测代理，需要时运行指定程序。例如 `["powershell.exe", "-NoProfile", "-File", "D:/apps/agy/start-local.ps1"]`。在自己的全局配置中填入可信的本地启动命令。 |

### 数字怎么看

三个可读取的账号分别剩 `80%`、`60%`、`40%` 时，卡片显示 **180% / 300%**，进度条为 **60%**。合计单位是各账号剩余百分比之和。账号授权失效或某个窗口缺数据时，该窗口的合计使用其余可读取的账号，并标明读取范围。邮箱在本地代理查询过程中使用，卡片和 `agy_quota_total` 只接收汇总。

生成时的 tok/s 根据已流出的内容估算。生成结束后，用 OpenCode 记录的输出与推理 token 数以及首 token 到流结束的时间计算。历史记录缺少首 token 时间时，单独标明按总耗时算出的速度。周期 Token 数来自本机代理日志。它和上游剩余百分比是两个独立的读数。

## 开发与参考

```sh
pnpm test
python -m unittest discover -s compat -p "test_*.py"
```

界面设计参考 [Antigrative Dashboard](https://github.com/ATtacK030130/antigrative-dashboard)。

从 OpenCode 直接接入 Antigravity 的账号和额度，可参考 [opencode-antigravity-auth](https://github.com/NoeFabris/opencode-antigravity-auth) 和 [opencode-quota](https://github.com/oberdfr/opencode-quota)。跨供应商的桌面额度和用量面板可参考 [slkiser/opencode-quota](https://github.com/slkiser/opencode-quota)。

本仓库的插件和提示词适配示例采用 [MIT 许可证](LICENSE)。AGY2API 作为单独运行的服务安装，按其仓库的许可证使用。公开的 [AGY2API 分支](https://github.com/Annaabdullayeva/agy2api) 可用来核对接口，提示词选项是否可用取决于安装的版本。
