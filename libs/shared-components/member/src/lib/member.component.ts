import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Member } from '@shared-models/shared-models';

import { MemberDialog } from './member.dialog';

@Component({
  selector: 'lib-member',
  imports: [
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconButton,
  ],
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
    this.dialog.open(MemberDialog, {
      data: { member: this.member() },
    });
  }
}
