import React from 'react';
import './TaskCard.css';
import type { Task } from '../models/TaskModels';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>

      <div className="task-field">
        <span className="task-label">✨ Status</span>
        <span
          className={`task-badge status-${(task.status ?? 'To Do')
            .toLowerCase()
            .replace(/\s/g, '-')}`}
        >
          {task.status ?? 'To Do'}
        </span>
      </div>

      <div className="task-field">
        <span className="task-label">🙋‍♀️ Assign</span>
        <span className="task-value">{task.assignee ?? '-'}</span>
      </div>

      <div className="task-field">
        <span className="task-label">📅 Deadline</span>
        <span className="task-value">{formatDate(task.due_date)}</span>
      </div>

      <div className="task-field">
        <span className="task-label">👨‍💻 Team</span>
        <span className="task-tag">{task.department ?? '-'}</span>
      </div>

      <div className="task-field">
        <span className="task-label">👥 Members</span>
        <span className="task-value">{task.creator_name ?? '-'}</span>
      </div>
    </div>
  );
};

export default TaskCard;
