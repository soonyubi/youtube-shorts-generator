import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { catchError, firstValueFrom } from 'rxjs';
import { AwsService } from '../providers/aws/aws.service';
import {
  ShortsImageContentIdentifiers,
  ShortsVideoContentIdentifiers,
} from '../shared/interfaces/shared.interface';
import { generateImagePath, generateVideoPath } from '../util/media-path-utils';

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
  ) {
    this.STABILITY_AI_API_KEY = this.configService.get<string>('STABILITY_AI_API_KEY')!;
  }

  async createVideoFromImage(identifier: ShortsImageContentIdentifiers): Promise<string> {
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

    return response.data.id;
  }

  async saveVideoToS3(identifier: ShortsVideoContentIdentifiers) {
    const { data } = await firstValueFrom(
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

    await this.awsService.uploadVideoByBuffer(
      'youtube-shorts-generator',
      generateVideoPath(identifier.userId, identifier.postId, identifier.videoId, identifier.extension),
      Buffer.from(data),
    );
    // await this.awsService.getVideo(
    //   'youtube-shorts-generator',
    //   generateVideoPath(identifier.userId, identifier.postId, identifier.videoId, identifier.extension),
    // );
    this.afterSaveVideoToS3();
  }

  private afterSaveVideoToS3() {}
}
