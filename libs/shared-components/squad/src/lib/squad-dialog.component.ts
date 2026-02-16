import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Squad } from '@shared-models/shared-models';

@Component({
  imports: [
    MatCardModule,
    MatListModule,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  template: `
    <h2 matDialogTitle>{{ squad.squadName }}</h2>
    <mat-dialog-content>
      <mat-list>
        <mat-list-item>
          <span matListItemTitle>home town</span>
          <span matListItemLine>{{ squad.homeTown }}</span>
        </mat-list-item>
        <mat-list-item>
          <span matListItemTitle>secret base</span>
          <span matListItemLine>{{ squad.secretBase }}</span>
        </mat-list-item>
        <mat-list-item>
          <span matListItemTitle>members</span>
          <span matListItemLine>{{ squad.members.length }}</span>
        </mat-list-item>
      </mat-list>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton matDialogClose cdkFocusInitial>Ok</button>
    </mat-dialog-actions>
  `,
})
export class SquadDialog {
  readonly data = inject<{ squad: Squad }>(MAT_DIALOG_DATA);
  readonly squad = this.data.squad;
}
