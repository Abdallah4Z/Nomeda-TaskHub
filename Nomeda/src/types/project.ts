export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FormattedUser {
  name: string;
  avatar: string;
}

export interface TaskAction {
  label: string;
  onClick: () => void;
}

export interface Task {
  _id: string;
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'High' | 'Normal' | 'Low';
  assignees: string[] | User[];
  dueDate?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  labels?: string[];
}

export interface FormattedTask {
  assignees: any;
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: 'High' | 'Normal' | 'Low';
  assignedAt?: string;
  dueDate?: Date | string;
  users: FormattedUser[];
  labels?: string[];
  actions: TaskAction[];
}

export interface Block {
  _id: string;
  type: string;
  title?: string;
  content: any;
  position: { x: number, y: number };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CalendarEvent {
  _id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  description?: string;
  taskId?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface File {
  _id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: Date | string;
  updatedBy: string | User;
}

export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalMembers: number;
  upcomingDeadlines?: Task[];
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  owner: string | User;
  members: (string | User)[];
  tasks: Task[];
  blocks: Block[];
  calendarEvents: CalendarEvent[];
  files: File[];
  createdAt: Date | string;
  updatedAt: Date | string;
  stats?: ProjectStats;
  formattedTasks?: FormattedTask[];
}