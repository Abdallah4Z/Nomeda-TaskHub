import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "./FormDialog";

const AddButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (formData: { name: string; description: string }) => {
    console.log("Submitted Data:", formData);
    // You can handle data saving here (API, DB, etc.)
  };

  return (
    <>
      <Tooltip title="Add New">
        <IconButton onClick={handleOpen} color="primary">
          <AddIcon />
        </IconButton>
      </Tooltip>

      <FormDialog open={open} onClose={handleClose} onSubmit={handleFormSubmit} />
    </>
  );
};

export default AddButton;
