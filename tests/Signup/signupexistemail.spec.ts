import { test, expect } from '@playwright/test';

test.describe('Signup - Existing Email', () => {
  test('User cannot register with an existing email address', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    // Accept cookies if displayed
    const consentButton = page.getByRole('button', { name: 'Consent' });

    if (await consentButton.isVisible().catch(() => false)) {
      await consentButton.click();
    }

    // Navigate to Signup/Login
    await page.getByRole('link', { name: /Signup \/ Login/i }).click();

    // Verify Signup section
    await expect(page.getByText('New User Signup!')).toBeVisible();

    // Enter existing user details
    await page.locator('[data-qa="signup-name"]').fill('First');
    await page
      .locator('[data-qa="signup-email"]')
      .fill('abidek@gmail.com');

    // Click Signup
    await page.locator('[data-qa="signup-button"]').click();

    // Verify error message
    await expect(
      page.getByText('Email Address already exist!')
    ).toBeVisible();
  });
});