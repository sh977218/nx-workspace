# Angular Component Conventions

This document describes a small set of enforced conventions for Angular components in this repository.

Checklist (enforced expectations):

1. Use the latest Angular control flow syntax
   - Prefer Angular's modern structural directive micro-syntax (Angular v16+ control-flow improvements) in templates.
   - Use `*ngIf` with `as` (e.g. `*ngIf="(obs$ | async) as value"`) and `*ngFor` with `trackBy` and explicit `let` bindings.
   - Prefer readable, declarative templates over manual `ng-template` juggling where the control-flow micro-syntax covers the use case.

2. Change detection: OnPush
   - All components must use `ChangeDetectionStrategy.OnPush` to improve performance and make change detection predictable.
   - When using OnPush, prefer immutable data patterns and Observables (async pipe) to push updates to the view.

3. Styling: Tailwind utility classes, no separate CSS files
   - Do not create or add separate `.css`/`.scss` files for component styles.
   - Use Tailwind utility classes directly in the component template markup.
   - If tiny inline styles are absolutely necessary, use the `styles` array on the component decorator sparingly and keep them minimal.

Why these rules?

- The modern control-flow micro-syntax makes templates easier to read and maintain.
- OnPush change detection reduces unnecessary checks and encourages good data flow patterns.
- Tailwind utility classes keep component styles consistent and avoid style-file churn.

Component creation note: do NOT specify `standalone`

- In this repository the convention is to treat components as standalone by default; do not add the `standalone: true` property to the `@Component` decorator in new components.
- Avoid including `imports: [...]` on the component decorator as well — import dependencies via the surrounding NgModule when non-standalone patterns are being used by your team, or rely on the workspace defaults that treat components as standalone.
- If you have a special case that requires an explicit `standalone` property, add a short comment explaining why.

Examples

Minimal example (non-standalone component used inside an NgModule):

```ts
// ...existing code...
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="p-4">
      <ul>
        <li
          *ngFor="let user of users; let i = index; trackBy: trackById"
          class="flex items-center gap-2 py-2"
        >
          <span class="font-medium">{{ i + 1 }}.</span>
          <span class="flex-1">{{ user.name }}</span>
          <span class="text-sm text-gray-500">{{ user.email }}</span>
        </li>
      </ul>

      <div
        *ngIf="selectedUser$ | async as selected"
        class="mt-4 p-3 bg-gray-50 rounded"
      >
        <h4 class="font-semibold">Selected:</h4>
        <p>{{ selected.name }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Do not add styleUrls or a separate CSS file — use Tailwind classes in the template.
})
export class UserListComponent {
  @Input() users: Array<{ id: string; name: string; email?: string }> = [];
  selectedUser$ = null; // assign Observable in real use

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
// ...existing code...
```

Recommended component example (omit `standalone`):

```ts
// ...existing code...
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="flex items-center gap-2">
      <button
        (click)="decrement()"
        class="px-3 py-1 bg-red-500 text-white rounded"
      >
        -
      </button>
      <span class="px-2">{{ count$ | async }}</span>
      <button
        (click)="increment()"
        class="px-3 py-1 bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  // Use Observables and async pipe when possible with OnPush
  count$ = null; // wire up RxJS subject/observable in real code
  increment() {}
  decrement() {}
}
// ...existing code...
```

Notes and best practices

- Templates:
  - Prefer `*ngIf="obs$ | async as value"` instead of manually creating and managing `ng-template` blocks when possible.
  - Use `trackBy` on `*ngFor` especially when rendering lists that may change.

- Change detection & data flow:
  - With `OnPush`, avoid mutating arrays/objects in place. Use immutable updates (e.g., return new arrays/objects) or push updates via Observables.
  - Use the `async` pipe to subscribe to Observables in templates and to trigger change detection automatically.

- Styling:
  - Add Tailwind classes directly to your template markup.
  - If you need component-scoped styles for edge cases, prefer the `styles` array in the decorator with minimal CSS; add a short comment explaining why a non-utility style was necessary.

PR checklist (suggested for reviewers)

- [ ] Component uses `ChangeDetectionStrategy.OnPush`.
- [ ] Templates use the modern control-flow micro-syntax where applicable.
- [ ] No `.css`/`.scss` files were added for the component; styling uses Tailwind utilities.
- [ ] Observables are used with the `async` pipe where appropriate.
