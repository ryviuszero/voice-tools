You are writing or upgrading a tool page for **Voice Tools Directory** - a static Astro site (SSG) for voice AI tools used by creators, game developers, and voice AI builders.

The output must be a **single complete Markdown file** ready to save as `src/content/tools/<slug>.md`. Do not add explanation outside the file. If required facts are missing, ask before generating.

This command is for content generation only. Do not change the site UI, schema, CSV files, or existing tool files unless the user explicitly asks for implementation work.

---

## Quality Model

A useful tool page helps a beginner decide whether the tool fits their job, budget, rights risk, setup ability, and privacy needs. It is not a feature dump or a rewritten marketing page.

Generate the page through these internal passes:

1. **Context pack:** compress user inputs, official pages, current tool files, and community signals into a short brief.
2. **Identity crawl:** fetch the official website first. Confirm the product name, current owner/brand, canonical URL, and whether the slug still matches the live product. Do not rely on directory sites, old notes, or guessed domains.
3. **Evidence map:** decide which claims need official sources and which claims are only user-sentiment signals.
4. **Decision model:** describe who should use the tool, who should avoid it, and what beginners should check first.
5. **Draft:** write valid frontmatter plus concise English and Chinese page bodies.
6. **Verification pass:** check pricing, licensing, privacy, capabilities, logo path, category, schema compatibility, website identity, video identity, and open-source repo activity.
7. **Critic pass:** remove hype, vague claims, duplicated labels, and unsupported certainty.
8. **Human-editor pass:** make the page readable, direct, and useful for someone choosing a tool today.

The final answer should still be only the Markdown file.

---

## Current Schema Compatibility

Generate frontmatter that matches the current `src/content/config.ts` tool schema.

Required and common fields:

```yaml
name:
slug:
tagline:
website:
logo:
primary_category:
secondary_categories:
layers:
use_cases:
  creators:
  game_devs:
  voice_ai_builders:
pricing:
  model:
  has_free_tier:
  starting_paid_usd:
  pricing_url:
licensing:
  commercial_use:
  youtube_monetization:
  game_use:
  voice_cloning_allowed:
  notes:
capabilities:
  voice_cloning:
  multilingual:
  chinese_support:
  realtime_capable:
  open_source:
alternatives:
verified_at:
badges:
i18n:
  zh:
    tagline:
    licensing_notes:
    gotchas:
    portability_notes:
    body:
```

Optional fields to include when supported by evidence:

```yaml
pricing:
  cost_per_1000_chars:
  cost_per_minute:
capabilities:
  offline_capable:
  batch_api:
gotchas:
language_quality:
portability:
  voice_model_export:
  notes:
traffic_estimates:
github_metrics:
video:
voice_agent_extras:
```

Do not invent unsupported values. If a field is unknown but required by the schema, use the most conservative legal value and explain the uncertainty in `gotchas` or `licensing.notes`.

### Video

Use `video` when there is a credible YouTube video that helps the reader evaluate the tool faster than text alone.

```yaml
video:
  provider: youtube
  url:
  title:
  i18n:
    zh:
      title:
```

Selection priority:

1. Official tutorial or product walkthrough from the tool's own channel.
2. Recent independent tutorial that clearly shows the current UI and output quality.
3. A notable or high-performing video made with the tool, when the goal is to show real output rather than explain settings.
4. A credible comparison or review only if it directly demonstrates the tool and is not mostly affiliate hype.

Before adding the video, open or fetch the YouTube page/oEmbed and verify that the video title, channel, or description names the exact tool, current owner/brand, or a clearly documented product alias. Prefer videos whose visible title includes the same brand name as the tool page; if the title uses a variant, it must still include the product's distinctive brand tokens. Do not use a generic "workflow reference" video from another product as a substitute for a tool demo.

Do not add a video if the only available videos are outdated, misleading, non-embeddable, unrelated to the tool's main use case, from a different product, or too promotional to help a beginner.

### Website, Slug, and Ownership

Always crawl the official website before drafting or upgrading:

- Confirm the live product name and current owner. If a product has been acquired, renamed, discontinued, or folded into another vendor, update the `name`, `slug`, `website`, `pricing_url`, body copy, and alternatives accordingly.
- The slug must reflect the current canonical product identity, not an old brand if the live product has moved.
- The website URL must be the canonical product page or official GitHub repository, not a third-party directory page.
- If the canonical page no longer exists or the product has no reliable official page, ask before adding or keep the tool out of the directory.

### Open Source Freshness

For open-source tools, verify the repository before adding or keeping the tool:

- Prefer the canonical GitHub/GitLab repository as `website` or `github_metrics.source_url`.
- Do not add a new open-source project if the repository is archived or has no commits/releases/push activity in the last six months.
- If an existing open-source tool becomes stale, mark the risk clearly or replace it with a currently maintained alternative when category coverage depends on it.

---

## Research Packet Before Drafting

Collect or infer these inputs before writing. If a required item is unknown, ask the user instead of fabricating it.

- **Slug:** `$ARGUMENTS`
- **Mode:** new tool | upgrade existing tool
- **Tool name:**
- **Website:**
- **Logo asset path:** `/logos/<slug>.<ext>`
- **Primary category:** must match `data/categories.csv`
- **Secondary categories:** optional; add 0-3 related category slugs only when the tool genuinely spans multiple jobs
- **Layers:** L1 | L2 | L3 | L4
- **Target users:** creators | game_devs | voice_ai_builders
- **Use cases:** use the existing enum values from `src/content/config.ts`
- **Official pricing URL:**
- **Current price facts:** free tier, starting paid price, credit/minute/character model, rollover, overage, enterprise-only constraints
- **Capability facts:** voice cloning, multilingual support, Chinese support, realtime, open source, local/offline, batch API, SDK/API
- **Licensing facts:** commercial use, YouTube monetization, game use, voice cloning consent, generated-output rights
- **Privacy and data facts:** data retention, training opt-out, enterprise controls, on-prem/self-hosted option, compliance claims
- **YouTube video:** official tutorial, credible product demo, or notable example made with the tool
- **Beginner fit:** easy | moderate | technical
- **Rights confidence:** clear | paid_plans | conditional | review_terms
- **Best for:** the clearest 2-4 use cases where the tool is a good default
- **Quality risk:** low | medium | high, based on output consistency, language quality, generation variance, and whether the user must tune or self-host the model
- **Avoid if:** the clearest 2-4 situations where a beginner may regret choosing it
- **User feedback signals:** repeated praise, repeated complaints, workarounds, migration reasons
- **Production failures:** what breaks in real projects
- **Alternatives:** valid existing tool slugs, including 1-2 open-source or self-hosted options when credible alternatives exist
- **Known sources:** URLs with what each source proves

For **upgrade existing tool** mode:

- Preserve the existing slug unless the user explicitly requests a rename.
- Preserve valid frontmatter fields and useful local notes.
- Replace generic prose with beginner-oriented judgment.
- Update stale pricing, licensing, and capability facts from official sources.
- Keep the body concise; do not turn the tool page into a workflow article.

---

## Evidence Map

Classify claims before writing.

### Claims that need official evidence

- Pricing, quotas, plan names, usage limits, credit rollover, overage, enterprise requirements.
- Commercial rights, YouTube monetization, game usage, voice cloning consent, output ownership.
- Privacy, training opt-out, data retention, SOC 2, HIPAA, GDPR, on-prem, private cloud.
- API support, latency claims, realtime claims, supported languages, model availability.
- Open-source license, self-hosting requirements, GPU requirements, repo activity.

### Claims that can use community or review evidence

- Common beginner confusion.
- Repeated complaints about pricing, credit burn, quality drift, support, bugs, or UX.
- Praised workflows, perceived ease of use, reasons people switch tools.
- Integration friction, documentation complaints, deployment gotchas.

Community sources are signals, not authority. Label them conservatively in the generated prose: "users often report", "common complaints include", or "community feedback suggests". Do not treat Reddit, X, YouTube comments, G2, or forums as proof of official policy.

### Source mix

Use 3-6 sources when the user asks for a researched tool page:

- **Official source:** homepage, pricing, docs, legal terms, privacy, security, GitHub.
- **Product source:** changelog, release notes, API docs, tutorial, model card.
- **Review/community source:** Reddit, X, YouTube comments, G2, GitHub issues, Hacker News, creator forums.

If a source only supports a narrow claim, do not stretch it. If pricing is likely to change, phrase it as "from" and point readers to the official pricing page.

---

## Tool Decision Model

Every tool page should answer these beginner questions.

### Top summary metrics

The tool detail page should help beginners make a decision in the first few seconds. Treat these four summary cards as the editorial priority:

- **Price:** the starting public cost or "Free/Open Source/Enterprise".
- **Quality Risk:** `Low`, `Medium`, or `High`; summarize how likely beginners are to see inconsistent audio, pronunciation, latency, or model-tuning problems.
- **Beginner Fit:** `Easy`, `Moderate`, or `Technical`.
- **Rights:** `Clear`, `Paid plans`, `Conditional`, or `Review terms`.

Do not prioritize broad booleans like `Chinese` or `Open Source` in the top summary cards. Those remain useful capabilities and filters, but they are not universal first-decision signals.
Primary and secondary category labels render near the top action buttons as compact tags, not inside the summary card grid. Keep those tags small, with modest rounded corners, and align the tag row with the left edge of the primary action row.

Use these rules for the two decision metrics:

- `Beginner Fit: Easy` when a non-technical user can get useful output in minutes through a hosted UI.
- `Beginner Fit: Moderate` when the tool is hosted but requires workflow setup, API use, voice-agent logic, batch processing, or careful configuration.
- `Beginner Fit: Technical` when the practical route is open source, local/offline, self-hosted, infrastructure-level, GPU-dependent, or developer-heavy.
- `Rights: Clear` when commercial output rights are broadly allowed without obvious plan-tier caveats.
- `Rights: Paid plans` when the tool is commercial-safe only from a paid tier or when the free tier is testing-only.
- `Rights: Conditional` when some commercial uses are allowed but key use cases, output types, voice cloning, or distribution contexts require extra care.
- `Rights: Review terms` when the public terms are unclear, enterprise-specific, research-only, or not safe to summarize confidently.

### Fit

- What is this tool best at?
- Is it for creators, developers, game teams, or AI-agent builders?
- Is it a production default, a niche specialist, an open-source route, or an experimental option?
- What does it replace in a real workflow?

### Cost

- How does the tool charge: subscription, credits, minutes, characters, seats, API usage, GPU cost, or enterprise quote?
- Can a beginner estimate monthly cost before committing?
- Do failed generations, retries, long scripts, calls, or exports consume budget?
- Are there free-tier limitations that matter for commercial use?

### Rights

- Can outputs be used commercially?
- Are YouTube monetization, paid client work, and game shipping allowed?
- Is voice cloning allowed only with consent?
- Are there attribution, disclosure, or plan-tier restrictions?

### Quality and reliability

- Does it handle long scripts, noisy audio, accents, multiple speakers, emotional control, pronunciation, or specialist vocabulary?
- Does quality vary by language?
- Is there a QA loop, preview mode, pronunciation dictionary, or regeneration control?

### Privacy and lock-in

- Does the tool run in the cloud, locally, or self-hosted?
- Can voice models, projects, transcripts, or generated assets be exported?
- Are user voices or uploaded data used for training by default?
- Is there enterprise privacy or compliance support?

### Setup and integration

- Can a beginner use it in minutes, or does it require API/GPU/devops work?
- Does it integrate with editors, DAWs, game engines, telephony, SDKs, webhooks, or automation tools?
- What is the most common first successful workflow?

---

## Recommended Body Structure

Use this structure unless the tool is extremely narrow and a shorter version is more useful.

```md
## Decide whether it should be your main tool

Open with a concrete recommendation. Name the users who will get value fastest and the jobs where the tool is a poor fit.

### Use it when [specific strength]

### Be cautious when [specific boundary]

## Check cost and commercial boundaries first

Explain the first 3-5 decisions: budget model, rights, quality floor, setup difficulty, privacy or lock-in. Use paragraphs first; use bullets only for crisp checks.

### Treat [plan/tier] as the realistic starting point

### Watch [credits/minutes/retries/exports]

## Manage rights, privacy, and lock-in

Explain commercial use, voice cloning consent, data handling, and export limitations in plain language.

### Keep records for [consent/licensing/sources]

### Check [data/privacy/export] before sensitive use

## Keep QA in the workflow

Give the practical path: what input goes in, what output comes out, and which tool or workflow usually comes before/after it.

### Review [quality issue] before publishing

### Re-evaluate once usage is measurable
```

## Heading and TOC Rules

- Use a two-level article outline: `##` for major navigation sections and `###` for concrete decisions, checks, caveats, or workflow steps.
- Use **no more than 4 `##` sections** in the English body and in `i18n.zh.body`.
- Each `##` section may contain **no more than 4 `###` subsections**.
- Do not use `####` headings in tool pages.
- `##` headings should be broad navigation buckets; `###` headings should carry the specific judgment.
- Do not write 5-8 flat `##` sections. Group related material under fewer stronger sections.
- The first `##` should clarify value and boundaries.
- The first sentence under every `##` must stand alone as a takeaway.
- The first sentence under every `###` should also make the subsection useful when skimmed.
- Paragraphs should carry the judgment. Bullet lists are for checks, not the whole article.
- Avoid generic headings like `Overview`, `Features`, or `Conclusion`.
- Keep the page shorter than a workflow article. A tool page should help selection, not teach an entire production process.

### Tool page TOC behavior

The tool detail template builds a left-side TOC in the same style as workflow pages.

- The page-level TOC includes fixed sections such as overview, video, licensing, gotchas, capabilities, pricing, lock-in, guide, alternatives, and changelog when those sections exist.
- Fixed tool metadata sections are grouped under a single `Snapshot` / `概览` parent item so the sidebar does not become a long flat list.
- The Markdown body appears under the `Guide` TOC item.
- English body headings and `i18n.zh.body` headings become nested entries under `Guide`.
- `##` entries are the nested parent items; `###` entries are collapsed children that expand as the reader reaches that section.
- Because TOC labels are visible navigation, write headings as clear reader decisions, not decorative copy.
- Keep Chinese headings native and concise; they should be useful in the sidebar without needing the paragraph below.
- Use concise, formal section labels in the rendered tool page. Prefer labels such as `Demo`, `Use Cases`, `Usage Notes`, and their Chinese equivalents `效果展示`, `适用场景`, `使用说明`; avoid casual labels such as "Watch it in action", "Can I use this for...", or overly conversational Chinese headings.

---

## Frontmatter Writing Rules

### Identity

- `tagline` should be under 100 characters and explain what the tool does, not repeat the category.
- `logo` must point to an asset path under `/logos/`.
- `primary_category` must exist in `data/categories.csv`.
- `secondary_categories` is optional. Use it for real adjacent jobs, such as a TTS tool that also has strong voice cloning or dubbing. Do not repeat `primary_category`, and do not add more than 3 secondary categories.
- `alternatives` must be existing slugs unless the user asks to create missing tools too.
- Prefer a balanced alternatives list: include direct commercial competitors plus 1-2 open-source or self-hosted routes when they are credible for the same job. Do not add open-source tools just for symmetry if they are unrelated or misleading.

### Pricing

- `starting_paid_usd` should be `0` for free/open-source tools with no paid plan.
- If the tool has only enterprise pricing, set `pricing.model: enterprise`, `starting_paid_usd: 0`, and explain quote-based pricing in body/gotchas.
- Include `cost_per_1000_chars` or `cost_per_minute` only when the public pricing page gives a usable unit rate.
- Do not convert credits into exact unit costs unless the official pricing page makes the conversion clear.

### Licensing

- Use `false` when rights are unclear or not suited to the use case. Clarify uncertainty in `notes`.
- For voice cloning, consent requirements belong in `licensing.notes` and `gotchas`.
- If a free tier is not commercial-safe, make that explicit.

### Capabilities

- `realtime_capable` should mean usable for low-latency interactive workflows, not just fast batch processing.
- `open_source` should be true only when the core tool/model is open source enough for users to inspect and run or adapt meaningfully.
- `offline_capable` should mean local/offline operation is realistic, not just downloadable assets.

### Gotchas

Use `gotchas` for decision-changing details, not minor trivia. Good gotchas include:

- Free tier cannot be used commercially.
- Credits do not roll over or retries consume credits.
- Voice models cannot be exported.
- Chinese quality is weaker than English.
- Requires GPU or technical setup.
- Realtime use requires a higher plan.
- Enterprise controls are required for strict privacy.

Limit to 4. Put the sharpest warnings first.

### Language quality

Use `language_quality` only when there is enough evidence or local editorial confidence. It is better to omit than to pretend precision.

### Chinese i18n

Chinese content must be native, not a compressed translation.

- Explain pricing and rights in terms Chinese readers can act on.
- Keep English product terms where they are commonly used: API, SDK, Free tier, credits, voice cloning.
- Do not leave English-only gotchas if Chinese i18n exists.
- The Chinese body should follow the same decision structure as English.

---

## Future Decision Fields

The current schema may later add a dedicated beginner decision object. When generating or upgrading content, keep these values in your research notes even if they cannot yet be written to frontmatter:

```yaml
decision:
  beginner_fit: easy | moderate | technical
  best_for:
  avoid_if:
  pricing_predictability: clear | moderate | credit_sensitive | quote_only | unknown
  rights_confidence: clear | paid_plans | conditional | review_terms
  privacy_posture: cloud | cloud_with_controls | local | self_hosted | unknown
  setup_time: minutes | hours | days | unknown
  reliability_notes:
  pricing_notes:
  privacy_notes:
  beginner_summary:
review_signals:
  loved_for:
  watch_out_for:
  source_urls:
  last_checked_at:
```

Until those fields exist in `src/content/config.ts`, translate the same information into `gotchas`, `licensing.notes`, `portability.notes`, and the Markdown body.

---

## Verification Pass

Before finalizing, check:

- Frontmatter parses as YAML.
- Filename, `slug`, and logo path are consistent.
- `primary_category`, `secondary_categories`, `layers`, `use_cases`, `pricing.model`, and `badges` match existing schema enums.
- Required pricing and licensing fields are present.
- Required booleans are booleans, not strings.
- `verified_at` is an ISO date and not in the future.
- `alternatives` reference existing tool slugs.
- `alternatives` include 1-2 credible open-source or self-hosted options when the category has them.
- `gotchas` has no more than 4 entries.
- Chinese i18n includes `tagline`, `licensing_notes`, `gotchas`, `portability_notes` if portability exists, and `body`.
- The body does not repeat the tagline or marketing copy.
- No community claim is presented as official fact.

If updating an existing file, also check:

- Useful existing warnings were preserved or improved.
- Stale pricing and plan names were updated from official sources.
- The result remains concise enough for a directory page.

---

## Critic Checklist

Reject and revise the draft if it has any of these problems:

- It sounds like an advertisement.
- It only lists features and never says when not to use the tool.
- It says "best" without explaining "best for whom".
- It hides pricing risk behind vague words like "affordable".
- It treats voice cloning as safe without mentioning consent.
- It says "supports many languages" without addressing quality variation.
- It recommends cloud tools for strict privacy without caveats.
- It claims open source while the important model or hosted product is closed.
- It has English-only Chinese i18n or unnatural machine-translation phrasing.

---

## Output Format

Return only one complete Markdown file:

```md
---
name: ...
slug: ...
...
---
## Who should use it

...
```

Do not include surrounding commentary, code fences, implementation notes, or validation logs in the final answer.
