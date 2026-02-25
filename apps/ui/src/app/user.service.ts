import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@shared-models/shared-models';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _http = inject(HttpClient);

  userUrl = `${environment.api}/users`;
  loginUrl = `${environment.api}/auth/login`;

  loggedInUser = signal<User | null>(null);

  users = httpResource<User[]>(() => this.userUrl);

  isMyself(username: string) {
    return this.loggedInUser()?.name === username;
  }

  login(user: User) {
    if (user) {
      this._http
        .post(this.loginUrl, {
          username: user.username,
          password: user.password
        })
        .subscribe({
          next: () => {
            this.loggedInUser.set(user);
            this._snackBar.open(`${user.username} logged in.`, 'Close');
            this._router.navigate(['/']);
          },
          error: (err) => {
            this.loggedInUser.set(null);
            this._snackBar.open(`No user selected`, 'Close');
          }
        });
    } else {
      this.loggedInUser.set(null);
      this._snackBar.open(`No user selected`, 'Close');
    }
  }

  logout() {
    this.loggedInUser.set(null);
    this._snackBar.open(`You have been logged out.`, 'Close');
  }
}
