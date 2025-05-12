import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react'
import {createTheme, ThemeProvider, PaletteMode} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

interface ThemeContextProps {
  mode: PaletteMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error('useThemeContext must be used inside ThemeProviderWrapper')
  return context
}

export const ThemeProviderWrapper: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  // Get the initial theme from localStorage or system preference
  const getInitialMode = (): PaletteMode => {
    const savedMode = localStorage.getItem('theme-mode')
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const [mode, setMode] = useState<PaletteMode>(getInitialMode)

  const toggleTheme = () => {
    setMode(prev => {
      const newMode = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme-mode', newMode)
      return newMode
    })
  }

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme-mode')) {
        setMode(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'background-color 0.3s, color 0.3s',
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={{mode, toggleTheme}}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProviderWrapper
