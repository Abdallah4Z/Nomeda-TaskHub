import { FormattedTask } from '../../../../../types/project';

// Define types for the task components
export interface Task {
  id: string;
  title: string;
  users: { name: string; avatar: string }[];
  assignedAt: string;
  priority: 'High' | 'Normal' | 'Low';
  deadline?: Date;
  status?: string;
  assignees?: string[];
  description?: string;
}

export interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export interface FeedbackState {
  message: string;
  severity: 'success' | 'error';
}

export interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  task?: Task | null;
  availableAssignees: { name: string; avatar: string }[];
  onSubmit: (taskData: TaskFormData) => Promise<void>;
  boardStatus: 'todo' | 'in-progress' | 'review' | 'done';
  isSubmitting: boolean;
}

export interface TaskFormData {
  title: string;
  priority: 'High' | 'Normal' | 'Low';
  assignees: string[];
  deadline: Date | null;
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

export interface TaskViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, newStatus: 'todo' | 'in-progress' | 'review' | 'done') => Promise<void>;
  getColorByLabel: (label: string) => "warning" | "info" | "success" | "error" | "secondary" | "primary" | "default";
}

export interface BoardHeaderProps {
  label: string;
  actions: Action[];
  getColorByLabel: (label: string) => "warning" | "info" | "success" | "error" | "secondary" | "primary" | "default";
}

export interface BoardProps {
  label: string;
  tasks: FormattedTask[];
}
