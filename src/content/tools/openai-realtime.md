---
name: OpenAI Realtime API
slug: openai-realtime
tagline: Native speech-to-speech API for low-latency voice agents
website: 'https://platform.openai.com/docs/guides/realtime'
logo: /logos/openai-realtime.png
primary_category: voice_agent_platform
layers:
  - L3
  - L4
use_cases:
  voice_ai_builders:
    - conversational_agent
    - virtual_companion
    - phone_agent
    - voice_assistant
    - ai_tutor
pricing:
  model: paid
  has_free_tier: false
  starting_paid_usd: 0
  pricing_url: 'https://openai.com/api/pricing/'
  cost_per_minute: 0.15
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    Realtime API usage follows OpenAI API terms and model policies. It is not a
    custom voice-cloning export product.
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
    Native speech-to-speech is simpler, but less modular than separate STT, LLM,
    and TTS providers
  - >-
    Cost and latency depend on model, audio token usage, session length, and
    turn settings
  - >-
    You still need telephony, WebRTC/WebSocket transport, logging, and
    production guardrails
portability:
  voice_model_export: false
  notes: >-
    Prompts and tool schemas are portable, but speech behavior, voices, and
    realtime session semantics are provider-specific.
voice_agent_extras:
  type: orchestration_platform
  brings_own_stack: true
alternatives:
  - vapi
  - retell-ai
  - livekit
verified_at: 2026-04-26T00:00:00.000Z
badges:
  - popular
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=QEAFmh5M488'
  title: Demo OpenAI Real-time API with WebRTC | Flutter Mobile Application Demo
  i18n:
    zh:
      title: OpenAI Realtime API WebRTC 演示
i18n:
  zh:
    tagline: 面向低延迟 Voice Agent 的原生 speech-to-speech API
    licensing_notes: Realtime API 使用需遵守 OpenAI API 条款和模型政策。它不是可导出自定义声音克隆产品。
    gotchas:
      - 原生 speech-to-speech 更简单，但比拆分 STT、LLM、TTS 的链路更不模块化
      - 成本和延迟取决于模型、音频 token、会话时长和 turn 设置
      - 仍然需要电话接入、WebRTC/WebSocket 传输、日志和生产防护
    portability_notes: >-
      Prompt 和 tool schema 可迁移，但语音表现、voices 和 realtime session 语义是
      provider-specific。
    body: >-
      ## 先判断它是不是你的主力工具


      OpenAI Realtime API 更适合Voice AI 开发者在对话式 Agent、virtual companion、phone
      agent、voice assistant里解决具体问题。它的定位是语音 Agent
      平台工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，OpenAI Realtime API
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。Native speech-to-speech is
      simpler, but less modular than separate STT, LLM, and TTS providers


      ## 先检查费用和授权边界


      当前记录的价格模型是付费，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：商业项目、YouTube 变现、游戏发布。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。
      Realtime API usage follows OpenAI API terms and model policies. It is not
      a custom voice-cloning export product.


      ## 管理质量、隐私和锁定风险


      OpenAI Realtime API 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型或关键项目配置通常不能完整迁出。Prompts and tool schemas are portable, but speech
      behavior, voices, and realtime session semantics are provider-specific.


      ## 放进工作流时先小规模验证


      把 OpenAI Realtime API 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 vapi, retell-ai, livekit 做一次同素材对比。
secondary_categories:
  - realtime_infrastructure
---
## Decide whether it should be your main tool

OpenAI Realtime API is most useful for voice AI builders working on conversational agents, virtual companion, phone agent, voice assistant. Treat it as a voice agent platform tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

OpenAI Realtime API works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. Native speech-to-speech is simpler, but less modular than separate STT, LLM, and TTS providers

## Check cost and rights before committing

The current directory record lists a paid pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: commercial projects, YouTube monetization, game shipping. Recheck the official terms before client work, actor voices, game releases, or paid distribution. Realtime API usage follows OpenAI API terms and model policies. It is not a custom voice-cloning export product.

## Manage quality, privacy, and lock-in

The important production question is not only whether OpenAI Realtime API can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice models or key project settings usually cannot be fully moved out. Prompts and tool schemas are portable, but speech behavior, voices, and realtime session semantics are provider-specific.

## Fit it into a workflow

Use OpenAI Realtime API as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with vapi, retell-ai, livekit using the same source material.
