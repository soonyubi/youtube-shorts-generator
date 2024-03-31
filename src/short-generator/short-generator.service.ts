import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage } from 'canvas';
import * as fs from 'fs';
import path = require('path');
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class ShortGeneratorService {
  async renderTextOnTemplate() {
    const templatePath =
      '/Users/soonyeophong/development/project/easy-news/src/short-generator/shorts_template.png';
    const text = '안녕하세요 유튜브 쇼츠 예제입니다.';
    const outputPath = './output';

    const image = await loadImage(templatePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true }); // recursive: true 옵션은 중첩된 디렉토리를 생성할 수 있게 해줘
    }

    // 텍스트를 한 글자씩 추가하면서 이미지를 생성
    for (let i = 1; i <= text.length; i++) {
      ctx.drawImage(image, 0, 0); // 기본 이미지를 그림
      ctx.font = '15px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(text.substring(0, i), 50, 100); // 텍스트의 일부를 그림

      // 변경된 내용으로 이미지 파일 생성
      const framePath = path.join(outputPath, `frame_${i.toString().padStart(3, '0')}.png`);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(framePath, buffer);

      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지움
    }
  }

  async createVideoFromImage() {
    const imagePath = '/Users/soonyeophong/development/project/easy-news/output';

    ffmpeg()
      .addInput(`${imagePath}/frame_%03d.png`)
      .inputFPS(10)
      .on('end', () => {
        console.log('File has been converted successfully');
      })
      .output('./output/video.mp4')
      .outputFPS(24)
      .run();
  }
}
