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
      <mat-form-field>
        <mat-label>Username</mat-label>
        <input matInput formControlName="usernameControl" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="passwordControl" />
      </mat-form-field>
      <div>
        <button
          matButton="filled"
          color="primary"
          (click)="login()"
        >
          Login
        </button>
      </div>
    </form>
  `,
  host: {
    class: 'flex items-center justify-center'
  }
})
export class LoginComponent {
  readonly userService = inject(UserService);

  readonly form = new FormGroup({
    usernameControl: new FormControl(),
    passwordControl: new FormControl()
  });

  get usernameControl() {
    return this.form.get('usernameControl') as FormControl;
  }

  get passwordControl() {
    return this.form.get('passwordControl') as FormControl;
  }

  login() {
    this.userService.login(this.usernameControl.value, this.passwordControl.value);
  }
}
