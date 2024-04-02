import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import * as fs from 'fs';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class YoutubeService implements OnModuleInit {
  private oauth2Client: OAuth2Client;
  private youtube;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const CLIENT_ID = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const CLIENT_SECRET = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const REDIRECT_URI = this.configService.get<string>('GOOGLE_REDIRECT_URI');

    this.oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    // Set the global options; any API call after this will use these settings.
    google.options({ auth: this.oauth2Client });

    this.youtube = google.youtube('v3');

    // Assuming you have already obtained the tokens
    // You would typically obtain these from a web flow where the user authorizes your app
    const tokens = {
      access_token: 'YOUR_ACCESS_TOKEN',
      refresh_token: 'YOUR_REFRESH_TOKEN',
      // You should also store and reuse the expiry_date but it's omitted for simplicity
    };

    this.oauth2Client.setCredentials(tokens);
  }

  async uploadVideo() {
    const videoFilePath = './path/to/your/video.mp4';
    const videoFile = fs.createReadStream(videoFilePath);

    try {
      const response = await this.youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title: 'Your Video Title',
            description: 'Your Video Description',
            tags: ['shorts', 'test'],
          },
          status: {
            privacyStatus: 'public', // 'private', 'unlisted' are also options
          },
        },
        media: {
          body: videoFile,
        },
      });

      console.log('Uploaded Video ID:', response.data.id);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  }
}
