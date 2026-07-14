import { expect, Page } from '@playwright/test';

export class SearchPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto('https://automationexercise.com/products', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined);
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

  async searchProduct(product: string) {
    const searchInput = this.page.locator('#search_product');
    const searchButton = this.page.locator('#submit_search');

    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchButton.waitFor({ state: 'visible', timeout: 10000 });

    await searchInput.fill(product);
    await searchButton.click();
  }

  async openFirstProduct() {
    const productLink = this.page.locator('a[href*="/product_details/"]').first();
    await productLink.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await productLink.click();
  }

  async expectProductDetails() {
    await expect(this.page).toHaveURL(/product_details/, { timeout: 15000 });
  }
}