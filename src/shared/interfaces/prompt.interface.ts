interface Scene {
  scriptKR: string;
  scriptUS: string;
  imagePrompt: string;
}

export interface StoryBoardTemplate {
  originContent: string;
  scenes: Scene[];
}
