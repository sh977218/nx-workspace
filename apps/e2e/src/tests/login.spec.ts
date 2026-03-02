import { expect } from '@playwright/test';

import { loginFixture as test } from '../fixtures/login.fixture';

test.use({ username: 'admin_user' });
test.slow()

test('login', async ({ username, loginPage }) => {
  await expect(loginPage.material.snackBar.getByText(username)).toBeVisible();
  await loginPage.material.snackBar.getByRole('button').click();
});
