import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await this.page
      .waitForLoadState('networkidle', { timeout: 10000 })
      .catch(() => undefined);
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
    await this.page
      .getByRole('link', { name: /Signup \/ Login/i })
      .click();

    await this.page
      .locator('[data-qa="login-email"]')
      .fill(email);

    await this.page
      .locator('[data-qa="login-password"]')
      .fill(password);

    await this.page
      .locator('[data-qa="login-button"]')
      .click();

    await expect(
      this.page.getByText(/Logged in as/i)
    ).toBeVisible({
      timeout: 10000,
    });
  }

  async openProducts() {
    await this.page
      .getByRole('link', { name: /Products/i })
      .click();
  }

  async closeAdvertisementIfVisible() {
    try {
      const frame = this.page.frameLocator(
        'iframe[name^="aswift"]'
      );

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
    const checkoutButton =
      this.page.getByText('Proceed To Checkout');

    await checkoutButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await checkoutButton.click();
  }

  async placeOrder() {
    const placeOrder =
      this.page.getByRole('link', {
        name: 'Place Order',
      });

    await placeOrder.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await placeOrder.click();
  }

  async expectPaymentPage() {
    await expect(this.page).toHaveURL(
      /payment/,
      {
        timeout: 15000,
      }
    );
  }
}