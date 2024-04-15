import { Controller, Get } from '@nestjs/common';
import { Img2vidService } from './img2vid.service';

@Controller('img2vid')
export class Img2vidController {
  constructor(private readonly img2vidService: Img2vidService) {}

  @Get('test')
  async test() {
    // const videoId = await this.img2vidService.createVideoFromImage({
    //   userId: 1,
    //   postId: 'temp001',
    //   imageId: 'image',
    //   extension: 'png',
    // });

    await this.img2vidService.saveVideoToS3({
      userId: 1,
      postId: 'temp001',
      videoId: '5e2de335da5853e25549179f1516a3c31e9e7e25028be4fcfef58496f36cb966',
      extension: 'mp4',
    });
  }
}
