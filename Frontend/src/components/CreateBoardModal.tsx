// src/components/CreateBoardModal.tsx
import React, { useState } from 'react';
import './CreateBoardModal.css';
import type { Board } from '../models/BoardCardModels';

interface CreateBoardModalProps {
  onClose: () => void;
  onCreate: (board: Board) => void;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ สร้าง mock board โดยใช้ id เป็น timestamp
    const newBoard: Board = {
      id: Date.now(), // สร้าง id ชั่วคราว
      name,
      description,
    };

    onCreate(newBoard); // ส่งกลับไปยัง BoardPage
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
      <input type="text" value={name} onChange={e => setName(e.target.value)} required />

      <label>รายละเอียด</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} />

      <button type="submit">สร้างบอร์ด</button>
    </form>
  </div>
</div>
  );
};

export default CreateBoardModal;
