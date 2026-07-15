import { expect, Page } from '@playwright/test';

/**
 * Test data required to create a new user account.
 */
export type SignupData = {
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

/**
 * Page Object Model for the Automation Exercise
 * Signup and Account Creation page.
 */
export class SignupPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the Automation Exercise home page.
   */
  async goto() {
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.page.goto('https://automationexercise.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      const heavyLoadHeading = this.page.getByRole('heading', {
        name: /under heavy load/i,
      });

      const isHeavyLoad = await heavyLoadHeading
        .isVisible()
        .catch(() => false);

      if (!isHeavyLoad) {
        await this.page
          .waitForLoadState('networkidle', { timeout: 10000 })
          .catch(() => undefined);

        return;
      }

      await this.page.reload({
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
    }

    throw new Error(
      'Automation Exercise is still under heavy load after retries.'
    );
  }

  /**
   * Accept the cookie banner if displayed.
   */
  async acceptCookiesIfVisible() {
    const consentButton = this.page.getByRole('button', {
      name: 'Consent',
    });

    try {
      await consentButton.waitFor({
        state: 'visible',
        timeout: 5000,
      });

      await consentButton.click();
    } catch {
      // Cookie banner not displayed.
    }
  }

  /**
   * Open the Signup / Login page.
   */
  async openSignupLogin() {
    const loginLink = this.page.locator('a[href="/login"]');

    await expect(loginLink).toBeVisible({
      timeout: 10000,
    });

    await Promise.all([this.page.waitForURL('**/login'), loginLink.click()]);
  }

  /**
   * Enter name and email into the Signup form.
   */
  async fillSignupForm(name: string, email: string) {
    const nameField = this.page.getByRole('textbox', {
      name: 'Name',
    });

    const emailField = this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address');

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();

    await nameField.fill(name);
    await emailField.fill(email);
  }

  /**
   * Submit the Signup form.
   */
  async submitSignup() {
    const signupButton = this.page.locator('[data-qa="signup-button"]');

    await expect(signupButton).toBeVisible({ timeout: 10000 });

    await signupButton.click({
      noWaitAfter: true,
    });
  }

  /**
   * Verify duplicate email error message is shown.
   */
  async expectExistingEmailError() {
    await expect(this.page.getByText('Email Address already exist!')).toBeVisible({
      timeout: 15000,
    });
  }

  /**
   * Verify Account Information page.
   */
  async expectAccountInformationPage() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Enter Account Information',
      })
    ).toBeVisible({
      timeout: 15000,
    });
  }

  /**
   * Complete Account Information.
   */
  async fillAccountInformation(data: SignupData) {
    await this.page.locator('#id_gender1').check();

    await this.page.locator('#password').fill(data.password);

    await this.page.locator('#days').selectOption(data.day);

    await this.page.locator('#months').selectOption(data.month);

    await this.page.locator('#years').selectOption(data.year);
  }

  /**
   * Complete Address Information.
   */
  async fillAddressInformation(data: SignupData) {
    await this.page.locator('#first_name').fill(data.firstName);

    await this.page.locator('#last_name').fill(data.lastName);

    await this.page.locator('#company').fill(data.company);

    await this.page.locator('#address1').fill(data.address);

    await this.page.locator('#country').selectOption(data.country);

    await this.page.locator('#state').fill(data.state);

    await this.page.locator('#city').fill(data.city);

    await this.page.locator('#zipcode').fill(data.zipcode);

    await this.page.locator('#mobile_number').fill(data.mobileNumber);
  }

  /**
   * Submit Create Account form.
   */
  async createAccount() {
    const createButton = this.page.locator('[data-qa="create-account"]');

    await expect(createButton).toBeVisible();

    await createButton.click();

    await expect(this.page.getByText('Account Created!')).toBeVisible({
      timeout: 15000,
    });
  }

  /**
   * Verify Account Created page.
   */
  async expectAccountCreated() {
    await expect(this.page.getByText('Account Created!')).toBeVisible({
      timeout: 15000,
    });
  }

  /**
   * Continue after account creation.
   */
  async continueAfterCreation() {
    const continueButton = this.page.getByRole('link', {
      name: 'Continue',
    });

    await expect(continueButton).toBeVisible();

    await continueButton.click();
  }

  /**
   * Verify user is logged in.
   */
  async expectLoggedIn() {
    await expect(this.page.getByText(/Logged in as/i)).toBeVisible({
      timeout: 15000,
    });
  }

  /**
   * Logout.
   */
  async logout() {
    const logoutLink = this.page.locator('a[href="/logout"]');

    await expect(logoutLink).toBeVisible();

    await logoutLink.click();
  }

  /**
   * Verify Login page.
   */
  async expectLoginPage() {
    await expect(this.page).toHaveURL(/login/, {
      timeout: 15000,
    });
  }
}
