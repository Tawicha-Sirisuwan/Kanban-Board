import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ColumnModal from '../components/ColumnModal';
import ColumnCard from '../components/ColumnCard';
import { API_URL } from '../config';
import './BoardDetail.css';
import type { Task } from '../models/TaskModels';

interface Column {
  id: number;
  name: string;
  color: string;
}

const BoardDetail: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();

  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!boardId) {
      navigate('/');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchColumns = async () => {
      try {
        const res = await fetch(`${API_URL}/board-columns/${boardId}`, {
  headers: { Authorization: `Bearer ${token}` },
});
        const data = await res.json();

        const mapped = data.map((col: any) => ({
          id: col.id ?? col.column_id,
          name: col.name ?? col.title ?? 'Untitled',
          color: col.color ?? '#1e1e1e',
        }));

        setColumns(mapped);
      } catch (err) {
        console.error('❌ Error loading columns:', err);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/boards/${boardId}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const mapped = data.map((task: any) => ({
          ...task,
          column_id: task.column_id ?? task.column?.id, // รองรับหลายกรณี
        }));

        setTasks(mapped);
      } catch (err) {
        console.error('❌ Error loading tasks:', err);
      }
    };

    fetchColumns();
    fetchTasks();
  }, [boardId, navigate]);

  return (
    <div className="board-detail-container">
      <Navbar />

      <div className="board-detail-header">
        <h2>รายละเอียดบอร์ด #{boardId}</h2>
        <button
          className="board-detail-add-column-btn"
          onClick={() => setShowModal(true)}
        >
          + เพิ่มคอลัมน์
        </button>
      </div>

      <div className="board-detail-kanban">
        {columns.map((col) => (
          <ColumnCard
            key={col.id}
            columnId={col.id}
            title={col.name}
            color={col.color}
            tasks={tasks.filter((task) => task.column_id === col.id)}
          />
        ))}
      </div>

      {showModal && boardId && (
        <ColumnModal
          onClose={() => setShowModal(false)}
          boardId={parseInt(boardId)}
          onCreate={async () => {
            setShowModal(false);
            await new Promise((r) => setTimeout(r, 100));
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/boards/${boardId}/columns`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            const mapped = data.map((col: any) => ({
              id: col.id ?? col.column_id,
              name: col.name ?? col.title ?? 'Untitled',
              color: col.color ?? '#1e1e1e',
            }));
            setColumns(mapped);
          }}
        />
      )}
    </div>
  );
};

export default BoardDetail;
