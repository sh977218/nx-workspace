import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.use(cookieParser());

  const port = process.env['PORT'] ?? 4000;
  await app.listen(port);
  Logger.log(`🚀 API Application is running on port ${port}`);
}

bootstrap().catch((e) => {
  Logger.log(`idp api server started with error: ${e}`);
});
