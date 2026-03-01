import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { UserService } from '../services/user.service';

@Component({
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="form"
      class="container max-w-80 flex flex-col justify-center"
    >
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
            <mat-list-option [value]="user"
            >{{ user.username }}
            </mat-list-option>
          }
        </mat-selection-list>
      }
      <div>
        <button
          matButton="filled"
          color="primary"
          (click)="userService.login(userControl.value?.at(0))"
        >
          Login
        </button>
      </div>
    </form>
  `,
  host: {
    class: 'flex items-center justify-center',
  },
})
export class LoginComponent {
  readonly userService = inject(UserService);

  readonly usersResource = this.userService.users;
  readonly users = this.usersResource.value();

  readonly form = new FormGroup({
    userControl: new FormControl(),
  });

  get userControl() {
    return this.form.get('userControl') as FormControl;
  }
}
