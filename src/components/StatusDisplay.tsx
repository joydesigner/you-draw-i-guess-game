import React from 'react';
import './StatusDisplay.css';

type GameStatus = 'Drawing' | 'Guessing' | 'Game Over';

interface StatusDisplayProps {
  status: GameStatus;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
  return (
    <div className="status-display">
      <h3>Game Status: {status}</h3>
    </div>
  );
};

export default StatusDisplay;