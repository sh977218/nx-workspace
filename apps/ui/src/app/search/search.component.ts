import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Squad } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';
import { MaterialModule } from '../material.module';
import { debounceSignal } from '../utility';

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
  private readonly http = inject(HttpClient);
  private readonly _snackBar = inject(MatSnackBar);

  readonly searchedSquads = signal<Squad[]>([]);
  private readonly debouncedSearchTerm = debounceSignal(this.store.searchTerm, 300);

  constructor() {
    effect(() => {
      const searchTerm = this.debouncedSearchTerm();
      if (searchTerm) {
        this.http.post<Squad[]>(`${environment.api}/squads`, { searchTerm }).subscribe({
          next: (squads) => this.searchedSquads.set(squads),
          error: () => this._snackBar.open('Could not load squads information', 'Close'),
        });
      } else {
        this.http.get<Squad[]>(`${environment.api}/squads`).subscribe({
          next: (squads) => this.searchedSquads.set(squads),
          error: () => this._snackBar.open('Could not load squads information', 'Close'),
        });
      }
    });
  }
}
