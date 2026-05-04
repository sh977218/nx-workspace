import { httpResource } from '@angular/common/http';
import { computed } from '@angular/core';
import { patchState,signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Squad } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';

export interface SearchState {
  searchTerm: string;
}

export const initialState: SearchState = {
  searchTerm: '',
};

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    searchedSquads: computed(() => httpResource<Squad[]>(() => {
      const searchTerm = store.searchTerm();
      if (searchTerm) {
        return {
          url: `${environment.api}/squads`,
          method: 'POST',
          body: { searchTerm },
        };
      }
      return {
        url: `${environment.api}/squads`,
      };
    })),
  })),
  withMethods((store) => ({
    setSearchTerm(searchTerm: string) {
      patchState(store, { searchTerm });
    },
    reset() {
      patchState(store, { searchTerm: '' });
    },
  }))
);
