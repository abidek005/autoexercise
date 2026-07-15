import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 1,

  workers: 2,

  timeout: 60 * 1000,

  expect: {
    timeout: 10000,
  },

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'https://automationexercise.com',

    headless: true,

    viewport: {
      width: 1920,
      height: 1080,
    },

    actionTimeout: 15000,
    navigationTimeout: 60000,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],

  outputDir: 'test-results',

  // Uncomment if your application needs to be started before tests run.
  /*
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});
