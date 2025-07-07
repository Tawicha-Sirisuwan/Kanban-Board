import React, { useState } from 'react';
import TaskCard from './TaskCard';
import type { Task } from '../models/TaskModels';
import { API_URL } from '../config';
import './ColumnCard.css';
import AddTaskModal from './AddTaskModal';  // เพิ่มการใช้งาน AddTaskModal

interface ColumnProps {
  columnId: number;
  title: string;
  tasks: Task[];
  onUpdate?: () => void;
}

const ColumnCard: React.FC<ColumnProps> = ({ columnId, title, tasks, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isModalOpen, setIsModalOpen] = useState(false); // สำหรับเปิด/ปิด AddTaskModal

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

  const openAddTaskModal = () => {
    setIsModalOpen(true); // เปิด Modal เพื่อเพิ่ม Task
  };

  const closeAddTaskModal = () => {
    setIsModalOpen(false); // ปิด Modal
  };

  const handleTaskAdded = () => {
    onUpdate?.(); // รีเฟรชข้อมูลเมื่อเพิ่ม Task เสร็จ
    closeAddTaskModal(); // ปิด Modal
  };

  return (
    <div className="column-card">
      <div className="column-header">
        {editing ? (
          <>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="column-edit-input"
            />
            <button className="column-btn save" onClick={handleRename}>💾</button>
            <button className="column-btn cancel" onClick={() => setEditing(false)}>❌</button>
          </>
        ) : (
          <>
            <h3 className="column-title">{title}</h3>
            <div className="column-actions">
              <button className="column-btn add" onClick={openAddTaskModal} title="เพิ่มการ์ด">＋</button>
              <button className="column-btn edit" onClick={() => setEditing(true)} title="แก้ไข">✏️</button>
              <button className="column-btn delete" onClick={handleDelete} title="ลบคอลัมน์">🗑️</button>
            </div>
          </>
        )}
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* เพิ่ม AddTaskModal */}
      {isModalOpen && (
        <AddTaskModal
          columnId={columnId}
          onClose={closeAddTaskModal}
          onTaskAdded={handleTaskAdded}
        />
      )}
    </div>
  );
};

export default ColumnCard;
