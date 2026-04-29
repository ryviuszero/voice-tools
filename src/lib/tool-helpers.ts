import type { CollectionEntry } from 'astro:content';
import { DEFAULT_LANG, formatBadge, formatCategory as formatLocalizedCategory, formatPriceValue, formatPricingModel, type Language } from './i18n';

export type Tool = CollectionEntry<'tools'>;

// ── Label maps ─────────────────────────────────────────────────────────────

export const PRICING_LABEL: Record<string, string> = {
  free:         'Free',
  freemium:     'Freemium',
  paid:         'Paid',
  open_source:  'Open Source',
  enterprise:   'Enterprise',
};

export const CATEGORY_LABEL: Record<string, string> = {
  tts:                    'Text-to-Speech',
  stt:                    'Speech-to-Text',
  voice_cloning:          'Voice Cloning',
  dubbing:                'Dubbing & Translation',
  sound_effects:          'Sound Effects',
  voice_changer:          'Voice Changer',
  audio_cleanup:          'Audio Cleanup',
  voice_agent_platform:   'Voice Agent Platform',
  realtime_infrastructure:'Realtime Infrastructure',
  conversation_framework: 'Conversation Framework',
};

export const BADGE_LABEL: Record<string, string> = {
  popular:       'Popular',
  editor_choice: "Editor's Choice",
  new:           'New',
  open_source:   'Open Source',
};

export const BADGE_CLASS: Record<string, string> = {
  popular:       'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/20',
  editor_choice: 'bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/20',
  new:           'bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/20',
  open_source:   'bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/15 dark:text-green-300 dark:border-green-500/20',
};

// ── Filter helpers ─────────────────────────────────────────────────────────

export function toolsByUserGroup(tools: Tool[], group: 'creators' | 'game_devs' | 'voice_ai_builders'): Tool[] {
  return tools.filter((t) => t.data.use_cases[group].length > 0);
}

export function toolsByCategory(tools: Tool[], category: string): Tool[] {
  return tools.filter((t) => (
    t.data.primary_category === category ||
    (t.data.secondary_categories ?? []).includes(category as any)
  ));
}

export function toolsByBadge(tools: Tool[], badge: string): Tool[] {
  return tools.filter((t) => t.data.badges.includes(badge as any));
}

export function recentTools(tools: Tool[], n = 5): Tool[] {
  return [...tools]
    .sort((a, b) => b.data.verified_at.getTime() - a.data.verified_at.getTime())
    .slice(0, n);
}

export function getAlternatives(tool: Tool, allTools: Tool[]): Tool[] {
  const slugMap = new Map(allTools.map((t) => [t.slug, t]));
  return tool.data.alternatives
    .map((s) => slugMap.get(s))
    .filter((t): t is Tool => t !== undefined);
}

// ── Format helpers ─────────────────────────────────────────────────────────

export function formatPrice(tool: Tool): string {
  return formatPriceValue(tool.data.pricing, DEFAULT_LANG);
}

export function formatToolPrice(tool: Tool, lang: Language): string {
  return formatPriceValue(tool.data.pricing, lang);
}

export function formatCategory(slug: string, lang: Language = DEFAULT_LANG): string {
  return formatLocalizedCategory(slug, lang);
}

export function formatCategoryTags(tool: Tool, lang: Language = DEFAULT_LANG): string[] {
  const slugs = [tool.data.primary_category, ...(tool.data.secondary_categories ?? [])];
  return Array.from(new Set(slugs)).map((slug) => formatCategory(slug, lang));
}

export function formatCategoryTagItems(tool: Tool, lang: Language = DEFAULT_LANG): { slug: string; label: string }[] {
  const slugs = [tool.data.primary_category, ...(tool.data.secondary_categories ?? [])];
  return Array.from(new Set(slugs)).map((slug) => ({
    slug,
    label: formatCategory(slug, lang),
  }));
}

export function formatQualityRisk(tool: Tool, lang: Language = DEFAULT_LANG): string {
  const data = tool.data;
  const languageScores = Object.values(data.language_quality ?? {});
  const hasPoorLanguage = languageScores.includes('poor');
  const hasLimitedLanguage = languageScores.includes('limited');
  const technicalQualityCategories = new Set([
    'voice_cloning',
    'voice_changer',
    'sound_effects',
    'realtime_infrastructure',
    'conversation_framework',
  ]);

  let tier: 'low' | 'medium' | 'high' = 'low';
  if (hasPoorLanguage || (data.capabilities.open_source && technicalQualityCategories.has(data.primary_category))) {
    tier = 'high';
  } else if (
    hasLimitedLanguage ||
    data.capabilities.open_source ||
    data.capabilities.offline_capable ||
    technicalQualityCategories.has(data.primary_category)
  ) {
    tier = 'medium';
  }

  const labels = {
    en: { low: 'Low', medium: 'Medium', high: 'High' },
    zh: { low: '低', medium: '中', high: '高' },
  };
  return labels[lang][tier];
}

export function formatToolBadge(badge: string, lang: Language): string {
  return formatBadge(badge, lang);
}

export function visibleToolBadges(badges: readonly string[]): string[] {
  return badges.filter((badge) => badge !== 'editor_choice');
}

export function formatToolPricingModel(model: string, lang: Language): string {
  return formatPricingModel(model, lang);
}

export function formatBeginnerFit(tool: Tool, lang: Language = DEFAULT_LANG): string {
  const data = tool.data;
  const technicalCategories = new Set(['realtime_infrastructure', 'conversation_framework']);
  const moderateCategories = new Set(['voice_agent_platform', 'stt', 'voice_cloning']);

  let tier: 'easy' | 'moderate' | 'technical' = 'easy';
  if (
    data.capabilities.open_source ||
    data.capabilities.offline_capable ||
    technicalCategories.has(data.primary_category)
  ) {
    tier = 'technical';
  } else if (
    data.voice_agent_extras ||
    data.capabilities.batch_api ||
    data.capabilities.realtime_capable ||
    moderateCategories.has(data.primary_category)
  ) {
    tier = 'moderate';
  }

  const labels = {
    en: { easy: 'Easy', moderate: 'Moderate', technical: 'Technical' },
    zh: { easy: '易上手', moderate: '中等', technical: '偏技术' },
  };
  return labels[lang][tier];
}

export function formatRightsConfidence(tool: Tool, lang: Language = DEFAULT_LANG): string {
  const { licensing } = tool.data;
  const notes = licensing.notes.toLowerCase();
  const paidPlanRequired = /\b(free|paid|starter|creator|plan|tier|subscription)\b/.test(notes);
  const coreCommercialRights =
    licensing.commercial_use &&
    licensing.youtube_monetization &&
    licensing.game_use;

  let tier: 'clear' | 'paid_plans' | 'conditional' | 'review' = 'review';
  if (coreCommercialRights && paidPlanRequired) {
    tier = 'paid_plans';
  } else if (coreCommercialRights) {
    tier = 'clear';
  } else if (licensing.commercial_use || licensing.youtube_monetization || licensing.game_use) {
    tier = 'conditional';
  }

  const labels = {
    en: {
      clear: 'Clear',
      paid_plans: 'Paid plans',
      conditional: 'Conditional',
      review: 'Review terms',
    },
    zh: {
      clear: '清晰',
      paid_plans: '付费可商用',
      conditional: '有条件',
      review: '需核对条款',
    },
  };
  return labels[lang][tier];
}
