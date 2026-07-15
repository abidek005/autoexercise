import { test } from '../../fixtures/fixtures';

test.describe('@smoke @regression Payment', () => {

  test.beforeEach(async ({
    checkoutPage,
    cartPage,
  }) => {

    // Open website
    await checkoutPage.goto();
    await checkoutPage.acceptCookiesIfVisible();

    // Login
    await checkoutPage.login(
      'abidek@gmail.com',
      'test123'
    );

    // Products
    await checkoutPage.openProducts();
    await checkoutPage.closeAdvertisementIfVisible();

    // Add products
    await cartPage.addProductToCart(2);

    await cartPage.addProductToCart(3);

    await cartPage.addProductToCart(4);

    // Cart
    await cartPage.openCart();

    await cartPage.expectCartPage();

    // Checkout
    await checkoutPage.proceedToCheckout();

    await checkoutPage.placeOrder();

    await checkoutPage.expectPaymentPage();

  });

  test('@smoke User can successfully complete payment', async ({
    paymentPage,
  }) => {

    await paymentPage.fillPaymentDetails(
      'First Test',
      '456798023456097',
      '102',
      '08',
      '2028'
    );

    await paymentPage.clickPayAndConfirmOrder();

    await paymentPage.expectOrderConfirmed();

  });

});