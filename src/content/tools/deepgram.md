---
name: Deepgram
slug: deepgram
tagline: Fast streaming speech-to-text API for realtime voice AI
website: 'https://deepgram.com'
logo: /logos/deepgram.jpg
primary_category: stt
layers:
  - L3
use_cases:
  creators:
    - subtitles
    - podcast
  voice_ai_builders:
    - conversational_agent
    - phone_agent
    - voice_assistant
pricing:
  model: freemium
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://deepgram.com/pricing'
  cost_per_minute: 0.0043
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    Deepgram is a speech recognition API, not a voice cloning product.
    Commercial usage follows account and API terms.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: true
  open_source: false
  offline_capable: false
  batch_api: true
gotchas:
  - >-
    Realtime quality depends heavily on endpointing, punctuation, and noise
    handling settings
  - >-
    Per-minute costs are low, but high-volume always-on streams still need
    budget controls
  - Chinese and code-switching should be tested with your actual audio domain
language_quality:
  en: excellent
  es: good
  fr: good
  de: good
  zh: good
portability:
  voice_model_export: true
  notes: >-
    Transcripts and application logic are portable, but model-specific
    endpointing behavior and formatting may require retuning when migrating.
alternatives:
  - openai-realtime
verified_at: 2026-04-26T00:00:00.000Z
badges:
  - popular
traffic_estimates:
  source: Similarweb public data endpoint
  source_url: 'https://data.similarweb.com/api/v1/data?domain=deepgram.com'
  captured_at: 2026-04-29T00:00:00.000Z
  period_label: 2026-03
  visits_last_month: 762944
  monthly_visits:
    - month: 2026-01
      visits: 834096
      is_partial: false
    - month: 2026-02
      visits: 693651
      is_partial: false
    - month: 2026-03
      visits: 762944
      is_partial: false
  bounce_rate_percent: 0.37
  pages_per_visit: 4.38
  avg_visit_duration: '149.94192156451956'
  global_rank: 56753
  country_rank: 43587
  note: 'Public web-traffic estimate; use directionally, not as audited analytics.'
  domain_created_at: '2016-01-28'
  domain_created_source_url: 'https://rdap.org/domain/deepgram.com'
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=IoXAQDiwE-A'
  title: Deepgram Tutorial for Newbies | Voice Agent Software Demo
  i18n:
    zh:
      title: Deepgram 新手教程与语音代理演示
i18n:
  zh:
    tagline: 面向实时 Voice AI 的高速流式语音识别 API
    licensing_notes: Deepgram 是语音识别 API，不是声音克隆产品。商用需遵守账号和 API 条款。
    gotchas:
      - 实时效果高度依赖 endpointing、标点和降噪参数
      - 单分钟成本较低，但高并发常开流仍需要预算控制
      - 中文和中英混说要用真实业务音频测试
    portability_notes: 转写文本和应用逻辑可迁移，但模型的 endpointing 行为和格式可能需要重新调参。
    body: >-
      ## 先判断它是不是你的主力工具


      Deepgram 更适合创作者、Voice AI 开发者在subtitles、播客、对话式 Agent、phone
      agent里解决具体问题。它的定位是语音转文字工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，Deepgram
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。Realtime quality depends
      heavily on endpointing, punctuation, and noise handling settings


      ## 先检查费用和授权边界


      当前记录的价格模型是免费增值，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：商业项目、YouTube 变现、游戏发布。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。
      Deepgram is a speech recognition API, not a voice cloning product.
      Commercial usage follows account and API terms.


      ## 管理质量、隐私和锁定风险


      Deepgram 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。Transcripts and application logic are portable, but
      model-specific endpointing behavior and formatting may require retuning
      when migrating.


      ## 放进工作流时先小规模验证


      把 Deepgram 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 openai-realtime 做一次同素材对比。
secondary_categories:
  - realtime_infrastructure
  - creator_editing
---
## Decide whether it should be your main tool

Deepgram is most useful for creators, voice AI builders working on subtitles, podcasts, conversational agents, phone agent. Treat it as a speech-to-text tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

Deepgram works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. Realtime quality depends heavily on endpointing, punctuation, and noise handling settings

## Check cost and rights before committing

The current directory record lists a freemium pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: commercial projects, YouTube monetization, game shipping. Recheck the official terms before client work, actor voices, game releases, or paid distribution. Deepgram is a speech recognition API, not a voice cloning product. Commercial usage follows account and API terms.

## Manage quality, privacy, and lock-in

The important production question is not only whether Deepgram can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. Transcripts and application logic are portable, but model-specific endpointing behavior and formatting may require retuning when migrating.

## Fit it into a workflow

Use Deepgram as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with openai-realtime using the same source material.
