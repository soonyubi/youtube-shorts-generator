export function generateImagePath(
  userId: number,
  postId: string,
  imageId: string,
  extension: 'jpg' | 'png' | 'jpeg',
) {
  return `${userId}/${postId}/image/${imageId}.${extension}`;
}

export function generateVideoPath(userId: number, postId: string, videoId: string, extension: 'mp4') {
  return `${userId}/${postId}/video/${videoId}.${extension}`;
}
