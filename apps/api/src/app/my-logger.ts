import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class MyLogger implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    const isDev = process.env.NODE_ENV === 'development';
    this.logger = createLogger({
      level: 'debug', // Set the minimum logging level
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console(), // Log to console
        ...(isDev ? [] : [new transports.File({ filename: './error.log' })]),
      ],
    });
  }

  /**
   * Write a 'log' level log.
   */
  log(message: string) {
    this.logger.log({ level: 'info', message });
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: string) {
    this.logger.log({ level: 'fatal', message });
  }

  /**
   * Write an 'error' level log.
   */
  error(message: string | Error) {
    if (message instanceof Error) {
      message = message.stack || message.message;
    }
    this.logger.log({ level: 'error', message });
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: string) {
    this.logger.log({ level: 'warn', message });
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: string) {
    this.logger.log({ level: 'debug', message });
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: string) {
    this.logger.log({ level: 'verbose', message });
  }
}
