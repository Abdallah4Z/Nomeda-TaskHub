import NavigationDrawer from '../components/Drawer/NavigationDrawer'
import SettingsMenu from '../components/Common/SettingsMenu'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import AddButton from '../components/Common/AddButton'
import LabelSelector from '../components/Home/Project/LabelSelector'
import React, {useState} from 'react'
import TaskCard from '../components/Tasks/TaskCard'
import Chatbot from '../components/Chatbot'
import Board from '../components/Home/Project/Board/Board'
import BoardView from '../components/Home/Project/Board/BoardView'
import {Dashboard} from '@mui/icons-material'
import ListView from '../components/Home/Project/List/ListView'

function Homepage() {
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
  const boards = [
    {id: '1', title: 'To Do'},
    {id: '2', title: 'In Progress'},
    {id: '3', title: 'Done'},
    {id: '4', title: 'Blocked'},
    {id: '4', title: 'Blocked'},
    {id: '4', title: 'Blocked'},
    {id: '1', title: 'To Do'},
    {id: '2', title: 'In Progress'},
    {id: '3', title: 'Done'},
    {id: '4', title: 'Blocked'},
    {id: '4', title: 'Blocked'},
    {id: '4', title: 'Blocked'},
  ]

  const actions = [
    {
      label: 'Edit Task',
      icon: <EditIcon fontSize="small" />,
      onClick: () => alert('Edit clicked'),
    },
    {
      label: 'Delete Task',
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => alert('Delete clicked'),
    },
  ]
  return (
    <div>
      {/* <NavigationDrawer />
      <Chatbot /> */}
      {/* <TaskCard
        title="Design Landing Page"
        users={users}
        assignedAt="2025-04-05 14:30"
        priority="Normal"
        actions={actions}
      />
      <div style={{textAlign: 'right'}}>
        <SettingsMenu actions={actions} />
      </div>
      <AddButton />

      <LabelSelector selectedLabel={label} onChange={setLabel} /> */}
      <BoardView boards={boards} />
      {/* <div style={{height: '100vh', overflowY: 'auto', minWidth: '80vw'}}>
        <ListView />
      </div> */}
    </div>
  )
}
export default Homepage
