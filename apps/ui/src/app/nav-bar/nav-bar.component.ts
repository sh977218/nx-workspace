import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MaterialModule } from '../material.module';
import { ThemeService } from '../services/theme.service';
import { UserService } from '../services/user.service';

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
  readonly themeService = inject(ThemeService);
  readonly userService = inject(UserService);

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
}
