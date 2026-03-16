import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppLayout } from './app/layout'
import { AppRouter, type AppRoute } from './app/router'
import { AppProviders } from './app/providers'
import { useTheme } from './app/theme/ThemeProvider'
import { romanticColors } from './app/theme/themeConfig'
import { useI18n } from './app/i18n/I18nProvider'
import './App.css'

function AccentPicker() {
  const { accent, setAccent } = useTheme()
  const { t } = useI18n()

  return (
    <div className="accent-picker">
      <span className="accent-picker-label">{t('accentLabel')}</span>
      {Object.entries(romanticColors).map(([key, color]) => (
        <button
          key={key}
          type="button"
          className="accent-dot"
          data-active={accent === color}
          style={{ backgroundColor: color }}
          aria-label={key}
          onClick={() => setAccent(color)}
        />
      ))}
    </div>
  )
}

function LanguageSwitch() {
  const { lang, setLang } = useI18n()

  return (
    <div className="lang-switch" aria-label="Language">
      <button
        type="button"
        className="lang-switch-button"
        data-active={lang === 'ru'}
        onClick={() => setLang('ru')}
      >
        RU
      </button>
      <button
        type="button"
        className="lang-switch-button"
        data-active={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  )
}

type AppShellProps = {
  route: AppRoute
  setRoute: (route: AppRoute) => void
}

function Sidebar({ route, setRoute }: AppShellProps) {
  const { t, lang } = useI18n()

  return (
    <div className="sidebar-inner">
      <div className="app-brand">
        <div className="app-brand-badge">♡</div>
        <div>
          <div className="app-brand-text-main">Soul Sync</div>
          <div className="app-brand-text-sub">{t('appBrandSub')}</div>
        </div>
      </div>

      <div className="sidebar-controls">
        <LanguageSwitch />
        <AccentPicker />
      </div>

      <nav className="sidebar-nav" aria-label="Навигация">
        <button
          type="button"
          className="sidebar-item"
          data-active={route === 'home'}
          onClick={() => setRoute('home')}
        >
          <span className="sidebar-item-label">{t('navHome')}</span>
        </button>
        <button
          type="button"
          className="sidebar-item"
          data-active={route === 'setup'}
          onClick={() => setRoute('setup')}
        >
          <span className="sidebar-item-label">{t('navSetup')}</span>
        </button>
        <button
          type="button"
          className="sidebar-item"
          data-active={route === 'dashboard'}
          onClick={() => setRoute('dashboard')}
        >
          <span className="sidebar-item-label">{t('navDashboard')}</span>
        </button>
      </nav>

      <div className="sidebar-meta">
        <span className="sidebar-meta-lang">{lang === 'ru' ? 'Русский' : 'English'}</span>
      </div>
    </div>
  )
}

function AppShell({ route, setRoute }: AppShellProps) {
  return (
    <AppLayout
      sidebar={
        <motion.div
          className="sidebar-motion-wrapper"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Sidebar route={route} setRoute={setRoute} />
        </motion.div>
      }
    >
      <AppRouter route={route} />
    </AppLayout>
  )
}

function App() {
  const [route, setRoute] = useState<AppRoute>('home')

  return (
    <AppProviders>
      <div className="app-background">
        <AppShell route={route} setRoute={setRoute} />
      </div>
    </AppProviders>
  )
}

export default App
