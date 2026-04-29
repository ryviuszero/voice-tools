---
title: Turn Detection and Barge-In Optimization
user_group: voice_ai_builders
description: >-
  Tune VAD, endpointing, echo control, and interruption policy so a voice agent
  knows when to listen, when to stop speaking, and when to ignore noise.
budget_min_usd: 0
budget_max_usd: 300
tools:
  - openai-realtime
  - livekit
  - vapi
  - deepgram
  - silero-vad
  - pipecat
  - retell-ai
tool_recommendations:
  - tier: production_default
    tool_slug: livekit
    tool_name: LiveKit
    url: 'https://docs.livekit.io/agents/build/turns/'
    pricing: Free OSS; Cloud has free and paid tiers
    summary: >-
      Best starting point when you want explicit VAD, endpointing, interruption,
      and turn-detector control inside your own agent stack.
    caveat: >-
      You own test coverage for noisy rooms, echo, mobile devices, and tool-call
      interruption behavior.
    i18n:
      zh:
        summary: 当你需要自己控制 VAD、端点检测、打断和 turn detector 时，LiveKit 是更合适的起点。
        pricing: 开源免费；Cloud 有免费和付费档
        caveat: 噪声、回声、移动端和工具调用打断都要自己做测试覆盖。
  - tier: production_default
    tool_slug: openai-realtime
    tool_name: OpenAI Realtime API
    url: 'https://platform.openai.com/docs/guides/realtime'
    pricing: Usage-based Realtime API pricing
    summary: >-
      Use provider-side realtime turn detection when speech-to-speech quality
      matters more than swapping each pipeline layer.
    caveat: >-
      Less component visibility than a modular STT-LLM-TTS stack; log events
      carefully.
    i18n:
      zh:
        summary: 当原生 speech-to-speech 体验比逐层替换更重要时，用 provider 侧实时 turn detection。
        pricing: Realtime API 按量计费
        caveat: 组件级可见性不如模块化链路，必须认真记录事件。
  - tier: production_default
    tool_slug: retell-ai
    tool_name: Retell AI
    url: 'https://www.retellai.com/pricing'
    pricing: $0.07-$0.31/min for AI voice agents
    summary: >-
      Managed phone-agent route when you need interruption handling, call
      analytics, and fast deployment more than low-level tuning.
    caveat: >-
      Validate long confirmations, transfers, and webhook failures before
      trusting live calls.
    i18n:
      zh:
        summary: 需要打断处理、通话分析和快速上线，而不是底层细调时，Retell 更省工程时间。
        pricing: AI Voice Agent $0.07-$0.31/分钟
        caveat: 长确认、转接和 webhook 失败路径上线前必须压测。
  - tier: fast_rising
    tool_slug: deepgram
    tool_name: Deepgram
    url: 'https://deepgram.com/pricing'
    pricing: Flux/Nova STT from $0.0077/min
    summary: >-
      Strong fit when endpointing quality and streaming transcripts are the
      failure point in a modular voice pipeline.
    caveat: VAD and UX still decide whether the agent stops speaking quickly enough.
    i18n:
      zh:
        summary: 当模块化链路的问题集中在端点检测和流式转写时，Deepgram 是值得测试的 STT 层。
        pricing: Flux/Nova STT $0.0077/分钟起
        caveat: Agent 是否快速停下仍取决于 VAD 和前端 UX。
  - tier: fast_rising
    tool_slug: vapi
    tool_name: Vapi
    url: 'https://vapi.ai/pricing'
    pricing: Usage-based platform plus model and telephony costs
    summary: >-
      Useful for comparing provider-level interruption settings without owning
      every transport and telephony detail.
    caveat: >-
      Test with your exact STT, TTS, model, phone route, and barge-in prompts
      because defaults vary by stack.
    i18n:
      zh:
        summary: 适合快速比较不同 provider 的打断设置，而不用自己管理所有电话和传输细节。
        pricing: 平台、模型和电话按量叠加
        caveat: 必须用真实 STT、TTS、模型、电话线路和打断话术测试。
  - tier: open_or_self_hosted
    tool_slug: silero-vad
    tool_name: Silero VAD
    url: 'https://github.com/snakers4/silero-vad'
    pricing: Free open source; local inference
    summary: >-
      Lightweight VAD component for teams that want local speech activity
      detection and reproducible tests.
    caveat: >-
      It detects speech activity, not intent; pair it with endpointing or
      model-based turn detection.
    i18n:
      zh:
        summary: 适合需要本地语音活动检测和可复现实验的轻量 VAD 组件。
        pricing: 开源免费；本地推理
        caveat: 它只能判断有没有人在说话，不能判断用户意图。
  - tier: open_or_self_hosted
    tool_slug: pipecat
    tool_name: Pipecat
    url: 'https://github.com/pipecat-ai/pipecat'
    pricing: Free open source; bring models and transport
    summary: >-
      Open framework for building and testing custom interruption, VAD, STT,
      LLM, TTS, and transport behavior.
    caveat: >-
      Flexibility means you must build the observability and replay loop
      yourself.
    i18n:
      zh:
        summary: 用于自定义打断、VAD、STT、LLM、TTS 和传输行为的开源框架。
        pricing: 开源免费；模型和传输自备
        caveat: 灵活性高，也意味着观测和回放链路要自己搭。
sources:
  - title: LiveKit Turns overview
    url: 'https://docs.livekit.io/agents/build/turns/'
    note: >-
      Explains VAD, STT endpointing, realtime-model turn detection, manual turn
      control, and interruption setup.
    i18n:
      zh:
        title: LiveKit Turns 概览
        note: 说明 VAD、STT endpointing、realtime 模型 turn detection、手动控制和打断设置。
  - title: LiveKit turn detection guide
    url: >-
      https://livekit.com/blog/turn-detection-voice-agents-vad-endpointing-model-based-detection
    note: >-
      Useful field guide for VAD, endpointing, model-based detection, echo
      cancellation, and barge-in tradeoffs.
    i18n:
      zh:
        title: LiveKit Turn Detection 指南
        note: 可参考 VAD、端点检测、模型检测、回声消除和打断取舍。
  - title: OpenAI Realtime voice design
    url: 'https://platform.openai.com/docs/guides/realtime/voice-design'
    note: >-
      Official reference for realtime voice UX and speech-to-speech agent
      behavior.
    i18n:
      zh:
        title: OpenAI Realtime 语音设计
        note: 官方实时语音体验和 speech-to-speech Agent 行为参考。
  - title: Deepgram pricing
    url: 'https://deepgram.com/pricing'
    note: >-
      Current reference for Flux/Nova streaming STT pricing and Voice Agent API
      rates.
    i18n:
      zh:
        title: Deepgram 价格
        note: 用于核对 Flux/Nova 流式 STT 和 Voice Agent API 当前价格。
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=8GK8R77Bd7g'
  title: Vapi realtime AI voice agent build with interruption testing points
  i18n:
    zh:
      title: Vapi 实时语音 Agent 构建教程：包含打断测试要点
workflowDiagram:
  steps:
    - type: step
      icon: "\U0001F3A7"
      label: Capture traces
      substeps:
        - Mark speech start and stop
        - Record playback state
      i18n:
        zh:
          label: 记录时间线
          substeps:
            - 标记说话起止
            - 记录播放状态
    - type: step
      icon: "\U0001F399"
      label: Gate speech
      substeps:
        - Tune VAD threshold
        - Add echo control
      i18n:
        zh:
          label: 过滤语音
          substeps:
            - 调 VAD 阈值
            - 加回声控制
    - type: step
      icon: ⏱
      label: Choose endpoint
      substeps:
        - Fixed or dynamic delay
        - Test pauses
      i18n:
        zh:
          label: 设置端点
          substeps:
            - 固定或动态延迟
            - 测停顿
    - type: decision
      icon: ✋
      label: Real barge-in?
      'yes':
        label: Cancel audio
        i18n:
          zh:
            label: 停止播报
      'no':
        label: Ignore noise
        i18n:
          zh:
            label: 忽略噪声
      i18n:
        zh:
          label: 真打断？
    - type: step
      icon: "\U0001F9EA"
      label: Replay failures
      substeps:
        - Keep audio samples
        - Compare settings
      i18n:
        zh:
          label: 回放失败
          substeps:
            - 保存样本
            - 对比设置
    - type: end
      icon: "\U0001F4CA"
      label: Monitor drift
      i18n:
        zh:
          label: 监控漂移
featured: true
i18n:
  zh:
    title: Turn Detection 与打断优化
    description: 调优 VAD、端点检测、回声控制和打断策略，让 Voice Agent 知道什么时候听、什么时候停，以及什么时候忽略噪声。
    body: >
      ## 先把问题从“延迟高”拆开


      很多 Voice Agent 的体验问题看起来像延迟，其实是 turn detection 没有被拆开测。用户还没说完时 Agent 抢答，是
      endpointing 太激进；用户说“等一下”但 Agent 继续念完，是 barge-in 没接住；客厅电视或外放回声触发打断，则是 VAD
      和回声控制没处理好。不要一上来换大模型，先把“用户开始说话、用户停止说话、STT partial、LLM 首 token、TTS
      首音频、播放取消”这些时间点记录下来。


      ### 适合已经有可运行 Agent 的团队


      这篇更适合已经跑通电话 Agent、网页语音助手、AI tutor
      或陪伴应用的开发者。你不需要先重写全套架构，只要能导出事件日志和一小段真实音频，就可以开始调参。相反，如果你的 Agent
      还没有稳定业务逻辑，先别花太多时间调 50ms 的 VAD；脚本、工具调用和错误恢复更可能是瓶颈。


      ### 不要把 VAD 当成理解能力


      VAD 只判断“有没有人在说话”，不能判断用户是在回应、插话、清嗓子还是背景噪声。更稳的做法是把 VAD 作为低延迟门控，再结合 STT
      endpointing、语义 turn detector 或业务层策略。LiveKit 文档也把实时模型、STT endpointing、模型式
      turn detection 和手动控制分成不同路线。


      ## 按可回放的顺序调优


      第一轮不要追求完美，只要建立可复现样本。录 20-30
      段真实通话，覆盖安静耳机、手机免提、车内、多人背景声、口音、长停顿和用户中途打断。每段都标注失败类型：误抢答、漏打断、dead
      air、截断首字、噪声误触发。没有这个样本集，调参只是在凭感觉。


      ### 先调 VAD 和回声，再调语义判断


      如果 Agent 播放自己的声音时被麦克风收回，任何高级 turn detector 都会被污染。浏览器端优先用 WebRTC 的 echo
      cancellation；电话或嵌入式设备要做单独链路测试。之后再调 VAD threshold、min speech
      duration、silence timeout 和 endpoint delay。目标不是“永远快”，而是在真实噪声里少犯可见错误。


      ### 给打断设业务规则


      用户说“停一下”“不用了”时要立即取消 TTS；用户只是“嗯”“好”这样的 backchannel，不一定要打断长解释。更危险的是工具调用：如果
      Agent 正在写数据库、改订单或发短信，不能因为用户插话就取消一半。生产系统要区分可取消播放、可取消推理和不可取消动作。


      ## 选工具时看你要控制哪一层


      如果要自己掌控 WebRTC、VAD、turn detector、回放和多 provider，LiveKit 或 Pipecat
      更适合；开源路线免费但工程成本会转移到测试、部署和监控。Silero VAD 适合做本地活动检测，但要和 endpointing 或语义判断配合。


      ### 托管平台适合先验证用户感受


      Retell AI、Vapi 适合先验证电话 Agent 的打断体验，尤其是你还没有媒体基础设施团队时。Retell 官方价格页显示 AI
      Voice Agent 为 $0.07-$0.31/分钟，约 RMB 0.5-2.2/分钟；Vapi 还要叠加模型、STT/TTS
      和电话费用。不要只看平台费，要用 100 通真实电话算全链路成本。


      ### 模型原生路线减少拼接，但降低可见性


      OpenAI Realtime 这类 speech-to-speech 路线能减少 STT、LLM、TTS
      串联带来的断点，适合自然对话优先的产品。但当失败发生时，你能看到的中间状态比模块化链路少，所以必须保留事件日志、用户音频样本、工具调用结果和播放取消记录。页面里的
      Vapi 实战视频可以用来对照一次完整实时 Agent 构建，再把重点放到打断测试上。


      ## 上线前检查真实失败


      上线前至少保留一张失败矩阵：噪声误触发、用户打断无效、长停顿抢答、首字被切、Agent
      自己的声音造成回声、工具调用中断。每种失败都要有样本、当前参数、修复方案和回归测试。最终指标不要只看平均延迟，还要看 P95 dead
      air、missed barge-in rate、false interruption rate 和用户要求重复的比例。


      ### 发布后继续监控漂移


      语音输入会随设备、地区、季节和流量渠道变化。新用户从耳机切到免提、客服话术变长、TTS 音量变大，都可能让原来稳定的阈值失效。把 turn
      detection 当成持续运营项，而不是一次性调参；每周抽样回放失败通话，比盲目升级模型更有用。
---
## Start by separating latency from listening

Most failed voice-agent demos are described as "latency problems," but the real issue is often that the agent does not know whose turn it is. If it answers while the user is still thinking, endpointing is too aggressive. If the user says "wait" and the agent keeps reading a long message, barge-in is broken. If the TV in the background cancels every response, VAD and echo handling are too permissive.

### Use this when the agent already works

This workflow is for teams that already have a phone agent, web voice assistant, AI tutor, or companion prototype running. You do not need to rebuild the stack first; you need event traces, representative audio, and a repeatable way to replay failures. If your business logic is still unstable, fix that before chasing a 50ms VAD improvement.

### Measure turns as events, not vibes

Log the exact time for user speech start, user speech stop, STT partial, STT final, LLM first token, TTS first audio, playback start, playback cancel, and tool-call start. A single timeline makes the problem obvious. The contrarian lesson is that faster settings can make the product feel worse if they produce more false starts and clipped words.

### Know what VAD cannot decide

Voice activity detection only says that speech-like audio is present. It does not know whether the user is interrupting, backchanneling, coughing, or speaking to someone else in the room. Use VAD as the low-latency gate, then combine it with STT endpointing, model-based turn detection, or explicit business rules.

## Tune the path with replayable samples

Build a small test corpus before tuning thresholds. Record 20-30 short interactions that include headset audio, speakerphone audio, car noise, background voices, long pauses, soft speech, and mid-response interruption. Label each failure as a false start, missed barge-in, dead air, cut-off word, or noise-triggered interruption.

### Fix echo before semantic detection

If the agent's own voice leaks back into the microphone, higher-level turn detection will be polluted. Browser clients should use WebRTC echo cancellation where possible; phone and embedded-device flows need their own loopback tests. Only after echo is under control should you tune VAD threshold, minimum speech duration, silence timeout, and endpoint delay.

### Set a policy for interruption

Not every sound should cancel the agent. A clear "stop" or "wait" should cancel playback immediately. A soft "mm-hmm" during a long explanation may be a backchannel. A tool call that changes an order, books an appointment, or writes to a database may need to finish even if playback is cancelled. Separate cancellation of audio, reasoning, and irreversible actions.

### Test provider defaults with your stack

Managed platforms such as Retell AI and Vapi can get you to a live phone test quickly, but interruption behavior depends on the selected STT, TTS, model, telephony route, and prompt. Self-hosted stacks with LiveKit, Pipecat, and Silero VAD give more control, but you inherit the replay system, metrics, and device testing.

### Use two test modes, not one

Run scripted tests first, because they make regressions obvious: the same interruption phrase at the same timestamp should produce the same cancel behavior. Then run unscripted tests with people who naturally hesitate, backchannel, mumble, or speak over the agent. Scripted tests catch code regressions; unscripted tests catch product assumptions. You need both before trusting a voice interface.

## Choose tools by the control surface

Choose LiveKit or Pipecat when you need to inspect and modify the media path, VAD, endpointing, and provider wiring. Choose OpenAI Realtime when a native speech-to-speech experience matters more than component-level replacement. Choose Retell AI or Vapi when the first milestone is a working phone agent with analytics and operational controls.

### Treat cost as a minutes problem

Retell lists AI voice agents at $0.07-$0.31 per minute. Deepgram lists Flux and Nova STT from $0.0077 per minute, and Cartesia's current plans bundle model credits with voice-agent minutes and concurrency. Those numbers are starting points, not a production budget. Run at least 100 representative calls and include failed retries, long silences, transfers, and human handoff.

### Use the embedded build video as a test harness

The embedded Vapi voice-agent build is useful as a full-stack reference, but do not stop at "it answers." After reproducing a basic agent, add a specific barge-in script: interrupt during the greeting, interrupt during a tool lookup, interrupt during a long confirmation, and speak from a noisy room. Those four tests catch most demo-to-production regressions.

### Pick one primary metric per failure type

Use missed barge-in rate for interruptions, false interruption rate for noise, P95 dead air for endpointing, and clipped-word count for over-aggressive VAD. If you compress all of these into "latency," the team will optimize the wrong setting. A product can have fast average response and still feel rude if it talks over users twice per call.

## Launch with a failure matrix

The launch checklist should be concrete enough that another engineer can rerun it. Keep sample audio, event traces, current thresholds, provider settings, and the expected result for every test case. Track missed barge-in rate, false interruption rate, P95 dead air, clipped first words, and repeat-request rate.

### Keep monitoring after launch

Turn detection drifts as devices, users, languages, and scripts change. A new TTS voice can be louder and trigger echo. A new caller segment can pause longer before answering. A new compliance script can make interruptions more common. Review failed calls weekly and promote fixed failures into regression tests.

### Release checklist

Before launch, confirm echo cancellation on every supported client, push-to-talk fallback where echo cannot be controlled, interruption cancellation for TTS playback, protected execution for irreversible tool calls, and a replay set for noisy audio. Keep the current VAD and endpointing settings in version control. When someone changes a threshold later, you should be able to see exactly what changed and which calls got better or worse.
