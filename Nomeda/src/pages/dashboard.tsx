import Calendar from "../components/dashboard/Calendar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import LineChart from "../components/dashboard/LineChart";
import PieChart from "../components/dashboard/PieChart";
import Status from "../components/dashboard/Status";
import ProjectsList from "../components/dashboard/TasksList";
import MainLayout from "../components/Layout/MainLayout";
import '../style/dashboard.css'; 
import { useState } from "react";

export default function Dashboard() {
  const completedTasks = 8;
  const inProgressTasks = 5;
  const remainingTasks = 3;

  const taskStats = {
    totalTasks: 1220,
    inProgress: 80,
    remaining: 122,
    completed: 150
  };

    const today1 = new Date();
    const [currentMonth, setCurrentMonth] = useState(today1.getMonth());
    const [currentYear, setCurrentYear] = useState(today1.getFullYear());
  
    const handleChangeMonth = (newMonth: number, newYear: number) => {
      console.log(`Changing to: Month ${newMonth}, Year ${newYear}`);
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
    };  

  return (
    <MainLayout>
      <div className="dashboard-container">
      <DashboardHeader />

      <div className="dashboard-row">
        <div className="dashboard-left">
          <ProjectsList />
          <Status 
          totalTasks={taskStats.totalTasks}
          inProgress={taskStats.inProgress}
          remaining={taskStats.remaining}
          completed={taskStats.completed}
        />
        </div>
        <div className="dashboard-right">
        <Calendar 
        currentMonth={currentMonth} 
        currentYear={currentYear} 
        onChangeMonth={handleChangeMonth} 
      />  
        </div>
      </div>

      <div className="dashboard-row">
      </div>

      <div className="dashboard-row">
        <div className="dashboard-half">
          <LineChart />
        </div>
        <div className="dashboard-half">
          <PieChart
            completed={completedTasks}
            inProgress={inProgressTasks}
            remaining={remainingTasks}
          />
        </div>
      </div>
      
    </div>
    </MainLayout>
  );
}

