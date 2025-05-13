// types.ts
export interface Task {
    id: number;
    title: string;
    dueDate: Date;
    priority: 'high' | 'medium' | 'low';
    status: 'completed' | 'in-progress' | 'pending';
    category?: string;
    assignee?: string;
  }
  
  export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    tasks: Task[];
  }
  
  export type ViewType = 'month' | 'week' | 'day';