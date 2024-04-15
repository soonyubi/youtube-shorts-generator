import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { catchError, firstValueFrom } from 'rxjs';
import { AwsService } from '../providers/aws/aws.service';
import {
  ShortsImageContentIdentifiers,
  ShortsVideoContentIdentifiers,
} from '../shared/interfaces/short-identifier.interface';
import { generateImagePath, generateVideoPath } from '../util/media-path-utils';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { VIDEO_CREATE_CHANNEL, VIDEO_PROCESSING_QUEUE } from '../shared/constant/queue.constant';

@Injectable()
export class Img2vidService {
  private readonly stabilityUrl: string = 'https://api.stability.ai/v2beta/image-to-video';
  private STABILITY_AI_API_KEY: string;
  private readonly VIDEO_GENERATION_SEED = 0;
  private readonly VIDEO_GENERATION_CFG_SCALE = 1.8;
  private readonly VIDEO_GENERATION_MOTION_BUCKET_ID = 10;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly awsService: AwsService,
    @InjectQueue(VIDEO_PROCESSING_QUEUE) private videoQueue: Queue,
  ) {
    this.STABILITY_AI_API_KEY = this.configService.get<string>('STABILITY_AI_API_KEY')!;
  }

  async createVideoFromImage(identifier: ShortsImageContentIdentifiers) {
    const data = new FormData();
    data.append(
      'image',
      fs.readFileSync(
        generateImagePath(identifier.userId, identifier.postId, identifier.imageId, identifier.extension),
      ),
      `${identifier.imageId}.${identifier.extension}`,
    );
    data.append('seed', this.VIDEO_GENERATION_SEED);
    data.append('cfg_scale', this.VIDEO_GENERATION_CFG_SCALE);
    data.append('motion_bucket_id', this.VIDEO_GENERATION_MOTION_BUCKET_ID);

    const response = await axios.request({
      url: this.stabilityUrl,
      method: 'post',
      validateStatus: undefined,
      headers: {
        authorization: `Bearer ${this.STABILITY_AI_API_KEY}`,
        ...data.getHeaders(),
      },
      data: data,
    });

    this.addVideoCreateMessage({
      ...identifier,
      extension: 'mp4',
      videoId: response.data.id,
    });
  }

  private addVideoCreateMessage(data: ShortsVideoContentIdentifiers) {
    this.videoQueue.add(VIDEO_CREATE_CHANNEL, data, { delay: 10000 });
  }

  async saveVideoToS3(identifier: ShortsVideoContentIdentifiers) {
    const response = await firstValueFrom(
      this.httpService
        .get(`${this.stabilityUrl}/result/${identifier.videoId}`, {
          headers: {
            Authorization: `Bearer ${this.STABILITY_AI_API_KEY}`,
            Accept: 'video/*',
          },
          responseType: 'arraybuffer',
          validateStatus: undefined,
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response?.data);
            throw 'An error happened!';
          }),
        ),
    );

    if (response.status === HttpStatus.ACCEPTED) {
      this.addVideoCreateMessage(identifier);
      return;
    }

    await this.awsService.uploadVideoByBuffer(
      'youtube-shorts-generator',
      generateVideoPath(identifier.userId, identifier.postId, identifier.videoId, identifier.extension),
      Buffer.from(response.data),
    );
  }
}
