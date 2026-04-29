---
title: Realtime Speech-to-Speech Voice Agent
user_group: voice_ai_builders
description: >-
  Use native speech-to-speech models when natural prosody, interruption, and
  fast prototype velocity matter more than component-level STT/TTS control.
budget_min_usd: 100
budget_max_usd: 1000
tools:
  - openai-realtime
  - vapi
  - cartesia
  - deepgram
  - pipecat
  - livekit
  - retell-ai
tool_recommendations:
  - tier: production_default
    tool_slug: openai-realtime
    tool_name: OpenAI Realtime API
    url: 'https://platform.openai.com/docs/guides/voice-agents'
    pricing: Usage-based Realtime API pricing
    summary: >-
      Best default when you want one realtime model to hear, reason, speak, call
      tools, and preserve conversational nuance.
    caveat: >-
      You trade away some STT/TTS layer visibility; invest in event logs and
      eval calls.
    i18n:
      zh:
        summary: 当你希望一个实时模型同时听、理解、说话、调工具并保留语气细节时，这是默认候选。
        pricing: Realtime API 按量计费
        caveat: 会牺牲部分 STT/TTS 层可见性，需要投入事件日志和评测通话。
  - tier: production_default
    tool_slug: retell-ai
    tool_name: Retell AI
    url: 'https://www.retellai.com/pricing'
    pricing: $0.07-$0.31/min for AI voice agents
    summary: >-
      Managed route for production phone agents when you need analytics,
      simulations, and call operations around the voice model.
    caveat: Platform settings and provider choices still need real-call QA.
    i18n:
      zh:
        summary: 当生产电话 Agent 还需要分析、模拟测试和通话运营时，Retell 是托管路线。
        pricing: AI Voice Agent $0.07-$0.31/分钟
        caveat: 平台设置和供应商选择仍要用真实电话质检。
  - tier: production_default
    tool_slug: vapi
    tool_name: Vapi
    url: 'https://vapi.ai/pricing'
    pricing: Usage-based platform plus model and telephony costs
    summary: >-
      Practical platform for comparing realtime model, STT/TTS, telephony,
      tools, and frontend integration in one prototype.
    caveat: 'Real cost stacks across platform, telephony, model, STT, and TTS usage.'
    i18n:
      zh:
        summary: 适合在一个原型里比较实时模型、STT/TTS、电话、工具和前端集成。
        pricing: 平台、模型和电话按量叠加
        caveat: 真实成本会由平台、电话、模型、STT 和 TTS 多项叠加。
  - tier: fast_rising
    tool_slug: cartesia
    tool_name: Cartesia
    url: 'https://cartesia.ai/pricing'
    pricing: Free plan; Pro $4/mo; Startup $39/mo
    summary: >-
      Use as the low-latency voice layer when S2S is too opaque but you still
      want fast spoken responses.
    caveat: >-
      It is a voice layer and agent platform, not a full replacement for product
      policy and orchestration.
    i18n:
      zh:
        summary: 当 S2S 太黑盒但仍需要低延迟语音时，可作为语音层和 Agent 平台评估。
        pricing: Free；Pro $4/月；Startup $39/月
        caveat: 它不是产品策略和编排的完整替代。
  - tier: fast_rising
    tool_slug: livekit
    tool_name: LiveKit
    url: 'https://docs.livekit.io/agents/voice-agent/voice-pipeline/'
    pricing: Free OSS; Cloud has free and paid tiers
    summary: >-
      Compare S2S against LiveKit's realtime-model and STT-LLM-TTS support when
      transport control matters.
    caveat: More control also means more deployment and debugging responsibility.
    i18n:
      zh:
        summary: 当传输控制重要时，用 LiveKit 的 realtime model 和 STT-LLM-TTS 支持对照 S2S。
        pricing: 开源免费；Cloud 有免费和付费档
        caveat: 控制更多，也意味着部署和调试责任更多。
  - tier: open_or_self_hosted
    tool_slug: pipecat
    tool_name: Pipecat
    url: 'https://github.com/pipecat-ai/pipecat'
    pricing: Free open source; bring models and transport
    summary: >-
      Open framework route when S2S is useful for UX tests but the production
      stack needs provider choice.
    caveat: 'You must own model adapters, transport, tool policy, and test replay.'
    i18n:
      zh:
        summary: 当 S2S 适合体验验证，但生产栈仍需要供应商选择时，用开源框架承接。
        pricing: 开源免费；模型和传输自备
        caveat: 模型适配、传输、工具策略和测试回放都要自己负责。
  - tier: open_or_self_hosted
    tool_slug: livekit
    tool_name: LiveKit self-hosted
    url: 'https://livekit.com/voice-agents'
    pricing: Free OSS; infra and model costs extra
    summary: >-
      Use self-hosted realtime infrastructure when media ownership, privacy, or
      custom routing is the core requirement.
    caveat: Not a shortcut; you need operational maturity before it is cheaper.
    i18n:
      zh:
        summary: 当媒体所有权、隐私或自定义路由是核心需求时，用自托管实时基础设施。
        pricing: 开源免费；另算基础设施和模型费用
        caveat: 不是捷径；有运维成熟度后才可能更便宜。
sources:
  - title: OpenAI voice agents guide
    url: 'https://platform.openai.com/docs/guides/voice-agents'
    note: >-
      Official comparison of speech-to-speech and chained voice-agent
      architectures.
    i18n:
      zh:
        title: OpenAI Voice Agents 指南
        note: 官方对比 speech-to-speech 和 chained Voice Agent 架构。
  - title: OpenAI gpt-realtime launch
    url: 'https://openai.com/index/introducing-gpt-realtime'
    note: >-
      Current product context for gpt-realtime, SIP support, MCP server support,
      tool use, and safety notes.
    i18n:
      zh:
        title: OpenAI gpt-realtime 发布说明
        note: 当前 gpt-realtime、SIP、MCP server、工具调用和安全说明。
  - title: LiveKit voice agents overview
    url: 'https://livekit.com/voice-agents'
    note: >-
      Explains S2S versus STT-LLM-TTS tradeoffs, WebRTC, interruptions, and
      production challenges.
    i18n:
      zh:
        title: LiveKit Voice Agents 概览
        note: 说明 S2S 与 STT-LLM-TTS 取舍、WebRTC、打断和生产挑战。
  - title: Retell AI pricing
    url: 'https://www.retellai.com/pricing'
    note: Current managed phone-agent pricing and concurrency reference.
    i18n:
      zh:
        title: Retell AI 价格
        note: 当前托管电话 Agent 价格和并发参考。
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=iLtA8UmInEQ'
  title: OpenAI Realtime API voice agent tutorial with phone-call demo
  i18n:
    zh:
      title: OpenAI Realtime API 语音 Agent 教程：含电话演示
workflowDiagram:
  steps:
    - type: step
      icon: "\U0001F399"
      label: Open session
      substeps:
        - Use WebRTC or SIP
        - Set voice and tools
      i18n:
        zh:
          label: 开启会话
          substeps:
            - 用 WebRTC/SIP
            - 设置声音和工具
    - type: step
      icon: "\U0001F442"
      label: Send audio
      substeps:
        - Stream mic frames
        - Keep event log
      i18n:
        zh:
          label: 输入语音
          substeps:
            - 流式上传
            - 记录事件
    - type: step
      icon: "\U0001F5E3"
      label: Speak back
      substeps:
        - Stream audio response
        - Preserve prosody
      i18n:
        zh:
          label: 语音回复
          substeps:
            - 流式返回
            - 保留语气
    - type: decision
      icon: ✋
      label: Needs action?
      'yes':
        label: Call tool
        i18n:
          zh:
            label: 调工具
      'no':
        label: Continue
        i18n:
          zh:
            label: 继续
      i18n:
        zh:
          label: 需动作？
    - type: step
      icon: "\U0001F9EA"
      label: Run eval calls
      substeps:
        - Interruptions
        - Tool precision
      i18n:
        zh:
          label: 评测通话
          substeps:
            - 打断测试
            - 工具精度
    - type: end
      icon: "\U0001F4CA"
      label: Decide S2S or chain
      i18n:
        zh:
          label: 选择架构
featured: true
i18n:
  zh:
    title: 实时 Speech-to-Speech Voice Agent
    description: 当自然语气、打断体验和快速原型速度比组件级 STT/TTS 控制更重要时，使用原生 speech-to-speech 模型。
    body: >-
      ## 先判断 S2S 是优势还是黑盒


      Speech-to-speech Agent
      的核心价值是少拼几层：用户语音直接进入实时模型，模型直接输出语音，同时保留语气、停顿、情绪和上下文线索。OpenAI 的 Voice Agents
      指南把它和 chained STT→LLM→TTS 架构并列为两条路线。你选择
      S2S，不是因为它“更新”，而是因为你愿意用较少组件控制换取更自然的对话感和更快的原型速度。


      ### 适合自然对话优先的产品


      语音陪练、AI tutor、虚拟陪伴、实时咨询、面试练习和高互动客服都可能从 S2S
      获益。用户会打断、犹豫、笑、改口，模型如果能直接听到这些语音线索，体验会比纯文本链路自然。页面里的 OpenAI Realtime
      教程可以作为最小电话 demo 的参考，但生产前要补上日志、评测和降级路径。


      ### 不适合强审计或逐层调优的链路


      如果你需要逐字 transcript 作为法律记录、单独替换 STT、控制 TTS
      供应商、做大量术语词表，或把每层成本压到最低，模块化链路更合适。S2S 的反直觉风险是：demo
      更顺滑，但失败时更难解释哪一层错了。越是严肃业务，越要补事件日志、录音、工具调用记录和人工复盘。


      ## 设计生产参考路径


      第一版不要试图做全能 Agent。选一个明确场景，比如预约改期、语言练习、客服 FAQ
      或销售资格筛选。定义允许做的动作、必须确认的动作、不能做的动作，然后接入 WebRTC 或 SIP、创建 realtime
      session、配置声音、工具和安全提示词。


      ### 把打断当成核心功能


      S2S 的价值很大一部分在 turn-taking。测试时不要只问三句顺畅问题，要在 Agent
      播放长句时插话、在工具调用前后改变主意、用噪声环境说短句、让用户停顿 2 秒后继续说。OpenAI 和 LiveKit
      的资料都强调，打断和端点判断是 voice agent 从 demo 到生产的关键，不是最后的 polish。


      ### 工具调用要保守


      Realtime
      模型可以调用工具，但语音里的误听和用户改口会放大风险。查询类工具可以快，写入类工具要确认。取消播放不等于取消动作；用户打断时，系统要知道当前是在“说话”“思考”“查数据”还是“执行不可逆操作”。这些状态要进入事件日志。


      ## 选工具时看产品阶段


      OpenAI Realtime 适合测试原生 S2S 体验、工具调用和 SIP/WebRTC 路线；Retell AI 和 Vapi
      适合更快接入电话、日志、分析和运营能力；LiveKit 或 Pipecat 适合当你需要从 S2S
      原型迁移到可控的实时媒体基础设施。Cartesia、ElevenLabs、Deepgram 则是当你转向模块化时常见的语音组件。


      ### 成本要按真实会话估


      Retell 官方价格页显示 AI Voice Agent 为 $0.07-$0.31/分钟，约 RMB
      0.5-2.2/分钟。Vapi、OpenAI Realtime 和其他组件也会按模型、电话、语音和用量叠加。S2S
      常见误判是只算“成功通话”，不算沉默、重试、用户挂断、工具失败和评测通话。先跑 100 通代表性会话，再做月成本。


      ### 保留架构出口


      如果 S2S 在体验上赢了，但审计、成本或供应商锁定变成问题，要能迁移到 chained pipeline。保留转写、提示词版本、工具
      schema、通话评测集和用户同意记录。这样未来切到 LiveKit/Pipecat + Deepgram +
      Cartesia/ElevenLabs 时，不需要从零定义产品行为。


      ## 上线前用评测通话说话


      最少准备 30
      条脚本：短问答、长解释中断、口音、噪声、改口、工具失败、越权请求、敏感信息、转人工和超时。每条都记录预期行为。上线标准不是“听起来像人”，而是
      P95 响应时间、missed interruption、工具参数正确率、用户重复率和人工接管率都在可接受范围内。


      ### 不要让自然声音掩盖风险


      越自然的声音越容易让用户相信 Agent 已经理解并承诺了某件事。生产系统要把能力边界说清楚，尤其是医疗、金融、招聘、教育和客服场景。S2S
      可以让对话更顺，但它不会自动解决授权、隐私、合规、错误恢复和用户信任。


      ### 负责人规则


      给这条流程指定一个负责人。没有负责人时，生成资产会越堆越多，质检标准会漂移，团队也不知道哪个版本可以复用。负责人不需要亲手做所有步骤，但要维护检查表、批准最终导出，并判断工具结果是否够用，还是应该人工重做。
---
## Decide whether S2S is leverage or opacity

Speech-to-speech agents send user audio into a realtime model and stream speech back without forcing every turn through a separate STT, LLM, and TTS chain. The value is not novelty. The value is that the model can preserve prosody, hesitation, interruption, and spoken context while reducing integration work.

### Use it when conversation quality is the product

S2S is strongest for tutoring, coaching, companion, interview practice, live consultation, and high-touch support where users interrupt, hesitate, laugh, and change their mind. If the user experience depends on natural turn-taking more than perfect component control, a realtime model is worth testing early.

### Avoid it when auditability dominates

Use a chained pipeline when you need an authoritative transcript, strict per-layer cost control, independent STT/TTS replacement, custom vocabulary handling, or regulated review. The tradeoff is simple: S2S can feel better in a demo, but failures are harder to attribute. Serious deployments need event logs, recordings, tool-call records, and eval calls.

## Build the reference path

Start with one narrow use case: appointment changes, language practice, customer FAQ, lead qualification, or internal helpdesk triage. Define allowed actions, actions that require confirmation, and actions that are never allowed. Then wire WebRTC or SIP, create the realtime session, set the voice, configure tools, and log every session event.

### Test interruption as a first-class feature

Do not test only polite three-turn conversations. Interrupt the agent during a long explanation. Change your mind after a tool call starts. Speak from a noisy room. Pause for two seconds, then continue. The practical promise of S2S is better turn-taking; if that does not survive messy calls, the architecture is not buying you enough.

### Treat tool calls as state transitions

Realtime models can call tools, but voice mistakes make actions riskier. Reads can be fast. Writes should be confirmed. Cancelling audio is not the same as cancelling a database update, transfer, or booking. Track whether the agent is speaking, reasoning, waiting on a tool, or performing an irreversible action.

### Keep a transcript even if the model does not need one

Native speech-to-speech may not need a transcript to respond, but your product team still does. Store an approximate transcript, session event log, tool arguments, and final user-visible action for every eval call. This gives support, safety, and engineering the same evidence when a user says the agent misunderstood them. If the transcript is generated by a secondary model, label it as a post-call artifact rather than the source of truth used by the realtime model.

## Choose tools by product stage

OpenAI Realtime is the direct S2S route for testing native speech interaction, tool use, and WebRTC/SIP patterns. Retell AI and Vapi are better when phone numbers, analytics, simulations, and call operations matter immediately. LiveKit and Pipecat become more attractive when you need media ownership or a migration path back to a modular stack.

### Price with real conversations

Retell currently lists AI voice agents at $0.07-$0.31 per minute. Other stacks combine platform fees, telephony, model usage, STT, and TTS. Price 100 representative conversations, including silence, retries, tool failures, hangups, and eval calls. A smooth demo call is not a cost model.

### Keep an exit path

Even if S2S wins the first UX test, preserve transcripts, prompt versions, tool schemas, consent records, and eval audio. If cost, compliance, or provider lock-in becomes the problem, those artifacts let you move toward LiveKit or Pipecat with Deepgram, Cartesia, or ElevenLabs without redesigning the product behavior.

### Separate prototype speed from production ownership

The fastest S2S prototype usually hides a lot of production work: user authentication, rate limiting, prompt versioning, content filters, call recording policy, human handoff, and incident review. Make those explicit in the roadmap. A good milestone is "50 successful supervised calls" before "self-serve beta," and "one week of monitored production traffic" before routing important business calls through the agent.

## Launch with eval calls

Before launch, write at least 30 test calls that cover normal tasks, long interruptions, accents, noise, user corrections, tool failures, forbidden requests, sensitive data, human handoff, and timeout. The embedded OpenAI Realtime tutorial is useful for the build path; your production gate is whether the agent behaves correctly under those scripted failures.

### Do not let natural speech hide risk

The more natural the voice sounds, the more users may assume the agent understood, promised, or approved something. That matters in support, recruiting, finance, healthcare, and education. S2S can make the conversation smoother, but it does not remove the need for consent, privacy controls, escalation, and conservative action policy.

### Pre-launch checklist

Before sending real users into the flow, confirm that every session has a timeout, a reconnect path, and a clear way to reach a human or text fallback. Run eval calls for interruptions, multilingual drift, tool hallucination, unsafe requests, private-data requests, and long silences. Review the first 100 calls manually enough to know which failure mode is actually common; teams often over-optimize model voice and under-invest in recovery prompts.

One final check: decide what happens when the agent sounds confident but the backend is uncertain. If inventory, calendar, account status, or policy data is missing, the agent should say that plainly and offer a follow-up path. A natural voice should never be used to smooth over missing state.

### Ownership rule

Assign one owner for the workflow. Without an owner, generated assets accumulate, QA decisions drift, and no one knows which version is safe to reuse. The owner does not need to do every task, but they should maintain the checklist, approve final exports, and decide when a tool result is good enough or when the team should redo the work manually.
