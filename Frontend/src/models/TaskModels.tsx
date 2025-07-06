export interface Task {
  id: number;
  title: string;
  assignee: string;
  department: string;
  members: string;
  date: string;
  status: 'Not started' | 'In development' | 'Testing' | 'Reviewing' | 'Done';
  column_id: number; 
}