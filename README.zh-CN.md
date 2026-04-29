# Voice Tools Directory

Voice Tools Directory 是一个专注语音 AI 工具的静态导航站。它面向内容创作者、游戏开发者和 Voice AI 构建者，帮助用户快速了解一个工具能做什么、适合谁、价格如何、授权边界是什么，以及最近发生了哪些变化。

[English](./README.md)

## 功能

- 精选语音 AI 工具资料，覆盖价格、授权、能力和适用人群等信息。
- 为内容创作者、游戏开发者和 Voice AI 构建者提供独立入口。
- 提供 TTS、STT、声音克隆、配音翻译、音频清理、实时基础设施等分类页。
- 使用 Pagefind 提供静态全文搜索。
- 支持按价格、授权、能力和用户群体进行多维筛选。
- 支持最多 4 个工具同时对比。
- 提供常见语音 AI 场景的工作流和工具栈推荐。
- 维护价格、功能、产品、模型和政策变化日志。
- 提供英文和中文双语页面。
- 提供 `llms.txt`、JSON 工具 API 和 Schema.org 元数据，方便 AI 与搜索引擎理解。

## 适合谁

- **内容创作者**：YouTube、播客、有声书、短视频、VTuber 等创作者，用于比较配音、翻译、音频清理和剪辑工具。
- **游戏开发者**：独立游戏团队和本地化团队，用于检查 AI 配音、NPC 对话、音效生成和商用授权限制。
- **Voice AI 构建者**：构建语音 Agent、电话机器人、AI 陪伴、教育产品或实时语音流水线的团队。

## 数据模型

工具资料以 Markdown 文件存放在 `src/content/tools/`。分类和变更日志等共享数据存放在 `data/` 下的 CSV 文件中。

```text
src/content/tools/
  elevenlabs.md
  vapi.md
  ...

data/
  categories.csv
  changelog.csv
```

每个工具资料包含身份信息、分类、用户群体、价格、授权、能力、替代工具、验证日期，以及可选的本地化内容。

## 本地开发

安装依赖：

```bash
npm ci
```

启动开发服务器：

```bash
npm run dev
```

构建静态站点：

```bash
npm run build
```

校验内容数据：

```bash
npm run validate
```

运行测试：

```bash
npm test
```

## 贡献

欢迎贡献。适合贡献的内容包括：

- 新增语音 AI 工具资料。
- 更新价格、授权或能力信息。
- 报告过时或错误的数据。
- 改进工作流指南或双语文案。
- 为数据校验或内容渲染行为补充测试。

编辑工具数据时，请优先使用官方价格页、服务条款、产品公告或文档作为来源。不确定的字段宁可留空，也不要猜测。

## 许可证

- 代码使用 [MIT License](./LICENSE)。
- `data/` 和 `src/content/` 下的工具数据与编辑内容使用 [CC BY 4.0](./LICENSE-DATA.md)。
