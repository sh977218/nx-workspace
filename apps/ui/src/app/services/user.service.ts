import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@shared-models/shared-models';

import { environment } from '../../environments/environment';

import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly #snackBar = inject(MatSnackBar);
  readonly #router = inject(Router);
  readonly #http = inject(HttpClient);
  readonly #localStorageService = inject(LocalStorageService);

  readonly isLoggedIn = signal(false);
  readonly loggedInUser = signal<User | null>(null);

  loginUrl = `${environment.api}/auth/login`;
  logoutUrl = `${environment.api}/auth/logout`;

  isMyself(username: string) {
    return this.loggedInUser()?.username === username;
  }

  login(username?: string, password?: string) {
    const body: { username?: string; password?: string } = {};
    if (username) {
      body.username = username;
      body.password = password;
    }
    this.#http
      .post<{
        jwt: string;
        user: User;
      }>(this.loginUrl, body, { withCredentials: true })
      .subscribe({
        next: ({ jwt, user }) => {
          this.#localStorageService.setItem('jwt', jwt);
          this.isLoggedIn.set(true);
          this.loggedInUser.set(user);
          this.#snackBar.open(`${user.username} logged in.`, 'Close');
          this.#router.navigate(['/']);
        },
        error: () => {
          this.#localStorageService.removeItem('jwt');
          this.isLoggedIn.set(false);
          this.loggedInUser.set(null);
          this.#snackBar.open(`Unable to login`, 'Close');
        },
      });
  }

  logout() {
    this.#http.post<User>(this.logoutUrl, {}).subscribe({
      next: () => {
        this.isLoggedIn.set(false);
        this.loggedInUser.set(null);
        this.#snackBar.open(`You have been logged out.`, 'Close');
      },
      error: () => {
        this.isLoggedIn.set(true);
        this.#snackBar.open(`Unable to log out.`, 'Close');
      },
    });
  }
}
