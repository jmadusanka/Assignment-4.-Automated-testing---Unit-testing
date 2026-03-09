import { test, expect } from '@playwright/test';

test.describe('Dog API Tests', () => {
  test('Test 1 - Positive API call: get random dog image returns 200 with valid data', async ({ request }) => {
    const response = await request.get('/api/dogs/random');

    await expect(response).toBeOK();
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
    expect(typeof body.data.imageUrl).toBe('string');
    expect(body.data.imageUrl).toMatch(/^https:\/\/images\.dog\.ceo\/breeds\//);
    expect(body.data.status).toBe('success');
  });

  test('Test 2 - Negative API call: invalid route returns 404  with error message', async ({ request }) => {
    const response = await request.get('/api/dogs/invalid-url-doburman');

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
    expect(body.error.toLowerCase()).toContain('not found');
  });
});