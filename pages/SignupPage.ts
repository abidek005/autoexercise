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

  /**
   * Constructor used to initialise the Playwright page.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the Automation Exercise home page.
   */
  async goto() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined);
  }

  /**
   * Accept the cookie banner if it is displayed.
   */
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

  /**
   * Open the Signup / Login page.
   */
  async openSignupLogin() {
    const loginLink = this.page.getByRole('link', { name: /Signup \/ Login/i });
    await loginLink.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await loginLink.click();
  }

  /**
   * Enter the user's name and email address
   * in the signup form.
   */
  async fillSignupForm(name: string, email: string) {
    const nameField = this.page.getByRole('textbox', { name: 'Name' });
    const emailField = this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address');

    await nameField.waitFor({ state: 'visible', timeout: 10000 });
    await emailField.waitFor({ state: 'visible', timeout: 10000 });

    await nameField.fill(name);
    await emailField.fill(email);
  }

  /**
   * Submit the signup form.
   */
  async submitSignup() {
    const signupButton = this.page.getByRole('button', { name: 'Signup' });
    await signupButton.waitFor({ state: 'visible', timeout: 10000 });
    await signupButton.click();
  }

  /**
   * Verify that the Account Information page is displayed.
   */
  async expectAccountInformationPage() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Enter Account Information',
      })
    ).toBeVisible({ timeout: 15000 });
  }

  /**
   * Complete the Account Information section.
   */
  async fillAccountInformation(data: SignupData) {
    await this.page.locator('#id_gender1').check();
    await this.page.locator('#password').fill(data.password);

    await this.page.locator('#days').selectOption(data.day);
    await this.page.locator('#months').selectOption(data.month);
    await this.page.locator('#years').selectOption(data.year);
  }

  /**
   * Complete the Address Information section.
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
   * Submit the Create Account form.
   */
  async createAccount() {
    const createButton = this.page.getByRole('button', {
      name: 'Create Account',
    });
    await createButton.waitFor({ state: 'visible', timeout: 10000 });
    await createButton.click();
  }

  /**
   * Verify that the account was created successfully.
   */
  async expectAccountCreated() {
    await expect(this.page.getByText('Account Created!')).toBeVisible({ timeout: 15000 });
  }

  /**
   * Continue to the application after account creation.
   */
  async continueAfterCreation() {
    const continueLink = this.page.getByRole('link', { name: 'Continue' });
    await continueLink.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await continueLink.click();
  }

  /**
   * Verify that the user is logged in.
   */
  async expectLoggedIn() {
    await expect(this.page.getByText(/Logged in as/i)).toBeVisible({ timeout: 15000 });
  }

  /**
   * Log the current user out.
   */
  async logout() {
    const logoutLink = this.page.getByRole('link', { name: /Logout/i });
    await logoutLink.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await logoutLink.click();
  }

  /**
   * Verify that the Login page is displayed.
   */
  async expectLoginPage() {
    await expect(this.page).toHaveURL(/login/, { timeout: 15000 });
  }
}
