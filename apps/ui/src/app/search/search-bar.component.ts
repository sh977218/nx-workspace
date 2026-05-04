import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { SearchStore } from './search.store';

@Component({
  selector: 'app-search-bar',
  template: `
    <mat-form-field appearance="fill" class="w-full mb-3">
      <mat-label>Search heroes...</mat-label>
      <input
        [value]="searchTerm()"
        (input)="onInput($event)"
        matInput
        type="search"
        placeholder="Ex. legendary"
      />
      <div matSuffix>
        <button type="submit" aria-label="Search" matIconButton>
          <mat-icon fontIcon="search"></mat-icon>
        </button>
        <button
          type="reset"
          aria-label="Reset"
          matIconButton
          (click)="onReset()"
        >
          <mat-icon fontIcon="clear"></mat-icon>
        </button>
      </div>
    </mat-form-field>
  `,
  imports: [MaterialModule, FormsModule],
})
export class SearchBarComponent {
  readonly store = inject(SearchStore);

  searchTerm = signal('');

  constructor() {
    effect(() => {
      this.store.setSearchTerm(this.searchTerm());
    });
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  onReset() {
    this.searchTerm.set('');
    this.store.reset();
  }
}
