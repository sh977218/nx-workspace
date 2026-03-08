import { expect } from '@playwright/test';

import { loginFixture as test } from '../fixtures/login.fixture';

test.use({ username: 'admin_user', password: 'Password123!' });

test('profile', async ({ page, username, loginPage }) => {
  await loginPage.header.profileButton.click();
  await loginPage.header.profileMenu.click();
  await expect(page.getByText(username)).toBeVisible();
});
