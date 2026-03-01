import { expect } from '@playwright/test';

import { searchFixture as test } from '../fixtures/search.fixture';

test('Search with result', async ({ hasSearchResult }) => {
  await hasSearchResult.searchInput.fill('hero');
  await expect(
    hasSearchResult.searchResult.getByRole('listitem')
  ).not.toHaveCount(0);
});

test('Search without result', async ({ hasNoSearchResults }) => {
  await hasNoSearchResults.searchInput.fill('aaa');
  await expect(
    hasNoSearchResults.searchResult.getByRole('listitem')
  ).not.toHaveCount(0);
});
