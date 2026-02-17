import { NgModule } from '@angular/core';

import { MemberComponent } from './member.component';
import { MemberDialogComponent } from './member-dialog.component';

@NgModule({
  imports: [MemberComponent,MemberDialogComponent],
  exports: [MemberComponent,MemberDialogComponent],
})
export class MemberModule {}
