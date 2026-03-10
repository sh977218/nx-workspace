import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env['CI'];

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = isCI ? 'http://localhost:3000' : 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src/tests' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  globalSetup: require.resolve('./src/global-setup'),
  timeout: 30 * 1000,
  expect: {
    timeout: 15000
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 0,
  workers: '70%',
  reporter: [['html']],
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    actionTimeout: 0,
    trace: 'on',
    video: 'on',
    screenshot: 'on'
  },
  /* Run your local dev server before starting the tests */
  webServer: isCI
    ? [
      {
        command: 'NODE_ENV=ci node dist/apps/api',
        port: 3000,
        reuseExistingServer: true,
        cwd: workspaceRoot
      }
    ]
    : [
      {
        command: 'nx run ui:serve',
        port: 4200,
        reuseExistingServer: true,
        cwd: workspaceRoot
      },
      {
        command: 'nx run api:serve',
        port: 3000,
        reuseExistingServer: true,
        cwd: workspaceRoot
      }
    ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
