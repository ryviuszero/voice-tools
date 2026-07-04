import {
  VoiceToolsApiError,
  fetchTtsProviders,
  fetchTtsVoices,
  resolveTtsAudioUrl,
  synthesizeTts,
  type TTSLanguage,
  type TTSProvider,
  type TTSVoice,
} from '../lib/voicetools-tts';

type SegmentState = {
  id: string;
  text: string;
  voiceId: string;
  pauseAfterMs: number;
  rate: 'x-slow' | 'slow' | 'medium' | 'fast' | 'x-fast';
  pitch: 'x-low' | 'low' | 'default' | 'high' | 'x-high';
  volume: 'silent' | 'x-soft' | 'soft' | 'medium' | 'loud' | 'x-loud' | 'default';
};

type TtsState = {
  provider: TTSProvider | null;
  languages: TTSLanguage[];
  voices: TTSVoice[];
  selectedProvider: string;
  selectedLanguage: string;
  selectedVoiceId: string;
  selectedEngine: string;
  selectedFormat: string;
  segments: SegmentState[];
  maxChars: number | null;
  maxSegments: number | null;
  dailyCharLimit: number | null;
  dailyCharsUsed: number;
  dailyQuotaFromBackend: boolean;
  loading: boolean;
  providerAvailable: boolean;
  serviceMessage: string;
};

const FALLBACK_DAILY_CHAR_LIMIT = 10000;
const DAILY_USAGE_KEY = 'vtd_tts_daily_usage';
const isZh = document.documentElement.lang.startsWith('zh');
const copy = isZh ? {
  noLanguages: '未加载到语言',
  noVoices: '未加载到声音',
  segment: '片段',
  remove: '移除',
  placeholder: '输入或粘贴要合成的文本...',
  advancedSettings: '高级设置',
  rate: '语速',
  pitch: '音调',
  volume: '音量',
  pauseAfter: '停顿',
  pitchLocked: 'Neural voice 暂不支持调整音调。',
  max: '最多',
  loading: '加载中',
  backendEnforced: '后端限制',
  chars: '字符',
  charsLeft: '字符剩余',
  estimated: '估算',
  generating: '生成中...',
  generate: '生成语音',
  connecting: '正在连接 API',
  apiConnected: 'API 已连接',
  apiUnavailable: 'API 不可用',
  unavailable: '不可用',
  generationUnavailable: '当前不可生成。',
  couldNotConnect: '无法连接 TTS API。',
  providerFailed: 'TTS provider 生成失败，请稍后再试。',
  audioPending: '音频仍在生成中，请稍后重试。',
  currentService: (provider: string) => `当前服务：${provider}。后续可在不改变页面结构的情况下接入更多 provider。`,
  yes: '是',
  no: '否',
  idle: '待生成',
  generatingState: '生成中',
  ready: '已完成',
  failed: '失败',
  errorReasons: {
    tts_disabled: '文字转语音当前已关闭。',
    provider_not_supported: '暂不支持这个 provider。',
    provider_not_configured: 'Amazon Polly 尚未配置完成。',
    voice_not_supported: '请选择另一个声音。',
    engine_not_supported: '请选择另一个 engine。',
    format_not_supported: '当前仅支持 MP3。',
    text_required: '请先输入文本。',
    text_too_long: '文本超过单次请求限制。',
    too_many_segments: '文本片段太多。',
    rate_limited: '请求过于频繁，请稍后再试。',
    daily_budget_exceeded: '每日免费额度已用完。',
    cost_budget_exceeded: '每日生成预算已用完。',
    audio_not_found: '音频已过期，请重新生成。',
    invalid_ssml: '请重置高级设置后再试。',
    provider_error: 'TTS provider 生成失败，请稍后再试。',
  } as Record<string, string>,
} : {
  noLanguages: 'No languages loaded',
  noVoices: 'No voices loaded',
  segment: 'Segment',
  remove: 'Remove',
  placeholder: 'Type or paste text to synthesize...',
  advancedSettings: 'Advanced settings',
  rate: 'Rate',
  pitch: 'Pitch',
  volume: 'Volume',
  pauseAfter: 'Pause after',
  pitchLocked: 'Pitch is locked for neural voices.',
  max: 'Max',
  loading: 'Loading',
  backendEnforced: 'Backend enforced',
  chars: 'chars',
  charsLeft: 'chars left',
  estimated: 'est.',
  generating: 'Generating...',
  generate: 'Generate Speech',
  connecting: 'Connecting to API',
  apiConnected: 'API connected',
  apiUnavailable: 'API unavailable',
  unavailable: 'unavailable',
  generationUnavailable: 'Generation is unavailable right now.',
  couldNotConnect: 'Could not connect to the TTS API.',
  providerFailed: 'TTS provider failed. Try again later.',
  audioPending: 'Audio is still being generated. Try again shortly.',
  currentService: (provider: string) => `Current service: ${provider}. More providers can be added without changing the page structure.`,
  yes: 'Yes',
  no: 'No',
  idle: 'idle',
  generatingState: 'generating',
  ready: 'ready',
  failed: 'failed',
  errorReasons: {} as Record<string, string>,
};

const state: TtsState = {
  provider: null,
  languages: [],
  voices: [],
  selectedProvider: 'amazon_polly',
  selectedLanguage: '',
  selectedVoiceId: '',
  selectedEngine: 'neural',
  selectedFormat: 'mp3',
  segments: [createSegment()],
  maxChars: null,
  maxSegments: null,
  dailyCharLimit: FALLBACK_DAILY_CHAR_LIMIT,
  dailyCharsUsed: 0,
  dailyQuotaFromBackend: false,
  loading: false,
  providerAvailable: false,
  serviceMessage: '',
};

const selectors = {
  providerSelect: query<HTMLSelectElement>('[data-provider-select]'),
  languageSelect: query<HTMLSelectElement>('[data-language-select]'),
  voiceSelect: query<HTMLSelectElement>('[data-voice-select]'),
  engineSelect: query<HTMLSelectElement>('[data-engine-select]'),
  segmentList: query<HTMLElement>('[data-segment-list]'),
  addSegment: query<HTMLButtonElement>('[data-add-segment]'),
  clearSegments: query<HTMLButtonElement>('[data-clear-segments]'),
  generate: query<HTMLButtonElement>('[data-generate]'),
  generateLabel: query<HTMLElement>('[data-generate-label]'),
  totalChars: query<HTMLElement>('[data-total-chars]'),
  maxChars: query<HTMLElement>('[data-max-chars]'),
  limitChars: query<HTMLElement>('[data-limit-chars]'),
  dailyQuota: query<HTMLElement>('[data-daily-quota]'),
  segmentLimit: query<HTMLElement>('[data-segment-limit]'),
  settingsSummary: query<HTMLElement>('[data-settings-summary]'),
  serviceNote: query<HTMLElement>('[data-service-note]'),
  resultState: query<HTMLElement>('[data-result-state]'),
  emptyState: query<HTMLElement>('[data-empty-state]'),
  loadingState: query<HTMLElement>('[data-loading-state]'),
  readyState: query<HTMLElement>('[data-ready-state]'),
  errorState: query<HTMLElement>('[data-error-state]'),
  errorMessage: query<HTMLElement>('[data-error-message]'),
  audioPlayer: query<HTMLAudioElement>('[data-audio-player]'),
  downloadLink: query<HTMLAnchorElement>('[data-download-link]'),
  resultProvider: query<HTMLElement>('[data-result-provider]'),
  resultVoice: query<HTMLElement>('[data-result-voice]'),
  resultCharacters: query<HTMLElement>('[data-result-characters]'),
  resultCached: query<HTMLElement>('[data-result-cached]'),
};

function query<T extends Element>(selector: string) {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing TTS element: ${selector}`);
  return element;
}

function createSegment(): SegmentState {
  return {
    id: `segment-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text: '',
    voiceId: '',
    pauseAfterMs: 0,
    rate: 'medium',
    pitch: 'default',
    volume: 'default',
  };
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadLocalDailyUsage() {
  try {
    const value = JSON.parse(localStorage.getItem(DAILY_USAGE_KEY) || '{}') as { date?: string; chars?: number };
    state.dailyCharsUsed = value.date === todayKey() ? Math.max(0, Number(value.chars) || 0) : 0;
  } catch {
    state.dailyCharsUsed = 0;
  }
}

function saveLocalDailyUsage() {
  try {
    localStorage.setItem(DAILY_USAGE_KEY, JSON.stringify({ date: todayKey(), chars: state.dailyCharsUsed }));
  } catch {
    // Local quota persistence is best-effort; generation should still succeed without storage.
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

function escapeAttr(value: string) {
  return escapeHtml(value);
}

function selectedVoice() {
  return state.voices.find((voice) => voice.id === state.selectedVoiceId) ?? null;
}

function visibleVoices() {
  return state.selectedLanguage
    ? state.voices.filter((voice) => voice.language === state.selectedLanguage)
    : state.voices;
}

function voiceIdForCurrentLanguage(voiceId: string) {
  const visibleVoiceIds = new Set(visibleVoices().map((voice) => voice.id));
  return visibleVoiceIds.has(voiceId) ? voiceId : state.selectedVoiceId;
}

function voiceLabel(voice: TTSVoice | null) {
  if (!voice) return '--';
  const name = voice.display_name || voice.name || voice.id;
  const language = voice.language ? ` · ${voice.language}` : '';
  const gender = voice.gender ? ` · ${voice.gender}` : '';
  return `${name}${gender}${language}`;
}

function totalCharacters() {
  return state.segments.reduce((sum, segment) => sum + segment.text.length, 0);
}

function currentNonEmptySegments() {
  return state.segments.filter((segment) => segment.text.trim().length > 0);
}

function providerDisplayName() {
  return state.provider?.name || 'Amazon Polly';
}

function knownMaxChars() {
  return state.maxChars ?? Number.POSITIVE_INFINITY;
}

function knownMaxSegments() {
  return state.maxSegments ?? 1;
}

function remainingDailyChars() {
  if (!state.dailyCharLimit) return null;
  return Math.max(0, state.dailyCharLimit - state.dailyCharsUsed);
}

function formatChars(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function applyProviderLimits(provider: TTSProvider | null) {
  state.maxChars = provider?.limits?.max_chars_per_request ?? null;
  state.maxSegments = provider?.limits?.max_segments_per_request ?? null;

  const dynamicLimits = provider?.limits as TTSProvider['limits'] & Record<string, unknown> | undefined;
  const backendDailyLimit = Number(
    dynamicLimits?.daily_free_chars ??
    dynamicLimits?.ip_daily_char_limit ??
    dynamicLimits?.daily_char_limit ??
    0
  );
  const backendRemaining = Number(
    dynamicLimits?.daily_chars_remaining ??
    dynamicLimits?.ip_daily_chars_remaining ??
    dynamicLimits?.remaining_daily_chars ??
    -1
  );

  state.dailyQuotaFromBackend = Number.isFinite(backendRemaining) && backendRemaining >= 0;
  if (Number.isFinite(backendDailyLimit) && backendDailyLimit > 0) {
    state.dailyCharLimit = backendDailyLimit;
  }
  if (state.dailyQuotaFromBackend && state.dailyCharLimit) {
    state.dailyCharsUsed = Math.max(0, state.dailyCharLimit - backendRemaining);
  }
}

function setProviderStatus(kind: 'loading' | 'available' | 'unavailable' | 'error', text: string) {
  void kind;
  void text;
}

function setResultState(kind: 'idle' | 'generating' | 'ready' | 'failed', message?: string) {
  selectors.emptyState.classList.toggle('hidden', kind !== 'idle');
  selectors.loadingState.classList.toggle('hidden', kind !== 'generating');
  selectors.readyState.classList.toggle('hidden', kind !== 'ready');
  selectors.errorState.classList.toggle('hidden', kind !== 'failed');
  selectors.resultState.textContent = {
    idle: copy.idle,
    generating: copy.generatingState,
    ready: copy.ready,
    failed: copy.failed,
  }[kind];
  if (message) selectors.errorMessage.textContent = message;
}

function renderSegments() {
  const maxLength = Number.isFinite(knownMaxChars()) ? `maxlength="${knownMaxChars()}"` : '';
  selectors.segmentList.innerHTML = state.segments.map((segment, index) => `
    <article class="tts-segment" data-segment-id="${segment.id}">
      <div class="tts-segment-header">
        <span class="tts-segment-title">${copy.segment} ${index + 1}</span>
        <button type="button" class="tts-remove" data-remove-segment="${segment.id}" ${state.segments.length <= 1 ? 'disabled' : ''}>${copy.remove}</button>
      </div>
      <div class="tts-segment-body">
        <textarea data-segment-text="${segment.id}" ${maxLength} aria-label="${copy.segment} ${index + 1}" placeholder="${copy.placeholder}">${escapeHtml(segment.text)}</textarea>
        <details class="tts-segment-advanced">
          <summary>
            <span>${copy.advancedSettings}</span>
            <span>rate ${segment.rate}, pause ${segment.pauseAfterMs}ms</span>
          </summary>
          <div class="tts-segment-settings">
            ${renderSegmentSelect(segment, copy.rate, 'segmentRate', ['x-slow', 'slow', 'medium', 'fast', 'x-fast'])}
            ${renderSegmentSelect(segment, copy.pitch, 'segmentPitch', ['default', 'x-low', 'low', 'high', 'x-high'], state.selectedEngine === 'neural')}
            ${renderSegmentSelect(segment, copy.volume, 'segmentVolume', ['default', 'silent', 'x-soft', 'soft', 'medium', 'loud', 'x-loud'])}
            <label>
              <span>${copy.pauseAfter}</span>
              <input type="number" min="0" max="3000" step="100" value="${segment.pauseAfterMs}" data-segment-pause="${segment.id}" />
            </label>
            ${state.selectedEngine === 'neural' ? `<p class="tts-pitch-note">${copy.pitchLocked}</p>` : ''}
          </div>
        </details>
      </div>
    </article>
  `).join('');
}

function renderSegmentSelect(
  segment: SegmentState,
  label: string,
  dataKey: 'segmentRate' | 'segmentPitch' | 'segmentVolume',
  values: string[],
  disabled = false,
) {
  const selected = dataKey === 'segmentRate'
    ? segment.rate
    : dataKey === 'segmentPitch'
      ? segment.pitch
      : segment.volume;
  const attr = dataKey.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
  return `<label>
    <span>${label}</span>
    <select data-${attr}="${segment.id}" ${disabled ? 'disabled' : ''}>
      ${values.map((value) => `<option value="${value}" ${selected === value ? 'selected' : ''}>${value}</option>`).join('')}
    </select>
  </label>`;
}

function renderSelects() {
  selectors.providerSelect.innerHTML = state.provider
    ? `<option value="${escapeAttr(state.provider.id)}">${escapeHtml(state.provider.name)}</option>`
    : '<option value="amazon_polly">Amazon Polly</option>';

  selectors.languageSelect.innerHTML = state.languages.length
    ? state.languages.map((language) => `<option value="${escapeAttr(language.id)}" ${state.selectedLanguage === language.id ? 'selected' : ''}>${escapeHtml(language.name)}</option>`).join('')
    : `<option value="">${copy.noLanguages}</option>`;

  const currentVisibleVoices = visibleVoices();
  selectors.voiceSelect.innerHTML = currentVisibleVoices.length
    ? currentVisibleVoices.map((voice) => {
      const label = `${voice.display_name || voice.name} · ${voice.gender}`;
      return `<option value="${escapeAttr(voice.id)}" ${state.selectedVoiceId === voice.id ? 'selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('')
    : `<option value="">${copy.noVoices}</option>`;

  const voice = selectedVoice();
  const engines = voice?.engines?.length ? voice.engines : [state.provider?.default_engine || 'neural'];
  selectors.engineSelect.innerHTML = engines.map((engine) => `<option value="${escapeAttr(engine)}" ${state.selectedEngine === engine ? 'selected' : ''}>${escapeHtml(engine)}</option>`).join('');

  selectors.languageSelect.disabled = !state.languages.length || state.loading;
  selectors.voiceSelect.disabled = !state.voices.length || state.loading || !state.providerAvailable;
  selectors.engineSelect.disabled = !engines.length || state.loading || !state.providerAvailable;
}

function renderState() {
  const chars = totalCharacters();
  const overLimit = Number.isFinite(knownMaxChars()) && chars > knownMaxChars();
  const dailyRemaining = remainingDailyChars();
  const overDailyQuota = dailyRemaining !== null && chars > dailyRemaining;
  const canGenerate = state.providerAvailable
    && currentNonEmptySegments().length > 0
    && !overLimit
    && !overDailyQuota
    && Boolean(state.selectedVoiceId)
    && !state.loading;

  selectors.totalChars.textContent = String(chars);
  selectors.maxChars.textContent = state.maxChars ? String(state.maxChars) : '--';
  selectors.limitChars.textContent = state.maxChars ? `${state.maxChars} ${copy.chars}` : copy.loading;
  selectors.dailyQuota.textContent = dailyRemaining === null
    ? copy.backendEnforced
    : `${formatChars(dailyRemaining)} / ${formatChars(state.dailyCharLimit || dailyRemaining)} ${copy.charsLeft}${state.dailyQuotaFromBackend ? '' : ` ${copy.estimated}`}`;
  selectors.totalChars.parentElement?.classList.toggle('over-limit', overLimit);
  selectors.segmentLimit.textContent = state.maxSegments ? `${copy.max} ${state.maxSegments}` : `${copy.max} --`;
  selectors.addSegment.disabled = state.loading || !state.maxSegments || state.segments.length >= knownMaxSegments();
  selectors.generate.disabled = !canGenerate;
  selectors.generateLabel.textContent = state.loading ? copy.generating : copy.generate;
  selectors.settingsSummary.textContent = `${providerDisplayName()} · ${state.selectedEngine || 'engine'} · ${state.selectedFormat.toUpperCase()}`;

  if (state.serviceMessage) {
    selectors.serviceNote.textContent = state.serviceMessage;
  } else if (!state.providerAvailable && state.provider) {
    selectors.serviceNote.textContent = `${state.provider.name} ${state.provider.status}. ${copy.generationUnavailable}`;
  } else {
    selectors.serviceNote.textContent = copy.currentService(providerDisplayName());
  }
}

function syncSelectedDefaults() {
  if (!state.selectedLanguage && state.languages.length) {
    state.selectedLanguage = state.languages.find((language) => language.id === 'en-US')?.id || state.languages[0].id;
  }

  const currentVisibleVoices = visibleVoices();
  if (!currentVisibleVoices.some((voice) => voice.id === state.selectedVoiceId)) {
    state.selectedVoiceId = currentVisibleVoices[0]?.id || '';
  }

  const voice = selectedVoice();
  const engines = voice?.engines?.length ? voice.engines : [state.provider?.default_engine || 'neural'];
  if (!engines.includes(state.selectedEngine)) {
    state.selectedEngine = engines.includes(state.provider?.default_engine || '') ? state.provider!.default_engine : engines[0] || 'neural';
  }

  if (state.selectedEngine === 'neural') {
    state.segments.forEach((segment) => { segment.pitch = 'default'; });
  }

  const visibleVoiceIds = new Set(currentVisibleVoices.map((voiceItem) => voiceItem.id));
  state.segments.forEach((segment) => {
    if (!segment.voiceId || !visibleVoiceIds.has(segment.voiceId)) {
      segment.voiceId = state.selectedVoiceId;
    }
  });
}

function rerender() {
  syncSelectedDefaults();
  renderSelects();
  renderSegments();
  renderState();
}

async function loadInitialData() {
  try {
    setProviderStatus('loading', copy.connecting);
    const providersData = await fetchTtsProviders();
    state.provider = providersData.providers.find((provider) => provider.id === 'amazon_polly') ?? providersData.providers[0] ?? null;
    state.providerAvailable = state.provider?.status === 'available';
    state.selectedProvider = state.provider?.id || 'amazon_polly';
    applyProviderLimits(state.provider);
    state.selectedEngine = state.provider?.default_engine || 'neural';

    if (!state.providerAvailable) {
      setProviderStatus('unavailable', `${providerDisplayName()} ${copy.unavailable}`);
      state.serviceMessage = `${providerDisplayName()} ${state.provider?.status ?? copy.unavailable}. ${copy.generationUnavailable}`;
      rerender();
      return;
    }

    setProviderStatus('available', copy.apiConnected);
    state.serviceMessage = '';
    const voicesData = await fetchTtsVoices({ provider: state.selectedProvider });
    state.languages = voicesData.languages;
    state.voices = voicesData.voices;
    rerender();
  } catch (error) {
    const message = error instanceof VoiceToolsApiError
      ? (error.reason ? copy.errorReasons[error.reason] ?? error.message : error.message)
      : copy.couldNotConnect;
    state.providerAvailable = false;
    setProviderStatus('error', copy.apiUnavailable);
    state.serviceMessage = message;
    setResultState('failed', message);
    rerender();
  }
}

selectors.segmentList.addEventListener('input', (event) => {
  const target = event.target as HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement;
  const segment = state.segments.find((item) => item.id === target.dataset.segmentText || item.id === target.dataset.segmentPause);
  if (!segment) return;
  if (target.dataset.segmentText) segment.text = target.value;
  if (target.dataset.segmentPause) segment.pauseAfterMs = Math.min(3000, Math.max(0, Number(target.value) || 0));
  renderState();
});

selectors.segmentList.addEventListener('change', (event) => {
  const target = event.target as HTMLSelectElement;
  const segment = state.segments.find((item) =>
    item.id === target.dataset.segmentRate ||
    item.id === target.dataset.segmentPitch ||
    item.id === target.dataset.segmentVolume
  );
  if (!segment) return;
  if (target.dataset.segmentRate) segment.rate = target.value as SegmentState['rate'];
  if (target.dataset.segmentPitch) segment.pitch = target.value as SegmentState['pitch'];
  if (target.dataset.segmentVolume) segment.volume = target.value as SegmentState['volume'];
  renderState();
});

selectors.segmentList.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-remove-segment]');
  if (!button || state.segments.length <= 1) return;
  state.segments = state.segments.filter((segment) => segment.id !== button.dataset.removeSegment);
  rerender();
});

selectors.addSegment.addEventListener('click', () => {
  if (!state.maxSegments || state.segments.length >= state.maxSegments) return;
  const segment = createSegment();
  segment.voiceId = state.selectedVoiceId;
  state.segments.push(segment);
  rerender();
});

selectors.clearSegments.addEventListener('click', () => {
  state.segments.forEach((segment) => { segment.text = ''; });
  rerender();
});

selectors.languageSelect.addEventListener('change', () => {
  state.selectedLanguage = selectors.languageSelect.value;
  state.selectedVoiceId = '';
  state.segments.forEach((segment) => { segment.voiceId = ''; });
  rerender();
});

selectors.voiceSelect.addEventListener('change', () => {
  state.selectedVoiceId = selectors.voiceSelect.value;
  state.segments.forEach((segment) => { segment.voiceId = state.selectedVoiceId; });
  rerender();
});

selectors.engineSelect.addEventListener('change', () => {
  state.selectedEngine = selectors.engineSelect.value;
  rerender();
});

selectors.generate.addEventListener('click', async () => {
  const segments = currentNonEmptySegments();
  if (!segments.length || !state.selectedVoiceId || !state.providerAvailable) return;

  state.loading = true;
  renderState();
  setResultState('generating');

  try {
    const result = await synthesizeTts({
      provider: state.selectedProvider,
      language: state.selectedLanguage || selectedVoice()?.language || '',
      engine: state.selectedEngine,
      format: state.selectedFormat,
      segments: segments.map((segment) => ({
        text: segment.text.trim(),
        voice_id: voiceIdForCurrentLanguage(segment.voiceId),
        pause_after_ms: Math.min(3000, Math.max(0, segment.pauseAfterMs)),
        rate: segment.rate,
        pitch: state.selectedEngine === 'neural' ? 'default' : segment.pitch,
        volume: segment.volume,
      })),
    });

    if (result.status !== 'ready') {
      setResultState('failed', copy.audioPending);
      return;
    }

    const audioUrl = resolveTtsAudioUrl(result.audio_url);
    selectors.audioPlayer.src = audioUrl;
    selectors.downloadLink.href = audioUrl;
    selectors.downloadLink.download = `${result.audio_id || 'voice-tools-tts'}.mp3`;
    selectors.resultProvider.textContent = providerDisplayName();
    selectors.resultVoice.textContent = voiceLabel(selectedVoice());
    selectors.resultCharacters.textContent = String(result.characters);
    selectors.resultCached.textContent = result.cached ? copy.yes : copy.no;
    if (!state.dailyQuotaFromBackend && !result.cached) {
      state.dailyCharsUsed += result.characters;
      saveLocalDailyUsage();
    }
    if (state.dailyQuotaFromBackend) {
      const providersData = await fetchTtsProviders();
      state.provider = providersData.providers.find((provider) => provider.id === state.selectedProvider) ?? state.provider;
      applyProviderLimits(state.provider);
    }
    setResultState(result.status === 'ready' ? 'ready' : 'generating');
  } catch (error) {
    if (error instanceof VoiceToolsApiError) {
      setResultState('failed', error.reason ? copy.errorReasons[error.reason] ?? error.message : error.message);
    } else {
      setResultState('failed', copy.providerFailed);
    }
  } finally {
    state.loading = false;
    renderState();
  }
});

loadLocalDailyUsage();
rerender();
loadInitialData();
