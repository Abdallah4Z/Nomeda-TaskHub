import React from "react";
import { Chip, Typography  } from "@mui/material";
import { Label } from "@mui/icons-material";

interface PriorityLabelProps {
  level: "High" | "Normal" | "Low" | null;
}

const PriorityLabel: React.FC<PriorityLabelProps> = ({ level }) => {
  return (
    <>
    <Typography sx={{ fontSize: 13 }}>
    {level + ' Periotity'}
    </Typography>
    </>
  );
};

export default PriorityLabel;
