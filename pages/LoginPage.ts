import { expect, Page } from '@playwright/test';

export type LoginData = {
  email: string;
  password: string;
};

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined);
  }

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

  async openLoginPage() {
    const loginLink = this.page.getByRole('link', { name: /Signup \/ Login/i });
    await loginLink.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await loginLink.click();
  }

  async expectLoginSection() {
    await expect(this.page.getByText('Login to your account')).toBeVisible({ timeout: 15000 });
  }

  async fillLoginCredentials(data: LoginData) {
    const emailField = this.page.locator('[data-qa="login-email"]');
    const passwordField = this.page.locator('[data-qa="login-password"]');

    await emailField.waitFor({ state: 'visible', timeout: 10000 });
    await passwordField.waitFor({ state: 'visible', timeout: 10000 });

    await emailField.fill(data.email);
    await passwordField.fill(data.password);
  }

  async submitLogin() {
    const loginButton = this.page.locator('[data-qa="login-button"]');
    await loginButton.waitFor({ state: 'visible', timeout: 10000 });
    await loginButton.click();
  }

  async expectInvalidCredentialsError() {
    await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible({ timeout: 15000 });
  }

  async expectLoggedIn() {
    await expect(this.page.getByText(/Logged in as/i)).toBeVisible({ timeout: 15000 });
  }

  async logout() {
    const logoutLink = this.page.getByRole('link', { name: /Logout/i });
    await logoutLink.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await logoutLink.click();
  }

  async expectLoginPage() {
    await expect(this.page).toHaveURL(/login/, { timeout: 15000 });
  }
}
