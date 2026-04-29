You are writing or upgrading a workflow article for **Voice Tools Directory** - a static Astro site (SSG) targeting three audiences: `creators`, `game_devs`, and `voice_ai_builders`.

This workflow-generation guide treats article generation as a quality pipeline with context control, evidence grounding, task decomposition, self-review, and final editorial polish.

The output must be a **single complete Markdown file** ready to save as `src/content/workflows/<slug>.md`. Do not add explanation outside the file. If required facts are missing, ask before generating.

---

## Quality Model

A high-quality workflow page is not produced by one long prompt and one draft. It is produced by a sequence:

1. **Context pack:** compress inputs into a short, structured brief.
2. **Evidence map:** decide which claims need sources before writing.
3. **Article plan:** choose the article type and table-of-contents story.
4. **Draft:** write with concrete production judgment, not generic advice.
5. **Verification pass:** check factual, pricing, policy, tool, and schema claims.
6. **Critic pass:** find weak sections, missing caveats, generic headings, and list-heavy writing.
7. **Human-editor pass:** improve rhythm, usefulness, and reader empathy.

Do not skip the internal passes. The final answer should still be only the Markdown file.

---

## Context Engineering Rules

Manage the prompt like a limited attention budget.

- Keep static rules at the top and dynamic task facts at the end.
- Prefer compact structured briefs over pasted long articles.
- Do not carry irrelevant old workflow prose into the draft. Extract only title, slug, tools, sources, claims, and useful constraints.
- Put high-value facts near the article plan and again near the final quality gate.
- If a source is long, reduce it to: `source title`, `url`, `claim supported`, `date/currentness`, `risk if wrong`.
- If inputs conflict, state the conflict internally and resolve toward the more current or authoritative source.
- Avoid negative-only instructions. Write what the article should do.

---

## Research Packet Before Drafting

Collect or infer these inputs before writing. If a required item is unknown, ask the user instead of fabricating it.

- **Slug:** `$ARGUMENTS`
- **Mode:** new workflow | upgrade existing workflow
- **user_group:** creators | game_devs | voice_ai_builders
- **Title (EN):**
- **Title (ZH):**
- **Description (EN, <=300 chars):** a specific promise, not a category label
- **Description (ZH, <=300 chars):**
- **Budget range:** $X-$Y/mo
- **Primary tools (directory slugs):** [tool1, tool2, tool3] - may include broader related tools for metadata and JSON-LD, but this list must not create fallback recommendation cards.
- **Tool recommendations:** compact card-worthy picks shown above the article, grouped by exactly three decision tiers. Use 2-3 tools per tier, usually 7-9 total:
  - production_default: mainstream stable tools + why + key pricing detail
  - fast_rising: newer or fast-growing tools + why + key pricing detail
  - open_or_self_hosted: open-source/self-hosted routes + URL + main limitation
  - If a needed recommendation is not already in `src/content/tools`, add the tool content and logo before referencing its slug.
- **User pain points from forums/social:** repeated complaints, objections, workarounds
- **Known production failures:** what goes wrong in real projects
- **Policy, rights, or platform constraints:** YouTube, Steam, app stores, consent, data handling, privacy, public deployment
- **Pricing/limit facts:** plans, usage limits, latency, character limits, minutes, credits, compute needs
- **Key workflow steps:** rough numbered list
- **Common mistakes / gotchas:** insider knowledge, not generic warnings
- **Known sources:** URLs with what each source proves
- **YouTube video:** required for every workflow. Prefer a tutorial that shows the workflow; if none exists, use a credible tool walkthrough, conference talk, official demo, or policy/platform explainer that helps the reader execute or evaluate the workflow. The video must match the workflow `user_group`: creator videos for `creators`, game-development videos for `game_devs`, and technical voice AI / agent-building videos for `voice_ai_builders`.

For **upgrade existing workflow** mode:

- Preserve the existing slug unless the user explicitly requests a rename.
- Preserve valid tool slugs and useful sources.
- Replace weak prose and generic headings.
- Add missing `tool_recommendations`, `sources`, `workflowDiagram`, a required embeddable YouTube `video`, and full Chinese body.
- If a renamed or commonly confused slug exists, note that the site may need an alias page or redirect.

---

## Evidence Map

Before drafting, classify the claims.

### Claims that need evidence

- Pricing, quotas, limits, latency, model availability, current plan names.
- Platform policy, disclosure rules, monetization risk, rights and consent.
- Open-source maintenance status, release status, GitHub activity, license constraints.
- Strong user sentiment claims such as "creators prefer", "indie devs commonly use", or "teams complain about".
- Tool capability claims that are not obvious from the site's existing tool entry.

### Source mix

Use 3-5 sources with a balanced evidence mix:

- **Official policy or platform source:** YouTube disclosure, Steam rules, app store rules, consent/legal docs, API docs.
- **Tool source:** pricing, docs, changelog, tutorial, GitHub repo, release notes.
- **Community or field evidence:** Reddit, Hacker News, forum threads, GitHub issues, Discord summaries, creator posts, postmortems.

Community sources are signals, not authority. Label them that way in source notes.

### Evidence handling

- If a claim cannot be verified, weaken it or remove it.
- If a source only supports a narrow claim, do not stretch it.
- If pricing is likely to change, phrase it as "from" and keep the caveat conservative.
- Current facts should come from current sources, not memory.

---

## Article Type Selection

Choose one structure before drafting. Do not force every article to start with `TL;DR`.

### Decision + Risk

Use when rights, quality, trust, consent, or platform policy matter.

```md
## Why this workflow is worth adopting
### What breaks without a workflow
### Who should use it
### When to avoid it

## Build the production path
### [First real decision]
### [Main production process]
### [Review or QA loop]

## Choose tools without overbuying
### Production default
### Fast-rising option
### Open or self-hosted alternative

## Ship with trust
### Pre-publish checklist
### Rights and disclosure
### What to keep on record
```

### Process Pipeline

Use when the value is a repeatable production path.

```md
## What this workflow solves
### The repeatable outcome
### Who should use it
### When it is the wrong shortcut

## Turn input into a usable asset
### [Input preparation]
### [Generation or transformation]
### [Editing and packaging]

## Choose the right tool for the job
### Production default
### Fast-rising option
### Open or self-hosted alternative

## Avoid the common failure modes
### Common mistakes and fixes
### Pre-ship checklist
### Records to keep
```

### Technical Architecture

Use when latency, APIs, infrastructure, realtime behavior, or integration choices dominate.

```md
## When this architecture is worth it
### What breaks in production
### Who should build it
### When to stay simpler

## Design the reference path
### [Core pipeline]
### [Latency or quality budget]
### [Fallback and observability]

## Choose the stack
### Production default
### Fast-rising option
### Open or self-hosted alternative

## Launch safely
### Common mistakes and fixes
### Launch checklist
### Security or data-handling notes
```

### Game Production

Use when the workflow ships inside an indie game.

```md
## What this solves for a small game team
### Where AI helps
### When hand-made audio is better
### Production constraints

## Build the game audio pipeline
### [Content creation]
### [Engine import rules]
### [Naming and versioning]

## Choose tools for your team size
### Production default
### Fast-rising option
### Open or self-hosted alternative

## Prepare for release
### Common mistakes and fixes
### Release checklist
### Store or license notes
```

---

## Task Decomposition

Draft in smaller mental steps rather than one giant pass.

1. Write the article promise and boundary: what the reader gains and when this workflow is a bad idea.
2. Build the table of contents. Headings should tell the workflow story alone.
3. Draft the core process with 4-8 production steps or decisions.
4. Draft tool-selection prose after the process, not before.
5. Add common mistakes from real production failures.
6. Add checklist items that are concrete and testable.
7. Add rights, policy, privacy, disclosure, or licensing only where relevant.
8. Write the Chinese body as native content, not a compressed translation.

---

## Heading and TOC Rules

The workflow detail page has a left-side table of contents. Headings must be useful as navigation labels.

- Avoid generic headings: `Overview`, `Who this is for`, `Recommended workflow`, `Step-by-step`, `Budget options`.
- Use a two-level article outline: `##` for major sections and `###` for sub-decisions, process steps, tool choices, and checks.
- Use **no more than 4 `##` sections** in the English body and in `i18n.zh.body`.
- Each `##` section may contain **no more than 4 `###` subsections**.
- Do not use `####` headings in workflow articles.
- `##` headings should be broad navigation buckets; `###` headings should carry the concrete decisions and operational steps.
- Do not write 6-8 flat `##` sections. Group related material under fewer stronger sections.
- The first `##` should clarify value and boundaries.
- The first sentence under every `##` must stand alone as a takeaway.
- The first sentence under every `###` should also make the subsection useful when skimmed.
- Do not make the article mainly bullet lists. Paragraphs must do the judgment work.

Good:

```md
## Build the production path

### Rewrite the script for speech before generating audio

Text that reads well on a page often sounds stiff when spoken.
```

Weak:

```md
## Recommended workflow

This section explains the recommended workflow.
```

---

## Writing Rules

**Specificity beats generality.**
Replace vague claims with numbers. Not "this saves time" -> "this cuts a 3-hour edit into a 30-minute review once the preset is stable."

**Caveats belong inside the narrative.**
Pattern: state the strength -> name the tradeoff -> show the mitigation.

**Write to "you."**
Use a practitioner-to-practitioner tone. "You'll hit a wall when..." is better than "Users may encounter..."

**Teach judgment, not just steps.**
Help the reader decide when to stop, when to use a human, when to pay for quality, when to accept open-source friction, and when to avoid the workflow entirely.

**Use a varied sentence rhythm.**
Avoid machine-like paragraphs where every sentence has the same length and structure. Mix short decisive sentences with longer explanatory ones.

**Add one useful contrarian insight.**
Every article should include at least one non-obvious judgment, such as "the model is not the bottleneck here; the script is" or "batch generation is slower if it creates a review backlog."

---

## Required Frontmatter Structure

Every field name and constraint should pass `src/content/config.ts`.

```yaml
title: string
user_group: creators | game_devs | voice_ai_builders
description: string # <=300 chars; used in cards + meta
budget_min_usd: number
budget_max_usd: number
tools: [slug1, slug2] # related tool slugs should exist in src/content/tools; this list feeds metadata/references, not fallback cards
featured: false # true only when the page is complete and homepage-worthy

tool_recommendations: # editorial cards shown above the article, exactly 3 tiers, 2-3 tools per tier
  - tier: production_default | fast_rising | open_or_self_hosted
    tool_slug: string
    tool_name: string
    url: string # official URL for source/reference; page UI links by tool_slug
    summary: string # <=220 chars
    pricing: string # <=120 chars
    caveat: string # <=220 chars
    i18n:
      zh:
        summary: string # <=220 chars
        pricing: string # <=120 chars
        caveat: string # <=220 chars

sources:
  - title: string
    url: string
    note: string # <=220 chars; why this source matters
    i18n:
      zh:
        title: string
        note: string # <=220 chars

video:
  provider: youtube
  url: string
  title: string # <=160 chars
  i18n:
    zh:
      title: string # <=160 chars

workflowDiagram:
  steps:
    - type: step
      icon: emoji
      label: string
      substeps: [string]
      i18n: { zh: { label: string, substeps: [string] } }
    - type: decision
      icon: emoji
      label: string
      yes: { label: string, terminal?: true, i18n: { zh: { label: string } } }
      no: { label: string, loop?: true, i18n: { zh: { label: string } } }
      i18n: { zh: { label: string } }
    - type: end
      icon: emoji
      label: string
      i18n: { zh: { label: string } }

i18n:
  zh:
    title: string
    description: string # <=300 chars
    body: |
      # Native Chinese body; see rules below
```

`featured` guidance:

- New drafts default to `false`.
- Set `featured: true` only when the page has strong prose, three recommendation tiers, useful sources, workflow diagram, Chinese body, and no unresolved factual gaps.

---

## Tool Recommendation Rules

- Include exactly these three current tiers: `production_default`, `fast_rising`, `open_or_self_hosted`.
- Each tier must contain 2-3 recommended tools.
- Do not make every tier mechanically contain exactly two tools when credible options exist. For full upgrades or batches, vary the rhythm: at least some workflows should have one or two tiers with three tools.
- A good default is 2 + 2 + 2 for narrow workflows, 3 + 2 + 2 for normal workflows, and 3 + 3 + 2 or 3 + 3 + 3 for broad workflows with strong evidence.
- Never add a third tool just to fill space. The third pick must have a real decision reason, current source, and a distinct tradeoff.
- Do not use `Directory pick`; tools listed in `tools` are metadata only and should not become fallback cards.
- If the directory lacks a credible tool for a tier, research and add a new `src/content/tools/<slug>.md` entry with a local logo before referencing it.
- `tool_slug` must match a tool in `src/content/tools`.
- `url` should be the official site or GitHub repo for reference, but page navigation should rely on `tool_slug`.
- The body should not duplicate recommendation cards. Use prose to explain when each tool is right.
- `pricing` must include concrete details: plan name, price, quota, minutes, characters, credits, or compute requirement.
- `caveat` is required editorially even if the schema allows it to be optional.
- If current pricing or quotas are uncertain, ask for a source or write a conservative caveat.

---

## Video Rules

The workflow page supports embedded YouTube videos. `video` is a required content asset, not an optional enhancement.

- Every workflow must include a `video` frontmatter block.
- Always search for or evaluate a credible, directly relevant, embeddable YouTube video before drafting the final article.
- The video must have English spoken audio, at least 30,000 public views at selection time, and a publish/update date within the last 2 years.
- The video must fit the workflow's major audience category. For `creators`, prefer creator, YouTube, podcasting, dubbing, narration, or social-video workflows. For `game_devs`, prefer game development, game AI, NPC/dialogue, game audio, localization, Unity/Godot/Unreal, or indie-production workflows. For `voice_ai_builders`, prefer technical voice agent, STT/LLM/TTS, realtime API, telephony, streaming, latency, or deployment workflows.
- Prefer a tutorial that demonstrates the whole workflow. If none exists, use a tutorial that demonstrates the most important tool step.
- If no full tutorial or tool-step tutorial exists, use the best credible adjacent video: official product demo, conference walkthrough, technical explainer, platform policy explainer, or production talk.
- The URL must be a normal YouTube watch/share URL accepted by `getYouTubeEmbedUrl`.
- The title should make the learning value clear, not merely copy a vague video title.
- Introduce the embedded video near the end of the English body, usually before the final rights/checklist section.
- Mention the embedded video in the Chinese body as well.
- Do not omit `video`. If the best candidate is shallow, outdated, below 30,000 views, non-English, mismatched to the audience category, misleading, or not embeddable, keep searching. If no acceptable video can be found after a real search, stop and ask the user for approval to use a weaker adjacent video or provide a video URL.
- If a topic is policy-heavy, a platform explainer video can support the policy section, but it should not replace a workflow tutorial when one exists.

---

## Workflow Diagram Rules

The diagram is rendered as a horizontal flowchart. Keep it readable before it is clever.

- 5-8 total nodes is ideal.
- At least 2 steps and 1 end.
- Use 0-2 decision nodes. Include a decision only when it changes the workflow.
- Use at most 1 loop.
- Main path should move left to right.
- English labels should usually be <=22 characters.
- Chinese labels should usually be <=10-12 Chinese characters.
- Do not put full instructions in `label`; put detail in `substeps`.
- Avoid long branch labels. `Keep it`, `Regenerate`, `Human review`, and `Publish` are better than sentence labels.
- Emoji icons should help scanning but not carry meaning alone.

---

## English Body Rules

The English body should usually be 900-1,600 words for a full workflow page.

Required content:

- A concrete opening scenario that explains what breaks without this workflow.
- A clear "who this is for" and "who should not use this" moment.
- 4-8 production steps or decisions.
- A two-level heading structure with no more than 4 `##` sections and no more than 4 `###` subsections per `##`.
- 3-4 common mistakes with fixes.
- A tool-selection section that works like a decision tree.
- A pre-ship/pre-publish/pre-send/pre-launch checklist.
- Rights, disclosure, security, or licensing section when the topic involves synthetic voices, user data, monetization, commercial assets, or public deployment.

---

## `i18n.zh.body` Rules

Chinese body is first-class content, not a translation stub.

- Write native Chinese as if the article was conceived for Chinese practitioners.
- Target 900-1,600 Chinese characters, or at least 60-70% of the English information density.
- Cover the same decisions, caveats, tool tradeoffs, and checklist logic as English.
- Headings should mirror the function of English headings, but may use natural Chinese phrasing.
- For `creators`, assume familiarity with Chinese short-video and creator platforms when relevant.
- For `game_devs`, mention common game engines and production handoff concerns when relevant.
- For `voice_ai_builders`, use accurate technical vocabulary for latency, inference, deployment, orchestration, interruption, and streaming.
- Always include RMB or "RMB approx." equivalents alongside USD pricing.
- Avoid corporate buzzwords unless quoting a source.

---

## Internal Verification Pass

After drafting, run this internal Chain-of-Verification before final output:

1. Extract every factual claim involving price, quota, policy, rights, latency, maintenance, tool capability, or user sentiment.
2. For each claim, identify the source that supports it.
3. Mark unsupported claims as `remove`, `weaken`, or `needs source`.
4. Check that tool slugs match directory slugs.
5. Check schema limits: descriptions, recommendation summaries, pricing strings, caveats, source notes, video title.
6. Check video: present, English audio, 30,000+ views, within 2 years, matched to the user group, credible, relevant, embeddable, and introduced in both English and Chinese bodies.
7. Check the diagram: node count, label length, branch complexity, i18n labels.
8. Check the Chinese body: not a short summary, same practical value as English.
9. Apply fixes before returning the file.

Do not expose this verification log in the final answer.

---

## Internal Critic Pass

Act as a skeptical editor before final output.

Ask:

- Does the first 150 words explain a real pain and a concrete outcome?
- Can the 3-4 major `##` sections tell the article story by themselves?
- Are there no more than 4 `##` sections, and no more than 4 `###` subsections under any `##`?
- Is there at least one explicit "do not use this workflow if..." judgment?
- Does the article include at least three concrete numbers?
- Are there any generic paragraphs that could appear in any AI article?
- Are common mistakes based on real production behavior?
- Does each recommended tool have reason, tradeoff, and pricing detail?
- Is there an embedded YouTube video with English audio, 30,000+ views, a publish/update date within 2 years, and the right audience category?
- Is the open-source option honestly described?
- Is the checklist concrete enough that a reader can execute it?
- Does the Chinese body sound like native editorial writing?

Rewrite weak sections before final output.

---

## Human-Editor Pass

Make the final article feel written for a real person.

- Remove correct but useless paragraphs.
- Break mechanical sentence rhythms.
- Add concrete examples where the prose feels abstract.
- Keep a slightly opinionated but fair voice.
- Avoid hype, corporate phrasing, and generic AI productivity language.
- Preserve trust: do not overclaim quality, savings, legal safety, or platform approval.

---

## Final Output

Return one complete Markdown file:

1. YAML frontmatter first.
2. English Markdown body after frontmatter.
3. No commentary before or after the file.

If any required field, source, or tool slug is missing, ask a concise clarification question instead of generating the file.
