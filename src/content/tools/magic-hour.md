---
name: Magic Hour
slug: magic-hour
tagline: Hosted AI sound, voice, image, and video creation for creator workflows
website: 'https://magichour.ai/products/video-to-audio'
logo: /logos/magic-hour.png
primary_category: sound_effects
secondary_categories:
  - creator_editing
  - voice_cloning
layers:
  - L3
  - L4
use_cases:
  creators:
    - short_video
    - voiceover
  game_devs:
    - sound_effects
  voice_ai_builders: []
pricing:
  model: freemium
  has_free_tier: true
  starting_paid_usd: 19
  pricing_url: 'https://magichour.ai/pricing'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: false
  voice_cloning_allowed: true
  notes: >-
    Paid plans permit commercial use and watermark-free exports. Free output is
    for preview and testing. Users remain responsible for the rights and
    consent needed for uploaded media, cloned voices, and published output;
    recheck the current terms before client, monetized, or game distribution.
capabilities:
  voice_cloning: true
  multilingual: false
  chinese_support: false
  realtime_capable: false
  open_source: false
  offline_capable: false
  batch_api: true
gotchas:
  - Free video-to-audio previews cover the first 5 seconds and allow 3 generations per day
  - Paid-plan credits, duration limits, resolution, and concurrency vary by plan and tool
  - Generated dialogue quality depends on clear faces, visible speaking, and limited occlusion
  - The service is hosted; models, account history, and project state are not self-hostable
portability:
  voice_model_export: false
  notes: >-
    Finished video and audio can be downloaded, but hosted models, cloned-voice
    state, project history, and generation settings remain tied to the service.
alternatives:
  - optimizerai
  - google-flow-music
  - rask-ai
verified_at: 2026-09-01T00:00:00.000Z
badges:
  - new
i18n:
  zh:
    tagline: 面向创作者工作流的托管式 AI 音效、语音、图像与视频生成平台
    licensing_notes: >-
      付费套餐允许商业使用并提供无水印导出；免费输出用于预览和测试。用户仍需为上传素材、克隆声音和公开发布的成品取得必要权利与同意，客户交付、变现或游戏发布前应复核最新条款。
    gotchas:
      - 免费 Video-to-Audio 预览只处理前 5 秒，每天可生成 3 次
      - 额度、时长、分辨率和并发限制会随套餐及工具变化
      - 生成对白的质量依赖清晰人脸、明显说话动作和较少遮挡
      - 服务完全托管，模型、账号历史和项目状态不能自托管
    portability_notes: >-
      成品视频和音频可以下载，但托管模型、克隆声音状态、项目历史与生成设置仍绑定服务。
    body: >-
      ## 先判断它是否匹配声音工作流

      Magic Hour 最适合需要同时处理短视频画面与声音的创作者。Video-to-Audio 会读取画面动作和场景，生成同步的 Foley、环境声、音效、音乐，必要时也可生成对白。平台还提供独立的声音克隆、变声、配乐、Lip Sync、视频和图像工具。

      ### 用它快速补全短视频声音

      如果已有静音视频、动画、产品演示或社交短片，它能减少手工寻找和对齐音效的时间。官方页面提供免费浏览器预览，也提供 API 入口，适合先用真实片段测试同步和输出质量。

      ### 不要把它当作实时语音基础设施

      Magic Hour 是托管式创作平台，不是实时电话 Agent、低延迟 TTS 管线或本地音频模型。需要实时对话、离线推理或可导出模型时，应比较专用方案。

      ## 上线前检查权利、成本与锁定

      付费套餐允许商业使用，但声音克隆、客户素材、演员录音和品牌资产仍需相应授权。发布前保存来源文件、同意记录、提示词、条款版本和最终导出。

      ### 用真实时长估算额度

      免费预览仅覆盖视频前 5 秒，每天 3 次。生产预算应按实际片长、失败重试、并发、分辨率和不同工具的额度消耗来计算，而不是用一次演示推断成本。

      ### 为托管服务准备迁移记录

      下载成品音频、视频和必要的项目说明。模型、克隆声音状态和生成历史不能完整迁出，因此长期工作流需要在平台外保留素材与授权记录。
---
## Decide whether it fits the sound workflow

Magic Hour is strongest when a creator needs visual and audio generation in one hosted workflow. Its Video-to-Audio tool reads motion and context from a clip and generates synchronized Foley, ambience, sound effects, music, and, when the scene supports it, dialogue. The wider platform also includes voice cloning, voice changing, music, lip-sync, video, and image tools.

### Use it to finish short-form video sound quickly

It is useful for silent footage, animation, product demos, social clips, and rough cuts where manually finding and timing sound would slow production. The official page provides a free browser preview and an API path, so test it with representative footage before committing credits to a larger batch.

### Do not treat it as realtime voice infrastructure

Magic Hour is a hosted creation platform, not a low-latency phone-agent stack, local TTS runtime, or downloadable audio model. Compare specialist tools when realtime conversation, offline inference, or model portability is the core requirement.

## Check rights, cost, and lock-in before publishing

Paid plans permit commercial use, but that does not replace consent or rights for cloned voices, client footage, actor recordings, music references, or other uploaded media. Keep the source asset, consent record, prompt, active terms, and final export together for serious work.

### Budget with a representative clip

The free Video-to-Audio preview covers the first five seconds and permits three daily generations. A production estimate should include full clip length, retries, concurrency, export resolution, and the credit rate of each tool rather than extrapolating from a single preview.

### Preserve an exit record for hosted work

Download finished audio and video plus the project notes needed to reproduce the creative decision. Hosted models, cloned-voice state, generation history, and account configuration are not self-hostable or fully portable.
