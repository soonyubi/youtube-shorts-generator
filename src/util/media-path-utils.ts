export function generateImagePath(userId: string, postId: string, imageId: string, extension: 'jpg' | 'png') {
  return `./${userId}/${postId}/image/${imageId}.${extension}`;
}

export function generateVideoPath(userId: string, postId: string, videoId: string, extension: 'mp4') {
  return `./${userId}/${postId}/image/${videoId}.${extension}`;
}
