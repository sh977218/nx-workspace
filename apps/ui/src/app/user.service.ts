import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '@shared-models/shared-models';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  userUrl = `${environment.api}/users`;

  loggedInUser = signal<User | null>(null);

  users = httpResource<User[]>(() => this.userUrl);

  isMyself(username: string) {
    return this.loggedInUser()?.name === username;
  }
}
