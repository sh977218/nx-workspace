import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { UserService } from '../user.service';

@Component({
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <h2 matDialogTitle>Chat</h2>
      <mat-dialog-content>
        @if (usersResource.isLoading()) {
          <div class="loading-container">
            <mat-spinner></mat-spinner>
            <p>Loading users...</p>
          </div>
        }
        @if (usersResource.error() && !usersResource.isLoading()) {
          <div class="error-container">
            <mat-card class="error-card">
              <mat-card-content>
                <mat-icon class="error-icon">error_outline</mat-icon>
                <p>
                  {{
                    usersResource.error()?.message ||
                      'Failed to fetch users. This may be due to CORS restrictions.'
                  }}
                </p>
              </mat-card-content>
            </mat-card>
          </div>
        }
        @if (usersResource.hasValue()) {
          <mat-selection-list
            #usersSelectionList
            formControlName="userControl"
            [multiple]="false"
          >
            @for (user of users; track user.id) {
              <mat-list-option [value]="user">{{ user.username }}</mat-list-option>
            }
          </mat-selection-list>
        }
      </mat-dialog-content>
      <mat-dialog-actions>
        <button matButton cdkFocusInitial [matDialogClose]="userControl.value?.at(0)">
          Login
        </button>
        <button matButton matDialogClose>Close</button>
      </mat-dialog-actions>
    </form>
  `,
})
export class LoginDialogComponent {
  userService = inject(UserService);

  usersResource = this.userService.users;
  users = this.usersResource.value();

  form = new FormGroup({
    userControl: new FormControl(),
  });

  get userControl() {
    return this.form.get('userControl') as FormControl;
  }
}
