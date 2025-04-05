import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: { name: string; description: string }) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ name: "", description: "" });
    onClose();
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} size="small">Cancel</Button>
        <Button onClick={handleSubmit} size="small" variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
