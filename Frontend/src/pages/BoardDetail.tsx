import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';
import type { Task } from '../models/TaskModels';
import Navbar from '../components/Navbar';
import './BoardDetail.css';

const initialTasks: Task[] = [
  // ... (ข้อมูล task เดิม)
];

const defaultStatusColumns = [
  { key: 'Not started', color: '#1e1e1e' },
  { key: 'In development', color: '#003554' },
  { key: 'Testing', color: '#3a003a' },
  { key: 'Reviewing', color: '#2d1b4f' },
  { key: 'Done', color: '#0b3d2e' },
];

const BoardDetail: React.FC = () => {
  const [tasks] = useState(initialTasks);
  const [columns, setColumns] = useState(defaultStatusColumns);

  const handleAddColumn = () => {
    const name = prompt("ชื่อคอลัมน์ใหม่:");
    if (name && name.trim()) {
      setColumns([
        ...columns,
        { key: name.trim(), color: '#4a4a4a' }, // สี default
      ]);
    }
  };

  return (
    <div className="board-detail-container">
      <Navbar />

      <div className="board-detail-header">
        <h2>รายละเอียดบอร์ด</h2>
        <button className="board-detail-add-column-btn" onClick={handleAddColumn}>
          + เพิ่มคอลัมน์
        </button>
      </div>

      <div className="board-detail-kanban">
        {columns.map((col) => (
          <div
            key={col.key}
            className="board-detail-column"
            style={{ backgroundColor: col.color }}
          >
            <div className="board-detail-column-header">{col.key}</div>
            {tasks
              .filter((task) => task.status === col.key)
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardDetail;
