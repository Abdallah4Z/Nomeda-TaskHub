import React from "react";
import { Chip } from "@mui/material";

interface PriorityLabelProps {
  level: "High" | "Normal" | "Low";
}

const PriorityLabel: React.FC<PriorityLabelProps> = ({ level }) => {
  const colorMap = {
    High: "error",
    Normal: "warning",
    Low: "success",
  } as const;

  return (
    <Chip
      label={level}
      color={colorMap[level]}
      size="small"
      sx={{ fontWeight: "bold", fontSize: "12px" }}
    />
  );
};

export default PriorityLabel;
