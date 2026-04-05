import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RssSchema } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';

@Component({
  imports: [MatProgressSpinnerModule, MatCardModule, MatIconModule, MatListModule, DatePipe],
  templateUrl: './feed.component.html',
  host: {
    class: 'flex flex-col',
  },
})
export class FeedComponent {
  feedUrl = `${environment.api}/feed`;

  feed = httpResource(() => this.feedUrl, {
    parse: RssSchema.parse,
  });
}
