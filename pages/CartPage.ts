import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(readonly page: Page) {}

  async goto() {
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.page.goto('https://automationexercise.com/products', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      const heavyLoadHeading = this.page.getByRole('heading', {
        name: /under heavy load/i,
      });

      const isHeavyLoad = await heavyLoadHeading.isVisible().catch(() => false);

      if (!isHeavyLoad) {
        // Anchor on the first product card rather than networkidle, which
        // stalls indefinitely due to ad iframes on this site.
        await this.page
          .locator('.productinfo')
          .first()
          .waitFor({ state: 'visible', timeout: 20000 });

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
    const consentButton = this.page.getByRole('button', { name: 'Consent' });

    try {
      await consentButton.first().waitFor({ state: 'visible', timeout: 5000 });
      if (await consentButton.count()) {
        await consentButton.first().click();
      }
    } catch {
      // Ignore when the consent banner is not present.
    }
  }

  async addProductToCart(productId: number) {
    const productCard = this.page.locator(`.productinfo:has(a[data-product-id="${productId}"])`);
    const addButton = productCard.locator(`a[data-product-id="${productId}"]`).first();
    const continueButton = this.page.locator('.btn.btn-success.close-modal').first();

    await productCard.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await productCard.hover();
    await addButton.waitFor({ state: 'visible', timeout: 10000 });
    await addButton.click();

    // Wait for the modal to appear
    await this.page
      .waitForSelector('.btn.btn-success.close-modal', { timeout: 10000 })
      .catch(() => undefined);
    await continueButton.click().catch(() => undefined);
  }

  async openCart() {
    const cartLink = this.page.locator('a[href="/view_cart"]').first();
    await cartLink.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await cartLink.click();
  }

  async expectCartPage() {
    await expect(this.page).toHaveURL(/view_cart/, { timeout: 15000 });
  }
}
