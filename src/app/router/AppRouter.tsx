import { DashboardPage } from '../../pages/DashboardPage'
import { HomePage } from '../../pages/HomePage'
import { SetupPage } from '../../pages/SetupPage'

export type AppRoute = 'home' | 'setup' | 'dashboard'

export function AppRouter({ route }: { route: AppRoute }) {
  switch (route) {
    case 'home':
      return <HomePage />
    case 'setup':
      return <SetupPage />
    case 'dashboard':
      return <DashboardPage />
    default: {
      const _exhaustive: never = route
      return _exhaustive
    }
  }
}

