import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { DataLoadService } from './app/data-load/data-load.service';
import { MyLogger } from './app/my-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://nx-workspace.onrender.com',
      'https://api-6yuk.onrender.com',
    ],
    credentials: true,
  });
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  const dataLoadService = app.get(DataLoadService);
  await dataLoadService.resetAndLoadHeroes();
  await dataLoadService.resetAndLoadUsers();

  const config = new DocumentBuilder()
    .setTitle('NX Workspace OpenAPI')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('nx workspace')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);
  Logger.log(`🚀 API Application is running on port ${port}`);
}

bootstrap().catch((e) => {
  console.log(`api server started with error: ${e}`);
});
