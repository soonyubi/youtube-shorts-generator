import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from '../providers/aws/aws.module';
import { VIDEO_PROCESSING_QUEUE } from '../shared/constant/queue.constant';
import { Img2vidController } from './img2vid.controller';
import { Img2vidService } from './img2vid.service';
import { VideoQueueConsumer } from './create-video.consumer';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ envFilePath: './.local.env' }),
    AwsModule,
    BullModule.registerQueueAsync({ name: VIDEO_PROCESSING_QUEUE }),
  ],
  controllers: [Img2vidController],
  providers: [Img2vidService, VideoQueueConsumer],
  exports: [BullModule],
})
export class Img2vidModule {}
