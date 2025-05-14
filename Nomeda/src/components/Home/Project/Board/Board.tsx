import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Add, Delete } from '@mui/icons-material';

import useTasks from '../../../../hooks/useTasks';
import { projectService } from '../../../../services/projectService';
import '../../../../style/board.css';

// Import components from the components folder
import {
  TaskDialog,
  TaskViewDialog,
  BoardHeader,
  LoadingOverlay,
  TaskCardList,
  FeedbackSnackbar,
  TaskDeleteDialogs,
  useTaskOperations,
  Task,
  TaskFormData,
  Action,
  BoardProps,
  getColorByLabel,
  getBoardStatusFromLabel
} from './components';

// Using imported TaskDialog component from ./components

const Board: React.FC<BoardProps> = ({ label, tasks = [] }) => {
  // Route parameters
  const { id: routeProjectId } = useParams<{ id: string }>();
  const projectId = routeProjectId || (window.location.pathname.split('/projects/')[1] || '').split('/')[0];
  
  // Hooks
  const { addTask, updateTask, refreshTasks } = useTasks(projectId);
  
  // State
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [isViewTaskDialogOpen, setIsViewTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string>('');
  
  // Available assignees
  const availableAssignees = [
    { name: 'John Doe', avatar: `https://robohash.org/john?set=set5` },
    { name: 'Jane Smith', avatar: `https://robohash.org/jane?set=set5` },
    { name: 'Mike Johnson', avatar: `https://robohash.org/mike?set=set5` },
  ];
  
  // Task operations hook
  const {
    isSubmitting,
    isBoardLoading,
    setIsBoardLoading,
    showFeedback,
    feedback,
    handleAddTask: addTaskOperation,
    handleEditTask: editTaskOperation,
    handleUpdateTaskStatus: updateTaskStatusOperation,
    handleFeedbackClose
  } = useTaskOperations({
    projectId,
    addTask,
    updateTask,
    refreshTasks,
    availableAssignees
  });
  
  // Get status from label using our utility function
  const getBoardStatus = () => getBoardStatusFromLabel(label);

  // Update local tasks when props tasks change
  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      // Convert FormattedTask to the Task interface
      const convertedTasks = tasks.map(task => ({
        id: task.id,
        title: task.title,
        users: task.users || [],
        assignedAt: task.assignedAt || '',
        priority: task.priority || 'Normal',
        status: task.status,
        deadline: task.dueDate ? new Date(String(task.dueDate)) : undefined
      }));
      setLocalTasks(convertedTasks);
    }
  }, [tasks]);

  // Dialog handlers
  const handleOpenAddDialog = () => setIsAddTaskDialogOpen(true);
  const handleCloseAddDialog = () => setIsAddTaskDialogOpen(false);
  
  const handleOpenEditDialog = (task: Task) => {
    setSelectedTask(task);
    setIsEditTaskDialogOpen(true);
  };
  
  const handleCloseEditDialog = () => {
    setIsEditTaskDialogOpen(false);
    setSelectedTask(null);
  };
  
  const handleOpenViewDialog = (task: Task) => {
    setSelectedTask(task);
    setIsViewTaskDialogOpen(true);
  };
  
  const handleCloseViewDialog = () => {
    setIsViewTaskDialogOpen(false);
    setSelectedTask(null);
  };  // Task form submission handler
  const handleTaskFormSubmit = async (formData: TaskFormData) => {
    if (isAddTaskDialogOpen) {
      const success = await addTaskOperation(formData, localTasks, setLocalTasks);
      if (success) {
        handleCloseAddDialog();
      }
    } else if (isEditTaskDialogOpen && selectedTask) {
      const success = await editTaskOperation(formData, selectedTask, localTasks, setLocalTasks);
      if (success) {
        handleCloseEditDialog();
      }
    }
  };

  // Task status update handler
  const handleUpdateTaskStatus = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'review' | 'done') => {
    const success = await updateTaskStatusOperation(taskId, newStatus, localTasks, setLocalTasks);
    if (success) {
      handleCloseViewDialog();
    }
  };

  // Delete handlers
  const openDeleteAllDialog = () => setIsDeleteAllDialogOpen(true);
    const handleDeleteBoard = async () => {
    setIsBoardLoading(true);

    try {
      // Get tasks with the current board status
      const tasksToDelete = localTasks.filter(task => 
        task.status === getBoardStatus() || 
        (!task.status && getBoardStatus() === 'todo') // Handle legacy tasks with no status
      );
      
      if (tasksToDelete.length === 0) {
        setIsDeleteAllDialogOpen(false);
        return;
      }
      
      // Delete each task individually
      const deletePromises = tasksToDelete.map(task => 
        projectService.deleteTask(projectId, task.id)
      );
      
      await Promise.all(deletePromises);
      
      // Update UI to remove deleted tasks
      setLocalTasks(prevTasks => 
        prevTasks.filter(task => 
          task.status !== getBoardStatus() && 
          !(task.status === undefined && getBoardStatus() === 'todo')
        )
      );
      
      refreshTasks();
      setIsDeleteAllDialogOpen(false);
    } catch (err) {
      console.error('Error deleting tasks:', err);
    } finally {
      setIsBoardLoading(false);
    }
  };
  
  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    
    setIsBoardLoading(true);
    try {
      await projectService.deleteTask(projectId, taskToDelete);
      setLocalTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete));
      refreshTasks();
      
      // Close the dialog if it was open
      setIsDeleteTaskDialogOpen(false);
    } catch (err) {
      console.error('Error deleting task:', err);
    } finally {
      setIsBoardLoading(false);
    }
  };
    // Board header actions
  const boardActions: Action[] = [
    {
      label: 'Add',
      icon: <Add sx={{ fontSize: 18 }} />,
      onClick: handleOpenAddDialog,
    },
    {
      label: `Delete All (${localTasks.filter(task => 
        task.status === getBoardStatus() || 
        (!task.status && getBoardStatus() === 'todo')
      ).length})`,
      icon: <Delete sx={{ fontSize: 18 }} />,
      onClick: openDeleteAllDialog,
    },
  ];

  return (
    <div className="board" style={{ position: 'relative' }}>
      {/* Loading Overlay */}
      <LoadingOverlay 
        isLoading={isBoardLoading} 
        message="Deleting tasks..." 
      />
      
      {/* Board Header */}
      <BoardHeader 
        label={label} 
        actions={boardActions} 
        getColorByLabel={getColorByLabel} 
      />      {/* Task Cards */}
      <TaskCardList
        tasks={localTasks}
        onEditTask={handleOpenEditDialog}
        onDeleteTask={(taskId) => {
          setTaskToDelete(taskId);
          setIsDeleteTaskDialogOpen(true);
        }}
        onViewTask={handleOpenViewDialog}
      />{/* Add Task Dialog */}
      <TaskDialog
        isOpen={isAddTaskDialogOpen}
        onClose={handleCloseAddDialog}
        mode="add"
        availableAssignees={availableAssignees}
        onSubmit={handleTaskFormSubmit}
        boardStatus={getBoardStatus()}
        isSubmitting={isSubmitting}
      />
      
      {/* Edit Task Dialog */}
      <TaskDialog
        isOpen={isEditTaskDialogOpen}
        onClose={handleCloseEditDialog}
        mode="edit"
        task={selectedTask}
        availableAssignees={availableAssignees}
        onSubmit={handleTaskFormSubmit}
        boardStatus={getBoardStatus()}
        isSubmitting={isSubmitting}
      />
      
      {/* View Task Dialog */}
      <TaskViewDialog
        isOpen={isViewTaskDialogOpen}
        onClose={handleCloseViewDialog}
        task={selectedTask}
        onEdit={handleOpenEditDialog}
        onDelete={(taskId) => {
          setTaskToDelete(taskId);
          setIsDeleteTaskDialogOpen(true);
          handleCloseViewDialog();
        }}
        onUpdateStatus={handleUpdateTaskStatus}
        getColorByLabel={getColorByLabel}
      />
        {/* Feedback Snackbar */}
      <FeedbackSnackbar
        open={showFeedback}
        feedback={feedback}
        onClose={handleFeedbackClose}
      />      {/* Delete Confirmation Dialogs */}
      <TaskDeleteDialogs
        label={label}
        isDeleteAllDialogOpen={isDeleteAllDialogOpen}
        isDeleteTaskDialogOpen={isDeleteTaskDialogOpen}
        isSubmitting={isSubmitting}
        isBoardLoading={isBoardLoading}
        onCloseDeleteAllDialog={() => setIsDeleteAllDialogOpen(false)}
        onConfirmDeleteAll={handleDeleteBoard}
        onCloseDeleteTaskDialog={() => setIsDeleteTaskDialogOpen(false)}
        onConfirmDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default Board;
