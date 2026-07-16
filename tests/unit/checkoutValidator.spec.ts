import { test, expect } from '@playwright/test';
import * as checkoutValidator from '../../utils/checkoutValidator';

const canCheckout =
  (checkoutValidator as any).canCheckout ??
  (checkoutValidator as any).default ??
  checkoutValidator;

test.describe('@unit Checkout Validation', () => {
  test('Allows checkout when cart has items', () => {
    expect(canCheckout(3)).toBeTruthy();
  });

  test('Prevents checkout with empty cart', () => {
    expect(canCheckout(0)).toBeFalsy();
  });
});