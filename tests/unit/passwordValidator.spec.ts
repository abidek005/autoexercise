import { test, expect } from '@playwright/test';
import { isStrongPassword } from '../../utils/passwordValidator';

test.describe('@unit @smoke Password Validator', () => {
  test('Accepts a strong password', () => {
    expect(isStrongPassword('Test123!')).toBeTruthy();
  });

  test('Rejects a weak password', () => {
    expect(isStrongPassword('abc')).toBeFalsy();
  });
});