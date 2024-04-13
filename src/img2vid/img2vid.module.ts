import { Module } from '@nestjs/common';
import { Img2vidService } from './img2vid.service';
import { Img2vidController } from './img2vid.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ envFilePath: './.local.env' })],
  controllers: [Img2vidController],
  providers: [Img2vidService],
})
export class Img2vidModule {}
