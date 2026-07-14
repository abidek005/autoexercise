import { expect, Page } from '@playwright/test';

export class PaymentPage {
  constructor(readonly page: Page) {}

  async fillPaymentDetails(
    name: string,
    cardNumber: string,
    cvc: string,
    expiryMonth: string,
    expiryYear: string
  ) {
    await this.page
      .locator('input[name="name_on_card"]')
      .waitFor({ state: 'visible', timeout: 10000 });

    await this.page
      .locator('input[name="name_on_card"]')
      .fill(name);

    await this.page
      .locator('input[name="card_number"]')
      .fill(cardNumber);

    await this.page
      .locator('input[name="cvc"]')
      .fill(cvc);

    await this.page
      .locator('input[name="expiry_month"]')
      .fill(expiryMonth);

    await this.page
      .locator('input[name="expiry_year"]')
      .fill(expiryYear);
  }

  async clickPayAndConfirmOrder() {
    const payButton = this.page.getByRole('button', {
      name: 'Pay and Confirm Order',
    });

    await payButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await payButton.click();
  }

  async expectOrderConfirmed() {
    await expect(
      this.page.getByText('Congratulations! Your order has been confirmed!')
    ).toBeVisible({
      timeout: 15000,
    });
  }
}