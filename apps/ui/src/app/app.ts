import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { HeaderComponent } from './header/header.component';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { MaterialModule } from './material.module';
import { LocalStorageService } from './services/local-storage.service';

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
    RouterOutlet
  ]
})
export class App {
  private breakpointObserver = inject(BreakpointObserver);
  readonly dialog = inject(MatDialog);
  readonly themeService = inject(ThemeService);
  readonly userService = inject(UserService);
  private readonly _localStorageService = inject(LocalStorageService);

  routes = [
    {
      path: 'search',
      label: 'Search'
    },
    {
      path: 'threeJs',
      label: 'Three JS'
    },
    {
      path: 'dashboard',
      label: 'Dashboard'
    },
    {
      path: 'video',
      label: 'Video'
    },
    {
      path: 'feed',
      label: 'Feed'
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  openChatDialog() {
    this.dialog.open(ChatDialogComponent, { height: '1000px', width: '600px' });
  }

  constructor() {
    if (this._localStorageService.getItem('jwt')) {
      this.userService.loginByJwt();
    }
  }
}
