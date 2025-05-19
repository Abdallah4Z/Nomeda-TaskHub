import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {PrivateRoute} from './components/Auth/PrivateRoute'
import {useAuth} from './hooks/useAuth'
import {NotFoundPage} from './pages/errors/NotFoundPage'
import {ServerErrorPage} from './pages/errors/ServerErrorPage'
import {ForbiddenPage} from './pages/errors/ForbiddenPage'
import {UnauthorizedPage} from './pages/errors/UnauthorizedPage'
import {BadRequestPage} from './pages/errors/BadRequestPage'
import ContactPage from './pages/ContactPage'
import Homepage from './pages/Homepage'
import Dashboard from './pages/dashboard'
import {HelpCenter} from './components/Docs/help/HelpCenter'
import {CookieConsent} from './components/Docs/legal/CookieConsent'
import {PrivacyPolicy} from './components/Docs/legal/PrivacyPolicy'
import {SecurityInfo} from './components/Docs/legal/SecurityInfo'
import {TermsOfService} from './components/Docs/legal/TermsOfService'
import {ThemeProviderWrapper} from './context/ThemeContext'
import ProjectViewPage from './pages/ProjectViewPage'
import AccountViewPage from './pages/AccountViewPage'
import LandingPage from './pages/LandingPage'
import TasksPage from './pages/TasksPage'
import TeamPage from './pages/TeamPage'
import ChatPage from './pages/ChatPage'
import GitHubCallback from './pages/GitHubCallback'

function App() {
  const {isAuthenticated} = useAuth()

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProviderWrapper>
        {' '}
        {/* 👈 Wrap entire app */}
        <Router>
          <Routes>
            <Route
              path="/home"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Homepage />
                </PrivateRoute>
              }
            />{' '}
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/cookies" element={<CookieConsent />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/security" element={<SecurityInfo />} />
            <Route path="/terms" element={<TermsOfService />} />
            {/* Authentication Callback Routes */}
            <Route path="/github-callback" element={<GitHubCallback />} />
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-project"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ProjectViewPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/project"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ProjectViewPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ProjectViewPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <TasksPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/team"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <TeamPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ChatPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AccountViewPage />
                </PrivateRoute>
              }
            />
            <Route path="/400" element={<BadRequestPage />} />
            <Route path="/401" element={<UnauthorizedPage />} />
            <Route path="/403" element={<ForbiddenPage />} />
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProviderWrapper>
    </GoogleOAuthProvider>
  )
}

export default App
