import { Controller, Get } from '@nestjs/common';
import { ShortGeneratorService } from './short-generator.service';

@Controller('short-generator')
export class ShortGeneratorController {
  constructor(private readonly shortGeneratorService: ShortGeneratorService) {}

  @Get('')
  async renderTextOnTemplate() {
    await this.shortGeneratorService.renderTextOnTemplate();
    await this.shortGeneratorService.createVideoFromImage();
  }
}
