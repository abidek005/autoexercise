import { test, expect } from '@playwright/test';
import { isSearchValid } from '../../utils/searchValidator';

test.describe('@unit Search Validation', () => {
  test('Accepts valid search', () => {
    expect(isSearchValid('Dress')).toBeTruthy();
  });

  test('Rejects empty search', () => {
    expect(isSearchValid('')).toBeFalsy();
  });
});