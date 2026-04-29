---
title: Phone Agent from Zero
user_group: voice_ai_builders
description: >-
  Build a phone-based voice AI agent from first number to monitored launch, with
  stack choices, call-flow design, consent, cost, and failure testing.
budget_min_usd: 50
budget_max_usd: 500
tools:
  - retell-ai
  - vapi
  - openai-realtime
  - cartesia
  - livekit
  - pipecat
  - deepgram
tool_recommendations:
  - tier: production_default
    tool_slug: retell-ai
    tool_name: Retell AI
    url: 'https://www.retellai.com/pricing'
    pricing: $0.07-$0.31/min for AI voice agents
    summary: >-
      Managed phone-agent path with call analytics, simulation testing,
      webhooks, and quick production setup.
    caveat: >-
      Confirm real all-in cost with your voice, LLM, telephony, and call
      duration mix.
    i18n:
      zh:
        summary: 托管电话 Agent 路线，包含通话分析、模拟测试、webhook 和较快生产配置。
        pricing: AI Voice Agent $0.07-$0.31/分钟
        caveat: 要用你的声音、LLM、电话线路和通话时长确认真实总成本。
  - tier: production_default
    tool_slug: vapi
    tool_name: Vapi
    url: 'https://vapi.ai/pricing'
    pricing: Usage-based platform plus model and telephony costs
    summary: >-
      Strong builder platform when you want to compare providers, add tools,
      connect a frontend, and move quickly.
    caveat: >-
      Track platform, telephony, STT, TTS, and model costs separately before
      scaling.
    i18n:
      zh:
        summary: 适合快速比较供应商、添加工具、连接前端并推进原型的 builder 平台。
        pricing: 平台、模型和电话按量叠加
        caveat: 扩量前要分别统计平台、电话、STT、TTS 和模型成本。
  - tier: production_default
    tool_slug: deepgram
    tool_name: Deepgram
    url: 'https://deepgram.com/pricing'
    pricing: Voice Agent API from $0.075/min
    summary: >-
      Useful if speech recognition, interruption, transcript quality, and
      voice-agent API cost are central to the phone flow.
    caveat: >-
      You still need telephony, orchestration, prompt policy, and CRM
      integration around it.
    i18n:
      zh:
        summary: 当识别、打断、转写质量和 Voice Agent API 成本是电话流程核心时值得评估。
        pricing: Voice Agent API $0.075/分钟起
        caveat: 电话、编排、提示词策略和 CRM 集成仍要自己设计。
  - tier: fast_rising
    tool_slug: openai-realtime
    tool_name: OpenAI Realtime API
    url: 'https://platform.openai.com/docs/guides/voice-agents'
    pricing: Usage-based Realtime API pricing
    summary: >-
      Use for native speech-to-speech phone experiences, tool calling, and
      SIP/WebRTC architecture tests.
    caveat: >-
      Add call recording, consent, fallback, analytics, and business-operation
      tooling yourself.
    i18n:
      zh:
        summary: 用于测试原生 speech-to-speech 电话体验、工具调用和 SIP/WebRTC 架构。
        pricing: Realtime API 按量计费
        caveat: 录音、同意、兜底、分析和业务运营工具要自己补。
  - tier: fast_rising
    tool_slug: cartesia
    tool_name: Cartesia
    url: 'https://cartesia.ai/pricing'
    pricing: Free plan; Pro $4/mo; Startup $39/mo
    summary: >-
      Add when low-latency TTS or Cartesia Line-style voice-agent development is
      the differentiator.
    caveat: 'It does not replace telephony policy, call routing, and post-call QA.'
    i18n:
      zh:
        summary: 当低延迟 TTS 或 Cartesia Line 式 Voice Agent 开发是差异点时加入。
        pricing: Free；Pro $4/月；Startup $39/月
        caveat: 不能替代电话策略、路由和通话后质检。
  - tier: open_or_self_hosted
    tool_slug: livekit
    tool_name: LiveKit
    url: 'https://livekit.com/voice-agents'
    pricing: Free OSS; Cloud has free and paid tiers
    summary: >-
      Choose when you need to own realtime media, SIP integration, agent
      workers, and provider routing.
    caveat: >-
      Requires serious operations work before it beats managed phone-agent
      platforms.
    i18n:
      zh:
        summary: 当你需要拥有实时媒体、SIP 集成、Agent worker 和供应商路由时选择。
        pricing: 开源免费；Cloud 有免费和付费档
        caveat: 需要较强运维能力，才可能胜过托管电话 Agent 平台。
  - tier: open_or_self_hosted
    tool_slug: pipecat
    tool_name: Pipecat
    url: 'https://github.com/pipecat-ai/pipecat'
    pricing: Free open source; bring models and transport
    summary: >-
      Open framework choice for teams building their own phone agent
      orchestration and provider adapters.
    caveat: 'You must own telephony bridge, observability, tests, and deployment.'
    i18n:
      zh:
        summary: 适合自建电话 Agent 编排和 provider adapter 的开源框架。
        pricing: 开源免费；模型和传输自备
        caveat: 电话桥接、观测、测试和部署都要自己负责。
sources:
  - title: OpenAI voice agents guide
    url: 'https://platform.openai.com/docs/guides/voice-agents'
    note: >-
      Official architecture reference for speech-to-speech and chained voice
      agents.
    i18n:
      zh:
        title: OpenAI Voice Agents 指南
        note: 官方 speech-to-speech 和 chained Voice Agent 架构参考。
  - title: LiveKit voice agents overview
    url: 'https://livekit.com/voice-agents'
    note: >-
      Explains phone-agent production issues such as WebRTC, SIP, interruption,
      observability, and scaling.
    i18n:
      zh:
        title: LiveKit Voice Agents 概览
        note: 说明 WebRTC、SIP、打断、观测和扩容等电话 Agent 生产问题。
  - title: Retell AI pricing
    url: 'https://www.retellai.com/pricing'
    note: >-
      Current managed phone-agent pricing, free credits, concurrency, and
      enterprise plan reference.
    i18n:
      zh:
        title: Retell AI 价格
        note: 当前托管电话 Agent 价格、免费额度、并发和企业方案参考。
  - title: Deepgram pricing
    url: 'https://deepgram.com/pricing'
    note: Current STT and Voice Agent API per-minute pricing for cost comparison.
    i18n:
      zh:
        title: Deepgram 价格
        note: 当前 STT 和 Voice Agent API 按分钟价格，用于成本对比。
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=h0FyNmnFk6o'
  title: Tech With Tim Vapi phone and web AI voice assistant full tutorial
  i18n:
    zh:
      title: Tech With Tim：Vapi 电话和网页 AI 语音助手完整教程
workflowDiagram:
  steps:
    - type: step
      icon: ☎
      label: Pick number path
      substeps:
        - Managed or BYO SIP
        - Add consent line
      i18n:
        zh:
          label: 选择号码
          substeps:
            - 托管或自带 SIP
            - 加录音告知
    - type: step
      icon: "\U0001F4DD"
      label: Write call flow
      substeps:
        - Goal and refusal rules
        - Human handoff
      i18n:
        zh:
          label: 写通话流
          substeps:
            - 目标和拒答规则
            - 转人工
    - type: step
      icon: "\U0001F50C"
      label: Wire providers
      substeps:
        - STT or realtime model
        - TTS and tools
      i18n:
        zh:
          label: 接供应商
          substeps:
            - STT 或实时模型
            - TTS 和工具
    - type: decision
      icon: "\U0001F9EA"
      label: 30 calls pass?
      'yes':
        label: Soft launch
        i18n:
          zh:
            label: 小流量
      'no':
        label: Fix flow
        loop: true
        i18n:
          zh:
            label: 修流程
      i18n:
        zh:
          label: 30通通过？
    - type: step
      icon: "\U0001F4CA"
      label: Monitor live
      substeps:
        - Cost per minute
        - Handoff rate
      i18n:
        zh:
          label: 线上监控
          substeps:
            - 每分钟成本
            - 转人工率
    - type: end
      icon: "\U0001F680"
      label: Scale traffic
      i18n:
        zh:
          label: 扩量
featured: true
i18n:
  zh:
    title: 电话 Agent 从 0 到上线
    description: 从第一个号码到监控上线，搭建电话语音 AI Agent，覆盖技术栈、通话流程、同意告知、成本和失败测试。
    body: >
      ## 先把电话 Agent 当成业务流程


      电话 Agent
      不是“把聊天机器人接到电话上”。电话里没有撤回按钮，用户可能在嘈杂环境里说话，通话会被录音、转写、转接、计费，并且常常涉及预约、销售、客服、催收或资格筛选。第一步不是选模型，而是写清楚：Agent
      能解决什么，不能承诺什么，什么时候必须转人工，什么时候必须先征得录音或数据处理同意。


      ### 适合明确、可边界化的任务


      预约确认、来电分流、FAQ、简单售前资格筛选、回访和内部 IT helpdesk
      都适合作为第一版。医疗诊断、金融建议、复杂投诉、未成年人沟通或高情绪冲突不适合直接自动化。越是高风险场景，越要从“辅助人工”开始，而不是全自动接管。


      ### 先写通话流，再写提示词


      一个可上线的电话 Agent
      至少需要开场、身份说明、录音告知、目标确认、信息收集、工具调用、失败恢复、转人工和结束语。提示词只是其中一层。真正让电话稳定的是 call
      flow：用户沉默怎么办、拒绝提供信息怎么办、系统查不到订单怎么办、用户要求人工怎么办。


      ## 搭建第一条生产路径


      最快路线是 Retell AI 或 Vapi 这类托管平台：买号码或接 Twilio/SIP，配置模型、声音、转写、工具和
      webhook，然后用真实电话测试。更可控路线是 LiveKit/Pipecat +
      Deepgram/Cartesia/ElevenLabs/OpenAI，但你要自己负责媒体、worker、重试和观测。


      ### 号码和同意不是小事


      不同地区对录音、外呼、营销电话和自动化披露要求不同。即使项目还在
      MVP，也要在开场里说明身份和录音/转写用途，并给用户退出或转人工路径。把同意状态写进日志，不要只靠录音里一句话。客户项目还要记录脚本版本和上线日期。


      ### 工具调用要从只读开始


      第一版工具建议只读：查订单、查预约、查 FAQ、创建草稿。写入动作如改预约、取消订单、发送短信、改 CRM
      状态，应加二次确认和失败回滚。用户打断时，Agent 可以停止说话，但不能悄悄取消已经提交的业务动作。


      ### 用 30 通真实电话做门槛


      上线前至少打 30 通：安静环境、手机免提、车内、口音、长停顿、用户插话、用户拒答、工具超时、转人工、直接挂断。每通都要看
      transcript、录音、事件时间线、成本、是否完成目标。页面里的 Tech With Tim Vapi
      教程可以作为电话和网页集成参考，但你的上线门槛应由这些真实失败决定。


      ## 按阶段选择工具


      Retell AI 当前官方价格页列出 AI Voice Agent $0.07-$0.31/分钟，约 RMB
      0.5-2.2/分钟，并提供免费额度、并发和分析能力；Vapi 适合开发者快速比较 provider、接工具和接前端；Deepgram 的
      Voice Agent API 从 $0.075/分钟起，STT Nova/Flux 从 $0.0077/分钟起；OpenAI Realtime
      适合测试原生 speech-to-speech；LiveKit/Pipecat 适合后期需要拥有实时媒体和路由的团队。


      ### 不要只看平台费


      电话 Agent 的真实成本包括平台、电话、STT、TTS、LLM、静默等待、失败重试、录音存储、人工复核和转人工。一个 4 分钟成功电话和一个 9
      分钟失败电话的成本完全不同。先按 1000 分钟/月估算，再按 10,000 分钟/月看并发、质量和客服接管压力。


      ### 托管先跑，开源后迁移


      对多数团队，先用 Retell 或 Vapi 跑通业务更快；当成本、隐私、区域、供应商控制或特殊媒体需求变成主要问题，再迁到
      LiveKit/Pipecat。为了未来迁移，保留提示词版本、工具 schema、通话样本、失败分类和同意记录。


      ## 小流量上线后盯四类指标


      第一周不要追求自动化率最大化。重点看任务完成率、转人工率、用户重复问题比例、missed interruption、平均和 P95
      成本、工具失败率、投诉和挂断点。每天抽样回放失败通话，把失败改成回归测试。电话 Agent
      的成熟不是“它能说话”，而是它能在坏信号、坏心情和坏数据里稳住流程。


      ### 设定人工兜底


      任何电话 Agent
      都需要一句清晰的逃生门：“我可以帮你转人工。”如果业务不允许实时人工，至少要创建工单、回拨或短信确认。没有兜底的自动化只是在把失败留给用户。
---
## Treat the phone agent as a business process

A phone agent is not a chatbot with a phone number attached. Calls are recorded, transcribed, billed, transferred, interrupted, and often tied to appointments, support, sales, screening, or account changes. The first decision is not the model. It is what the agent is allowed to do, what it must refuse, when it must transfer, and how it obtains recording or data-processing consent.

### Start with bounded jobs

Good first workflows include appointment confirmation, inbound triage, FAQ, simple lead qualification, follow-up calls, and internal helpdesk routing. Avoid fully automated medical diagnosis, financial advice, complex complaints, conversations with minors, or emotionally charged disputes. High-risk calls should start as human-assist, not full replacement.

### Write the call flow before the prompt

A production call flow has an opening, identity disclosure, consent line, goal confirmation, data collection, tool use, recovery prompts, handoff, and close. Prompt wording matters, but the call flow decides what happens when the user is silent, refuses information, asks for a human, changes their mind, or hits a backend error.

## Build the first production path

The fastest route is a managed platform such as Retell AI or Vapi: buy or connect a number, configure model, voice, transcription, tools, and webhooks, then call it from real phones. The controlled route is LiveKit or Pipecat with providers such as Deepgram, Cartesia, ElevenLabs, or OpenAI, but then you own media transport, workers, retries, and observability.

### Handle number, consent, and recording early

Recording, outbound calling, automated disclosure, and marketing rules vary by region. Even in an MVP, identify the agent, explain recording or transcription where needed, and provide an exit path. Store consent state with call logs, script version, and launch date.

### Keep tool calls read-only at first

Start with lookup tools: order status, appointment availability, FAQ retrieval, ticket creation drafts. Writes such as rescheduling, cancellation, SMS sending, CRM updates, or payment changes need confirmation and failure handling. If the user interrupts, the agent can stop speaking, but it should not silently cancel an irreversible action.

### Use 30 real calls as the gate

Before launch, run at least 30 calls across quiet rooms, speakerphones, car audio, accents, long pauses, interruptions, refusal, tool timeouts, handoff, and hangups. Review transcript, recording, event timeline, cost, and outcome for each. The embedded Tech With Tim Vapi tutorial is a useful build reference; your launch standard should be based on these failure calls.

### Define success before the model improvises

For each call type, write the success condition in plain language. An appointment bot succeeds when it confirms the right person, date, time, timezone, and callback path. A lead screener succeeds when it collects the required fields and marks uncertainty rather than inventing missing data. A support triage bot succeeds when it routes correctly, not when it keeps the user talking longest. These definitions become your evaluation rubric.

## Choose tools by stage

Retell AI is the quickest production-oriented managed path when call analytics, simulations, and phone operations matter. Vapi is strong for builders who want provider choice, frontend integration, and tool wiring. Deepgram is worth evaluating when speech recognition and voice-agent API cost are central. OpenAI Realtime is compelling for native speech-to-speech tests. LiveKit and Pipecat are for teams ready to own realtime media.

### Price the whole call

Retell currently lists AI voice agents at $0.07-$0.31 per minute. Deepgram lists Voice Agent API from $0.075 per minute and Nova or Flux STT from $0.0077 per minute. Those are components, not your full bill. Add telephony, LLM, TTS, silence, retries, call storage, QA, and human handoff.

### Use managed first, migrate only with evidence

Most teams should prove the call flow on Retell or Vapi before self-hosting. Move to LiveKit or Pipecat when cost, privacy, region, vendor control, or custom media routing becomes the main constraint. Preserve prompt versions, tool schemas, call samples, failure labels, and consent records so migration is possible.

### Plan the operator console

Even a simple phone agent needs an operator view: live status, recent calls, transcript, recording link, extracted fields, tool-call errors, handoff reason, and estimated cost. Without that view, the team learns about failures from angry users. Start with a manual dashboard if needed; the important part is that support and engineering can inspect the same call without digging through provider logs.

## Launch softly and monitor failure

The first production week is not about maximizing automation. Watch task completion, handoff rate, repeat-request rate, missed interruption, average and P95 cost, tool failures, complaints, and hangup points. Sample failed calls daily and turn them into regression tests.

### Keep a human escape hatch

Every phone agent needs a clear sentence like "I can transfer you to a person." If live transfer is not available, create a ticket, schedule a callback, or send a confirmation. Automation without an escape path turns system failure into user frustration.

### Pre-launch checklist

Before expanding traffic, verify the opening disclosure, recording consent, max call duration, retry limit, timeout phrase, transfer behavior, blocked topics, and webhook failure response. Check that every write action has confirmation, every call has a trace ID, and every failed call can be replayed. Then watch the first live cohort closely; a phone agent teaches you more in its first 100 real calls than in a week of synthetic demos.

Keep the first launch narrow. One phone number, one call reason, one transfer queue, and one daily review ritual will produce cleaner learning than a broad rollout with five half-tested intents. Scale after the failure categories stabilize.
