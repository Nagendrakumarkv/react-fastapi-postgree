export type TaskStatus =
  | 'Pending'
  | 'In Progress'
  | 'Completed';

export type TaskFilter = 'All' | TaskStatus;

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}