import React from 'react'
import {Grid, Paper, Typography} from '@mui/material'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

interface ChartsSectionProps {
  taskDistribution: Array<{
    name: string
    value: number
    color: string
  }>
  weeklyProgress: Array<{
    day: string
    tasks: number
  }>
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  taskDistribution,
  weeklyProgress,
}) => {
  return (
    <Grid container spacing={3} sx={{mb: 4, mt: 2}}>
      {/* Task Distribution Chart */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            height: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Task Distribution
          </Typography>
          <ResponsiveContainer height={300} width={'30vw'}>
            <PieChart width="30vw">
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name, percent}) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Weekly Progress Chart */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            height: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Weekly Progress
          </Typography>
          <ResponsiveContainer height={300} width={'30vw'}>
            <BarChart data={weeklyProgress} width="30vw">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#1976d2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ChartsSection
