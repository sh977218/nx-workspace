import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MaterialModule } from '../material.module';
import { ThemeService } from '../theme.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  imports: [
    AsyncPipe,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    FormsModule,
    MaterialModule
  ]
})
export class NavBarComponent {
  readonly dialog = inject(MatDialog);
  themeService = inject(ThemeService);
  userService = inject(UserService);
  _snackBar = inject(MatSnackBar);

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
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  openLoginDialog() {
    this.dialog
      .open(LoginDialogComponent, {
        height: '1000px',
        width: '600px'
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.userService.loggedInUser = result;
          this._snackBar.open(`${result.name} logged in.`, 'Close');
        }
      });
  }
}
