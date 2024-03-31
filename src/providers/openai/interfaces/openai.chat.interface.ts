export type OpenAIRole = 'user' | 'system' | 'assistant';

export interface OpenAIMessage {
  role: OpenAIRole;
  content: string;
}
