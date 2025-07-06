// src/components/ColumnModal.tsx
import React, { useState } from 'react';
import './ColumnModal.css';
import { API_URL } from '../config';

interface CreateColumnModalProps {
  boardId: number;
  onClose: () => void;
  onCreate: () => void; // fetchColumns หลังสร้างสำเร็จ
}

const ColumnModal: React.FC<CreateColumnModalProps> = ({
  boardId,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/board-columns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          board_id: boardId,
          title: name,
        }),
      });

      if (!res.ok) throw new Error('สร้างคอลัมน์ไม่สำเร็จ');
      await res.json();

      onCreate(); // ดึงข้อมูลใหม่
      onClose();  // ปิด Modal
    } catch (err) {
      console.error('❌ สร้าง column ล้มเหลว:', err);
      alert('เกิดข้อผิดพลาดในการสร้างคอลัมน์');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="column-modal-overlay">
      <div className="column-modal-content">
        <div className="column-modal-header">
          <h2>สร้างคอลัมน์ใหม่</h2>
          <button className="column-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="column-modal-form" onSubmit={handleSubmit}>
          <label>ชื่อคอลัมน์</label>
          <input
            type="text"
            placeholder="เช่น งานใหม่"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'กำลังเพิ่ม...' : 'เพิ่มคอลัมน์'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ColumnModal;
