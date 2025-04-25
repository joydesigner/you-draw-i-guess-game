import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="fixed top-4 right-4 bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-lg">
      <p className="text-lg font-semibold text-primary-800">Score: {score}</p>
    </div>
  );
};

export default ScoreDisplay;