import { OpenAIMessage } from '../../providers/openai/interfaces/openai.chat.interface';

export const USER_PROMPT: OpenAIMessage = {
  role: 'user',
  content: `Please summarize the following article in up to three sentences. List all the individuals mentioned in the article and their roles. Summarize the main events of the article in chronological order. Compile the opinions quoted in the article.

  Based on the summarized information, creatively reconstruct a day in the city where the event occurred, weaving it into a story.
  
  Include emotional elements in the story to highlight the significance of the event. Describe the background and the environment in which the event occurred and its impact on the protagonist.
  
  After composing the story, for each scene, please:
  
  Detail the Background, Characters, and Situation: Describe the setting, individuals involved, and what is happening in each scene. For example, 'In scene 1, the protagonist walks through the city's central park, reflecting on recent events.'
  Set the Emotional Tone and Atmosphere: Clearly define the emotional mood and atmosphere of the scene.
  Suggest Dialogue and Narration: Propose how dialogue or narration could unfold the story.
  Emphasize Visual Details: Specify the visual elements of each scene.
  Direct Story Progression: Guide how the story should move to the next step or transition from one scene to the next.
  Structure each scene following these steps.
  
  "Please return the following in the format specified:
  ---format 
  {
  summary : string // in korean
  scenes:  [
    {
    background: string, 
    characters:  string
    situation: string
    emotions_and_atmosphere:  string
    dialogue_and_Narration: string
    visual_details: string
    storyProgression: string
  news_summary_in_scene : string 
  }
] 
}
---format
  `,
};
