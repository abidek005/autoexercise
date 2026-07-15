import { test } from '../../fixtures/fixtures';

test.describe('@regression Shopping Cart', () => {
  test('Add multiple products to cart', async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.acceptCookiesIfVisible();

    // Add Product ID 2
    await cartPage.addProductToCart(2);

    // Add Product ID 3
    await cartPage.addProductToCart(3);

    // Open Cart
    await cartPage.openCart();

    // Verify Cart Page
    await cartPage.expectCartPage();
  });
});