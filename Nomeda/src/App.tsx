import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import NavigationDrawer from './components/NavigationDrawer'
import CenteredBox from './components/settings';
import Routerpage from './pages/Router';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<Homepage />} />
          <Route path="/Settings" element={<Routerpage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
