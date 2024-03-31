import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
