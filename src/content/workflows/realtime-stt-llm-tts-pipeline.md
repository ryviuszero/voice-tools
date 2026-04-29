---
title: Realtime STT-to-LLM-to-TTS Pipeline
user_group: voice_ai_builders
description: >-
  Build a modular voice pipeline where transport, VAD, STT, LLM, TTS, and
  observability can be measured, swapped, and scaled independently.
budget_min_usd: 100
budget_max_usd: 800
tools:
  - deepgram
  - cartesia
  - openai-realtime
  - vapi
  - livekit
  - pipecat
  - elevenlabs
tool_recommendations:
  - tier: production_default
    tool_slug: livekit
    tool_name: LiveKit
    url: >-
      https://livekit.com/blog/voice-agent-architecture-stt-llm-tts-pipelines-explained
    pricing: Free OSS; Cloud has free and paid tiers
    summary: >-
      Use it when WebRTC transport, agent sessions, plugin swapping, and latency
      tracing need to live in one voice stack.
    caveat: >-
      Self-hosted deployments still require worker scaling, regional placement,
      and replay tooling.
    i18n:
      zh:
        summary: 当 WebRTC 传输、Agent session、插件替换和延迟追踪要放在同一语音栈里时适合。
        pricing: 开源免费；Cloud 有免费和付费档
        caveat: 自托管仍要处理 worker 扩容、区域部署和回放工具。
  - tier: production_default
    tool_slug: deepgram
    tool_name: Deepgram
    url: 'https://deepgram.com/pricing'
    pricing: Nova/Flux STT from $0.0077/min
    summary: >-
      Streaming STT layer for partial transcripts, endpointing, diarization
      options, and low-latency voice-agent input.
    caveat: >-
      Accuracy depends on audio capture, domain vocabulary, and noisy-device
      testing.
    i18n:
      zh:
        summary: 适合 partial transcript、端点检测、说话人选项和低延迟 Voice Agent 输入的 STT 层。
        pricing: Nova/Flux STT $0.0077/分钟起
        caveat: 准确率仍取决于采音、领域词和噪声设备测试。
  - tier: production_default
    tool_slug: cartesia
    tool_name: Cartesia
    url: 'https://cartesia.ai/pricing'
    pricing: Free plan; Pro $4/mo; Startup $39/mo
    summary: >-
      Low-latency TTS and voice-agent platform with Sonic voices, streaming
      output, and explicit concurrency limits by plan.
    caveat: >-
      It covers the voice layer; you still need orchestration, tools, and safety
      policy.
    i18n:
      zh:
        summary: 低延迟 TTS 和语音 Agent 平台，包含 Sonic 声音、流式输出和按套餐区分的并发限制。
        pricing: Free；Pro $4/月；Startup $39/月
        caveat: 它覆盖语音层，编排、工具和安全策略仍要自己设计。
  - tier: fast_rising
    tool_slug: elevenlabs
    tool_name: ElevenLabs
    url: 'https://elevenlabs.io/pricing/'
    pricing: Starter from $6/mo; Creator from $22/mo
    summary: >-
      Polished hosted TTS and voice library option when brand voice quality
      matters more than open infrastructure.
    caveat: >-
      Monitor character, concurrency, and voice-clone usage before long-running
      realtime deployment.
    i18n:
      zh:
        summary: 当品牌声音质量比开放基础设施更重要时，ElevenLabs 是成熟的托管 TTS 选择。
        pricing: Starter $6/月起；Creator $22/月起
        caveat: 长时间实时部署前要监控字符、并发和克隆声音用量。
  - tier: fast_rising
    tool_slug: openai-realtime
    tool_name: OpenAI Realtime API
    url: 'https://platform.openai.com/docs/guides/voice-agents'
    pricing: Usage-based Realtime API pricing
    summary: >-
      Compare against the modular chain when native speech-to-speech can beat
      component tuning for user experience.
    caveat: >-
      Lower pipeline visibility; keep it as an architecture comparison, not a
      drop-in STT/TTS replacement.
    i18n:
      zh:
        summary: 当原生 speech-to-speech 体验可能胜过逐层调参时，用它和模块化链路对比。
        pricing: Realtime API 按量计费
        caveat: 中间层可见性更低，应作为架构对照，而不是 STT/TTS 的直接替代。
  - tier: open_or_self_hosted
    tool_slug: pipecat
    tool_name: Pipecat
    url: 'https://github.com/pipecat-ai/pipecat'
    pricing: Free open source; bring models and transport
    summary: >-
      Framework route for teams that want to assemble STT, LLM, TTS, VAD,
      transport, and app logic themselves.
    caveat: 'You must own deployment, provider retries, traces, and regression tests.'
    i18n:
      zh:
        summary: 适合自己拼 STT、LLM、TTS、VAD、传输和业务逻辑的团队。
        pricing: 开源免费；模型和传输自备
        caveat: 部署、供应商重试、追踪和回归测试都要自己负责。
  - tier: open_or_self_hosted
    tool_slug: livekit
    tool_name: LiveKit self-hosted
    url: 'https://docs.livekit.io/agents/voice-agent/voice-pipeline/'
    pricing: Free OSS; infra and model costs extra
    summary: >-
      Self-host when data residency, provider control, or media-layer
      customization outweighs managed convenience.
    caveat: >-
      The savings only appear if your team can operate realtime workers
      reliably.
    i18n:
      zh:
        summary: 当数据驻留、供应商控制或媒体层定制比托管便利更重要时再自托管。
        pricing: 开源免费；另算基础设施和模型费用
        caveat: 只有团队能稳定运维实时 worker，成本优势才会显现。
sources:
  - title: LiveKit voice-agent architecture guide
    url: >-
      https://livekit.com/blog/voice-agent-architecture-stt-llm-tts-pipelines-explained
    note: >-
      Gives current latency budgets for transport, STT, LLM first token, TTS
      first audio, and scaling patterns.
    i18n:
      zh:
        title: LiveKit Voice Agent 架构指南
        note: 提供传输、STT、LLM 首 token、TTS 首音频和扩容模式的当前延迟预算。
  - title: LiveKit Agents voice pipeline docs
    url: 'https://docs.livekit.io/agents/voice-agent/voice-pipeline/'
    note: >-
      Official docs for composing STT, LLM, TTS, realtime models, interruptions,
      and agent sessions.
    i18n:
      zh:
        title: LiveKit Agents 语音链路文档
        note: 官方说明 STT、LLM、TTS、realtime 模型、打断和 Agent session 组合。
  - title: Deepgram pricing
    url: 'https://deepgram.com/pricing'
    note: >-
      Current public pricing for streaming STT, add-ons, concurrency, and Voice
      Agent API.
    i18n:
      zh:
        title: Deepgram 价格
        note: 当前流式 STT、附加能力、并发和 Voice Agent API 公开价格。
  - title: Cartesia pricing
    url: 'https://cartesia.ai/pricing'
    note: >-
      Current plan, credit, concurrency, Sonic TTS, and Line voice-agent cost
      reference.
    i18n:
      zh:
        title: Cartesia 价格
        note: 当前套餐、credits、并发、Sonic TTS 和 Line Voice Agent 费用参考。
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=78JFdQd04Kg'
  title: 'LiveKit local AI voice agent tutorial with STT, LLM, and TTS components'
  i18n:
    zh:
      title: LiveKit 本地 AI 语音 Agent 教程：拆解 STT、LLM 和 TTS 组件
workflowDiagram:
  steps:
    - type: step
      icon: "\U0001F399"
      label: Capture audio
      substeps:
        - Use WebRTC when possible
        - Add echo control
      i18n:
        zh:
          label: 采集音频
          substeps:
            - 优先 WebRTC
            - 加回声控制
    - type: step
      icon: "\U0001F6A6"
      label: Gate turns
      substeps:
        - VAD and endpointing
        - Keep partials
      i18n:
        zh:
          label: 判断轮次
          substeps:
            - VAD 和端点
            - 保留 partial
    - type: step
      icon: "\U0001F4DD"
      label: Stream STT
      substeps:
        - Emit partial text
        - Track confidence
      i18n:
        zh:
          label: 流式转写
          substeps:
            - 输出 partial
            - 记录置信度
    - type: step
      icon: "\U0001F9E0"
      label: Route LLM
      substeps:
        - First token budget
        - Tool-call policy
      i18n:
        zh:
          label: 路由模型
          substeps:
            - 首 token 预算
            - 工具策略
    - type: step
      icon: "\U0001F50A"
      label: Stream TTS
      substeps:
        - First audio budget
        - Cancel on barge-in
      i18n:
        zh:
          label: 流式合成
          substeps:
            - 首音频预算
            - 打断时取消
    - type: decision
      icon: "\U0001F4C8"
      label: Under 1s?
      'yes':
        label: Load test
        i18n:
          zh:
            label: 压测
      'no':
        label: Tune layer
        loop: true
        i18n:
          zh:
            label: 调单层
      i18n:
        zh:
          label: 低于1秒？
    - type: end
      icon: "\U0001F4CA"
      label: Replay calls
      i18n:
        zh:
          label: 回放通话
featured: true
i18n:
  zh:
    title: 实时 STT→LLM→TTS 链路
    description: 构建模块化语音链路，让传输、VAD、STT、LLM、TTS 和观测都能独立测量、替换和扩容。
    body: >
      ## 先决定你是不是真的需要模块化


      STT→LLM→TTS 链路的价值不是“看起来更工程化”，而是每一层都能单独替换、计费、评测和回放。它适合电话
      Agent、网页语音助手、通话分析、AI tutor 和需要多供应商策略的团队。LiveKit 的架构指南把实时语音延迟拆成传输、STT 首个
      partial、LLM 首 token、TTS 首音频四段，并把自然对话目标放在 1
      秒以内。这个数字不是硬规则，但足够提醒你：每多一次跨区域请求，体验都会变钝。


      ### 适合有工程控制需求的团队


      如果你需要自定义词表、行业术语、独立 STT 账单、不同 TTS 声音、私有部署、通话回放或 provider
      fallback，模块化链路更合理。如果只是想快速验证一个语音产品，OpenAI Realtime、Retell 或 Vapi
      可能更快。不要为了“可控”而承担你暂时用不到的复杂度。


      ### 不适合没有观测能力的团队


      模块化最大的坑是责任被拆散后没人能解释失败。用户听到 2 秒停顿，可能是 WebRTC 抖动、VAD 误判、STT 等 final、LLM
      工具调用慢、TTS 首音频慢，也可能只是你缓冲太多。没有 per-stage trace，模块化只会让排障更慢。


      ## 设计可测的参考链路


      先做一条最小生产链：WebRTC 或电话媒体输入、VAD、streaming STT、LLM、streaming
      TTS、播放控制、事件日志。每个节点都要写入同一个 call timeline。第一版不要追求多模型路由，先让一条链路在真实噪声下稳定跑完 100
      通测试。


      ### 给每一层预算，而不是只看总延迟


      可以从 LiveKit 给出的参考开始：WebRTC 传输尽量低于 50ms，STT partial 约 100-200ms，LLM 首 token
      约 200-400ms，TTS 首音频约 100-300ms。中文、电话窄带音质、远距离
      region、复杂工具调用都会把这些数字推高。预算的作用不是保证达标，而是快速发现哪一层在失控。


      ### 先优化位置，再优化模型


      非直觉的一点是，很多延迟不是模型慢，而是媒体服务器、模型 endpoint 和业务后端跨区域。把 LiveKit
      worker、STT、LLM、TTS 和业务 API 放在相近区域，往往比换一个更贵模型有效。等网络路径稳定后，再比较
      Deepgram、Cartesia、ElevenLabs 或自托管模型。


      ### 把工具调用当成链路的一部分


      Voice Agent 经常需要查订单、改预约、取 CRM 信息。工具调用不能只算在 LLM
      里，要单独记录开始、结束、失败和可否取消。用户插话时，TTS 可以取消，但数据库写入不一定能取消；这类规则要写进 pipeline
      policy，而不是留给模型临场发挥。


      ## 按层选择工具


      LiveKit 适合把实时媒体、Agent session、插件和观测放在一起；Pipecat 适合需要更自由拼装的开源链路。Deepgram
      的公开价格页显示 Nova/Flux STT 从 $0.0077/分钟起，约 RMB 0.056/分钟起；Cartesia 的 Free、Pro
      $4/月、Startup $39/月和 Sonic/Line 能力适合做低延迟 TTS 与 Agent 原型；ElevenLabs
      适合对品牌声音有要求的团队。


      ### 托管和自托管要按运维能力算


      自托管看起来便宜，但你要负责 worker
      扩容、排队、重试、区域调度、音频存储和故障回放。托管平台每分钟更贵，却可能减少上线时间。判断标准很简单：如果你现在还没有稳定的事件追踪和告警，先用托管或半托管把产品跑起来，再决定要不要下沉。


      ### 用本地教程理解组件边界


      页面里的 LiveKit 本地 Agent 视频把 Whisper、LLM、TTS 和 LiveKit
      放进一个可运行示例，适合理解组件如何互相连接。它不是生产架构模板，但能帮助团队看清每一层的输入输出，再把云端 provider
      或自托管模型替换进去。


      ## 上线前保留回放能力


      预上线检查不只是“能说话”。你要能回放 10 条失败通话，看到每一层耗时和事件顺序；能把同一段音频重新跑过新参数；能统计 P95 响应时间、STT
      空白率、TTS 首音频、工具调用失败率和用户重复提问比例。等这些数据稳定后，再谈扩容和成本优化。


      ### 把模型替换做成实验


      每次换 STT、LLM 或 TTS，都用同一批音频和同一批任务跑 A/B。只听 demo
      很容易被声音质感骗过；真正影响留存的是错误恢复、打断、长尾口音、工具调用和账单稳定性。模块化的价值就在这里：你可以有纪律地换一层，而不是重做整套产品。
---
## Decide whether modularity is worth the weight

A realtime STT-to-LLM-to-TTS pipeline is valuable because every layer can be measured, replaced, priced, and replayed independently. It is the right architecture for phone agents, browser voice assistants, call analysis, AI tutors, and products that need provider control. It is not automatically better than speech-to-speech. It is better when you can use the control.

### Use it when each layer has a reason to exist

Choose the modular path when you need domain vocabulary in STT, a specific LLM, a particular TTS voice, regional deployment, private media handling, provider fallback, or detailed call replay. If the goal is to validate whether users like talking to the product at all, start with a managed platform or a native realtime model first.

### Avoid it without per-stage observability

The main failure mode is not writing too much code. It is being unable to explain the silence. A two-second pause might be WebRTC jitter, VAD waiting for final silence, STT finalization, LLM first-token delay, a slow tool call, TTS first-audio latency, or your playback buffer. Without traces, modularity makes debugging slower.

## Design the reference path

Start with one boring chain: low-latency transport, VAD, streaming STT, LLM, streaming TTS, playback control, and one event timeline. Do not add three model routes on day one. Run 100 realistic calls through the first path, then optimize the failing layer.

### Budget latency by stage

LiveKit's current architecture guide breaks perceived latency into transport, STT first partial, LLM time-to-first-token, and TTS time-to-first-audio. A useful starting budget is under 50ms for WebRTC transport, 100-200ms for STT partials, 200-400ms for LLM first token, and 100-300ms for TTS first audio. Treat those as debugging targets, not guarantees.

### Optimize geography before model choice

The non-obvious win is often placement. If media transport, STT, LLM, TTS, and your business API sit in different regions, round trips will erase the gains from a faster model. Co-locate the worker, inference endpoints, and tool backend where possible before paying for premium speech quality.

### Make tool calls part of the pipeline

Voice agents do not only chat. They book, search, update records, and transfer calls. Log tool-call start, finish, failure, timeout, and cancellation policy separately. Audio playback can usually be cancelled on barge-in; a database write or payment action may need to finish silently or ask for confirmation.

### Add fallback at each boundary

Every streaming boundary needs a failure behavior. If STT confidence is low, ask a short clarification rather than sending garbage to the LLM. If the LLM stalls, play a brief holding phrase or transfer. If TTS fails, fall back to a simpler voice or text channel. If transport reconnects, resume with a summary instead of pretending nothing happened. These fallbacks are unglamorous, but they are what make a modular chain survive real users.

## Choose the stack by ownership

LiveKit is the strongest default when you want media transport, agent sessions, plugins, and observability in one stack. Deepgram is a practical STT layer when partial transcripts, endpointing, and noisy input matter. Cartesia or ElevenLabs are strong TTS choices depending on whether low-latency voice-agent work or polished brand voice is the priority.

### Compare managed and self-hosted honestly

Deepgram lists Nova and Flux STT from $0.0077 per minute. Cartesia's current pricing includes a free plan, Pro at $4/month, Startup at $39/month, Sonic TTS credits, and Line voice-agent rates. Those numbers only cover pieces of the system. Add LLM tokens, telephony, retries, storage, monitoring, and failed calls before calling a stack cheap.

### Use local builds to learn the boundaries

The embedded LiveKit local-agent tutorial is useful because it makes the component boundaries visible: LiveKit for realtime media, Whisper for STT, a local LLM, and a local TTS service. Do not copy it directly into production unless the latency and hardware fit your use case; use it to understand what each layer owns.

### Document the contract between layers

Write a small contract for each interface: audio frame format, transcript event shape, partial versus final behavior, tool-call schema, TTS chunk format, cancellation event, and error payload. The contract prevents provider swaps from becoming a rewrite. It also gives QA something concrete to test when a new model version changes punctuation, endpointing, or streaming cadence.

## Launch with replay, not hope

Before launch, keep a replay set of successful calls and failures. You should be able to run the same audio through a new STT model, replay the same transcript through a new LLM prompt, and compare TTS first-audio timing across voices. This is the practical advantage of modular architecture.

### Promote failures into tests

Track P95 time-to-agent-speech, STT empty or low-confidence segments, LLM first-token delay, TTS first-audio delay, tool-call timeout rate, missed barge-in, and user repeat requests. Every model change should run against the same sample set. The stack is production-ready only when you can change one layer without losing the ability to explain the result.

### Security and retention notes

Decide early whether raw audio, transcripts, tool results, and derived summaries are retained, redacted, or deleted. Phone and support use cases often contain names, addresses, account details, or health and payment hints even when the product is not formally in a regulated category. Keep a short retention policy in the repo, and make sure debugging convenience does not quietly turn into permanent storage of sensitive calls.

For cross-border teams, include region in the trace metadata. A failure that appears to be model latency may be a routing problem between the caller, media worker, STT region, LLM region, and business API. Region-aware traces make scaling decisions less superstitious.
