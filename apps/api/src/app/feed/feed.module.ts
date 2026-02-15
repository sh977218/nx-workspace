import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { FeedController } from './feed.controller';

@Module({ imports: [HttpModule], controllers: [FeedController] })
export class FeedModule {
}
