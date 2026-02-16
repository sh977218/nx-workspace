import { NgModule } from '@angular/core';

import { MemberComponent } from './member.component';
import { MemberDialog } from './member.dialog';

@NgModule({
  imports: [MemberComponent,MemberDialog],
  exports: [MemberComponent,MemberDialog],
})
export class MemberModule {}
