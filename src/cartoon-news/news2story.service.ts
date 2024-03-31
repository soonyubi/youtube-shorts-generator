import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../providers/openai/openai.provider';
import { OpenAIMessage } from '../providers/openai/interfaces/openai.chat.interface';
import { SYSTEM_PERSONA_PROMPT } from './prompt/system.prompt';
import { USER_PROMPT } from './prompt/user.prompt';

interface Scene {
  background: string;
  characters: string;
  situation: string;
  emotions_and_atmosphere: string;
  dialogue_and_Narration: string;
  visual_details: string;
  storyProgression: string;
  news_summary_in_scene: string;
}

interface NewsArticleSummary {
  summary: string;
  scenes: Scene[];
}

@Injectable()
export class CartoonNewsGenerator {
  constructor(private readonly openAIService: OpenAIService) {}

  async news2story(news: string): Promise<NewsArticleSummary> {
    const messages: OpenAIMessage[] = [];
    messages.push(SYSTEM_PERSONA_PROMPT);
    messages.push(USER_PROMPT);

    const result = await this.openAIService.chat(news, messages, 'gpt-4');
    const newsArticle = JSON.parse(result ?? '{}') as NewsArticleSummary;

    return newsArticle;
  }

  async story2Image(newsArticleSummary: NewsArticleSummary) {
    const images = await Promise.all(
      newsArticleSummary.scenes.map((scene) => {
        return this.openAIService.createImage(JSON.stringify(scene));
      }),
    );

    console.log(newsArticleSummary);
    for (const image of images) {
      console.log(image);
    }
  }
}
