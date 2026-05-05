---
name: Voicebox
slug: voicebox
tagline: 'Local-first open-source voice cloning, TTS, dictation, and agent voice studio'
website: 'https://voicebox.sh'
logo: /logos/voicebox.png
primary_category: voice_cloning
secondary_categories:
  - tts
  - stt
  - conversation_framework
layers:
  - L2
  - L3
use_cases:
  creators:
    - voiceover
    - audiobook
    - podcast
  game_devs:
    - npc_dialogue
    - localization
    - engine_integration
  voice_ai_builders:
    - conversational_agent
    - virtual_companion
    - voice_assistant
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://github.com/jamiepine/voicebox'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: true
  notes: >-
    Voicebox code is MIT-licensed, but production use still depends on the
    license of each downloaded TTS model, the source voice, and the project
    context. Clone voices only with consent and keep release records for client,
    YouTube, game, or character work.
capabilities:
  voice_cloning: true
  multilingual: true
  chinese_support: true
  realtime_capable: false
  open_source: true
  offline_capable: true
  batch_api: true
gotchas:
  - >-
    Large model downloads and GPU/runtime setup are part of the real cost, even
    though the app is free
  - >-
    Commercial safety depends on the selected model license and permission to
    use the reference voice
  - >-
    Linux users may need to build from source because pre-built Linux binaries
    are not listed yet
  - >-
    Quality, speed, and expressive controls vary by engine; paralinguistic tags
    work only on supported engines
language_quality:
  en: good
  zh: good
  ja: good
  ar: good
portability:
  voice_model_export: true
  notes: >-
    Voicebox runs locally and supports voice profile management and
    import/export workflows. Finished audio, local profiles, and generated
    history stay under the user's machine, subject to the chosen model and
    storage setup.
github_metrics:
  repo: jamiepine/voicebox
  source_url: 'https://github.com/jamiepine/voicebox'
  captured_at: 2026-04-28
  stars: 23800
  forks: 2800
  open_issues: 273
  open_pull_requests: 24
  commits: 588
  latest_release_at: 2026-04-25T00:00:00.000Z
  has_releases: true
  license: MIT
  primary_language: TypeScript
  archived: false
  signals:
    - popular
    - trending
    - maintained
  note: >-
    GitHub public page showed v0.5.0 as the latest release, 23.8k stars, 2.8k
    forks, 273 open issues, 24 open pull requests, and 588 commits during this
    update.
alternatives:
  - elevenlabs
  - chatterbox
  - f5-tts
verified_at: 2026-04-28
badges:
  - open_source
  - new
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=y_p4OzDzkYU'
  title: Voicebox + Qwen3-TTS | Local Voice Cloning Studio
  i18n:
    zh:
      title: Voicebox 与 Qwen3-TTS 本地声音克隆演示
i18n:
  zh:
    tagline: 本地优先的开源声音克隆、TTS、听写和 Agent 语音工作室
    licensing_notes: >-
      Voicebox 代码采用 MIT 许可，但生产使用还取决于所下载 TTS
      模型的许可、参考声音来源和具体项目场景。声音克隆必须获得授权，客户项目、YouTube、游戏和角色声音都应保留授权记录。
    gotchas:
      - 虽然应用免费，但大模型下载、本地 GPU/运行时配置才是真实成本
      - 商用安全性取决于所选模型许可和参考声音授权
      - Linux 当前可能需要从源码构建，因为官方页面尚未列出预编译 Linux 二进制包
      - 质量、速度和表现力控制随引擎变化；副语言标签只在支持的引擎上生效
    portability_notes: >-
      Voicebox 在本机运行，并支持 voice profile 管理和导入/导出。成品音频、本地 profile
      和生成历史保留在用户机器上，但仍受所选模型和本地存储设置影响。
    body: >
      ## 先判断它是不是你的主力本地语音工具


      Voicebox 适合想把声音克隆、TTS、听写、脚本生成和 Agent 语音输出放在本地机器上的创作者、游戏开发者和 Voice AI
      开发者。它不是最省心的托管服务，而是一个开源本地工作台：你换来的是隐私、无按字符计费、可接本地 REST API 和 MCP 的控制权。


      ### 适合本地隐私和多引擎实验


      如果你要做有声书草稿、角色台词、播客片段、NPC 对话、Agent 通知语音或本地语音 API，Voicebox 很值得测试。官网和 GitHub
      README 都强调它能在本机运行多个 TTS 引擎、用 Whisper 做转写、提供 profile 管理、故事编辑器、REST API 和
      MCP 工具。


      ### 不适合只想马上出片的新手


      如果你只想在浏览器里贴脚本、选音色、下载成品，ElevenLabs、Murf 或 WellSaid 会更轻。Voicebox
      需要下载模型、处理本地算力、理解不同引擎限制，还要自己做发布前 QA。


      ## 先检查成本和授权边界


      Voicebox 本身是免费开源，但“免费”不等于没有成本。真实成本来自模型下载、硬件、调试时间、声音授权和你选择的模型条款。


      ### 把硬件和模型许可算进成本


      Voicebox
      支持多个引擎，不同模型对显存、CPU、速度和语言质量要求不同。做长期项目时，不要只试一条短句；要用完整脚本测试速度、稳定性、发音和批量生成体验。


      ### 声音克隆必须保留授权


      代码是 MIT，但克隆真人声音时仍需要声音所有者同意。客户声音、演员声音、公众人物相似声音、游戏角色长期使用和 YouTube
      商用发布，都应该保留授权文件、参考音频来源和生成记录。


      ## 管理本地工作流和锁定风险


      Voicebox 的优势是本地控制：音频、profile 和 API 都在你的机器上。但本地控制也意味着你要负责备份、升级、模型缓存和出错排查。


      ### 备份 profile 和成品音频


      如果你把某个品牌声音或角色声音做成长期资产，要把原始授权、参考样本、profile、脚本和导出的 WAV/MP3
      都保存在项目仓库或资产管理系统里。不要只依赖应用内部历史。


      ### API 适合原型，不等于生产服务


      本地 REST API 很适合游戏工具链、内部脚本和 Agent
      语音通知。真正上线到多人团队或产品环境前，还要考虑鉴权、队列、失败重试、模型缓存和机器资源隔离。


      ## 保留人工 QA


      Voicebox
      能让本地语音生产变快，但不同引擎的语气、中文、长文本和情绪控制差异很大。最稳妥的做法是先选引擎，再用真实脚本做短片段测试，最后批量生成。


      ### 逐引擎测试同一段脚本


      用同一段包含数字、缩写、角色名、中文和情绪要求的脚本测试多个引擎。记录哪个引擎适合旁白、哪个适合角色台词、哪个适合快速草稿。


      ### 发布前听完整成品


      即使本地生成成本低，也不要跳过全片试听。长文本拼接、跨段落语气、口误修正和人物一致性都需要人工检查。
traffic_estimates:
  source: Similarweb public data endpoint
  source_url: 'https://data.similarweb.com/api/v1/data?domain=voicebox.sh'
  captured_at: 2026-05-05
  period_label: 2026-03
  visits_last_month: 300110
  monthly_visits:
    - month: 2026-02
      visits: 216291
      is_partial: false
    - month: 2026-03
      visits: 300110
      is_partial: false
  bounce_rate_percent: 48.37
  pages_per_visit: 1.75
  avg_visit_duration: '0:48'
  global_rank: 178822
  country_rank: 49078
  note: 'Public web-traffic estimate; use directionally, not as audited analytics.'
---
## Decide whether it should be your main local voice tool

Voicebox is a good fit when you want voice cloning, TTS, dictation, script production, and agent speech to run on your own machine instead of a hosted voice platform. It is less of a one-click creator SaaS and more of a local open-source voice workstation.

### Use it when local control matters

Use Voicebox for audiobook drafts, character lines, podcast segments, NPC dialogue, agent notifications, and local voice APIs when privacy, no per-character billing, and local model control matter. The official site and GitHub README describe local TTS engines, Whisper transcription, profile management, a stories editor, REST endpoints, and MCP tools.

### Be cautious when you need zero setup

If you only want to paste a script in a browser, choose a voice, and download finished audio, a hosted tool such as ElevenLabs, Murf, or WellSaid will be easier. Voicebox asks you to manage model downloads, local hardware, engine differences, and QA.

## Check cost and rights before publishing

Voicebox is free and open source, but free software does not remove production cost or rights review. The real checks are hardware, model terms, cloned-voice consent, and whether your selected engine is appropriate for the release channel.

### Count hardware and model setup as cost

Different engines have different speed, VRAM, CPU, and language behavior. Test a real script, not just a short sentence, before deciding it can carry a recurring workflow.

### Keep consent records for cloned voices

The Voicebox code is MIT-licensed, but real voice cloning still requires permission from the person whose voice is cloned. For clients, actors, public-figure-like voices, long-running game characters, and monetized YouTube work, keep consent files, source-audio records, and generated-output logs.

## Manage local workflow and portability

Voicebox's strength is that your voice data and API can stay local. That also means you own backups, upgrades, model caches, troubleshooting, and any production hardening.

### Back up profiles and exports

If a voice becomes a brand or character asset, store the original authorization, reference samples, voice profile, scripts, and exported audio outside the app history. Treat profiles as production assets, not disposable presets.

### Treat the local API as a builder surface

The local REST API is useful for game tools, internal scripts, and agent speech. Before sharing it with a team or product, add your own thinking around auth, queues, retries, cache location, and machine isolation.

## Keep human QA in the loop

Voicebox makes local generation cheaper to repeat, but engine behavior still varies. Long scripts, Chinese pronunciation, emotional tags, character consistency, and stitched segments need listening checks.

### Test one script across engines

Use the same script with numbers, acronyms, character names, Chinese, and emotional direction across the engines you plan to use. Record which engine is best for narration, character lines, fast drafts, and final exports.

### Listen through the final file

Do not ship generated voice just because local retries are cheap. Listen through the finished file for joins, tone drift, pronunciation, and rights-sensitive voice similarity.
