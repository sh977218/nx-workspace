import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MaterialModule } from '../material.module';

import { SearchStore } from './search.store';
import { SearchBarComponent } from './search-bar.component';
import { SearchResultComponent } from './search-result.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [
    FormsModule,
    SearchResultComponent,
    MaterialModule,
    SearchBarComponent,
  ],
})
export class SearchComponent {
  readonly store = inject(SearchStore);
  private readonly _snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.store.searchedSquads().error()) {
        this._snackBar.open('Could not load squads information', 'Close');
      }
    });
  }
}
