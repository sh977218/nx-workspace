import { Locator, Page } from '@playwright/test';

export class HeaderPo {
  private readonly CONTAINER = 'app-header';
  readonly profileButton: Locator;
  readonly profileMenu: Locator;
  readonly logoutMenu: Locator;

  constructor(private readonly page: Page) {
    this.profileButton = this.page.locator(this.CONTAINER).getByRole('button').filter({ hasText: 'person' });
    this.profileMenu = this.page.getByRole('menuitem', { name: 'Profile' });
    this.logoutMenu = this.page.getByRole('menuitem', { name: 'Logout' });
  }
}
