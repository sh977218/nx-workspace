import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Squad } from '@shared-models/shared-models';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

import { environment } from '../../environments/environment';
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
  private readonly http = inject(HttpClient);
  private readonly _snackBar = inject(MatSnackBar);

  readonly searchedSquads = signal<Squad[]>([]);

  constructor() {
    toObservable(this.store.searchTerm)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) =>
          searchTerm
            ? this.http.post<Squad[]>(`${environment.api}/squads`, { searchTerm })
            : this.http.get<Squad[]>(`${environment.api}/squads`),
        ),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (squads) => this.searchedSquads.set(squads),
        error: () => this._snackBar.open('Could not load squads information', 'Close'),
      });
  }
}
