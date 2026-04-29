const rawGithubRepo = import.meta.env.PUBLIC_GITHUB_REPO?.trim() ?? '';

export const GITHUB_REPO = rawGithubRepo && !rawGithubRepo.includes('YOUR_')
  ? rawGithubRepo.replace(/^https:\/\/github\.com\//, '').replace(/\/$/, '')
  : '';

export const GITHUB_BASE_URL = GITHUB_REPO ? `https://github.com/${GITHUB_REPO}` : '';

export function githubUrl(path = '') {
  if (!GITHUB_BASE_URL) return '';
  return `${GITHUB_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function githubEditUrl(filePath: string) {
  return githubUrl(`/edit/main/${filePath.replace(/^\/+/, '')}`);
}

export const GISCUS = {
  repo: GITHUB_REPO,
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID?.trim() ?? '',
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY?.trim() || 'Tool Discussions',
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID?.trim() ?? '',
};

export const GISCUS_ENABLED = Boolean(
  GISCUS.repo
  && GISCUS.repoId
  && GISCUS.category
  && GISCUS.categoryId
  && !GISCUS.repoId.includes('YOUR_')
  && !GISCUS.categoryId.includes('YOUR_')
);
