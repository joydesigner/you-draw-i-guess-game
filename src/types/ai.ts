
export interface DrawingData {
  imageData: string;
  timestamp: number;
}

export interface AIServiceError {
  message: string;
  code?: string;
  details?: unknown;
}
