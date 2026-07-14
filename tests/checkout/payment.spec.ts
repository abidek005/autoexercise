import { test, expect } from '../../fixtures/fixtures';

test.describe('Payment', () => {
  test.beforeEach(async ({
    loginPage,
    cartPage,
    checkoutPage,
  }) => {
    // Login
    await loginPage.goto();
    await loginPage.acceptCookiesIfVisible();
    await loginPage.openLoginPage();

    await loginPage.fillLoginCredentials({
      email: 'abidek@gmail.com',
      password: 'test123',
    });

    await loginPage.submitLogin();
    await loginPage.expectLoggedIn();

    // Add products
    await cartPage.goto();

    await cartPage.addProductToCart(2);
    await cartPage.addProductToCart(3);
    await cartPage.addProductToCart(4);

    // Open cart
    await cartPage.openCart();
    await cartPage.expectCartPage();

    // Proceed to payment page
    await checkoutPage.proceedToCheckout();
    await checkoutPage.placeOrder();
  });

  test('User can successfully complete payment', async ({
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