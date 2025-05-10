import React, {ReactNode} from 'react'
import {Box} from '@mui/material'
import Header from './Header/Header'
import Footer from './Footer'
import NavigationDrawer from '../Drawer/NavigationDrawer'
import {useThemeContext} from '../../context/ThemeContext'

interface MainLayoutProps {
  children: ReactNode
}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  const {toggleTheme} = useThemeContext()

  return (
    <ColorModeContext.Provider value={{toggleColorMode: toggleTheme}}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box sx={{display: 'flex', flex: 1}}>
          <NavigationDrawer />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: '100%',
              minHeight: '100vh',
              bgcolor: 'background.default',
              color: 'text.primary',
            }}
          >
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
    </ColorModeContext.Provider>
  )
}

export default MainLayout
