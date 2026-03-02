import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'ci'),
        PORT: Joi.number(),
        DATABASE_PROTOCOL: Joi.string(),
        DATABASE_HOST: Joi.string(),
        DATABASE_NAME: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const DATABASE_PROTOCOL =
          configService.get<string>('DATABASE_PROTOCOL');
        const DATABASE_HOST = configService.get<string>('DATABASE_HOST');
        const DATABASE_USERNAME =
          configService.get<string>('DATABASE_USERNAME');
        const DATABASE_PASSWORD =
          configService.get<string>('DATABASE_PASSWORD');
        const AUTH_CREDITS = DATABASE_USERNAME
          ? `${DATABASE_USERNAME}:${DATABASE_PASSWORD}@`
          : '';
        const uri = `${DATABASE_PROTOCOL}${AUTH_CREDITS}${DATABASE_HOST}`;
        const dbName = configService.get<string>('DATABASE_NAME');
        return {
          uri,
          dbName,
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
