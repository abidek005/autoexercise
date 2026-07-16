import { test, expect } from '@playwright/test';
import * as emailValidator from '../../utils/emailValidator';

const isValidEmail =
  (emailValidator as any).isValidEmail ??
  (emailValidator as any).default ??
  emailValidator;

test.describe('@unit Email Validator', () => {
  test('Accepts a valid email address', () => {
    expect(isValidEmail('john@gmail.com')).toBeTruthy();
  });

  test('Rejects an invalid email address', () => {
    expect(isValidEmail('johngmail.com')).toBeFalsy();
  });
});