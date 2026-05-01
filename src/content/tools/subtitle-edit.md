---
name: Subtitle Edit
slug: subtitle-edit
tagline: Free open-source subtitle editor with waveform timing and Whisper transcription
website: 'https://github.com/SubtitleEdit/subtitleedit'
logo: /logos/subtitle-edit.svg
primary_category: creator_editing
secondary_categories:
  - stt
  - dubbing
layers:
  - L2
use_cases:
  creators:
    - subtitles
    - short_video
    - podcast
  game_devs:
    - localization
  voice_ai_builders: []
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://github.com/SubtitleEdit/subtitleedit'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    Subtitle Edit is an MIT-licensed open-source desktop application. Commercial
    use of subtitle files is generally a content-rights question, but optional
    Whisper engines, OCR assets, dictionaries, translation services, and media
    sources can have separate terms.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: true
  realtime_capable: false
  open_source: true
  offline_capable: true
  batch_api: false
gotchas:
  - Best for hands-on subtitle timing and QA, not fully automatic publishing
  - macOS builds may require extra unsigned-app security steps
  - Optional online translation, STT, TTS, OCR, or lookup services send data to the selected provider
  - Whisper speed and accuracy depend on audio quality, model choice, CPU/GPU, and language
language_quality:
  en: good
  zh: good
portability:
  voice_model_export: true
  notes: >-
    Subtitle files, project files, and local media remain portable. Optional
    third-party STT or translation output should be stored with source files,
    model/provider settings, and review notes.
github_metrics:
  repo: SubtitleEdit/subtitleedit
  source_url: 'https://github.com/SubtitleEdit/subtitleedit'
  captured_at: 2026-05-01T00:00:00.000Z
  stars: 12800
  forks: 1200
  watchers: 169
  open_issues: 412
  open_pull_requests: 3
  commits: 21433
  latest_release_at: 2026-04-15T00:00:00.000Z
  has_releases: true
  license: MIT
  primary_language: C#
  archived: false
  signals:
    - popular
    - maintained
alternatives:
  - descript
  - whisperx
  - faster-whisper
verified_at: 2026-05-01T00:00:00.000Z
badges:
  - open_source
  - popular
video:
  provider: youtube
  url: 'https://www.youtube.com/watch?v=OL9g61YIdyo'
  title: 'SUBTITLE EDIT: complete tutorial'
  i18n:
    zh:
      title: Subtitle Edit 英文完整教程
i18n:
  zh:
    tagline: 免费开源字幕编辑器，支持波形校时和 Whisper 转写
    licensing_notes: >-
      Subtitle Edit 是 MIT 许可的开源桌面应用。字幕文件能否商用主要取决于原视频、音频、译文和交付场景的权利；可选
      Whisper 引擎、OCR 资源、词典、翻译服务和素材来源也可能有独立条款。
    gotchas:
      - 更适合人工校时和 QA，不适合生成后直接发布
      - macOS 版本可能需要额外处理未签名应用的安全限制
      - 可选在线翻译、STT、TTS、OCR 或查询服务会把必要数据发给所选提供商
      - Whisper 速度和准确率取决于音频质量、模型选择、CPU/GPU 和语言
    portability_notes: 字幕文件、项目文件和本地媒体都容易迁移；第三方转写或翻译结果应连同源文件、模型/服务设置和审核记录一起保存。
    body: >-
      ## 先判断它是不是你的主力字幕工具

      Subtitle Edit 适合需要精修 SRT、VTT、ASS、SSA 等字幕文件的创作者、字幕组、课程团队和游戏本地化人员。它的价值不只是“自动生成字幕”，而是把转写、波形校时、分割合并、格式转换、翻译草稿和人工 QA 放在同一个本地桌面流程里。

      ### 适合需要可控字幕文件的项目

      如果你要交付给 YouTube、Premiere、DaVinci Resolve、游戏引擎或本地化团队，Subtitle Edit 比只依赖平台自动字幕更稳。你可以先用 Whisper 生成草稿，再按波形修时间轴，最后导出发布渠道需要的格式。

      ### 不适合零审核自动发布

      如果你的目标是上传视频后完全不看字幕，Subtitle Edit 不是省掉 QA 的工具。它能减少打轴和转写时间，但人名、术语、断句、标点、双语排版和敏感内容仍需要人工检查。

      ## 先检查成本、安装和授权边界

      工具本身免费开源，但真实成本会出现在安装、模型下载、硬件速度、翻译服务和人工校对上。

      ### 免费不等于没有工作量

      Windows 用户通常最容易上手；macOS 和 Linux 可用，但可能需要处理 mpv、ffmpeg、未签名应用或 Flatpak 等细节。长视频、低质量录音或大模型 Whisper 会明显增加等待时间。

      ### 商用要看素材和第三方服务

      Subtitle Edit 本身不会替你解决素材权利。给客户、游戏或 YouTube 项目交付前，要保留原视频授权、译者记录、转写/翻译服务设置和最终字幕文件版本。

      ## 管理隐私和迁移风险

      核心编辑、转换、播放和本地备份都可以在设备上完成，这让它适合处理不想上传到网页工具的素材。

      ### 在线功能要单独评估

      当你启用在线翻译、STT、TTS、OCR 或词典查询时，相关片段会发送给所选服务。敏感访谈、未公开课程、客户素材和游戏剧情对白应该先确认服务条款，或者只使用本地流程。

      ### 把交付文件和设置一起归档

      字幕文件本身很容易迁移，但同一项目最好保存源视频、最终 SRT/VTT/ASS、Whisper 模型、翻译服务、字体样式和人工修改记录。这样以后重导出或修订不会从头开始。

      ## 把 QA 留在流程里

      Subtitle Edit 的最佳用法是先生成或导入字幕，再用波形、视频预览和错误检查做一次发布前审核。

      ### 重点检查时间轴和术语

      自动转写常见问题是专有名词、口音、重叠说话、音乐声、标点和断句。发布前至少抽查开头、中段、结尾和术语密集段落，长片还要检查字幕是否逐渐漂移。

      ### 用真实素材决定是否长期采用

      第一次评估不要只跑干净演示音频。拿一段真实视频测试转写、翻译、校时、导出和平台上传，记录人工修改时间，再决定是否把它放进固定字幕流程。
---
## Decide whether it should be your main subtitle tool

Subtitle Edit is strongest when you need editable subtitle files with real timing control. It is a good fit for creators, course teams, subtitlers, and game localization workflows that need SRT, VTT, ASS, SSA, or broadcast-style subtitle files rather than only platform auto-captions.

### Use it when subtitle files matter

Choose Subtitle Edit when the output needs to move between YouTube, Premiere, DaVinci Resolve, a game engine, a localization vendor, or an archive. You can generate a first pass with Whisper, adjust timing against the waveform, fix text, translate drafts, and export the format your next tool expects.

### Be cautious when you want no-review automation

Subtitle Edit reduces transcription and timing work, but it does not remove the need for QA. Names, technical terms, punctuation, line breaks, bilingual layout, speaker changes, and sensitive phrases still need human review before publication.

## Check cost, setup, and rights first

The application is free and open source, but the practical cost is setup time, model downloads, hardware speed, optional translation services, and editorial review.

### Treat free as a local workflow, not a hosted service

Windows is usually the smoothest path. macOS and Linux are viable, especially with newer cross-platform builds, but you may need to handle mpv, ffmpeg, unsigned-app warnings, Flatpak, or other packaging details. Long recordings and larger Whisper models can be slow without suitable CPU or GPU capacity.

### Keep commercial records with the project

The editor license is not the only rights question. Commercial delivery still depends on your source media, transcript, translation, fonts, style assets, and any third-party STT or translation provider you use. Keep those records with the exported subtitle files.

## Manage privacy and portability

Subtitle Edit is attractive for private material because core editing, conversion, playback, and local backup can run on your own device.

### Check optional online services before sensitive work

The local app does not need to upload your subtitle or media files for core editing. If you enable online translation, STT, TTS, OCR, dictionary, or lookup features, the selected provider receives the data needed for that request, so client footage and unreleased scripts deserve a separate privacy check.

### Archive source files and settings

SRT, VTT, ASS, and related subtitle formats are portable, but reproducibility comes from saving the source media, final exports, Whisper model choice, translation provider, fonts, style settings, and review notes together.

## Keep QA in the workflow

The best first workflow is to generate or import a subtitle file, correct timing against the waveform, then review the text while watching the video.

### Review timing drift and terminology

Automatic transcription often struggles with names, accents, overlapping speakers, music beds, punctuation, and specialist vocabulary. For long videos, check whether subtitles drift near the end, not only whether the first minute looks good.

### Re-evaluate with real material

Do not judge it from a clean demo clip alone. Test one real video from your channel, course, game, or client workflow, measure the manual correction time, and compare that with Descript, WhisperX, or faster-whisper before making it the default.
