# Voice Tools Directory

Voice Tools Directory is a static directory for voice AI tools. It helps creators, game developers, and voice AI builders compare tools by use case, pricing, licensing, capabilities, and recent changes.

[中文说明](./README.zh-CN.md)

## Features

- Curated voice AI tool profiles with pricing, licensing, capabilities, and audience fit.
- Separate entry points for content creators, game developers, and voice AI builders.
- Category pages for TTS, STT, voice cloning, dubbing, audio cleanup, realtime infrastructure, and more.
- Static full-text search powered by Pagefind.
- Multi-dimensional filters for pricing, licensing, capabilities, and user groups.
- Side-by-side comparison for up to 4 tools.
- Workflow guides for common voice AI scenarios and tool stacks.
- Changelog data for pricing, feature, product, model, and policy updates.
- English and Chinese site pages.
- AI-friendly `llms.txt`, JSON tool APIs, and Schema.org metadata.

## Who It Is For

- **Content creators**: YouTubers, podcasters, audiobook producers, short-video creators, and VTubers comparing voiceover, dubbing, cleanup, and editing tools.
- **Game developers**: Indie teams and localization teams checking AI voiceover, NPC dialogue, sound effects, and commercial-use constraints.
- **Voice AI builders**: Teams building voice agents, phone bots, companions, education products, or realtime speech pipelines.

## Data Model

Tool profiles live as Markdown files in `src/content/tools/`. Shared category and changelog data lives in CSV files under `data/`.

```text
src/content/tools/
  elevenlabs.md
  vapi.md
  ...

data/
  categories.csv
  changelog.csv
```

Each tool profile includes identity, classification, audience targeting, pricing, licensing, capabilities, alternatives, verification date, and optional localized content.

## Local Development

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Validate content data:

```bash
npm run validate
```

Run tests:

```bash
npm test
```

## Contributing

Contributions are welcome. Good first contributions include:

- Adding a new voice AI tool profile.
- Updating pricing, licensing, or capability data.
- Reporting outdated or incorrect information.
- Improving workflow guides or bilingual copy.
- Adding tests for data validation or rendering behavior.

When editing tool data, prefer official pricing pages, terms, product announcements, or documentation as sources. Leave uncertain fields empty instead of guessing.

## License

- Code is licensed under the [MIT License](./LICENSE).
- Tool data and editorial content under `data/` and `src/content/` are licensed under [CC BY 4.0](./LICENSE-DATA.md).
