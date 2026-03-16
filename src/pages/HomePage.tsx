import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../app/i18n/I18nProvider'
import { useCoupleProfile } from '../features/couple'
import { useRelationshipTimer } from '../features/timer'

export function HomePage() {
  const { t } = useI18n()

  return (
    <motion.section
      className="page-section page-section--home"
      style={{ display: 'grid', gap: 16 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header style={{ display: 'grid', gap: 4 }}>
        <h1 style={{ margin: 0 }}>Soul Sync</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>
          {t('homeHeaderSubtitle')}
        </p>
      </header>

      <MainTimerCard />
      <LovePingCard />
    </motion.section>
  )
}

function MainTimerCard() {
  const { profile } = useCoupleProfile()
  const duration = useRelationshipTimer(profile?.relationshipStartDate ?? null)
  const { t } = useI18n()

  const names = profile
    ? `${profile.personAName} ♡ ${profile.personBName}`
    : t('homeTimerNamesFallback')

  const daysText = duration ? String(duration.days) : '—'

  const sub = duration
    ? `${t('homeTimerDaysLabel')} · ${pad2(duration.hours)}:${pad2(
        duration.minutes,
      )} ${t('homeTimerNowLabel')}`
    : t('homeTimerEmpty')

  return (
    <div className="card card--glow timer-card timer-pulse">
      <div className="timer-names">{names}</div>
      <motion.div
        key={daysText}
        className="timer-value-days timer-pulse"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        {daysText}
      </motion.div>
      <div className="timer-sub">{sub}</div>
    </div>
  )
}

function LovePingCard() {
  const { t } = useI18n()
  const [hearts, setHearts] = useState<
    {
      id: number
      left: number
    }[]
  >([])
  const [isPulsing, setIsPulsing] = useState(false)

  const spawnHeart = () => {
    setIsPulsing(true)
    const id = Date.now() + Math.floor(Math.random() * 1000)
    const left = 10 + Math.random() * 80
    setHearts((prev) => [...prev, { id, left }])

    window.setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id))
    }, 2200)

    window.setTimeout(() => {
      setIsPulsing(false)
    }, 380)
  }

  return (
    <div
      className={`card card--glass love-ping-card${
        isPulsing ? ' love-ping-card--pulse' : ''
      }`}
    >
      <div className="love-ping-content">
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {t('homeLovePingDescription')}
        </div>
        <div>
          <button
            type="button"
            className="btn btn--primary love-button"
            onClick={spawnHeart}
          >
            {t('homeLovePingButton')}
          </button>
        </div>
      </div>

      <div className="love-ping-hearts-layer" aria-hidden="true">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="love-ping-heart"
            style={{ left: `${heart.left}%` }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  )
}

function pad2(value: number) {
  return String(value).padStart(2, '0')
}

