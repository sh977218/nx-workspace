import { Controller, Get } from '@nestjs/common';

import { DataLoadService } from './data-load/data-load.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataLoadService: DataLoadService,
  ) {}

  @Get('/healthz')
  healthCheck() {
    return this.appService.getData();
  }

  @Get('/delete-db')
  async deleteDatabase() {
    await this.dataLoadService.deleteDataBase();
  }
}
