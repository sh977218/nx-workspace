import { Component, effect, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SearchFacade } from './search.facade';
import { SearchBarComponent } from './search-bar.component';
import { SearchResultComponent } from './search-result.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [
    FormsModule,
    SearchResultComponent,
    SearchBarComponent,
  ],
  providers: [SearchFacade],
})
export class SearchComponent {
  readonly facade = inject(SearchFacade);
  searchTermTemporary = model('');
  private readonly _snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.facade.searchedSquads.error()) {
        this._snackBar.open('Could not load squads information', 'Close');
      }
    });
  }
}
