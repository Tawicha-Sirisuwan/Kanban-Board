// src/components/BoardCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardCard.css';
import type { Board } from '../models/BoardCardModels';

const BoardCard: React.FC<{ board: Board }> = ({ board }) => {
  const navigate = useNavigate();

  return (
    <div className="board-card" onClick={() => navigate(`/boards/${board.id}`)}>
      <h2>{board.name}</h2>
      <p>{board.description}</p>
    </div>
  );
};

export default BoardCard;
