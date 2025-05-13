import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { FormattedTask } from '../types/project';

const useTasks = (projectId?: string) => {
  const [tasks, setTasks] = useState<FormattedTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id: routeId } = useParams<{ id: string }>();
  
  // Use provided projectId if available, otherwise use route parameter
  const id = projectId || routeId;

  const fetchTasks = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const projectData = await projectService.getProject(id);
      
      if (projectData.formattedTasks) {
        // Add action handlers to each task
        const tasksWithHandlers = projectData.formattedTasks.map(task => ({
          ...task,
          actions: [
            { 
              label: 'Edit', 
              onClick: () => console.log(`Edit Task ${task.id}`) 
            },
            { 
              label: 'Delete', 
              onClick: async () => {
                try {
                  await projectService.deleteTask(id, task.id);
                  // After deletion, refresh the task list
                  fetchTasks();
                } catch (err) {
                  console.error("Failed to delete task:", err);
                  setError("Failed to delete task");
                }
              }
            },
          ]
        }));
        setTasks(tasksWithHandlers);
      } else {
        setTasks([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, id]);
  const addTask = useCallback(async (taskData: { 
    title: string; 
    description?: string;
    status?: 'todo' | 'in-progress' | 'review' | 'done';
    priority?: 'High' | 'Normal' | 'Low';
    dueDate?: Date | string;
    assignedAt?: Date | string;
    assignees?: string[];
    labels?: string[];
  }) => {
    if (!id) return null;
    
    setLoading(true);
    try {
      const taskToCreate = {
        ...taskData,
        dueDate: taskData.dueDate || taskData.assignedAt, // Ensure dueDate is set
      };
      await projectService.createTask(id, taskToCreate);
      await fetchTasks(); // Refresh the task list
      return true;
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task");
      return false;
    } finally {
      setLoading(false);
    }
  }, [id, fetchTasks]);
  const updateTask = useCallback(async (taskId: string, taskData: {
    title?: string;
    description?: string;
    status?: 'todo' | 'in-progress' | 'review' | 'done';
    priority?: 'High' | 'Normal' | 'Low';
    dueDate?: Date | string;
    assignees?: string[];
    labels?: string[];
  }) => {
    if (!id) return null;
    
    setLoading(true);
    try {
      await projectService.updateTask(id, taskId, taskData);
      await fetchTasks(); // Refresh the task list
      return true;
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task");
      return false;
    } finally {
      setLoading(false);
    }
  }, [id, fetchTasks]);

  return { tasks, loading, error, addTask, updateTask, refreshTasks: fetchTasks };
};

export default useTasks;
