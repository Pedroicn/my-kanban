export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  checklist?: { label: string; checked: boolean }[];
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string[];
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  members: string[];
}
