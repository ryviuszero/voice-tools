---
name: Google Flow Music
slug: google-flow-music
tagline: AI music creation tool powered by Google's Lyria 3 Pro model
website: 'https://flowmusic.google/'
logo: /logos/google-flow-music.svg
primary_category: sound_effects
secondary_categories: []
layers:
  - L3
  - L4
use_cases:
  creators:
    - short_video
    - podcast
  game_devs:
    - sound_effects
  voice_ai_builders: []
pricing:
  model: freemium
  has_free_tier: true
  starting_paid_usd: 7.99
  pricing_url: 'https://labs.google/fx/tools/flow/about'
licensing:
  commercial_use: false
  youtube_monetization: false
  game_use: false
  voice_cloning_allowed: false
  notes: >-
    Google Flow pricing and access depend on Google AI subscription tier,
    platform, and region. Public Google posts describe responsible training,
    SynthID watermarking, and policy controls, but do not provide a simple
    Flow Music-specific commercial rights summary. Review Google terms,
    generative AI policies, and current subscription terms before publishing
    client, YouTube, game, or streaming-release work.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: false
  realtime_capable: false
  open_source: false
  offline_capable: false
  batch_api: false
gotchas:
  - Commercial release rights are not simple enough to treat as cleared without reviewing current Google terms
  - Flow Music access and advanced features vary by Google AI subscription tier, platform, and region
  - Lyria outputs include SynthID watermarking for Google AI-generated content
  - It is built for music and song iteration, not voiceover, dubbing, transcription, or realtime voice agents
portability:
  voice_model_export: false
  notes: >-
    Flow Music is a hosted Google Labs product. Finished songs may be usable as
    exports inside the product flow, but the generation model, project logic,
    and prompt-to-song workflow are not portable or self-hostable.
alternatives:
  - suno
  - udio
  - beatoven-ai
  - ace-step-ui
verified_at: 2026-05-23T00:00:00.000Z
badges:
  - new
i18n:
  zh:
    tagline: 基于 Google Lyria 3 Pro 的 AI 音乐创作工具
    licensing_notes: >-
      Google 已说明 Lyria 3 Pro 使用 SynthID 水印，并受 Google 服务条款与生成式 AI 政策约束。但目前公开资料没有给出足够简单的
      Flow Music 专属商用授权摘要；客户项目、YouTube 变现、游戏发布或音乐流媒体发行前，应复核最新 Google 条款、订阅层级和地区限制。
    gotchas:
      - 商业发布权利不应默认视为已清晰放行，发布前要复核 Google 当前条款
      - Flow Music 的可用性和高级功能会随 Google AI 订阅层级、平台和地区变化
      - Lyria 输出会嵌入 SynthID 水印，用于标识 Google AI 生成内容
      - 它面向音乐和歌曲迭代，不适合当作旁白、配音、转写或实时语音 Agent 工具
    portability_notes: >-
      Flow Music 是 Google Labs 的托管产品；生成模型、项目逻辑和 prompt 到歌曲的工作流不能自托管，也不能完整迁出。
    body: >-
      ## 先判断它是不是你的音乐创作路线


      Google Flow Music 适合想用 Google Lyria 3 Pro 快速生成、改写和延展歌曲想法的创作者、音乐人和制作团队。它更接近 Suno、Udio 这类 AI 音乐工作室，而不是语音旁白、字幕、配音或实时语音 Agent 工具。


      ### 适合歌曲草稿和风格探索


      如果你要为短视频、播客片头、游戏概念片或音乐视频寻找旋律、歌词方向、drop 或整体氛围，Flow Music 的价值在于快速试错。Google 官方资料显示，它支持基于 Lyria 3 Pro 的歌曲生成，并新增了分段编辑、covers/restyle 和 Gemini Omni 音乐视频能力。


      ### 不适合需要明确授权结论的发布


      如果项目马上要进入广告投放、客户交付、游戏上线或音乐流媒体发行，不要只凭产品演示判断可用。AI 音乐的训练来源、平台政策、商用权利和水印披露都需要单独复核，尤其是涉及歌手风格、歌词翻译或可识别音乐参考时。


      ## 先核对订阅、地区和功能边界


      Flow Music 的能力不是一个固定离线软件包，而是 Google Flow / Google AI 订阅体系里的在线创作能力。Google Flow 页面显示有免费使用和 Google AI Plus、Pro、Ultra 等层级，但功能、额度、平台和地区可能变化。


      ### 把付费订阅当作真实起点


      免费入口适合试用，不适合直接估算生产成本。需要更多 credits、更高级的 Flow Tools 创建能力、Gemini Omni 音乐视频或更高生成额度时，要按 Google AI 订阅层级重新核算。批量产出、反复重生成和多人协作都可能让真实成本高于起步价。


      ### 功能变化要按当前产品页复核


      Google 在 2026 年 5 月更新中提到 Flow Music 支持分段编辑、整曲 covers/restyle，以及通过 Gemini Omni 创建音乐视频。这类新能力可能先在特定地区、平台或订阅层级开放，写进工作流前应做一次当前账号实测。


      ## 管理授权、水印和锁定风险


      Flow Music 的主要风险不是能不能生成，而是生成结果是否能安全进入你的发布渠道。Google 官方资料提到 Lyria 3 Pro 的训练和使用受条款、合作协议、适用法律和生成式 AI 政策约束，输出也带 SynthID 水印。


      ### 保留 prompt 和版本记录


      对客户项目、游戏、广告或公开发行，保留 prompt、歌词、输入参考、生成版本、导出文件和条款截图。这样后续处理版权质疑、平台申诉或客户审查时，有基本的决策记录。


      ### 不要把它当作可迁移模型


      Flow Music 是托管服务，不是可下载模型或本地 DAW 插件。生成结果可以进入后期剪辑，但模型、项目状态、分段编辑逻辑和账号权益都留在 Google 的产品体系里。


      ## 放进流程前先做真实试点


      先用一个接近生产环境的小项目测试 Flow Music，比只听官方样例更可靠。重点看歌曲结构、歌词质量、不同语言表现、导出格式、修改成本和条款是否满足你的发布渠道。


      ### 用同一 brief 对比替代工具


      扩大投入前，用同一段 brief 对比 Suno、Udio、Beatoven.ai 和 ACE-Step UI。Flow Music 的优势是 Google 模型生态和 Flow 视频联动；如果你更重视明确音乐商用许可、本地控制或开源可复现性，替代方案可能更合适。
---
## Decide whether it should be your music route

Google Flow Music is for creators, artists, producers, and small teams that want to generate, edit, and restyle song ideas with Google Lyria 3 Pro. It belongs with AI music tools such as Suno and Udio, not with voiceover, dubbing, transcription, or realtime voice-agent tools.

### Use it for song drafts and style exploration

Flow Music is useful when you need quick drafts for short videos, podcast intros, game concepts, music-video ideas, or songwriting experiments. Google says the product brings Lyria 3 Pro to artists, producers, and songwriters, and recent updates add section-level editing, full-track covers, and Gemini Omni music-video creation.

### Avoid it when release rights must be simple

Be cautious when the next step is paid client delivery, YouTube monetization, game shipping, ads, or music streaming. Google publishes responsible-AI notes, SynthID watermarking, and policy controls, but the public material is not a simple Flow Music-specific commercial rights grant.

## Check subscription and availability first

Flow Music is a hosted Google Labs product inside the broader Google Flow and Google AI subscription ecosystem. Google Flow pricing includes a free entry point plus Google AI Plus, Pro, and Ultra tiers, but features can vary by subscription tier, platform, and region.

### Treat paid access as the realistic starting point

The free path is useful for testing, not for budgeting production. If you need higher limits, Flow Tools creation, Gemini Omni music-video features, or repeatable iteration, price the work against the relevant Google AI subscription tier and expected credit burn.

### Recheck features before building a workflow

Google announced Flow Music section editing, covers, and Gemini Omni music videos in May 2026. Those features are valuable, but they are also new enough that teams should verify current account access, platform support, and export behavior before planning a production pipeline around them.

## Manage rights, watermarking, and lock-in

The production question is not only whether Flow Music can make a good track, but whether that track is safe for the channel where you plan to publish it. Lyria 3 Pro outputs are embedded with SynthID, and users remain bound by Google terms and generative AI policies.

### Keep records for serious releases

For client work, games, ads, or public music releases, save prompts, lyrics, input references, generation versions, exports, and screenshots of the active terms. AI music rights remain a moving target, so records matter if a platform, label, or client later asks how the track was made.

### Plan around hosted-product lock-in

Flow Music is not a local model or self-hosted DAW plugin. Finished audio can move into editing and publishing tools, but the model, account entitlements, project state, and section-editing workflow stay inside Google's hosted product.

## Pilot before scaling

Run one realistic project before treating Flow Music as a repeatable production tool. Evaluate structure, lyrics, language quality, revisions, export behavior, and rights review with the same care you would apply to Suno or Udio.

### Compare it with direct alternatives

Before scaling, test the same brief in Suno, Udio, Beatoven.ai, and ACE-Step UI. Flow Music is strongest when Google model quality and Flow video integration matter; alternatives may be better when you need clearer music licensing, local control, or open-source reproducibility.
