import { test } from '@playwright/test';
import { LoginData, LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  test('User can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginData: LoginData = {
      email: 'abidek@gmail.com',
      password: 'test123',
    };

    await loginPage.goto();
    await loginPage.acceptCookiesIfVisible();
    await loginPage.openLoginPage();
    await loginPage.expectLoginSection();
    await loginPage.fillLoginCredentials(loginData);
    await loginPage.submitLogin();
    await loginPage.expectLoggedIn();
    await loginPage.logout();
    await loginPage.expectLoginPage();
  });
});
