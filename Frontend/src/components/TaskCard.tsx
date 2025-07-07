import React, { useState } from 'react';
import './TaskCard.css';
import type { Task } from '../models/TaskModels';
import { API_URL } from '../config';

interface TaskCardProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDueDate, setUpdatedDueDate] = useState(task.due_date ?? '');
  const [loading, setLoading] = useState(false);

 
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  
  const handleUpdateTask = async () => {
    const formattedDueDate = updatedDueDate ? new Date(updatedDueDate).toISOString().split('T')[0] : null;

    const updatedTask = {
      task_id: task.task_id,
      column_id: task.column_id,
      position: task.position,
      title: updatedTitle,
      due_date: formattedDueDate,
      creator_name: task.creator_name 
    };

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/tasks/${task.task_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update failed:', errorData);
        alert(`ไม่สามารถอัปเดต Task: ${errorData.message || 'Unknown error'}`);
        return;
      }

      const updatedData = await response.json();
      onTaskUpdated(updatedData);
      setEditing(false);
    } catch (err) {
      console.error('Update error:', err);
      alert('เกิดข้อผิดพลาดในการอัปเดต Task');
    } finally {
      setLoading(false);
    }
  };

 
  const handleDeleteTask = async () => {
    if (window.confirm('คุณต้องการลบ Task นี้หรือไม่?')) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/tasks/${task.task_id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          onTaskDeleted(task.task_id);
        } else {
          const error = await res.json();
          console.error('Delete failed:', error);
          alert('ไม่สามารถลบ Task');
        }
      } catch (error) {
        console.error(error);
        alert('เกิดข้อผิดพลาดในการลบ Task');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="task-card">
      {editing ? (
        <div className="task-edit-form">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="task-input"
            placeholder="ชื่อ Task"
          />
          <input
            type="date"
            value={updatedDueDate}
            onChange={(e) => setUpdatedDueDate(e.target.value)}
            className="task-input"
          />
          <div className="task-actions">
            <button className="task-btn save" onClick={handleUpdateTask} disabled={loading}>
              {loading ? 'กำลังอัปเดต Task...' : 'บันทึก'}
            </button>
            <button className="task-btn cancel" onClick={() => setEditing(false)}>
              ยกเลิก
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="task-title">{task.title}</h3>
          
          {/* เพิ่มส่วนแสดงชื่อผู้สร้าง */}
          <div className="task-field">
            <span className="task-label">👤 ผู้สร้าง: </span>
            <span className="task-value">
              {task.creator_name || 'ไม่ทราบผู้สร้าง'}
            </span>
          </div>
          
          <div className="task-field">
            <span className="task-label">📅 Deadline: </span>
            <span className="task-value">{formatDate(task.due_date)}</span>
          </div>

          <div className="task-actions">
            <button className="task-btn edit" onClick={() => setEditing(true)}>
              แก้ไข
            </button>
            <button className="task-btn delete" onClick={handleDeleteTask}>
              ลบ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;