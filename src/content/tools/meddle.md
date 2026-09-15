---
name: Meddle
slug: meddle
tagline: Voice agent platform built and hosted in Australia, billed per minute
website: 'https://meddle.sh'
logo: /logos/meddle.png
primary_category: voice_agent_platform
secondary_categories:
  - realtime_infrastructure
layers:
  - L3
use_cases:
  creators: []
  game_devs: []
  voice_ai_builders:
    - conversational_agent
    - phone_agent
pricing:
  model: paid
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://meddle.sh/voice-agents-australia'
  cost_per_minute: 0.18
licensing:
  commercial_use: true
  youtube_monetization: false
  game_use: false
  voice_cloning_allowed: false
  notes: >-
    Sold for business phone calls, so commercial use is the intended case.
    Published rates are in AUD: A$0.25 a minute on the default model and A$0.40
    a minute on a premium voice, with no plan fee and no minimum term. The USD
    figures in this record are converted at the RBA rate of 1 AUD = 0.7122 USD
    on 15 September 2026 and will drift with the exchange rate. Voice cloning,
    YouTube monetization and game distribution are not offered or documented as
    product features, so they are recorded as false rather than as permissions.
capabilities:
  voice_cloning: false
  multilingual: false
  chinese_support: false
  realtime_capable: true
  open_source: false
  offline_capable: false
  batch_api: false
gotchas:
  - >-
    Default text-to-speech and phone routing are processed in the United States;
    database, speech recognition and default model inference run in Australia,
    per the published sub-processor list
  - >-
    Pricing is quoted in AUD and billed per minute, so the USD figures here are
    a converted snapshot, not a published USD rate
  - >-
    Inbound phone numbers rent monthly and are billed separately from the
    per-minute talk time
  - >-
    Only 4 of the 32 selectable language models run in Australia, so choosing a
    non-default model can move inference offshore
portability:
  voice_model_export: false
  notes: >-
    Built on the open-source Pipecat runtime, and prompts, tools and knowledge
    base content are yours to move. Call orchestration, evals and scoring are
    Meddle-specific and would need rebuilding elsewhere. Provider choice is
    per-agent rather than fixed, so the model, speech recognition and voice can
    be swapped without leaving the platform.
voice_agent_extras:
  type: orchestration_platform
  brings_own_stack: true
alternatives:
  - retell-ai
  - vapi
  - bland-ai
verified_at: 2026-09-15T00:00:00.000Z
badges:
  - new
i18n:
  zh:
    tagline: 在澳大利亚开发并托管的语音 Agent 平台，按分钟计费
    licensing_notes: >-
      面向企业电话场景销售，因此商业使用是其预期用途。官方价格以澳元标价：默认模型每分钟
      A$0.25，高级音色每分钟 A$0.40，没有套餐费，也没有最短合约期。本条记录中的美元数字按澳大利亚储备银行 2026 年 9 月 15
      日汇率 1 澳元 = 0.7122 美元换算，会随汇率变动。声音克隆、YouTube 变现和游戏发行都不是该平台提供或记录在案的功能，因此记为
      false，而不是表示获得授权。
    gotchas:
      - 默认的语音合成和电话线路在美国处理；数据库、语音识别和默认模型推理在澳大利亚运行，详见官方公布的子处理方清单
      - 价格以澳元按分钟计费，本页美元数字是换算后的快照，并非官方公布的美元价格
      - 呼入电话号码按月租用，与每分钟通话费分开计费
      - 32 个可选语言模型中只有 4 个在澳大利亚运行，选择非默认模型会把推理转移到境外
    portability_notes: >-
      基于开源的 Pipecat 运行时构建，Prompt、工具和知识库内容都可以迁出。通话编排、评测和评分绑定在 Meddle
      平台内，迁移时需要重建。模型、语音识别和音色是按 Agent 选择的，不必离开平台就能更换。
    body: >-
      ## 它适合谁


      Meddle 面向需要有人接听来电、同时需要明确知道通话音频和文字记录在哪里处理的澳大利亚企业。数据库、语音识别和默认模型推理都在悉尼的 AWS
      ap-southeast-2 运行，子处理方清单会逐个列出离开澳大利亚的环节。计费方式是按通话分钟付费，默认模型每分钟
      A$0.25，没有套餐费，也没有最短合约期，因此在投入生产之前可以先小规模试用。


      ## 什么时候不该用它


      如果你需要美国或欧盟托管，就不要选它，因为托管区域不可更改。如果你要完全自定义媒体传输层，也不要选它：电话和 WebRTC
      线路由平台提供，不对外开放替换。声音克隆不是它的功能，多语言能力在官方站点上也没有记录，所以不要把它当作这两类需求的方案。


      ## 落地前先验证


      先用一个真实的来电场景跑通：写好 Agent、用评测脚本测试、再把号码指向它。把每分钟费率和号码月租一起计入预算，不要只看通话费。
---

## Who it is for

Meddle suits Australian businesses that need calls answered and need to know where the audio and transcripts are processed. The database, speech recognition and default model inference run in Sydney on AWS ap-southeast-2, and the sub-processor list names each component that leaves the country. Billing is per minute of talk time, A$0.25 on the default model, with no plan fee and no minimum term.

## When not to use it

Do not choose it if you need US or EU hosting, because the region is not selectable. Do not choose it if you need fully custom media transport: telephony and WebRTC are supplied by the platform and cannot be swapped. Voice cloning is not a feature and multilingual support is not documented on the site.

## Check before committing

Budget the per-minute rate and the monthly number rental together, not the talk time alone.
