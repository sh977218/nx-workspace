import { Component } from '@angular/core';
import { expect, test } from 'vitest';
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
  const result = await render(MyComponent);

  // Test that the search form is rendered
  const formElement = result.container.querySelector('form');
  await expect(formElement).toBeVisible();
});
