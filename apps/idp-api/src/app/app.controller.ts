import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  authAndRedirect(
    @Body() { redirectUrl }: { redirectUrl: string }
  ) {
    return {
      url: redirectUrl,
      statusCode: 301
    };
  }
}
