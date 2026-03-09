import { defineConfig } from '@playwright/test';
import { devices } from '@playwright/test';   

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 10000 },

  use: {
    baseURL: 'http://localhost:5173', 
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'api',
      use: {
        baseURL: 'http://localhost:5000', 
      },
      testMatch: /api\.spec\.ts/, 
    },
    {
      name: 'ui',
      use: { ...devices['Desktop Chrome'] }, 
      testMatch: /ui\.spec\.ts/, 
    },
  ],

  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});