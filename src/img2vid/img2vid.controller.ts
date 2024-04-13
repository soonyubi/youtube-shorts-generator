import { Controller, Get } from '@nestjs/common';
import { Img2vidService } from './img2vid.service';

@Controller('img2vid')
export class Img2vidController {
  constructor(private readonly img2vidService: Img2vidService) {}

  @Get('test')
  async test() {}
}
