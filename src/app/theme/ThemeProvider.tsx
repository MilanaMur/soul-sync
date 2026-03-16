 import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'

type ThemeContextType = {
  accent: string
  setAccent: (color: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  accent: '#ff4d6d',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAccent: () => {},
})

export function ThemeProvider({ children }: PropsWithChildren) {
  const [accent, setAccentState] = useState(
    window.localStorage.getItem('accent') || '#ff4d6d',
  )

  const setAccent = (color: string) => {
    setAccentState(color)
    window.localStorage.setItem('accent', color)
  }

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', accent)

    const rgb = hexToRgb(accent)
    root.style.setProperty('--accent-rgb', rgb)
  }, [accent])

  return (
    <ThemeContext.Provider value={{ accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

function hexToRgb(hex: string) {
  const bigint = Number.parseInt(hex.replace('#', ''), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `${r}, ${g}, ${b}`
}

