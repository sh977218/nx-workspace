import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Member } from '@shared-models/shared-models';

import { MemberDialogComponent } from './member-dialog.component';

@Component({
  selector: 'lib-member',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <div matCardAvatar>
          <img [attr.src]="member().avatar" alt="Squad Logo" />
        </div>
        <mat-card-title>{{ member().name }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{ member().content }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button type="button" matIconButton (click)="openMemberDetailDialog()">
          <mat-icon
            aria-hidden="false"
            aria-label="more"
            fontIcon="info"
          ></mat-icon>
        </button>
        <button type="button" matIconButton>
          <mat-icon
            aria-hidden="false"
            aria-label="like"
            fontIcon="thumb_up"
          ></mat-icon>
        </button>
        <button type="button" matIconButton>
          <mat-icon
            aria-hidden="false"
            aria-label="unlike"
            fontIcon="thumb_down"
          ></mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  host: {
    class: 'flex flex-col flex-wrap justify-between my-2',
  },
})
export class MemberComponent {
  readonly dialog = inject(MatDialog);

  member = input.required<Member>();

  openMemberDetailDialog() {
    this.dialog.open(MemberDialogComponent, {
      data: { member: this.member() },
    });
  }
}
