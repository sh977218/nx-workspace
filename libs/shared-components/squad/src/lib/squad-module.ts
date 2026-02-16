import { NgModule } from '@angular/core';

import { SquadComponent } from './squad.component';
import { SquadDialog } from './squad-dialog.component';

@NgModule({
  imports: [SquadComponent,SquadDialog],
  exports: [SquadComponent,SquadDialog],
})
export class SquadModule {}
