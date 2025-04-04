import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
// import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
