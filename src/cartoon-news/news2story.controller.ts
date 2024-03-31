import { Controller } from '@nestjs/common';
import { CartoonNewsGenerator } from './news2story.service';

@Controller('cartoon-news')
export class CartoonNewsController {
  constructor(private readonly news2storyService: CartoonNewsGenerator) {}
}
