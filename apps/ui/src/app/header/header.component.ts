import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';

import { MaterialModule } from '../material.module';
import { ThemeService } from '../services/theme.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [AsyncPipe, RouterLink, FormsModule, MaterialModule],
})
export class HeaderComponent {
  private breakpointObserver = inject(BreakpointObserver);
  readonly dialog = inject(MatDialog);
  readonly themeService = inject(ThemeService);
  readonly userService = inject(UserService);

  toggleDrawer = output()

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
    );
}
