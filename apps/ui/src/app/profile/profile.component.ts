import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';

@Component({
  imports: [],
  template: ` Welcome to the Profile Page! `,
  host: {
    class: 'flex items-center justify-center',
  },
})
export class ProfileComponent {
  userUrl = `${environment.api}/users/me`;

  profile = httpResource<User>(() => this.userUrl);
}
