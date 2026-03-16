import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

export type Language = 'ru' | 'en'

const STORAGE_KEY = 'lang'

const translations = {
  ru: {
    appBrandSub: 'воспоминания для двоих ♡',
    accentLabel: 'Основной',

    navHome: 'Главная',
    navSetup: 'Настройка',
    navDashboard: 'Капсула времени',

    homeHeaderSubtitle:
      'Домашний экран: сколько вы вместе и быстрый Love ping <3',
    homeTimerNamesFallback: 'Настройте имена в Setup',
    homeTimerEmpty: 'Откройте Setup и заполните дату',
    homeTimerDaysLabel: 'дней вместе',
    homeTimerNowLabel: 'сейчас',
    homeLovePingDescription:
      'Небольшой сигнал любви',
    homeLovePingButton: 'Отправить Love ping <3',

    setupTitle: 'Настройка',
    setupSubtitle:
      'Укажите имена и дату начала отношений — это появится в таймере',
    setupLabelYourName: 'Твоё имя',
    setupLabelPartnerName: 'Имя любимого человека',
    SetupPlaceholderName: 'Имя',
    setupLabelStartDate: 'Дата начала отношений',
    setupButtonSave: 'Сохранить',
    setupButtonReset: 'Сбросить',
    setupStatusSaved: 'Сохранено.',
    setupStatusCleared: 'Сброшено.',
    setupStatusInvalid: 'Заполните все поля.',

    dashboardActionMoodTitle: 'Настроение',
    dashboardActionMoodCaption: 'отметить своё состояние сегодня',
    dashboardActionMemoryTitle: 'Воспоминание',
    dashboardActionMemoryCaption: 'сохранить маленький момент',
    dashboardFeedTitle: 'Недавние моменты',
    dashboardFeedPill: 'Хроника',
    dashboardFeedItem1: '🌙 Ночная прогулка и горячий чай',
    dashboardFeedItem2: '📷 Совместное селфи перед метро',
    dashboardFeedItem3: '💌 Маленькая записка на столе утром',
  },
  en: {
    appBrandSub: 'memories for two ♡',
    accentLabel: 'Accent',

    navHome: 'Home',
    navSetup: 'Setup',
    navDashboard: 'Dashboard',

    homeHeaderSubtitle:
      'Home screen: how long you are together and quick Love ping <3',
    homeTimerNamesFallback: 'Set up names on Setup',
    homeTimerEmpty: 'Open Setup and fill in the date',
    homeTimerDaysLabel: 'days together',
    homeTimerNowLabel: 'now',
    homeLovePingDescription:
      'A tiny love signal',
    homeLovePingButton: 'Send Love ping <3',

    setupTitle: 'Setup',
    setupSubtitle:
      'Set names and relationship start date — this will show up in the timer',
    setupLabelYourName: 'Your name',
    setupLabelPartnerName: 'Partner’s name',
    SetupPlaceholderName: 'Name',
    setupLabelStartDate: 'Relationship start date',
    setupButtonSave: 'Save',
    setupButtonReset: 'Reset',
    setupStatusSaved: 'Saved.',
    setupStatusCleared: 'Cleared.',
    setupStatusInvalid: 'Please fill in all fields',

    dashboardActionMoodTitle: 'Mood',
    dashboardActionMoodCaption: 'track how you feel today',
    dashboardActionMemoryTitle: 'Memory',
    dashboardActionMemoryCaption: 'save a tiny moment',
    dashboardFeedTitle: 'Recent memories',
    dashboardFeedPill: 'Mini feed',
    dashboardFeedItem1: '🌙 Night walk and hot tea.',
    dashboardFeedItem2: '📷 A quick selfie before the metro.',
    dashboardFeedItem3: '💌 A little note on the table in the morning.',
  },
} as const

type TranslationKey = keyof (typeof translations)['ru']

type I18nContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType>({
  lang: 'ru',
  setLang: () => {},
  t: (key) => translations.ru[key],
})

export function I18nProvider({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<Language>('ru')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ru') {
      setLangState(saved)
    }
  }, [])

  const setLang = (next: Language) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo<I18nContextType>(
    () => ({
      lang,
      setLang,
      t: (key) => {
        const fromCurrent = translations[lang][key]
        if (fromCurrent) return fromCurrent
        return translations.ru[key]
      },
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}

