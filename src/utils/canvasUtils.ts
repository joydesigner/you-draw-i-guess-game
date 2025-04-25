export interface Point {
  x: number;
  y: number;
}

export interface DrawingState {
  isDrawing: boolean;
  lastPoint: Point | null;
}

export const initializeCanvas = (context: CanvasRenderingContext2D): void => {
  context.strokeStyle = '#000000';
  context.lineWidth = 2;
  context.lineCap = 'round';
  context.lineJoin = 'round';
};

export const drawLine = (context: CanvasRenderingContext2D, start: Point, end: Point): void => {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
  context.closePath();
};

export const clearCanvas = (context: CanvasRenderingContext2D): void => {
  const canvas = context.canvas;
  context.clearRect(0, 0, canvas.width, canvas.height);
};

export const getCanvasAsBase64 = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL('image/png').split(',')[1];
};
