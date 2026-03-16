import { motion } from 'framer-motion'
import { useI18n } from '../app/i18n/I18nProvider'

export function DashboardPage() {
  const { t } = useI18n()

  return (
    <motion.section
      className="dashboard-layout page-section page-section--dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="dashboard-actions">
        <ActionCard
          title={t('dashboardActionMoodTitle')}
          caption={t('dashboardActionMoodCaption')}
        />
        <ActionCard
          title={t('dashboardActionMemoryTitle')}
          caption={t('dashboardActionMemoryCaption')}
        />
      </div>

      <div className="dashboard-feed">
        <div className="card card--glass">
          <div className="feed-header">
            <span className="feed-title">{t('dashboardFeedTitle')}</span>
            <span className="pill">
              <span>{t('dashboardFeedPill')}</span>
            </span>
          </div>
          <div className="feed-items">
            <div className="timeline-item">{t('dashboardFeedItem1')}</div>
            <div className="timeline-item">{t('dashboardFeedItem2')}</div>
            <div className="timeline-item">{t('dashboardFeedItem3')}</div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

type ActionCardProps = {
  title: string
  caption: string
}

function ActionCard({ title, caption }: ActionCardProps) {
  return (
    <button
      type="button"
      className="card action-card card--glass memory-card"
    >
      <span className="action-card-title">{title}</span>
      <span className="action-card-caption">{caption}</span>
    </button>
  )
}


