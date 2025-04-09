import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // Default: 60 seconds per test (increase as needed)
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        // launchOptions: {
        //   slowMo: 3000,   // Slowed down by 3 seconds to see the actions clearly
        // },
      },
    },
    // Uncomment these lines if you want to run tests on Firefox and Safari as well
    /*
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        headless: false,
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        headless: false,
      },
    },
    */
  ],
  reporter: [
    ['html', { open: 'never' }],
  ],  
});
