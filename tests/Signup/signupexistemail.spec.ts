import { test, expect } from '../../fixtures/fixtures';
import { SignupData } from '../../pages/SignupPage';

test.describe('Signup - Existing Email', () => {
  test('User cannot register with an existing email address', async ({ signupPage }) => {
    await signupPage.goto();
    await signupPage.acceptCookiesIfVisible();

    await signupPage.openSignupLogin();

    // Verify Signup section
    await expect(signupPage.page.getByText('New User Signup!')).toBeVisible({ timeout: 15000 });

    // Enter existing user details
    const signupData: SignupData = {
      name: 'First',
      email: 'abidek@gmail.com',
      password: 'Test123!',
      day: '1',
      month: '1',
      year: '1990',
      firstName: 'First',
      lastName: 'Test',
      company: 'Test',
      address: 'Test Address',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobileNumber: '1234567890',
    };

    await signupPage.fillSignupForm(signupData.name, signupData.email);
    await signupPage.submitSignup();

    // Verify error message
    await expect(
      signupPage.page.getByText('Email Address already exist!')
    ).toBeVisible({ timeout: 15000 });
  });
});