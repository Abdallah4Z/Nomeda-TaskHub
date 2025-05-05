import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AccountDetailsPage } from './pages/account/AccountDetailsPage'
import { PrivateRoute } from './components/Auth/PrivateRoute'
import { useAuth } from './hooks/useAuth'
import { NotFoundPage } from './pages/errors/NotFoundPage'
import { ServerErrorPage } from './pages/errors/ServerErrorPage'
import { ForbiddenPage } from './pages/errors/ForbiddenPage'
import { UnauthorizedPage } from './pages/errors/UnauthorizedPage'
import { BadRequestPage } from './pages/errors/BadRequestPage'
import ContactPage from './pages/ContactPage'
import Homepage from './pages/Homepage'
import Dashboard from './pages/dashboard'
import { HelpCenter } from './components/Docs/help/HelpCenter'
import { CookieConsent } from './components/Docs/legal/CookieConsent'
import { PrivacyPolicy } from './components/Docs/legal/PrivacyPolicy'
import { SecurityInfo } from './components/Docs/legal/SecurityInfo'
import { TermsOfService } from './components/Docs/legal/TermsOfService'
import { ThemeProviderWrapper } from './context/ThemeContext' // 👈 Add this line
import ProjectView from './components/Home/Project/ProjectView'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProviderWrapper> {/* 👈 Wrap entire app */}
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/cookies" element={<CookieConsent />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/security" element={<SecurityInfo />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/create-project" element={<ProjectView />} />


            <Route
              path="/account"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AccountDetailsPage />
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
