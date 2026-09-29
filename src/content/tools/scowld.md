---
name: Scowld
slug: scowld
tagline: Open-source iOS voice companion with BYOK AI, STT, TTS, and vision
website: 'https://scowld.xyz'
logo: /logos/scowld.png
primary_category: voice_agent_platform
secondary_categories:
  - tts
  - stt
layers:
  - L3
use_cases:
  creators:
    - vtuber
  game_devs: []
  voice_ai_builders:
    - virtual_companion
    - voice_assistant
    - conversational_agent
pricing:
  model: open_source
  has_free_tier: true
  starting_paid_usd: 0
  pricing_url: 'https://github.com/apoorvdarshan/scowld'
licensing:
  commercial_use: true
  youtube_monetization: true
  game_use: true
  voice_cloning_allowed: false
  notes: >-
    Scowld's code is MIT licensed. AI, speech-to-text, text-to-speech, model,
    voice, and generated-output rights remain subject to the terms of each
    provider configured by the user.
capabilities:
  voice_cloning: false
  multilingual: true
  chinese_support: false
  realtime_capable: false
  open_source: true
  offline_capable: false
  batch_api: false
gotchas:
  - >-
    The app includes no bundled provider credits; users must configure their
    own AI and speech provider keys
  - >-
    Chat, cloud transcription, optional vision, and generated speech are sent
    directly to the providers selected by the user
  - >-
    Hands-free wake detection is local, but complete AI conversations require
    network access to the configured cloud providers
portability:
  voice_model_export: false
  notes: >-
    Chats and provider settings are local to the device, while model and voice
    portability depend on the external providers the user selects.
alternatives:
  - openvoiceos
  - pipecat
verified_at: 2026-08-07
badges:
  - open_source
  - new
i18n:
  zh:
    tagline: 支持自备密钥 AI、语音识别、语音合成和视觉的开源 iOS 语音伙伴
    licensing_notes: Scowld 代码采用 MIT 许可；AI、语音识别、语音合成、模型、声音及生成内容的权利仍取决于用户所选服务商的条款。
    gotchas:
      - 应用不提供内置服务额度，用户必须配置自己的 AI 和语音服务密钥
      - 聊天、云端转写、可选视觉内容和生成语音会直接发送到用户选择的服务商
      - 唤醒词检测在设备端完成，但完整 AI 对话仍需要连接所配置的云端服务
    portability_notes: 聊天记录和服务商设置保存在设备本地；模型和声音能否迁移取决于用户选择的外部服务商。
    body: >-
      ## 先判断它是否适合你的使用方式

      Scowld 是一款面向 iPhone 和 iPad 的开源语音伙伴。它把动画角色、语音或文字聊天、可选视觉、历史对话以及自备密钥服务商整合在一个应用中，适合希望直接体验虚拟伙伴或研究语音交互流程的人。

      ## 使用前先准备服务商密钥

      应用本身免费且没有订阅，但不会赠送 AI 或语音额度。用户需要为聊天、云端语音识别和语音合成配置自己的服务商账号与密钥，并自行承担对应费用和限制。

      ## 注意隐私与授权边界

      密钥保存在 iOS 钥匙串中，聊天记录保存在设备本地；发送消息、音频、可选图像和生成语音时，数据会直接交给用户选择的服务商。MIT 许可覆盖 Scowld 代码，但具体模型、声音和输出内容仍要遵守各服务商条款。
github_metrics:
  repo: apoorvdarshan/scowld
  source_url: 'https://github.com/apoorvdarshan/scowld'
  captured_at: 2026-08-07
  stars: 11
  forks: 2
  watchers: 0
  open_issues: 0
  open_pull_requests: 0
  last_commit_at: 2026-07-25T10:26:53Z
  latest_release_at: 2026-07-09T10:31:47Z
  has_releases: true
  license: MIT
  primary_language: Swift
  archived: false
  signals:
    - maintained
  note: >-
    Public GitHub metrics captured for maintenance screening; verify repository
    activity before adopting it for production.
---
## Decide whether Scowld fits your workflow

Scowld is an open-source iOS voice companion rather than a hosted voice-agent platform. It combines an animated VRM character with voice and text chat, optional camera context, saved conversations, and user-selected AI, STT, and TTS providers.

### Use it for a customizable companion on iPhone or iPad

It is a practical fit when you want a ready-made mobile companion experience while retaining control over provider selection and API keys. VTuber creators and voice-AI builders can also use it as a concrete reference for combining a character, wake mode, transcription, model responses, and spoken output.

### Avoid it when you need a managed service

Scowld does not include hosted credits, a managed backend, telephony, batch generation, or a browser-based production console. It is not the shortest route for teams that want a turnkey commercial voice-agent service.

## Plan the provider setup first

The app is free and has no subscription, but the configured AI, STT, and TTS providers may charge separately. A complete spoken conversation normally requires an AI provider key plus an ElevenLabs or OpenAI text-to-speech key.

### Keep provider terms with the project

The MIT license permits commercial use of Scowld's code. Model access, generated output, reference voices, and any provider-specific commercial rights remain governed by the chosen provider, so recheck those terms before publishing or shipping paid work.

## Understand the privacy boundary

Provider keys are stored in iOS Keychain and chat history stays on the device. Hands-free wake detection runs locally while enabled, but messages, recorded speech, optional camera context, and generated speech are processed by the cloud services the user selects.
