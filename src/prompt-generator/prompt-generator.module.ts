import { Module } from '@nestjs/common';
import { PromptGeneratorService } from './prompt-generator.service';
import { PromptGeneratorController } from './prompt-generator.controller';
import { OpenAIModule } from '../providers/openai/openai.module';

@Module({
  imports: [OpenAIModule],
  controllers: [PromptGeneratorController],
  providers: [PromptGeneratorService],
})
export class PromptGeneratorModule {}
