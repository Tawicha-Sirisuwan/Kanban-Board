import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import type { Task } from '../models/TaskModels';
import Navbar from '../components/Navbar';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config'; // ถ้ามี config.tsx

// ✅ mock task list
const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Integrate into existing codebase',
    assignee: 'Andrea Lim',
    department: 'Engineering',
    members: 'John, Sarah',
    date: 'December 23, 2024',
    status: 'Testing',
  },
  {
    id: 2,
    title: 'Fix login bug on mobile',
    assignee: 'Ben Lang',
    department: 'QA',
    members: 'David',
    date: 'December 25, 2024',
    status: 'In development',
  },
  {
    id: 3,
    title: 'Prepare demo slides for client',
    assignee: 'Emily Chan',
    department: 'Marketing',
    members: 'Olivia, Kevin',
    date: 'December 28, 2024',
    status: 'Not started',
  },
  {
    id: 4,
    title: 'UI Review for Settings Page',
    assignee: 'Nate Martins',
    department: 'Design',
    members: 'Sophie',
    date: 'December 26, 2024',
    status: 'Reviewing',
  },
  {
    id: 5,
    title: 'Deploy version 1.1.0',
    assignee: 'Sohrab Amin',
    department: 'DevOps',
    members: 'John',
    date: 'December 27, 2024',
    status: 'Done',
  },
];

// ✅ สถานะของแต่ละคอลัมน์
const statusColumns = [
  { key: 'Not started', color: '#1e1e1e' },
  { key: 'In development', color: '#003554' },
  { key: 'Testing', color: '#3a003a' },
  { key: 'Reviewing', color: '#2d1b4f' },
  { key: 'Done', color: '#0b3d2e' },
];

const Main: React.FC = () => {
  const [tasks] = useState(initialTasks);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Unauthorized');

        const data = await res.json();

        setUser({
          name: data.username || data.email || 'User',
          avatar: './image/user_profile.jpg', 
        });
      } catch (err) {
        console.error('⚠️ Failed to fetch user', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <div className="loading">Loading user...</div>;

  return (
    <div className="main-container">
      <Navbar user={user} />

      <div className="kanban-board">
        {statusColumns.map((col) => (
          <div key={col.key} className="kanban-column" style={{ backgroundColor: col.color }}>
            <div className="kanban-column-header">{col.key}</div>

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

export default Main;
