import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage, registerFont } from 'canvas';
import * as fs from 'fs';
import path = require('path');
import * as ffmpeg from 'fluent-ffmpeg';
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';
import * as util from 'util';
import { ConfigService } from '@nestjs/config';

registerFont('./font/HiMelody-Regular.ttf', { family: 'HiMelody' });

@Injectable()
export class ShortGeneratorService {
  constructor(private readonly configService: ConfigService) {}

  async renderTextOnTemplate() {
    const templatePath = './shorts-template/shorts_template.png';
    const text =
      '맞벌이 부부로 아이 둘을 키우고 있는 워킹맘입니다. 과연 여러분은 이 메시지에서 제 반응을 어떻게 생각하시나요? 이 메시지를 보고 여러분들은 어떤 반응을 보이실 것 같으세요?';

    const outputPath = './output';

    const image = await loadImage(templatePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    console.log(image.width);
    console.log(image.height);

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const lines = this.splitTextUnder25Letters(text, 22);
    let frameCount = 0;

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j <= lines[i].length; j++) {
        ctx.drawImage(image, 0, 0);
        ctx.font = '18px HiMelody';
        ctx.fillStyle = 'black';

        for (let k = 0; k < i; k++) {
          ctx.fillText(lines[k], 50, 100 + 30 * k);
        }

        const currentLineText = lines[i].substring(0, j);
        ctx.fillText(currentLineText, 50, 100 + 30 * i);

        frameCount++;
        const framePath = path.join(outputPath, `frame_${frameCount.toString().padStart(3, '0')}.png`);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(framePath, buffer);
      }
    }

    const tempImage = await loadImage('./images/temp.png');
    ctx.drawImage(tempImage, 50, 100 + lines.length * 30);

    const framePath = path.join(outputPath, `frame_${frameCount.toString().padStart(3, '0')}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(framePath, buffer);
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

  async embedAudioOnVideo(text: string) {
    const client = new TextToSpeechClient({
      credentials: JSON.parse(this.configService.get<string>('TTS_KEYFILE')!),
    });

    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: {
        languageCode: 'ko-KR',
        ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.NEUTRAL,
      },
      // select the type of audio encoding
      audioConfig: {
        audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
        speakingRate: 1,
      },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('./output/output.mp3', response.audioContent!, 'binary');

    const inputVideoPath = './output/video.mp4';
    const inputAudioPath = './output/output.mp3';
    const outputVideoPath = './output/output.mp4';

    ffmpeg(inputVideoPath)
      .addInput(inputAudioPath)
      .videoCodec('copy')
      .audioCodec('copy')
      .save(outputVideoPath)
      .on('error', function (err) {
        console.log('An error occurred: ' + err.message);
      })
      .on('end', function () {
        console.log('Processing finished !');
      });
  }

  private splitTextUnder25Letters(text: string, maxLineLength: number): string[] {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      if (currentLine.length + words[i].length < maxLineLength) {
        currentLine += ' ' + words[i];
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
    return lines;
  }
}
