import { test, expect } from '@playwright/test';
import { calculateCartTotal } from '../../utils/cartCalculator';

test.describe('@unit Cart Calculator', () => {
  test('Calculates cart total correctly', () => {
    expect(calculateCartTotal(400, 3)).toBe(1200);
  });

  test('Returns zero when quantity is zero', () => {
    expect(calculateCartTotal(400, 0)).toBe(0);
  });
});