export type Priority = 'high' | 'medium' | 'low';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  priorityCounts: Record<Priority, number>;
}