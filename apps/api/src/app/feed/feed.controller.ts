import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { Rss, RssSchema } from '@shared-models/shared-models';
import { firstValueFrom } from 'rxjs';
import { parseStringPromise } from 'xml2js';

@Controller('feed')
export class FeedController {
  constructor(private readonly httpService: HttpService) {
  }

  @Get()
  async getFeed(): Promise<Rss> {
    const response = await firstValueFrom(
      this.httpService.get('http://rss.cnn.com/rss/cnn_topstories.rss')
    );
    const data = response.data;
    const feed = await parseStringPromise(data, {
      explicitArray: false
    });
    return RssSchema.parse(feed);
  }
}
