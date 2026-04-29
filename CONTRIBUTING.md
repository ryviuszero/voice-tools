# Contributing

Thanks for helping improve Voice Tools Directory. The project is a static directory, so most contributions are plain Markdown, CSV, or small Astro changes.

## Good Contributions

- Add a new voice AI tool profile.
- Update pricing, licensing, or capability information.
- Report outdated or incorrect data.
- Improve workflow guides or bilingual copy.
- Add or improve validation tests.

## Add Or Update A Tool

Tool profiles live in `src/content/tools/`. Use one Markdown file per tool, with frontmatter that matches the schema in `src/content/config.ts`.

When editing data:

- Prefer official pricing pages, terms, product announcements, or documentation.
- Do not guess fields you cannot verify.
- Keep `verified_at` current when you verify a tool.
- Add or update local logos in `public/logos/` when needed.
- Confirm the official website, current product name, current owner, canonical URL, and pricing page before adding or upgrading a tool.
- Use a current slug that matches the live product identity, not an old brand name.
- Keep alternatives limited to existing tool slugs unless your pull request also adds the missing tools.
- Use `gotchas` for decision-changing caveats such as unclear commercial rights, credit burn, weak language quality, GPU requirements, privacy limits, or export lock-in.
- For open-source tools, verify the canonical repository and avoid adding projects that are archived or inactive.

Good tool pages should help a beginner decide whether the tool fits their job, budget, rights risk, setup ability, and privacy needs. Avoid marketing copy, unsupported "best" claims, and feature lists that never explain when not to use the tool.

## Add Or Update A Workflow

Workflow articles live in `src/content/workflows/`. Use one Markdown file per workflow, with frontmatter that matches the workflow schema in `src/content/config.ts`.

Before adding or upgrading a workflow:

- Choose one audience: `creators`, `game_devs`, or `voice_ai_builders`.
- Use existing tool slugs in `tools` and `tool_recommendations`.
- Include three recommendation tiers when the article is production-ready: `production_default`, `fast_rising`, and `open_or_self_hosted`.
- Add sources for pricing, quotas, platform policy, rights, maintenance status, and capability claims.
- Include a credible YouTube video when the workflow page uses the `video` field.
- Include English and Chinese content with similar practical value.
- Keep the article focused on concrete production decisions, common mistakes, and a useful pre-ship checklist.

Workflow articles should teach judgment, not just steps. A strong article explains who should use the workflow, when it is the wrong shortcut, what usually breaks in production, how to choose tools without overbuying, and what records or checks to keep before publishing or shipping.

## Local Checks

Before opening a pull request, run:

```bash
npm ci
npm run validate
npm test
npm run build
```

For type checks, also run:

```bash
npm run check
```

## Pull Requests

Use the pull request template and include source links for pricing, licensing, policy, or feature claims. Small focused pull requests are easiest to review.
