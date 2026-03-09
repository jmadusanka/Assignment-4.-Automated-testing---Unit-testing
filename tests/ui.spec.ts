import { test, expect } from '@playwright/test';

test.describe('Dog App UI / E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Test 3 - Positive E2E: On page load image is retrieved using https and src tag is correct', async ({ page }) => {
    const img = page.locator('img[alt="Random dog"]');

    await expect(img).toBeVisible({ timeout: 15000 });

    const src = await img.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).toMatch(/^https:\/\//);
    expect(src).toMatch(/images\.dog\.ceo/);
  });

  test('Test 4 - Positive E2E: Click button and fetches new image', async ({ page }) => {
    const img = page.locator('img[alt="Random dog"]');

    await expect(img).toBeVisible({ timeout: 10000 });
    const firstSrc = await img.getAttribute('src');

    await page.getByRole('button', { name: /get another dog/i }).click();

    await expect(img).not.toHaveAttribute('src', firstSrc!, { timeout: 15000 });

    const newSrc = await img.getAttribute('src');
    expect(newSrc).toMatch(/^https:\/\//);
    expect(newSrc).toMatch(/images\.dog\.ceo/);
  });

  test('Test 5 - Negative E2E: When API call fails then display the error message', async ({ page }) => {
    await page.route('**/api/dogs/random', route => route.abort('failed'));

    await page.getByRole('button', { name: /get another dog/i }).click();

    await page.waitForTimeout(1500);

    const errorContainer = page.locator('.error');
    await expect(errorContainer).toBeVisible({ timeout: 10000 });

    await expect(page.getByText(/error/i)).toBeVisible();

    await expect(page.getByText(/make sure the server is running/i)).toBeVisible();
  });
});