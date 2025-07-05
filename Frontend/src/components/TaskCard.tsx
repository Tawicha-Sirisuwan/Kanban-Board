import React from 'react';
import './TaskCard.css';
import type { Task } from '../models/TaskModels';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>

      <div className="task-field">
        <span className="task-label">✨ Status</span>
        <span className={`task-badge status-${task.status.toLowerCase().replace(/\s/g, '-')}`}>
          {task.status}
        </span>
      </div>

      <div className="task-field">
        <span className="task-label">🙋‍♀️ Assign</span>
        <span className="task-value">{task.assignee}</span>
      </div>

      <div className="task-field">
        <span className="task-label">📅 Deadline</span>
        <span className="task-value">{task.date}</span>
      </div>

      <div className="task-field">
        <span className="task-label">👨‍💻 Team</span>
        <span className="task-tag">{task.department}</span>
      </div>

      <div className="task-field">
        <span className="task-label">👥 Members</span>
        <span className="task-value">{task.members}</span>
      </div>
    </div>
  );
};

export default TaskCard;