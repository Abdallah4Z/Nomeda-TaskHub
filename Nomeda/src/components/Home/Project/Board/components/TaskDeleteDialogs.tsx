import React from 'react';
import DeleteConfirmationDialog from '../../../../Common/DeleteConfirmationDialog';

interface TaskDeleteDialogsProps {
  label: string;
  isDeleteAllDialogOpen: boolean;
  isDeleteTaskDialogOpen: boolean;
  isSubmitting: boolean;
  isBoardLoading: boolean;
  onCloseDeleteAllDialog: () => void;
  onConfirmDeleteAll: () => void;
  onCloseDeleteTaskDialog: () => void;
  onConfirmDeleteTask: () => void;
}

const TaskDeleteDialogs: React.FC<TaskDeleteDialogsProps> = ({
  label,
  isDeleteAllDialogOpen,
  isDeleteTaskDialogOpen,
  isSubmitting,
  isBoardLoading,
  onCloseDeleteAllDialog,
  onConfirmDeleteAll,
  onCloseDeleteTaskDialog,
  onConfirmDeleteTask
}) => {
  return (
    <>
      {/* Delete All Tasks Confirmation Dialog */}
      <DeleteConfirmationDialog
        title="Delete All Tasks"
        message={`Are you sure you want to delete all tasks in the "${label}" board? This action cannot be undone.`}
        isOpen={isDeleteAllDialogOpen}
        isDeleting={isSubmitting}
        onClose={onCloseDeleteAllDialog}
        onConfirm={onConfirmDeleteAll}
      />

      {/* Delete Single Task Confirmation Dialog */}
      <DeleteConfirmationDialog
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        isOpen={isDeleteTaskDialogOpen}
        isDeleting={isBoardLoading}
        onClose={onCloseDeleteTaskDialog}
        onConfirm={onConfirmDeleteTask}
      />
    </>
  );
};

export default TaskDeleteDialogs;
