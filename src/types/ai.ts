export interface AIGuessResponse {
  guess: string;
  confidence: number;
}

export interface DrawingData {
  imageData: string;
  timestamp: number;
}

export interface AIServiceError {
  message: string;
  code?: string;
  details?: unknown;
}