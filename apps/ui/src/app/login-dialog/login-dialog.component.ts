import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { UserService } from '../user.service';

@Component({
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  template: `
    <h2 matDialogTitle>Chat</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-selection-list
          #users
          formControlName="userControl"
          [multiple]="false"
        >
          @for (user of userService.users; track user.userId) {
            <mat-list-option [value]="user">{{ user.name }}</mat-list-option>
          }
        </mat-selection-list>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        matButton
        cdkFocusInitial
        [matDialogClose]="users.selectedOptions.hasValue()?users.selectedOptions.selected[0].value: null"
      >
        Login
      </button>
      <button matButton matDialogClose>Close</button>
    </mat-dialog-actions>
  `
})
export class LoginDialogComponent {
  userService = inject(UserService);

  form = new FormGroup({
    userControl: new FormControl()
  });
}
