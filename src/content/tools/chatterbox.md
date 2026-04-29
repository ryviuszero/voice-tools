---
name: Chatterbox
slug: chatterbox
tagline: Open-source TTS model with voice cloning and emotion control
website: 'https://github.com/resemble-ai/chatterbox'
logo: /logos/chatterbox.png
primary_category: tts
layers:
  - L2
use_cases:
  creators:
    - voiceover
    - audiobook
  game_devs:
    - npc_dialogue
    - localization
  voice_ai_builders:
    - conversational_agent
    - virtual_companion
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://github.com/resemble-ai/chatterbox'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: true
  notes: >-
    MIT-licensed open-source software. Voice cloning still requires consent from
    the person whose voice is cloned.
capabilities:
  voice_cloning: true
  multilingual: true
  chinese_support: true
  realtime_capable: false
  open_source: true
  offline_capable: true
  batch_api: false
gotchas:
  - Requires technical setup and suitable local or cloud GPU capacity
  - 'You own benchmarking, serving, monitoring, and safety review'
  - Emotional control can help delivery but still needs human QA
  - Consent requirements remain even when the model is open source
language_quality:
  en: good
  zh: good
portability:
  voice_model_export: true
  notes: >-
    Open-source code and model path can be deployed on your own infrastructure,
    subject to license and model terms.
alternatives:
  - resemble-ai
  - f5-tts
verified_at: 2026-04-28T00:00:00.000Z
badges:
  - open_source
  - new
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=IR33T3nrMYQ'
  title: 'Chatterbox by Resemble AI: Open-Source Voice Cloning and TTS Model'
  i18n:
    zh:
      title: Chatterbox 开源声音克隆与 TTS 演示
i18n:
  zh:
    tagline: 支持声音克隆和情绪控制的开源 TTS 模型
    licensing_notes: MIT 开源软件。声音克隆仍需获得被克隆者同意。
    gotchas:
      - 需要技术部署和合适的本地或云端 GPU
      - 基准测试、服务化、监控和安全评估都要自己负责
      - 情绪控制能改善表现，但仍需要人工质检
      - 即使模型开源，也不能跳过声音授权
    portability_notes: 开源代码和模型路径可部署到自有基础设施，但仍需遵守许可和模型条款。
    body: >-
      ## 先判断它是不是你的主力工具


      Chatterbox 更适合创作者、游戏团队、Voice AI 开发者在创作者旁白、有声书、NPC
      对话、游戏本地化里解决具体问题。它的定位是文字转语音工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，Chatterbox
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。Requires technical setup and
      suitable local or cloud GPU capacity


      ## 先检查费用和授权边界


      当前记录的价格模型是开源，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：商业项目、YouTube 变现、游戏发布、声音克隆。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。
      MIT-licensed open-source software. Voice cloning still requires consent
      from the person whose voice is cloned.


      ## 管理质量、隐私和锁定风险


      Chatterbox 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。Open-source code and model path can be deployed on your own
      infrastructure, subject to license and model terms.


      ## 放进工作流时先小规模验证


      把 Chatterbox 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 resemble-ai, f5-tts 做一次同素材对比。
secondary_categories:
  - voice_cloning
  - dubbing
github_metrics:
  repo: resemble-ai/chatterbox
  source_url: 'https://github.com/resemble-ai/chatterbox'
  captured_at: 2026-04-29T00:00:00.000Z
  stars: 24515
  forks: 3261
  watchers: 147
  open_issues: 340
  open_pull_requests: 82
  last_commit_at: 2026-03-26T00:00:00.000Z
  latest_release_at: 2025-06-13T00:00:00.000Z
  has_releases: true
  license: MIT
  primary_language: Python
  archived: false
  signals:
    - popular
    - maintained
  note: >-
    GitHub public metrics captured for maintenance screening; verify repository
    activity before adopting it for production.
---
## Decide whether it should be your main tool

Chatterbox is most useful for creators, game teams, voice AI builders working on creator voiceovers, audiobooks, NPC dialogue, game localization. Treat it as a text-to-speech tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

Chatterbox works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. Requires technical setup and suitable local or cloud GPU capacity

## Check cost and rights before committing

The current directory record lists a open source pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: commercial projects, YouTube monetization, game shipping, voice cloning. Recheck the official terms before client work, actor voices, game releases, or paid distribution. MIT-licensed open-source software. Voice cloning still requires consent from the person whose voice is cloned.

## Manage quality, privacy, and lock-in

The important production question is not only whether Chatterbox can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. Open-source code and model path can be deployed on your own infrastructure, subject to license and model terms.

## Fit it into a workflow

Use Chatterbox as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with resemble-ai, f5-tts using the same source material.
