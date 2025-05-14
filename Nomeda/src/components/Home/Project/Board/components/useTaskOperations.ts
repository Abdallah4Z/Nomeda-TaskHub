import { useState } from 'react';
import { TaskFormData, Task, FeedbackState } from './types';

export interface UseTaskOperationsProps {
  projectId: string;
  addTask: (taskData: any) => Promise<boolean | null>;
  updateTask: (taskId: string, taskData: any) => Promise<boolean | null>;
  refreshTasks: () => void;
  availableAssignees: { name: string; avatar: string }[];
}

export default function useTaskOperations({
  projectId,
  addTask,
  updateTask,
  refreshTasks,
  availableAssignees
}: UseTaskOperationsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBoardLoading, setIsBoardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>({ message: '', severity: 'success' });

  // Task operations
  const handleAddTask = async (formData: TaskFormData, localTasks: Task[], setLocalTasks: (tasks: Task[]) => void) => {
    setIsSubmitting(true);
    
    try {
      // Prepare task data
      const taskData = {
        title: formData.title,
        description: '',
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.deadline || undefined,
        assignees: formData.assignees || []
      };
      
      // Call the API to add the task
      const success = await addTask(taskData);
      
      if (success) {
        // Create local task for immediate feedback
        const assigneesData = formData.assignees
          .map((name: string) => availableAssignees.find(a => a.name === name))
          .filter(Boolean);
        
        const task: Task = {
          id: Date.now().toString(),
          title: formData.title,
          users: assigneesData as { name: string; avatar: string }[],
          assignedAt: new Date().toLocaleDateString(),
          priority: formData.priority,
          deadline: formData.deadline || undefined,
          assignees: formData.assignees || [],
          status: formData.status
        };
        
        setLocalTasks([...localTasks, task]);
        setFeedback({ 
          message: 'Task added successfully!', 
          severity: 'success' 
        });
        setShowFeedback(true);
        return true;
      } else {
        throw new Error('Failed to add task');
      }
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please try again.');
      setFeedback({ 
        message: 'Failed to add task', 
        severity: 'error' 
      });
      setShowFeedback(true);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTask = async (formData: TaskFormData, selectedTask: Task, localTasks: Task[], setLocalTasks: (tasks: Task[]) => void) => {
    if (!selectedTask) return false;
    
    setIsSubmitting(true);
    setIsBoardLoading(true);
    setError(null);
    
    try {
      // Prepare task data for API update
      const taskData = {
        title: formData.title,
        description: selectedTask.description || '',
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.deadline || undefined,
        assignees: formData.assignees || []
      };
      
      // Call the API to update the task
      const success = await updateTask(selectedTask.id, taskData);
      
      if (success) {
        // For immediate UI update without waiting for refresh
        const assigneesData = formData.assignees
          .map((name: string) => availableAssignees.find(a => a.name === name))
          .filter(Boolean);
        
        const updatedTask: Task = {
          ...selectedTask,
          title: formData.title,
          users: assigneesData as { name: string; avatar: string }[],
          priority: formData.priority,
          deadline: formData.deadline || undefined,
          assignees: formData.assignees,
          status: formData.status
        };
        
        setLocalTasks(localTasks.map(task => task.id === selectedTask.id ? updatedTask : task));
        
        setFeedback({
          message: 'Task updated successfully!',
          severity: 'success'
        });
        setShowFeedback(true);
        
        // Refresh tasks from backend to ensure we have the latest data
        refreshTasks();
        return true;
      } else {
        throw new Error('Failed to update task');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
      setFeedback({
        message: 'Failed to update task',
        severity: 'error'
      });
      setShowFeedback(true);
      return false;
    } finally {
      setIsSubmitting(false);
      setIsBoardLoading(false);
    }
  };
  
  const handleUpdateTaskStatus = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'review' | 'done', localTasks: Task[], setLocalTasks: (tasks: Task[]) => void) => {
    setIsBoardLoading(true);
    setError(null);
    
    try {
      // Prepare task data for API update
      const taskData = {
        status: newStatus,
      };
      
      // Call the API to update the task
      const success = await updateTask(taskId, taskData);
      
      if (success) {
        // For immediate UI update without waiting for refresh
        setLocalTasks(localTasks.filter(task => task.id !== taskId));
        
        setFeedback({
          message: `Task moved to ${
            newStatus === 'todo' ? 'To Do' : 
            newStatus === 'in-progress' ? 'In Progress' : 
            newStatus === 'review' ? 'Review' : 'Done'
          } board`,
          severity: 'success'
        });
        setShowFeedback(true);
        
        // Refresh tasks from backend to ensure we have the latest data
        refreshTasks();
        return true;
      } else {
        throw new Error('Failed to update task status');
      }
    } catch (err) {
      console.error('Error updating task status:', err);
      setError('Failed to update task status. Please try again.');
      setFeedback({
        message: 'Failed to update task status',
        severity: 'error'
      });
      setShowFeedback(true);
      return false;
    } finally {
      setIsBoardLoading(false);
    }
  };

  const handleFeedbackClose = () => setShowFeedback(false);

  return {
    isSubmitting,
    isBoardLoading,
    setIsBoardLoading,
    error,
    setError,
    showFeedback,
    setShowFeedback,
    feedback,
    setFeedback,
    handleAddTask,
    handleEditTask,
    handleUpdateTaskStatus,
    handleFeedbackClose
  };
}
