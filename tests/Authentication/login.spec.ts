import { test, expect } from '../../fixtures/fixtures';
import { LoginData } from '../../pages/LoginPage';

test.describe('Login', () => {
  test('User can login with valid credentials', async ({ loginPage }) => {
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
