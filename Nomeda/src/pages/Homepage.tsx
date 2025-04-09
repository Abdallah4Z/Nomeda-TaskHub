import React from 'react'
import NavigationDrawer from '../components/NavigationDrawer'
import Chatbot from '../components/Chatbot'
import Projectboard from '../components/ProjectHeader/project'
function Homepage() {
  return (
    <div>
        <Projectboard/>
      <NavigationDrawer />
      < Chatbot/>
      <h1>Welcome to the Homepage</h1>
    </div>
  )
}
export default Homepage
