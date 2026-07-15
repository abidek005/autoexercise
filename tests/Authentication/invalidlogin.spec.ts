import { test, expect } from '../../fixtures/fixtures';

test.describe('@regression Invalid Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.acceptCookiesIfVisible();
    await loginPage.openLoginPage();
    await loginPage.expectLoginSection();
  });

  test('@regression Invalid email + valid password', async ({ loginPage }) => {
    await loginPage.fillLoginCredentials({
      email: 'invalid@test.com',
      password: 'Test123!'
    });

    await loginPage.submitLogin();
    await loginPage.expectInvalidCredentialsError();
  });

  test('@regression Valid email + invalid password', async ({ loginPage }) => {
    await loginPage.fillLoginCredentials({
      email: 'abidek@gmail.com',
      password: 'WrongPassword123'
    });

    await loginPage.submitLogin();
    await loginPage.expectInvalidCredentialsError();
  });

  test('Empty email', async ({ loginPage }) => {
    await loginPage.fillLoginCredentials({
      email: '',
      password: 'Test123!'
    });

    await loginPage.submitLogin();

    await expect(
      loginPage.page.locator('[data-qa="login-email"]')
    ).toBeFocused();
  });

  test('Empty password', async ({ loginPage }) => {
    await loginPage.fillLoginCredentials({
      email: 'abidek@gmail.com',
      password: ''
    });

    await loginPage.submitLogin();

    await expect(
      loginPage.page.locator('[data-qa="login-password"]')
    ).toBeFocused();
  });

  test('Empty email and password', async ({ loginPage }) => {
    await loginPage.fillLoginCredentials({
      email: '',
      password: ''
    });

    await loginPage.submitLogin();

    await expect(
      loginPage.page.locator('[data-qa="login-email"]')
    ).toBeFocused();
  });

  test('Invalid email format', async ({ loginPage }) => {
    await loginPage.fillLoginCredentials({
      email: 'abc.com',
      password: 'Test123!'
    });

    await loginPage.submitLogin();

    await expect(
      loginPage.page.locator('[data-qa="login-email"]')
    ).toBeFocused();
  });

  test('@regression Email with leading and trailing spaces', async ({ loginPage }) => {
    await loginPage.fillLoginCredentials({
      email: '  abidek@gmail.com  ',
      password: 'WrongPassword123'
    });

    await loginPage.submitLogin();
    await loginPage.expectInvalidCredentialsError();
  });
});