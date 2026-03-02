import { Locator, Page } from '@playwright/test';

export class MaterialPo {
  readonly snackBar: Locator;

  constructor(private readonly page: Page) {
    this.snackBar = this.page.locator('mat-snack-bar-container');
  }
}
