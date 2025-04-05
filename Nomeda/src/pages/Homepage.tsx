import NavigationDrawer from '../components/NavigationDrawer';
import SettingsMenu from "../components/Common/SettingsMenu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import AddButton from '../components/Common/AddButton';
import LabelSelector from '../components/Home/Project/LabelSelector';
import React, { useState } from "react";
import TaskCard from '../components/Tasks/TaskCard';


function Homepage(){    
    // const actions = [
    //     {
    //       label: "Edit",
    //       icon: <EditIcon fontSize="inherit" />,
    //       onClick: () => alert("Edit clicked"),
    //     },
    //     {
    //       label: "Delete",
    //       icon: <DeleteIcon fontSize="inherit" />,
    //       onClick: () => alert("Delete clicked"),
    //     },
    //     {
    //         label: "Add",
    //         icon: <AddIcon fontSize="inherit" />,
    //         onClick: () => alert("Add clicked"),
    //       },
    //   ];
      const [label, setLabel] = useState("");
      const users = [
        { name: "Abdallah", avatar: "https://i.pravatar.cc/150?img=1" },
        { name: "Melina", avatar: "https://i.pravatar.cc/150?img=2" },
        { name: "Ali", avatar: "https://i.pravatar.cc/150?img=3" },
      ];

      const actions = [
        {
          label: "Edit Task",
          icon: <EditIcon fontSize="small" />,
          onClick: () => alert("Edit clicked"),
        },
        {
          label: "Delete Task",
          icon: <DeleteIcon fontSize="small" />,
          onClick: () => alert("Delete clicked"),
        },
      ];
    return (
        <div>
            <NavigationDrawer/>
            <TaskCard
                title="Design Landing Page"
                users={users}
                assignedAt="2025-04-05 14:30"
                priority="Normal"
                actions={actions}
            />
            <div style={{ textAlign: "right" }}>
                <SettingsMenu actions={actions} />
            </div>
            <AddButton />
            
            <LabelSelector selectedLabel={label} onChange={setLabel} />
        </div>
    )
}
export default Homepage;