import type { PropsWithChildren, ReactNode } from 'react'

type AppLayoutProps = PropsWithChildren<{
  sidebar: ReactNode
}>

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  return (
    <div className="app-root">
      <div className="app-shell">
        <aside className="sidebar">{sidebar}</aside>
        <div className="app-main-column">
          <main className="app-main">{children}</main>
        </div>
      </div>
    </div>
  )
}

