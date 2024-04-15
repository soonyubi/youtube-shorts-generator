import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './aws.service';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: './.local.env' })],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
