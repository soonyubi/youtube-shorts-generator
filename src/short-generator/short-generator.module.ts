import { Module } from '@nestjs/common';
import { ShortGeneratorService } from './short-generator.service';
import { ShortGeneratorController } from './short-generator.controller';
import { ConfigModule } from '@nestjs/config';
import { YoutubeAPIModule } from '../providers/youtube/youtube.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.local.env',
    }),
    YoutubeAPIModule,
  ],
  controllers: [ShortGeneratorController],
  providers: [ShortGeneratorService],
})
export class ShortGeneratorModule {}
