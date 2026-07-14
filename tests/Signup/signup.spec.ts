import { test } from '@playwright/test';
import { SignupData, SignupPage } from '../../pages/SignupPage';

test('User can register a new account', async ({ page }) => {
  const signupPage = new SignupPage(page);
  const email = `test${Date.now()}@gmail.com`;
  const signupData: SignupData = {
    name: 'First',
    email,
    password: 'Test123!',
    day: '2',
    month: '4',
    year: '2015',
    firstName: 'First',
    lastName: 'Test',
    company: 'MCG',
    address: '38 Hoy Drive',
    country: 'United States',
    state: 'California',
    city: 'Miami',
    zipcode: '20465',
    mobileNumber: '8000987865',
  };

  await signupPage.goto();
  await signupPage.acceptCookiesIfVisible();
  await signupPage.openSignupLogin();
  await signupPage.fillSignupForm(signupData.name, signupData.email);
  await signupPage.submitSignup();
  await signupPage.expectAccountInformationPage();
  await signupPage.fillAccountInformation(signupData);
  await signupPage.fillAddressInformation(signupData);
  await signupPage.createAccount();
  await signupPage.expectAccountCreated();
  await signupPage.continueAfterCreation();
  await signupPage.expectLoggedIn();
  await signupPage.logout();
  await signupPage.expectLoginPage();
});
