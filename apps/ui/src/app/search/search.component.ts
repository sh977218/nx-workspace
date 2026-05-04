import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MaterialModule } from '../material.module';

import { SearchStore } from './search.store';
import { SearchBarComponent } from './search-bar.component';
import { SearchResultComponent } from './search-result.component';
import { environment } from '../../environments/environment';
import { Squad } from '@shared-models/shared-models';

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

  constructor() {
    effect(() => {
      const searchTerm = this.store.searchTerm();
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
