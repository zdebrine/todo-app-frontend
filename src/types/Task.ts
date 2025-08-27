export interface Task {
  id: number;
  title: string;
  color?: string;
  completed: boolean;
  updatedAt: Date;
  createdAt: Date;
}
