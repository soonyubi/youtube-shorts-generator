import { Controller, Get } from '@nestjs/common';
import { ShortGeneratorService } from './short-generator.service';

@Controller('short-generator')
export class ShortGeneratorController {
  constructor(private readonly shortGeneratorService: ShortGeneratorService) {}

  @Get('')
  async renderTextOnTemplate() {
    await this.shortGeneratorService.renderTextOnTemplate();
    await this.shortGeneratorService.createVideoFromImage();
    await this.shortGeneratorService.embedAudioOnVideo(
      '맞벌이 부부로 아이 둘을 키우고 있는 워킹맘입니다. 과연 여러분은 이 메시지에서 제 반응을 어떻게 생각하시나요? 이 메시지를 보고 여러분들은 어떤 반응을 보이실 것 같으세요?',
    );
  }
}
