import { Module } from '@nestjs/common';
import { GoogleTrendCrawlerService } from './google-trend-crawler.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [GoogleTrendCrawlerService],
  exports: [GoogleTrendCrawlerService],
})
export class GoogleTrendCrawlerModule {}
