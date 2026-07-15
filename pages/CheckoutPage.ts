import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(readonly page: Page) {}

  async goto() {
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.page.goto('https://automationexercise.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      const heavyLoadHeading = this.page.getByRole('heading', {
        name: /under heavy load/i,
      });

      const isHeavyLoad = await heavyLoadHeading.isVisible().catch(() => false);

      if (!isHeavyLoad) {
        await this.page.locator('a[href="/login"]').waitFor({ state: 'visible', timeout: 20000 });

        return;
      }

      await this.page.reload({
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
    }

    throw new Error('Automation Exercise is still under heavy load after retries.');
  }

  async acceptCookiesIfVisible() {
    const consentButton = this.page.getByRole('button', {
      name: 'Consent',
    });

    try {
      await consentButton.first().waitFor({
        state: 'visible',
        timeout: 5000,
      });

      if (await consentButton.count()) {
        await consentButton.first().click();
      }
    } catch {
      // Ignore when consent banner isn't displayed.
    }
  }

  async login(email: string, password: string) {
    await this.page.getByRole('link', { name: /Signup \/ Login/i }).click();

    await this.page.locator('[data-qa="login-email"]').fill(email);

    await this.page.locator('[data-qa="login-password"]').fill(password);

    await this.page.locator('[data-qa="login-button"]').click();

    await expect(this.page.getByText(/Logged in as/i)).toBeVisible({
      timeout: 10000,
    });
  }

  async openProducts() {
    await this.page.getByRole('link', { name: /Products/i }).click();
  }

  async closeAdvertisementIfVisible() {
    try {
      const frame = this.page.frameLocator('iframe[name^="aswift"]');

      const closeButton = frame.getByRole('button', {
        name: /Close ad/i,
      });

      await closeButton.waitFor({
        state: 'visible',
        timeout: 3000,
      });

      await closeButton.click();
    } catch {
      // Ignore if advertisement is not displayed.
    }
  }

  async proceedToCheckout() {
    const checkoutButton = this.page.getByText('Proceed To Checkout');

    await checkoutButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await checkoutButton.click();
  }

  async placeOrder() {
    const placeOrder = this.page.getByRole('link', {
      name: 'Place Order',
    });

    await placeOrder.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await placeOrder.click();
  }

  async expectPaymentPage() {
    await expect(this.page).toHaveURL(/payment/, {
      timeout: 15000,
    });
  }
}
