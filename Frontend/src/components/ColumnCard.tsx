import React, { useState } from 'react';
import TaskCard from './TaskCard';
import type { Task } from '../models/TaskModels';
import { API_URL } from '../config';
import './ColumnCard.css';

interface ColumnProps {
  columnId: number;
  title: string;
  color: string;
  tasks: Task[];
  onUpdate?: () => void; // <-- callback สำหรับ reload
}

const ColumnCard: React.FC<ColumnProps> = ({ columnId, title, color, tasks, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleRename = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('กรุณาเข้าสู่ระบบ');

    try {
      const res = await fetch(`${API_URL}/board-columns/${columnId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (res.ok) {
        setEditing(false);
        onUpdate?.();
      } else {
        alert('แก้ไขชื่อไม่สำเร็จ');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('ยืนยันการลบคอลัมน์นี้?')) return;

    const token = localStorage.getItem('token');
    if (!token) return alert('กรุณาเข้าสู่ระบบ');

    try {
      const res = await fetch(`${API_URL}/board-columns/${columnId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        onUpdate?.();
      } else {
        alert('ลบไม่สำเร็จ');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="column" style={{ backgroundColor: color }}>
      <div className="column-header">
        {editing ? (
          <>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="column-edit-input"
            />
            <button onClick={handleRename}>บันทึก</button>
            <button onClick={() => setEditing(false)}>ยกเลิก</button>
          </>
        ) : (
          <>
            <span>{title}</span>
            <button onClick={() => setEditing(true)}>✏️</button>
            <button onClick={handleDelete}>🗑️</button>
          </>
        )}
      </div>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ColumnCard;
