import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.provider';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { YoutubeController } from './youtube.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.local.env',
    }),
    HttpModule,
  ],
  controllers: [YoutubeController],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class YoutubeAPIModule {}
