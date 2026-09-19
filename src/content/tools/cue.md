---
name: Cue
slug: cue
tagline: Desktop voice agent for dictation, meeting transcription, and cross-app actions
website: 'https://heycue.io/'
logo: /logos/cue.png
primary_category: stt
secondary_categories:
  - creator_editing
layers:
  - L3
use_cases:
  creators:
    - podcast
  game_devs: []
  voice_ai_builders:
    - voice_assistant
pricing:
  model: freemium
  has_free_tier: true
  starting_paid_usd: 19.99
  pricing_url: 'https://heycue.io/pricing'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    Cue's terms allow personal and internal business use and state that files,
    scripts, and documents created with Cue remain the user's. Users remain
    responsible for reviewing output and respecting third-party rights.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: true
  open_source: false
  offline_capable: false
  batch_api: false
gotchas:
  - >-
    Cue is an end-user desktop application, not an API or infrastructure
    platform for building phone agents
  - >-
    Voice, screenshots, selected text, and relevant context may be sent to
    third-party providers when a task requires cloud processing
  - >-
    Bot-free meeting capture does not remove the need to notify participants
    and follow consent, retention, and confidentiality rules
  - >-
    The published terms still describe Cue as beta software, so features,
    availability, and pricing may change
portability:
  voice_model_export: false
  notes: >-
    Finished transcripts, documents, scripts, and other files remain the
    user's. Provider models, account state, and Cue's hosted workflow are not
    exportable as a self-hosted voice model.
alternatives:
  - krisp
  - descript
  - notebooklm
verified_at: 2026-09-02T00:00:00.000Z
badges:
  - new
i18n:
  zh:
    tagline: 桌面语音 Agent，覆盖语音输入、会议转写和跨应用操作
    licensing_notes: >-
      Cue 条款允许个人及内部商业用途，并明确用户通过 Cue 创建的文件、脚本和文档归用户所有；用户仍需审核输出并遵守第三方权利。
    gotchas:
      - Cue 是面向终端用户的桌面应用，不是用于搭建电话 Agent 的 API 或基础设施平台
      - 任务需要云端处理时，语音、截图、选中文本和相关上下文可能发送给第三方服务商
      - 无会议机器人不代表无需告知参与者；仍需遵守录音同意、保留和保密规则
      - 公开条款仍将 Cue 描述为测试版，功能、可用性和价格可能变化
    portability_notes: >-
      最终转写、文档、脚本和其他文件归用户所有；服务商模型、账号状态和 Cue 托管工作流不能导出为自托管语音模型。
    body: >-
      ## 先判断 Cue 解决的是哪一层问题

      Cue 是 macOS 和 Windows 上的成品桌面应用。它把三个经常分散在不同工具里的流程放在一起：在任意文本框语音输入、在本机旁路记录和转写会议，以及根据当前屏幕上下文执行用户批准的后续操作。

      它最适合希望少切换应用的个人用户和小团队。如果你的目标是为呼叫中心开发电话 Agent、调用语音 API，或者自托管一整套 STT 模型，Cue 不是对应的基础设施产品。

      ### 三个入口解决三个不同问题

      语音输入适合邮件、聊天、文档、表单和提示词，重点是把口语整理成接近可发送的文字。长语音模式适合访谈、讲座、语音备忘和工作会议，重点是保留实时转写并继续生成摘要或行动项。Voice Agent 模式则在得到明确指令和权限后，结合当前应用与屏幕上下文推进任务。

      不要因为三种能力在同一个应用里，就默认每次任务都需要 Agent。只想输入文字时用语音输入；需要原始记录时保留完整转写；只有任务确实涉及跨应用步骤时再使用 Agent。

      ## 用真实工作流判断是否值得长期使用

      第一次测试最好选择一项可以在十分钟内完成、而且结果容易核对的任务。例如在邮件回复框里口述一段回复，记录一段五分钟访谈并提取三个行动项，或者让 Cue 根据当前文档起草一个新文件。

      ### 关注纠错成本而不只是转写速度

      对语音输入，记录口音、专有名词、标点和中英混合内容需要修改多少。对会议转写，检查遗漏、说话人切换、时间较长时的稳定性，以及摘要是否能追溯到原文。对 Agent，检查每个敏感操作是否清楚可见、是否在执行前得到批准。

      Cue 官方页面说明支持 20 多种语音输入语言，包括英语、中文、日语、韩语、西班牙语、法语和德语。正式采用前仍应使用团队真实口音、术语和噪声环境测试，而不是只依赖语言数量。

      ## 理解价格、权利与数据边界

      Cue 可以免费开始使用，Cue Plus 的公开价格为每月 19.99 美元。免费额度和实际套餐限制应以应用和价格页的最新显示为准。

      Cue 条款允许个人和内部商业用途，并说明用户创建的文件、脚本和文档归用户所有。这不替代内容权利审核：如果输入包含客户资料、受版权保护材料、第三方声音或保密信息，用户仍需确认自己有权处理和发布。

      ### 本地副本不等于所有处理都离线

      Cue 会保留本地数据副本，原始听写历史和截图不会作为账号同步内容上传。但隐私政策也说明，任务需要时，语音、截图、选中文本、剪贴板和相关上下文可能发送给 AI 或语音服务商。把 Cue 归为混合本地/云端桌面应用更准确，不应将它描述为完全离线工具。

      ### 会议场景先解决同意问题

      Cue 从用户自己的电脑捕获会议，不会以额外机器人身份加入 Zoom、Google Meet 或 Microsoft Teams。这减少了参与者列表中的干扰，但不会改变法律和组织政策。录音或转写前应告知参与者，并确认所在地、客户合同和公司政策对同意、保留和删除的要求。

      ## 什么时候应比较其他工具

      如果核心需求是通话降噪和联络中心音频，先比较 Krisp；如果核心需求是播客和视频的文字式剪辑，比较 Descript；如果核心需求是基于资料生成音频概览，比较 NotebookLM。Cue 的优势场景是从桌面语音输入或会议转写自然继续到跨应用后续工作。

      一周试用后，用四个指标复盘：每千字或每小时节省的时间、人工修正量、敏感权限是否可接受，以及输出能否留在现有文件和工作流中。只有这些指标持续优于原流程，才值得升级或扩大使用。
---
## Decide whether Cue matches the layer you need

Cue is an end-user desktop application for macOS and Windows. It brings together three workflows that are often split across separate tools: voice typing into normal text fields, bot-free meeting transcription from the user's computer, and user-approved follow-up actions that can use the active screen context.

It is a practical fit for individuals and small teams that want to reduce app switching. It is not an API, a telephony platform, or a self-hosted speech stack for developers building call-center agents.

### Treat the three modes as different tools

Voice typing is for email, chat, documents, forms, and prompts. Its job is to turn speech into text that needs less cleanup before sending. Long Voice is for interviews, lectures, voice memos, and working sessions where keeping a live transcript matters. The Voice Agent mode goes further by using the current app and screen context to carry out user-approved follow-up work.

Do not use the most powerful mode by default. Use voice typing when the destination is a text field, keep the full transcript when the exact record matters, and use agent actions only when the job genuinely requires multiple steps or applications.

## Test it with a workflow you can verify

A useful first trial should take about ten minutes and produce an outcome you can inspect. Dictate a reply into an email draft, record a five-minute interview and extract three action items, or ask Cue to use the open document as context for a new file.

### Measure correction cost, not only speed

For dictation, track how much editing is needed for accents, names, punctuation, and mixed-language speech. For meeting transcription, check omissions, speaker changes, long-session stability, and whether each summary point can be traced back to the transcript. For agent work, confirm that sensitive actions remain visible and require the expected approval.

Cue's product pages state support for more than 20 voice-input languages, including English, Chinese, Japanese, Korean, Spanish, French, and German. Test the actual accents, terminology, and noise conditions your team uses before standardizing on it.

## Understand price, rights, and data boundaries

Cue is free to start, and Cue Plus is listed at $19.99 per month. Check the current in-app limits and pricing page before estimating sustained meeting or agent usage.

Cue's terms allow personal and internal business use and state that files, scripts, and documents created with Cue remain the user's. That does not replace a rights review. If inputs contain client data, copyrighted material, third-party voices, or confidential information, the user is still responsible for having the right to process and publish the result.

### A local copy does not mean every request is offline

Cue keeps local copies, and its privacy policy says raw dictation history and screenshots are not included in account sync. The same policy also says voice, screenshots, selected text, clipboard content, and relevant context may be sent to AI or speech providers when required for a request. Treat it as a hybrid desktop-and-cloud application rather than a fully offline transcription tool.

The on-device part is still meaningful: Google DeepMind's Gemmaverse case study describes Cue using Gemma in its latency-sensitive voice pipeline. It should not be generalized into a claim that every transcription or agent step runs locally.

### Bot-free meetings still require consent

Cue captures from the user's computer instead of joining Zoom, Google Meet, or Microsoft Teams as a visible bot. That changes the interface, not the legal or organizational responsibility. Notify participants before recording or transcribing, and check local law, client agreements, and company policy for consent, retention, and deletion requirements.

## Know when to compare another tool

Compare Krisp when the center of the job is call noise cancellation or contact-center audio. Compare Descript when the main workflow is text-based podcast or video editing. Compare NotebookLM when the goal is source-grounded audio summaries. Cue is most differentiated when voice input or a meeting transcript needs to continue into follow-up work across desktop applications.

After a week, review four numbers: time saved per thousand words or meeting hour, manual correction time, whether the permission model fits the data, and whether finished output stays portable in the files and workflows you already use. Upgrade or expand usage only if those measurements improve the real process.
