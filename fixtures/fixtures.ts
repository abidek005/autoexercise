import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { SearchPage } from '../pages/SearchPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';

import { blockAdvertisements } from '../helpers/adHelper';

type Fixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  searchPage: SearchPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await blockAdvertisements(page);
    await use(new LoginPage(page));
  },

  signupPage: async ({ page }, use) => {
    await blockAdvertisements(page);
    await use(new SignupPage(page));
  },

  searchPage: async ({ page }, use) => {
    await blockAdvertisements(page);
    await use(new SearchPage(page));
  },

  cartPage: async ({ page }, use) => {
    await blockAdvertisements(page);
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await blockAdvertisements(page);
    await use(new CheckoutPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await blockAdvertisements(page);
    await use(new PaymentPage(page));
  },
});

export { expect } from '@playwright/test';