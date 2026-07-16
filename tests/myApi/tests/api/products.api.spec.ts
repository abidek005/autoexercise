import { test, expect } from '@playwright/test';

test('@api @smoke @regression Get Products API', async ({ request }) => {
  const response = await request.get(
    'https://automationexercise.com/api/productsList'
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.text();

  expect(body).toContain('products');
});