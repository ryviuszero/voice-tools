---
name: AudioCraft
slug: audiocraft
tagline: 'Meta open-source research library for MusicGen, AudioGen, and audio generation'
website: 'https://github.com/facebookresearch/audiocraft'
logo: /logos/audiocraft.svg
primary_category: sound_effects
layers:
  - L2
use_cases:
  creators:
    - short_video
  game_devs:
    - sound_effects
  voice_ai_builders: []
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://github.com/facebookresearch/audiocraft'
licensing:
  commercial_use: false
  youtube_monetization: false
  game_use: false
  voice_cloning_allowed: false
  notes: >-
    The repository code is MIT licensed, but the model weights are released
    under CC-BY-NC 4.0. Treat it as a research and prototype route unless you
    have reviewed the exact model license.
capabilities:
  voice_cloning: false
  multilingual: false
  chinese_support: false
  realtime_capable: false
  open_source: true
  offline_capable: true
  batch_api: false
gotchas:
  - >-
    Model weights are non-commercial, so it is not a clean default for shipped
    client or monetized game assets
  - 'Requires Python, PyTorch, ffmpeg, and local or cloud GPU capacity'
  - Better for experimentation and custom pipelines than polished creator UX
  - >-
    Output quality and controllability vary by model, prompt, and generation
    length
portability:
  voice_model_export: true
  notes: >-
    Code and model usage are self-hostable subject to the code and weight
    licenses.
github_metrics:
  repo: facebookresearch/audiocraft
  source_url: 'https://github.com/facebookresearch/audiocraft'
  captured_at: 2026-04-28T00:00:00.000Z
  stars: 23200
  forks: 2600
  watchers: 213
  open_issues: 362
  open_pull_requests: 23
  commits: 253
  has_releases: false
  license: MIT code; CC-BY-NC 4.0 weights
  primary_language: Python
  archived: false
  signals:
    - popular
alternatives:
  - stable-audio-open
  - udio
  - suno
verified_at: 2026-04-28T00:00:00.000Z
badges:
  - open_source
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=_OVi1sE1yiA'
  title: How To Install Audiocraft Locally - Meta's FREE And Open AI Music Gen
  i18n:
    zh:
      title: AudioCraft 本地安装与 MusicGen 演示
i18n:
  zh:
    tagline: Meta 开源的 MusicGen、AudioGen 与音频生成研究库
    licensing_notes: 仓库代码采用 MIT 许可，但模型权重采用 CC-BY-NC 4.0。除非逐项核对模型许可，否则更适合研究和原型。
    gotchas:
      - 模型权重为非商业许可，不适合作为客户项目或商业游戏资产的默认路线
      - 需要 Python、PyTorch、ffmpeg 和本地或云端 GPU
      - 更适合实验和自定义链路，不是成熟创作者产品
      - 输出质量和可控性会随模型、prompt 和时长波动
    portability_notes: 代码和模型可按对应许可自托管运行。
    body: >-
      ## 先判断它是不是你的主力工具


      AudioCraft 更适合创作者、游戏团队在short
      video、音效里解决具体问题。它的定位是声音与音乐生成工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，AudioCraft
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。Model weights are
      non-commercial, so it is not a clean default for shipped client or
      monetized game assets


      ## 先检查费用和授权边界


      当前记录的价格模型是开源，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：公开记录里没有明确覆盖核心商用场景。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。 The
      repository code is MIT licensed, but the model weights are released under
      CC-BY-NC 4.0. Treat it as a research and prototype route unless you have
      reviewed the exact model license.


      ## 管理质量、隐私和锁定风险


      AudioCraft 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。Code and model usage are self-hostable subject to the code and
      weight licenses.


      ## 放进工作流时先小规模验证


      把 AudioCraft 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 stable-audio-open, udio, suno 做一次同素材对比。
secondary_categories: []
---
## Decide whether it should be your main tool

AudioCraft is most useful for creators, game teams working on short video, sound effects. Treat it as a sound and music generation tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

AudioCraft works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. Model weights are non-commercial, so it is not a clean default for shipped client or monetized game assets

## Check cost and rights before committing

The current directory record lists a open source pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: the public record does not clearly cover the main commercial scenarios. Recheck the official terms before client work, actor voices, game releases, or paid distribution. The repository code is MIT licensed, but the model weights are released under CC-BY-NC 4.0. Treat it as a research and prototype route unless you have reviewed the exact model license.

## Manage quality, privacy, and lock-in

The important production question is not only whether AudioCraft can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. Code and model usage are self-hostable subject to the code and weight licenses.

## Fit it into a workflow

Use AudioCraft as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with stable-audio-open, udio, suno using the same source material.
