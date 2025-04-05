import { TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import '../../style/dashboard.css'; 

const DashboardHeader = () => {
  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-header">
      <div className="header-left">
        <Typography variant="h4" fontWeight="bold" className="h1">Dashboard</Typography>
        <Typography variant="body2" color="text.secondary" className="date">
            {today}
        </Typography>
      </div>
      <div className="header-center">
        <TextField
          variant="outlined"
          placeholder="Search tasks..."
          size="small"
          className="search-bar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="header-center">
    
      </div>
    </div>
  );
};

export default DashboardHeader;
