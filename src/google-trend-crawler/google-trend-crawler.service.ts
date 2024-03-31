import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { XMLParser } from 'fast-xml-parser';
import { Cron, CronExpression } from '@nestjs/schedule';
import OpenAI from 'openai';

interface NewsItem {
  title: string;
  'ht:approx_traffic': string;
  description: string;
  link: string;
  pubDate: string;
  'ht:picture': string;
  'ht:picture_source': string;
  'ht:news_item': Array<{
    'ht:news_item_title': string;
    'ht:news_item_snippet': string;
    'ht:news_item_url': string;
    'ht:news_item_source': string;
  }>;
}

@Injectable()
export class GoogleTrendCrawlerService {
  private readonly openAI: OpenAI;

  constructor(private readonly httpService: HttpService) {
    this.openAI = new OpenAI({
      // apiKey: 'some-api key',
    });
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'fetchGoogleTrendKeyword',
    timeZone: 'Asia/Seoul',
  })
  async fetchGoogleTrendKeyword(): Promise<NewsItem[]> {
    const response = await this.httpService
      .get('https://trends.google.com/trends/trendingsearches/daily/rss?geo=KR')
      .toPromise();
    const xmlData = response?.data;

    const parser = new XMLParser();
    const obj = parser.parse(xmlData);
    const items = obj.rss.channel.item as Array<NewsItem>;
    const imageResponse = await this.openAI.images.generate({
      model: 'dall-e-3',
      prompt:
        'At the ceremony, Yoon Jakyung notices a controversial moment where Emma Stone, a white cat actress, seemingly ignores her friend Jennifer Lawrence, who is an Asian cat actress. The media starts speculating about possible discrimination in Hollywood.',
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });
    console.log(imageResponse.data);
    return items;
  }
}
