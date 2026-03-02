import { expect } from '@playwright/test';

import { baseFixture as test } from '../fixtures/base.fixture';

test('Three JS', async ({ page }) => {
  await page.getByRole('link', { name: 'Three JS' }).click();
  await expect(page).toHaveTitle(`Three Js`);
});
