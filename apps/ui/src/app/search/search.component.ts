import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Squad } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';
import { MaterialModule } from '../material.module';

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
  private readonly http = inject(HttpClient);
  private readonly _snackBar = inject(MatSnackBar);

  readonly searchedSquads = signal<Squad[]>([]);

  onSearch(searchTerm: string) {
    const request = searchTerm
      ? this.http.post<Squad[]>(`${environment.api}/squads`, { searchTerm })
      : this.http.get<Squad[]>(`${environment.api}/squads`);

    request.subscribe({
      next: (squads) => this.searchedSquads.set(squads),
      error: () => this._snackBar.open('Could not load squads information', 'Close'),
    });
  }
}
