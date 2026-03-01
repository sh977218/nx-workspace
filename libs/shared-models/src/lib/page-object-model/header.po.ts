import { Locator, Page } from '@playwright/test';

export class HeaderPo {
  private readonly CONTAINER = '.app-header';
  readonly profileButton: Locator;
  readonly profileMenu: Locator;

  constructor(private readonly page: Page) {
    this.profileButton = this.page.locator(this.CONTAINER).getByRole('button', { name: '' });
    this.profileMenu = this.page.getByRole('menuitem', { name: 'Profile' });
  }
}
