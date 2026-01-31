import { Locator, Page } from '@playwright/test';

export class SearchPo {
  readonly searchInput: Locator;
  readonly searchResult: Locator;
  constructor(private readonly page: Page) {
    this.searchInput = this.page.getByLabel('Search heroes...');
    this.searchResult = this.page.getByRole('search');
  }
}
