import React from 'react'
import {Router} from 'react-router-dom'
import NavigationDrawer from '../components/Drawer/NavigationDrawer'
function Routerpage() {
  return (
    <div>
      <NavigationDrawer />
      {/* Add your homepage content here */}
      <h1>Router to the Homepage</h1>
    </div>
  )
}
export default Routerpage
