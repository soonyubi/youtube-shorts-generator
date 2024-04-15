import { Controller, Get } from '@nestjs/common';
import { Img2vidService } from './img2vid.service';

@Controller('img2vid')
export class Img2vidController {
  constructor(private readonly img2vidService: Img2vidService) {}

  @Get('test')
  async test() {
    await this.img2vidService.createVideoFromImage({
      userId: 1,
      postId: 'temp001',
      resolution: {
        height: 576,
        width: 1024,
      },
      imageId: 'image',
      extension: 'jpg',
    });

    // await this.img2vidService.saveVideoToS3({
    //   userId: 1,
    //   postId: 'temp001',
    //   resolution: {
    //     height: 576,
    //     width: 1024,
    //   },
    //   videoId: 'b9c8734337b2648c6dfe20a7a58cf075fecfba3c157c87e4f4c5e6c2d0103da9',
    //   extension: 'mp4',
    // });
  }
}
