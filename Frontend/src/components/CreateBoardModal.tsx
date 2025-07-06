import React, { useState } from 'react';
import './CreateBoardModal.css';
import type { Board } from '../models/BoardCardModels';
import { API_URL } from '../config';

interface CreateBoardModalProps {
  onClose: () => void;
  onCreate: (board: Board) => void;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('กรุณากรอกชื่อบอร์ด');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('ไม่พบ Token กรุณาเข้าสู่ระบบใหม่');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('❌ สร้างบอร์ดไม่สำเร็จ:', errText);
        throw new Error('สร้างบอร์ดไม่สำเร็จ');
      }

      const newBoard: Board = await response.json();
      onCreate(newBoard); // ส่งข้อมูลกลับไปแสดงบนหน้า BoardPage
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการสร้างบอร์ด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>สร้างบอร์ดใหม่</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>ชื่อบอร์ด</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="เช่น งานทีม UX"
          />

          <label>รายละเอียด</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="รายละเอียดเพิ่มเติม (ไม่บังคับ)"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'กำลังสร้าง...' : 'สร้างบอร์ด'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
