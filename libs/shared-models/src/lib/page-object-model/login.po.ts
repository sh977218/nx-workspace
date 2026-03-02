import { Locator, Page } from '@playwright/test';

import { HeaderPo } from './header.po';
import { MaterialPo } from './material.po';

export class LoginPo {
  readonly material: MaterialPo;
  readonly header: HeaderPo;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.material = new MaterialPo(page);
    this.header = new HeaderPo(page);
    this.usernameInput = this.page.getByLabel('Username');
    this.passwordInput = this.page.getByLabel('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }
}
