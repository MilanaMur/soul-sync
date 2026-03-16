import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../app/i18n/I18nProvider'
import { useCoupleProfile } from '../features/couple'

type FormState = {
  personAName: string
  personBName: string
  relationshipStartDate: string
}

export function SetupPage() {
  const { profile, save, clear } = useCoupleProfile()
  const { t } = useI18n()

  const initial = useMemo<FormState>(
    () => ({
      personAName: profile?.personAName ?? '',
      personBName: profile?.personBName ?? '',
      relationshipStartDate: profile?.relationshipStartDate ?? '',
    }),
    [profile],
  )

  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<
    null | 'saved' | 'cleared' | 'invalid'
  >(null)

  useEffect(() => {
    setForm(initial)
    setStatus(null)
  }, [initial])

  const canSave =
    form.personAName.trim().length > 0 &&
    form.personBName.trim().length > 0 &&
    form.relationshipStartDate.length > 0

  return (
    <motion.section
      className="setup-layout page-section page-section--setup"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="setup-header">
        <h1 style={{ margin: 0 }}>{t('setupTitle')}</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>
          {t('setupSubtitle')}
        </p>
      </div>

      <div className="card card--glass setup-card">
        <div className="setup-form">
          <label className="form-field">
            <span className="form-label">{t('setupLabelYourName')}</span>
            <input
              className="form-input"
              value={form.personAName}
              onChange={(e) => {
                setStatus(null)
                setForm((s) => ({ ...s, personAName: e.target.value }))
              }}
              placeholder={t('SetupPlaceholderName')}
              autoComplete="given-name"
            />
          </label>

          <label className="form-field">
            <span className="form-label">{t('setupLabelPartnerName')}</span>
            <input
              className="form-input"
              value={form.personBName}
              onChange={(e) => {
                setStatus(null)
                setForm((s) => ({ ...s, personBName: e.target.value }))
              }}
              placeholder={t('SetupPlaceholderName')}
              autoComplete="given-name"
            />
          </label>

          <label className="form-field">
            <span className="form-label">{t('setupLabelStartDate')}</span>
            <input
              className="form-input"
              type="date"
              value={form.relationshipStartDate}
              onChange={(e) => {
                setStatus(null)
                setForm((s) => ({
                  ...s,
                  relationshipStartDate: e.target.value,
                }))
              }}
            />
          </label>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn--primary"
              disabled={!canSave}
              onClick={() => {
                if (!canSave) {
                  setStatus('invalid')
                  return
                }
                save({
                  personAName: form.personAName.trim(),
                  personBName: form.personBName.trim(),
                  relationshipStartDate: form.relationshipStartDate,
                })
                setStatus('saved')
              }}
            >
              {t('setupButtonSave')}
            </button>

            <button
              type="button"
              className="btn"
              disabled={!profile}
              onClick={() => {
                clear()
                setForm({
                  personAName: '',
                  personBName: '',
                  relationshipStartDate: '',
                })
                setStatus('cleared')
              }}
            >
              {t('setupButtonReset')}
            </button>
          </div>

          {status === 'saved' ? (
            <div className="form-status">{t('setupStatusSaved')}</div>
          ) : status === 'cleared' ? (
            <div className="form-status">{t('setupStatusCleared')}</div>
          ) : status === 'invalid' ? (
            <div className="form-status">{t('setupStatusInvalid')}</div>
          ) : null}
        </div>
      </div>
    </motion.section>
  )
}

