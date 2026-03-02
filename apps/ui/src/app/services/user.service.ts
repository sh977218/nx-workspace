import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';

import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _http = inject(HttpClient);
  private readonly _localStorageService = inject(LocalStorageService);

  usersUrl = `${environment.api}/users`;
  loginUrl = `${environment.authApi}/login`;
  logoutUrl = `${environment.authApi}/logout`;

  loggedInUser = signal<User | null>(null);

  users = httpResource<User[]>(() => this.usersUrl);

  isMyself(username: string) {
    return this.loggedInUser()?.username === username;
  }

  login(username?: string, password?: string) {
    const body: { username?: string; password?: string } = {};
    if (username) {
      body.username = username;
      body.password = password;
    }
    this._http
      .post<{
        jwt: string;
        user: User;
      }>(this.loginUrl, body)
      .subscribe({
        next: ({ jwt, user }) => {
          if (jwt) {
            this._localStorageService.setItem('jwt', jwt);
          }
          this.loggedInUser.set(user);
          this._snackBar.open(`${user.username} logged in.`, 'Close');
          this._router.navigate(['/']);
        },
        error: () => {
          this._localStorageService.removeItem('jwt');
          this.loggedInUser.set(null);
          this._snackBar.open(`Unable to login`, 'Close');
        }
      });
  }

  logout() {
    this._http.post<User>(this.logoutUrl, {}).subscribe({
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
