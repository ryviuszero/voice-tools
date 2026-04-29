---
title: Localize Game Dialogue into Multiple Languages
user_group: game_devs
description: >-
  Translate, voice, QA, and re-import localized dialogue while preserving
  character identity across languages.
budget_min_usd: 0
budget_max_usd: 150
tools:
  - heygen
  - elevenlabs
  - resemble-ai
  - cartesia
  - f5-tts
  - whisperx
tool_recommendations:
  - tier: production_default
    tool_slug: heygen
    tool_name: HeyGen
    url: 'https://heygen.com/pricing'
    pricing: Creator from $29/mo
    summary: Production-friendly dubbing and localization studio for video workflows.
    caveat: Native speaker QA is still required before publishing.
    i18n:
      zh:
        summary: 面向视频流程的生产级配音和本地化 Studio。
        pricing: Creator $29/月起
        caveat: 发布前仍需要母语审核。
  - tier: production_default
    tool_slug: elevenlabs
    tool_name: ElevenLabs
    url: 'https://elevenlabs.io/pricing/'
    pricing: Starter from $6/mo; Creator from $22/mo
    summary: >-
      Hosted voice and audio generation default for quality, speed, and
      multilingual work.
    caveat: Voice cloning and commercial use require careful consent and plan checks.
    i18n:
      zh:
        summary: 质量、速度和多语言都需要时的主流托管声音工具。
        pricing: Starter $6/月起；Creator $22/月起
        caveat: 声音克隆和商用都要核对授权和套餐。
  - tier: fast_rising
    tool_slug: resemble-ai
    tool_name: Resemble AI
    url: 'https://www.resemble.ai/pricing'
    pricing: Pay-as-you-go and paid plans
    summary: Voice cloning and governance option for teams that need consent controls.
    caveat: Governance tools do not replace written permission records.
    i18n:
      zh:
        summary: 适合需要声音克隆、治理和授权控制的团队。
        pricing: 按量计费和付费计划
        caveat: 治理工具不能替代书面授权记录。
  - tier: fast_rising
    tool_slug: cartesia
    tool_name: Cartesia
    url: 'https://cartesia.ai/pricing'
    pricing: Free developer credits; usage-based API
    summary: Low-latency voice API option for custom realtime or production pipelines.
    caveat: 'It is a voice layer, not a full workflow by itself.'
    i18n:
      zh:
        summary: 适合自定义实时或生产链路的低延迟语音 API。
        pricing: 有免费开发额度；API 按量计费
        caveat: 它是语音层，不是完整工作流。
  - tier: open_or_self_hosted
    tool_slug: f5-tts
    tool_name: F5-TTS
    url: 'https://github.com/SWivid/F5-TTS'
    pricing: Free open source; local GPU recommended
    summary: Open TTS base for low-cost local generation and batch experiments.
    caveat: 'Quality depends on references, prompts, and inference setup.'
    i18n:
      zh:
        summary: 低成本本地生成和批量实验的开源 TTS 基础。
        pricing: 开源免费；建议本地 GPU
        caveat: 质量取决于参考音频、prompt 和推理配置。
  - tier: open_or_self_hosted
    tool_slug: whisperx
    tool_name: WhisperX
    url: 'https://github.com/m-bain/whisperX'
    pricing: Free open source; self-host compute
    summary: >-
      Useful open layer for word-level alignment, subtitle timing, and
      localization QA around dubbed dialogue.
    caveat: 'It handles transcription and alignment, not dubbing by itself.'
    i18n:
      zh:
        summary: 适合围绕配音对白做词级对齐、字幕时间轴和本地化质检。
        pricing: 开源免费；算力自备
        caveat: 它负责转写和对齐，不是独立配音工具。
sources:
  - title: Unity Localization Tools tutorial
    url: 'https://www.youtube.com/watch?v=fHPaG5C6P1M'
    note: >-
      Demonstrates Unity localization tables, locales, dynamic text, and package
      setup.
    i18n:
      zh:
        title: Unity Localization Tools 教程
        note: 演示 Unity 本地化表、语言环境、动态文本和包配置。
  - title: Google Cloud / Harris Poll game developer AI survey coverage
    url: >-
      https://www.pcgamer.com/software/ai/87-percent-of-game-developers-are-already-using-ai-agents-and-over-a-third-use-ai-for-creative-elements-like-level-design-and-dialogue-according-to-a-new-google-survey/
    note: >-
      Reports 45% of surveyed developers use AI for localization and
      translation.
    i18n:
      zh:
        title: Google Cloud / Harris Poll 游戏开发者 AI 调查报道
        note: 报道称 45% 受访开发者使用 AI 做本地化和翻译。
  - title: ElevenLabs Text to Dialogue documentation
    url: 'https://www.11labs.ru/docs/overview/capabilities/text-to-dialogue'
    note: Documents multilingual voice generation and video game dialogue use cases.
    i18n:
      zh:
        title: ElevenLabs Text to Dialogue 文档
        note: 记录了多语言语音生成和 video game dialogue 用例。
workflowDiagram:
  steps:
    - type: step
      icon: "\U0001F9FE"
      label: Lock source
      substeps:
        - Freeze line IDs
        - Add glossary and context
      i18n:
        zh:
          label: 锁定源文
          substeps:
            - 冻结台词 ID
            - 补术语和上下文
    - type: step
      icon: "\U0001F30D"
      label: Translate
      substeps:
        - Preserve variables
        - Keep character tone
      i18n:
        zh:
          label: 翻译对白
          substeps:
            - 保留变量
            - 保留角色语气
    - type: step
      icon: "\U0001F399️"
      label: Generate voices
      substeps:
        - Render by locale
        - Keep matching filenames
      i18n:
        zh:
          label: 生成语音
          substeps:
            - 按语言导出
            - 文件名对应
    - type: decision
      icon: "\U0001F442"
      label: Native QA?
      'yes':
        label: Import
        i18n:
          zh:
            label: 导入
      'no':
        label: Revise
        loop: true
        i18n:
          zh:
            label: 修订
      i18n:
        zh:
          label: 母语审核？
    - type: end
      icon: "\U0001F6A2"
      label: Ship locales
      i18n:
        zh:
          label: 发布语言包
featured: true
i18n:
  zh:
    title: 游戏对白多语言语音本地化
    description: 翻译、配音、质检并重新导入本地化对白，同时尽量保留跨语言角色身份。
    body: >-
      ## 本地化不是把台词翻完


      游戏对白本地化最容易低估的是上下文。普通翻译只看一句话，游戏里还要知道是谁说、对谁说、此时玩家做了什么、变量会插入什么、字幕框能放多长、语音是否要和镜头或动画对齐。AI
      可以帮你更快做多语言草稿和次要语言配音，但不能替代本地化包、母语 QA 和文化判断。


      这条流程适合已经有一版稳定源文、准备扩展 Steam demo
      或正式版语言的独立团队。它不适合还在大量改剧情的项目，也不适合完全没有人能审核目标语言的团队。没有母语审核时，宁愿先做字幕，不要急着发布完整配音。


      ## 建立本地化包


      先冻结源语言行号，导出 `line_id, speaker, scene, text, variables, max_length,
      context, audio_file`。每个变量都要写说明，例如 `{player_name}` 是姓名还是称号，`{count}`
      是否会触发复数。术语表要包含角色名、地名、技能名、UI 文案和不可翻译词。翻译时不要只追求字面一致，要保留角色关系、语气和玩家可理解性。


      语音本地化要按语言分层推进。第一轮可以只做关键任务、教程和商店页视频，验证玩家是否真的需要该语言。第二轮再扩展支线和 NPC
      池。每个目标语言至少抽查 50 句：变量是否破坏语法、字幕是否溢出、音频是否比镜头长、角色名发音是否稳定、文化梗是否需要改写。


      ## 工具选择


      HeyGen 更像视频本地化 Studio，适合 trailer、开发日志和带画面的配音。ElevenLabs 适合快速做多语言 TTS
      候选。Resemble AI 更适合需要 consent 和治理记录的团队。WhisperX
      在这里不是配音工具，而是对齐和字幕质检层，可以帮助找出音频和字幕不同步的问题。F5-TTS
      能降低成本，但本地部署和语言质量审核都要自己承担。


      页面中的 Unity Localization 视频适合放在这条工作流里看：它提醒你先把语言表、locale
      和动态字符串处理好，再讨论配音。没有结构化文本表，任何 AI 配音都会在导入时变成返工。


      ## 发行前检查


      上线前检查三件事：文本能否在 UI 容器里显示，语音是否和字幕、镜头、任务触发一致，Steam 或其他商店页是否需要披露玩家会听到的 AI
      生成音频。AI 翻译可以当第一稿，但最终至少要有母语者审核高曝光内容。


      ### 音频和文本一起冻结


      好的本地化流程会把文本、字幕和音频当作同一个交付单元。如果译文没有通过 QA，就把整句标记为
      blocked，而不是只替换音频。这样可以避免工程师把新音频导到旧字幕上。Steam
      demo、商店页视频和展会版本宁愿少开放几种语言，也不要发布未经审核的机器翻译草稿。


      ### 复盘节奏


      不要等流程跑大了才复盘。前三个真实项目结束后，就比较节省的时间、返工时间、人工修正量和观众反馈。如果自动化带来的审核债比产出价值更高，就缩小使用范围，而不是继续加工具。最稳定的
      AI 工作流通常输入范围很窄、审批规则清楚，并且公开发布前保留人工检查点。
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=fHPaG5C6P1M'
  title: Unity Localization Tools tutorial for game dialogue tables and dynamic text
  i18n:
    zh:
      title: Unity Localization Tools：游戏对白表和动态文本本地化教程
---
## What this solves for a small game team

Game dialogue localization is not just translation plus a new audio file. A player sees a subtitle, hears a line, watches an animation, and may trigger the next quest state before the voice finishes. If those parts are not connected by stable IDs and context, AI dubbing makes the mess faster instead of cheaper.

### Where AI helps

AI is useful for first-pass translation, temp localized VO, trailer dubbing, and secondary-language exploration when you are not sure a market justifies full studio localization. It is also helpful for checking timing: generated audio quickly reveals whether German, Spanish, Japanese, or Chinese lines are too long for your current UI and cutscene timing.

### When hand-made localization is better

Do not ship important story, jokes, romance, moral choices, or culturally sensitive material without human localizers. The risky part is not grammar; it is when a literal translation changes a relationship, ruins a clue, or makes a character sound out of genre. If you cannot review a language, start with subtitles or a smaller language pack.

### Production constraints

Lock the source script before the expensive pass. Export `line_id`, speaker, scene, variables, max character length, context, and current audio reference. The localization kit should include screenshots or short clips for lines that depend on UI, animation, or speaker intent. Without context, even a strong model will guess.

## Build the localization pipeline

### Create a localization kit before translating

A usable kit includes a glossary, character notes, forbidden translations, variable explanations, and examples of previous lines from the same speaker. Mark lines as UI, subtitle, bark, cutscene, combat, or narration. This prevents the common failure where a translator treats a 0.8-second bark like a literary sentence.

### Preserve IDs and variables

Never let the translation tool rewrite `{player_name}`, `%d`, item IDs, speaker tags, or rich text tags. Run a validator before generating audio. If a translated sentence breaks a variable or overflows the UI, fix text first; regenerating voice before the string is valid wastes credits.

### Generate voices by locale

Use AI voice only after the target-language text has passed a basic review. Keep one folder per locale and keep filenames identical to the source line IDs. Review pronunciation for names, invented words, and skill names before you generate the whole chapter. A single mispronounced faction name across 300 files is a production tax you can avoid with a 10-line pronunciation test.

### QA inside the engine

The embedded Unity Localization tutorial is useful because it shows the boring part that decides whether this workflow works: locale setup, localization tables, and dynamic text. Review localized audio in a build, not only in a web player. Check subtitle wrapping, voice length, lip-sync assumptions, quest triggers, and whether players can skip or interrupt lines cleanly.

## Choose tools for your team size

### Production default

HeyGen is strongest when your localization target is video: trailers, tutorials, devlogs, or marketing clips. ElevenLabs is a better default for many game dialogue lines because it is fast and multilingual. Use Resemble AI when consent records, governance, and voice management matter more than speed.

### Fast-rising option

Cartesia is useful when you are building a custom pipeline around low-latency API voice generation. It is not a localization suite by itself, so pair it with a real translation table, reviewer workflow, and asset export script.

### Open or self-hosted alternative

F5-TTS are worth testing for controlled local pipelines, while WhisperX is valuable for alignment and subtitle QA. The open-source route is cheapest only if you already have the engineering time to maintain models, GPU environments, and review tooling.

## Prepare for release

### Common mistakes and fixes

The first mistake is translating without context. Fix it with screenshots, scene notes, and speaker intent. The second is localizing text after voice generation. Fix it by validating strings before audio. The third is reviewing only the main quest. Fix it by sampling UI, combat barks, tutorial lines, store-page footage, and at least 50 player-facing lines per locale.

### Release checklist

Before publishing, verify the locale switcher, fallback language, font coverage, subtitle length, audio duration, filename mapping, and pronunciation guide. Keep source text, translated text, generated file, tool, reviewer, and approval date together. That record matters when a community translator reports a bug two months after release.

### Store and license notes

If localized AI voice or AI-translated lines are included in the game, public demo, store page, trailer, or marketing assets, disclose them according to the current platform rules. AI translation is a draft accelerator, not a legal guarantee or a substitute for rights review.

### Audio and text should fail together

A good localization pipeline treats text, subtitle, and audio as one unit. If a translated line fails QA, mark the whole line as blocked rather than replacing only the audio. That keeps build engineers from importing a new voice file against an older subtitle. For Steam demos, store-page trailers, and festival builds, keep a smaller approved language set instead of publishing every machine-translated draft.

### Review cadence

Set a review cadence before this becomes routine. After the first three real projects, compare the saved time against cleanup time, rework, and audience feedback. If the workflow creates more review debt than production value, narrow the scope instead of adding more automation. The strongest AI workflow is usually the one with a small number of repeatable inputs, clear approval rules, and a human checkpoint before anything public ships.
