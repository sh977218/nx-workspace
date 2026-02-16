import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MemberComponent } from '@shared/shared-components/member';
import { Squad } from '@shared-models/shared-models';

import { SquadDialog } from './squad-dialog.component';

@Component({
  selector: 'lib-squad',
  templateUrl: './squad.component.html',
  host: {
    class: 'flex flex-col flex-wrap justify-between my-2',
  },
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MemberComponent,
  ],
})
export class SquadComponent {
  readonly dialog = inject(MatDialog);

  squad = input.required<Squad>();

  openSquadDetailDialog() {
    this.dialog.open(SquadDialog, {
      data: { squad: this.squad() },
    });
  }
}
