---
name: F5-TTS
slug: f5-tts
tagline: Open-source flow matching TTS model for zero-shot voice cloning
website: 'https://github.com/SWivid/F5-TTS'
logo: /logos/f5-tts.svg
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
  pricing_url: 'https://github.com/SWivid/F5-TTS'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: true
  notes: >-
    MIT license for code and model use. You still need separate consent or
    rights for any person whose voice is cloned.
capabilities:
  voice_cloning: true
  multilingual: false
  chinese_support: true
  realtime_capable: false
  open_source: true
  offline_capable: true
  batch_api: false
gotchas:
  - >-
    Requires ~8GB VRAM for reasonable speed; CPU inference is 10–30× slower than
    realtime
  - >-
    No built-in API server — you must write your own serving layer for
    production use
  - >-
    Voice quality depends heavily on reference audio; anything under 3 seconds
    or noisy degrades significantly
  - >-
    Non-English/Chinese community models vary widely in quality — always
    benchmark before committing
language_quality:
  en: excellent
  zh: good
portability:
  voice_model_export: true
  notes: >-
    MIT license — you own the model weights and any fine-tunes. Full portability
    to any infrastructure.
alternatives:
  - xtts-v2
  - gpt-sovits
  - kokoro-tts
  - indextts
  - cosyvoice
verified_at: 2026-04-20T00:00:00.000Z
badges:
  - open_source
  - editor_choice
github_metrics:
  repo: SWivid/F5-TTS
  source_url: 'https://github.com/SWivid/F5-TTS'
  captured_at: 2026-04-27T00:00:00.000Z
  stars: 14389
  forks: 2116
  watchers: 126
  open_issues: 44
  open_pull_requests: 5
  last_commit_at: 2026-04-20T00:00:00.000Z
  latest_release_at: 2026-04-20T00:00:00.000Z
  has_releases: true
  license: MIT
  primary_language: Python
  archived: false
  signals:
    - popular
    - trending
    - maintained
  note: >-
    GitHub signals show strong adoption and recent release activity, but
    production usage still depends on model weights, runtime setup, and
    licensing review.
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=gPKJboykVWo'
  title: 'Complete Guide to F5 TTS: How to USE, CLONE VOICE, and CHANGE MODELS'
  i18n:
    zh:
      title: F5-TTS 使用、声音克隆与模型切换教程
i18n:
  zh:
    tagline: 基于 flow matching 的开源零样本声音克隆模型，MIT 许可
    licensing_notes: MIT 许可证允许商用、修改和再发布。但技术许可不等于声音授权，商用克隆他人声音前必须获得明确授权。
    gotchas:
      - 想要合理速度通常需要约 8GB VRAM；CPU 推理会比实时慢很多
      - 没有内置生产 API 服务，需要自己实现 serving 层
      - 声音质量高度依赖参考音频，过短或有噪声会明显劣化
      - 非英语/中文的社区模型质量差异很大，投入前必须实测
    portability_notes: MIT 许可，你可以自己持有模型权重和微调结果，也可以部署到任意基础设施。
    body: >-
      ## 先判断它是不是你的主力工具


      F5-TTS 更适合创作者、游戏团队、Voice AI 开发者在创作者旁白、有声书、NPC
      对话、游戏本地化里解决具体问题。它的定位是文字转语音工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，F5-TTS
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。Requires ~8GB VRAM for
      reasonable speed; CPU inference is 10–30× slower than realtime


      ## 先检查费用和授权边界


      当前记录的价格模型是开源，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：商业项目、YouTube 变现、游戏发布、声音克隆。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。
      MIT license for code and model use. You still need separate consent or
      rights for any person whose voice is cloned.


      ## 管理质量、隐私和锁定风险


      F5-TTS 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。MIT license — you own the model weights and any fine-tunes.
      Full portability to any infrastructure.


      ## 放进工作流时先小规模验证


      把 F5-TTS 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 xtts-v2, gpt-sovits, kokoro-tts, indextts 做一次同素材对比。
secondary_categories:
  - voice_cloning
---
## Decide whether it should be your main tool

F5-TTS is most useful for creators, game teams, voice AI builders working on creator voiceovers, audiobooks, NPC dialogue, game localization. Treat it as a text-to-speech tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

F5-TTS works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. Requires ~8GB VRAM for reasonable speed; CPU inference is 10–30× slower than realtime

## Check cost and rights before committing

The current directory record lists a open source pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: commercial projects, YouTube monetization, game shipping, voice cloning. Recheck the official terms before client work, actor voices, game releases, or paid distribution. MIT license for code and model use. You still need separate consent or rights for any person whose voice is cloned.

## Manage quality, privacy, and lock-in

The important production question is not only whether F5-TTS can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. MIT license — you own the model weights and any fine-tunes. Full portability to any infrastructure.

## Fit it into a workflow

Use F5-TTS as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with xtts-v2, gpt-sovits, kokoro-tts, indextts using the same source material.
