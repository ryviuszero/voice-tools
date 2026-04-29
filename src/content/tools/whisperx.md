---
name: WhisperX
slug: whisperx
tagline: Open-source Whisper transcription with word timestamps and diarization
website: 'https://github.com/m-bain/whisperX'
logo: /logos/whisperx.png
primary_category: stt
layers:
  - L2
use_cases:
  creators:
    - podcast
    - subtitles
    - short_video
  game_devs:
    - localization
  voice_ai_builders: []
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://github.com/m-bain/whisperX'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    WhisperX code is BSD-2-Clause. Production use still needs review of the
    selected ASR, alignment, VAD, and diarization model licenses and any Hugging
    Face gated model terms.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: false
  open_source: true
  offline_capable: true
  batch_api: true
gotchas:
  - 'Best for batch transcription and subtitle timing, not realtime voice agents'
  - Overlapping speech and diarization remain imperfect
  - >-
    Some diarization features require Hugging Face access tokens and model
    agreements
  - Local use needs ffmpeg plus CPU/GPU planning for long recordings
language_quality:
  en: excellent
  zh: good
portability:
  voice_model_export: true
  notes: >-
    Runs locally or on your own infrastructure, subject to the licenses of the
    underlying models you choose.
github_metrics:
  repo: m-bain/whisperX
  source_url: 'https://github.com/m-bain/whisperX'
  captured_at: 2026-04-28T00:00:00.000Z
  stars: 21500
  forks: 2200
  watchers: 152
  commits: 0
  latest_release_at: 2026-04-01T00:00:00.000Z
  has_releases: true
  license: BSD-2-Clause
  primary_language: Python
  archived: false
  signals:
    - popular
    - maintained
alternatives:
  - deepgram
  - descript
verified_at: 2026-04-28T00:00:00.000Z
badges:
  - open_source
  - popular
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=1z0aHkFbD8E'
  title: Best FREE Speech to Text AI - WhisperX - w/ Speaker Detection
  i18n:
    zh:
      title: WhisperX 转写与说话人检测演示
i18n:
  zh:
    tagline: 开源 Whisper 转写，支持词级时间戳和说话人分离
    licensing_notes: >-
      WhisperX 代码为 BSD-2-Clause。生产使用仍需核对所选 ASR、对齐、VAD 和 diarization 模型许可，以及
      Hugging Face gated model 条款。
    gotchas:
      - 更适合批量转写和字幕时间轴，不适合实时语音 Agent
      - 重叠说话和说话人分离仍不完美
      - 部分 diarization 功能需要 Hugging Face token 和模型协议
      - 本地长录音处理需要 ffmpeg 和 CPU/GPU 规划
    portability_notes: 可在本地或自有基础设施运行，但要遵守底层模型许可。
    body: >-
      ## 先判断它是不是你的主力工具


      WhisperX 更适合创作者、游戏团队在播客、subtitles、short
      video、游戏本地化里解决具体问题。它的定位是语音转文字工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，WhisperX
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。Best for batch transcription
      and subtitle timing, not realtime voice agents


      ## 先检查费用和授权边界


      当前记录的价格模型是开源，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：商业项目、YouTube 变现、游戏发布。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。
      WhisperX code is BSD-2-Clause. Production use still needs review of the
      selected ASR, alignment, VAD, and diarization model licenses and any
      Hugging Face gated model terms.


      ## 管理质量、隐私和锁定风险


      WhisperX 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。Runs locally or on your own infrastructure, subject to the
      licenses of the underlying models you choose.


      ## 放进工作流时先小规模验证


      把 WhisperX 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 deepgram, descript 做一次同素材对比。
secondary_categories:
  - creator_editing
---
## Decide whether it should be your main tool

WhisperX is most useful for creators, game teams working on podcasts, subtitles, short video, game localization. Treat it as a speech-to-text tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

WhisperX works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. Best for batch transcription and subtitle timing, not realtime voice agents

## Check cost and rights before committing

The current directory record lists a open source pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: commercial projects, YouTube monetization, game shipping. Recheck the official terms before client work, actor voices, game releases, or paid distribution. WhisperX code is BSD-2-Clause. Production use still needs review of the selected ASR, alignment, VAD, and diarization model licenses and any Hugging Face gated model terms.

## Manage quality, privacy, and lock-in

The important production question is not only whether WhisperX can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. Runs locally or on your own infrastructure, subject to the licenses of the underlying models you choose.

## Fit it into a workflow

Use WhisperX as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with deepgram, descript using the same source material.
