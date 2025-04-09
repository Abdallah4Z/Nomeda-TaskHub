import React from "react";
import { Box, Typography } from "@mui/material";
import useTasks from '../../../../hooks/useTasks'
import Board from "./Board"; // adjust path based on your folder structure
import LoadingSpinner from "../../../Common/LoadingSpinner";

interface BoardData {
  id: string;
  title: string;
  // Add more fields if your Board needs them
}

interface BoardViewProps {
  boards: BoardData[];
}

const BoardView: React.FC<BoardViewProps> = ({ boards }) => {
const {loading} = useTasks() // Use the custom hook for tasks

  
  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap", // allows wrapping
        gap: 2,           // spacing between boards
        p: 2,
        pl:10,             // padding around the container
        overflowX: "auto", // optional: scrollable horizontally on small screens
      }}
    >
      {boards.map((board) => (
        <Box key={board.id}>
          <Board label={board.title} />
        </Box>
      ))}
    </Box>
  );
};

export default BoardView;
