import { Module } from '@nestjs/common';
import { GoogleTrendCrawlerService } from './google-trend-crawler.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ envFilePath: './.local.env' })],
  controllers: [],
  providers: [GoogleTrendCrawlerService],
  exports: [GoogleTrendCrawlerService],
})
export class GoogleTrendCrawlerModule {}
