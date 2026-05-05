---
name: Rasa
slug: rasa
tagline: Open-source conversational AI framework for assistants and dialogue control
website: 'https://opensource.rasa.com/'
logo: /logos/rasa.png
primary_category: conversation_framework
secondary_categories:
  - voice_agent_platform
layers:
  - L2
use_cases:
  creators: []
  game_devs:
    - npc_dialogue
  voice_ai_builders:
    - conversational_agent
    - voice_assistant
    - ai_tutor
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://opensource.rasa.com/'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    Open-source project; review repository license plus any model, dataset, and
    voice-rights restrictions before commercial release.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: false
  open_source: true
  offline_capable: true
  batch_api: false
gotchas:
  - >-
    Self-hosting shifts the real cost to setup, hardware, maintenance, and
    license review
  - >-
    Commercial release depends on model, dataset, and voice-rights terms, not
    only the code license
  - Quality should be tested with real scripts before publishing
portability:
  voice_model_export: true
  notes: >-
    Self-hosted projects are more portable, but model weights, checkpoints, and
    generated assets still need separate backup and license review.
alternatives:
  - botpress
verified_at: 2026-04-28
badges:
  - open_source
  - new
voice_agent_extras:
  type: framework
  brings_own_stack: false
i18n:
  zh:
    tagline: 用于助手和对话控制的开源 Conversational AI 框架
    licensing_notes: 开源不等于自动可商用；上线前仍需核对代码许可、模型许可、训练数据和声音授权。
    gotchas:
      - 自托管会把真实成本转移到安装、硬件、维护和许可审查
      - 商业发布取决于模型、数据和声音权利，不只取决于代码许可证
      - 发布前必须用真实脚本测试质量
    portability_notes: 自托管项目可迁移性更高，但模型权重、检查点和生成资产仍要单独备份并检查许可。
    body: >-
      ## 先判断它是否适合作为主力工具

      Rasa 适合优先评估的场景是：需要可控对话策略的助手。它的核心价值在于 需要
      NLU、对话管理、测试和自托管控制的团队，不要把它当成覆盖所有语音需求的万能平台。

      ### 场景越清楚，越容易判断是否值得用

      如果你的输入、输出和审核步骤都已经明确，Rasa 会更容易发挥价值。比如你知道要处理哪类音频、生成什么格式、交给谁审核，再决定是否放进长期流程。

      ### 边界条件才是新手最容易踩坑的地方

      如果你只想今天下午快速上线一个托管语音机器人，不要直接把它定为默认工具。先和页面中的替代方案比较，再投入设置时间、额度、声音资产或团队培训成本。

      ## 先检查成本和商用边界

      开源工具本身通常不按月收费，但真实成本会转移到安装、算力、模型管理、调试和人工质检。

      ### 用真实任务做第一次预算测试

      不要只用一小段演示判断成本。用真实脚本、真实通话时长、真实批量文件或真实素材跑一遍，把失败重试、导出、团队席位和人工复核都算进去。

      ### 授权记录要和资产放在一起

      开源代码许可不等于所有输出都自动可商用。模型、训练数据、参考声音和分发场景仍然可能有独立限制。
      建议把源文件、提示词、声音授权、许可说明和最终导出放在同一个项目记录里。

      ## 管理设置、隐私和锁定风险

      Rasa 给你更多技术控制权，但安装、升级、模型选择和稳定性都要自己负责。

      ### 上传敏感素材前先确认数据位置

      如果素材包含客户录音、演员声音、未公开内容、电话通话或敏感业务信息，要先确认处理发生在本地、云端、自托管环境还是企业隔离环境。

      ### 工作流变大前先准备迁移路径

      把成品音频、字幕/转写、配置说明、发音表和授权记录导出到平台外。如果自定义声音或模型无法导出，就把它视为长期锁定风险。

      ## 保留人工质检

      Rasa 应该提高生产效率，而不是替代审核。最稳的第一步是：准备真实样本，先跑短片段，检查输出，再调整设置，最后批量处理。

      ### 优先检查最可能影响发布的问题

      创作者工具重点听发音、剪辑痕迹、噪声、节奏和情绪；实时和智能体工具则要测延迟、打断、轮流说话和转写错误后的恢复能力。

      ### 有真实用量后再重新比较

      使用一周后，用输出质量、真实成本、人工修正时间和授权清晰度重新对比替代方案。只有当真实流程更好时，才值得继续作为主力。
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=lYOrQDu_86w'
  title: 'Rasa Masterclass: The Recap | Rasa 1.8.0'
  i18n:
    zh:
      title: Rasa Masterclass 对话助手教程回顾
github_metrics:
  repo: RasaHQ/rasa
  source_url: 'https://github.com/RasaHQ/rasa'
  captured_at: 2026-04-29
  stars: 21144
  forks: 4909
  watchers: 352
  open_issues: 145
  open_pull_requests: 42
  last_commit_at: 2025-12-18T00:00:00.000Z
  latest_release_at: 2025-01-14T00:00:00.000Z
  has_releases: true
  license: Apache-2.0
  primary_language: Python
  archived: false
  signals:
    - popular
    - maintained
  note: >-
    GitHub public metrics captured for maintenance screening; verify repository
    activity before adopting it for production.
traffic_estimates:
  source: Similarweb public data endpoint
  source_url: 'https://data.similarweb.com/api/v1/data?domain=opensource.rasa.com'
  captured_at: 2026-05-05
  period_label: 2026-02
  visits_last_month: 293
  monthly_visits:
    - month: 2026-02
      visits: 293
      is_partial: false
  bounce_rate_percent: 0
  pages_per_visit: 0
  avg_visit_duration: '0:00'
  note: 'Public web-traffic estimate; use directionally, not as audited analytics.'
  domain_created_at: '1996-04-26'
  domain_created_source_url: 'https://rdap.org/domain/rasa.com'
---
## Decide whether it should be your main tool

Rasa is worth evaluating when your job is controllable assistants with explicit dialogue policy. Its strongest use case is teams that need NLU, dialogue management, testing, and self-hosted control; it should not be treated as a universal voice AI platform.

### Use it when the workflow matches its center of gravity

Choose Rasa when you can describe the job in one sentence and that sentence matches the product: controllable assistants with explicit dialogue policy. It is a better fit when you already know the input, output, and review step than when you are still exploring broad voice AI ideas.

### Be cautious when the boundary is your real requirement

Avoid making it the default if you only need a simple hosted voice bot this afternoon. In that case, compare it with the alternatives above before you invest time in setup, credits, voice assets, or team training.

## Check cost and commercial boundaries first

The software is free, but the real budget is setup time, GPU or CPU capacity, model storage, and QA.

### Treat the first production run as a budget test

Do not judge cost from a short demo. Test a realistic file, script, call duration, or batch size, then include failed runs, retries, exports, and teammate seats in the estimate.

### Keep rights review close to the asset

For open-source tools, code licensing is only one layer. Model checkpoints, training data, reference voices, and output distribution can still create separate rights risk. Store the source file, prompt, voice consent, license note, and final export together so future reuse is not a guessing game.

## Manage setup, privacy, and lock-in

Rasa gives you more technical control, but it also makes you responsible for installation, updates, model selection, and operational reliability.

### Check where audio and voice data live

For sensitive calls, unreleased media, actor voices, or client recordings, confirm whether processing is local, hosted, self-hosted, or enterprise-controlled before uploading production material.

### Plan an exit path before the workflow grows

Export finished audio, transcripts, configuration notes, pronunciation lists, and consent records outside the tool. If a custom voice or model cannot be exported, treat that as a long-term lock-in risk.

## Keep QA in the workflow

Rasa should speed up production, not remove review. The first useful workflow is: prepare a representative input, run a short sample, inspect the output, adjust settings, then scale.

### Review the failure mode that matters most

For creator tools, listen for pronunciation, edits, artifacts, and pacing. For realtime and agent tools, measure latency, interruption handling, turn-taking, and recovery from bad transcripts.

### Re-evaluate once usage is measurable

After a week of real work, compare output quality, cost, manual cleanup time, and rights confidence against direct alternatives. Keep it only if the measured workflow is better, not just because the demo looked good.
