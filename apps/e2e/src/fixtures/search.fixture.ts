import { expect, test as baseTest } from '@playwright/test';
import { SearchPo } from '@shared-models/shared-models';

export const searchFixture = baseTest.extend<{
  hasSearchResult: SearchPo;
  hasNoSearchResults: SearchPo;
}>({
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },
  hasSearchResult: async ({ page }, use) => {
    await page.getByRole('link', { name: 'Search' }).click();
    await expect(page).toHaveTitle(`Search`);
    const searchPage = new SearchPo(page);
    await use(searchPage);
    await expect(searchPage.searchResult).toBeVisible();
  },
  hasNoSearchResults: async ({ page }, use) => {
    await page.getByRole('link', { name: 'Search' }).click();
    await expect(page).toHaveTitle(`Search`);
    const searchPage = new SearchPo(page);
    await use(searchPage);
    await expect(
      searchPage.searchResult.getByText('No heroes found.')
    ).toBeVisible();
  }
});
