import { expect, test } from 'vitest';
import { render } from 'vitest-browser-angular';

import { SearchComponent } from '../app/search/search.component';

test('query elements', async () => {
  // Render the component
  const result = await render(SearchComponent);

  const formElement = result.container.querySelector('form');
  expect(formElement).toBeVisible();
});
