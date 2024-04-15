import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../providers/openai/openai.provider';
import { StoryBoardTemplate } from '../shared/interfaces/prompt.interface';
import { OpenAIMessage } from '../providers/openai/interfaces/openai.chat.interface';

@Injectable()
export class PromptGeneratorService {
  private readonly GPT_ROLE = '';

  constructor(private readonly openAIService: OpenAIService) {}

  async generateImageGenerationPromptFromContent(
    content: string,
    numOfImages: number = 10,
  ): Promise<StoryBoardTemplate> {
    const prompt = this.generatePrompt(content, numOfImages);
    const messages: OpenAIMessage[] = [];
    messages.push({ role: 'system', content: this.GPT_ROLE });
    messages.push({ role: 'user', content: prompt });

    const result = await this.openAIService.chat(content, messages, 'gpt-4');
    const storyBoard = JSON.parse(result ?? '{}') as StoryBoardTemplate;

    return storyBoard;
  }

  private generatePrompt(content: string, numOfImages: number): string {
    return '';
  }
}
