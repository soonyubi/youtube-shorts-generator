import { Module } from '@nestjs/common';
import { CartoonNewsGenerator } from './news2story.service';
import { CartoonNewsController } from './news2story.controller';
import { OpenAIModule } from '../providers/openai/openai.module';

@Module({
  imports: [OpenAIModule],
  controllers: [CartoonNewsController],
  providers: [CartoonNewsGenerator],
  exports: [CartoonNewsGenerator],
})
export class CartoonNews {}
