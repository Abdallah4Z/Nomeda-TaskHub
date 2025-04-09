import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {AccountDetailsPage} from './pages/account/AccountDetailsPage'
import {PrivateRoute} from './components/Auth/PrivateRoute'
import {useAuth} from './hooks/useAuth'
import {NotFoundPage} from './pages/errors/NotFoundPage'
import {ServerErrorPage} from './pages/errors/ServerErrorPage'
import {ForbiddenPage} from './pages/errors/ForbiddenPage'
import {UnauthorizedPage} from './pages/errors/UnauthorizedPage'
import {BadRequestPage} from './pages/errors/BadRequestPage'
import ContactPage from './pages/ContactPage';
import Homepage from './pages/Homepage';
// Removed unused and unresolved 'Settings' import
import Dashboard from './pages/dashboard'
import Footer from './components/Common/Footer'
import Header from './components/Common/Header/Header'


function App() {
  const [count, setCount] = useState(0)
  const {isAuthenticated} = useAuth() // Assuming adding an auth hook

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={< Homepage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Account Routes - <Protected> */}
          <Route
            path="/account"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AccountDetailsPage />
              </PrivateRoute>
            }
          />
          {/* Errors Routes */}
          <Route path="/400" element={<BadRequestPage />} />
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer/>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
