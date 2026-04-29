import { defineCollection, z } from 'astro:content';

// ── Enum helpers ───────────────────────────────────────────────────────────
const PrimaryCategory = z.enum([
  'tts',
  'stt',
  'voice_cloning',
  'dubbing',
  'sound_effects',
  'voice_changer',
  'audio_cleanup',
  'creator_editing',
  'voice_agent_platform',
  'realtime_infrastructure',
  'conversation_framework',
]);

const Layer = z.enum(['L1', 'L2', 'L3', 'L4']);

const CreatorUseCase = z.enum([
  'voiceover', 'dubbing', 'subtitles', 'audio_cleanup',
  'audiobook', 'podcast', 'short_video', 'vtuber',
]);

const GameDevUseCase = z.enum([
  'npc_dialogue', 'realtime_agent', 'localization',
  'sound_effects', 'engine_integration', 'voice_changer',
]);

const VoiceAIBuilderUseCase = z.enum([
  'conversational_agent', 'virtual_companion', 'phone_agent',
  'voice_assistant', 'ai_tutor', 'iot_voice', 'ai_rpg',
]);

const Badge = z.enum(['popular', 'editor_choice', 'new', 'open_source']);

const LocalizedText = z.object({
  name: z.string().optional(),
  tagline: z.string().max(100).optional(),
  body: z.string().optional(),
  licensing_notes: z.string().optional(),
  gotchas: z.array(z.string()).max(4).optional(),
  portability_notes: z.string().optional(),
});

const WorkflowRecommendationTier = z.enum([
  'best_quality',
  'best_value',
  'open_source',
  'production_default',
  'fast_rising',
  'open_or_self_hosted',
]);

const WorkflowRecommendation = z.object({
  tier: WorkflowRecommendationTier,
  tool_slug: z.string(),
  tool_name: z.string(),
  url: z.string().url(),
  summary: z.string().max(220),
  pricing: z.string().max(120),
  caveat: z.string().max(220).optional(),
  i18n: z.object({
    zh: z.object({
      tool_name: z.string().optional(),
      summary: z.string().max(220).optional(),
      pricing: z.string().max(120).optional(),
      caveat: z.string().max(220).optional(),
    }).optional(),
  }).optional(),
});

const WorkflowSource = z.object({
  title: z.string(),
  url: z.string().url(),
  note: z.string().max(220).optional(),
  i18n: z.object({
    zh: z.object({
      title: z.string().optional(),
      note: z.string().max(220).optional(),
    }).optional(),
  }).optional(),
});

const DiagramBranch = z.object({
  label: z.string(),
  terminal: z.boolean().optional(),
  loop: z.boolean().optional(),
  i18n: z.object({
    zh: z.object({
      label: z.string().optional(),
    }).optional(),
  }).optional(),
});

const DiagramI18n = z.object({
  zh: z.object({
    label: z.string().optional(),
    substeps: z.array(z.string()).optional(),
  }).optional(),
}).optional();

const DiagramStep = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('step'),
    label: z.string(),
    icon: z.string().optional(),
    substeps: z.array(z.string()).optional(),
    i18n: DiagramI18n,
  }),
  z.object({
    type: z.literal('decision'),
    label: z.string(),
    icon: z.string().optional(),
    yes: DiagramBranch,
    no: DiagramBranch,
    i18n: DiagramI18n,
  }),
  z.object({
    type: z.literal('end'),
    label: z.string(),
    icon: z.string().optional(),
    i18n: DiagramI18n,
  }),
]);

const WorkflowDiagram = z.object({
  steps: z.array(DiagramStep),
});

const WorkflowVideo = z.object({
  provider: z.enum(['youtube']).default('youtube'),
  url: z.string().url(),
  title: z.string().max(160),
  i18n: z.object({
    zh: z.object({
      title: z.string().max(160).optional(),
    }).optional(),
  }).optional(),
});

const TrafficEstimate = z.object({
  source: z.string(),
  source_url: z.string().url(),
  captured_at: z.date(),
  period_label: z.string(),
  visits_last_month: z.number().min(0).optional(),
  monthly_visits: z.array(z.object({
    month: z.string(),
    visits: z.number().min(0),
    is_partial: z.boolean().default(false),
    note: z.string().optional(),
  })).max(3).default([]),
  change_mom_percent: z.number().optional(),
  bounce_rate_percent: z.number().min(0).max(100).optional(),
  pages_per_visit: z.number().min(0).optional(),
  avg_visit_duration: z.string().optional(),
  domain_created_at: z.coerce.date().optional(),
  domain_created_source_url: z.string().url().optional(),
  global_rank: z.number().int().min(1).optional(),
  country_rank: z.number().int().min(1).optional(),
  country: z.string().optional(),
  note: z.string().optional(),
}).optional();

const GithubMetrics = z.object({
  repo: z.string(),
  source_url: z.string().url(),
  captured_at: z.date(),
  stars: z.number().int().min(0),
  forks: z.number().int().min(0),
  watchers: z.number().int().min(0).optional(),
  open_issues: z.number().int().min(0).optional(),
  open_pull_requests: z.number().int().min(0).optional(),
  commits: z.number().int().min(0).optional(),
  last_commit_at: z.date().optional(),
  latest_release_at: z.date().optional(),
  has_releases: z.boolean().optional(),
  license: z.string().optional(),
  primary_language: z.string().optional(),
  archived: z.boolean().default(false),
  signals: z.array(z.enum(['popular', 'trending', 'maintained', 'dormant', 'archived', 'no_releases'])).default([]),
  note: z.string().optional(),
}).optional();

// ── Tool collection schema (~20 fields, per MVP.md §5) ────────────────────
const tools = defineCollection({
  type: 'content',
  schema: z.object({

    // === 基础信息 (必填) ===
    // Note: `slug` is NOT here — Astro derives it from the filename automatically.
    // The frontmatter `slug` field in .md files is kept for human reference only;
    // validate-csvs.ts checks it matches the filename.
    name: z.string(),
    tagline: z.string().max(100),
    website: z.string().url(),
    logo: z.string(),

    // === 分类 (必填) ===
    primary_category: PrimaryCategory,
    secondary_categories: z.array(PrimaryCategory).default([]),
    layers: z.array(Layer).min(1),

    // === 用户场景 (至少一类有值) ===
    use_cases: z.object({
      creators:          z.array(CreatorUseCase).default([]),
      game_devs:         z.array(GameDevUseCase).default([]),
      voice_ai_builders: z.array(VoiceAIBuilderUseCase).default([]),
    }).refine(
      (uc) => uc.creators.length > 0 || uc.game_devs.length > 0 || uc.voice_ai_builders.length > 0,
      { message: 'use_cases: at least one group must have a value' }
    ),

    // === 价格 ===
    pricing: z.object({
      model:             z.enum(['free', 'freemium', 'paid', 'open_source', 'enterprise']),
      has_free_tier:     z.boolean(),
      starting_paid_usd: z.number().min(0),
      pricing_url:       z.string().url(),
      cost_per_1000_chars: z.number().optional(), // TTS: USD per 1k characters
      cost_per_minute:     z.number().optional(), // realtime/phone: USD per minute
    }),

    // === 授权 (4 核心布尔值) ===
    licensing: z.object({
      commercial_use:        z.boolean(),
      youtube_monetization:  z.boolean(),
      game_use:              z.boolean(),
      voice_cloning_allowed: z.boolean(),
      notes:                 z.string().default(''),
    }),

    // === 能力 (5 核心布尔值 + 2 可选) ===
    capabilities: z.object({
      voice_cloning:    z.boolean(),
      multilingual:     z.boolean(),
      chinese_support:  z.boolean(),
      realtime_capable: z.boolean(),
      open_source:      z.boolean(),
      offline_capable:  z.boolean().optional(), // local/offline inference (game devs)
      batch_api:        z.boolean().optional(), // bulk generation API support
    }),

    // === 关联与维护 ===
    alternatives: z.array(z.string()).default([]),
    verified_at:  z.date(),
    badges:       z.array(Badge).default([]),

    // === 差异化数据字段 ===
    // Things official websites don't tell you clearly
    gotchas: z.array(z.string()).max(4).default([]),

    // Per-language quality: language code → quality tier
    language_quality: z.record(
      z.string(),
      z.enum(['excellent', 'good', 'limited', 'poor'])
    ).optional(),

    // Voice/data portability (lock-in risk signal)
    portability: z.object({
      voice_model_export: z.boolean(),
      notes: z.string().optional(),
    }).optional(),

    // Optional public traffic estimates from sources such as Similarweb.
    traffic_estimates: TrafficEstimate,

    // Optional GitHub repository metrics for open-source projects without useful web traffic data.
    github_metrics: GithubMetrics,

    // Optional YouTube tutorial, demo, or notable example showing the tool in use.
    video: WorkflowVideo.optional(),

    // === 可选: Voice Agent 专属 ===
    voice_agent_extras: z.object({
      type:             z.enum(['orchestration_platform', 'infrastructure', 'framework', 'vad', 'telephony']),
      brings_own_stack: z.boolean(),
    }).optional(),

    // Optional localized content. English remains the source/default fields.
    i18n: z.object({
      zh: LocalizedText.optional(),
    }).optional(),

    // Future fields go here as .optional() — never remove existing fields
  }),
});

// ── Workflow collection ────────────────────────────────────────────────────
const workflows = defineCollection({
  type: 'content',
  schema: z.object({
    title:        z.string(),
    user_group:   z.enum(['creators', 'game_devs', 'voice_ai_builders']),
    description:  z.string().max(300),
    budget_min_usd: z.number(),
    budget_max_usd: z.number(),
    tools:        z.array(z.string()),
    tool_recommendations: z.array(WorkflowRecommendation).default([]),
    sources: z.array(WorkflowSource).default([]),
    video: WorkflowVideo.optional(),
    workflowDiagram: WorkflowDiagram.optional(),
    diagram: WorkflowDiagram.optional(),
    featured:     z.boolean().default(false),
    i18n: z.object({
      zh: z.object({
        title: z.string().optional(),
        description: z.string().max(300).optional(),
        body: z.string().optional(),
      }).optional(),
    }).optional(),
  }),
});

export const collections = { tools, workflows };
