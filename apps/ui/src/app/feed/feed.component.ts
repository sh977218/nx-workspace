import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { RssSchema } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';
import { MaterialModule } from '../material.module';

@Component({
  imports: [CommonModule, MaterialModule],
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
