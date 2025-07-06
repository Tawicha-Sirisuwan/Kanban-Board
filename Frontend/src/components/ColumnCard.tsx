import React from 'react';
import TaskCard from './TaskCard';
import type { Task } from '../models/TaskModels';
import './ColumnCard.css';

interface ColumnProps {
  title: string;
  color: string;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, color, tasks }) => {
  return (
    <div className="column" style={{ backgroundColor: color }}>
      <div className="column-header">{title}</div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
