import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartoonNews } from './cartoon-news/news2story.module';
import { GoogleTrendCrawlerModule } from './google-trend-crawler/google-trend-crawler.module';
import { Img2vidModule } from './img2vid/img2vid.module';
import { OpenAIModule } from './providers/openai/openai.module';
import { YoutubeAPIModule } from './providers/youtube/youtube.module';
import { ShortGeneratorModule } from './short-generator/short-generator.module';
import { AwsModule } from './providers/aws/aws.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PromptGeneratorModule } from './prompt-generator/prompt-generator.module';

@Module({
  imports: [
    GoogleTrendCrawlerModule,
    CartoonNews,
    OpenAIModule,
    CartoonNews,
    ShortGeneratorModule,
    YoutubeAPIModule,
    Img2vidModule,
    AwsModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST') ?? 'localhost',
          port: 6379,
        },
      }),
    }),
    PromptGeneratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
