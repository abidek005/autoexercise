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

  async openLoginPage() {
    const loginLink = this.page.locator('a[href="/login"]');

    await expect(loginLink).toBeVisible({
      timeout: 10000,
    });

    await Promise.all([
      this.page.waitForURL('**/login', {
        timeout: 15000,
      }),
      loginLink.click(),
    ]);
  }

  async expectLoginSection() {
    await expect(this.page).toHaveURL(/login/, {
      timeout: 15000,
    });

    await expect(
      this.page.locator('[data-qa="login-email"]')
    ).toBeVisible();

    await expect(
      this.page.locator('[data-qa="login-password"]')
    ).toBeVisible();

    await expect(
      this.page.locator('[data-qa="login-button"]')
    ).toBeVisible();
  }

  async fillLoginCredentials(data: LoginData) {
    const emailField = this.page.locator('[data-qa="login-email"]');
    const passwordField = this.page.locator('[data-qa="login-password"]');

    await emailField.fill(data.email);
    await passwordField.fill(data.password);
  }

  async submitLogin() {
    await this.page.locator('[data-qa="login-button"]').click();
  }

  async expectInvalidCredentialsError() {
    await expect(
      this.page.getByText('Your email or password is incorrect!')
    ).toBeVisible({
      timeout: 15000,
    });
  }

  async expectLoggedIn() {
    await expect(
      this.page.getByText(/Logged in as/i)
    ).toBeVisible({
      timeout: 15000,
    });
  }

  async logout() {
    const logoutLink = this.page.locator('a[href="/logout"]');

    await expect(logoutLink).toBeVisible({
      timeout: 10000,
    });

    await logoutLink.click();
  }

  async expectLoginPage() {
    await expect(this.page).toHaveURL(/login/, {
      timeout: 15000,
    });
  }
}