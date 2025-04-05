import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import NavigationDrawer from './components/NavigationDrawer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
