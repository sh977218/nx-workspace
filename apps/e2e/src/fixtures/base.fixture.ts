import { Page, test as baseTest, TestInfo } from '@playwright/test';
import { randomBytes } from 'crypto';
import { promises as fs } from 'fs';
import { join } from 'path';

const PROJECT_ROOT_FOLDER = join(__dirname, '../..');
const NYC_OUTPUT_FOLDER = join(PROJECT_ROOT_FOLDER, 'e2e_nyc_output');

async function codeCoverage(page: Page, testInfo: TestInfo) {
  const coverage: string = await page.evaluate(
    'JSON.stringify(window.__coverage__);',
  );
  if (coverage) {
    const name = randomBytes(32).toString('hex');
    const nycOutput = join(NYC_OUTPUT_FOLDER, `${name}`);
    await fs.writeFile(nycOutput, coverage);
  } else {
    throw new Error(`No coverage found for ${testInfo.testId}`);
  }
}

export const baseFixture = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },
});

baseFixture.afterEach(async () => {
  /* empty */
});
