import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express'; // Import typings for the underlying library

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
  authAndRedirect(@Body() body: { redirectUrl: string }) {
    return { ok: true };
  }
}
