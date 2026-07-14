import { Page } from '@playwright/test';

export async function blockAdvertisements(page: Page) {
  await page.route(
    /doubleclick|googlesyndication|googleads|adservice|adsystem/,
    route => route.abort()
  );
}