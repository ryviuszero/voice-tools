---
name: Silero VAD
slug: silero-vad
tagline: Lightweight open-source voice activity detection for speech apps
website: 'https://github.com/snakers4/silero-vad'
logo: /logos/silero-vad.png
primary_category: conversation_framework
layers:
  - L2
use_cases:
  voice_ai_builders:
    - conversational_agent
    - virtual_companion
    - voice_assistant
    - ai_tutor
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://github.com/snakers4/silero-vad'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    Silero VAD is a voice activity detection component, not a voice generation
    or cloning product. Check the repository license for redistribution details.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: true
  open_source: true
  offline_capable: true
  batch_api: false
gotchas:
  - >-
    VAD only detects speech activity; turn-taking still needs endpointing and
    interruption policy
  - >-
    Aggressive thresholds can cut off soft speakers or users with noisy
    microphones
  - Production agents should test VAD settings with real call recordings
portability:
  voice_model_export: true
  notes: >-
    Runs as a local component and is highly portable, but your thresholds and
    surrounding turn-taking logic are application-specific.
voice_agent_extras:
  type: vad
  brings_own_stack: true
alternatives:
  - livekit
  - openai-realtime
verified_at: 2026-04-26T00:00:00.000Z
badges:
  - open_source
github_metrics:
  repo: snakers4/silero-vad
  source_url: 'https://github.com/snakers4/silero-vad'
  captured_at: 2026-04-27T00:00:00.000Z
  stars: 8903
  forks: 766
  watchers: 69
  open_issues: 10
  open_pull_requests: 3
  last_commit_at: 2026-03-26T00:00:00.000Z
  latest_release_at: 2026-02-24T00:00:00.000Z
  has_releases: true
  license: MIT
  primary_language: Python
  archived: false
  signals:
    - popular
    - maintained
  note: >-
    GitHub signals show a widely used and still-maintained VAD component,
    suitable as an infrastructure indicator rather than a consumer traffic
    metric.
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=HUbYXGeR8_c'
  title: Voice Activity Detection | The key to realtime voice chat - Silero VAD
  i18n:
    zh:
      title: Silero VAD 实时语音活动检测演示
i18n:
  zh:
    tagline: 面向语音应用的轻量开源语音活动检测组件
    licensing_notes: Silero VAD 是语音活动检测组件，不是语音生成或声音克隆产品。再分发时需核对仓库 license。
    gotchas:
      - VAD 只判断是否有人声，turn-taking 仍需要 endpointing 和打断策略
      - 阈值过激可能切掉轻声说话者或噪声麦克风用户
      - 生产 Agent 应该用真实通话录音测试 VAD 参数
    portability_notes: 可作为本地组件运行，迁移性强，但阈值和周边 turn-taking 逻辑与应用强相关。
    body: >-
      ## 先判断它是不是你的主力工具


      Silero VAD 更适合Voice AI 开发者在对话式 Agent、virtual companion、voice assistant、ai
      tutor里解决具体问题。它的定位是对话框架工具，不应该只按“功能多不多”来判断，而要看素材质量、预算、授权和团队是否能稳定复现结果。


      ### 适合的使用方式


      当你已经有明确输入素材、明确发布渠道，并且愿意做一次试听、检查或小规模试运行时，Silero VAD
      更容易发挥价值。先用一个真实项目验证输出质量，再决定是否放进固定流程。


      ### 不适合的情况


      如果你需要完全本地控制、非常低成本的大批量重试，或者无法接受人工 QA，应该先看替代方案。VAD only detects speech
      activity; turn-taking still needs endpointing and interruption policy


      ## 先检查费用和授权边界


      当前记录的价格模型是开源，起步参考为可免费开始。实际套餐、额度和商用限制仍应以官方价格页为准。


      ### 估算真实使用成本


      不要只看起步价。长音频、重生成、批量任务、API 调用、多人协作和导出限制都可能改变真实成本。第一次使用时，最好用一条完整内容估算单位成本。


      ### 确认发布和商用权限


      当前授权记录覆盖：商业项目、YouTube 变现、游戏发布。如果涉及客户项目、演员声音、游戏上线或付费分发，仍要在发布前核对官方条款。 Silero
      VAD is a voice activity detection component, not a voice generation or
      cloning product. Check the repository license for redistribution details.


      ## 管理质量、隐私和锁定风险


      Silero VAD 的关键风险不只是“能不能生成”，而是生成结果是否稳定、是否符合发布标准，以及后续能否迁移。


      ### 给输出留人工检查


      正式发布前要检查发音、情绪、噪声、时间轴、角色一致性和多语言质量。越接近商业发布，越应该保留人工听审或抽检环节。


      ### 提前规划迁移


      声音模型迁移性相对更好。Runs as a local component and is highly portable, but your
      thresholds and surrounding turn-taking logic are application-specific.


      ## 放进工作流时先小规模验证


      把 Silero VAD 当成工作流中的一个环节，而不是一次性替代整个制作流程。先用小范围素材验证，再决定是否批量化或自动化。


      ### 用真实素材做试点


      选择一段最接近生产环境的素材，跑完导入、生成、修正、导出和发布前 QA。这样比只看 demo 更能判断工具是否适合。


      ### 扩大投入前比较替代工具


      扩大投入前，可以和 livekit, openai-realtime 做一次同素材对比。
secondary_categories:
  - realtime_infrastructure
---
## Decide whether it should be your main tool

Silero VAD is most useful for voice AI builders working on conversational agents, virtual companion, voice assistant, ai tutor. Treat it as a conversation framework tool, not as a generic AI feature list. The real decision is whether it fits your source material, budget, rights needs, and tolerance for QA.

### Use it when the job is specific

Silero VAD works best when you already know the input material, the publishing channel, and the quality bar. Run one realistic project first, then decide whether it belongs in a repeatable workflow.

### Avoid it when control matters more

Be cautious if you need full local control, very low-cost high-volume retries, or a workflow with no human review. VAD only detects speech activity; turn-taking still needs endpointing and interruption policy

## Check cost and rights before committing

The current directory record lists a open source pricing model, with a starting reference of can start free. Check the official pricing page before budgeting production usage.

### Estimate the real usage cost

Do not judge by the entry price alone. Long files, regenerations, batch jobs, API calls, seats, and export limits can change the real cost. Use one complete production-like sample to estimate cost before scaling.

### Confirm release rights

The current licensing record covers: commercial projects, YouTube monetization, game shipping. Recheck the official terms before client work, actor voices, game releases, or paid distribution. Silero VAD is a voice activity detection component, not a voice generation or cloning product. Check the repository license for redistribution details.

## Manage quality, privacy, and lock-in

The important production question is not only whether Silero VAD can produce output, but whether the output is stable enough and whether the project can move later.

### Keep a human QA step

Review pronunciation, emotion, noise, timing, speaker consistency, and multilingual quality before release. The closer the output is to paid work, the more important it is to keep listening checks or spot checks in the workflow.

### Plan for portability

Voice-model portability is comparatively stronger. Runs as a local component and is highly portable, but your thresholds and surrounding turn-taking logic are application-specific.

## Fit it into a workflow

Use Silero VAD as one stage in a production process, not as a full replacement for planning, editing, rights checks, and publishing QA.

### Start with a realistic pilot

Choose one source file or script that represents the real workload. Run it through import, generation, correction, export, and pre-publish review before rolling the tool out to more projects.

### Compare alternatives before scaling

Before scaling, compare it with livekit, openai-realtime using the same source material.
