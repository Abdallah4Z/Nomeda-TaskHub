import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface AddLabelDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (label: string) => void;
}

const AddLabelDialog: React.FC<AddLabelDialogProps> = ({ open, onClose, onAdd }) => {
  const [label, setLabel] = useState("");

  const handleAdd = () => {
    if (label.trim()) {
      onAdd(label.trim());
      setLabel("");
      onClose();
    }
  };

  const handleCancel = () => {
    setLabel("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Add New Label</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Label Name"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} size="small">Cancel</Button>
        <Button onClick={handleAdd} size="small" variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLabelDialog;
