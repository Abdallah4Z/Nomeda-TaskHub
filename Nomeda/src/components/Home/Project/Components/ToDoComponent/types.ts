export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  category: string;
  createdAt: string;
}

export interface DropdownMenuItem {
  label: string;
  action: () => void;
}