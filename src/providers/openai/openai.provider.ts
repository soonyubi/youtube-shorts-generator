import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAIMessage } from './interfaces/openai.chat.interface';

export type CHAT_MODEL = 'gpt-3.5-turbo' | 'gpt-4';

@Injectable()
export class OpenAIService {
  private readonly openAI: OpenAI;
  private DEFAULT_CHAT_TEMPERATURE: number = 1;

  constructor() {
    this.openAI = new OpenAI({
      // apiKey: 'some-api key',
    });
  }

  async chat(
    query: string,
    context?: OpenAIMessage[],
    model: CHAT_MODEL = 'gpt-3.5-turbo',
    temperature = this.DEFAULT_CHAT_TEMPERATURE,
  ): Promise<string | null> {
    const messages: OpenAIMessage[] = context ? [...context] : [];
    messages.push({ role: 'user', content: query });

    const response = await this.openAI.chat.completions.create({
      model,
      temperature,
      messages: messages,
      max_tokens: 4096,
    });

    return response.choices[0].message.content;
  }

  async createImage(query: string) {
    const result = await this.openAI.images.generate({
      prompt: query,
      model: 'dall-e-3',
      quality: 'standard',
      size: '1024x1024',
      style: 'vivid',
    });
    console.log(result);
    return result;
  }
}
