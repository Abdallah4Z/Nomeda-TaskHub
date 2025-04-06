import React from 'react'
import NavigationDrawer from '../components/NavigationDrawer'
import Chatbot from '../components/Chatbot'

function Homepage() {
  return (
    <div>
      <NavigationDrawer />
      < Chatbot/>
      <h1>Welcome to the Homepage</h1>
    </div>
  )
}
export default Homepage
