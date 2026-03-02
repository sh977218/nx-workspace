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
  jwtUrl = `${environment.api}/auth/user`;
  loginUrl = `${environment.api}/auth/login`;
  logoutUrl = `${environment.api}/auth/logout`;

  loggedInUser = signal<User | null>(null);

  users = httpResource<User[]>(() => this.usersUrl);

  isMyself(username: string) {
    return this.loggedInUser()?.username === username;
  }

  loginByUsername({
                    username,
                    password
                  }: {
    username: string;
    password: string;
  }) {
    if (username) {
      this._http
        .post<{
          jwt: string;
          user: User;
        }>(this.loginUrl, {
          username,
          password
        })
        .subscribe({
          next: ({ jwt, user }) => {
            this._localStorageService.setItem('jwt', jwt);
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
    } else {
      this.loggedInUser.set(null);
      this._snackBar.open(`No user selected`, 'Close');
    }
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

  loginByJwt() {
    this._http.get<User>(this.jwtUrl).subscribe({
      next: (user) => {
        this.loggedInUser.set(user);
        this._snackBar.open(`${user.username} logged in.`, 'Close');
        this._router.navigate(['/']);
      }
    });
  }
}
