import { Module } from '@nestjs/common';
import { ShortGeneratorService } from './short-generator.service';
import { ShortGeneratorController } from './short-generator.controller';

@Module({
  controllers: [ShortGeneratorController],
  providers: [ShortGeneratorService],
})
export class ShortGeneratorModule {}
