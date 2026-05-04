import { computed } from '@angular/core';
import { patchState,signalStore, withMethods, withState } from '@ngrx/signals';
import { Squad } from '@shared-models/shared-models';

export interface SearchState {
  searchTerm: string;
}

export const initialState: SearchState = {
  searchTerm: '',
};

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setSearchTerm(searchTerm: string) {
      patchState(store, { searchTerm });
    },
    reset() {
      patchState(store, { searchTerm: '' });
    },
  }))
);
