import { test, expect } from '@playwright/test';
import { applyDiscount } from '../../utils/discountCalculator';

test.describe('@unit Discount Calculator', () => {
  test('Applies discount correctly', () => {
    expect(applyDiscount(1000, 10)).toBe(900);
  });

  test('Returns original price when discount is zero', () => {
    expect(applyDiscount(1000, 0)).toBe(1000);
  });
});