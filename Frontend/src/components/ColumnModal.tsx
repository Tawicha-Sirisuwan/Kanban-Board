// src/components/CreateColumnModal.tsx
import React, { useState } from 'react';
import './ColumnModal.css';

interface CreateColumnModalProps {
  onClose: () => void;
  onCreate: (name: string, color: string) => void;
}

const ColumnModal: React.FC<CreateColumnModalProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#1e1e1e');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name, color);
    setName('');
    setColor('#1e1e1e');
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

          <label>เลือกสีพื้นหลัง</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <button type="submit">เพิ่มคอลัมน์</button>
        </form>
      </div>
    </div>
  );
};

export default ColumnModal;
