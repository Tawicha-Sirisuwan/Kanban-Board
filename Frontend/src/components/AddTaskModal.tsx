import React, { useState } from 'react';
import { API_URL } from '../config';
import './AddTaskModal.css';

// เพิ่ม columnId ลงใน AddTaskModalProps
interface AddTaskModalProps {
  columnId: number;
  onClose: () => void;
  onTaskAdded: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ columnId, onClose, onTaskAdded }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState<string>(''); // state สำหรับ due date
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
          column_id: columnId, // ส่ง columnId ไปยัง API
          title: taskTitle,     // ชื่อของ Task
          position: 0,          // ตำแหน่งของ Task (สามารถปรับได้)
          due_date: taskDueDate, // วันที่ครบกำหนด
        }),
      });

      if (res.ok) {
        alert('Task ถูกเพิ่มเรียบร้อย!');
        onTaskAdded();  // รีเฟรช Task
        onClose(); // ปิด Modal
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
        <textarea
          placeholder="รายละเอียด Task"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="วันที่ครบกำหนด"
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
