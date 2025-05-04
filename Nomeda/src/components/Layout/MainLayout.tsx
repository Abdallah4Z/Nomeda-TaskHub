import React, { useMemo, useState, ReactNode } from 'react'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  useMediaQuery,
  IconButton,
} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Header from './Header/Header'
import Footer from './Footer'
import NavigationDrawer from '../Drawer/NavigationDrawer'

interface MainLayoutProps {
  children: ReactNode
}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'light' : 'dark')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header
            rightAction={
              <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            }
          />
          <Box display="flex" flex="1">
            <NavigationDrawer />
            <Box component="main" flex="1" p={{ xs: 1, sm: 3 }}>
              {children}
            </Box>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default MainLayout
