import React, { useEffect, useState } from "react";
import {
  Chip,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddLabelDialog from "./AddLabelDialog";

const LABELS_STORAGE_KEY = "task_labels";

const defaultLabels = ["Pending", "In Progress", "Completed", "Launched"];

const LabelSelector: React.FC<{
  selectedLabel: string;
  onChange: (label: string) => void;
}> = ({ selectedLabel, onChange }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LABELS_STORAGE_KEY);
    setLabels(saved ? JSON.parse(saved) : defaultLabels);
  }, []);

  const handleAddLabel = (newLabel: string) => {
    if (!labels.includes(newLabel)) {
      const updated = [...labels, newLabel];
      setLabels(updated);
      localStorage.setItem(LABELS_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        {labels.map((label) => (
          <Chip
            key={label}
            label={label}
            color={selectedLabel === label ? "primary" : "default"}
            onClick={() => onChange(label)}
            size="small"
            sx={{ cursor: "pointer" }}
          />
        ))}

        <Tooltip title="Add New Label">
          <IconButton size="small" onClick={() => setOpenDialog(true)}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <AddLabelDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddLabel}
      />
    </>
  );
};

export default LabelSelector;
