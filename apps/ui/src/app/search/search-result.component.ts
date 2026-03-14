import { HttpResourceRef } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { SquadComponent } from '@shared/shared-components/squad';
import { Squad } from '@shared-models/shared-models';

import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-search-result',
  template: `
    <h1>Search Result From Mongo DB:</h1>
    <fieldset>
      @if (squads().hasValue()) {
        @for (squad of squads().value(); track squad) {
          <div role="list">
            <lib-squad [squad]="squad" role="listitem" />
          </div>
        } @empty {
          <div id="zeroSearchResult" data-test-id="zeroSearchResult">
            <p aria-live="polite">No heroes found.</p>
          </div>
        }
      } @else if (squads().isLoading()) {
        <div class="spinner-overlay">
          <mat-spinner></mat-spinner>
        </div>
      }
    </fieldset>
  `,
  imports: [MaterialModule, SquadComponent],
  host: {
    role: 'search',
    class: 'inline-flex flex-col',
  },
})
export class SearchResultComponent {
  squads = input.required<HttpResourceRef<Squad[] | undefined>>();
}
