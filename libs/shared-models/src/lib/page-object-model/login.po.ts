import { Locator, Page } from '@playwright/test';

import { HeaderPo } from './header.po';
import { MaterialPo } from './material.po';

export class LoginPo {
  readonly material: MaterialPo;
  readonly header: HeaderPo;
  readonly userList: Locator;
  readonly userItem: Locator;
  readonly loginButton: Locator;
  constructor(private readonly page: Page) {
    this.material = new MaterialPo(page);
    this.header = new HeaderPo(page);
    this.userList = this.page.getByRole('listbox');
    this.userItem = this.page.getByRole('listbox').getByRole('option');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }
}
