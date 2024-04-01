import { Module } from '@nestjs/common';
import { ShortGeneratorService } from './short-generator.service';
import { ShortGeneratorController } from './short-generator.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.local.env',
    }),
  ],
  controllers: [ShortGeneratorController],
  providers: [ShortGeneratorService],
})
export class ShortGeneratorModule {}
