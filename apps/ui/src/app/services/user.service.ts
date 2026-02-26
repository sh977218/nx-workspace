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
  loginUrl = `${environment.api}/auth/login`;
  userUrl = `${environment.api}/users/me`;

  loggedInUser = signal<User | null>(null);

  users = httpResource<User[]>(() => this.usersUrl);

  isMyself(username: string) {
    return this.loggedInUser()?.name === username;
  }

  loginByUser(user: User) {
    if (user) {
      this._http
        .post<{ access_token: string }>(this.loginUrl, {
          username: user.username,
          password: user.password
        })
        .subscribe({
          next: ({ access_token }) => {
            this._localStorageService.setItem('jwt', access_token);
            this.loggedInUser.set(user);
            this._snackBar.open(`${user.username} logged in.`, 'Close');
            this._router.navigate(['/']);
          },
          error: () => {
            this._localStorageService.removeItem('jwt');
            this.loggedInUser.set(null);
            this._snackBar.open(`No user selected`, 'Close');
          }
        });
    } else {
      this.loggedInUser.set(null);
      this._snackBar.open(`No user selected`, 'Close');
    }
  }

  loginByJwt() {
    this._http.get<User>(this.userUrl).subscribe({
      next: (user) => {
        this.loggedInUser.set(user);
        this._snackBar.open(`${user.username} logged in.`, 'Close');
        this._router.navigate(['/']);
      },
      error: () => {
        this._localStorageService.removeItem('jwt');
        this.loggedInUser.set(null);
        this._router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.loggedInUser.set(null);
    this._snackBar.open(`You have been logged out.`, 'Close');
  }
}
