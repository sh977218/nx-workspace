import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '@shared-models/shared-models';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { HeaderComponent } from './header/header.component';
import { LocalStorageService } from './services/local-storage.service';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { MaterialModule } from './material.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    FormsModule,
    NgClass,
    HeaderComponent,
    MaterialModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class App {
  private readonly _http = inject(HttpClient);
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _dialog = inject(MatDialog);
  readonly themeService = inject(ThemeService);
  readonly userService = inject(UserService);
  private readonly _localStorageService = inject(LocalStorageService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);

  loginUrl = `${environment.api}/auth/login`;

  routes = [
    {
      path: 'search',
      label: 'Search',
    },
    {
      path: 'threeJs',
      label: 'Three JS',
    },
    {
      path: 'dashboard',
      label: 'Dashboard',
    },
    {
      path: 'video',
      label: 'Video',
    },
    {
      path: 'feed',
      label: 'Feed',
    },
  ];

  isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  openChatDialog() {
    this._dialog.open(ChatDialogComponent, {
      height: '1000px',
      width: '600px',
    });
  }

  constructor() {
    this._http
      .post<{
        jwt: string;
        user: User;
      }>(this.loginUrl,{})
      .subscribe({
        next: ({ jwt, user }) => {
          this._localStorageService.setItem('jwt', jwt);
          this.userService.isLoggedIn.set(true);
          this.userService.loggedInUser.set(user);
          this._snackBar.open(`${user.username} logged in.`, 'Close');
        },
        error: () => {
          this._localStorageService.removeItem('jwt');
          this.userService.isLoggedIn.set(false);
          this.userService.loggedInUser.set(null);
        },
      });
  }
}
