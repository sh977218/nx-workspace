import { expect, test as baseTest } from '@playwright/test';
import { LoginPo } from '@shared-models/shared-models';

export const loginFixture = baseTest.extend<{
  username: string;
  loginPage: LoginPo;
}>({
  page: async ({ page }, use) => {
    await page.goto('/login');
    await use(page);
  },
  username: () => {
    return '';
  },
  loginPage: async ({ page, username }, use) => {
    await expect(page).toHaveTitle(`Login`);
    const loginPage = new LoginPo(page);
    await loginPage.userItem.filter({ hasText: username }).click();
    await loginPage.loginButton.click();
    await use(loginPage);
  }
});
