// src/pages/BoardPage.tsx
import React, { useEffect, useState } from 'react';
import './BoardPage.css';
import Navbar from '../components/Navbar';
import BoardCard from '../components/BoardCard';
import CreateBoardModal from '../components/CreateBoardModal';

interface Board {
  id: number;
  name: string;
  description: string;
}

const BoardPage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const mockBoards: Board[] = [
      { id: 1, name: 'โครงการ Website', description: 'จัดการงานออกแบบเว็บไซต์' },
      { id: 2, name: 'ทีมการตลาด', description: 'วางแผนแคมเปญและโพสต์' },
      { id: 3, name: 'งานส่วนตัว', description: 'สิ่งที่ต้องทำในแต่ละวัน' },
    ];
    setBoards(mockBoards);
  }, []);

  const handleBoardCreated = (newBoard: Board) => {
    setBoards([...boards, newBoard]);
    setShowModal(false);
  };

  return (
    <>
      <Navbar /> {/* ✅ ไม่ต้องส่ง user แล้ว */}
      <div className="board-page-container">
        <div className="board-header">
          <h1>My Boards</h1>
          <button className="create-board-btn" onClick={() => setShowModal(true)}>
            + สร้างบอร์ดใหม่
          </button>
        </div>

        <div className="board-list">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>

        {showModal && (
          <CreateBoardModal
            onClose={() => setShowModal(false)}
            onCreate={handleBoardCreated}
          />
        )}
      </div>
    </>
  );
};

export default BoardPage;
