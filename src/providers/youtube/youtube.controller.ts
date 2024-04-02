import { Controller, Get } from '@nestjs/common';

@Controller('youtube-api')
export class YoutubeController {
  @Get('oauth2callback')
  async callback() {
    return 'ok';
  }
}
