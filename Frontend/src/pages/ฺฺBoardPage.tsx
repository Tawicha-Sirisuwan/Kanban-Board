// src/pages/BoardPage.tsx
import React, { useEffect, useState } from 'react';
import './BoardPage.css';
import Navbar from '../components/Navbar';
import BoardCard from '../components/BoardCard';
import CreateBoardModal from '../components/CreateBoardModal';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

interface Board {
  id: number;
  name: string;
  description: string;
}

const BoardPage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockBoards: Board[] = [
      { id: 1, name: 'โครงการ Website', description: 'จัดการงานออกแบบเว็บไซต์' },
      { id: 2, name: 'ทีมการตลาด', description: 'วางแผนแคมเปญและโพสต์' },
      { id: 3, name: 'งานส่วนตัว', description: 'สิ่งที่ต้องทำในแต่ละวัน' },
    ];
    setBoards(mockBoards);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Unauthorized');

        const data = await res.json();

        setUser({
          name: data.username || data.email || 'User',
          avatar: './image/user_profile.jpg',
        });
      } catch (err) {
        console.error('⚠️ Failed to fetch user', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleBoardCreated = (newBoard: Board) => {
    setBoards([...boards, newBoard]);
    setShowModal(false);
  };

  if (!user) return <div className="loading">Loading user...</div>;

  return (
    <>
      <Navbar/>
      <div className="board-page-container">
        <div className="board-header">
          <h1>My Boards</h1>
          <button className="create-board-btn" onClick={() => setShowModal(true)}>
            + สร้างบอร์ดใหม่
          </button>
        </div>

        <div className="board-list">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onClick={() => navigate(`/board/${board.id}`)}
            />
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
