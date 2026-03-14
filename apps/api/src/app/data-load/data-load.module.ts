import { Module } from '@nestjs/common';

import { SquadModule } from '../squad/squad.module';
import { UserModule } from '../user/user.module';

import { DataLoadService } from './data-load.service';

@Module({
  imports: [SquadModule, UserModule],
  controllers: [],
  providers: [DataLoadService],
  exports: [DataLoadService],
})
export class DataLoadModule {}
