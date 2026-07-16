import { test, expect } from '@playwright/test';

test.describe('@api @smoke @regression Login API', () => {
  test('User can successfully verify login credentials', async ({
    request,
  }) => {
    const response = await request.post(
      'https://automationexercise.com/api/verifyLogin',
      {
        form: {
          email: 'abidek@gmail.com',
          password: 'test123',
        },
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('User exists');
  });
});