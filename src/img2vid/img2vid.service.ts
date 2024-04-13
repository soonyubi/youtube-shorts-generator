import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import { catchError, firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';

@Injectable()
export class Img2vidService {
  private readonly stabilityUrl: string = 'https://api.stability.ai/v2beta/image-to-video';
  private STABILITY_AI_API_KEY: string;
  private readonly VIDEO_GENERATION_SEED = 0;
  private readonly VIDEO_GENERATION_CFG_SCALE = 1.8;
  private readonly VIDEO_GENERATION_MOTION_BUCKET_ID = 127;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.STABILITY_AI_API_KEY = this.configService.get<string>('STABILITY_AI_API_KEY')!;
  }

  async createVideoFromImage(imageId: string) {
    const data = new FormData();
    data.append('image', fs.readFileSync('./image.jpg'), 'image.jpg');
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

    console.log('Generation ID:', response.data.id);
  }

  async saveVideoToS3(videoId: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.stabilityUrl}/result/${videoId}`, {
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

    fs.writeFileSync(`./video.mp4`, Buffer.from(data));

    this.afterSaveVideoToS3();
  }

  private afterSaveVideoToS3() {}
}
