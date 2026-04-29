---
name: Retell AI
slug: retell-ai
tagline: Low-code voice agent platform for phone and web AI calls
website: 'https://www.retellai.com'
logo: /logos/retell-ai.png
primary_category: voice_agent_platform
layers:
  - L3
use_cases:
  voice_ai_builders:
    - conversational_agent
    - phone_agent
    - voice_assistant
pricing:
  model: paid
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://www.retellai.com/pricing'
  cost_per_minute: 0.07
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: true
  notes: >-
    Retell is built for production business calls. Voice cloning and data
    retention depend on the connected providers and workspace configuration.
capabilities:
  voice_cloning: true
  multilingual: true
  chinese_support: true
  realtime_capable: true
  open_source: false
  offline_capable: false
  batch_api: false
gotchas:
  - >-
    Published per-minute pricing is only the platform layer; telephony and
    provider costs may still apply
  - >-
    Best for phone/web agents, not for fully custom media transport or
    game-engine embedding
  - >-
    Deep customization usually means using APIs and webhooks rather than only
    the visual builder
portability:
  voice_model_export: true
  notes: >-
    You can move prompts, webhook logic, and provider accounts away, but call
    orchestration and analytics are Retell-specific.
voice_agent_extras:
  type: orchestration_platform
  brings_own_stack: true
alternatives:
  - vapi
  - livekit
  - openai-realtime
verified_at: 2026-04-26T00:00:00.000Z
badges:
  - popular
traffic_estimates:
  source: SEMrush public website overview
  source_url: 'https://www.semrush.com/website/retellai.com/overview/'
  captured_at: 2026-04-29T00:00:00.000Z
  period_label: 2026-03
  visits_last_month: 873967
  monthly_visits:
    - month: 2026-01
      visits: 650565
      is_partial: false
    - month: 2026-02
      visits: 646597
      is_partial: false
    - month: 2026-03
      visits: 873967
      is_partial: false
  note: >-
    Public SEMrush estimate; SEMrush and Similarweb numbers can differ by
    methodology.
  domain_created_at: '2023-06-17'
  domain_created_source_url: 'https://rdap.org/domain/retellai.com'
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=D904X4VXXDA'
  title: 'Retell AI Basics: Everything You Need to Start Building Voice Agents'
  i18n:
    zh:
      title: Retell AI 语音代理入门演示
i18n:
  zh:
    tagline: 面向电话和网页 AI 通话的低代码 Voice Agent 平台
    licensing_notes: Retell 适合生产级商业通话。声音克隆和数据留存取决于接入的 provider 与工作区配置。
    gotchas:
      - 公开的每分钟价格主要是平台层费用，电话和底层 provider 费用仍需单独估算
      - 更适合电话和网页 Agent，不适合完全自定义媒体传输或游戏引擎嵌入
      - 深度定制通常需要 API 和 webhook，而不只是可视化配置
    portability_notes: Prompt、webhook 逻辑和 provider 账号可以迁出，但通话编排和分析能力绑定在 Retell 平台内。
    body: >-
      ## 先判断它是不是你的主力工具


      Retell AI 更适合Voice AI 开发者在对话式 Agent、phone agent、voice
      assistant里解决具体问题。它的定位是语音 Agent
      平台工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，Retell AI
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。Published per-minute pricing
      is only the platform layer; telephony and provider costs may still apply


      ## 先检查费用和授权边界


      当前记录的价格模型是付费，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：商业项目、YouTube 变现、游戏发布、声音克隆。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。
      Retell is built for production business calls. Voice cloning and data
      retention depend on the connected providers and workspace configuration.


      ## 管理质量、隐私和锁定风险


      Retell AI 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。You can move prompts, webhook logic, and provider accounts
      away, but call orchestration and analytics are Retell-specific.


      ## 放进工作流时先小规模验证


      把 Retell AI 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 vapi, livekit, openai-realtime 做一次同素材对比。
secondary_categories:
  - voice_cloning
  - realtime_infrastructure
---
## Decide whether it should be your main tool

Retell AI is most useful for voice AI builders working on conversational agents, phone agent, voice assistant. Treat it as a voice agent platform tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

Retell AI works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. Published per-minute pricing is only the platform layer; telephony and provider costs may still apply

## Check cost and rights before committing

The current directory record lists a paid pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: commercial projects, YouTube monetization, game shipping, voice cloning. Recheck the official terms before client work, actor voices, game releases, or paid distribution. Retell is built for production business calls. Voice cloning and data retention depend on the connected providers and workspace configuration.

## Manage quality, privacy, and lock-in

The important production question is not only whether Retell AI can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. You can move prompts, webhook logic, and provider accounts away, but call orchestration and analytics are Retell-specific.

## Fit it into a workflow

Use Retell AI as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with vapi, livekit, openai-realtime using the same source material.
