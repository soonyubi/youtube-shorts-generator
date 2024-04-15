interface ShortsContentIdentifiers {
  userId: number;
  postId: string;
}

export interface ShortsImageContentIdentifiers extends ShortsContentIdentifiers {
  imageId: string;
  extension: 'jpg' | 'png' | 'jpeg';
}

export interface ShortsVideoContentIdentifiers extends ShortsContentIdentifiers {
  videoId: string;
  extension: 'mp4';
}
