---
name: VibeVoice
slug: vibevoice
tagline: Open-source long-form multi-speaker conversational TTS research project
website: 'https://github.com/microsoft/VibeVoice'
logo: /logos/vibevoice.png
primary_category: tts
layers:
  - L2
use_cases:
  creators:
    - podcast
    - voiceover
  game_devs: []
  voice_ai_builders:
    - virtual_companion
    - conversational_agent
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://github.com/microsoft/VibeVoice'
licensing:
  commercial_use: false
  youtube_monetization: false
  game_use: false
  voice_cloning_allowed: false
  notes: >-
    Research-oriented open-source project. Check the repository status, license,
    and responsible-use restrictions before any production use.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: false
  open_source: true
  offline_capable: true
  batch_api: false
gotchas:
  - Treat as experimental rather than production-ready
  - Model availability and responsible-use limits may change
  - Long-form outputs still need heavy editorial review
language_quality:
  en: good
  zh: good
portability:
  voice_model_export: true
  notes: >-
    Open research code can be self-hosted where model availability and license
    permit.
github_metrics:
  repo: microsoft/VibeVoice
  source_url: 'https://github.com/microsoft/VibeVoice'
  captured_at: 2026-04-27T00:00:00.000Z
  stars: 42163
  forks: 4832
  watchers: 217
  open_issues: 104
  open_pull_requests: 30
  commits: 134
  last_commit_at: 2026-04-24T00:00:00.000Z
  has_releases: false
  license: MIT
  primary_language: Python
  archived: false
  signals:
    - popular
    - trending
    - maintained
    - no_releases
  note: >-
    GitHub public metrics show strong adoption and recent commit activity, but
    no published releases yet.
alternatives:
  - notebooklm
  - podcastle
  - f5-tts
verified_at: 2026-04-26T00:00:00.000Z
badges:
  - open_source
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=91Izq6LGjJY'
  title: Best Open-Source TTS Yet? Microsoft VibeVoice
  i18n:
    zh:
      title: Microsoft VibeVoice 开源 TTS 演示
i18n:
  zh:
    tagline: 开源长篇多说话人对话式 TTS 研究项目
    licensing_notes: 研究导向开源项目。生产使用前需核对仓库状态、许可和负责任使用限制。
    gotchas:
      - 应视为实验性项目，而不是生产工具
      - 模型开放状态和负责任使用限制可能变化
      - 长篇输出仍需要大量人工编辑审核
    portability_notes: 在模型开放和许可允许时，可自行托管开源研究代码。
    body: >-
      ## 先判断它是不是你的主力工具


      VibeVoice 更适合创作者、Voice AI 开发者在播客、创作者旁白、virtual companion、对话式
      Agent里解决具体问题。它的定位是文字转语音工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，VibeVoice
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。Treat as experimental rather
      than production-ready


      ## 先检查费用和授权边界


      当前记录的价格模型是开源，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：公开记录里没有明确覆盖核心商用场景。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。
      Research-oriented open-source project. Check the repository status,
      license, and responsible-use restrictions before any production use.


      ## 管理质量、隐私和锁定风险


      VibeVoice 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。Open research code can be self-hosted where model availability
      and license permit.


      ## 放进工作流时先小规模验证


      把 VibeVoice 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 notebooklm, podcastle, f5-tts 做一次同素材对比。
secondary_categories:
  - dubbing
---
## Decide whether it should be your main tool

VibeVoice is most useful for creators, voice AI builders working on podcasts, creator voiceovers, virtual companion, conversational agents. Treat it as a text-to-speech tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

VibeVoice works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. Treat as experimental rather than production-ready

## Check cost and rights before committing

The current directory record lists a open source pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: the public record does not clearly cover the main commercial scenarios. Recheck the official terms before client work, actor voices, game releases, or paid distribution. Research-oriented open-source project. Check the repository status, license, and responsible-use restrictions before any production use.

## Manage quality, privacy, and lock-in

The important production question is not only whether VibeVoice can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. Open research code can be self-hosted where model availability and license permit.

## Fit it into a workflow

Use VibeVoice as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with notebooklm, podcastle, f5-tts using the same source material.
