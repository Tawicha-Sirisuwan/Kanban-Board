import React, { useState } from 'react';
import { API_URL } from '../config';
import './BoardCard.css';

interface BoardCardProps {
  board: {
    id: number;
    title: string;
    description: string;
  };
  onClick: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;  // เพิ่ม callback สำหรับลบบอร์ด
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onClick, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(board.title);
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {
    if (!newName.trim()) {
      alert('กรุณากรอกชื่อบอร์ด');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return alert('กรุณาเข้าสู่ระบบ');

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/boards/${board.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newName.trim(),
          description: board.description,
        }),
      });

      if (res.ok) {
        setEditing(false);
        onUpdate && onUpdate();
      } else {
        alert('แก้ไขชื่อบอร์ดไม่สำเร็จ');
      }
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการแก้ไขชื่อบอร์ด');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('ยืนยันการลบบอร์ดนี้?')) return;

    const token = localStorage.getItem('token');
    if (!token) return alert('กรุณาเข้าสู่ระบบ');

    try {
      const res = await fetch(`${API_URL}/boards/${board.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert('ลบบอร์ดเรียบร้อย');
        onDelete && onDelete();
      } else {
        alert('ลบบอร์ดไม่สำเร็จ');
      }
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการลบบอร์ด');
    }
  };

return (
  <div className="board-card">
    <div className="board-card-header">
      <div className="board-title-container" onClick={() => !editing && onClick()}>
        <h3 className="board-title">{board.title}</h3>
        <p className="board-description">{board.description}</p>
      </div>

      {!editing && (
        <div className="board-card-actions">
          <button
            className="board-btn edit"
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
              setNewName(board.title);
            }}
            title="แก้ไขชื่อบอร์ด"
          >
            ✏️
          </button>
          <button
            className="board-btn delete"
            onClick={handleDelete}
            title="ลบบอร์ด"
          >
            X
          </button>
        </div>
      )}
    </div>

    {editing && (
      <>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          disabled={loading}
          autoFocus
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleRename();
            }
          }}
        />
        <button onClick={handleRename} disabled={loading}>
          {loading ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
        <button onClick={() => setEditing(false)} disabled={loading}>
          ยกเลิก
        </button>
      </>
    )}
  </div>
);
};

export default BoardCard;
