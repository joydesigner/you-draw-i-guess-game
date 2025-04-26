import { Router } from 'express';
import { Request, Response } from 'express';

type DrawingData = {
  strokes: Array<{
    points: Array<{ x: number; y: number }>;
    color: string;
    width: number;
  }>;
  canvasWidth: number;
  canvasHeight: number;
};

const router = Router();

// Store drawings in memory (replace with database in production)
const drawings: Record<string, DrawingData> = {};

router.post('/api/canvas', (req: Request, res: Response): void => {
  try {
    const { drawingId, data }: { drawingId: string; data: DrawingData } = req.body;
    
    // Validate input
    if (!drawingId || !data || !Array.isArray(data.strokes)) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }
    
    // Store drawing data
    drawings[drawingId] = data;
    
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error saving drawing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/canvas/:drawingId', (req: Request, res: Response): void => {
  try {
    const { drawingId } = req.params;
    
    if (!drawings[drawingId]) {
      res.status(404).json({ error: 'Drawing not found' });
      return;
    }
    
    res.json(drawings[drawingId]);
  } catch (error) {
    console.error('Error retrieving drawing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;