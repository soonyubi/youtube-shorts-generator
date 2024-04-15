import { Module } from '@nestjs/common';
import { Img2vidService } from './img2vid.service';
import { Img2vidController } from './img2vid.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from '../providers/aws/aws.module';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ envFilePath: './.local.env' }), AwsModule],
  controllers: [Img2vidController],
  providers: [Img2vidService],
})
export class Img2vidModule {}
