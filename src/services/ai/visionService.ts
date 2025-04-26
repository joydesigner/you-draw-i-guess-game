import { AIGuessResponse } from '../../types/ai';

export interface VisionServiceConfig {
  apiKey: string;
  baseURL?: string;
}

export class VisionService {
  private readonly apiKey: string;
  private readonly baseURL: string;

  constructor(config: VisionServiceConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || 'https://api.openai.com/v1';
  }

  async guessDrawing(imageBase64: string): Promise<AIGuessResponse> {
    try {
      const response = await fetch(`${this.baseURL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'What is being drawn in this image? Please provide a short, direct answer.',
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/png;base64,${imageBase64}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 50,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        guess: data.choices[0].message.content,
        confidence: 0.8, // TODO: Implement confidence scoring
      };
    } catch (error) {
      console.error('Error in vision service:', error);
      throw error;
    }
  }
}
