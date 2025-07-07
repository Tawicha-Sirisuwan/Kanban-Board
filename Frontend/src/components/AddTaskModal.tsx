import React, { useState } from 'react';
import type { Task } from '../models/TaskModels';
import { API_URL } from '../config';
import './AddTaskModal.css';


interface AddTaskModalProps {
  columnId: number;
  onClose: () => void;
  onTaskAdded: (task: Task) => void;  
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ columnId, onClose, onTaskAdded }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async () => {
    if (!taskTitle) {
      alert('กรุณากรอกชื่อของ Task');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
        column_id: columnId, 
        title: taskTitle,
        due_date: taskDueDate, 
        position: 0, 
      }),
      });

      if (res.ok) {
        const newTask = await res.json();  
        onTaskAdded(newTask);  
        onClose();  
      } else {
        throw new Error('ไม่สามารถเพิ่ม Task ได้');
      }
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการเพิ่ม Task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>เพิ่ม Task ใหม่</h3>
        <input
          type="text"
          placeholder="ชื่อ Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          className='due-date-input'
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleCreateTask} disabled={loading}>
            {loading ? 'กำลังเพิ่ม Task...' : 'เพิ่ม Task'}
          </button>
          <button onClick={onClose}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
