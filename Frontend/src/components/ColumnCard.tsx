import React from 'react';
import TaskCard from './TaskCard';
import type { Task } from '../models/TaskModels';
import './ColumnCard.css';

interface ColumnProps {
  columnId: number;
  title: string;
  color: string;
  tasks: Task[];
}

const ColumnCard: React.FC<ColumnProps> = ({ title, color, tasks }) => {
  return (
    <div className="column" style={{ backgroundColor: color }}>
      <div className="column-header">{title}</div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ColumnCard;
