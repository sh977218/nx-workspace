import { Test, TestingModule } from '@nestjs/testing';

import { DataLoadService } from './data-load/data-load.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    const mockDataLoadService = {
      deleteDataBase: jest.fn(),
    };

    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: DataLoadService,
          useValue: mockDataLoadService,
        },
      ],
    }).compile();
  });

  describe('health check', () => {
    it('should return status ok', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.healthCheck()).toEqual({
        status: 'ok',
      });
    });
  });
});
