import { test } from '@playwright/test';
import { LoginData, LoginPage } from '../../pages/LoginPage';

test.describe('Invalid Login', () => {
  test('User cannot login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginData: LoginData = {
      email: 'invalid@test.com',
      password: 'WrongPassword123',
    };

    await loginPage.goto();
    await loginPage.acceptCookiesIfVisible();
    await loginPage.openLoginPage();
    await loginPage.expectLoginSection();
    await loginPage.fillLoginCredentials(loginData);
    await loginPage.submitLogin();
    await loginPage.expectInvalidCredentialsError();
  });
});
