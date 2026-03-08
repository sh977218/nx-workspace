import { expect, test as baseTest } from '@playwright/test';
import { LoginPo } from '@shared-models/shared-models';

export const loginFixture = baseTest.extend<{
  username: string;
  password: string;
  loginPage: LoginPo;
}>({
  page: async ({ page }, use) => {
    await page.goto('/login');
    await use(page);
  },
  username: () => {
    return '';
  },
  password: () => {
    return '';
  },
  loginPage: async ({ page, username, password }, use) => {
    await expect(page).toHaveTitle(`Login`);
    const loginPage = new LoginPo(page);
    await loginPage.usernameInput.fill(username);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
    await expect(loginPage.material.snackBar.getByText(username)).toBeVisible();
    await loginPage.material.snackBar.getByRole('button').click();
    await use(loginPage);
    await loginPage.header.profileButton.click();
    await loginPage.header.logoutMenu.click();
    await expect(
      loginPage.material.snackBar.getByText('You have been logged out.')
    ).toBeVisible();
  }
});
