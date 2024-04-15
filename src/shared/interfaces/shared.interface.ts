interface Resolution {
  width: number;
  height: number;
}

interface ShortsContentIdentifiers {
  userId: number;
  postId: string;
  resolution: Resolution;
}

export interface ShortsImageContentIdentifiers extends ShortsContentIdentifiers {
  imageId: string;
  extension: 'jpg' | 'png' | 'jpeg';
}

export interface ShortsVideoContentIdentifiers extends ShortsContentIdentifiers {
  videoId: string;
  extension: 'mp4';
}
