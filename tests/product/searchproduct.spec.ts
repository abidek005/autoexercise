import { test } from '../../fixtures/fixtures';

test.describe('@regression Product Search', () => {
  test('Search for Winter Top and open product details', async ({ searchPage }) => {
    await searchPage.goto();
    await searchPage.acceptCookiesIfVisible();

    await searchPage.searchProduct('Winter Top');

    await searchPage.openFirstProduct();

    await searchPage.expectProductDetails();
  });
});