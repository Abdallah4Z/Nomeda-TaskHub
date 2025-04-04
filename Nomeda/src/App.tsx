import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
