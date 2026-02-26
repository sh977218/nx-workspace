import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { MaterialModule } from './material.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [FormsModule, NgClass, NavBarComponent, MaterialModule]
})
export class App {
  readonly dialog = inject(MatDialog);
  themeService = inject(ThemeService);
  userService = inject(UserService);

  openChatDialog() {
    this.dialog.open(ChatDialogComponent, { height: '1000px', width: '600px' });
  }

  constructor() {
    this.userService.loginByJwt();
  }
}
