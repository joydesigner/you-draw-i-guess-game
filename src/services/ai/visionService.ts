
import { OpenAI } from 'openai';

type VisionServiceConfig = {
  apiKey: string;
  baseURL?: string;
}

type AIGuessResponse = {
  guess: string;
  confidence: number;
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
      const openai = new OpenAI({
        apiKey: this.apiKey,
        baseURL: this.baseURL,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
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
        max_tokens: 5000,
      });

      return {
        guess: response.choices[0].message.content || '',
        confidence: 0.8, // TODO: Implement confidence scoring
      };
    } catch (error) {
      console.error('Error in vision service:', error);
      throw error;
    }
  }
}
