import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.provider';

@Module({
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
