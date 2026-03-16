import type { PropsWithChildren } from 'react'
import { ThemeProvider } from '../theme/ThemeProvider'
import { I18nProvider } from '../i18n/I18nProvider'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}

