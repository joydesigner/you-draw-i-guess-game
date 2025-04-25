import React from 'react';
import DrawingCanvas from './components/Canvas/DrawingCanvas';
import { VisionService } from './services/ai/visionService';
import { getCanvasAsBase64 } from './utils/canvasUtils';
import './App.css';

function App() {
  const [guess, setGuess] = React.useState<string>('');
  const [isGuessing, setIsGuessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const visionService = React.useMemo(() => {
    return new VisionService({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    });
  }, []);

  const handleGuess = async (canvas: HTMLCanvasElement) => {
    try {
      setIsGuessing(true);
      setError(null);
      const imageBase64 = getCanvasAsBase64(canvas);
      const response = await visionService.guessDrawing(imageBase64);
      setGuess(response.guess);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to guess drawing');
    } finally {
      setIsGuessing(false);
    }
  };

  return (
    <div className="app-container">
      <h1>You Draw, I Guess!</h1>
      <div className="game-area">
        <DrawingCanvas width={800} height={600} />
        <div className="controls">
          <button
            onClick={() => {
              const canvas = document.querySelector('canvas');
              if (canvas) handleGuess(canvas);
            }}
            disabled={isGuessing}
          >
            {isGuessing ? 'Guessing...' : 'What am I drawing?'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        {guess && <div className="guess">I think you're drawing: {guess}</div>}
      </div>
    </div>
  );
}

export default App;
