import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatCardModule],
  template: `
    <div class="welcome-container">
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-card-title>Welcome to NX Workspace</mat-card-title>
          <mat-card-subtitle
            >A modern monorepo for Angular apps
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>
            This workspace is powered by Nx, providing advanced CLI tools and
            smart caching.
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    .welcome-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      padding: 20px;
    }
  `,
  host: {
    class: 'flex items-center justify-center',
  },
})
export class HomeComponent {}
