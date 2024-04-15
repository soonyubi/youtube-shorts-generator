import { Process, Processor } from '@nestjs/bull';
import { VIDEO_CREATE_CHANNEL, VIDEO_PROCESSING_QUEUE } from '../shared/constant/queue.constant';
import { Job } from 'bull';
import { ShortsVideoContentIdentifiers } from '../shared/interfaces/shared.interface';
import { Img2vidService } from './img2vid.service';
import { Logger } from '@nestjs/common';

@Processor(VIDEO_PROCESSING_QUEUE)
export class VideoQueueConsumer {
  private readonly logger = new Logger(VideoQueueConsumer.name);

  constructor(private readonly img2vidService: Img2vidService) {}

  @Process(VIDEO_CREATE_CHANNEL)
  async handleVideoCreation(job: Job) {
    this.logger.log('video create job consumed...!', job.data);
    const videoMetadata: ShortsVideoContentIdentifiers = job.data;
    await this.img2vidService.saveVideoToS3(videoMetadata);
    this.logger.log('video create job processed...!');
  }
}
