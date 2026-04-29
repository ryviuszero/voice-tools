---
name: LiveKit
slug: livekit
tagline: Open-source realtime audio infrastructure for voice agents
website: 'https://livekit.io'
logo: /logos/livekit.png
primary_category: realtime_infrastructure
layers:
  - L2
  - L3
use_cases:
  voice_ai_builders:
    - conversational_agent
    - virtual_companion
    - voice_assistant
    - ai_rpg
pricing:
  model: freemium
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://livekit.io/pricing'
  cost_per_minute: 0
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: true
  notes: >-
    LiveKit server and agents are open source. Commercial use is allowed under
    the project license; paid Cloud usage follows LiveKit Cloud terms.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: true
  open_source: true
  offline_capable: false
  batch_api: false
gotchas:
  - >-
    You still need STT, LLM, and TTS providers unless you wire local models
    yourself
  - >-
    Self-hosting reduces platform lock-in but increases DevOps and observability
    work
  - Phone/PSTN workflows need additional telephony integration
portability:
  voice_model_export: true
  notes: >-
    LiveKit is infrastructure rather than a hosted voice model. Agent code and
    provider choices are portable if you keep them outside proprietary
    Cloud-only features.
voice_agent_extras:
  type: infrastructure
  brings_own_stack: true
alternatives:
  - vapi
  - retell-ai
  - pipecat
verified_at: 2026-04-26T00:00:00.000Z
badges:
  - open_source
github_metrics:
  repo: livekit/agents
  source_url: 'https://github.com/livekit/agents'
  captured_at: 2026-04-27T00:00:00.000Z
  stars: 10231
  forks: 3065
  watchers: 96
  last_commit_at: 2026-04-27T00:00:00.000Z
  latest_release_at: 2026-04-22T00:00:00.000Z
  has_releases: true
  license: Apache-2.0
  primary_language: Python
  archived: false
  signals:
    - popular
    - trending
    - maintained
  note: >-
    Metrics use the LiveKit Agents repository because it best reflects LiveKit's
    voice-agent developer adoption; the core LiveKit server is tracked
    separately by GitHub.
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=NAWk9mntnpU'
  title: >-
    Build & Deploy a Voice AI Agent in Under 10 Minutes | LiveKit Agent Builder
    Demo
  i18n:
    zh:
      title: LiveKit Agent Builder 语音代理演示
i18n:
  zh:
    tagline: 面向 Voice Agent 的开源实时音频基础设施
    licensing_notes: LiveKit server 和 agents 是开源项目，项目许可允许商用；LiveKit Cloud 使用需遵守其云服务条款。
    gotchas:
      - 仍然需要接入 STT、LLM 和 TTS，除非自己部署本地模型
      - 自托管可以降低平台锁定，但会增加运维和可观测性成本
      - 电话/PSTN 场景需要额外的电话接入集成
    portability_notes: LiveKit 是基础设施而不是托管声音模型。只要 Agent 代码和 provider 配置不绑定云端专有能力，迁移性较好。
    body: >-
      ## 先判断它是不是你的主力工具


      LiveKit 更适合Voice AI 开发者在对话式 Agent、virtual companion、voice assistant、ai
      rpg里解决具体问题。它的定位是实时语音基础设施工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，LiveKit
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。You still need STT, LLM, and
      TTS providers unless you wire local models yourself


      ## 先检查费用和授权边界


      当前记录的价格模型是免费增值，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：商业项目、YouTube 变现、游戏发布、声音克隆。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。
      LiveKit server and agents are open source. Commercial use is allowed under
      the project license; paid Cloud usage follows LiveKit Cloud terms.


      ## 管理质量、隐私和锁定风险


      LiveKit 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。LiveKit is infrastructure rather than a hosted voice model.
      Agent code and provider choices are portable if you keep them outside
      proprietary Cloud-only features.


      ## 放进工作流时先小规模验证


      把 LiveKit 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 vapi, retell-ai, pipecat 做一次同素材对比。
secondary_categories: []
traffic_estimates:
  source: SEMrush public website overview
  source_url: 'https://www.semrush.com/website/livekit.io/overview/'
  captured_at: 2026-04-29T00:00:00.000Z
  period_label: 2026-03
  visits_last_month: 381377
  monthly_visits:
    - month: 2026-01
      visits: 443089
      is_partial: false
    - month: 2026-02
      visits: 326225
      is_partial: false
    - month: 2026-03
      visits: 381377
      is_partial: false
  note: >-
    Public SEMrush estimate; SEMrush and Similarweb numbers can differ by
    methodology.
---
## Decide whether it should be your main tool

LiveKit is most useful for voice AI builders working on conversational agents, virtual companion, voice assistant, ai rpg. Treat it as a realtime voice infrastructure tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

LiveKit works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. You still need STT, LLM, and TTS providers unless you wire local models yourself

## Check cost and rights before committing

The current directory record lists a freemium pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: commercial projects, YouTube monetization, game shipping, voice cloning. Recheck the official terms before client work, actor voices, game releases, or paid distribution. LiveKit server and agents are open source. Commercial use is allowed under the project license; paid Cloud usage follows LiveKit Cloud terms.

## Manage quality, privacy, and lock-in

The important production question is not only whether LiveKit can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. LiveKit is infrastructure rather than a hosted voice model. Agent code and provider choices are portable if you keep them outside proprietary Cloud-only features.

## Fit it into a workflow

Use LiveKit as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with vapi, retell-ai, pipecat using the same source material.
