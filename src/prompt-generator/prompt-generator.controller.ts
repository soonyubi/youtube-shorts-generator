import { Controller } from '@nestjs/common';
import { PromptGeneratorService } from './prompt-generator.service';

@Controller('prompt-generator')
export class PromptGeneratorController {
  constructor(private readonly promptGeneratorService: PromptGeneratorService) {}
}
