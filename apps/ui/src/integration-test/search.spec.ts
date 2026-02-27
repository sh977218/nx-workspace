import { Component } from '@angular/core';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-angular';

import { SearchComponent } from '../app/search/search.component';

@Component({
  template: `
    <app-search /> `,
  imports: [
    SearchComponent
  ]
})
export class MyComponent {
}

test('query elements', async () => {
  // Render the component
  await render(MyComponent);

  // Test that the search form is rendered
  const zeroSearchResult = page.getByTestId('zeroSearchResult');
  await expect.element(zeroSearchResult).toBeVisible();
});
