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
import Projectboard from '../components/ProjectHeader/project'
import Board from '../components/Home/Project/Board/Board'
import BoardView from '../components/Home/Project/Board/BoardView'
import {Dashboard} from '@mui/icons-material'
import ListView from '../components/Home/Project/List/ListView'
import Project from '../components/Home/Project/Project'
import Header from '../components/Common/Header/Header'
import Footer from '../components/Common/Footer'

function Homepage() {

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
    <div className='home'>
      <Header/>
      <Project />
      <NavigationDrawer />
      <Footer/>
    </div>
  )
}
export default Homepage
