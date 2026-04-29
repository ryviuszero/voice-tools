---
name: Botpress
slug: botpress
tagline: 'Visual AI agent platform that can connect web, chat, and voice channels'
website: 'https://botpress.com/en'
logo: /logos/botpress.png
primary_category: conversation_framework
secondary_categories:
  - voice_agent_platform
layers:
  - L3
  - L4
use_cases:
  creators: []
  game_devs:
    - npc_dialogue
  voice_ai_builders:
    - conversational_agent
    - voice_assistant
    - phone_agent
pricing:
  model: freemium
  has_free_tier: true
  starting_paid_usd: 89
  pricing_url: 'https://www.botpress.com/en/pricing'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    Commercial usage depends on the active plan and terms. Recheck pricing,
    data, and content policies before client, YouTube, game, or paid
    distribution.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: false
  open_source: false
  offline_capable: false
  batch_api: true
gotchas:
  - >-
    Free or trial plans are useful for evaluation but may not cover commercial
    production
  - >-
    Pricing, quotas, and rights can change, so verify the linked pricing page
    before budgeting
  - Language quality and export behavior should be tested with real content
portability:
  voice_model_export: false
  notes: >-
    Finished assets may be exportable, but accounts, hosted voices, usage logs,
    and workflow configuration usually remain platform-bound.
alternatives:
  - rasa
verified_at: 2026-04-28T00:00:00.000Z
badges:
  - new
voice_agent_extras:
  type: orchestration_platform
  brings_own_stack: true
i18n:
  zh:
    tagline: 可连接网页、聊天和语音渠道的可视化 AI Agent 平台
    licensing_notes: 商用权限取决于当前套餐和官方条款；客户项目、YouTube 变现、游戏发布和付费分发前都要复核。
    gotchas:
      - 免费或试用套餐适合评估，但未必覆盖商业生产
      - 价格、额度和授权可能变化，预算前要重新检查价格页
      - 语言质量和导出行为需要用真实内容测试
    portability_notes: 成品资产通常可以导出，但账号、托管声音、用量记录和工作流配置通常仍绑定平台。
    body: >-
      ## 先判断它是否适合作为主力工具

      Botpress 适合优先评估的场景是：可视化 AI 智能体搭建。它的核心价值在于
      需要托管构建器、知识库、集成和可分享部署的团队，不要把它当成覆盖所有语音需求的万能平台。

      ### 场景越清楚，越容易判断是否值得用

      如果你的输入、输出和审核步骤都已经明确，Botpress
      会更容易发挥价值。比如你知道要处理哪类音频、生成什么格式、交给谁审核，再决定是否放进长期流程。

      ### 边界条件才是新手最容易踩坑的地方

      如果你需要底层实时媒体控制，不要直接把它定为默认工具。先和页面中的替代方案比较，再投入设置时间、额度、声音资产或团队培训成本。

      ## 先检查成本和商用边界

      公开付费入口大约从 $89/月开始，但真实成本还要看额度、分钟数、席位、导出和重试。

      ### 用真实任务做第一次预算测试

      不要只用一小段演示判断成本。用真实脚本、真实通话时长、真实批量文件或真实素材跑一遍，把失败重试、导出、团队席位和人工复核都算进去。

      ### 授权记录要和资产放在一起

      托管商业工具要以官方价格页和条款为准，客户项目、YouTube 变现和游戏发布前都应重新核对。
      建议把源文件、提示词、声音授权、许可说明和最终导出放在同一个项目记录里。

      ## 管理设置、隐私和锁定风险

      Botpress 省掉了基础设施工作，但账号、项目设置、用量历史和托管资产通常会留在平台里。

      ### 上传敏感素材前先确认数据位置

      如果素材包含客户录音、演员声音、未公开内容、电话通话或敏感业务信息，要先确认处理发生在本地、云端、自托管环境还是企业隔离环境。

      ### 工作流变大前先准备迁移路径

      把成品音频、字幕/转写、配置说明、发音表和授权记录导出到平台外。如果自定义声音或模型无法导出，就把它视为长期锁定风险。

      ## 保留人工质检

      Botpress 应该提高生产效率，而不是替代审核。最稳的第一步是：准备真实样本，先跑短片段，检查输出，再调整设置，最后批量处理。

      ### 优先检查最可能影响发布的问题

      创作者工具重点听发音、剪辑痕迹、噪声、节奏和情绪；实时和智能体工具则要测延迟、打断、轮流说话和转写错误后的恢复能力。

      ### 有真实用量后再重新比较

      使用一周后，用输出质量、真实成本、人工修正时间和授权清晰度重新对比替代方案。只有当真实流程更好时，才值得继续作为主力。
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=i3DBiCzk5NY'
  title: Welcome to Botpress | The Complete AI Agent Platform
  i18n:
    zh:
      title: Botpress AI Agent 平台演示
traffic_estimates:
  source: Similarweb public data endpoint
  source_url: 'https://data.similarweb.com/api/v1/data?domain=botpress.com'
  captured_at: 2026-04-29T00:00:00.000Z
  period_label: 2026-03
  visits_last_month: 399746
  monthly_visits:
    - month: 2026-01
      visits: 626385
      is_partial: false
    - month: 2026-02
      visits: 435389
      is_partial: false
    - month: 2026-03
      visits: 399746
      is_partial: false
  bounce_rate_percent: 0.56
  pages_per_visit: 1.73
  avg_visit_duration: '47.36065865538055'
  global_rank: 138542
  country_rank: 52333
  note: 'Public web-traffic estimate; use directionally, not as audited analytics.'
  domain_created_at: '2000-02-29'
  domain_created_source_url: 'https://rdap.org/domain/botpress.com'
---
## Decide whether it should be your main tool

Botpress is worth evaluating when your job is visual AI agent building. Its strongest use case is teams that want a hosted builder, knowledge base, integrations, and shareable bot deployments; it should not be treated as a universal voice AI platform.

### Use it when the workflow matches its center of gravity

Choose Botpress when you can describe the job in one sentence and that sentence matches the product: visual AI agent building. It is a better fit when you already know the input, output, and review step than when you are still exploring broad voice AI ideas.

### Be cautious when the boundary is your real requirement

Avoid making it the default if you need low-level realtime media control. In that case, compare it with the alternatives above before you invest time in setup, credits, voice assets, or team training.

## Check cost and commercial boundaries first

The public paid entry point is around $89/month, but credits, minutes, seats, and exports can change the real cost.

### Treat the first production run as a budget test

Do not judge cost from a short demo. Test a realistic file, script, call duration, or batch size, then include failed runs, retries, exports, and teammate seats in the estimate.

### Keep rights review close to the asset

For hosted commercial tools, treat the current pricing and terms pages as the source of truth before client delivery, monetized publishing, or game shipping. Store the source file, prompt, voice consent, license note, and final export together so future reuse is not a guessing game.

## Manage setup, privacy, and lock-in

Botpress removes infrastructure work, but the account, project settings, usage history, and hosted assets may stay inside the platform.

### Check where audio and voice data live

For sensitive calls, unreleased media, actor voices, or client recordings, confirm whether processing is local, hosted, self-hosted, or enterprise-controlled before uploading production material.

### Plan an exit path before the workflow grows

Export finished audio, transcripts, configuration notes, pronunciation lists, and consent records outside the tool. If a custom voice or model cannot be exported, treat that as a long-term lock-in risk.

## Keep QA in the workflow

Botpress should speed up production, not remove review. The first useful workflow is: prepare a representative input, run a short sample, inspect the output, adjust settings, then scale.

### Review the failure mode that matters most

For creator tools, listen for pronunciation, edits, artifacts, and pacing. For realtime and agent tools, measure latency, interruption handling, turn-taking, and recovery from bad transcripts.

### Re-evaluate once usage is measurable

After a week of real work, compare output quality, cost, manual cleanup time, and rights confidence against direct alternatives. Keep it only if the measured workflow is better, not just because the demo looked good.
