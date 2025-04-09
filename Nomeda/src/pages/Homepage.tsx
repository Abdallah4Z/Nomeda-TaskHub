import NavigationDrawer from '../components/NavigationDrawer'
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
import './s.css'

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
    <NavigationDrawer>
            <BoardView boards={boards} />
    </NavigationDrawer>
  )
}
export default Homepage
