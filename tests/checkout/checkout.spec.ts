import { test } from '../../fixtures/fixtures';

test.describe('Checkout', () => {
  test.beforeEach(async ({ checkoutPage }) => {
    await checkoutPage.goto();
    await checkoutPage.acceptCookiesIfVisible();

    await checkoutPage.login(
      'abidek@gmail.com',
      'test123'
    );

    await checkoutPage.openProducts();
    await checkoutPage.closeAdvertisementIfVisible();
  });

  test('User can checkout multiple products', async ({ cartPage, checkoutPage }) => {

    await cartPage.addProductToCart(2);

    await cartPage.addProductToCart(3);

    await cartPage.addProductToCart(4);

    await cartPage.openCart();

    await cartPage.expectCartPage();

    await checkoutPage.proceedToCheckout();

    await checkoutPage.placeOrder();

    await checkoutPage.expectPaymentPage();

  });

});