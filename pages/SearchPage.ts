import { expect, Page } from '@playwright/test';

export class SearchPage {
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
        // Wait for the search input to be ready rather than relying on
        // networkidle, which can stall indefinitely due to ad iframes.
        await this.page
          .locator('#search_product')
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
