import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class AwsService {
  s3Client: S3Client;
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS.S3.REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS.ACCESS_KEY')!,
        secretAccessKey: this.configService.get<string>('AWS.SECRET_KEY')!,
      },
    });
  }

  async uploadVideoByBuffer(bucketName: string, keyName: string, videoBuffer: Buffer): Promise<void> {
    const uploadParams = {
      Bucket: bucketName,
      Key: keyName,
      Body: videoBuffer,
    };

    const command = new PutObjectCommand(uploadParams);
    fs.promises.writeFile(`./${keyName}`, videoBuffer);

    try {
      const response = await this.s3Client.send(command);

      console.log('Video uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  }
}
