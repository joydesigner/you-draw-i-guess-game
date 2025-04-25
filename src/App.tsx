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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">You Draw, I Guess!</h1>
          <p className="text-secondary-700">Draw something and let AI guess what it is!</p>
        </header>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="relative">
                  <DrawingCanvas 
                    width={800} 
                    height={600} 
                    className="border-2 border-secondary-200 rounded-xl w-full h-auto" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {isGuessing && (
                      <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                        AI is guessing...
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col gap-6">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-primary-800 mb-2">AI Guess</h2>
                  {guess ? (
                    <p className="text-primary-700">{guess}</p>
                  ) : (
                    <p className="text-secondary-500">Draw something and click guess!</p>
                  )}
                </div>
                
                <button
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  onClick={() => {
                    const canvas = document.querySelector('canvas');
                    if (canvas) handleGuess(canvas);
                  }}
                  disabled={isGuessing}
                >
                  {isGuessing ? 'Guessing...' : 'What am I drawing?'}
                </button>
                
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    {error}
                  </div>
                )}
                
                {guess && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                    <p className="font-bold">I think you're drawing:</p>
                    <p className="text-xl">{guess}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
