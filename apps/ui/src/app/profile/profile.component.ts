import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared-models/shared-models';
import { map, tap } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';

import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';

@Component({
  imports: [MatTableModule],
  template: `
    <table mat-table [dataSource]="data">
      <ng-container matColumnDef="key">
        <th mat-header-cell *matHeaderCellDef>Key</th>
        <td mat-cell *matCellDef="let element">{{ element.key }}</td>
      </ng-container>
      <ng-container matColumnDef="value">
        <th mat-header-cell *matHeaderCellDef>Value</th>
        <td mat-cell *matCellDef="let element">{{ element.value }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="['key', 'value']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['key', 'value']"></tr>
    </table>
  `,
  host: {
    class: 'flex items-center justify-center',
  },
})
export class ProfileComponent {
  private readonly _router = inject(Router);

  userService = inject(UserService);
  http = inject(HttpClient);
  data = this.http
    .get<User>(`${environment.api}/users/me`, { withCredentials: true })
    .pipe(
      map((user) => {
        return Object.entries(user).map(([key, value]) => ({
          key,
          value,
        }));
      }),
      tap({
        error: () => this._router.navigate(['login']),
      }),
    );
}
