import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _http = inject(HttpClient);

  usersUrl = `${environment.api}/users`;
  loginUrl = `${environment.api}/auth/login`;
  logoutUrl = `${environment.api}/auth/logout`;
  userUrl = `${environment.api}/users/me`;

  loggedInUser = signal<User | null>(null);

  users = httpResource<User[]>(() => this.usersUrl);

  isMyself(username: string) {
    return this.loggedInUser()?.username === username;
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
          error: () => {
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
    this._http.get<User>(this.logoutUrl).subscribe({
      next: () => {
        this.loggedInUser.set(null);
        this._snackBar.open(`You have been logged out.`, 'Close');
      },
      error: () => {
        this._snackBar.open(`Unable to log out.`, 'Close');
      }
    });
  }
}
