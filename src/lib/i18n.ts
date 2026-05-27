export const LANGUAGES = ['en', 'zh'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Language = 'en';

export function isLanguage(value: string | undefined): value is Language {
  return value === 'en' || value === 'zh';
}

export function langFromPath(pathname: string): Language {
  return pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : DEFAULT_LANG;
}

export function localizedPath(path: string, lang: Language): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const localized = lang === DEFAULT_LANG
    ? normalized
    : normalized === '/' ? `/${lang}` : `/${lang}${normalized}`;
  return withCanonicalTrailingSlash(localized);
}

export function alternatePath(pathname: string, lang: Language): string {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  const withoutLang = cleanPath === '/zh' ? '/' : cleanPath.replace(/^\/zh(?=\/)/, '');
  return localizedPath(withoutLang, lang);
}

export function withCanonicalTrailingSlash(path: string): string {
  if (!path.startsWith('/') || path === '/') return path;

  const match = /^([^?#]*)([?#].*)?$/.exec(path);
  if (!match) return path;

  const pathname = match[1];
  const suffix = match[2] ?? '';
  const lastSegment = pathname.split('/').filter(Boolean).at(-1) ?? '';
  if (pathname.endsWith('/') || lastSegment.includes('.')) return path;

  return `${pathname}/${suffix}`;
}

export const SITE = {
  en: {
    name: 'Voice Tools Directory',
    shortName: 'Voice Tools',
    description: 'Curated voice AI tools for creators, game developers, and voice AI builders.',
  },
  zh: {
    name: '语音 AI 工具目录',
    shortName: '语音工具',
    description: '为内容创作者、游戏开发者和 Voice AI 开发者精选的语音 AI 工具目录。',
  },
} as const;

export const UI = {
  en: {
    nav: {
      creators: 'Creators',
      gameDevs: 'Game Devs',
      voiceAi: 'Voice AI',
      search: 'Search',
      submit: 'Submit',
      language: '中文',
    },
    common: {
      tools: 'tools',
      noTools: 'No tools yet.',
      submitOne: 'Submit one',
      compare: 'Compare',
      added: 'Added',
      clear: 'Clear',
      yes: 'Yes',
      no: 'No',
      source: 'Source',
      loading: 'Loading',
    },
    labels: {
      pricing: 'Pricing',
      capabilities: 'Capabilities',
      licensing: 'Licensing',
      resetFilters: 'Reset filters',
      price: 'Price',
      category: 'Category',
      chinese: 'Chinese',
      openSource: 'Open Source',
      commercialUse: 'Commercial Use',
      youtubeMonetization: 'YouTube Monetization',
      gameUse: 'Game Use',
      voiceCloning: 'Voice Cloning',
      multilingual: 'Multilingual',
      chineseSupport: 'Chinese Support',
      realTime: 'Real-time',
      freeTier: 'Free Tier',
      pricingModel: 'Pricing Model',
      gotchas: 'Usage Notes',
      gotchasHint: 'Important constraints to review before production use',
      languageQuality: 'Language Quality',
      lockInRisk: 'Lock-in Risk',
      costEstimator: 'Cost Estimator',
      offlineLocal: 'Offline / Local',
      batchApi: 'Batch API',
      canIUseThis: 'Use Cases',
      licensingSummary: 'Licensing and usage summary for common production scenarios',
      commercialProjects: 'Commercial Projects',
      commercialProjectsHint: 'Use outputs in paid products or client work',
      shippingInGames: 'Shipping in Games',
      shippingInGamesHint: 'Bundle generated audio in a commercial game release',
      voiceCloningHint: "Clone a real person's voice with consent",
      voiceModelExportable: 'Voice model can be exported',
      voiceModelNotExportable: 'Voice model cannot be exported',
    },
    pricing: {
      free: 'Free',
      freemium: 'Freemium',
      paid: 'Paid',
      open_source: 'Open Source',
      enterprise: 'Enterprise',
      from: 'from',
      perMonth: '/mo',
      freeTierAvailable: 'Free tier available',
    },
    badge: {
      popular: 'Popular',
      editor_choice: "Editor's Choice",
      new: 'New',
      open_source: 'Open Source',
    },
    category: {
      tts: 'Text-to-Speech',
      stt: 'Speech-to-Text',
      voice_cloning: 'Voice Cloning',
      dubbing: 'Dubbing & Translation',
      sound_effects: 'Sound Effects',
      voice_changer: 'Voice Changer',
      audio_cleanup: 'Audio Cleanup',
      creator_editing: 'Creator Editing',
      voice_agent_platform: 'Voice Agent Platform',
      realtime_infrastructure: 'Realtime Infrastructure',
      conversation_framework: 'Conversation Framework',
    },
    changeType: {
      pricing_change: 'Pricing Change',
      feature_added: 'Feature Added',
      product_change: 'Product Change',
      model_release: 'Model Release',
      policy_change: 'Policy Change',
    },
    quality: {
      excellent: 'Excellent',
      good: 'Good',
      limited: 'Limited',
      poor: 'Poor',
    },
    languageName: {
      en: 'English',
      zh: 'Chinese',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      pt: 'Portuguese',
      ja: 'Japanese',
      ko: 'Korean',
      ar: 'Arabic',
      hi: 'Hindi',
      ru: 'Russian',
      it: 'Italian',
    },
  },
  zh: {
    nav: {
      creators: '创作者',
      gameDevs: '游戏开发',
      voiceAi: 'Voice AI',
      search: '搜索',
      submit: '提交',
      language: 'English',
    },
    common: {
      tools: '个工具',
      noTools: '暂时没有工具。',
      submitOne: '提交一个',
      compare: '对比',
      added: '已添加',
      clear: '清空',
      yes: '是',
      no: '否',
      source: '来源',
      loading: '加载中',
    },
    labels: {
      pricing: '价格',
      capabilities: '能力',
      licensing: '授权',
      resetFilters: '重置筛选',
      price: '价格',
      category: '分类',
      chinese: '中文',
      openSource: '开源',
      commercialUse: '商用',
      youtubeMonetization: 'YouTube 变现',
      gameUse: '游戏使用',
      voiceCloning: '声音克隆',
      multilingual: '多语言',
      chineseSupport: '中文支持',
      realTime: '实时',
      freeTier: '免费档',
      pricingModel: '价格模式',
      gotchas: '使用说明',
      gotchasHint: '生产使用前需要确认的关键限制',
      languageQuality: '语言质量',
      lockInRisk: '迁移与锁定风险',
      costEstimator: '成本估算',
      offlineLocal: '离线 / 本地',
      batchApi: '批量 API',
      canIUseThis: '适用场景',
      licensingSummary: '常见生产场景下的授权与使用摘要',
      commercialProjects: '商业项目',
      commercialProjectsHint: '用于付费产品或客户项目',
      shippingInGames: '游戏发布',
      shippingInGamesHint: '将生成音频打包进商业游戏',
      voiceCloningHint: '在获得同意后克隆真人声音',
      voiceModelExportable: '声音模型可以导出',
      voiceModelNotExportable: '声音模型不可导出',
    },
    pricing: {
      free: '免费',
      freemium: '免费增值',
      paid: '付费',
      open_source: '开源',
      enterprise: '企业版',
      from: '起',
      perMonth: '/月',
      freeTierAvailable: '有免费档',
    },
    badge: {
      popular: '热门',
      editor_choice: '编辑精选',
      new: '新增',
      open_source: '开源',
    },
    category: {
      tts: '文字转语音',
      stt: '语音转文字',
      voice_cloning: '声音克隆',
      dubbing: '配音与翻译',
      sound_effects: '音效生成',
      voice_changer: '变声器',
      audio_cleanup: '音频清理',
      creator_editing: '创作者剪辑',
      voice_agent_platform: 'Voice Agent 平台',
      realtime_infrastructure: '实时语音基础设施',
      conversation_framework: '对话编排框架',
    },
    changeType: {
      pricing_change: '价格变更',
      feature_added: '新增功能',
      product_change: '产品更新',
      model_release: '模型发布',
      policy_change: '政策变更',
    },
    quality: {
      excellent: '优秀',
      good: '良好',
      limited: '有限',
      poor: '较差',
    },
    languageName: {
      en: '英语',
      zh: '中文',
      es: '西班牙语',
      fr: '法语',
      de: '德语',
      pt: '葡萄牙语',
      ja: '日语',
      ko: '韩语',
      ar: '阿拉伯语',
      hi: '印地语',
      ru: '俄语',
      it: '意大利语',
    },
  },
} as const;

export function t(lang: Language) {
  return UI[lang];
}

export function formatCategory(slug: string, lang: Language): string {
  return UI[lang].category[slug as keyof typeof UI.en.category] ?? slug.replace(/_/g, ' ');
}

export function formatBadge(badge: string, lang: Language): string {
  return UI[lang].badge[badge as keyof typeof UI.en.badge] ?? badge;
}

export function formatPricingModel(model: string, lang: Language): string {
  return UI[lang].pricing[model as keyof typeof UI.en.pricing] ?? model;
}

export function formatPriceValue(
  pricing: { model: string; starting_paid_usd: number; has_free_tier: boolean },
  lang: Language,
): string {
  if (pricing.model === 'free' || pricing.model === 'open_source') return UI[lang].pricing.free;
  if (pricing.model === 'enterprise') return UI[lang].pricing.enterprise;
  if (pricing.starting_paid_usd && pricing.starting_paid_usd > 0) {
    return lang === 'zh'
      ? `$${pricing.starting_paid_usd}${UI[lang].pricing.perMonth}${UI[lang].pricing.from}`
      : `${UI[lang].pricing.from} $${pricing.starting_paid_usd}${UI[lang].pricing.perMonth}`;
  }
  if (pricing.has_free_tier) return UI[lang].pricing.freemium;
  return UI[lang].pricing.paid;
}

export function localizedToolData<T extends {
  name: string;
  tagline: string;
  licensing: { notes: string };
  gotchas?: string[];
  portability?: { notes?: string };
  i18n?: {
    zh?: {
      name?: string;
      tagline?: string;
      licensing_notes?: string;
      body?: string;
      gotchas?: string[];
      portability_notes?: string;
    };
  };
}>(data: T, lang: Language) {
  if (lang !== 'zh') {
    return {
      name: data.name,
      tagline: data.tagline,
      licensingNotes: data.licensing.notes,
      gotchas: data.gotchas ?? [],
      portabilityNotes: data.portability?.notes,
      body: undefined,
    };
  }

  const zh = data.i18n?.zh;
  return {
    name: zh?.name ?? data.name,
    tagline: zh?.tagline ?? data.tagline,
    licensingNotes: zh?.licensing_notes ?? data.licensing.notes,
    gotchas: zh?.gotchas ?? data.gotchas ?? [],
    portabilityNotes: zh?.portability_notes ?? data.portability?.notes,
    body: zh?.body,
  };
}

export function localizedWorkflowData<T extends {
  title: string;
  description: string;
  i18n?: { zh?: { title?: string; description?: string; body?: string } };
}>(data: T, lang: Language) {
  if (lang !== 'zh') {
    return {
      title: data.title,
      description: data.description,
      body: undefined,
    };
  }

  const zh = data.i18n?.zh;
  return {
    title: zh?.title ?? data.title,
    description: zh?.description ?? data.description,
    body: zh?.body,
  };
}

export type MarkdownHeading = {
  depth: number;
  slug: string;
  text: string;
};

function createHeadingSlugger() {
  const counts = new Map<string, number>();

  return (text: string) => {
    const base = text
      .replace(/<[^>]+>/g, '')
      .replace(/[`*_~[\]()]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'section';

    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };
}

export function extractMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const slugifyHeading = createHeadingSlugger();

  return markdown
    .trim()
    .split(/\r?\n/)
    .map((line) => /^(#{2,4})\s+(.+)$/.exec(line.trim()))
    .filter((heading): heading is RegExpExecArray => heading !== null)
    .map((heading) => ({
      depth: heading[1].length,
      slug: slugifyHeading(heading[2]),
      text: heading[2]
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1'),
    }));
}

export function renderLocalizedMarkdown(markdown: string): string {
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]!);

  const safeHref = (value: string) => {
    const href = value.trim().replace(/&amp;/g, '&');
    if (href.startsWith('/')) return escapeHtml(withCanonicalTrailingSlash(href));
    if (href.startsWith('#')) return escapeHtml(href);
    try {
      const protocol = new URL(href).protocol;
      return ['http:', 'https:', 'mailto:'].includes(protocol) ? escapeHtml(href) : '#';
    } catch {
      return '#';
    }
  };

  const inline = (value: string) => escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => (
      `<a href="${safeHref(href)}">${label}</a>`
    ));

  const slugifyHeading = createHeadingSlugger();
  const blocks: string[] = [];
  const lines = markdown.trim().split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    const heading = /^(#{2,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      blocks.push(`<h${level} id="${slugifyHeading(heading[2])}">${inline(heading[2])}</h${level}>`);
      i++;
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(`<li>${inline(lines[i].trim().slice(2))}</li>`);
        i++;
      }
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(`<li>${inline(lines[i].trim().replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      blocks.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,4})\s+/.test(lines[i].trim()) && !lines[i].trim().startsWith('- ') && !/^\d+\.\s+/.test(lines[i].trim())) {
      paragraph.push(lines[i].trim());
      i++;
    }
    blocks.push(`<p>${inline(paragraph.join(' '))}</p>`);
  }

  return blocks.join('\n');
}
