import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleTrendCrawlerService } from './google-trend-crawler/google-trend-crawler.service';
import { CartoonNewsGenerator } from './cartoon-news/news2story.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleTrendCrawlerService: GoogleTrendCrawlerService,
    private readonly news2storyService: CartoonNewsGenerator,
  ) {}

  @Get('')
  async getHello(): Promise<void> {
    await this.news2storyService.story2Image(null);
  }
}
