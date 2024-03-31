import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleTrendCrawlerModule } from './google-trend-crawler/google-trend-crawler.module';
import { CartoonNews } from './cartoon-news/news2story.module';
import { OpenAIModule } from './providers/openai/openai.module';
import { ShortGeneratorModule } from './short-generator/short-generator.module';

@Module({
  imports: [GoogleTrendCrawlerModule, CartoonNews, OpenAIModule, CartoonNews, ShortGeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
