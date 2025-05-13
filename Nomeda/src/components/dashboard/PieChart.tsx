import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

interface TaskPieChartProps {
  completed: number;
  inProgress: number;
  remaining: number;
}

const COLORS = ["#8a70d6", "#fdd835", "#ef9a9a"]; 

export default function TaskPieChart({ completed, inProgress, remaining }: TaskPieChartProps) {
  const data = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Remaining", value: remaining },
  ];

  return (
    <Card className="task-pie-card">
      <CardContent>
        <Typography variant="h6" className="task-pie-title">
          Task Completion Overview
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
