// src/components/BoardCard.tsx
import React from 'react';
import './BoardCard.css';

interface BoardCardProps {
  board: {
    id: number;
    name: string;
    description: string;
  };
  onClick: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onClick }) => {
  return (
    <div className="board-card" onClick={onClick}>
      <h3>{board.name}</h3>
      <p>{board.description}</p>
    </div>
  );
};

export default BoardCard;
