export type ApiEnvelope<T> =
  | { status: 'ok'; message: string; request_id: string; data: T }
  | {
      status: 'error';
      message: string;
      request_id: string;
      error?: { code?: string; detail?: { reason?: string } | null } | null;
    };

export type TTSProvider = {
  id: string;
  name: string;
  status: 'available' | 'disabled' | 'not_configured' | string;
  supported_features: string[];
  default_engine: string;
  formats: string[];
  limits: {
    max_chars_per_request: number;
    max_segments_per_request: number;
  };
};

export type TTSLanguage = {
  id: string;
  name: string;
};

export type TTSVoice = {
  id: string;
  name: string;
  display_name: string;
  language: string;
  gender: string;
  engines: string[];
  formats: string[];
  provider: string;
  provider_voice_id: string;
};

export type TTSProvidersResponse = {
  providers: TTSProvider[];
};

export type TTSVoicesResponse = {
  provider: string;
  languages: TTSLanguage[];
  voices: TTSVoice[];
};

export type TTSSegmentInput = {
  text: string;
  voice_id: string;
  pause_after_ms?: number;
  rate?: 'x-slow' | 'slow' | 'medium' | 'fast' | 'x-fast';
  pitch?: 'x-low' | 'low' | 'default' | 'high' | 'x-high';
  volume?: 'silent' | 'x-soft' | 'soft' | 'medium' | 'loud' | 'x-loud' | 'default';
};

export type TTSSynthesizeRequest = {
  provider: string;
  language: string;
  engine: string;
  format: string;
  segments: TTSSegmentInput[];
};

export type TTSSynthesizeResponse = {
  audio_id: string;
  audio_url: string;
  status: 'ready' | 'queued' | 'processing' | string;
  mode: 'sync' | string;
  provider: string;
  engine: string;
  format: string;
  content_type: string;
  voice_ids: string[];
  characters: number;
  estimated_cost_usd?: string;
  cached: boolean;
  expires_at?: string;
};

export class VoiceToolsApiError extends Error {
  readonly reason?: string;
  readonly requestId?: string;
  readonly code?: string;
  readonly statusCode?: number;

  constructor(message: string, options: { reason?: string; requestId?: string; code?: string; statusCode?: number } = {}) {
    super(message);
    this.name = 'VoiceToolsApiError';
    this.reason = options.reason;
    this.requestId = options.requestId;
    this.code = options.code;
    this.statusCode = options.statusCode;
  }
}

const CLIENT_ID_KEY = 'voicetools_client_id';
let inMemoryClientId = '';

function createVoiceToolsClientId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // Fall through to the non-crypto fallback.
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getVoiceToolsClientId(): string {
  if (typeof window === 'undefined') return '';

  try {
    const existing = window.localStorage.getItem(CLIENT_ID_KEY);
    if (existing) return existing;

    const next = createVoiceToolsClientId();
    window.localStorage.setItem(CLIENT_ID_KEY, next);
    return next;
  } catch {
    if (!inMemoryClientId) inMemoryClientId = createVoiceToolsClientId();
    return inMemoryClientId;
  }
}

export function voiceToolsHeaders(fingerprintId?: string): Record<string, string> {
  const clientId = getVoiceToolsClientId();
  const headers: Record<string, string> = {};

  if (clientId) {
    headers['X-VoiceTools-Client-Id'] = clientId;
  }

  if (fingerprintId) {
    headers['X-VoiceTools-Fingerprint-Id'] = fingerprintId;
  }

  return headers;
}

export function getVoiceToolsApiOrigin() {
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

export function voiceToolsApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getVoiceToolsApiOrigin()}${normalizedPath}`;
}

export function resolveTtsAudioUrl(audioUrl: string) {
  if (!audioUrl) return '';
  try {
    return new URL(audioUrl, `${getVoiceToolsApiOrigin()}/`).toString();
  } catch {
    return audioUrl;
  }
}

export function friendlyTtsError(reason?: string, fallback = 'Text to speech failed. Try again later.') {
  const messages: Record<string, string> = {
    tts_disabled: 'Text to speech is currently disabled.',
    provider_not_supported: 'This provider is not supported yet.',
    provider_not_configured: 'Amazon Polly is not configured yet.',
    voice_not_supported: 'Choose another voice.',
    engine_not_supported: 'Choose another engine.',
    format_not_supported: 'MP3 is the only supported format right now.',
    text_required: 'Enter text before generating speech.',
    text_too_long: 'Text is over the request limit.',
    too_many_segments: 'Too many text segments.',
    rate_limited: 'Too many requests. Try again later.',
    daily_budget_exceeded: 'Daily free quota has been used.',
    cost_budget_exceeded: 'Daily generation budget has been used.',
    audio_not_found: 'Audio expired. Generate it again.',
    invalid_ssml: 'Reset advanced settings and try again.',
    provider_error: 'TTS provider failed. Try again later.',
  };
  return reason ? messages[reason] ?? fallback : fallback;
}

export async function readVoiceToolsEnvelope<T>(response: Response): Promise<T> {
  let envelope: ApiEnvelope<T> | null = null;
  try {
    envelope = (await response.json()) as ApiEnvelope<T>;
  } catch {
    throw new VoiceToolsApiError('The TTS service returned an invalid response.', { statusCode: response.status });
  }

  if (!response.ok || envelope.status === 'error') {
    const reason = envelope.status === 'error' ? envelope.error?.detail?.reason : undefined;
    throw new VoiceToolsApiError(friendlyTtsError(reason, envelope.message), {
      reason,
      requestId: envelope.request_id,
      code: envelope.status === 'error' ? envelope.error?.code : undefined,
      statusCode: response.status,
    });
  }

  return envelope.data;
}

export async function fetchTtsProviders() {
  const response = await fetch(voiceToolsApiUrl('/api/voicetools/tts/providers'), {
    headers: voiceToolsHeaders(),
  });
  return readVoiceToolsEnvelope<TTSProvidersResponse>(response);
}

export async function fetchTtsVoices(params: { provider: string; language?: string; engine?: string }) {
  const query = new URLSearchParams({ provider: params.provider });
  if (params.language) query.set('language', params.language);
  if (params.engine) query.set('engine', params.engine);
  const response = await fetch(voiceToolsApiUrl(`/api/voicetools/tts/voices?${query.toString()}`), {
    headers: voiceToolsHeaders(),
  });
  return readVoiceToolsEnvelope<TTSVoicesResponse>(response);
}

export async function synthesizeTts(request: TTSSynthesizeRequest) {
  const response = await fetch(voiceToolsApiUrl('/api/voicetools/tts/synthesize'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...voiceToolsHeaders(),
    },
    body: JSON.stringify(request),
  });
  return readVoiceToolsEnvelope<TTSSynthesizeResponse>(response);
}
