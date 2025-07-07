export interface Task {
  id: number;           // ← task_id
  column_id: number;
  title: string;
  due_date: string;     // ← PostgreSQL date
  position: number;
  created_by: number;
  creator_name: string;

  // Optional UI fields (default fallback)
  status?: string;
  assignee?: string;
  department?: string;
  members?: string;
}
