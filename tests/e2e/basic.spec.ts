import { expect, test } from '@playwright/test';

test('homepage renders core directory sections', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Voice Tools Directory/);
  await expect(page.getByRole('heading', { name: 'Voice Tools Directory' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🎬 For Creators' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🎮 For Game Devs' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🤖 For Voice AI Builders' })).toBeVisible();
  await expect(page.locator('a[href^="/tools/"]:visible').first()).toBeVisible();
});

test('tool detail page renders media and navigates from category tag', async ({ page }) => {
  await page.goto('/tools/rask-ai');

  await expect(page.getByRole('heading', { name: 'Rask AI' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dubbing & Translation' })).toBeVisible();
  await expect(page.locator('#tool-video')).toBeVisible();

  await page.getByRole('link', { name: 'Dubbing & Translation' }).click();
  await expect(page).toHaveURL(/\/category\/dubbing\/?$/);
  await expect(page.getByRole('heading', { name: 'Dubbing & Translation' })).toBeVisible();
  await expect(page.locator('a[href^="/tools/"]').first()).toBeVisible();
});

test('localized Chinese routes render without falling back to English-only pages', async ({ page }) => {
  await page.goto('/zh/tools/elevenlabs');

  await expect(page.getByRole('heading', { name: 'ElevenLabs' })).toBeVisible();
  await expect(page.getByRole('link', { name: '访问官网' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '价格' })).toBeVisible();

  await page.goto('/zh/category/tts');
  await expect(page.getByRole('heading', { name: '文字转语音' })).toBeVisible();
  await expect(page.locator('a[href^="/zh/tools/"]').first()).toBeVisible();
});
