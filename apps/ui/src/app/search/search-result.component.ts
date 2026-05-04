import { Component, input, WritableSignal } from '@angular/core';
import { SquadComponent } from '@shared/shared-components/squad';
import { Squad } from '@shared-models/shared-models';

import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-search-result',
  template: `
    <h1>Search Result From Mongo DB:</h1>
    <fieldset>
      @if (squads()().length > 0) {
        @for (squad of squads()(); track squad) {
          <div role="list">
            <lib-squad [squad]="squad" role="listitem" />
          </div>
        }
      } @else {
        <div id="zeroSearchResult" data-test-id="zeroSearchResult">
          <p aria-live="polite">No heroes found.</p>
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
  squads = input.required<WritableSignal<Squad[]>>();
}
