function cleanVideoId(value: string | undefined | null): string | undefined {
  const id = value?.trim();
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : undefined;
}

export function getYouTubeVideoId(rawUrl: string): string | undefined {
  const directId = cleanVideoId(rawUrl);
  if (directId) return directId;

  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      return cleanVideoId(url.pathname.split('/').filter(Boolean)[0]);
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com' || hostname === 'music.youtube.com') {
      const watchId = cleanVideoId(url.searchParams.get('v'));
      if (watchId) return watchId;

      const [section, id] = url.pathname.split('/').filter(Boolean);
      if (section === 'embed' || section === 'shorts' || section === 'live') {
        return cleanVideoId(id);
      }
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function getYouTubeEmbedUrl(rawUrl: string): string | undefined {
  const videoId = getYouTubeVideoId(rawUrl);
  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : undefined;
}
